# sendBeacon

## 目录

- [sendBeacon](#sendBeacon)
  - [基本用法](#基本用法)
    - [DOMString类型](#DOMString类型)
    - [Blob类型](#Blob类型)
    - [Formdata类型](#Formdata类型)
  - [兼容:](#兼容)
  - [总结](#总结)

# **sendBeacon**

## 基本用法

```javascript 
navigator.sendBeacon(url, data);
```


url 就是上报地址；data 可以是 `ArrayBufferView`，`Blob`，`DOMString` 或 `Formdata`

则需要保证 `Content-Type`为以下三种之一：

- `application/x-www-form-urlencoded`
- `multipart/form-data`
- `text/plain`

**sendBeacon 如果成功进入浏览器的发送队列后，会返回true；****如果受到队列总数、数据大小的限制后，会返回false。****返回ture后，只是表示进入了发送队列，浏览器会尽力保证发送成功，但是否成功了，无法判断。**

### DOMString类型

```javascript 
//该请求会自动设置请求头的 Content-Type 为 text/plain
const reportData = (url, data) => {
  navigator.sendBeacon(url, data);
};
```


### Blob类型

```javascript 
//这时需要我们手动设置 Blob 的 MIME type，
// 一般设置为 application/x-www-form-urlencoded。

const reportData = (url, data) => {
  const blob = new Blob([JSON.stringify(data), {
    type: 'application/x-www-form-urlencoded',
  }]);
  navigator.sendBeacon(url, blob);
};

```


### Formdata类型

```javascript 
/ 此时该请求会自动设置请求头的 Content-Type 为 multipart/form-data。
var data = {
   name: '前端名狮子'  ,
   age: 20
};
const reportData = (url, data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    let value = data[key];
    if (typeof value !== 'string') {
      // formData只能append string 或 Blob
      value = JSON.stringify(value);
    }
    formData.append(key, value);
  });
  navigator.sendBeacon(url, formData);
};

```


## **兼容:**

```javascript 
sendBeacon方法存在兼容性问题，除了IE，大部分浏览器都已经支持
不支持时，用同步的xhr替代，也就是上面提到的第一种方法。
补丁文件  npm install navigator.sendbeacon 
         <script src="https://unpkg.com/navigator.sendbeacon"></script>
```


## **总结**

**sendBeacon方法具有如下特点：**

- **发出****的是异步请求，并且是POST请求，后端解析参数时，需****要注意处理方式；**
- **发出的请求，是****放到的浏览器任务队列执行的，脱离了当前页面****，所以不会阻塞当前页面的卸载和后面页面的加载过程，用户体验较好；**
- **能判断出是否放入浏览器任务队列，不能判断是否发送成功；**
- **Beacon API不****提供相应的回调****，因此后端返回最好省略response body。**
