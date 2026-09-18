# The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.

## 目录

- [目前未解决；](#目前未解决)
- [尝试](#尝试)

**不要去打印；不要console；也不要去存储到数组之类的；**也**不要用hash-wasm 这个插件去计算**

```javascript 
e.target.result；
```


**文件一大就会报这个错误；** 在某些电脑上面

# 目前未解决；

**尝试方案： 把分片在做小点；**

**最终的尝试；应该是内存溢出了；切片的时候；切小一点；20M；解决了这个问题**

# 尝试

造成错误的主要条件有两个。

当文件被放置在输入元素中并且计算机上的文件名被更改时

如果您将文件放入输入元素并更改计算机上文件的内容

确定发生错误的原因是在输入元素上放置了一个文件并获取了对该文件的引用，然后对原始文件进行了更改，导致该文件出现权限问题。

在这种情况下，我认为可以在输入元素中重新选择文件并再次获取对该文件的引用。但新的问题又出现了。

输入元素是，如果再次选择具有相同文件名的文件，则不会再次引用该文件。

**主要是说本地文件被修改了**

[   https://juejin.cn/post/7004765271793598477](https://juejin.cn/post/7004765271793598477 "   https://juejin.cn/post/7004765271793598477")

[ 检查本地文件是否已更改-腾讯云开发者社区-腾讯云 我有一个web应用程序，用户可以使用html5 选择一个本地文件作为输入。有什么方法可以检查文件是否已经更改，这在现代浏览器中是可行的吗？在历史上，通过轮询文件对象并比较File.lastModifiedDate (不推荐)或File.lastModified属性，这在某些浏览器中是可能的，如QA：中所概述的那样。然而，规范说lastModifiedDate和其他文件数据应该是文件的快照，就像用户 https://cloud.tencent.com/developer/ask/sof/108631741](https://cloud.tencent.com/developer/ask/sof/108631741 " 检查本地文件是否已更改-腾讯云开发者社区-腾讯云 我有一个web应用程序，用户可以使用html5 选择一个本地文件作为输入。有什么方法可以检查文件是否已经更改，这在现代浏览器中是可行的吗？在历史上，通过轮询文件对象并比较File.lastModifiedDate (不推荐)或File.lastModified属性，这在某些浏览器中是可能的，如QA：中所概述的那样。然而，规范说lastModifiedDate和其他文件数据应该是文件的快照，就像用户 https://cloud.tencent.com/developer/ask/sof/108631741")

```typescript 
const reader = new FileReader();

// 尝试读取file，此处目的不是读取，只是判断是否可成功读取，所以slice(0, 1)

reader.readAsText(file.slice(0, 1), "UTF-8");

// 可正常读取

reader.onload = (event) => {

  // 读取结果，如：P

  console.log(event.target.result);

}

// 读取异常

reader.onerror = (err) => {

  // read error caught here

  console.log(err);

  // DOMException: The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.

  // 根据此异常信息可较精确的定位到原因是权限问题

  console.log(err.target.error);

}

```
