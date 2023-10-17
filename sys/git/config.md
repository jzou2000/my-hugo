---
title: Configuration
nav: config
---


## Scope: system, global and local

## Common Settings

```sh
git config user.name 'Jason Zou'
git config user.email 'jzou@gmail.com'
git config --list
git config --show-origin

$ git config --get-all --show-origin user.name
file:/home/jasonz/.gitconfig    Jason Zou
file:.git/config        Bob

git --remove-section user

```

## 