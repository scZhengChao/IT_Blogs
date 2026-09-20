# 为Electron的自定义编译手动编译

如果是为一个与公共发行版不匹配的`Electron`自定义版本编译原生`Node`模块，需要**让**`npm`**使用你的**`Electron`自定义版本所对应的`Node`版本。

```javascript 
npm rebuild --nodedir=/path/to/src/out/Default/gen/node_headers
```
