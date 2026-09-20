# border-image 导致圆角失效

## 目录

- [方式一](#方式一)
- [方式二（推荐）](#方式二推荐)
- [方式三](#方式三)
- [案例](#案例)

# 方式一

**外部包一个元素**设置`border-radius+overflow:hidden`;实现圆角。

# 方式二（推荐）

`clip-path: inset(0 round 10px)`

- clip-path: inset() 是矩形裁剪
- inset() 的用法有多种，在这里 inset(0 round 10px) 可以理解为，实现一个父容器大小（完全贴合，垂直水平居中于父容器）且 border-radius: 10px 的容器，将这个元素之外的所有东西裁剪掉（即不可见）。

```css 
   clip-path: inset(4px 4px 4px 4px round var(--border-content-radius));
```


# 方式三

> `background `模拟

```html 
<!DOCTYPE html>
<html>
<head>
    <title>test</title>
</head>
<style>
    .rectangle {
        width: 100px;
        height: 100px;
    }
    .border1 {
        border:10px solid #ddd;
        border-image: linear-gradient(red,yellow) 30 30;
    }
    .border2 {
        padding: 10px;
        border-radius: 10px;
        background-image: linear-gradient(222deg, rgba(152, 44, 177, 1), rgba(228, 88, 95, 1));
    }
    .border3 {
        height: 100%;
        background-color: #fff;
    }
</style>
<body>
    <div class="border1 rectangle"></div>
    <div class="border2 rectangle">
        <div class="border3 "/>
    </div>
</body>
</html>
```


![](image_ZUE2tU06rk.png)

# 案例

![](image_tQ5hHEE0Jx.png)

```javascript title="html"
<div className={styles.mode_box_item} data-active={cursorType===CursorTypeEnum.eraser} onClick={onChangeEraserMode}>
    <div className={styles.border_content}>
        <img src={eraserPng} alt='' className={styles.mode_icon}/>
        <div>Erase</div>
    </div>
</div>
```


```css title="css"
.mode_box_item{
  width: 196px;
  height: 42px;
  background: #f3f3f7;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mode_box_item[data-active="true"] {
  box-sizing: border-box;
  padding: 2px;
  background-image: linear-gradient(270deg, #ff812d, #ff47cf);
}
.border_content{
  background: #f3f3f7;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  align-items: center;
  flex: 1;
  height: 100%;
}

.mode_icon{
  margin-right: 16px;
}
```
