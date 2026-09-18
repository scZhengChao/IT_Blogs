# 方法

## 目录

- [intersection()](#intersection)
- [union()](#union)
- [difference()](#difference)
- [isSupersetOf()](#isSupersetOf)
- [isDisjointFrom()](#isDisjointFrom)
- [symmetricDifference()](#symmetricDifference)
- [isSubsetOf()](#isSubsetOf)

#### `intersection()`

`intersection` 方法返回一个新集合，其中包含两个集合中都存在的元素。

```javascript 
const setA = new Set([1, 2, 3, 4, 5, 6]);
const setB = new Set([2, 4, 6, 8, 10]);

const intersectionSet = setA.intersection(setB);
// Set {2, 4, 6}
console.log(intersectionSet);
```


#### `union()`

`union` 方法返回一个新集合，其中包含两个集合的所有元素，不会有重复项。

```javascript 
const setA = new Set([1, 2, 3, 4, 5, 6]);
const setB = new Set([2, 4, 6, 8, 10]);

const unionSet = setA.union(setB);
// Set {1, 2, 3, 4, 5, 6, 8, 10}
console.log(unionSet);

```


#### `difference()`

`difference` 方法返回一个新集合，其中包含第一个集合中存在但第二个集合中不存在的元素。

```javascript 
const setA = new Set([1, 2, 3, 4, 5, 6]);
const setB = new Set([2, 4, 6, 8, 10]);

const differenceSet = setA.difference(setB);
// Set {1, 3, 5}
console.log(differenceSet);

```


#### `isSupersetOf()`

`isSupersetOf` 方法返回一个布尔值，表明第一个集合是否是第二个集合的超集。

```javascript 
const setA = new Set([1, 2, 3, 4, 5, 6]);
const setB = new Set([2, 4, 6]);

const isSuperset = setA.isSupersetOf(setB);
// true
console.log(isSuperset);

```


#### `isDisjointFrom()`

`isDisjointFrom` 方法返回一个布尔值，表明两个集合是否不相交（即，没有共同元素）。

```javascript 
const setA = new Set([1, 2, 3, 4, 5, 6]);
const setB = new Set([7, 8, 9, 10]);

const isDisjoint = setA.isDisjointFrom(setB);
// true
console.log(isDisjoint);

```


#### `symmetricDifference()`

`symmetricDifference` 方法返回一个新集合，其中包含在任一集合中出现，但不在两个集合中都存在的元素。

```javascript 
const setA = new Set([1, 2, 3, 4, 5, 6]);
const setB = new Set([2, 4, 6, 8, 10]);

const symmetricDifferenceSet = setA.symmetricDifference(setB);
// Set {1, 3, 5, 8, 10}
console.log(symmetricDifferenceSet);

```


#### `isSubsetOf()`

`isSubsetOf` 方法返回一个布尔值，指示第一个集合是否是第二个集合的子集。

```javascript 
const setA = new Set([2, 4, 6]);
const setB = new Set([1, 2, 3, 4, 5, 6, 8, 10]);

const isSubset = setA.isSubsetOf(setB);
// true
console.log(isSubset);

```
