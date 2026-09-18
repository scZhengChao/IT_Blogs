# cors

## 目录

- [CORS](#CORS)
- [服务端设置CORS策略](#服务端设置CORS策略)

### **CORS**

**CORS(Cross Origin Resource Share) - 跨域资源共享，后端方案，解决跨域**
原理：cors是w3c规范，真正意义上解决跨域问题。**它需要服务器对请求进行检查并对响应头做相应处理，从而允许跨 域请求**。

### 服务端设置CORS策略

```markdown 
# 正确配置允许的源、方法和头
Access-Control-Allow-Origin: https://yourdomain.com
Access-Control-Allow-Methods: GET,POST,OPTIONS
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Credentials: true
```
