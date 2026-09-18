# 转译

## 目录

- [转译](#转译)

# 转译

转义（Escaping）允许你使用任意字符串作为**属性或变量值**。任何 `~"anything"` 或 `~'anything'` 形式的内容都将按原样输出，除非 [interpolation](https://less.bootcss.com/features/#variables-feature-variable-interpolation "interpolation")。

```javascript 
@min768: ~"(min-width: 768px)";
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}

编译为：
@media (min-width: 768px) {
  .element {
    font-size: 1.2rem;
  }
}

calc（～'100% - 10rem'）

```


[   https://www.jianshu.com/p/4c07e3b3351d](https://www.jianshu.com/p/4c07e3b3351d "   https://www.jianshu.com/p/4c07e3b3351d")
