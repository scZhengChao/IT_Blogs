# location

## 目录

- [=](#)
- [不带 = ](#不带--)
- [正则](#正则)
- [不区分大小写](#不区分大小写)
- [优先级](#优先级)
- [总结一下](#总结一下)
- [直接返回text/html](#直接返回texthtml)

location 支持的语法有好几个，我们分别试一下：

|                                                                                                           |                                           |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| [test.com/img/1/1.png](https://link.juejin.cn/?target=http://test.com/img/1/1.png "test.com/img/1/1.png") | /img/和/img末尾有无/是有区别的（匹配/img/ 而 不是匹配 /img） |

```bash 
location = /111/ { 
    default_type text/plain;
    return 200 "111 success";
}

location /222 {
    default_type text/plain;
    return 200 $uri;
}

location ~ ^/333/bbb.*\.html$ {
    default_type text/plain;
    return 200 $uri;
}

location ~* ^/444/AAA.*\.html$ {
    default_type text/plain;
    return 200 $uri;
}

```


# =

然后来看第一条路由：

![](./image/image_Js04BEV497.png)

location 和路径**之间加了个 =，代表精准匹配，** 也就是只有完全相同的 url 才会匹配这个路由。

![](./image/image_oGepRTusTm.png)

![](./image/image_51i4KxYoxh.png)

# \*\*不带 = \*\*

**不带 = 代表根据前缀匹配，后面可以是任意路径。**

![](./image/image_in8RGB4jyM.png)

**这里的 \$uri 是取当前路径。**

![](./image/image_qK39d5_emf.png)

![](./image/image_REejOhBEx8.png)

# 正则

然后**如果想支持正则，就可以加个 \~。**

![](./image/image_cMpH1MsHQw.png)

这里的正则语法不难看懂，就是 /aaaa/bbb 开头，然后中间是任意字符，最后 .html 结尾的 url。

![](./image/image_rN0QCdeXCl.png)

![](./image/image_JsW2ILYhas.png)

**但是它是区分大小写的，比如这样就不行了：**

![](./image/image_a5SVGbfjnc.png)

换成小写就可以：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0eed6101d4c40bab2a28c8182dde164~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

# 不区分大小写

如果**想让正则不区分大小写，可以再加个 \***

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0ac2ad52e0c4187bd8760b4e02f7ccc~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

试一下：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58600f38f1324bfe89bdb43f89327bc0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](./image/image_y9rCR-wt9O.png)

任意的大小写都是可以的。

此外，还有一种语法：

在配置文件加上这个配置：

```nginx 
location /444 {
    default_type text/plain;
    return 200 'xxxx';
}

```


这时候就有两个 /444 的路由了：

![](./image/image_at01CUdHkm.png)

这时候浏览器访问，还是匹配上面的那个路由：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34cd4b0e3c2c46ce9c3dc080ca13bed7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

# 优先级

如果想**提高优先级，可以使用 ^\~**

改成这样：

```bash 
location ^~ /444 {
    default_type text/plain;
    return 200 'xxxx';
}

```


**也就是说 ^\~ 能够提高前缀匹配的优先级。**

# 总结一下

总结一下，一共 4 个 location 语法：

**location = /aaa 是精确匹配 /aaa 的路由。**

**location /bbb 是前缀匹配 /bbb 的路由。**

**location \~ /ccc.*****.html 是正则匹配。可以再加个 \* 表示不区分大小写 location \~*****\* /ccc.\*.html**

**location ^\~ /ddd 是前缀匹配，但是优先级更高。**

这 4 种语法的优先级是这样的：

**精确匹配（=） > 高优先级前缀匹配（^\~） > 正则匹配（\~\* ） > 普通前缀匹配**

我们现在是直接用 return 返回的内容，其实应该返回 html 文件。

可以这样改：

```bash 
location /222 {
    alias /usr/share/nginx/html;
}

location ~ ^/333/bbb.*\.html$ {
    alias /usr/share/nginx/html/bbb.html;
}

```


都是能正确返回对应的 html 的：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ee5f117ce05432f8e0a2e570bd6291c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e044e5743124fc88760e9ecdd0b817f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a171bc715a14627b5c9a804f05240be~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

# 直接返回text/html

```nginx 
location / {
  default_type text/html;
  return 200 "it is ok";
}
```
