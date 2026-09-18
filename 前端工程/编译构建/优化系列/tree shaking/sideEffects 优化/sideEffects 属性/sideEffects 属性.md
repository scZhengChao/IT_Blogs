# sideEffects 属性

与判断一个变量是否被使用相比，判断一个模块是否具有副作用是一个更加复杂的过程。考虑对 `util.js` 进行以下修改：

```javascript 
export const c = 123;
export const d = test();
function test(){
  return 456;
}
```


在这个例子中，**尽管函数 ****`test`**** 是一个无副作用的函数调用**，**`Webpack`无法确认这一点**，因此它仍然将**该模块视为可能具有副作用**。结果是，`util.js` 被包括在最终输出中。

为了让 `Webpack` 知道 `test` **函数没有副作用，有两种方法可以采用**：

1. 纯注解：通过给函数调用添加一个纯注解，你表明这个函数没有副作用。

```javascript 
export const c = 123;
export const d = /*#__PURE__*/ test();
function test(){
  return 456;
}
```


1. `sideEffects` 属性：当一个**模块包含多个顶层声明时，给每个声明标记纯注解可能既繁琐又容易出错**。因此，Webpack 引入了 `sideEffects` 属性来标记整个模块为无副作用的。在模块的 `package.json` 中添加 `"sideEffects": false`，可以安全地移除 `util.js`。

```javascript 
// package.json
{
  "sideEffects": false
}
```


然而，一个被标记为 `sideEffect: false` 的模块如果依赖于另一个被标记为 `sideEffect: true` 的模块，这会引起一些问题。考虑这样一个场景：`button.js` 导入了 `button.css`，其中 `button.js` 被标记为 `sideEffects: false`，而 `button.css` 被标记为 `sideEffects: true`：

```javascript 
// package.json
{
    "sideEffects": ["**/*.css", "**/side-effect.js"]
}

// a.js
import { Button } from 'antd';

// index.js
import { Button } from './button';

// button.js
import './button.css';
import './side-effect';
export const Button = () => {
  return `<div class="button">btn</div>`
}

// button.css
.button {
  background-color: red;
}

// side-effects.js
console.log('side-effect');
```


如果 `sideEffects` 只标记当前模块是否有副作用，根据 ESM 标准，因为 `button.css` 和 `side-effect.js` 都具有副作用，理应被打包。但是，Webpack 的输出结果并未包括 `button.css` 或 `side-effect.js`。

**`sideEffects`**\[3] **之所以特别有效，是因为它允许跳过整个模块/文件及其完整的子树。**

如果一个模块被标记为 `sideEffect: false`，这**表明如果该模块的导出变量未被使用，则可以安全地移除该模块及其整个子树。** 这一点解释了为什么在提到的例子中，`button.js` 及其子树（包括 `button.css` 和 `side-effect.js`）可以被安全删除，这在组件库的情景中尤为重要。

不幸的是，这种行为在不同的打包工具中表现不一。测试表明：

- Webpack：能够安全地删除子树中含副作用的 CSS 和 JS。
- esbuild：删除子树中含副作用的 JS，但不处理 CSS。
- Rollup：不删除子树中含副作用的 JS（不处理 CSS）。
