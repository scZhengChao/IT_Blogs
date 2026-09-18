# import-html-entry

## 目录

- [1. 为什么要分析import-html-entry](#1-为什么要分析import-html-entry)
- [2. 一个简单的例子](#2-一个简单的例子)

## 1. 为什么要分析import-html-entry

在qiankun中，子应用的入口文件是通过import-html-entry来加载的，作为qiankun一个重要的依赖，我们有必要了解import-html-entry的实现原理，才能更好的理解qiankun。

## 2. 一个简单的例子

这里的例子是`import-html-entry`库中的一个例子,这里我稍微做了下改动，用src中的`index.js`为入口文件，便于我们分析代码。

```javascript 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>index</title>
</head>
<body>
<!--<script src="../dist/import-html-entry.js"></script>-->
<script type="module">
  import importHTML from '../src/index.js';
    importHTML('./template.html').then(res => {
       console.log(res.template);
       res.execScripts().then(exports => {
          console.log(exports);
       });
    });

</script>
</body>
</html>

```
