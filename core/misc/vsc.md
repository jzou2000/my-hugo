---
title: Visual Studio Code
nav: vsc
date: 2020-05-16
---

## Common Extensions


|Class|Extension|Author|Description|
|----|----|----|----|
|Debug|C/C++|Microsoft|language support including IntelliSense and debugging|
| |Generic Remote Debugger|Marcel J. Kloubert|makes it easy to debug code on a remote host by using a generic way.|
| |Native Debug|WebFreek|supports both gdb and lldb.|
| |GDB Debug|DamianKoper||
| |Bash Debug|rogalmic|A bash debugger GUI frontend based on awesome bashdb scripts (bashdb now included in package).|
| |Duktape Debugger|HarlodBrenes|a Duktape debug client for Visual Studio Code, probably abandoned?|
| |Local Lua Debugger|Tom Blind|A simple Lua debugger which requires no additional dependencies.|
|Vue|Vetur|Pine Wu|Vue tooling for VS Code|
|lang|Docker|Microsoft|Adds syntax highlighting, commands, hover tips, and linting for Dockerfile and docker-compose files.|
| |YAML|Red Hat|YAML Language Support by Red Hat, with built-in Kubernetes and Kedge syntax support|
| |HTML CSS Support|ecmel|Missing CSS support for HTML documents|
| |Auto Close Tag|Jun Han|Automatically add HTML/XML close tag, same as Visual Studio IDE or Sublime Text (high cpu load?)|


## Useful Tips

### find/open a file quickly

> **Ctrl-P** and start typing file name, vsc will show you candiates.
This is extremely useful to choose a special file when you know (even part of) file name
from a large project, for example when you build a large project and
the compiler shows an error in a file from thousands files.

## Build Inside VSC

1. goto ``Terminal|Configure Tasks...``
2. choose ``C/C++:cpp build active file``, which creates a file ``${workspace}/.vscode/task.json``
   ```json
   {
	"version": "2.0.0",
	"tasks": [
		{
			"type": "shell",
			"label": "C/C++: cpp build active file",
			"command": "/usr/bin/cpp",
			"args": [
				"-g",
				"${file}",
				"-o",
				"${fileDirname}/${fileBasenameNoExtension}"
			],
			"options": {
				"cwd": "/usr/bin"
			},
			"problemMatcher": [
				"$gcc"
			],
			"group": "build"
		}
	]
   }
   ```
3. modify the task file
   * change the label
   * change the command to execute
   * change invoking arguments
   * change options including ``cwd`` and ``env`` if expect environment variables
   ```json
   {
	"version": "2.0.0",
	"tasks": [
		{
			"type": "shell",
			"label": "make myplay",
			"command": "make",
			"args": [
				"-f",
				"Makefile"
			],
			"options": {
				"cwd": "${workspaceDir}/myplay",
				"env": {
					"CFG": "release"
				}
			},
			"problemMatcher": [
				"$gcc"
			],
			"group": "build"
		}
	]
   }
   ```


