# 收集方法

使用Stream流的方式操作完毕之后，我想把流中的数据收集起来，该怎么办呢？

```java title="Stream流的收集方法
"
R collect​(Collector collector) : 此方法只负责收集流中的数据 , 创建集合添加数据动作需要依赖于参数
<A> A[] toArray(IntFunction<A[]> generator) : 把Stream流中的数据存储到指定类型的数组中并返回
      
例如 : String[] strings = list.stream().toArray((int value) -> new String[value]);
       
       
```


```java 
工具类Collectors提供了具体的收集方式

public static <T> Collector toList​()：把元素收集到List集合中
public static <T> Collector toSet​()：把元素收集到Set集合中
public static  Collector toMap​(Function keyMapper,Function valueMapper)：把元素收集到Map集合中
```


![](./image/image_iHyKPHYYVk.png)

![](./image/image_Q_EiJLVL2H.png)
