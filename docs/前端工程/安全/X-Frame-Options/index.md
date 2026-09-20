# X-Frame-Options

## 目录

- [修复办法](#修复办法)

[*安全响应头*](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/X-Frame-Options?spm=wolai.workspace.0.0.4acb5b3fHIBnar "安全响应头")

`X-Frame-Options` HTTP响应头是用来给浏览器指示允许一个页面**可否在\<iframe>\<frame>\<embed>或者\<object>中展示的标记**。站点可以通过确保网站**没有被嵌入到别人的站点里面，从而避免点击挟持攻击**。

X-Frame-Options 有两个可能的值：

![](./image/image_00jNnlbxmh.png)

以及一个被弃用的指令

![](./image/image_DsJFrCTKEM.png)

**使用\<meta>标签设置X-Frame-Options是无效的**

![](./image/image_8E54jtkVI6.png)

## 修复办法

**多源互认页面只允许被指定的认证源嵌套，在nginx增加配置**

![](./image/image_VYqPq8FCLf.png)

![](./image/image_uTnomzXSKZ.png)
