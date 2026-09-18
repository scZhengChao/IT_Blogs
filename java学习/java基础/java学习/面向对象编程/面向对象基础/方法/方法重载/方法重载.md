# 方法重载

## 目录

- [方法重调载的好处？](#方法重调载的好处)
- [小结](#小结)
- [关于修饰符和返回值的说明](#关于修饰符和返回值的说明)
- [正确示例](#正确示例)
- [错误示例](#错误示例)
- [总结对比表](#总结对比表)

#### 方法重调载的好处？

- 让调用者不用记忆太多的方法名
- 调用方法时，JVM会根据**参数列表匹配对应的方法**
- **jvm 通过参数的不同；来调用不同的方法**

在一个类中，我们可以定义多个方法。如果有一系列方法，它们**的功能都是类似的，只有参数有所不同**，那么，可以把这一组方法名做成**同名**方法。例如，在`Hello`类中，定义多个`hello()`方法：

```java 
class Hello {
    public void hello() {
        System.out.println("Hello, world!");
    }

    public void hello(String name) {
        System.out.println("Hello, " + name + "!");
    }

    public void hello(String name, int age) {
        if (age < 18) {
            System.out.println("Hi, " + name + "!");
        } else {
            System.out.println("Hello, " + name + "!");
        }
    }
}

```


这种**方法名相同，但各自的参数不同，称为方法重载**（`Overload`）。

> 注意：方法重载的**返回值类型通常都是相同的。**

方法重载的目的是，**功能类似的方法使用同一名字，更容易记住，因此，调用起来更简单。**

举个例子，`String`类提供了多个重载方法`indexOf()`，可以查找子串：

- `int indexOf(int ch)`：根据字符的Unicode码查找；
- `int indexOf(String str)`：根据字符串查找；
- `int indexOf(int ch, int fromIndex)`：根据字符查找，但指定起始位置；
- `int indexOf(String str, int fromIndex)`根据字符串查找，但指定起始位置。

### 小结

- 方法重载是指多个\*\*方法的方法名相同，但各自的参数不同；\*\***参数列表不同（参数顺序、个数、类型）**
- 重载方法应该完成类似的功能，参考`String`的`indexOf()`；
- **重载方法返回值类型应该相同。**
- 发生在同一个类中
- \*\*方法返回值、访问修饰符 \*\***任意**
- 与方法**的参数名无关**

## 关于修饰符和返回值的说明

| 要素        | 是否影响重载 | 说明                                                  |
| --------- | ------ | --------------------------------------------------- |
| **修饰符**​  | ❌ 不影响  | 可以是不同的访问修饰符(public/protected/private)或static/final等 |
| **返回值**​  | ❌ 不影响  | 返回值类型可以相同也可以不同                                      |
| **异常声明**​ | ❌ 不影响  | 抛出不同的异常不影响重载                                        |

## 正确示例

```java 
public class OverloadDemo {
    // 参数数量不同
    public void show(int a) {}                // ✅ 有效重载
    protected void show(int a, int b) {}      // ✅ 修饰符不同
    
    // 参数类型不同
    void show(String s) {}                    // ✅ 默认修饰符
    private String show(double d) {           // ✅ 返回值不同且private
        return "";
    }
    
    // 参数顺序不同
    static void show(int a, String s) {}      // ✅ static修饰
    final void show(String s, int a) {}       // ✅ final修饰
}
```


## 错误示例

```java 
public class ErrorDemo {
    // ❌ 不是有效重载（仅返回值不同）
    int calculate() { return 0; }
    void calculate() {}  // 编译错误
    
    // ❌ 不是有效重载（参数列表相同）
    void process(String[] arr) {}
    static void process(String[] arr) {}  // 编译错误
}
```


## 总结对比表

| 方法关系 | 要求相同         | 要求不同           | 可以不同                  |
| ---- | ------------ | -------------- | --------------------- |
| 重载   | 方法名          | 参数列表(类型/顺序/数量) | 修饰符/返回值/异常声明          |
| 重写   | 方法名/参数列表/返回值 | 具体实现           | 访问权限(不能更严格)/异常(不能更宽泛) |

记住关键点：**Java区分重载方法只看"方法名+参数列表"**，其他因素都不影响重载的判断。
