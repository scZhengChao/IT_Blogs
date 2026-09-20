# mxDictionary

## 目录

- [功能概述](#功能概述)
- [主要方法](#主要方法)
- [使用示例](#使用示例)
- [代码解释](#代码解释)

`mxDictionary`是`mxGraph`库中的一个类 **，用于实现字典（映射）数据结构**。在`mxGraph`这个用于创建交互式图形和流程图的 JavaScript 库中，`mxDictionary`提供**了键值对的存储和操作功能**，类似于 **JavaScript 原生的**\*\*`Map`\*\***对象，但可能针对图形处理场景做了一些优化和适配**。下面从功能、使用方法、示例代码等方面详细介绍。

### 功能概述

`mxDictionary`主要用于存储和管理键值对 **，它允许你通过键来快速查找和访问对应的值。** 在`mxGraph`的图形处理过程中，可能会用它来存储节点、边等元素的相关信息，方便进行快速的查找和更新操作。

### 主要方法

- **`put(key, value)`**：向字典中添加一个键值对。如果键已经存在，则会更新对应的值。
- **`get(key)`**：根据键获取对应的值。如果键不存在，则返回`null`。
- **`remove(key)`**：从字典中移除指定键的键值对。
- **`clear()`**：清空字典中的所有键值对。
- **`getKeys()`**：返回字典中所有键的数组。
- **`getValues()`**：返回字典中所有值的数组。
- **`contains(key)`**：检查字典中是否包含指定的键，返回布尔值。
- **`visit(visitor)`**：遍历字典中的所有键值对，并对每个键值对调用传入的访问者函数。

### 使用示例

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxDictionary Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            // 创建一个 mxDictionary 实例
            const dictionary = new mxDictionary();

            // 添加键值对
            dictionary.put('key1', 'value1');
            dictionary.put('key2', 'value2');

            // 获取值
            const value1 = dictionary.get('key1');
            console.log('Value for key1:', value1);

            // 检查键是否存在
            const hasKey2 = dictionary.contains('key2');
            console.log('Dictionary contains key2:', hasKey2);

            // 移除键值对
            dictionary.remove('key1');
            const valueAfterRemoval = dictionary.get('key1');
            console.log('Value for key1 after removal:', valueAfterRemoval);

            // 获取所有键
            const keys = dictionary.getKeys();
            console.log('All keys:', keys);

            // 获取所有值
            const values = dictionary.getValues();
            console.log('All values:', values);

            // 遍历字典
            dictionary.visit(function (key, value) {
                console.log(`Key: ${key}, Value: ${value}`);
            });

            // 清空字典
            dictionary.clear();
            const keysAfterClear = dictionary.getKeys();
            console.log('All keys after clear:', keysAfterClear);
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxDictionary`\*\***实例**：使用`new mxDictionary()`创建一个新的字典对象。
2. **添加键值对**：使用`put`方法向字典中添加键值对。
3. **获取值**：使用`get`方法根据键获取对应的值。
4. **检查键是否存在**：使用`contains`方法检查字典中是否包含指定的键。
5. **移除键值对**：使用`remove`方法移除指定键的键值对。
6. **获取所有键和值**：分别使用`getKeys`和`getValues`方法获取字典中所有的键和值。
7. **遍历字典**：使用`visit`方法遍历字典中的所有键值对，并对每个键值对执行传入的访问者函数。
8. **清空字典**：使用`clear`方法清空字典中的所有键值对。

通过`mxDictionary`，可以方便地在`mxGraph`中存储和管理图形元素的相关信息，提高数据的查找和操作效率。
