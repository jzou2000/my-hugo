---
title: getopts
nav: getopts
---

Template to get command-line options

```bash
function usage
{
    cat << EOF
usage:    ...
EOF
    exit 1
}

function fallback
{
    # default variable values
    : ${_wks:=$HOME}
}

OPTIND=1
while getopts "h?yw:i:v:" opt; do
    case "$opt" in
    h|\?)   usage;;
    y)      DRY=echo;;
    w)      _wks=$OPTARG;;
    i)      _agent=$OPTARG;;
    v)      _v=$OPTARG;;
    esac
done
shift $((OPTIND-1))
fallback

# do actual work

```