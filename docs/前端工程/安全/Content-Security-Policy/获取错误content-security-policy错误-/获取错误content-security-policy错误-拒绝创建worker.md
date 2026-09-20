# 获取错误content-security-policy错误:拒绝创建worker

[ 获取错误content-security-policy错误:拒绝创建worker-腾讯云开发者社区-腾讯云 在我的angular项目中。我得到了下面提到的错误refused to create a worker from 'blob:http://localhost:4200/d8633b89-9f70-4fd6-b08a-e369ccd34273' because it violates the following Content Security Policy directive: "script- https://cloud.tencent.com/developer/ask/sof/106391694](https://cloud.tencent.com/developer/ask/sof/106391694 " 获取错误content-security-policy错误:拒绝创建worker-腾讯云开发者社区-腾讯云 在我的angular项目中。我得到了下面提到的错误refused to create a worker from 'blob:http://localhost:4200/d8633b89-9f70-4fd6-b08a-e369ccd34273' because it violates the following Content Security Policy directive: \"script- https://cloud.tencent.com/developer/ask/sof/106391694")

```javascript 
default-src 'self';
script-src 'self' 'unsafe-eval' https://cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/es5/build/pdf.worker.js;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
img-src 'self' data: https://*.amazonaws.com;
media-src 'self' data: https://*.amazonaws.com;
connect-src 'self' http://localhost:* ws://localhost:*;
font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com data:;
child-src blob:;
 worker-src blob:;
```


Refused to connect to '\<URL>' because it violates the following Content Security Policy directive: "default-src 'self' 'connect-src'". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback.

```javascript 
<meta
      http-equiv="Content-Security-Policy"
      content="
      default-src 'self';
      script-src 'self';
       connect-src *;
       style-src 'self' 'unsafe-inline';
      img-src 'self' data:;
      worker-src blob:;
"
```
