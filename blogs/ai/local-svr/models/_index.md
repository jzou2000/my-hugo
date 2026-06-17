---
title: LLM
---


# 怎么使用ollama

使用 Ollama 非常简单。它就像是本地大模型的“应用商店 + 运行环境”，让你用几行命令就能在自己的电脑上把大模型跑起来。

下面为你梳理最核心的安装和使用步骤：

## 1. 安装 Ollama
下载： 访问 Ollama 官方网站，根据你的操作系统（Mac、Windows 或 Linux）下载对应的安装包。

安装：

* Windows / Mac：像安装普通软件一样直接双击运行安装程序即可。
* Linux：在终端运行一行命令：
  ```sh
  curl -fsSL https://ollama.com/install.sh | sh
  ```
  安装完成后，Ollama 会在后台自动运行。

## 2. 运行你的第一个大模型

Ollama 安装好后，本身是不带模型的。你需要告诉它你想运行哪一个。

打开你的<strong>终端（Terminal）</strong>或 <strong>PowerShell</strong>，运行以下命令（以经典且轻量化的 `llama3` 为例）：

```bash
ollama run llama3
```

第一次运行时发生了什么？

Ollama 发现本地没有 llama3，会自动开始从云端下载（Manifest -> Layers）。

下载完成后，它会把模型加载到你的内存/显存中。

终端会出现一个 >>> 的提示符，这时你就可以直接输入中文和它对话了！

想退出对话时，输入 /bye 然后回车即可。

## 3. 常用命令速查

在终端中，你可以通过以下几个最常用的命令来管理你的本地模型：

查看本地已下载的模型：

```sh
ollama list
```

* **删除某个模型（释放硬盘空间）：**
```bash
ollama rm <模型名称>
```

仅下载模型，不立刻启动对话：
```sh
ollama pull <模型名称>
```

* **查看当前正在运行的模型（以及它占用了多少显存）：**
```bash
  ollama ps
```

## 4. 推荐几款好用的模型
根据你电脑的配置（主要是显存或内存大小），可以选择不同的模型。一般来说：

8GB 内存/显存： 适合运行 7B 或 8B（70-80亿参数）左右的模型。

16GB 以上： 可以流畅运行 14B 到 32B 的模型。

模型名称	运行命令	特点简介
Llama 3.1 (8B)	ollama run llama3.1	Meta 开源的标杆，综合能力极强，支持超长文本。
Qwen 2.5 (7B / 14B)	ollama run qwen2.5	阿里开源的通义千问，中文能力和代码能力极其出色，强烈推荐。
DeepSeek-R1 (7B / 14B)	ollama run deepseek-r1	专注于推理、逻辑和深度思考的模型，会把思考过程（思维链）展示出来。
Phi 3 (3.8B)	ollama run phi3	微软出的超轻量模型，对配置要求极低，速度飞快。
5. 进阶玩法：搭配网页 UI 或开发工具
天天在黑乎乎的终端里敲字可能不够直观，Ollama 真正的强大之处在于它在后台开放了一个 API 接口（默认是 http://localhost:11434）。你可以非常轻松地把它接入到其他软件中：

Chatbox / Open WebUI： 安装这些前端软件，就能获得像 ChatGPT/Gemini 一样美观的网页对话界面。

编程助手（Cursor / VS Code）： 可以在 Continue 或 Cline 等插件中把 Provider 设为 Ollama，让本地模型帮你写代码，完全不用担心代码泄露。

代码调用： 如果你写 Python，直接用 pip install ollama 就能在代码里本地调用大模型了。

想了解如何把 Ollama 接入到 Web 界面或者 Cursor/VS Code 中使用吗？

Yes

如何为 Ollama 配置图形化 Web UI 界面，或者将它接入到代码编辑器中作为 AI 编程助手？

把 Ollama 接入图形化界面或者代码编辑器，能彻底释放本地大模型的潜力。这里为你整理了目前主流、好用的配置方案。

方案一：配置网页图形化界面（Open WebUI）
Open WebUI 是目前社区公认最完美的 Ollama 前端界面，像素级克隆了 ChatGPT 的体验，支持联网搜索、文档分析（RAG）和多模型对比。

最推荐也是最稳妥的安装方式是通过 Docker（一行命令搞定，且方便后续更新）：

Bash
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
参数小贴士：

--add-host=host.docker.internal:host-gateway：这行非常关键，它能让 Docker 容器里的 Open WebUI 顺利访问到你电脑本地（Host）运行的 Ollama。

-v open-webui:...：用于持久化保存你的聊天记录，防止容器重启后数据丢失。

安装完成后，在浏览器打开 http://localhost:3000，注册一个本地账号（第一个注册的自动成为管理员，所有数据都保存在本地），就能在左上角看到 Ollama 里的所有本地模型了。

不想折腾 Docker？
你可以直接去 Open WebUI 的 GitHub 页面下载他们最新推出的 Desktop 桌面客户端，像安装普通软件一样双击安装即可。

方案二：接入代码编辑器作为 AI 编程助手
本地代码辅助最推荐两个模型：qwen2.5-coder:7b（目前综合代码能力最强的轻量模型）或 deepseek-r1:7b（适合复杂逻辑推理）。记得先在终端运行 ollama pull qwen2.5-coder:7b 下载好。

1. 接入 Cursor 编辑器
Cursor 支持将标准的 OpenAI API 接口指向本地。

打开 Cursor，点击右上角的 Gear（齿轮/设置） 图标。

进入 Models 标签页。

展开 OpenAI 配置项：

将 Base URL 修改为 Ollama 的本地兼容接口：http://localhost:11434/v1

API Key 随便填输入一串字符即可（例如 ollama），因为本地不需要鉴权，但输入框不能为空。

在下方的模型列表中，点击 "Add Model"，手动输入你在 Ollama 中下载的模型名称（必须完全一致，例如 qwen2.5-coder:7b）。

开启你刚添加的模型，并关闭其他云端模型。现在你就可以在侧边栏（Ctrl/Cmd + L）或行内代码生成（Ctrl/Cmd + K）中完全免费、离线地使用本地 AI 了。

2. 接入 VS Code（推荐使用 Continue 插件）
VS Code 原生不支持直接改 API 基础路径，但可以通过神级开源插件 Continue 实现完美的本地代码补全（Tab 键）和聊天体验。

1
安装扩展
1 分钟
在 VS Code 插件市场搜索 "Continue" 并点击安装。安装后侧边栏会出现一个“右箭头”形状的图标。

2
打开配置文件
30 秒
点击 Continue 侧边栏底部的 齿轮（Settings） 图标，它会自动打开一个名为 config.json（或 config.yaml）的配置文件。

3
修改模型配置
2 分钟
将配置文件中的 models 或者是 tabAutocompleteModel 部分修改为 Ollama 供应源。你可以直接参考并替换为如下配置：

JSON
{
  "models": [
    {
      "title": "Qwen2.5 Coder 7B",
      "provider": "ollama",
      "model": "qwen2.5-coder:7b"
    }
  ],
  "tabAutocompleteModel": {
    "title": "Qwen2.5 Coder 1.5B",
    "provider": "ollama",
    "model": "qwen2.5-coder:1.5b"
  }
}
4
重载并测试
30 秒
保存配置文件。在 Continue 聊天面板底部的模型下拉菜单中选择你刚配好的模型。写代码时，本地模型就会自动开始接管你的 Tab 键代码补全。


💡 专家提示：关于代码补全的配置策略
在代码编辑器中，对话/重构（Chat） 和 实时单行补全（Autocomplete） 最好分开。

对话栏： 建议用 7B 甚至更强的模型（如 qwen2.5-coder:7b），它理解复杂需求的能力更好。

实时补全： 极力推荐额外下载一个超轻量模型（如 ollama pull qwen2.5-coder:1.5b）专门用于 Tab 补全。1.5B 模型体积小、响应时间在毫秒级，写代码时不会有明显的卡顿等待感。

想要进一步优化你的本地开发环境吗？

如何让局域网内的其他设备也能访问我的本地 Ollama？

本地大模型运行太慢？教你如何优化显存和上下文

如何修改 Ollama 的环境变量（如 OLLAMA_HOST），让局域网内其他电脑或手机也能连接我的本地模型？

默认情况下，Ollama 为了安全起见，只监听本地回环地址 127.0.0.1，这意味着只有你当前这台电脑自己能访问它。

要让局域网内的手机、平板或其他电脑也能连接，你需要将环境变量 OLLAMA_HOST 修改为 0.0.0.0（代表监听这台设备的所有网络接口）。不同操作系统的配置方式有所不同，请根据你的系统选择以下操作：

1. Windows 系统配置步骤
Windows 上的 Ollama 默认作为后台托盘应用运行，它会继承系统的用户环境变量。

彻底退出 Ollama： 在右下角任务栏托盘中找到 Ollama 的小图标，右键 -> Quit Ollama。

打开环境变量设置： * 按下 Win + R 键打开运行窗口，输入 sysdm.cpl 并回车。

在弹出的“系统属性”窗口中，切换到 “高级” (Advanced) 选项卡，点击底部的 “环境变量” (Environment Variables)。

添加新变量： * 在“用户变量”或“系统变量”区域，点击 “新建” (New)。

变量名 (Variable name): OLLAMA_HOST

变量值 (Variable value): 0.0.0.0

(可选) 如果希望支持跨域请求（例如某些网页前端直接连接），建议同步新建一个变量：

变量名: OLLAMA_ORIGINS

变量值: *

保存并重启： 一路点击“确定”保存设置。重新在开始菜单中启动 Ollama。

2. macOS 系统配置步骤
如果你的 Mac 是通过下载的官方安装包（.app）运行的，不能直接在 .zshrc 里改，而需要通过 macOS 的 launchctl 管理后台服务。

退出 Ollama 应用： 点击顶部菜单栏的 Ollama 图标，选择 Quit Ollama。

设置环境变量： 打开终端（Terminal），运行以下命令：

Bash
launchctl setenv OLLAMA_HOST "0.0.0.0"
launchctl setenv OLLAMA_ORIGINS "*"
重启应用： 重新打开 Ollama 应用程序。

小提示： 通过 launchctl 设置的变量在 Mac 重启后会失效。如果想一劳永逸，可以在终端中执行 export OLLAMA_HOST=0.0.0.0，然后直接在终端中通过命令行 ollama serve 来启动服务。

3. Linux 系统配置步骤
Linux 上的 Ollama 通常是以 systemd 服务形式在后台运行的。

编辑服务配置： 在终端运行以下命令（它会用默认编辑器打开一个配置文件）：

Bash
sudo systemctl edit ollama.service
插入环境变量： 在打开的文件中，找到或手动添加 [Service] 代码块，在其中加入环境变量定义：

Ini, TOML
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
Environment="OLLAMA_ORIGINS=*"
注意：如果文件中已有 ### Lines below this comment... 字样，务必将内容写在该注释行之上。

重载并重启服务： 保存并退出编辑器后，运行以下命令使配置生效：

Bash
sudo systemctl daemon-reload
sudo systemctl restart ollama
4. 如何在其他设备上连接？
配置完成后，服务主机就已经对整个局域网广播了。

第一步：获取主机的局域网 IP 地址
在运行 Ollama 的电脑上查看本地 IP：

Windows (PowerShell/CMD): 输入 ipconfig，找到无线网卡或以太网卡下的 IPv4 地址（通常形如 192.168.x.x 或 10.x.x.x）。

Mac/Linux (终端): 输入 ifconfig 或 ip route 查看。

第二步：在其他设备上配置连接
在局域网内的手机、iPad 或另一台电脑的客户端（如 Chatbox、NextChat、Open WebUI 等）中：

将 API 地址/Host 地址由原来的 http://localhost:11434 修改为：
http://<你主机的局域网IP>:11434
(例如：http://192.168.1.50:11434)

现在，你就可以用其他设备愉快地白嫖主机的显卡算力了！

⚠️ 安全提醒：
将 OLLAMA_HOST 改为 0.0.0.0 意味着任何接入你当前路由器/局域网的人（包括蹭网的人）都可以无限制地调用你电脑上的大模型，这会消耗你的显存和电力。请务必确保你所处的网络环境（如家里或信任的办公网）是安全的。

如何让linux或mac机在局域网内通过名字而不是ip地址访问

在局域网内，通过设备名称（主机名）而不是频繁变动的 IP 地址来互相访问，是一个非常实用的需求。

要实现这个功能，目前最标准、最优雅的做法是使用 mDNS（多播 DNS）协议。它也被称为 Zero-configuration networking (Zeroconf)。使用 mDNS 之后，你只需要在设备名后面加上 .local 后缀，就可以直接访问。例如：你可以直接在终端里输入 ssh user@linux-server.local 或者在浏览器里输入 http://macbook.local:3000。

以下是为 Linux 和 Mac 配置 mDNS 的具体方法：

1. 检查与配置 macOS
Mac 系统原生自带苹果的 Bonjour 服务（即 mDNS 的实现），通常不需要安装任何额外软件，默认就已经支持通过名字访问。

第一步：查看或修改 Mac 的主机名
打开 “系统设置” (System Settings) -> “通用” (General) -> “关于” (About)。

在最上方可以看到你的电脑名称（例如 MyMacBook）。

滚动到最底部，点击 “共享” (Sharing)，在页面最下方你会看到类似这样的提示：“局域网上的电脑可以通过以下地址访问您的电脑：MyMacBook.local”。

如果名称里有空格或中文，建议点击“编辑”把它改成纯英文和连字符（如 my-macbook），这样它的局域网访问地址就会变成 my-macbook.local。

2. 配置 Linux 机 (Ubuntu / Debian / CentOS 等)
现代 Linux 系统通常使用 Avahi 服务来实现 mDNS 功能。

第一步：安装 Avahi 服务
在大多数现代 Linux 发行版中，Avahi 默认已经安装并运行。如果没有，可以通过以下命令安装：

Ubuntu / Debian 系：

Bash
sudo apt update
sudo apt install avahi-daemon
CentOS / RHEL / Fedora 系：

Bash
sudo dnf install avahi
第二步：启动并设置开机自启
安装完成后，确保服务处于运行状态：

Bash
sudo systemctl start avahi-daemon
sudo systemctl enable avahi-daemon
第三步：设置你的 Linux 主机名
确保你的 Linux 主机名（Hostname）是你想要的那个名字：

Bash
# 查看当前主机名
hostnamectl

# 修改主机名为你想要的名字（例如改成 ollama-server）
sudo hostnamectl set-hostname ollama-server
修改完成后，重启一下 Avahi 服务使其生效：

Bash
sudo systemctl restart avahi-daemon
现在，这台 Linux 机器在局域网内的名字就变成了 ollama-server.local。

3. 如何互相访问？
当两边的服务都配置好，且都在同一个路由器（同一个局域网/Wi-Fi）下时，你可以直接丢掉 IP 地址了：

从 Mac 访问 Linux：
打开 Mac 的终端，直接 ping 或者 SSH 连接 Linux：

Bash
ping ollama-server.local
ssh username@ollama-server.local
(如果你之前在 Linux 上配好了 Ollama 的局域网访问，现在在 Mac 的浏览器里直接输入 http://ollama-server.local:11434 就能直接连通！)

从 Linux 访问 Mac：
在 Linux 的终端里，同样可以直接呼叫 Mac：

Bash
ping my-macbook.local
🛠️ 故障排查（如果连不上怎么办？）
务必带上 .local 后缀： 局域网广播依赖这个后缀。直接 ping ollama-server 可能会失败，必须是 ping ollama-server.local。

检查 Linux 防火墙： mDNS 使用的是 UDP 端口 5353。如果 Linux 启用了防火墙，需要放行该端口：

使用 UFW (Ubuntu): sudo ufw allow 5353/udp

使用 firewalld (CentOS): sudo firewall-cmd --zone=public --add-port=5353/udp --permanent && sudo firewall-cmd --reload

AP 隔离（Access Point Isolation）： 如果使用的是公司 Wi-Fi 或某些家用路由器的“访客网络”，路由器可能会开启“AP 隔离”功能，禁止无线设备之间互相通信。需要进入路由器后台关闭该功能。

如何在手机上访问ollama

要在手机上访问电脑上运行的 Ollama，通常有两种最流行的方式：

方式一：通过手机浏览器或专用 App 访问（最推荐，体验最好）。这类似于你在手机上使用 ChatGPT App，界面美观、支持历史记录。

方式二：直接在手机终端里连接（适合极客）。在手机命令行里直接与大模型对话。

在开始之前，请确保你的手机和运行 Ollama 的电脑连接在同一个 Wi-Fi（局域网）下。

准备工作：获取电脑的局域网访问地址
由于我们在前面的步骤中已经配置了 OLLAMA_HOST=0.0.0.0 和 mDNS 域名，你的电脑在局域网内已经有了一个固定的“名字”。

如果你的电脑是 Mac，名字通常是：http://你的电脑名.local:11434

如果你的电脑是 Linux，名字通常是：http://ollama-server.local:11434

如果你的电脑是 Windows（或者 mDNS 无法解析），请使用电脑的局域网 IP 地址，形如：http://192.168.1.X:11434

💡 测试是否连通：在手机浏览器中输入上面这个地址（例如 http://192.168.1.50:11434）。如果手机屏幕上显示 "Ollama is running"，说明手机已经成功连接到电脑的 Ollama 服务！

核心方法：使用手机端 AI 客户端连接
现在你可以选择以下任意一款手机端软件，将上述地址填入即可使用。

选项 A：使用 Chatbox Mobile（iOS / Android 都有，最简单）
Chatbox 是一款非常优秀的跨平台 AI 客户端，完全免费且支持中文。

在手机应用商店下载 Chatbox（或者访问其官网下载安装包）。

打开 Chatbox，点击设置（齿轮图标）。

在 "AI 模型提供方 (Provider)" 中选择 Ollama。

在 "API 地址 (Host)" 中，填入你电脑的访问地址。例如：

http://192.168.1.50:11434 或者 http://ollama-server.local:11434

点击保存后，软件会自动拉取你电脑里的模型列表。在模型下拉菜单中选择一个（如 qwen2.5），就可以开始在手机上畅快对话了。

选项 B：使用 Enchanted（iOS / Mac 专属，界面极美）
如果你使用的是 iPhone 或 iPad，Enchanted 是专门为 Ollama 打造的开源客户端，支持触觉反馈、小组件和 Apple Watch。

在 iPhone App Store 搜索并下载 Enchanted。

首次打开时，软件会要求输入 Ollama URL。

同样填入你的电脑局域网地址（如 http://192.168.1.50:11434）。

连接成功后，它会无缝同步电脑上的大模型，甚至能直接在手机上调用支持多模态的视界模型（如 llava）来分析手机相册里的图片。

选项 C：直接用手机浏览器访问（免安装）
如果你在电脑上配置了 Open WebUI（参考前面的教程，假设运行在 3000 端口）：

打开手机自带的 Safari 或 Chrome 浏览器。

输入电脑的 Web UI 地址，例如 http://192.168.1.50:3000 或 http://ollama-server.local:3000。

登录你之前创建的账号，你就能在手机上获得完整的、媲美 ChatGPT 网页版的完美体验。

小技巧：在手机浏览器中点击“分享/菜单”按钮，选择 “添加到主屏幕”，它就会变成一个网页 App，以后在手机桌面上点开即用。

🛠️ 手机连接失败的常见原因
如果手机显示无法连接，请依次检查以下三点：

Wi-Fi 隔离（AP 隔离）：部分公共场所、公司或高端路由器的“访客 Wi-Fi”会开启此功能，它会切断手机与电脑之间的通信。请确保连接的是普通的家用主 Wi-Fi。

电脑防火墙拦截：Windows 的高级安全防火墙或 Linux 的 UFW 可能会拦截传入的 11434 端口。你可以尝试临时关闭电脑防火墙，或在防火墙中为 11434 端口添加一条“允许入站”的规则。

环境变量未生效：确保在电脑上修改完 OLLAMA_HOST=0.0.0.0 后，彻底重启了 Ollama 软件。如果它依然在监听 127.0.0.1，手机是绝对连不上的。

这些客户端可以像chatgpt或Gemini 那样语音输入输出，上下载图像视频吗

可以，但需要区分“客户端软件的功能”和“你下载的本地模型的能力”。

虽然这些客户端（如 Chatbox、Enchanted、Open WebUI）在界面和按钮设计上极力模仿 ChatGPT 或 Gemini，提供了语音按钮、上传夹子等功能，但实际体验和原生的云端服务有两点本质区别：

1. 图像与视频的上传/下载
🖼️ 上传图像（完全可以）
客户端都支持拖拽或拍照上传图片。但前提是，你必须在 Ollama 中运行“多模态视觉模型”。

不能用： 比如经典的 qwen2.5、llama3.1、deepseek-r1，它们是纯文本模型。如果你传了图片，客户端会报错，或者模型会直接忽略图片。

必须用： 你需要让 Ollama 下载并运行类似 llava、minicpm-v、qwen2-vl 等带有 -vl 或 Multimodal 标签的视觉模型。

效果： 运行视觉模型后，你把图片发过去，手机或电脑上的客户端就能像 ChatGPT 一样，准确识别出图里有什么、帮你做 OCR 文字提取、或者分析图表。

🎬 上传/下载视频（目前非常受限）
下载（生成视频）： 本地 Ollama 目前主要专注于语言和视觉理解，不支持像 Sora 那样直接生成并让你下载视频。

上传（分析视频）： 大多数轻量化本地视觉模型无法像 Gemini 1.5 Pro 那样直接吞下几十分钟的原始视频。不过，Ollama 社区目前支持了类似 minicpm-o2.6:8b 这种全模态（Omni）模型，它在部分高级客户端（如 Open WebUI）中可以通过“连续截取视频帧”的方式来变相分析短视频，但对电脑的显存和算力要求极高。

2. 语音输入与输出（语音对话）
这些客户端普遍支持语音，但它们的实现逻辑是“三步走”的分离方案，而不是像 Gemini Live 或 ChatGPT Advanced Voice 那样端到端的原生音频流交互。

功能	客户端如何实现	体验差异
语音输入 (STT)	客户端调用手机/电脑自带的输入法语音转文字，或者在后台内置了 OpenAI 的 Whisper 模型（把你的语音录下来，转成文字发给 Ollama）。	无法像 Gemini Live 那样随时打断、无法识别你的语气或呼吸声。它只是帮你省去了打字的功夫。
语音输出 (TTS)	本地大模型先吐出文本，客户端再调用系统自带的语音引擎（如 iOS 的 Siri 嗓音、Windows 的微软 TTS）把文本读出来。	声音听起来会相对偏机械、死板，缺乏 ChatGPT/Gemini 那种带有人类情感、叹气、笑声的自然抑扬顿挫。
🏆 体验排行榜
如果你想获得最接近 ChatGPT/Gemini 的音视频和多模态体验，推荐按照以下客户端和模型进行组合：

第一名：Open WebUI

体验： 它的功能最全。在“设置”中可以接入免费的语音插件，支持网页端、手机端直接进行语音通话，且能完美处理文档和图片的上传。

第二名：Enchanted (iOS/Mac)

体验： 苹果生态体验极佳，完美原生适配了 iOS 的语音听写。配合电脑上的 llava 模型，可以直接在 iPhone 上拍照发给本地大模型去分析。

第三名：Chatbox

体验： 界面最简单。上传图片很方便，语音方面主要依赖点击麦克风录音后再转文字转发，属于比较传统的“对讲机”式交互。

💡 总结建议：
如果你想尝试“看图说话”，请立刻在你的电脑终端运行 ollama run llava 开启新世界；如果你想玩语音，优先用手机浏览器登录你搭建好的 Open WebUI。

有没有一种方案不需要任何客户端app,只用标准浏览器就可访问ollama

完全可以。 如果你不想在手机或电脑上安装任何客户端 App，也不想折腾 Docker 部署复杂的 Web UI 后端，目前有两类纯粹依赖标准浏览器的“无 App”解决方案。

方案一：使用“单文件 HTML 网页”（真正零安装、100%本地）
在开源社区中，有一些极致精简的、纯前端的 Web 界面（如 html-ollama-simple-gui）。它们本身只是一个普通的 .html 文件，完全不需要任何后端服务支持。

你可以自己新建一个文件，或直接将下面的精简版代码保存为电脑上的一个网页：

在电脑上新建一个文本文件，将其重命名为 ollama.html。

用记事本打开它，将以下完整的标准 HTML5/JS 代码复制进去并保存：

HTML
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>极简本地 Ollama 客户端</title>
    <style>
        body { font-family: -apple-system, sans-serif; background: #f5f5f7; margin: 0; padding: 20px; display: flex; flex-direction: column; height: 90vh; }
        #chat-container { flex: 1; overflow-y: auto; background: white; border-radius: 12px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-bottom: 20px; }
        .message { margin: 10px 0; padding: 10px 14px; border-radius: 8px; max-width: 80%; word-break: break-all; white-space: pre-wrap; }
        .user { background: #007aff; color: white; align-self: flex-end; margin-left: auto; }
        .ai { background: #e9e9eb; color: black; }
        #input-area { display: flex; gap: 10px; }
        input, select { padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px; }
        input[type="text"] { flex: 1; }
        button { padding: 12px 24px; background: #007aff; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; }
        button:disabled { background: #ccc; }
        .config-panel { display: flex; gap: 10px; margin-bottom: 15px; }
    </style>
</head>
<body>

<div class="config-panel">
    <input type="text" id="api-host" value="http://localhost:11434" placeholder="Ollama 地址">
    <select id="model-select"><option value="">正在获取模型列表...</option></select>
</div>

<div id="chat-container"></div>

<div id="input-area">
    <input type="text" id="user-input" placeholder="输入消息..." onkeydown="if(event.key==='Enter') sendMessage()">
    <button id="send-btn" onclick="sendMessage()">发送</button>
</div>

<script>
    const hostInput = document.getElementById('api-host');
    const modelSelect = document.getElementById('model-select');
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // 自动加载模型列表
    async function loadModels() {
        try {
            const res = await fetch(`${hostInput.value}/api/tags`);
            const data = await res.json();
            modelSelect.innerHTML = data.models.map(m => `<option value="${m.name}">${m.name}</option>`).join('');
        } catch (e) {
            modelSelect.innerHTML = '<option value="">无法连接到 Ollama，请检查地址</option>';
        }
    }

    // 初始化加载
    loadModels();
    hostInput.addEventListener('blur', loadModels);

    let context = [];

    // 发送消息核心逻辑
    async function sendMessage() {
        const text = userInput.value.trim();
        const model = modelSelect.value;
        if (!text || !model) return;

        appendMessage(text, 'user');
        userInput.value = '';
        sendBtn.disabled = true;

        const aiDiv = appendMessage('...', 'ai');

        try {
            const response = await fetch(`${hostInput.value}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ model: model, prompt: text, stream: true })
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            aiDiv.innerText = ''; 

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                    if (line.trim() !== '') {
                        const parsed = JSON.parse(line);
                        aiDiv.innerText += parsed.response;
                        chatContainer.scrollTop = chatContainer.scrollHeight;
                    }
                }
            }
        } catch (e) {
            aiDiv.innerText = '\n[出错了: 无法获取 AI 回复，请确认配置和跨域开启]';
        } finally {
            sendBtn.disabled = false;
        }
    }

    function appendMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        div.innerText = text;
        chatContainer.appendChild(div);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        return div;
    }
</script>
</body>
</html>
📱 手机如何利用这个网页进行访问？
直接双击：在电脑上双击 ollama.html 就可以在标准浏览器直接和 Ollama 聊天。

手机访问：如果你想在手机浏览器里直接用它，有两种办法：

方法 A（无需传输）：利用电脑上的临时网页托管服务。在终端进入该 HTML 所在文件夹，运行一行 Python 命令：python3 -m http.server 8000。然后打开手机浏览器，输入 [http://你的电脑局域网名字.local:8000/ollama.html](http://你的电脑局域网名字.local:8000/ollama.html)。

方法 B（直接传文件）：直接把这个小巧的 ollama.html 通过微信、AirDrop 或网盘发到手机里。在手机上用支持本地文件浏览的浏览器（如 iOS 的 Documents、Android 的各大文件浏览器）直接打开运行。

配置连通：打开后，在顶部的 Ollama 地址 一栏中，将 http://localhost:11434 换成你电脑的局域网名字（例如 [http://ollama-server.local:11434](http://ollama-server.local:11434)）即可成功唤醒模型。

方案二：使用第三方提供的在线纯前端托管网站（零部署、免安全担忧）
如果你连本地建立 HTML 文件都不想做，社区里有一些热心开发者将纯前端的交互界面部署到了 GitHub Pages、Vercel 或网络公网上（例如知名的社区项目 AIUI 或 LiteLLM Web）。

💡 原理澄清：这类网站只提供前端页面的 HTML/JS/CSS 静态文件下载。当你在它的界面输入提示词并点击发送时，它完全通过你浏览器的前端 JavaScript 引擎在本地发起 Fetch 请求直连你的 11434 接口，任何数据和隐私都不会经过他们的服务器。

访问方式：
用手机或电脑的标准浏览器访问托管好的纯前端地址，例如：[https://aiui-delta.vercel.app](https://aiui-delta.vercel.app)。

点击设置（Settings），找到自定义 API 端点（Custom API Endpoint / Ollama Host URL）。

填入你家里的电脑局域网名字：[http://ollama-server.local:11434](http://ollama-server.local:11434)。

页面会自动通过浏览器握手你的本地服务，获取你电脑上的全部模型，你就能在免安装任何 App 的情况下愉快对话了。

⚠️ 避坑关键点：跨域拦截（CORS）
如果你使用标准的纯浏览器（特别是方案二的公网静态网站）去连你电脑上的本地进程，99% 的概率会卡在浏览器的安全拦截上。因为浏览器为了防止恶意脚本攻击，默认禁止一个网页跨站（从互联网网站）去调你本机的本地接口。

要解除这个安全保护，必须在电脑上启动 Ollama 的地方，同步加上跨域白名单的环境变量：

Windows： 在环境变量里除了设置 OLLAMA_HOST=0.0.0.0 外，必须再添加一个 OLLAMA_ORIGINS=*。

Mac (终端命令行启动)：

Bash
export OLLAMA_HOST=0.0.0.0
export OLLAMA_ORIGINS="*"
ollama serve
* **Linux (Systemd)：** 在服务编辑中加入：
  ```ini
  Environment="OLLAMA_HOST=0.0.0.0"
  Environment="OLLAMA_ORIGINS=*"
只有开启了 OLLAMA_ORIGINS=*，标准的外部浏览器或者你自制的单文件 HTML，才被允许自由调用你本地的 AI 能力！

我想了解llm和客户端的通信，比如agent 是如何工作的，我如何通过网络像在本地直接运行ollama 那样以文本方式向ollama 发送询问并得到原始的响应

要理解大语言模型（LLM）与客户端的通信，我们需要先拆解核心的通信协议，然后再看更高级的 Agent（智能体）是如何在这套协议之上封装逻辑的。

我们可以通过标准的网络请求直接向 Ollama 发送询问并获取最原始的响应。

1. 客户端与本地 Ollama 的底层通信原理
无论是你刚才尝试的“单文件 HTML 网页”、Python 脚本，还是像 Cursor 这样的代码编辑器，它们与本地 Ollama 的通信本质上都是标准的 HTTP POST 请求。

通信的数据格式无一例外都是 JSON。

核心：Ollama 的原生 API 接口
Ollama 在后台默默运行了一个轻量级的 Web 服务器，默认监听 11434 端口。它提供了两个最核心的文本对话接口：

/api/generate：单次文本生成（给一个 Prompt，吐一个 Reply）。

/api/chat：结构化聊天（支持传递历史对话数组，保持上下文）。

2. 动手实验：如何通过网络发送原始请求
为了让你看清“最原始的响应”，我们不需要任何高级编程语言，直接使用系统自带的命令行工具 cURL 来模拟网络请求。

打开你的终端（Mac/Linux）或 PowerShell（Windows），输入以下命令：

实验 A：获取普通的单次 JSON 响应（禁用流式传输）
通常大模型是一字一字往前蹦的（流式传输），为了先看到最完整的原始 JSON 结构，我们通过 "stream": false 参数让它全部生成完再一次性返回：

Bash
curl http://localhost:11434/api/generate -d '{
  "model": "qwen2.5:7b",
  "prompt": "为什么天空是蓝色的？请用一句话回答。",
  "stream": false
}'
📥 得到的原始响应（纯文本 JSON）：
JSON
{
  "model": "qwen2.5:7b",
  "created_at": "2026-06-11T17:05:23.123456Z",
  "response": "天空呈现蓝色是因为大气层对太阳光中的蓝色光进行了瑞利散射。",
  "done": true,
  "done_reason": "stop",
  "context": [102, 345, 678, ...],
  "total_duration": 1200345600,
  "load_duration": 123456,
  "prompt_eval_count": 18,
  "eval_count": 22
}
字段解析：

response: 这就是 AI 给你的核心文本。

context: 这一串数字是 Token ID 数组。如果你想进行下一轮对话，把这一串数字带在下一次请求的 context 参数里，Ollama 就能记住你们之前聊了什么。

实验 B：获取流式响应（Stream，像打字机一样）
如果你把 "stream": true（或者不传该参数，默认就是 true），Ollama 会使用 Chunked Transfer Encoding（分块传输编码）。每当大模型预测出下一个字，就会立刻向你的浏览器或客户端推送一行独立的 JSON，直到推完为止：

Bash
curl http://localhost:11434/api/generate -d '{
  "model": "qwen2.5:7b",
  "prompt": "写一个字"
}'
📥 得到的原始响应（多行连续流）：
Plaintext
{"model":"qwen2.5:7b","created_at":"...","response":"好","done":false}
{"model":"qwen2.5:7b","created_at":"...","response":"！","done":true}
客户端（如浏览器 JavaScript）通过读取响应的 Reader 流，拿到一行就解析一行，并把 response 的字符追加到屏幕上，这就实现了动态打字机的效果。

3. 更高级的形态：Agent（智能体）是如何工作的？
理解了上面的底层文本通信后，你可能会好奇：Agent 又是怎么回事？它看起来不仅能聊天，还能查天气、写文件、运行代码？

其实，LLM 本身是无法直接操作电脑的，它永远只能做一件事：输入文本，输出文本。 Agent 的本质，是在客户端构建了一个“思考-行动-观察”的控制循环（Reasoning-Action Loop）。

Agent 的工作流程拆解
假设你给一个 Agent 发送任务：“帮我查询温哥华明天的天气，并把结果写入一个叫 weather.txt 的文件里。”

第一步：大模型“思考”并决定调用工具（Function Calling）
客户端（Agent 框架）在向 LLM 发送请求时，不仅带着你的任务，还会附带一份“工具说明书”：

JSON
// 客户端发给 LLM 的系统提示词：
"你是一个 Agent。你拥有以下工具：
1. get_weather(city): 查询天气
2. write_file(filename, content): 写入文件
请根据用户需求，决定下一步做什么。如果你要用工具，请输出：TOOL: 工具名(参数)"
LLM 读完后，发现自己没办法凭空知道明天天气，于是它发挥“文本补全”的能力，回复了一段特定的文本：

LLM 原始响应： TOOL: get_weather("Vancouver")

第二步：客户端当“苦力”，替大模型干活
客户端收到 LLM 吐出来的这段原始响应后，发现里面包含特定的关键触发词（TOOL:）。

客户端拦截这段文本，不展示给用户。

客户端在自己的代码里，真正去调用天气预报的 API。

客户端拿到了现实世界的数据：“温哥华明天晴，22°C”。

第三步：客户端将结果反哺给大模型
客户端把拿到的现实数据重新打包，再次作为 Prompt 发送给 LLM：

JSON
// 客户端再次发起 HTTP 请求给 Ollama：
"用户刚才问了温哥华明天的天气。你刚才决定调用 get_weather 工具。现在工具返回的真实结果是：'温哥华明天晴，22°C'。请问你下一步要做什么？"
第四步：大模型继续思考，完成剩余任务
LLM 得到了新数据，继续进行文本补全：

LLM 原始响应： TOOL: write_file("weather.txt", "温哥华明天晴，22°C")

客户端再次拦截，在本地电脑上为你创建并写入了 weather.txt。接着第三次向 LLM 汇报：“文件已写好”。
最后，LLM 回复：

LLM 原始响应： 主人，我已经帮您查好了，温哥华明天 22°C 晴天，并且已经为您写入到了 weather.txt 文件中。

客户端看到没有 TOOL: 触发词了，终于把这句最终的文本呈现在你的手机或网页屏幕上。

总结
通信本质：客户端和 Ollama 之间纯粹靠 HTTP 协议传 JSON 字符串。

Agent 本质：LLM 负责在大脑里规划和指挥（通过输出特定格式的文本），而客户端框架（如 LangChain、AutoGPT）负责在现实世界里跑腿执行（解析文本并调用本地代码/API），两者不断交替发送网络请求，形成了看起来无所不能的“智能体”。

怎样让codex和antigravity 使用ollama 呢

要让 OpenAI Codex 和 Google Antigravity 这类先进的 AI 代理/开发平台去使用你本地的 Ollama 离线模型，其核心逻辑与配置普通编辑器（如 VS Code）大同小异：利用 Ollama 提供的“OpenAI 兼容接口”进行流量劫持与重定向。

由于这两款工具在架构上都支持配置自定义端点（Custom Endpoint），只要你在启动 Ollama 时配置好跨域和局域网监听，就能无缝接入。

以下是具体的配置指南：

🛠️ 前置准备：确保 Ollama 放开接口限制
无论接入哪个工具，Ollama 都必须开启局域网监听和跨域允许。如果它们运行在同一台机器上，至少要开启跨域。

请确保你的本地 Ollama 带有以下环境变量并重启过服务（参考之前的配置）：

Ini, TOML
OLLAMA_HOST=0.0.0.0
OLLAMA_ORIGINS="*"
💡 你的本地 OpenAI 兼容层基础 Base URL 将会是：

如果在同一台电脑：http://localhost:11434/v1

如果跨电脑（例如工具在 Mac 上，Ollama 在另一台 Linux 算力机上）：http://你的算力机名字.local:11434/v1

1. 接入 Google Antigravity (2.0+)
Google Antigravity 作为一款“代理优先（Agent-first）”的开发平台，虽然默认深度整合了云端的 Gemini 3 系列模型，但它原生也是支持第三方模型供应源以及 MCP（Model Context Protocol）扩展的。

方式 A：通过设置直接重定向 OpenAI 供应源
由于 Antigravity 底层兼容 OpenAI API 协议（用于支持其 GPT-OSS 模型），你可以直接替换其基础路径：

打开 Antigravity，进入设置（或按下快捷键 Ctrl/Cmd + ,）。

在设置搜索框中输入 GPT-OSS 或者是 Custom OpenAI Provider。

找到 Base URL 配置项，将其由默认地址修改为：

Plaintext
http://localhost:11434/v1
API Key 填入任意非空字符（如 ollama）。

在模型列表栏（Model List）或 settings.json 中，添加你想让 Agent 使用的本地代码/推理模型，例如：qwen2.5-coder:7b 或 deepseek-r1:7b。

方式 B：在 Antigravity 2.0 CLI / SDK 中配置
如果你正在使用 Antigravity CLI 命令行或编写 Python SDK 来驱动 Agent（例如处理复杂的 ESP-IDF 编译环境、自动运行 idf.py build 等任务）：

在你的 Agent 脚本或配置文件的环境变量中，将提供商指向本地：

Bash
# 终端直接临时导出变量
export ANTIGRAVITY_API_PROVIDER="openai"
export ANTIGRAVITY_BASE_URL="http://localhost:11434/v1"
export ANTIGRAVITY_MODEL="qwen2.5-coder:7b"
💡 针对嵌入式/ESP-IDF 开发的专家提示：
让 Agent 帮你处理 ESP32 的 C 语言逻辑、管理 CMakeLists.txt 或排查寄存器报错时，强烈建议使用 qwen2.5-coder:7b（或更大尺寸版本）。因为代码模型对底层 C/C++ 硬件库以及编译工具链（如编译脚本纠错）的语义理解，会显著优于通用的轻量化模型。

2. 接入 OpenAI Codex 客户端/代理平台
OpenAI 官方的 Codex 平台（包含了 Worktrees 并发代理和云端/本地混合环境）同样允许开发者接入自定义模型以节省 Token 成本或处理离线私有数据。

在 Codex Agent 的配置文件（通常是项目根目录下的 .codex/config.yaml 或客户端的“自定义模型”面板）中，进行如下映射：

YAML
# .codex/config.yaml 示例
providers:
  openai_compatible:
    api_key: "ollama"                         # 随便填，不能为空
    base_url: "http://localhost:11434/v1"     # 指向本地 Ollama 兼容层
    models:
      - name: "qwen2.5-coder:7b"               # 必须与 ollama list 中的名字完全一致
        aliases: ["codex-local", "default"]    # 给本地模型起个别名供 Agent 识别
配置完成后，当你在 Codex 客户端中启动 Agent 任务流，Agent 发送给 http://localhost:11434/v1/chat/completions 的工具链调用（Function Calling）就会转由你的本地显卡/内存进行计算。

⚠️ 避坑指南：本地大模型能完美胜任 Agent 吗？
在把 Antigravity 或 Codex 的自主代理（如自动读写文件、多步骤修复 Bug）切换到本地 Ollama 后，你可能会遇到 Agent 陷入死循环 或 无法正确执行工具（Tool Call 失败） 的情况。

这是因为：

云端模型（如 Gemini 3 Pro, Claude 3.5 Sonnet） 拥有极强的工具调用能力（Function Calling），能完美输出极其严格的 JSON 格式让代码去拦截。

本地轻量级模型（7B/8B） 在面对复杂的 Agent 嵌套长上下文时，偶尔会“忘记”系统提示词，或者输出格式带有瑕疵（比如 JSON 漏了闭合括号），导致 Antigravity 无法解析 Agent 的下一步行动。

🔥 最佳实践：

如果你想让 Antigravity 的 Agent 自主去跑脚本、重构复杂代码，首选支持深入思考的 deepseek-r1:14b 或专门微调过的 qwen2.5-coder:7b/14b。

在 Agent 的系统提示词里，尽量精简工具的数量。只给它 1~2 个最核心的工具（例如“读取文件”、“运行终端命令”），工具越少，本地模型在规划时出错的概率就越低。

想澄清一下，既然客户端可能指定llm，当多个客户端连接ollama 时，ollama 会同时运行多个llm，对吗

这是一个非常关键且直击 Ollama 核心架构的问题！

答案是：对，也不完全对。取决于这些客户端请求的是“同一个模型”还是“不同的模型”，以及你电脑的硬件资源。

为了让你彻底看清 Ollama 在多客户端并发时的底层运作机制，我们可以拆解为以下三种核心场景：

场景一：多个客户端请求【同一个模型】
比如：你的手机浏览器和电脑上的 Cursor 同时都在使用 qwen2.5-coder:7b。

模型的加载数量： 只会运行一个。

底层机制： 当第一个客户端发送请求时，Ollama 会把 qwen2.5-coder:7b 加载到显存/内存中。当第二个客户端也发来请求时，Ollama 不会在显存里复制一份新的模型，而是让这两个客户端共享这同一个模型的权重数据。

并发处理（关键）： 大模型的静态权重是共享的，但每个人的“对话上下文（KV Cache）”是独立的。Ollama 内部有一个智能调度队列。

如果两边同时发送请求，Ollama 会在显存中为两个人分别开辟一小块地方存放各自的上下文，然后利用 GPU 的并行计算能力，同时处理两个人的文字生成。

体验影响： 此时模型不会爆显存，但因为 GPU 算力被瓜分了，两边客户端看到的打字机吐字速度（Token/s）都会变慢。

场景二：多个客户端请求【不同的模型】
比如：你的手机请求的是 deepseek-r1:7b（看图/思考），而 Cursor 请求的是 qwen2.5-coder:7b（写代码）。

在这种情况下，Ollama 确实会尝试同时运行多个不同的模型。但它能走多远，完全取决于你的显存（VRAM）或内存大小。

1. 如果你的显存足够大（例如 24GB 显存）
Ollama 会把 deepseek-r1 和 qwen2.5-coder 同时常驻在显存里。两个客户端可以同时发起询问，互不干扰，速度也非常快。

2. 如果你的显存刚好不够（例如 8GB ~ 16GB 显存）
这是最聪明的动态调度发生的地方。Ollama 默认有一个 “智能热启/热退” 机制（可以通过 OLLAMA_KEEP_ALIVE 变量控制，默认是 5 分钟）：

手机先请求 deepseek-r1，Ollama 把显存腾出来，加载并运行它。

3 秒后，Cursor 突然请求 qwen2.5-coder。Ollama 发现显存塞不下两个模型，它会立刻把 deepseek-r1 从显存里卸载（或赶到内存里），然后把 qwen2.5-coder 加载进显存。

体验影响： 这时 Cursor 的客户端会卡顿几秒钟（界面没有任何反应），因为需要等待本地硬盘/内存往显存里重新灌入模型数据的过程（Loading 阶段）。

场景三：极端的硬性限制（并发上限）
为了防止多用户把本地电脑彻底压垮，Ollama 还在底层设计了两个硬性安全阀（你可以通过环境变量自己修改）：

OLLAMA_NUM_PARALLEL（单模型并发流数，默认通常为 1 或根据硬件自适应）： 如果设置为 1，即使两个客户端用同一个模型，当一个人在大声朗读或长文本推理时，另一个人的请求会在后台排队等待（Queue），直到前一个人吐字结束，第二个人的界面才会开始打字。

OLLAMA_MAX_LOADED_MODELS（最大同时加载模型数，默认通常为 1）：
在默认配置下，为了保证极致的速度，Ollama 严格禁止在显存里同时并存两个不同的模型。只要有客户端切换了模型，前一个模型就会立刻被踢出显存，绝对不让显存由于并存多个模型而导致报错崩溃（Out of VRAM）。

总结
当你把本地 Ollama 的端口暴露给局域网的多个客户端时：

它们在逻辑上可以同时向不同的模型发起询问。

但在物理层面上，Ollama 会根据你当前的显存容量，动态地在内存/显存之间玩“兵兵球”一样的模型切换游戏，或者让大家在队列里排队。

如果你打算让多个人同时流畅使用，建议在启动 Ollama 的服务器上调大这两个参数（例如：OLLAMA_NUM_PARALLEL=4 且 OLLAMA_MAX_LOADED_MODELS=2），前提是你的显卡配置足够强悍。

让我们更进一步，如何本地运行图像和视频ai生成呢？象ollama 一样，我希望客户端在另一台机器，甚至手机上

要实现本地图像和视频的 AI 生成，并且像 Ollama 一样支持“服务端负责高强度计算、客户端/手机负责标准浏览器访问”，目前开源社区最完美的解决方案是 ComfyUI。

ComfyUI 的底层架构和 Ollama 非常相似，它在后台启动一个 Web 服务器，将算力完全留在本地，并直接在浏览器中输出一个功能极其强大的图形化操作界面。你可以用任何设备（包括手机浏览器）直连它，远程控制电脑的显卡来画图或生成视频。

1. 为什么选择 ComfyUI 而不是 WebUI (Automatic1111)？
在本地生成领域，主要有两大派系。这里强烈推荐 ComfyUI，原因如下：

天生支持远程与多设备： ComfyUI 的前端网页极其轻量。它就像一个画布，所有的逻辑连线（工作流）都在浏览器里渲染，手机浏览器访问时非常流畅。

图像与视频通吃： 它不仅能运行 Stable Diffusion (SDXL/SD3) 画图，还能完美运行目前最顶级的本地视频生成模型（如 Stable Video Diffusion (SVD) 和 AnimateDiff）。

API 与 Agent 友好： 它的每一个工作流都可以一键导出为标准的 JSON API。这意味着你以后可以用 Python 脚本或者你的 AI Agent，像调用 Ollama 的文本接口一样，通过网络向 ComfyUI 发送请求来生成图片和视频。

2. 第一步：在算力机（电脑）上安装 ComfyUI
Windows 系统：
访问 ComfyUI 的 GitHub 仓库，下载官方提供的 "ComfyUI Portable"（免安装便携包）。

解压后，直接双击 run_nvidia_gpu.bat 即可启动。

Mac / Linux 系统：
通过克隆代码库并使用 Python 虚拟环境启动：

Bash
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI
pip install -r requirements.txt
python main.py
3. 第二步：开启局域网共享与跨域（核心步骤）
默认情况下，ComfyUI 和 Ollama 一样，只允许本地访问（http://127.0.0.1:8188）。为了让手机或另一台电脑能够连接，我们需要在启动时传入参数：

Windows (便携包)： 右键编辑 run_nvidia_gpu.bat 文件，在 python.exe main.py 后面加上 --listen 0.0.0.0 --cors-allow-origins *。

Mac / Linux / 源码启动：
在终端中带参数启动：

Bash
python main.py --listen 0.0.0.0 --cors-allow-origins *
--listen 0.0.0.0：允许局域网内的所有设备通过 IP 或 .local 名字访问。

--cors-allow-origins *：允许跨域，方便未来的自定义浏览器网页或 Agent 直接调用它的 API。

4. 第三步：在手机或其他机器上开始使用
确保手机和算力电脑在同一个 Wi-Fi 下。

打开手机的标准浏览器（Safari 或 Chrome），输入你电脑的局域网名字和端口（默认 8188）：
http://ollama-server.local:8188 （或者使用电脑的局域网 IP，如 http://192.168.1.50:8188）。

你的手机屏幕上会立刻出现完整的 ComfyUI 节点画布。

生成图像：双击加载一个默认的“文生图（Text-to-Image）”工作流，在 CLIP Text Encode 节点中用英文输入你的画面描述（Prompt），点击右侧控制面板的 "Queue Prompt"。

静待结果：你会看到电脑的显卡开始疯狂运转，而手机浏览器上的节点会一个接一个地亮起绿框（代表计算进度）。生成结束后，图片会直接显示在手机屏幕上，长按即可保存。

5. 进阶：如何生成视频？
生成视频（Text-to-Video 或 Image-to-Video）对硬件（显存）的要求比画图高得多。

你需要在电脑的 ComfyUI/models/checkpoints/ 目录中放入视频基础模型（如 svd_xt.safetensors）。

在浏览器中，点击 "Load" 导入一个专用的视频生成工作流（这些工作流的 .json 文件在网上或者 ComfyUI 官方示例中非常容易下载到）。

它的工作原理是：先由 SD 模型生成一张高质量的初始图片，然后将这张图片送入 SVD（Stable Video Diffusion） 节点，由显卡连续计算出 25 到 144 帧具有前后连贯性的画面，最后通过 VHS Video Combine 节点将这些画面在本地打包压缩成一个 .mp4 或 .gif 视频文件。

生成完成后，你同样可以直接在手机浏览器中在线预览并下载这个视频。

💡 硬件配置忠告（关于显存）
图像和视频生成是真正的“显存老虎”，不能像文本大模型那样通过降低量化（比如 4-bit 压缩）来大幅缩减体积：

画图（SDXL 1.0 / Flux Schnell）： 强烈建议至少 8GB 显存。

生视频（SVD / 12-24帧短视频）： 建议 12GB ~ 16GB 显存（如 RTX 4070 Ti 或 Mac 统一内存）。

高级长视频（AnimateDiff）： 建议 24GB 显存（如 RTX 3090 / 4090），否则在生成多帧画面时，ComfyUI 很容易因为爆显存（Out of Memory）而导致后台进程崩溃。

How do I check if avahi is installed on linux, Ubuntu

To check if Avahi (the service responsible for mDNS and .local hostname resolution) is installed and running on Ubuntu, you can use a few quick terminal commands.

Here is how to check its installation status, its active running state, and how to verify it is actually working.

1. Check if the Package is Installed
To see if the Avahi daemon package is actually installed on your Ubuntu system, run:

Bash
dpkg -l | grep avahi-daemon
If installed: You will see a line starting with ii (which means "installed"), followed by avahi-daemon and its version number.

If nothing returns: Avahi is not installed.

Alternatively, you can ask apt directly:

Bash
apt list --installed | grep avahi
2. Check if the Service is Active and Running
Even if the software is installed, the background service needs to be active to broadcast your hostname. Check its real-time status using systemctl:

Bash
sudo systemctl status avahi-daemon
Look for the Active: line in the output:

🟢 active (running): Everything is working perfectly.

🔴 inactive (dead) or disabled: The software is there, but it isn't running.

How to start it: If it's installed but not running, you can start it and enable it to launch automatically every time your computer boots up by running:

Bash
sudo systemctl enable --now avahi-daemon
3. Verify it's Actually Working (The Network Test)
The ultimate test to ensure Avahi is doing its job is to see if your system can resolve its own .local address.

First, grab your system's official hostname:

Bash
hostname
(Let's assume your hostname is ubuntu-server)

Now, try to ping that hostname with the .local suffix attached:

Bash
ping ubuntu-server.local
If you see continuous lines showing replies and time delays (e.g., 64 bytes from ...), Avahi is fully installed, configured, and successfully broadcasting across your local network loop! You can press Ctrl + C to stop the ping.

🛠️ What if it's completely missing?
If your checks show it isn't there, you can install it on Ubuntu with a single command:

Bash
sudo apt update && sudo apt install avahi-daemon -y
在执行sudo systemctl edit ollama.service命令存储时要求文件名，应该是什么

当你执行 sudo systemctl edit ollama.service 时，systemctl 会在后台为你创建一个专门的“配置覆盖文件”（Drop-in file）。

如果你在保存关闭时被编辑器（比如极简的 nano 默认编辑器）询问要存储的文件名，请直接保持它默认给出的文件名，不要进行任何修改，直接按回车（Enter）保存即可。

这是因为 systemctl 已经自动为你指定好了正确的文件路径和名称。

💡 如果你一小心删除了默认名字，它应该是：
如果你不小心清空了输入框，或者需要确认，它的标准目标路径和文件名应该完全固定为：

Plaintext
/etc/systemd/system/ollama.service.d/override.conf
目录： ollama.service.d/ （系统专门用来存放 ollama 附加配置的文件夹）

文件名： override.conf （固定的覆盖配置文件名）

🛠️ 快捷保存与退出指南
根据系统默认打开的编辑器不同，保存的操作快捷键如下：

情况 A：如果是 nano 编辑器（Ubuntu 默认，底部有一排带有 ^ 符号的提示）
修改完内容后，按下 Ctrl + O（代表 WriteOut 写入）。

此时底部会显示：File Name to Write: /etc/systemd/system/ollama.service.d/.#override.conf...（或者是类似包含 override.conf 的长路径）。

不要改动任何字，直接敲 Enter (回车键) 确认。

按下 Ctrl + X 退出编辑器。

情况 B：如果是 vim 或 vi 编辑器（终端一片黑，底部显示文件名）
确保你已经按了 Esc 键退出编辑模式。

输入 :wq （冒号、w、q，代表写入并退出）。

直接敲 Enter (回车键)，它会自动保存到正确的位置，不需要输入文件名。

验证是否保存成功
退出编辑器后，你可以运行以下命令来检查系统是否成功读取了你的修改：

Bash
sudo systemctl cat ollama.service
在输出内容的最底部，如果你能看到类似下面的几行，说明你刚才的存储和命名完全正确：

Ini, TOML
# /etc/systemd/system/ollama.service.d/override.conf
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
Environment="OLLAMA_ORIGINS=*"
最后别忘了运行 sudo systemctl daemon-reload && sudo systemctl restart ollama 让配置正式生效！

见下图

从截图来看，当前处于 nano 编辑器的保存确认界面。由于之前的输入可能触发了误擦除，导致底部的保存路径被不小心缩减成了 <49b91。

如果直接按回车，系统会把配置存成一个古怪的临时文件，导致配置无法生效。

请按照以下步骤重新保存：

第一步：恢复正确的文件路径
请直接在键盘上打字，把底部的 Write to File: 后面的内容修改为以下完整路径：

Plaintext
/etc/systemd/system/ollama.service.d/override.conf
快捷小技巧： > 1. 先连续按 Backspace（退格键） 把现有的 <49b91 彻底删掉。
2. 仔细输入上面这一串完整的路径。修改后的界面底部应该长这样：
Write to File: /etc/systemd/system/ollama.service.d/override.conf

第二步：回车并退出
输入完成后，直接按下 Enter (回车键)。

此时会退出保存界面，回到正常的代码编辑视野。

接着按下 Ctrl + X 退出 nano 编辑器。

第三步：让配置生效（核心命令）
回到终端的黑色命令行后，请依次执行以下两条命令，重新加载系统服务并重启 Ollama：

Bash
sudo systemctl daemon-reload
sudo systemctl restart ollama
第四步：最终验证
检查服务是否正确加载了这两个环境变量：

Bash
sudo systemctl cat ollama.service
只要在输出的最底部看到了你写的 Environment="OLLAMA_HOST=0.0.0.0"，就说明局域网共享和跨域已经彻底大功告成了！

不成功

从截图里的报错信息来看：

...after editing, new contents are empty, not writing file.

这是因为 systemctl edit 的机制非常特殊。它要求你把新增的配置写在特定的空白区域。如果你直接在原有的 nano 界面里胡乱修改，或者误删了它的系统标记，退出时它就会认为“没有有效的修改”，从而直接放弃保存。

别担心，我们换一种更直观、更不容易出错的方法，直接绕过 systemctl edit。

请直接在终端里依次复制并运行以下几行命令：

第一步：直接用强力命令写入配置文件
我们直接创建那个文件夹并把配置塞进去：

Bash
# 1. 创建配置所需的文件夹
sudo mkdir -p /etc/systemd/system/ollama.service.d

# 2. 直接将配置内容强行写入 override.conf 文件
cat <<EOF | sudo tee /etc/systemd/system/ollama.service.d/override.conf
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
Environment="OLLAMA_ORIGINS=*"
EOF
第二步：重载系统并重启 Ollama
运行以下命令让刚写好的文件生效：

Bash
# 3. 刷新系统服务列表
sudo systemctl daemon-reload

# 4. 重启 Ollama
sudo systemctl restart ollama
第三步：验证成果
现在，检查服务是否已经完美吃到了配置：

Bash
sudo systemctl cat ollama.service
检查方法： 此时终端屏幕上会打印出一大堆代码。请滚动到最底部，如果你能看到最后几行清晰地写着：

Ini, TOML
# /etc/systemd/system/ollama.service.d/override.conf
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
Environment="OLLAMA_ORIGINS="*""
这就说明配置完全成功了！

📱 顺便恭喜你：mDNS 已成功启用！
从你的截图里看到 ping richmond.local 已经完全能通（IP 为 10.0.0.211）。只要完成上面的 Ollama 重启，你现在就可以直接在手机浏览器或客户端里输入 http://richmond.local:11434 连上你的大模型了！

fail to install comfyUI

从截图来看，报错 error: externally-managed-environment 是现代 Linux 系统（遵循 PEP 668 标准）非常常见的安全保护机制。

系统在好心地提醒你：不要直接把第三方 Python 包安装到全局系统环境中，因为这可能会弄乱 Ubuntu 自身的系统工具链。

解决这个问题非常简单，最标准也是最安全的方法就是为 ComfyUI 创建一个独立的 Python 虚拟环境 (venv)。

请在终端里依次复制并执行以下命令：

第一步：安装虚拟环境依赖件
首先确保 Ubuntu 拥有创建虚拟环境的完整工具：

Bash
sudo apt update
sudo apt install python3-venv python3-full -y
第二步：创建并激活虚拟环境
确保你当前依然处于 /home/jason/repos/ComfyUI 文件夹下，然后运行：

Bash
# 1. 创建一个名为 "venv" 的虚拟环境空间
python3 -m venv venv

# 2. 激活这个虚拟环境
source venv/bin/activate
💡 怎么判断激活成功了？
激活后，你的终端提示符最前面会出现一个括号 (venv)，像这样：
(venv) jason@richmond:~/repos/ComfyUI$。这说明接下来的所有安装都只局限在 ComfyUI 内部，绝不影响系统。

第三步：重新安装依赖（现在可以成功了！）
在虚拟环境激活的状态下，再次运行安装命令：

Bash
pip install -r requirements.txt
此时 pip 就会开始顺利下载并安装 ComfyUI 运行所需的全部图像/视频算法核心库（如 PyTorch、Transformers 等）。

💡 以后如何启动 ComfyUI？
今后如果你关闭了终端重新打开，想再次运行 ComfyUI 时，只需执行以下组合命令：

Bash
cd ~/repos/ComfyUI
source venv/bin/activate
python main.py --listen 0.0.0.0 --cors-allow-origins *
(一旦带上后面的参数成功跑起来，你就可以继续用手机或另一台电脑在浏览器里输入 http://richmond.local:8188 开始远程画图了！)

error

从截图中的报错信息来看：

main.py: error: unrecognized arguments: --cors-allow-origins alembic_db alembic.ini ...

这里发生了两个小意外：

参数名字输错了： ComfyUI 原生并不支持 --cors-allow-origins 这个参数名（这是 Ollama 的特有参数，ComfyUI 默认就已经开放了浏览器直连）。

命令粘连： 仔细观察报错，main.py 把你当前目录下的所有文件名（如 alembic_db, alembic.ini, api_server 等）全部当作参数吞进去了。这通常是因为复制粘贴命令时，末尾不小心带上了一个通配符（比如 *），或者终端的粘贴缓冲区把 ls 的结果串进去了。

别担心，在虚拟环境 (venv) 激活的状态下，我们用最干净、最精准的命令来启动它。

请在终端里复制并运行以下命令：

Bash
python main.py --listen 0.0.0.0
💡 为什么这样就够了？
--listen 0.0.0.0：这行最核心，它会让 ComfyUI 监听局域网内所有的网卡接口。

关于跨域 (CORS)： ComfyUI 默认就允许来自任何源的异步 Web 访问（它的后端代码里原生自带了 CORS 放行），因此我们不需要像在 Ollama 里那样额外手动传入允许跨域的参数。

启动成功后，终端应该会显示类似 Starting server... 以及 To see the GUI go to: http://0.0.0.0:8188 的字样。

这时你就可以打开手机或另一台电脑的浏览器，输入 http://richmond.local:8188 正式迈入本地图像与视频生成的新世界了！
