# 崩溃

## 目录

- [高频崩溃原因 & 解决方案](#高频崩溃原因--解决方案)
- [快速诊断指令](#快速诊断指令)
- [替代调试方案（临时救急）](#替代调试方案临时救急)

NDB 崩溃确实**很可能是内存不足**（尤其是调试大型项目时），但也可能是其他原因。以下是常见原因及针对性解决方案：

***

### **高频崩溃原因 & 解决方案**

1. **内存不足（最常见）**
   - **现象**：崩溃时终端提示`FATAL ERROR: Ineffective mark-compacts`或`JavaScript heap out of memory`。
   - **修复方案**：

```markdown 
# 启动时显式增大内存限制（单位：MB）
ndb --max-old-space-size=4096 your-app.js  # 推荐先试4096(4GB)
```


1. **NDB/Node.js 版本问题**

- **现象**：特定版本组合存在兼容性 Bug。
- **修复方案**：

```markdown 
# 更新到最新稳定版
npm install -g ndb@latest
# 检查Node版本（建议v16+）
node -v
```


1. **DevTools协议通信故障**

- **现象**：崩溃前输出`WebSockets request error`或`Debugger disconnected`。
- **修复方案**：

```markdown 
# 重置NDB内部缓存
rm -rf ~/.ndb_js
```


1. **项目复杂度过高**
   - **现象**：调试包含大量模块/断点的项目时崩溃。
   - **修复方案**：
     - 暂时禁用非必要断点
     - 改用条件断点（如`console.log`替代暂停）
     - 分模块调试

***

### **快速诊断指令**

1. **查看崩溃日志** &#x20;

   在终端运行后捕获最后几行输出：

```bash 
ndb your-app.js 2>&1 | tee ndb.log
```


1. **测试最小案例**
   用空脚本验证基础功能是否正常：

```javascript 
echo "setInterval(()=>console.log('OK'),1000)" > test.js
ndb test.js  # 观察是否持续运行
```


### **替代调试方案（临时救急）**

如果内存调整无效，改用更轻量的工具：

1. **Chrome DevTools**

```javascript 
node --inspect your-app.js  # 访问 chrome://inspect 附加调试器
```


1. **VS Code 调试**
   创建`.vscode/launch.json`：

```json 
{
  "type": "node",
  "request": "launch",
  "name": "Debug",
  "skipFiles": ["<node_internals>/**"],
  "program": "${file}"
}
```
