# svg

## 目录

- [vue2](#vue2)
- [vue3](#vue3)

# vue2

svg  vue组件

```vue 
 //注意删掉 svg 里 的fill 
 
 <template> 
   <svg :class="svgClass" aria-hidden="true"> 
     <use :xlink:href="iconName" class="svg-icon-use" /> 
   </svg> 
 </template> 
 
 
 <script> 
 export default { 
   name: 'SvgIcon', 
   props: { 
     iconClass: { 
       type: String, 
       required: true 
     }, 
     className: { 
       type: String, 
       default: '' 
     } 
   }, 
   computed: { 
     iconName() { 
       return `#icon-${this.iconClass}` 
     }, 
     svgClass() { 
       if (this.className) { 
         return 'svg-icon ' + this.className 
       } else { 
         return 'svg-icon' 
       } 
     } 
   } 
 } 
 </script> 
 
 
 <style scoped> 
 .svg-icon { 
   width: 1em; 
   height: 1em; 
   vertical-align: -0.15em; 
   fill: currentColor; 
   overflow: hidden; 
 } 
 </style>
```


svg 在vue里的引入

```纯文本 
 import Vue from 'vue' 
 import SvgIcon from '@/components/SvgIcon'// svg组件 
 
 
 // register globally 
 Vue.component('svg-icon', SvgIcon) 
 
 const req = require.context('./svg', false, /\.svg$/) 
 
 const requireAll = requireContext => requireContext.keys().map(requireContext) 
 requireAll(req) 
 console.log(requireAll(req))
```


svg 在vue-cli3 的配置

```纯文本 
 const path = require('path') 
 module.exports = { 
     devServer: { 
         open: true, 
     }, 
     chainWebpack: config => { 
         const svgRule = config.module.rule('svg') 
         // 清除已有的所有 loader。 
         // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。 
         svgRule.uses.clear() 
         svgRule 
             .test(/\.svg$/) 
             .include.add(path.resolve(__dirname, './src/icons/svg')) 
             .end() 
             use('svg-sprite-loader') 
             .loader('svg-sprite-loader') 
             .options({symbolId: 'icon-[name]'}) 
         const fileRule = config.module.rule('file') 
         fileRule.uses.clear() 
         fileRule 
         .test(/\.svg$/) 
         .exclude.add(path.resolve(__dirname, './src/icons/svg')) 
         .end() 
         .use('file-loader') 
         .loader('file-loader') 
     } 
 } 

```


# vue3

[https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh\_CN.md](https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md "https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md")

组件

```vue 
<template>
  <svg aria-hidden="true" :class="svgClass" :style="styleObject" @click="emit('on-click')">
    <use :xlink:href="symbolId" :fill="color" :stroke="color" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon'
};
</script>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#fff'
  },
  clickable: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: '1em'
  },
  className: {
    type: String,
    default: ''
  }
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
const svgClass = computed(() => 'svg-icon ' + props.className || '');
const styleObject = computed(() => {
  return {
    width: props.size,
    height: props.size,
    color:props.color,
    cursor: props.clickable ? 'pointer' : ''
  };
});
const emit = defineEmits(['on-click']);
</script>

```


引入

```typescript 
import type { App } from 'vue'
import 'virtual:svg-icons-register';
import SvgIcon from './SvgIcon.vue'

export function setupSvgIcon(app: App) {
  app.component('SvgIcon', SvgIcon)
}
```


配置

```typescript 
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

plugins: [
  createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [resolve( 'src/renderer/src/assets/svgs')],
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]',
    /**
     * 自定义插入位置
     * @default: body-last
     */
    inject: 'body-last' | 'body-first',
    /**
     * custom dom id
     * @default: __svg__icons__dom__
     */
    customDomId: '__svg__icons__dom__'
  })
]

```
