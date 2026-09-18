# 双重检查锁定

## 目录

- [问题核心：指令重排序（Instruction Reordering）](#问题核心指令重排序Instruction-Reordering)
- [具体问题表现](#具体问题表现)
- [解决方案：使用volatile修饰](#解决方案使用volatile修饰)
- [修正后的完整代码](#修正后的完整代码)
- [其他替代方案（更推荐）](#其他替代方案更推荐)
- [关键总结](#关键总结)

这段代码是典型的 ​ \*\*"双重检查锁定"（Double-Checked Locking）​**​ 单例模式实现，但在 Java 中 ​**存在严重的线程安全问题 \*\*！以下是关键问题解析：

### **问题核心：指令重排序（Instruction Reordering）**

```javascript 
INSTANCE = new Singleton(); // 非原子操作！
```


这行代码在 JVM 中会分解为 3 个步骤：

1. 分配对象内存空间
2. 初始化对象（调用构造函数）
3. 将引用指向内存地址（赋值给`INSTANCE`）

**由于指令重排序优化**，实际执行顺序可能变为 **1 → 3 → 2**。此时其他线程可能在`INSTANCE`未完成初始化时就访问它，导致 **空指针异常或状态不一致**！

### **具体问题表现**

1. **线程 A** 进入同步块，执行`INSTANCE = new Singleton()`，但指令重排序导致`INSTANCE`先被赋值（步骤3）而构造函数未执行（步骤2未完成）
2. **线程 B** 在第一个`if (INSTANCE == null)`检查时发现`INSTANCE`非空，直接返回一个 **未初始化完成的对象**

### **解决方案：使用**\*\*`volatile`\*\***修饰**

```java 
private static volatile Singleton INSTANCE; // 必须加 volatile
```


通过`volatile`关键字：

- 禁止 JVM 对`INSTANCE`的指令重排序
- 保证多线程间的可见性（直接读写主内存）

### **修正后的完整代码**

```java 
public class Singleton {
    private static volatile Singleton INSTANCE;

    private Singleton() {} // 私有构造函数

    public static Singleton getInstance() {
        if (INSTANCE == null) {                   // 第一次检查
            synchronized (Singleton.class) {     // 加锁
                if (INSTANCE == null) {           // 第二次检查
                    INSTANCE = new Singleton();   // 安全初始化
                }
            }
        }
        return INSTANCE;
    }
}
```


### **其他替代方案（更推荐）**

1. **静态内部类（Lazy Initialization Holder Class）**

```java 
public class Singleton {
    private static class Holder {
        static final Singleton INSTANCE = new Singleton();
    }
    public static Singleton getInstance() {
        return Holder.INSTANCE;
    }
}
```


- 天然线程安全，无锁性能高
- 懒加载（只有调用`getInstance()`时才会初始化）

1. **枚举单例（Effective Java 推荐）​**

```java 
public enum Singleton {
    INSTANCE;
    // 添加方法
    public void doSomething() {}
}
```


- 绝对防止反射攻击和序列化破坏单例
- 代码最简洁

### **关键总结**

| 方案                | 优点             | 缺点                 |
| ----------------- | -------------- | ------------------ |
| 双重检查锁定 + volatile | 支持懒加载，性能较好     | 代码较复杂，需注意 volatile |
| 静态内部类             | 无锁、线程安全、代码简洁   | 无法传参初始化            |
| 枚举单例              | 绝对安全、防反射/序列化破坏 | 无法继承其他类            |

建议优先使用 **静态内部类** 或 **枚举单例**，避免复杂的同步逻辑。双重检查锁定在 Java 5+ 后可用，但需严格遵循`volatile`要求。
