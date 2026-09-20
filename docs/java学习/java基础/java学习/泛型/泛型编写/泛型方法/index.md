# 泛型方法

- 泛型方法

![](./assets/image/image_94IvIwuqmZ.png)

```java 
修饰符 <泛型> 返回类型 方法名（参数，... ）{

}
 当前类没有申明泛型类；但是方法的参数和返回值不明确类型的时候；
在使用；用传递的参数；作为泛型的类型


 String[] str = col.toArray(new String[2]);
```


```java 
public <T> void 方法名(T params ){

}

public <T> T 方法名(T params){
}

```
