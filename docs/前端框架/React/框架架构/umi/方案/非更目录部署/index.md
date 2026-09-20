# 非更目录部署

## 目录

- [nginx部署配置](#nginx部署配置)

```javascript 
import { defineConfig } from 'umi'

export default defineConfig({
  // ...
  history: {
    type: 'browser',  // 浏览器history模式，无 # 号   
  },
  base: '/admin/',
  publicPath: '/admin/',
  // ...
})
```


- `history`：type，可选 browser、hash 和 memory。
- `base` 设置路由前缀，通常用**于部署到非根目录**。 &#x20;

  比如，你有路由 / 和 /web，然后设置了 `base` 为 `/admin/`，那么就可以通过 `/admin/` 和 /admin/web 访问到之前的路由。
- `publicPath` 配置 webpack 的 `publicPath`。当打包的时候，webpack 会在**静态文件路径前面添加** `publicPath` 的值，当你需要**修改静态文件地址时**，比如使用 CDN 部署，把 `publicPath` 的值设为\*\* CDN 的值\*\*就可以。如果使用一些特殊的文件系统，比如混合开发或者 cordova 等技术，可以尝试将 `publicPath` 设置成 `./` 相对路径。 &#x20;

  如果你的应用部署在**域名的子路径**上，例如 `https://www.tiven.cn/admin/ ，你需要设置`publicPath`为`/admin/\`

## nginx部署配置

```nginx 
# 静态服务
server {
    listen       8080;
    server_name  127.0.0.1;

    location / {
        root   /data/www/tiven-web; // 打包后的静态文件目录
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    # 反向代理
    location /admin/ {
        proxy_pass   http://127.0.0.1:8080/;
    }
}


```


或者 ； 不要放在根目录；放在 `base` 子文件夹下；这个时候 `base  `和 `publicPath`   **一致**
