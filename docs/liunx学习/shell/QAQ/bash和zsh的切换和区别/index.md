# bash和zsh的切换和区别

## 目录

- [mac刷新zshrc环境变量](#mac刷新zshrc环境变量)

一句话，二者均是shell的一种，zsh能基本完美兼容bash的命令，并且使用起来更加优雅。由于bash或zsh本质上都是解释器，他们所共同服务的是shell语言，因此在命令语法上基本相同，部分兼容性差异可参考：zsh和bash的兼容性差异。
二者切换：

```html 
切换bash：  chsh -s /bin/bash 
切换zsh： chsh -s /bin/zsh
在终端app的系统偏好设置里手动设置。

```


当从bash切换为zsh时，如果不想重新配置一遍.zshrc文件，可以在.zshrc文件中加上`source ~/.bash_profile`，从而直接从.bash\_profile文件读取配置。

- 注意：退出终端后重启才能生效；
- 切换完记得刷新环境变量

### mac刷新zshrc环境变量

```bash 
source ~/.zshrc


```
