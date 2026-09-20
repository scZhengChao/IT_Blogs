# 案例

## 目录

- [例子](#例子)
- [写入多个对象](#写入多个对象)

# 例子

```java title="Input"
package com.Object;

import java.io.*;

public class Demo2 {
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream("files/user.txt"));
        User user =(User) ois.readObject();
        ois.close();
        System.out.println(user.getAge());
    }
}

```


```java title="input"
package com.Object;

import java.io.*;

public class Demo1 {
    public static void main(String[] args) throws IOException {
        // 创建序列化流
//        ObjectInputStream ois = new ObjectInputStream( new FileInputStream("files/test.txt"));
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("files/user.txt"));
        User user = new User();
        user.setAge(23);
        user.setName("asfa");

        oos.writeObject(user);
        oos.close();

    }
}


```


```java title="user"
package com.Object;

import javax.sound.midi.Synthesizer;
import java.io.Serializable;

// 当前列需要序列化或者反序列化；必须实现这个接口
public class User implements Serializable {
    private String name ;
    private Integer age;
    public User(){

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}

```


# 写入多个对象

> 把对象存储在集合；在把集合写入磁盘

> 要求存储的元素也必须要实现Serializable 接口

```java 
package com.Object;

import java.io.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Demo1 {
    public static void main(String[] args) throws IOException {
        // 创建序列化流
//        ObjectInputStream ois = new ObjectInputStream( new FileInputStream("files/test.txt"));
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("files/user.txt"));
        User user = new User();
        user.setAge(23);
        user.setName("asfa");

        User user2 = new User();

        List<User> arr = new ArrayList<>();


        // 要 求存储的元素也必须要实现Serializable 接口 
        Collections.addAll(arr,user,user2);

        oos.writeObject(arr);
        oos.close();

    }
}
```


```java 
package com.Object;

import java.io.*;
import java.util.List;

public class Demo2 {
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream("files/user.txt"));
        List<User> userList  =(List<User>) ois.readObject();
        ois.close();
        for (User  user : userList) { 
            System.out.println(user.getName()+"  "+"asasf");
        }
    }
}

```
