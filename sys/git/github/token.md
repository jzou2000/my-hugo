---
title: PAT - Personal Access Token
nav: access token
---

Github has disabled password to access through command-line utilities and API authentication.
Instead, PAT is used whenever password is required.
PAT is a program generated string which can be considered a strong version of password,
because it looks a random string, stronger than human-generated __string__ password.

Here is the steps to generate PAT:

* start from any github page
* click on the top-right icon that is used for logout/settings/...
* click menu sequence: Settings|Developer Settings|Personal access tokens
* click button "Generate new token"
* fill the form and generate a token
  * a note describe the purpose of the token
  * expire is **strongly** recommended
  * enable a list of scope (grants)
* the token is generated and displayed, **copy and save** it to some safe place. You won't see it in github again.

## Usage: simply use PAT as password whenever password is required.
```sh
$ git clone https://github.com/username/repo.git
Username: your_username
Password: your_token
```

## Cache credential

* enable git store credential
  ```sh
  git config --global credential.helper store
  ```
* perform any action that requires credential, git will cache it in ``$HOME/.git-credentials``.
  * in the format ``https://{username}:{password}@url``
  * the file support multiple entries
  * git removes entries that have expired.
  * osx store PAE in its key-chain.
* the file is still in plain text, assuming the file is safe. **Remove it** when the file is not safe, for example, the machine is not your **personal** machine anymore.

## Tips

* In case different accounts are used on multiple repos, it is more convenient and flexible to save credential user name in the repo instead of __global__
  ```sh
  cd my-repo
  git config --add credential.username "jzou2000@gmail.com"
  ```
  the command adds an entry in ``my-repo/.git/config``
  ```ini
  [credential]
        username = jzou2000@gmail.com
  ```



