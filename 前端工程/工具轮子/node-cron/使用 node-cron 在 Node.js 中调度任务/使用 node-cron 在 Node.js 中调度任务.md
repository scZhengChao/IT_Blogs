# 使用 node-cron 在 Node.js 中调度任务

## 目录

- [使用 node-cron](#使用-node-cron)
  - [语法](#语法)
  - [选项](#选项)
- [任务调度提示和技巧](#任务调度提示和技巧)
- [定时任务方法](#定时任务方法)
  - [开始任务](#开始任务)
  - [停止任务](#停止任务)
  - [销毁任务](#销毁任务)
- [示例：删除错误日志文件](#示例删除错误日志文件)
- [示例：备份数据库](#示例备份数据库)
- [示例：发送预定的电子邮件](#示例发送预定的电子邮件)

没有一个开发人员愿意把所有时间都花在繁琐的任务上，比如系统维护和管理、日常数据库备份以及定期下载文件和电子邮件。你更愿意专注于富有成效的工作，而不是跟踪这些烦人的琐事何时需要完成。

这时就需要使用到**任务调度**，它将帮助您解决这样的问题。

**任务调度**使您能够计划任意代码（方法/函数）和命令在固定日期和时间、重复间隔或指定间隔后执行一次。在 Linux 操作系统中，任务调度通常由诸如 cron 之类的**实用程序服务**在**操作系统级别处理**。

在 Node.js 应用程序中，类似于 cron 的功能，我们可以使用[node-cron](https://link.juejin.cn/?target=https://github.com/kelektiv/node-cron "node-cron")这样的包实现。正如开发者所介绍的，\*\*[node-cron](https://link.juejin.cn/?target=https://www.npmjs.com/package/node-cron "node-cron")**是基于** GNU crontab 的 node.js 纯 JavaScript 中的微型任务调度器。\*\*​

`crontab` 是 `Linux` 系统的定时任务执行器。`cron` 的操作由[crontab](https://link.juejin.cn/?target=https://www.gnu.org/software/mcron/manual/html_node/Crontab-file.html "crontab")文件驱动，该文件是一个配置文件，其中包含对 cron 守护程序的指令。`node-cron`模块允许我们使用完整的 crontab 语法在 Node 中调度任务。

> 🎉**推荐工具**[crontab 编辑器](https://link.juejin.cn/?target=https://crontab.guru/ "crontab 编辑器")：在线工具可以可视化生成 crontab 的配置文件。

crontab 语法如下所示：

```markdown 
┌────────────── second (可选)
│ ┌──────────── 分钟 (minute，0 - 59)
│ │ ┌────────── 小时 (hour，0 - 23)
│ │ │ ┌──────── 一个月中的第几天 (day of month，1 - 31)
│ │ │ │ ┌────── 月份 (month，1 - 12)
│ │ │ │ │ ┌──── 一个星期中星期几 (day of week，0 - 6) 注意：星期天为 0
│ │ │ │ │ │
│ │ │ │ │ │
* * * * * *

```


单个星号的行为类似于通配符。这意味着该任务将针对该时间单位的每个实例运行。五个星号（`* * * * *`）表示 crontab 默认每分钟运行一次。

星号处的数字将被视为该时间单位的值。允许您将任务安排为每天、每周或更复杂的时间。

将上面的图形表示重新编写成表格，允许的 cron 值包括以下内容。

| **字段**​              | **值**​                       |
| -------------------- | ---------------------------- |
| \`second\`           | 0-59                         |
| \`minute\`           | 0-59                         |
| \`hour\`             | 0-23                         |
| \`day of the month\` | 1-31                         |
| \`month\`            | 1-12（或月份简写 Jan、Feb...）       |
| \`day of the week\`  | 0-7（或 Jan、Feb...，0 或 7 是星期日） |

下面我们来看看它的一些用法和用例。

## 使用 node-cron

使用`npm`安装`node-cron`模块。

```javascript 
npm i node-cron

```


### 语法

```javascript 
cron.schedule(cronExpression: string, task: Function, options: Object)

```


### 选项

- `scheduled`：一个布尔值（`boolean`），用于设置创建的任务是否已安排（默认值为`true`）。
- `timezone`：用于任务调度的时区。有关有效值，可参考[moment-timezone](https://link.juejin.cn/?target=https://momentjs.com/timezone "moment-timezone")。

看看下面的例子。

```typescript 
const cron = require('node-cron')

cron.schedule('5 * * * * *', () => {
  console.log('每分钟在第 5 秒运行任务')
})

```


时间规范的位置 2、3、4、5 和 6 中的星号（`*`）类似于用于时间划分的文件 glob 或通配符；它们分别指定**每分钟**、**每小时**、**每月的每一天**、**每月和每周的每一天**。

以下代码将在每天凌晨 5:30 运行。

```javascript 
const cron = require('node-cron')

cron.schedule('30 5 * * *', () => {
  console.log('每天凌晨 5:30 运行任务')
})

```


## 任务调度提示和技巧

现在我们已经了解了基本知识，让我们做一些更有趣的事情。

假设您希望在每周五下午 4 点运行一项特定任务。代码如下所示：

```javascript 
const cron = require('node-cron')

cron.schedule('0 16 * * friday', () => {
  console.log('每周五下午 16:00 运行任务')
})

```


或者，您可能需要每个季度（1 月、4 月、7 月和 10 月）运行一次数据库备份。crontab 语法没有**一个月的最后一天**选项，因此您可以使用**下个月的第一天**，如下所示。

```typescript 
const cron = require('node-cron')

cron.schedule('2 3 1 1,4,7,10 *', () => {
  console.log('在每个季度第一天的 03:02 运行任务')
})

```


下面显示的任务从上午 10 点到下午 6 点，每小时 5 分钟运行任务。

```javascript 
const cron = require('node-cron')

cron.schedule('5 10-18 * * *', () => {
  console.log('从上午 10 点到下午 18 点，每小时第 5 分钟运行任务')
})

```


在某些情况下，您可能需要每两小时、三小时或四小时运行一次任务。您可以通过将小时数除以所需的时间间隔来完成此操作，例如，每四小时`*4`，或在上午 12 点到下午 12 点之间每三小时运行`0-12/3`。

分钟也可以用同样的方法划分。例如，`minutes`位置的表达式为`*/10`，表示**每 10 分钟运行一次任务**。

下面的任务在上午 8 点到下午 5:58 之间每两小时后的每 5 分钟运行一次任务。

```javascript 
const cron = require('node-cron')

cron.schedule('*/5 8-18/2 * * *', () => {
  console.log('从上午 8 点到下午 18 点，每 2 小时后的每 5 分钟运行一次任务')
})

```


## 定时任务方法

让我们关注一下三个关键的定时任务方法。

### 开始任务

将`scheduled`选项值设置为`false`时，任务将被调度，但无法启动，即使 cron 表达式正在滴答作响。

要启动这样的任务，您需要调用`start`方法。

```javascript 
const cron = require('node-cron')

const task = cron.schedule('*/5 8-18/2 * * *', () => {
  console.log('从上午 8 点到下午 18 点，每 2 小时后的每 5 分钟运行一次任务')
})

task.start()

```


### 停止任务

如果需要停止任务运行，可以使用`stop`方法将`scheduled`选项设置为`false`。除非重新启动，否则不会执行该任务。

```javascript 
const cron = require('node-cron')

const task = cron.schedule('*/5 8-18/2 * * *', () => {
  console.log('从上午 8 点到下午 18 点，每 2 小时后的每 5 分钟运行一次任务')
})

task.stop()

```


### 销毁任务

`destroy`方法停止任务并将其完全销毁。

```javascript 
const cron = require('node-cron')

const task = cron.schedule('*/5 8-18/2 * * *', () => {
  console.log('从上午 8 点到下午 18 点，每 2 小时后的每 5 分钟运行一次任务')
})

task.destroy()

```


以上便是`node-cron`的大部分功能，您应该使用这些功能来安排频繁运行的任务。

## 示例：删除错误日志文件

考虑一个场景，您需要在每个月的第十五天定期从服务器中删除日志文件。

```javascript 
const cron = require('node-cron')
const fs = require('fs')

cron.schedule('0 0 15 * *', () => {
  fs.unlink('./error.log', (err) => {
    if (err) throw err
    console.log('错误日志文件已成功删除')
  })
})

```


## 示例：备份数据库

确保用户数据的保存是任何业务的关键。如果发生意外事件，并且数据库损坏，则需要从备份中恢复数据库。如果您的业务没有任何形式的现有备份，您将面临严重的麻烦。

考虑一个场景，您需要在每天晚上 11:59 例行备份数据库转储。

假设您已经在环境中安装并运行了 SQLite。给定一个名为`database.sqlite`的数据库，用于进行数据库备份的 shell 命令可能类似于：

```sql 
sqlite3 database.sqlite .dump > data_dump.sql

```


为了执行以上命令，我们安装`shelljs`：

```sql 
pnpm install shelljs

```


它可以在运行 shell 命令。

完整示例如下：

```javascript 
const cron = require('node-cron')
const shell = require('shelljs')

// 每天晚上 11:59 备份数据库
cron.schedule('59 23 * * *', () => {
  if (shell.exec('sqlite3 database.sqlite .dump > data_dump.sql').code !== 0) {
    shell.exit(1)
  } else {
    shell.echo('数据库备份完成')
  }
})

```


## 示例：发送预定的电子邮件

发送电子邮件，`nodemailer` 包可以帮助到我们，安装：

```bash 
pnpm i nodemailer

```


假设我们需要在每周五为公司员工统一发送一封邮件：

```javascript 
const cron = require('node-cron')
const nodemailer = require('nodemailer')

// 创建邮件传输器
let transporter = nodemailer.createTransport({
  host: 'your_demo_email_smtp_host.example.com',
  port: your_demo_email_port,
  auth: {
    user: 'your_demo_email_address@example.com',
    pass: 'your_demo_email_password'
  }
})

// 每周五发送邮件
cron.schedule('0 0 * * 5', () => {
  let messageOptions = {
    from: 'your_demo_email_address@example.com',
    to: 'your_demo_email_address@example.com',
    subject: '预定电子邮件',
    text: '你好，这封电子邮件是公司自动发送的。'
  }

  transporter.sendMail(messageOptions, (error, info) => {
    if (error) {
      throw error
    } else {
      console.log('电子邮件已成功发送！')
    }
  })
})

```


如果需要测试效果，Nodemailer 支持[Ethereal Email](https://link.juejin.cn/?target=https://ethereal.email/ "Ethereal Email")提供的测试账户。创建一个 Ethereal 帐户并使用为您生成的用户名和密码。
