# File

## 目录

- [什么是File](#什么是File)
- [怎么使用](#怎么使用)
  - [绝对路径和相对路径](#绝对路径和相对路径)
- [常用api](#常用api)
  - [创建](#创建)
  - [删除](#删除)
  - [判断](#判断)
  - [获取](#获取)
  - [高级功能](#高级功能)

# 什么是File

java.io.File 类是**文件和目录路径**名的抽象表示形式，主要用于**文件和目录**的创建、查找和删除等操作。

> 描述计算机上`磁盘文件`和`磁盘目录`的

- 文件和目录都使用File类来表示
- 文件和目录都使用路径来表示
  - 例如：code目录用路径表示    D:\abc\code
  - 美女.jpg文件用路径表示   D:\abc\美女.jpg
- 注意：路径是唯一的，同一台计算机中不可能存在有两个不同的文件但路径又相同。

最终的目的还是配合`IO`流使用；

# 怎么使用

```java 
public file(String path){
// 文件对象
  File file = new File("/Users/zhengchao/2023 8月版黑马JAVA线下就业班/02阶段：JavaSE进阶/day10 字节流/09_File类概述和创建_ev.mp4")
  
  // 目录对象
  File dir = new File("/Users/zhengchao/2023 8月版黑马JAVA线下就业班/02阶段：JavaSE进阶/day10 字节流")
}

 


public file(String parent,String child){
  File file = new File("/Users/zhengchao/2023 8月版黑马JAVA线下就业班","02阶段：JavaSE进阶/day10 字节流/09_File类概述和创建_ev.mp4" )
}
```


File：它是文件和目录路径名的抽象表示

- 文件和目录可以通过File封装成对象
- File封装的对象仅仅是**一个路径名**。**它可以是存在的，也可以是不存在的**。

![](./image/image_-rJATi0_6c.png)

![](./image/image_ltklJGNhjb.png)

## 绝对路径和相对路径

绝对路径：从盘符开始

`File file1 = new File(“D:\\itheima\\a.txt”); `

相对路径：相对当前项目下的路径

`File file2 = new File(“a.txt”);File file3 = new File(“模块名\\a.txt”); `

```java 
package com.file;

import java.io.File;

public class Test1 {
    public static void main(String[] args) {
        File file = new File("src/file/Test1.java");
        System.out.println(file);
        System.out.println(file.getAbsoluteFile());
    }
}

```


# 常用api

### 创建

![](./image/image_AuW39EGt8c.png)

```java 
package com.file;

import java.io.File;
import java.io.IOException;

public class Test2 {
    public static void main(String[] args) {
        File f = new File("files/test.txt");
        try {
            f.createNewFile();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        File dir = new File("files/home");
        dir.mkdirs(); //父级目录不存在；会先创建当前目录；在创建父级目录
        dir.mkdir(); // 要求父级目录必须存在
    }
} 

```


### 删除

![](./image/image_V1RXTboSbj.png)

`public boolean delete()`

- 不走回收站；直接删除
- 删除文件；直接删除
- 删除文件夹；必须先删除文件；

### 判断

![](./image/image_u1h8vrOpoG.png)

```java 
package com.file;

import java.io.File;

public class Test3 {
    public static void main(String[] args) {
        File f = new File("files/test.txt");

        // 判断文件是否存在
        boolean b = f.exists();
        boolean b1 = f.isFile();
        boolean b2 = f.isDirectory();
    }
}

```


### 获取

```java 
 // 绝对路径
String path = f.getAbsolutePath();
// 获取文件名
String name = f.getName();
// new 的是什么；拿的就是什么
String originPath = f.getPath();
```


## 高级功能

![](./image/image_2rvHIj4iRO.png)

```java 

```


listFiles方法注意事项：

- 当调用者不存在时，返回`null`
- 当调用者是一个文件时，返回`null`
- 当调用者是一个空文件夹时，返回一个长度为`0`的数组
- 当调用者是一个有内容的文件夹时，将里面所有文件和文件夹的路径放在File数组中返回
- 当调用者是一个有隐藏文件的文件夹时，将里面所有文件和文件夹的路径放在File数组中返回，包含隐藏内容
- 注意；他不会递归循环**文件夹下面的文件夹下面**的文件；

```java 
package com.file;

import java.io.File;

public class Test4 {
    public static void main(String[] args) {
        try {
            method();
        }catch (RuntimeException e){
            e.printStackTrace();
        }
    }
    public static void method(){
        File file = new File("files");
        boolean flag = file.exists();
        if(!flag){
            throw  new RuntimeException("目录不存在");
        }
        if(file.isDirectory()){
            File[] list = file.listFiles();
            for (File file1 : list) {
                System.out.println(file1);
            }
        }
    }
}

```
