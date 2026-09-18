# root 和 alias

比如这样的两个配置：

```bash 
location /222 {
    alias /dddd;
}

location /222 {
    root /dddd;
}

```


同样是 /222/xxx/yyy.html，

- 如果是用 root 的配置，会把**整个 uri 作为路径拼接在后面**。也就是**会查找 /dddd/222/xxx/yyy.html 文件。**
- 如果是 alias 配置，它会把**去掉 /222 之后的部分路径拼接在后面。**也就是会**查找 /dddd/xxx/yyy.html 文件。**

也就是 我们 **root 和 alias 的区别就是拼接路径时是否包含匹配条件的路径。**

```nginx 
 location /i/ {
    root /data/w3;
}
location /i/ {
    alias /data/w3/images/;
} 

```


当访问/i/top.gif时:

- root是去/data/w3/i/top.gif请求文件
- alias是去/data/w3/images/top.gif请求,也就是说

root响应的路径：**配置的路径+完整访问路径(完整的location配置路径+静态文件)**
alias响应的路径：**配置路径+静态文件(去除location中配置的路径)**
