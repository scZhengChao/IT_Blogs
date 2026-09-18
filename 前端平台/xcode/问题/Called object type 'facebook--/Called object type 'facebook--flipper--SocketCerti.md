# Called object type 'facebook::flipper::SocketCertificateProvider' (aka 'int') is not a function or function

## 目录

- [1](#1)
- [2](#2)

[   https://juejin.cn/post/7348028257457864741](https://juejin.cn/post/7348028257457864741 "   https://juejin.cn/post/7348028257457864741")

[ \[Fixed & Shipped in latest releases\] Upgrading Xcode to 15.3 results in build error - \`Called object type 'facebook::flipper::SocketCertificateProvider' (aka 'int') is not a function or function pointer\` · Issue #43335 · facebook/react-native · GitHub ImportantThe latest official update from the React Native Team is available here Description Called object type 'facebook::flipper::SocketCertificateProvider' (aka 'int') is not a function or function https://github.com/facebook/react-native/issues/43335](https://github.com/facebook/react-native/issues/43335 " \[Fixed & Shipped in latest releases] Upgrading Xcode to 15.3 results in build error - `Called object type 'facebook::flipper::SocketCertificateProvider' (aka 'int') is not a function or function pointer` · Issue #43335 · facebook/react-native · GitHub ImportantThe latest official update from the React Native Team is available here Description Called object type 'facebook::flipper::SocketCertificateProvider' (aka 'int') is not a function or function https://github.com/facebook/react-native/issues/43335")

解决方法：

# 1

1.在那个issue上看到有人提出两种解决方法都有人反馈解决了他们的问题，其中一个是将react-native升级到0.73.6，但是一想到这个方法可能还涉及到后续其他依赖的更新升级，本人便没有尝试该方案

2.现在使用的方法经过测试，的确没有这个错误，但是同时也remove了部分pods中的内容，不确定后续是否会对应用造成影响。 打开../iOS/Podfile文件，找到并注释下方:flipper\_configuration => flipper\_config,内容如图：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/378875c734094b1496dec24c5292114b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=946\&h=413\&s=77564\&e=png\&b=1d1d1d)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f296d980af64a4d89e2d60f6270c511~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=786\&h=377\&s=63787\&e=png\&b=171717)

后重新执行命令目前可以正常运行

# 2

前端工程师
有更好的解决办法, 是改一下他们的文件

[github.com](http://github.com "github.com")

把这一行代码加到flipper的文件 ios/Pods/Flipper/xplat/Flipper/FlipperTransportTypes.h, 可以解决这个问题

```c++ 
#include <functional>
```


作者 : 这个是不是每次pod install之后都需要添加一次&#x20;

作者 : 是的, 但是看到他们有merge对应的代码,之后release的版本应该就不需要手动改了

![  ](Snipaste_2024-07-18_15-17-23_Sf4pKXfx7S.png "  ")
