# classnames

## 目录

- [index.js](#indexjs)
- [bind.js](#bindjs)
- [用法](#用法)

# index.js

```typescript 
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
  'use strict';

  var hasOwn = {}.hasOwnProperty;

  function classNames() {
    var classes = [];
    //遍历传参
    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      //过滤null、undefined、false、0等非法字符
      if (!arg) continue;

      var argType = typeof arg;
      //是string或者number类型
      if (argType === 'string' || argType === 'number') {
        classes.push(arg);
      } else if (Array.isArray(arg)) {
        if (arg.length) {
        //递归遍历数组的内容
          var inner = classNames.apply(null, arg);
          if (inner) {
            classes.push(inner);
          }
        }
      } else if (argType === 'object') {
        // 这一步是在 排查原生对象 
        if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
          classes.push(arg.toString());
          continue;
        }

        for (var key in arg) {
          // 获取 值为真的  key
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
    return classes.join(' ');
  }

  if (typeof module !== 'undefined' && module.exports) {
    classNames.default = classNames;
    module.exports = classNames;
  } else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    // register as 'classnames', consistent with npm package name
    define('classnames', [], function () {
      return classNames;
    });
  } else {
    window.classNames = classNames;
  }
}())

```


# bind.js

\*\*就多加了this \*\*

```typescript 
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
  'use strict';

  var hasOwn = {}.hasOwnProperty;

  function classNames () {
    var classes = [];

    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;

      var argType = typeof arg;

      if (argType === 'string' || argType === 'number') {
        classes.push(this && this[arg] || arg);
      } else if (Array.isArray(arg)) {
        classes.push(classNames.apply(this, arg));
      } else if (argType === 'object') {
        if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
          classes.push(arg.toString());
          continue;
        }

        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(this && this[key] || key);
          }
        }
      }
    }

    return classes.join(' ');
  }

  if (typeof module !== 'undefined' && module.exports) {
    classNames.default = classNames;
    module.exports = classNames;
  } else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    // register as 'classnames', consistent with npm package name
    define('classnames', [], function () {
      return classNames;
    });
  } else {
    window.classNames = classNames;
  }
}());


```


# 用法

**这下你理解bind 了吗？其实超简单**

```typescript 
import styles from './index.less'
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);
<div className={cx('topic-pub-container')}>
    <div className={cx('topic-pub-header')}>



console.log(styles)
{
  btnMixins: "btnMixins___2XBWF"
  displayRequired: "displayRequired___3dZUA"
  divider-line: "divider-line___3bHZt"
  dividerLine: "divider-line___3bHZt"
  formMixins: "formMixins___Z_KDf"
  link-btn: "link-btn___e1Yxh"
  linkBtn: "link-btn___e1Yxh"
  operation-btn: "operation-btn___1S-dw"
  operationBtn: "operation-btn___1S-dw"
  topic-pub-container: "topic-pub-container___28zBb"
  topic-pub-header: "topic-pub-header___2gBto"
  topic-pub-list: "topic-pub-list___5YlIL"
  topicPubContainer: "topic-pub-container___28zBb"
  topicPubHeader: "topic-pub-header___2gBto"
  topicPubList: "topic-pub-list___5YlIL"
}
```


```typescript 
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'

// lots of arguments of various types
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

// other falsy values are just ignored
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'

var arr = ['b', { c: true, d: false }];
classNames('a', arr); // => 'a b c'

let buttonType = 'primary';
classNames({ [`btn-${buttonType}`]: true });

```
