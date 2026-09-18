# 去除多余空格

## 目录

- [去除多余空格](#去除多余空格)

### 去除多余空格

当你需要将一段文本中的多个空格合并成一个空格

```typescript 
const setTrimOut = str => str.replace(/\s\s+/g, ' ')
const str = setTrimOut('hello,   jack') // 

```
