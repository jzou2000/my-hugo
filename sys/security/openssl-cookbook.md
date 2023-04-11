---
title: OpenSSL Cookbook
date: 2019-05-17
tags: [openssl, cookbook]
---

1 OpenSSL
OpenSSL is an open source project that consists of a cryptographic library and an SSL/TLS toolkit. From the project’s web site:

The OpenSSL Project is a collaborative effort to develop a robust, commercial-grade, full-featured, and Open Source toolkit implementing the Secure Sockets Layer (SSL) and Transport Layer Security (TLS) protocols as well as a full-strength general purpose cryptography library. The project is managed by a worldwide community of volunteers that use the Internet to communicate, plan, and develop the OpenSSL toolkit and its related documentation.

OpenSSL is a de facto standard in this space and comes with a long history. The code initially began its life in 1995 under the name SSLeay,1 when it was developed by Eric A. Young and Tim J. Hudson. The OpenSSL project was born in the last days of 1998, when Eric and Tim stopped their work on SSLeay to work on a commercial SSL/TLS toolkit called BSAFE SSL-C at RSA Australia.

Today, OpenSSL is ubiquitous on the server side and in many client tools. The command-line tools are also the most common choice for key and certificate management as well as testing. Interestingly, browsers have historically used other libraries, although that’s now changing because Google is migrating Chrome to its own OpenSSL fork called BoringSSL.2

OpenSSL is dual-licensed under OpenSSL and SSLeay licenses. Both are BSD-like, with an advertising clause. The license has been a source of contention for a very long time, because neither of the licenses is considered compatible with the GPL family of licenses. For that reason, you will often find that GPL-licensed programs favor GnuTLS.

Getting Started
If you’re using one of the Unix platforms, getting started with OpenSSL is easy; you’re virtually guaranteed to already have it on your system. The only problem that you might face is that you might not have the latest version. In this section, I assume that you’re using a Unix platform, because that’s the natural environment for OpenSSL.

Windows users tend to download binaries, which might complicate the situation slightly. In the simplest case, if you need OpenSSL only for its command-line utilities, the main OpenSSL web site links to Shining Light Productions3 for the Windows binaries. In all other situations, you need to ensure that you’re not mixing binaries compiled under different versions of OpenSSL. Otherwise, you might experience crashes that are difficult to troubleshoot. The best approach is to use a single bundle of programs that includes everything that you need. For example, if you want to run Apache on Windows, you can get your binaries from the Apache Lounge.4

Determine OpenSSL Version and Configuration
Before you do any work, you should know which OpenSSL version you’ll be using. For example, here’s what I get for version information with openssl version on Ubuntu 12.04 LTS, which is the system that I’ll be using for the examples in this chapter:

$ openssl version
OpenSSL 1.0.1 14 Mar 2012
At the time of this writing, a transition from OpenSSL 0.9.x to OpenSSL 1.0.x is in progress. The version 1.0.1 is especially significant because it is the first version to support TLS 1.1 and 1.2. The support for newer protocols is part of a global trend, so it’s likely that we’re going to experience a period during which interoperability issues are not uncommon.

Note
Various operating systems often modify the OpenSSL code, usually to fix known issues. However, the name of the project and the version number generally stay the same, and there is no indication that the code is actually a fork of the original project that will behave differently. For example, the version of OpenSSL used in Ubuntu 12.04 LTS5 is based on OpenSSL 1.0.1c. At the time of this writing, the full name of the package is openssl 1.0.1-4ubuntu5.16, and it contains patches for the many issues that came to light over time.

To get complete version information, use the -a switch:

$ openssl version -a
OpenSSL 1.0.1 14 Mar 2012
built on: Fri Jun 20 18:54:15 UTC 2014
platform: debian-amd64
options:  bn(64,64) rc4(8x,int) des(idx,cisc,16,int) blowfish(idx)
compiler: cc -fPIC -DOPENSSL_PIC -DZLIB -DOPENSSL_THREADS -D_REENTRANT -DDSO_DLFCN ↩
-DHAVE_DLFCN_H -m64 -DL_ENDIAN -DTERMIO -g -O2 -fstack-protector --param=ssp-buffer-size↩
=4 -Wformat -Wformat-security -Werror=format-security -D_FORTIFY_SOURCE=2 ↩
-Wl,-Bsymbolic-functions -Wl,-z,relro -Wa,--noexecstack -Wall -DOPENSSL_NO_TLS1_2↩
_CLIENT -DOPENSSL_MAX_TLS1_2_CIPHER_LENGTH=50 -DMD32_REG_T=int -DOPENSSL_IA32_SSE2 ↩
-DOPENSSL_BN_ASM_MONT -DOPENSSL_BN_ASM_MONT5 -DOPENSSL_BN_ASM_GF2m -DSHA1_ASM -DSHA256↩
_ASM -DSHA512_ASM -DMD5_ASM -DAES_ASM -DVPAES_ASM -DBSAES_ASM -DWHIRLPOOL_ASM -DGHASH↩
_ASM
OPENSSLDIR: "/usr/lib/ssl"
The last line in the output (/usr/lib/ssl) is especially interesting because it will tell you where OpenSSL will look for its configuration and certificates. On my system, that location is essentially an alias for /etc/ssl, where Ubuntu keeps TLS-related files:

lrwxrwxrwx  1 root root   14 Apr 19 09:28 certs -> /etc/ssl/certs
drwxr-xr-x  2 root root 4096 May 28 06:04 misc
lrwxrwxrwx  1 root root   20 May 22 17:07 openssl.cnf -> /etc/ssl/openssl.cnf
lrwxrwxrwx  1 root root   16 Apr 19 09:28 private -> /etc/ssl/private
The misc/ folder contains a few supplementary scripts, the most interesting of which are the scripts that allow you to implement a private certification authority (CA).

Building OpenSSL
In most cases, you will be using the system-supplied version of OpenSSL, but sometimes there are good reasons to upgrade. For example, your system might be stuck with OpenSSL 0.9.x, which doesn’t support newer TLS protocol versions, and even if the system OpenSSL is the right version, it might not have the features you need. For example, on Ubuntu 12.04 LTS, there’s no support for SSL 2 in the s_client command. Although not supporting this version of SSL by default is the right decision, you’ll need this feature if you’re routinely testing other servers for SSL 2 support.

You can start by downloading the most recent version of OpenSSL (in my case, 1.0.1p):

$ wget http://www.openssl.org/source/openssl-1.0.1p.tar.gz
The next step is to configure OpenSSL before compilation. In most cases, you’ll be leaving the system-provided version alone and installing OpenSSL in a different location. For example:

$ ./config \
--prefix=/opt/openssl \
--openssldir=/opt/openssl \
enable-ec_nistp_64_gcc_128
The enable-ec_nistp_64_gcc_128 parameter activates optimized versions of certain frequently used elliptic curves. This optimization depends on a compiler feature that can’t be automatically detected, which is why it’s disabled by default.

Note
If you’re compiling a version of OpenSSL from the 1.1.x branch and above, on at least some systems you’ll need to use the no-shared parameter to produce statically-compiled command line tools. You’ll know you need to use this parameter if (after the compilation) you’re trying to invoke the OpenSSL binary and it’s complaining about not finding some required shared libraries.

You can then follow with:

$ make depend
$ make
$ sudo make install
You’ll get the following in /opt/openssl:

drwxr-xr-x 2 root root  4096 Jun  3 08:49 bin
drwxr-xr-x 2 root root  4096 Jun  3 08:49 certs
drwxr-xr-x 3 root root  4096 Jun  3 08:49 include
drwxr-xr-x 4 root root  4096 Jun  3 08:49 lib
drwxr-xr-x 6 root root  4096 Jun  3 08:48 man
drwxr-xr-x 2 root root  4096 Jun  3 08:49 misc
-rw-r--r-- 1 root root 10835 Jun  3 08:49 openssl.cnf
drwxr-xr-x 2 root root  4096 Jun  3 08:49 private
The private/ folder is empty, but that’s normal; you do not yet have any private keys. On the other hand, you’ll probably be surprised to learn that the certs/ folder is empty too. OpenSSL does not include any root certificates; maintaining a trust store is considered outside the scope of the project. Luckily, your operating system probably already comes with a trust store that you can use. You can also build your own with little effort, as you’ll see in the next section.

Note
When compiling software, it’s important to be familiar with the default configuration of your compiler. System-provided packages are usually compiled using all the available hardening options, but if you compile some software yourself there is no guarantee that the same options will be used.6

Examine Available Commands
OpenSSL is a cryptographic toolkit that consists of many different utilities. I counted 46 in my version. If it were ever appropriate to use the phrase Swiss Army knife of cryptography, this is it. Even though you’ll use only a handful of the utilities, you should familiarize yourself with everything that’s available, because you never know what you might need in the future.

There isn’t a specific help keyword, but help text is displayed whenever you type something OpenSSL does not recognize:

$ openssl help
openssl:Error: 'help' is an invalid command.

Standard commands
asn1parse         ca                ciphers           cms
crl               crl2pkcs7         dgst              dh
dhparam           dsa               dsaparam          ec
ecparam           enc               engine            errstr
gendh             gendsa            genpkey           genrsa
nseq              ocsp              passwd            pkcs12
pkcs7             pkcs8             pkey              pkeyparam
pkeyutl           prime             rand              req
rsa               rsautl            s_client          s_server
s_time            sess_id           smime             speed
spkac             srp               ts                verify
version           x509
The first part of the help output lists all available utilities. To get more information about a particular utility, use the man command followed by the name of the utility. For example, man ciphers will give you detailed information on how cipher suites are configured.

Help output doesn’t actually end there, but the rest is somewhat less interesting. In the second part, you get the list of message digest commands:

Message Digest commands (see the `dgst' command for more details)
md4               md5               rmd160            sha
sha1
And then, in the third part, you’ll see the list of all cipher commands:

Cipher commands (see the `enc' command for more details)
aes-128-cbc       aes-128-ecb       aes-192-cbc       aes-192-ecb
aes-256-cbc       aes-256-ecb       base64            bf
bf-cbc            bf-cfb            bf-ecb            bf-ofb
camellia-128-cbc  camellia-128-ecb  camellia-192-cbc  camellia-192-ecb
camellia-256-cbc  camellia-256-ecb  cast              cast-cbc
cast5-cbc         cast5-cfb         cast5-ecb         cast5-ofb
des               des-cbc           des-cfb           des-ecb
des-ede           des-ede-cbc       des-ede-cfb       des-ede-ofb
des-ede3          des-ede3-cbc      des-ede3-cfb      des-ede3-ofb
des-ofb           des3              desx              rc2
rc2-40-cbc        rc2-64-cbc        rc2-cbc           rc2-cfb
rc2-ecb           rc2-ofb           rc4               rc4-40
seed              seed-cbc          seed-cfb          seed-ecb
seed-ofb          zlib
Building a Trust Store
OpenSSL does not come with any trusted root certificates (also known as a trust store), so if you’re installing from scratch you’ll have to find them somewhere else. One possibility is to use the trust store built into your operating system. This choice is usually fine, but default trust stores may not always be up to date. A better choice—but one that involves more work—is to turn to Mozilla, which is putting a lot of effort into maintaining a robust trust store. For example, this is what I did for my assessment tool on SSL Labs.

Because it’s open source, Mozilla keeps the trust store in the source code repository:

https://hg.mozilla.org/mozilla-central/raw-file/tip/security/nss/lib/ckfw/builtins↩
/certdata.txt
Unfortunately, their certificate collection is in a proprietary format, which is not of much use to others as is. If you don’t mind getting the collection via a third party, the Curl project provides a regularly-updated conversion in Privacy-Enhanced Mail (PEM) format, which you can use directly:

http://curl.haxx.se/docs/caextract.html
But you don’t have to write a conversion script if you’d rather download directly from Mozilla. Conversion scripts are available in Perl or Go. I describe both in the following sections.

Note
If you do end up working on your own conversion script, note that Mozilla’s root certificate file actually contains two types of certificates: those that are trusted and are part of the store and also those that are explicitly distrusted. They use this mechanism to ban compromised intermediate CA certificates (e.g., DigiNotar’s old certificates). Both conversion tools described here are smart enough to exclude distrusted certificates during the conversion process.

Conversion Using Perl
The Curl project makes available a Perl script written by Guenter Knauf that can be used to convert Mozilla’s trust store:

https://raw.github.com/bagder/curl/master/lib/mk-ca-bundle.pl
After you download and run the script, it will fetch the certificate data from Mozilla and convert it to the PEM format:

$ ./mk-ca-bundle.pl
Downloading 'certdata.txt' ...
Processing  'certdata.txt' ...
Done (156 CA certs processed, 19 untrusted skipped).
If you keep previously downloaded certificate data around, the script will use it to determine what changed and process only the updates.

Conversion Using Go
If you prefer the Go programming language, consider Adam Langley’s conversion tool, which you can get from GitHub:

https://github.com/agl/extract-nss-root-certs
To kick off a conversion process, first download the tool itself:

$ wget https://raw.github.com/agl/extract-nss-root-certs/master/convert_mozilla↩
_certdata.go
Then download Mozilla’s certificate data:

$ wget https://hg.mozilla.org/mozilla-central/raw-file/tip/security/nss/lib/ckfw↩
/builtins/certdata.txt --output-document certdata.txt
Finally, convert the file with the following command:

$ go run convert_mozilla_certdata.go > ca-certificates
2012/06/04 09:52:29 Failed to parse certificate starting on line 23068: negative serial ↩
number 
In my case, there was one invalid certificate that the Go X.509 library couldn’t handle, but otherwise the conversion worked as expected. Go versions from 1.6 onwards shouldn’t produce this warning because they can handle certificates with negative serial numbers.

Key and Certificate Management
Most users turn to OpenSSL because they wish to configure and run a web server that supports SSL. That process consists of three steps: (1) generate a strong private key, (2) create a Certificate Signing Request (CSR) and send it to a CA, and (3) install the CA-provided certificate in your web server. These steps (and a few others) are covered in this section.

Key Generation
The first step in preparing for the use of public encryption is to generate a private key. Before you begin, you must make several decisions:

Key algorithm
OpenSSL supports RSA, DSA, and ECDSA keys, but not all types are practical for use in all scenarios. For example, for web server keys everyone uses RSA, because DSA keys are effectively limited to 1,024 bits (Internet Explorer doesn’t support anything stronger) and ECDSA keys are yet to be widely supported by CAs. For SSH, DSA and RSA are widely used, whereas ECDSA might not be supported by all clients.

Key size
The default key sizes might not be secure, which is why you should always explicitly configure key size. For example, the default for RSA keys is only 512 bits, which is simply insecure. If you used a 512-bit key on your server today, an intruder could take your certificate and use brute force to recover your private key, after which he or she could impersonate your web site. Today, 2,048-bit RSA keys are considered secure, and that’s what you should use. Aim also to use 2,048 bits for DSA keys and at least 256 bits for ECDSA.

Passphrase
Using a passphrase with a key is optional, but strongly recommended. Protected keys can be safely stored, transported, and backed up. On the other hand, such keys are inconvenient, because they can’t be used without their passphrases. For example, you might be asked to enter the passphrase every time you wish to restart your web server. For most, this is either too inconvenient or has unacceptable availability implications. In addition, using protected keys in production does not actually increase the security much, if at all. This is because, once activated, private keys are kept unprotected in program memory; an attacker who can get to the server can get the keys from there with just a little more effort. Thus, passphrases should be viewed only as a mechanism for protecting private keys when they are not installed on production systems. In other words, it’s all right to keep passphrases on production systems, next to the keys. If you need better security in production, you should invest in a hardware solution.7

To generate an RSA key, use the genrsa command:

$ openssl genrsa -aes128 -out fd.key 2048
Generating RSA private key, 2048 bit long modulus
....+++
...................................................................................+++
e is 65537 (0x10001)
Enter pass phrase for fd.key: ****************
Verifying - Enter pass phrase for fd.key: ****************
Here, I specified that the key be protected with AES-128. You can also use AES-192 or AES-256 (switches -aes192 and -aes256, respectively), but it’s best to stay away from the other algorithms (DES, 3DES, and SEED).

Warning
The e value that you see in the output refers to the public exponent, which is set to 65,537 by default. This is what’s known as a short public exponent, and it significantly improves the performance of RSA verification. Using the -3 switch, you can choose 3 as your public exponent and make verification even faster. However, there are some unpleasant historical weaknesses associated with the use of 3 as a public exponent, which is why generally everyone recommends that you stick with 65,537. The latter choice provides a safety margin that’s been proven effective in the past.

Private keys are stored in the so-called PEM format, which is just text:

$ cat fd.key
-----BEGIN RSA PRIVATE KEY-----
Proc-Type: 4,ENCRYPTED
DEK-Info: AES-128-CBC,01EC21976A463CE36E9DB59FF6AF689A

vERmFJzsLeAEDqWdXX4rNwogJp+y95uTnw+bOjWRw1+O1qgGqxQXPtH3LWDUz1Ym
mkpxmIwlSidVSUuUrrUzIL+V21EJ1W9iQ71SJoPOyzX7dYX5GCAwQm9Tsb40FhV/
[21 lines removed...]
4phGTprEnEwrffRnYrt7khQwrJhNsw6TTtthMhx/UCJdpQdaLW/TuylaJMWL1JRW
i321s5me5ej6Pr4fGccNOe7lZK+563d7v5znAx+Wo1C+F7YgF+g8LOQ8emC+6AVV
-----END RSA PRIVATE KEY-----
A private key isn’t just a blob of random data, even though that’s what it looks like at a glance. You can see a key’s structure using the following rsa command:

$ openssl rsa -text -in fd.key
Enter pass phrase for fd.key: ****************
Private-Key: (2048 bit)
modulus:
    00:9e:57:1c:c1:0f:45:47:22:58:1c:cf:2c:14:db:
    [...]
publicExponent: 65537 (0x10001)
privateExponent:
    1a:12:ee:41:3c:6a:84:14:3b:be:42:bf:57:8f:dc:
    [...]
prime1:
    00:c9:7e:82:e4:74:69:20:ab:80:15:99:7d:5e:49:
    [...]
prime2:
    00:c9:2c:30:95:3e:cc:a4:07:88:33:32:a5:b1:d7:
    [...]
exponent1:
    68:f4:5e:07:d3:df:42:a6:32:84:8d:bb:f0:d6:36:
    [...]
exponent2:
    5e:b8:00:b3:f4:9a:93:cc:bc:13:27:10:9e:f8:7e:
    [...]
coefficient:
    34:28:cf:72:e5:3f:52:b2:dd:44:56:84:ac:19:00:
    [...]
writing RSA key
-----BEGIN RSA PRIVATE KEY-----
[...]
-----END RSA PRIVATE KEY-----
If you need to have just the public part of a key separately, you can do that with the following rsa command:

$ openssl rsa -in fd.key -pubout -out fd-public.key
Enter pass phrase for fd.key: ****************
If you look into the newly generated file, you’ll see that the markers clearly indicate that the contained information is indeed public:

$ cat fd-public.key
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnlccwQ9FRyJYHM8sFNsY
PUHJHJzhJdwcS7kBptutf/L6OvoEAzCVHi/m0qAA4QM5BziZgnvv+FNnE3sgE5pz
iovEHJ3C959mNQmpvnedXwfcOIlbrNqdISJiP0js6mDCzYjSO1NCQoy3UpYwvwj7
0ryR1F+abARehlts/Xs/PtX3VamrljiJN6JNgFICy3ZvEhLZEKxR7oob7TnyZDrj
IHxBbqPNzeiqLCFLFPGgJPa0cH8DdovBTesvu7wr/ecsf8CYyUCdEwGkZh9DKtdU
HFa9H8tWW2mX6uwYeHCnf2HTw0E8vjtOb8oYQxlQxtL7dpFyMgrpPOoOVkZZW/P0
NQIDAQAB
-----END PUBLIC KEY-----
It’s good practice to verify that the output contains what you’re expecting. For example, if you forget to include the -pubout switch on the command line, the output will contain your private key instead of the public key.

DSA key generation is a two-step process: DSA parameters are created in the first step and the key in the second. Rather than execute the steps one at a time, I tend to use the following two commands as one:

$ openssl dsaparam -genkey 2048 | openssl dsa -out dsa.key -aes128
Generating DSA parameters, 2048 bit long prime
This could take some time
[...]
read DSA key
writing DSA key
Enter PEM pass phrase: ****************
Verifying - Enter PEM pass phrase: ****************
This approach allows me to generate a password-protected key without leaving any temporary files (DSA parameters) and/or temporary keys on disk.

The process is similar for ECDSA keys, except that it isn’t possible to create keys of arbitrary sizes. Instead, for each key you select a named curve, which controls key size, but it controls other EC parameters as well. The following example creates a 256-bit ECDSA key using the secp256r1 named curve:

$ openssl ecparam -genkey -name secp256r1 | openssl ec -out ec.key -aes128
using curve name prime256v1 instead of secp256r1
read EC key
writing EC key
Enter PEM pass phrase: ****************
Verifying - Enter PEM pass phrase: ****************
OpenSSL supports many named curves (you can get a full list with the -list_curves switch), but, for web server keys, you’re limited to only two curves that are supported by all major browsers: secp256r1 (OpenSSL uses the name prime256v1) and secp384r1.

Note
If you’re using OpenSSL 1.0.2, you can save yourself time by always generating your keys using the genpkey command, which has been improved to support various key types and configuration parameters. It now represents a unified interface for key generation.

Creating Certificate Signing Requests
Once you have a private key, you can proceed to create a Certificate Signing Request (CSR). This is a formal request asking a CA to sign a certificate, and it contains the public key of the entity requesting the certificate and some information about the entity. This data will all be part of the certificate. A CSR is always signed with the private key corresponding to the public key it carries.

CSR creation is usually an interactive process during which you’ll be providing the elements of the certificate distinguished name. Read the instructions given by the openssl tool carefully; if you want a field to be empty, you must enter a single dot (.) on the line, rather than just hit Return. If you do the latter, OpenSSL will populate the corresponding CSR field with the default value. (This behavior doesn’t make any sense when used with the default OpenSSL configuration, which is what virtually everyone does. It does make sense once you realize you can actually change the defaults, either by modifying the OpenSSL configuration or by providing your own configuration files.)

$ openssl req -new -key fd.key -out fd.csr
Enter pass phrase for fd.key: ****************
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:GB
State or Province Name (full name) [Some-State]:.
Locality Name (eg, city) []:London
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Feisty Duck Ltd
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:www.feistyduck.com
Email Address []:webmaster@feistyduck.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
Note
According to Section 5.4.1 of RFC 2985,8 challenge password is an optional field that was intended for use during certificate revocation as a way of identifying the original entity that had requested the certificate. If entered, the password will be included verbatim in the CSR and communicated to the CA. It’s rare to find a CA that relies on this field; all instructions I’ve seen recommend leaving it alone. Having a challenge password does not increase the security of the CSR in any way. Further, this field should not be confused with the key passphrase, which is a separate feature.

After a CSR is generated, use it to sign your own certificate and/or send it to a public CA and ask it to sign the certificate. Both approaches are described in the following sections. But before you do that, it’s a good idea to double-check that the CSR is correct. Here’s how:

$ openssl req -text -in fd.csr -noout
Certificate Request:
    Data:
        Version: 0 (0x0)
        Subject: C=GB, L=London, O=Feisty Duck Ltd, CN=www.feistyduck.com↩
/emailAddress=webmaster@feistyduck.com
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (2048 bit)
                Modulus:
                    00:b7:fc:ca:1c:a6:c8:56:bb:a3:26:d1:df:e4:e3:
                    [16 more lines...]
                    d1:57
                Exponent: 65537 (0x10001)
        Attributes:
            a0:00
    Signature Algorithm: sha1WithRSAEncryption
         a7:43:56:b2:cf:ed:c7:24:3e:36:0f:6b:88:e9:49:03:a6:91:
         [13 more lines...]
         47:8b:e3:28
Creating CSRs from Existing Certificates
You can save yourself some typing if you’re renewing a certificate and don’t want to make any changes to the information presented in it. With the following command, you can create a brand-new CSR from an existing certificate:

$ openssl x509 -x509toreq -in fd.crt -out fd.csr -signkey fd.key
Note
Unless you’re using some form of public key pinning and wish to continue using the existing key, it’s best practice to generate a new key every time you apply for a new certificate. Key generation is quick and inexpensive and reduces your exposure.

Unattended CSR Generation
CSR generation doesn’t have to be interactive. Using a custom OpenSSL configuration file, you can both automate the process (as explained in this section) and do certain things that are not possible interactively (as discussed in subsequent sections).

For example, let’s say that we want to automate the generation of a CSR for www.feistyduck.com. We would start by creating a file fd.cnf with the following contents:

[req]
prompt = no
distinguished_name = dn
req_extensions = ext
input_password = PASSPHRASE

[dn]
CN = www.feistyduck.com
emailAddress = webmaster@feistyduck.com
O = Feisty Duck Ltd
L = London
C = GB

[ext]
subjectAltName = DNS:www.feistyduck.com,DNS:feistyduck.com
Now you can create the CSR directly from the command line:

$ openssl req -new -config fd.cnf -key fd.key -out fd.csr
Signing Your Own Certificates
If you’re installing a TLS server for your own use, you probably don’t want to go to a CA for a publicly trusted certificate. It’s much easier just to use a self-signed certificate. If you’re a Firefox user, on your first visit to the web site you can create a certificate exception, after which the site will be as secure as if it were protected with a publicly trusted certificate.

If you already have a CSR, create a certificate using the following command:

$ openssl x509 -req -days 365 -in fd.csr -signkey fd.key -out fd.crt
Signature ok
subject=/CN=www.feistyduck.com/emailAddress=webmaster@feistyduck.com/O=Feisty Duck Ltd↩
/L=London/C=GB
Getting Private key
Enter pass phrase for fd.key: ****************
You don’t actually have to create a CSR in a separate step. The following command creates a self-signed certificate starting with a key alone:

$ openssl req -new -x509 -days 365 -key fd.key -out fd.crt
If you don’t wish to be asked any questions, use the -subj switch to provide the certificate subject information on the command line:

$ openssl req -new -x509 -days 365 -key fd.key -out fd.crt \
 -subj "/C=GB/L=London/O=Feisty Duck Ltd/CN=www.feistyduck.com"
Creating Certificates Valid for Multiple Hostnames
By default, certificates produced by OpenSSL have only one common name and are valid for only one hostname. Because of this, even if you have related web sites, you are forced to use a separate certificate for each site. In this situation, using a single multidomain certificate makes much more sense. Further, even when you’re running a single web site, you need to ensure that the certificate is valid for all possible paths that end users can take to reach it. In practice, this means using at least two names, one with the www prefix and one without (e.g., www.feistyduck.com and feistyduck.com).

There are two mechanisms for supporting multiple hostnames in a certificate. The first is to list all desired hostnames using an X.509 extension called Subject Alternative Name (SAN). The second is to use wildcards. You can also use a combination of the two approaches when it’s more convenient. In practice, for most sites, you can specify a bare domain name and a wildcard to cover all the subdomains (e.g., feistyduck.com and *.feistyduck.com).

Warning
When a certificate contains alternative names, all common names are ignored. Newer certificates produced by CAs may not even include any common names. For that reason, include all desired hostnames on the alternative names list.

First, place the extension information in a separate text file. I’m going to call it fd.ext. In the file, specify the name of the extension (subjectAltName) and list the desired hostnames, as in the following example:

subjectAltName = DNS:*.feistyduck.com, DNS:feistyduck.com
Then, when using the x509 command to issue a certificate, refer to the file using the -﻿extfile switch:

$ openssl x509 -req -days 365 \
-in fd.csr -signkey fd.key -out fd.crt \
-extfile fd.ext
The rest of the process is no different from before. But when you examine the generated certificate afterward, you’ll find that it contains the SAN extension:

 X509v3 extensions:
            X509v3 Subject Alternative Name:
                DNS:*.feistyduck.com, DNS:feistyduck.com
Examining Certificates
Certificates might look a lot like random data at first glance, but they contain a great deal of information; you just need to know how to unpack it. The x509 command does just that, so use it to look at the self-signed certificates you generated.

In the following example, I use the -text switch to print certificate contents and -noout to reduce clutter by not printing the encoded certificate itself (which is the default behavior):

$ openssl x509 -text -in fd.crt -noout
Certificate:
    Data:
        Version: 1 (0x0)
        Serial Number: 13073330765974645413 (0xb56dcd10f11aaaa5)
    Signature Algorithm: sha1WithRSAEncryption
        Issuer: CN=www.feistyduck.com/emailAddress=webmaster@feistyduck.com, O=Feisty ↩
Duck Ltd, L=London, C=GB
        Validity
            Not Before: Jun  4 17:57:34 2012 GMT
            Not After : Jun  4 17:57:34 2013 GMT
        Subject: CN=www.feistyduck.com/emailAddress=webmaster@feistyduck.com, O=Feisty ↩
Duck Ltd, L=London, C=GB
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (2048 bit)
                Modulus:
                    00:b7:fc:ca:1c:a6:c8:56:bb:a3:26:d1:df:e4:e3:
                    [16 more lines...]
                    d1:57
                Exponent: 65537 (0x10001)
    Signature Algorithm: sha1WithRSAEncryption
         49:70:70:41:6a:03:0f:88:1a:14:69:24:03:6a:49:10:83:20:
         [13 more lines...]
         74:a1:11:86
Self-signed certificates usually contain only the most basic certificate data, as seen in the previous example. By comparison, certificates issued by public CAs are much more interesting, as they contain a number of additional fields (via the X.509 extension mechanism). Let’s go over them quickly.

The Basic Constraints extension is used to mark certificates as belonging to a CA, giving them the ability to sign other certificates. Non-CA certificates will either have this extension omitted or will have the value of CA set to FALSE. This extension is critical, which means that all software-consuming certificates must understand its meaning.

X509v3 Basic Constraints: critical
    CA:FALSE
The Key Usage (KU) and Extended Key Usage (EKU) extensions restrict what a certificate can be used for. If these extensions are present, then only the listed uses are allowed. If the extensions are not present, there are no use restrictions. What you see in this example is typical for a web server certificate, which, for example, does not allow for code signing:

X509v3 Key Usage: critical
    Digital Signature, Key Encipherment
X509v3 Extended Key Usage:
    TLS Web Server Authentication, TLS Web Client Authentication
The CRL Distribution Points extension lists the addresses where the CA’s Certificate Revocation List (CRL) information can be found. This information is important in cases in which certificates need to be revoked. CRLs are CA-signed lists of revoked certificates, published at regular time intervals (e.g., seven days).

X509v3 CRL Distribution Points:
    Full Name:
      URI:http://crl.starfieldtech.com/sfs3-20.crl
Note
You might have noticed that the CRL location doesn’t use a secure server, and you might be wondering if the link is thus insecure. It is not. Because each CRL is signed by the CA that issued it, browsers are able to verify its integrity. In fact, if CRLs were distributed over TLS, browsers might face a chicken-and-egg problem in which they want to verify the revocation status of the certificate used by the server delivering the CRL itself!

The Certificate Policies extension is used to indicate the policy under which the certificate was issued. For example, this is where extended validation (EV) indicators can be found (as in the example that follows). The indicators are in the form of unique object identifiers (OIDs), and they are unique to the issuing CA. In addition, this extension often contains one or more Certificate Policy Statement (CPS) points, which are usually web pages or PDF documents.

X509v3 Certificate Policies:
    Policy: 2.16.840.1.114414.1.7.23.3
    CPS: http://certificates.starfieldtech.com/repository/
The Authority Information Access (AIA) extension usually contains two important pieces of information. First, it lists the address of the CA’s Online Certificate Status Protocol (OCSP) responder, which can be used to check for certificate revocation in real time. The extension may also contain a link to where the issuer’s certificate (the next certificate in the chain) can be found. These days, server certificates are rarely signed directly by trusted root certificates, which means that users must include one or more intermediate certificates in their configuration. Mistakes are easy to make and will invalidate the certificates. Some clients (e.g., Internet Explorer) will use the information provided in this extension to fix an incomplete certificate chain, but many clients won’t.

Authority Information Access:
    OCSP - URI:http://ocsp.starfieldtech.com/
    CA Issuers - URI:http://certificates.starfieldtech.com/repository/sf↩
_intermediate.crt
The Subject Key Identifier and Authority Key Identifier extensions establish unique subject and authority key identifiers, respectively. The value specified in the Authority Key Identifier extension of a certificate must match the value specified in the Subject Key Identifier extension in the issuing certificate. This information is very useful during the certification path-building process, in which a client is trying to find all possible paths from a leaf (server) certificate to a trusted root. Certification authorities will often use one private key with more than one certificate, and this field allows software to reliably identify which certificate can be matched to which key. In the real world, many certificate chains supplied by servers are invalid, but that fact often goes unnoticed because browsers are able to find alternative trust paths.

X509v3 Subject Key Identifier:
    4A:AB:1C:C3:D3:4E:F7:5B:2B:59:71:AA:20:63:D6:C9:40:FB:14:F1
X509v3 Authority Key Identifier:
    keyid:49:4B:52:27:D1:1B:BC:F2:A1:21:6A:62:7B:51:42:7A:8A:D7:D5:56
Finally, the Subject Alternative Name extension is used to list all the hostnames for which the certificate is valid. This extension used to be optional; if it isn’t present, clients fall back to using the information provided in the Common Name (CN), which is part of the Subject field. If the extension is present, then the content of the CN field is ignored during validation.

X509v3 Subject Alternative Name:
    DNS:www.feistyduck.com, DNS:feistyduck.com
Key and Certificate Conversion
Private keys and certificates can be stored in a variety of formats, which means that you’ll often need to convert them from one format to another. The most common formats are:

Binary (DER) certificate
Contains an X.509 certificate in its raw form, using DER ASN.1 encoding.

ASCII (PEM) certificate(s)
Contains a base64-encoded DER certificate, with -----BEGIN CERTIFICATE----- used as the header and -----END CERTIFICATE----- as the footer. Usually seen with only one certificate per file, although some programs allow more than one certificate depending on the context. For example, older Apache web server versions require the server certificate to be alone in one file, with all intermediate certificates together in another.

Binary (DER) key
Contains a private key in its raw form, using DER ASN.1 encoding. OpenSSL creates keys in its own traditional (SSLeay) format. There’s also an alternative format called PKCS#8 (defined in RFC 5208), but it’s not widely used. OpenSSL can convert to and from PKCS#8 format using the pkcs8 command.

ASCII (PEM) key
Contains a base64-encoded DER key, sometimes with additional metadata (e.g., the algorithm used for password protection).

PKCS#7 certificate(s)
A complex format designed for the transport of signed or encrypted data, defined in RFC 2315. It’s usually seen with .p7b and .p7c extensions and can include the entire certificate chain as needed. This format is supported by Java’s keytool utility.

PKCS#12 (PFX) key and certificate(s)
A complex format that can store and protect a server key along with an entire certificate chain. It’s commonly seen with .p12 and .pfx extensions. This format is commonly used in Microsoft products, but is also used for client certificates. These days, the PFX name is used as a synonym for PKCS#12, even though PFX referred to a different format a long time ago (an early version of PKCS#12). It’s unlikely that you’ll encounter the old version anywhere.

PEM and DER Conversion
Certificate conversion between PEM and DER formats is performed with the x509 tool. To convert a certificate from PEM to DER format:

$ openssl x509 -inform PEM -in fd.pem -outform DER -out fd.der
To convert a certificate from DER to PEM format:

$ openssl x509 -inform DER -in fd.der -outform PEM -out fd.pem
The syntax is identical if you need to convert private keys between DER and PEM formats, but different commands are used: rsa for RSA keys, and dsa for DSA keys.

PKCS#12 (PFX) Conversion
One command is all that’s needed to convert the key and certificates in PEM format to PKCS#12. The following example converts a key (fd.key), certificate (fd.crt), and intermediate certificates (fd-chain.crt) into an equivalent single PKCS#12 file:

$ openssl pkcs12 -export \
    -name "My Certificate" \
    -out fd.p12 \
    -inkey fd.key \
    -in fd.crt \
    -certfile fd-chain.crt
Enter Export Password: ****************
Verifying - Enter Export Password: ****************
The reverse conversion isn’t as straightforward. You can use a single command, but in that case you’ll get the entire contents in a single file:

$ openssl pkcs12 -in fd.p12 -out fd.pem -nodes
Now, you must open the file fd.pem in your favorite editor and manually split it into individual key, certificate, and intermediate certificate files. While you’re doing that, you’ll notice additional content provided before each component. For example:

Bag Attributes
    localKeyID: E3 11 E4 F1 2C ED 11 66 41 1B B8 83 35 D2 DD 07 FC DE 28 76
subject=/1.3.6.1.4.1.311.60.2.1.3=GB/2.5.4.15=Private Organization/serialNumber=06694169↩
/C=GB/ST=London/L=London/O=Feisty Duck Ltd/CN=www.feistyduck.com
issuer=/C=US/ST=Arizona/L=Scottsdale/O=Starfield Technologies, Inc./OU=http:/↩
/certificates.starfieldtech.com/repository/CN=Starfield Secure Certification Authority
-----BEGIN CERTIFICATE-----
MIIF5zCCBM+gAwIBAgIHBG9JXlv9vTANBgkqhkiG9w0BAQUFADCB3DELMAkGA1UE
BhMCVVMxEDAOBgNVBAgTB0FyaXpvbmExEzARBgNVBAcTClNjb3R0c2RhbGUxJTAj
[...]
This additional metadata is very handy to quickly identify the certificates. Obviously, you should ensure that the main certificate file contains the leaf server certificate and not something else. Further, you should also ensure that the intermediate certificates are provided in the correct order, with the issuing certificate following the signed one. If you see a self-signed root certificate, feel free to delete it or store it elsewhere; it shouldn’t go into the chain.

Warning
The final conversion output shouldn’t contain anything apart from the encoded key and certificates. Although some tools are smart enough to ignore what isn’t needed, other tools are not. Leaving extra data in PEM files might result in problems that are difficult to troubleshoot.

It’s possible to get OpenSSL to split the components for you, but doing so requires multiple invocations of the pkcs12 command (including typing the bundle password each time):

$ openssl pkcs12 -in fd.p12 -nocerts -out fd.key -nodes
$ openssl pkcs12 -in fd.p12 -nokeys -clcerts -out fd.crt
$ openssl pkcs12 -in fd.p12 -nokeys -cacerts -out fd-chain.crt
This approach won’t save you much work. You must still examine each file to ensure that it contains the correct contents and to remove the metadata.

PKCS#7 Conversion
To convert from PEM to PKCS#7, use the crl2pkcs7 command:

$ openssl crl2pkcs7 -nocrl -out fd.p7b -certfile fd.crt -certfile fd-chain.crt
To convert from PKCS#7 to PEM, use the pkcs7 command with the -print_certs switch:

openssl pkcs7 -in fd.p7b -print_certs -out fd.pem
Similar to the conversion from PKCS#12, you must now edit the fd.pem file to clean it up and split it into the desired components.

Configuration
In this section, I discuss two topics relevant for TLS deployment. The first is cipher suite configuration, in which you specify which of the many suites available in TLS you wish to use for communication. This topic is important because virtually every program that uses OpenSSL reuses its suite configuration mechanism. That means that once you learn how to configure cipher suites for one program, you can reuse the same knowledge elsewhere. The second topic is the performance measurement of raw crypto operations.

Cipher Suite Selection
A common task in TLS server configuration is selecting which cipher suites are going to be supported. To communicate securely, TLS needs to decide exactly which cryptographic primitives to use to achieve its goals (e.g, confidentiality). This is done by selecting a suitable cipher suite, which makes a series of decisions about how authentication, key exchange, encryption, and other operations are done. Programs that rely on OpenSSL usually adopt the same approach to suite configuration as OpenSSL does, simply passing through the configuration options. For example, in Apache httpd, the cipher suite configuration may look like this:

SSLHonorCipherOrder On  
SSLCipherSuite "HIGH:!aNULL:@STRENGTH"
The first line controls cipher suite prioritization (and configures httpd to actively select suites). The second line controls which suites will be supported.

Coming up with a good suite configuration can be pretty time consuming, and there are a lot of details to consider. The best approach is to use the OpenSSL ciphers command to determine which suites are enabled with a particular configuration string.

Obtaining the List of Supported Suites
Before you do anything else, you should determine which suites are supported by your OpenSSL installation. To do this, invoke the ciphers command with the switch -v and the parameter ALL:COMPLEMENTOFALL (clearly, ALL does not actually mean “all”):

$ openssl ciphers -v 'ALL:COMPLEMENTOFALL'
ECDHE-RSA-AES256-GCM-SHA384    TLSv1.2 Kx=ECDH Au=RSA   Enc=AESGCM(256) Mac=AEAD
ECDHE-ECDSA-AES256-GCM-SHA384  TLSv1.2 Kx=ECDH Au=ECDSA Enc=AESGCM(256) Mac=AEAD
ECDHE-RSA-AES256-SHA384        TLSv1.2 Kx=ECDH Au=RSA   Enc=AES(256)    Mac=SHA384
ECDHE-ECDSA-AES256-SHA384      TLSv1.2 Kx=ECDH Au=ECDSA Enc=AES(256)    Mac=SHA384
ECDHE-RSA-AES256-SHA           SSLv3   Kx=ECDH Au=RSA   Enc=AES(256)    Mac=SHA1
[106 more lines...]
Tip
If you’re using OpenSSL 1.0.0 or later, you can also use the uppercase -V switch to request extra-verbose output. In this mode, the output will also contain suite IDs, which are always handy to have. For example, OpenSSL does not always use the RFC names for the suites; in such cases, you must use the IDs to cross-check.

In my case, there were 111 suites in the output. Each line contains information on one suite and the following information:

Suite name

Required minimum protocol version

Key exchange algorithm

Authentication algorithm

Cipher algorithm and strength

MAC (integrity) algorithm

Export suite indicator

If you change the ciphers parameter to something other than ALL:COMPLEMENTOFALL, OpenSSL will list only the suites that match that configuration. For example, you can ask it to list only cipher suites that are based on RC4, as follows:

$ openssl ciphers -v 'RC4'
ECDHE-RSA-RC4-SHA    SSLv3 Kx=ECDH       Au=RSA   Enc=RC4(128) Mac=SHA1
ECDHE-ECDSA-RC4-SHA  SSLv3 Kx=ECDH       Au=ECDSA Enc=RC4(128) Mac=SHA1
AECDH-RC4-SHA        SSLv3 Kx=ECDH       Au=None  Enc=RC4(128) Mac=SHA1
ADH-RC4-MD5          SSLv3 Kx=DH         Au=None  Enc=RC4(128) Mac=MD5
ECDH-RSA-RC4-SHA     SSLv3 Kx=ECDH/RSA   Au=ECDH  Enc=RC4(128) Mac=SHA1
ECDH-ECDSA-RC4-SHA   SSLv3 Kx=ECDH/ECDSA Au=ECDH  Enc=RC4(128) Mac=SHA1
RC4-SHA              SSLv3 Kx=RSA        Au=RSA   Enc=RC4(128) Mac=SHA1
RC4-MD5              SSLv3 Kx=RSA        Au=RSA   Enc=RC4(128) Mac=MD5
PSK-RC4-SHA          SSLv3 Kx=PSK        Au=PSK   Enc=RC4(128) Mac=SHA1
EXP-ADH-RC4-MD5      SSLv3 Kx=DH(512)    Au=None  Enc=RC4(40)  Mac=MD5  export
EXP-RC4-MD5          SSLv3 Kx=RSA(512)   Au=RSA   Enc=RC4(40)  Mac=MD5  export
The output will contain all suites that match your requirements, even if they’re insecure. Clearly, you should choose your configuration strings carefully in order to activate only what’s secure. Further, the order in which suites appear in the output matters. When you configure your TLS server to actively select the cipher suite that will be used for a connection (which is the best practice and should always be done), the suites listed first are given priority.

Keywords
Cipher suite keywords are the basic building blocks of cipher suite configuration. Each suite name (e.g., RC4-SHA) is a keyword that selects exactly one suite. All other keywords select groups of suites according to some criteria. Keyword names are case-sensitive. Normally, I might direct you to the OpenSSL documentation for a comprehensive list of keywords, but it turns out that the ciphers documentation is not up to date; it’s missing some more recent additions. For that reason, I’ll try to document all the keywords in this section.

Group keywords are shortcuts that select frequently used cipher suites. For example, HIGH will select only very strong cipher suites.

Table 1.1. Group keywords

Keyword	Meaning
DEFAULT	The default cipher list. This is determined at compile time and, as of OpenSSL 1.0.0, is normally ALL:!aNULL:!eNULL. This must be the first cipher string specified.
COMPLEMENTOFDEFAULT	The ciphers included in ALL, but not enabled by default. Currently, this is ADH. Note that this rule does not cover eNULL, which is not included by ALL (use COMPLEMENTOFALL if necessary).
ALL	All cipher suites except the eNULL ciphers, which must be explicitly enabled.
COMPLEMENTOFALL	The cipher suites not enabled by ALL, currently eNULL.
HIGH	“High”-encryption cipher suites. This currently means those with key lengths larger than 128 bits, and some cipher suites with 128-bit keys.
MEDIUM	“Medium”-encryption cipher suites, currently some of those using 128-bit encryption.
LOW	“Low”-encryption cipher suites, currently those using 64- or 56-bit encryption algorithms, but excluding export cipher suites. Insecure.
EXP, EXPORT	Export encryption algorithms. Including 40- and 56-bit algorithms. Insecure.
EXPORT40	40-bit export encryption algorithms. Insecure.
EXPORT56	56-bit export encryption algorithms. Insecure.
TLSv1, SSLv3, SSLv2	TLS 1.0, SSL 3, or SSL 2 cipher suites, respectively.
Digest keywords select suites that use a particular digest algorithm. For example, MD5 selects all suites that rely on MD5 for integrity validation.

Table 1.2. Digest algorithm keywords

Keyword	Meaning
MD5	Cipher suites using MD5. Obsolete and insecure.
SHA, SHA1	Cipher suites using SHA1.
SHA256 (v1.0.0+)	Cipher suites using SHA256.
SHA384 (v1.0.0+)	Cipher suites using SHA384.
Note
The digest algorithm keywords select only suites that validate data integrity at the protocol level. TLS 1.2 introduced support for authenticated encryption, which is a mechanism that bundles encryption with integrity validation. When the so-called AEAD (Authenticated Encryption with Associated Data) suites are used, the protocol doesn’t need to provide additional integrity verification. For this reason, you won’t be able to use the digest algorithm keywords to select AEAD suites (currently, those that have GCM in the name). The names of these suites do use SHA256 and SHA384 suffixes, but (confusing as it may be) here they refer to the hash functions used to build the pseudorandom function used with the suite.

Authentication keywords select suites based on the authentication method they use. Today, virtually all public certificates use RSA for authentication. Over time, we will probably see a very slow rise in the use of Elliptic Curve (ECDSA) certificates.

Table 1.3. Authentication keywords

Keyword	Meaning
aDH	Cipher suites effectively using DH authentication, i.e., the certificates carry DH keys. (v1.0.2+)
aDSS, DSS	Cipher suites using DSS authentication, i.e., the certificates carry DSS keys.
aECDH (v1.0.0+)	Cipher suites that use ECDH authentication.
aECDSA (v1.0.0+)	Cipher suites that use ECDSA authentication.
aNULL	Cipher suites offering no authentication. This is currently the anonymous DH algorithms. Insecure.
aRSA	Cipher suites using RSA authentication, i.e., the certificates carry RSA keys.
PSK	Cipher suites using PSK (Pre-Shared Key) authentication.
SRP	Cipher suites using SRP (Secure Remote Password) authentication.
Key exchange keywords select suites based on the key exchange algorithm. When it comes to ephemeral Diffie-Hellman suites, OpenSSL is inconsistent in naming the suites and the keywords. In the suite names, ephemeral suites tend to have an E at the end of the key exchange algorithm (e.g., ECDHE-RSA-RC4-SHA and DHE-RSA-AES256-SHA), but in the keywords the E is at the beginning (e.g., EECDH and EDH). To make things worse, some older suites do have E at the beginning of the key exchange algorithm (e.g., EDH-RSA-DES-CBC-SHA).

Table 1.4. Key exchange keywords

Keyword	Meaning
ADH	Anonymous DH cipher suites. Insecure.
AECDH (v1.0.0+)	Anonymous ECDH cipher suites. Insecure.
DH	Cipher suites using DH (includes ephemeral and anonymous DH).
ECDH (v1.0.0+)	Cipher suites using ECDH (includes ephemeral and anonymous ECDH).
EDH (v1.0.0+)	Cipher suites using ephemeral DH key agreement.
EECDH (v1.0.0+)	Cipher suites using ephemeral ECDH.
kECDH (v1.0.0+)	Cipher suites using ECDH key agreement.
kEDH	Cipher suites using ephemeral DH key agreements (includes anonymous DH).
kEECDH (v1.0.0+)	Cipher suites using ephemeral ECDH key agreement (includes anonymous ECDH).
kRSA, RSA	Cipher suites using RSA key exchange.
Cipher keywords select suites based on the cipher they use.

Table 1.5. Cipher keywords

Keyword	Meaning
3DES	Cipher suites using triple DES. Obsolete and insecure.
AES	Cipher suites using AES.
AESGCM (v1.0.0+)	Cipher suites using AES GCM.
CAMELLIA	Cipher suites using Camellia. Obsolete.
DES	Cipher suites using single DES. Obsolete and insecure.
eNULL, NULL	Cipher suites that don’t use encryption. Insecure.
IDEA	Cipher suites using IDEA. Obsolete.
RC2	Cipher suites using RC2. Obsolete and insecure.
RC4	Cipher suites using RC4. Insecure.
SEED	Cipher suites using SEED. Obsolete.
What remains is a number of suites that do not fit into any other category. The bulk of them are related to the GOST standards, which are relevant for the countries that are part of the Commonwealth of Independent States, formed after the breakup of the Soviet Union.

Table 1.6. Miscellaneous keywords

Keyword	Meaning
@STRENGTH	Sorts the current cipher suite list in order of encryption algorithm key length.
aGOST	Cipher suites using GOST R 34.10 (either 2001 or 94) for authentication. Requires a GOST-capable engine.
aGOST01	Cipher suites using GOST R 34.10-2001 authentication.
aGOST94	Cipher suites using GOST R 34.10-94 authentication. Obsolete. Use GOST R 34.10-2001 instead.
kGOST	Cipher suites using VKO 34.10 key exchange, specified in RFC 4357.
GOST94	Cipher suites using HMAC based on GOST R 34.11-94.
GOST89MAC	Cipher suites using GOST 28147-89 MAC instead of HMAC.
Combining Keywords
In most cases, you’ll use keywords by themselves, but it’s also possible to combine them to select only suites that meet several requirements, by connecting two or more keywords with the + character. In the following example, we select suites that use RC4 and SHA:

$ openssl ciphers -v 'RC4+SHA'
ECDHE-RSA-RC4-SHA    SSLv3 Kx=ECDH       Au=RSA   Enc=RC4(128) Mac=SHA1
ECDHE-ECDSA-RC4-SHA  SSLv3 Kx=ECDH       Au=ECDSA Enc=RC4(128) Mac=SHA1
AECDH-RC4-SHA        SSLv3 Kx=ECDH       Au=None  Enc=RC4(128) Mac=SHA1
ECDH-RSA-RC4-SHA     SSLv3 Kx=ECDH/RSA   Au=ECDH  Enc=RC4(128) Mac=SHA1
ECDH-ECDSA-RC4-SHA   SSLv3 Kx=ECDH/ECDSA Au=ECDH  Enc=RC4(128) Mac=SHA1
RC4-SHA              SSLv3 Kx=RSA        Au=RSA   Enc=RC4(128) Mac=SHA1
PSK-RC4-SHA          SSLv3 Kx=PSK        Au=PSK   Enc=RC4(128) Mac=SHA1
Building Cipher Suite Lists
The key concept in building a cipher suite configuration is that of the current suite list. The list always starts empty, without any suites, but every keyword that you add to the configuration string will change the list in some way. By default, new suites are appended to the list. For example, to choose all suites that use RC4 and AES ciphers:

$ openssl ciphers -v 'RC4:AES'
The colon character is commonly used to separate keywords, but spaces and commas are equally acceptable. The following command produces the same output as the previous example:

$ openssl ciphers -v 'RC4 AES'
Keyword Modifiers
Keyword modifiers are characters you can place at the beginning of each keyword in order to change the default action (adding to the list) to something else. The following actions are supported:

Append
Add suites to the end of the list. If any of the suites are already on the list, they will remain in their present position. This is the default action, which is invoked when there is no modifier in front of the keyword.

Delete (-)
Remove all matching suites from the list, potentially allowing some other keyword to reintroduce them later.

Permanently delete (!)
Remove all matching suites from the list and prevent them from being added later by another keyword. This modifier is useful to specify all the suites you never want to use, making further selection easier and preventing mistakes.

Move to the end (+)
Move all matching suites to the end of the list. Works only on existing suites; never adds new suites to the list. This modifier is useful if you want to keep some weaker suites enabled but prefer the stronger ones. For example, the string RC4:+MD5 enables all RC4 suites, but pushes the MD5-based ones to the end.

Sorting
The @STRENGTH keyword is unlike other keywords (I assume that’s why it has the @ in the name): It will not introduce or remove any suites, but it will sort them in order of descending cipher strength. Automatic sorting is an interesting idea, but it makes sense only in a perfect world in which cipher suites can actually be compared by cipher strength.

Take, for example, the following cipher suite configuration:

$ openssl ciphers -v 'DES-CBC-SHA DES-CBC3-SHA RC4-SHA AES256-SHA @STRENGTH'
AES256-SHA                     SSLv3   Kx=RSA  Au=RSA   Enc=AES(256)    Mac=SHA1
DES-CBC3-SHA                   SSLv3   Kx=RSA  Au=RSA   Enc=3DES(168)   Mac=SHA1
RC4-SHA                        SSLv3   Kx=RSA  Au=RSA   Enc=RC4(128)    Mac=SHA1
DES-CBC-SHA                    SSLv3   Kx=RSA  Au=RSA   Enc=DES(56)     Mac=SHA1
In theory, the output is sorted in order of strength. In practice, you’ll often want better control of the suite order:

For example, AES256-SHA (a CBC suite) is vulnerable to the BEAST attack when used with TLS 1.0 and earlier protocols. If you want to mitigate the BEAST attack server-side, you’ll prefer to prioritize the RC4-SHA suite, which isn’t vulnerable to this problem.

3DES is only nominally rated at 168 bits; a so-called meet-in-the-middle attack reduces its strength to 112 bits,9 and further issues make the strength as low as 108 bits.10 This fact makes DES-CBC3-SHA inferior to 128-bit cipher suites. Strictly speaking, treating 3DES as a 168-bit cipher is a bug in OpenSSL that has been fixed in the more recent releases.

Handling Errors
There are two types of errors you might experience while working on your configuration. The first is a result of a typo or an attempt to use a keyword that does not exist:

$ openssl ciphers -v '@HIGH'
Error in cipher list
140460843755168:error:140E6118:SSL routines:SSL_CIPHER_PROCESS_RULESTR:invalid ↩
command:ssl_ciph.c:1317:
The output is cryptic, but it does contain an error message.

Another possibility is that you end up with an empty list of cipher suites, in which case you might see something similar to the following:

$ openssl ciphers -v 'SHA512'
Error in cipher list
140202299557536:error:1410D0B9:SSL routines:SSL_CTX_set_cipher_list:no cipher match:ssl↩
_lib.c:1312:
Putting It All Together
To demonstrate how various cipher suite configuration features come together, I will present one complete real-life use case. Please bear in mind that what follows is just an example. Because there are usually many aspects to consider when deciding on the configuration, there isn’t such a thing as a single perfect configuration.

For that reason, before you can start to work on your configuration, you should have a clear idea of what you wish to achieve. In my case, I wish to have a reasonably secure and efficient configuration, which I define to mean the following:

Use only strong ciphers of 128 effective bits and up (this excludes 3DES).

Use only suites that provide strong authentication (this excludes anonymous and export suites).

Do not use any suites that rely on weak primitives (e.g., MD5).

Implement robust support for forward secrecy, no matter what keys and protocols are used. With this requirement comes a slight performance penalty, because I won’t be able to use the fast RSA key exchange. I’ll minimize the penalty by prioritizing ECDHE, which is substantially faster than DHE.

Prefer ECDSA over RSA. This requirement makes sense only in dual-key deployments, in which we want to use the faster ECDSA operations wherever possible, but fall back to RSA when talking to clients that do not yet support ECDSA.

With TLS 1.2 clients, prefer AES GCM suites, which provide the best security TLS can offer.

Because RC4 was recently found to be weaker than previously thought,11 we want to push it to the end of the list. That’s almost as good as disabling it. Although BEAST might still be a problem in some situations, I’ll assume that it’s been mitigated client-side.

Usually the best approach is to start by permanently eliminating all the components and suites that you don’t wish to use; this reduces clutter and ensures that the undesired suites aren’t introduced back into the configuration by mistake.

The weak suites can be identified with the following cipher strings:

aNULL; no authentication

eNULL; no encryption

LOW; low-strength suites

3DES; effective strength of 108 bits

MD5; suites that use MD5

EXP; obsolete export suites

To reduce the number of suites displayed, I’m going to eliminate all DSA, PSK, SRP, and ECDH suites, because they’re used only very rarely. I am also removing the IDEA and SEED ciphers, which are obsolete but might still be supported by OpenSSL. In my configuration, I won’t use CAMELLIA either, because it’s slower and not as well supported as AES (e.g., no GCM or ECDHE variants in practice).

!aNULL !eNULL !LOW !3DES !MD5 !EXP !DSS !PSK !SRP !kECDH !CAMELLIA !IDEA !SEED
Now we can focus on what we want to achieve. Because forward secrecy is our priority, we can start with the kEECDH and kEDH keywords:

kEECDH kEDH !aNULL !eNULL !LOW !3DES !MD5 !EXP !DSS !PSK !SRP !kECDH !CAMELLIA !IDEA ↩
!SEED
If you test this configuration, you’ll find that RSA suites are listed first, but I said I wanted ECDSA first:

ECDHE-RSA-AES256-GCM-SHA384    TLSv1.2 Kx=ECDH Au=RSA   Enc=AESGCM(256) Mac=AEAD
ECDHE-ECDSA-AES256-GCM-SHA384  TLSv1.2 Kx=ECDH Au=ECDSA Enc=AESGCM(256) Mac=AEAD
ECDHE-RSA-AES256-SHA384        TLSv1.2 Kx=ECDH Au=RSA   Enc=AES(256)    Mac=SHA384
ECDHE-ECDSA-AES256-SHA384      TLSv1.2 Kx=ECDH Au=ECDSA Enc=AES(256)    Mac=SHA384
ECDHE-RSA-AES256-SHA           SSLv3   Kx=ECDH Au=RSA   Enc=AES(256)    Mac=SHA1
ECDHE-ECDSA-AES256-SHA         SSLv3   Kx=ECDH Au=ECDSA Enc=AES(256)    Mac=SHA1
ECDHE-RSA-AES128-GCM-SHA256    TLSv1.2 Kx=ECDH Au=RSA   Enc=AESGCM(128) Mac=AEAD
[...]
In order to fix this, I’ll put ECDSA suites first, by placing kEECDH+ECDSA at the beginning of the configuration:

kEECDH+ECDSA kEECDH kEDH !aNULL !eNULL !LOW !3DES !MD5 !EXP !DSS !PSK !SRP !kECDH ↩
!CAMELLIA !IDEA !SEED
The next problem is that older suites (SSL 3) are mixed with newer suites (TLS 1.2). In order to maximize security, I want all TLS 1.2 clients to always negotiate TLS 1.2 suites. To push older suites to the end of the list, I’ll use the +SHA keyword (TLS 1.2 suites are all using either SHA256 or SHA384, so they won’t match):

kEECDH+ECDSA kEECDH kEDH +SHA !aNULL !eNULL !LOW !3DES !MD5 !EXP !DSS !PSK !SRP !kECDH ↩
!CAMELLIA !IDEA !SEED
At this point, I’m mostly done. I only need to add the remaining secure suites to the end of the list; the HIGH keyword will achieve this. In addition, I’m also going to make sure RC4 suites are last, using +RC4 (to push existing RC4 suites to the end of the list) and RC4 (to add to the list any remaining RC4 suites that are not already on it):

kEECDH+ECDSA kEECDH kEDH HIGH +SHA +RC4 RC4 !aNULL !eNULL !LOW !3DES !MD5 !EXP !DSS ↩
!PSK !SRP !kECDH !CAMELLIA !IDEA !SEED
Let’s examine the entire final output, which consists of 28 suites. In the first group are the TLS 1.2 suites:

ECDHE-ECDSA-AES256-GCM-SHA384  TLSv1.2 Kx=ECDH Au=ECDSA Enc=AESGCM(256) Mac=AEAD
ECDHE-ECDSA-AES256-SHA384      TLSv1.2 Kx=ECDH Au=ECDSA Enc=AES(256)    Mac=SHA384
ECDHE-ECDSA-AES128-GCM-SHA256  TLSv1.2 Kx=ECDH Au=ECDSA Enc=AESGCM(128) Mac=AEAD
ECDHE-ECDSA-AES128-SHA256      TLSv1.2 Kx=ECDH Au=ECDSA Enc=AES(128)    Mac=SHA256
ECDHE-RSA-AES256-GCM-SHA384    TLSv1.2 Kx=ECDH Au=RSA   Enc=AESGCM(256) Mac=AEAD
ECDHE-RSA-AES256-SHA384        TLSv1.2 Kx=ECDH Au=RSA   Enc=AES(256)    Mac=SHA384
ECDHE-RSA-AES128-GCM-SHA256    TLSv1.2 Kx=ECDH Au=RSA   Enc=AESGCM(128) Mac=AEAD
ECDHE-RSA-AES128-SHA256        TLSv1.2 Kx=ECDH Au=RSA   Enc=AES(128)    Mac=SHA256
DHE-RSA-AES256-GCM-SHA384      TLSv1.2 Kx=DH   Au=RSA   Enc=AESGCM(256) Mac=AEAD
DHE-RSA-AES256-SHA256          TLSv1.2 Kx=DH   Au=RSA   Enc=AES(256)    Mac=SHA256
DHE-RSA-AES128-GCM-SHA256      TLSv1.2 Kx=DH   Au=RSA   Enc=AESGCM(128) Mac=AEAD
DHE-RSA-AES128-SHA256          TLSv1.2 Kx=DH   Au=RSA   Enc=AES(128)    Mac=SHA256
AES256-GCM-SHA384              TLSv1.2 Kx=RSA  Au=RSA   Enc=AESGCM(256) Mac=AEAD
AES256-SHA256                  TLSv1.2 Kx=RSA  Au=RSA   Enc=AES(256)    Mac=SHA256
AES128-GCM-SHA256              TLSv1.2 Kx=RSA  Au=RSA   Enc=AESGCM(128) Mac=AEAD
AES128-SHA256                  TLSv1.2 Kx=RSA  Au=RSA   Enc=AES(128)    Mac=SHA256
ECDHE suites are first, followed by DHE suites, followed by all other TLS 1.2 suites. Within each group, ECDSA and GCM have priority.

In the second group are the suites that are going to be used by TLS 1.0 clients, using similar priorities as in the first group:

ECDHE-ECDSA-AES256-SHA         SSLv3   Kx=ECDH Au=ECDSA Enc=AES(256)    Mac=SHA1
ECDHE-ECDSA-AES128-SHA         SSLv3   Kx=ECDH Au=ECDSA Enc=AES(128)    Mac=SHA1
ECDHE-RSA-AES256-SHA           SSLv3   Kx=ECDH Au=RSA   Enc=AES(256)    Mac=SHA1
ECDHE-RSA-AES128-SHA           SSLv3   Kx=ECDH Au=RSA   Enc=AES(128)    Mac=SHA1
DHE-RSA-AES256-SHA             SSLv3   Kx=DH   Au=RSA   Enc=AES(256)    Mac=SHA1
DHE-RSA-AES128-SHA             SSLv3   Kx=DH   Au=RSA   Enc=AES(128)    Mac=SHA1
DHE-RSA-SEED-SHA               SSLv3   Kx=DH   Au=RSA   Enc=SEED(128  ) Mac=SHA1
AES256-SHA                     SSLv3   Kx=RSA  Au=RSA   Enc=AES(256)    Mac=SHA1
AES128-SHA                     SSLv3   Kx=RSA  Au=RSA   Enc=AES(128)    Mac=SHA1
Finally, the RC4 suites are at the end:

ECDHE-ECDSA-RC4-SHA            SSLv3   Kx=ECDH Au=ECDSA Enc=RC4(128)    Mac=SHA1
ECDHE-RSA-RC4-SHA              SSLv3   Kx=ECDH Au=RSA   Enc=RC4(128)    Mac=SHA1
RC4-SHA                        SSLv3   Kx=RSA  Au=RSA   Enc=RC4(128)    Mac=SHA1
Recommended Configuration
The configuration in the previous section was designed to use as an example of cipher suite configuration using OpenSSL suite keywords, but it’s not the best setup you could have. In fact, there isn’t any one configuration that will satisfy everyone. In this section, I’ll give you several configurations to choose from based on your preferences and risk assessment.

The design principles for all configurations here are essentially the same as those from the previous section, but I am going to make two changes to achieve better performance. First, I am going to put 128-bit suites on top of the list. Although 256-bit suites provide some increase in security, for most sites the increase is not meaningful and yet still comes with the performance penalty. Second, I am going to prefer HMAC-SHA over HMAC-SHA256 and HMAC-SHA384 suites. The latter two are much slower but also don’t provide a meaningful increase in security.

In addition, I am going to change my approach from configuring suites using keywords to using suite names directly. I think that keywords, conceptually, are not a bad idea: you specify your security requirements and the library does the rest, without you having to know a lot about the suites that are going to be used. Unfortunately, this approach no longer works well in practice, as we’ve become quite picky about what suites we wish to have enabled and in what order.

Using suite names in a configuration is also easier: you just list the suites you want to use. And, when you’re looking at someone’s configuration, you now know exactly what suites are used without having to run the settings through OpenSSL.

The following is my default starting configuration, designed to offer strong security as well as good performance:

ECDHE-ECDSA-AES128-GCM-SHA256
ECDHE-ECDSA-AES256-GCM-SHA384
ECDHE-ECDSA-AES128-SHA
ECDHE-ECDSA-AES256-SHA
ECDHE-ECDSA-AES128-SHA256
ECDHE-ECDSA-AES256-SHA384
ECDHE-RSA-AES128-GCM-SHA256
ECDHE-RSA-AES256-GCM-SHA384
ECDHE-RSA-AES128-SHA
ECDHE-RSA-AES256-SHA
ECDHE-RSA-AES128-SHA256
ECDHE-RSA-AES256-SHA384
DHE-RSA-AES128-GCM-SHA256
DHE-RSA-AES256-GCM-SHA384
DHE-RSA-AES128-SHA
DHE-RSA-AES256-SHA
DHE-RSA-AES128-SHA256
DHE-RSA-AES256-SHA256
Note
OpenSSL supports ChaCha20/Poly1305 suites starting with the 1.1.x branch.12 These authenticated suites (e.g., ECDHE-ECDSA-CHACHA20-POLY1305 and ECDHE-RSA-CHACHA20-POLY1305) provide strong security and an alternative to the AES suites. They are said to provide better performance for mobile users, but AES GCM suites are still faster on the modern desktop, where hardware acceleration is available. Place them at the top or just after your GCM suites, depending on how much of your audience uses mobile devices. At the time of writing, OpenSSL doesn’t yet support equal suite preference (like BoringSSL does, for example), which leaves it to the client to choose AES-GCM or ChaCha20 suites.

This configuration uses only suites that support forward secrecy and provide strong encryption. Most modern browsers and other clients will be able to connect, but some very old clients might not. As an example, older Internet Explorer versions running on Windows XP will fail.

If you really need to provide support for a very old range of clients—and only then—consider adding the following suites to the end of the list:

EDH-RSA-DES-CBC3-SHA
AES128-SHA
AES256-SHA
DES-CBC3-SHA
ECDHE-RSA-RC4-SHA
RC4-SHA
Most of these legacy suites use the RSA key exchange, which means that they don’t provide forward secrecy. The AES cipher is preferred, but 3DES and (the insecure) RC4 are also supported for maximum compatibility with as many clients as possible. If the use of RC4 can’t be avoided, the preference is to use the ECDHE suite that provides forward secrecy.

Performance
As you’re probably aware, computation speed is a significant limiting factor for any cryptographic operation. OpenSSL comes with a built-in benchmarking tool that you can use to get an idea about a system’s capabilities and limits. You can invoke the benchmark using the speed command.

If you invoke speed without any parameters, OpenSSL produces a lot of output, little of which will be of interest. A better approach is to test only those algorithms that are directly relevant to you. For example, for usage in a secure web server, you might care about RC4, AES, RSA, ECDH, and SHA algorithms:

$ openssl speed rc4 aes rsa ecdh sha
There are three relevant parts to the output. The first part consists of the OpenSSL version number and compile-time configuration. This information is useful if you’re testing several different versions of OpenSSL with varying compile-time options:

OpenSSL 0.9.8k 25 Mar 2009
built on: Wed May 23 00:02:00 UTC 2012
options:bn(64,64) md2(int) rc4(ptr,char) des(idx,cisc,16,int) aes(partial) ↩
blowfish(ptr2)
compiler: cc -fPIC -DOPENSSL_PIC -DZLIB -DOPENSSL_THREADS -D_REENTRANT -DDSO_DLFCN ↩
-DHAVE_DLFCN_H -m64 -DL_ENDIAN -DTERMIO -O3 -Wa,--noexecstack -g -Wall -DMD32_REG_T=int ↩
-DOPENSSL_BN_ASM_MONT -DSHA1_ASM -DSHA256_ASM -DSHA512_ASM -DMD5_ASM -DAES_ASM
available timing options: TIMES TIMEB HZ=100 [sysconf value]
timing function used: times
The 'numbers' are in 1000s of bytes per second processed.
The second part contains symmetric cryptography benchmarks (i.e., hash functions and private cryptography):

type             16 bytes     64 bytes    256 bytes   1024 bytes   8192 bytes
sha1             29275.44k    85281.86k   192290.28k   280526.68k   327553.12k
rc4             160087.81k   172435.03k   174264.75k   176521.50k   176700.62k
aes-128 cbc      90345.06k   140108.84k   170027.92k   179704.12k   182388.44k
aes-192 cbc     104770.95k   134601.12k   148900.05k   152662.30k   153941.11k
aes-256 cbc      95868.62k   116430.41k   124498.19k   127007.85k   127430.81k
sha256           23354.37k    54220.61k    99784.35k   126494.48k   138266.71k
sha512           16022.98k    64657.88k   113304.06k   178301.77k   214539.99k
Finally, the third part contains the asymmetric (public) cryptography benchmarks:

                  sign    verify    sign/s verify/s
rsa  512 bits 0.000120s 0.000011s   8324.9  90730.0
rsa 1024 bits 0.000569s 0.000031s   1757.0  31897.1
rsa 2048 bits 0.003606s 0.000102s    277.3   9762.0
rsa 4096 bits 0.024072s 0.000376s     41.5   2657.4
                              op      op/s
 160 bit ecdh (secp160r1)   0.0003s   2890.2
 192 bit ecdh (nistp192)   0.0006s   1702.9
 224 bit ecdh (nistp224)   0.0006s   1743.5
 256 bit ecdh (nistp256)   0.0007s   1513.3
 384 bit ecdh (nistp384)   0.0015s    689.6
 521 bit ecdh (nistp521)   0.0029s    340.3
 163 bit ecdh (nistk163)   0.0009s   1126.2
 233 bit ecdh (nistk233)   0.0012s    818.5
 283 bit ecdh (nistk283)   0.0028s    360.2
 409 bit ecdh (nistk409)   0.0060s    166.3
 571 bit ecdh (nistk571)   0.0130s     76.8
 163 bit ecdh (nistb163)   0.0009s   1061.3
 233 bit ecdh (nistb233)   0.0013s    755.2
 283 bit ecdh (nistb283)   0.0030s    329.4
 409 bit ecdh (nistb409)   0.0067s    149.7
 571 bit ecdh (nistb571)   0.0146s     68.4
What’s this output useful for? You should be able to compare how compile-time options affect speed or how different versions of OpenSSL compare on the same platform. For example, the previous results are from a real-life server that’s using the OpenSSL 0.9.8k (patched by the distribution vendor). I’m considering moving to OpenSSL 1.0.1h because I wish to support TLS 1.1 and TLS 1.2; will there be any performance impact? I’ve downloaded and compiled OpenSSL 1.0.1h for a test. Let’s see:

$ ./openssl-1.0.1h speed rsa
[...]
OpenSSL 1.0.1h 5 Jun 2014
built on: Thu Jul  3 18:30:06 BST 2014
options:bn(64,64) rc4(8x,int) des(idx,cisc,16,int) aes(partial) idea(int) blowfish(idx)
compiler: gcc -DOPENSSL_THREADS -D_REENTRANT -DDSO_DLFCN -DHAVE_DLFCN_H ↩
-Wa,--noexecstack -m64 -DL_ENDIAN -DTERMIO -O3 -Wall -DOPENSSL_IA32_SSE2 -DOPENSSL_BN↩
_ASM_MONT -DOPENSSL_BN_ASM_MONT5 -DOPENSSL_BN_ASM_GF2m -DSHA1_ASM -DSHA256_ASM -DSHA512↩
_ASM -DMD5_ASM -DAES_ASM -DVPAES_ASM -DBSAES_ASM -DWHIRLPOOL_ASM -DGHASH_ASM
                  sign    verify    sign/s verify/s
rsa  512 bits 0.000102s 0.000008s   9818.0 133081.7
rsa 1024 bits 0.000326s 0.000020s   3067.2  50086.9
rsa 2048 bits 0.002209s 0.000068s    452.8  14693.6
rsa 4096 bits 0.015748s 0.000255s     63.5   3919.4
Apparently, OpenSSL 1.0.1h is almost twice as fast on this server for my use case (2,048-bit RSA key): The performance went from 277 signatures/s to 450 signatures/s. This means that I’ll get better performance if I upgrade. Always good news!

Using the benchmark results to estimate deployment performance is not straightforward because of the great number of factors that influence performance in real life. Further, many of those factors lie outside TLS (e.g., HTTP keep alive settings, caching, etc.). At best, you can use these numbers only for a rough estimate.

But before you can do that, you need to consider something else. By default, the speed command will use only a single process. Most servers have multiple cores, so to find out how many TLS operations are supported by the entire server, you must instruct speed to use several instances in parallel. You can achieve this with the -multi switch. My server has four cores, so that’s what I’m going to use:

$ openssl speed -multi 4 rsa
[...]
OpenSSL 0.9.8k 25 Mar 2009
built on: Wed May 23 00:02:00 UTC 2012
options:bn(64,64) md2(int) rc4(ptr,char) des(idx,cisc,16,int) aes(partial) ↩
blowfish(ptr2)
compiler: cc -fPIC -DOPENSSL_PIC -DZLIB -DOPENSSL_THREADS -D_REENTRANT -DDSO_DLFCN ↩
-DHAVE_DLFCN_H -m64 -DL_ENDIAN -DTERMIO -O3 -Wa,--noexecstack -g -Wall -DMD32_REG_T=int ↩
-DOPENSSL_BN_ASM_MONT -DSHA1_ASM -DSHA256_ASM -DSHA512_ASM -DMD5_ASM -DAES_ASM
available timing options: TIMES TIMEB HZ=100 [sysconf value]
timing function used:
                  sign    verify    sign/s verify/s
rsa  512 bits 0.000030s 0.000003s  33264.5 363636.4
rsa 1024 bits 0.000143s 0.000008s   6977.9 125000.0
rsa 2048 bits 0.000917s 0.000027s   1090.7  37068.1
rsa 4096 bits 0.006123s 0.000094s    163.3  10652.6
As expected, the performance is almost four times better than before. I’m again looking at how many RSA signatures can be executed per second, because this is the most CPU-intensive cryptographic operation performed on a server and is thus always the first bottleneck. The result of 1,090 signatures/second tells us that this server can handle about 1,000 brand-new TLS connections per second. In my case, that’s sufficient—with a very healthy safety margin. Because I also have session resumption enabled on the server, I know that I can support many more than 1,000 TLS connections per second. I wish I had enough traffic on that server to worry about the performance of TLS.

Another reason why you shouldn’t believe the output of the speed command too much is because it doesn’t use the fastest available cipher implementations by default. In some ways, the default output is a lie. For example, on servers that support the AES-NI instruction set to accelerate AES computations, this feature won’t be used by default when testing:

$ openssl speed aes-128-cbc
[...]
The 'numbers' are in 1000s of bytes per second processed.
type             16 bytes     64 bytes    256 bytes   1024 bytes   8192 bytes
aes-128 cbc      67546.70k    74183.00k    69278.82k   155942.87k   156486.38k
To activate hardware acceleration, you have to use the -evp switch on the command line:

$ openssl speed -evp aes-128-cbc
[...]
The 'numbers' are in 1000s of bytes per second processed.
type             16 bytes     64 bytes    256 bytes   1024 bytes   8192 bytes
aes-128-cbc     188523.36k   223595.37k   229763.58k   203658.58k   206452.14k
Creating a Private Certification Authority
If you want to set up your own CA, everything you need is already included in OpenSSL. The user interface is purely command line–based and thus not very user friendly, but that’s possibly for the better. Going through the process is very educational, because it forces you to think about every aspect, even the smallest details.

The educational aspect of setting a private CA is the main reason why I would recommend doing it, but there are others. An OpenSSL-based CA, crude as it might be, can well serve the needs of an individual or a small group. For example, it’s much better to use a private CA in a development environment than to use self-signed certificates everywhere. Similarly, client certificates—which provide two-factor authentication—can significantly increase the security of your sensitive web applications.

The biggest challenge in running a private CA is not setting everything up but keeping the infrastructure secure. For example, the root key must be kept offline because all security depends on it. On the other hand, CRLs and OCSP responder certificates must be refreshed on a regular basis, which requires bringing the root online.

As you go through this section you will create two configuration files: one to control the root CA (root-ca.conf) and another to control the subordinate CA (sub-ca.conf). Although you should be able to do everything from scratch just by following my instructions, you can also download the configuration file templates from my GitHub account.13 The latter option will save you some time, but the former approach will give you a better understanding of the work involved.

Features and Limitations
In the rest of this section, we’re going to create a private CA that’s similar in structure to public CAs. There’s going to be one root CA from which other subordinate CAs can be created. We’ll provide revocation information via CRLs and OCSP responders. To keep the root CA offline, OCSP responders are going to have their own identities. This isn’t the simplest private CA you could have, but it’s one that can be secured properly. As a bonus, the subordinate CA will be technically constrained, which means that it will be allowed to issue certificates only for the allowed hostnames.

After the setup is complete, the root certificate will have to be securely distributed to all intended clients. Once the root is in place, you can begin issuing client and server certificates. The main limitation of this setup is that the OCSP responder is chiefly designed for testing and can be used only for lighter loads.

Creating a Root CA
Creating a new CA involves several steps: configuration, creation of a directory structure and initialization of the key files, and finally generation of the root key and certificate. This section describes the process as well as the common CA operations.

Root CA Configuration
Before we can actually create a CA, we need to prepare a configuration file (root-ca.conf) that will tell OpenSSL exactly how we want things set up. Configuration files aren’t needed most of the time, during normal usage, but they are essential when it comes to complex operations, such as root CA creation. OpenSSL configuration files are powerful; before you proceed I suggest that you familiarize yourself with their capabilities (man config on the command line).

The first part of the configuration file contains some basic CA information, such as the name and the base URL, and the components of the CA’s distinguished name. Because the syntax is flexible, information needs to be provided only once:

[default]
name                    = root-ca
domain_suffix           = example.com
aia_url                 = http://$name.$domain_suffix/$name.crt
crl_url                 = http://$name.$domain_suffix/$name.crl
ocsp_url                = http://ocsp.$name.$domain_suffix:9080
default_ca              = ca_default
name_opt                = utf8,esc_ctrl,multiline,lname,align

[ca_dn]
countryName             = "GB"
organizationName        = "Example"
commonName              = "Root CA"
The second part directly controls the CA’s operation. For full information on each setting, consult the documentation for the ca command (man ca on the command line). Most of the settings are self-explanatory; we mostly tell OpenSSL where we want to keep our files. Because this root CA is going to be used only for the issuance of subordinate CAs, I chose to have the certificates valid for 10 years. For the signature algorithm, the secure SHA256 is used by default.

The default policy (policy_c_o_match) is configured so that all certificates issued from this CA have the countryName and organizationName fields that match that of the CA. This wouldn’t be normally done by a public CA, but it’s appropriate for a private CA:

[ca_default]
home                    = .
database                = $home/db/index
serial                  = $home/db/serial
crlnumber               = $home/db/crlnumber
certificate             = $home/$name.crt
private_key             = $home/private/$name.key
RANDFILE                = $home/private/random
new_certs_dir           = $home/certs
unique_subject          = no
copy_extensions         = none
default_days            = 3650
default_crl_days        = 365
default_md              = sha256
policy                  = policy_c_o_match

[policy_c_o_match]
countryName             = match
stateOrProvinceName     = optional
organizationName        = match
organizationalUnitName  = optional
commonName              = supplied
emailAddress            = optional
The third part contains the configuration for the req command, which is going to be used only once, during the creation of the self-signed root certificate. The most important parts are in the extensions: the basicConstraints extension indicates that the certificate is a CA, and keyUsage contains the appropriate settings for this scenario:

[req]
default_bits            = 4096
encrypt_key             = yes
default_md              = sha256
utf8                    = yes
string_mask             = utf8only
prompt                  = no
distinguished_name      = ca_dn
req_extensions          = ca_ext

[ca_ext]
basicConstraints        = critical,CA:true
keyUsage                = critical,keyCertSign,cRLSign
subjectKeyIdentifier    = hash
The fourth part of the configuration file contains information that will be used during the construction of certificates issued by the root CA. All certificates will be CAs, as indicated by the basicConstraints extension, but we set pathlen to zero, which means that further subordinate CAs are not allowed.

All subordinate CAs are going to be constrained, which means that the certificates they issue will be valid only for a subset of domain names and restricted uses. First, the extendedKeyUsage extension specifies only clientAuth and serverAuth, which is TLS client and server authentication. Second, the nameConstraints extension limits the allowed hostnames only to example.com and example.org domain names. In theory, this setup enables you to give control over the subordinate CAs to someone else but still be safe in knowing that they can’t issue certificates for arbitrary hostnames. If you wanted, you could restrict each subordinate CA to a small domain namespace. The requirement to exclude the two IP address ranges comes from the CA/Browser Forum’s Baseline Requirements, which have a definition for technically constrained subordinate CAs.14

In practice, name constraints are not entirely practical, because some major platforms don’t currently recognize the nameConstraints extension. If you mark this extension as critical, such platforms will reject your certificates. You won’t have such problems if you don’t mark it as critical (as in the example), but then some other platforms won’t enforce it.

[sub_ca_ext]
authorityInfoAccess     = @issuer_info
authorityKeyIdentifier  = keyid:always
basicConstraints        = critical,CA:true,pathlen:0
crlDistributionPoints   = @crl_info
extendedKeyUsage        = clientAuth,serverAuth
keyUsage                = critical,keyCertSign,cRLSign
nameConstraints         = @name_constraints
subjectKeyIdentifier    = hash

[crl_info]
URI.0                   = $crl_url

[issuer_info]
caIssuers;URI.0         = $aia_url
OCSP;URI.0              = $ocsp_url

[name_constraints]
permitted;DNS.0=example.com
permitted;DNS.1=example.org
excluded;IP.0=0.0.0.0/0.0.0.0
excluded;IP.1=0:0:0:0:0:0:0:0/0:0:0:0:0:0:0:0
The fifth and final part of the configuration specifies the extensions to be used with the certificate for OCSP response signing. In order to be able to run an OCSP responder, we generate a special certificate and delegate the OCSP signing capability to it. This certificate is not a CA, which you can see from the extensions:

[ocsp_ext]
authorityKeyIdentifier  = keyid:always
basicConstraints        = critical,CA:false
extendedKeyUsage        = OCSPSigning
keyUsage                = critical,digitalSignature
subjectKeyIdentifier    = hash
Root CA Directory Structure
The next step is to create the directory structure specified in the previous section and initialize some of the files that will be used during the CA operation:

$ mkdir root-ca
$ cd root-ca
$ mkdir certs db private
$ chmod 700 private
$ touch db/index
$ openssl rand -hex 16  > db/serial
$ echo 1001 > db/crlnumber
The following subdirectories are used:

certs/
Certificate storage; new certificates will be placed here as they are issued.

db/
This directory is used for the certificate database (index) and the files that hold the next certificate and CRL serial numbers. OpenSSL will create some additional files as needed.

private/
This directory will store the private keys, one for the CA and the other for the OCSP responder. It’s important that no other user has access to it. (In fact, if you’re going to be serious about the CA, the machine on which the root material is stored should have only a minimal number of user accounts.)

Note
When creating a new CA certificate, it’s important to initialize the certificate serial numbers with a random number generator, as I do in this section. This is very useful if you ever end up creating and deploying multiple CA certificates with the same distinguished name (common if you make a mistake and need to start over); conflicts will be avoided, because the certificates will have different serial numbers.

Root CA Generation
We take two steps to create the root CA. First, we generate the key and the CSR. All the necessary information will be picked up from the configuration file when we use the -﻿config switch:

$ openssl req -new \
    -config root-ca.conf \
    -out root-ca.csr \
    -keyout private/root-ca.key
In the second step, we create a self-signed certificate. The -extensions switch points to the ca_ext section in the configuration file, which activates the extensions that are appropriate for a root CA:

$ openssl ca -selfsign \
    -config root-ca.conf \
    -in root-ca.csr \
    -out root-ca.crt \
    -extensions ca_ext
Structure of the Database File
The database in db/index is a plaintext file that contains certificate information, one certificate per line. Immediately after the root CA creation, it should contain only one line:

V    240706115345Z        1001    unknown    /C=GB/O=Example/CN=Root CA
Each line contains six values separated by tabs:

Status flag (V for valid, R for revoked, E for expired)

Expiration date (in YYMMDDHHMMSSZ format)

Revocation date or empty if not revoked

Serial number (hexadecimal)

File location or unknown if not known

Distinguished name

Root CA Operations
To generate a CRL from the new CA, use the -gencrl switch of the ca command:

$ openssl ca -gencrl \
    -config root-ca.conf \
    -out root-ca.crl
To issue a certificate, invoke the ca command with the desired parameters. It’s important that the -extensions switch points to the correct section in the configuration file (e.g., you don’t want to create another root CA).

$ openssl ca \
    -config root-ca.conf \
    -in sub-ca.csr \
    -out sub-ca.crt \
    -extensions sub_ca_ext
To revoke a certificate, use the -revoke switch of the ca command; you’ll need to have a copy of the certificate you wish to revoke. Because all certificates are stored in the certs/ directory, you only need to know the serial number. If you have a distinguished name, you can look for the serial number in the database.

Choose the correct reason for the value in the -crl_reason switch. The value can be one of the following: unspecified, keyCompromise, CACompromise, affiliationChanged, superseded, cessationOfOperation, certificateHold, and removeFromCRL.

$ openssl ca \
    -config root-ca.conf \
    -revoke certs/1002.pem \
    -crl_reason keyCompromise
Create a Certificate for OCSP Signing
First, we create a key and CSR for the OCSP responder. These two operations are done as for any non-CA certificate, which is why we don’t specify a configuration file:

$ openssl req -new \
    -newkey rsa:2048 \
    -subj "/C=GB/O=Example/CN=OCSP Root Responder" \
    -keyout private/root-ocsp.key \
    -out root-ocsp.csr
Second, use the root CA to issue a certificate. The value of the -extensions switch specifies ocsp_ext, which ensures that extensions appropriate for OCSP signing are set. I reduced the lifetime of the new certificate to 365 days (from the default of 3,650). Because these OCSP certificates don’t contain revocation information, they can’t be revoked. For that reason, you want to keep the lifetime as short as possible. A good choice is 30 days, provided you are prepared to generate a fresh certificate that often:

$ openssl ca \
    -config root-ca.conf \
    -in root-ocsp.csr \
    -out root-ocsp.crt \
    -extensions ocsp_ext \
    -days 30
Now you have everything ready to start the OCSP responder. For testing, you can do it from the same machine on which the root CA resides. However, for production you must move the OCSP responder key and certificate elsewhere:

$ openssl ocsp \
    -port 9080
    -index db/index \
    -rsigner root-ocsp.crt \
    -rkey private/root-ocsp.key \
    -CA root-ca.crt \
    -text
You can test the operation of the OCSP responder using the following command line:

$ openssl ocsp \
    -issuer root-ca.crt \
    -CAfile root-ca.crt \
    -cert root-ocsp.crt \
    -url http://127.0.0.1:9080
In the output, verify OK means that the signatures were correctly verified, and good means that the certificate hasn’t been revoked.

Response verify OK
root-ocsp.crt: good
        This Update: Jul  9 18:45:34 2014 GMT
Creating a Subordinate CA
The process of subordinate CA generation largely mirrors the root CA process. In this section, I will only highlight the differences where appropriate. For everything else, refer to the previous section.

Subordinate CA Configuration
To generate a configuration file (sub-ca.conf) for the subordinate CA, start with the file we used for the root CA and make the changes listed in this section. We’ll change the name to sub-ca and use a different distinguished name. We’ll put the OCSP responder on a different port, but only because the ocsp command doesn’t understand virtual hosts. If you used a proper web server for the OCSP responder, you could avoid using special ports altogether. The default lifetime of new certificates will be 365 days, and we’ll generate a fresh CRL once every 30 days.

The change of copy_extensions to copy means that extensions from the CSR will be copied into the certificate, but only if they are not already set in our configuration. With this change, whoever is preparing the CSR can put the required alternative names in it, and the information from there will be picked up and placed in the certificate. This feature is somewhat dangerous (you’re allowing someone else to have limited direct control over what goes into a certificate), but I think it’s fine for smaller environments:

[default]
name                    = sub-ca
ocsp_url                = http://ocsp.$name.$domain_suffix:9081

[ca_dn]
countryName             = "GB"
organizationName        = "Example"
commonName              = "Sub CA"

[ca_default]
default_days            = 365
default_crl_days        = 30
copy_extensions         = copy
At the end of the configuration file, we’ll add two new profiles, one each for client and server certificates. The only difference is in the keyUsage and extendedKeyUsage extensions. Note that we specify the basicConstraints extension but set it to false. We’re doing this because we’re copying extensions from the CSR. If we left this extension out, we might end up using one specified in the CSR:

[server_ext]
authorityInfoAccess     = @issuer_info
authorityKeyIdentifier  = keyid:always
basicConstraints        = critical,CA:false
crlDistributionPoints   = @crl_info
extendedKeyUsage        = clientAuth,serverAuth
keyUsage                = critical,digitalSignature,keyEncipherment
subjectKeyIdentifier    = hash

[client_ext]
authorityInfoAccess     = @issuer_info
authorityKeyIdentifier  = keyid:always
basicConstraints        = critical,CA:false
crlDistributionPoints   = @crl_info
extendedKeyUsage        = clientAuth
keyUsage                = critical,digitalSignature
subjectKeyIdentifier    = hash
After you’re happy with the configuration file, create a directory structure following the same process as for the root CA. Just use a different directory name, for example, sub-ca.

Subordinate CA Generation
As before, we take two steps to create the subordinate CA. First, we generate the key and the CSR. All the necessary information will be picked up from the configuration file when we use the -config switch.

$ openssl req -new \
    -config sub-ca.conf \
    -out sub-ca.csr \
    -keyout private/sub-ca.key
In the second step, we get the root CA to issue a certificate. The -extensions switch points to the sub_ca_ext section in the configuration file, which activates the extensions that are appropriate for the subordinate CA.

$ openssl ca \
    -config root-ca.conf \
    -in sub-ca.csr \
    -out sub-ca.crt \
    -extensions sub_ca_ext
Subordinate CA Operations
To issue a server certificate, process a CSR while specifying server_ext in the -extensions switch:

$ openssl ca \
    -config sub-ca.conf \
    -in server.csr \
    -out server.crt \
    -extensions server_ext
To issue a client certificate, process a CSR while specifying client_ext in the -extensions switch:

$ openssl ca \
    -config sub-ca.conf \
    -in client.csr \
    -out client.crt \
    -extensions client_ext
Note
When a new certificate is requested, all its information will be presented to you for verification before the operation is completed. You should always ensure that everything is in order, but especially if you’re working with a CSR that someone else prepared. Pay special attention to the certificate distinguished name and the basicConstraints and subjectAlternativeName extensions.

CRL generation and certificate revocation are the same as for the root CA. The only thing different about the OCSP responder is the port; the subordinate CA should use 9081 instead. It’s recommended that the responder uses its own certificate, which avoids keeping the subordinate CA on a public server.

[1] The letters “eay” in the name SSLeay are Eric A. Young’s initials.

[2] BoringSSL (Chromium, retrieved 30 June 2015)

[3] Win32 OpenSSL (Shining Light Productions, retrieved 3 July 2014)

[4] Apache 2.4 VC14 Binaries and Modules (Apache Lounge, retrieved 15 July 2015)

[5] “openssl” source package in Precise (Ubuntu, retrieved 3 July 2014)

[6] compiler hardening in Ubuntu and Debian (Kees Cook, 3 February 2014)

[7] A small number of organizations will have very strict security requirements that require the private keys to be protected at any cost. For them, the solution is to invest in a Hardware Security Module (HSM), which is a type of product specifically designed to make key extraction impossible, even with physical access to the server. To make this work, HSMs not only generate and store keys, but also perform all necessary operations (e.g., signature generation). HSMs are typically very expensive.

[8] RFC 2985: PKCS #9: Selected Object Classes and Attribute Types Version 2.0 (M. Nystrom and B. Kaliski, November 2000)

[9] Cryptography/Meet In The Middle Attack (Wikibooks, retrieved 31 March 2014)

[10] Attacking Triple Encryption (Stefan Lucks, 1998)

[11] On the Security of RC4 in TLS and WPA (AlFardan et al., 13 March 2013)

[12] RFC 7905: ChaCha20-Poly1305 Cipher Suites for TLS (Langley et. al, June 2016)

[13] OpenSSL CA configuration templates (Bulletproof SSL and TLS GitHub repository, retrieved 31 March 2017)

[14] Baseline Requirements (The CA/Browser Forum, retrieved 9 July 2014)