# Content-Dispositio

    **附件下载；无需客户端打开它；只需要弹出并下载它**；Content-Disposition应声登场

Content-Disposition字段；客户端会根据**它的值**判断是应该**报文数据当作及时浏览的内容**，还**是可下载的附件**

- **inline ：即时查看**
- **attachment 存为附件**
- 另外**通过参数**指定**保存时应该使用的文件名**：**Content-Disposition: attachment; filename="filename.ext"**

```javascript 
 
res.sendfile = function (filepath) {
    fs.stat(filepath, function(err, stat) {
        var stream = fs.createReadStream(filepath);
        // 设置内容 'text/plain'
        res.setHeader('Content-Type', mime.lookup(filepath));
        // 设置长܈
        res.setHeader('Content-Length', stat.size);
        // 设置为附件
        res.setHeader('Content-Disposition' 'attachment; filename="' + path.basename(filepath) + '"');
        res.writeHead(200);
        stream.pipe(res);
    });
};
```
