# 生成修复lock文件

## 目录

- [--lockfile-only](#--lockfile-only)
- [--fix-lockfile](#--fix-lockfile)

### --lockfile-only

- 默认值： **false**
- 类型：**Boolean**

使用时，只更新 `pnpm-lock.yaml` 和 `package.json`。 不写入 `node_modules` 目录。

### --fix-lockfile

自动修复损坏的 lock 文件入口。
