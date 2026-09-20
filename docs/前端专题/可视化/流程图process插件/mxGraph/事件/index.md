# 事件

## 目录

- [监听事件](#监听事件)
- [ADD\_CELLS 与 CELLS\_ ADD 的区别](#ADD_CELLS-与-CELLS_ADD-的区别)
- [监听 Cell 添加事件](#监听-Cell-添加事件)

本项目监听事件写在[AppCanvas.vue](https://link.segmentfault.com/?enc=Uy2jhAcORd1C4NYjr/YhkQ==.NoiZ/T6Lhu2ZQ06o4YDF/MhLpxzxOPsqQeNv1NFRD5o12HoA8k8DknSHdXui+cO47zd1swMrGhSifSVIzo369DpL7TMgFhMcWmqIKimL1r0= "AppCanvas.vue")的 `_listenEvent` 方法，可以在这个方法**了解一些常用的事件**。下图来自[mxGraph](https://link.segmentfault.com/?enc=1hZwUu3oms4Mf3kaYQSMQQ==.vCtwo5J6jD4FNPO0PWkKlwgCMgx56mPgVlA+eIRkS7BGvTTZzdEBp7pc42AuzEQA1gHh+2aj0lyP/JAJwWaZY5HtPvTkOul41x/Hx57zwno= "mxGraph")类的方法调用依赖图，我们可以从这里**看出整个框架的事件流动**。

![](./image/image_YEJD0vyiHg.png)

#### 监听事件

本项目的 `_listenEvent` 方法用到两个事件监听对象。

- [mxGraph](https://link.segmentfault.com/?enc=yspQjZOV4ImoYHFzoCMSaw==.Rw6ia8d89m3FvhysZyBVWmyQL76T8BY486DYgsju2GaeUWw4ET2VyXtWNrl50AiOxHcVCqcXYeDIuFii8F+6XhCVTOmjegRfVbSVe61P9Wg= "mxGraph")继承自[mxEventSource](https://link.segmentfault.com/?enc=dTXHMSkkfEjoqLLBD9YXWQ==.oOVeQ+U9XQaBEvz9p3IzsplYGw6GjtdLktP9iAsk2lImGd0C4/uaomTBsfSe8SlQGKwYdNQPlNYYNakFKr9Lff+ox4svRsFpjguWNsZQdKT/dQ98LvR7RAYd84fMsVvbl/bAThkxNLTAQIwdutItiA== "mxEventSource")，**使用父类的**[**addListener**](https://link.segmentfault.com/?enc=TcOEfwP0YH8uzO+FpNrZ+A==.Em5AWikyS7PPXwzXvDqVNLHXEnek3dXJdzbB4KiHdoa3hpAIQ3OC877scEMIXcbaN6HFXl+B55dab+fGHdokzfL88XLPQAye1hU30GzBy1uBaqVbbsQjCPflO+anKpzY4i/vTmJ65M9gyQp2zoKX2Q== "addListener")**方法可以将自身当作一个事件中心进行订阅/广播事件。**
- [mxGraph.getSelectionModel()](https://link.segmentfault.com/?enc=AT22lXC7x02pJyNqvrsCTA==.PXMu86ipMh36XuokTXtg0yEjHhWqYiUET6ynJPtuXjFa1UBmOyzOEyEtE1bKROItSGNDCIiXq+nSacvdCvnGNtHMTkaQnfT+OF8s9N6f3xbh0wzVPgM/9yimqijgIK6FmxeLClNxnNcA6f1kDprXYw== "mxGraph.getSelectionModel()")返回一个[mxGraphSelectionModel](https://link.segmentfault.com/?enc=fap+dVmGddwIbh7IdAoYbA==.XC2P1VylwLXF9f0yMjeHdxMR2AW4c5kZgGvrBpLjYQNa/KRe4G+feKpZP3uehRcNNLKAVl2bxdH8WwhqFmU46tfX4XoMyKlvyPT8mru2o8Q4ZbPWWTYi4YPYXVPOI/oO5Rx0MRwxt+ZCTkhV0renSUJZx8jQCk0fXGZ8IRX3hTw0DVaz+QzodaAOZgJdOP5i "mxGraphSelectionModel")对象，这个**对象也是继承**自`mxEventSource`有`mxEvent.UNDO、mxEvent.CHANGE`**两个事件，**通过监听`mxEvent.CHANGE`事件可以**获取当前被选中的**`Cell`。

#### ADD\_CELLS 与 CELLS\_ ADD 的区别

![](https://segmentfault.com/img/remote/1460000044675086)

`mxGraph`类有很多`XXX_CELLS`、`CELLS_XXXED`这种形式的事件，这部分我还没弄懂，下面仅以添加事件为例探讨这两类事件的区别。

- 添加`Cell`的时候会触发两个事件`ADD_CELLS`、`CELLS_ADDED`， 先触发`CELLS_ADDED`后触发`ADD_CELLS`。
- `ADD_CELLS`在`addCells`方法中触发，而`CELLS_ADDED`在`cellsAdded`方法中触发。而对于[addCells](https://link.segmentfault.com/?enc=l4UA2DCVu6z1SANXoHVUzg==.nNnbYq8yxDjiNtpY+qw8of/Z5l7TW5nGUpn+dGZ0vQ1D6lYcH9XPg/Yno4S6CogHtaRmUUW2M0618FPXEp2P2jW+INgh7HmsZabWc23Z37trZQcNgNAtKHCy56ozbIym "addCells")与[cellsAdded](https://link.segmentfault.com/?enc=HiMDetBd7eOb7HxtdF8NMQ==.9gMi3imPqdFdEyHlTYipcMaM8IuFSMcFNZ+34bQ0AlF+/1rcsy/VPzKI+FORlQamHX0Lu/z2q9/OjJtLY9weKxs/reJzzhiiGwVdVIqC4FcsQ/mkOezFDOwZg4T6Ex7/ "cellsAdded")官方文档的说明并不能体现出两者的区别，再深究下去就要查阅源码了。按经验而言后触发的事件会携带更多的信息，所以平时开发我会监听`ADD_CELLS`事件。`MOVE_CELLS、CELLS_MOVED`、`REMOVE_CELLS、CELLS_REMOVED`等事件与此类似。

#### 监听 Cell 添加事件

从上面的方法调用依赖图中我们可以看到，`insertVertex`、`insertEdge`最终都被当作`Cell`处理，在后续触发的事件也没有对`节点/边`进行区分，而是统一当作`Cell`事件。**所以对于一个**\*\*`Cell`****添加事件，需要自己区别是添加了节点还是添加了边****。\*\*

```javascript 
graph.addListener(mxEvent.CELLS_ADDED, (sender, evt) => {
  const cell = evt.properties.cells[0];
  if (graph.isPart(cell)) {
    return;
  }

  if (cell.vertex) {
    this.$message.info('添加了一个节点');
  } else if (cell.edge) {
    this.$message.info('添加了一条线');
  }
});
```


还有就是对于**子节点添加到父节点的情况**(如本项目将 titleVertex 、normalTypeVertex 添加到 nodeRootVertex)**也是会触发**`Cell`添加事件的。**通常对于这些子节点不作处理**，可以像[05.consistuent.html](https://link.segmentfault.com/?enc=rhhpJfuldNvOiMDKde/CzQ==.xNKP57wzGwCyh7JJuwpIRw2B1Li90yXlTsZ6bTbRBb1fG4dqbisGYR/UUdqZajq4jZIskMMdO7/uI9/D7WpZDFeheFvqQCfkPuzERZj/o2g= "05.consistuent.html")一样用一个`isPart`判断过滤掉。

[mxEvent](./mxEvent/index.md "mxEvent")

[mxEvent.addGestureListeners](./mxEvent.addGestureListeners/index.md "mxEvent.addGestureListeners")

[graph.addMouseListener](./graph.addMouseListener/index.md "graph.addMouseListener")

[自定义事件](IT/前端专题/可视化/流程图process插件/mxGraph/事件/自定义事件/自定义事件.md "自定义事件")

[mxEventObject](./mxEventObject/index.md "mxEventObject")

[mxMouseEvent](./mxMouseEvent/index.md "mxMouseEvent")

[听函数 中 获取出发该事件的 cell 对象](<./听函数 中 获取出发该事件的 cell 对象/index.md> "听函数 中 获取出发该事件的 cell 对象")

[mxKeyHandler](./mxKeyHandler/index.md "mxKeyHandler")

[获取 mxGraph 绑定的所有事件](<./获取 mxGraph 绑定的所有事件/index.md> "获取 mxGraph 绑定的所有事件")

[mxPanningHandler](./mxPanningHandler/index.md "mxPanningHandler")
