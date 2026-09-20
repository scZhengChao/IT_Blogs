# 常用脚本

## 目录

- [万能解压](#万能解压)

# 万能解压

Linux下，压缩包的格式有很多种，在命令行下进行解压，解压不同的压缩包，需要执行不同的命令及参数，我们往往记不住那么多命令。我们可以写一个万能的解压命令，来替代这些繁多的解压命令，这样我们只需要记住一条命令就可以了。

```bash 
#copy from https://ynome.wordpress.com/2013/04/14/linux-%E9%80%9A%E7%94%A8%E8%A7%A3%E5%8E%8B/
#在用户目录创建一个.autoex.sh脚本
ex () {
        if [[ -z “$1” ]] ; then
               print -P “usage: \e[1;36mex\e[1;0m < filename >”
               print -P ”       Extract the file specified based on the extension”
        elif [[ -f $1 ]] ; then
           case $1 in
             *.tar)       tar xvf  $1    ;;
             *.tbz2)      tar xvf  $1    ;;
             *.tgz)       tar xvf  $1    ;;
             *.tar.bz2)   tar xvf  $1    ;;
             *.tar.gz)    tar xvf  $1    ;;
             *.tar.xz)    tar xvf  $1    ;;
             *.tar.Z)     tar xvf  $1    ;;
             *.bz2)       bunzip2v $1    ;;
             *.rar)       rar x $1       ;;
             *.gz)        gunzip $1      ;;
             *.zip)       unzip $1       ;;
             *.Z)         uncompress $1  ;;
             *.xz)        xz -d $1       ;;
             *.lzo)       lzo -dv $1     ;;
             *.7z)        7z x $1        ;;
             *)           echo "'$1' cannot be extracted via extract()" ;;
           esac
       else
         echo “‘$1’ is not a valid file”
       fi
    }
```


修改.bashrc文件

```bash 
if [ -f ~/.autoex.sh ]; then
     . ~/.autoex.sh
fi

```


使之生效

```bash 
source ~/.bashrc
```


解压测试

```bash 
ex file
```
