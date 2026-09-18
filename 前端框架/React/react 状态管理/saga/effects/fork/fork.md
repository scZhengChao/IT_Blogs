# fork

## 目录

- [fork(fn,...args)](#forkfnargs)
- [cancel(task)](#canceltask)
- [cancelled](#cancelled)

### fork(fn,...args)

> 相当于开启了一个新的进程，**fork不会阻塞当前的saga。而take会阻塞。fork返回一个任务标识**，可用cancel销毁。

### cancel(task)

> 取消任务fork返回的任务执行。

### cancelled

> cancelled(),如果当前任务被cancel取消返回true。
