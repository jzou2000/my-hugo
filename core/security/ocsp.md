---
title: OCSP
nav: ocsp
---

### Certificate Revocation

reasons
* compromised, e.g. stolen
* expiration

CRL - Certificate Revocation Lists
* maintained by a CA (Certificate Authority)
* content: serial number, date
* distribution: published URL
* limitations
  * size
  * updates: not real-time (secheduled, on-demand)
  * scalability

## OCSP (Online Certificate Status Protocol)

* obtain the real-time revocation status of a digital certificate
* allows clients to query the CA for specific certificate status (vs download-and-parse)
* how-work
  1. a client sends a certificate query to the OCSP responder
  1. the responder checks its database
  1. the responder sends a response indicating certificate validity, revocation or unknown status

### OCSP Stapling

* signed OCSP response
* CRL as fallback