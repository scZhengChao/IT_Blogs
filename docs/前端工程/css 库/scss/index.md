# scss

## 目录

- [:global的作用](#global的作用)
- [全局关键帧动画](#全局关键帧动画)

### \*\*`:global`\*\***的作用**

- 使用`:global`可以声明一个 **全局样式**，类名不会被哈希化，而是保持原样。

```sass (scss) 
// styles.module.scss
:global(.global-class) {
  color: blue;
}
```


- 在 JS 中直接使用`.global-class`（不需要通过`styles`对象）：

```html 
<div className="global-class">这个样式是全局的</div>
```


### **全局关键帧动画**

```css 
// styles.module.scss
@keyframes :global(fadeIn) {
  from { opacity: 0; }
  to { opacity: 1; }
}
```


- 这样定义的关键帧可以在全局使用（不受 CSS Modules 限制）。

[SCSS Mixin 语法详解](<./SCSS Mixin 语法详解/index.md> "SCSS Mixin 语法详解")
