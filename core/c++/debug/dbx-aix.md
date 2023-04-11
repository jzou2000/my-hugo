---
title: Using DBX to Debug
date: 2019-10-11
nav: dbx
tags: [debug, aix, dbx]
---

## A Typical Session

## Tips


```bash
(dbx) help disable
disable <status-number>
disable all
        The traces or stops corresponding to the given numbers
        are disabled. The numbers associated with traces and stops
        can be printed with the "status" command.

```

```bash
(dbx) help display
<address> , <address> / [<mode>] [> <filename>]
<address> / [<count>] [<mode>]   [> <filename>]
<address> / (<expression>) [<mode>] [> <filename>]
<address> = [<mode>] [><filename>]
        Display contents of memory starting at the first
        <address> up to the second <address> or until <count>
        items are printed. If the address is ".", the address
        following the one most recently printed is used. The mode
        specifies how memory is to be printeon AIXd; if it is omitted the
        previous mode specified is used. The initial mode is "X".
        <address> can be of the form &<variable> where <variable>
        is a member variable of the debuggee.
        The following modes are supported:
        i    print the machine instruction
        d    print a short word in decimal
        D    print a long word in decimal
        o    print a short word in octal
        O    print a long word in octal
        x    print a short word in hexadecimal
        X    print a long word in hexadecimal
        b    print a byte in octal
        c    print a byte as a character
        h    print a byte in hexadecimal
        s    print a string (terminated by a null byte)
        f    print a single precision real number
        g    print a double precision real number
        q    print a quad precision real number
        lld  print an 8 byte signed decimal number
        llu  print an 8 byte unsigned decimal number
        llx  print an 8 byte unsigned hexadecimal number
        llo  print an 8 byte unsigned octal number
        Hf   Prints a single precision decimal float number
        Df   Prints a double precision decimal float number
        DDf  Prints a quad precision decimal float number

```

```bash

(dbx) help status
status [> <filename>]
status more [> <filename>]
        Display the currently active trace and stop commands with
        associated dbx subcommands and the remaining thread tskip counts


```

```bash

(dbx) help thread
Debugging application program with threads:
No special option is needed for debugging application program
with threads; however, a full core file is required for
thread related subcommands when debugging a core file.

DBX provides seven commands ("thread", "mutex", "condition",
"rwlock", "spinlock", "barrier", and "attribute") 
for listing thread related objects and attributes.

Users can also reference individual thread related objects
using their DBX names in other normal dbx subcommands. For
example:
        (dbx) whatis $t3
        (dbx) print $t3.state
        (dbx) assign $m2.islock = 1

Other normal dbx subcommands behave as usual, when debugging
application program with threads, but in the context of
the current thread (indicated by ">" in the thread list).
The running thread (indicated by "*" in the thread list) is the 
thread responsible of stopping process.

The running thread defaults to be the dbx current thread,
but users can specify the current thread using the "thread
current <number>" command.

Normal dbx breakpoints are not specific to any one thread.
If any one thread hits a breakpoint, all threads will stop.
However, conditional breakpoints can be used to specify 
breakpoints for any one particular thread by checking the
execution state of the threads.
Two  aliases are given to help the user :
        blth(f,x)       stop at f if ($running_thread == x)
        bfth(f,x)       stopi at &f if ($running_thread == x)

For example:
        (dbx) stop at 42 if ($running_thread == 3)
        (dbx) blth (42,3)
        (dbx) bfth (thread1,3)


Debugging system-scope threads

        dbx provides additional support for debugging system 
        scope threads.Each user thread should have exactly one 
        kernel thread mapped to it. 

        Creating thread-level events

        To set source/instruction level breakpoints for a thread,
        use the tstop/tstopi subcommands. To set a source/instruction 
        level trace for a thread, use the ttrace/ttracei subcommands. 
        To set a thread-level watchpoint stop, use the tstophwp subcommand. 
        To set a thread-level watchpoint trace, use the ttracehwp subcommand. 

        Displaying and manipulating thread-level events

        To view the thread-level events, use the status subcommand. 
        To delete thread-level events, use the delete subcommand.

        Running a thread

        To continue the running thread to the next source line or 
        instruction, use the tnext/tnexti subcommand. To make the 
        running thread execute a source line or machine instruction 
        from the current stopping point, use the tstep/tstepi 
        subcommand. To skip the thread-level breakpoints for the 
        running thread, use the tskip subcommand. 

Thread subcommands:
attribute    - list existing attributes
condition    - list existing condition variables
barrier      - list existing barrier
spinlock     - list existing spinlocks
mutex        - list existing mutexes
thread       - list existing threads
rwlock       - list existing rwlocks
tstophwp     - Sets a thread-level hardware watchpoint stop
ttracehwp    - Sets a thread-level hardware watchpoint trace
tstop        - Sets a source-level breakpoint stop for a thread
tstopi       - Sets an instruction-level breakpoint stop for a thread
ttrace       - Sets a source-level trace for a thread
ttracei      - Sets an instruction-level trace for a thread
tnext        - Runs a thread up to the next source line
tnexti       - Runs a thread up to the next machine instruction
tstep        - Runs a thread one source line
tstepi       - Runs a thread one machine instruction
tskip        - Skips breakpoints for a thread.

```

```bash
(dbx) help which
which <name>
        Print the full qualification of the given <name>.
        Full qualification of a symbol is its name plus names
        of its outer blocks.


```

```bash
(dbx) help catch
catch
catch <signal-number>
catch <signal-name>
        Catch with no arguments prints all signals currently
        being caught. If a signal is specified, dbx
        start trapping the signal before it is sent to
        the program. This is useful when a program being
        debugged has signal handlers. A signal
        may be specified by number or name.
        Signal names are by default case insensitive and the "SIG"
        prefix is optional. By default all signals are caught
        except SIGHUP, SIGCHLD, SIGALRM and SIGKILL.


```

```bash
(dbx) help where
where [ all | [$tthreadumber [(startframe endframe)] ...] ] [ startframe endframe ] [ >File ]
        Print out a stack trace of the active procedures and functions
        associated with the frame numbers startframe to endframe.
        Set $stack_details for verbose stack trace.
        In multi-threaded environment option all displays the stack details for all
        available threads. The stack details of individual threads can be displayed
        by specifying the thread number along with where subcommand. If start and end
        frames for individual threads are not specified, stack frames will be displayed
        as per the global start and end frame numbers.


(dbx) help frame
frame [num]
        Change the current function to the function corresponding
        to the specified stack frame number num. If none is specified
        then print the current function.

```

```bash

(dbx) help source
source <filename>
        Read dbx commands from the given file.

```

```bash

(dbx) help trace
trace [in <procedure>]              [if <condition>]
trace <line-number>                  [if <condition>]
trace <procedure> [in <procedure>]   [if <condition>]
trace <variable>  [in <procedure>]   [if <condition>]
trace <expression> at <line-number>  [if <condition>]
trace on load ["<module>"]           [if <condition>]
trace on load ["<module>(<member>)"] [if <condition>]
        Have tracing information printed when the program is
        executed. A number is associated with the command so
        that tracing can be turned off with the delete command.


```

```bash

(dbx) help whereis
whereis <name>
        Print the full qualification of all symbols whose name
        matches <name>.
```

```bash

(dbx) help addcmd
addcmd <event-number> <"command-string">
addcmd all <"command-string">
        Add dbx subcommands to the given event, which will be
        executed whenever the breakpoint, tracepoint, or watchpoint
        corresponding to the event is hit. The dbx subcommands can
        be specified through the "command-string" parameter, which
        is a group of dbx subcommands separated by the ; (semicolon)
        character. The numbers associated with the events can be
        printed with the "status" command.
```

```bash

(dbx) help run
run [<arguments>] [< <filename>] [> <filename>] 
                    [>> <filename>] [>! <filename>] 
                    [2> <filename>] [2>> <filename>] 
                    [>& <filename>] [>>& <filename>] 
rerun [<arguments>] [< <filename>] [> <filename>] 
                    [>> <filename>] [>! <filename>] 
                    [2> <filename>] [2>> <filename>] 
                    [>& <filename>] [>>& <filename>] 
        Start executing the object file, passing arguments as
        command line arguments; < or > can be used to redirect
        input or output in a shell-like manner. When "rerun"
        is used without any arguments the previous argument list
        is passed to the program; otherwise it is identical to run.

(dbx) help rerun
run [<arguments>] [< <filename>] [> <filename>] 
                    [>> <filename>] [>! <filename>] 
                    [2> <filename>] [2>> <filename>] 
                    [>& <filename>] [>>& <filename>] 
rerun [<arguments>] [< <filename>] [> <filename>] 
                    [>> <filename>] [>! <filename>] 
                    [2> <filename>] [2>> <filename>] 
                    [>& <filename>] [>>& <filename>] 
        Start executing the object file, passing arguments as
        command line arguments; < or > can be used to redirect
        input or output in a shell-like manner. When "rerun"
        is used without any arguments the previous argument list
        is passed to the program; otherwise it is identical to run.

```

```bash
(dbx) help trace
trace [in <procedure>]              [if <condition>]
trace <line-number>                  [if <condition>]
trace <procedure> [in <procedure>]   [if <condition>]
trace <variable>  [in <procedure>]   [if <condition>]
trace <expression> at <line-number>  [if <condition>]
trace on load ["<module>"]           [if <condition>]
trace on load ["<module>(<member>)"] [if <condition>]
        Have tracing information printed when the program is
        executed. A number is associated with the command so
        that tracing can be turned off with the delete command.

```

```bash
(dbx) help stop
stop if <condition> [{<limit>}]
stop at <line-number>               [if <condition>] [{<limit>}]
stop in <procedure>                 [if <condition>] [{<limit>}]
stop <variable>                     [if <condition>] [{<limit>}]
stop <variable> at <line-number>    [if <condition>] [{<limit>}]
stop <variable> in <procedure>      [if <condition>] [{<limit>}]
stop on load ["<module>"]           [if <condition>] [{<limit>}]
stop on load ["<module>(<member>)"] [if <condition>] [{<limit>}]
        Stop execution when the given line is reached,
        procedure or function entered, variable changed,
        module loaded or unloaded, or condition true.
        When <limit> is specified, execution of the debuggee
        is stopped just before the breakpoint executes for the
        <limit> time.

```

```bash
(dbx) help clear
clear <line-number>
        Remove all breakpoints and traces at a given line number.
        See also: delete
(dbx) help delete
delete <status-number>
delete all
delete tskip [ for $t<thread number> ]
        The traces or stops corresponding to the given numbers
        or the remaining tskip count for the specified thread
        are removed. The numbers associated with traces, stops
        and the remaining thread tskip counts can be printed with
        the "status" command.
(dbx) help enable
enable <status-number>
enable all
        The traces or stops corresponding to the given numbers
        are enabled. The numbers associated with traces and stops
        can be printed with the "status" command.



(dbx) help return
return
return <procedure>
        Continue until a return to <procedure> is executed, or
        until the current procedure returns if none is specified.

```







## Sub-commands

### help
```bash
(dbx) help
Commands:
 addcmd       alias        assign       attribute    barrier      call        
 case         catch        clear        cleari       condition    corefile    
 coremap      cont         delcmd       delete       detach       disable     
 display(/)   down         dump         edit         enable       fd          
 file         frame        func         goto         gotoi        handler     
 help         ignore       kthread      limitbp      list         listi       
 malloc       map          move         multproc     mutex        spinlock    
 next         nexti        onceblock    plugin       pluginload   pluginunload
 print        printbp      proc         prompt       pthread      quit        
 registers    rerun        resource     return       run          rwlock      
 screen       search(/?)   set          sh           skip         source      
 status       step         stepi        stop         stophwp      stopi       
 thread       tls          tm_status    tnext        tnexti       trace       
 tracehwp     tracei       tskip        tstep        tstepi       tstop       
 tstophwp     tstopi       ttrace       ttracehwp    ttracei      unalias     
 unset        up           use          whatis       where        whereis     
 which       

Topics:
 startup        execution      breakpoints    files          data          
 machine        environment    threads        corefiles      expressions   
 scope          set_variables  usage         

Type "help <command>" or "help <topic>" for help on a command or topic.
```

## help startup
```bash
(dbx) help startup
DBX Startup Options:

dbx [-a ProcessID] [-B DebugFile] [-c CommandFile] [-I Directory]
[ -E DebugEnvironment ] [-p [OldPath=NewPath:... | File]] [-v]
[-u] [-x] [-F] [-L] [-r] [-C CoreFile | ObjectFile [CoreFile]]

        -a ProcessID        Attach to specified process
        -c CommandFile      Run dbx subcommands in specified file first
        -I Directory        Include Directory in list of directories
                            searched for source files
        -C CoreFile         Allow to analyze core dump without ObjectFile
        -p OldPath=NewPath  Substitute library path for core examination
                            or when attaching to a process
           File             Read library path substitutions for core
                            examination or when attaching to a process
                            from File
        -E DebugEnvironment Specifies the environment variable for the
                            debug program
        -B DebugFile        Specify an alternate debug file on startup
        -v                  Relax core file validity checking
        -u                  Prepend file name symbols with an '@'
        -x                  Strip postfix '_' from FORTRAN symbols
        -F                  Read all symbols at start-up time
        -L                  Keep linkage symbols
        -r                  Run object file immediately

(dbx) help usage
Basic dbx command usage:

run                    - begin execution of the program
print <exp>            - print the value of the expression
where                  - print currently active procedures
stop at <line>         - suspend execution at the line
stop in <proc>         - suspend execution when <proc> is called
cont                   - continue execution
step                   - single step one line
next                   - step to next line (skip over calls)
trace <line#>          - trace execution of the line
trace <proc>           - trace calls to the procedure
trace <var>            - trace changes to the variable
trace <exp> at <line#> - print <exp> when <line> is reached
status                 - print trace/stop's in effect
delete <number>        - remove trace or stop of given number
screen                 - switch dbx to another virtual terminal
call <proc>            - call a procedure in program
whatis <name>          - print the declaration of the name
list <line>, <line>    - list source lines
registers              - display register set
quit                   - exit dbx

```

```bash





(dbx) help files
File subcommands:
use          - set directories to be searched for source file
list         - list lines of current source file
file         - change or display current source file
func         - change or display current function
search(/?)   - search forward or backward in current file for a pattern
edit         - invoke an editor on specifed file or function
move         - change next line to be displayed by list command

```

```bash

(dbx) help corefiles
Debugging corefiles with DBX

        Much of the information available for live processes can also be
        obtained from a corefile. Here are some of the most useful subcommands
        to use with corefiles:

        corefile     - high-level info, including corefile version and flags
        coremap      - displays the mapping of a given address space region
        where        - stack trace (defaults to faulting thread)*
        proc         - traits of the process when it coredumped
        thread       - pthreads data (only available for FULL_CORE)
        kthread      - information about kernel threads
        fd           - file descriptors at the time of the dump
        malloc       - displays information about the program's usage of the malloc subsystem
        map          - shows which modules were loaded at time of dump
        (/) display  - memory display available for some locations
        tls          - display TLS initialization template information

        *The thread command can be used to switch the "current" thread, allowing
        for display of stack traces of the other threads.

        Note: In order to provide the greatest amount of utility, dbx must
        have the executable present with its corefile at the time of
        debugging.

        For more information, please see help on the individual subcommands
        listed above.
```

```bash

(dbx) help expressions
Expressions are specified with a subset of C and Pascal syntax.
A prefix * or a postfix ^ denotes indirection. Use [ ] or
( ) to enclose array subscripts. Use the field reference
operator . (period) with pointers and records.
This makes the C operator "->" unnecessary (although it is
supported).
Types of expressions are checked; the type of an expression
may be overridden by using "type-name(expression)".
When there is no corresponding named type use the special
construct &type-name to represent a pointer to the named type.
"$type-name" and "$$tag-name" can be used to represent a
pointer to a named type or enum, struct or union tag.

The following operators are valid in expressions:

Algebraic    +, -, *, / (float), div (integral), mod, exp
Bitwise      -, |, bitand, xor, ~, <<, >>
Logical      or, and, not, ||, &&
Comparison   <, >, <=, >=, <>, !=, =, ==
Other        sizeof
```

```bash

(dbx) help machine
Machine level subcommands:
display(/)   - display contents of memory
cleari       - remove all stop/trace points at given address
listi        - list instruction from application
stopi        - set a breakpoint at a specified address
tracei       - turn on instruction tracing
stepi        - single step one instruction
nexti        - step to next instruction (skip over calls)
registers    - display register set
gotoi        - change execution to specified address
malloc       - displays information about the program's usage of the malloc subsystem
map          - display address maps and loader information
stophwp      - set a hardware watchpoint stop
tls          - display TLS initialization template information
tracehwp     - set a hardware watchpoint trace
tstopi       - set instruction-level breakpoint for a thread
ttracei      - set a source-level trace for a thread
tnexti       - Runs a thread up to the next machine instruction
tstepi       - Runs a thread one machine instruction
tstophwp     - set a hardware watchpoint trace for a thread
ttracehwp    - Set a hardware watchpoint stop for a thread
(dbx) help scope
When displaying variables and expressions, dbx resolves names
first using the static scope of the current function. The
dynamic scope is used if the name is not defined in the first
scope. If static and dynamic searches do not yield a result
an arbitrary symbol is chosen and dbx prints the message
[using <module.variable>]. The <module.variable> is the name
of an identifier qualified with a block name. Override the name
resolution procedure by qualifying an identifier with a block
name. Source files are treated as modules named by the file name
without the language suffix (such as, the .c suffix on a C
language program)
(dbx) help execution
Execution subcommands:
run          - begin execution of the program
rerun        - begin execution of program with previous arguments
cont         - continue execution
step         - single step one line
next         - step to next line (skip over calls)
return       - continue until a return to specified procedure is reached
skip         - continue execution ignoring next breakpoint
goto         - change execution to specified source line
stepi        - single step one instruction
nexti        - step to next instruction (skip over calls)
gotoi        - change execution to specified address
up           - move current function up the stack
down         - move current function down the stack
frame        - move current function to specified frame in the stack
where        - print currently active procedures
call         - execute a procedure in program
print        - execute a procedure and print return code
catch        - trap the signal before it is sent to program
ignore       - stop trapping the signal before it is sent to program
detach       - exit dbx without terminating program
quit         - exit dbx (program terminated)
tnext        - Runs a thread up to the next source line
tnexti       - Runs a thread up to the next machine instruction
tskip        - skips breakpoints for a thread
tstep        - Runs a thread one source line
tstepi       - Runs a thread one machine instruction
```

```bash

(dbx) help environment
Environment subcommands:
alias        - display and assign aliases for dbx subcommands
unalias      - remove an alias
prompt       - change dbx prompt to specified string
screen       - open virtual terminal for dbx command interaction
case         - change the way in which dbx interprets symbols
help         - display help for specified subcommand or topic
multproc     - enable and disable multiprocess debugging
sh           - pass a command to shell for execution
source       - read dbx commands from a file
set          - change a value to a dbx environment set variable
unset        - delete a dbx environment set variable
use          - set directories to be searched for source file
catch        - trap the signal before it is sent to program
ignore       - stop trapping the signal before it is sent to program

```

```bash

(dbx) help breakpoints
Breakpoint/Trace subcommands:
stop         - set breakpoint in program
trace        - set trace in program
status       - print active breakpoints and traces with associated dbx
               subcommands and remaining tskip counts for threads
addcmd       - add dbx subcommands to given event numbers
delcmd       - delete dbx subcommands from given event number
delete       - remove traces or breakpoints of given numbers
               and remaining thread tskip counts
limitbp      - ignore the breakpoint until it has been hit a
               specified number of times
printbp      - print the number of hits of a breakpoint and the limit if
               any set on the breakpoint
clear        - remove all breakpoints and traces at given line
stopi        - set a breakpoint at a specified address
tracei       - turn on instruction tracing
cleari       - remove all breakpoints and traces at given address
tstop        - set source-level breakpoint for a thread
tstopi       - set instruction-level breakpoint for a thread
ttrace       - set a source-level trace for a thread
ttracei      - set a instruction-level trace for a thread
```

```bash

(dbx) help threads
Debugging application program with threads:
No special option is needed for debugging application program
with threads; however, a full core file is required for
thread related subcommands when debugging a core file.

DBX provides seven commands ("thread", "mutex", "condition",
"rwlock", "spinlock", "barrier", and "attribute") 
for listing thread related objects and attributes.

Users can also reference individual thread related objects
using their DBX names in other normal dbx subcommands. For
example:
        (dbx) whatis $t3
        (dbx) print $t3.state
        (dbx) assign $m2.islock = 1

Other normal dbx subcommands behave as usual, when debugging
application program with threads, but in the context of
the current thread (indicated by ">" in the thread list).
The running thread (indicated by "*" in the thread list) is the 
thread responsible of stopping process.

The running thread defaults to be the dbx current thread,
but users can specify the current thread using the "thread
current <number>" command.

Normal dbx breakpoints are not specific to any one thread.
If any one thread hits a breakpoint, all threads will stop.
However, conditional breakpoints can be used to specify 
breakpoints for any one particular thread by checking the
execution state of the threads.
Two  aliases are given to help the user :
        blth(f,x)       stop at f if ($running_thread == x)
        bfth(f,x)       stopi at &f if ($running_thread == x)

For example:
        (dbx) stop at 42 if ($running_thread == 3)
        (dbx) blth (42,3)
        (dbx) bfth (thread1,3)


Debugging system-scope threads

        dbx provides additional support for debugging system 
        scope threads.Each user thread should have exactly one 
        kernel thread mapped to it. 

        Creating thread-level events

        To set source/instruction level breakpoints for a thread,
        use the tstop/tstopi subcommands. To set a source/instruction 
        level trace for a thread, use the ttrace/ttracei subcommands. 
        To set a thread-level watchpoint stop, use the tstophwp subcommand. 
        To set a thread-level watchpoint trace, use the ttracehwp subcommand. 

        Displaying and manipulating thread-level events

        To view the thread-level events, use the status subcommand. 
        To delete thread-level events, use the delete subcommand.

        Running a thread

        To continue the running thread to the next source line or 
        instruction, use the tnext/tnexti subcommand. To make the 
        running thread execute a source line or machine instruction 
        from the current stopping point, use the tstep/tstepi 
        subcommand. To skip the thread-level breakpoints for the 
        running thread, use the tskip subcommand. 

Thread subcommands:
attribute    - list existing attributes
condition    - list existing condition variables
barrier      - list existing barrier
spinlock     - list existing spinlocks
mutex        - list existing mutexes
thread       - list existing threads
rwlock       - list existing rwlocks
tstophwp     - Sets a thread-level hardware watchpoint stop
ttracehwp    - Sets a thread-level hardware watchpoint trace
tstop        - Sets a source-level breakpoint stop for a thread
tstopi       - Sets an instruction-level breakpoint stop for a thread
ttrace       - Sets a source-level trace for a thread
ttracei      - Sets an instruction-level trace for a thread
tnext        - Runs a thread up to the next source line
tnexti       - Runs a thread up to the next machine instruction
tstep        - Runs a thread one source line
tstepi       - Runs a thread one machine instruction
tskip        - Skips breakpoints for a thread.
(dbx) 

```

## help set_variables
```bash
(dbx) help set_variables
        The following "set" variables have special meanings:

        $catchbp
                When set, dbx catches breakpoints during execution
                of the next command.

        $codepage
                Specifies the code set the characters of the debugee
                are encoded to. The code page is set by typing 'set 
                $codepage = "<value>"'.

        $compact_bt_ident
                Specifies a limit on the number of characters of the identifier name
                to be printed when showing a stack trace.
                To assign a value, type 'set $compact_bt_ident=<value>' where <value>
                is a positive integer between 4 and 128. If 'set $compact_bt_ident' is
                entered, default <value> will be taken as 8.
                Once specified, when printing a stack trace, dbx will print <value>
                number of characters of an identifier and then print three '.' if the
                original identifier's length is three more than <value>.

        $compact_bt_string
                Specifies a limit on the number of characters of a function argument
                that is a string is to be printed when showing a stack trace.
                To assign a value type 'set $compact_bt_string=<value>' where <value>
                is a positive integer between 4 and 128. If 'set $compact_bt_string' is
                entered, default <value> will be taken as 8.
                Once specified, when printing a stack trace, dbx will print <value>
                number of characters of a function argument string and then print three
                '.' if the original string's length is three more than <value>.

        $display_address_name
                Instructs dbx to try to display the variable/function
                names when examining memory addresses.
                For information on examining addresses refer
                "display" functionality.

        $frame
                Setting this variable to an address alters dbx's
                idea of the current stack frame.

        $expandunions
                Causes dbx to display values of each part of variant
                records or unions.

        $hexin $octin
                When set, dbx interprets addresses in hexadecimal or octal.

        $hexchars $hexints $hexstrings
                When set, dbx prints characters, integers or
                character pointers in hexadecimal.

        $noargs
                When set, dbx omits arguments from subcommands, such
                as where, up, down, and dump.

        $noflregs
                When set, dbx omits the display of floating-point
                registers from the registers subcommand.

        $novregs
                When set, dbx omits the display of vector
                registers from the registers subcommand.

        $novsregs
                When set, dbx omits the display of vector
                scalar registers from the registers subcommand.

        $octints
                When set, dbx prints integers in octal.

        $ignoreifhandler
                When set, dbx suppresses notification of signals which
                have a registered handler.

        $ignoreload
                When set, dbx ignores load(), unload(), or loadbind()
                subroutines performed by your program.

        $ignorenonbptrap
                When set, dbx suppresses notification of non-breakpoint
                trap instructions that trigger when a SIGTRAP handler is
                registered.

        $instructionset
                Specifies the default disassembly mode. To change the
                value, the user should type 'set $instructionset = "<value>"'.
                If the $instructionset variable is unset, it will behave
                as if the value was "default". The following are the valid
                values for $instructionset:
                "default" -  Disassemble using the instruction set for the
                             hardware architecture dbx is running on.
                "com"     -  Disassemble using the instruction set that is
                             common between Power and PowerPC architectures.
                             The mnemonics will default to PowerPC mnemonics.
                "pwr"     -  Disassemble using the instruction set for the
                             RS1 implementation of the Power architecture.
                             The mnemonics will default to Power mnemonics.
                "pwrx"    -  Disassemble using the instruction set for the
                             RS2 implementation of Power architecture. The
                             mnemonics will default to Power mnemonics.
                "pwr6"    -  Disassemble using the instruction set for the
                             POWER6 implementation of PowerPC architecture. The
                             mnemonics will default to PowerPC mnemonics.
                "pwr7"     - Disassemble using the instruction set for the
                             Power 7 implementation of PowerPC architecture. The
                             mnemonics will default to PowerPC mnemonics.
                "pwr8"     - Disassemble using the instruction set for the
                             Power 8 implementation of PowerPC architecture. The
                             mnemonics will default to PowerPC mnemonics.
                "ppc"     -  Disassemble using the instruction set for the
                             PowerPC architecture. The mnemonics will
                             default to PowerPC mnemonics.
                "601"     -  Disassemble using the instruction set for the
                             601 implementation of PowerPC architecture. The
                             mnemonics will default to PowerPC mnemonics.
                "603"     -  Disassemble using the instruction set for the
                             603 implementation of PowerPC architecture. The
                             mnemonics will default to PowerPC mnemonics.
                "604"     -  Disassemble using the instruction set for the
                             604 implementation of PowerPC architecture. The
                             mnemonics will default to PowerPC mnemonics.
                "970"     -  Disassemble using the instruction set for the
                             970 implementation of PowerPC architecture. The
                             mnemonics will default to PowerPC mnemonics.
                "any"     -  Disassemble using any valid instruction from
                             either Power or PowerPC architecture. The
                             mnemonics will default to PowerPC mnemonics

        $java
                When set, also sets the following variables, placing dbx in
                a mode to debug Java applications.  When unset, also unsets
                the following variables:
                $ignorenonbptrap
                        Suppresses notification of trap instructions
                        generated by the Java Just-In-Time (JIT) compiler.

        $listwindow
                Specifies the number of lines to list and listi commands.

        $mapaddrs
                When set, dbx starts address mapping, useful for kernel
                debugging.

        $mapformat
                Specifies the default output format for the map subcommand.  To
                change the value, the user should type
                'set $mapformat = "<value>"'.  If the $mapformat variable is
                unset, it will behave as if the value was "normal".  The
                following are the valid values for $mapformat:
                "abbr"     - Map output will consist of a single line
                             containing the entry number, module name, and
                             member name.
                "normal"   - Map output will consist of the entry number,
                             module name, member name, text origin, text
                             length, data origin, data length, and file 
                             descriptor. If the module has TLS data, then
                             TLS data origin and TLS data length will also be
                             for the specified thread or the current thread,
                             if no thread has been specified.
                "raw"      - Map output will consist of a single unformatted
                             line containing the following space-separated 
                             fields: entry number, module name with optional 
                             member name, text origin, text end, text length,
                             data origin, data end, data length, and file 
                             descriptor. If the module has TLS data, then TLS 
                             data origin, TLS data end and the TLS data length
                             will be displayed for the specified thread or the 
                             current thread, if no thread has been specified.
                "verbose"  - Map output will consist of the entry number,
                             module name, member name, text origin, text end,
                             text length, data origin, data end, data length,
                             and file descriptor. If the module has TLS data, 
                             then TLS data origin, TLS data end and the TLS data
                             length will be displayed for the specified thread
                             or the current thread, if no thread has been specified.

        $menuwindow
                Specifies the number of lines to list when prompting users
                for choices.

        $mnemonics
                Specifies the set of mnemonics used for disassembly.
                To change the value, the user should type 'set $mnemonics
                = "<value>"'. If the $mnemonics variable is unset, it will
                behave as if the value was "default". The following are the
                valid values for $mnemonics:
                "default" - Disassemble using the mnemonics which most
                            closely match the specified instruction set.
                "pwr"     - Disassemble using the mnemonics for the Power
                            architecture.
                "ppc"     - Disassemble using the mnemonics for the PowerPC
                            architecture.

        $print_dynamic
                When set, prints the dynamic type of an object in C++. Code has to be 
                compiled with -qrtti option for the RTTI data to be present.

        $print_fullname
                When set, dbx prints the fully-qualified identifier, even in
                cases where there is no apparent ambiguity.

        $print_mangled
                When debugging C++ code, setting this variable causes dbx
                to print mangled identifiers.

        $repeat
                When set, dbx repeats the previous command if no command
                was entered.

        $sigblock
                When set, dbx blocks signals to your program.

        $showbases
                When set, dbx displays base classes of C++ class types.

        $showblocks
                When set, dbx prints unnamed blocks in location output.

        $show_vft
                When set, prints Virtual Function table present in C++ objects, if available.

        $stepignore
                Specifies the behavior of the "step\tstep" subcommand on a
                source line calling another routine with no debugging information.
                To change the value, the user should type 'set $stepignore
                = "<value>"'. If the $stepignore variable is unset, it will
                behave as if the value was "function". The following are the
                valid values for $stepignore:
                "function" - dbx will behave as if subcommand "next\tnext"
                             was issued.
                "module"   - if function is in load module with no debug
                             information (such as a system library), dbx
                             will behave as if subcommand "next\tnext" was issued.
                "none"     - dbx will "stepi\tstepi" until it reaches an
                             instruction with source information.

        $unsafecall $unsafeassign $unsafegoto $unsafebounds
                Turn off type checking for calls, assignments,
                goto and array bounds checking.

        $vardim
                Specifies the dimension length to use when printing arrays
                with unknown bounds

        $deferevents
                Turns on the deferred events feature.

        $stack_details
                Displays the frame number and the register set for each
                active function/procedure displayed by the "where" subcommand.

        $trace_good_transaction
                Instructs dbx to display the message
                "Process {PID} may have performed a transaction
                $texasr, $tfiar and $tfhar are valid and may be inspected",
                every time a TM Transaction is completed successfully.
                This variable is disabled by default and therefore

```
