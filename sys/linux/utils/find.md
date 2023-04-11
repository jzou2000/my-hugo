---
title: find
nav: find
---

### Common Options
|type  |arg            |example        |description                    |also|
|:-----|:--------------|:--------------|:------------------------------|:----|
|test  |+n             |+5             |greater than n                 |-n (less), n (equal)|
|      |-amin n        |-amin 5        |accessed n minutes ago         |-cmin (change),-mmin (modify)|
|      |-anewer ref    |-anewer main.o |accessed after the modification of ref file||
|      |-atime n       |-atime 2       |accesed n*24 hours ago|-ctime,-mtime||
|      |-newer ref     |               |inode status change is newer than ref modification||
|      |-name pattern  |-name *.o      |name (glob) pattern            |-path whole_path_pattern|
|      |-regex pattern |-regex '.*abc.'|name of RE pattern (instead of glob)||
|      |-size n        |-size -5k      |size of the file, support M/G/...||
|      |-type t        |-type d        |file type (f-file,d-dir,s-socket,...)||
|      |-perm -mode    |-perm -g=w     |check permission, all of perm  |mode,/mode|
|      |-user name     |-user jzou     |owner is name                  |-uid n|
|action|-print         |               |print the file name (default)  ||
|      |-delete        |               |delete the file                ||
|      |-exec cmd      |-exec rm {} \\; |execute a command, pass file as {}|-ok cmd, ask|
|      |-printf fmt    |-printf '%P %s\n'|similar to printf(3C)|-fprintf, -printf0|
|operator|()           |\( -type f \)  | group                         ||
|        |!            |! -amin 2      |not                            |-not, -a, -and, -o, -or|
|misc|-maxdepth levels |-maxdepth 3|max depths in recursive, 0 for no-subfolders||

Note
* ``-regex`` use ``grep`` pattern by default. To use other pattern, set by ``-regextype``,
  available values are
  * ed
  * emacs
  * gnu-awk
  * grep
  * posix-awk
  * awk
  * posix-basic
  * posix-egrep
  * egrep
  * posix-extended
  * posix-minimal-basic
  * sed
  or use an invalid value (e.g. ``help`` to get a list)
  ```
  find * -regextype posix-extended
   
### Recipes

* simple
  ```bash
  jasonz@VANLWIN0056:~/pkg/mpir2-gcc44$ find . -type f
  ./release32/include/mpir.h
  ./release32/lib/libmpir.so.8.2.1
  ./release32/lib/libmpir.la
  ./release32/lib/libmpir.a
  ./release64/include/mpir.h
  ./release64/lib/libmpir.so.8.2.1
  ./release64/lib/libmpir.la
  ./release64/lib/libmpir.a
  ```
* get list of all source files, excluding
  * list only files (not directories)
  * skip *.[od]      compile output
  * skip *.flist     output of script
  * skip b/*         shadow build at b/
  * skip *.tar       
  ```bash
  # get list of all source files:
  find * -type f -not -name '*.[od]' -and -not -name '*.flist' -and -not   -name '*.tar' -and -not -path 'b/*' > src.flist
  tar cvf src.tar --files-from=src.flist
  ```
* customized output format
  ```bash
  jasonz@VANLWIN0056:~/pkg/mpir2-gcc44$ find . -type f -name 'lib*' -printf '%-40P %5k %CD %Cr\n'
  release32/lib/libmpir.so.8.2.1             484 04/27/21 03:54:16 PM
  release32/lib/libmpir.la                     4 04/27/21 03:54:16 PM
  release32/lib/libmpir.a                    952 04/27/21 03:54:16 PM
  release64/lib/libmpir.so.8.2.1             724 04/27/21 03:45:42 PM
  release64/lib/libmpir.la                     4 04/27/21 03:45:42 PM
  release64/lib/libmpir.a                   1388 04/27/21 03:45:42 PM
  ```
  common printf fields
  |format|example|description|
  |-----|-------|-----------|
  |%a   |%a     |last a=access, c=created, t=modified time in format of ctime|
  |%f   |       |file name only, with leading path stripped|
  |%h   |       |leading path|
  |%p   |       |file full name|
  |%P   |%-40P  |file name start from find-root, width=40, left-align|
  |%k   |%5k    |file size in kilo, width=5|
  |%s   |       |file size in bytes|
  |%A   |%Ar    |last access time, with customize format|
  |     |D      |month/date/year|
  |     |r      |local time 12-hour|
  |     |H      |H=hour, M=minute, S=second-with-fraction|
  |%C   |%CD    |create time, with customize format|
  |%T   |%TD    |last modified time, with customize format|
  
