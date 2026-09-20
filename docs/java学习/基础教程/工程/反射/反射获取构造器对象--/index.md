反射获取构造器对象&#x20;&#x20;
============

## 目录

- [使用反射技术获取构造器对象并使用](#使用反射技术获取构造器对象并使用)
- [获取构造器的作用依然是初始化一个对象返回。  ](#获取构造器的作用依然是初始化一个对象返回)
- [构造方法调用案例](#构造方法调用案例)
  - [案例：使用反射调用自定义类构造方法并创建对象](#案例使用反射调用自定义类构造方法并创建对象)
    - [利用反射技术获取构造器对象的方式      ](#利用反射技术获取构造器对象的方式)
    - [反射得到的构造器可以做什么？](#反射得到的构造器可以做什么)
      - [一](#一)
      - [二](#二)

# 使用反射技术获取构造器对象并使用

![](./assets/image/image_oahwNndj8B.png)

**反射的第一步是**先**得到类对象**，然后从**类对象中获取类的成分对象。**Class类中用于获取构造器的方法

![](./assets/image/image_2TcovCIWWe.png)

获取构造器的作用依然是初始化一个对象返回。

- 获取构造器的**作用依然是初始化一个对象返回。**

![](./assets/image/image_cShy1TcFjJ.png)

# 构造方法调用案例

## 案例：使用反射调用自定义类构造方法并创建对象

public修饰的无参构造方法、private修饰的有参构造方法

#### 利用反射技术获取构造器对象的方式&#xD;

- `getDeclaredConstructors()`
- `getDeclaredConstructor (Class<?>... parameterTypes)`

#### 反射得到的构造器可以做什么？

- 依然是创建对象的
  - `public newInstance(Object... initargs)`
- 如果是非public的构造器，需要打开权限（暴力反射），然后再创建对象
  - `setAccessible(boolean)`
  - **反射可以破坏封装性，私有的也可以执行了。**

##### 一

```java 
package com.itheima.reflect.cons;

import org.junit.Test;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

public class ConstructorDemo2 {

    @Test
    public void testGetConstructor() throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        //第1步： 获取Class对象
        Class<User> userClass = User.class;

        //第2步：基于Class对象，获取public修饰的全参构造方法
        Constructor<User> constructor = userClass.getConstructor(String.class , String.class);

        //第3步：使用构造器，创建对象
        User user = constructor.newInstance("光头强", "123123");

        System.out.println(user);
    }


    @Test
    public void testGetDeclaredConstructor() throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        //第1步： 获取Class对象
        Class<User> userClass = User.class;

        //第2步：基于Class对象，获取私有的构造方法
        Constructor<User> cons = userClass.getDeclaredConstructor(String.class);

        //取消权限检查
        cons.setAccessible(true);

        //第3步：使用私有构造器，创建对象
        User user = cons.newInstance("熊二");
         /* 继承中，父类私有的内容是可以继承的，但是由于java语言有权限检查过滤，故：不允许权限外的内容（私有内容，子类不能访问）
        *  Class对象中存储有private构造器，由于java语言有权限检查过滤，故：不允许访问私有构造器
        *
        *  反射技术的强大 ： 暴力破解 （可以设置本次访问时暂时取消权限检查）
        *  使用API方法： setAccessible(true)  表示取消权限检查
        *              必须书写在创建对象之前
         * */

        System.out.println(user);
    }



    @Test
    public void testGetDeclaredConstructors() throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        //第1步： 获取Class对象
        Class<User> userClass = User.class;

        //第2步：基于Class对象，获取所有的构造方法（包含：私有）
        Constructor<?>[] constructors = userClass.getDeclaredConstructors();

        //第3步：测试
        for (Constructor<?> cons : constructors) {
            System.out.println(cons);
        }
    }


    @Test
    public void testGetConstructors() throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        //第1步： 获取Class对象
        Class<User> userClass = User.class;

        //第2步：基于Class对象，只能获取到public修饰的构造方法
        Constructor<?>[] constructors = userClass.getConstructors();

        //第3步：测试
        for (Constructor<?> cons : constructors) {
            System.out.println(cons);
        }
    }
}


```


##### 二

```java 
package com.itheima.reflect.cons;

import org.junit.Test;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class ConstructorDemo3 {
    @Test
    public void testMethod() throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        //创建用户服务对象
        //UserServiceImpl userService = new UserServiceImpl();
        //以上代码存在：强耦合 （当业务类变更时，需要修改等号两边的代码）
        //改进方案： 多态
        //UserService userService = new UserServiceImpl2();
        //以上代码还存在耦合 （当业务类变更时，要修改等号右边代码）
        //解决方案： 反射 + 配置文件

        //模拟配置文件： className=com.itheima.reflect.cons.UserServiceImpl2
        //模拟读取配置文件中的内容：
        String className = "com.itheima.reflect.cons.UserServiceImpl2";
        //反射技术：
        //1、获取Class对象
        Class cls = Class.forName(className);
        //2、获取构造器
        Constructor cons = cls.getConstructor();//无参
        //3、基于构造器，创建对象
        UserService userService = (UserService) cons.newInstance();//不需要传参数


        //调用方法
        List<User> userList = userService.queryAllUser();

        for (User user : userList) {
            System.out.println(user);
        }
    }
}

```
