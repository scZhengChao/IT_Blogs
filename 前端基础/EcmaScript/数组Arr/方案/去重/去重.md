# 去重

## 目录

- [去重](#去重)
  - [filter](#filter)
  - [set ](#set-)
  - [reduce ](#reduce-)
  - [相邻去重](#相邻去重)
  - [数组嵌套对象去重](#数组嵌套对象去重)
    - [第一种：利用对象的特性](#第一种利用对象的特性)
    - [第二种：Map 去重](#第二种Map-去重)

# 去重

## filter

```javascript 
     let newarr = arr.filter((item,index)=>!arr.includes(item,index+1))
    
    
    array.filter((item,idx,arr) => arr.indexOf(item) === idx);
```


## set&#x20;

```javascript 
 Array.from(new Set(arr))

const nonUnique = [...new Set(array)];
```


## reduce&#x20;

```javascript 
 function unique (arr) {
    return arr.sort().reduce((acc, cur) => {
     if (acc.length === 0 || acc[acc.length - 1] !== cur) {
         acc.push(cur);
     }
     return acc
 }, [])}
;

// 测试
var arr = [1, 2, 2, 3]
unique(arr); // [1, 2, 3]

```


## 相邻去重

```javascript 
     var str = 'abccdedeefghiiiabbbbnnnsssfgg'; || 数组
    function QC(data){
        let arr
        Array.isArray(data)?arr = data:arr = data.split('')
        for(var i = 0 ; i < arr.length;i++){
            if(arr[i] == arr[i+1]){
               arr.splice(i+1,1)
                i = i-1
            }
        }
        return arr.join('')
    }
    onsole.log(QC(str))
```


## 数组嵌套对象去重

### 第一种：利用对象的特性

```javascript 
 var arr4 = [{name: 'a',id: 1}, {name: 'a',id: 2}, {name: 'b',id: 3}, {name: 'c',id: 4},
 {name: 'c',id: 6}, {name: 'b',id: 6}, {name: 'd',id: 7}];
// array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
// (function(必选初始值或计算结束返回值, 必选当前元素, 可选索引, 可选原数组),可选函数初始值)
var obj = {};
function deWeightFour() {
    arr4 = arr4.reduce(function(a, b) {
        obj[b.name] ? '' : obj[b.name] = true && a.push(b);
        return a;
    }, [])
    return arr4;
}
var newArr4 = deWeightFour();
console.log('%c%s', 'color:red;', '方法四：es5,newArr4', newArr4);
```


### 第二种：Map 去重

```javascript 
 var arr3 = [{name: 'a',id: 1}, {name: 'a',id: 2}, {name: 'b',id: 3}, {name: 'c',id: 4},
 {name: 'c',id: 6}, {name: 'b',id: 6}, {name: 'd',id: 7}];
let deWeightThree = () => {
    let map = new Map();
    for (let item of arr3) {
        if (!map.has(item.name)) {
            map.set(item.name, item);
        }
    }
    return [...map.values()];
}
let newArr3 = deWeightThree();
console.log('%c%s', 'color:red;', '方法三：es6,newArr3', newArr3);
```
