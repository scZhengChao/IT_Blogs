# 使用类加载器加载配置文件的方式

加载配置文件；并生成字节输入流

需求：用类加载器加载配置文件。
步骤：

- 在src下面新建一个stu.ini文件，并在其中输入:

```yaml 
name=zhangsanage=19
```


- 创建Properties 类的集合对象p；
- 使用当前类ClassLoaderDemo2获得**Class对象并调用Class类中的getClassLoader()函数：**
- 使用类加载器对\*\*象loader 调用ClassLoader 类中的InputStream getResourceAsStream(String name)返回读取指定资源的输入流 \*\*

```java 
InputStream in = loader.getResourceAsStream("stu.ini");
```


> 这里的name是文件的路径 **：这个路径如果使用相对路径，相对的是src目录。**
