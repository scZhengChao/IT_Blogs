# co 用于 Generator 函数的自动执行.

## 目录

- [co模块简介](#co模块简介)
  - [generator 的特性](#generator-的特性)
  - [怎样解决generator的自执行问题。](#怎样解决generator的自执行问题)
  - [局限性：](#局限性)
- [代码流程图](#代码流程图)
- [源码](#源码)
- [Examples](#Examples)

### co模块简介

[TJ Holowaychuk](https://link.juejin.cn/?target=https://github.com/tj "TJ Holowaychuk")（[ejs](https://link.juejin.cn/?target=https://github.com/tj/ejs "ejs")等数百个开源项目的作者） 于 2013 年 6 月发布的一个小工具[co 模块](https://link.juejin.cn/?target=https://github.com/tj/co "co 模块")，**用于 Generator 函数的自动执行**.

#### generator 的特性

**可以暂停执行和恢复执行**

这个特性一方面使得generator 原生支持[协程](https://link.juejin.cn/?target=https://zh.wikipedia.org/wiki/%E5%8D%8F%E7%A8%8B "协程"),另一方面又会导致两个问题：

1. **不能自动执行generator中的yield**
2. **不能将上个yield的值传入下个next**

#### 怎样解决generator的自执行问题。

在看co源码之前，可以自行写一个丐版的co,解决例子中generator自执行问题。

```typescript 
function simplifiedCo(genFun) {
  const args = Array.prototype.slice.call(arguments, 1);
  const g = genFun(...args);
  let res;
  res = g.next();
  while (!res.done) {
    res = g.next(res.value);
  }
  return res.value;
}

```


#### 局限性：

没有考虑yield后面是generator、promise等情况。

### 代码流程图

![](./assets/image/image_fs1B1nq6SE.png)

**核心思想**：

调用gen.next（onFulfilled()）得到ret,将ret.value转成promise,在then方法中调用gen.next(onFulfilled(ret.value)),直到ret.done为true。

# 源码

```typescript 

/**
 * slice() reference.
 */

var slice = Array.prototype.slice;

/**
 * Expose `co`.
 */

module.exports = co['default'] = co.co = co;

/**
 * Wrap the given generator `fn` into a
 * function that returns a promise.
 * This is a separate function so that
 * every `co()` call doesn't create a new,
 * unnecessary closure.
 *
 * @param {GeneratorFunction} fn
 * @return {Function}
 * @api public
 */

co.wrap = function (fn) {
  createPromise.__generatorFunction__ = fn;
  return createPromise;
  function createPromise() {
    return co.call(this, fn.apply(this, arguments));
  }
};

/**
 * Execute the generator function or a generator
 * and return a promise.
 *
 * @param {Function} fn
 * @return {Promise}
 * @api public
 */

function co(gen) {
  var ctx = this;
  var args = slice.call(arguments, 1);

  // we wrap everything in a promise to avoid promise chaining,
  // which leads to memory leak errors.
  // see https://github.com/tj/co/issues/180
  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function')  gen = gen.apply(ctx, args);
     if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();

    /**
     * @param {Mixed} res
     * @return {Promise}
     * @api private
     */

    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
      return null;
    }

    /**
     * @param {Error} err
     * @return {Promise}
     * @api private
     */

    function onRejected(err) {
      var ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    /**
     * Get the next value in the generator,
     * return a promise.
     *
     * @param {Object} ret
     * @return {Promise}
     * @api private
     */

    function next(ret) {
      if (ret.done) return resolve(ret.value);
       var value = toPromise.call(ctx, ret.value);
       if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));
    }
  });
}

/**
 * Convert a `yield`ed value into a promise.
 *
 * @param {Mixed} obj
 * @return {Promise}
 * @api private
 */

 function toPromise(obj) {
  if (!obj) return obj;
  if (isPromise(obj)) return obj;
  if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
  if ('function' == typeof obj) return thunkToPromise.call(this, obj);
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
  if (isObject(obj)) return objectToPromise.call(this, obj);
  return obj;
}
 
/**
 * Convert a thunk to a promise.
 *
 * @param {Function}
 * @return {Promise}
 * @api private
 */

function thunkToPromise(fn) {
  var ctx = this;
  return new Promise(function (resolve, reject) {
    fn.call(ctx, function (err, res) {
      if (err) return reject(err);
      if (arguments.length > 2) res = slice.call(arguments, 1);
      resolve(res);
    });
  });
}

/**
 * Convert an array of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Array} obj
 * @return {Promise}
 * @api private
 */

function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this));
}

/**
 * Convert an object of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Object} obj
 * @return {Promise}
 * @api private
 */

function objectToPromise(obj){
  var results = new obj.constructor();
  var keys = Object.keys(obj);
  var promises = [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var promise = toPromise.call(this, obj[key]);
    if (promise && isPromise(promise)) defer(promise, key);
    else results[key] = obj[key];
  }
  return Promise.all(promises).then(function () {
    return results;
  });

  function defer(promise, key) {
    // predefine the key in the result
    results[key] = undefined;
    promises.push(promise.then(function (res) {
      results[key] = res;
    }));
  }
}

/**
 * Check if `obj` is a promise.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isPromise(obj) {
  return 'function' == typeof obj.then;
}

/**
 * Check if `obj` is a generator.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isGenerator(obj) {
  return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

/**
 * Check if `obj` is a generator function.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */
 
function isGeneratorFunction(obj) {
  var constructor = obj.constructor;
  if (!constructor) return false;
  if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
  return isGenerator(constructor.prototype);
}

/**
 * Check for plain object.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isObject(val) {
  return Object == val.constructor;
}
```


# Examples

```typescript 
var co = require('co');

co(function *(){
  // yield any promise
  var result = yield Promise.resolve(true);
}).catch(onerror);

co(function *(){
  // resolve multiple promises in parallel
  var a = Promise.resolve(1);
  var b = Promise.resolve(2);
  var c = Promise.resolve(3);
  var res = yield [a, b, c];
  console.log(res);
  // => [1, 2, 3]
}).catch(onerror);

// errors can be try/catched
co(function *(){
  try {
    yield Promise.reject(new Error('boom'));
  } catch (err) {
    console.error(err.message); // "boom"
 }
}).catch(onerror);

function onerror(err) {
  // log any uncaught errors
  // co will not throw any errors you do not handle!!!
  // HANDLE ALL YOUR ERRORS!!!
  console.error(err.stack);
}




co(function* () {
  var res = yield [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
  ];
  console.log(res); // => [1, 2, 3]
}).catch(onerror);

co(function* () {
  var res = yield {
    1: Promise.resolve(1),
    2: Promise.resolve(2),
  };
  console.log(res); // => { 1: 1, 2: 2 }
}).catch(onerror);

co(function* () {
  return yield Promise.resolve(true);
}).then(function (val) {
  console.log(val);
}, function (err) {
  console.error(err.stack);
});

var fn = co.wrap(function* (val) {
  return yield Promise.resolve(val);
});

fn(true).then(function (val) {

});

```


[https://github.com/tj/co](https://github.com/tj/co "https://github.com/tj/co")

[https://juejin.cn/post/7084988705949253639](https://juejin.cn/post/7084988705949253639 "https://juejin.cn/post/7084988705949253639")
