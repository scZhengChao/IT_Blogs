# cls列表美化插件 colorls

使用colorls之前必须先安装字体[**NerdFonts**](https://github.com/ryanoasis/nerd-fonts#option-4-homebrew-fonts "NerdFonts")

1. nerd-fonts 需要用 git 先克隆到本地，再用脚本安装。官方的 git 下载比较慢，建议挂梯子后再进行 clone，整个包有接近 1G。

```markdown 

git clone https://github.com/ryanoasis/nerd-fonts.git --depth 1
cd nerd-fonts 
./install.sh

// 最后可以删除
rm -rf nerd-fonts

```


安装完后，终端**客户端需要选择名字带 nerd fonts 的字体。**

安装ruby

```bash 
brew install ruby

```


配置ruby

```markdown 
# 编辑配置文件
vim/open ~/.zshrc

# 文件最后加一行
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"

# 退出编辑后执行使配置生效
source ~/.zshrc

```


安装colorls

```bash 
sudo gem install colorls -n /usr/local/bin

```


配置colorls

```bash 
# 编辑配置文件
vim/open ~/.zshrc

# 文件最后加
source $(dirname $(gem which colorls))/tab_complete.sh
alias ll='colorls -lA --sd --gs --group-directories-first'
alias ls='colorls --group-directories-first'
alias lc='colorls'
alias l='colorls -l --sort-dirs'
alias la='colorls -la --sort-dirs' 
alias lt='colorls -lt  --git-status'
alias lS='colorls -lS  --git-status' 
alias lr='colorls --tree=5'
alias lx='colorls -lAX --git-status'

# 退出编辑后执行使配置生效
source ~/.zshrc

```


> 如果找不到 colorls; 要么是gem 环境变量的问题；要么就是rvm 的问题；

![](image_xl8tpOFSCa.png)
