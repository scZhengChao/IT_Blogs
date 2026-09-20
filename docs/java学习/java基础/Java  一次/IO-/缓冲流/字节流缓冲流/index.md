# 字节流缓冲流

## 目录

- [为什么快](#为什么快)

**高效流；效率高；大文件读写**

**基础流只有两**个：字符流；字节流

字节缓冲流：

- `BufferedOutputStream`：缓冲输出流&#x20;
- `BufferedInputStream`：缓冲输入流

构造方法：

- 字节缓冲输出流：`BufferedOutputStream​(OutputStream out)`
- 字节缓冲输入流：`BufferedInputStream​(InputStream in)`

为什么构造方法需要的是字节流，而不是具体的文件或者路径呢？
**字节缓冲流仅仅提供缓冲区**，而真正**的读写数据还**得依靠基本**的字节流对象**进行操作

```java 
package com.copy;

import java.io.*;

public class copyFile3 {
    public static void main(String[] args) {
        String inputPath = "files/home/img1.png";
        String outputPath = "files/img1.png";

        long beginTime = System.currentTimeMillis();
        copy(inputPath,outputPath);
        long endTime = System.currentTimeMillis();
        System.out.println("copy花费时间"+(endTime-beginTime)+"ms");
    }
    public static void copy(String inputPath,String outputPath ){
        try (
                BufferedInputStream fis = new BufferedInputStream(new FileInputStream(inputPath));
                BufferedOutputStream fos = new BufferedOutputStream(new FileOutputStream(outputPath,true));
        ){
            byte[] buf = new byte[1024];
            int len = -1;
            while ((len = fis.read(buf)) != -1){
                fos.write(buf,0,len);
            }
        }catch (IOException e){
            e.printStackTrace();
        }
    }
}

```


# 为什么快

![](./assets/image/image_fmBZvDRWCI.png)
