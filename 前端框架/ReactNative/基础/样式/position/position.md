# position

## 目录

- [position](#position)
- [坑](#坑)
  - [zIndex](#zIndex)

# position

- position:’relative’  相对规划。这个和html的position有很大的差别，**他的相对规划不是相对于父容器，而是相对于兄弟节点。**\*\* 以元素本来的位置为基准进行偏移。\*\* ​
- position:’absolute’  相对规划。**这个是相对于父容器举行据对规划。**相对规划是离开文档流的，不过**奇怪的是依旧在文档条理构造内里，这个**和html的position也很大不一样。别的另有一个和html不一样的是，html中position:absolute请求父容器的position必需是absolute或许relative，假如第一层父容器position不是absolute或许relative，在html会顺次向上递归查询直到找到为止，然后居于找到的父容器相对定位。&#x20;

**flexbox定位和position定位可以同时使用，**

# 坑

##### zIndex

- zIndex 如果用在webView上；会导致H5里的层级异常；
- 解决办法；用View包含 webview；
