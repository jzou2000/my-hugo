---
title: Setup Ollama
---

Assume ollama is going to run at the host ```kiwi.local```.

## Run the Official Installer

```sh
curl -fsSL https://ollama.com/install.sh | sh
```

This script downloads the binary, sets up an isolated system user named ollama, and creates a background systemd service.

## Open Network Bindings

By default, Ollama only listens to requests coming from its own loopback interface (```localhost```).
To let your laptop, mobile phone, and the Open WebUI Docker container talk to it, configure it to listen to your entire local network:

```sh
sudo systemctl edit ollama.service
```

An editor will open. Paste the following block right into the empty section:

```toml
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
Environment="OLLAMA_ORIGINS=*"
```

>Note:
>
>If you are opening up `OLLAMA_HOST=0.0.0.0` so that **ComfyUI** or web-based UIs (like Open WebUI) running on other machines or inside Docker containers can talk to your Ollama instance, you will almost certainly run into **CORS (Cross-Origin Resource Sharing) blocks** without setting `OLLAMA_ORIGINS`.
>
>By default, Ollama restricts requests to local origins. If a web browser tries to pass a request from a different IP address or port, Ollama will reject it for security reasons.

Save and close the editor.
Tell systemd to read your new configuration and restart the engine:

```sh
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

>### How to Test It
>
>From your local desktop (or whichever machine is running ComfyUI), open a terminal and try to ping the Ollama API using `curl`. Replace `server-ip` with the CachyOS machine's IP address:
>
>```bash
>curl http://<server-ip>:11434/api/tags
>```
>
>If it returns a JSON list of your downloaded models (even if it's just empty `{"models":[]}`), your network binding, host, and origin settings are 100% correct and working!

## Common Commands

Command ```ollama``` is used to launch ollama service,
it can also be used as a client to communicate with the service or LLM server.

>It is quite common to pull some baseline models right after installation.

* Run a model.

  ```sh
  ollama qwen2.5:7b
  ```

  If the specified model does not exist locally, download it from the repository.
  You can send requests to the LLM, and LLM will response.
  Use ```/bye``` to finish the conversation.

* List downloaded models

  ```sh
  ollama list
  ```

* Remove a downloaded model to release disk space

  ```sh
  ollama rm llama3
  ```

* Download a model, but do not run it.

  ```sh
  ollama pull qwen2.5-coder:14b
  ollama pull deepseek-r1:14b
  ```

* Check models that are running, and VRAM they are using

  ```sh
  ollama ps
  ```
