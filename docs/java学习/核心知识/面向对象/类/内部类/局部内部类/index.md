# 局部内部类

## 目录

- [一、基本规则](#一基本规则)
- [二、代码示例](#二代码示例)
  - [合法用法](#合法用法)
  - [非法用法](#非法用法)
- [三、限制原因](#三限制原因)
- [四、特殊注意事项](#四特殊注意事项)
- [五、对比其他内部类](#五对比其他内部类)
- [六、最佳实践建议](#六最佳实践建议)

* **定义在方法内部，作用范围也在方法内**；也称局部内部类。
* 和方法内部成员使用规则一样，`class`前面不可以添加`public、private、protected、static`
* **类中不能包含静态成员**
* 类中**可以包含**`final、abstract`修饰的成员
* 方法内定义的  **局部变量只能  在方法里使用**

局部内部类（定义在方法或代码块中的类）的修饰符使用有严格限制

## 一、基本规则

**局部内部类只能使用以下两种修饰符**：

1. `final`
2. `abstract`

其他所有修饰符（`public`,`protected`,`private`,`static`）都不能使用。

## 二、代码示例

### 合法用法

```java 
void someMethod() {
    // 正确：使用final修饰符
    final class LocalFinalClass {
        // 类内容
    }
    
    // 正确：使用abstract修饰符
    abstract class LocalAbstractClass {
        abstract void doSomething();
    }
}
```


### 非法用法

```java 
void someMethod() {
    // 错误：不能使用public
    public class LocalPublicClass {}  // 编译错误
    
    // 错误：不能使用private
    private class LocalPrivateClass {} // 编译错误
    
    // 错误：不能使用protected
    protected class LocalProtectedClass {} // 编译错误
    
    // 错误：不能使用static
    static class LocalStaticClass {} // 编译错误
}
```


## 三、限制原因

1. **作用域限制**：局部内部类只能**在定义它的方法或代码块中使用**
   - 访问修饰符（`public/protected/private`）无意义
2. **静态矛盾**：局部内部**类自动绑定到所在方法的上下文**
   - `static`会**破坏这种绑定关系**
   - 局部内部类可以访问方法的final局部变量
3. **设计哲学**：局部内部类是临时使用的辅助类
   - 不需要复杂的访问控制
   - 通常用于实现特定接口或继承某个类

## 四、特殊注意事项

1. **虽然类本身不能用static修饰，但可以包含静态成员**（Java 16+）：

```java 
void someMethod() {
    class LocalClass {
        static final int CONSTANT = 42;  // Java 16+允许
        // static int nonFinalVar = 10;  // 仍然不允许（必须final）
    }
}
```


1. **可以实现的修饰组合**：

```java 
void someMethod() {
    final abstract class LocalFinalAbstract { // 虽然合法但逻辑矛盾
        abstract void doSomething();
    }
}
```


1. **匿名内部类**（局部内部类的特殊形式）：
   - 完全不能使用任何修饰符
   - 隐式final（只能访问final或等效final的局部变量）

## 五、对比其他内部类

| 内部类类型 | 可用修饰符                                 | 典型用途       |
| ----- | ------------------------------------- | ---------- |
| 成员内部类 | public/protected/private/static/final | 作为类的组成部分   |
| 静态嵌套类 | public/protected/private/static/final | 与外部类关联的独立类 |
| 局部内部类 | final/abstract                        | 方法内临时使用的实现 |
| 匿名内部类 | 无                                     | 一次性使用的简单实现 |

## 六、最佳实践建议

1. **尽量保持局部内部类简短**：
   - 超过20行考虑提取为成员内部类
2. **优先使用lambda表达式**（如果适用）：

```java 
// 代替Runnable的匿名内部类
Runnable r = () -> System.out.println("Hello");
```


1. **注意变量捕获规则**：

```java 
void someMethod() {
    int x = 10;  // 必须是final或等效final
    class Local {
        void print() {
            System.out.println(x); // 只能访问final变量
        }
    }
}
```
