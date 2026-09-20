# 打印流

## 目录

- [作用](#作用)
- [类](#类)
- [ 常用方法](#-常用方法)
- [修改System.out](#修改Systemout)

# 作用

- 写入数据自动换行
- 日志记录

# 类

`PrintStream`

```java 
public PrintStream(String path)
```


# &#x20;常用方法

```java 
public void printIn() ;  换行；
public void print() 
```


![](./image/image_gSNGgN17l6.png)

# 修改System.out

```java 

  package com.print;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintStream;

public class Demo1 {
    public static void main(String[] args) throws FileNotFoundException {
        PrintStream ps = new PrintStream("files/pringt.txt");
        ps.print(100);
        ps.println("21.412");
        ps.print(false);
        ps.println();
        System.setOut(ps );
        System.out.println("私用打印流");
    }
}

```
