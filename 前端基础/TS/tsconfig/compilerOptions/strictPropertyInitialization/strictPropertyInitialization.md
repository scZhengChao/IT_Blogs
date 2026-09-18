# strictPropertyInitialization

## 目录

- [解决方案](#解决方案)
  - [单次忽略](#单次忽略)
  - [构造函数赋值](#构造函数赋值)
  - [修改全局配置](#修改全局配置)

ts默认在class中**声明的属性必须要初始化，如果没有初始化**，就会报这个错 **属性“xxx”没有初始化表达式，且未在构造函数中明确赋值**

如果给它赋值为`null`，就必须得在使用的时候使用非空断言，使用的繁琐度又上升了

### 解决方案

#### 单次忽略

使用 `// @ts-ignore`来暂时性单次忽略此次报错

代码：

```typescript 
class Person {
    // @ts-ignore
    name : string;
};

```


#### 构造函数赋值

使用构造函数赋值

代码：

```typescript 
class Person {
    name : string;
    constructor(data: {name: string}) {
        this.data = data;
    }
};

const a = new Person({name: 'Tom'});
console.log(a.data.name);

```


#### 修改全局配置

更改配置，关闭ts的初始化检测

1. 打开`tsconfig.json`
2. 把`strictPropertyInitialization`改为`false`

> 没有`strictPropertyInitialization`，可手动添加即可

代码：

```json 
{
  "strictPropertyInitialization": false
}

```
