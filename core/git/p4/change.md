---
title: Changes and change
nav: changes/change
---

## list changes

List pending CL of client ``jasonz_wslx``.
```bash
jasonz@VANLWIN0056:~/xhome/stk/mk$ p4 changes -c jasonz_wslx -s pending
Change 843369 on 2022/04/13 by jasonz@jasonz_wslx *pending* 'unshelve of 808307 update stk '
```

Other status (``-s``) value:
* pending
* shelved
* submitted


## change - create, edit, delete a CL

* create
  ```sh
  jasonz@VANLWIN0056:~/xhome/stk/mk$ p4 change
  Change 843374 created.
  ```
  create a new CL, usually need to edit description
* edit
  ```sh
  p4 change 12345
  ```
* delete
  ```sh
  p4 change -d 12345
  ```
  no file should be opened in the CL.
  Use following command to rever open files.
  ```sh
  p4 revert -c 12345 //SimbaTestTools/stk/Trunk/mk/...
  ```
  revert all files in //SimbaTestTools/stk/Trunk/mk/ of CL12345
* other flags
  * -o write to stdout
  * -i input from stdin


## unshelve

Unshelve CL 12345 to default CL
```sh
p4 unshelve -s 12345
```

Unshelve CL 12345 to CL 55555
```sh
p4 unshelve -s 12345 -c 55555
```

Note:
* ``-f`` forces the clobbering of any writeable but unopened files that are being unshelved.

## edit a file

Open a file //path/to/file to change-list 12345 for editing.
```sh
p4 edit -c 12345 //path/to/file
```

* default CL is used if CL is missing
* ``-t type``
* ``-n`` preview
* ``-k`` change local file editable without update meta data in server, for example, edit for build.