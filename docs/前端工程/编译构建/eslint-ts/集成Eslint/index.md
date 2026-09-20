# 集成Eslint

## 目录

- [什么是Eslint](#什么是Eslint)
- [Eslint的作用及优势](#Eslint的作用及优势)
- [支持的配置文件格式](#支持的配置文件格式)
- [配置文件说明](#配置文件说明)
  - [Rules-启用的规则及其各自的错误级别](#Rules-启用的规则及其各自的错误级别)
  - [Globals-配置额外的全局变量](#Globals-配置额外的全局变量)
  - [Environments - 指定脚本的运行环境](#Environments---指定脚本的运行环境)
  - [Plugins - 第三方插件](#Plugins---第三方插件)
  - [Extends - 继承](#Extends---继承)
- [使用Eslint](#使用Eslint)
  - [安装Eslint](#安装Eslint)
  - [安装插件和解析器](#安装插件和解析器)
  - [创建配置文件](#创建配置文件)
  - [添加命令进行eslint检测](#添加命令进行eslint检测)

#### 什么是Eslint

`ESLint` 是一个在 `JavaScript` 代码中通过规则模式匹配作代码识别和报告的插件化的检测工具，它的目的是保**证代码规范****的一致性****和及时发现代码问题、****提前避免****错误发生。**

ESLint 的关注点是**代码质量，检查代码风格并且会提示不符合风格规范的代码。** 除此之外`ESLint` 也具有一部分代码格式化的功能。

#### Eslint的作用及优势

- 检查语法错误，避免低级`bug`；

> 比如：api语法错误、使用了未定义的变量、修改const变量

- 统一团队代码风格

> 比如：使用tab还是空格，使用单引号还是双引号等

- 确保代码遵循最佳实践

> 比如：可以借助eslint-config-standard配置包扩展社区中流行的最佳实践的风格指南。

这样就能**极大提高项目中多人协作开发时的效率、代码的可读性以及可维护性**。

#### 支持的配置文件格式

ESLint 支持几种格式的配置文件：

- **JavaScript** – 使用 `.eslintrc.js` 然后输出一个配置对象。
- **YAML** – 使用 `.eslintrc.yaml` 或 `.eslintrc.yml` 去定义配置的结构。
- **JSON** – 使用 `.eslintrc.json` 去定义配置的结构，`ESLint` 的 `JSON` 文件允许 `JavaScript` 风格的注释。
- **(弃用)** – 使用 `.eslintrc`，可以使 JSON 也可以是 YAML。
- **package.json** – 在 package.json 里创建一个 `eslintConfig`属性，在那里定义你的配置。

如果同一个目录下有多个配置文件，ESLint 只会使用一个。优先级顺序如下：
`.eslintrc.js` > `.eslintrc.yaml` > `.eslintrc.yml` > `.eslintrc.json` > `.eslintrc` > `package.json`

遇到项目内有多个层叠配置时，依然采用就近原则作为高优先级；

#### 配置文件说明

##### Rules-启用的规则及其各自的错误级别

ESLint 附带有大量的规则。你可以使用注释或配置文件修改你项目中要使用的规则。要改变一个规则设置，你**必须将规则** ID 设置为下列值之一：

- `"off"` 或 `0` - 关闭规则
- `"warn"` 或 `1` - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
- `"error"` 或 `2` - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

例如：

```typescript 
rules: {
    'eqeqeq': 2,
    'no-alert': 2,
    'no-undef': 2,
    'no-use-before-define': 2,
    'react-hooks/exhaustive-deps': 2,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-var-requires': 0,
  },

```


##### Globals-配置额外的全局变量

启用`ESLint`规则后，当访问当前源文件内未定义的变量时，`no-undef` 规则将发出警告。

而有时候，我们是需要在其他文件访问一些全局变量的，且保证能正常取到值。这时可以在 `ESLint` 中定义这些全局变量，这样 `ESLint` 就不会发出警告了。

- 用注释指定全局变量，格式如下：

```javascript 
/* global var1, var2 */

```


这定义了两个全局变量，`var1` 和 `var2`。如果你想选择性地指定这些全局变量可以被写入(而不是只被读取)，那么你可以用一个 `"writable"` 的标志来设置它们:

```javascript 
/* global var1:writable, var2:writable */

```


- 配置文件中通过`globals` 配置属性设置，对于每个全局变量键，将对应的值设置为 `"writable"` 以允许重写变量，或 `"readonly"` 不允许重写变量。例如：

```javascript 
// .eslintrc.js
"globals": {
  "var1": "writable",
  "var2": "readonly"
}

```


##### Environments - 指定脚本的运行环境

每种环境都有一组特定的预定义全局变量。如brower、node环境变量、es2021环境变量等。

```javascript 
env: {
    browser: true,
    es2021: true,
    node: true,
  },

```


##### Plugins - 第三方插件

ESLint 支持使用第三方插件，先在项目中下载安装要引入的插件，配置文件中使用 `plugins` 关键字来**存放插件名字的列表**。插件名称可以省略 `eslint-plugin-` 前缀。

```javascript 
plugins: ['react', 'babel'], // eslint-plugin-react eslint-plugin-babel

```


##### Extends - 继承

一个配置文件可以被基础配置中的已启用的规则继承。

```javascript 
 extends: ["eslint:recommended","plugin:prettier/recommended"],

```


#### 使用Eslint

##### 安装Eslint

ESLint 可以安装在当前项目中或全局环境下，但因项目间存在的差异性，我们一般会将它安装在当前项目中。

```bash 
npm install eslint --save-dev

```


##### 安装插件和解析器

假如项目中使用了TypeScript和React，则安装

```typescript 
// 安装eslint-plugin-react配置包扩展支持React语法
// 安装 @typescript-eslint/parser，替代掉默认的Espree解析器
// 安装@typescript-eslint/eslint-plugin提供额外的ts 语法的规则
npm install --save-dev eslint-plugin-react @typescript-eslint/parser @typescript-eslint/eslint-plugin

```


其他的插件和解析器请根据实际项目需要安装。

##### 创建配置文件

创建配置文件有以下两种方式

- 在根目录新建 `.eslintrc.js`文件,并自己完善该配置文件
- 在终端中输入如下命令`npx eslint--init`并根据提示自动创建配置文件

文件配置大致如下:

```typescript 
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  root: true,
  extends: ['eslint:recommended', 'react-app', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    eqeqeq: 2,
    'no-alert': 2,
    'no-undef': 2,
    'no-use-before-define': 2,
    'react-hooks/exhaustive-deps': 2,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-var-requires': 0,
  },
};


```


具体配置可根据项目实际需要进行配置

##### 添加命令进行eslint检测

在`package.json`中添加如下命令：

```json 
"scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    // 新添加的lint命令，意思是使用.eslintrc.js检测src文件夹下的后缀为.ts,.tsx,.js,.jsx的所有文件,并对可自动修复的eslint报错进行修复
    "lint": "eslint -c .eslintrc.js src --ext .ts,.tsx,.js,.jsx --fix"
  },


```


之后就可以运行`npm run lint`这个命令进行eslint校验;

比如，我们在项目内任意一个ts文件内输入如下代码：

```javascript 
console.log('jump', age);

```


然后运行`npm run lint
`就会发现终端报如下错误

![](./image/image_266F5yhS_u.png)

这就说明,我们的`Eslint`配置成功了
