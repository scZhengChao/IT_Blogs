# 设计系统组件

**适合场景**：

- 大型企业需要**统一多产品线的视觉风格**
- **跨团队协作**，确保设计一致性
- 需要**长期维护**的设计系统

![](./image/image_w1mEskG_gi.png)

场景：实现公司统一的设计系统，**确保各产品视觉一致性。**

```html 
<!DOCTYPE html>
<html>
<head>
    <title>Design System</title>
</head>
<body>
<design-system theme="light">
    <ds-header>
        <h1 slot="title">Company Design System</h1>
        <p slot="subtitle">Version 1.0.0</p>
    </ds-header>

    <ds-card>
        <h2 slot="title">Buttons</h2>
        <div slot="content">
            <ds-button variant="primary">Primary</ds-button>
            <ds-button variant="secondary">Secondary</ds-button>
            <ds-button variant="danger">Danger</ds-button>
        </div>
    </ds-card>

    <ds-card>
        <h2 slot="title">Alerts</h2>
        <div slot="content">
            <ds-alert type="info">This is an info alert</ds-alert>
            <ds-alert type="success">This is a success alert</ds-alert>
            <ds-alert type="warning">This is a warning alert</ds-alert>
            <ds-alert type="error">This is an error alert</ds-alert>
        </div>
    </ds-card>
</design-system>

<script>
    // 设计系统主题
    class DesignSystem extends HTMLElement {
        static get observedAttributes() { return ['theme']; }

        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.updateTheme();
        }

        attributeChangedCallback() {
            this.updateTheme();
        }

        updateTheme() {
            const theme = this.getAttribute('theme') || 'light';
            this.shadowRoot.innerHTML = `
                    <style>
                        :host {
                            --primary-color: ${theme === 'light' ? '#1890ff' : '#177ddc'};
                            --text-color: ${theme === 'light' ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.85)'};
                            --background-color: ${theme === 'light' ? '#ffffff' : '#141414'};
                            --border-color: ${theme === 'light' ? '#d9d9d9' : '#434343'};
                            display: block;
                            color: var(--text-color);
                            background: var(--background-color);
                            padding: 24px;
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
                        }
                    </style>
                    <slot></slot>
                `;
        }
    }

    // 头部组件
    class DSHeader extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML = `
                    <style>
                        :host {
                            display: block;
                            margin-bottom: 24px;
                        }
                        h1 {
                            font-size: 28px;
                            margin: 0 0 8px 0;
                            color: var(--primary-color);
                        }
                        p {
                            margin: 0;
                            color: var(--text-color);
                            opacity: 0.65;
                        }
                    </style>
                    <div>
                        <h1><slot name="title"></slot></h1>
                        <p><slot name="subtitle"></slot></p>
                    </div>
                `;
        }
    }

    // 卡片组件
    class DSCard extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML = `
                    <style>
                        :host {
                            display: block;
                            margin-bottom: 24px;
                            border: 1px solid var(--border-color);
                            border-radius: 4px;
                            padding: 24px;
                        }
                        h2 {
                            margin-top: 0;
                            margin-bottom: 16px;
                            font-size: 20px;
                        }
                    </style>
                    <div>
                        <h2><slot name="title"></slot></h2>
                        <div><slot name="content"></slot></div>
                    </div>
                `;
        }
    }

    // 按钮组件
    class DSButton extends HTMLElement {
        static get observedAttributes() { return ['variant', 'disabled']; }

        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.render();
        }

        attributeChangedCallback() {
            this.render();
        }

        render() {
            const variant = this.getAttribute('variant') || 'default';
            const disabled = this.hasAttribute('disabled');

            this.shadowRoot.innerHTML = `
                    <style>
                        .btn {
                            padding: 6px 16px;
                            border-radius: 4px;
                            font-size: 14px;
                            cursor: pointer;
                            margin-right: 8px;
                            border: 1px solid transparent;
                            transition: all 0.3s;
                        }
                        .btn-primary {
                            background: var(--primary-color);
                            color: white;
                        }
                        .btn-secondary {
                            background: transparent;
                            border-color: var(--border-color);
                            color: var(--text-color);
                        }
                        .btn-danger {
                            background: #ff4d4f;
                            color: white;
                        }
                        .btn:disabled {
                            opacity: 0.5;
                            cursor: not-allowed;
                        }
                    </style>
                    <button class="btn btn-${variant}" ${disabled ? 'disabled' : ''}>
                        <slot></slot>
                    </button>
                `;
        }
    }

    // 警告组件
    class DSAlert extends HTMLElement {
        static get observedAttributes() { return ['type']; }

        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.render();
        }

        attributeChangedCallback() {
            this.render();
        }

        render() {
            const type = this.getAttribute('type') || 'info';
            const colors = {
                info: { bg: '#e6f7ff', border: '#91d5ff', text: '#1890ff' },
                success: { bg: '#f6ffed', border: '#b7eb8f', text: '#52c41a' },
                warning: { bg: '#fffbe6', border: '#ffe58f', text: '#faad14' },
                error: { bg: '#fff2f0', border: '#ffccc7', text: '#ff4d4f' }
            };
            const { bg, border, text } = colors[type] || colors.info;

            this.shadowRoot.innerHTML = `
                    <style>
                        .alert {
                            padding: 8px 15px;
                            border-radius: 4px;
                            margin-bottom: 8px;
                            border: 1px solid ${border};
                            background: ${bg};
                            color: ${text};
                        }
                    </style>
                    <div class="alert">
                        <slot></slot>
                    </div>
                `;
        }
    }

    customElements.define('design-system', DesignSystem);
    customElements.define('ds-header', DSHeader);
    customElements.define('ds-card', DSCard);
    customElements.define('ds-button', DSButton);
    customElements.define('ds-alert', DSAlert);
</script>
</body>
</html>
```
