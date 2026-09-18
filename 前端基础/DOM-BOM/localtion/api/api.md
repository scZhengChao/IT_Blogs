# api

location:

- hash
  &#x20;   返回一个URL的锚部分
- host
  &#x20;   返回一个URL的主机名和端口
- hostname
  &#x20;   返回URL的主机名
- href
  &#x20;   返回完整的URL
- pathname
  &#x20;   返回的URL路径名。
- port
  &#x20;   返回一个URL服务器使用的端口号
- protocol
  &#x20;   返回一个URL协议
- search
  &#x20;   返回一个URL的查询部分
- assign()
  &#x20;   载入一个新的文档
- reload()     **// true 无缓存刷新 , false 有可能从缓存刷新**
  &#x20;   重新载入当前文档
- replace()
  &#x20;   用新的文档替换当前文档； **不会刷新当前页面**
- window\.location.assign(url) ：
  &#x20;    加载 URL 指定的新的 HTML 文档。就相当于一个链接，跳转到指定的url，**当前页面会转为新页面内容，可以点击后退返回上一个页面。**
- window\.location.replace(url) ：&#x20;
  &#x20;   通过加载 URL 指定的文档来替换当前文档，这个方法是替换当前窗口页面，前后两个页面共用一个窗口，**所以是没有后退返回上一页的**
