# 逻辑类

## 目录

- [if](#if)
  - [一、if的基本语法:](#一if的基本语法)
  - [场景](#场景)
- [case](#case)

# if

[https://blog.csdn.net/zhan570556752/article/details/80399154](https://blog.csdn.net/zhan570556752/article/details/80399154 "https://blog.csdn.net/zhan570556752/article/details/80399154")

## 一、if的基本语法:

if \[ command ];then

   符合该条件执行的语句

elif \[ command ];then

   符合该条件执行的语句

else

   符合该条件执行的语句

fi

## **场景**

判断文件是否存在

if \[ -f "/data/filename" ];then

  echo "文件存在"

else

  echo "文件不存在"

fi

文件夹不存在则创建

if \[ ! -d "/data" ];then

  mkdir /data

else

rm -rf /data

  echo "文件夹已经存在"

fi

# case

```bash 
#!/bin/bash
#判断用户输入
read -p "Please choose yes/no: " -t 30 cho
#在屏幕上输出"请选择yes/no"，然后把用户选择赋予变量cho
case $cho in. #判断变量cho的值
    #如果是yes. #则执行程序1
    "yes")  echo "Your choose is yes!"  ;;
    #如果是no.  #则执行程序2
    "no")  echo "Your choose is no!"   ;;
    #如果既不是yes,也不是no.   #则执行此程序
    *). echo "Your choose is error!"   ;;
esac

```
