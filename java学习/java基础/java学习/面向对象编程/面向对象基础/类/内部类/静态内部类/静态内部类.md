# 静态内部类

## 目录

- [Static Nested Class](#Static-Nested-Class)

* 静态内部类； 只能访问**外部类的静态成员**；如果要访问非静态成员；可以通过外部类对象实例；
* 可以通过`外部类.内部类.静态成员`的方式； 访问**内部类的静态成员**；
* 修饰符任意；

### Static Nested Class

最后一种内部类和Inner Class类似，但是使用`static`修饰，称为静态内部类（Static Nested Class）：

```java 
// Static Nested Class
public class Main {
    public static void main(String[] args) {
        // 获取静态内部类实例
         Outer.StaticNested sn = new Outer.StaticNested();
         sn.hello();
    }
}

class Outer {
    private static String NAME = "OUTER";

    private String name;

    Outer(String name) {
        this.name = name;
    }

    static class StaticNested {
        void hello() {
            System.out.println("Hello, " + Outer.NAME);
        }
    }
}
```


用`static`修饰的内部类和Inner Class有很大的不同，它不再依附于`Outer`的实例，**而是一个完全独立的类**，因此无法引用`Outer.this`，**但它可以访问**\*\*`Outer`****的****`private`\*\***静态字段和静态方法**。如果把`StaticNested`移到`Outer`之外，就失去了访问`private`的权限。
