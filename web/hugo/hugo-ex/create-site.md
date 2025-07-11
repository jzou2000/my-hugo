---
title: Create a New Hugo Site
nav: create a site
---

```sh
jasonz@VANLWIN0056:~/codex/hugo$ hugo new site hugo-ex
Congratulations! Your new Hugo site is created in /home/jasonz/codex/hugo/hugo-ex.

Just a few more steps and you're ready to go:

1. Download a theme into the same-named folder.
   Choose a theme from https://themes.gohugo.io/ or
   create your own with the "hugo new theme <THEMENAME>" command.
2. Perhaps you want to add some content. You can add single files
   with "hugo new <SECTIONNAME>/<FILENAME>.<FORMAT>".
3. Start the built-in live server via "hugo server".

Visit https://gohugo.io/ for quickstart guide and full documentation.
jasonz@VANLWIN0056:~/codex/hugo$ ls -l
total 4
drwxr-xr-x 10 jasonz unixusers 4096 Sep 25 13:44 hugo-ex
jasonz@VANLWIN0056:~/codex/hugo$ ls hugo-ex
archetypes  assets  config.toml  content  data  layouts  public  static  themes
jasonz@VANLWIN0056:~/codex/hugo$ find hugo-ex
hugo-ex
hugo-ex/data
hugo-ex/layouts
hugo-ex/assets
hugo-ex/content
hugo-ex/config.toml
hugo-ex/static
hugo-ex/public
hugo-ex/themes
hugo-ex/archetypes
hugo-ex/archetypes/default.md
jasonz@VANLWIN0056:~/codex/hugo$
```

Make a git repo for version control
```sh
$ cd hugo-ex
$ git init .
$ cat > .gitignore
public/
themes/van/
.*
$ 
```

