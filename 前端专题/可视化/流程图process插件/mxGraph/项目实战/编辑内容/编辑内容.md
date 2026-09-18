# 编辑内容

## 目录

- [编辑内容](#编辑内容)

### 编辑内容

```javascript 
// 编辑时按回车键不换行，而是完成输入
this.setEnterStopsCellEditing(true);
// 编辑时按 escape 后完成输入
mxCellEditor.prototype.escapeCancelsEditing = false;
// 失焦时完成输入
mxCellEditor.prototype.blurEnabled = true;
```


默认情况下输入内容时如果按回车键内容会换行，但**有些场景有禁止换行的需求，希望回车后完成输入**，通过[graph.setEnterStopsCellEditing(true)](https://link.segmentfault.com/?enc=K8+bpz+8VRDQD0eixueIpw==.KQ2Hxbuwvn5q4ZSMesnaxqeoOHLqDfMyslnEyBHec03soGgb4xGLk60qrhJoV1E3+4FPHOuQJjFzn9SortZs4J0uOKyyrKIqgW6RD49kwFF+2YcBgrye/0XGTG3RVfW2ha06y8R2Fowuj/PIZwWrqg== "graph.setEnterStopsCellEditing(true)")设置可以满足需求。

重点说说[mxCellEditor.prototype.blurEnabled](https://link.segmentfault.com/?enc=FQQM7OW0Vef4vSrg7w0UAg==.Fw0AUwRYW4liu49j/6gWkwMVeL/uAw88b8PIWqxHHPvb8ryNlY3tK5PWUqUrEqJjX1fZ66MMQt9G6O3T/usp6enesNxiKtinkhtmDDBLw9zqiTO21Z8EFrHrZF1sWH8yhVAdvQXHw/vGw85eyecowg== "mxCellEditor.prototype.blurEnabled")这个属性，默认情况下如果用户在输入内容时鼠标点击了画布之外的不可聚焦区域(div、section、article等)，节点内的编辑器是不会失焦的，这导致了[LABEL\_CHANGED](https://link.segmentfault.com/?enc=s8Ygkw1a0WfhMhkHPXJ6WQ==.iNQXOGBYxQg6GQ0bMVRzqlyofnE3EHMLXV89GBZMVv9vKjdTL+KdZ2ogs5pni8EIvlY2BgW7zD0PUVyoy3NeIupsHJJUOOJRO0+dT5Dq0RW/8ut0YKFYXgE944855pYtC8VSKfEsCLifxiHMaYd/cg== "LABEL_CHANGED")事件不会被触发。但在实际项目开发中一般我们会期望，如果用户在输入内容时鼠标点击了画布之外的地方就应该算作完成一次输入，然后通过被触发的`LABEL_CHANGED`事件将修改后的内容同步到服务端。通过`mxCellEditor.prototype.blurEnabled = true`这行代码设置可以满足我们的需求。
