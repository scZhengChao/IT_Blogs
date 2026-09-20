# :focus

## 目录

- [div或按钮鼠标经过或鼠标点击后效果样式](#div或按钮鼠标经过或鼠标点击后效果样式)

# div或按钮鼠标经过或鼠标点击后效果样式

![](./assets/image/image_tzIbUqBh78.png)

注意：如果是div，必须加上 [tabindex](https://so.csdn.net/so/search?q=tabindex\&spm=1001.2101.3001.7020 "tabindex")="1"，否则，focus失效

```javascript 
          <div class="menu_label" tabindex="1">标签1</div>
          <div class="menu_label" tabindex="1">标签2</div>
          <div class="menu_label" tabindex="1">标签3</div>
          <div class="menu_label" tabindex="1">标签4</div>
          <div class="menu_label" tabindex="1">标签5</div>
          <div class="menu_label" tabindex="1">标签6</div>
```


active：鼠标经过后的样式

focus：鼠标点击后的样式

```javascript 
 
    .menu_label {
      float: left;
      border: 1px rgb(67, 150, 202) solid;
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 3px;
      padding-top: 1px;
      border-radius: 15px;
      font-size: 10px;
      margin-left: 15px;
      margin-top: 8px;
      color: rgb(67, 150, 202);
      /* font-weight: bold; */
      margin-bottom: 7px;
    }
    .menu_label:active {
      background-color: rgb(67, 150, 202);
      color: white;
    }
    .menu_label:focus {
      background-color: rgb(67, 150, 202);
      color: white;
    }
```
