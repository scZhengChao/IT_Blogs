# 代理

> mac 使用clashx 让iterm 使用代理

```bash 
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890


```


如果你开启了代理但使用[Homebrew](https://so.csdn.net/so/search?q=Homebrew\&spm=1001.2101.3001.7020 "Homebrew")下载时仍然速度很慢，可能的原因是未在[iTerm2](https://so.csdn.net/so/search?q=iTerm2\&spm=1001.2101.3001.7020 "iTerm2")钟使用`SOCKS`代理

解决方法：

macOS中的**clash的Mixed proxy port设置为7890，可以同时作为HTTP和SOCKS 5代理。**

**1. 设置 SOCKS5 代理**： 你可以通过`Mixed proxy port`来配置 SOCKS5 代理。打开 iTerm2，在终端中输入以下命令：

```bash 
export ALL_PROXY=socks5://127.0.0.1:7890

```


**2. 验证代理是否生效**： 你可以使用`curl`来验证代理是否正常工作：

```bash 
curl ipinfo.io
```


**如果返回的 IP 地址与 Clash 出口节点的 IP 一致，则代理已经正确应用。**

关闭终端窗口后代理失效；

**3. 设置为持久代理**： **如果你希望每次打开 iTerm2 都自动设置代理，** 可以将上面的`export`命令添加到你的 shell 配置文件中：

对于`zsh`（macOS 默认的 shell），你可以编辑`~/.zshrc`：

然后在文件末尾添加

```bash 
export ALL_PROXY=socks5://127.0.0.1:7890

```


保存文件后，运行以下命令使配置生效：

```bash 
source ~/.zshrc

```
