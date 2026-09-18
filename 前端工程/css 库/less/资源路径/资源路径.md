# 资源路径

## 目录

- [url相对路径](#url相对路径)

# url相对路径

添加less支持，并添加modules:true

结果发现background-image: url('./static/dark\_blue.jpg');编译报错，可以确定相对路径没问题

```sass (scss)  
修改为 
background-image: url('\../\../static/dark_blue.jpg');
```


**如果你使用 Sass 或 Less，resolve-url-loader 会派上用场，它支持了 CSS 内部资源的相对导入，避免资源定位失败的问题。**
