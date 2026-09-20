# frozen-lockfile

## 目录

- [存在需要更新的lockfile ](#存在需要更新的lockfile-)

# 存在需要更新的\*\*lockfile \*\*

`pnpm install`用于安装项目的所有依赖项。
\*\*
在CI环境中，如果存在锁文件但需要更新，则安装失败。\*\*

“CI环境”是如何定义的？

以下是什么意思？依赖项可以更新，但是`pnpm-lock.yaml`没有被触及？

> `pnpm i --frozen-lockfile``# pnpm-lock.yaml`未更新

**pnpm中npm ci的等效命令是什么？**

等价物是:

```纯文本 
pnpm install --frozen-lockfile
```


但是，即使不使用`--frozen-lockfile`，如果锁文件为**up-to-date(最新的)**，pnpm也会自动使用更快的安装策略。这由prefer-frozen-lockfile设置控制，默认设置为`true`。

> “CI环境”是如何定义的？

pnpm使用is ci包检测环境是否为ci。

> `pnpm i --frozen-lockfile # pnpm-lock.yaml is not updated`

这意味着，如\*\*果锁文件不是up-to-date与`package.json`****文件，则****`pnpm install`\*\***将引发异常**，而不是更新锁文件。如果锁文件为up-to-date，pnpm将对`node_modules`进行任何必要的更新。

[ Node.js 包管理器中文文档:pnpm install - 桑鸟网 npm（全称 Node Package Manager，即"node包管理器"）是Node.js默认的、用JavaScript编写的软件包管理系统。Yarn、pnpm、cnpm为Node.js JavaScript运行环境开发的软件打包系统。作为npm包管理器的替代品。 https://books.sangniao.com/manual/1383487790/3535398019](https://books.sangniao.com/manual/1383487790/3535398019 " Node.js 包管理器中文文档:pnpm install - 桑鸟网 npm（全称 Node Package Manager，即\"node包管理器\"）是Node.js默认的、用JavaScript编写的软件包管理系统。Yarn、pnpm、cnpm为Node.js JavaScript运行环境开发的软件打包系统。作为npm包管理器的替代品。 https://books.sangniao.com/manual/1383487790/3535398019")
