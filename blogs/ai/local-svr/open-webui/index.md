---
title: Open WebUI Setup
---


## Install the NVIDIA Container Toolkit

Even though Open WebUI doesn't run the models itself, it often utilizes minor GPU acceleration for vector embedding processing or multi-modal image management if you pass images to it.

To enable GPU passthrough to Docker, run this on the LLM host:

```sh
# 1. Download the repository GPG key
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg

# 2. Add the production repository to your sources
curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
  sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
  sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

# 3. Install the toolkit
sudo apt-get update && sudo apt-get install -y nvidia-container-toolkit

# 4. Configure the Docker daemon runtime and restart
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
```

## Run the Open WebUI Container using mDNS

Assume the LLM host is ```kiwi.local```

```sh
docker run -d -p 3000:8080 \
  --gpus all \
  -e OLLAMA_BASE_URL="http://kiwi.local:11434" \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

What this does under the hood:

* ```--gpus all```: Hands over the GPU (e.g. RTX 5070) hooks to the container.
* ```-p 3000:8080```: Maps the interface to port ```3000``` on your machine.
* ```-e OLLAMA_BASE_URL="http://kiwi.local:11434"```: Explicitly tells Open WebUI to ignore its own internal container network and route all backend prompts across your home network directly into the native Ollama port using the Avahi address ```http://kiwi.local:11434```.
* ```-v open-webui:/app/backend/data```: Keeps your chat histories, custom system prompts, and custom user profiles preserved on the machine even if you upgrade the container image later.The persistent volume is ```open-webui```.

Once the container finishes downloading and starting up, you can grab your mobile phone or laptop, type ```http://kiwi.local:3000``` into your browser, and you'll be hitting your beautiful new local private dashboard!

### Alternatiely, if Open WebUI & Ollama are on the SAME machine

```sh
docker run -d -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

What this does under the hood:

* ```--add-host=host.docker.internal:host-gateway```: This is the secret sauce. It allows the containerized Open WebUI to talk "outward" to your bare-metal system where Ollama is listening on port ```11434```.

## Q


