# registerXXXX

以 `register` 开头的这部分 Api 多是用于“**注册**”某些东西，比如注册一个命令 `registerCommand`，注册一个微生成器 `registerGenerator`。

大多数是传入**一个对象**，并且这个对象中有一个值，比如 `key` 或者 `name` 来作为**唯一标识。**

```javascript 
api.registerXXXX({ key: string, name: string,})

```


比如注册一个命令：

```javascript 
api.registerCommand({
    name: 'hello',
    fn() {
        console.log('Hello Umi Developer')
    },
});

```


执行之后就会多一个命令，你可以在你的项目中使用 `umi hello`。像官方提供的方法如 `umi dev`，`umi build` 都是以这个方式添加的。
