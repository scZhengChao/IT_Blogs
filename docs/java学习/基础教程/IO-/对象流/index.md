# 对象流

## 目录

- [特点](#特点)
- [应用](#应用)
- [操作流](#操作流)
- [类](#类)
- [序列化](#序列化)

> 把对象写入磁盘文件

![](./assets/image/image_BHOq_vIpyX.webp)

# 特点

可以把对象以\*\*字节的形式写到本地文件，直接打开文件，是读不懂的，需要再次用对象操作流读到内存中。  \*\*

# 应用

- 持久化存储；重启计算机后；依然可以把对象加载进来；&#x20;
- 跨计算机

![](./assets/image/image_9WacaJTfKK.webp)

# 操作流

![](./assets/image/image_C4u1aukn9Y.webp)

# 类

- ## `ObjectInputSteam`
  ```java 
  Object readObject()
  ```

- ## `ObjectOutputStream`
  ```java 
  Object writeObject() 
  ```

- 对象操作流分为两类：对象操作**输入流和对象操作输出流**
- 对象操作输出流（对象**序列化**流）：就是**将对象写到本地文件中，或者在网络中传输对象**
- 对象操作输入流（对象**反序列化**流）：把写到本地文件中的&#x20;

# 序列化

[序列化](./序列化/index.md "序列化")

[案例](./案例/index.md "案例")
