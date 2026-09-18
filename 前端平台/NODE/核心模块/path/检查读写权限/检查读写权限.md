# 检查读写权限

```javascript 
const fs = require('fs');

const filePath = '/path/to/your/file.txt';

fs.access(filePath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
    if (!err) {
        console.log('The file is accessible for reading and writing.');
    } else {
        console.log('The file is not accessible for reading and writing.');
    }
});
```


**代码解释**：

- `fs.constants.R_OK | fs.constants.W_OK` 表示检查文件是否可读和可写。
- 当文件可读可写时，`err` 将为 `null`，否则 `err` 将包含错误信息。

根据你的具体需求和应用场景，选择合适的方法。如果你在文件检查时还需要考虑权限或其他因素，可以结合不同的 `fs.constants` 标志进行更详细的检查。
