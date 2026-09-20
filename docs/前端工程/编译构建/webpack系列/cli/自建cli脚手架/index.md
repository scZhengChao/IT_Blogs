# 自建cli脚手架

## 目录

- [1.chalk](#1chalk)
- [2.process.argv](#2processargv)
- [3.inquirer.js](#3inquirerjs)
- [4.Compression-webpack-plugin（可以前端+服务器处理； 也可以服务器后端单独处理）](#4Compression-webpack-plugin可以前端服务器处理-也可以服务器后端单独处理)
- [5.webpack-bundle-analyzer 打包分析工具](#5webpack-bundle-analyzer-打包分析工具)
- [6.雪碧图插件](#6雪碧图插件)

# **1.chalk**

```javascript 
chalk.greenBright.bold("build success")
```


# **2.process.argv**

`process` 对象是一个全局变量，它提供当前 `Node.js` 进程的有关信息，以及控制当前 `Node.js` 进程。 因为是全局变量，所以无需使用 `require()`。

process.argv 属性返回一个数组，这个数组包含了启动Node.js进程时的命令行参数，

其中：

- 数组的第一个元素`process.argv[0]`——返回启动Node.js进程的可执行文件所在的绝对路径
- 第二个元素process.argv\[1]——为当前执行的JavaScript文件路径
- 剩余的元素为其他命令行参数

例如：

```javascript 
输入命令：node scripts/build.js "web-runtime-cjs,web-server-renderer"
```


  结果：

```javascript 
console.log(process.argv[0])   // 打印 D:\nodeJs\node.exe
console.log(process.argv[1])   // 打印 E:\Study_document\vue-resource\vue-dev\scripts\build.js
console.log(process.argv[2])   // 打印 web-runtime-cjs,web-server-renderer
```


# **3.inquirer.js**

    [https://blog.csdn.net/qq\_26733915/article/details/80461257](https://blog.csdn.net/qq_26733915/article/details/80461257 "https://blog.csdn.net/qq_26733915/article/details/80461257")           

         开始通过npm init 创建package.json的时候就有大量与用户的交互(当然也可以通过参数来忽略输入)；而现在大多数工程都是通过脚手架来创建的，使用脚手架的时候最明显的就是与命令行的交互，如果想自己做一个脚手架或者在某些时候要与用户进行交互，这个时候就不得不提到inquirer.js了。

介绍

由于交互的问题种类不同，inquirer为每个问题提供很多参数：

    type：表示提问的类型，包括：input, confirm, list, rawlist, expand, checkbox, password, editor；

    name: 存储当前问题回答的变量；

    message：问题的描述；

    default：默认值；

    choices：列表选项，在某些type下可用，并且包含一个分隔符(separator)；

    validate：对用户的回答进行校验；

    filter：对用户的回答进行过滤处理，返回处理后的值；

    transformer：对用户回答的显示效果进行处理(如：修改回答的字体或背景颜色)，但不会影响最终的答案的内容；

    when：根据前面问题的回答，判断当前问题是否需要被回答；

    pageSize：修改某些type类型下的渲染行数；

    prefix：修改message默认前缀；

    suffix：修改message默认后缀。

上面的属性(除transformer外)在下面都有对应使用。

一. 使用

0\. 语法结构

```javascript 
const inquirer = require('inquirer');

const promptList = [

    // 具体交互内容

];

inquirer.prompt(promptList).then(answers => {

    console.log(answers); // 返回的结果

})
```


1\. input

```javascript 
const promptList = [{

    type: 'input',

    message: '设置一个用户名:',

    name: 'name',

    default: "test_user" // 默认值

},{

    type: 'input',

    message: '请输入手机号:',

    name: 'phone',

    validate: function(val) {

        if(val.match(/\d{11}/g)) { // 校验位数

            return val;

        }

        return "请输入11位数字";

    }

}];
```


![  ](./image/a40fd2f7696061241f13491b6c2d3074_Pvjz8aQQQk.png "  ")

2\. confirm

```javascript 
const promptList = [{

    type: "confirm",

    message: "是否使用监听？",

    name: "watch",

    prefix: "前缀"

},{

    type: "confirm",

    message: "是否进行文件过滤？",

    name: "filter",

    suffix: "后缀",

    when: function(answers) { // 当watch为true的时候才会提问当前问题

        return answers.watch

    }

}];
```


![  ](./image/b36ef06d1814232ce4fc2d5cc61621cb_HUTCXES2KK.png "  ")

![  ](./image/c48ba94b886c896731d0c7032a1f80f5_iWUJd2PLA-.png "  ")

3\. list

```javascript 
const promptList = [{

    type: 'list',

    message: '请选择一种水果:',

    name: 'fruit',

    choices: [

        "Apple",

        "Pear",

        "Banana"

    ],

    filter: function (val) { // 使用filter将回答变为小写

        return val.toLowerCase();

    }

}];
```


![  ](./image/b064c53e830d1f99a8906a665a5604d8_vnaOHEg21B.png "  ")

4\. rawlist

```javascript 
const promptList = [{

    type: 'rawlist',

    message: '请选择一种水果:',

    name: 'fruit',

    choices: [

        "Apple",

        "Pear",

        "Banana"

    ]

}];
```


![  ](./image/0373efbd63cf4d2246f5e01ac7bcfa1e_jYUgFsU18T.png "  ")

5\. expand

```javascript 
const promptList = [{

    type: "expand",

    message: "请选择一种水果：",

    name: "fruit",

    choices: [

        {

            key: "a",

            name: "Apple",

            value: "apple"

        },

        {

            key: "O",

            name: "Orange",

            value: "orange"

        },

        {

            key: "p",

            name: "Pear",

            value: "pear"

        }

    ]

}];
```


![  ](./image/94e1c3ffc676834459a0d85b004089aa_by67jZyPqY.png "  ")

6.checkbox

```javascript 
const promptList = [{

    type: "checkbox",

    message: "选择颜色:",

    name: "color",

    choices: [

        {

            name: "red"

        },

        new inquirer.Separator(), // 添加分隔符

        {

            name: "blur",

            checked: true // 默认选中

        },

        {

            name: "green"

        },

        new inquirer.Separator("--- 分隔符 ---"), // 自定义分隔符

        {

            name: "yellow"

        }

    ]

}];

// 或者下面这样

const promptList = [{

    type: "checkbox",

    message: "选择颜色:",

    name: "color",

    choices: [

        "red",

        "blur",

        "green",

        "yellow"

    ],

    pageSize: 2 // 设置行数

}];
```


![  ](./image/0634b1e5bed1d54a343b8a703c5ed8dd_3EtgD_W7Uc.png "  ")

7.password

```javascript 
const promptList = [{

    type: "password", // 密码为密文输入

    message: "请输入密码：",

    name: "pwd"

}];
```


![  ](./image/b3a4a49fd0c7d9ef33b1a8a727fffe78_WYac-2U82x.png "  ")

**8. editor**

```javascript 
 const   promptList = [{ type :   "editor" ,message:   "请输入备注：" ,name:   "editor" }];
```


![  ](./image/170b5eaf98470ff3187fa1c3b2846c8d_ocND1r6tR-.png "  ")

# **4.Compression-webpack-plugin（可以前端+服务器处理； 也可以服务器后端单独处理）**

[CompressionWebpackPlugin | webpack 中文网  https://www.webpackjs.com/plugins/compression-webpack-plugin/](https://www.webpackjs.com/plugins/compression-webpack-plugin/ "CompressionWebpackPlugin | webpack 中文网  https://www.webpackjs.com/plugins/compression-webpack-plugin/")

# **5.webpack-bundle-analyzer 打包分析工具**

[https://blog.csdn.net/weixin\_43837268/article/details/95247793](https://blog.csdn.net/weixin_43837268/article/details/95247793 "https://blog.csdn.net/weixin_43837268/article/details/95247793")

npm install webpack-bundle-analyzer --save-dev

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {

  ...

  configureWebpack: {

    plugins: \[

        new BundleAnalyzerPlugin({

                    //  可以是\`server\`，\`static\`或\`disabled\`。

                    //  在\`server\`模式下，分析器将启动HTTP服务器来显示软件包报告。

                    //  在“静态”模式下，会生成带有报告的单个HTML文件。

                    //  在\`disabled\`模式下，你可以使用这个插件来将\`generateStatsFile\`设置为\`true\`来生成Webpack Stats JSON文件。

                    analyzerMode: 'server',

                    //  将在“服务器”模式下使用的主机启动HTTP服务器。

                    analyzerHost: '127.0.0.1',

                    //  将在“服务器”模式下使用的端口启动HTTP服务器。

                    analyzerPort: 8888,

                    //  路径捆绑，将在\`static\`模式下生成的报告文件。

                    //  相对于捆绑输出目录。

                    reportFilename: 'report.html',

                    //  模块大小默认显示在报告中。

                    //  应该是\`stat\`，\`parsed\`或者\`gzip\`中的一个。

                    //  有关更多信息，请参见“定义”一节。

                    defaultSizes: 'parsed',

                    //  在默认浏览器中自动打开报告

                    openAnalyzer: true,

                    //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成

                    generateStatsFile: false,

                    //  如果\`generateStatsFile\`为\`true\`，将会生成Webpack Stats JSON文件的名字。

                    //  相对于捆绑输出目录。

                    statsFilename: 'stats.json',

                    //  stats.toJson（）方法的选项。

                    //  例如，您可以使用\`source：false\`选项排除统计文件中模块的来源。

                    //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21

                    statsOptions: null,

                    logLevel: 'info' // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。

        })

    ]

  },

  ...

};

npm run serve --report

npm run build --report

# **6.雪碧图插件**

npm i webpack-spritesmith
