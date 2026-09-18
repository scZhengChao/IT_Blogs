# 通讯

```java title="serverClient"
package com.tcp;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class server {
    public static void main(String[] args) throws IOException {
        ServerSocket ss = new ServerSocket(9090);
        System.out.println("服务端程序已启动：9090 ；进入阻塞状态；直到客户端链接");

        Socket server = ss.accept(); // 又一个
        System.out.println(server.getInetAddress().getHostAddress() + "客户端已链接接");
        InputStream netInput = server.getInputStream();
        byte[] bytes = new byte[1024];

        int len = netInput.read(bytes);
        String msg = new String(bytes, 0, len);
        System.out.println(msg);

        OutputStream os = server.getOutputStream();
        os.write("我回馈的".getBytes());

        netInput.close();
        server.close();
        os.close();
//        ss.close();
    }

}


```


```java title="client"
package com.tcp;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;

public class client {
    public static void main(String[] args) throws IOException {
        Socket client = new Socket("127.0.0.1",9090);
        OutputStream netOutput = client.getOutputStream();
        netOutput.write("你好".getBytes());

        InputStream is = client.getInputStream();
        byte[] buf = new byte[1024];
        int len = is.read(buf);
        System.out.println(new String(buf,0,len)) ;


        netOutput.close();
        client.close();


    }
}


```
