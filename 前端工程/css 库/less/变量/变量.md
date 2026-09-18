# 变量

## 目录

- [申明原则](#申明原则)
  - [示例](#示例)
  - [优先级](#优先级)
  - [导出变量 和命名空间](#导出变量-和命名空间)
- [配置全局变量](#配置全局变量)

# 申明原则

```javascript 
@变量名: 值;

 必须有 @ 为前缀； 
 不能包含特殊字符；
不能以数字开头； 
 大小写敏感； 
 必须加分号
```


## 示例

```css 
用于属性值 

@color: pink;

body {
  color: @color;
}
a:hover {
  color: @color;
}

 用于选择器名
 @my-selector: banner;

.@{my-selector} {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}

 用于URLs 
@images: "../img";

body {
  color: #444;
  background: url("@{images}/white-sand.png");
}


```


## 优先级

就近原则

```css 
@var: 0;
.class {
  @var: 1;
  .brass {
    @var: 2;
    three: @var;
    @var: 3;
  }
  one: @var;
}
```


与 CSS 自定义属性一样，混合（mixin）和变量的**定义不必在引用之前事先定义**。因此，下面的 Less 代码示例和上面的代码示例是相同的：

```sass (sass)  
@var: red;
#page {
  #header {
    color: @var; // white
  }
  @var: white;
}
```


## 导出变量 和命名空间

```sass (sass)  
//variables.module.less 

// 命名空间
@namespace: v;
// el命名空间
@elNamespace: el;

 // 导出变量
 :export {
  namespace: @namespace;
  elNamespace: @elNamespace;
}


 导入变量 
import variables from '@/styles/variables.module.less'

export const useDesign = () => {
  const lessVariables = variables

  /**
   * @param scope 类名
   * @returns 返回空间名-类名
   */
  const getPrefixCls = (scope: string) => {
    return `${lessVariables.namespace}-${scope}`
  }

  return {
    variables: lessVariables,
    getPrefixCls
  }
}


```


# 配置全局变量

```javascript 
npm install less
npm install less-loader
 配置全局使用 less变量  vite.config.ts 
css: {
  preprocessorOptions: {
    less: {
      additionalData: '@import "./src/styles/variables.module.less";',
      javascriptEnabled: true
    }
  }
},
```
