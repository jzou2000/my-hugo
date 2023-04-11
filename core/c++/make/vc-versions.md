---
title: Visual Studio and Visual C++ Versions
date: 2019-05-28
nav: "VS/VC version"
tags: [vs, vc, version]
weight: 20
---

# Visual Studio Version and Visual C++ Version

|Visual Studio|Visual C++|
|-------------|----------|
|2012|11|
|2013|12|
|2015|14|
|2017|15|

Note: source - mpir: building with Microsoft Visual Studio

# MPIR Builds

|config|description|
|------|------------|
|dll_mpir_gc|standard DLL, no assembler (win32 and x64)|
|dll_mpir_p3|assembly optimised DLL for pentium 3 (win32)|
|lib_mpir_p3|assembly optimised static library for pentium 3 (x64)|
|lib_mpir_core2|assembly optimised static library for core2 (x64)|
|dll_mpir_core2|assembly optimised DLL for core2 (x64)|
|lib_mpir_cxx|the MPIRXX C++ static library (win32 and x64)|


# Touchstone 10.1 vs2013

## ODBC_Debug|x64

### additional include path
<div class='code'>
./ThirdParty/mpir/VS2013/$(Platform)/include
$(SIMBAENGINE_THIRDPARTY_DIR)\mpir\mpir-3.0.0\include
</div>

### link input
<div class='code'>
.\ThirdParty\mpir\VS2013\$(Platform)\lib\mpir.lib
$(SIMBAENGINE_THIRDPARTY_DIR)\icu\53.1.x\w2012r2\vs2013\debug64mt\lib\sbicudt_64.lib
$(SIMBAENGINE_THIRDPARTY_DIR)\icu\53.1.x\w2012r2\vs2013\debug64mt\lib\sbicuucd_64.lib
$(SIMBAENGINE_THIRDPARTY_DIR)\icu\53.1.x\w2012r2\vs2013\debug64mt\lib\sbicuind_64.lib
ws2_32.lib
$(SIMBASHARED_DIR)\Tools\Maintenance\1.0\w2012r2\vs2013\debug64mt\lib\Tools.lib

$(SIMBAENGINE_THIRDPARTY_DIR)\mpir\mpir-3.0.0\vs2013\dll\$(Platform)\Debug\mpir.lib
</div>

### post-build
<div class='code'>
xcopy /Y /D "$(SIMBAENGINE_THIRDPARTY_DIR)\icu\53.1.x\w2012r2\vs2013\debug64mt\lib\sbicudt53_64.dll" "$(ProjectDir)\binaries\$(Platform)\$(Configuration)"
xcopy /Y /D "$(SIMBAENGINE_THIRDPARTY_DIR)\icu\53.1.x\w2012r2\vs2013\debug64mt\lib\sbicuin53d_64.dll" "$(ProjectDir)\binaries\$(Platform)\$(Configuration)"
xcopy /Y /D "$(SIMBAENGINE_THIRDPARTY_DIR)\icu\53.1.x\w2012r2\vs2013\debug64mt\lib\sbicuuc53d_64.dll" "$(ProjectDir)\binaries\$(Platform)\$(Configuration)"

xcopy /Y /D "$(SIMBAENGINE_THIRDPARTY_DIR)\mpir\mpir-3.0.0\vs2013\dll\$(Platform)\Debug\mpir.dll" "$(ProjectDir)\binaries\$(Platform)\$(Configuration)"
</div>

