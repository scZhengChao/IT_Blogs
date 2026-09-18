# 快速新建文件

## 目录

- [通过 Automator 创建服务](#通过-Automator-创建服务)
- [删除自动操作](#删除自动操作)

## 通过 Automator 创建服务

利用 macOS 自带的 Automator，我们可以将「新建文本文件」这一动作添加至 Finder 的「服务」菜单中，便于随时调用。

首先，打开 Automator 并创建一个新文稿，类型选择「服务」。

![](https://cdnfile.sspai.com/2017/11/16/a498ad84fe6f29683c364053e766993b.png?imageView2/2/w/1120/q/90/interlace/1/ignore-error/1/format/webp)

随后，在 Automator 上方将输入类型设置为「没有输入」，并选择应用程序为「Finder」。

![](https://cdnfile.sspai.com/2017/11/16/a7cb381b86c7b17d0eb5e24ae6daf12c.png?imageView2/2/w/1120/q/90/interlace/1/ignore-error/1/format/webp)

接着，从左侧资源库的「实用工具」分类中将「运行 AppleScript」操作拖拽至右侧的动作区，在其中粘贴以下代码并保存。

```python 
on run {input, parameters}

    tell application "Finder"
    set selection to make new file at (get insertion location)
    end tell

    return input
end run


```


![](https://cdnfile.sspai.com/2017/11/16/4d416e8c9c6fed714e4f9a15b4a885df.png?imageView2/2/w/1120/q/90/interlace/1/ignore-error/1/format/webp)

这时，你应该就能在 Finder 的「服务」菜单中找到「新建文本文件」这一操作了。只需要点击运行服务，就可以在当前位置创建一个新文本文件。

![](https://cdnfile.sspai.com/2017/11/16/d2889da4e8ff0d0988d38f119062ee03.gif)

此外，你还可以在「系统偏好设置-键盘-快捷键」中为该操作添加自定义快捷键，让创建文件更简单。

![](https://cdnfile.sspai.com/2017/11/16/f0038fbc4853cec8508c0934eeb027b5.png?imageView2/2/w/1120/q/90/interlace/1/ignore-error/1/format/webp)

如果你比较偏好鼠标操作，可以在最开始时将文稿类型设为「应用程序」，然后将其拖拽至 Finder 的工具栏上，触手可及。

![](https://cdnfile.sspai.com/2017/11/17/768b1e79530f4d56ee1f596805e1c238.gif)

## 删除自动操作

打开`Terminal`，进入如下目录

```bash 
cd   ~/Library/Services

```


![](https://i-blog.csdnimg.cn/blog_migrate/0c82793fe15f01ddab13cc6630c8689e.png#pic_center)

![](https://i-blog.csdnimg.cn/blog_migrate/bf9b6cf60cba2ca8578f3b22a5868be2.png)
