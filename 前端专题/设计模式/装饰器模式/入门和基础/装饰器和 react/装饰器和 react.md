# 装饰器和 react

## 目录

- [ts 和 装饰器 报错](#ts-和-装饰器-报错)

# ts 和 装饰器 报错

Unable to resolve signature of class decorator when called as an expression&#x20;

```javascript 
 const connects: Function = connect;
@connects((state:any)=>{
    return {
        store:state
    }
},(dispatch:any)=>{
    return {
        add:()=>dispatch({type:'list/test1',payload:{name:'login--dispatch'}})
    }
})
```


Experimental support for decorators is a feature that is subject to change in a future release. Set the ‘experimentalDecorators’ option to remove this warning.”and“Unable to resolve signature of method decorator when called as an expression.”错误原因&#x20;

```javascript 
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "strictFunctionTypes": false,
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
      
     "experimentalDecorators": true,
       
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
```


```json title=".babelrc"
{
  "presets": [
    "react-app",
    "@babel/preset-env",
    "@babel/preset-typescript"
  ],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "version": "2023-11"
      }
    ],
    "@babel/plugin-proposal-class-properties"
  ]
}

```
