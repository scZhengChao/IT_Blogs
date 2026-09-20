# TCP

## 目录

- [原理](#原理)
- [步骤](#步骤)
  - [java.net.Socket类：客户端](#javanetSocket类客户端)
  - [java.net.ServerSocket：服务端](#javanetServerSocket服务端)
- [案例](#案例)

# 原理

TCP通信协议是一种**可靠的**网络协议，它在通信的**两端各**建立一个`Socket`对象。

- 通信之前要保证连接已经建立。
- 通过`Socket`产生`IO`流来进行网络通信。

![](./assets/image/image_DlkS-MzM_M.png)

# 步骤

在Java语言中，想要实现客户端、服务端两个程序之间进行交互，需要依赖：Socket （利用TCP协议）

- 客户端程序：`Socket`
  - 先找到计算机  IP地址
  - 再找到计算机上的服务端程序   端口号
  - 按照`TCP`协议进行数据发送、接收
    - 是基于IO流实现数据的发送、接收
- 服务端程序：`ServerSocket`
  - 绑定**服务端程序的端口号**

## java.net.Socket类：客户端

```java 
public Socket(String address , int port)
//参数1： ip地址或主机名
//参数2： 端口号（服务端程序的端口号）

OutputStream  getOutputStream()  //基于socket对象获取网络输出流（ 发送数据 ）
InputStream  getInputStream()  //基于socket对象获取网络输入流（接收数据）
```


```java 
//1. 创建客户端Socket对象，并连接服务端程序
Socket socket = new Socket("对方计算机IP地址", "服务端程序端口号");

//2. 基于socket对象，获取网络输出流（发送数据）
OutputStream netOut = socket.getOutputStream();

//3. 发送数据
netOut.write("数据".getBytes());

//4. 关闭资源
netOut.close();
socket.close();



```


## java.net.ServerSocket：服务端

```java 
public ServerSocket(int port)
//参数：port 当前服务端程序要绑定的端口号（客户端Socket程序要使用这个端口号和服务端连接） 


public Socket accept();//监听客户端连接，并生成连接，返回一个Socket对象


//获取网络中的输入流，用来读取客户端发送过来的数据
InputStream getInputStream​() 

//释放资源 : 服 务端一般不会关闭 
void close​()


```


![](./assets/image/image_9BEDGdAPht.png)

# 案例

[三次握手](./三次握手/index.md "三次握手")
