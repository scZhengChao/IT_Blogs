# 字节输入流

## 目录

- [读数据](#读数据)

> OutputStream （父类；抽象类）

FileOutputStream

创建字节输入流对象。

> 注意事项：
> &#x20;      如果**文件 不存在，就直接报错**。

# 读数据

> 注意事项：
> &#x20;      读出来的是文件中**数据的码表值。 a ⇒ 97**

```java 
package com.os;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class InputStreamDemo1 {
    public static void main(String[] args) throws IOException {
        FileInputStream is = new FileInputStream("files/test.txt");
        char ch = (char) is.read(); // 读取下一个数据; 读不到int 类型就是-1
        System.out.println(ch);
        is.close();
    }
}

```


释放资源

> &#x20;注意事项：
> &#x20;      每次使**用完流必须要释放资源。**
