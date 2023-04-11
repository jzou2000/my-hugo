---
title: VisualStudio Property Sheets
nav: vs props
---

## Using Property Sheets

## Common Macros

## Conditions

|Condition|Example                    |Description|
|---------|---------------------------|--------------------|
|``'stringA' == 'stringB'``|``Condition="'$(CONFIG)'=='DEBUG'"``|single quotes are required for empty values or values with spaces|
|``'stringA != 'stringB'``|||
|``<, >, <=, >=``||evaluates the numeric values of the operands|
|``Exists('stringA')``|``Condition="!Exists('$(builtdir)')"``|if a file/folder with the name ``stringA`` exists|
|``HasTrailingSlash('stringA')``|``Condition="!HasTrailingSlash('$(OutputPath)')"``||
|``!``|   |boolean operator Not|
|``And``|   |boolean operator And|
|``Or``|   |boolean operator Or|
|``()``|   |boolean operator group|
|``$if$ (%expression%),$else$,$endif$``||see details|



Note:

* [MSBuild conditions](https://docs.microsoft.com/en-us/visualstudio/msbuild/msbuild-conditions?view=vs-2019)

## Conditional Constructs

```xml
<Project xmlns="http://schemas.microsoft.com/developer/msbuild/2003" >
    <PropertyGroup>
        <Configuration Condition=" '$(Configuration)' == '' ">Debug</Configuration>
        <OutputType>Exe</OutputType>
        <RootNamespace>ConsoleApplication1</RootNamespace>
        <AssemblyName>ConsoleApplication1</AssemblyName>
        <WarningLevel>4</WarningLevel>
    </PropertyGroup>
    <Choose>
        <When Condition=" '$(Configuration)'=='Debug' ">
            <PropertyGroup>
                <DebugSymbols>true</DebugSymbols>
                <DebugType>full</DebugType>
                <Optimize>false</Optimize>
                <OutputPath>.\bin\Debug\</OutputPath>
                <DefineConstants>DEBUG;TRACE</DefineConstants>
            </PropertyGroup>
            <ItemGroup>
                <Compile Include="UnitTesting\*.cs" />
                <Reference Include="NUnit.dll" />
            </ItemGroup>
        </When>
        <When Condition=" '$(Configuration)'=='retail' ">
            <PropertyGroup>
                <DebugSymbols>false</DebugSymbols>
                <Optimize>true</Optimize>
                <OutputPath>.\bin\Release\</OutputPath>
                <DefineConstants>TRACE</DefineConstants>
            </PropertyGroup>
        </When>
    </Choose>
    <!-- Rest of Project -->
</Project>
```


### Choose

```xml
<Choose>
    <When Condition="'StringA'=='StringB'">... </When>
    <Otherwise>... </Otherwise>
</Choose>
```

Reference:

* [MSBuild project file schema reference](https://docs.microsoft.com/en-us/visualstudio/msbuild/msbuild-project-file-schema-reference?view=vs-2019)


