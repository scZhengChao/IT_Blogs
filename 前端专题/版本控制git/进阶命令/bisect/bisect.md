# bisect

## 目录

- [用 git bisect 快速定位你想找的 commit](#用-git-bisect-快速定位你想找的-commit)
  - [总结](#总结)

# 用 git bisect 快速定位你想找的 commit

当项目报错，你想定位是哪个 commit 引入的错误的时候，会怎么做呢？

有的同学说可以看文件的历史呀，看文件是在哪个 commit 改的。

**但这种方式前提是你确定是哪行代码引起的错误。**

如果不知道哪里导致的呢？

那可以一个个 commit 试呀。

但如果 commit 很多，有几十个呢？难道要全部试一遍么？

对列表搜索最快的方式是二分查找，用这种方式来查找会不会更高效呢？

没错，我们确实可以通过二分的方式来查找：

先确定查找的 commit 范围，试下中间的 commit 有没有问题，然后缩小范围，再试下中间的，逐步缩小范围直到只有一个 commit。这个 commit 就是引入问题的 commit。

自己来做二分查找的话，每次都要计算 commit 列表中间的 commit 是哪个，这还是比较麻烦的，所以 git 内置了命令来支持，就是 git bisect 命令。

bisect 就是二分的意思。

![](image_BEEarQXUbb.png)

我们创建个 demo 项目试一下：

git init 初始化，然后新建 a.js，里面每一行提交一个 commit：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f87cc5113f74ad58cafd79c424447ae~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

b.js 也是每行创建一个 commit：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bc9bcc39e504e33b0529e949c291c6d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这样就有 7 个 commit 了：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e7d4c159fba4a2d8266cbd9eaf79276~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这里是 333 的 commit 引入的错误。但如果我们不知道是哪个 commit 引入的问题，该怎么定位呢？

这时候就可以用 git bisect 命令了。

**执行 git bisect start 开始搜索：**

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c629b5aed0c7434f840d9c695be3792d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**提示是等待指定 bad 和 good 的 commit。**

**最新的 commit 是有问题的，所以是 bad：**

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3bdcf6bf0ce04a269c79ef7562729b3d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

指定\*\* bad 之后，会告诉你已经知道了，还缺一个 good 的\*\*。

我们把 **111 那个 commit 做为 good 的：**

![](image_TI5ZZQw1CK.png)

![](image_bLJN9ibOj1.png)

这时候提示你还有 2 个 commit 要测试，也就是还有 2 步。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/719108b803de4b38b9726e2c8702266f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

你指定了 good、bad 的范围，那中间的 commit 算出来就是 444。

再取两次 bad、good 的范围，就能定位到目标 commit 了。

这时候 git log 可以看到已经切换到 444 的 commit。

![](image__C58tzwhIe.png)

**我们跑下代码：**

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/582a3cb3162d45e9bbc02d362c118376~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**这时候还是报错的，所以继续指定当前 commit 为 bad：**

![](image_tOugGrXrTg.png)

这时候中间的 commit 是 333，还需要 1 步了。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85af319ee05c4fdf94f404297eaeb7c3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这时候确实切换到了 333：

![](image_lEL0kuOKM_.png)

这时候执行 git bisect view 是这样的：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74942d5befc34c5b8558d280b3eb59c4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**git bisect view 就是查看还剩下的 commit。**

再跑下代码看看：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b99c6c726ae403191e3109cf8b4a010~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这时**候代码还是报错，所以再标记为 bad。**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b39dc51634c40faaee1eb74fbff4599~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc6ebc0366984ba5bda995e6822ed61d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

然后切换到**了 222，这时候没报错了，标记为 good：**

![](image_b5atN3WOzB.png)

![](image__bVjprjNPS.png)

这样就找到了哪个 commit 出的错，是 333 这个 commit

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6fbfcf17f5ad4740b75a919ca6ac76f0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

我们执行 git show 这个 commit：

```nginx 
git show fd4dbe4

```


可以看到，确实是这个 commit 引入的错误：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3d37581473c4e84b5a738dd72e08c78~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这就是 git bisect 命令的使用方式。

如果你知道啥是二分查找，这个 git bisect 命令还是很容易学会的。

**我们可以执行 git bisect log 回顾下整个查找过程：**

![](image_EwEiKiTppo.png)

通过一步步的二分查找，最终定位到了第一个出错的 commit。

当然，它的作用不只是查找出错的 commit 这么简单，你可以用它来查找任意的 commit，比如想查找是哪个 commit 导致的性能降低，是哪个 commit 实现的某个功能等。

不过这时候再用 good、bad 来标识就不合适了。

**所以 git bisect 还提供了另一套标记：old、new**

**使用方式和 good、bad 没区别。**

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a45ad8d0322c4a08b6f755639a65352f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

但是不能混用，你用了 good 就只能用 bad，用了 new 就只能用 old。

**你可以用 git bisect terms 来查看当前的标记是啥：**

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54a63099f3734862b05a3c1be4c523c3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这个标记也可以自己指定。

**我们 git bisect reset 结束查找过程，commit 会回到原来的 777：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d107b98577e74c8196f71599f42f23ed~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](image_asucFC_MT6.png)

然后\*\* git bisect start 的时候用 --term-good、--term-bad 来指定一套新标记：\*\*

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b33e7db5cf2f4ec4b7ba8bab6a7d9a7d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这时候 git bisect terms 可以看到确实标记变了：

![](image_f3Fx4TkjYV.png)

这时候就是用 aaa、bbb 来标记区间了：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23630e96edcf48ed98bb246cfcb6e61d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

标记的过程中，不只是有 good、bad 两种情况，有的时候你没法确定是 good 还是 bad 怎么办呢？

**这时候可以 git bisect skip：**

![](image_EjQJUuAh-N.png)

本来是在 444，因为无法确定是否是对的，所以 skip 了，这时候就移到了下一个 commit：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dfafd82612ca4e22b8f705908dffee91~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

然后继续二分的过程。

**那如果我全部都 skip 了呢？**

**那 bisect 也没办法，它会把所有剩下的 commit 列出来，告诉你这些还没测试：**

![](image_Yonca7DdR6.png)

这样是能快速找出目标 commit，但每个 commit 都要手动测试也太麻烦了，能不能自动化执行一个脚本来测试呢？

当然是可以的。

我们建个可执行文件

```nginx 
#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');

if(!fs.existsSync('./a.js')) {
    process.exit(125);
}

try {
    execSync(' node ./a.js');
    process.exit(0);
} catch(e) {
    process.exit(1);
}

```


返回 0 代表当前 commit 是 good，返回 1 到 125 之间的数字代表是 bad，而返回 125 代表 skip。

现在直接执行这个文件会没权限：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b1377e3185d424999ff8577a54a3959~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这样加一下权限就好了

```nginx 
chmod a+x ./test.js  
```


a+x 代表所有的（all）用户增加执行权限的意思。

然后我们开始一个新的 bisect 过程：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/704beedf502e4a2c958fae55e7e69967~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这里我加了两个参数，就是指定了 bad、good 的 commit 的意思，这样就可以直接开始二分了。

此外，你还可以指定哪些路径的 commit：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30e39308fcd8425c9055e0338664dd51~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这样，666、777 没有涉及到 a.js 的更改，所以不在二分查找的范围内，查找的 commit 范围就缩小了很多：。

![](image_wKTzrUneMx.png)

这里我们还是和之前一样的 commit 范围来测试：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89f73a6469234e61859f2c02d6ecd4f9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

&#x20;

```nginx 
git biset run ./test.js
```


通过执行脚本来自动标记 bad、good：

然后执行

![](image_dNZOP2LuOv.png)

可以看到，444 跑脚本报错了，然后回到 333 跑， 还是报错，然后去 222 跑，这是不报错了，就定位到了第一个出错的是 333 这个 commit。

这和前面我们手动测试和标记 good、bad 是一样的流程，只不过自动执行的，方便了很多。

而且，这个过程是可以重做任意次的，你可以把 git bisect log 输出到某个文件，然后 git bisect replay 这个文件：

![](image__UsLBF7Iao.png)

git bisect 会重新按照日志跑一次：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9137f891603244efa21a68af5ae339cb~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这就是 git bisect 的全部用法。

## 总结

想定位是哪个 commit 引入的问题，引起的某些变化，可以用 git bisect 来二分查找。

它有这些命令：

- git bisect start：开启一个二分查找过程
- git bisect good/new：指定某个 commit 为 good/new
- git bisect bad/old：指定某个 commit 为 bad/old
- git bisect terms：查看当前用的标记是啥
- git bisect skip：跳过某个 commit
- git bisect reset：回到 git bisect 前的状态
- git bisect view：当前二分查找过程还剩下多少 commit
- git bisect log：查看 bisect 过程的日志
- git bisect run：通过可执行文件来自动测试和打 good、bad 标记
- git bisect replay：根据日志文件重新跑二分查找过程

想想如果没有 git bisect 命令呢？你需要一个个 commit 的测试，那样也太低效了。
