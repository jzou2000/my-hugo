---
title: unknown
date: 2019-05-28
tags: [tips, unknown]
---

=@= Configure Simba ODBC drivers
1. Create ODBC DSN file ~/.odbc.ini ($ODBCINI is used to locate it if not at default location)
   SDK contains a template at SimbaEngineSDK/10.0/Examples/Documentation/Setup
   ~/.odbcinst.ini ($ODBCINSTINI) is optional because DSN file gives driver location already
2. Copy drivers to DSN specified location. SDK offers pre-built drivers at
   SimbaEngineSDK/10.0/Examples/Builds/Bin/
3. Copy database files to match DSN, if applicable, SDK offers Quickstart and QuickJson at
   SimbaEngineSDK/10.0/Examples/Databases
    $ODBCINI    ~/.odbc.ini         user DSN
4. Copy driver configure files to $HOME unless specified in $SIMBAINI. Templates of those files
   can be found at SimbaEngineSDK/10.0/Examples/Documentation/Setup
   Each driver has its own ini, e.g. .simba.quickstart.ini
   Update DriverManagerEncoding, ErrorMessagesPath, ODBCInstLib
5. Copy ErrorMessage files to match above configuration from
   SimbaEngineSDK/10.0/DataAccessComponents/ErrorMessages
6. set LD_LIBRARY_PATH to include driver manager (DM), i.e. unixODBC or iodbc,
   it is at /usr/local/lib or /usr/local/odbc/lib depend on installation
   

=@=Expat XML Parser http://expat.sourceforge.net/
C++ Wrappers for the Expat XML Parser
http://www.codeproject.com/Articles/1847/C-Wrappers-for-the-Expat-XML-Parser

=@=bash scripting

substring
string="This is a substring test"
substring=${string:10:9}    # start(0-based),length
search
alpha="This is a test string in which \"test\" is replaced."
beta="${alpha/test/replace}"

=@=python IDE (free)
Spyder - The Scientific PYthon Development EnviRonment
https://github.com/spyder-ide/spyder

IEP - a cross-platform Python IDE focused on interactivity and introspection
http://www.iep-project.org/index.html

=@= build Touchstone 10 on linux
Makefile.mk
    FINAL_TARGET := $(_DERIVED_OBJ_DIR)/Touchstone
    Touchstone.include:
    _LFLAGS     := MOD_LD_OPTIONS MOD_LDFLAGS OS_LD_OPTIONS OS_LDFLAGS LDFLAGS
    _LIB_PATHS  := MOD_LIB_PATHS OS_LIB_PATHS BOOST_LIB_PATHS
    _LIB_NAMES  := MOD_LIB_NAMES OS_LIB_NAMES BOOST_LIB_NAMES
    # BOOST is not used?
    # MOD_ used by SimbaDM only?
    BASE_DIR    := .   (root of project, where you launch make)
    thirdparty.include: (eg)
        SEN_PLATFORM    = centos5
        SEN_COMPILER    = gcc4_4
        SEN_CONFIG      = release64
        ICU_LIB_PATH    = ...
        TOOLS_LIB_PATH  = ...   (should link as obj)
    
=@= make a patch

diff v1 v2 > patch-file     # patch-file contains operations (patch) the make v1 to v2
patch v1 patch-file         # apply patch-file on v1 (so v1 becomes v2)













=@= p4 options
p4 command

-s              prefix each line of output with a tag (error,warning,info,text,exit etc)
-c client       overriding $P4CLIENT
-d dir          current directory, overriding $PWD
-H host         $P4HOST
-I
-G
-p port         sever's listen address ($P4PORT=perfource:1666)
-P pass         $P4PASSWD
-q              supporess all info messages
-u user         $P4USER
-x file         read args, one per line
-z tag

p4 sync
-f              force resync
-n              preview without updating
-N              preview (summary)
-p              populate workspace
-s              safety check using MD5

p4 edit
-c CL#          pending to specified CL
-t filetype
-n              preview



=@= p4 common commands for batch operations

list files under a path
    p4 files //ATA/... # include file#rev - CL
    
list direct sub folders under a path
    p4 dirs //Drivers # show all drivers project

list latest 5 labels of a path
    p4 labels -m 5 //ATA/...
list latest change list
    p4 changes -m 1 //ATA/...
    
list user info
    p4 user odbcproduct
show current client
    p4 client
list opened files (that are in pending changelists)
    p4 opened
get files to workspace
    p4 sync
    p4 sync file#rev
    p4 sync @lable
    p4 sync //depot/proj/...@rev
    p4 sync @2011/06/24
    p4 sync file#none       # delete from workspace

unshelve a file/change list
    p4 unshelve -s changelist [ file_pattern ... ]

    
=@= perforce file name format
file#n              the n-th revision of file
file#m,n            revision range m,n
file#none           nonexistent revision (delete from workspace)
file#0
file#head           head (latest) revision
file#have           the revision on the current client
file@=n             change number
file@n
file@label          file in label
file@clientname     revision of file last taken into client workspace
file@datespec       datespec    yyyy/mm/dd([ :]hh:mm:ss)?
file@now
    
=@= //Drivers structures    
    //Drivers/DocumentDBODBC
        Development/Dev02/Product/...
        Maintenance/1.0/Product/...

    //Drivers/CouchbaseODBC
        Development/Dev01/Product
            Bamboo/...
            Makefiles/...
            Source/...
            Tests/...
        Maintenance/1.0/...
        
        
=@= trigger bamboo plan manually
BSVR=http://10.3.0.7:8085/rest/api/latest   # bamboo REST base
USR=bamboolocaladmin:test                   # user/pwd
PLANKEY=SCHED-TW2012R2B641
curl -X POST --user $USR -data 'bamboo.variable.ftestId=1&bamboo.variable.build=SCHED-TW2012VS2013' $BSVR/queue/$PLANKEY
# variables that are going to be passed to command through bamboo
# have to be prefixed by bamboo.variable.


bamboo_ManualBuildTriggerReason_userName=bamboolocaladmin
bamboo_buildNumber=14
bamboo_buildResultKey=SCHED-TW2012R2B641-JOB1-14
bamboo_buildResultsUrl=http://bergamot3.lakes.ad:8085/browse/SCHED-TW2012R2B641-JOB1-14
bamboo_buildTimeStamp=2016-04-25T16:45:55.386-07:00


=@= list bamboo plan
http://server:port/rest/api/latest/plan
by default it gives only first 25 plans. Can be overridden by start-index=n or max-result=n,
e.g. /plan?start-index=30&max-result=1000

list branches of a plan
/plan/<prjkey-plankey>/branch

give in json format:
/plan.json
/.../branch.json

http://10.3.0.7:8085/rest/api/latest/plan/SCHED/BLANKTEST/
<plan expand="actions,stages,branches,variableContext" key="SCHED-BLANKTEST" name="SchedTest - BlankTest" shortName="BlankTest" shortKey="BLANKTEST" type="chain" enabled="true">
<projectKey>SCHED</projectKey>
<projectName>SchedTest</projectName>
<project key="SCHED" name="SchedTest">
<link href="http://10.3.0.7:8085/rest/api/latest/project/SCHED" rel="self"/>
</project>
<description>Blank test that goes through sched workflow</description>
<buildName>BlankTest</buildName>
<planKey>
<key>SCHED-BLANKTEST</key>
</planKey>
<link href="http://10.3.0.7:8085/rest/api/latest/plan/SCHED-BLANKTEST" rel="self"/>
<isFavourite>false</isFavourite>
<isActive>false</isActive>
<isBuilding>false</isBuilding>
<averageBuildTimeInSeconds>0.0</averageBuildTimeInSeconds>
<actions start-index="0" max-result="1" size="1"/>
<stages start-index="0" max-result="2" size="2"/>
<branches start-index="0" max-result="0" size="0"/>
<variableContext size="8" max-results="8"/>
</plan>



=@= Drivers repo structure

//Drivers/<name>/<branch>/Product
    e.g. name=DocumentDBODBC
         branch = Development/<ver> | Maintenance/<ver> | Trunk | ThirdParty
         ver = e.g. Dev01, 1.0, ...
         
//Drivers/Memphis
    Core
        <branch>
            MPAExampleImpl
            MPAImpBase
            ODBC
    DataSource
    Tools
    
=@= extract info from Perforce depot
list all drivers
p4 dirs //Drivers/*
//Drivers/Apollonius
//Drivers/BigQueryJDBC
//Drivers/CassandraJDBC
//Drivers/CassandraODBC
//Drivers/Cayley
//Drivers/CLIDSI
//Drivers/Codebase
...

list branch root of a driver (see above driver repo structure)
p4 dirs //Drivers/DocumentDBODBC/*/Product
//Drivers/DocumentDBODBC/Trunk/Product

p4 dirs //Drivers/DocumentDBODBC/*/*/Product
//Drivers/DocumentDBODBC/Development/Dev01/Product
//Drivers/DocumentDBODBC/Development/Dev02/Product
//Drivers/DocumentDBODBC/Maintenance/1.0/Product


=@= database used by skipper
SKIPPER=192.168.223.101
psql -U sched -d sched -h $SKIPPER

\dt                 list all tables
\d  table           describe a table

agent, arch, build, compiler, db, dbinstance, dbrb, driver, ftest, ftrb, os

dbinstance - resource
id, using, typeid, url, key, value  - host,port,db_id,acc,pwd

=@= install/config pydev for eclipse
Install New Software...|Add ...
    Name: PyDev and PyDev Extensions
    Location: http://pydev.org/updates

=@= libFuzzer
1. download libFuzzer
    git clone https://chromium.googlesource.com/chromium/src/tools/clang
2.1 with clang++
    mkdir libFuzzer.build
    cd libFuzzer.build
    clang++ -c -g -O2 -std=c++11 ../Fuzzer/*.cpp -I../Fuzzzer
2.2 with g++
    mkdir libFuzzer.build2
    cd libFuzzer.build2
    ++ -c -g -O2 -std=c++11 ../Fuzzer/*.cpp -I../Fuzzzer
3. make libFuzzer.a
    ar ruv libFuzzer.a Fuzzer*.o
4. make target application with llvm and libfuzzer
    // fuzz_target.cc
    extern "C" int LLVMFuzzerTestOneInput(const uint8_t *Data, size_t Size) {
      DoSomethingInterestingWithMyAPI(Data, Size);
      return 0;  // Non-zero return values are reserved for future use.
    }

    clang++ -fsanitizer=address -fsanitize-coverage=edge fuzz_target.cc libFuzzer.a -o my_fuzzer
5. run fuzzer
    afl-fuzz -i ipath -o opath -- ./my_fuzzer [@@]


=@= Setup LLVM on Windows

1. Download CMake http://cmake.org 3.6.0-win64-x64.msi
2. Download LLVM-3.8.0-win64.exe

    
=@= ATA bamboo secret
p4 user: odbcproduct
p4 workspace: bamboo_B3-CentOS5v3-01

=@= local (jasonz) pg database
psql -d ata -U ata


OVERVIEW: clang LLVM compiler

USAGE: clang++.exe [options] <inputs>

OPTIONS:
  -###                    Print (but do not run) the commands to run for this compilation
  --analyze               Run the static analyzer
  -arcmt-migrate-emit-errors
                          Emit ARC errors even if the migrator can fix them
  -arcmt-migrate-report-output <value>
                          Output path for the plist report
  --cuda-device-only      Do device-side CUDA compilation only
  --cuda-host-only        Do host-side CUDA compilation only
  --cuda-path=<value>     CUDA installation path
  -cxx-isystem <directory>
                          Add directory to the C++ SYSTEM include search path
  -c                      Only run preprocess, compile, and assemble steps
  -dD                     Print macro definitions in -E mode in addition to normal output
  -dependency-dot <value> Filename to write DOT-formatted header dependencies to
  -dependency-file <value>
                          Filename (or -) to write dependency output to
  -dM                     Print macro definitions in -E mode instead of normal output
  -emit-ast               Emit Clang AST files for source inputs
  -emit-llvm              Use the LLVM representation for assembler and object files
  -E                      Only run the preprocessor
  -faltivec               Enable AltiVec vector initializer syntax
  -fansi-escape-codes     Use ANSI escape codes for diagnostics
  -fapple-kext            Use Apple's kernel extensions ABI
  -fapple-pragma-pack     Enable Apple gcc-compatible #pragma pack handling
  -fapplication-extension Restrict code to those available for App Extensions
  -fblocks                Enable the 'blocks' language feature
  -fborland-extensions    Accept non-standard constructs supported by the Borland compiler
  -fbuild-session-file=<file>
                          Use the last modification time of <file> as the build session timestamp
  -fbuild-session-timestamp=<time since Epoch in seconds>
                          Time when the current build session started
  -fcolor-diagnostics     Use colors in diagnostics
  -fcomment-block-commands=<arg>
                          Treat each comma separated argument in <arg> as a documentation comment block command
  -fcoverage-mapping      Generate coverage mapping to enable code coverage analysis
  -fcxx-exceptions        Enable C++ exceptions
  -fdata-sections         Place each data in its own section (ELF Only)
  -fdebug-prefix-map=<value>
                          remap file source paths in debug info
  -fdebug-types-section   Place debug types in their own section (ELF Only)
  -fdeclspec              Allow __declspec as a keyword
  -fdelayed-template-parsing
                          Parse templated function definitions at the end of the translation unit
  -fdiagnostics-parseable-fixits
                          Print fix-its in machine parseable form
  -fdiagnostics-print-source-range-info
                          Print source range spans in numeric form
  -fdiagnostics-show-note-include-stack
                          Display include stacks for diagnostic notes
  -fdiagnostics-show-option
                          Print option name with mappable diagnostics
  -fdiagnostics-show-template-tree
                          Print a template comparison tree for differing templates
  -fdollars-in-identifiers
                          Allow '$' in identifiers
  -femit-all-decls        Emit all declarations, even if unused
  -femulated-tls          Use emutls functions to access thread_local variables
  -fexceptions            Enable support for exception handling
  -ffast-math             Enable the *frontend*'s 'fast-math' mode. This has no effect on optimizations, but provides a preprocessor macro __FAST_MATH__ the same as GCC's -ffast-math flag
  -ffixed-r9              Reserve the r9 register (ARM only)
  -ffixed-x18             Reserve the x18 register (AArch64 only)
  -ffp-contract=<value>   Form fused FP ops (e.g. FMAs): fast (everywhere) | on (according to FP_CONTRACT pragma, default) | off (never fuse)
  -ffreestanding          Assert that the compilation takes place in a freestanding environment
  -ffunction-sections     Place each function in its own section (ELF Only)
  -fgnu-keywords          Allow GNU-extension keywords regardless of language standard
  -fgnu-runtime           Generate output compatible with the standard GNU Objective-C runtime
  -fgnu89-inline          Use the gnu89 inline semantics
  -fimplicit-module-maps  Implicitly search the file system for module map files.
  -finstrument-functions  Generate calls to instrument function entry and exit
  -fintegrated-as         Enable the integrated assembler
  -flto=<value>           Set LTO mode to either 'full' or 'thin'
  -flto                   Enable LTO in 'full' mode
  -fmath-errno            Require math functions to indicate errors by setting errno
  -fmax-type-align=<value>
                          Specify the maximum alignment to enforce on pointers lacking an explicit alignment
  -fmodule-file=<file>    Load this precompiled module file
  -fmodule-map-file=<file>
                          Load this module map file
  -fmodule-name= <name>   Specify the name of the module to build
  -fmodules-cache-path=<directory>
                          Specify the module cache path
  -fmodules-decluse       Require declaration of modules used within a module
  -fmodules-ignore-macro=<value>
                          Ignore the definition of the given macro when building and loading modules
  -fmodules-prune-after=<seconds>
                          Specify the interval (in seconds) after which a module file will be considered unused
  -fmodules-prune-interval=<seconds>
                          Specify the interval (in seconds) between attempts to prune the module cache
  -fmodules-search-all    Search even non-imported modules to resolve references
  -fmodules-strict-decluse
                          Like -fmodules-decluse but requires all headers to be in modules
  -fmodules-user-build-path <directory>
                          Specify the module user build path
  -fmodules-validate-once-per-build-session
                          Don't verify input files for the modules if the module has been successfully validated or loaded during this build session
  -fmodules-validate-system-headers
                          Validate the system headers that a module depends on when loading the module
  -fmodules               Enable the 'modules' language feature
  -fms-compatibility-version=<value>
                          Dot-separated value representing the Microsoft compiler version number to report in _MSC_VER (0 = don't define it (default))
  -fms-compatibility      Enable full Microsoft Visual C++ compatibility
  -fms-extensions         Accept some non-standard constructs supported by the Microsoft compiler
  -fmsc-version=<value>   Microsoft compiler version number to report in _MSC_VER (0 = don't define it (default))
  -fno-access-control     Disable C++ access control
  -fno-assume-sane-operator-new
                          Don't assume that C++'s global operator new can't alias any pointer
  -fno-autolink           Disable generation of linker directives for automatic library linking
  -fno-builtin-<value>    Disable implicit builtin knowledge of a specific function
  -fno-builtin            Disable implicit builtin knowledge of functions
  -fno-common             Compile common globals like normal definitions
  -fno-constant-cfstrings Disable creation of CodeFoundation-type constant strings
  -fno-coverage-mapping   Disable code coverage analysis
  -fno-declspec           Disallow __declspec as a keyword
  -fno-diagnostics-fixit-info
                          Do not include fixit information in diagnostics
  -fno-dollars-in-identifiers
                          Disallow '$' in identifiers
  -fno-elide-constructors Disable C++ copy constructor elision
  -fno-elide-type         Do not elide types when printing diagnostics
  -fno-gnu-inline-asm     Disable GNU style inline asm
  -fno-integrated-as      Disable the integrated assembler
  -fno-lax-vector-conversions
                          Disallow implicit conversions between vectors with a different number of elements or different element types
  -fno-lto                Disable LTO mode (default)
  -fno-math-builtin       Disable implicit builtin knowledge of math functions
  -fno-merge-all-constants
                          Disallow merging of constants
  -fno-objc-infer-related-result-type
                          do not infer Objective-C related result type based on method family
  -fno-operator-names     Do not treat C++ operator name keywords as synonyms for operators
  -fno-profile-instr-generate
                          Disable generation of profile instrumentation.
  -fno-profile-instr-use  Disable using instrumentation data for profile-guided optimization
  -fno-reroll-loops       Turn off loop reroller
  -fno-rtti               Disable generation of rtti information
  -fno-sanitize-blacklist Don't use blacklist file for sanitizers
  -fno-sanitize-cfi-cross-dso
                          Disable control flow integrity (CFI) checks for cross-DSO calls.
  -fno-sanitize-coverage=<value>
                          Disable specified features of coverage instrumentation for Sanitizers
  -fno-sanitize-memory-track-origins
                          Disable origins tracking in MemorySanitizer
  -fno-sanitize-recover=<value>
                          Disable recovery for specified sanitizers
  -fno-sanitize-trap=<value>
                          Disable trapping for specified sanitizers
  -fno-short-wchar        Force wchar_t to be an unsigned int
  -fno-show-column        Do not include column number on diagnostics
  -fno-show-source-location
                          Do not include source location information with diagnostics
  -fno-signed-char        Char is unsigned
  -fno-signed-zeros       Allow optimizations that ignore the sign of floating point zeros
  -fno-spell-checking     Disable spell-checking
  -fno-stack-protector    Disable the use of stack protectors
  -fno-standalone-debug   Limit debug information produced to reduce size of debug binary
  -fno-threadsafe-statics Do not emit code to make initialization of local statics thread safe
  -fno-trigraphs          Do not process trigraph sequences
  -fno-unroll-loops       Turn off loop unroller
  -fno-use-cxa-atexit     Don't use __cxa_atexit for calling destructors
  -fno-use-init-array     Don't use .init_array instead of .ctors
  -fobjc-arc-exceptions   Use EH-safe code when synthesizing retains and releases in -fobjc-arc
  -fobjc-arc              Synthesize retain and release calls for Objective-C pointers
  -fobjc-exceptions       Enable Objective-C exceptions
  -fobjc-gc-only          Use GC exclusively for Objective-C related memory management
  -fobjc-gc               Enable Objective-C garbage collection
  -fobjc-runtime=<value>  Specify the target Objective-C runtime kind and version
  -fobjc-weak             Enable ARC-style weak references in Objective-C
  -fpack-struct=<value>   Specify the default maximum struct packing alignment
  -fpascal-strings        Recognize and construct Pascal-style string literals
  -fpcc-struct-return     Override the default ABI to return all structs on the stack
  -fplugin=<dsopath>      Load the named plugin (dynamic shared object)
  -fprofile-generate=<directory>
                          Generate instrumented code to collect execution counts into <directory>/default.profraw (overridden by LLVM_PROFILE_FILE env var)
  -fprofile-instr-generate=<file>
                          Generate instrumented code to collect execution counts into <file> (overridden by LLVM_PROFILE_FILE env var)
  -fprofile-instr-generate
                          Generate instrumented code to collect execution counts into default.profraw file (overriden by '=' form of option or LLVM_PROFILE_FILE env var)
  -fprofile-instr-use=<value>
                          Use instrumentation data for profile-guided optimization
  -fprofile-sample-use=<value>
                          Enable sample-based profile guided optimizations
  -fprofile-use=<pathname>
                          Use instrumentation data for profile-guided optimization. If pathname is a directory, it reads from <pathname>/default.profdata. Otherwise, it reads from file <pathname>.
  -freciprocal-math       Allow division operations to be reassociated
  -freg-struct-return     Override the default ABI to return small structs in registers
  -freroll-loops          Turn on loop reroller
  -fsanitize-address-field-padding=<value>
                          Level of field padding for AddressSanitizer
  -fsanitize-blacklist=<value>
                          Path to blacklist file for sanitizers
  -fsanitize-cfi-cross-dso
                          Enable control flow integrity (CFI) checks for cross-DSO calls.
  -fsanitize-coverage=<value>
                          Specify the type of coverage instrumentation for Sanitizers
  -fsanitize-memory-track-origins=<value>
                          Enable origins tracking in MemorySanitizer
  -fsanitize-memory-track-origins
                          Enable origins tracking in MemorySanitizer
  -fsanitize-memory-use-after-dtor
                          Enable use-after-destroy detection in MemorySanitizer
  -fsanitize-recover=<value>
                          Enable recovery for specified sanitizers
  -fsanitize-trap=<value> Enable trapping for specified sanitizers
  -fsanitize=<check>      Turn on runtime checks for various forms of undefined or suspicious behavior. See user manual for available checks
  -fshort-enums           Allocate to an enum type only as many bytes as it needs for the declared range of possible values
  -fshort-wchar           Force wchar_t to be a short unsigned int
  -fshow-overloads=<value>
                          Which overload candidates to show when overload resolution fails: best|all; defaults to all
  -fsized-deallocation    Enable C++14 sized global deallocation functions
  -fslp-vectorize-aggressive
                          Enable the BB vectorization passes
  -fslp-vectorize         Enable the superword-level parallelism vectorization passes
  -fstack-protector-all   Force the usage of stack protectors for all functions
  -fstack-protector-strong
                          Use a strong heuristic to apply stack protectors to functions
  -fstack-protector       Enable stack protectors for functions potentially vulnerable to stack smashing
  -fstandalone-debug      Emit full debug info for all types used by the program
  -fstrict-enums          Enable optimizations based on the strict definition of an enum's value range
  -fstrict-vtable-pointers
                          Enable optimizations based on the strict rules for overwriting polymorphic C++ objects
  -fthinlto-index=<value> Perform ThinLTO importing using provided function summary index
  -ftrap-function=<value> Issue call to specified function rather than a trap instruction
  -ftrapv-handler=<function name>
                          Specify the function to be called on overflow
  -ftrapv                 Trap on integer overflow
  -ftrigraphs             Process trigraph sequences
  -funique-section-names  Use unique names for text and data sections (ELF Only)
  -funroll-loops          Turn on loop unroller
  -fuse-init-array        Use .init_array instead of .ctors
  -fveclib=<value>        Use the given vector functions library
  -fvectorize             Enable the loop vectorization passes
  -fvisibility-inlines-hidden
                          Give inline C++ member functions default visibility by default
  -fvisibility-ms-compat  Give global types 'default' visibility and global functions and variables 'hidden' visibility by default
  -fvisibility=<value>    Set the default symbol visibility for all global declarations
  -fwrapv                 Treat signed integer overflow as two's complement
  -fwritable-strings      Store string literals as writable data
  -fzvector               Enable System z vector language extension
  -F <value>              Add directory to framework include search path
  --gcc-toolchain=<value> Use the gcc toolchain at the given directory
  -gcodeview              Generate CodeView debug information
  -gdwarf-2               Generate source-level debug information with dwarf version 2
  -gdwarf-3               Generate source-level debug information with dwarf version 3
  -gdwarf-4               Generate source-level debug information with dwarf version 4
  -gdwarf-5               Generate source-level debug information with dwarf version 5
  -gline-tables-only      Emit debug line number tables only
  -gmodules               Generate debug info with external references to clang modules or precompiled headers
  -g                      Generate source-level debug information
  -help                   Display available options
  -H                      Show header includes and nesting depth
  -idirafter <value>      Add directory to AFTER include search path
  -iframework <value>     Add directory to SYSTEM framework search path
  -imacros <file>         Include macros from file before parsing
  -include-pch <file>     Include precompiled header file
  -include <file>         Include file before parsing
  -index-header-map       Make the next included directory (-I or -F) an indexer header map
  -iprefix <dir>          Set the -iwithprefix/-iwithprefixbefore prefix
  -iquote <directory>     Add directory to QUOTE include search path
  -isysroot <dir>         Set the system root directory (usually /)
  -isystem <directory>    Add directory to SYSTEM include search path
  -ivfsoverlay <value>    Overlay the virtual filesystem described by file over the real file system
  -iwithprefixbefore <dir>
                          Set directory to include search path with prefix
  -iwithprefix <dir>      Set directory to SYSTEM include search path with prefix
  -iwithsysroot <directory>
                          Add directory to SYSTEM include search path, absolute paths are relative to -isysroot
  -I <value>              Add directory to include search path
  -mabicalls              Enable SVR4-style position-independent code (Mips only)
  -mcrc                   Allow use of CRC instructions (ARM only)
  -MD                     Write a depfile containing user and system headers
  -meabi <value>          Set EABI type, e.g. 4, 5 or gnu (default depends on triple)
  -mfix-cortex-a53-835769 Workaround Cortex-A53 erratum 835769 (AArch64 only)
  -mfp32                  Use 32-bit floating point registers (MIPS only)
  -mfp64                  Use 64-bit floating point registers (MIPS only)
  -MF <file>              Write depfile output from -MMD, -MD, -MM, or -M to <file>
  -mgeneral-regs-only     Generate code which only uses the general purpose registers (AArch64 only)
  -mglobal-merge          Enable merging of globals
  -MG                     Add missing headers to depfile
  -mhvx-double            Enable Hexagon Double Vector eXtensions
  -mhvx                   Enable Hexagon Vector eXtensions
  --migrate               Run the migrator
  -mincremental-linker-compatible
                          (integrated-as) Emit an object file which can be used with an incremental linker
  -mios-version-min=<value>
                          Set iOS deployment target
  -mllvm <value>          Additional arguments to forward to LLVM's option processing
  -mlong-calls            Generate an indirect jump to enable jumps further than 64M
  -mmacosx-version-min=<value>
                          Set Mac OS X deployment target
  -MMD                    Write a depfile containing user headers
  -mms-bitfields          Set the default structure layout to be compatible with the Microsoft compiler standard
  -mmsa                   Enable MSA ASE (MIPS only)
  -MM                     Like -MMD, but also implies -E and writes to stdout by default
  -mno-abicalls           Disable SVR4-style position-independent code (Mips only)
  -mno-fix-cortex-a53-835769
                          Don't workaround Cortex-A53 erratum 835769 (AArch64 only)
  -mno-global-merge       Disable merging of globals
  -mno-hvx-double         Disable Hexagon Double Vector eXtensions
  -mno-hvx                Disable Hexagon Vector eXtensions
  -mno-implicit-float     Don't generate implicit floating point instructions
  -mno-incremental-linker-compatible
                          (integrated-as) Emit an object file which cannot be used with an incremental linker
  -mno-long-calls         Restore the default behaviour of not generating long calls
  -mno-movt               Disallow use of movt/movw pairs (ARM only)
  -mno-ms-bitfields       Do not set the default structure layout to be compatible with the Microsoft compiler standard
  -mno-msa                Disable MSA ASE (MIPS only)
  -mno-restrict-it        Allow generation of deprecated IT blocks for ARMv8. It is off by default for ARMv8 Thumb mode
  -mno-unaligned-access   Force all memory accesses to be aligned (AArch32/AArch64 only)
  -mnocrc                 Disallow use of CRC instructions (ARM only)
  -module-dependency-dir <value>
                          Directory to dump module dependencies to
  -momit-leaf-frame-pointer
                          Omit frame pointer setup for leaf functions
  -MP                     Create phony target for each dependency (other than main file)
  -mqdsp6-compat          Enable hexagon-qdsp6 backward compatibility
  -MQ <value>             Specify name of main file output to quote in depfile
  -mrelax-all             (integrated-as) Relax all machine instructions
  -mrestrict-it           Disallow generation of deprecated IT blocks for ARMv8. It is on by default for ARMv8 Thumb mode.
  -mrtd                   Make StdCall calling convention the default
  -msoft-float            Use software floating point
  -mstack-alignment=<value>
                          Set the stack alignment
  -mstack-probe-size=<value>
                          Set the stack probe size
  -mstackrealign          Force realign the stack at entry to every function
  -mthread-model <value>  The thread model to use, e.g. posix, single (posix by default)
  -MT <value>             Specify name of main file output in depfile
  -munaligned-access      Allow memory accesses to be unaligned (AArch32/AArch64 only)
  -MV                     Use NMake/Jom format for the depfile
  -M                      Like -MD, but also implies -E and writes to stdout by default
  --no-system-header-prefix=<prefix>
                          Treat all #include paths starting with <prefix> as not including a system header.
  -nobuiltininc           Disable builtin #include directories
  -nostdinc++             Disable standard #include directories for the C++ standard library
  -ObjC++                 Treat source input files as Objective-C++ inputs
  -objcmt-atomic-property Make migration to 'atomic' properties
  -objcmt-migrate-all     Enable migration to modern ObjC
  -objcmt-migrate-annotation
                          Enable migration to property and method annotations
  -objcmt-migrate-designated-init
                          Enable migration to infer NS_DESIGNATED_INITIALIZER for initializer methods
  -objcmt-migrate-instancetype
                          Enable migration to infer instancetype for method result type
  -objcmt-migrate-literals
                          Enable migration to modern ObjC literals
  -objcmt-migrate-ns-macros
                          Enable migration to NS_ENUM/NS_OPTIONS macros
  -objcmt-migrate-property-dot-syntax
                          Enable migration of setter/getter messages to property-dot syntax
  -objcmt-migrate-property
                          Enable migration to modern ObjC property
  -objcmt-migrate-protocol-conformance
                          Enable migration to add protocol conformance on classes
  -objcmt-migrate-readonly-property
                          Enable migration to modern ObjC readonly property
  -objcmt-migrate-readwrite-property
                          Enable migration to modern ObjC readwrite property
  -objcmt-migrate-subscripting
                          Enable migration to modern ObjC subscripting
  -objcmt-ns-nonatomic-iosonly
                          Enable migration to use NS_NONATOMIC_IOSONLY macro for setting property's 'atomic' attribute
  -objcmt-returns-innerpointer-property
                          Enable migration to annotate property with NS_RETURNS_INNER_POINTER
  -objcmt-whitelist-dir-path=<value>
                          Only modify files with a filename contained in the provided directory path
  -ObjC                   Treat source input files as Objective-C inputs
  -omptargets=<value>     Specify comma-separated list of triples OpenMP offloading targets to be supported
  -o <file>               Write output to <file>
  -pg                     Enable mcount instrumentation
  -pipe                   Use pipes between commands, when possible
  -print-file-name=<file> Print the full library path of <file>
  -print-ivar-layout      Enable Objective-C Ivar layout bitmap print trace
  -print-libgcc-file-name Print the library path for "libgcc.a"
  -print-prog-name=<name> Print the full program path of <name>
  -print-search-dirs      Print the paths used for finding libraries and programs
  -pthread                Support POSIX threads in generated code
  -P                      Disable linemarker output in -E mode
  -Qunused-arguments      Don't emit warning for unused driver arguments
  -relocatable-pch        Whether to build a relocatable precompiled header
  -rewrite-legacy-objc    Rewrite Legacy Objective-C source to C++
  -rewrite-objc           Rewrite Objective-C source to C++
  -Rpass-analysis=<value> Report transformation analysis from optimization passes whose name matches the given POSIX regular expression
  -Rpass-missed=<value>   Report missed transformations by optimization passes whose name matches the given POSIX regular expression
  -Rpass=<value>          Report transformations performed by optimization passes whose name matches the given POSIX regular expression
  -R<remark>              Enable the specified remark
  -save-temps=<value>     Save intermediate compilation results.
  -save-temps             Save intermediate compilation results
  -serialize-diagnostics <value>
                          Serialize compiler diagnostics to a file
  -std=<value>            Language standard to compile for
  -stdlib=<value>         C++ standard library to use
  --system-header-prefix=<prefix>
                          Treat all #include paths starting with <prefix> as including a system header.
  -S                      Only run preprocess and compilation steps
  --target=<value>        Generate code for the given target
  -time                   Time individual commands
  -traditional-cpp        Enable some traditional CPP emulation
  -trigraphs              Process trigraph sequences
  -undef                  undef all system defines
  --verify-debug-info     Verify the binary representation of debug output
  -verify-pch             Load and verify that a pre-compiled header file is not stale
  -v                      Show commands to run and use verbose output
  -Wa,<arg>               Pass the comma separated arguments in <arg> to the assembler
  -Wl,<arg>               Pass the comma separated arguments in <arg> to the linker
  -working-directory <value>
                          Resolve file paths relative to the specified directory
  -Wp,<arg>               Pass the comma separated arguments in <arg> to the preprocessor
  -W<warning>             Enable the specified warning
  -w                      Suppress all warnings
  -Xanalyzer <arg>        Pass <arg> to the static analyzer
  -Xassembler <arg>       Pass <arg> to the assembler
  -Xclang <arg>           Pass <arg> to the clang compiler
  -Xlinker <arg>          Pass <arg> to the linker
  -Xpreprocessor <arg>    Pass <arg> to the preprocessor
  -x <language>           Treat subsequent input files as having type <language>
  -z <arg>                Pass -z <arg> to the linker

=@= sqlite test
SQLite has major 3 test harnesses, i.e.
1. TCL Tests, about 37707 test cases
2. TH3 test, about 40100 test cases, available free for SQLite Consortium members only (available by license to others)
3. SQL Logic Test (db neutual SQL test, 7.2 million queries of 1.12GB data)

SQLite uses American Fuzzy Lop (AFL) for its fuzzing test since 3.8.10.
AFL is widely used as fuzzing test tool for many libs and products. Its working concept is:
1. AFL takes a sample input and run the target program
2. AFL tris to minimize the input that triggers the same behavior
3. AFL begins actual process of fuzzing by applying various modifications to the input file
4. AFL saves input file (modified) when crashes/hangs happen
5. AFL needs target program instrumented its utilitie, which helps AFL detect behavior change (e.g. branch change), so AFL is self-adaptive and expect to have higher payload of fuzzing.
6. Because it is self-adaptive, AFL requires "essentially no configuration)
7. near-native fuzzing speed

So far AFL looks pretty attractive, except AFL runs on linux. I'm considering either port it to Windows, or if that is not easy or possible, record the fuzzing input and apply them on Windows.
The second option should be easy because all requests for target program is to read input from stdin.


=@= SimbaEngine makefile/rules (for fuzzing instrument)

//SimbaEngine/Makefiles/
Rules/Rules_Linux.mak   ?
compiler override (i.e. replace default compiler, e.g. gcc)
CXX_OVERRIDE
CC_OVERRIDE
LD_OVERRIDE

Rules_NV_centos5.mak
gcc4_1
    CXX = g++
    ...
gcc4_4
    CXX = g++44
    ...

cd $SIMBAENGINE_DIR/Makefiles    
time make -f SimbaEngine_NV.mak debug
real 5m5s
time make -f SimbaODBC_NV.mak debug
real 5m23s

cd $INTERNALTEST_DIR/Makefiles
time make -f InternalTest.mak debug
real 1m22s
Simbaataadmin
Simb4ataAdm1n

sim

simbaodbc.mak
engine.

hierarchy
    head make files
        (modules) - LIBS, SHAREDLIBS, BINS
        for each module:
            Makefile_MV                 name of module, used for output filename
            Makefile_FLAGS.mak          compiler flags (e.g. include pathes)
            Makeifle_SRCS.mak           list of source files (.e.g. .cpp)
            Rules_NV.mak                make rules
                Rules_NV_<OS>.mak       os spec (e.g. Rules_NV_centos5.mak)
                Rules_NV_<COMPILER>.mak compiler spec (e.g. Rules_NV_gcc4_4.mak)
    Platform_NV.mak                 platform
    Master_Target_NV.mak            target (debug, release, clean)

head make files
    SimbaODBC_NV.mak
    SimbaEngine_NV.mak
    ...
    
Environments
    P4_ROOT                 p4 workspace
    CL_OS_VER               centos5, aix6, or $(OS_VER_CALCULATED)
    CL_COMPILER             gcc4_4, override by $(bamboo_COMPILER)
    ARCH                    *=64  x8664=64 x86=32 3264=univerasl
    BUILDSERVER             (server build only) ?
    
Build command
    make -f <head-make-file> <debug|release|cleandebug|cleanrelease|clean>


macro calculation
  Platform_NV.mak:
    auto detect
    OS
    BITNESS
    ARCH
    PLATFORM    = $(OS)_$(ARCH)
    SO_SUFFIX
    
    ODBC_DIR
    
    C_BLD_DIR = $(C_OS_VER)/$(C_COMPILER)/$(C_TARGET)$(C_BITNESS)
    C_BLD_NAME = $(C_OS_VER)_$(C_COMPILER)_$(C_TARGET)$(C_BITNESS)
    C_BLD_RELDIR = $(C_OS_VER)/$(C_COMPILER)/release$(C_BITNESS)
    PLATFORM=$(C_BLD_DIR)
    LIB_PLATFORM = $(C_BLD_DIR)
    ICU_LIBS = ... platform-dependent
    GENODBC_FLAGS = ...
    UNIXODBC_FLAGS = ...
    
    ICU_PATH            = $(SIMBAENGINE_THIRDIRPARTY_DIR)/icu/$(S_ICU_V)/$(C_BLD_RELDIR)
    ICULIB_PATH         = $(ICU_PATH)/lib
    OPENSSL_PATH = ...
    OPENSSLLIB_PTH = ...
    OPENSSL_LIBS = ...
    
    SIMBAODBC_LIBS = ...        replace <TARGET|DEBUG>
    SIMBAENGINE_LIBS = ...
    SIMBAPROTOCOL_LIBS = ...
    
    SLICK_DIR       = $(SIMBASHARED_DIR)/Slick/$(S_SLICK_V)/C++
    SLICK_INC_DIR = ...
    SLICK_LIB = ...
    
    TOOLS_DIR       = $(SIMBASHARED_DIR)/Tools/$(S_TOOLS_V)
    TOOLS_INC_DIR = ...
    TOOLS_LIB = ...

Rules:
    gcc4_1 maps default gcc/g++
    
Set platform and compiler options

    Rules/Rules_NV.mak includes Rules_NV_$(C_COMPILER).mak and Rules_NV_$(C_OS_VER).mak
    cp Rules_NV_centos5.mak Rules_NV_deb.mak
        add gcc, afl for C_COMPILER
    cp Rules_NV_gcc4_4.mak Rules_NV_afl.mak
    
    
=@= afl-fuzz on centos7
[-] Hmm, your system is configured to send core dump notifications to an
    external utility. This will cause issues: there will be an extended delay
    between stumbling upon a crash and having this information relayed to the
    fuzzer via the standard waitpid() API.

    To avoid having crashes misinterpreted as hangs, please log in as root
    and temporarily modify /proc/sys/kernel/core_pattern, like so:

    echo core >/proc/sys/kernel/core_pattern

[-] PROGRAM ABORT : Pipe at the beginning of 'core_pattern'
         Location : check_crash_handling(), afl-fuzz.c:7120


-bash-4.2$ cat /proc/sys/kernel/core_pattern
|/usr/libexec/abrt-hook-ccpp %s %c %p %u %g %t e %P %I

=@= afl research - integrate app into afl-fuzz, load+setup once and iterate work

dumb_mode (-n, without instrumentation)
TMPDIR=/tmp
AFL_KEEP_ASSEMBLY=0     keep instrumented assembly in TMPDIR

-C crash_mode = FAULT_CRASH ?
env.AFL_NO_FORKSRV       no_forkserver
env.AFL_LD_PRELOAD      ?
-t timeout (ms?)
calculate timeout (when not given): show_init_stats()
env.AFL_SKIP_BIN_CHECK

run_target(char** argv)
    dumb_mode || no_forkserver
        setsid - new session group
        dup2(dev_null_fd, 1)        // dev_null_fd = /dev/null
        dup2(dev_null_fd, 2)
        if (out_file) {             // -f target_file, used when @@ in target command line 
            dup2(dev_null_fd, 0);
        } else {
            dup2(out_fd, 0);
            close(out_fd);
        }
        execv(target_path, argv)
        trace_bits=EXEC_FAIL_SIG;
    else (with forkserver)
        write(fsrv_ctl_fd, &prev_timed_out, 4)
        read(fsrv_st_fd, &child_pid, 4)
    set timeout: setitimer(&it = exec_tmout)
    kill on timeout

    
run_target(argv)
    calibrate_case()
        perform_dry_run()
            main
        save_if_interesting
        fuzz_one
    trim_case()
        fuzz_one
    common_fuzz_stuff()
        fuzz_one
    sync_fuzzers()
        main.mainloop()
    
    
   fork svr 6150
no fork svr 1980

len=6 map size=20 exec speed=208us timeout=20ms

=@= SEN makefile difference 9.5 vs 10.0-based
SimbaEngine_NV.mak
    Platform_NV.mak
        Settings_Linux.mak
    Master_Targets_NV.mak
    Taster_Eval_Targets.mak
    
SimbaEngine_NV.mak
    Solutions/VS2013/   Solutions/     # remove VS2013
Platform_NV.mak
    add SLICK, TOOLS

Rules/Rules_NV.mak
    add AR_EXTRACT
    add SimbaDSI, SimbaSupport
    
=@= customized build driver with AFL support
on B3 (http://bergamot3.lakes.ad:8085)
build SEN 9.5
 
    run Driver SEN 9.5 ODBC Compile, CentOS5 gcc4_4 64
    (http://bergamot3.lakes.ad:8085/browse/DS9OC-CG6)
    CUSTERMIZE RUN with AFL=1, target=release on centos5, gcc4_4, 64bits, this will create a differ release package zip
    
    customize build driver through REST
    use chrome extension "Advanced Rest Client Application" to request customized build
    http://bigsight.lakes.ad:5555/rest/compile/customized with following json data
     {
                "BAMBOO_VARS": {
                "AFL": "1",
                "DRV_LABEL":"__head__",
                "SEN_LABEL":"__latest__"
                },
    
                "PLANS": [ "
                    "BULDONSQ-CEN000005GCC000447645",
                    "BULDONSQ-CEN000005GCC000447640",
                    "BULDONSQ-CEN000005GCC000447640",
                    "BULDOHDP-CEN000005GCC000447641",
                    "BULDOCLD-CEN000005GCC000447640"]
     }

     BULDONSQ-CEN000005GCC000447645,   cassandraodbc 2.40100     b#11
     BULDONSQ-CEN000005GCC000447640     mongodbodbc 2.1 b#17
     BULDOSQL-CEN000005GCC000447640      redshiftodbc 1.1 b#33
     BULDOHDP-CEN000005GCC000447641     impala 1.2 (hadoop) b#1kk
     BULDOCLD-CEN000005GCC000447640     salesforce 1.2 (cloud) b#1

=@= ODBC registry keys

User DSN:
HKEY_CURRENT_USER\Software\ODBC\ODBC.INI
    ATA/
        Data Source=ATA
        Driver=C:\Program Files\PostgreSQL\psqlODBC\bin\psqlodbc35w.dll
        Description=
        Database=ata
        Port=5432
        Servername=localhost
        UID=ata
        Username=ata
        Password=...
        
System DSN:
HKEY_LOCAL_MACHINE/SOFTWARE/ODBC/ODBC.INI
    QuickstartDSII/
        DBF=D:\Simba Technologies\SimbaEngineSDK\10.0\Examples\Databases\Quickstart
        Description=Sample 64-bit SimbaEngine Quickstart DSII
        Driver=QuickstartDSIIDriver
        Locale=en-US
32on64: HKEY_LOCAL_MACHINE/SOFTWARE/WOWO6432NODE/ODBC/ODBC.INI

Drivers:        
HKEY_LOCAL_MACHINE/SOFTWARE/ODBC/ODBCINST.INI
    ODBC Drivers/
        QuickstartDSIIDriver=Installed
    QuickstartDSIIDriver/
        APILevel=1
        ConnectFunctions=YYY
        CPTimeout=<not pooled>
        Description=Sample 64-bit SimbaEngine Quickstart DSII
        Driver=D:\Simba Technologies\SimbaEngineSDK\10.0\Examples\Builds\Bin\x64\Release_MTDLL\QuickstartDSII_MTDLL.dll
        DriverODBCVer=03.80
        Setup=D:\Simba Technologies\SimbaEngineSDK\10.0\Examples\Builds\Bin\x64\Release_MTDLL\QuickstartDSII_MTDLL.dll
        SQLLevel=1
32on64: HKEY_LOCAL_MACHINE/SOFTWARE/WOWO6432NODE/ODBC/ODBCINST.INI


=@= setup a linux box that behaves like an agent
1. create users of bamboo, ataadmin, employee of specified uid/gid
useradd -u 59993 -m -s /bin/bash bamboo
useradd -u 59994 -m -s /bin/bash ataadmin
useradd -u 59995 -m -s /bin/bash employee
passwd bamboo
passwd ataadmin
passwd employee

2. add following mount points in /etc/fstab
oak:/export/nfs/rm      /mnt/rm     nfs     defaults    0 0
oak:/export/nfs/builds  /mnt/builds nfs     defaults    0 0

3. create mount points and mount nfs (do once only)
mkdir /mnt/rm
mkdir /mnt/builds
mount oak:/export/nfs/rm /mnt/rm
mount oak:/export/nfs/builds /mnt/builds


=@= afl hacking

write_to_testcase(use_mem, q->len)
| write_with_gap(in_buf, q->len, remove_pos, trim_avail)
run_target(argv)
    :2573       calibrate_case
    :4422       trim_case
    :4518       common_fuzz_stuff
    :6606       sync_fuzzers
    
=@= sql fuzzer?
SQL Injection Knowledge Base
    MySQL https://websec.ca/kb/sql_injection

OWASP - Open Web Application Security Project
https://www.owasp.org/index.php/Main_Page

Automated SQL Injection Dection
https://www.arneswinnen.net/2013/09/automated-sql-injection-detection/
    SQLNinjia - http://sqlninja.sourceforge.net/    -win GPL perl-based
    SQLMap - http://sqlmap.org/     GPLv2 python-based



SQLSmith
https://github.com/anse1/sqlsmith


FuzzDB
https://github.com/fuzzdb-project/fuzzdb

=@= pgAdmin save password in plain-text
On Windows, it is saved in ~/postgresql/pgpass.conf


=@= where does p4v save its password?
~/.p4tickets

=@= MSDN subscribe and key
jasonz@simba.com LondonDrug5
msdn.microsoft.com/subscriptions


=@= Touchstone - OrderMatters ATAHD-149
    T_API_20_30 InputParamArraysNullBase
ODBCXmlResultTestsBase::(ResultSetTestHandler)m_test->(bool)m_sortData = true  if (OrderMatters=f|false)
ODBCXmlResultTestsBase::
    if (test.m_sortData) {
        xmlResult->Sort();
        sortableResult.Sort();
    }
    // validate the data

SimbaODBCTestFramework\Validation\ResultFileUtilities.cpp    
ResultFileUtilities::validateEntireResultSet
        xml_file_name, gen_results, stmt, query, file/line
    <-- ComprehensiveOdbcApiTests/TestCases/InputParamArrays, MultipleConnectionsTests, StoredProcedureTests.
    <-- ConcStmtSoakTest/ConcStmtSoakTests
    <-- ConcurrentStatementsTests/TestsCases/SQLConcurrentFunctors


=@= libcurl programming tutorial
https://curl.haxx.se/libcurl/c/libcurl-tutorial.html    

=@= touchstone: odbc version
Environment::Is3xEnvironment()
TestCases/3.xTestCases/SQLGetEnvAttriTests
m_env
Singleton<DriverInfoFactory>::instance().GetDriverInfo( g_driverInfoFileName );
SQLINTEGER ov = this->GetDriverInfo().GetEnvAttr(SQL_ATTR_ODBC_VERSION)

OdbcTestCaseBase::Is3XEnvironment();
SQLUINTEGER OdbcTestCaseBase::GetODBCVersion();

=@= Instal SQL Server 2008R2
Setup SQL Server
I:\Licensed\MSDNSQL\SQL Server 2008 R2 Developer Edition\Setup.exe
Setup Role: SQL Server Feature Installation
Feature selection: all
Instance Configuration: Default instance (MSSQLSERVER)
Disk Space Requirements: C:6109MB required
    (system C:\ 3189MB
     Shared Install Directory C:\Program Files\Microsoft SQL Server\ 1416mb
     Instance Directory c:\Program Files\Microsoft SQL Server: 1504
     
Server Configureation:
    SQL Server Agent:   SIMBA\jasonz
    SQL SERVER dATABASE Engine:     SIMBA\jasonz
    SQL Server Analysis Services:   NT AUTHORITY\SYSTEM
    SQL Server Reporting Services:  NT AUTHORITY\SYSTEM
    
    Collation: SQL_Latin1_General_CP1_CI_AS
    
Database Engine Configuration:
    Mixed Mode (SQL Server authentication and Windows authentication)
    sa password: Jasonz591!
    
MySqlServer
    MSSQL10_50.MYSQLSERVER

SQLServer 2014 Express
sqle_jasonz
log: C:\Program Files\Microsoft SQL Server\120\Setup Bootstrap\Log\20161017_170130\Summary_JasonZ_20161017_170130.txt    


=@= HANDLE issues
//SimbaShared/Tools/Maintenance/1.0/centos5/gcc4_4/debug64/include/plat.h#5  12/16/2015 CL149708 by odbcproduct
typedef int HANDLE;



=@= pgsql cascade change
Does PG prevent change/delete table if it is used by a function?
Answer: function: No, view: yes

drop table if exists t.test;
create table t.test (id serial primary key, name char(16), code char(8));
insert into t.test values (1, 'john', 'j'), (2, 'ken', 'k');
drop function if exists t.ptest;
create or replace function t.ptest(n int) returns text as $$
declare
    v text;
begin
    select code into v from t.test where id=n;
    return v;
end;
$$ language plpgsql;

ata=> select t.ptest(1);
 ptest
-------
 j
(1 row)

ata=> alter table t.test drop column code;
ALTER TABLE
ata=> select t.ptest(1);
ERROR:  column "code" does not exist
LINE 1: select code        from t.test where id=n
               ^
QUERY:  select code        from t.test where id=n
CONTEXT:  PL/pgSQL function t.ptest(integer) line 5 at SQL statement
ata=> drop table t.test;
DROP TABLE
ata=> select t.ptest(1);
ERROR:  relation "t.test" does not exist
LINE 1: select code        from t.test where id=n
                                ^
QUERY:  select code        from t.test where id=n
CONTEXT:  PL/pgSQL function t.ptest(integer) line 5 at SQL statement
ata=>


=@= PG
default name for common table constraint:
    primary key:        <table>_pkey
    unique key:         <table>_<columns>_key
    foreign key:        <table>_<columns>_fkey
    serial:             <table>_<column>_seq::regclass
    
    those names can be used to remove/recreate when altering table

=@= psql/pg
\d      list tables, view, seq
\d name         describe t/v/s/i
\df [pat]       list functions
\dn [pat]       list schemas    
\dt [pat]       list tables
\dv [pat]       list views
\dy [pat]       list event triggers
\sf func        show definition of func
\! [cmd]        shell
\i file         execute from file
\o [file]       send output to file


=@= psql: access json
create table t.param (
    id serial primary key,
    value text);
insert into t.param (value) values
 ('{ "DM": "", "SEN": "latest" }'),
 ('{ "DM": "3.7", "SEN": "_latest_" }'),
 ('{ "SEN": "10.1" }');

::json/::jsonb  jsonb has more methods
 
create or replace function getdmver(p_id int default null)
returns setof text as $$
declare
    v text;
    vm text;
    r record;
    j jsonb;
begin
    if p_id is null then
        for r in select * from t.param loop
            v = r.value;
            j = v::jsonb;
            vm = j->'DM';
            if vm is null then
                j = jsonb_set(j, '{isnull}', 'true');
            end if;
            return next j::text;
        end loop;
    else
        select value into v from t.param where id=p_id;
        return next v::jsonb->'DM';
    end if;
    return;
end;
$$ language plpgsql;


=@= touchstone - OutcomeFactory, load outcome

Outcome(rc, s1, s2, s3)
    .AddAlternativeStates(rc, s1, s2, s3)
    .CompareDiagnosticRecordsToExpected(diag)
    .HandleDiagnosticMismatch(name, diag)
ThrowOutcome: raise ResultMismatchException
ReportOutcome
IgnoreOutcome: ignore=true

Handle::CheckOutcome:
    if (!outcome.CompareDiagnosticRecordsToExpected())
        outcome.HandleDiagnosticMismatch()



SBTAutoPtr<Simba::ODBCTest::Outcome> outCome =
    Simba::ODBCTest::OutcomeFactory::LoadOutcome(
        this->GetNestedParameter(SBT_L("name")));
names:
BrowseConnectTests: InvalidConnectionStringOutcome
    NeedDataInvalidUidPwdOutcome
    ErrorInvalidUidPwdOutcome
DriverConnectTests: Result
ConnectionReuseTests: ConnectionOutcome
ConnectionAttributesTests: ConnectionOutcome

a sample of outcome param
\TestCases\ComprehensiveOdbcApiTests\InputFiles\TestSets\InternalTest\SqlBrowseConnect.xml
type=Throw|Report|Ignore
        <InvalidConnectionStringOutcom>
            <OutcomeType>Throw</OutcomeType>
            <Alternative ID="1">
                <ReturnCode>SQL_ERROR</ReturnCode>
                <SQLState ID="1">HY000</SQLState>
            </Alternative>
            <Alternative ID="2">
                <ReturnCode>SQL_ERROR</ReturnCode>
            </Alternative>
        </InvalidConnectionStringOutcom>
    
    if <Alternative> exists, load values from list of <alternative>
    otherwise, load from itself, e.g.
        <TheOutcome>
            <OutcomeType>Throw</OutcomeType>
            <ReturnCode>SQL_SUCCESS</ReturnCode>
            <!-- ReturnCode is required, SQLState is optional -->
        </TheOutcome>

TestCase Hierarchy:
    Case
        DummyCase
        OdbcTestCaseBase
            ConversionTestsBase
            CreateIndexTestCaseBase
            CreateTableTestCaseBase
            OdbcDescTestCaseBase
            OdbcMemoryManagementTestCaseBase
            OdbcTableTestCaseBase
            OdbcTestCaseBase(C1,C2,C4,E1,S0,S1)
            ODBCXmlResultTestsBase
        SampleBase
OdbcTestCaseBase(suite,set,name,id,desc,param)
    : m_  throwOutcome,ignoreOutcome,reportOutcome,testTable,logger
    : private(autoptr) connectInfo/2, environment, connection, statement
    
    m_throwOutcome is used in FrameworkUnitTest
    report/ignoreOutcome are not used at all
    
    
TODO:
SimbaODBCTestFramework\Framework\StringToTypeConversions.cpp
    SqlToSqlReturn: use map to implement convert (now only limited value)

=@= touchstone - parameters
Parameters are parsed and saved during loading xml files (env & suite) when an unknown tag is met.
    TestFrameworkLibrary\Utils\SBTTestEnvironmentLoader.cpp
        TestEnvironmentLoader::ProcessUnknownTag()  SetNetsNestedParameter()
    TestFrameworkLibrary\Utils\SBTTestSuiteLoader.cpp
        TestSuiteLoader::ProcessUnknownTag()  SetNetsNestedParameter()        
    note:
    * all tag names are converted to lower case
    * SetNestedParameter:
        value is (equivalantly useless, i.e. default constant)
        src is not used (ignored)
        effective logic: nestedMap[key(name,id)] = new TestCaseParameters()
    * SetSimpleParameter:
        add for CData in loading env/suite xml
            at end tag, if this->IsEmpty (ie: no children), delete nestedParam, add CData to parent node
        LoadParameters (copy from env->suite->set->case)
        
        
        
=@= touchstone - resultset, BaselineDirectory
    * for iphone: BaselineDirectory = m_resourcePath + / + BaselineDirectory 
    * ODBCXmlResultTestBase
            BaselineDirectory
            QueryOutputDirectory
            ExpectedOutputDirectory
    * ODBCMemoryManagementTest: resutlFile=BaselineDirectory/ExpResultFile[1|2]
    * CatelogFunctionsTest: resultSetFullPath = BaselineDirectory/resultSetFile.xml  (iphone? !iphone=ResultSetBaseDir)
            resultSetFile=test-case-name (e.g. T_AP_12_33)

            
            
=@= touchstone.pm
all driver folder structures (for ftest)
    Bamboo/Scripts      customized scripting
    Bamboo/TouchstoneTestLists
        <env>.testsuitelist:
            <env> maps to each env.xml in Tests/Envs
            each line in the listfile: folder/suite_base_name
    Tests
        Envs/ - each file mapps to a file in Bamboo/TouchstoneTestLists/<env>.testsuitelist
        TestData/ - intialization data
        TestDefinitions/
            topic/
                <suite-name>.xml
                TestSets/
                    <list-of-testset>.xml     referenced by <suite-name>.xml
                ResultSets/
                    <list-of-testcase>.xml
                    
ATA/Bamboo/Touchstone.pm
    * folder structures
        $basedir = $ENV{baseDir}
        touchstone binaries:
            $basedir/$touchstone_exe
            $touchstone_lib = $basedir/lib
            LDPATH=$touchstone_lib:$basedir/_driver/
        ini:
            $basedir/*.ini
        test data:
            $testbasedir = $basedir/_testfiles/Touchstone     =(p4: .../Product/Tests)
            $testoutput_dir = "test_output"
    * remapping of p4 / stashing (relative to $testbasedir)
        Bamboo/TouchstoneTestLists  ==> Tests/TestLists               for *.testsuitelist
        Tests/Envs ==> FEnv                                           for *.xml (env)
        Tests/TestDefinitions ==> TestDefinitions                     for suite/set/resultset/...
    * overwrite relative paths (because on Windows cwd is changed?)
        Tests/TestLists/*.testsuitelist        <== p4:Bamboo/TouchstoneTestLists/*.testsuitelist
       $testbasedir = basedir/_testfiles/Touchstone      where touchstone is launched?
       $touchstone_full_name = $touchpath/$touchstone_exe       $touchpath=$basedir
        
runOneTouchstoneTest
    ROOT=C:/bamboo-agent-home/xml-data/build-dir/booster
    ROOT=/bamboo/bamboo-agent-home/xml-data/build-dir/booster/
    tspath=/Touchstone.exe
    ldpath=/lib32;/_driver/lib_ssl
    ldpath=/usr/local/odbc/dm/<DM64>/lib:/lib:/_driver/lib_ssl
    cwd = /_testfiles/Touchstone
    TSM
        cwd=/
        env=/_testfiles/Touchstone/FEnv/<env>.xml
        suite=/_testfiles/Touchstone/TestDefinitions/<path>/<suite>.xml
        wd=/_testfiles/Touchstone
        touchstone=/Touchstone.exe
        outputPrefix=/test_output/SQLTests__Postgres_TestSuite__PostgresTestEnv
        
        
=@= Touchstone - sqltype, sql_c_type, name-id mapping
SQL Data Type (https://msdn.microsoft.com/en-us/library/ms710150(v=vs.85).aspx)
    type-id         SQL_CHAR
    SQL type        CHAR(n)
SQL C Data Type (https://msdn.microsoft.com/en-us/library/ms714556(v=vs.85).aspx)
    type-id         SQL_C_CHAR
    ODBC C typedef  SQLCHAR*                (C: unsigned char*)
    
String ==> SQL SQL/C type-id
    StringToTypeConversions.cpp:    int SqlToSqlTypeId(const string&);
    
    
=@= touchstone - SQLBindParameter


TestCases/CommonTestCases/ParamTests
SQLBindParameterTests.cpp API-6.100 ~ 6.104         (INT,SMALLINT,CHAR,TIMESTAMP,C_DATA,C_TIME,DOUBLE)
SQLBindParameterArrayTests.cpp T-API-6.150              (column wise)
SQLBindParameterRowArrayTests.cpp T-API-6.151              (row wise)



relevant classes
OdbcTableTestCaseBase (OdbcTestCaseBase.h/cpp)
    SQLParamDataTestBase                                  API-53.100.1 SQLParamData: SQL_C_LONG
        setup: SQL(Selete * where col_name=?)) SqlBindParameter(1/2, ...)
        test: while(SqlParamData()!=success) SqlPutData()
    SQLBindParamDataTestBase                               API-6.10x.x int,short,char,timestamp,date,time,double
        setup: SQL(Selete * where col_name=?)) SqlBindParameter(1, ...)
        test: while(SqlParamData()!=success) SqlPutData()
        API-6.100.1     SQLINTEGER
        API-6.100.2     SQLSHORT
        API-6.101.1     SQLSHORT
        API-6.102.1     SQLCHAR
        API-6.103.1     SQL_C_TYPE_TMESTAMP
        API-6.103.2     SQL_C_DATE
        API-6.103.3     SQL_C_TIME
        API-6.104.1     SQL_C_DOUBLE
    SQLBindParameterArrayTests                          API-6.150
        setup:
            SqlSetStmtAttrW
                SQL_ATTR_PARAM_BIND_TYPE, SQL_PARAM_BIND_BY_COLUMN
                SQL_ATTR_PARAMSET_SIZE, rowCount
                SQL_ATTR_PARAM_STATUS_PTR
                SQL_ATTR_PARAMS_PROCESSED_PTR
        test:
            for_each( columns ): BuildArrayOfParamArrays
            SqlExecute
            verify m_paramsProcessed
            verify m_paramStatus
            SqlExecDirectW( CreateSelectAll )
    SQLBindParameterArrayTests                          API-6.151
        CalculateRowBuffLength: sum( data.len + sizeof(int))                ?? alignment ??
        DoParamRowBind: for_each(column): SqlBindParameter(num, id,id, colsize, decdigs, buf, row_len)
        InitParamRowColValues
        BuildRowsOfArrayParams
        setup:
            SqlSetStmtAttrW
                SQL_ATTR_PARAM_BIND_TYPE, m_rowArraySize
                SQL_ATTR_PARAMSET_SIZE, rowCount
                SQL_ATTR_PARAM_STATUS_PTR
                SQL_ATTR_PARAMS_PROCESSED_PTR
            SqlPrepareW(CreateInsert
        test:
            for_each( table.cell ): BuildRowsOfArrayParams
            for_each( table.cell ): DoParamRowBind
            SqlExecute
            verify m_paramsProcessed
            verify m_paramStatus
            SqlExecDirectW( CreateSelectAll )
        
        
Table : ResultsTable
struct SqlColumnInfo (type, precision, scale, name, dbtype, key, nullable, displaySize)
AbstractData:
    typedef SBTVector<AbstractData>  AbstractDataRow
    typedef SBTVector<AbstractDataRow> AbstractDataTable
 
=@= touchstone

=@= solaris
Get solaris instruction information
isainfo - describe instruction set architectures
    isainfo [ [-v] [-b | -n | -k ] [-x] ]
    
    e.g.
    isainfo -v
    64-bit amd64 applications
            avx ... sse3 sse2 ...
    32-bit i386 applications
            avx ... sse3 sse2 ...
            
            
            
            
=@= java tools for debugging hangs
from JDK: jvisualvm (visual tool integrating jConsole, jstat, jinfo, jstack, jmap, etc, since jdk6u7)
 what are they?
  and jcmd, jdb, jhat, jjs, jmc, jrunscript...
  
=@= jvisualvm
Local Applications Cannot Be Detected (Error Dialog On Startup)
    This happens on Windows only, caused by misconfigred jvmstat.
    Solution:
    delete %TMP%/hsperfdata_username folder, let jvisualvm recreate it.
  
 
=@= java debug session

java -agentlib:jdwp=transport=dt_shmem,address=jdbconn,server=y,suspend=n MyClass


C:\Users\jasonz\AppData\Local\Temp>jdb -attach jdbconn
Set uncaught java.lang.Throwable
Set deferred uncaught java.lang.Throwable
Initializing jdb ...
> ?
** command list **
connectors                -- list available connectors and transports in this VM

run [class [args]]        -- start execution of application's main class

threads [threadgroup]     -- list threads
thread <thread id>        -- set default thread
suspend [thread id(s)]    -- suspend threads (default: all)
resume [thread id(s)]     -- resume threads (default: all)
where [<thread id> | all] -- dump a thread's stack
wherei [<thread id> | all]-- dump a thread's stack, with pc info
up [n frames]             -- move up a thread's stack
down [n frames]           -- move down a thread's stack
kill <thread id> <expr>   -- kill a thread with the given exception object
interrupt <thread id>     -- interrupt a thread

print <expr>              -- print value of expression
dump <expr>               -- print all object information
eval <expr>               -- evaluate expression (same as print)
set <lvalue> = <expr>     -- assign new value to field/variable/array element
locals                    -- print all local variables in current stack frame

classes                   -- list currently known classes
class <class id>          -- show details of named class
methods <class id>        -- list a class's methods
fields <class id>         -- list a class's fields

threadgroups              -- list threadgroups
threadgroup <name>        -- set current threadgroup

stop in <class id>.<method>[(argument_type,...)]
                          -- set a breakpoint in a method
stop at <class id>:<line> -- set a breakpoint at a line
clear <class id>.<method>[(argument_type,...)]
                          -- clear a breakpoint in a method
clear <class id>:<line>   -- clear a breakpoint at a line
clear                     -- list breakpoints
catch [uncaught|caught|all] <class id>|<class pattern>
                          -- break when specified exception occurs
ignore [uncaught|caught|all] <class id>|<class pattern>
                          -- cancel 'catch' for the specified exception
watch [access|all] <class id>.<field name>
                          -- watch access/modifications to a field
unwatch [access|all] <class id>.<field name>
                          -- discontinue watching access/modifications to a field
trace [go] methods [thread]
                          -- trace method entries and exits.
                          -- All threads are suspended unless 'go' is specified
trace [go] method exit | exits [thread]
                          -- trace the current method's exit, or all methods' exits
                          -- All threads are suspended unless 'go' is specified
untrace [methods]         -- stop tracing method entrys and/or exits
step                      -- execute current line
step up                   -- execute until the current method returns to its caller
stepi                     -- execute current instruction
next                      -- step one line (step OVER calls)
cont                      -- continue execution from breakpoint

list [line number|method] -- print source code
use (or sourcepath) [source file path]
                          -- display or change the source path
exclude [<class pattern>, ... | "none"]
                          -- do not report step or method events for specified classes
classpath                 -- print classpath info from target VM

monitor <command>         -- execute command each time the program stops
monitor                   -- list monitors
unmonitor <monitor#>      -- delete a monitor
read <filename>           -- read and execute a command file

lock <expr>               -- print lock info for an object
threadlocks [thread id]   -- print lock info for a thread

pop                       -- pop the stack through and including the current frame
reenter                   -- same as pop, but current frame is reentered
redefine <class id> <class file name>
                          -- redefine the code for a class

disablegc <expr>          -- prevent garbage collection of an object
enablegc <expr>           -- permit garbage collection of an object

!!                        -- repeat last command
<n> <command>             -- repeat command n times
# <command>               -- discard (no-op)
help (or ?)               -- list commands
version                   -- print version information
exit (or quit)            -- exit debugger

<class id>: a full class name with package qualifiers
<class pattern>: a class name with a leading or trailing wildcard ('*')
<thread id>: thread number as reported in the 'threads' command
<expr>: a Java(TM) Programming Language expression.
Most common syntax is supported.

Startup commands can be placed in either "jdb.ini" or ".jdbrc"
in user.home or user.dir
> suspend
All threads suspended.
> where
No thread specified.
> threads
Group system:
  (java.lang.ref.Reference$ReferenceHandler)0x1b2 Reference Handler cond. waiting
  (java.lang.ref.Finalizer$FinalizerThread)0x1b3  Finalizer         cond. waiting
  (java.lang.Thread)0x1b4                         Signal Dispatcher running
  (java.lang.Thread)0x1b5                         Attach Listener   running
Group main:
  (java.lang.Thread)0x1b7                         first             sleeping
  (java.lang.Thread)0x1b8                         second            sleeping
  (java.lang.Thread)0x1b9                         DestroyJavaVM     running
>
> suspend
> where all
DestroyJavaVM:
second:
  [1] java.lang.Thread.sleep (native method)
  [2] debugSample.MyThread.run (TwoThreads.java:35)
  [3] java.lang.Thread.run (Thread.java:745)
first:
  [1] java.lang.Thread.sleep (native method)
  [2] debugSample.MyThread.run (TwoThreads.java:35)
  [3] java.lang.Thread.run (Thread.java:745)
Attach Listener:
Signal Dispatcher:
Finalizer:
  [1] java.lang.Object.wait (native method)
  [2] java.lang.ref.ReferenceQueue.remove (ReferenceQueue.java:143)
  [3] java.lang.ref.ReferenceQueue.remove (ReferenceQueue.java:164)
  [4] java.lang.ref.Finalizer$FinalizerThread.run (Finalizer.java:209)
Reference Handler:
  [1] java.lang.Object.wait (native method)
  [2] java.lang.Object.wait (Object.java:502)
  [3] java.lang.ref.Reference.tryHandlePending (Reference.java:191)
  [4] java.lang.ref.Reference$ReferenceHandler.run (Reference.java:153)

> where 0x1b7
  [1] java.lang.Thread.sleep (native method)
  [2] debugSample.MyThread.run (TwoThreads.java:35)
  [3] java.lang.Thread.run (Thread.java:745)
first[1] thread 0x1b7
first[1] where
  [1] java.lang.Thread.sleep (native method)
  [2] debugSample.MyThread.run (TwoThreads.java:35)
  [3] java.lang.Thread.run (Thread.java:745)
first[1] resume
All threads resumed.
> suspend
All threads suspended.
> thread 0x1b7
first[1] where
  [1] java.lang.Thread.sleep (native method)
  [2] debugSample.MyThread.run (TwoThreads.java:35)
  [3] java.lang.Thread.run (Thread.java:745)
first[1] up
first[2] where
  [2] debugSample.MyThread.run (TwoThreads.java:35)
  [3] java.lang.Thread.run (Thread.java:745)
first[2] print count
 count = 860
first[2] print m_name
 m_name = "first"
first[2]    
> thread 0x1b8
second[1]
second[1] class debugSample.MyThread
Class: debugSample.MyThread
extends: java.lang.Object
implements: java.lang.Runnable
second[1] methods debugSample.MyThread
** methods list **
debugSample.MyThread <init>(java.lang.String, int, int)
debugSample.MyThread mkIndent(int, int)
debugSample.MyThread run()
debugSample.MyThread start()
debugSample.MyThread log(java.lang.Object)
java.lang.Object <init>()
java.lang.Object registerNatives()
java.lang.Object getClass()
java.lang.Object hashCode()
java.lang.Object equals(java.lang.Object)
java.lang.Object clone()
java.lang.Object toString()
java.lang.Object notify()
java.lang.Object notifyAll()
java.lang.Object wait(long)
java.lang.Object wait(long, int)
java.lang.Object wait()
java.lang.Object finalize()
java.lang.Object <clinit>()
java.lang.Runnable run()
second[1] fields debugSample.MyThread
** fields list **
java.lang.String m_name
java.lang.Thread m_thread
int m_sleep
java.lang.String m_indent
second[1] resume
> suspend 0x1b7, 0x1b8




=@= jdb remote jvm

java -agentlib:jdwp=transport=dt_socket,address=localhost:50100,server=y,suspend=y debugSample/TwoThreads 10
jdb -connect com.sun.jdi.SocketAttach:hostname=localhost,port=50100

vs shm on local machine
java -agentlib:jdwp=transport=dt_shmem,address=jdbconn,server=y,suspend=n debugSample/TwoThreads 10
jdb -attach jdbconn



=@= jtouchstone dependecies

 release                        clean,jdbc-common,jdbc4,jdbc41,jdbc42
 jtouchstone-core
 jdbc-utils                     jtouchstone-core
 testcases-jdbc-common          jdbc-utils
 testcase-jdbc4                 jdbc-utils
 testcase-jdbc41                jdbc-utils
 testcase-jdbc42                jdbc-utils


=@= filename/identifier suffixes
@       date, label, changelist
            p4 sync //depot/dev/main.c@126
              version when changelist 126 was submitted (even if it was not part of the change)
            p4 sync //depot/dev/...@126
            p4 sync //depot/dev/main.c@beta
            p4 sync //depot/dev/main.c@2017/05/18
#       revision
            p4 sync //depot/dev/main.c#3
              revision 3 of the file main.c
            p4 sync //depot/dev/main.c#none
              remove main.c from the client workspace (depot untouched)
            p4 sync //depot/dev/main.c#head
range
        p4 changes //depot/dev/...@2010/7/1,2010/8/1
            list all changes between the ranged date




=@= p4 changes
-m 3
    most 3 recent CLs
    $ p4 changes  -m 3 //jasonz/Touchstone/10.1/...
    Change 239500 on 2017/06/05 by marko@marko '[Touchstone] Add test for prepa'
    Change 238329 on 2017/05/30 by thierryg@thierryg_sb01 '[SEN-5281] Fix bad implementati'
    Change 236397 on 2017/05/19 by ravg@ravg_RAVG_6660 '[SEN][SQLEngine] Added prepared'
-l
    long (full) text of changelist description
    $ p4 changes -l -m 3 //jasonz/Touchstone/10.1/...
    Change 239500 on 2017/06/05 by marko@marko

            [Touchstone] Add test for prepare, exec, moreresults, exec.

    Change 238329 on 2017/05/30 by thierryg@thierryg_sb01

            [SEN-5281] Fix bad implementation of "maximum column in select" check in SQLBindCol() implementation. The current implementation prevents binding the columns for a later SELECT when a DML quer
    y has just been run.

    Change 236397 on 2017/05/19 by ravg@ravg_RAVG_6660

            [SEN][SQLEngine] Added prepared native query and metadata conversion tests and fixed a bug that came to light

-L
    like -l, but truncated to 250 char.

-c client
    display only submitted by the specified client

-s { pending|shelved|submitted }
    limit to specified status


=@= common command

sync - retrieving files
add - add files
edit - edit/modify
delete - delete/remove files
submit - submit changelist
revert - discard changes
change - create/edit changelist description
shelve - store files from pending changelist into the depot
    p4 shelve -c cl# [file ...]
unshelve - restore shelved files from a pending change into workspace
    p4 -c cl# [ file ... ]
changes - display info about CLs
describe - display a changelist info (description, user, client, files, diffs, etc)
    p4 describe [opt] cl#
        -s omits diff
opened - list open files and their status (file, revision, CL, status)
where - show how file names are mapped in the client view (depot, client view, local path)
label - create/edit a label specification


=@= google driver connected app
pear deck - presentation and classroom
geogebra Math Apps

prince george, bc, 760
high level, ab, 890
yellow knife, nw, 716


=@= github
add a new project: codex-node
* start to setup in desktop
* push an existing repository
    git remote add origin https://github.com/jzou2000/codex-node.git
    git push -u origin master


=@= npm/js
npm for Beginners: A Guide for Front-end Developers
https://www.impressivewebs.com/npm-for-beginners-a-guide-for-front-end-developers/


=@= vsc tips
bracket matching: C+S+\
show all symbols: C+T
go to symbol: C+S+O
go back/forward: A+left/right
preview symbol: C+hover
jump to definition: C+click
peek definition: A+F12
find all references: S+F12

indent/outdent: C+]/[
split editor: C+\


=@= ODBC parameter array with DAE (data-at-exec)
run output:
alloc env: 00000000003F7EF0
alloc dbc: 00000000004B6900
alloc stmt: 00000000004BB4F0
demoArray starts ............
token=3221408(00000000003127A0)
    processed=1
    status=5
token=3342512(00000000003300B0)
    processed=1
    status=5
token=3342512(00000000003300B0)
    processed=3
    status=5
Done
free stmt: 00000000004BB4F0
free dbc: 00000000004B6900
free env: 00000000003F7EF0


data with padding (---) are DAE

ata=> select * from emp4;
       name       | age |  birthday  |              memo1
------------------+-----+------------+----------------------------------
 Adam------------ |  31 | 1950-11-12 | Adam is the first man-----------
 Bob              |  32 | 1950-11-12 | Bob is the builder
 Charles          |  33 | 1950-11-12 | Charles runs a magzine----------
(3 rows)

MSDN:
SQLBindParameter Function
https://docs.microsoft.com/en-us/sql/odbc/reference/syntax/sqlbindparameter-function
Binding Arrays of Parameters
https://docs.microsoft.com/en-us/sql/odbc/reference/develop-app/binding-arrays-of-parameters
Using Arrays of Parameters
https://docs.microsoft.com/en-us/sql/odbc/reference/develop-app/using-arrays-of-parameters
Managing text and image Columns - Use Data-at-Execution Parameters
https://docs.microsoft.com/en-us/sql/relational-databases/native-client-odbc-how-to/managing-text-and-image-columns-use-data-at-execution-parameters


=@= last known good, lkg
touchstone options
-te env.xml -ts resume.xml -o o/o -si 127.0.0.1 -sp 8800 -lkg "SET two-1"


=@= case study: SQL_QUERY
sql_query.xml
GenerateResultset=true
SQL: select name from dm


=@= c++ destructor
private and protected destructor use cases?

If the constructor/destructor is declared as private, then the class cannot be instantiated.

In effect it is used to allow any other polymorphic use of derived classes via pointers to base, but not allow the users to delete using such a pointer. Example:- Abstract Base Classes / Interfaces.


=@= p4 find integration history

p4's integration is file-based, not changelists-based.
Therefore, you can only find the integration history on file (or path/... which is not really useful)
even worse, (# or @) can not be used

Here is an Example
$ p4 integrated //SimbaTestTools/Touchstone/Maintenance/10.1/C++/TestFrameworkLibrary/Utils/SBTStr.cpp
//SimbaTestTools/Touchstone/Maintenance/10.1/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#4 - edit into //SimbaTestTools/Touchstone/Maintenance/10.0/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#2
//SimbaTestTools/Touchstone/Maintenance/10.1/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#8 - copy into //SimbaTestTools/Touchstone/Maintenance/10.0/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#3
//SimbaTestTools/Touchstone/Maintenance/10.1/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#1,#2 - branch into //SimbaTestTools/Touchstone/Maintenance/10.2/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#1
//SimbaTestTools/Touchstone/Maintenance/10.1/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#3,#5 - copy into //SimbaTestTools/Touchstone/Maintenance/10.2/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#2
//SimbaTestTools/Touchstone/Maintenance/10.1/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#1 - branch from //SimbaTestTools/Touchstone/Trunk/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#1
//SimbaTestTools/Touchstone/Maintenance/10.1/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#6 - edit from //SimbaTestTools/Touchstone/Trunk/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#2
//SimbaTestTools/Touchstone/Maintenance/10.1/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#2 - edit into //SimbaTestTools/Touchstone/Trunk/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#3
//SimbaTestTools/Touchstone/Maintenance/10.1/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#3 - edit into //SimbaTestTools/Touchstone/Trunk/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#3
//SimbaTestTools/Touchstone/Maintenance/10.1/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#4 - edit from //SimbaTestTools/Touchstone/Trunk/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#4
//SimbaTestTools/Touchstone/Maintenance/10.1/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#8 - copy into //SimbaTestTools/Touchstone/Trunk/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#5

jasonz@JasonZ ~
$ p4 integrated //SimbaTestTools/Touchstone/Maintenance/10.1/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#8
A revision specification (# or @) cannot be used here.

jasonz@JasonZ ~
$ p4 integrated //SimbaTestTools/Touchstone/Trunk/C++/TestFrameworkLibrary/Utils/SBTStr.cpp
//SimbaTestTools/Touchstone/Trunk/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#1 - branch into //SimbaTestTools/Touchstone/Maintenance/10.1/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#1
//SimbaTestTools/Touchstone/Trunk/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#3 - merge from //SimbaTestTools/Touchstone/Maintenance/10.1/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#2
//SimbaTestTools/Touchstone/Trunk/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#3 - merge from //SimbaTestTools/Touchstone/Maintenance/10.1/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#3
//SimbaTestTools/Touchstone/Trunk/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#4 - edit into //SimbaTestTools/Touchstone/Maintenance/10.1/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#4
//SimbaTestTools/Touchstone/Trunk/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#2 - edit into //SimbaTestTools/Touchstone/Maintenance/10.1/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#6
//SimbaTestTools/Touchstone/Trunk/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#5 - copy from //SimbaTestTools/Touchstone/Maintenance/10.1/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#8

jasonz@JasonZ ~
$


Solution:
make a script that:
1. find all files in a changelist
2. for each involved file, find the integration history


Find info of a changelist
$ p4 describe 245820
Change 245820 by jasonz@jasonz on 2017/07/14 13:39:42

        ATAHD-1134 ParameterType is not recognized on Linux in BindParameterArray

Affected files ...

... //SimbaTestTools/Touchstone/Maintenance/10.1/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#8 edit

Differences ...

==== //SimbaTestTools/Touchstone/Maintenance/10.1/C++/TestFrameworkLibrary/Utils/SBTStr.cpp#8 (text) ====

216c216
<             rc = regcomp(&re_attr, "\\s*([_a-z][_a-z0-9]*)\\s=\\s(.*)", REG_EXTENDED|REG_ICASE);
---
>             rc = regcomp(&re_attr, "\\s*([_a-z][_a-z0-9]*)\\s*=\\s*(.*)", REG_EXTENDED|REG_ICASE);



TODO: p4 interchanges command gives you files that need to be integrated
e.g.
p4 interchanges -b projAprojB
https://stackoverflow.com/questions/18691649/how-to-check-integration-history-of-a-cl
https://www.perforce.com/perforce/r13.1/manuals/cmdref/interchanges.html


=@= performance test (general)
https://www.blazemeter.com/blog/performance-testing-vs-load-testing-vs-stress-testing
Performance testing is the general name for tests that check how the system behaves and performs.
Performance testing examines
 responsiveness,
 stability,
 scalability,
 reliability,
 speed
 resource usage
of your software and infrastructure.

Different types of performance tests provide you with different data, as we will further detail.

KPI - Key Performance Indicators
* number of users
* hits per seconds
* errors per seconds
* response time
* latency
* connect time
* bytes per seconds (throughput)

Load Test
  behaviour of the system under a specific expected load (e.g. for webs, concurrent users access)
  
Stress testing
 the upper limits of capacity within your system by testing it under extreme loads.
 
Soak testing
 endurance testing, a system can sustain the continuous expected load, e.g. memory leak
 
Spike testing
 suddenly increasing or decreasing the load
 
Configuration testing
 load under different configuration, load-balancing
 
=@= C++ patterns/idioms
Curiously Recurring Template Pattern (CRTP, or F-bounded polymorphism idiom)
    template<typename T>
    class Base
    {
        ...
    };
    class Derived: public Base<Derived>
    {
        ...
    };

    @ static polymorphism
    @ object counter
    @ polymorphism chaining
    @ polymorphism copy construction

=@= vsc edit tips

column/block select
    SA-drag
    select only "visible" text, i.e. folded text are not selected

toggle alt cursor
    A-click

select cursor word/line
    C-d     word
    C-i     line

indent/outdent
    C-]/[

match bracket
    SC-\

folding
    SC-[    fold at cursor
    SC-]    unfold
    C-K-0   fold all
    C-K-J   unfold all


=@= comments on script languages

Goodbye, Lua
https://realmensch.org/2016/05/28/goodbye-lua/
LuaJIT is in permanent maintenance mode.
Lua version fragmentation.
JavaScript's ecosystem is awesome.
Lua Coroutines are no longer a monopoly.
Type annotations FTW

I fell out of love with Lua
https://garry.tv/2014/08/16/i-fell-out-of-love-with-lua/


Lua vs JavaScript
http://www.hammerprinciple.com/therighttool/items/lua/javascript
https://www.lua.org/wshop16/Wing2.pdf

LuaJIT
support only 5.1 (instead of 5.3), one-man's project, the owner declares to stop officially.
heavly on manual assembly code for the best performance.

JS,Python have huge ecosystem over lua

Lua problems:
. all variables are global by default
. does not handle binary and hex correctly (limit to 32/64bits)
. numbers can only be floating points.


=@= build lua on Windows

$(OutDir)$(TargetName)$(TargetExt)
lualib
$(ProjectName) = lualib
$(OutDir) = Debug\lualib
$(TargetName) = lualib
$(TargetExt) = .lib
$(Configuration) = Debug
$(ConfigurationName) = Debug
$(Platform) = Win32
$(PlatformName) = Win32
$(PlatformShortName) = x86

$(LIB_DIR) = ..\lib
$(LIB_NAME) = liblua.lib
Output=$(LIB_DIR)\$(Platform)\$(Configuration)\$(LIB_NAME)


=@= build v8
ref:How to build V8 on Windows and not go mad
https://medium.com/dailyjs/how-to-build-v8-on-windows-and-not-go-mad-6347c69aacd4

1. get git, depot_tools and put them in path
2. get vs2015,with windows SDK
3. launch MSBuild Command Prompt for vs2015
4. set Envs
    set DEPOT_TOOLS_WIN_TOOLCHAIN=0
    set GYP_MSVS_VERSION=2015
5. update depot tools (*)
    gclient
6. get source code (*)
    fetch v8
7. go to v8 root directory
    cd v8
8. download all build dependencies (*)
    gclient sync
9. generate template of gn build files
    python tools/dev/v8gen.py x64.debug
   it generates out.gn/x64.debug, containg
   about 124 files, total size 7MB
   including *.dll (75), *.ninja (42) and
   the most important args.gn
   (see details in v8gen-find.txt)
10. edit out.gn/x64.debug/args.gn
    add following lines
    
is_component_build = false
v8_static_library = true

optional:
v8_use_snapshot = false
disable_libfuzzer = true

final:
is_debug = true
target_cpu = "x64"
v8_enable_backtrace = true
v8_enable_slow_dchecks = true
v8_optimized_debug = false
is_component_build = false
v8_static_library = true
v8_use_snapshot = false
disable_libfuzzer = true

11. run build
    ninja -C out.gn/x64.debug
    12:37
ninja: Entering directory `out.gn/x64.debug'
[1/1] Regenerating ninja files
ERROR at build arg file (use "gn args <out_dir>" to edit):8:21: Build argument has no effect.
v8_static_library = true
                    ^---
The variable "v8_static_library" was set as a build argument
but never appeared in a declare_args() block in any buildfile.

To view possible args, run "gn args --list <builddir>"
[1268/1268] STAMP obj/gn_all.stamp

    12:48
    I was buzzed to do something else during the build
    before it finished.
    use following command to find the latest file
    ls -ltR . |less
total 5421107
drwxr-xr-x 28 jasonz Administrators     49152 Oct 13 12:48 obj
-rw-r--r--  1 jasonz Administrators 159535104 Oct 13 12:48 unittests.exe.pdb
-rw-r--r--  1 jasonz Administrators 297926360 Oct 13 12:48 unittests.ilk
-rwxr-xr-x  1 jasonz Administrators  43736064 Oct 13 12:48 unittests.exe
-rw-r--r--  1 jasonz Administrators 230042824 Oct 13 12:47 v8_sample_process.ilk
-rw-r--r--  1 jasonz Administrators 229809144 Oct 13 12:47 v8_shell.ilk
-rw-r--r--  1 jasonz Administrators 114126848 Oct 13 12:47 v8_simple_regexp_fuzzer.exe.pdb    
...
    for this case, notice the last output, check the stamp
    ls -l obj/gn_all.stamp


    grep option
    -v  reverse
    -E  extended pattern (e.g. |)

    built libs
    grep '\.lib' v8gen-find2-full.txt
-rw-r--r-- 1 jasonz Administrators 1874 Oct 13 12:37 ./obj/build/config/sanitizers/options_sources.lib
-rw-r--r-- 1 jasonz Administrators 4788244 Oct 13 12:37 ./obj/testing/gmock/gmock.lib
-rw-r--r-- 1 jasonz Administrators 305120 Oct 13 12:37 ./obj/testing/gmock/gmock_main.lib
-rw-r--r-- 1 jasonz Administrators 10572834 Oct 13 12:37 ./obj/testing/gtest/gtest.lib
-rw-r--r-- 1 jasonz Administrators 22549586 Oct 13 12:42 ./obj/third_party/icu/icui18n.lib
-rw-r--r-- 1 jasonz Administrators 11060442 Oct 13 12:42 ./obj/third_party/icu/icuuc.lib    
 


12. run test (*)
    python tools/run-tests.py -h

D:\pkg\google\v8>

1:17
D:\pkg\google\v8>ninja -C out.gn/x64.debug
ninja: Entering directory `out.gn/x64.debug'
[1/1] Regenerating ninja files
ERROR at build arg file (use "gn args <out_dir>" to edit):7:21: Build argument has no effect.
v8_static_library = true
                    ^---
The variable "v8_static_library" was set as a build argument
but never appeared in a declare_args() block in any buildfile.

To view possible args, run "gn args --list <builddir>"
[1230/1230] STAMP obj/gn_all.stamp

1:28 obj/gn_all.stamp

$ find . -name '*.lib'
./cctest.lib
./generate-bytecode-expectations.lib
./icui18n.dll.lib
./icuuc.dll.lib
./mksnapshot.lib
./obj/build/config/sanitizers/options_sources.lib
./obj/testing/gmock/gmock.lib
./obj/testing/gmock/gmock_main.lib
./obj/testing/gtest/gtest.lib
./obj/third_party/icu/icui18n.lib
./obj/third_party/icu/icuuc.lib
./unittests.lib
./v8.dll.lib
./v8_parser_shell.lib
./v8_simple_json_fuzzer.lib
./v8_simple_parser_fuzzer.lib
./v8_simple_regexp_fuzzer.lib
./v8_simple_wasm_asmjs_fuzzer.lib
./v8_simple_wasm_fuzzer.lib

$ ls -lh *.lib
-rw-r--r-- 1 jasonz Administrators 652K Oct 13 13:28 cctest.lib
-rw-r--r-- 1 jasonz Administrators 684K Oct 13 13:28 generate-bytecode-expectations.lib
-rw-r--r-- 1 jasonz Administrators 1.8M Oct 13 13:22 icui18n.dll.lib
-rw-r--r-- 1 jasonz Administrators 856K Oct 13 13:22 icuuc.dll.lib
-rw-r--r-- 1 jasonz Administrators 657K Oct 13 13:22 mksnapshot.lib
-rw-r--r-- 1 jasonz Administrators 656K Oct 13 13:28 unittests.lib
-rw-r--r-- 1 jasonz Administrators 646K Oct 13 13:22 v8.dll.lib
-rw-r--r-- 1 jasonz Administrators 664K Oct 13 13:24 v8_parser_shell.lib
-rw-r--r-- 1 jasonz Administrators 672K Oct 13 13:23 v8_simple_json_fuzzer.lib
-rw-r--r-- 1 jasonz Administrators 674K Oct 13 13:26 v8_simple_parser_fuzzer.lib
-rw-r--r-- 1 jasonz Administrators 674K Oct 13 13:23 v8_simple_regexp_fuzzer.lib
-rw-r--r-- 1 jasonz Administrators 680K Oct 13 13:26 v8_simple_wasm_asmjs_fuzzer.lib
-rw-r--r-- 1 jasonz Administrators 672K Oct 13 13:26 v8_simple_wasm_fuzzer.lib





build x64.release
2:52
3:04





no static lib is created
build manually

warning in v8_base.lib

Microsoft (R) Library Manager Version 14.00.23506.0
Copyright (C) Microsoft Corporation.  All rights reserved.

perf-jit.obj : warning LNK4221: This object file does not define any previously undefined public symbols, so it will not be used by any link operation that cons
umes this library
gdb-jit.obj : warning LNK4221: This object file does not define any previously undefined public symbols, so it will not be used by any link operation that consu
mes this library


perf-jit.obj : warning LNK4221: This object file does not define any previously undefined public symbols, so it will not be used by any link ope
umes this library
objects-debug.obj : warning LNK4221: This object file does not define any previously undefined public symbols, so it will not be used by any lin
 consumes this library
graph-replay.obj : warning LNK4221: This object file does not define any previously undefined public symbols, so it will not be used by any link
consumes this library
gdb-jit.obj : warning LNK4221: This object file does not define any previously undefined public symbols, so it will not be used by any link oper
mes this library



mkdir lib
copy generate-byte-code-expectations.lib lib

cd obj\third_party\icu
copy *.lib ..\..\..\lib
cd ..

cd ..\mkpeephole
lib /out:..\..\lib\mkpeephole.lib *.obj
cd ..\mksnapshot
lib /out:..\..\lib\mksnapshot.lib *.obj
cd ..\options_source
lib /out:..\..\lib\options_source.lib *.obj

cd ..\v8_base
lib /out:..\..\lib\v8_base.lib *.obj
copy *-jit.obj ..\..\lib

cd ..\v8_libbase
lib /out:..\..\lib\v8_libbase.lib *.obj

cd ..\v8_libplatform
lib /out:..\..\lib\v8_libplatform.lib *.obj

cd ..\v8_libsampler
lib /out:..\..\lib\v8_libsampler.lib *.obj

cd ..\v8_libshell
lib /out:..\..\lib\v8_libshell.lib *.obj

cd ..\v8_nosnapshot
lib /out:..\..\lib\v8_nosnapshot.lib *.obj
cd ..\v8_parser_shell
lib /out:..\..\lib\v8_parser_shell.lib *.obj
cd ..\v8_snapshot
lib /out:..\..\lib\v8_snapshot.lib *.obj



#pragma comment(lib, "v8_base.lib")
#pragma comment(lib, "v8_libbase")
#pragma comment(lib, "v8_external_snapshot")
#pragma comment(lib, "v8_libplatform")
#pragma comment(lib, "v8_libsampler")
#pragma comment(lib, "icuuc.lib")
#pragma comment(lib, "icui18n.lib")

#pragma comment(lib, "inspector")
#pragma comment(lib, "winmm.lib")
#pragma comment(lib, "dbghelp.lib")
#pragma comment(lib, "shlwapi.lib")
perf-jit.obj;v8_base.lib;v8_libbase.lib;v8_libplatform.lib;icui18n.lib;icuuc.lib;v8_libsampler.lib;v8_nosnapshot.lib;v8_libsampler.lib

options_source.lib;mkpeephole.lib;v8_parser_shell.lib;
;v8_libshell.lib;


A few more bits
V8 requires two files located in …\v8-source\out.gn\x64.release for a startup:
snapshot_blob.bin
natives_blob.bin

=@= install luarocks for windows
D:\pkg\luarocks-2.4.3-win32>install /p d:\bin\luarocks /L

D:\pkg\luarocks-2.4.3-win32>rem=rem --[[
LuaRocks 2.4.x installer.


========================
== Checking system... ==
========================


Need admin privileges, now elevating a new process to continue installing...
Now exiting unprivileged installer

(new window)

LuaRocks 2.4.x installer.


========================
== Checking system... ==
========================


Admin privileges available for installing
Looking for Microsoft toolchain matching runtime MSVCR80 and architecture x86
    checking: HKLM\Software\Microsoft\VisualStudio\8.0\Setup\VC
    checking: HKLM\Software\Microsoft\VCExpress\8.0\Setup\VS
    Cannot auto-detect Windows SDK version from MSVCR80

==========================
== System check results ==
==========================

Will configure LuaRocks with the following paths:
LuaRocks        : d:\bin\luarocks
Config file     : d:\bin\luarocks\config-5.1.lua
Rocktree        : d:\bin\luarocks\systree

Lua interpreter : d:\bin\luarocks\lua5.1
    binaries    : d:\bin\luarocks
    libraries   : d:\bin\luarocks
    includes    : d:\bin\luarocks\include
    architecture: x86
    binary link : lua5.1.lib with runtime MSVCR80.dll

Compiler        : Microsoft (make sure it is in your path before using LuaRocks)


Press <ENTER> to start installing, or press <CTRL>+<C> to abort. Use install /?
for installation options.


============================
== Installing LuaRocks... ==
============================


Installing LuaRocks in d:\bin\luarocks...
Installed the LuaRocks bundled Lua interpreter in d:\bin\luarocks
Created LuaRocks command: d:\bin\luarocks\luarocks.bat
Created LuaRocks command: d:\bin\luarocks\luarocks-admin.bat

Configuring LuaRocks...
Created LuaRocks site-config file: d:\bin\luarocks\lua\luarocks\site_config_5_1.
lua
Created LuaRocks config file: d:\bin\luarocks\config-5.1.lua

Creating rocktrees...
Created system rocktree    : "d:\bin\luarocks\systree"
Created local user rocktree: "C:\Users\jasonz\AppData\Roaming\LuaRocks"

Loading registry information for ".rockspec" files

============================
== LuaRocks is installed! ==
============================


You may want to add the following elements to your paths;
Lua interpreter;
  PATH     :   d:\bin\luarocks
  PATHEXT  :   .LUA
LuaRocks;
  PATH     :   d:\bin\luarocks
  LUA_PATH :   d:\bin\luarocks\lua\?.lua;d:\bin\luarocks\lua\?\init.lua
Local user rocktree (Note: %APPDATA% is user dependent);
  PATH     :   %APPDATA%\LuaRocks\bin
  LUA_PATH :   %APPDATA%\LuaRocks\share\lua\5.1\?.lua;%APPDATA%\LuaRocks\share\lua\5.1\?\init.lua
  LUA_CPATH:   %APPDATA%\LuaRocks\lib\lua\5.1\?.dll
System rocktree
  PATH     :   d:\bin\luarocks\systree\bin
  LUA_PATH :   d:\bin\luarocks\systree\share\lua\5.1\?.lua;d:\bin\luarocks\systree\share\lua\5.1\?\init.lua
  LUA_CPATH:   d:\bin\luarocks\systree\lib\lua\5.1\?.dll

Note that the %APPDATA% element in the paths above is user specific and it MUST
be replaced by its actual value.
For the current user that value is: C:\Users\jasonz\AppData\Roaming.


Press any key to close this window...


=@= common VS macros
AssemblyName                ODBC Performance and Stress Tester_VS2015
Configuration               Debug
DefaultPlatformToolset      v140
MSBuildToolsVersion         14.0
OutDir                      D:\wks\PerfTest\x64\Debug\
OutputPath                  D:\wks\PerfTest\x64\Debug\
OutputType                  exe
Platform                    x64
PlatformTarget              x64
PlatformToolset             v140
PROCESSOR_ARCHITECTURE      x86
PROCESSOR_ARCHITEW6432      AMD64
ProjectDir                  D:\wks\PerfTest\ODBC Performance and Stress Tester\
ProjectName                 ODBC Performance and Stress Tester
ProjectPath                 D:\wks\PerfTest\ODBC Performance and Stress Tester\ODBC Performance and Stress Tester_VS2015.vcxproj
SolutionDir                 D:\wks\PerfTest\
SolutionExt                 .sln
SolutionFileName            ODBC Performance and Stress Tester_VS2015.sln
SolutionName                ODBC Performance and Stress Tester_VS2015
TargetDir                   D:\wks\PerfTest\x64\Debug\
TargetExt                   .exe
TargetFileName              PerfTest.exe
TargetName                  PerfTest
TargetPath                  D:\wks\PerfTest\x64\Debug\PerfTest.exe
PlatformArchitecture        32|64


$(SIMBAENGINE_THIRDPARTY_DIR)\mpir\mpir-2.7.0\VS2015\$(Platform)\lib\mpir.lib
$(SIMBAENGINE_THIRDPARTY_DIR)\icu\53.1\w2012r2\vs2012\debug64mt\lib\sbicudt_64.lib
$(SIMBAENGINE_THIRDPARTY_DIR)\icu\53.1\w2012r2\vs2012\debug64mt\lib\sbicuucd_64.lib
$(SIMBAENGINE_THIRDPARTY_DIR)\icu\53.1\w2012r2\vs2012\debug64mt\lib\sbicuind_64.lib


d32 x
r32 ok
d64 ok
r64 x

build events/post-build event:
xcopy /Y /D "$(ICU)\lib\sbicudt53_$(PlatformArchitecture).dll" "$(OutputPath)"
xcopy /Y /D "$(ICU)\lib\sbicuin53_$(PlatformArchitecture).dll" "$(OutputPath)"
xcopy /Y /D "$(ICU)\lib\sbicuuc53_$(PlatformArchitecture).dll" "$(OutputPath)"

better solution - robocopy - single command, avoid duplicated copying
robocopy src dst file...

(robocopy "$(ICU)\lib" "$(OutputPath)" sbicudt53_$(PlatformArchitecture).dll sbicuin53_$(PlatformArchitecture).dll sbicuuc53_$(PlatformArchitecture).dll /njs /njh /np) ^& if %errorlevel% leq 4 exit /b 0

explain: robocopy returns
 0 - no error, no copy
 1 - copy successfully
 2 - extra file/dir were detected, check log
 4 - mismatched file/dir detected, check log
 8 - some file/dir could not be copied
 16- no file copied

/njs - no job summary
/njh - no job head
/np  - no progress

we need to return 0 otherwise MSB consider error:
 1. put robocopy into background (^&)
 2. check return code %errorlevel%
 3. return 0 if errorlevel <=4


=@= property sheet stack
static lib
    Microsoft.Cpp.Win32.user
    Unicode Support
    Core Windows Libraries
application
    Microsoft.Cpp.Win32.user
    Application
    Unicode Support
    Core Windows Libraries
dll
    Microsoft.Cpp.Win32.user
    Windows Dynamic Link Library          add automaticall if general configuration type is Dynamic Library (.dll)
        TargetExtension=.dll
        Preprocessor Definitions += _WINDLL;
    Unicode Support
    Core Windows Libraries


TK: props
win             path macros: TK, TKINC, TKLIB
                include path: TKINC
                link path: TKLIB
                additional dependencies (input libs): EXTLIB
libpath         output macro: OutDir=solution\lib\{Platform}{Configuration}
tkdll/mod       CLR=/MT
libclient/mod   lib macro: EXTLIB=tkdll.lib;plugin.lib
                preprocessor: MODNAME=libcclient

convert a project from .lib to .dll
    add DllMain(), an empty default dllmain.cpp from VS template is good enough.
    change configuration is enough
    it is better to rename {TargetName} if static lib and dll are saved in the same folder (due to conflict of import lib)
        * it is possilbe to create different import lib from dll name (by linker:advanced:import library)
          but you need also to change followings which make it not deserved:
            precompile header .pch
            debug info db: .pdb
            profile guided db: .pgd
            browse info: .bsc
            xml: .xml
            nanifest: .embed.manifest
            
    dll settings:
        General Configuration Type: Dynamic Library (.dll)
        c/c++ preprocessor: _DEBUG;_WINDOWS;_USRDLL;;%(PreprocessorDefinitions)

    lib settings:
        General Configuration Type: Static library (.lib)
        c/c++ preprocessor: _DEBUG;_LIB;%(PreprocessorDefinitions)
    
dump content of .lib, .dll
for static lib
    dumpbin /symbols your-library.lib
for dll/import lib
    dumpbin /exports your-library.lib
    
demangling C++ names
VS: undname mangling-name
g++: c++filt mangling-name

=@= Touchstone preprocessor definitions
ODBC_Debug|x64
WIN32
_WIN64
_DEBUG
_CONSOLE
_CRT_SECURE_NO_WARNINGS
USE_WCHAR_CASE_BASE
_CRT_SECURE_NO_DEPRECATE
COMPILED_FROM_DSP
XML_STATIC
SQL_NOUNICODEMAP
BUILD_PARALLEL_TESTS

=@= Shortcuts for common debuggers

                cont    step    next    return      run-to-cursor
---------------------------------------------------------------------------
vs              F5      F11     F10     S-F11       ^F10
eclipse         F8      F5      F6      F7          ^R
PyCharm         F9      F7      F8      S-F8        A-F9



=@= case study
jdbc data type
        ResultSetMetaData metadata = this.m_resultSet.getMetaData();
        //m_profiler.endCall();
        int numCols = metadata.getColumnCount();
        
        for (int n = 1; n <= numCols; ++n) {
            String name = metadata.getColumnName(n);
            String label = metadata.getColumnLabel(n);
            int type = metadata.getColumnType(n);
            int precision = metadata.getPrecision(n);
            int scale = metadata.getScale(n);
            System.out.println("    " + n + ": " + name + " " + label + " " + type + "(" + precision + "." + scale + ")");
        }
        
pg:
                                     Table "t.types"
  Column  |         Type          |                      Modifiers
----------+-----------------------+------------------------------------------------------
 id       | integer               | not null default nextval('t.types_id_seq'::regclass)
 name     | character varying(16) |
 price    | numeric(10,2)         |
 count    | bigint                |
 discount | real                  |
 start    | date                  |
Indexes:
    "types_pkey" PRIMARY KEY, btree (id)

    1: id id 4(10.0)                INTEGER
    2: name name 12(16.0)           VARCHAR
    3: price price 2(10.2)          NUMERIC
    4: count count -5(19.0)         BIGINT
    5: discount discount 7(8.8)     REAL
    6: start start 91(13.0)         DATE

java.sql.Types:

ARRAY           2003
BIGINT          -5
BINARY          -2
BIT             -7
BLOB            2004
BOOLEAN         16
CHAR            1
CLOB            2005
DATALINK        70
DATE            91
DECIMAL         3
DISTINCT        2001
DOUBLE          8
FLOAT           6
INTEGER         4
JAVA_OBJECT     2000
LONGNVARCHAR    -16
LONGVARBINARY   -4
LONGVARCHAR     -1
NCHAR           -15
NCLOB           2011
NULL            0
NUMERIC         2
NVARCHAR        -9
OTHER           1111
REAL            7
REF             2006
ROWID           -8
SMALLINT        5
SQLXML          2009
STRUCT          2002
TIME            92
TIMESTAMP       93
TINYINT         -6
VARBINARY       -3
VARCHAR         12


=@= odbc data type

#define SQL_UNKNOWN_TYPE    0
#define SQL_CHAR            1
#define SQL_NUMERIC         2
#define SQL_DECIMAL         3
#define SQL_INTEGER         4
#define SQL_SMALLINT        5
#define SQL_FLOAT           6
#define SQL_REAL            7
#define SQL_DOUBLE          8
    >3.0
#define SQL_DATETIME        9

#define SQL_VARCHAR         12

#define SQL_WCHAR           (-8)
#define SQL_WVARCHAR        (-9)
#define SQL_WLONGVARCHAR    (-10)

#define SQL_C_WCHAR         SQL_WCHAR

SQL Types:
    SQL_CHAR                              1
    SQL_VARCHAR                          12
    SQL_LONGVARCHAR                      -1
    SQL_WCHAR                            -8
    SQL_WVARCHAR                         -9
    SQL_WLONGVARCHAR                    -10
    SQL_DECIMAL                           3
    SQL_NUMERIC                           2
    SQL_BIT                              -7
    SQL_TINYINT                          -6
    SQL_SMALLINT                          5
    SQL_INTEGER                           4
    SQL_BIGINT                           -5
    SQL_FLOAT                             6
    SQL_DOUBLE                            8
    SQL_REAL                              7
    SQL_BINARY                           -2
    SQL_VARBINARY                        -3
    SQL_LONGVARBINARY                    -4
    SQL_DATE                              9
    SQL_TIME                             10
    SQL_TIMESTAMP                        11
    SQL_TYPE_DATE                        91
    SQL_TYPE_TIME                        92
    SQL_TYPE_TIMESTAMP                   93
    SQL_GUID                            -11
    SQL_INTERVAL_YEAR                   101
    SQL_INTERVAL_MONTH                  102
    SQL_INTERVAL_DAY                    103
    SQL_INTERVAL_HOUR                   104
    SQL_INTERVAL_MINUTE                 105
    SQL_INTERVAL_SECOND                 106
    SQL_INTERVAL_YEAR_TO_MONTH          107
    SQL_INTERVAL_DAY_TO_HOUR            108
    SQL_INTERVAL_DAY_TO_MINUTE          109
    SQL_INTERVAL_DAY_TO_SECOND          110
    SQL_INTERVAL_HOUR_TO_MINUTE         111
    SQL_INTERVAL_HOUR_TO_SECOND         112
    SQL_INTERVAL_MINUTE_TO_SECOND       113

SQL C_Types:
    SQL_C_CHAR                            1
    SQL_C_WCHAR                          -8
    SQL_C_NUMERIC                         2
    SQL_C_BIT                            -7
    SQL_C_TINYINT                        -6
    SQL_C_STINYINT                      -26
    SQL_C_UTINYINT                      -28
    SQL_C_SHORT                           5
    SQL_C_SSHORT                        -15
    SQL_C_USHORT                        -17
    SQL_C_LONG                            4
    SQL_C_SLONG                         -16
    SQL_C_ULONG                         -18
    SQL_C_SBIGINT                       -25
    SQL_C_UBIGINT                       -27
    SQL_C_FLOAT                           7
    SQL_C_DOUBLE                          8
    SQL_C_BINARY                         -2
    SQL_C_DATE                            9
    SQL_C_TIME                           10
    SQL_C_TIMESTAMP                      11
    SQL_C_TYPE_DATE                      91
    SQL_C_TYPE_TIME                      92
    SQL_C_TYPE_TIMESTAMP                 93
    SQL_C_GUID                          -11
    SQL_C_INTERVAL_YEAR                 101
    SQL_C_INTERVAL_MONTH                102
    SQL_C_INTERVAL_DAY                  103
    SQL_C_INTERVAL_HOUR                 104
    SQL_C_INTERVAL_MINUTE               105
    SQL_C_INTERVAL_SECOND               106
    SQL_C_INTERVAL_YEAR_TO_MONTH        107
    SQL_C_INTERVAL_DAY_TO_HOUR          108
    SQL_C_INTERVAL_DAY_TO_MINUTE        109
    SQL_C_INTERVAL_DAY_TO_SECOND        110
    SQL_C_INTERVAL_HOUR_TO_MINUTE       111
    SQL_C_INTERVAL_HOUR_TO_SECOND       112
    SQL_C_INTERVAL_MINUTE_TO_SECOND     113



C type identifier	ODBC C typedef	C type
SQL_C_CHAR	        SQLCHAR *	    unsigned char *
SQL_C_WCHAR	        SQLWCHAR *	    wchar_t *
SQL_C_SSHORT	    SQLSMALLINT	    short int
SQL_C_USHORT	    SQLUSMALLINT	unsigned short int
SQL_C_SLONG 	    SQLINTEGER	    long int
SQL_C_ULONG 	    SQLUINTEGER	    unsigned long int
SQL_C_FLOAT	        SQLREAL	        float
SQL_C_DOUBLE	    SQLDOUBLE, SQLFLOAT	double
SQL_C_BIT	        SQLCHAR	        unsigned char
SQL_C_STINYINT	    SQLSCHAR	    signed char
SQL_C_UTINYINT  	SQLCHAR	        unsigned char
SQL_C_SBIGINT	    SQLBIGINT	    _int64[h]
SQL_C_UBIGINT	    SQLUBIGINT	    unsigned _int64[h]
SQL_C_BINARY	    SQLCHAR *	    unsigned char *
SQL_C_BOOKMARK  	BOOKMARK	    unsigned long int[d]
SQL_C_VARBOOKMARK	SQLCHAR *	    unsigned char *

struct tagDATE_STRUCT {  
   SQLSMALLINT year;  
   SQLUSMALLINT month;  
   SQLUSMALLINT day;    
} DATE_STRUCT;
// size = 6

struct tagTIME_STRUCT {  
   SQLUSMALLINT hour;  
   SQLUSMALLINT minute;  
   SQLUSMALLINT second;  
} TIME_STRUCT;[a] 
// size = 6

struct tagTIMESTAMP_STRUCT {  
   SQLSMALLINT year;  
   SQLUSMALLINT month;  
   SQLUSMALLINT day;  
   SQLUSMALLINT hour;  
   SQLUSMALLINT minute;  
   SQLUSMALLINT second;  
   SQLUINTEGER fraction;
} TIMESTAMP_STRUCT;
// size = 16

struct tagSQL_NUMERIC_STRUCT {  
   SQLCHAR precision;  
   SQLSCHAR scale;  
   SQLCHAR sign;  
   SQLCHAR val[SQL_MAX_NUMERIC_LEN];    // 16
} SQL_NUMERIC_STRUCT;  
// size = 19

struct tagSQLGUID {  
   DWORD Data1;  
   WORD Data2;  
   WORD Data3;  
   BYTE Data4[8];  
} SQLGUID;
// size = 16

On Windows
    sizeof DATE_STRUCT = 6
    sizeof TIME_STRUCT = 6
    sizeof TIMESTAMP_STRUCT = 16
    sizeof SQL_NUMERIC_STRUCT = 19
    sizeof SQLGUID = 16

=@= ODBC descriptors: APD/ARD  IPD/IRD
APD Application Parameter Descriptor - parameter binding
ARD Application Row Descriptor - column metadata and binding

IPD Implementation Parameter Descriptor
IRD Implementation Row Descriptor

consistancy check: If an application calls SQLSetDescField to set any field other than SQL_DESC_COUNT,
the record becomes unbound. SQL_DESC_DATA_PTR need to be called as the last SQLSetDescField (which leads to consistancy check)
to make sure the record is bound.


=@= make tips
variable flavors
    name = value        # recursively expand
    name := value       # simply expand, posix standard ::= (after 2012)
    name ?= value       # assign if not defined
    name != shell-cmd   # assign shell-cmd output to name, equals to name := $(shell shell-cmd)
    name += value       # append, equals to name := $(name) value
    undefine name
    targets: variable-assignment    # variables are set for the targets (and all their prerequisites) only
    patterns: variable-assignment   # patterns specific
condition
    ifeq (v1, v2)
      else
      endif
    ifneq (v1, v2)
    ifdef (v)
    ifndef (v)
.phony: targets         # targets are make targets only, not files
recursive
    $(MAKE) -C subfolder    # run make from subfolder
    export [ var-list ] # export variables to sub-make
substitution
    bar := $(foo:.o=.c)                     # equivalent to bar := $(patsubst %.o,%.c,$(foo))
    a := $($(x))
functions: string
    $(subst from,to,text)                   # substitute "from" in "text" to "to"
    $(patsubst pattern,replacement,text)    # replace each matched word in text to replacement, '%' is wildcard
    $(strip string)                         # strip leading/trailing whites, replace consecutive whites with one in middle
    $(findstring find,in)                   # search "in" for an occurrence of "find" (or empty if not)
    $(filter patterns,text)                 # return all matched words in "text" that matched
    $(filter-out patterns,text)             # opposite of filter
    $(sort list)                            # sort in lexical order, removing duplicate words
    $(word n,text)                          # n-th word, 1-based
    $(wordlist s,e,text)                    # word list [s,e] from text
    $(words text)                           # number of words
    $(firstword text)
    $(lastword text)
functions: filename
    $(dir names)                            # directory-part of file names
    $(notdir names)                         # not directory-part, i.e. file names
    $(suffix names)
    $(basename names)
    $(addsuffix suffix,names)
    $(addprefix prefix,names)
    $(join list1,list2)                     # $(join a b,.c .o)  => a.c b.o
    $(wildcard pattern)
    $(realpath names)                       # canonical absolute name
    $(abspath names)
functions: condition
    $(if condition,then,else)
    $(or cond1[,cond2[,cond3]])
    $(and cond1[,cond2[,cond3]])
functions: misc
    $(foreach var,list,text)                # list := a b c
                                            # files := $(foreach dir,$(list),$(wildcard $(dir)/*))
                                            # => files := $(wildcard a/* b/* c/*)
    $(file op filename[,text])              # op   { > | >> | < }
    $(call variable,param,param,...)        # reverse = $(2) $(1)
                                            # foo := $(call reverse,a,b)        => b a
    $(value var)
    $(eval params)
    $(error text)                           # fatal error with message "text"
    $(warning text)
    $(info text)
    $(shell cmd-line)                       # return cmd-line output
    $(guile params)                         # embedded language
auto generate dependencies
    g++ -MM targets     # generate make-suitable set of dependencies based on includsion patterns
    -MMD ?
    https://www.gnu.org/software/make/manual/html_node/Automatic-Prerequisites.html#Automatic-Prerequisites
    http://www.microhowto.info/howto/automatically_generate_makefile_dependencies.html
    
make-related-variables
   CURDIR
   MAKE
   MAKECMDGOALS
   MAKEFLAGS
   MAKEFILES
   MAKELEVEL
   VPATH
useful options
    --debug={all|basic|verbose|implicit|jobs|makefile|none}     # all: will be really really long!
    -n      --dry-run
    -e      --environment-overrides
    -r      --no-builtin-rules
    -t      --touch
    -B      --always-make
recipe control
    +           run even -n (--dry-run) in make option
    -           ignoring errors
    ;           empty recipe
    @           suppress echo the line
    .ONESHELL:  otherwise, each line invokes a new shell. (considerring cd $(@D) && do-something)
    
=@= gdb common commands
TUI
    ^x^a        toggle TUI
    ^x^o        change active window
    ^x^s        toggle SingleKey mode
    ^L          refresh
display/fmt expr
    undisplay 1 2 3     # or delete display 1 2 3
    delete|disable|enable display 1 2 3
    info display
 break location
    break ... if cond
    clear [location]
    delete [n...]
    disable/enable [n...]
    condition n [expr]
    commands [range...]
      command-list
    end
    save breakpoints [filename]             # source to load
    
    tbreak ...
    info break [n...]
    watch [-l] expr [thread n] [mask m]     # break if changed, rwatch for read, awatch for r/w
    catch event                             # tcatch
            throw
            catch
            exception unhandled
            assert
            exec
            syscal
            fork
            vfork
    break location thread thnum if ...      # break in thread        

=@= grep+find
grep
    -i      case-insensitive
    -e      reg pattern
    -c      count
    -l      files-with-match        -L no-match
    -h      no-filename             -H forced filename
    -n      line-number
    -r      recursively             (no depth control, see solution below)
    -v      invert match

find . -maxdepth 2 -type f -name '*.xml' -exec grep -Hne 'pattern' {} \;
# grep by default won't print filename if there's only one file (e.g. invoked by find)


# JS Modules used for Node.js project

* express
* axios
* xml2js
* js-yaml
* better-sqlite3 (alt: lovefield (rdbm by js/google))
* mongodb
* showdown (alt: markdown-it)
* nedb (nedb-shell, mongodb impletented by js, alt: lokijs, pouchdb[couchdb], rxdb)
