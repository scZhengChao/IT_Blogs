# 忽略扩展名

配置vite使其忽略 .vue 扩展名

但是 vite 有忽略扩展名的配置项, 可以通过手动配置使其可以忽略 .vue 扩展名(不建议这么做)

```javascript 
// vite.config.js
import { defineConfig } from 'vite'
export default defineConfig({
    // ...其他配置项
    resolve: {
      // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    }
  })


```
