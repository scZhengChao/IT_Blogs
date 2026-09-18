# path

```typescript 
let resolve = function(file){
    return path.resolve(__dirname,file)
}
```


```typescript 
path： 自带有魔术变量 
    主要有：  __dirname 魔术变量  返回当前文件所在的磁盘路径，就是绝对路径 

下面两个类似 parse 和 stringfy    把路径转化成一个对象，在转换成路径 
1.path.parse('c:\\wamp\\xx.png');    磁盘路径(str -> obj)
{
   root: 'c:\\', 盘符
   dir: 'c:\\wamp', 目录
   base: 'xx.png',  文件名
   ext: '.png', 扩展名
}
2.path.format(obj) -> str
   下面的两个是用来     磁盘片段拼接
   
3.path.join('磁盘路径1','磁盘路径2')    从左向右拼接 
    path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');   
   // 返回: '/foo/bar/baz/asdf' 注意.. 又特殊含义
   // app.use(express.static(path.join(__dirname,'public')));  找到当前路径下的public
  // require('path').join(folder, `./**/*.js`)

4. 


 5 . path.normalize() 方法 规范化给定的 path， 解析 '..' 和 '.' 片段。 就是规范路径，没其他作用
     如果出现 ...  这个东西解不开最后一个
 let p = path.normalize(__dirname + '/haha')

6.path.basename方法返 回 path 的最后一部 分
path.basename('/foo/bar/baz/asdf/quux.html');// 返回: 'quux.html'
path.basename('/foo/bar/baz/asdf/quux.html', '.html');// 返回: 'quux'
```


[文件是否存在](文件是否存在.md "文件是否存在")

[绝对路径](绝对路径.md "绝对路径")

[找到目录](找到目录.md "找到目录")

[检查读写权限](检查读写权限.md "检查读写权限")

[删除文件](删除文件.md "删除文件")
