# getFunction

## 目录

- [方法定义](#方法定义)
- [使用场景](#使用场景)
- [方法特点](#方法特点)
- [实际应用示例](#实际应用示例)
  - [临时禁用按键处理](#临时禁用按键处理)
  - [按键处理函数链式调用](#按键处理函数链式调用)
- [注意事项](#注意事项)

`mxKeyHandler.prototype.getFunction`是 mxGraph 中`mxKeyHandler`类的一个方法，**用于获取与特定按键码绑定的处理函数。**

## 方法定义

```javascript 
/**
 * 返回指定按键码的当前处理函数
 * @param {number} keyCode 要查询的按键码
 * @return {Function} 与该按键码绑定的函数，如果未绑定则返回null
 */
mxKeyHandler.prototype.getFunction = function(keyCode) {
  return this.keyHandler[keyCode] || null;
};
```


## 使用场景

1. **检查按键是否已绑定处理函数**

```javascript 
var handler = new mxKeyHandler(graph);

// 检查上箭头键(38)是否有绑定
if (handler.getFunction(38) {
  console.log('上箭头键已绑定处理函数');
} else {
  console.log('上箭头键未绑定处理函数');
}
```


1. **动态修改按键绑定**

```javascript 
// 获取现有处理函数
var oldHandler = keyHandler.getFunction(38);

// 添加新处理函数前保留旧函数
keyHandler.bindKey(38, function(evt) {
  if (oldHandler) oldHandler(evt); // 调用旧处理函数
  console.log('新增的上箭头键处理逻辑');
});
```


1. **调试按键绑定**

```javascript 
// 打印所有已绑定的按键
for (var keyCode in keyHandler.keyHandler) {
  console.log('按键码:', keyCode, 
            '处理函数:', keyHandler.getFunction(parseInt(keyCode)));
}
```


## 方法特点

1. **返回值**：
   - 返回绑定到指定按键码的函数
   - 如果按键码未绑定任何函数，返回`null`
2. **与 bindKey 的关系**：
   - 此方法是`bindKey`的配套方法
   - `bindKey`用于设置处理函数，`getFunction`**用于获取已设置的处理函数**
3. **典型使用模式**：

```javascript 
// 绑定按键
keyHandler.bindKey(13, function(evt) { // 回车键
  console.log('回车键按下');
});

// 获取绑定
var enterHandler = keyHandler.getFunction(13);
enterHandler && enterHandler(new Event('keydown')); // 手动触发
```


## 实际应用示例

### 临时禁用按键处理

```javascript 
// 保存原始处理函数
var originalEnterHandler = keyHandler.getFunction(13);

// 临时替换为空函数
keyHandler.bindKey(13, function() {});

// 恢复原始处理函数
setTimeout(function() {
  keyHandler.bindKey(13, originalEnterHandler);
}, 5000); // 5秒后恢复
```


### 按键处理函数链式调用

```javascript 
// 获取现有的ESC键处理
var escHandler = keyHandler.getFunction(27);

// 添加新的ESC键处理，同时保留原有功能
keyHandler.bindKey(27, function(evt) {
  if (escHandler) escHandler(evt); // 调用原有处理函数
  console.log('新增的ESC键处理逻辑');
});
```


## 注意事项

1. **按键码标准**：
   - 使用标准的JavaScript键码值
   - 例如：回车=13，ESC=27，上箭头=38等
2. **作用域问题**：
   - 获取的处理函数会保留原始绑定时的作用域
3. **性能考虑**：
   - 频繁调用此方法不会影响性能
   - 内部只是简单的对象属性查找

`getFunction`方法在需要动态管理键盘绑定的高级场景中非常有用，特别是当需要临时修改、扩展或调试现有按键处理逻辑时。
