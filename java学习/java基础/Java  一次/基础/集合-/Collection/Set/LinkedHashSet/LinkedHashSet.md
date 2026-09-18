# LinkedHashSet

## 目录

- [特点](#特点)

# 特点

- **没有索引**
- 不能存储重复元素
- **存储元素顺序一致；**
- 底层： **哈希表+ 链表**&#x20;

```java 

 LinkedHashSet<Integer> arr = new LinkedHashSet<>();
        arr.add(1);
        arr.add(2);
        arr.add(4);
        for (Integer i : arr) {
            System.out.println(i);
        }


```
