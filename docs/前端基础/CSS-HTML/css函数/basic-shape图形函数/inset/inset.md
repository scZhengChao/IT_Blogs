# inset

## 目录

- [浏览器支持](#浏览器支持)
  - [相关阅读](#相关阅读)
- [使用](#使用)
  - [剪切](#剪切)

\*\*CSS ****`inset()`\*\***函数是一个图形函数，用于指定某种基本图形**[**\<basic-shape>**](http://www.htmleaf.com/ziliaoku/qianduanjiaocheng/basic-shape.html "<basic-shape>")\*\*类型。****`inset()`\*\***函数用于定义矩形。**

CSS `<basic-shape>`代表一种基本图形，它通过图形函数来定义一个图形。一个基本图形可以作为shape-outside属性，或clip-path属性的参数使用，经这些属性应用在一个元素上，可以**使这个元素周围的内容环绕在它的周围**，或者**使用指定的图形来剪裁内容**。

`inset()`函数的语法如下：

```css 
inset() = inset( [offset]{1,4} [round <border-radius>]? )
/* 其中.. */
offset = <length> | <percentage>
```


`inset()`函数指定一个inset类型的矩形。**它的参数为4个偏移值**，用于指定矩形4条边在参考盒模型各个方向上的偏移。

4个偏移值的取值方式和[margin](http://www.htmleaf.com/ziliaoku/qianduanjiaocheng/margin.html "margin")相同，如果只给出一个值，那么上右下左4条边都使用这个值作为偏移值。如果给出3个值，那么第一个值代表上边部的偏移值，第二个值代表左右边部的偏移值，第三个值代表下边部的偏移值。如果给出2个值，那么第一个值代表上下边部的偏移值，第二个值代表左右边部的偏移值。如果给出了4个值，那么它们分别代表上右下左4条边的偏移值。

除了4个偏移值，`inset()`函数还有一个可选的`<border-radius>`参数，用于指定矩形的圆角。它的语法格式和[border-radius](http://www.htmleaf.com/ziliaoku/qianduanjiaocheng/border-radius.html "border-radius")属性相同。如果要\*\*指定圆角，必须带上`round`\*\***关键字。**

下面都是有效的`inset()`函数声明。

```css 
inset(10% 20% round 5px); 
/*一个带5像素圆角的矩形，上下2条边向内10%，左右2条边向内20%*/
 
inset(15px 20px 30px); 
 
inset(25% round 10px 30px);
 
inset(10px 20px 30px 40px round 10px);   
```


### 浏览器支持

![](image_u0ichsabRq.png)

#### 相关阅读

- [*CSS Shapes Module Level 1 (Candidate Recommendation)*](http://www.w3.org/TR/2014/CR-css-shapes-1-20140320/#basic-shape-functions "CSS Shapes Module Level 1 (Candidate Recommendation)")
- [*CSS Shapes Module Level 2 (Editor’s Draft)*](http://dev.w3.org/csswg/css-shapes-2/#ltbasic-shapegt "CSS Shapes Module Level 2 (Editor’s Draft)")
- [*\<basic-shape> | CSS属性参考*](http://www.htmleaf.com/ziliaoku/qianduanjiaocheng/basic-shape.html "<basic-shape> | CSS属性参考")
- [*ellipse() | CSS属性参考*](http://www.htmleaf.com/ziliaoku/qianduanjiaocheng/ellipse.html "ellipse() | CSS属性参考")
- [*circle() | CSS属性参考*](http://www.htmleaf.com/ziliaoku/qianduanjiaocheng/circle.html "circle() | CSS属性参考")
- [*polygon() | CSS属性参考*](http://www.htmleaf.com/ziliaoku/qianduanjiaocheng/polygon.html "polygon() | CSS属性参考")

# 使用

## 剪切

clip-path属性的参数使用。**来剪裁内容**。

```css 
.box{
      width: 100px;
      height: 100px;
      background-color: orange;
      -webkit-clip-path: inset(10% 20% round 5px);
      border: 1px solid black;
  }
```


![](image_SDf6vqthjg.png)

```css 
.box{
            width: 100px;
            height: 100px;
            background-color: orange;
            -webkit-clip-path: inset(0 round 10px);
            border: 1px solid black;
        }
```


![](image_VBqVqBrbG7.png)
