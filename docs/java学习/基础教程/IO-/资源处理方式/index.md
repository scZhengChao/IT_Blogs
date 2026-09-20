# 资源处理方式

## 目录

- [老方法](#老方法)
- [1.7及以后](#17及以后)

# 老方法

```java 
package com.copy;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class copyFile {
    public static void main(String[] args)  {
        FileInputStream fis=null;
        FileOutputStream fos=null;
        try {
             fis = new FileInputStream("files/home/img1.png");
             fos = new FileOutputStream("files/img1.png");
            int data = 0;
            while ((data = fis.read()) != -1){
                fos.write(data);
            }
        }catch (IOException e){
            e.printStackTrace();
        }finally {
            try {
                fis.close();
                fos.close();
            }catch (IOException e){
                e.printStackTrace();
            }

        }


    }
}

```


# 1.7及以后

![](./assets/image/image_cXb6R5Deh8.png)

```java 
package com.copy;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class copyFile {
    public static void main(String[] args)  {
        try(
            FileInputStream fis = new FileInputStream("files/home/img1.png");
            FileOutputStream fos = new FileOutputStream("files/img1.png");
        ) {
            int data = 0;
            while ((data = fis.read()) != -1){
                fos.write(data);
            }
        }catch (IOException e){
            e.printStackTrace();
        }

    }
}

```


JDK7版本对流的释放做了优化 . 可以使用 `try-with-resource` 语句 , 该语句确保了每个资源在语\*\*句结束时自动关闭。\*\*简单理解 : 使用此语句,会自动释放资源 , 不需要自己在写finally代码块了

> 注意 :
> &#x20;        使用前提 , **资源的类型必须是**`AutoCloseable`接口的实现类  **;才能自动释放**
