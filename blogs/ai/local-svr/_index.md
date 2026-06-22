---
title: Setup Local Servers
---

如何让linux或mac机在局域网内通过名字而不是ip地址访问

在局域网内，通过设备名称（主机名）而不是频繁变动的 IP 地址来互相访问，是一个非常实用的需求。

要实现这个功能，目前最标准、最优雅的做法是使用 mDNS（多播 DNS）协议。它也被称为 Zero-configuration networking (Zeroconf)。使用 mDNS 之后，你只需要在设备名后面加上 .local 后缀，就可以直接访问。例如：你可以直接在终端里输入 ssh user@linux-server.local 或者在浏览器里输入 http://macbook.local:3000。

以下是为 Linux 和 Mac 配置 mDNS 的具体方法：

检查与配置 macOS Mac 系统原生自带苹果的 Bonjour 服务（即 mDNS 的实现），通常不需要安装任何额外软件，默认就已经支持通过名字访问。
第一步：查看或修改 Mac 的主机名 打开 “系统设置” (System Settings) -> “通用” (General) -> “关于” (About)。

在最上方可以看到你的电脑名称（例如 MyMacBook）。

滚动到最底部，点击 “共享” (Sharing)，在页面最下方你会看到类似这样的提示：“局域网上的电脑可以通过以下地址访问您的电脑：MyMacBook.local”。

如果名称里有空格或中文，建议点击“编辑”把它改成纯英文和连字符（如 my-macbook），这样它的局域网访问地址就会变成 my-macbook.local。

配置 Linux 机 (Ubuntu / Debian / CentOS 等) 现代 Linux 系统通常使用 Avahi 服务来实现 mDNS 功能。
第一步：安装 Avahi 服务 在大多数现代 Linux 发行版中，Avahi 默认已经安装并运行。如果没有，可以通过以下命令安装：

Ubuntu / Debian 系：

Bash sudo apt update sudo apt install avahi-daemon CentOS / RHEL / Fedora 系：

Bash sudo dnf install avahi 第二步：启动并设置开机自启 安装完成后，确保服务处于运行状态：

Bash sudo systemctl start avahi-daemon sudo systemctl enable avahi-daemon 第三步：设置你的 Linux 主机名 确保你的 Linux 主机名（Hostname）是你想要的那个名字：

Bash

查看当前主机名
hostnamectl

修改主机名为你想要的名字（例如改成 ollama-server）
sudo hostnamectl set-hostname ollama-server 修改完成后，重启一下 Avahi 服务使其生效：

Bash sudo systemctl restart avahi-daemon 现在，这台 Linux 机器在局域网内的名字就变成了 ollama-server.local。

如何互相访问？ 当两边的服务都配置好，且都在同一个路由器（同一个局域网/Wi-Fi）下时，你可以直接丢掉 IP 地址了：
从 Mac 访问 Linux： 打开 Mac 的终端，直接 ping 或者 SSH 连接 Linux：

Bash ping ollama-server.local ssh username@ollama-server.local (如果你之前在 Linux 上配好了 Ollama 的局域网访问，现在在 Mac 的浏览器里直接输入 http://ollama-server.local:11434 就能直接连通！)

从 Linux 访问 Mac： 在 Linux 的终端里，同样可以直接呼叫 Mac：

Bash ping my-macbook.local 🛠️ 故障排查（如果连不上怎么办？） 务必带上 .local 后缀： 局域网广播依赖这个后缀。直接 ping ollama-server 可能会失败，必须是 ping ollama-server.local。

检查 Linux 防火墙： mDNS 使用的是 UDP 端口 5353。如果 Linux 启用了防火墙，需要放行该端口：

使用 UFW (Ubuntu): sudo ufw allow 5353/udp

使用 firewalld (CentOS): sudo firewall-cmd –zone=public –add-port=5353/udp –permanent && sudo firewall-cmd –reload

AP 隔离（Access Point Isolation）： 如果使用的是公司 Wi-Fi 或某些家用路由器的“访客网络”，路由器可能会开启“AP 隔离”功能，禁止无线设备之间互相通信。需要进入路由器后台关闭该功能。

如何在手机上访问ollama

要在手机上访问电脑上运行的 Ollama，通常有两种最流行的方式：

方式一：通过手机浏览器或专用 App 访问（最推荐，体验最好）。这类似于你在手机上使用 ChatGPT App，界面美观、支持历史记录。

方式二：直接在手机终端里连接（适合极客）。在手机命令行里直接与大模型对话。

在开始之前，请确保你的手机和运行 Ollama 的电脑连接在同一个 Wi-Fi（局域网）下。

准备工作：获取电脑的局域网访问地址 由于我们在前面的步骤中已经配置了 OLLAMA_HOST=0.0.0.0 和 mDNS 域名，你的电脑在局域网内已经有了一个固定的“名字”。

如果你的电脑是 Mac，名字通常是：http://你的电脑名.local:11434

如果你的电脑是 Linux，名字通常是：http://ollama-server.local:11434

如果你的电脑是 Windows（或者 mDNS 无法解析），请使用电脑的局域网 IP 地址，形如：http://192.168.1.X:11434

💡 测试是否连通：在手机浏览器中输入上面这个地址（例如 http://192.168.1.50:11434）。如果手机屏幕上显示 “Ollama is running”，说明手机已经成功连接到电脑的 Ollama 服务！

核心方法：使用手机端 AI 客户端连接 现在你可以选择以下任意一款手机端软件，将上述地址填入即可使用。

选项 A：使用 Chatbox Mobile（iOS / Android 都有，最简单） Chatbox 是一款非常优秀的跨平台 AI 客户端，完全免费且支持中文。

在手机应用商店下载 Chatbox（或者访问其官网下载安装包）。

打开 Chatbox，点击设置（齿轮图标）。

在 “AI 模型提供方 (Provider)” 中选择 Ollama。

在 “API 地址 (Host)” 中，填入你电脑的访问地址。例如：

http://192.168.1.50:11434 或者 http://ollama-server.local:11434

点击保存后，软件会自动拉取你电脑里的模型列表。在模型下拉菜单中选择一个（如 qwen2.5），就可以开始在手机上畅快对话了。

选项 B：使用 Enchanted（iOS / Mac 专属，界面极美） 如果你使用的是 iPhone 或 iPad，Enchanted 是专门为 Ollama 打造的开源客户端，支持触觉反馈、小组件和 Apple Watch。

在 iPhone App Store 搜索并下载 Enchanted。

首次打开时，软件会要求输入 Ollama URL。

同样填入你的电脑局域网地址（如 http://192.168.1.50:11434）。

连接成功后，它会无缝同步电脑上的大模型，甚至能直接在手机上调用支持多模态的视界模型（如 llava）来分析手机相册里的图片。

选项 C：直接用手机浏览器访问（免安装） 如果你在电脑上配置了 Open WebUI（参考前面的教程，假设运行在 3000 端口）：

打开手机自带的 Safari 或 Chrome 浏览器。

输入电脑的 Web UI 地址，例如 http://192.168.1.50:3000 或 http://ollama-server.local:3000。

登录你之前创建的账号，你就能在手机上获得完整的、媲美 ChatGPT 网页版的完美体验。

小技巧：在手机浏览器中点击“分享/菜单”按钮，选择 “添加到主屏幕”，它就会变成一个网页 App，以后在手机桌面上点开即用。

🛠️ 手机连接失败的常见原因 如果手机显示无法连接，请依次检查以下三点：

Wi-Fi 隔离（AP 隔离）：部分公共场所、公司或高端路由器的“访客 Wi-Fi”会开启此功能，它会切断手机与电脑之间的通信。请确保连接的是普通的家用主 Wi-Fi。

电脑防火墙拦截：Windows 的高级安全防火墙或 Linux 的 UFW 可能会拦截传入的 11434 端口。你可以尝试临时关闭电脑防火墙，或在防火墙中为 11434 端口添加一条“允许入站”的规则。

环境变量未生效：确保在电脑上修改完 OLLAMA_HOST=0.0.0.0 后，彻底重启了 Ollama 软件。如果它依然在监听 127.0.0.1，手机是绝对连不上的。

这些客户端可以像chatgpt或Gemini 那样语音输入输出，上下载图像视频吗

可以，但需要区分“客户端软件的功能”和“你下载的本地模型的能力”。


* what's proper hardware
  * my macbook?
  * desktop? cpu/mem, video/vram
* model spec?
  * 7b, 72b, 700b
  * purpose:
    * general
    * natrual language parsing
    * coding
    * image/video
* llm (e.g. deepseek) vs image/video generator (e.g. veo an seedance)
