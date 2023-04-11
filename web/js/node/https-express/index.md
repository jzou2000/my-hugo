---
title: Create An HTTPS Web Server With Express.js
nav: https with express.js
---

References:
* [Create HTTPS Server with Node.js [Simple Steps]](https://www.golinuxcloud.com/create-https-server-with-node-js/) use self cerificate
* [Node, Express, SSL Certificate: Run HTTPS Server from scratch in 5 steps](https://dev.to/omergulen/step-by-step-node-express-ssl-certificate-run-https-server-from-scratch-in-5-steps-5b87) Use free certificate authority [Let's Encrypt](https://letsencrypt.org/)


## create key/cert

```sh
jasonz@VANLWIN0056:~/codex/ssl/key1$ openssl genrsa -out key.pem
Generating RSA private key, 2048 bit long modulus (2 primes)
.........+++++
.........+++++
e is 65537 (0x010001)
jasonz@VANLWIN0056:~/codex/ssl/key1$ ls
key.pem
jasonz@VANLWIN0056:~/codex/ssl/key1$ head -5 key.pem
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAqkp2E9lwT6HMmxMwh6LkJeFTGy3vnMhzeqhE9gOFKa8Wbblb
U4cgJs1Qf+ifBQxWf6baf4d84GXxJ0x89QQuq8uujiD6bppC5cLmjOnK6ad673ft
Iigj4TWSS3wEPGUbvmEIELSIVfRiuiI6rYiSLcVP2nkjZJEOyL7JLrzQm5KiIbiM
NSaSnevKbyd6caWN0GFyLK8MaHHWco8gH370balMewVKcOyBolox4KmbKsyhiCce
jasonz@VANLWIN0056:~/codex/ssl/key1$

```

```sh
jasonz@VANLWIN0056:~/codex/ssl/key1$ openssl req -new -key key.pem -out csr.pem
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:CA
State or Province Name (full name) [Some-State]:BC
Locality Name (eg, city) []:Richmond
Organization Name (eg, company) [Internet Widgits Pty Ltd]:sample
Organizational Unit Name (eg, section) []:eng
Common Name (e.g. server FQDN or YOUR name) []:jason
Email Address []:jason@home

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
jasonz@VANLWIN0056:~/codex/ssl/key1$ls
csr.pem  key.pem
jasonz@VANLWIN0056:~/codex/ssl/key1$ head -5 csr.pem
-----BEGIN CERTIFICATE REQUEST-----
MIICvDCCAaQCAQAwdzELMAkGA1UEBhMCQ0ExCzAJBgNVBAgMAkJDMREwDwYDVQQH
DAhSaWNobW9uZDEPMA0GA1UECgwGc2FtcGxlMQwwCgYDVQQLDANlbmcxDjAMBgNV
BAMMBWphc29uMRkwFwYJKoZIhvcNAQkBFgpqYXNvbkBob21lMIIBIjANBgkqhkiG
9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkp2E9lwT6HMmxMwh6LkJeFTGy3vnMhzeqhE
jasonz@VANLWIN0056:~/codex/ssl/key1$
```

```sh
jasonz@VANLWIN0056:~/codex/ssl/key1$ openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
Signature ok
subject=C = CA, ST = BC, L = Richmond, O = sample, OU = eng, CN = jason, emailAddress = jason@home
Getting Private key
jasonz@VANLWIN0056:~/codex/ssl/key1$ ls
cert.pem  csr.pem  key.pem
jasonz@VANLWIN0056:~/codex/ssl/key1$ head -5 cert.pem
-----BEGIN CERTIFICATE-----
MIIDdzCCAl8CFG1XJi8Q/I5T6QaDBPaQJJY33ysHMA0GCSqGSIb3DQEBCwUAMHcx
CzAJBgNVBAYTAkNBMQswCQYDVQQIDAJCQzERMA8GA1UEBwwIUmljaG1vbmQxDzAN
BgNVBAoMBnNhbXBsZTEMMAoGA1UECwwDZW5nMQ4wDAYDVQQDDAVqYXNvbjEZMBcG
CSqGSIb3DQEJARYKamFzb25AaG9tZTAgFw0yMzAzMDgwNDM3MzVaGA8yMDUwMDcy
jasonz@VANLWIN0056:~/codex/ssl/key1$
```

## Create HTTP Server

```sh
touch index.js
mkdir public && cd public
touch index.html style.css
cd ..
```

```sh
npm init -y
npm i express nodemon
```

```sh
jasonz@VANLWIN0056:~/codex/ssl/key1$ npm init -y
Wrote to /home/jasonz/codex/ssl/key1/package.json:

{
  "name": "key1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}


jasonz@VANLWIN0056:~/codex/ssl/key1$ npm i express nodemon

added 89 packages, and audited 90 packages in 3s

10 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
npm notice
npm notice New major version of npm available! 8.0.0 -> 9.6.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v9.6.0
npm notice Run npm install -g npm@9.6.0 to update!
npm notice
```

## prepare files

index.js
```js
import https from "https"
import fs from "fs"
import express from "express"

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({extended: true, limit: '3mb'}))

app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`))

app.post("/registration", (req, res) => {
    console.log(req.body)
    res.redirect("/")
})

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}

const PORT = process.env.PORT || 3000
https.createServer(options, app).listen(PORT, console.log(`server runs on port ${PORT}`))
```

public/index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>HTTPS Server</title>
</head>
<body>

<main>

    <h2>Register</h2>

    <form action="/registration" method="POST">
        <div>
            <input type="text" name="username" placeholder="Username" required>
        </div>
        <div>
            <input type="email" name="email" placeholder="Email" required>
        </div>
        <button>Send</button>
    </form>

</main>

</body>
</html>
```

public/style.css
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    background: #f7f8fc;
    color:rgb(51, 22, 51);
}
h2 {
    text-align: center;
    margin-top: 3rem;
}
main {
    text-align: center;
}
form {
    width: 50%;
    margin: 3rem auto;
}
input, button {
    height: 3rem;
    width: 80%;
    padding: 0.5rem;
    margin: .5rem 0;
    border-radius: 3px;
    border: 1px solid #ccc;
}
button {
    background:rgb(51, 22, 51);
    color: #ccc;
    cursor: pointer;
}
```

## Run App

```sh
npm run dev
```

![not-private.png](not-private.png)
![my-first-https-site.png](my-first-https-site.png)