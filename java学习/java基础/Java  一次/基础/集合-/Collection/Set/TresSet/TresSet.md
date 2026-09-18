# TresSet

## 目录

- [特点](#特点)
- [对象](#对象)

# 特点

- 底层：**红黑树结构**
- 不能存储重复元素
- 没有索引
- **存储的元素会按照特定的顺序排序；**(自带)

```java 

TreeSet<Integer> ts = new TreeSet<>();
        ts.add(100);
        ts.add(1);
        ts.add(22);
        for (Integer t : ts) {
            System.out.println(t);
        }

```


![](image_sbeiaiqAnm.png)

# 对象

![](image_rFWe619X_O.png)

[自然排序Comparable接口](自然排序Comparable接口.md "自然排序Comparable接口")

[比较器](比较器.md "比较器")
