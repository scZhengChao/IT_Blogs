# 全局

## 目录

- [app.config.globalProperties#](#appconfigglobalProperties)

## app.config.globalProperties[#](https://cn.vuejs.org/api/application.html#app-config-globalproperties "#")

一个用于注册能够被应用内所有组件实例访问到的全局属性的对象。

- **类型**

```typescript 
interface AppConfig {
  globalProperties: Record<string, any>
}

```


- **详细信息**

  这是对 Vue 2 中 `Vue.prototype` 使用方式的一种替代，此写法在 Vue 3 已经不存在了。与任何全局的东西一样，应该谨慎使用。

  如果全局属性与组件自己的属性冲突，组件自己的属性将具有更高的优先级。
- **用法**
  ```typescript 
  app.config.globalProperties.msg = 'hello'

  ```

  这使得 `msg` 在应用的任意组件模板上都可用，并且也可以通过任意组件实例的 `this` 访问到：
  ```typescript 
  export default {
    mounted() {
      console.log(this.msg) // 'hello'
    }
  }

  ```

- 访问

```typescript 
// main.ts声明（需要挂载前定义）
app.config.globalProperties.$test = 'hello world!!' 
app.mount('#app')

// 在页面setup内调用
import { getCurrentInstance } from 'vue';
setup() {
  const { proxy } = getCurrentInstance();
  console.log(proxy.$test); // 打印hello world!!
}
// or
const cns = getCurrentInstance()
console.log(cns.appContext.config.globalProperties.$user)





在组件模板调用
<p>globalProperties全局变量：{{ $test }}</p>

```
