# 跳出foreach

## 目录

- [throw 法](#throw-法)
- [空跑循环](#空跑循环)
- [神奇改数组大法](#神奇改数组大法)
- [for… of](#for-of)
- [最应该使用的 every/some](#最应该使用的-everysome)

## throw 法

前面提到了, 在 forEach() 方法中除了抛出异常以外, 无法终止或者跳出循环. 那么就看看如何使用 throw 来跳出循环.

```typescript 
var BreakErr = {}
try {
  ;[1, 2, 3, 4, 5].forEach(function(v) {
    console.log(v) // 只输出 1,2
    if (v === 2) throw BreakErr
  })
} catch (e) {
  if (e !== BreakErr) throw e
}

```


这样其实也挺好的, 如果循环遍历中的操作比较复杂, 可以通过 try...catch 捕获异常. 这样的话, 跳出循环的错误就需要特别区开, 避免不会干扰代码抛出的其他错误.

## 空跑循环

在外层加一个标识, 在特定情况下改变此标识的值, 然后通过 if 语句判断, 空跑后续的循环, 如下:

```typescript 
var breakFlag = false
[1, 2, 3, 4, 5].forEach(function(v) {
  if (breakFlag) {
    return false
  }
  if (v === 2) {
    breakFlag = true
  }
  console.log(v) // 只输出 1,2
})

```


这个方法比较简单也比较容易想到, 但是该方法在外层加了一个变量, 这样会污染外层的环境. 所以我们可以使用 forEach 的第二个参数 context 来替代外层变量, 把标识放在 context 里, 这样就避免污染外层环境了.

```typescript 
[1, 2, 3, 4, 5].forEach(function(v) {
  if (this.breakFlag) {
     return false
   }
  if (v === 2) {
     this.breakFlag = true
   }
   console.log(v) // 只输出 1,2
}, {}) // 这里指定context

```


需要注意的是, forEach 的第二个参数 context , 只有在使用非箭头函数时有效, 因为箭头函数, 无法改变 context 的指向. 如果不注意的话, 会污染了父级上下文.

```typescript 
[1, 2, 3, 4, 5].forEach(v => {
     if (this.breakFlag === true) {
       return false
     }

   if (v === 2) {
      console.log(this) // 运行会发现，结果并不是 {test: 'test'}
      this.breakFlag = true
     }
      console.log(v) //只输出 1,2
  },
  {
    test: 'test'
  }
)

```


当然, 上述这种方法会有一些不必要的运行, 因为会空跑整个循环, 显得不太优雅.

## 神奇改数组大法

下面出场的这位选手, 稍微有点技术含量, 笔者还是问了大佬才知道的, 一定是我太过愚钝了.

所以你可以先别急着往下看解释, 先看看你能理解不.

```typescript 
var array = [1, 2, 3, 4, 5]
array.forEach(function(item, index) {
  if (item === 2) {
    array = array.concat(array.splice(index, array.length - index))
  }
  console.log(item) // 只输出 1,2
})

```


其实, 这种方法相当于在 item === 2 的时候, 改变了原数组引用的值, 因为原数组改变了, 则 forEach 进行到第二项就没了, 但是该方法又机智地用 concat 后的新数组赋值给了 array , 所以 array 的值看上去并没有变, 不信你可以试一下.

## for… of

```typescript 
var arr = [1, 2, 3, 4, 5]
for (val of arr) {
  if (val > 3) {
    break;
  }
  console.log(val) // 只输出 1 2 3
}

```


## 最应该使用的 every/some

在需要 break 的场景下, 我们可以使用 every 或者 some, 也比较推荐这种方式.

every 和 some 的用法如下, 它们会根据返回值来判断是否继续迭代, 能够完美满足我们的需求. every 在碰到 return false 的时候, 中止循环. some 在碰到 return true 的时候, 中止循环.

两者的代码分别如下:

```typescript 
var a = [1, 2, 3, 4, 5]
a.every(function(item, index, arr) {
  console.log(item) // 输出：1,2
  if (item === 2) {
    return false
  } else {
    return true
  }
})

var a = [1, 2, 3, 4, 5]
a.some(function(item, index, arr) {
  console.log(item) // 输出：1,2
  if (item === 2) {
    return true
  } else {
    return false
  }
})

```
