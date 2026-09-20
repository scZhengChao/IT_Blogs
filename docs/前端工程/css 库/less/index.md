# less

## 目录

- [问题](#问题)

[   https://less.bootcss.com/](https://less.bootcss.com/ "   https://less.bootcss.com/")

[ Less 教程 Less 简介 - 闪电教程JSRUN  http://jsrun.net/t/KspKp](http://jsrun.net/t/KspKp " Less 教程 Less 简介 - 闪电教程JSRUN  http://jsrun.net/t/KspKp")

# 问题

```sass (sass)  
Element 'textMixins' is resolved only by name without use of explicit import
```


No, you're doing it correctly. Have one main.scss file and make sure your variables are the *first* thing that you import (otherwise you will run into undefined variable issues in other files). You do not need to re-import your variables for each file as long as they are all included in your main.scss file.

I normally ignore this PhpStorm error, or you can turn it off:

- Go to `File` -> `Settings`
- `Editor` -> `Inspections` in the left panel
- `Sass/SCSS` in the right panel
- uncheck `Missing import` (or `Resolved by name only` on older versions)

[混合](./混合/index.md "混合")

[循环](./循环/index.md "循环")

[变量](./变量/index.md "变量")

[转译](./转译/index.md "转译")

[颜色](./颜色/index.md "颜色")

[资源路径](./资源路径/index.md "资源路径")

[global](./global/index.md "global")

[when](./when/index.md "when")

[函数](./函数/index.md "函数")

[修改变量](./修改变量/index.md "修改变量")

[递归](./递归/index.md "递归")

[&](./&/index.md "&")
