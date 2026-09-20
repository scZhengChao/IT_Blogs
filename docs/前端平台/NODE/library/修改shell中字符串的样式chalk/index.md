# 修改shell中字符串的样式chalk

## 目录

- [Chalk](#Chalk)
- [chalk-cli](#chalk-cli)

[   https://www.npmjs.com/package/chalk](https://www.npmjs.com/package/chalk "   https://www.npmjs.com/package/chalk")

[   https://juejin.cn/post/7037041322162651173](https://juejin.cn/post/7037041322162651173 "   https://juejin.cn/post/7037041322162651173")

```纯文本 
 1/含义 
 
     修改控制台中字符串的样式（字体样式加粗等／字体颜色／背景颜色） 
 
 2/使用 
 
     加粗+红色字+背景白色 
     const chalk = require('chalk'); 
     console.log(chalk.red.bold.bgWhite('Hello World')); 
     const chalk = require('chalk'); 
     console.log(chalk`{red.bold.bgWhite Hello World}`); 

```


```javascript 
const chalk = import("chalk").default;

```


#### Chalk

- Chalk 是粉笔的意思, 它想表达的是，给我们的[命令行](https://so.csdn.net/so/search?q=命令行\&spm=1001.2101.3001.7020 "命令行")中的文本添加颜色类似彩色粉笔的功能
- 在官方文档当中，它的 Highlights 核心特性
  - 它的性能很高，没有三方依赖
  - 它能够支持256以及真彩色的实现
    - 也就是说这个库可以让你自己去定义它的色彩
    - 并不是说命令行中当中的256色之外能够支持更多
    - 如果终端不支持，肯定也是无效的
  - 在 2022.10.4 的时候，已经有超过 86000个包 引用它
    - 所以说，它是一个非常非常流行的库
- 安装 \$ `npm i -S chalk`
- 使用

```javascript 
// chalk.js
const chalk = require('chalk');
console.log(chalk);

```


- 这种情况下，会报错，会提示 Instead change the require of index.js in /Users/xxx/Desktop/ui/src/chalk.js to a dynamic import() which is available in all CommonJS modules.
- 现在这个库已经默认使用 ES Module 了，在其源码中都是用的 ES Module 的语法

现在可以通过两种方式解决

- 方案1.在package.json中添加 "type": "module", 配置
- 方案2.使用打包工具
  选择方案1

```javascript 
import chalk from 'chalk';
console.log(chalk.red('Hello Chalk') + ' 这里就是默认颜色' + chalk.blue(' 这里是蓝色'));

```


- 从上面的例子可以看出，多种种颜色，混搭使用
- 再来看看[链式调用](https://so.csdn.net/so/search?q=链式调用\&spm=1001.2101.3001.7020 "链式调用")

```javascript 
import chalk from 'chalk';
console.log(chalk.red.bgGreen.bold('Hello Chalk'));

```


- 多参数方式

```javascript 
import chalk from 'chalk';
console.log(chalk.red('hello', 'chalk'))

```


- 这样可以多参数拼接，通过空格来拼接
- 嵌套调用

```javascript 
import chalk from 'chalk';
console.log(chalk.red('Hello', chalk.underline('Chalk')));

```


- 定义颜色在256色之外(rgb或hex随意定义)并嵌套

```javascript 
import chalk from 'chalk';
console.log(chalk.rgb(255,255,0).underline('Hello Chalk')); // 链式调用
console.log(chalk.hex('#ff0000').bold('你好，世界')); // 链式调用
console.log(chalk.hex('#0ff000')('Hello Wrold')); // 柯里化调用, 只能支持这种，不能继续加()了

```


- 基于以上示例，可以定义一些列的工具函数, 例如

```javascript 
import chalk from 'chalk';

const error = (text) => console.log(chalk.bold.hex('#ff0000')(text));
const warning = (text) => console.log(chalk.bold.hex('#ffa500')(text));

error('Error')
warning('Warning')

```


- 自定义chalk使用, 传入一个Option参数，其实目前就支持这一个level参数

```javascript 
import { Chalk } from 'chalk'; // 拿到构造器 Chalk

/**
Specify the color support for Chalk.

By default, color support is automatically detected based on the environment.

Levels:
- `0` - All colors disabled.
- `1` - Basic 16 colors support.
- `2` - ANSI 256 colors support.
- `3` - Truecolor 16 million colors support.
*/
// const cc = new Chalk({level: 0}) // 0 所有颜色不再支持，调用 .red, .blue 等不会生效; 不在[0,3]抛异常
const cc = new Chalk({level: 3}) // 0 所有颜色不再支持，调用 .red, .blue 等不会生效

console.log(cc.hex('#0ff000')('Hello Wrold'));

```


#### chalk-cli

- 文档：[https://www.npmjs.com/package/chalk-cli](https://www.npmjs.com/package/chalk-cli "https://www.npmjs.com/package/chalk-cli")
- 可全局安装 \$ `npm install --global chalk-cli`
- 可在全局生成一个 `chalk` 命令

```javascript 
$ chalk --help

  Usage
    $ chalk <style> ... <string>
    $ echo <string> | chalk <style> ...

  Options
    --template, -t    Style template. The `~` character negates the style.
    --stdin           Read input from stdin rather than from arguments.
    --no-newline, -n  Don't emit a newline (`\n`) after the input.
    --demo            Demo of all Chalk styles.

  Examples
    $ chalk red bold 'Unicorns & Rainbows'
    $ chalk -t '{red.bold Unicorns & Rainbows}'
    $ chalk -t '{red.bold Dungeons and Dragons {~bold.blue (with added fairies)}}'
    $ echo 'Unicorns from stdin' | chalk --stdin red bold

```


`-t` 按照一定格式输出

- \$ `chalk -t 'hello chalk'`

```javascript 
hello chalk

```


- \$ chalk -t '{red hello chalk}'

```javascript 
hello chalk

```


- 同样输出，但是显示的是 红色
- \$ `chalk -t '{red.bold hello chalk}'`

```javascript 
hello chalk

```


- 标红并加粗
- \$ `chalk red bold hello` 或 `chalk red bold 'hello chalk'`
  - 输出 hello 或 hello chalk
  - 标红并加粗
  - 注意，字符串中间有空格需要加引号

`--stdin` 接收上一个输入的结果

- \$ `echo "Hello Chalk" | chalk red bold` 这种，会把 bold 当做参数，输出的是 bold
- \$ `echo "Hello Chalk" | chalk red bold --stdin`
  - 像是这种, 会输出 Hello Chalk 并且标红加粗
  - –stdin 会把上一个命令的结果透传到chalk中来进行展示
- \$ `-n` 不会触发新行
  - \$ `chalk -n red bold 'hello chalk'`
  - 这里就不会有换行展示，红色字体之后紧接着系统, 如： `hello chalk Wang:~ wang$`
- \$ `--demo` 把 chalk 所有支持的命令都显示出来, 如下
  - 这些都是它支持的用法，包括前景色，背景色等

![](./image/image_QOxIqerYHY.png)
