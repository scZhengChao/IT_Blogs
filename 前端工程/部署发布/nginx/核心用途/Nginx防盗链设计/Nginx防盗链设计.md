# Nginx防盗链设计

首先了解一下何谓盗链：**「「****盗链即是指外部网站引入当前网站的资源对外展示****」」** ，来举个简单的例子理解：

❝

好比壁纸网站`X`站、`Y`站，`X`站是一点点去购买版权、签约作者的方式，从而积累了海量的壁纸素材，但`Y`站由于资金等各方面的原因，就直接通过`<img src="X站/xxx.jpg" />`这种方式照搬了`X`站的所有壁纸资源，继而提供给用户下载。

❞

那么如果我们自己是这个`X`站的`Boss`，心中必然不爽，那么此时又该如何屏蔽这类问题呢？那么接下来要叙说的\*\*「「防盗链」」\*\* 登场了！

`Nginx`**的防盗链机制实现，跟一个头部字段**：`Referer`有关，该**字段主要描述了当前请求是从哪儿发出的**，那么在`Nginx`中就可获取该值，然后**判断是否为本站的资源引用请求，如果不是则不允许访问**。`Nginx`中存在一个配置项为`valid_referers`，正好可以满足前面的需求，语法如下：

```nginx 
valid_referers none | blocked | server_names | string ...;

```


- `none`：表示接受没有`Referer`字段的`HTTP`请求访问。
- `blocked`：表示允许`http://`或`https//`以外的请求访问。
- `server_names`：资源的白名单，这里可以指定允许访问的域名。
- `string`：可自定义字符串，支配通配符、正则表达式写法。

简单了解语法后，接下来的实现如下：

```nginx 
# 在动静分离的location中开启防盗链机制  
location ~ .*\.(html|htm|gif|jpg|jpeg|bmp|png|ico|txt|js|css){  
    # 最后面的值在上线前可配置为允许的域名地址  
    valid_referers blocked 192.168.12.129;  
    if ($invalid_referer) {  
        # 可以配置成返回一张禁止盗取的图片  
        # rewrite   ^/ http://xx.xx.com/NO.jpg;  
        # 也可直接返回403  
        return   403;  
    }  
      
    root   /soft/nginx/static_resources;  
    expires 7d;  
}  

```


根据上述中的内容配置后，就已经通过`Nginx`实现了最基本的防盗链机制，最后只需要额外重启一下就好啦！当然，对于防盗链机制实现这块，也有专门的第三方模块`ngx_http_accesskey_module`实现了更为完善的设计，感兴趣的小伙伴可以自行去看看。

❝

PS：防盗链机制也无法解决爬虫伪造`referers`信息的这种方式抓取数据。

❞
