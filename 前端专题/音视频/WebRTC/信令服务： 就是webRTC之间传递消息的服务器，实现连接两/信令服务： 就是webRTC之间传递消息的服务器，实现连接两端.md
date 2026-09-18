# 信令服务： 就是webRTC之间传递消息的服务器，实现连接两端

## 目录

- [建立数据传输 RTCDataChannel过程](#建立数据传输-RTCDataChannel过程)

**信令承载的作用就是各种转发；** 基于`webSocket`

![](image_44uUnfbftR.png)

## 建立数据传输 RTCDataChannel过程

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35efcd2af2744bb8a6efc7f62c143799~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

```javascript 
//控制端
var pc = new RTCPeerConnection();
let dc = pc.createDataChannel('robotchannel', {reliable: false});
// 建立成功
dc.onopen = function() {
    console.log('opened')
    peer.on('robot', (type, data) => {
        dc.send(JSON.stringify({type, data}))
    })
}
// 接收消息
dc.onmessage = function(event) {
    console.log('message', event)
}
dc.onerror = (e) => {console.log(e)}

```


```javascript 
//傀儡端
const pc = new window.RTCPeerConnection();  
pc.ondatachannel = (e) => {
    console.log('data', e)
       e.channel.onmessage = (e)  => {
        console.log('onmessage', e, JSON.parse(e.data))
       let {type, data} = JSON.parse(e.data)
        console.log('robot', type, data)
        if(type === 'mouse') {
            data.screen = {
                width: window.screen.width, 
                height: window.screen.height
            }
        }
        ipcRenderer.send('robot', type, data)
     }
 }

```
