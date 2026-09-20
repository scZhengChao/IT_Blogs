# postcss-pxtorem

## 目录

- [参数解释](#参数解释)
- [补充](#补充)

[ postcss-pxtorem  - guo\&qi - 博客园 一、概念 postcss-pxtorem是PostCSS的插件，用于将像素单元生成rem单位。 二、使用 安装依赖之后，将postcss-pxtorem的配置都放到了vue.config.js中。 m https://www.cnblogs.com/gg-qq/p/13678935.html](https://www.cnblogs.com/gg-qq/p/13678935.html " postcss-pxtorem  - guo\&qi - 博客园 一、概念 postcss-pxtorem是PostCSS的插件，用于将像素单元生成rem单位。 二、使用 安装依赖之后，将postcss-pxtorem的配置都放到了vue.config.js中。 m https://www.cnblogs.com/gg-qq/p/13678935.html")

[ postcss-pxtorem适配，px自动转换成rem 任意宽度设计稿都适用\_smile\_hahahaxixi的博客-CSDN博客 步骤一：npm i lib-flexible --savenpm install postcss-pxtorem -D步骤二：在项目根目录下创建postcss.config.js配置文件module.exports = {  plugins: {    // 兼容浏览器，添加前缀    autoprefixer: {      overrideBrowserslist: \[        "And https://blog.csdn.net/smile\_hahahaxixi/article/details/121908285](https://blog.csdn.net/smile_hahahaxixi/article/details/121908285 " postcss-pxtorem适配，px自动转换成rem 任意宽度设计稿都适用_smile_hahahaxixi的博客-CSDN博客 步骤一：npm i lib-flexible --savenpm install postcss-pxtorem -D步骤二：在项目根目录下创建postcss.config.js配置文件module.exports = {  plugins: {    // 兼容浏览器，添加前缀    autoprefixer: {      overrideBrowserslist: \[        \"And https://blog.csdn.net/smile_hahahaxixi/article/details/121908285")

[postcss-pxtorem \_-最爱吃兽奶-的博客-CSDN博客 vant配置：postcss-pxtorem以及解决 “Error: PostCSS plugin postcss-pxtorem requires PostCSS 8.”问题1.npm安装npm install postcss-pxtorem --save2.utils文件夹下（没有就新建一个）,新建一个rem.jscopy以下代码：const baseSize = 37.5 //跟postcs <https://blog.csdn.net/weixin_51629637/article/details/124660450>](https://blog.csdn.net/weixin_51629637/article/details/124660450 " postcss-pxtorem_-最爱吃兽奶-的博客-CSDN博客 vant配置：postcss-pxtorem以及解决 “Error: PostCSS plugin postcss-pxtorem requires PostCSS 8.”问题1.npm安装npm install postcss-pxtorem --save2.utils文件夹下（没有就新建一个）,新建一个rem.jscopy以下代码：const baseSize = 37.5 //跟postcs https://blog.csdn.net/weixin_51629637/article/details/124660450")

```json 
extraPostCSSPlugins: [
    require('tailwindcss'),
    pxToRem({
      rootValue: 37.5,
      unitPrecision: 6,
      propList: ['*', '!border*', '!*-scrollbar'], // * 表示所有属性都可以从px 到rem  border系列不转换
      mediaQuery: true,
      minPixelValue: 2,
      exclude: /(pc)|(MultimediaPreview)|(node_modules)|(global.less)/i,
      // 注意：如果有使用第三方UI如VUX，则需要配置下忽略选择器不转换。
      // 规则是class中包含的字符串，如vux中所有的class前缀都是weui-。也可以是正则。
      selectorBlackList: ['.origin-px-', '.pc-'],
    }),
  ],
```


# 参数解释

1）`rootValue`（Number | Function）表示根元素字体大小或根据`input`参数返回根元素字体大小。

2）`unitPrecision` （Number）允许REM单位增加的十进制数字。

3）`propList` （Array）可以从px更改为rem的属性。

- 值必须完全匹配。
- 使用通配符`*`启用所有属性。例：`['*']`
- `*`在单词的开头或结尾使用。（`['*position*']`将匹配`background-position-y`）
- 使用`!`不匹配的属性。例：`['*', '!letter-spacing']`
- 将“ not”前缀与其他前缀组合。例：`['*', '!font*']`

4）`selectorBlackList` （Array）要忽略的选择器，保留为px。

- 如果value是字符串，它将检查选择器是否包含字符串。
  - `['body']` 将匹配 `.body-class`
- 如果value是regexp，它将检查选择器是否匹配regexp。
  - `[/^body$/]`将匹配`body`但不匹配`.body`

`5）replace` （Boolean）替换包含rems的规则。

6）`mediaQuery` （Boolean）允许在媒体查询中转换px。

7）`minPixelValue`（Number）设置要替换的最小像素值。

8）`exclude`（String, Regexp, Function）要忽略并保留为px的文件路径。

- 如果value是字符串，它将检查文件路径是否包含字符串。
  - `'exclude'` 将匹配 `\project\postcss-pxtorem\exclude\path`
- 如果value是regexp，它将检查文件路径是否与regexp相匹配。
  - `/exclude/i` 将匹配 `\project\postcss-pxtorem\exclude\path`
- 如果value是function，则可以使用exclude function返回true，该文件将被忽略。
  - 回调函数会将文件路径作为参数传递，它应该返回一个布尔结果。
  - `function (file) { return file.indexOf('exclude') !== -1; }`
  # 补充
  忽略单个属性的最简单方法是在像素单位声明中使用大写字母，将px写为Px。

  比如：

```sass (sass)  
.ignore { 
  border: 1Px solid; // ignored
  border-width: 2PX; // ignored 
}

```
