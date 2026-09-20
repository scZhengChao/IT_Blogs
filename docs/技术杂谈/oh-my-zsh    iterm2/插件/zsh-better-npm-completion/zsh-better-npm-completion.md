# zsh-better-npm-completion

## 目录

- [效果展示](#效果展示)
- [安装](#安装)

##### 效果展示

输入`npm run`然后按下`tab`，就可以自动弹出项目中的所有`scripts`，然后可以使用`tab`切换选择，也可以使用`ctrl + n`向下，`ctrl + p`向上切换选择，然后回车就可以执行了

![](https://i-blog.csdnimg.cn/blog_migrate/1ddf237d16f3a5851045ed1aed528679.png)

##### 安装

clone 插件代码到 zsh 插件目录下

```bash 
git clone https://github.com/lukechilds/zsh-better-npm-completion ~/.oh-my-zsh/custom/plugins/zsh-better-npm-completion

```


然后编辑`.zshrc`增加该插件

```bash 
plugins=( 
    # other plugins...
    zsh-better-npm-completion
)
```
