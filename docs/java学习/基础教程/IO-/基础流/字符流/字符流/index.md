# 字符流

## 目录

- [字符流读取中文的过程  ](#字符流读取中文的过程)
- [字符输出流](#字符输出流)
  - [不写close](#不写close)
- [字符输入流](#字符输入流)

字符流读取中文的过程

**字符流 = 字节流 + 编码表**

基础知识：&#x20;       **不管是在哪张码表中，中文的第一个字节一定是负数。**

> 底层还是**使用字节流**读写数据；但是由于指定编码表，那么就可以一次读2个字节或3个字节；

默认编码表是\*\*`utf-8`\*\*

# 字符输出流

- `Writer`类 : 写入字符流的最顶层的类 , 是**一个抽象类 ,不能实例化**
- 需要使用其子类 &#x20;

FileWriter类 : 用来写入字符文件的便捷类

构造方法 :&#x20;

- `public FileWriter(File file) `: 往指定的File路径中写入数据
- `public FileWriter(String fileName`) : 往指定的String路径中写入数据

![](./assets/image/image_r5QOlTLMLe.png)

```java 
package com.China;

import java.io.FileWriter;
import java.io.IOException;

public class WriteDemo1 {
    public static void main(String[] args) throws IOException {
        FileWriter fs = new FileWriter("files/write.txt",true);
        fs.write("嘿");
        fs.write("\r牛马");
        fs.write("\r程序元",0,3);
        fs.write("\r");
        char[] chr = {'上','海'};
        fs.write(chr,1,1);
        fs.close();
    }
}


```


#### 不写close

> **字符流  = 字节流 + 编码表**

- 内置： 缓冲区；字节数组；

`flush ;刷新流；把缓冲区的数据写入到文件`

![](./assets/image/image_FyqSkfgWY8.png)

# 字符输入流

`Reader`类 : 读取字符流的最顶层的类 , 是\*\*一个抽象类 ,不能实例化\*\*需要使用其子类`FileReader`类  &#x20;

`FileReader`类 : 用来读取字符文件的便捷类

**默认编码表是utf-8**

构造方法 :&#x20;

- `public FileReader(File file)` : 从指定的File路径中读取数据
- &#x20; : 从指定的String路径中读取数据

![](./assets/image/image_Z58MHmIEf-.png)

```java 

package com.China;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class WriteDemo1 {
    public static void main(String[] args) throws IOException {
//        FileWriter fs = new FileWriter("files/write.txt",true);
//        fs.write("嘿");
//        fs.write("\r牛马");
//        fs.write("\r程序元",0,3);
//        fs.write("\r");
//        char[] chr = {'上','海'};
//        fs.write(chr,1,1);
//        fs.close();

        FileReader fr = new FileReader("files/write.txt");
//        int data = fr.read();// 一次性读一个
//        System.out.println((char)data);

        char[] chrs = new char[2];
//        int len = fr.read(chrs);
//        System.out.println(new String(chrs,0,len));
        int len = -1;
        while ((len = fr.read(chrs)) != -1){
             String str = new String(chrs,0,len);
            System.out.println(str);
        }
    }
}
 
```
