# 总结

- 认知：反射技术就是对类进行解剖，解剖出"构造器"、"成员变量"、"成员方法"
  - 构造器： 可以实例化对象
  - 成员变量：可以赋值、取值
  - 成员方法：调用方法
  - 大白话：不使用new关键字，可以实例化对象，可以访问对象中的成员
- 反射技术，通常应用于：框架
- 反射技术的程序书写步骤：
  1. 获取Class对象
  2. 获取构造器
  3. **获取成员（成员方法、成员变量）**
  4. **实例化对象 | 调用方法 | 给成员变量赋值取值**
- 使用反射技术：
  - 核心点：Class类
    - Class类是什么呢？
      - JVM中只能执行.class字节码文件（Java程序中会存在大量的.class文件）
      - .class文件是通过`类加载器`读取到内存中，并基于这个.class文件创建出：Class对象
        - Class对象，就是指一个.class文件
    - Class类的作用
      - 通过Class对象，获取"构造器"、"成员方法"、"成员变量"
  - 步骤：

1、获取Class对象

```java 
Class  cls = 类名.class;
Class  cls = 对象名.getClass(); 
Class  cls = Class.forName("类的全限定名");

//回顾：同步方法（线程）， 非静态方法默认有一个同步锁：this   
//                      静态方法的同步锁：类名.class
```


2、基于Class对象，可以获取：构造器、成员方法、成员变量

- 构造器：Constructor类

```java 
Constructor c = Class对象.getConstructor();//无参构造器
Constructor c = Class对象.getConstructor(String.class);//有参构造器

```


- 成员方法：Method类

```java 
Method m = Class对象.getMethod("方法名");//获取指定方法名的无参方法
Method m = Class对象.getMethod("方法名",int.class);

```


- 成员变量：Field类

```java 
Field f = Class对象.getDeclaredField("属性名");

//针对私有成员：成员变量、成员方法、构造器，需要取消权限检查
f.setAccessible(true);//true就表示关闭本次权限检查

```


&#x20;3、使用构造器，调用`newInstance(...)`方法，来实例化对象

4、使用成员方法，调**用`invoke(...)`方法，来调用方法入**栈执行

5、使用成员变量，调\*\*用`set(...)`****方法、****`get(...)`\*\***方法，对变量进行赋值、取值**
