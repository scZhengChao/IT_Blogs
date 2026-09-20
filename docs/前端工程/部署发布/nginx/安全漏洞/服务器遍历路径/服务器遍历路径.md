# 服务器遍历路径

## 目录

- [autoindex](#autoindex)

# autoindex

【强制】无目录使用需求时禁止目录浏览。
出于安全性的考虑，**建议在配置中设置“autoindex”为off 来禁止目录浏览。**（默认就是off）

```nginx 
worker_processes auto;
daemon off;

error_log stderr;
events { worker_connections 2048; }

http {
  # 其他http配置项
   server_tokens off; # 显示配置为关 

  server {
     autoindex off; # 显示配置为关 
    # 其他server配置项
  }
}
```
