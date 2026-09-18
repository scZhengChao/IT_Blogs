# 生命周期

## 目录

- [构造函数阶段](#构造函数阶段)
  - [constructor()](#constructor)
- [连接/断开阶段](#连接断开阶段)
  - [connectedCallback()](#connectedCallback)
  - [disconnectedCallback()](#disconnectedCallback)
- [属性变化阶段](#属性变化阶段)
  - [attributeChangedCallback(name, oldValue, newValue)](#attributeChangedCallbackname-oldValue-newValue)
- [自定义元素升级阶段](#自定义元素升级阶段)
  - [customElements.whenDefined(tagName)](#customElementswhenDefinedtagName)
- [扩展生命周期方法](#扩展生命周期方法)

### 构造函数阶段

##### **constructor()**

- **调用时机**：当**元素被创建时**（包括`document.createElement()`或解析 HTML 时）
- **用途**：初始**化状态、设置默认值、创建 Shadow DOM**
- **注意**：此时**元素尚未插入文档，不能访问属性或子元素**

```typescript 
class MyElement extends HTMLElement {
  constructor() {
    super(); // 必须首先调用 super()
    this.attachShadow({ mode: 'open' });
    // 初始化工作...
  }
}
```


### 连接/断开阶段

##### **connectedCallback()**

- **调用时机**：元素首**次插入DOM 或 从DOM移除后又重新插入时**
- **用途**：执行DOM**相关初始化、添加事件监听、启动动画**等
- **最佳实践**：应在此进行**资源获取等副作用操作**

```javascript 
connectedCallback() {
  console.log('元素已插入DOM');
  this.shadowRoot.innerHTML = `<p>Hello World</p>`;
}
```


##### **disconnectedCallback()**

- **调用时机**：元素**从DOM中移除时**
- **用途**：**清理工作、移除事件监听、取消定时器/动画等**
- **重要**：**防止内存泄漏的关键**

```javascript 
disconnectedCallback() {
  console.log('元素已从DOM移除');
  clearInterval(this._interval);
}
```


### 属性变化阶段

##### **attributeChangedCallback(name, oldValue, newValue)**

- **调用时机**：元素的**被观察属性发生变化时**
- **前提**：**必须**先在`observedAttributes`静态**getter中声明要观察的属性**
- **用途**：**响应属性变化、更新组件状态**

```javascript 
static get observedAttributes() {
  return ['disabled', 'size']; // 返回要观察的属性名数组
}

attributeChangedCallback(name, oldValue, newValue) {
  if (name === 'disabled') {
    this.toggleAttribute('aria-disabled', newValue !== null);
  }
}
```


### 自定义元素升级阶段

##### **customElements.whenDefined(tagName)**

- **调用时机**：自定义**元素定义完成后返回Promise**
- **用途**：确保**元素已定义后再执行操作**

```javascript 
customElements.whenDefined('my-element').then(() => {
  console.log('my-element 已定义');
});
```


### 扩展生命周期方法

**adoptedCallback()**

- **调用时机**：当元素被移动到新文档时（如使用`document.adoptNode()`）
- **用途**：处理文档上下文变化的情况

```javascript 
adoptedCallback(oldDocument, newDocument) {
  console.log(`元素从 ${oldDocument} 移动到 ${newDocument}`);
}
```
