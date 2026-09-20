# 自定义事件

上面提到过 mxGraph 继承自 mxEventSource，**调用父类的**[**fireEvent**](https://link.segmentfault.com/?enc=3MnIAO2pSI+2AMLP1joqCg==.QEb0FoEIY95J1b0EcQekEqVVkFltLAE/ELO+X+azKoUwRIInp6ORQVgoqzUzQEC/VdODzr/TwlDhgDih3qbh8G9PXojCIiHbWlbcj7mCknJN0TuZs4WxGKvpUqi29iioECHGe0fg3V7sfpgcRQg7fw== "fireEvent")**可触发自定义事件**。下面是一个简单的例子

```javascript 
mxGraph.addListener('自定义事件A',()=>{ 
  // do something .....
});
// 触发自定义事件
mxGraph.fireEvent(new mxEventObject('自定义事件A');
```


在本项目[Graph](https://link.segmentfault.com/?enc=Bny6hw0KIjE98XFvZeYMNQ==.P9zdMPpE56B87b0y6O1TfzNOyBdtKDx8wh+Pmx4lUviOWGJlSi7E2Ud0t3l5nnxYQpM670Z1kgravh6Rf6I8l48UMIPgbeW4VO7IobeX36o= "Graph")类的 `_configCustomEvent` 方法我也实现了两个自定义事件。**当边开始拖动时会触发**\*\*`EDGE_START_MOVE`****事件，当节点开始拖动时会触发****`VERTEX_START_MOVE`\*\***事件。**

```typescript 

    _listenEvent() {
      // 监听自定义事件
      graph.addListener(mxEvent.NORMAL_TYPE_CLICKED, this.showNormalTypeSelect);
      graph.addListener(mxEvent.VERTEX_START_MOVE, this.hideTypeSelect);


      // 监听 mxGraph 事件
      const mxGraphSelectionModel = graph.getSelectionModel();
      mxGraphSelectionModel.addListener(mxEvent.CHANGE, this.handleSelectionChange);

      const vm = this;
      graph.addListener(mxEvent.MOVE_CELLS, (sender, evt) => {
        const cell = evt.properties.cells[0];
        const position = Graph.getCellPosition(cell);
        setTimeout(() => {
          vm.$message.info(`节点被移动到 ${JSON.stringify(position)}`);
        }, 1000);
      });

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

      graph.addListener(mxEvent.LABEL_CHANGED, (sender, evt) => {
        vm.$message.info(`内容改变为：${evt.getProperty('value')}`);
      });

      graph.addListener(mxEvent.CONNECT_CELL, (sender, evt) => {
        vm.$message.info(`改变了连线`);
      });
    }
  }

```
