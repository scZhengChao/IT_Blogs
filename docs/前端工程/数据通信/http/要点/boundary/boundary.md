# boundary

## 目录

- [ajax](#ajax)

* multipart/form-data 是文件传输的content-type 格式，为了上传文件，等二进制流
* boundary 是**分隔符，分隔多个文件、表单项。**如果**不自己设置，默认由浏览器自动产生，并确保在整个请求体中是唯一的，以便服务器能够正确地解析请求中的各个部分，**
* 在使用 `multipart/form-data` 格式进行数据提交时，每个请求体的部分（part）都需要有一个唯一的分隔符（boundary）来标识不同的部分。这个分隔符是由客户端生成并在请求头中指定的。
* 一般情况下，**开发人员无需手动指定分隔符**，因为大多数 HTTP 客户端库（如**浏览器内置的 XMLHttpRequest、Fetch 或第三方库如 axios）会自动为你生成和处理这些边界和分隔符。**
* 在示例中出现的 `----WebKitFormBoundarywd2ZRr4Hlgf2m5MT` 只是一个**范例分隔符，并非固定值。**实际上，生成的分隔符**可能是随机的**，并且会具有**足够的唯一性以确保它不会与正文中的实际数据发生冲突**。
* 所以，`Content-Type: multipart/form-data; boundary=----WebKitFormBoundarywd2ZRr4Hlgf2m5MT` 中的 `boundary` 值是自动生成的，并且在每个具体的请求中会有不同的值
* 一般情况下，HTTP 客户端库（**如浏览器内置的 XMLHttpRequest、Fetch 或第三方库如 axios**）会自动为你生成并添加正确的分隔符和边界。
* 关于去掉 `boundary` 前面的空格，需要注意的是，根据 HTTP 规范，分隔符的前面可以包含一个或多个空格字符。因此，去掉 `boundary` 前面的空格是不符合规范的行为，可能会导致请求无法被正确解析。
* 建议保持 `Content-Type` 请求头中 `boundary` 前面的空格，以确保与 HTTP 规范的一致性，并避免出现潜在的问题。
* 发现在 multipart/form-data 后面有boundary以及一串字符，这是分界符，后面的一堆字符串是随机生成的，目的是**防止上传文件中出现分界符导致服务器无法正确识别文件起始位置**。说到这肯定就要说说这分界符有啥作用呢？

# ajax

在使用FormData对象通过Ajax向后台传数据时，**必须在选项中**设置"`processData: false,contentType: false,`"两项，否则会报错。

- \*\*`processData`****设置为****`false`****。因为****`data`****值是****`FormData`\*\***对象，不需要对数据做处理。**
- `contentType`设置为`false`。因为是由\<form>表单构造的`FormData`对象，且已经声明了属性enctype="`multipart/form-data`"，所以这里设置为fals

因为对于上传文件，我们没有在使用原有的 http 协议，所以 multipart/form-data 请求是基于 http 原有的请求方式 post 而来的.那么来说说这个全新的请求方式与 post 的区别

1. 请求头的不同，对于上传文件的请求，`contentType = multipart/form-data`是必须的，而 post 则不是，毕竟 post 又不是只上传文件～。
2. 请求体不同。这里的不同也就是指前者在发送的每个字段内容之间必须要使用分界符来隔开，比如文件的内容和文本的内容就需要分隔开，不然服务器就没有办法正常的解析文件，而后者 post 当然就没有分界符直接以 name = "value"的形似发送。

说到这，我们发现在 JQuery ajax() 方法中我们使`contentType = false`,这不是冲突了吗？这当然没有，因为当我们查看这时的 Request headers，会发现还是有分界符。这就是因为当我们在 `form `标签中设置了`enctype = “multipart/form-data”`,这样请求中的 `contentType `就会默认为 `multipart/form-data `。而我们在 ajax 中 `contentType `设置为 `false `是为了\*\*避免`JQuery `\*\***对其操作，从而失去分界符，而使服务器不能正常解析文件。**
