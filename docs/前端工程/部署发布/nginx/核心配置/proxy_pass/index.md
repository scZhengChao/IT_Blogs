# proxy\_pass

## 目录

- [proxy\_pass](#proxy_pass)

### **proxy\_pass**

nginx反向代理主要通过proxy\_pass来配置，将你项目的开发机地址填写到proxy\_pass后面，正常的格式为proxy\_pass URL即可

```nginx 
server {    
  listen 80;    
  location / {        
    proxy_pass http://10.10.10.10:20186;    
  }
}
```


[正向代理](./正向代理/index.md "正向代理")

[反向代理](./反向代理/index.md "反向代理")

[网关](./网关/index.md "网关")
