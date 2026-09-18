# 数组扁平化（又称数组降维）

## 目录

- [flat](#flat)
- [toString](#toString)
- [reduce](#reduce)
- [栈 ](#栈-)

## flat

- **arr.a**r返回新数组不改变原数组

```javascript 
 function flattening(arr,num){
        if(!Array.isArray(arr)) return arr
        return arr.flat(num);
}
// 传入 <=0 的整数将返回原数组，不扁平化
test.flat(0)
test.flat(-1)




Array.prototype.flat() 总结：

Array.prototype.flat() 用于将嵌套的数组扁平化，成为一维数组。该方法返回一个新的数组，对原数据没有影响
不传参数时，默认扁平化一层；传入一个整数时，这个整数代码想要扁平化的层数
传入 <=0 的整数将不进行扁平化，返回原数组
Infinity 关键字作为参数时，无论是多少层嵌套，都会转为一维数组
另外，注意：如果原数组有空位，Array.prototype.flat() 会跳过空位

```


- flatMap

```javascript 
 //flatMap()允许在对数组进行降维之前，先进行一轮映射，用法和map()一样。然后再将映射的结果降低一个维度。可以说arr.flatMap(fn)等效于arr.map(fn).flat(1)。但是根据MDN的说法，flatMap()在效率上略胜一筹，谁知道呢。

//flatMap()也可以等效为reduce()和concat()的组合，下面这个案例来自MDN，但是这不是一个map就能搞定的事么？
var arr1 = [1, 2, 3, 4];


arr1.flatMap(x => [x * 2]);
// 等价于
arr1.reduce((acc, x) => acc.concat([x * 2]), []);
// [2, 4, 6, 8]

```


## toString

- \*\*arr.tostring().split(',’)     \*\***绝招  函数对象都不行；有点类型 json.stringfy/parse  进行深拷贝**

## reduce

- 利用 reduce 进行迭代，核心的思想是递归实现

```javascript 
 function flattening(arr,num){
        if(!Array.isArray(arr)) return arr
        return arr.reduce((a,b)=>a.concat(Array.isArray(b)?flattening(b):b),[])
}



//实现 flat 函数：

function flat(arr, depth = 1) {
    return depth > 0
        ? arr.reduce((acc, cur) => {
        if(Array.isArray(cur)) {
            return [...acc, ...flat(cur, depth-1)]
        }
        return [...acc, cur]
    } , [])
      : arr
}

// 测试
var test = ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]]
// 不传参数时，默认扁平化一层
flat(test)
// ["a", "b", "c", "d", ["e", ["f"]], "g"]

// 传入一个整数参数，整数即扁平化的层数
flat(test, 2)
// ["a", "b", "c", "d", "e", ["f"], "g"]

// Infinity 关键字作为参数时，无论多少层嵌套，都会转为一维数组
flat(test, Infinity)
// ["a", "b", "c", "d", "e", "f", "g"]

// 传入 <=0 的整数将返回原数组，不扁平化
flat(test, 0)
flat(test, -10)
// ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]];

// 如果原数组有空位，flat()方法会跳过空位。
var arr = ["a", "b", "c", "d",,]
flat(arr)
// ["a", "b", "c", "d"]

```


## 栈&#x20;

```javascript 
 function flattenDeep(arr) {
  const result = [] 
  // 将数组元素拷贝至栈，直接赋值会改变原数组
  const stack = [...arr]
  // 如果栈不为空，则循环遍历
  while (stack.length !== 0) {
    const val = stack.pop() 
    if (Array.isArray(val)) {
      // 如果是数组再次入栈，并且展开了一层
      stack.push(...val) 
    } else {
      // 如果不是数组，就用头插法插入到结果数组中
      result.unshift(val)
    }
  }
  return result
}

// 测试
var test = ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]]
flattenDeep(animals)
// ["a", "b", "c", "d", "e", "f", "g"]

```
