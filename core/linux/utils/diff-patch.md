---
title: Generate and Apply a Patch
nav: diff+patch
description: an example that generates a patch and applies the patch to a repo.
keywords: [patch, diff]
---

## Scenario

* A working folder on linux was copied from Windows
  * need to ignore the difference of \r\n and \n when compare
* Copy happened long time ago, e.g. 1 year
* A few files were changed, we don't remember exactly what and when were changed, roughly in recent month.
* Some folders with binaries, e.g. ``.git`` should be excluded.
* Need to generate a patch file that can be appied on a **clean** repo.

## Steps

* optional: from the working folder, find files that are changed in recent 30 days.
  ```bash
  ~/van$ find * -type f -ctime -30
  layouts/partials/header.html
  layouts/partials/nav-side.html
  ```
  * ``-type f`` find files only
  * ``-ctime -30`` change time in 30*24 hours
* clone a new clean repo
  ```bash
  mkdir ~/tmp/van; cd ~/tmp/van
  git clone https://github.com/jzou2000/van .
  ```
* generate the patch file
  ```bash
  cd ~/van
  diff --strip-trailing-cr -Naur --exclude=.git ~/tmp/van . > ~/tmp/van.patch
  ```
  * ``-strip-trailing-cr`` ingore ``\r\n`` and ``\n`` difference between windows and linux.
  * ``-b`` ignore whites, or ``-Z`` ignore tailing whites, are usually good enough for the same purpose
  * ``-N, --new-file`` treat absent files as empty
  * ``-a, --text`` treat all files as text
  * ``-u, --unified=[NUM]`` output NUM (default 3) lines of unified context, required for ``patch``
  * ``-r, --recursive``
  * ``-x, --exclude=PAT`` exclude files that match PAT, here we exclude files under ``.git`` 
* optional: show the patch file
  ```bash
  cat ~/tmp/van.patch
  diff --strip-trailing-cr -uar '--exclude=.git' /home/jasonz/tmp/van/layouts/partials/header.html ./layouts/partials/header.html
  --- /home/jasonz/tmp/van2/layouts/partials/header.html  2022-06-09 20:30:04.115994600 -0700
  +++ ./layouts/partials/header.html      2022-06-09 16:30:59.865994600 -0700
  @@ -12,7 +12,7 @@
           {{ if .Sections }}
             {{.Title}}
             <div class="nav-menu-item">
  -            {{ range .Sections }}
  +            {{ range .Sections.ByTitle }}
                 {{ partial "href-first-page.html" . }}
               {{ end }}
             </div>
  diff --strip-trailing-cr -uar '--exclude=.git' /home/jasonz/tmp/van/layouts/partials/nav-side.html ./layouts/partials/nav-side.html
  --- /home/jasonz/tmp/van2/layouts/partials/nav-side.html        2022-06-09 20:30:04.115994600 -0700
  +++ ./layouts/partials/nav-side.html    2022-06-09 16:23:50.185994600 -0700
  @@ -18,11 +18,11 @@
  
     <div class='nav-sidebar-title'>{{$sec.Title}}</div>
     {{ if $sec.Sections }}
  -    {{ range $sec.Sections }}
  +    {{ range ($sec.Sections.ByTitle) }}
         <label for="{{.Title}}">{{.Title}}</label>
         <input type="radio" name="nav-sidebar" id="{{.Title}}" {{if eq . $this}}checked{{end}}>
         <div class="nav-sidebar-cascade">
  -        {{ range .Pages }}
  +        {{ range (.Pages.ByParam "nav") }}
             <a href="{{.Permalink}}">{{default .Title .Params.nav}}</a>
           {{ end }}
         </div>
  @@ -31,7 +31,7 @@
  
     {{/* section may have some "direct" pages (that are directly under the section) */}}
     <div class='nav-sidebar-direct'>
  -  {{ range $sec.Pages }}
  +  {{ range ($sec.Pages.ByParam "nav") }}
       {{if .IsPage }}
         <a href="{{.Permalink}}">{{default .Title .Params.nav}}</a>
       {{end}}
  ```
* apply the patch to the clean repo
  ```batch
  cd ~/tmp/van
  patch -p0 < ~/tmp/van.patch
  ```
  * ``-p<num>, --strip=num`` Strip the smallest prefix containing num leading slashes from each file name found in the patch file.
* commit and push to remote
  ```bash
  ~/tmp/van$ git status
  On branch master
  Your branch is up to date with 'origin/master'.
  
  Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git restore <file>..." to discard changes in working directory)
          modified:   layouts/partials/header.html
          modified:   layouts/partials/nav-side.html
  
  no changes added to commit (use "git add" and/or "git commit -a")
  ~/tmp/van$ git add .
  ~/tmp/van$ git commit -m 'change order methods for pulldonw menu and navigator side-bar'
  [master 5fc7d59] change order methods for pulldonw menu and navigator side-bar
  2 files changed, 4 insertions(+), 4 deletions(-)
  ~/tmp/van$ git push
  ```


Note:

* If we just want to find the difference instead of generating patch file, we can omit the option ``-u``
  ```bash
  $ diff --strip-trailing-cr -Nar --exclude=.git ~/tmp/van2 .
  diff --strip-trailing-cr -Nar '--exclude=.git' /home/jasonz/tmp/van/layouts/partials/header.html ./layouts/partials/header.html
  15c15
  <             {{ range .Sections }}
  ---
  >             {{ range .Sections.ByTitle }}
  diff -bar '--exclude=.git' /home/jasonz/tmp/van/layouts/partials/nav-side.html ./layouts/partials/nav-side.html
  21c21
  <     {{ range $sec.Sections }}
  ---
  >     {{ range ($sec.Sections.ByTitle) }}
  25c25
  <         {{ range .Pages }}
  ---
  >         {{ range (.Pages.ByParam "nav") }}
  34c34
  <   {{ range $sec.Pages }}
  ---
  >   {{ range ($sec.Pages.ByParam "nav") }}
  ```
* other useful patch options
  * ``-b`` take a backup before applying patch, the backup files have ``.orig`` extension
  * ``--dry-run`` validate patch without applying
  * ``-R`` reverse or undo a patch
  