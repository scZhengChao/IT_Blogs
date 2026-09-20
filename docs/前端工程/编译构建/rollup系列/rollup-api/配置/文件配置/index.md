# 文件配置

[ 配置选项 | rollup.js 中文文档 | rollup.js中文网 核心功能 https://www.rollupjs.com/configuration-options/#input](https://www.rollupjs.com/configuration-options/#input " 配置选项 | rollup.js 中文文档 | rollup.js中文网 核心功能 https://www.rollupjs.com/configuration-options/#input")

```typescript title="rollup.config.js
"
 import babel from 'rollup-plugin-babel';
import commonjs  from 'rollup-plugin-commonjs';
import  resolve from 'rollup-plugin-node-resolve';
// import {terser} from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import {uglify} from 'rollup-plugin-uglify';
// import serve from 'rollup-plugin-serve';
import replace from 'rollup-plugin-replace';
const isPro = process.env.NODE_ENV === 'pro'
module.exports = {
  input: 'src/main.js',                              // 入口文件
  output: {
    file: 'dist/index.min.js',       // 打包之后的文件名以及存放位置
    format: 'umd',                                // 以什么模式打包，支持umd,cmd,esm...
    name: 'ZcMonitor',                                 // 导出文件的名字
    sourcemap: true,
    globals:{


    },
  },
  external:[ ],
  watch:{
    include: 'src/**',
  },
  plugins: [
    babel({                
      extensions: [".js"],
      runtimeHelpers: true,               // 配置runtime，不设置会报错
      exclude: ['node_modules/**']        // 忽略 node_modules
    }),
    json(),
    commonjs({
      include: 'node_modules/**'
    }),
    resolve({
      browser: true,
    }),
    // terser(),
    replace({
      "process.env.NODE_ENV":"'pro'"
    }),
    // serve({
    //     open: true, // 是否打开浏览器
    //     contentBase: './', // 入口html的文件位置
    //     historyApiFallback: true, // Set to true to return index.html instead of 404
    //     host: 'localhost',
    //     port: 10001 //这边port配置的端口号是五位数，不是四位数。
    // }),
    isPro && uglify({
      compress: {
        pure_getters: true,
        unsafe      : true,
        unsafe_comps: true,
      }
    })
  ],
}
```


[案例一：esm 转 commonjs](<./案例一：esm 转 commonjs/index.md> "案例一：esm 转 commonjs")
