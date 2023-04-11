---
title: VisualStudio Properties
date: 2019-05-28
tags: [visual-studio, vs, properties, prop]
weight: 21
---

# VisualStudio Properties

## Common Used Macros
ODBC_Debug/Win32
```
SolutionDir = ...\10.1\
ProjectDir = ...\10.1\
ProjectName = Touchstone
Configuration = ODBC_Debug
ConfigurationName = ODBC_Debug


IntDir = Win32\ODBC_Debug\
IntermediateOutputPath = Win32\ODBC_Debug\
OutDir = ...\Win32\ODBC_Debug\
OutputPath = ...\Win32\ODBC_Debug\
Platform = Win32|x64
PlatformArchitecture = 32|64
PlatformTarget = x86|x64
PlatformShortName = x86|x64
TargetExt = .exe
TargetDir = ...\Win32\ODBC_Debug\
TargetFileName = $(TargetName)$(TargetExt)  = TouchstoneODBC.exe

MSBuildProjectName

CharacterSet = Unicode
```

## User Macros

## Customized Macro
Touchstone
```
Output Directory (OutDir, OutputPath) = $(SolutionDir)$(Platform)\$(Configuration)\
Intermediate Directory (IntDir, IntermediateOutputPath)= $(Platform)\$(Configuration)\
TargetDir

Target Name (TargetName) = TouchstoneODBC

```

## Misc

### General
* vs2015: v140
* Character Set: Use Unicode Character Set

## Compile
* Additional Include Directories: ./TestFrameworkLibrary/include;...
* Debug Information Format: Program Database for Edit and Continue (/ZI), Program Database (/Zi)
* Warning Level: Level3 (/W3)
* Optimization: Disabled(/Od) Maximize Speed (/O2)
* Whole Program Optimization: No, Yes (/GL)
* Preprocessor Definitions:
WIN32 (32)
_WIN64 (64)
_DEBUG (NDEBUG)
_CONSOLE
_CRT_SECURE_NO_WARNINGS
USE_WCHAR_CASE_BASE
_CRT_SECURE_NO_DEPRECATE
COMPILED_FROM_DSP
XML_STATIC
SQL_NOUNICODEMAP
BUILD_PARALLEL_TESTS
* Runtime Library: Multi-threaded Debug (/MTd) Multi-threaded (/MT)
* Object File Name: objects\$(IntDir)

## Linker
* OutputFile = binaries\$(Platform)\$(Configuration)\TouchstoneODBC.exe
* Enable Incremental Linking = No(/INCREMENTAL:NO)
* Additional Library Directories = %(AdditionalLibraryDiretories)
* input/Additional Dependencies
    .\ThirdParty\mpir\VS2015\$(Platform)\lib\mpir.lib
    $(SIMBAENGINE_THIRDPARTY_DIR)\icu\53.1.x\w2012r2\vs2015\debug32mt\lib\sbicudt_32.lib
    $(SIMBAENGINE_THIRDPARTY_DIR)\icu\53.1.x\w2012r2\vs2015\debug32mt\lib\sbicuucd_32.lib
    $(SIMBAENGINE_THIRDPARTY_DIR)\icu\53.1.x\w2012r2\vs2015\debug32mt\lib\sbicuind_32.lib
    ws2_32.lib
    $(SIMBASHARED_DIR)\Tools\Maintenance\1.0\w2012r2\vs2015\debug32mt\lib\Tools.lib
* Generate Debug Info: true
* Generate Program Database File = binaries\$(Platform)\$(Configuration)\TouchstoneODBC.pdb
* Subsystem = Console (/SUBSYSTEM: CONSOLE)
* Randomized Base Address: No
* Target Machine: MacineX86 (/MACHINE:X86)

## Resources
* Preprocessor Definitions = _UNICODE;UNICODE;%(PrepocessorDefinitions)

## Build Event
* Post-Build Event
    xcopy /Y /D "$(SIMBAENGINE_THIRDPARTY_DIR)icu\53.1.x\w2012r2\vs2015\debug32mt\lib\sbicudt53_32.dll" "$(ProjectDir)\binaries\$(Platform)\$(Configuration)"
    xcopy /Y /D "$(SIMBAENGINE_THIRDPARTY_DIR)\icu\53.1.x\w2012r2\vs2015\debug32mt\lib\sbicuin53d_32.dll" "$(ProjectDir)\binaries\$(Platform)\$(Configuration)"
    xcopy /Y /D "$(SIMBAENGINE_THIRDPARTY_DIR)\icu\53.1.x\w2012r2\vs2015\debug32mt\lib\sbicuuc53d_32.dll" "$(ProjectDir)\binaries\$(Platform)\$(Configuration)"
