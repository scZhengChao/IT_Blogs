# 数组转树

```typescript 

// 使用示例
    const flatArray = [
        { id: 1, name: 'Node 1', parentId: null },
        { id: 2, name: 'Node 1.1', parentId: 1 },
        { id: 3, name: 'Node 1.2', parentId: 1 },
        { id: 4, name: 'Node 2', parentId: null },
        { id: 5, name: 'Node 2.1', parentId: 4 }
    ];


    function arrayToTree(items, idKey = 'id', parentKey = 'parentId') {
            const itemMap = {};
            const tree = [];

            // 创建映射
            items.forEach(item => {
                itemMap[item[idKey]] = { ...item, children: [] };
            });

            // 构建树
            items.forEach(item => {
                const parentId = item[parentKey];
                if (parentId === null || parentId === undefined) {
                    tree.push(itemMap[item[idKey]]);
                } else {
                    if (itemMap[parentId]) {
                        itemMap[parentId].children.push(itemMap[item[idKey]]);
                    }
                }
            });

            return tree;
        }

console.log(arrayToTree(flatArray))

```
