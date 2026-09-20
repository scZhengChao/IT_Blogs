# FileUtils类：

- 针对**File对象**进行读写操作（单文件vs单文件 、 目录vs目录）

```java 
public static void copyFileToDirectory(final File srcFile, final File destFile): 
    复制文件到另外一个目录下。
public static void copyDirectoryToDirectory(File src , File dest ):
    复制src目录到dest位置。

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
