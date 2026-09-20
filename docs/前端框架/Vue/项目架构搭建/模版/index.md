# 模版

## 目录

- [Vue2.x](#Vue2x)
- [Vue3.x](#Vue3x)

[ webstorm设置vue模板 - CSDN csdn已为您找到关于webstorm设置vue模板相关内容，包含webstorm设置vue模板相关文档代码介绍、相关教程视频课程，以及相关webstorm设置vue模板问答内容。为您解决当下相关问题，如果想了解更详细webstorm设置vue模板内容，请点击详情链接进行了解，或者注册账号与客服人员联系给您提供相关内容的帮助，以下是为您准备的相关内容。 https://www.csdn.net/tags/MtjaYg1sMDk5NTMtYmxvZwO0O0OO0O0O.html](https://www.csdn.net/tags/MtjaYg1sMDk5NTMtYmxvZwO0O0OO0O0O.html " webstorm设置vue模板 - CSDN csdn已为您找到关于webstorm设置vue模板相关内容，包含webstorm设置vue模板相关文档代码介绍、相关教程视频课程，以及相关webstorm设置vue模板问答内容。为您解决当下相关问题，如果想了解更详细webstorm设置vue模板内容，请点击详情链接进行了解，或者注册账号与客服人员联系给您提供相关内容的帮助，以下是为您准备的相关内容。 https://www.csdn.net/tags/MtjaYg1sMDk5NTMtYmxvZwO0O0OO0O0O.html")

# Vue2.x

```javascript 
<template>
  <div>

  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import  《组件名称》  from '《组件路径》 ';

export default {
  name: "${NAME}",
  data () {
    // 这里存放数据
    return {}
  },  
  // import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  // 方法集合
  methods: {},
  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  //过滤器
  filters: {},
  // 生命周期 - 创建之前
  beforeCreate (){
  },
  // 生命周期 - 创建完成（可以访问当前this 实例）
  created () {
  },
  // 生命周期 - 挂载之前
  beforeMount () {
  }, 
  // 生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted () {
  },
  // 生命周期 - 更新之前
  beforeUpdate () {
  }, 
  // 生命周期 - 更新之后
  updated () {
  }, 
  // 生命周期 - 销毁之前
  beforeDestroy () {
  }, 
  // 生命周期 - 销毁完成
  destroyed () {
  }, 
  // 如果页面有 keep-alive 缓存功能,这个函数会触发
  //进入的时候触发
  activated () {
  }, 
  //离开的时候触发
  deactivated() {
  },
}
</script>

<style scoped>
</style>

```


# Vue3.x

```javascript 
template>
  <div>
    
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import  《组件名称》  from '《组件路径》 ';
import {ref,reactive,onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted,onErrorCaptured,onRenderTracked,onRenderTriggered,onActivated,onDeactivated} from 'vue'
export default {
  name: "${NAME}",
  // import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {},
  // setup在beforeCreate之前执行一次，this是undefined。
  setup() {

    onBeforeMount(()=>{})// 生命周期 - 挂载之前
    onMounted(()=>{})// 生命周期 - 挂载完成（可以访问 DOM 元素）
    onBeforeUpdate(()=>{})// 生命周期 - 更新之前
    onUpdated(()=>{})// 生命周期 - 更新之后
    onBeforeUnmount(()=>{})// 生命周期 - 销毁之前
    onUnmounted(()=>{})// 生命周期 - 销毁完成
    onErrorCaptured((err)=>{})// 当事件处理程序或生命周期钩子抛出错误时
    onRenderTracked((e)=>{})// 渲染的时候可以追踪到
    onRenderTriggered((e)=>{})// 重新渲染的时候触发
    // 如果页面有 keep-alive 缓存功能,这个两个函数会触发
    onActivated(()=>{})//进入的时候触发
    onDeactivated(()=>{})//离开的时候触发
    return{//组件中使用的变量和绑定的方法都需要return才能使用

    }
  },
}
</script>

<style scoped>
</style>

```
