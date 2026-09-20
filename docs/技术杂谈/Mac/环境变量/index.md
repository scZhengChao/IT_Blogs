# 环境变量

## 目录

- [环境变量](#环境变量)
- [最新MAC 查看和设置环境变量](#最新MAC-查看和设置环境变量)
  - [查看](#查看)
  - [修改环境变量](#修改环境变量)
  - [编辑bash\_profile 新增变量](#编辑bash_profile-新增变量)

# 环境变量

环境变量是电脑操作系统中常用的一些变量，作用类似于将一些常用命令所在的文件夹位置预先告诉操作系统，当以后需要用到这些命令时，操作系统就自动来这些位置取。

# 最新MAC 查看和设置环境变量

### 查看

```javascript 
echo $PATH

```


### 修改环境变量

```javascript 
open ~/.bash_profile

```


### 编辑bash\_profile 新增变量

```javascript 
export PATH=/Users/yd-sz-dn0588/flutter/bin:$PATH
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn

```


保存后，在终端 执行 `source ~/.bash_profile `命令，马上刷新当前终端窗口生效环境变量

> **注意**: 如果你使用终端是zsh，终端启动时 `~/.bash_profile` 将不会被加载，解决办法就是修改 `～/.zshrc` ，在其中添加：`source ～/.bash_profile`
