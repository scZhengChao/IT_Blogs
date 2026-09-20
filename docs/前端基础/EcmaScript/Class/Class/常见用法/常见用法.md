# 常见用法

## 目录

- [只读属性](#只读属性)
  - [get()](#get)
  - [Object.defineProperties](#ObjectdefineProperties)
  - [class](#class)

# 只读属性

## `get()`

```javascript 
/**
 * Represent a used car.
 *
 * @constructor
 */
function Car() {
  var SELF = this,
    odometer = 0;

  /**
   * Increment the odometer
   *
   * @param {Number} miles
   */
  SELF.drive = function(miles) {
    odometer += Math.abs(miles);
  };

  /**
   * Get a protected odometer reading
   *
   * @return {Number}
   */
  SELF.get_odometer = function() {
    return odometer;
  };
}

var subaru = new Car();
subaru.drive(500);
subaru.get_odometer(); // 500

```


## `Object.defineProperties`

```javascript 
/**
 * Represent a used car.
 *
 * @constructor
 */
function Car() {
  var SELF = this,
    _odometer = 0;

  /**
   * Increment the odometer
   *
   * @param {Number} miles
   */
  SELF.drive = function(miles) {
    _odometer += Math.abs(miles);
  };

  /**
   * Get a protected odometer reading
   *
   * @return {Number}
   */
  Object.defineProperties(this, {
    odometer: {
      get: function() {
        return _odometer;
      }
    }
  });
}

var subaru = new Car();
subaru.drive(500);
subaru.odometer; // 500
subaru.odometer = 0; // does nothing
subaru.odometer; // 500

```


## class

```javascript 
/**
 * Represent a used car.
 *
 * @constructor
 */
class Car {
  #odometer = 500;
  get odometer() {
    return this.#odometer;
  }
}

var subaru = new Car();
subaru.odometer; // 500
subaru.odometer = 0; // TypeError: Cannot set property odometer of #<Car> which has only a getter

```


通过分析转换为 ES5 的源码可以看出，其实`get`方法本质还是使用了`Object.defineProperty`，私有变量使用了`WeekMap`进行存储。

```javascript 
// Babel 转换后的代码
"use strict";

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  var descriptor = privateMap.get(receiver);
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}

var Car =
  /*#__PURE__*/
  (function() {
    function Car() {
      _classCallCheck(this, Car);

      _odometer.set(this, {
        writable: true,
        value: 500
      });
    }

    _createClass(Car, [
      {
        key: "odometer",
        get: function get() {
          return _classPrivateFieldGet(this, _odometer);
        }
      }
    ]);

    return Car;
  })();

var _odometer = new WeakMap();

var subaru = new Car();
subaru.odometer; // 500
subaru.odometer = 0; // TypeError: Cannot set property odometer of #<Car> which has only a getter

```
