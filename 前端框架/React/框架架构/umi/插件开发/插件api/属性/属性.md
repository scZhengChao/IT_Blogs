# 属性

属性就是提供的一些全局数据，在你需要的时候，直接去取就行，

比如：`api.paths`，在 `onStart` 中打印它。

```javascript 
import { IApi } from "umi";

export default (api: IApi) => {
  api.onStart(() => {
    console.log("Local Plugin");
    console.log(api.paths);
  });
};

```


```javascript 

Local Plugin
{
  cwd: '/Users/congxiaochen/Documents/learn-for-umi-plugin',
  absSrcPath: '/Users/congxiaochen/Documents/learn-for-umi-plugin/src',
  absPagesPath: '/Users/congxiaochen/Documents/learn-for-umi-plugin/src/pages',
  absApiRoutesPath: '/Users/congxiaochen/Documents/learn-for-umi-plugin/src/api',
  absTmpPath: '/Users/congxiaochen/Documents/learn-for-umi-plugin/src/.umi',
  absNodeModulesPath: '/Users/congxiaochen/Documents/learn-for-umi-plugin/node_modules',
  absOutputPath: '/Users/congxiaochen/Documents/learn-for-umi-plugin/dist'
}


```


需要注意的一点是，**所有的属性一般都只能**在 `hooks` 里面使用。也就是需要在 `api.xxxxx(()=>{ })` 的回调中使用。因为有些属性是在**注册阶段不存在**的，如果你直接使用这些属性，则会产生意料之外的错误。

除了属性之外的其他 Api 差不多都是通过 `api.xxxxx(()=>{ })` 注册的。这里我们可以简单的对它们进行分类。
