# 字符缓冲流

## 目录

- [copy](#copy)
- [特有功能](#特有功能)

字符缓冲流：

- `BufferedWriter`：可以将数据高效的写出
- `BufferedReader`：可以将数据高效的读入到内存

注意 :  **字符缓冲流不具备读写功能 , 只提供缓冲**区 , 真正读写还是需要依赖于**构造接收的基本的字符流**

构造方法：

- `BufferedWriter​(Writer out)`
- `BufferedReader​(Reader in)`

# copy

```java 
package com.China;

import java.io.*;

import static java.util.Collections.copy;

public class BuferredWriter {
    public static void main(String[] args) throws IOException {

        String src = "files/write.txt";
        String path = "files/copy.txt";
        copy(src,path);
    }

    private static void copy(String src, String path) {
        try(
                BufferedReader br = new BufferedReader(new FileReader(src));
                BufferedWriter bw = new BufferedWriter(new FileWriter( path,true));
        ){
            char[] chars = new char[1024]; 
            int len = -1;
            while ((len = br.read(chars)) != -1){
                bw.write(chars,0,len);
            }
        }catch (IOException e){
            e.printStackTrace();
        }
    }
} 

```


# 特有功能

BufferedWriter：

- void newLine​()：写一个行分隔符，会**根据操作系统的不同,写入不同的行分隔符**换行符；兼容不同平台

BufferedReader：

- public String `readLine`​() ：读取\*\*文件一行数据, 不包含换行符号 ,  读到文件的末尾返回null \*\* （/r/n ）

```java 
package com.China;

import java.io.*;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CharBufferredString {
    public static void main(String[] args) throws IOException {
        // 创建字符输入缓冲流
        BufferedReader br = new BufferedReader(new FileReader("files/home/demo1.txt"));


        // 读取一行数据
        String s = br.readLine();
        BufferedWriter bw = new BufferedWriter(new FileWriter("files/home/demo2.txt", true));

        String[] s1 = s.split(" ");
         Stream<String> ss = Stream.of(s1);
        List<Integer> list = ss.map(str -> Integer.parseInt(str)).sorted().collect(Collectors.toList());
        String s3 = list.toString();
        s3 = s3.substring(1,s3.length()-1).replace(","," ");

        bw.write(s3);
        bw.close();
        br.close();
    }
}

```
