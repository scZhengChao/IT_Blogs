# 集成node类型

## 目录

- [ts中引入path模块出错](#ts中引入path模块出错)
- [解决方法](#解决方法)
  - [第一步](#第一步)
  - [第二步](#第二步)

### ts中引入path模块出错

Cannot find module 'path' or its corresponding type declarations.

### 解决方法

##### 第一步

```markdown 
npm install -D @types/node

```


##### 第二步

在tsconfig.json中添加

```json 
"compilerOptions": {
  "types": [
      "node"
    ]
}

```
