# 获取

- 单列集合
  - 可以使用`Collection`接口中的默认方法stream​()生成流
  ```java 
  default  Stream<E> stream​() 

  Stream stream = arr.stream()
  ```

- 列集合

  间接的生成流  可以先通过keySet或者entrySet获取一个Set集合，再获取`Stream`流
- 组  &#x9;`Arrays`中的静态方法`stream` 生成流

```java 
Stream stream = Array.stream()
```


- 多个同一类型元素
  使用`Stream`流中的静态方法`of` , 可以把多个**同一种类型的**元素封装成`Stream`流对象

```java 

static <T> Stream<T> of(T... values) 
Stream stream = Stream.of(1,2,4,5);
```


```java 
package com.Stream;

import com.array.Arr;

import java.util.*;
import java.util.stream.Stream;

public class StreamDemo1 {
    public static void main(String[] args) {
        List<String> str = new ArrayList<String>();
        Collections.addAll(str,"asf","asfasf","asafsf");
        Stream stream = str.stream();

    }
    public static void method2(){
        HashMap<String , String> map = new HashMap<>();
        map.put("asfas","asfasf");
        map.put("212412","asfasf ");
        Stream<Map.Entry<String, String>> stream = map.entrySet().stream();
    }
    public static void method3(){
        Integer[] arr = {1,4,55,57,124};
        Stream stream = Arrays.stream(arr);
    }
    public static void method4(){
        Stream.of("asfa","asfasf","asfasf","assdg")
    }
    public static void method1(){

    }
}

```
