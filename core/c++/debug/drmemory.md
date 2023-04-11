---
title: Dr.Memory
nav: dr.memory
---

## Basic Usage

```sh
drmemory -quiet -batch -brief -ignore_kernel -no_gen_suppress_offs -logdir ./drm-log -suppress myfile.txt -- app [app_options]

```

|option       |description |
|:------------|:-----------------|
|-v           |verbose information (for debugging DrM itself)|
|-brief       |show simplified and easier-to-read error reports|
|-quiet       |stop displaying dialogs and stderr|
|-batch       |do not invoke notepad at the end|
|-logdir dir-name|where the output go|
|-ignore_kernel|attempt execution on an unsupported kernel|
|-suppress file|file containing errors to suppress|
|-gen_suppress_offs|generate suppress mod+offs, not much useful in general, turn off by -no_gen_suppress_offs|


## suppress file

Dr.Memory generate a **blue-print** of suppress file for every error found, here is a snippet (``module!function`` type-only, ``<module+offset>`` is not very useful in general unless diagnosis at assembly level or specified version)

```txt
# File for suppressing errors found in pid 36712: "Touchstone.exe"

# Suppression for Error #1
UNINITIALIZED READ
name=Error #1 (update to meaningful name)
sbicuuc58d_64.dll!sbicu_58::SharedObject::removeRef
sbicuuc58d_64.dll!sbicu_58::UnicodeString::UnicodeString
Touchstone.exe!Simba::ODBCTest::ODBCStr::ODBCStr
Touchstone.exe!Simba::ODBCTest::ParseConnectionString
Touchstone.exe!Simba::ODBCTest::OdbcTestCaseBase::Pimpl::Pimpl
Touchstone.exe!Simba::ODBCTest::OdbcTestCaseBase::OdbcTestCaseBase
Touchstone.exe!Simba::ODBCTest::OdbcTestCaseBaseC2::OdbcTestCaseBaseC2
Touchstone.exe!`anonymous namespace'::ConnectionAttributesTestBase::ConnectionAttributesTestBase
Touchstone.exe!`anonymous namespace'::T_API_1_4_1::T_API_1_4_1
Touchstone.exe!Simba::Test::RegisterTestCase<>::registerClass
Touchstone.exe!Simba::Test::Factory::getTest
Touchstone.exe!Simba::Test::Engine::RunTests
Touchstone.exe!`anonymous namespace'::DoMain
Touchstone.exe!main

# Suppression for Error #2
UNADDRESSABLE ACCESS
name=Error #2 (update to meaningful name)
sbicuuc58d_64.dll!sbicu_58::SharedObject::removeRef
sbicuuc58d_64.dll!sbicu_58::SharedObject::removeRef
sbicuuc58d_64.dll!sbicu_58::SharedObject::removeRef
sbicuuc58d_64.dll!sbicu_58::SharedObject::removeRef
sbicuuc58d_64.dll!uprv_malloc_58
sbicuuc58d_64.dll!ucnv_createConverter_58
sbicuuc58d_64.dll!ucnv_createConverter_58
sbicuuc58d_64.dll!ucnv_open_58
sbicuuc58d_64.dll!sbicu_58::UnicodeString::doCodepageCreate
sbicuuc58d_64.dll!sbicu_58::UnicodeString::UnicodeString
Touchstone.exe!Simba::ODBCTest::ODBCStr::ODBCStr
Touchstone.exe!Simba::ODBCTest::ParseConnectionString
Touchstone.exe!Simba::ODBCTest::OdbcTestCaseBase::Pimpl::Pimpl
Touchstone.exe!Simba::ODBCTest::OdbcTestCaseBase::OdbcTestCaseBase
Touchstone.exe!Simba::ODBCTest::OdbcTestCaseBaseC2::OdbcTestCaseBaseC2
Touchstone.exe!`anonymous namespace'::ConnectionAttributesTestBase::ConnectionAttributesTestBase
Touchstone.exe!`anonymous namespace'::T_API_1_4_1::T_API_1_4_1
Touchstone.exe!Simba::Test::RegisterTestCase<>::registerClass
Touchstone.exe!Simba::Test::Factory::getTest
Touchstone.exe!Simba::Test::Engine::RunTests

```

It is more convenient and easier to understand and manage using
following skills:

* wildcards ``*`` and ``?`` in both module and function names
* single ``*`` for any frame
* prefix-matching: if the top-most of the stack macthes
* final ``...``` matches zero or more frames in the stack
* ``module!...`` matches **one** or more frames in the module



## visual release version issue

```
Error #1: INVALID HEAP ARGUMENT: allocated with operator new, freed with operator delete[]
# 0 replace_operator_delete_array                                              [d:\a\drmemory\drmemory\common\alloc_replace.c:3002]
# 1 std::locale::`scalar deleting destructor'
# 2 std::basic_stringstream<>::~basic_stringstream<>
# 3 std::basic_stringstream<>::`vbase destructor'
# 4 Simba::Test::VerboseLogger::VerboseLogger                                  [C:\wks\touchstone\TestFrameworkLibrary\SBTVerboseLogger.cpp:44]
# 5 `dynamic initializer for 'Simba::Test::VerboseLogger::s_defaultInstance''  [C:\wks\touchstone\TestFrameworkLibrary\SBTVerboseLogger.cpp:21]
# 6 _initterm                                                                  [minkernel\crts\ucrt\src\appcrt\startup\initterm.cpp:21]
# 7 __scrt_common_main_seh                                                     [d:\agent\_work\4\s\src\vctools\crt\vcstartup\src\startup\exe_common.inl:256]
# 8 KERNEL32.dll!BaseThreadInitThunk                                          +0x13     (0x00007ffe9bdc7034 <KERNEL32.dll+0x17034>)
Note: memory was allocated here:
Note: # 0 replace_operator_new                                                       [d:\a\drmemory\drmemory\common\alloc_replace.c:2903]
Note: # 1 std::basic_streambuf<>::basic_streambuf<>
Note: # 2 std::basic_stringbuf<>::basic_stringbuf<>
Note: # 3 std::basic_stringstream<>::basic_stringstream<>
Note: # 4 Simba::Test::VerboseLogger::VerboseLogger                                  [C:\wks\touchstone\TestFrameworkLibrary\SBTVerboseLogger.cpp:29]
Note: # 5 `dynamic initializer for 'Simba::Test::VerboseLogger::s_defaultInstance''  [C:\wks\touchstone\TestFrameworkLibrary\SBTVerboseLogger.cpp:21]
Note: # 6 _initterm                                                                  [minkernel\crts\ucrt\src\appcrt\startup\initterm.cpp:21]
Note: # 7 __scrt_common_main_seh                                                     [d:\agent\_work\4\s\src\vctools\crt\vcstartup\src\startup\exe_common.inl:256]
Note: # 8 KERNEL32.dll!BaseThreadInitThunk                                          +0x13     (0x00007ffe9bdc7034 <KERNEL32.dll+0x17034>)

Error #2: INVALID HEAP ARGUMENT: allocated with operator new, freed with operator delete[]
# 0 replace_operator_delete_array                           [d:\a\drmemory\drmemory\common\alloc_replace.c:3002]
# 1 std::locale::`scalar deleting destructor'
# 2 std::basic_ifstream<>::~basic_ifstream<>
# 3 std::basic_ifstream<>::`vbase destructor'
# 4 Simba::Test::FileOutput::open                           [C:\wks\touchstone\TestFrameworkLibrary\SBTFileOutput.cpp:87]
# 5 Simba::Test::FileOutput::FileOutput                     [C:\wks\touchstone\TestFrameworkLibrary\SBTFileOutput.cpp:35]
# 6 `anonymous namespace'::InitLoggers                      [C:\wks\touchstone\Main.cpp:538]
# 7 `anonymous namespace'::DoMain                           [C:\wks\touchstone\Main.cpp:612]
# 8 __scrt_common_main_seh                                  [d:\agent\_work\4\s\src\vctools\crt\vcstartup\src\startup\exe_common.inl:288]
# 9 KERNEL32.dll!BaseThreadInitThunk                       +0x13     (0x00007ffe9bdc7034 <KERNEL32.dll+0x17034>)
Note: memory was allocated here:
Note: # 0 replace_operator_new                                    [d:\a\drmemory\drmemory\common\alloc_replace.c:2903]
Note: # 1 std::basic_streambuf<>::basic_streambuf<>
Note: # 2 std::basic_filebuf<>::basic_filebuf<>
Note: # 3 std::basic_ifstream<>::basic_ifstream<>
Note: # 4 Simba::Test::FileOutput::open                           [C:\wks\touchstone\TestFrameworkLibrary\SBTFileOutput.cpp:80]
Note: # 5 Simba::Test::FileOutput::FileOutput                     [C:\wks\touchstone\TestFrameworkLibrary\SBTFileOutput.cpp:35]
Note: # 6 `anonymous namespace'::InitLoggers                      [C:\wks\touchstone\Main.cpp:538]
Note: # 7 `anonymous namespace'::DoMain                           [C:\wks\touchstone\Main.cpp:612]
Note: # 8 __scrt_common_main_seh                                  [d:\agent\_work\4\s\src\vctools\crt\vcstartup\src\startup\exe_common.inl:288]
Note: # 9 KERNEL32.dll!BaseThreadInitThunk                       +0x13     (0x00007ffe9bdc7034 <KERNEL32.dll+0x17034>)


Error #185: INVALID HEAP ARGUMENT: allocated with operator new, freed with operator delete[]
# 0 replace_operator_delete_array                                       [d:\a\drmemory\drmemory\common\alloc_replace.c:3002]
# 1 std::codecvt<>::`scalar deleting destructor'
# 2 std::`dynamic atexit destructor for '_Fac_tidy_reg''
# 3 <lambda_f03950bc5685219e0bcd2087efbe011e>::operator()               [minkernel\crts\ucrt\src\appcrt\startup\onexit.cpp:204]
# 4 __crt_seh_guarded_call<>::operator()<>                              [VCCRT\vcruntime\inc\internal_shared.h:204]
# 5 _execute_onexit_table                                               [minkernel\crts\ucrt\src\appcrt\startup\onexit.cpp:160]
# 6 <lambda_6e4b09c48022b2350581041d5f6b0c4c>::operator()               [minkernel\crts\ucrt\src\appcrt\startup\exit.cpp:232]
# 7 __crt_seh_guarded_call<>::operator()<>                              [VCCRT\vcruntime\inc\internal_shared.h:224]
# 8 common_exit                                                         [minkernel\crts\ucrt\src\appcrt\startup\exit.cpp:201]
# 9 __scrt_common_main_seh                                              [d:\agent\_work\4\s\src\vctools\crt\vcstartup\src\startup\exe_common.inl:295]
#10 KERNEL32.dll!BaseThreadInitThunk                                   +0x13     (0x00007ffe9bdc7034 <KERNEL32.dll+0x17034>)
Note: memory was allocated here:
Note: # 0 replace_operator_new                              [d:\a\drmemory\drmemory\common\alloc_replace.c:2903]
Note: # 1 std::codecvt<>::_Getcat
Note: # 2 std::use_facet<>
Note: # 3 std::basic_filebuf<>::open
Note: # 4 std::basic_ofstream<>::open
Note: # 5 Simba::Test::FileOutput::open                     [C:\wks\touchstone\TestFrameworkLibrary\SBTFileOutput.cpp:77]
Note: # 6 Simba::Test::FileOutput::FileOutput               [C:\wks\touchstone\TestFrameworkLibrary\SBTFileOutput.cpp:35]
Note: # 7 `anonymous namespace'::InitLoggers                [C:\wks\touchstone\Main.cpp:538]
Note: # 8 `anonymous namespace'::DoMain                     [C:\wks\touchstone\Main.cpp:612]
Note: # 9 __scrt_common_main_seh                            [d:\agent\_work\4\s\src\vctools\crt\vcstartup\src\startup\exe_common.inl:288]
Note: #10 KERNEL32.dll!BaseThreadInitThunk                 +0x13     (0x00007ffe9bdc7034 <KERNEL32.dll+0x17034>)

```
