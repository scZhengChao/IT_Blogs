# siblings

## 目录

- [定义和用法](#定义和用法)
- [语法](#语法)

```javascript title="返回带有类名 %22start%22 的每个 <li> 元素的所有同级元素："
$(document).ready(function(){
    $("li.start").siblings().css({"color":"red","border":"2px solid red"});
});
```


## 定义和用法

siblings() 方法返回被选元素的所有同级元素。

同级元素是共享相同父元素的元素。

**DOM 树：** 该方法沿着 DOM 元素的同级元素向前和向后遍历。

**提示：** 请使用[prev()](https://www.runoob.com/jquery/traversing-prev.html "prev()") 或 [next()](https://www.runoob.com/jquery/traversing-next.html "next()") 方法来缩小仅仅搜索前一个同级元素或后一个同级元素的范围。

## 语法

```javascript 
$(selector).siblings(filter)
```


| 参数        | 描述                      |
| --------- | ----------------------- |
| *filter*​ | 可选。规定缩小搜索同级元素范围的选择器表达式。 |

`siblings()`函数用于**选取每个匹配元素的所有同辈元素(不包括自己)**

```javascript 
//返回jQuery对象所有匹配元素的标识信息数组
//每个元素形如：#id
function getTagsInfo($doms){
    return $doms.map(function(){
        return "#" + this.id;
    }).get();
}

var $n4 = $("#n4");

//匹配n4的所有同辈元素(同辈元素不会包括n4自己，下同)
var $elements = $n4.siblings( );
document.writeln( getTagsInfo( $elements ) ); // #n2,#n5,#n7,#n8

//匹配n4所有的同辈span元素
var $matches = $n4.siblings("span");
document.writeln( getTagsInfo( $matches ) ); // #n2,#n5,#n8

var $label = $("label");
//匹配所有label元素的含有类名"active"的同辈元素
var $actives = $label.siblings(".active");
document.writeln( getTagsInfo( $actives ) ); // #n7,#n8,#n12

```
