# upstream

## 目录

- [均衡策略](#均衡策略)

当有多台应用服务器的时候，可以通过 upstream 配置负载均衡，有 4 种策略：**轮询、带权重的轮询、ip\_hash、fair**。

改下 nginx 配置文件：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7e3ed96deaf4037a5aab7444ae98a3e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**在 upstream 里配置它代理的目标服务器的所有实例。**

下面 proxy\_pass 通过 upstream 的名字来指定。

然后复制到容器里，并 reload：

```bash 
docker cp ~/nginx-html/conf.d/default.conf nginx1:/etc/nginx/conf.d/default.conf

```


![](./assets/image/image_wCa6fMZan-.png)

这时候我访问 [http://localhost:81/api](https://link.juejin.cn/?target=http://localhost:81/api "http://localhost:81/api") 刷新 5 次页面：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/67d1a60b7fdf4f8b81fb9ccd6fed01ce~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

可以看到两个 nest 服务，一个 3 次，一个 2 次。

![](./assets/image/image_zJwHI-a5J8.png)

因为默认是轮询的方式。

## 均衡策略

一共有 4 种负载***均衡策略***：

- **轮询：默认方式。**
- **weight：在轮询基础上增加权重，也就是轮询到的几率不同。**
- **ip\_hash：按照 ip 的 hash 分配，保证每个访客的请求固定访问一个服务器，解决 session 问题。**
- **fair：按照响应时间来分配，这个需要安装 nginx-upstream-fair 插件。**

我们测试下 weight 和 ip\_hash 的方式。

**添加一个 weight=2，默认是 1，这样两个服务器轮询到的几率是 2 比 1。**

![](./assets/image/image_t35kmM3XwF.png)

然后复制到容器里，并 reload：

```bash 
docker cp ~/nginx-html/conf.d/default.conf nginx1:/etc/nginx/conf.d/default.conf

```


![](./assets/image/image_uiuGASdPIL.png)

按 command + k，把 nest 服务的控制台日志清空下：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6899294da7274c7d89002d7e60b33090~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

然后我访问了 8 次 [http://localhost:81/api](https://link.juejin.cn/?target=http://localhost:81/api "http://localhost:81/api")

看打印的日志来看，差不多就是 2:1 的轮询几率。

![](./assets/image/image_SLVnKxEuOV.png)

这就是带权重的轮询。

我们再试下 ip\_hash 的方式；

![](./assets/image/image_wPKhpBU6wb.png)

然后复制到容器里，并 reload：

```bash 
docker cp ~/nginx-html/conf.d/default.conf nginx1:/etc/nginx/conf.d/default.conf

```


![](./assets/image/image_oJsPB5ARlc.png)

按 command + k，把 nest 服务的控制台日志清空下：

![](./assets/image/image_I7GDq-LNH5.png)

再次访问了 [http://localhost:81/api](https://link.juejin.cn/?target=http://localhost:81/api "http://localhost:81/api")

**可以看到一直请求到了一台服务器：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2202ecd0ee484ba58129b632b73f1777~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这就是 Nginx 的负载均衡的策略。
