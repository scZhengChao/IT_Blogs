# 微前端应用集成

**适合场景**：

- **大型企业应用，多个团队独立开发不同模块**
- 渐进式迁移旧系统，逐步替换部分功能
- 需要集成第三方应用的平台

![](./assets/image/image_qL54o_bB1y.webp)

**场景​**​：不同团队使用不同技术栈开发的应用集成到同一页面。

```html 
<!DOCTYPE html>
<html>
<head>
    <title>Micro Frontend Demo</title>
    <style>
        body { font-family: Arial; max-width: 1200px; margin: 0 auto; }
        header { background: #333; color: white; padding: 10px; }
        .app-container { display: flex; margin-top: 20px; }
        .app { border: 1px solid #ddd; padding: 10px; margin: 0 10px; flex: 1; }
    </style>
</head>
<body>
    <header>
        <h1>Micro Frontend Example</h1>
    </header>
    
    <div class="app-container">
        <!-- React 团队开发的购物车组件 -->
        <micro-app name="cart" src="https://example.com/cart-wc.js"></micro-app>
        
        <!-- Vue 团队开发的产品列表组件 -->
        <micro-app name="products" src="https://example.com/products-wc.js"></micro-app>
        
        <!-- Angular 团队开发的用户信息组件 -->
        <micro-app name="user" src="https://example.com/user-wc.js"></micro-app>
    </div>

    <script>
        class MicroApp extends HTMLElement {
            static get observedAttributes() { return ['src']; }
            
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }
            
            connectedCallback() {
                this.loadApp();
            }
            
            attributeChangedCallback(name, oldValue, newValue) {
                if (name === 'src' && oldValue !== newValue) {
                    this.loadApp();
                }
            }
            
            loadApp() {
                const src = this.getAttribute('src');
                if (!src) return;
                
                // 动态加载 Web Component
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => {
                    this.shadowRoot.innerHTML = `
                        <${this.getAttribute('name')}-app></${this.getAttribute('name')}-app>
                    `;
                };
                document.head.appendChild(script);
            }
        }
        
        customElements.define('micro-app', MicroApp);
    </script>
</body>
</html>
```
