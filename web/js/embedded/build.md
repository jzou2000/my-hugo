---
title: Build qjs
date: 2020-05-16
description: build qjs on different platforms, problems and solutions
---

## Build with offical Makefile on OSX

```sh
jasonzou@Jasons-MBP quickjs % make
mkdir -p .obj .obj/examples .obj/tests
clang -g -Wall -MMD -MF .obj/quickjs.check.o.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/quickjs.check.o.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -DCONFIG_CHECK_JSVALUE -c -o .obj/quickjs.check.o quickjs.c
clang -g -Wall -MMD -MF .obj/qjs.check.o.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/qjs.check.o.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -DCONFIG_CHECK_JSVALUE -c -o .obj/qjs.check.o qjs.c
clang -g -Wall -MMD -MF .obj/qjs.o.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/qjs.o.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -O2 -flto -c -o .obj/qjs.o qjs.c
clang -g -Wall -MMD -MF .obj/qjsc.o.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/qjsc.o.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -DCONFIG_CC=\"clang\" -DCONFIG_PREFIX=\"/usr/local\" -DCONFIG_LTO -O2 -flto -c -o .obj/qjsc.o qjsc.c
clang -g -Wall -MMD -MF .obj/quickjs.o.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/quickjs.o.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -O2 -flto -c -o .obj/quickjs.o quickjs.c
clang -g -Wall -MMD -MF .obj/libregexp.o.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/libregexp.o.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -O2 -flto -c -o .obj/libregexp.o libregexp.c
clang -g -Wall -MMD -MF .obj/libunicode.o.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/libunicode.o.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -O2 -flto -c -o .obj/libunicode.o libunicode.c
clang -g -Wall -MMD -MF .obj/cutils.o.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/cutils.o.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -O2 -flto -c -o .obj/cutils.o cutils.c
clang -g -Wall -MMD -MF .obj/quickjs-libc.o.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/quickjs-libc.o.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -O2 -flto -c -o .obj/quickjs-libc.o quickjs-libc.c
quickjs-libc.c:2407:14: warning: assigning to 'char *' from 'const char [14]' discards qualifiers
      [-Wincompatible-pointer-types-discards-qualifiers]
        path = "/bin:/usr/bin";
             ^ ~~~~~~~~~~~~~~~
quickjs-libc.c:2452:19: error: use of undeclared identifier 'environ'
    char **envp = environ;
                  ^
quickjs-libc.c:2628:17: error: use of undeclared identifier 'environ'
    if (envp != environ) {
                ^
1 warning and 2 errors generated.
make: *** [.obj/quickjs-libc.o] Error 1
jasonzou@Jasons-MBP quickjs % git checkout -b myplay

```

Make a branch ``myplay``, edit and fix in ``quickjs-libc.h``
```sh
jasonzou@Jasons-MBP quickjs % git checkout -b myplay
jasonzou@Jasons-MBP quickjs % git commit
jasonzou@Jasons-MBP quickjs % git log -p -1
commit 130f349d885f1266f85ded55de4e2dea20bed9e0 (HEAD -> myplay)
Author: Jason Zou <jasonzou@Jasons-MBP.hitronhub.home>
Date:   Sat May 16 13:18:54 2020 -0700

    fix compile error of missing extern char** environ

diff --git a/quickjs-libc.h b/quickjs-libc.h
index 93a53da..478c751 100644
--- a/quickjs-libc.h
+++ b/quickjs-libc.h
@@ -28,6 +28,13 @@
 #include <stdlib.h>
 
 #include "quickjs.h"
+#ifdef __cplusplus
+extern "C" {
+#endif
+extern char** environ;
+#ifdef __cplusplus
+}
+#endif
 
 JSModuleDef *js_init_module_std(JSContext *ctx, const char *module_name);
 JSModuleDef *js_init_module_os(JSContext *ctx, const char *module_name);
```

Continue to build

```sh
jasonzou@Jasons-MBP quickjs % make
clang -g -Wall -MMD -MF .obj/qjs.check.o.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/qjs.check.o.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -DCONFIG_CHECK_JSVALUE -c -o .obj/qjs.check.o qjs.c
clang -g -Wall -MMD -MF .obj/qjs.o.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/qjs.o.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -O2 -flto -c -o .obj/qjs.o qjs.c
clang -g -Wall -MMD -MF .obj/qjsc.o.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/qjsc.o.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -DCONFIG_CC=\"clang\" -DCONFIG_PREFIX=\"/usr/local\" -DCONFIG_LTO -O2 -flto -c -o .obj/qjsc.o qjsc.c
clang -g -Wall -MMD -MF .obj/quickjs-libc.o.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/quickjs-libc.o.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -O2 -flto -c -o .obj/quickjs-libc.o quickjs-libc.c
quickjs-libc.c:2407:14: warning: assigning to 'char *' from 'const char [14]' discards qualifiers
      [-Wincompatible-pointer-types-discards-qualifiers]
        path = "/bin:/usr/bin";
             ^ ~~~~~~~~~~~~~~~
1 warning generated.
clang -g -Wall -MMD -MF .obj/libbf.o.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/libbf.o.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -O2 -flto -c -o .obj/libbf.o libbf.c
clang -g -flto -o qjsc .obj/qjsc.o .obj/quickjs.o .obj/libregexp.o .obj/libunicode.o .obj/cutils.o .obj/quickjs-libc.o .obj/libbf.o -lm -ldl
./qjsc -c -o repl.c -m repl.js
clang -g -Wall -MMD -MF .obj/repl.o.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/repl.o.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -O2 -flto -c -o .obj/repl.o repl.c
./qjsc -fbignum -c -o qjscalc.c qjscalc.js
clang -g -Wall -MMD -MF .obj/qjscalc.o.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/qjscalc.o.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -O2 -flto -c -o .obj/qjscalc.o qjscalc.c
clang -g -flto -rdynamic -o qjs .obj/qjs.o .obj/repl.o .obj/quickjs.o .obj/libregexp.o .obj/libunicode.o .obj/cutils.o .obj/quickjs-libc.o .obj/libbf.o .obj/qjscalc.o -lm -ldl
clang -g -Wall -MMD -MF .obj/run-test262.o.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/run-test262.o.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -O2 -flto -c -o .obj/run-test262.o run-test262.c
clang -g -flto -o run-test262 .obj/run-test262.o .obj/quickjs.o .obj/libregexp.o .obj/libunicode.o .obj/cutils.o .obj/quickjs-libc.o .obj/libbf.o -lm -ldl -lpthread
ln -sf qjs qjscalc
clang -g -Wall -MMD -MF .obj/.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -O2 -c -o .obj/quickjs.nolto.o quickjs.c
clang -g -Wall -MMD -MF .obj/.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -O2 -c -o .obj/libregexp.nolto.o libregexp.c
clang -g -Wall -MMD -MF .obj/.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -O2 -c -o .obj/libunicode.nolto.o libunicode.c
clang -g -Wall -MMD -MF .obj/.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -O2 -c -o .obj/cutils.nolto.o cutils.c
clang -g -Wall -MMD -MF .obj/.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -O2 -c -o .obj/quickjs-libc.nolto.o quickjs-libc.c
quickjs-libc.c:2407:14: warning: assigning to 'char *' from 'const char [14]' discards qualifiers
      [-Wincompatible-pointer-types-discards-qualifiers]
        path = "/bin:/usr/bin";
             ^ ~~~~~~~~~~~~~~~
1 warning generated.
clang -g -Wall -MMD -MF .obj/.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -O2 -c -o .obj/libbf.nolto.o libbf.c
ar rcs libquickjs.a .obj/quickjs.nolto.o .obj/libregexp.nolto.o .obj/libunicode.nolto.o .obj/cutils.nolto.o .obj/quickjs-libc.nolto.o .obj/libbf.nolto.o
ar rcs libquickjs.lto.a .obj/quickjs.o .obj/libregexp.o .obj/libunicode.o .obj/cutils.o .obj/quickjs-libc.o .obj/libbf.o
./qjsc -e -fno-string-normalize -fno-map -fno-promise -fno-typedarray -fno-typedarray -fno-regexp -fno-json -fno-eval -fno-proxy -fno-date -fno-module-loader -fno-bigint -o hello.c examples/hello.js
clang -g -Wall -MMD -MF .obj/hello.o.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/hello.o.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -O2 -flto -c -o .obj/hello.o hello.c
clang -g -flto -o examples/hello .obj/hello.o .obj/quickjs.o .obj/libregexp.o .obj/libunicode.o .obj/cutils.o .obj/quickjs-libc.o .obj/libbf.o -lm -ldl
./qjsc -fno-string-normalize -fno-map -fno-promise -fno-typedarray -fno-typedarray -fno-regexp -fno-json -fno-eval -fno-proxy -fno-date -m -o examples/hello_module examples/hello_module.js
./qjsc -e -M examples/fib.so,fib -m -o test_fib.c examples/test_fib.js
clang -g -Wall -MMD -MF .obj/test_fib.o.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/test_fib.o.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -O2 -flto -c -o .obj/test_fib.o test_fib.c
clang -g -Wall -MMD -MF .obj/fib.o.d -Wextra -Wno-sign-compare -Wno-missing-field-initializers -Wundef -Wuninitialized -Wunused -Wno-unused-parameter -Wwrite-strings -Wchar-subscripts -funsigned-char -MMD -MF .obj/fib.o.d -D_GNU_SOURCE -DCONFIG_VERSION=\"2020-04-12\" -DCONFIG_BIGNUM -O2 -flto -c -o .obj/examples/fib.o examples/fib.c
clang -g -flto -o examples/test_fib .obj/test_fib.o .obj/examples/fib.o libquickjs.lto.a -lm -ldl
jasonzou@Jasons-MBP quickjs %                                                
```

Check what are added

```sh
jasonzou@Jasons-MBP quickjs % git status
On branch myplay
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.obj/
	examples/hello
	examples/hello_module
	examples/test_fib
	hello.c
	libquickjs.a
	libquickjs.lto.a
	qjs
	qjsc
	qjscalc
	qjscalc.c
	repl.c
	run-test262
	test_fib.c

no changes added to commit (use "git add" and/or "git commit -a")
```

## Build with my general make

TODO

## Build on other Posix

### Linux

### Aix

### Hpux

### Solaris



## Build on Windows

TODO
