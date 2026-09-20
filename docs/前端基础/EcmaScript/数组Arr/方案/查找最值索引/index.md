# 查找最值索引

## 目录

- [查找最大值索引](#查找最大值索引)
- [查找最小值索引](#查找最小值索引)
- [找到最接近的数值](#找到最接近的数值)

### 查找最大值索引

但你需要找到一个数组中的最大值的索引

```typescript 
const indexOfMax = (arr) => arr.reduce((prev, curr, i, a) => (curr > a[prev] ? i : prev), 0);
indexOfMax([1, 3, 9, 7, 5]); // 2

```


### 查找最小值索引

当你需要找到一个数组中的最小值的索引

```typescript 
const indexOfMin = (arr) => arr.reduce((prev, curr, i, a) => (curr < a[prev] ? i : prev), 0)
indexOfMin([2, 5, 3, 4, 1, 0, 9]) // 5

```


### 找到最接近的数值

当你需要在一个数组中找到一个最接近的值

```typescript 
const closest = (arr, n) => arr.reduce((prev, curr) => (Math.abs(curr - n) < Math.abs(prev - n) ? curr : prev))
closest([29, 87, 8, 78, 97, 20, 75, 33, 24, 17], 50) // 33

```
