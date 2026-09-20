# 磁盘管理

## 目录

- [1. cd](#1-cd)
- [3. pwd](#3-pwd)
- [4. ls](#4-ls)

### 1. cd

cd 命令用于切换当前工作目录，需要与文件/目录名称一起使用：

![](./assets/image/image_AA_krYF42I.png)

这里的目录/文件名称可以是一个绝对路径或者相对路径。若目录名称省略，则变换至使用者的 home 目录 (也就是刚 login 时所在的目录)。另外，**\~ 表示为 home 目录， . 表示目前所在的目录， .. 表示目前目录位置的上一层目录。**

![](./assets/image/image_9RjnPy_w_i.png)

- cd   \~/.ssh  无论层级 查找 .ssh 结尾的文件  （不是无论层级，\~ 是指用户目录）
- command + shift + .  显示和隐藏  .为前缀的文件&#x20;
- Cd -     返回到上一次的工作目录

### 3. pwd

pwd 命令用来查看当前文件（文件夹）在文件系统中的绝对路径。

**命令以绝对路径的方式显示用户当前工作目录**

```bash 
pwd

/Users/mac/Desktop/函数式编程

```


### 4. ls

ls 命令用**来展示指定工作目录下之内容，会列出**目前工作目录所含之文件及子目录。

```bash 
# ls

FZLanTYJ_Bold.OTF FZLanTYJ_Heavy.OTF FZLanTYJ_Medium.OTF
FZLanTYJ_DemiBold.OTF FZLanTYJ_Light.OTF FZLanTYJ_Regular.ttf

```


我们还可以给ls命令添加参数，例如：

- ls -l
- ls -a
- ls -L 查看软连接
- ls -t 按时间进行文件的排序
- ls -R 将目录下所有的子目录都列出来

`ls -l`  命令会以长列表的形式来输出所有内容，使用该命令时，终端会输出**所有文件的更多信息**，比如权限、文件所有者、文件大小、日期等：

![](./assets/image/image_EkuL_lPkwH.png)

`ls -a` 命令会列举出文件夹/目录中所有的文件，**包括隐藏文件：**

![](./assets/image/image_Q12DluBTKn.png)

我们还可以将两个参数放在一起使用，输出的结果将是两个参数分别执行时的效果和：

![](./assets/image/image_pfVFeaaTkV.png)

可以看到，输出的结果中包含了常规文件和隐藏文件的附加信息。

ls -L 查看软连接
ls -t 按时间进行文件的排序
ls -R 将目录下所有的子目录都列出来
