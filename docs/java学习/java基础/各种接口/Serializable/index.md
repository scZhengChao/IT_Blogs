# Serializable

## 目录

- [基本用法](#基本用法)
- [主要特点](#主要特点)

`Serializable`是`Java`中的一个标记接口(`Marker Interface`)，用于实现**对象的序列化功能**。下面是关于Serializable接口的详细说明：

## 基本用法

1. **实现Serializable接口**：

```java 
import java.io.Serializable;

public class Person implements Serializable {
    private String name;
    private int age;
    
    // 构造方法、getter和setter等
}
```


1. **序列化对象**：

```java 
try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("person.ser"))) {
    Person person = new Person("张三", 25);
    oos.writeObject(person);
} catch (IOException e) {
    e.printStackTrace();
}
```


1. 反序列化对象：

```java 
try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("person.ser"))) {
    Person person = (Person) ois.readObject();
    System.out.println(person.getName()); // 输出: 张三
} catch (IOException | ClassNotFoundException e) {
    e.printStackTrace();
}
```


## 主要特点

1. **标记接口**：Serializable是一个空接口，不包含任何方法，仅用于标记类可序列化。
2. **自动序列化**：实现Serializable接口后，Java会自动处理对象的序列化和反序列化。
3. **serialVersionUID**：
   - 用于标识类的版本，确保序列化和反序列化时类的版本一致
   - 建议显式声明：

```java 
private static final long serialVersionUID = 1L;
```


- 如果不声明，JVM会根据类细节自动生成，但类修改后可能导致反序列化失败

1. **瞬态字段**：使用`transient`关键字标记的字段不会被序列化

```java 
private transient String password; // 不会被序列化
```


1. **继承性**：
   - 如果一个类实现**了Serializable，其子类自动可序列化**
   - 如果父类没有实现Serializable，子类实现时需确保父类有无参构造方法
