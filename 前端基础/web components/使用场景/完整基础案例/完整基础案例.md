# 完整基础案例

```html 
<!DOCTYPE html>
<html>
<head>
  <title>Web Components Demo</title>
  <style>
    /* 主文档样式不会影响 Shadow DOM 中的元素 */
    p { color: blue; }
  </style>
</head>
<body>
  <template id="popup-info">
    <style>
      .wrapper {
        position: relative;
      }
      .info {
        display: inline-block;
        padding: 5px 10px;
        background: #ffeb3b;
        border-radius: 4px;
        margin-left: 10px;
      }
      .icon {
        width: 16px;
        height: 16px;
        vertical-align: middle;
        opacity: 0.6;
      }
    </style>
    <div class="wrapper">
      <span class="info">
        <slot name="icon">ℹ️</slot>
        <slot name="text">Default text</slot>
      </span>
    </div>
  </template>

  <popup-info>
    <span slot="icon">💡</span>
    <span slot="text">This is a custom tooltip!</span>
  </popup-info>

  <script>
    class PopupInfo extends HTMLElement {
      constructor() {
        super();
        
        // 获取模板内容
        const template = document.getElementById('popup-info');
        const templateContent = template.content;
        
        // 创建 Shadow DOM
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(templateContent.cloneNode(true));
      }
    }
    
    customElements.define('popup-info', PopupInfo);
  </script>
</body>
</html>
```
