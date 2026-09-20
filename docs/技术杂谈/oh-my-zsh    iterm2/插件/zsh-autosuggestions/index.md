# 历史命令提示插件 zsh-autosuggestions

强推的，加快开发速度，敲命令可以看到历史的命令提示，然后按下键盘`command + ->`则自动补全

安装

```bash 
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions

```


配置

```markdown 
# 编辑配置文件
vim/open ~/.zshrc

# 找到plugins配置，在括号内增加zsh-autosuggestions,与其他插件之间使用空格分隔开
plugins=(zsh-autosuggestions)

# 退出编辑后执行使配置生效
source ~/.zshrc

```
