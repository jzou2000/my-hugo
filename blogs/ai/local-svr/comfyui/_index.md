---
title: Video Generators
---

ComfyUI问题 - 远程运行ComfyUI时要求下载模型，问题是下载的数据储存在客户端（浏览器端）呢还是在服务器端（ComfyUI安装端）？从打开的存储对话框看是客户端，but that doesn't make sense.

你直觉非常准，如果直接下载到浏览器（客户端），那确实太不合理了！

大模型的体积动辄几个GB甚至几十个GB，浏览器是根本无法直接加载和运行它们的。在 ComfyUI（以及类似的 WebUI 架构）中，所有的模型运算、图像生成都是在服务器端（ComfyUI 安装端）的显卡和内存中完成的。

你之所以在界面上看到了一个下载按钮，这里有一个小小的视觉误导。

究竟下载到了哪里？
实际上，这个模型会直接下载并储存到服务器端。

点击“Download”后的真实链路：
当你点击界面上的 Download (1.99 GB) 时，浏览器并没有真正的把这个 2GB 的文件吞进你本地电脑的硬盘里。它实际上是向远程的 ComfyUI 服务器发送了一个指令（API 请求），告诉服务器：“喂，你缺了这个模型，快去这个 URL 把文件下载到你的 models/checkpoints/ 文件夹里。”

为什么看起来像在客户端操作？

UI 界面的误导： 这个前端的管理面板（可能是某个自定义节点或云端托管平台提供的 ComfyUI 扩展管理器）为了给你提供方便，把“服务器缺模型”这件事做成了可视化的卡片。

“Copy URL” 或 “Use from Library”： 这些选项也是为了让你辅助服务器去定位资源。

极少数的例外情况（为什么你会觉得像客户端）
只有一种极特殊的情况，文件会通过浏览器处理：
如果你使用的是一些集成了“通过网页上传模型”功能的管理器。那种情况下，是你先下载到本地，然后通过浏览器将文件上传（Upload）到服务器。但从你截图中的 Download 按钮来看，它是让远程服务器去直接抓取（Fetch）该网络资源。

总结
放心点下去吧！数据会安全地待在服务器端。下载完成后，刷新（Refresh）一下工作流，服务器就能识别到这个新模型并正常运行了。

幸运的是我第一次运行在同一台机器，所以暂时不是问题。真正的问题是something is downloaded, but not what is expected, and it looks weired.

竟然真的下载到你本地（客户端）了！而且看到了 .crdownload 这个 Chrome/Edge 浏览器特有的未完成下载临时文件后缀。

这确实太反直觉了，我向你道歉，之前的推断低估了这个特定 UI 组件的“奇葩”设计。

我们来拆解一下为什么会出现这个诡异的现象，以及这个 .crdownload 到底是什么：

1. 为什么会下载到客户端？（机制破案）
你看到的这个界面是 ComfyUI 较新版本内置的 Workflow Overview (工作流概览) 错误提示面板。

它的底层逻辑是这样的：

它不是服务器端的自动抓取脚本。 * 它是前端网页检测到你的工作流里缺了这个模型，然后去模型数据库（比如 Civitai 或 Hugging Face）找到了对应的直接下载链接。

当你点击 Download 时，它本质上只是在网页里触发了一个 <a> 标签的 download 属性，相当于浏览器直接帮你点了那个下载链接。

结论： 它的确是通过你的浏览器，把模型先下载到你本地的 Downloads/comfyui-download 文件夹里了。

2. 为什么名字和格式看起来很怪？ (Unconfirmed 703476.crdownload)
看到这个你不用慌，这完全是正常现象，原因有两个：

.crdownload 是什么： 这是基于 Chromium 内核的浏览器（如 Chrome、Edge、Brave）在文件还没下载完时生成的临时缓存文件。一旦下载达到 100%，浏览器会自动把后缀改回它原本的名字（比如 .safetensors 或 .ckpt）。

名字为什么是数字： 许多模型站（尤其是 Civitai）的直接下载链接，其根地址通常类似于 https://civitai.com/api/download/models/703476。在下载刚刚开始、浏览器还没成功解析出服务器返回的 Content-Disposition（即真实文件名）之前，浏览器会默认用链接末尾的 ID（比如 703476）来临时命名。

3. 同台机器 vs 远程机器，后面该怎么搞？
既然你提到当前是在同一台机器上运行（客户端和服务器端是同一台电脑）：

当前本地的处理方式：
等浏览器把这个 2.1 GB 的文件完全下载完。下载完成后，它会自动变成正常的模型文件名。然后你需要手动把这个文件剪切到你 ComfyUI 安装目录下的 models/checkpoints/ 文件夹里。回到网页刷新，报错就会消失。

如果是真正的“远程运行”怎么办？
如果以后你把 ComfyUI 部署在远程云服务器（比如 AutoDL、RunPod）或另一台主力机上，千万不要直接点这个 Download。
因为点它会把 2GB+ 的文件吃进你面前这台轻薄本/办公电脑里，你还得再苦哈哈地上传给服务器。

远程正确姿势： 点击它旁边的 Copy URL（复制链接），然后登录到你的远程服务器终端，使用 wget 或 curl 命令让服务器直接去下载：

Bash
cd /path/to/ComfyUI/models/checkpoints/
wget -O model_name.safetensors "你复制的URL"
所以，现在你只需要静静等待浏览器下载完成，然后手动“搬运”一下即可！

if that is the solution, it looks even weired, and it makes running from remote browser meaningless. Is it because my ubuntu 26.04 too new and I downloaded comfyui from its repo and installed in virtual env, so some conflicts happen?

你吐槽得太对了！如果远程运行还得这么折腾，那这个所谓的“一键下载”功能不仅毫无意义，甚至是个巨大的体验倒退。

但请放心，这绝对不是因为你的 Ubuntu 24.04/26.04 系统太新，也不是 Python 虚拟环境（venv）导致的冲突。 这纯粹是 ComfyUI 官方在新版本（ComfyUI V2 界面）中引入的一个极其反直觉的 UI 交互逻辑，以及你目前处于“本地同机运行”状态下产生的一个误会。

为了让你心里踏实，我们把这个设计彻底拆解清楚：

1. 为什么说“远程运行”并不会失去意义？
当你未来真正把 ComfyUI 部署在远程服务器（比如家里另一台 Ubuntu 电脑，或者云端 GPU 服务器），而你用笔记本浏览器访问时：

这个界面真正对你有用的地方，是那个 Copy URL 按钮。

在 AI 绘画圈，过去最痛苦的事情之一是：从网上下载了一个别人的工作流（JSON 文件），一导入发现报错缺模型，但工作流里往往只写了模型叫 majicMIX_realistic_v7.safetensors。你根本不知道作者是从 Civitai 还是 Hugging Face 下载的哪一个版本，只能全网瞎猜、乱搜。

新版 ComfyUI 的这个错误面板，核心价值在于“帮你精准定位模型出处”：

它是前端通过工作流里的模型哈希值，去云端数据库匹配到了精准的原始下载链接。

对于远程运行： 你完全不需要点 Download。你只需要点 Copy URL，然后到远程 Ubuntu 的终端里，用 wget "链接"，让服务器用几百兆的机房带宽秒速下载。

所以，远程运行的意义在于算力托管和精准链接获取，而不是让你用浏览器去下那几个吉比特的文件。

2. 为什么在你的 Ubuntu 本地会显得这么傻？
因为你现在是“用本地浏览器访问本地服务”（localhost 或 127.0.0.1）。

在这个特定场景下，ComfyUI 犯了一个逻辑上的死板错误：
它不知道、也不关心你的浏览器和它的后端（Backend）其实在同一块主板上。它的网页前端（Frontend）只管死板地执行命令——“既然用户点了 Download，我就把链接塞给浏览器去下载”。

结果就演变成了：后端（ComfyUI 进程）明明有能力自己去下载，却非要通过前端浏览器绕一圈，下载到你的 ~/Downloads 目录里，让你手动搬运。 这确实是这个新 UI 饱受诟病的地方。

3. 如何让后端自己去自动下载？（真正的解放双手）
如果你希望 ComfyUI 后端像你想的那样，在缺模型时由服务器在后台静默下载，不需要浏览器插手，你可以使用更成熟的第三方社区插件：

目前行业标准的解决方案是安装 ComfyUI-Manager（ComfyUI管理器）。

进入你的虚拟环境和自定义节点目录：

Bash
cd ~/your-comfyui-path/custom_nodes/
克隆管理器仓库：

Bash
git clone https://github.com/ltdrdata/ComfyUI-Manager.git
重启 ComfyUI。

使用体验的区别：
当安装了 ComfyUI-Manager 后，如果工作流报错缺模型，你可以点击 Manager 面板里的 Install Missing Custom Nodes 或 Install Models。

这时候你再点击下载，它是真正的由远程 Ubuntu 后端在终端里静默下载，直接存入正确的 models/ 文件夹下。下载完成后你只需刷新网页，完全不需要浏览器中转，更不会出现 .crdownload 的尴尬情况。

所以，别怀疑你的系统，你装的软件一切正常——这只是官方新版 UI 在设计上的一段“弯路”。

ok, I've cloned the manager, restarted comfyui, and even updated the manager, run install missing customer nodes, the backend did download bunch of files. but I still can't run the first demo workflow. the ui only complained a model is missing but refused to tell me which model is missing.

我完全理解你的抓狂，ComfyUI 官方新版界面的这个“哑谜”报错确实让人摸不着头脑。它在右侧明明写着 checkpoints (1)，说明缺的是一个 Checkpoint（主模型），但就是不肯把原作者用的文件名显示出来，只在下面空荡荡地留了一个 Load Checkpoint 的节点提示。

其实你已经把最强大的武器 ComfyUI-Manager 装上了。现在我们不需要理会右边那个死板的官方工作流概览（Workflow Overview），直接用 Manager 来查缺补漏。

请按照以下步骤排查，分分钟定位这个神秘的模型：

第一步：让 ComfyUI-Manager 来接管下载（推荐）
既然你的 Manager 已经安装成功（左上角已经出现了蓝色的 Manager 按钮），我们可以用它来精准安装缺失的模型：

点击左上角的 Manager 按钮，打开主菜单。

找到并点击 Install Models（安装模型）或者 Install Missing Custom Nodes 下方的模型相关选项。

关键点： 在弹出的列表中，ComfyUI-Manager 会自动扫描你当前画布上的节点。如果它识别到了缺失的模型，通常会在列表最上方以高亮/特定提示标注出来，并且右侧会有一个 Install 按钮。

如果看到了，直接点击 Install。这时候后端终端（Ubuntu 命令行）就会真正开始静默下载，下载完成后它会自动放进 models/checkpoints/。

第二步：去画布上“抓现行”
官方右侧面板不显示名字，但画布上的节点本身会说谎。

在你的主画布上，按住鼠标右键拖动，或者用滚轮缩小画布，寻找一个叫 Load Checkpoint（或者 CheckpointLoaderSimple）的节点。

缺失模型时，这个节点通常会爆红，或者它里面的模型选择下拉框（Dropdown）里显示的名字是红色的，或者显示为你提示中的 Value not in list。

那个下拉框里现在显示的文本，就是原作者使用、而你目前缺失的模型名字！ ---

第三步：最后的终极绝招 —— 用“无情”的文本编辑器
如果画布太大找不到，或者节点直接变空了，别忘了 ComfyUI 的工作流本质上就是一个 JSON 文本文件。你可以直接通过查看源码来抓出它的真身：

在你的 Ubuntu 电脑上，用你习惯的编辑器（比如 VS Code、Cursor 或直接在终端用 nano/vim）打开你正在加载的这个 .json 工作流文件。

键盘按下 Ctrl + F 搜索关键字：ckpt_name 或 checkpoint。

你会看到类似下面这样的代码片段：

JSON
"widgets_values": [
  "v1-5-pruned-emaonly.safetensors" 
]
这里的 "v1-5-pruned-emaonly.safetensors"（举例）就是那个死活不肯露面的模型名字！

拿到名字后怎么做？
如果你在画布上或 JSON 里看到了名字：
点击你截图右侧面板中那个唯一的 Copy URL 按钮。把链接复制下来，去你的 Ubuntu 终端里，进入你的虚拟环境，用 wget -O 找出来的模型名字.safetensors "复制的URL" 直接下载到 ComfyUI/models/checkpoints/ 目录下。

下载完成后，点击右侧面板的 Refresh（刷新）按钮，或者直接刷新网页，报错瞬间就会消失！

I resize the error panel to expose more information, however i can't find it in the manager

破案了！看到你拉开面板后的完整错误信息，我完全明白为什么 ComfyUI-Manager 找不到它，以及为什么系统一直在报错了。

仔细看这行核心报错提示：

ckpt_name: 'v1-5-pruned-emaonly-fp16.safetensors' not in ['SD1.5/v1-5-pruned-emaonly.ckpt']

这其实是一个非常典型的“路径/命名不匹配”问题，而不是你手里没有这个模型。

究竟发生了什么？
你其实已经有这个模型了： 你的后端的 models/checkpoints/ 目录下，应该已经有一个名叫 SD1.5/v1-5-pruned-emaonly.ckpt 的模型（这就是你刚刚运行 Manager 时后端帮你下载的一堆文件之一）。

工作流太死板： 这个 Demo 工作流的作者在保存文件时，他电脑上的模型名字叫 v1-5-pruned-emaonly-fp16.safetensors。所以工作流导入时，死板地满世界去找这个一模一样的字符串。

Manager 为什么找不到： 因为在 ComfyUI-Manager 的逻辑里，它觉得你已经有了 Stable Diffusion 1.5 的官方基础模型（虽然后缀和路径稍微有点不同），它判定“基础模型已存在”，所以就不会在缺失列表里把它单独列出来。

最快、最优雅的解决办法（只需 2 秒）
你完全不需要再去下载任何 2GB 的文件了，直接在网页画布上修改一下指向即可：

在你的 ComfyUI 画布上，找到那个爆红的 Load Checkpoint 节点（或者在右侧面板的 Value not in list 下方，点击那个小雷达图标 ϕ，页面会自动帮你定位到这个节点）。

点击这个节点上的模型选择下拉菜单（当前它可能显示为空白、爆红或者显示 v1-5-pruned-emaonly-fp16.safetensors）。

在弹出的下拉列表里，选择你本地已经存在的那个模型：SD1.5/v1-5-pruned-emaonly.ckpt。

选好之后，右侧的报错面板会瞬间清空。直接点击上方的 Run（运行），你的第一个 Demo 工作流就能完美跑通了！

总结： 以后遇到这种情况，只要右侧提示的 not in [...] 括号里有你熟悉的基础模型，直接去画布节点上重新手动选择一下，把作者的名字换成你本地的名字就行了。

can't find your raida icon

啊，真抱歉！是我记错了图标的样式，让你在界面上白找了一圈。那个按钮其实长得不像雷达。

请看你截图里 Load Checkpoint 字样的右边，有一个由一个圆圈和四角有小刻度组成的图标（它其实是“精确定位/靶心”的标志，就在 Value not in list 字样的正上方偏右一点）：

(注：就是类似这种靶心、瞄准镜形状的图标)

最直接的替代办法：
如果那个靶心图标点击没反应，或者还是找不到，我们可以直接用快捷键在画布上把它抓出来：

鼠标点击一下主画布（黑色的背景区域），确保激活了画布窗口。

键盘按下 Ctrl + F（在 Mac 上是 Cmd + F）。

网页上方会弹出一个 ComfyUI 自带的节点搜索框，在里面输入：Load Checkpoint 然后回车。

画布会自动像镜头拉近一样，直接帮你飞到（Focus）这个爆红的节点面前。

找到它以后，点击它身上的下拉菜单，把模型切换成你本地已有的 SD1.5/v1-5-pruned-emaonly.ckpt 就可以啦！

do i have to have nvidia video card to run comfyUI? I don't have it. Here's my video card

这属于一个经典的“美丽误会”！你发给我的第二张截图清楚地显示：你电脑里确实有一张英伟达（NVIDIA）显卡，型号是 NVIDIA Quadro P520。

但真正的问题并不在有没有显卡，而在于这个报错的核心痛点：CUDA error: no kernel image is available for execution。这意味着当前的软件环境（PyTorch）不支持你这张老显卡的架构，而且你这张显卡的显存有些太小了。

我们来把这背后的原因和解决办法拆解清楚：

1. 为什么会报 no kernel image is available 错误？
大语言模型和 Stable Diffusion 依赖一个叫 PyTorch 的底层框架，它负责和 NVIDIA 显卡对话。

每一代 NVIDIA 显卡都有一个算力架构版本（Compute Capability）。你的 Quadro P520 属于 Pascal 架构，算力是 6.1。

你通过 Ubuntu 仓库或者默认安装的最新版 PyTorch，为了瘦身和提高效率，默认只编译了较新显卡（比如算力 7.0/8.0 及以上，如 RTX 20/30/40 系列）的运行内核（Kernel Image）。

当 ComfyUI 运行到 KSampler（采样器，也就是最消耗显卡算力的核心步骤）时，PyTorch 试图把你这张卡的算力代入进去，结果发现高版本的 PyTorch 里面根本没有针对 6.1 算力编译的二进制文件，于是直接罢工报错。

2. 另一个严峻的现实：显存（VRAM）严重不足
从你的 NVIDIA Settings 截图中可以看到：

Total Dedicated Memory: 2048 MB (2 GB 显存)

这是一个硬伤。Stable Diffusion 1.5 即使经过极度优化，在 ComfyUI 启动时也至少需要 4GB 左右的显存才能比较顺畅地勉强运行。2GB 显存即使解决了上面的编译错误，在运行到 KSampler 时也会大概率直接爆显存（Out of Memory）。

3. 你现在的最佳解法是什么？
既然你是在本地的 Ubuntu 环境，且目的是为了跑通第一个 Demo 熟悉工作流，目前有两条路可以走：

方案 A：让 ComfyUI 完全用 CPU 运行（推荐，最省心）
虽然 CPU 跑图片非常慢（可能一幅图要几分钟），但它可以彻底绕过显卡算力不匹配、显存不足的所有报错，让你顺利把整个工作流流程走完。

关闭当前正在运行的 ComfyUI 终端进程。

在你的 Python 虚拟环境下，启动 ComfyUI 时加上强制 CPU 运行的参数：

Bash
python main.py --cpu
重新打开网页，点击 Run。此时它会完全依赖你的内存和 CPU，虽然慢，但绝对能跑完。

方案 B：降级 PyTorch 以兼容你的显卡（如果死活想尝试用这张卡加速）
如果你一定要尝试用这张显卡，你需要卸载当前的 PyTorch，并安装一个依然保留了老显卡兼容、且能极度压榨显存的特定版本，同时启动时开启低显存模式：

进入虚拟环境，卸载当前的 torch：

Bash
pip uninstall torch torchvision torchaudio
安装对老卡兼容性较好、且匹配你系统 CUDA 驱动的版本（通常需要手动指定老版本的 cuda 编译包，或者重新安装支持旧版算力的 torch）。

但更关键的是，你在启动 ComfyUI 时必须加上极度低显存参数：

Bash
python main.py --lowvram --gpu-only
注：即便如此，2GB 显存依然有极大几率在 KSampler 步骤报错崩溃。

总结建议
如果你只是想先玩转 ComfyUI 了解节点逻辑，请立刻使用 python main.py --cpu 启动。

正如你前面提到的，未来如果需要高效、真正的作画，最完美的体验还是将 ComfyUI 的后端部署在远程（拥有一张 8GB/12GB 以上显存 NVIDIA 显卡的电脑或云服务器上），然后用你现在的这台 Ubuntu 浏览器远程访问。

the formal deploy machine has a rtx5070, right now I just want to go through all workflow and make sure every steps is correct.

这就完全说得通了！用这台机器来“对流程、调逻辑”，确实是最好的策略。

在生产环境或者主力机拥有 RTX 5070 这样强悍性能的前提下，你现在这台 Ubuntu 上的 Quadro P520（2GB 显存）确实不需要强行去配置 CUDA 环境。为了不把时间浪费在解决老旧显卡的驱动和 PyTorch 架构冲突上，我们直接让 ComfyUI 的后端切换到 纯 CPU 运行模式。

请按照以下步骤，在本地快速把流程跑通：

步骤 1：使用 CPU 模式重新启动 ComfyUI
回到你的 Ubuntu 终端，按下 Ctrl + C 关闭当前正在报错的 ComfyUI 进程。

确保你依然处于 Python 虚拟环境（venv）中，输入以下命令启动：

Bash
python main.py --cpu
💡 这行命令的作用：
它会明确告诉后端程序：“完全跳过 NVIDIA 显卡的检测，把所有的张量计算和模型加载都丢给系统内存（RAM）和 CPU 处理器。” 这样你就彻底绕过了 CUDA error: no kernel image 的硬伤。

步骤 2：在网页端重新运行
刷新你的浏览器页面。

此时你应该会发现右侧的报错信息已经消失（如果你之前已经把 Load Checkpoint 节点里的模型切换成了本地已有的 SD1.5/v1-5-pruned-emaonly.ckpt）。

点击 Run（或者按下快捷键 Ctrl + Enter）。

💡 本地 CPU 模式的心理预期与调试技巧
由于 CPU 缺乏专门针对张量矩阵的并行加速硬件，你在本地通流程时需要注意以下几点：

速度会非常慢： 同样是生成一张 512x512 的 Stable Diffusion 1.5 图片，RTX 5070 可能只需要 0.5 秒 到 1 秒，但纯 CPU 运行可能需要 2 到 5 分钟。

如何极速测试： 为了避免坐着苦等，请在画布上找到 KSampler（K采样器） 节点：

把 steps（步数） 从默认的 20 步或 30 步，改成 3 步或 5 步。

虽然几步生成的图片会像一团马赛克、毫无美感，但你的核心目的是“验证工作流的所有节点连接正确、没有断路、数据流能顺利走到最后的 Save Image 节点”。步数改小可以让你在十几秒内完成一次完整的闭环测试。

等你在本地把这套自定义节点、模型路径和连线逻辑全部调通后，直接把整个工作流保存为 JSON，扔到那台带有 RTX 5070 的正式机器上，一键就能全速起飞了！
