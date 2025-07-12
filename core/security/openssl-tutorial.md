---
title: A 6 Part Introductory OpenSSL Tutorial
date: 2019-05-17
nav: OpenSSL Tutorial
tags: [openssl, tutorial]
source: "https://www.keycdn.com/blog/openssl-tutorial"
---

OpenSSL is among the most popular cryptography libraries. It is most commonly used to implement the Secure Sockets Layer and Transport Layer Security ([SSL and TLS](https://www.keycdn.com/support/what-is-ssl-tls)) protocols to ensure secure communications between computers. In recent years, SSL has become basically obsolete since TLS offers a higher level of security, but some people have gotten into the habit of referring to both protocols as “SSL.”

Cryptography is tricky business, and OpenSSL has too many features to cover in one article, but this OpenSSL tutorial will help you get started creating keys and certificates.

## OpenSSL Tutorial: An Introduction to Internet Security

When a client requests a secure connection to a server, the server, in turn, requests information to figure out which types of cryptographic security the client can support. Once it determines the most secure option, the following takes place:

1. The server sends a security certificate that is signed with the server’s public key.
1. Once the client verifies the certificate, it generates a secret key and sends it to the server encrypted with the public key.
1. Next, both sides use the secret key to create two sets of public-private keys. At last, secure communication can commence.

SSL and TLS are two of many security protocols used to accomplish these steps. To implement these protocols, we need software like OpenSSL.

## Abbreviations Key

You’ll come across tons of abbreviations in this guide and other OpenSSL tutorials. For quick reference, here is a short list of some terms you might encounter:

* CSR: Certificate Signing Request
* DER: Distinguished Encoding Rules
* PEM: Privacy Enhanced Mail
* PKCS: Public-Key Cryptography Standards
* SHA: Secure Hash Algorithm
* SSL: Secure Socket Layer
* TLS: Transport Layer Security


## Part 1) Getting Started

You can download the source code for most platforms from the official [OpenSSL website](https://www.openssl.org/).

If you need a windows distribution, [Shining Light Productions](http://slproweb.com/products/Win32OpenSSL.html) has a good one although there are plenty of alternatives. Once everything is successfully installed, let’s begin by experimenting with the OpenSSL command line tool.

First, you can use the following command to display which version of OpenSSL you’re running:

```
openssl version -a
```

To get a full list of the standard commands, enter the following:

```
openssl list-standard-commands
```

Check out the official [OpenSSL docs](https://www.openssl.org/docs/man1.0.2/apps/openssl.html) for explanations of the standard commands. To view the many secret key algorithms available in OpenSSL, use:

```
openssl list-cipher-commands
```

Now, let’s try some encryption. If you wanted to encrypt the text “Hello World!” with the AES algorithm using CBC mode and a 256-bit key, you would do as follows:

```
touch plain.txt
echo "Hello World!" > plain.txt
openssl enc -aes-256-cbc -in plain.txt -out encrypted.bin
//enter aes-256-cbc encryption password: example
//Verifying - enter aes-256-cbc encryption password: example
```

You’ll be prompted to enter a password from which the 256-bit secret key will be computed. In the above example, the password “example” is used, but you should have stronger passwords. You should now have a binary file called encrypted.bin that you can decrypt as follows:

```
openssl enc -aes-256-cbc -d -in encrypted.bin -pass pass:example
// Hello World!
```

## Part 2) Public and Private Keys

For the sake of example, we can demonstrate how OpenSSL manages public keys using the [RSA algorithm](https://simple.wikipedia.org/wiki/RSA_%28algorithm%29). You can use other algorithms of course, and the same principles will apply. The first step is to generate public and private pairs of keys. Enter the following command to create an RSA key of 1024 bits:

```
openssl genrsa -out key.pem 1024
```

You should now have a file called key.pem containing a public key and private key. As the file’s name suggests, the private key is coded using the Privacy Enhanced Email, or PEM, standard. Use the following code to display it:

```
cat key.pem
```

You should see a long combination of characters. For detailed information about how your key was generated, enter:

```
openssl rsa -in key.pem -text -noout
```

This command should return information about the public and private exponents, the modulus and the other methods and numbers used to optimize the algorithm. In this context, the -noout option prevents display of the key in base 64 format, which means that only hexadecimal numbers are visible. The public exponent is an exception, of course, since it is always 65537 for 1024 bit keys.

To encrypt our private key, we use the following code:

```
openssl rsa -in key.pem -des3 -out enc-key.pem
```

Once the key file has been encrypted, you will then be prompted to create a password. Next, we can extract the public key from the file key.pem with this command:

```
openssl rsa -in key.pem -pubout -out pub-key.pem
```

Finally, we are ready to encrypt a file using our keys. Use the following format:

```
openssl pkeyutl -encrypt -in <input_file> -inkey <key.pem> -out <output_file>
```

In the above context, ```<input_file>``` is the file you want to encrypt. Since we’re using RSA, keep in mind that the file can’t exceed 116 bytes. The ```<key.pem>``` is the file containing the public key. If that file doesn’t also include the private key, you must indicate so using ```-pubin```. The ```<output_file>``` is the encrypted file name.

Now, to decrypt the file, you can simply flip the equation: Change ```-encrypt``` to ```-decrypt```, and switch the input and output files.

## Part 3) Creating Digital Signatures

At last, we can produce a digital signature and verify it. Signing a large file directly with a public key algorithm is inefficient, so we should first compute the digest value of the information to be signed. This can be accomplished using the following command:

```
openssl dgst -<hash_algorithm> -out <digest> <input_file>
```

In this example, ``<hash_algorithm>`` is whichever algorithm you choose to compute the digest value. The ``<input_file>`` is the file containing the data you want to hash while “digest” is the file that will contain the results of the hash application.

The next step is to compute the signature of the digest value as follows:

```
openssl pkeyutl -sign -in <digest> -out <signature> -inkey <key.pem>
```

Finally, you can check the validity of a signature like so:

```
openssl pkeyutl -verify -sigfile <signature> -in <digest> -inkey <key.pem> -pubin
```

Here, “signature” is the filename of your signature, and “key.pem” is the file with the public key. To confirm the verification for yourself, you can compute the digest value of the input file and compare it to the digest value produced from the verification of the digital signature.

## Part 4) Certificate Signing Requests

Let’s say that you want to create digital certificates signed by your own certificate authority. Before you can get an SSL certificate from a certificate authority, or CA, you must first generate a certificate signing request or a CSR. A CSR includes a public key as well as some extra information that gets inserted into the certificate when signed.

When you first create a CSR, you’ll be asked to supply some information about yourself or your organization. In the field “Common Name,” or CN, you must provide the fully qualified domain name of the host for which the certificate is intended. If you’re actually purchasing an SSL certificate from a CA, then the information you provide should be factual and accurate! Imagine you want to secure an Apache HTTP or Nginx web server with HTTPS. You can use the following snippet to create a new 2048-bit private key along with a CSR from scratch:

Imagine you want to secure an Apache HTTP or Nginx web server with HTTPS. You can use the following snippet to create a new 2048-bit private key along with a CSR from scratch:

```
openssl req
-newkey rsa:2048 -nodes -keyout domain.key
-out domain.csr
```

Just replace “domain” with your domain name. Here, the ``-newkey rsa:2048`` option tells OpenSSL that it should use the RSA algorithm to create a 2048-bit key, and the -nodes option indicates that the key shouldn’t be password protected.

After you’ve provided all of the necessary information, your CSR will be generated. Now, you can send it to a CA and request an SSL certificate. If your CA supports SHA-2, be sure to add the -sha256 option if you want your CSR to be signable with SHA-2.

To create a CSR for a private key that already exists, you would use this format:

```
openssl req
-key domain.key
-new -out domain.csr
```

Again, replace “domain” with your domain name. The -key option here indicates that you’re using an existing private key while -new indicates that you’re creating a new CSR. In the prior example, -new was implied because you were making a new key.

Let’s say you already have a certificate that you want to renew, yet you somehow lost the original CSR. Don’t panic; you can generate a new one **based on information from your certificate and the private key**. For example, if you were using an X509 certificate, you’d use the following code:

```
openssl x509
-in domain.crt
-signkey domain.key
-x509toreq -out domain.csr
```
The ``-x509toreq`` option is needed to let OpenSSL know the certificate type.

## Part 5) Generating SSL Certificates

If you desire the extra security of an SSL certificate, but you can’t afford or don’t want to be bothered with a CA, a less expensive alternative is to sign your own certificates. Self-signed certificates are signed with their own private keys, and they are just as effective at encrypting data as CA-signed certificates; however, users might receive an alert from their browser indicating that the connection is not secure, so self-signed certificates are really only recommended in environments where you’re not required to prove your service’s identity such as on a non-public server.

Again, assume that you’re using HTTPS to secure an Apache HTTP or Nginx web server. The following command will create a 2048-bit private key along with a self-signed certificate:

```
openssl req
-newkey rsa:2048 -nodes -keyout domain.key
-x509 -days 365 -out domain.crt
```

The ``-x509`` option tells OpenSSL that you want a self-signed certificate, while ``-days 365`` indicates that the certificate should be valid for a year. OpenSSL will generate a temporary CSR for the purpose of gathering information to associate with the certificate, so you will have to answer the prompts per usual.

If you already have a private key that you want to associate with a self-signed certificate, just change the code slightly:

```
openssl req
-key domain.key
-new
-x509 -days 365 -out domain.crt
```

Remember that inclusion of the ``-new`` option is necessary since you are creating a new CSR from an existing key.

## Part 6) Viewing Certificates

To view certificates and CSR files, you must decode them from the PEM format. Use the following command to view the contents of a CSR in plain text:

```
openssl req -text -noout -verify -in domain.csr
```

To view a certificate’s content in plain text, use:

```
openssl x509 -text -noout -in domain.crt
```

You can verify that a certificate was signed by a specific CA by plugging its name into the following code:

```
openssl verify -verbose -CAFile ca.crt domain.crt
```

## In Summary

In today’s increasingly digital world, improving internet security is imperative to protect our own security. Many website databases contain treasure troves of information about visitors, and hackers are always learning new ways to navigate system vulnerabilities and exploit such data. That’s why security protocols must continue to evolve. Stay informed to make sure you’re providing adequate protection for your users.