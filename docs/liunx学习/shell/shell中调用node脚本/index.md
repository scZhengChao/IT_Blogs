# shell中调用node脚本

## 目录

- [1. 直接调用 Node.js 执行脚本](#1-直接调用-Nodejs-执行脚本)
  - [示例 Node.js 脚本（example.js）](#示例-Nodejs-脚本examplejs)
  - [示例 Shell 脚本（run\_node\_script.sh）](#示例-Shell-脚本run_node_scriptsh)
  - [运行 Shell 脚本](#运行-Shell-脚本)
- [2. 传递参数给 Node.js 脚本](#2-传递参数给-Nodejs-脚本)
  - [示例 Node.js 脚本（args\_example.js）](#示例-Nodejs-脚本args_examplejs)
  - [示例 Shell 脚本（run\_with\_args.sh）](#示例-Shell-脚本run_with_argssh)
  - [运行 Shell 脚本](#运行-Shell-脚本)
- [3. 处理 Node.js 脚本的返回值](#3-处理-Nodejs-脚本的返回值)
  - [示例 Node.js 脚本（exit\_code\_example.js）](#示例-Nodejs-脚本exit_code_examplejs)
  - [示例 Shell 脚本（handle\_exit\_code.sh）](#示例-Shell-脚本handle_exit_codesh)
  - [运行 Shell 脚本](#运行-Shell-脚本)

在 `Shell` 脚本中调用 `Node.js` 脚本是一种常见的需求，它可以让你在自动化任务、部署流程等场景中结合使用 `Shell` 的系统操作能力和 `Node.js` 的强大编程功能。以下是几种在 `Shell` 中调用 `Node.js` 脚本的方法：

### 1. 直接调用 Node.js 执行脚本

如果你的系统中已经正确安装了 `Node.js`，并且 `Node.js` 的可执行文件（通常是`node`或`nodejs`）在系统的`PATH`环境变量中，那么你可以直接在 `Shell` 脚本中使用`node`命令来执行 Node.js 脚本。

#### 示例 Node.js 脚本（`example.js`）

```javascript 
// example.js
console.log('Hello from Node.js!');
```


#### 示例 Shell 脚本（`run_node_script.sh`）

```bash 
#!/bin/bash

# 调用Node.js执行脚本
node example.js
```


#### 运行 Shell 脚本

首先，给 Shell 脚本添加执行权限：

```bash 
chmod +x run_node_script.sh
```


然后运行脚本：

```bash 
./run_node_script.sh
```


### 2. 传递参数给 Node.js 脚本

你可以在 Shell 脚本中向 Node.js 脚本传递参数，Node.js 脚本可以通过`process.argv`数组来接收这些参数。

#### 示例 Node.js 脚本（`args_example.js`）

```javascript 
// args_example.js
// 第一个参数是Node.js可执行文件的路径，第二个参数是当前脚本的路径
// 从第三个参数开始才是我们传递的参数
const args = process.argv.slice(2);
console.log('Received arguments:', args);
```


#### 示例 Shell 脚本（`run_with_args.sh`）

```bash 
#!/bin/bash

# 调用Node.js执行脚本并传递参数
node args_example.js "param1" "param2"
```


#### 运行 Shell 脚本

```bash 
chmod +x run_with_args.sh
./run_with_args.sh
```


### 3. 处理 Node.js 脚本的返回值

Node.js 脚本的退出状态码可以在 Shell 脚本中被捕获和处理。在 Node.js 脚本中，你可以使用`process.exit(code)`来指定退出状态码。

#### 示例 Node.js 脚本（`exit_code_example.js`）

```javascript 
// exit_code_example.js
const success = true;
if (success) {
    process.exit(0); // 成功退出，状态码为0
} else {
    process.exit(1); // 失败退出，状态码为1
}
```


#### 示例 Shell 脚本（`handle_exit_code.sh`）

```bash 
#!/bin/bash

# 调用Node.js执行脚本并捕获退出状态码
node exit_code_example.js
exit_status=$?

if [ $exit_status -eq 0 ]; then
    echo "Node.js script executed successfully."
else
    echo "Node.js script failed with exit code $exit_status."
fi
```


#### 运行 Shell 脚本

```bash 
chmod +x handle_exit_code.sh
./handle_exit_code.sh
```
