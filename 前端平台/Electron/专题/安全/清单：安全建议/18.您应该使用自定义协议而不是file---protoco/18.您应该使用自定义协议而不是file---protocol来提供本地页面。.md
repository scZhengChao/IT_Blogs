# 18.您应该使用自定义协议而不是file://protocol来提供本地页面。

## 目录

- [为什么？](#为什么)
- [怎么做？](#怎么做)

#### 为什么？

`file://`协议在`Electron`中获得的特权比在`web`浏览器中更多，甚至在浏览器中，它也与`http/https url`不同。使用自定义协议可以使您**与经典的**`web url`**行为更加一致**，同时保留对**可以加载的内容和时间的更多控制。**
在`file://`上运行的页面**可以单方面访问您机器上的每个文件，**这意味着`XSS`问题可以用于从**用户机器加载任意文件**。使用**自定义协议可以防止此类问题，因为您可以将协议限制为仅为特定的一组文件提供服务。**

#### 怎么做？

按照[**protocol.handle**](https://www.electronjs.org/zh/docs/latest/api/protocol#protocolhandlescheme-handler "protocol.handle")示例学习如何从自定义协议提供文件/内容。
