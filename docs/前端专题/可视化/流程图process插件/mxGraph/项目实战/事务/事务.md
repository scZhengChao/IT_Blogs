# 事务

对于图的修改，我们需要放到beginUpdate之间endUpdate，这里面的所有操作就是一个事务。和数据库的事务类似，它要么都成功要么都失败，而且mxGraph的回滚(undo)也是以事务为单位的。因此正确的写法是首先调用beginUpdate；然后把图的修改放到try里；最后在finally里调用endUpdate。代码类似如下结构：

```typescript 
model.beginUpdate();
try
{
  //更新点和边
}
finally
{
  model.endUpdate();
}

```


按照官方这个说明，如果我不需要撤消/重做功能，是不是可以不使用这两个方法呢。我试着把这两个方法从 HelloWorld 例子的代码中删掉，结果程序还是可以正常运行。
