---
title: Hardwares
---

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

### How to Test It

From your local desktop (or whichever machine is running ComfyUI), open a terminal and try to ping the Ollama API using `curl`. Replace `server-ip` with the CachyOS machine's IP address:

```bash
curl http://<server-ip>:11434/api/tags

```

If it returns a JSON list of your downloaded models (even if it's just empty `{"models":[]}`), your network binding, host, and origin settings are 100% correct and working!