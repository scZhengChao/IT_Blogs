# 基础Websocket

## 目录

- [状态码：](#状态码)
- [场景](#场景)
- [API](#API)
- [聊天室demo](#聊天室demo)
  - [服务端](#服务端)
  - [client客户端](#client客户端)
- [流程](#流程)

# 状态码：

**status 101 开始转换网络协议**

# 场景

场景socket.io | webSocket | .net模块
&#x20;   Web领域的实时推送技术，也被称作Realtime技术。这种技术要达到的目的是让用户不需要刷新浏览器就可以获得实时更新。它有着广泛的应用场景，比如在线聊天室、在线客服系统、评论系统、WebIM等。
&#x20;   特点: ***双向通讯***
&#x20;   本质：就是一种协议：叫做webSocket 是h5的api 而 socket.io 是一个封装好的库;

# API

&#x20;   cn:    [https://www.w3cschool.cn/socket/socket-k49j2eia.html](https://www.w3cschool.cn/socket/socket-k49j2eia.html "https://www.w3cschool.cn/socket/socket-k49j2eia.html")
&#x20;   en:    [https://socket.io/](https://socket.io/ "https://socket.io/")

# 聊天室demo

## 服务端

```javascript 
//在线用户socket
var onlineUsers = {};//{用户1234:socket,xx:oo}

//当前在线人数
var onlineCount = 0;

//当前在线用户名
var onlineUserName = [];

module.exports=(io)=>{
  io.on('connection',(socket)=>{
    socket.on('login', (data) => {
      //兜库

      //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
      socket.name = data.username;
  
      //检查在线列表，如果不在里面就加入
      if (!onlineUsers.hasOwnProperty(data.username)) {
        // console.log(socket);
        onlineUsers[data.username] = socket;
        onlineUserName.push(data.username);//添加用户名
        //在线人数+1
        onlineCount++;
      }
  
      //向所有客户端广播用户加入
      io.emit('login', { onlineCount, username: data.username, msg: '加入聊天室' });
      //广播在线列表更新
      io.emit('update', { onlineUserName, onlineCount });
    })


    socket.on('disconnect', function () {//监听客户端下线事件
      if (onlineUsers[socket.name]) {
        delete onlineUsers[socket.name]; //删除用户
        onlineUserName.splice(onlineUserName.indexOf(socket.name), 1);//删除用户名
        onlineCount--;//更新在线用户
      }
      io.emit('logout', { username: socket.name, msg: '下线了'});
      io.emit('update', { onlineUserName, onlineCount });
    });

    //接受非指定
    socket.on('message', (data) => {  //监听客户端发来的自定义消息事件，并接受数据data
      data.username = socket.name;//获取到当前客户端的id,和数据
      io.emit('message', data);  //广播消息给所有客户端
    })

    //接受指定
    socket.on('private message', function (toUserName, data, callback) {
      // console.log(toUserName,data);
      callback('你发消息给' + toUserName + ':' + data.msg);// 回执，并不是返回数据
      data.fromUserName = socket.name;
      onlineUsers[toUserName] && onlineUsers[toUserName].emit('private message', data);  // 广播，重点是广播给onlineUsers[toUserName]
    });

  });

};


```


## client客户端

```html 
<body>
    <h1>群聊--在线人数
        <span id="s1"></span>
    </h1>
    <div style="width: 30%; float: left">
        输入:
        <input type="text" id="msginput">
        <button id="msgbtn">发送</button>
        <ul id="list">
        </ul>
    </div>
    <div style="width: 65%; float: right" id="showbox">

    </div>
</body>
<script src="./javascripts/socket.io.js"></script>  
<script>  
    let socket = io('http://localhost:3000');  //连接服务器
    let btn = document.getElementById('msgbtn');
    let msginput = document.getElementById('msginput');
    let showbox = document.getElementById('showbox');
    let s1 = document.getElementById('s1');
    let list = document.getElementById('list');

    socket.emit('login', { username: '用户名' + Math.random().toFixed(4) });

    socket.on('login', (data) => {  //监听服务器发来的自定义事件
        // console.log('收到');  
        let message = document.createElement('div');
        message.innerHTML = `${data.username}: ${data.msg}`;  //显示客户端id,和发来的数据
        showbox.appendChild(message);
    })
    socket.on('logout', (data) => {  //监听服务器发来的自定义事件
        let message = document.createElement('div');
        message.innerHTML = `${data.username}: ${data.msg}`;  //显示客户端id,和发来的数据
        showbox.appendChild(message);
    })

    socket.on('update', (data) => {  //监听服务器发来的自定义事件
        s1.innerHTML = data.onlineCount;
        list.innerHTML = '';
        data.onlineUserName.forEach(username => {
            var oLi = document.createElement('li');
            oLi.innerHTML = username;
            list.appendChild(oLi);
        });

    })

    btn.addEventListener('click', (event) => {
        let msg = msginput.value;
        let data = { msg: msg };
        socket.emit('message', data);  //发送消息到服务器
    });

    //事件委托+私信点击用户名发送
    list.addEventListener('click', (event) => {
        // console.log(event);
        if (event.srcElement.tagName == 'LI') {
            // console.log(event.srcElement.innerHTML);
            var toUserName = event.srcElement.innerHTML;
            let msg = msginput.value;
            let data = { msg: msg };
            // socket.emit('private message','目标人', 数据,(发送后的结果数据)=>{
            socket.emit('private message', toUserName, data, (data) => {
                let message = document.createElement('div');
                message.innerHTML = data;  //显示客户端id,和发来的数据
                showbox.appendChild(message);
            });
        }

    });
    socket.on('message', (data) => {  //监听服务器发来的自定义事件
        let message = document.createElement('div');
        message.innerHTML = `${data.username}: ${data.msg}`;  //显示客户端id,和发来的数据
        showbox.appendChild(message);
    })
    socket.on('private message', (data) => {  //监听服务器发来的自定义事件
        let message = document.createElement('div');
        message.innerHTML = `${data.fromUserName}对你悄悄说: ${data.msg}`;  //显示客户端id,和发来的数据
        showbox.appendChild(message);
    })  
</script>
```


# 流程

![  ](./assets/image/SouthEast_pc705C3B71.png "  ")
