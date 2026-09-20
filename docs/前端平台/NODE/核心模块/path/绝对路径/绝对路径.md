# 绝对路径

## 目录

- [resolve](#resolve)

# resolve

&#x20;`path.resolve`磁盘片段拼接,右到左找根，找到后停止拼接
（**从右向左找，** 找到根目录后停止评价，绝对的绝对路径） 如果找不到根目录就以当前的绝对路径 拼接

```javascript 
app.set('views', path.resolve('views'));
```
