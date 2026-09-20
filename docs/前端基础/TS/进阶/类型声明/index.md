# 类型声明

## 目录

- [event](#event)
- [dom元素](#dom元素)
- [为window对象添加属性](#为window对象添加属性)

### event

```javascript 
function fileSelected(e: Event) {  
  const target = e.target as HTMLInputElement  
  const file: File = (target.files as FileList)[0] 
   // ...
}
//或者
event:keyof HTMLElementEventMap

interface MouseEvent extends UIEvent


function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value)
}
没有类型标注时，这个 event 参数会隐式地标注为 any 类型。
这也会在 tsconfig.json 中配置了 "strict": true 或 "noImplicitAny": true 时报出一个 TS 错误。
因此，建议显式地为事件处理函数的参数标注类型。此外，你可能需要显式地强制转换 event 上的属性

```


### dom元素

```javascript 
一般均为HTMLElement，特殊的为HTML+标签名+Element ，当然也有些标签名为单字母的例如h1-h6，他们的类型为HTMLHeadingElement。
```


# 为window对象添加属性

```typescript 
declare global {  //设置全局属性
  interface Window {  //window对象属性
    aaa: boolean;   //加入对象
  }
}
window.aaa=true //不报错

```


You need to add at least one import or one export in order to make global.d.ts an external module to have a global scope effect, so in your case you can do the following:

```typescript 
declare global {  //设置全局属性
    interface Window {  //window对象属性
        eventHub: any;   //加入对象
    }
}

 export {}
```
