# Emscripten(c++）

> 官网

[   https://emscripten.org/docs/getting\_started/downloads.html](https://emscripten.org/docs/getting_started/downloads.html "   https://emscripten.org/docs/getting_started/downloads.html")

首先我们需要用到 Emscripten。Emscripten 是一个编译器工具链，使用[LLVM](https://zhida.zhihu.com/search?content_id=231563431\&content_type=Article\&match_order=1\&q=LLVM\&zhida_source=entity "LLVM")去编译出 wasm。

先安装 Emscripten SDK。

我选择官网推荐的方式进行安装。西瓜哥我用的系统是 MacOS.

```markdown 
# 拉取仓库
git clone https://github.com/emscripten-core/emsdk.git

# 进入目录
cd emsdk

# 下载最新 SDK 工具
./emsdk install latest

# 版本设置为最新
./emsdk activate latest

# 将相关命令行工具加入到 PATH 环境变量中（临时）
source ./emsdk_env.sh

```


> 下载那里我一开始失败了几次，后来用了程序员都懂的那个东西才下载成功。

看看是不是成功安装了。

```bash 
emcc -v

```


如果正确输出版本相关信息，就是安装成功了。

需要注意的是，每次打开新的终端，都要执行一下`source ./emsdk_env.sh`去临时更新 PATH 变量。

如果不想每次都要执行这玩意，可以在 .zshrc（或 .bashrc）中加上：

```markdown 
# 需使用 emsdk_env.sh 文件的绝对路径
source  /Users/zhengchao/workSpace/emsdk-main/emsdk_env.sh &> /dev/null

```


[Hello World](<IT/前端工程/wasm/Emscripten(c++）/Hello World/Hello World.md> "Hello World")

[HTML 模板](<./HTML 模板/index.md> "HTML 模板")

[文件系统](./文件系统/index.md "文件系统")

[代码优化](./代码优化/index.md "代码优化")
