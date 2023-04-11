---
title: Identify Compiler Using Predefined Macros
nav: identify compiler
---

Reference [SourceForge.net](https://sourceforge.net/p/predef/wiki/Compilers/)

|Compiler    |Macro           |Sample Value       |Description               |
|:-----------|:---------------|:------------------|:-------------------------|
|gcc         |``__GNUC__``    |4                  |version major             |
|            |``__GNUC_MINOR__``|4                |version revision/minor    |
|clang       |``__clang__``   |                   |                          |
|            |``__clang_major__``|                |version major             |
|            |``__clang_minor__``|                |version minor             |
|VisualC++   |``_MSC_VER``    |1910               |VVRR 15.0(2017)           |
|            |``_MSC_FULL_VER``    |191025017     |VVRRPPPP                  |
|SolarisStudio|``__SUNPRO_C`` |0x5120             |0xVRP version,revision,patch (upto 5.9) 0xVRRP later, e.g. ss12.3/compiler5.12|
|            |``__SUNPRO_CC`` |                   |                          |
|IBM xlC     |``__ibmxl__``   |                   |clang-based compiler      |
|            |``__ibmxl_vrm__``|0x0D010600        |0xVVRRMM00 version,release,modification,fix e.g. 13.1.6.1|
|            |``__ibmxl_version__``|13            |version                   |
|            |``__ibmxl_release__``|1             |release                   |
|            |``__ibmxl_modification__``|6        |modification              |
|            |``__ibmxl_ptf_fix_level__``|1       |fix                       |
|            |``__xlC__``     |1                  |legacy compiler, 0xVVRR, **don't use**|
|HP aCC      |``__HP_aCC``    |12100              |VVRRPP (version,revision,patch)|
