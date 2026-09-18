# IOUtils

IOUtils类：

- 针对**IO流**进行读写操作（单文件vs单文件）

```java 
public static int copy(InputStream in, OutputStream out):
    把input输入流中的内容拷贝到output输出流中，返回拷贝的字节个数(适合文件大小为2GB以下)

public static long copyLarge(InputStream in, OutputStream out):
    把input输入流中的内容拷贝到output输出流中，返回拷贝的字节个数(适合文件大小为2GB以上)
```


```java 
package com.commons;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;

import java.io.*;

public class Demo    {
    public static void main(String[] args) throws IOException {
        InputStream is = new FileInputStream("files/test.txt");
        OutputStream os = new FileOutputStream("files/123.txt");


        IOUtils.copy(is,os);

        File f = new File("files");
        File   ff = new File("files2");

        FileUtils.copyDirectoryToDirectory(f,ff);
    }
}

```
