---
title: Univeral Binaries on MacOS
nav: mac univeral bins
---

A univeral binary object is a composite binary that contains multiple binaries for different architectures, which could be
* 32-bit and 64-bit for hardwares that use Intel CPUs before Apple M1 was released on Nov 2020.
* Intel (x86_64) and Apple Arm (arm64) for hardwares that use M1 and later. always 64-bits

## "Standard" procedure to build univeral binaries

* build for each architecture separately
* use ``lipo`` to create a single univeral binary from multiple single-architecture binaries

Reference
* [Apple Developer: Building a Universal macOS Binary](https://developer.apple.com/documentation/apple-silicon/building-a-universal-macos-binary?preferredLanguage=occ)
* [Porting Your macOS Apps to Apple Silicon](https://developer.apple.com/documentation/apple-silicon/porting-your-macos-apps-to-apple-silicon)

## Compiler and Link options to build for one or more architecture

* default (e.g. 64-bit for intel cpu, or arm64 for M1 cpu), nothing need to do
* specified architecture
  * ``-arch i386``
  * ``-arch x86_64``
  * ``-arch arm64``
* build univeral binary directly with multiple ``-arch`` options
  ```make
  MULTIARCH := -arch x86_64 -arch arm64
  CXXFLAGS  += $(MULTIARCH)
  LDFLAGS   += $(MULTIARCH)

  app: main.o mymod.o
    $(CXX) -o $@ $(LDFLAGS) $^

  .cpp.o:
    $(CXX) -c $(CXXFLAGS) $<

  ```

## AR issue and its replacement

GNU ar tool is not compatible with multiarch objects
* multiarch .o files can be processed as normal .o files by **``ar``**, but they can't be recognized by the linker
  * using ``s`` command to create archive index makes .a file **fat**, which is acceptable to linker, but you can't use ``ar`` for further process.

Apple's solution is to use ``libtool`` to replace ``ar``, however ``libtool`` can only create but update static libraries, ``.a`` file. So there's no benefit (for now) comparing to ``ar crs``
```sh
libtool -static -o libmy.a foo.o bar.o
```
* ``libtool`` can also be used to create dynamic libraries.
