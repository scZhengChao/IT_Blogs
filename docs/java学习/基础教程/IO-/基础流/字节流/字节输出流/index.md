# 字节输出流

## 目录

- [创建](#创建)
- [操作](#操作)
- [关闭](#关闭)
- [追加写入](#追加写入)

`InputStream`

`FileInputStream`

> 以字节为单位；把内存中的数据写到磁盘中

# 创建

> 注意事项：
> &#x20;      如果文件不存在，就创建。
> &#x20;      如果文件存在就清空。

- 实例化不同的io流类&#x20;

# 操作

> 注意事项：
> &#x20;      写出的整数，实际写出的是整数在码表上对应的字符。

- read
- write

![](./assets/image/image_ukKpbb9v2Q.png)

```java title="OutputStreamDemo1"
package com.os;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

public class OutputStreamDemo1 {
    public static void main(String[] args) throws IOException {

        OutputStream out = null;
        // 创建一个文件；不存在就创建；存在就清空；
            out = new FileOutputStream("files/test.txt");
            out.write('a');
            out.close();
     }
}

```


```java title="OutputStreamDemo2"
package com.os;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class OutputStreamDemo2  {
    public static void main(String[] args) throws  IOException {
        FileOutputStream fs = new FileOutputStream("files/txt.txt");
        byte[] buf = "前端程序元".getBytes();
        fs.write(buf,0,6 ); // 部分数据
        fs.close();
    }
}

```


# 关闭

> 注意事项：
> &#x20;      每次使用完流必须要释放资源。

- close()

![](./assets/image/image_Po4uul-xj7.png)

# 追加写入

`public FileOutputStream​(String name，boolean append)`

> 创建文件输出流以指定的名称写入文件。如果第二个参数为true ，不会清空文件里面的内容

字节流写数据如何实现换行呢？
写完数据后，加换行符

- windows : \r\n
- linux : \n
- mac : \r

```java 
package com.os;

import java.io.FileOutputStream;
import java.io.IOException;

public class OutputStreamDemo3 {
    public static void main(String[] args) throws IOException {
        FileOutputStream fs = new FileOutputStream("files/test.txt",true);
        fs.write("safasf".getBytes());
        fs.write("\r".getBytes());
        fs.close();
    }
}

```
