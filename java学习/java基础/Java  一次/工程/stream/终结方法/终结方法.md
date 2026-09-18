# 终结方法

> 关闭了就不能在使用了

```java 
void forEach​(Consumer action)：对此流的每个元素执行操作
    Consumer接口中的方法 void accept​(T t) ：对给定的参数执行此操作
    
Optional<T> min(Comparator<? super T> comparator)
    根据提供的Comparator返回此流的最小元素
    
Optional<T> max(Comparator<? super T> comparator)
     根据提供的Comparator返回此流的最大元素
     
long count​()：返回此流中的元素数

```
