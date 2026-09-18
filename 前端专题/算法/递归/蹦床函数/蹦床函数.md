# 蹦床函数

## 目录

- [案例一](#案例一)
- [案例二](#案例二)

上面就是蹦床函数的一个实现，它接受一个函数f作为参数。只要f执行后返回一个函数，就继续执行。注意，这里是返回一个函数，然后执行该函数，而不是函数里面调用函数，这样就避免了递归执行，从而就消除了调用栈过大的问题。

```javascript 
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}

```


# 案例一

```javascript 
function runStack (n) {
  if (n === 0) return 100;
  return runStack.bind(null, n - 2); // 返回自身的一个版本
}
// 蹦床函数，避免递归
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}
trampoline(runStack(1000000))

```


# 案例二

```javascript 
function sum(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1);
  } else {
    return x;
  }
}

sum(1, 100000)
// Uncaught RangeError: Maximum call stack size exceeded(…)
```


上面代码中，sum是一个递归函数，参数x是需要累加的值，参数y控制递归次数。一旦指定`sum`递归 `100000` 次，就会报错，提示超出调用栈的最大次数。 &#x20;
蹦床函数（`trampoline`）可以将递归执行转为循环执行。

```javascript 
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}
```


```javascript 
function sum(x, y) {
  if (y > 0) {
    return sum.bind(null, x + 1, y - 1);
  } else {
    return x;
  }
}
```


上面代码中 **，sum函数的每次执行，都会返回自身的另一个版本。\
现在，使用蹦床函数执行sum，就不会发生调用栈溢出。**

```javascript 
trampoline(sum(1, 100000))
// 100001
```


蹦床**函数并不是真正的尾递归优化，下面的实现才是。**

```javascript 
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}

var sum = tco(function(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1)
  }
  else {
    return x
  }
});

sum(1, 100000)
// 100001
```


上面代码中，tco函数是尾递归优化的实现，**它的奥妙就在于状态变量active。默认情况下，这个变量是不激活的。一旦进入尾递归优化的过程，这个变量就激活了。然后，每一轮递归sum返回的都是undefined，所以就避免了递归执行；而accumulated数组存放每一轮sum执行的参数，总是有值的，这就保证了accumulator函数内部的while循环总是会执行。**

这样就很巧妙地将“递归”改成了“循环”，而后一轮的参数会取代前一轮的参数，保证了调用栈只有一层。
