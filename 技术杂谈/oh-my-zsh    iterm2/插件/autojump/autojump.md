# autojump

## 目录

- [跳转到包含特定关键词的目录](#跳转到包含特定关键词的目录)
- [跳转到子目录](#跳转到子目录)
- [跳转到最近访问的目录](#跳转到最近访问的目录)
- [查看autojump数据库中的目录](#查看autojump数据库中的目录)

autojump是必装插件没有之一，它可以让你在任意目录之间进行跳转

```bash 
// 安装
brew install autojump

// 使用vim打开.zshrc文件
vim ~/.zshrc

// 添加autojump插件
plugins=(
   autojump
)

// 执行source
source ~/.zshrc

```


当我们使用j + 目录的时候，就会快速的跳转到对应的目录了。 我们在根目录下直接跳转到test文件夹。

效果图：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38bf0801bd7e49858c799c6b4ab82df7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

#### 跳转到包含特定关键词的目录

如果你想跳转到一个之前访问过的目录，只需使用`j`命令加上该目录名称的部分关键词。例如，你之前访问过`/Users/username/Documents/Projects/my_project`目录，现在想快速跳转过去，可以执行：

```bash 
j my_project
```


`autojump`会根据你提供的关键词，在记录中查找最匹配的目录并跳转过去。

#### 跳转到子目录

如果你当前位于`/Users/username/Documents`目录，想跳转到`Projects`子目录下的`my_project`目录，可以使用`jc`命令：

```bash 
jc my_project
```


`jc`命令会在当前目录的子目录中查找匹配的目录并跳转。

#### 跳转到最近访问的目录

如果你想跳转到最近访问过的某个目录，可以使用`jo`命令加上关键词。例如：

```bash 
jo my_project
```


`jo`命令会优先考虑最近访问的目录进行跳转。

#### 查看`autojump`数据库中的目录

如果你想查看`autojump`记录的所有目录，可以使用`j -s`命令：

```bash 
j -s
```


该命令会列出所有记录的目录及其对应的权重，权重越高表示你访问该目录的频率越高。
