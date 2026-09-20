# 删除文件

## 目录

- [异步](#异步)
- [同步](#同步)

# 异步

```javascript 
const fs = require('fs');

// 定义要删除的文件路径
const filePath = 'path/to/your/file.txt';

// 使用 fs.unlink 方法删除文件
fs.unlink(filePath, (err) => {
    if (err) {
        console.error('删除文件时出错:', err);
    } else {
        console.log('文件删除成功');
    }
});
```


**代码解释**：

- 首先，我们使用 `require('fs')` 导入 Node.js 的文件系统模块 `fs`。
- 然后，定义了一个变量 `filePath`，它存储着要删除的文件的路径，你需要将 `'path/to/your/file.txt'` 替换为你实际要删除文件的路径。
- 最后，使用 `fs.unlink` 方法删除文件。该方法接收两个参数，第一个是文件的路径，第二个是一个回调函数。在回调函数中，如果 `err` 不为 `null`，表示删除文件时出现了错误，会将错误信息输出到控制台；如果 `err` 为 `null`，表示文件删除成功，会输出成功信息。

请注意，删除文件是一个不可逆的操作，请确保你确实想要删除该文件，并谨慎操作。如果你想删除一个目录，可以使用 `fs.rmdir` 方法，但需要确保目录是空的。**如果要递归删除目录及其内容**，可以使用 `fs.rm` 方法，它在 Node.js 14.14.0 及以上版本可用，示例如下：

```typescript 
const fs = require('fs');

// 定义要删除的目录路径
const dirPath = 'path/to/your/directory';

// 使用 fs.rm 方法删除目录及其内容
fs.rm(dirPath, { recursive: true, force: true }, (err) => {
    if (err) {
        console.error('删除目录时出错:', err);
    } else {
        console.log('目录删除成功');
    }
});
```


**代码解释**：

- 同样，先导入 `fs` 模块。
- 定义 `dirPath` 作为要删除目录的路径，你需要将 `'path/to/your/directory'` 替换为实际的目录路径。
- 使用 `fs.rm` 方法删除目录，它接收三个参数：要删除的目录路径、一个选项对象（`{ recursive: true, force: true }` 表示递归删除和强制删除）和一个回调函数。在回调函数中，处理删除目录时的错误或成功信息。

# 同步

如果你需要在同步模式下删除文件或目录，可以使用 `fs.unlinkSync` 或 `fs.rmdirSync` 方法，例如：

```javascript 
const fs = require('fs');

// 定义要删除的文件路径
const filePath = 'path/to/your/file.txt';

try {
    // 使用 fs.unlinkSync 同步删除文件
    fs.unlinkSync(filePath);
    console.log('文件删除成功');
} catch (err) {
    console.error('删除文件时出错:', err);
}
```


**代码解释**：

- 导入 `fs` 模块。
- 定义文件路径。
- 使用 `fs.unlinkSync` 方法删除文件。因为是同步操作，如果删除失败会抛出错误，所以我们将其放在 `try...catch` 块中处理可能出现的异常。如果删除成功，会输出成功信息；如果删除失败，会将错误信息输出到控制台。

对于目录的同步删除，使用 `fs.rmdirSync` 方法，示例如下：

```javascript 
const fs = require('fs');

// 定义要删除的目录路径
const dirPath = 'path/to/your/directory';

try {
    // 使用 fs.rmdirSync 同步删除目录
    fs.rmdirSync(dirPath);
    console.log('目录删除成功');
} catch (err) {
    console.error('删除目录时出错:', err);
}
```


**代码解释**：

- 操作步骤与文件的同步删除类似，使用 `fs.rmdirSync` 方法删除目录，将其放在 `try...catch` 块中处理异常。
