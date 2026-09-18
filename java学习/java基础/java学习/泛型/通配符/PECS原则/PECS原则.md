# PECS原则

何时使用`extends`，何时使用`super`？为了便于记忆，我们可以用PECS原则：Producer Extends Consumer Super。

即：**如果需要返回**\*\*`T`****，它是生产者（Producer），要使用****`extends`****通配符；如果需要写入****`T`****，它是消费者（Consumer），要使用****`super`\*\***通配符。**

还是以`Collections`的`copy()`方法为例：

```java 
public class Collections {
    public static <T> void copy(List<? super T> dest, List<? extends T> src) {
        for (int i=0; i<src.size(); i++) {
            T t = src.get(i); // src是producer
            dest.add(t); // dest是consumer
        }
    }
}

```


需要返回`T`的`src`是生产者，因此声明为`List<? extends T>`，需要写入`T`的`dest`是消费者，因此声明为`List<? super T>`。
