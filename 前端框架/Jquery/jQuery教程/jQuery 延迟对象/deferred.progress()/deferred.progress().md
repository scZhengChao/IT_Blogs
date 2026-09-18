# deferred.progress()

## 目录

- [定义和用法](#定义和用法)
- [语法](#语法)

## 定义和用法

`deferred.progress()` 函数当`Deferred`（延迟）对象生成进度通知时，调用添加处理程序。

**注意：**当通过调用 `notify` 或 `notifyWith` 使延迟对象**产生进度通知时**，`progressCallbacks` 就会被调用。 由于 `deferred.progress()`返回的是**延迟对象**，所以其它**延迟对象方法可以链接到该对象上**。当延迟对象被 `resolved` 或 `rejected` 时， 进度回调函数将不再被调用。

## 语法

`deferred.progress( progressCallbacks )`

| 参数                   | 描述                                               |
| -------------------- | ------------------------------------------------ |
| *progressCallbacks*​ | Function类型 一个函数或者函数数组，当Deferred（延迟）对象生成进度通知时被调用。 |
