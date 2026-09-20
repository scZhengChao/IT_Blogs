# jQuery 延迟对象

在jQuery 1.5中介绍了 `Deferred` 延迟对象，它是通过调用 `jQuery.Deferred()` 方法来创建的可链接的实用对象。它可注册多个回调函数到回调列表，调用回调列表并且传递异步或同步功能的成功或失败的状态。 &#x20;
延迟对象是可链接的，类似于一个 `jQuery` 对象可链接的方式，区别于它有自己的方法。在创建一个 `Deferred` 对象之后，您可以使用以下任何方法，直接链接到通过调用一个或多个的方法创建或保存的对象。

| 方法                                                                                                                  | 描述                                                                |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| \[\\\$.Deferred()]\(<https://www.runoob.com/jquery/misc-jquery-deferred.html> "\\\$.Deferred()")                    | 返回一个链式实用对象方法来注册多个回调                                               |
| \[deferred.always()]\(<https://www.runoob.com/jquery/misc-deferred-always.html> "deferred.always()")                | 当Deferred（延迟）对象被受理或被拒绝时，调用添加的处理程序                                 |
| \[deferred.done()]\(<https://www.runoob.com/jquery/misc-deferred-done.html> "deferred.done()")                      | 当Deferred（延迟）对象被受理时，调用添加的处理程序                                     |
| \[deferred.fail()]\(<https://www.runoob.com/jquery/misc-deferred-fail.html> "deferred.fail()")                      | 当Deferred（延迟）对象被拒绝时，调用添加的处理程序                                     |
| \[deferred.isRejected()]\(<https://www.runoob.com/jquery/misc-deferred-isrejected.html> "deferred.isRejected()")    | 从jQuery1.7开始已经过时，确定 Deferred 对象是否已被拒绝                             |
| \[deferred.isResolved()]\(<https://www.runoob.com/jquery/misc-deferred-isresolved.html> "deferred.isResolved()")    | 从jQuery1.7开始已经过时，确定 Deferred 对象是否已被解决                             |
| \[deferred.notify()]\(<https://www.runoob.com/jquery/misc-deferred-notify.html> "deferred.notify()")                | 给定一个参数，调用正在延迟对象上进行的回调函数( progressCallbacks )                      |
| \[deferred.notifyWith()]\(<https://www.runoob.com/jquery/misc-deferred-notifywith.html> "deferred.notifyWith()")    | 给定上下文和参数，调用正在延迟对象上进行的回调函数( progressCallbacks )                    |
| \[deferred.pipe()]\(<https://www.runoob.com/jquery/misc-deferred-pipe.html> "deferred.pipe()")                      | 过滤 and/or 链式延迟对象的工具方法                                             |
| \[deferred.progress()]\(<https://www.runoob.com/jquery/misc-deferred-progress.html> "deferred.progress()")          | 当Deferred（延迟）对象生成进度通知时，调用添加处理程序                                   |
| \[deferred.promise()]\(<https://www.runoob.com/jquery/misc-deferred-promise.html> "deferred.promise()")             | 返回 Deferred(延迟)的 Promise 对象                                       |
| \[deferred.reject()]\(<https://www.runoob.com/jquery/misc-deferred-reject.html> "deferred.reject()")                | 拒绝 Deferred（延迟）对象，并根据给定的参数调用任何 failCallbacks 回调函数                 |
| \[deferred.rejectWith()]\(<https://www.runoob.com/jquery/misc-deferred-rejectWith.html> "deferred.rejectWith()")    | 拒绝 Deferred（延迟）对象，并根据给定的 context 和 args 参数调用任何 failCallbacks 回调函数 |
| \[deferred.resolve()]\(<https://www.runoob.com/jquery/misc-deferred-resolve.html> "deferred.resolve()")             | 解决Deferred（延迟）对象，并根据给定的参数调用任何 doneCallbacks 回调函数                  |
| \[deferred.resolveWith()]\(<https://www.runoob.com/jquery/misc-deferred-resolveWith.html> "deferred.resolveWith()") | 解决Deferred（延迟）对象，并根据给定的context 和 args 参数调用任何 doneCallbacks 回调函数   |
| \[deferred.state()]\(<https://www.runoob.com/jquery/misc-deferred-state.html> "deferred.state()")                   | 确定一个Deferred（延迟）对象的当前状态                                           |
| \[deferred.then()]\(<https://www.runoob.com/jquery/misc-deferred-then.html> "deferred.then()")                      | 当Deferred（延迟）对象解决，拒绝或仍在进行中时，调用添加处理程序                              |
| \[.promise()]\(<https://www.runoob.com/jquery/misc-promise.html> ".promise()")                                      | 返回一个 Promise 对象，观察某种类型被绑定到集合的所有行动，是否已被加入到队列中                      |

[jQuery.Deferred()](./jQuery.Deferred()/index.md "jQuery.Deferred()")

[deferred.always()](./deferred.always()/index.md "deferred.always()")

[deferred.done() ](./deferred.done()-/index.md "deferred.done() ")

[deferred.fail()](./deferred.fail()/index.md "deferred.fail()")

[deferred.notify()](./deferred.notify()/index.md "deferred.notify()")

[deferred.notifyWith() ](./deferred.notifyWith()-/index.md "deferred.notifyWith() ")

[deferred.pipe()](./deferred.pipe()/index.md "deferred.pipe()")

[deferred.progress()](./deferred.progress()/index.md "deferred.progress()")

[deferred.promise()](./deferred.promise()/index.md "deferred.promise()")

[deferred.reject() ](./deferred.reject()-/index.md "deferred.reject() ")

[deferred.rejectWith()](./deferred.rejectWith()/index.md " deferred.rejectWith()")

[deferred.resolve()](./deferred.resolve()/index.md "deferred.resolve()")

[deferred.resolveWith()](./deferred.resolveWith()/index.md "deferred.resolveWith()")

[deferred.state()](./deferred.state()/index.md "deferred.state()")

[deferred.then()](./deferred.then()/index.md "deferred.then()")

[ .promise() 方法](<./-promise() 方法/index.md> " .promise() 方法")
