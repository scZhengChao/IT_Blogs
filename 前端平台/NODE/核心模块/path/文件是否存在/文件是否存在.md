# 文件是否存在

## 目录

- [方法一：使用 fs.existsSync（同步方法）](#方法一使用-fsexistsSync同步方法)
- [方法二：使用 fs.promises.access（异步方法）](#方法二使用-fspromisesaccess异步方法)

在 Node.js 中，你可以使用 `fs` 模块来检查文件是否存在。以下是几种不同的方法：

# **方法一：使用 ****`fs.existsSync`****（同步方法）**

`fs.existsSync` 是一个同步方法，它会立即返回文件是否存在的结果。

```javascript 
const fs = require('fs');

const filePath = '/path/to/your/file.txt';

if (fs.existsSync(filePath)) {
    console.log('The file exists.');
} else {
    console.log('The file does not exist.');
}
```


**代码解释**：

- `const fs = require('fs');`：导入 Node.js 的 `fs` 模块。
- `const filePath = '/path/to/your/file.txt';`：定义要检查的文件路径。
- `fs.existsSync(filePath)`：检查文件是否存在。如果文件存在，该方法返回 `true`，否则返回 `false`。

# **方法二：使用 ****`fs.promises.access`****（异步方法）**

`fs.promises.access` 是一个异步方法，它使用 Promise 来处理文件的访问权限检查，包括文件是否存在。

```javascript 
const fs = require('fs').promises;

const filePath = '/path/to/your/file.txt';

fs.promises.access(filePath, fs.constants.F_OK)
.then(() => {
        console.log('The file exists.');
    })
.catch(() => {
        console.log('The file does not exist.');
    });
```


**代码解释**：

- `const fs = require('fs').promises;`：导入 `fs` 模块的 `promises` 对象，以便使用异步的文件操作方法。
- `fs.promises.access(filePath, fs.constants.F_OK)`：使用 `fs.constants.F_OK` 标志检查文件是否存在。
  - `fs.constants.F_OK` 表示检查文件是否存在。
  - 若文件存在，`Promise` 将被解析，调用 `.then()` 中的回调函数。
  - 若文件不存在，`Promise` 将被拒绝，调用 `.catch()` 中的回调函数。

**方法三：使用 ****`fs.access`****（回调函数方式）**

`fs.access` 使用回调函数来处理文件的访问权限检查，包括文件是否存在。

```javascript 
const fs = require('fs');

const filePath = '/path/to/your/file.txt';

fs.access(filePath, fs.constants.F_OK, (err) => {
    if (!err) {
        console.log('The file exists.');
    } else {
        console.log('The file does not exist.');
    }
});
```


**代码解释**：

- `fs.access(filePath, fs.constants.F_OK, (err) => {...})`：使用 `fs.constants.F_OK` 检查文件是否存在。
  - 如果文件存在，`err` 将为 `null`，因此 `!err` 为 `true`。
  - 如果文件不存在，`err` 将包含错误信息。

**注意事项**：

- `fs.existsSync` 是同步方法，会阻塞 Node.js 事件循环，一般不推荐在高并发环境下使用。
- `fs.promises.access` 和 `fs.access` 是更好的选择，它们可以异步处理文件检查，不会阻塞事件循环。
- 这些方法仅检查文件是否存在，不检查文件的读写权限。如果你需要检查文件的读写权限，可以使用 `fs.constants.R_OK`（读权限）和 `fs.constants.W_OK`（写权限）。
