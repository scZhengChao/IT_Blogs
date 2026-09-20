# 类加载器

## 目录

- [类加载器的作用](#类加载器的作用)
- [类加载器的分类](#类加载器的分类)
- [获取类加载器的方式](#获取类加载器的方式)
  - [继承关系](#继承关系)
- [代码实现  ](#代码实现)

# 类加载器的作用

- 加载器是**Java运行时环境**的一部分，**负责加载字节码文件，**即将磁盘上的某个**class文件读取到内存并生成Class的对象**

# 类加载器的分类

- 启动类加载器(`Bootstrap` ClassLoader)：用**于加载系统类库\<JAVA\_HOME>\bin目录下的class，例如：rt.jar。**
- 扩展类加载器(`Extension` ClassLoader)：**用于加载扩展类库\<JAVA\_HOME>\lib\ext目录下的class。**
- 应用程序类加载器(`Application` ClassLoader)：**用于加载我们自定义类的加载器。**

# 获取类加载器的方式

来自Class类型获取类加载器的方法：

```java 
public ClassLoader getClassLoader()  //返回该类的类加载器//有些实现可能 使用null来表示引导类加载器(启动类加载器) 
```


## 继承关系

![](./image/image_J5rtoonQVA.png)

代码实现

```java 
public class ClassLoaderDemo1 {  public static void main(String[] args) {    // 获取当前类的加载器    ClassLoader loader = ClassLoaderDemo1.class.getClassLoader();    //输出当前类的类加载器    System.out.println(loader);//sun.misc.Launcher$AppClassLoader@b0014f0     //获取AppClassLoader类加载器的父类    ClassLoader parent = loader.getParent();     //输出AppClassLoader类加载器的父类加载器    System.out.println(parent);//sun.misc.Launcher$ExtClassLoader@325e9e34    //获取ExtClassLoader类加载器的父类    ClassLoader grandpa = parent.getParent();    //输出ExtClassLoader类加载器的父类加载器    System.out.println(grandpa);//null  }}
```
