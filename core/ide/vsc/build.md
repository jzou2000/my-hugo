---
title: build inside vsc
date: 2020-05-16
---

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


