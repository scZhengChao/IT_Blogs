# 案例

## 目录

- [pako.inflateRaw](#pakoinflateRaw)
  - [基本使用方法](#基本使用方法)
  - [函数参数](#函数参数)
  - [返回值](#返回值)
  - [示例代码](#示例代码)
  - [代码解释](#代码解释)
  - [注意事项](#注意事项)

# pako.inflateRaw

`pako.inflateRaw`是`pako`库中的一个函数，`pako`是一个用 JavaScript 实现的快速、轻量级的 Zlib 压缩库，`inflateRaw`方法**用于对采用原始 DEFLATE 算法压缩的数据进行解压缩操作**。下面从使用方法、参数、返回值、示例代码等方面进行详细介绍。

### 基本使用方法

`pako.inflateRaw`用于解压缩使用原始 DEFLATE 算法压缩的数据，原始 DEFLATE 算法与标准的 Zlib 格式不同，它不包含 Zlib 头部和尾部的校验信息。

### 函数参数

`pako.inflateRaw`接受两个参数：

- **`data`**：这是一个必需的参数，可以是`Uint8Array`类型的二进制数据，也可以是`Array`类型的数据，代表经过原始 DEFLATE 算法压缩的数据。
- **`options`**：这是一个可选参数，是一个对象，用于指定解压缩的一些配置选项。常见的选项如下：
  - **`to`**：指定返回结果的类型，可以取值为`'string'`，表示将解压缩后的二进制数据转换为字符串；如果不指定该选项，默认返回`Uint8Array`类型的二进制数据。

### 返回值

返回解压缩后的数据，返回的数据类型取决于`options.to`参数：

- 如果`options.to`为`'string'`，则返回解压缩后的字符串。
- 如果未指定`options.to`，则返回`Uint8Array`类型的二进制数据。

### 示例代码

下面是一个使用`pako.inflateRaw`进行解压缩的示例：

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>pako.inflateRaw Example</title>
    <!-- 引入 pako 库 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pako/2.0.4/pako.min.js"></script>
</head>

<body>
    <script>
        // 模拟一个经过原始 DEFLATE 压缩的数据
        const compressedData = new Uint8Array([120, 156, 202, 72, 205, 201, 201, 215, 81, 40, 207, 47, 202, 73, 225, 2, 4, 0, 0, 255, 255, 33, 231, 4, 147]);

        try {
            // 进行解压缩
            const decompressedData = pako.inflateRaw(compressedData, { to: 'string' });
            console.log('解压缩后的数据:', decompressedData);
        } catch (error) {
            console.error('解压缩出错:', error);
        }
    </script>
</body>

</html>
```


### 代码解释

1. **引入库**：通过`<script>`标签引入`pako`库。
2. **模拟压缩数据**：创建一个`Uint8Array`类型的`compressedData`变量，模拟经过原始 DEFLATE 压缩的数据。
3. **解压缩操作**：调用`pako.inflateRaw`方法对`compressedData`进行解压缩，并将`options.to`设置为`'string'`，将解压缩后的结果转换为字符串。
4. **错误处理**：使用`try...catch`语句捕获解压缩过程中可能出现的错误，并在控制台输出错误信息。

### 注意事项

- **数据格式**：输入的`data`必须是使用原始 DEFLATE 算法压缩的数据，否则可能会导致解压缩失败。
- **异常处理**：在实际应用中，建议始终使用`try...catch`语句来捕获可能出现的异常，以确保程序的健壮性。
