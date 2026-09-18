# 函数类

## 目录

- [函数节流器](#函数节流器)
- [删除Boolean 为 false 值](#删除Boolean-为-false-值)
- [记忆函数：缓存函数的运算结果](#记忆函数缓存函数的运算结果)
  - [只执行一次](#只执行一次)
  - [原生系统函数](#原生系统函数)

# 函数节流器

```javascript 
export const debouncer = (fn, time, interval = 200) => {
  if (time - (window.debounceTimestamp || 0) > interval) {
    fn && fn();
    window.debounceTimestamp = time;
  }
}
```


# 删除Boolean 为 false 值

```javascript 
const clean = dirty.filter(Boolean);
const clean = [0, false, true, undefined, null, '', 12, 15].filter(Boolean);
// [true, 12, 15]
//这将删除值等于：null，undefined，false，0 和空字符串('')。
```


# 记忆函数：缓存函数的运算结果

```javascript 
function cached(fn) {
  let cache =Object.create(null);
  return function cachedFn(str) {
    let hit = cache[str];
    return hit || (cache[str] = fn(str))
  }
}
```


## 只执行一次

```javascript 
function once(fn) {  
        let called = false
            return function () {    
                if (!called) {
                called = true
                fn.apply(this, arguments)
            }
        }
    }
```


## 原生系统函数

```javascript 
function isNative(Ctor) {  
        return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
    }
```
