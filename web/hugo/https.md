---
title: Enable HTTPS to Hugo
nav: https support
---

From version 0.113.0, hugo server supports HTTPS (disabled by default).

Run in my laptop

```sh
# Installs a local CA in the system root store. You only need to do this once.
jasonzou@Jasons-MacBook-Pro hugo % hugo server trust
Sudo password:
The local CA is now installed in the system trust store.

#  Generates locally-trusted certificates (if not already created) and starts the server with TLS/HTTPS 
asonzou@Jasons-MacBook-Pro hugo % hugo server -p 8088 --tlsAuto                          
Creating TLS certificates in /Users/jasonzou/Library/Caches/hugo_cache/_mkcerts
Created a new local CA 💥

Created a new certificate valid for the following names 📜
 - "localhost"

The certificate is at "/Users/jasonzou/Library/Caches/hugo_cache/_mkcerts/localhost.pem" and the key at "/Users/jasonzou/Library/Caches/hugo_cache/_mkcerts/localhost-key.pem" ✅

It will expire on 10 February 2026 🗓

Watching for changes in /Users/jasonzou/codex/hugo/{archetypes,assets,content,data,layouts,simba,static,themes}
Watching for config changes in /Users/jasonzou/codex/hugo/hugo.yaml
Start building sites … 
hugo v0.120.4-f11bca5fec2ebb3a02727fb2a5cfb08da96fd9df darwin/amd64 BuildDate=2023-11-08T11:18:07Z VendorInfo=gohugoio


                   | EN   
-------------------+------
  Pages            | 858  
  Paginator pages  |   0  
  Non-page files   |  48  
  Static files     |   3  
  Processed images |   0  
  Aliases          |   0  
  Sitemaps         |   1  
  Cleaned          |   0  

```
