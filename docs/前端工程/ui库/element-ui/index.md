# element-ui

## 目录

- [(1)滚动条
  ](#1滚动条)
- [(2)自带的动画](#2自带的动画)
- [el-table](#el-table)
- [Cascader](#Cascader)

(1)滚动条

```typescript 
1.element-ui 
(1)滚动条
  <el-scrollbar height='100%'>
      <li v-for="user in userList" :key="user.id">{{user.name}}</li>
  </el-scrollbar>
  .el-scrollbar__wrap {
      overflow-x: hidden;
  }
  let scrollbarEl = this.$refs.myScrollbar.wrap
  scrollbarEl.onscroll = function() {
     if(scrollbarEl.scrollTop > 200) {
       _self.visible = true
     } else {
        _self.visible = false
     }
  }  

```


# (2)自带的动画

```javascript 

(2)自带的动画
  // fade/zoom 等
  import 'element-ui/lib/theme-chalk/base.css';
  // collapse 展开折叠
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
  import Vue from 'vue'
  Vue.component(CollapseTransition.name, CollapseTransition)




```


# el-table

```css 
(3) elementUI之el-table左固定列把底部滚动条覆盖导致拖动无效
  .el-table {
      .el-table__fixed {
        height:auto !important; // 此处的important表示优先于element.style
        bottom:17px; // 改为自动高度后，设置与父容器的底部距离，则高度会动态改变
      }
    }

```


# Cascader

```javascript 
(4)Cascader  主动让poper 弹框消失
  this.refs.mycascader.doDestory()
  this.refs.mycascader.inputValue='';//清除输入
  以上两个都有点小问题：最好用的是
  this.refs.mycascader.dropDownVisible = false
```
