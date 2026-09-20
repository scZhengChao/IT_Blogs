# you-should-use

## 目录

- [效果展示](#效果展示)
- [安装](#安装)

插件地址：[https://github.com/MichaelAquilina/zsh-you-should-use](https://github.com/MichaelAquilina/zsh-you-should-use "https://github.com/MichaelAquilina/zsh-you-should-use")

##### 效果展示

当你日常输入命令时，会自动给出更好的方式，比如：我想回到上次的目录，我使用了`cd -`，它就建议我直接使用`-`，也可以达到同样的目的

![](https://i-blog.csdnimg.cn/blog_migrate/bfdfcef1433f763ee7c475ea0312286b.png)

##### 安装

clone 插件到 zsh 插件目录

```bash 
git clone https://github.com/MichaelAquilina/zsh-you-should-use.git $ZSH_CUSTOM/plugins/you-should-use

```


修改`.zshrc`配置，增加该插件

```bash 
plugins=( 
    # other plugins...
    you-should-use
)

```
