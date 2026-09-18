# 序列化

## 目录

- [如何解决](#如何解决)
- [使用](#使用)

> java 存在这样一种空接口；只有接口的定义； **没人任何内容；他只是一个标记接口；**&#x20;

注意 : 如果一个类对象想要被序列化 , 那么此类需要实现`Serializable`接口Serializable接口的含义 :&#x20;   1 是一个标记性接口 , 里面没有任何抽象方法&#x20;   2 只要一个类实现了此接口 , 表示此类的对象可以被序列化

用对象序列化流序列化了一个对象后，假如我**们修改了对象所属的Javabean类**，读取数据会不会出问题呢？

- 会出问题，会抛出`InvalidClassException`异常

> 串行版本不匹配；（`Serializable` 意义就是添加一个串行版本号`serialVersionUID` ；在序列化过程中写入到文件里 ）
> 在读取文件的时候；会匹配和当前的类的串行版本号匹不匹配；&#x20;
> &#x20;只要改了代码；串行版本号就会不匹配

#### 如何解决

```text 
用对象序列化流序列化了一个对象后，假如我们修改了对象所属的Javabean类，读取数据会不会出问题呢？
会出问题，会抛出InvalidClassException异常

 问题分析 :
            serialVersionUID : 序列号
            序列号是根据类的信息进行生成的
            如果没有自己给出序列号 , JVM会根据类的信息自动计算一个序列号
            如果改动了类的信息 , 那么JVM会重新计算一个序列号

            第一步 : 把对象序列化到本地中 , 序列号为 -4446663370728791812 也会存储到本地中
            第二步 : 我们自己修改了类 , 会重新计算一个新的序列号 2908680347500030933
            第三步 : 当把对象读到内存中时 , 本地中的序列号和类中的序列号不一致就会发生 InvalidClassException异常

解决方案 :
            我们 自己手动给出序列号, 不让虚拟机自动生成 , 并且这个值恒久不变 
            private static final long serialVersionUID = 值L;
```


# 使用

如果一个对象中的**某个成员变量的值不想被序列化**，又该如何实现呢？
给该成员变量加`transient`**关键字修饰，该关键字标记的成员变量 不参与序列化过程**

```java 
package com.Object;

import javax.sound.midi.Synthesizer;
import java.io.Serializable;

// 当前列需要序列化或者反序列化；必须实现这个接口
 public class User implements Serializable { 
    private String name ;
    private Integer age;
     public transient String address;
     public User(){

    }
     private final static long serialVersionUID = 12412; 
    public User(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", address='" + address + '\'' +
                '}';
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}


```


> \[User{name='asfa', age=23, address='null'}, User{name='zczc', age=214, address='null'}]
