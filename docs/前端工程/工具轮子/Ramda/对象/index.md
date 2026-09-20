# 对象

## 目录

- [assoc](#assoc)
  - [7.1 对象的特征判断](#71-对象的特征判断)
  - [7.2 对象的过滤](#72-对象的过滤)
  - [7.3 对象的截取](#73-对象的截取)
  - [7.4 对象的运算](#74-对象的运算)
  - [7.5 复合对象](#75-复合对象)

# assoc

浅复制对象，然后设置或覆盖对象的指定属性。

注意，该函数也会将 prototype 属性复制到新的对象中。所有 `non-primitive` 属性都通过引用复制。

```javascript 
R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}

```


### 7.1 对象的特征判断

`has`: 返回一个布尔值，表示对象自身是否具有该属性。

```javascript 
var hasName = R.has('name')
hasName({name: 'alice'})   //=> true
hasName({name: 'bob'})     //=> true
hasName({})                //=> false

var point = {x: 0, y: 0};
var pointHas = R.has(R.__, point);
pointHas('x')  // true
pointHas('y')  // true
pointHas('z')  // false

```


`hasIn`：返回一个布尔值，表示对象自身或原型链上是否具有某个属性。

```javascript 
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}
Rectangle.prototype.area = function() {
  return this.width * this.height;
};

var square = new Rectangle(2, 2);
R.hasIn('width')(square)  // true
R.hasIn('area')(square)  // true

```


`propEq`：如果属性等于给定值，返回`true`。

```javascript 
var abby = {name: 'Abby', age: 7, hair: 'blond'};
var fred = {name: 'Fred', age: 12, hair: 'brown'};
var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
var alois = {name: 'Alois', age: 15, disposition: 'surly'};
var kids = [abby, fred, rusty, alois];
var hasBrownHair = R.propEq('hair', 'brown');
R.filter(hasBrownHair)(kids) // [fred, rusty]

```


`whereEq`：如果属性等于给定值，返回`true`。深比较

```javascript 

var pred = R.whereEq({a: 1, b: 2});

pred({a: 1})              // false
pred({a: 1, b: 2})        // true
pred({a: 1, b: 2, c: 3})  // true
pred({a: 1, b: 1})        // false

```


`where`：如果各个属性都符合指定条件，返回`true`。

```javascript 
var pred = R.where({
  a: R.equals('foo'),
  b: R.complement(R.equals('bar')),
  x: R.gt(__, 10),
  y: R.lt(__, 20)
});

pred({a: 'foo', b: 'xxx', x: 11, y: 19}) // true
pred({a: 'xxx', b: 'xxx', x: 11, y: 19}) // false
pred({a: 'foo', b: 'bar', x: 11, y: 19}) // false
pred({a: 'foo', b: 'xxx', x: 10, y: 19}) // false
pred({a: 'foo', b: 'xxx', x: 11, y: 20}) // false

```


### 7.2 对象的过滤

`omit`：过滤指定属性。

```javascript 
R.omit(['a', 'd'])({a: 1, b: 2, c: 3, d: 4})
// {b: 2, c: 3}

```


`filter`：返回所有满足条件的属性

```javascript 
var isEven = n => n % 2 === 0;
R.filter(isEven)({a: 1, b: 2, c: 3, d: 4}) // {b: 2, d: 4}

```


`reject`：返回所有不满足条件的属性

```javascript 

var isOdd = (n) => n % 2 === 1;
R.reject(isOdd)({a: 1, b: 2, c: 3, d: 4})
// {b: 2, d: 4}

```


### 7.3 对象的截取

`dissoc`：过滤指定属性。

```javascript 
R.dissoc('b')({a: 1, b: 2, c: 3})
// {a: 1, c: 3}

```


`assoc`：添加或改写某个属性。

```javascript 
R.assoc('c', 3)({a: 1, b: 2})
// {a: 1, b: 2, c: 3}

```


`partition`：根据属性值是否满足给定条件，将属性分区。

```javascript 

R.partition(R.contains('s'))({ a: 'sss', b: 'ttt', foo: 'bars' })
// [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]

```


`pick`：返回指定属性组成的新对象

```javascript 

R.pick(['a', 'd'])({a: 1, b: 2, c: 3, d: 4})
// {a: 1, d: 4}

R.pick(['a', 'e', 'f'])({a: 1, b: 2, c: 3, d: 4})
// {a: 1}

```


`pickAll`：与`pick`类似，但会包括不存在的属性。

```javascript 

R.pickAll(['a', 'd'])({a: 1, b: 2, c: 3, d: 4})
// {a: 1, d: 4}

R.pickAll(['a', 'e', 'f'])({a: 1, b: 2, c: 3, d: 4})
// {a: 1, e: undefined, f: undefined}

```


`pickBy`：返回符合条件的属性

```javascript 

var isUpperCase = (val, key) => key.toUpperCase() === key;
R.pickBy(isUpperCase)({a: 1, b: 2, A: 3, B: 4})
// {A: 3, B: 4}

```


`keys`：返回对象自身属性的属性名组成的新数组。

```javascript 

R.keys({a: 1, b: 2, c: 3}) // ['a', 'b', 'c']

```


`keysIn`：返回对象自身的和继承的属性的属性名组成的新数组。

```javascript 
var F = function() { this.x = 'X'; };
F.prototype.y = 'Y';
var f = new F();
R.keysIn(f) // ['x', 'y']

```


`values`：返回对象自身的属性的属性值组成的数组。

```javascript 
R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]

```


`valuesIn`：返回对象自身的和继承的属性的属性值组成的数组。

```javascript 

var F = function() { this.x = 'X'; };
F.prototype.y = 'Y';
var f = new F();
R.valuesIn(f) // ['X', 'Y']

```


`invertObj`：将属性值和属性名互换。如果多个属性的属性值相同，只返回最后一个属性。

```javascript 
var raceResultsByFirstName = {
  first: 'alice',
  second: 'jake',
  third: 'alice',
};
R.invertObj(raceResultsByFirstName)
// {"alice": "third", "jake": "second"}

```


`invert`：将属性值和属性名互换，每个属性值对应一个数组。

```javascript 

var raceResultsByFirstName = {
  first: 'alice',
  second: 'jake',
  third: 'alice',
};
R.invert(raceResultsByFirstName)
// { 'alice': ['first', 'third'], 'jake':['second'] }

```


### 7.4 对象的运算

`prop`：返回对象的指定属性

```javascript 

R.prop('x')({x: 100})
// 100

R.prop('x')({})
// undefined

```


`map`：对象的所有属性依次执行某个函数。

```javascript 

var double = x => x * 2;
R.map(double)({x: 1, y: 2, z: 3})
// {x: 2, y: 4, z: 6}

```


`mapObjIndexed`：与`map`类似，但是会额外传入属性名和整个对象。

```javascript 

var values = { x: 1, y: 2, z: 3 };
var prependKeyAndDouble = (num, key, obj) => key + (num * 2);

R.mapObjIndexed(prependKeyAndDouble)(values)
// { x: 'x2', y: 'y4', z: 'z6' }

```


`forEachObjIndexed`：每个属性依次执行给定函数，给定函数的参数分别是属性值和属性名，返回原对象。

```javascript 
var printKeyConcatValue = (value, key) => console.log(key + ':' + value);
R.forEachObjIndexed(printKeyConcatValue)({x: 1, y: 2}) // {x: 1, y: 2}
// logs x:1
// logs y:2

```


`merge`：合并两个对象，如果有同名属性，后面的值会覆盖掉前面的值。

```javascript 

R.merge({ 'name': 'fred', 'age': 10 })({ 'age': 40 })
// { 'name': 'fred', 'age': 40 }

var resetToDefault = R.merge(R.__, {x: 0});
resetToDefault({x: 5, y: 2}) // {x: 0, y: 2}

```


`mergeWith`：合并两个对象，如果有同名属性，会使用指定的函数处理。

```javascript 

R.mergeWith(
  R.concat,
  { a: true, values: [10, 20] },
  { b: true, values: [15, 35] }
);
// { a: true, b: true, values: [10, 20, 15, 35] }

```


`eqProps`：比较两个对象的指定属性是否相等。

```javascript 
var o1 = { a: 1, b: 2, c: 3, d: 4 };
var o2 = { a: 10, b: 20, c: 3, d: 40 };
R.eqProps('a', o1)(o2) // false
R.eqProps('c', o1)(o2) // true

```


`R.evolve`：对象的属性分别经过一组函数的处理，返回一个新对象。

```javascript 
var tomato  = {
  firstName: '  Tomato ',
  data: {elapsed: 100, remaining: 1400},
  id: 123
};
var transformations = {
  firstName: R.trim,
  lastName: R.trim, // 不会被调用
  data: {elapsed: R.add(1), remaining: R.add(-1)}
};
R.evolve(transformations)(tomato)
// {
//   firstName: 'Tomato',
//   data: {elapsed: 101, remaining: 1399},
//   id: 123
// }

```


### 7.5 复合对象

`path`：取出数组中指定路径的值。

```javascript 
R.path(['a', 'b'], {a: {b: 2}}) // 2
R.path(['a', 'b'], {c: {b: 2}}) // undefined
```


`pathEq`：返回指定路径的值符合条件的成员

```javascript 

var user1 = { address: { zipCode: 90210 } };
var user2 = { address: { zipCode: 55555 } };
var user3 = { name: 'Bob' };
var users = [ user1, user2, user3 ];
var isFamous = R.pathEq(['address', 'zipCode'], 90210);
R.filter(isFamous)(users) // [ user1 ]
```


`assocPath`：添加或改写指定路径的属性的值。

```javascript 

R.assocPath(['a', 'b', 'c'], 42)({a: {b: {c: 0}}})
// {a: {b: {c: 42}}}

R.assocPath(['a', 'b', 'c'], 42)({a: 5})
// {a: {b: {c: 42}}}
```
