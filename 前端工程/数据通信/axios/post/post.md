# post

## 目录

- [qs.stringfy() 将对象序列化成URL的形式](#qsstringfy-将对象序列化成URL的形式)
- [application/x-www-form-urlencoded](#applicationx-www-form-urlencoded)

[ axios中post请求 json 和 application/x-www-form-urlencoded 使用\_axios post json\_知野先生的博客-CSDN博客 json 请求 https://blog.csdn.net/MuHao\_Hearbeat/article/details/124040998](https://blog.csdn.net/MuHao_Hearbeat/article/details/124040998 " axios中post请求 json 和 application/x-www-form-urlencoded 使用_axios post json_知野先生的博客-CSDN博客 json 请求 https://blog.csdn.net/MuHao_Hearbeat/article/details/124040998")

#### qs.stringfy() 将对象序列化成URL的形式

axios默认数据格式为json,所以：

- 当后端需要接收**json格式的数据时,post请求头不需要设置请求头，数据格式也不需要我们去转换(若数据已经是json)；**
- 当后端需要接**收字符串格式的数据时**，我们需要给post请求头设置`{ ‘content-type’: ’application/x-www-form-urlencoded’ }`，这个时候如果我们传的入参是一个 js 对象，这时候我们就需要用 qs 转换数据格式，qs具体用法如下：

```typescript 
  npm install qs -S

```


# application/x-www-form-urlencoded

```typescript 
import qs from 'qs';
const data = { name:'edward' , age:'25'};  // 我们传的是 js 对象
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),   // 用 qs 将js对象转换为字符串 'name=edward&age=25'
  url: 'http://www.edward.com'
}; 
axios(options);

```
