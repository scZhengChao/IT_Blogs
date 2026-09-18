# 1. 只加载安全的内容

## 目录

- [为什么？](#为什么)
- [怎么做？](#怎么做)

任何不属于你的应用的资源**都应该使用像**`HTTPS`这样的安全协议来加载。 换言之， 不要使用不安全的协议 （如 `HTTP`）。 同理，我们建议使用`WSS`，避免使用`WS`，建议使用`FTPS` ，避免使用`FTP`，等等诸如此类的协议。

#### 为什么？

`HTTPS` 有两个主要好处：

1. **确保数据完整性**，断言数据在您的应用程序和主机之间传输时未被修改。
2. 它会**加密您**的用户和目标主机之间的流量，使窃听应用与主机之间发送的信息变得更加困难。

#### 怎么做？

```javascript 
// 不推荐
browserWindow.loadURL ('http://example.com')
// 推荐 
browserWindow.loadURL ('https://example.com')
```


```javascript 
<!-- 不推荐 -->
<script crossorigin src="http://example.com/react.js"></script>
<link rel="stylesheet" href="http://example.com/style.css">

<!-- 推荐 -->
<script crossorigin src="https://example.com/react.js"></script>
<link rel="stylesheet" href="https://example.com/style.css">
```
