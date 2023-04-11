---
title: Playing Javascript with VisualStudio Code
date: 2019-10-08
weight: 1
description: Setting and debugging for Javascript with Visual Studio Code.
nav: play with vsc
tags: [vsc, settings, js, javascript]
---

## Project Configuration
1. SC-P open action menu, type ```javascript``` and choose "Go to project configuration"
1. Create/Edit ``jsconfig.json`` at the workspace root ``${workspaceFolder}/jsconfig.json``
   by defaut it looks like
   ```json
   {
    "compilerOptions": {
        "module": "commonjs",
        "target": "es2016",
        "jsx": "preserve"
    },
    "exclude": [
        "node_modules",
        "**/node_modules/*"
    ]
   }
   ```

## Debugging
1. Click ``Debug`` icon in #Activity Bar# to activate the Debug view
1. Click gear icon at the top of the Debug view to create/modify ``launch.json``,
   which locates at ``${workspaceFolder}/.vscode``.
   Here is a new created file:
   ```json
   {
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/index.js"
        }
     ]
   }
   ```
1. Modify attribute ``program`` to the script that is going to be run/debug
1. optionally modify attribute ``name`` to identify the launch task (especially there are multiple tasks)
1. optionally add more attributes, the most common attribute is ``args`` for command-line arguemnts.
   When ``"`` is typed, vsc is smart to prompt supported attributes, here is a sample list
   ```json
      "args": [],
      "cwd": "${workspaceFolder}",
      "env": {},
      "envFile": "${workspaceFolder}/.env",
      "stopOnEntry": true,
   ```
   see full list at [VSC|USER GUIDE|Debugging](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations)

By clicking the float button ``Add Configuration...`` at right-buttom of the launch.json edit view, you can add more tasks.

There are other type of tasks, here are some examples:
```json
    "configurations": [
        {
            "type": "node",
            "request": "attach",
            "name": "Attach by Process ID",
            "processId": "${command:PickProcess}"
        },
        {
            "type": "node",
            "request": "attach",
            "name": "Attach",
            "port": 9229
        },
        {
            "type": "node",
            "request": "launch",
            "name": "nodemon",
            "runtimeExecutable": "nodemon",
            "program": "${workspaceFolder}/app.js",
            "restart": true,
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen"
        },
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/app.js"
        }
    ]
```

Except for the ``program`` property, you need to change ``name`` to identify each task.



## Common Debug Commands

* ``<F9>`` toggle break point at the cursor line
* ``<F10>/<F11>/S-<F11>`` step over/in/out
* ``<F5>/S-<F5>`` continue/stop