# 如何 Debug RxJS 应用？

到这里我们基本上介绍了 RxJS 在前端的主要应用场景，包括实现较为复杂、异步的搜索框组件；承接前端接口防腐层；参与前端状态管理等，讲了那么多 RxJS 的优点，那么也要正视它的一些缺点，其中最主要的痛点之一就是 Debug RxJS 应用，那么何来之痛呢？

看一段上面提到的代码：

```javascript 
const inputSearch = document.querySelector(".search");
    fromEvent(inputSearch, "input")
      .pipe(
        map((e) => e.target.value),
        filter((val) => val),
        debounceTime(250),
        distinctUntilChanged(),
        switchMap((val) => searchWikiPedia(val))
      )
      .subscribe((data) => {
        setItems(data[1] || []);
      });

```


凭你十几年的编程经验，能想到如何调试这段程序🐴？

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e065d2025884f10abc5899398251ce1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

[使用 Tap 操作符](<./使用%20Tap%20操作符/index.md> "使用 Tap 操作符")

[画出 Marble 图](<./画出%20Marble%20图/index.md> "画出 Marble 图")

[借助专业的调试库和可视化工具](./借助专业的调试库和可视化工具/index.md "借助专业的调试库和可视化工具")
