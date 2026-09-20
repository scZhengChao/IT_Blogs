# 问答

## 目录

- [Node 模块机制](#Node-模块机制)

[Node.js 有难度的面试题，你能答对几个？ 看到一些 Node.js 面试相关的文章分享下～ https://mp.weixin.qq.com/s/GbcJo3jQRi03EevqJGJHPg](https://mp.weixin.qq.com/s/GbcJo3jQRi03EevqJGJHPg "Node.js 有难度的面试题，你能答对几个？ 看到一些 Node.js 面试相关的文章分享下～ https://mp.weixin.qq.com/s/GbcJo3jQRi03EevqJGJHPg")

## Node 模块机制

```javascript 
 function Module(id, parent) {
  this.id = id;
  this.exports = {};
  this.parent = parent;
  this.filename = null;
  this.loaded = false;
  this.children = [];
}

module.exports = Module;

var module = new Module(filename, parent);

```
