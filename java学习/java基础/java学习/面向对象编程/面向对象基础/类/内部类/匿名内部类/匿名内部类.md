# 匿名内部类

## 目录

- [Anonymous Class](#Anonymous-Class)
- [用途](#用途)
- [案例](#案例)

* 适用于**只使用一次的场景；性能开销较小**；
* **简化代码**
* 将**类的定义与类的创建，放到一起完成**；
* `类名 对象名 = new 构造方法();`
* 匿名内部类**没有类型名称、实例对象名称**；
* 编译后的文件命名：`外部类$数字.class`；
* **无法编写构造方法，可以添加构造代码块**；
* 不能出现静态成员 ；
* 匿名内部类**可以实现接口也可以继承父类，但是不可兼得**

### Anonymous Class

还有一种定义Inner Class的方法，它不需要在Outer Class中明确地定义这个Class，而是在方法内部，通过匿名类（Anonymous Class）来定义。示例代码如下：

```java 
// Anonymous Class
public class Main {
    public static void main(String[] args) {
        Outer outer = new Outer("Nested");
        outer.asyncHello();
    }
}

class Outer {
    private String name;

    Outer(String name) {
        this.name = name;
    }

    void asyncHello() {
        Runnable r = new Runnable() {
            @Override
            public void run() {
                System.out.println("Hello, " + Outer.this.name);
            }
        };
        new Thread(r).start();
    }
}

```


观察`asyncHello()`方法，我们在方法内部实例化了一个`Runnable`。`Runnable`本身是接口，接口是不能实例化的，所以这里实际上是定义了一个实现了`Runnable`接口的匿名类，并且通过`new`实例化该匿名类，然后转型为`Runnable`。在定义匿名类的时候就必须实例化它，定义匿名类的写法如下：

```java 
Runnable r = new Runnable() {
    // 实现必要的抽象方法...
};

```


匿名类和Inner Class一样，可以访问Outer Class的`private`字段和方法。之所以我们要定义匿名类，是因为在这里我们通常不关心类名，比直接定义Inner Class可以少写很多代码。

观察Java编译器编译后的`.class`文件可以发现，`Outer`类被编译为`Outer.class`，而匿名类被编译为`Outer$1.class`。如果有多个匿名类，**Java编译器会将每个匿名类依次命名为**`Outer$1`、`Outer$2`、`Outer$3`……

除了接口外，匿名类也完全可以继承自普通类。观察以下代码：

```java 
// Anonymous Class
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, String> map1 = new HashMap<>();
        HashMap<String, String> map2 = new HashMap<>() {}; // 匿名类!
        HashMap<String, String> map3 = new HashMap<>() {
            {
                put("A", "1");
                put("B", "2");
            }
        };
        System.out.println(map3.get("A"));
    }
}

```


`map1`是一个普通的`HashMap`实例，但`map2`是一个匿名类实例，只是该匿名类继承自`HashMap`。`map3`也是一个继承自`HashMap`的匿名类实例，并且添加了`static`代码块来初始化数据。观察编译输出可发现`Main$1.class`和`Main$2.class`两个匿名类文件。

# 用途

改父类影响太大；写**一个子类的方法覆盖父类的方法；** 但是会出现子类太多的情况；

**接口和父类是一样的**；（接口不能实例化；new是 的子类对象）

```java 
new 接口/类名() {

}
// 以下代码使用匿名内部类的方式（本质就是一个子类对象）
new Father(){ 
 // 重写方法
}

```


- **调用方法**

```java 
new Flyable() {
    @Override
    public void fly() {
        System.out.println("不知道什么在飞 22222222");
    }
}.fly();
```


- **作为参数**

```java 
public static void showFlyable(Flyable flyable) {
    flyable.fly();
}

// 调用方法，传入接口匿名子类对象
showFlyable(
    new Flyable() {
        @Override
        public void fly() {
            System.out.println("不知道什么在飞3333");
        }
    }
);

```


- **作为返回对象**

```java 
public static Flyable getFlyable() {
    return new Flyable() {
        @Override
        public void fly() {
            System.out.println("333333333333333");
        }
    };
}
```


# 案例

```java 
package com.array;

import java.util.Arrays;
import java.util.Comparator;

public class Array {
    public static void main(String[] args) {
        Integer[] arr = {4,2,6,1,7,812,};
        Arrays.sort(arr,
                new Comparator<Integer>(){
                    @Override
                    public int compare(Integer  s1,Integer s2 ) {
                        return s2 - s1;
                    }
                });
        System.out.println(Arrays.toString(arr));
    }
}
```
