# Reduce JavaScript execution time 减少js的执行时间

当JavaScript执行时间超过2秒时，Lighthouse将显示警告。执行时间超过3.5秒时，审核将失败

建议（这些webpack都有相关的配置）：

- 拆分代码。
- 缩小并压缩代码
- 删除未使用的代码 (tree shaking)
- 使用缓存代码（上面有讲）
