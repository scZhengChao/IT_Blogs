# shadow DOM 高频 API&#x20;

## 目录

- [Shadow Root 操作](#Shadow-Root-操作)
  - [Element.attachShadow(options)](#ElementattachShadowoptions)
  - [ShadowRoot 属性与方法​​：](#ShadowRoot-属性与方法)
- [样式封装 API](#样式封装-API)
- [自定义元素注册扩展 API](#自定义元素注册扩展-API)
  - [1. 注册相关方法](#1-注册相关方法)
    - [customElements.define() 扩展选项](#customElementsdefine-扩展选项)
    - [​自定义元素状态查询​](#自定义元素状态查询)
  - [内置元素扩展](#内置元素扩展)
- [模板与插槽高级 API](#模板与插槽高级-API)
  - [1. 模板操作](#1-模板操作)
    - [克隆模板内容](#克隆模板内容)
    - [模板文档片段操作​](#模板文档片段操作)
  - [插槽高级用法](#插槽高级用法)
    - [插槽分配API](#插槽分配API)
- [属性与特性完整 API 集](#属性与特性完整-API-集)
  - [1. 属性反射](#1-属性反射)
  - [2. 自定义状态 API](#2-自定义状态-API)
- [六、事件系统完整 API](#六事件系统完整-API)
  - [1. 自定义事件创建](#1-自定义事件创建)
  - [2. 事件重定向](#2-事件重定向)
- [高级 DOM 操作 API](#高级-DOM-操作-API)
  - [1. 元素查询扩展](#1-元素查询扩展)
  - [2. 动态节点操作](#2-动态节点操作)
- [八、性能关键 API](#八性能关键-API)
  - [1. 高效渲染模式](#1-高效渲染模式)
  - [2.资源管理 API](#2资源管理-API)
- [九、表单集成 API](#九表单集成-API)
  - [1. 表单关联元素](#1-表单关联元素)
- [十、调试专用 API](#十调试专用-API)
  - [1. 组件状态检查](#1-组件状态检查)

### Shadow Root 操作

##### **Element.attachShadow(options)**

```json 
{
  mode: 'open'|'closed',  // 是否允许外部访问
  delegatesFocus: boolean, // 是否委托焦点
  slotAssignment: 'manual'|'named' // 插槽分配方式
}

```


##### **ShadowRoot 属性与方法​**​：

```javascript 
const shadow = this.shadowRoot;

// 常用属性
shadow.mode; // 'open' 或 'closed'
shadow.host; // 返回宿主元素

// 方法
shadow.getElementById('foo');
shadow.querySelectorAll('.bar');
shadow.getElementsByTagName('div');
```


### 样式封装 API

**:host 选择器变体**

```css 
:host { /* 默认样式 */ }
:host([disabled]) { /* 状态样式 */ }
:host(:hover) { /* 交互样式 */ }
:host(.active) { /* 类名样式 */ }
:host-context(.dark-theme) { /* 上下文样式 */ }
```


**::part 和 ::theme​**

```html 
<!-- 组件内部 -->
<div part="header">Header</div>

<!-- 外部样式 -->
my-element::part(header) {
  color: blue;
}
```


## 自定义元素注册扩展 API

### 1. 注册相关方法

##### **customElements.define() 扩展选项**

```javascript 
customElements.define('fancy-button', FancyButton, {
  extends: 'button',  // 扩展内置元素
  // 其他可能的未来选项
});
```


##### **​自定义元素状态查询​**

```javascript 
// 检查是否已定义
customElements.get('my-element') !== undefined;

// 等待元素定义
await customElements.whenDefined('my-element');
```


### 内置元素扩展

**扩展内置元素完整示例**

```typescript 
class FancyButton extends HTMLButtonElement {
  constructor() {
    super();
    this.style.backgroundColor = 'gold';
  }
}

customElements.define('fancy-button', FancyButton, { extends: 'button' });
```


使用方式：

```html 
<button is="fancy-button">Click me</button>
```


## 模板与插槽高级 API

### 1. 模板操作

##### **克隆模板内容**

```javascript 
const template = document.getElementById('my-template');
const content = template.content.cloneNode(true); // 深度克隆
this.shadowRoot.appendChild(content);
```


##### **模板文档片段操作​**

```javascript 
const fragment = new DocumentFragment();
// 可以像普通DOM一样操作fragment
fragment.appendChild(...);
this.shadowRoot.appendChild(fragment);
```


### 插槽高级用法

##### **插槽分配API**

```javascript 
// 手动分配插槽内容
const slot = this.shadowRoot.querySelector('slot');
slot.assignedNodes(); // 获取已分配节点
slot.assignedElements();

// 手动插槽分配模式
shadowRoot.slotAssignment = 'manual';
slot.assign(...elements);
```


**slotchange 事件详解​**

```javascript 
const slot = this.shadowRoot.querySelector('slot');
slot.addEventListener('slotchange', (e) => {
  const assignedNodes = e.target.assignedNodes();
  console.log('新分配的节点:', assignedNodes);
});
```


## 属性与特性完整 API 集

### 1. 属性反射

**属性 ↔ 特性双向反射**

```javascript 
class MyElement extends HTMLElement {
  // 将JS属性映射到DOM属性
  get disabled() {
    return this.hasAttribute('disabled');
  }
  
  set disabled(val) {
    if (val) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }
}
```


### 2. 自定义状态 API

**ElementInternals 接口**

```javascript 
class CustomCheckbox extends HTMLElement {
  constructor() {
    super();
    this._internals = this.attachInternals();
  }
  
  connectedCallback() {
    this._internals.setFormValue('on');
    this._internals.ariaChecked = 'false';
  }
}
```


## 六、事件系统完整 API

### 1. 自定义事件创建

**完整 CustomEvent 选项**

```javascript 
this.dispatchEvent(new CustomEvent('custom', {
  detail: { /* 自定义数据 */ },
  bubbles: true,    // 是否冒泡
  composed: true,   // 是否跨越Shadow边界
  cancelable: true  // 是否可取消
}));
```


### 2. 事件重定向

**内部事件暴露示例**

```javascript 
// 在组件内部
this.shadowRoot.querySelector('button')
  .addEventListener('click', (e) => {
    this.dispatchEvent(new CustomEvent('button-click', {
      detail: { originalEvent: e },
      composed: true
    }));
  });
```


## 高级 DOM 操作 API

### 1. 元素查询扩展

**Shadow DOM 内的查询**

```javascript 
// 查询Shadow DOM内的元素
this.shadowRoot.getElementById('foo');

// 查询宿主Light DOM中的元素
this.querySelector('slot').assignedNodes();
```


### 2. 动态节点操作

**高效DOM更新模式**

```javascript 
// 使用DocumentFragment批量操作
const fragment = new DocumentFragment();
items.forEach(item => {
  const div = document.createElement('div');
  div.textContent = item;
  fragment.appendChild(div);
});
this.shadowRoot.appendChild(fragment);
```


## 八、性能关键 API

### 1. 高效渲染模式

**requestAnimationFrame 优化**

```javascript 
connectedCallback() {
  this._pendingRender = false;
  
  this.render = () => {
    if (!this._pendingRender) {
      this._pendingRender = true;
      requestAnimationFrame(() => {
        this._renderImpl();
        this._pendingRender = false;
      });
    }
  };
}

attributeChangedCallback() {
  this.render();
}
```


### 2.资源管理 API

**disconnectedCallback 资源清理**

```javascript 
disconnectedCallback() {
  // 清理事件监听
  this._abortController?.abort();
  
  // 清除动画帧
  cancelAnimationFrame(this._frameId);
  
  // 断开ResizeObserver
  this._resizeObserver?.disconnect();
  
  // 清除定时器
  clearTimeout(this._timer);
}
```


## 九、表单集成 API

### 1. 表单关联元素

**完整表单集成示例**

```javascript 
class CustomInput extends HTMLElement {
  static formAssociated = true;
  
  constructor() {
    super();
    this.internals = this.attachInternals();
  }
  
  connectedCallback() {
    this.internals.setFormValue('default');
    this.internals.setValidity({
      valueMissing: !this.value
    }, '该字段为必填项');
  }
}
```


## 十、调试专用 API

### 1. 组件状态检查

**调试方法**

```javascript 
// 检查Shadow Root状态
console.log(this.shadowRoot);

// 查看已注册的自定义元素
console.log(customElements.get('my-element'));

// 检查插槽分配
console.log(this.shadowRoot.querySelector('slot').assignedNodes());
```
