---
title: SQL Injection
nav: sql injection
---

What is Penetration Testing?

Penetration testing, also called pen testing or ethical hacking, is the practice of testing a computer system, network, or web application to find security vulnerabilities that a would-be attacker could exploit.


If you compose SQL statement with user input without proper validation, there is a risk of "SQL Injection".


## An Example

If the server processes user input with following code snippet:

```java
String sql = "select * from subscriber where email='" + EMAIL +"' and region=1";
ResultSet result = stmt.executeQuery(sql);
```

which expects a normal email address to extract specified user information,
a hacker may send ``EMAIL`` with value of
```txt
me@email.com' union select * from subscriber --
```
the tailing ``--`` marks SQL comment that prevents potential original codes after the injection
 (i.e. ``and region=1`` in above example) to generates SQL syntax error.

The result of above example reveals all subscribers information.

In a web application, if user inputs are passed from http/https post request, it is easy to intercept by tools like http proxy, which intercepts browser's request, makes changes (injection), and forwards to the server.

### hacker's procedure
1. inject anything, if the server response syntax error, which means there's a SQL-injection hole in the server code
1. inject code to find out required system information, such as DBMS info, table name, etc
1. get required information, or even modify/delete data/

## Solution

Use parameters to accept user inputs can eleminate SQL injections.

```java
String sql = "select * from subscriber where email=?";
PrepareStatement stmt = db.prepareStatement(sql);
stmt.setString(1, EMAIL);
ResultSet result = stmt.executeQuery(sql);
```


## Deviations of Vulnerability Injection

### Command Injection

```java
Process proc = runtime.exec(new String[] {
    "bash",
    "-c",
    "curl -o -l -L -s -w %{http_code}" + API_URL + "?number=" + USER_INPUT
});
```
* composing (shell) command with user input without validation.
* by appending ``; cat /etc/passwd #`` after normal inputs
* other special characters to excute another command may be ``&, |`` etc.

### XML Injection (XML External Entity (XXE) Injection)

* attack weak XML parser
* by loading external entity (e.g. external file /etc/passwd), unexpected information is revealed.
* weakness: java XML parser settings (default is true)
  * ``external-general-entities``
  * ``external-parameter-entities``


### Directory Traversal

```java
String pathName = base_path + USER_INPUT;
```

* server code compose file path with USER_INPUT, which can be redirected to sensitive file, for example, ``../../../../etc/passwd``
* solution: verify the user doesn't try to visit beyond ``base_path``
  ```java
  if (!(new File(pathName)).getCanonicalPath().startsWith(base_path))
    throw new RuntimeException("Unauthorized access");
  ```

### Weak Randomness

### Session Fixation

Session Fixation attack, which exploits an application's failure to generate a new session ID every time a user authenticates.

### Reflected XSS (Cross-Site Scripting)

if user input contains something like this
```js
<script>alert('hacked')</script>
```
and the browser does popup dialog after the server response, it means the server code contains XSS vulnerability.

* solution: make all input html-encoded


### DOM XSS


### Stored XSS

What is a Bug Bounty Program?

A bug bounty program, also called a vulnerability rewards program (VRP), is a crowdsourcing initiative that rewards individuals for discovering and reporting software bugs.

What is a zero-day vulnerability?

Zero-day is a security flaw in the software, hardware, or firmware that is unknown to the party or parties responsible for patching or otherwise fixing the flaw.

Mitigation

In order to effectively mitigate against stored Cross-site Scripting attacks, developers must ensure all user-supplied data is HTML encoded before being rendered to the web page.

### Forced Browsing

What is OSINT?

Open-source intelligence (OSINT) is the insight gained from processing and analyzing publicly accessible data sources via search engines, social media, etc, to passively discover an organization's internet footprint and identify potential targets.

tools linkfinder.py
```sh
python linkfinder.py -i https://41.208.179.105 -d -o cli
```
What is LinkFinder?

LinkFinder is an open-source python script used to discover API endpoints, URL resources and query parameters within minified JavaScript files. The script uses a combination of regular expressions to gather hidden URLs and application routes which can then be used by security researchers to further test for vulnerabilities.

Mitigation

In order to mitigate against Forceful Browsing vulnerabilities, developers must ensure appropriate permissions and access-control settings are applied for every URL and web resource in their application. 

Further, application owners must remove all private URL routes used for development and testing in production environments.

### Leftover Debug Code

in google search box
```
Search Term: inurl:"cloudable.com" AND (staging | test | dev)
```

The above query is designed to return pages whose URL contains the string cloudable.com via the inurl operator. The search results are further narrowed down to only include keywords commonly reserved for naming application environments such as staging, dev, test.

Mitigation

In order to mitigate against deploying active debugging code in production instances, developers must ensure appropriate permissions and access-control settings are applied for accessing such features. Alternatively, development teams can add conditional variables to remove debugging code when deploying in production and staging environments.

Further, development teams must proactively identify and remove developer comments that reference sensitive information including internal URLs, API endpoints, or test credentials before deploying the application.



Finally, developers must protect application staging and test environments by restricting their access to specific IP ranges or addresses, thereby preventing search engines such as Google from discovering and indexing these assets. 

### PII data in URL

What is PII?

Personally Identifiable Information (PII) is a legal term used to define any information that can be used by organizations on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context.

### Token Exposure in URL

Mitigation

Passing sensitive data such as API tokens within URLs may be logged in various locations, including the user's browser, the web server, and any forward or reverse proxy servers. Application URLs may also be posted on public forums, bookmarked or emailed by developers, thereby increasing the risk of invariably disclosing API tokens.

To effectively mitigate against exposure of API tokens in URLs, developers should use HTTP headers for transmitting API tokens. Examples of these headers include the following:
* Authorization: ``<token_value>``
* X-API-Key: ``<token_value>``
* ProjectName-Api-Key: ``<token_value>``

### User Enumeration

### Vertical Privilege Escalation

Mitigation

To effectively mitigate against Privilege Escalation vulnerabilities, developers must implement access control checks to make sure that the user has the required privileges to access a requested resource or functionality.



A proper access control policy is important on the whole product level. It should define appropriate access control permissions for all users and groups. These then need to be described clearly to architects, designers, developers and support teams, such that access control is designed, implemented and used consistently across the application.

### Header Injection

Mitigation

In order to effectively mitigate against Header Injection attacks, developers must ensure all incoming HTTP headers are properly sanitized to prevent malicious header values from being included in the response or backend business logic.



This can be achieved by implementing an allowlist of allowed hostnames and subdomains, which can be used to prevent malicious hostnames from being included in the response. 

### Clickjacking

Using iframe with opacity=0 on a bait layer, you click some object that is NOT what you see.

Mitigation

To mitigate against Clickjacking attacks, developers must configure their web servers or load balancers to include X-Frame-Options or Content-Security-Policy header.



Both X-Frame-Options andContent-Security-Policy response headers define whether or not a browser should be allowed to embed or render a page in an ``<iframe>`` element. For example, setting X-Frame-Options: deny will prevent browsers from rendering your web application in an ``<iframe>`` element.

### Horizontal Privilege Escalation

Horizontal Privilege Escalation attack in which a malicious actor gains access to a user account or performs unauthorized actions on behalf of the user.

Mitigation

To effectively mitigate against Privilege Escalation vulnerabilities, developers must ensure role-based access controls checks are implemented to ensure that the user has the required privileges to access the requested resource.

### Insecure URL Redirect

Mitigation

To mitigate the risk of malicious actors exploiting URL redirects, application developers must always verify the URL that the user will be redirected or forwarded to, especially if the URL parameter can be changed or tampered with on the client-side. This is especially important for applications that use dynamic content, such as web pages, that are not hosted by a single domain.

### Components with Known Vulnerabilities

### Server Side Request Forgery

Server Side Request Forgery (SSRF) vulnerability are most commonly encountered in functionality associated with:

* PDF generation e.g. Generate PDF reports, Credit Card statements;
* File Upload e.g. Uploading scanned documents, image files etc.

### Cross Site Request Forgery



