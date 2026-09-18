# 如何判断脚本是运行在 类 Unix 的 Shell 环境 还是powershell

## 目录

- [方法一：使用 process.env.SHELL](#方法一使用-processenvSHELL)
- [方法二：使用 process.env.PSModulePath](#方法二使用-processenvPSModulePath)
- [方法三：结合多种环境变量和平台信息](#方法三结合多种环境变量和平台信息)
- [方法四：使用 child\_process 执行命令并检查输出](#方法四使用-child_process-执行命令并检查输出)

# \*\*方法一：使用 \*\***`process.env.SHELL`**

在类 Unix 系统（如 Linux 和 macOS）中，通常会设置 `SHELL` 环境变量，而在 Windows 的 PowerShell 中，`SHELL` 环境变量通常不会被设置。

```javascript 
const os = require('os');

if (os.platform() === 'win32') {
    if (process.env.SHELL) {
        console.log('This script might be running in a Unix-like environment on Windows, such as Git Bash.');
    } else {
        console.log('This script is likely running in PowerShell or Command Prompt.');
    }
} else if (os.platform() === 'linux' || os.platform() === 'darwin') {
    console.log('This script is running in a Unix-like environment.');
} else {
    console.log('This script is running in an unknown environment.');
}
```


**代码解释**：

- `os.platform()` 返回当前运行 Node.js 的操作系统平台，`win32` 表示 Windows，`linux` 表示 Linux，`darwin` 表示 macOS。
- `process.env.SHELL` 是环境变量，**如果在类 Unix 环境中，该变量通常会被设置**。在 Windows 上，如果 `SHELL` 存在，可能是在 Git Bash 或其他类 Unix 环境中运行；如果不存在，可能是在 PowerShell 或命令提示符中运行。

# \*\*方法二：使用 \*\***`process.env.PSModulePath`**

PowerShell 会设置 `PSModulePath` 环境变量，而类 Unix 系统通常不会。

```javascript 
const os = require('os');

if (os.platform() === 'win32') {
    if (process.env.PSModulePath) {
        console.log('This script is likely running in PowerShell.');
    } else {
        console.log('This script might be running in Command Prompt or a Unix-like environment on Windows.');
    }
} else if (os.platform() === 'linux' || os.platform() === 'darwin') {
    console.log('This script is running in a Unix-like environment.');
} else {
    console.log('This script is running in an unknown environment.');
}
```


# **方法三：结合多种环境变量和平台信息**

Combining multiple checks can give a more accurate picture.

```javascript 
const os = require('os');
const isWin = os.platform() === 'win32';
const hasShell = process.env.SHELL;
const hasPSModulePath = process.env.PSModulePath;

if (isWin) {
    if (hasPSModulePath) {
        console.log('This script is running in PowerShell.');
    } else if (hasShell) {
        console.log('This script is running in a Unix-like environment on Windows, such as Git Bash.');
    } else {
        console.log('This script is running in Command Prompt.');
    }
} else if (os.platform() === 'linux' || os.platform() === 'darwin') {
    console.log('This script is running in a Unix-like environment.');
} else {
    console.log('This script is running in an unknown environment.');
}
```


# **方法四：使用 ****`child_process`**** 执行命令并检查输出**

You can try running a command and check its output.

```javascript 
const { exec } = require('child_process');
const os = require('os');

function checkEnvironment() {
    if (os.platform() === 'win32') {
        // Check for PowerShell
        exec('(Get-Host).Version', (err, stdout, stderr) => {
            if (!err && stdout) {
                console.log('This script is running in PowerShell.');
            } else {
                console.log('This script is likely running in Command Prompt or a Unix-like environment on Windows.');
            }
        });
    } else if (os.platform() === 'linux' || os.platform() === 'darwin') {
        console.log('This script is running in a Unix-like environment.');
    } else {
        console.log('This script is running in an unknown environment.');
    }
}

checkEnvironment();
```


**代码解释**：

- `exec('(Get-Host).Version', (err, stdout, stderr) => {...})` 尝试在 Windows 上执行一个 PowerShell 命令 `(Get-Host).Version`。
  - 如果没有错误且有输出，很可能是在 PowerShell 中运行。

**注意事项**：

- These methods are not foolproof and may not work in all scenarios, especially if the environment is highly customized.
- For more reliable checks, consider using libraries like `is-windows` or `is-unix` which provide more comprehensive checks.

```javascript 
const isWindows = require('is-windows');
const isUnix = require('is-unix');

if (isWindows()) {
    console.log('This script is running on Windows.');
    if (isWindows.shell()) {
        console.log('This script might be running in a Unix-like shell on Windows.');
    } else if (isWindows.powershell()) {
        console.log('This script is running in PowerShell.');
    } else {
        console.log('This script is running in Command Prompt.');
    }
} else if (isUnix()) {
    console.log('This script is running in a Unix-like environment.');
} else {
    console.log('This script is running in an unknown environment.');
}
```


**代码解释**：

- `is-windows` 和 `is-unix` 是第三方库，可以更准确地判断是否是 Windows 或类 Unix 系统。
  - `isWindows.shell()` 可以检查是否在类 Unix 的 Shell 中运行（在 Windows 上）。
  - `isWindows.powershell()` 可以检查是否在 PowerShell 中运行。

你可以根据上述方法中的一种或多种来判断你的 Node.js 脚本的运行环境，并根据不同的环境采取不同的操作或配置。这些方法各有优缺点，你可以根据自己的需求和脚本的特点选择最适合的一种。

除了以上方法，还有其他办法判断 JavaScript 脚本运行的环境吗？

有没有一种通用的方法可以判断脚本在任何操作系统上的执行环境？

如何根据不同的执行环境来调整 JavaScript 脚本的行为？
