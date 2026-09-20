# 树状树递归遍历获取路径

## 目录

- [数组](#数组)

# 数组

```typescript 
const getPathByKey = (curKey,data)=>{
        let result = []
        let hasFind = false
        const traverse=(curKey,path,data)=>{
            if(data.length === 0) return
            for(let item of data){
                path.push(item)
                if(item.id === curKey){
                    result = JSON.parse(JSON.stringify(path))
                    hasFind = true
                    return
                }
                const children =Array.isArray(item.children)?item.children:[]
                traverse(curKey,path,children)
                if(hasFind) return;
                path.pop()
            }
        }
        traverse(curKey,[],data)
        return result
    }


const data = [
  {
    code: "090",
    id: "090",
    children: [
      {
        code: "0901",
        id: "0901",
        children: [
          {
            code: "090101",
            id: "090101",
          },
          {
            code: "090202",
            id: "090202",
          },
        ]
      },
      {
        code: "0902",
        id: "0902",
      },
    ]
  },
  {
    code: "091",
    id: "091",
    children: [],
  },
  {
    code: "092",
    id: "092",
    children: [
      {
        code: "0921",
        id: "0921",
      },
      {
        code: "0922",
        id: "0922",
        children: [
          {
            code: "092201",
            id: "092201",
            children: [
              {
                code: "09220101",
                id: "09220101",
              },
            ]
          },
        ]
      },
    ]
  },
];

// ...

getPathByKey('09220101', data);


```


优化：动态key

```javascript 
/**
 * 从树里匹配出路径
 * key:所查数据值
 * source：树
 * id: key在树里的键
 * childName:递归所需的键； 一般是children
 * @param key
 * @param source
 */
export function getPathByKey<T>(key: string, source: T[], id: keyof T, childName: keyof T): T[] {
  let result: T[] = [];
  let hasFind = false;
  const traverse = (curKey: string, path: T[], data: T[]) => {
    if (data.length === 0) return;
    for (const item of data) {
      path.push(item);

      if (item[id] === curKey) {
        result = JSON.parse(JSON.stringify(path));
        hasFind = true;
        return;
      }
      const routes = (Array.isArray(item?.[childName]) ? item?.[childName] : []) as T[];
      traverse(curKey, path, routes);
      if (hasFind) return;
      path.pop();
    }
  };
  traverse(key, [], source);
  return result;
}
```
