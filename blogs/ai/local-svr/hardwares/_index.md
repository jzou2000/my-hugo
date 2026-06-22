---
title: Hardwares
---

Followings are my machines

* kiwi: a linux desktop - intel i7, 32gb mem, rtx 5070 video card, running cachyos
* cherry: a laptop, thinkpad p53s, running ubuntu 26.04
* lemon: a laptop, thinkpad p15v, running mint linux
* jmac: a laptop, macbook pro 2019 13inch

Here's my plan

* kiwi
  * my son's gaming box at night, I can use it when it's idle in day time
  * ollama, LLM qwen/llama/deepthink, general LLM service, light development for hugo static site and embedded projects, claude/codex/antigravity as tools
  * LLM accessed from local network devices, e.g. cherry, lemon, jmac, mobiles
  * use as local alternative for chatgpt/gemini
  * access from ollama on cherry/lemon/jmac
  * access from mobiles using open webui
  * comfyui for image/video generating, client from any local network devices
* cherry/lemon/jmac
  * hugo ssg
  * vscode/gemini-ide/codex

Please give instructions to perform following tasks, on cachyos/ubuntu/mint unless
specified explicitly

* change hostname
* install/config avahi for mDNS
* install ssh and tmux
* config firewall to allow mdns, ssh, ollama, comfyui, etc
* chinese language package
  * how to set locale
  * chinese input/keyboard
* add user aiuser
  * able to install packages, config network, start/stop services
  * able to config/manage docker, ollama, comfyui on kiwi
* install docker on kiwi
  * nvidia container toolkit
  * how to change storage location to avoid run out of "default" volumn
* install ollama on kiwi
  * allow to access from local network, including mobiles
  * allow to access from web browser directly, e.g. static page
  * keep alive for 2 hours
  * convenient commands to start/stop LLM via ssh/tmux
  * enabled by firewall
  * methods to access by vscode/claud/codex/antigravity
* install open webui on kiwi
  * enabled by firewall
  * client/browser from local network devices, including mobiles
* install comfyui on kiwi
  * install to /opt or /usr/local to enable other users to use
  * python and venv
  * install module manager
  * enabled by firewall
  * convenient commands to start/stop



I plan to run ollama/LLM in a separate linux box - my son's game box with rtx 5070 gpu, which is idle when he's working in day time.
I do some light development on my hugo static site and embedded personal projects, which involve codex and/or antigravity agents. For daily reference, I'd like to access LLM through mobile devices, like I'm using chatgpt or gemini now.


TBD
Ah, great catch! You are thinking ahead.

If you are opening up `OLLAMA_HOST=0.0.0.0` so that **ComfyUI** or web-based UIs (like Open WebUI) running on other machines or inside Docker containers can talk to your Ollama instance, you will almost certainly run into **CORS (Cross-Origin Resource Sharing) blocks** without setting `OLLAMA_ORIGINS`.

By default, Ollama restricts requests to local origins. If a web browser tries to pass a request from a different IP address or port, Ollama will reject it for security reasons.

Here is how to add it alongside your host configuration.

---

### Step 1: Re-edit the Service File

Open your systemd override file back up:

```bash
sudo systemctl edit ollama.service

```

### Step 2: Add `OLLAMA_ORIGINS`

Under your `[Service]` block, add the origins environment variable.

* **The "Allow Everything" approach (Easiest/Most Common for Home Labs):**
If this is a secure local home network and you just want everything to connect without hassle, use a wildcard `*`:
```ini
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
Environment="OLLAMA_ORIGINS=*"

```


* **The Explicit approach (More Secure):**
If you only want to allow specific origins (like your ComfyUI server IP and port), list them separated by commas:
```ini
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
Environment="OLLAMA_ORIGINS=http://127.0.0.1:8188,http://11.22.33.44:8188,vscode-webview://"

```


*(Note: Include `vscode-webview://` if you ever plan on using AI coding extensions in VS Code to talk to this backend).*

---

### Step 3: Apply the Changes

Save and exit the editor, then run the reload commands again:

```bash
# Reload systemd
sudo systemctl daemon-reload

# Restart Ollama
sudo systemctl restart ollama

```

