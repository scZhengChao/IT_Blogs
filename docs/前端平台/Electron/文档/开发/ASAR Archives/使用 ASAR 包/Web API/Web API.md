# Web API

在网页中，可以使用 `file:` 协议请求归档中的文件。 就像是 `Node API, ASAR` 存档可以被作为目录处理.

例如，用 `$.get` 获取文件:

```javascript 
<script>
let $ = require('./jquery.min.js')
$.get('file:///path/to/example.asar/file.txt', (data) => {
  console.log(data)
})
</script>
```
