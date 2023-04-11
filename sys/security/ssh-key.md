---
title: Generating SSH Keys and Copy Public Keys
date: 2019-05-27
nav: ssh keys
tags: [ssh, shell, secured, key]
---


## Host/user alias
Edit $HOME/.ssh/config
````sh
cat $HOME/.ssh/config
host my_alias  # this is the alias name
    hostname some.host.remote  # real host name
    user john # optional, otherwise use john@my_alias
````

## Create ssh-key

````sh
ssh-keygen
````
ssh-keygen generates a pair of RSA key (private id_rsa and public id_rsa.pub) at $HOME/.ssh

## Copy the public key file to remote host (john@host.remote)
````sh
ssh-copy-id -i ~/.ssh/id_rsa.pub john@host.remote
````
The command add an entry in ~/.ssh/authorized_keys on the remote host. After the public key is added, you can ssh login without password.
````sh
ssh john@host.remote
````

## Remove a host from known_hosts

If a host identification is changed (in public networks, it is a warning of man-in-the-middle) in a trusted/internal network because

* a virtual machine is rebuilt
* the host is upgraded
* the host is re-configured

ssh refuses to connect with follow message

````sh
jzou@debian9:~$ ssh b2so86
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the RSA key sent by the remote host is
SHA256:jmt8vSqOWaC6/tuhlsTl4CYq9U2x7j2VymMbKxLbKRE.
Please contact your system administrator.
Add correct host key in /home/jzou/.ssh/known_hosts to get rid of this message.
Offending RSA key in /home/jzou/.ssh/known_hosts:3
  remove with:
  ssh-keygen -f "/home/jzou/.ssh/known_hosts" -R 192.168.223.101
RSA host key for 192.168.223.101 has changed and you have requested strict checking.
Host key verification failed.
````

To remove the specified host from the file ``~/.ssh/known_hosts``, you can either delete the line 3 (according to above message known_hosts:3),
or even better use the suggested command

````sh
jzou@debian9:~$ ssh-keygen -R 192.168.223.101
# Host 192.168.223.101 found: line 3
/mnt/huge/jzou/.ssh/known_hosts updated.
Original contents retained as /home/jzou/.ssh/known_hosts.old
````
Both IP address or host name are accepted, depends on how it is configured
in the file ``~/.ssh/config``
