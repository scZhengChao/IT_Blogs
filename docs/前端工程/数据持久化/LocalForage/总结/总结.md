# 总结

## 目录

- [注意事项](#注意事项)
- [6. 总结](#6-总结)

## **注意事项**

1. **存储限制**：
   - `localStorage`：约 5MB（不同浏览器可能不同）。
   - `IndexedDB`/`WebSQL`：通常 50MB+（取决于浏览器）。
2. **异步操作**：所有方法均返回`Promise`，需使用`await`或`.then()`。
3. **兼容性**：
   - 支持现代浏览器（Chrome、Firefox、Safari、Edge）。
   - 不支持 IE（如需兼容，可搭配`IndexedDBShim`）。
4. **数据类型**：
   - 仅支持可序列化的数据（`string`、`number`、`boolean`、`Array`、`Object`、`Blob`等）。
   - 复杂对象需手动转换（如`JSON.stringify`/`JSON.parse`）。

## **6. 总结**

| 特性        | 说明                                            |
| --------- | --------------------------------------------- |
| **存储方式**​ | 自动选择\`IndexedDB\`>\`WebSQL\`>\`localStorage\` |
| **数据类型**​ | 支持\`string\`、\`object\`、\`Blob\`等             |
| **异步操作**​ | 所有方法返回\`Promise\`                             |
| **适用场景**​ | 缓存 API 数据、离线存储、用户偏好设置                         |

LocalForage 是一个简单易用的客户端存储方案，适合需要持久化存储数据的 Web 应用。🚀
