# api

## 目录

- [ 属性: ](#-属性-)
- [  方法:    ](#--方法----)

**`Map`** **对象保存键值对，并且能够记住键的原始插入顺序。任何值（对象或者**[**原始值**](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive "原始值")**）都可以作为键或值。**

Map **类似对象**\*\*,是键值对的集合map 比Object更合适 ,****map的键可以使任何值而不仅仅是字符****串\*\*

## &#x20;属性:&#x20;

1. size属性:返回Map结构成员总数

## &#x20; 方法:   &#x20;

1. set(key,value) set方法设置key所对应的键值,返回map本身可以采用链式写法
2. get(key) 读取key对应的键值,找不到返回undefined
3. has(key) 返回一个boolean值,表示某个键是否存在Map数据结构中
4. delete(key)返回一个boolean 表示是否删除成功
5. clear() 清除所有成员,没有返回值
6. foreach 这个可不是arr的foreach；是自带的

```javascript 
 var s = new Set()
s.add(13)
s.add(2)
var mymap = new Map()
mymap.set('name','zc')
mymap.set('age',15)

```
