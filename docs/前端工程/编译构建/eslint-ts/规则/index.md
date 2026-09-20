# 规则

默认eslint规则：

- 代码末尾不能加分号 ;（强迫症的我受不了哭）
- 代码中不能存在多行空行；（这个我更也忍不了大哭）
- tab键不能使用，必须换成两个空格；（超级不习惯）
- 代码中不能存在声明了但未使用的变量；（这个我觉得可以有）

```javascript 
    module.exports = {
      root: true,
      parser: 'babel-eslint',
      parserOptions: {
        //设置"script"（默认）或"module"如果你的代码是在ECMAScript中的模块。
        sourceType: 'module'
      },
      env: {
        browser: true,
      },
      // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
      extends: 'standard',
      // required to lint *.vue files
      plugins: [
        'html'
      ],
      // add your custom rules here
      'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        "no-unused-vars": [2, { 
          // 允许声明未使用变量
          "vars": "local",
          // 参数不检查
          "args": "none" 
        }],
        // 关闭语句强制分号结尾
        "semi": [0],

        //key值前面是否要有空格

         "key-spacing": [0, {
          "singleLine": {
            "beforeColon": false,
            "afterColon": true
          },
          "multiLine": {
            "beforeColon": true,
            "afterColon": true,
            "align": "colon"
          }，

        //空行最多不能超过100行
        "no-multiple-empty-lines": [0, {"max": 100}],
        //关闭禁止混用tab和空格
        "no-mixed-spaces-and-tabs": [0],

    //数组第一个指定是否启用这个规则，第二个指定几个空格

        "indent":[1,2],


```


[规则](./index.md "规则")

## 子目录与文章

- [规则](./规则/index.md)
