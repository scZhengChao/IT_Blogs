# 输入框限制大写

## 目录

- [基于formItem](#基于formItem)
- [推荐方案](#推荐方案)
- [拓展：设置光标](#拓展设置光标)

很有多方式；不过目前试下来都有bug

# 基于formItem

- normalize
- getValueFromEvent

均会出现 输入小写或者中文时；光标跳动问题；

- onChange 监听；然后在设置 value 值；在复杂情况或者浏览起版本比较低的情况下；会出现兼容问题

# 推荐方案

- **css 实现；提交时在用js 转换**

```css 
.uppercase-input{
  .ant-input{
    text-transform: uppercase!important;
  }
}

```


# 拓展：设置光标

只是为了拓展；方案仍有缺陷；基于pro-form

```javascript 
fieldProps={{
  className:'upper-input',
  onKeyUp:function(e){
    const target = e.target
    const  keyNum= window.event ? e.keyCode :e.which;
     // const start = target.selectionStart
    // const end = target.selectionEnd
     if(![39,37].includes(keyNum)){  // 左右箭头；
       target.setSelectionRange(startIndex,startIndex)
     }
  },
  onChange:function (e){
    const target = e.target
    const start = target.selectionStart
    startIndex = start
  }
}}
// 设置光标位置： onchange 是准确的；onKeyUp:用来纠正；但是还是有缺陷；元素的位置没有对齐；正常的是自动对齐的；
```
