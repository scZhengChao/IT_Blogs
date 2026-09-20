反射获取类对象&#x20;
======

## 目录

- [反射的第一步：获取Class类的对象](#反射的第一步获取Class类的对象)
- [获取类对象的三种方法](#获取类对象的三种方法)
  - [forName](#forName)
  - [类名.class](#类名class)
  - [对象.getClass](#对象getClass)
- [应用场景](#应用场景)
- [总结](#总结)

# 反射的第一步：获取Class类的对象

![](./assets/image/image_ZzZ-uBKxIf.png)

![](./assets/image/image_Cqyg7wYVSB.png)

![](./assets/image/image_xnlR7mAwRz.png)

# 获取类对象的三种方法

#### forName

**静态阶段：不要求类存在。即使不存在也不会报错**；

- 在程序运行时动态加载

![](./assets/image/image_WscmtufHC8.png)

#### 类名.class

在方法区中创建了.class 文件的 Class 对象后，就可以使用&#x20;

#### 对象.getClass

**运行时阶段**；在创建了具体的对象后

# 应用场景

```java 
package com.itheima.reflect.cls;

import org.junit.Test;

import java.io.IOException;
import java.util.Properties;

public class ClassDemo2 {

    @Test
    public void testGetClass2(){

        method(new Student());
    }

    //参数为对象时 ：  对象名.getClass()
    public void method(Student stu){
        Class stuClass = stu.getClass();

        System.out.println(stuClass);
    }

    //明确类名后 ：  类名.class
    @Test
    public void testGetClass3(){
        Class<Student> studentClass = Student.class;
        System.out.println(studentClass);
    }


    //读取配置文件 : Class.forName()
    @Test
    public void testGetClass() throws IOException, ClassNotFoundException {
        Properties properties = new Properties();
        properties.load(this.getClass().getClassLoader().getResourceAsStream("student.ini"));

        String className = properties.getProperty("className");

        Class cls = Class.forName(className);

        System.out.println(cls);
    }
}

```


# 总结

反射的第一步是什么？

- 获取Class类对象，如此才可以解析类的全部成分

获取Class类的对象的三种方式

- 方式一：Class c1 = Class.forName(“全类名”);
- 方式二：Class c2 = 类名.class
- 方式三：Class c3 = 对象.getClass();
