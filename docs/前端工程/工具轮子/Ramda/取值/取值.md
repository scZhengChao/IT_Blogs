# 取值

## 目录

- [uniq](#uniq)

## [uniq](https://ramdajs.com/docs/#uniq "uniq")

Returns a new list containing only one copy of each element in the original list.[R.equals](https://ramdajs.com/docs/#equals "R.equals")is used to determine equality.

```javascript 
R.uniq([1, 1, 2, 1]); //=> [1, 2]
R.uniq([1, '1']);     //=> [1, '1']
R.uniq([[42], [42]]); //=> [[42]]

```
