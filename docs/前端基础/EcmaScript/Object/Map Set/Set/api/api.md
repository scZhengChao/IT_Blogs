# api

## 目录

- [Set](#Set)
  - [ 属性:](#-属性)
  - [方法: ](#方法-)
- [遍历](#遍历)
  - [foreach可以遍历Set()对象（set数组去重）](#foreach可以遍历Set对象set数组去重)

# Set

&#x20;Set**类似数组没有重复的结构**,但是set不会发生隐式转换

## &#x20;属性:

1. constructor:构造函数,默认就是Set函数
2. size:返回Set实例的成员总数

## 方法:&#x20;

1. add(value) 添加 某个值,返回Set结构本身
2. delete(value) 删除某个值.返回一个boolean,表示删除成功与否
3. has(value):返回一个boolean表示该值 是否为Set成员
4. clear()   清除所有成员,没有返回值
5. foreach 这个可不是arr的foreach；是自带的

```javascript 
Array.from(new Set(arr))  去重
for of  set.values()/keys()/entries()
```


# 遍历

遍历 map 和 set（set）是附带的 for of keys（） ，values（），entries（）

```javascript 
 for(var [k,v] of mymap){
     console.log(k,v)
}
for(var i of mymap.keys()){
     console.log(i)
}
for(var i of mymap.values()){
    console.log(i)
}
for(var i of mymap.entries()){
    console.log(i)
}
```


## foreach可以遍历Set()对象（set数组去重）

```javascript 
var arr = [3, 2, 4, 6, 4, 5, 9, 7, 7, 7, 6]
var a = new Set(arr)
//a 是对象类型
a.forEach((s) => {
  console.log(s);
})

```


Set()使用的foreach是它本身原型中定义的，专门用来遍历自身的对象;而我们用的foreach是用来遍历数组的方法

![](image_T2KCpmT876.png)
