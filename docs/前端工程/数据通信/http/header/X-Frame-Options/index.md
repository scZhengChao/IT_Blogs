# X-Frame-Options

## 目录

- [X-Frame-Options三个参数:](#X-Frame-Options三个参数)
  - [Apache配置](#Apache配置)
  - [nginx配置](#nginx配置)
  - [IIS配置](#IIS配置)
  - [HAProxy配置](#HAProxy配置)
  - [Tomcat配置](#Tomcat配置)

&#x20;            X-Frame-Options HTTP 响应头是用来给**浏览器指示允许一个页面可否在 \<frame>, \</iframe> 或者 \<object> 中展现的标记**。网站可以使用此功能，来**确保自己网站的内容没有被嵌套到别人的网站中去**，**也从而避免了点击劫持 (clickjacking) 的攻击**。

## X-Frame-Options三个参数:

1. DENY

   表示该页面不允许在frame中展示，即便是在相同域名的页面中嵌套也不允许。
2. SAMEORIGIN

   表示该页面可以在相同域名页面的frame中展示。
3. ALLOW-FROM uri

   表示该页面可以在指定来源的frame中展示。

&#x20;   换一句话说，如果设置为DENY，不光在别人的网站frame嵌入时会无法加载，在同域名页面中同样会无法加载。另一方面，如果设置为SAMEORIGIN，那么页面就可以在同域名页面的frame中嵌套。**正常情况下我们通常使用SAMEORIGIN参数。**

### Apache配置

需要把下面这行添加到 'site' 的配置中

| Header always append X-Frame-Options SAMEORIGIN |
| ----------------------------------------------- |

### nginx配置

需要添加到 ‘http’, ‘server’ 或者 ‘location’ 的配置项中，个人来讲喜欢配置在‘server’ 中正常情况下都是使用SAMEORIGIN参数，允许同域嵌套

| add\_header X-Frame-Options SAMEORIGIN; |
| --------------------------------------- |

允许单个域名iframe嵌套

| add\_header X-Frame-Options ALLOW-FROM http\://[whsir.com/;](http://whsir.com/; "whsir.com/;") |
| ---------------------------------------------------------------------------------------------- |

允许多个域名iframe嵌套，注意这里是用**逗号**分隔

| add\_header X-Frame-Options "ALLOW-FROM [http://whsir.com/,https://cacti.org.cn/](http://whsir.com/,https://cacti.org.cn/ "http://whsir.com/,https://cacti.org.cn/")"; |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

### IIS配置

IIS配置添加下面的配置到 ‘Web.config’文件中

| 1&#xA;2&#xA;3&#xA;4&#xA;5&#xA;6&#xA;7&#xA;8&#xA;9 | \<system.webServer>&#xA;  ...&#xA;  \<httpProtocol>&#xA;    \<customHeaders>&#xA;      \<add name="X-Frame-Options" value="SAMEORIGIN" />&#xA;    \</customHeaders>&#xA;  \</httpProtocol>&#xA;  ...&#xA;\</system.webServer> |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

### HAProxy配置

添加下面这行到 ‘front-end, listen, or backend’配置中

| 1 | rspadd X-Frame-Options:\ SAMEORIGIN |
| - | ----------------------------------- |

### Tomcat配置

在 ‘conf/web.xml’填加以下配置

| 1&#xA;2&#xA;3&#xA;4&#xA;5&#xA;6&#xA;7&#xA;8&#xA;9&#xA;10&#xA;11&#xA;12&#xA;13&#xA;14&#xA;15 |   |
| ------------------------------------------------------------------------------------------- | - |

配置后如何确定X-Frame-Options是否已生效呢？我这里以Google浏览器为例，打开网站按F12键，选择Network，找到对应的Headers，如下图所示

![  ](./assets/image/69473d4d77c995f74a05b30974e160a3_HBXZ31cx1U.png "  ")
