---
title: asyncore + asynchat
nav:  asyncore + asynchat
---

## Simple Server

```python
from __future__ import print_function
import asyncore
import asynchat
import socket
import sys
import traceback as tb
import exlib as x


log = print


class Server(asyncore.dispatcher):
    """Receives connections and establishes handlers for each client.
    """

    def __init__(self, address):
        asyncore.dispatcher.__init__(self)
        self.create_socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.bind(address)
        self.address = self.socket.getsockname()
        self.listen(1)
        log('listening...{}'.format(self.address))

    def handle_accept(self):
        # Called when a client connects to our socket
        client_info = self.accept()
        Handler(sock=client_info[0])
        # We only want to deal with one client at a time,
        # so close as soon as we set up the handler.
        # Normally you would not do this and the server
        # would run forever or until it received instructions
        # to stop.
        self.handle_close()

    def handle_close(self):
        self.close()
        log('server closed')


class Handler(asynchat.async_chat):
    """Handles echoing messages from a single client.
    """

    # Artificially reduce buffer sizes to illustrate
    # sending and receiving partial messages.
    ac_in_buffer_size = 8
    ac_out_buffer_size = 8

    def __init__(self, sock):
        log('accept: {}'.format(sock.getpeername()))
        self.received_chunks = []
        asynchat.async_chat.__init__(self, sock)
        self.set_terminator(b'\n')                     # byte, not string

    def collect_incoming_data(self, data):
        """
        Read an incoming message from the client and put it into our outgoing queue.
        """
        x.dump(data, '    incoming: {} ({} bytes)'.format(type(data), len(data)))
        log()
        self.received_chunks.append(data)

    def found_terminator(self):
        """
        Terminator is found in incoming stream, but terminator itself is not put into the incoming queue.
        """
        log('====found_terminator')
        data = b''.join(self.received_chunks)
        x.dump(data, 'total data: {} (len={})'.format(type(data), len(data)))
        if not x.is_py2:
            data = data.decode('utf8')
        log('str: [{}]\n'.format(data))
        self.received_chunks = []


if __name__ == '__main__':
    try:
        port = int(sys.argv[1])
    except:
        port = 9900
    try:
        svr = Server(('', port))
        asyncore.loop()
    except Exception as e:
        print(tb.format_exc())
```

Here are result of run, using [ex-sender.py](../socket/#ex_sender)

ex-sender.py
```sh
jasonz@VANLWIN0056:/mnt/c/codex/py$ python ex-sender.py 9900
input: 12汉字345abcdefghij\nABCD123456789\n
your input: len=36 [12汉字345abcdefghij
ABCD123456789
]
31 32 e6 b1 89 e5 ad 97 - 33 34 35 61 62 63 64 65
66 67 68 69 6a 0a 41 42 - 43 44 31 32 33 34 35 36
37 38 39 0a
send: (4)
31 32 e6 b1
send: (32)
89 e5 ad 97 33 34 35 61 - 62 63 64 65 66 67 68 69
6a 0a 41 42 43 44 31 32 - 33 34 35 36 37 38 39 0a
input:
jasonz@VANLWIN0056:/mnt/c/codex/py$
```

ex-svr-simple.py in python2
```sh
jasonz@VANLWIN0056:/mnt/c/codex/py$ python ex-svr-simple.py
listening...('0.0.0.0', 9900)
accept: ('127.0.0.1', 59842)
server closed
    incoming: <type 'str'> (4 bytes) 18:18:28
31 32 e6 b1

    incoming: <type 'str'> (8 bytes) 18:18:29
89 e5 ad 97 33 34 35 61

    incoming: <type 'str'> (8 bytes) 18:18:29
62 63 64 65 66 67 68 69

    incoming: <type 'str'> (1 bytes) 18:18:29
6a

====found_terminator 18:18:29
total data: <type 'str'> (len=21)
31 32 e6 b1 89 e5 ad 97 - 33 34 35 61 62 63 64 65
66 67 68 69 6a
str: [12汉字345abcdefghij]

    incoming: <type 'str'> (6 bytes) 18:18:29
41 42 43 44 31 32

    incoming: <type 'str'> (7 bytes) 18:18:29
33 34 35 36 37 38 39

====found_terminator 18:18:29
total data: <type 'str'> (len=13)
41 42 43 44 31 32 33 34 - 35 36 37 38 39
str: [ABCD123456789]

jasonz@VANLWIN0056:/mnt/c/codex/py$
```

server on python3
```sh
jasonz@VANLWIN0056:/mnt/c/codex/py$ python3 ex-svr-simple.py
listening...('0.0.0.0', 9900)
accept: ('127.0.0.1', 59838)
server closed
    incoming: <class 'bytes'> (4 bytes) 18:10:02
31 32 e6 b1

    incoming: <class 'bytes'> (8 bytes) 18:10:03
89 e5 ad 97 33 34 35 61

    incoming: <class 'bytes'> (8 bytes) 18:10:03
62 63 64 65 66 67 68 69

    incoming: <class 'bytes'> (1 bytes) 18:10:03
6a

====found_terminator 18:10:03
total data: <class 'bytes'> (len=21)
31 32 e6 b1 89 e5 ad 97 - 33 34 35 61 62 63 64 65
66 67 68 69 6a
str: [12汉字345abcdefghij]

    incoming: <class 'bytes'> (6 bytes) 18:10:03
41 42 43 44 31 32

    incoming: <class 'bytes'> (7 bytes) 18:10:03
33 34 35 36 37 38 39

====found_terminator 18:10:03
total data: <class 'bytes'> (len=13)
41 42 43 44 31 32 33 34 - 35 36 37 38 39
str: [ABCD123456789]

jasonz@VANLWIN0056:/mnt/c/codex/py$
```

Note:
* data are received in chunks, which is decided by data size or buffer size
* chunk may also break at terminator, so terminator is never in chunks
* socket send/recv data by bytes (not characters)
  * unicode char may be broken into two chunks
  * python3 need to decode bytes to string

## Simple Client

