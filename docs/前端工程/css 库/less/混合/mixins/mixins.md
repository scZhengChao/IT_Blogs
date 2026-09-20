# mixins

## 目录

- [mixins](#mixins)
  - [不把 Mixin 输出到编译后的 CSS 中](#不把-Mixin-输出到编译后的-CSS-中)
  - [Mixin 中使用选择器](#Mixin-中使用选择器)
  - [命名空间](#命名空间)
  - [命名空间守卫](#命名空间守卫)
  - [!important关键字](#important关键字)
  - [携带参数的混入](#携带参数的混入)
    - [命名参数](#命名参数)
    - [@arguments变量](#arguments变量)
    - [高级参数 和@rest变量](#高级参数-和rest变量)
    - [模式匹配](#模式匹配)
  - [作为函数的 mixins](#作为函数的-mixins)

# mixins

混入是指把已存在的样式混入到别的样式中。

**注意：当调用 mixin 时，** ​**括号是可选的**

```css 
// 下面两种 mixin 的调用方法效果是一样的
.a, #b {
  color: red;
}

.mixin-class {
  .a();
}
.mixin-class {
  .a;
}

```


##### 不把 Mixin 输出到编译后的 CSS 中

如果你想用 mixin 但又不想把它输出到编译结果中，在定义 mixin 的时候，在 mixin 后面加上括号

```sass (scss) 
.my-mixin {
  color: black;
}
// 注意 my-other-mixin 后面加了括号
.my-other-mixin() {
  background: white;
}

.class {
  .my-mixin;
  .my-other-mixin;
}
```


编译输出结果:

```css 
.my-mixin {
  color: black;
}
//可以看到这一行并没有输出上面定义的 my-other-mixin. 但是下面的 .class 中却含有 background: white;
.class {
  color: black;
  background: white;
}
```


##### Mixin 中使用选择器

Mixin 中不只可以写 css 样式属性，还可以包含选择器。例如：

```sass (scss) 
.my-hover-mixin() {
  &:hover {
    border: 1px solid red;
  }
}

button {
  .my-hover-mixin();
}
```


编译输出结果:

```css 
button:hover {
  border: 1px solid red;
}
```


##### 命名空间

如果要在更复杂的选择器中混入属性，可以叠加多个id或类。

```css 
#outer {
  .inner {
    color: red;
  }
}

.c {
  #outer > .inner;
}
```


\*\*`>`\*\***和空格都可以省略。如下**

```css 
// 下面的写法效果是一样的
#outer > .inner;
#outer > .inner();
#outer .inner;
#outer .inner();
#outer.inner;
#outer.inner();
```


这种方法的一个用途被称为命名空间。**您可以将mixin放在id选择器下，这样可以确保它不会与另一个库冲突(即隔离外界干扰，避免其他样式对该 mixin 的影响)**。例如：

```sass (sass) 
#my-library {
  .my-mixin {
    color: black;
  }
}

// 可以如下方法调用
.class {
  #my-library > .my-mixin();
}
```


##### 命名空间守卫

如果命名空间具有保护，则**仅当保护条件返回true时才使用由其定义的mixin**。命名空间保护的计算方式与mixin上的保护完全相同，因此接下来两个mixin的工作方式相同：

```markdown 
#namespace when (@mode=huge) {
  .mixin() {/* */}
}

#namespace {
  .mixin() when (@mode=huge) {/* */}
}
```


下面的`default`函数对于嵌套的 命名空间 和 mixin 有相同的返回值，因此如下的 mixin 永远不会执行。因为它的某一个守卫(即`default()`和`not(default())`)肯定是false:

```markdown 
#sp_1 when (default()) {
  #sp_2 when (default()) {
    .mixin() when not(default()) {/* */}
  }
}
```


##### `!important`关键字

在 mixin 调用之后使用`!important`关键字，**会把 mixin 所包含的全部css属性标记**为`!important`.

```sass (scss) 
.foo (@bg: #f5f5f5, @color: #900) {
  background: @bg;
  color: @color;
}


.unimportant {
  .foo();
}
.important {
  .foo() !important;
}
```


输出结果为:

```css 
.unimportant {
  background: #f5f5f5;
  color: #900;
}
.important {
  background: #f5f5f5 !important;
  color: #900 !important;
}
```


## 携带参数的混入

多个参数之间用`逗号`或`分号`隔开，***推荐用***\*\*\*`分号`\***. 逗号有两重意思,它可以被解释为**mixin参数的分隔符**或者是**CSS列表分隔符\*\*

使用逗号作为 mixin 参数分隔符时，而 mixin 的每一个参数又是需要用逗号分开的列表，这将不可能实现。另一方面，如果编译器在调用或声明 mixin 的地方发现至少一个**分号**，编译器就会认为所有的参数将以**分号**分隔，所有的逗号都是css列表:

- 两个参数，每个参数是逗号分隔的列表:`.name(1, 2, 3; something, else)`.
- 三个参数，每个参数都是一个数字：`.name(1, 2, 3)`.
- 使用伪分号创建一个包含逗号分隔css列表的参数的mixin调用:`.name(1, 2, 3;)`.
- 逗号分隔默认值:`.name(@param1: red, blue;)`.

使用相同的名称和参数数量定义多个 mixins 是允许的。LESS 会使用所有**可以使用的**css属性。记住如下`mixin编译规则`:
**如果以**\*\*`.mixin(green)`\*\***这样只携带一个参数的方式使用这多个相同名称的 mixin，****则所有相同名称的 mixins 且参数列表中只含有该必填参数，其他参数都为可选的 mixins 中所包含的全部 css 样式合并起来****，赋予给调用这个只传了一个必传参数的mixin的选择器**：

```sass (scss) 
// 定义第 1 个 .mixin 混入函数
.mixin(@color) { // 这里的 color 参数在调用 .mixin 时是必传的，因为没有给 color 设置默认颜色值
  color-1: @color;
}

// 定义第 2 个 .mixin 混入函数，它和上一个混入函数同名
.mix(@color; @padding: 2) { // 这里的 color 也是必传的。padding参数是选填的，因为有默认值
  color-2: @color;
  padding-2: @padding;
}

// 定义第 3 个 .mixin 混入函数，它和第1、2个混入函数同名
.mixin(@color; @padding; @margin: 2) { // 这里的 color 是必传的，需要注意的是，padding也是必传的，
                                       // 和1、2两个 mixin 不同的是，这个 mixin 有2个必传参数，
                                       // margin 参数可以省略，因为有默认值
  color-3: @color;
  padding-3: @padding;
  margin: @margin @margin @margin @margin;
}


.some .selector div {
  .mixin(#008000); // 这里只传入了 color 这一个必填参数。注意看下面编译的结果
}
```


最终编译输出的结果为：

```css 
.some .selector div {
  color-1: #008000;
  color-2: #008000;
  padding-2: 2;
}
```


上面的编译结果，是因为在调用同名的 mixin 函数`.mixin`时，只传入了一个参数`color`,我们逐步看一下最终的编译结果是怎么出来的。

1. 在第一个`.mixin`中，参数`@color`是必传的，根据上面的`mixin编译规则`,该\*\* mixin 中包含的 css 样式最终会编译进调用它的选择器中。\*\*
2. 在第二个`.mixin`中，参数`@color`是必传的，`@padding`是可省略的，因此该 mixin 中只有`@color`一个必传参数，根据`mixin编译规则`，**该 mixin 中包含的 css 样式最终也会编译进调用它的选择器中。**
3. 在第三个`.mixin`中，参数`@color``@padding`都是必传的，根据`mixin编译规则`，不符合只有`@color`这一个必传参数的原则，因此该 mixin 中的所有样式**都不会**编译进输出结果中。

##### 命名参数

m**ixin 不只可以通过参数位置来传递实参，可以通过参数名称来给它传递实参**。任何的 mixin 形参都可以通过指定形参名称来给它传递实参，而不依赖于定义该 mixin 时的形参顺序:

```sass (scss) 
.mixin(@color: black; @margin: 10px; @padding: 20px) {
  color: @color;
  margin: @margin;
  padding: @padding;
}


.class1 {
  .mixin(@margin: 20px; @color: #33acfe); // 调用 mixin 时通过指定形参名称传递实参值，并没有按照定义 
                                          // mixin 时的顺序 先 color  其次 margin 最后 padding 的
                                          // 顺序来传值
}
.class2 {
  .mixin(#efca44; @padding: 40px); // 按原有的形参顺序传值时，可以不指定形参名
}
```


##### `@arguments`变量

`@arguments`在 mixins 中有独特的含义，它**包含了传入的所有参数，当该 mixin 被调用时，如果不想单独的写每个参数时会比较有用。**

```css 
.box-shadow(@x: 0; @y: 0; @blur: 1px; @color: #000) {
  -webkit-box-shadow: @arguments;
     -moz-box-shadow: @arguments;
          box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px; 5px);
}
```


编译结果如下:

```css 
.big-block {
  -webkit-box-shadow: 2px 5px 1px #000;
     -moz-box-shadow: 2px 5px 1px #000;
          box-shadow: 2px 5px 1px #000;
}
```


##### 高级参数 和`@rest`变量

当一个 mixin 携带**有可变数量的参数**时，可以使用`...
`在**变量名后面使用**该操作符将会把这些参数赋给变量

```sass (scss) 
.mixin(...) { // 匹配第 0 - N 个 arguments
.mixin() {    // 匹配第 0 个 arguments
.mixin(@a: 1) { // 匹配第 0 -1 个 arguments
.mixin(@a: 1; ...) { // 匹配 0 - N 个 arguments
.mixin(@a; ...) { // 匹配 1 - N 个 arguments
```


此外：

```sass (scss) 
.mixin(@a; @rest...) {
  // @rest 绑定到 @a 之后的所有参数
  // @arguments 绑定到所有参数
}
```


##### 模式匹配

有时候我们想根据传入的参数改变一个 mixin 的行为。让我们从一个基础的例子开始:

```sass (sass) 
.mixin(@s; @color) {...}

.class {
  .mixin(@switch; #888);
}
```


我们想根据`@switch`的**不同让 mixin 表现出不同的结果**。我们可以如下定义`.mixin`:

```sass (sass) 
.mixin(dark; @color) {
  color: darken(@color, 10%);
}
.mixin(light; @color) {
  color: lighten(@color, 10%);
}
.mixin(@_; @color) {
  display: block;
}
```


此时如果我们编译下面的样式:

```sass (scss) 
@switch: light;

.class {
  .mixin(@switch; #888);
}
```


**编译得到的CSS结果为:**

```css 
.class {
  color: #a2a2a2;
  display: block;
}

```


给`.mixin`传入 color 的地方会变亮。如果`@switch`的值为`dark`, 结果就是一个比较暗的颜色。我们逐步分析是怎么编译出来的：

- 第一个 mixin 不匹配，因为第一个参数为`dark`
- 第二个 mixin 匹配，因为它的第一个参数为`light`
- 第三个 mixin 匹配，因为它的第一个参数接受任意值 &#x20;

  **只有匹配的 mixin 才会被采用。变量匹配并绑定到任意值。** ​**变量以外的任何内容都只和等于自身的值匹配。** &#x20;

  我们也可以匹配参数个数，看下面的例子:

```sass (sass) 
.mixin(@a) {
  color: @a;
}
.mixin(@a; @b) {
  color: fade(@a; @b);
}
```


如果我们调用`.mixin`时只传入了一个参数, 我们会得到第一个 .mixin 的编译结果.如果传入了两个参数，就会得到第二个 .mixin 的编译结果，即`@a`变为`@b`.

## 作为函数的 mixins

> 从 **mixins 中返回变量或 mixins &#x20;
> **在 **mixin 中定义的变量和 mixin 是可见的**，可以**在调用者的作用域中使用**。只有一个例外，如果调用方包含同名变量（包括由另一个 mixin 调用定义的变量），则不复制变量。\*\*只有调用方本地作用域中存在的变量才受保护。从父作用域继承的变量将被重写(覆盖)。 &#x20;
> \*\*例如:

```sass (scss) 
.mixin() {
  @width: 100%;
  @height: 200px;
}

.caller {
  .mixin();
  width: @width;
  height: @height;
}
```


编译结果为:

```css 
.caller {
  width: 100%;
  height: 200px;
}
```


因此，mixin中定义的变量可以作为其返回值。这允许我们创建一个可以像函数一样使用的mixin &#x20;
例如:

```sass (scss) 
.average(@x, @y) {
  @average: ((@x + @y) / 2);
}
div {
  .average(16px, 50px); // 调用 mixin
  padding: @average;
}
```


编译结果为:

```css 
div {
  padding: 33px;
}
```


在**调用者作用域内定义的变量不会被覆盖**。然而，**在调用者父级作用域中定义的变量将不被保护且可以被覆盖**

```sass (scss) 
.mixin() {
  @size: in-mixin;
  @defineOnlyInMixin: in-mixin;
}

.class {
  margin: @size @defineOnlyInMixin;
  .mixin();
}

@size: globaly-defined-value; // 调用者父作用域 - 无保护
```


编译结果为:

```sass (scss) 
.class {
  margin: in-mixin in-mixin;
 }
```


最后， mixin 中定义的 mixin 也会被当做返回值

```typescript 
.unlock(@value) { // 父级 mixin
  .doSomething() { // 子级 mixin 
    declaration: @value;
  }
}

、#namespace {
  .unlock(5);  // unlock 做一些混入
  .doSomething(); // 子级 mixin 被拷贝到这里且可用
}
```
