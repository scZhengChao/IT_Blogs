# Api

## 目录

- [过滤数组中的空值](#过滤数组中的空值)
- [找元素：](#找元素)
- [增删改查](#增删改查)
- [填充：](#填充)
- [length ](#length-)
- [排序](#排序)
  - [reverse](#reverse)
- [截取：](#截取)
- [字符串和数组之间转换](#字符串和数组之间转换)
- [伪数组/数组 之间的转化](#伪数组数组-之间的转化)
- [元素的 dataset](#元素的-dataset)

### **过滤数组中的空值**

```javascript 
arr.filter(Boolean)  //删除arr 里为false的项  null，undefined，false，0,'',NaN  ， 不改变原数组
const myArray = [1, undefined, NaN, 2, null, '@denicmarko', true, 3, false];
console.log(myArray.filter(Boolean)); // [1, 2, "@denicmarko", true, 3]

```


# 找元素：

- arr.indexOf()  找到返回索引,找不到返回-1

```javascript 
// 奇葩js
const arr = [1, 2, 3];

// 存在，等效于 > -1
if (～arr.indexOf(1)) {

}

// 不存在，等效于 === -1
!~arr.indexOf(1);

// 按位操作效率高点，代码也简洁一些。也可以使用es6的 includes() 。但写开源库需要考虑兼容性的道友还是用 indexOf 比较好

```


- arr.includes(item,2)  从索引为2开始找,返回true 或者false  可以用于去重

# 增删改查

- arr.push() 末尾增加 
- arr.unshift() 开头增加
- &#x20;arr.pop() 末尾删除； 返回该元素
- arr.shift() 开头删除

# 填充：

value：填充值。&#x20;

start：填充起始位置，可以省略。&#x20;

end：填充结束位置，可以省略，实际结束位置是end-1。&#x20;

```javascript 
 ScanView_Barcode_center
```


```javascript 
 arr.fill(value, start, end) 
const arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
arr3.fill(7, 2, 5)
console.log('%s', arr3)
1,2,7,7,7,6,7,8,9,10,11
```


# length&#x20;

```javascript 
  数组中的 length 属性表示数组中元素的数目。 
const arr = [1, 2, 3] arr.length // 3
减小 length 属性值，会使 JS 引擎将数组元素个数减少到与 length 属性的值相等。 
const arr = [1, 2, 3] arr.length // 3 arr.length = 1 arr // [1] 
arr 的 length 属性值更改为 1，因此 arr 减少了元素个数，使其等于 length 属性值。 
如果增加 length 属性，则 JS 引擎将添加元素（未定义的元素）以使数组中的元素数量达到 length 属性的值。 
const arr = [1, 2, 3] arr.length // 3 arr.length = 1 arr // [1]  arr.length = 5 arr // [1, empty × 4] 
arr 中的元素只有一个，然后我们将长度增加到 5 ，因此又增加了 4 个元素长度，使元素数达到 5。
```


# 排序

- arr.sort(function(a,b){return a-b}) || arr.sort(function(a,b){return a.age-b.age})
- arr.sort(function() { return Math.random() - 0.5   }) 随机排列
- arr.reverse()反向排序

## reverse

```javascript 
var x = [].reverse;
x();

// A. []
// B. undefined
// C. error
// D. window
答案是D。MDN规范关于 reverse 的描述：

```


> reverse 方法颠倒数组中元素的位置，并返回该数组的引用。

而这里调用的时候没有制定数组，所以默认的 this 就是 window，所以最后结果返回的是 window。

# 截取：

不改变原数组

```javascript 
arr.slice(n,m) 截取,包括n但不包括m  
var a=[1,2,3,4,5,6,7,8,9,10];  怎么拿到数组里 6,7,8,9,10 
a.slice(-5); // 6,7,8,9,10 
arr.slice(1,-1)允许负数  不改变原数组，-1为倒数第一个，-2 为倒数第二个
 可以为负数 
array.slice(start, end)
 返回值任为数组 

substr    可以为负数
string.substr(start,length)


substring    不能为负数 
substring() 方法用于提取字符串中介于两个指定下标之间的字符。
substring() 方法返回的子串包括 开始 处的字符，但不包括 结束 处的字符。
string.substring(from, to)


```


# 字符串和数组之间转换

- arr.join('') 将数组装换成字符串,并将''里的分隔每一项
- str.split(“”)  将字符串分割为数组
- arr.toString()装换为字符串 &#x20;
- arr.toLocaleString() 装换为本地数组

总结：

- num.toFixed(2) 保留两位小数
- 交换两个数的值\[x,y]=\[y,x]
- filter()、concat() 和 slice()。它们不会变更原始数组，而总是返回一个新数组
- **返回值:增加返回新增后的长度,删除返回删除的项,splice返回删除的数组,slice返回截取的数组**

# **伪数组/数组 之间的转化**

```javascript 
Array.prototype.slice.call(arguments);  
[ ].slice.call(arguments,0) 
Array.from(arguments) 
```


# **元素的 dataset**

使用 dataset 属性访问元素的自定义数据属性

```javascript 

<div id="user" data-name="John Doe" data-age="29" data-something="Some Data">
    John Doe
</div>
<script>
const user = document.getElementById('user');
console.log(user.dataset); 
// { name: "John Doe", age: "29", something: "Some Data" }
console.log(user.dataset.name); // "John Doe"
console.log(user.dataset.age); // "29"
console.log(user.dataset.something); // "Some Data"
</script>

```


[创建数组](创建数组.md "创建数组")

[改变原数组](改变原数组.md "改变原数组")

[判断数组](判断数组.md "判断数组")

[清空数组](清空数组.md "清空数组")

[sort](sort.md "sort")

[concat](concat.md "concat")

[splice ](splice-.md "splice ")

[修改数组](修改数组.md "修改数组")
