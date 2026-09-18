# 环境变量

## 目录

- [macOS 下环境变量的配置文件](#macOS-下环境变量的配置文件)
  - [解决环境变量在 zsh shell 无效的问题](#解决环境变量在-zsh-shell-无效的问题)
- [查看 macOS 全部环境变量](#查看-macOS-全部环境变量)
- [设置系统环境变量](#设置系统环境变量)
- [设置用户环境变量](#设置用户环境变量)
- [新增](#新增)
- [删除环境变量](#删除环境变量)
- [查看环境变量](#查看环境变量)

[ macOS下配置环境变量/查看环境变量\_mac查看环境变量-CSDN博客 文章浏览阅读5.1w次，点赞28次，收藏100次。Mac OS 的配置文件清单a. /etc/profile  b. /etc/paths c. \~/.bash\_profile d. \~/.bash\_login e. \~/.profile f. \~/.bashrc 终端如何查看java的安装目录？输入命令：/usr/libexec/java\_home -V如何查看java的版本信息？输入命令：ja https://blog.csdn.net/liaowenxiong/article/details/112180532](https://blog.csdn.net/liaowenxiong/article/details/112180532 " macOS下配置环境变量/查看环境变量_mac查看环境变量-CSDN博客 文章浏览阅读5.1w次，点赞28次，收藏100次。Mac OS 的配置文件清单a. /etc/profile  b. /etc/paths c. ~/.bash_profile d. ~/.bash_login e. ~/.profile f. ~/.bashrc 终端如何查看java的安装目录？输入命令：/usr/libexec/java_home -V如何查看java的版本信息？输入命令：ja https://blog.csdn.net/liaowenxiong/article/details/112180532")

## macOS 下环境变量的配置文件

```javascript 
a. /etc/paths 
b. /etc/profile  
c. ~/.bash_profile 
d. ~/.bash_login 
e. ~/.profile 
f. ~/.bashrc 

```


/etc/profile 和 /etc/paths 是系统级别的配置文件，后面几个是用户级的配置文件。

文件加载顺序：
系统启动时会按上面罗列的配置文件从上到下的顺序加载。但是，**如果 \~/.bash\_profile 文件存在，那么 \~/.bash\_login、\~/.profile、\~/.bashrc 会被忽略**，如果不存在 \~/.bash\_profile 文件，才会按顺序读取后面的文件。另外，\~/.bashrc 文件又比较特殊，这个文件是在 bash shell 打开时才加载的，并不是系统启动后就加载的。

### 解决环境变量在 zsh shell 无效的问题

以上的配置文件在 bash shell 环境下才有效，在 zsh shell 环境下无效。如果希望在 zsh shell 下可以使用上述配置文件中的环境变量，可以在 \~/.zshenv 或者 \~/.zshrc 文件中添加下面的命令语句：

```javascript 
source /etc/profile 
source ~/.bash_profile

```


打开 zsh shell 时会顺序加载 \~/.zshenv、\~/.zshrc 文件，添加上面两条命令语句，则表示加载 \~/.zshenv 或 \~/.zshrc 时会去调用外部脚本文件 /etc/profile 和 \~/.bash\_profiel，且被调用的脚本运行结束后，所拥有的环境变量和声明变量会被当前 zsh shell 保留，类似将调用脚本的内容复制过来直接执行，执行完毕后原主 shell 继续运行。所以通过这样的方式就可以使用在 bash shell 环境下配置的环境变量了。

当然你也可以直接将相关的环境变量配置在 \~/.zshrc 文件中，但是显然是多余而且繁琐了，每次你要新增一个环境变量的时候，你都要在 bash shell 有关的配置文件中添加，又要在 zsh shell 有关的配置文件中添加，显然是不合适的。而如果每次加载 \~/.zshrc 文件时会自动调用 bash shell 有关的配置文件，那么所有的环境变量只要在 bash shell 有关的配置文件中添加就可以了

## 查看 macOS 全部环境变量

输入命令 `export`，查看全部的环境变量：

```javascript 
[~]$ export
AUTOJUMP_ERROR_PATH=/Users/liaowenxiong/Library/autojump/errors.log
AUTOJUMP_SOURCED=1
HOME=/Users/liaowenxiong
HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_261.jdk/Contents/Home
LANG=zh_CN.UTF-8
LESS=-R
LOGNAME=liaowenxiong
LSCOLORS=Gxfxcxdxbxegedabagacad
NEXUS_HOME=/Users/liaowenxiong/Applications/nexus-3.20.1-01-mac/nexus-latest
OLDPWD=/Users/liaowenxiong
...

```


## 设置系统环境变量

系统环境变量在 `/etc/profile` 文件中配置，编辑该文件需要 root 权限：

```javascript 
sudo vim /etc/profile

```


新增环境变量 JAVA\_HOME、CLASS\_PATH，内容如下：

```javascript 
JAVA_HOME="/Library/Java/JavaVirtualMachines/jdk1.8.0_131.jdk/Contents/Home"

export JAVA_HOME

CLASS_PATH="$JAVA_HOME/lib"

PATH=".:.$PATH:$JAVA_HOME/bin"

```


上面的脚本内容解读：
声明定义了一个环境变量 JAVA\_HOME，变量的值是 /Library/Java/JavaVirtualMachines/jdk1.8.0\_131.jdk/Contents/Home，并且将该变量声明成可以输出，即可以复制给子进程。

声明定义了环境变量 CLASS\_PATH，变量的值是 $JAVA_HOME/lib，$JAVA\_HOME 变量取值 /Library/Java/JavaVirtualMachines/jdk1.8.0\_131.jdk/Contents/Home，所以最终 CLASS\_PATH 变量的取值是 /Library/Java/JavaVirtualMachines/jdk1.8.0\_131.jdk/Contents/Home/lib。

声明定义了环境变量 PATH，变量的值是 .:.$PATH:$JAVA\_HOME/bin，\$PATH 的值来自于配置文件 /etc/paths 中，说明创建一个新进程时，首先加载的文件应该是 /etc/paths，最终变量 PATH 的值是 .:./usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/Apple/usr/bin:/Library/Java/JavaVirtualMachines/jdk1.8.0\_261.jdk/Contents/Home/bin

要想马上生效，输入下面的命令：

```javascript 
source /etc/profile

```


查看环境变量 JAVA\_HOME 的值：

```javascript 
echo $JAVA_HOME
echo $PATH
```


## 设置用户环境变量

用户环境变量可以在 `~/.bash_profile` 文件内配置。

你可以在命令终端使用 vim 编辑文件：

```javascript 
vim ~/.bash_profile

```


你也可以使用 macOS 内置的编辑器打开文件，在命令终端输入：

```javascript 
open -e ~/.bash_profile

```


如果不存在 \~/.bash\_profile 文件，这需要自己创建该文件，在终端输入：

```javascript 
touch ~/.bash_profile

```


文件创建好之后再打开文件编辑内容。

配置内容可以按这样的格式写：

```javascript 
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_40.jdk/Contents/Home
PATH=$JAVA_HOME/bin:$PATH:.
CLASSPATH=$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:.
export JAVA_HOME
export PATH
export CLASSPATH

```


也可以是这样的格式写：

```javascript 
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-11.0.2.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH
export ANDROID_HOME=/Library/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools/
export PATH=$PATH:/usr/local/bin:/usr/local/sbin:${PATH}

```


最后在命令终端输入 source \~/.bash\_profile 使配置立即生效，这个时候我们就可以使用命令echo \$PATH或者 echo \$JAVA\_HOME 查看变量的内容。

# 新增

```javascript 
export http_proxy=http://127.0.0.1:8123/
```


# 删除环境变量

```javascript 
unset http_proxy
```


# 查看环境变量

```javascript 
env
```
