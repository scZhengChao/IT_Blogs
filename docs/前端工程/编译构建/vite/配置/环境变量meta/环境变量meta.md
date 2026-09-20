# 环境变量meta

## 目录

- [import.meta.env](#importmetaenv)
- [import.meta.glob](#importmetaglob)

`import.meta`是 JavaScript 模块系统中的**标准元数据对象**，由 `ECMAScript `规范（ES2020）定义，\*\*而非`Vite `\*\***专属**。其核心特性如下：

1. **来源与标准**
   - `meta`是**模块内部自动注入的对象**，由 JavaScript 运行时（如浏览器、Node.js）或构建工具（如 Vite）提供，用于暴露模块上下文信息
   - **它是 ESM 规范的一部分**，**Vite 作为 ESM 原生构建工具，直接遵循此标准并扩展了部分功能**（如`import.meta.env`和`import.meta.glob`）
2. **Vite 中的扩展用法**
   - **`import.meta.env`**：Vite 将**环境变量注入此对象**，例如`import.meta.env.MODE`（当前环境模式）
   - **`import.meta.glob`**：Vite **提供的动态导入函数**，用于批量加载模块
3. **官方文档链接**
   - Vite 官方文档对`import.meta`的说明：Vite Glob 导入
   - ECMAScript 标准可参考TC39 提案。

# `import.meta.env`

[ 环境变量和模式 | Vite 官方中文文档 下一代前端工具链 https://cn.vite.dev/guide/env-and-mode.html](https://cn.vite.dev/guide/env-and-mode.html " 环境变量和模式 | Vite 官方中文文档 下一代前端工具链 https://cn.vite.dev/guide/env-and-mode.html")

# `import.meta.glob`

[ 功能 | Vite 官方中文文档 下一代前端工具链 https://cn.vitejs.dev/guide/features#glob-import](https://cn.vitejs.dev/guide/features#glob-import " 功能 | Vite 官方中文文档 下一代前端工具链 https://cn.vitejs.dev/guide/features#glob-import")
