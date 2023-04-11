---
title: socket - lower-level networking interface
nav: socket
---

## Server Sample

ex-svr-socket.py

```python

import socket
import sys

host, port = 'localhost', 9999

svr_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

svr_addr = (host, port)
svr_sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
svr_sock.bind(svr_addr)
svr_sock.listen(1)

connection, remote_addr = svr_sock.accept()
# remote_addr == connection.getpeername()
print('accept connection from: {}'.format(remote_addr))

# this sample server accepts only one connection
svr_sock.close()

# echo data
try:
    while True:
        data = connection.recv(16)
        print('received: {}'.format(data))
        if data:
            print('sending data back to the client')
            connection.sendall(data)
        else:
            break            
finally:
    connection.close()

```

<a name='ex_sender'>

</a>

## Client

ex-sender.py

```python

from __future__ import print_function
import socket
import time
import sys
import exlib as x


log = print
sock = None

def send(dat):
    x.dump(dat, 'send: ({})'.format(len(dat)))
    if sock:
        sock.send(dat)


try:
    port = int(sys.argv[1])
except:
    port = 0

if port:
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect(('localhost', port))

while True:
    s = x.get_input("input: ")
    if len(s) == 0 or 'exit' == s:
        break
    log('your input: len={} [{}]'.format(len(s), s))
    if x.is_py2:
        s = s.encode('utf8')
        log('in bytes: ({})'.format(len(s)))
    x.dump(s)

    # send data in two chunks (if more than 4 bytes)
    # so we can observer how data are processed
    send(s[:4])
    if len(s) > 4:
        time.sleep(1)
        send(s[4:])

if sock:
    sock.close()

```

## utils

exlib.py

```py
from __future__ import print_function
import traceback as tb
import sys


is_py2 = sys.version_info[0] == 2


def get_input(prompt=None):
    s = raw_input(prompt) if is_py2 else input(prompt)
    # line-input can't get \n, so we use escape
    return s.replace(r'\n', '\n')


def dump(s, title=None):
    """
    dump s (str or bytes) in format of memory dump:
       
       ab cd .. ef - ab ... ef

    """
    if title:
        print(title)
    try:
        if type(s) == str:
            l = [ord(_) for _ in s]
        elif type(s) == bytes:              # py3
            l = [_ for _ in s]
        else:
            l = list(s)
    except Exception as e:
        print('dump(s), type={}'.format(type(s)))
        print(tb.format_exc())
        return
    n = 0
    for i in l:
        print('{}{:02x}'.format('' if n == 0 else ' - ' if n == 8 else ' ', i), end='')
        n += 1
        if n == 16:
            n = 0
            print()
    if n > 0:
        print()

```
