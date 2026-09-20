# Collections 工具类

## 目录

- [addAll](#addAll)
  - [sort](#sort)
  - [shuffle](#shuffle)

> 针对集合提供了一些功能；排序、转换为字符串 、二分查找、乱序

- 不能实例化
- 提供了大量的静态方法
- 不能创建对象
- 针对list， Set集合进行相关操作；

![](image_eH-Ly5Nga6.png)

#### addAll

把给定的元素添加在集合中

```java 
Collections.addAll(list/set,node1,node2 )
```


##### sort

> 排序

##### shuffle

> 乱序

```java 
List<Integer> list = new ArrayList<>();
        Collections.addAll(list,1,2,34,5);
        Collections.sort(list); 
        Collections.shuffle(list);
        System.out.println(list);
```
