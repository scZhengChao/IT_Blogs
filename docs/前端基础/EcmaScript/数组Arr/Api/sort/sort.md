# sort

## 目录

- [默认排序行为](#默认排序行为)
- [比较函数](#比较函数)
- [实现原理](#实现原理)
- [手写实现](#手写实现)
- [注意事项](#注意事项)
- [实际引擎优化](#实际引擎优化)
- [总结](#总结)

> **多条件排序**

[按身高和体重排队（多条件排序）](按身高和体重排队（多条件排序）.md "按身高和体重排队（多条件排序）")

## 默认排序行为

1. **默认将元素转换为字符串**：`sort()`默认将**数组元素转换为字符串，**然后按照 `UTF-16` 代码**单元值序列进行排序**
2. **原地排序**：**会修改原数组，而不是返回一个新数组**
3. **不稳定排序**：在 ES2019 之前，JavaScript 不保证排序的稳定性（相同元素可能改变相对顺序）

## 比较函数

要正确排序数字或其他复杂类型，需要提供比较函数：

```javascript 
const numbers = [40, 1, 5, 200];
numbers.sort((a, b) => a - b); // [1, 5, 40, 200]
```


比较函数的规则：

- 返回负数：`a`排在`b`前面
- 返回正数：`b`排在`a`前面
- 返回 0：保持相对顺序（ES2019+ 保证稳定性）

## 实现原理

JavaScript 引擎通常使用高效的排序算法实现`sort()`，但规范并不强制要求具体算法。现代引擎通常：

1. 对于小数组（长度 <10）：使用插入排序
2. 对于中等数组：使用快速排序
3. 对于大数组：使用归并排序或 TimSort（混合排序算法）

## 手写实现

下面是一个简化版的`sort()`实现，使用快速排序算法：

```javascript 
Array.prototype.mySort = function(compareFn) {
  // 默认比较函数（字符串比较）
  const defaultCompare = (a, b) => {
    if (a === b) return 0;
    const aStr = String(a);
    const bStr = String(b);
    return aStr < bStr ? -1 : 1;
  };
  
  const comparator = compareFn || defaultCompare;
  const arr = this.slice(); // 创建副本以避免修改原数组（与原生不同）
  
  // 快速排序实现
  function quickSort(array, left, right) {
    if (left >= right) return;
    
    const pivot = array[Math.floor((left + right) / 2)];
    let i = left;
    let j = right;
    
    while (i <= j) {
      while (comparator(array[i], pivot) < 0) i++;
      while (comparator(array[j], pivot) > 0) j--;
      
      if (i <= j) {
        [array[i], array[j]] = [array[j], array[i]];
        i++;
        j--;
      }
    }
    
    quickSort(array, left, j);
    quickSort(array, i, right);
  }
  
  quickSort(arr, 0, arr.length - 1);
  return arr;
};

// 使用示例
const nums = [3, 1, 4, 1, 5, 9, 2, 6];
console.log(nums.mySort((a, b) => a - b)); // [1, 1, 2, 3, 4, 5, 6, 9]
```


## 注意事项

1. **原地排序**：原生`sort()`修改原数组，而上面的实现返回新数组
2. **稳定性**：ES2019+ 要求`sort()`是稳定的，上面的实现也是稳定的
3. **性能**：实际引擎实现更复杂，会根据数组大小和类型选择最优算法
4. **稀疏数组**：处理稀疏数组时行为可能不同
5. **非数组对象**：可以用于任何类数组对象（如`arguments`）

## 实际引擎优化

现代 JavaScript 引擎（如 V8）对`sort()`做了大量优化：

1. **类型特化**：对数字数组和对象数组使用不同优化路径
2. **预处理**：检测数组是否已部分排序
3. **混合算法**：结合多种排序算法优势
4. **内联缓存**：优化比较函数调用

## 总结

`Array.prototype.sort()`是一个看似简单但实现复杂的方法。理解其默认行为和比较函数的工作原理对于正确使用至关重要。在实际项目中，对于大型数组排序，可能需要考虑使用 Web Workers 或分治策略来提高性能。

[多条件排序](多条件排序.md "多条件排序")
