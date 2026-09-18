# (运行时)加载不同的js 文件

## 目录

- [方法 1：基于process.env或import.meta.env（Webpack/Vite 等构建工具）](#方法-1基于processenv或importmetaenvWebpackVite-等构建工具)
  - [步骤](#步骤)
- [方法 2：通过 URL 参数或全局变量动态加载](#方法-2通过-URL-参数或全局变量动态加载)
  - [步骤](#步骤)
- [方法 3：后端动态渲染 HTML（SSR）](#方法-3后端动态渲染-HTMLSSR)
  - [示例（Node.js + Express）](#示例Nodejs--Express)
  - [示例（PHP）](#示例PHP)
- [方法 4：动态import()（适用于现代浏览器）](#方法-4动态import适用于现代浏览器)
- [方法 5：使用\<script type="module">+ 动态导入](#方法-5使用script-typemodule-动态导入)
- [总结](#总结)
  - [推荐方案](#推荐方案)

## **方法 1：基于**\*\*`process.env`****或****`import.meta.env`（Webpack/Vite 等构建工具）\*\*​

适用于**React、Vue、Next.js、Nuxt.js**等现代前端框架。

### **步骤**

1. **定义环境变量** &#x20;

   在项目根目录创建`.env`文件：

```markdown 
# .env.development
VITE_APP_ENV=development
VITE_JS_FILE=app.dev.js

# .env.production
VITE_APP_ENV=production
VITE_JS_FILE=app.prod.js
```


1. **在代码中动态加载 JS 文件**

```typescript 
// main.js / main.ts
const env = import.meta.env.VITE_APP_ENV || 'production';
const jsFile = import.meta.env.VITE_JS_FILE || 'app.prod.js';

// 动态加载 JS 文件
const script = document.createElement('script');
script.src = `/static/js/${jsFile}`;
document.body.appendChild(script);
```


1. **构建时自动替换**
   - **Vite**：默认支持`.env`环境变量。
   - **Webpack**：使用`DefinePlugin`或`dotenv-webpack`。

## **方法 2：通过 URL 参数或全局变量动态加载**

适用于**纯 HTML/JS 项目**（无构建工具）。

### **步骤**

1. **在 HTML 中定义环境变量**

```javascript 
<script>
  // 可以由后端动态注入，或者通过 URL 参数判断
  window.APP_ENV = 'development'; // 'production' | 'staging'
</script>
```


1. **动态加载 JS 文件**

```javascript 
const env = window.APP_ENV || 'production';
const jsFiles = {
  development: 'app.dev.js',
  production: 'app.prod.js',
  staging: 'app.staging.js',
};

const script = document.createElement('script');
script.src = `/js/${jsFiles[env]}`;
document.body.appendChild(script);
```


## **方法 3：后端动态渲染 HTML（SSR）**

适用于**Next.js、Nuxt.js、PHP、Django、Node.js**等 SSR 项目。

### **示例（Node.js + Express）**

```javascript 
// server.js
app.get('/', (req, res) => {
  const env = process.env.NODE_ENV || 'development';
  const jsFile = env === 'production' ? 'app.prod.js' : 'app.dev.js';

  res.send(`
    <html>
      <body>
        <script src="/static/js/${jsFile}"></script>
      </body>
    </html>
  `);
});
```


### **示例（PHP）**

```php 
<?php
$env = getenv('APP_ENV') ?: 'production';
$jsFile = $env === 'production' ? 'app.prod.js' : 'app.dev.js';
?>
<html>
  <body>
    <script src="/static/js/<?php echo $jsFile; ?>"></script>
  </body>
</html>
```


## **方法 4：动态**\*\*`import()`（适用于现代浏览器）\*\*​

适用于**ES Modules（ESM）** 环境。

```javascript 
const env = process.env.NODE_ENV || 'development';

// 动态加载不同的 JS 模块
if (env === 'production') {
  import('./app.prod.js').then(module => {
    module.init(); // 调用模块方法
  });
} else {
  import('./app.dev.js').then(module => {
    module.init();
  });
}
```


## **方法 5：使用**\*\*`<script type="module">`- 动态导入\*\*​

适用于**现代浏览器**（支持 ESM）。

```javascript 
<script type="module">
  const env = import.meta.env.MODE || 'production';
  const jsFile = env === 'production' ? 'app.prod.js' : 'app.dev.js';

  import(`/js/${jsFile}`).then(module => {
    module.runApp();
  });
</script>
```


## **总结**

| 方法                                                 | 适用场景                     | 特点             |
| -------------------------------------------------- | ------------------------ | -------------- |
| **`process.env`** **/** \*\*`import.meta.env`\*\*​ | Webpack/Vite 项目          | 构建时替换，适合现代前端框架 |
| **URL 参数 / 全局变量**​                                 | 纯 HTML/JS 项目             | 无需构建工具，灵活      |
| **后端动态渲染**​                                        | SSR（Next.js、PHP、Node.js） | 服务器端决定加载哪个文件   |
| **动态** \*\*`import()`\*\*​                         | 现代浏览器（ESM）               | 按需加载，代码拆分      |
| \*\*`<script type="module">`\*\*​                  | 现代浏览器                    | 原生 ESM 支持      |

### **推荐方案**

1. **现代前端框架（React/Vue）**→**方法 1（****`import.meta.env`****）**
2. **纯静态 HTML/JS**→**方法 2（全局变量）**
3. **SSR 项目（Next.js/Nuxt.js）**→**方法 3（后端动态渲染）**
4. **按需加载（代码拆分）**→**方法 4（动态**\*\*`import()`）\*\*​

这样，你可以根据不同的环境（开发、测试、生产）加载不同的 JS 文件，确保代码的灵活性和安全性。 🚀
