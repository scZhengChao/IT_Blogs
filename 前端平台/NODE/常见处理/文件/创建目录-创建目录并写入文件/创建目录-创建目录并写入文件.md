# 创建目录/创建目录并写入文件

## 目录

- [创建目录/创建目录并写入文件](#创建目录创建目录并写入文件)
  - [fsPromises.mkdir(path\[, options\])#](#fsPromisesmkdirpath-options)

# 创建目录/创建目录并写入文件

#### `fsPromises.mkdir(path[, options])`[#](https://nodejs.cn/api/fs.html#fspromisesmkdirpath-options "#")

新增于: v10.0.0

- `path` [\<string>](https://web.nodejs.cn/en-US/docs/Web/JavaScript/Data_structures#String_type "<string>") | [\<Buffer>](https://nodejs.cn/api/buffer.html#class-buffer "<Buffer>") | [\<URL>](https://nodejs.cn/api/url.html#the-whatwg-url-api "<URL>")
- `options` [\<Object>](https://web.nodejs.cn/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object "<Object>") | [\<integer>](https://web.nodejs.cn/en-US/docs/Web/JavaScript/Data_structures#Number_type "<integer>")
  - `recursive` [\<boolean>](https://web.nodejs.cn/en-US/docs/Web/JavaScript/Data_structures#Boolean_type "<boolean>") 默认值：`false`
  - `mode` [\<string>](https://web.nodejs.cn/en-US/docs/Web/JavaScript/Data_structures#String_type "<string>") | [\<integer>](https://web.nodejs.cn/en-US/docs/Web/JavaScript/Data_structures#Number_type "<integer>") Windows 上不支持。默认值：`0o777`。

**异步地创建目录。**

可选的 `options` 参数可以是指定 `mode`（权限和粘性位）的整数，也可以是具有 `mode` 属性和 `recursive` 属性（指示是否应创建父目录）的对象。当 `path` 是已存在的目录时，调用 `fsPromises.mkdir()` 仅在 `recursive` 为 false 时才导致拒绝。

```javascript 
const { mkdir } = require('node:fs/promises');
const { join } = require('node:path');

async function makeDirectory() {
  const projectFolder = join(__dirname, 'test', 'project');
  const dirCreation = await mkdir(projectFolder, { recursive: true });

  console.log(dirCreation);
  return dirCreation;
}

makeDirectory().catch(console.error);
```


```javascript 
创建目录并写入文件；（有目录就不会在创建目录） 
function exportResultToJSON(exportPath, unusedExports) {
    const data = {
        unusedExports,
    };
    fs.mkdir(getDirName(exportPath), { recursive: true }, err => {
        if (err) throw err;
        fs.writeFile(exportPath, JSON.stringify(data, null, 2), err => {
            if (err) throw err;
            console.info(path.resolve(exportPath) + " is generated.");
        });
    });
}
```
