# 组成

## 目录

- [Custom Elements](#Custom-Elements)
- [Shadow DOM](#Shadow-DOM)
- [HTML Templates](#HTML-Templates)

# Custom Elements

允许开发者定义自己的 HTML 元素及其行为。

```javascript 
class MyButton extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', () => {
      console.log('Button clicked!');
    });
  }
}

customElements.define('my-button', MyButton);
```


使用示例：

```html 
<my-button>Click Me</my-button>
```


# Shadow DOM

提供了一种**封装样式和标记结构的方式**，使其与页面其他部分**隔离**。

```javascript 
class ShadowExample extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        p { color: red; }
      </style>
      <p>This is inside Shadow DOM</p>
    `;
  }
}

customElements.define('shadow-example', ShadowExample);
```


# HTML Templates

`<template>`和`<slot>`元素允许你创建**可复用的标记模板**。

```html 
<template id="user-card">
  <div class="card">
    <h2><slot name="name">Default Name</slot></h2>
    <p><slot name="desc">Default description</slot></p>
  </div>
</template>

<script>
  class UserCard extends HTMLElement {
    constructor() {
      super();
      const template = document.getElementById('user-card');
      const content = template.content.cloneNode(true);
      this.attachShadow({ mode: 'open' }).appendChild(content);
    }
  }
  
  customElements.define('user-card', UserCard);
</script>

<user-card>
  <span slot="name">John Doe</span>
  <span slot="desc">Web Developer</span>
</user-card>
```
