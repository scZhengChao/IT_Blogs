# calc

## 目录

- [定义与用法](#定义与用法)
- [案例](#案例)
- [calc() 嵌套](#calc-嵌套)
- [降级方案](#降级方案)
  - [使用 calc() 在 CSS 中进行单位转换](#使用-calc-在-CSS-中进行单位转换)

## 定义与用法

calc() 函数用于动态计算长度值。

- 需要注意的是，运算符前后都需要**保留一个空格**，例如：`width: calc(100% - 10px)`；
- **任何长度值**都可以使用calc()函数进行计算；
- calc()函数支持 "+", "-", " \*", "/" 运算；
- calc()函数使用标准的数学运算优先级规则

# 案例

用一个百分比减掉一个像素值。

```typescript 
.foo {
    width: calc(100% - 50px);
}

```


calc() 函数可以用来对数值属性执行四则运算。比如，\<length>，\<frequency>，\<angle>，\<time>，\<number> 或者 \<integer> 数据类型。

```typescript 
.foo {
    width: calc(50vmax + 3rem);
    padding: calc(1vw + 1em);
    transform: rotate( calc(1turn + 28deg) );
    background: hsl(100, calc(3 * 20%), 40%);
    font-size: calc(50vw / 3);
}
```


# calc() 嵌套

calc() 函数可以嵌套。在函数里边，会被视为简单的括号表达式，如下例所示。

```typescript 
.foo {
    width: calc( 100% / calc(100px * 2) );
}
```


# 降级方案

calc() 已经得到主流浏览器的支持。

对于不支持 calc() 的浏览器，整个属性值表达式将被忽略。不过我们可以对那些不支持 calc() 的浏览器，使用一个固定值作为降级方案。

```typescript 
.foo {
    width: 90%; 
    width: calc(100% - 50px);
}
```


### 使用 calc() 在 CSS 中进行单位转换

使用 CSS `calc()` 函数，我们可以将一个没有单位的值转换**为一个有单位的值**，方法是将该值乘以要转换的单位类型。这对 **CSS 变量很有用，** 如下例所示：

```typescript 
.class {
  --fav-num: 3;
  width: calc(var(--fav-num) * 1px); // 3px
}
```
