# Class 对象与类实例

## 目录

- [核心关系](#核心关系)
- [具体关系](#具体关系)
  - [1. 获取Class对象的三种方式](#1-获取Class对象的三种方式)
  - [2. 从Class对象创建实例](#2-从Class对象创建实例)
  - [3. 类实例与Class对象的关联](#3-类实例与Class对象的关联)
- [对比表格](#对比表格)
- [实际应用示例](#实际应用示例)
  - [1. 类型检查](#1-类型检查)
  - [2. 动态创建实例（工厂模式）](#2-动态创建实例工厂模式)
  - [3. 获取类结构信息](#3-获取类结构信息)
- [重要注意事项](#重要注意事项)

在 Java 中，`Class`对象和通过`new`关键字创建的类实例之间有着密切但不同的关系，这是理解 Java 反射机制和类型系统的关键。

## 核心关系

1. \*\*`Class`\*\***对象**：
   - 是 Java 类型系统的运行时表示
   - 每个类（包括接口、数组、基本类型等）在 JVM 中都有一个对应的`Class`对象
   - 包含类的元数据（方法、字段、构造器等信息）
2. **类实例**：
   - 是通过`new`关键字或**反射创建的该类的具体对象**
   - 在**堆内存中分配空间**
   - 根据`Class`对象描述的"蓝图"创建

## 具体关系

### 1. 获取`Class`对象的三种方式

```java 
// (1) 通过类名.class 语法
Class<String> stringClass = String.class;

// (2) 通过实例对象的 getClass() 方法
String str = "hello";
Class<? extends String> strClass = str.getClass();

// (3) 通过 Class.forName() 动态加载
Class<?> clazz = Class.forName("java.lang.String");
```


### 2. 从`Class`对象创建实例

```java 
// 通过 newInstance()（已废弃，Java 9+）
Class<Date> dateClass = Date.class;
Date date1 = dateClass.newInstance();

// 通过 getConstructor().newInstance()
Constructor<Date> constructor = dateClass.getConstructor();
Date date2 = constructor.newInstance();

// 带参数的构造器
Constructor<String> stringConstructor = String.class.getConstructor(String.class);
String str = stringConstructor.newInstance("original");
```


### 3. 类实例与`Class`对象的关联

每个**实例内部都包含一个指向其`Class`****对象的引用**（JVM 实现细节），这**是实现以下功能的基础：**

- `instanceof`操作符
- `getClass()`方法
- 多态机制

## 对比表格

| 特性       | \`Class\`对象                             | 类实例              |
| -------- | --------------------------------------- | ---------------- |
| 本质       | 类的元数据（模板/蓝图）                            | 根据模板创建的具体对象      |
| JVM 中的数量 | 每个类只有1个                                 | 可以创建任意多个         |
| 内存位置     | 方法区                                     | 堆内存              |
| 获取方式     | \`.class\`/\`getClass()\`/\`forName()\` | \`new\`/反射/反序列化等 |
| 主要用途     | 反射、类型检查、类加载                             | 存储数据、执行业务逻辑      |
| 生命周期     | 类加载时创建，卸载时销毁                            | 通过GC回收           |

## 实际应用示例

### 1. 类型检查

```java 
Object obj = "I'm a String";
Class<?> clazz = obj.getClass();

if (clazz == String.class) {
    System.out.println("This is a String");
}
```


### 2. 动态创建实例（工厂模式）

```java 
public <T> T createInstance(Class<T> clazz) throws Exception {
    return clazz.getDeclaredConstructor().newInstance();
}

// 使用
String s = createInstance(String.class);
ArrayList<?> list = createInstance(ArrayList.class);
```


### 3. 获取类结构信息

```java 
Class<ArrayList> arrayListClass = ArrayList.class;

// 获取所有公共方法
Method[] methods = arrayListClass.getMethods();

// 获取所有声明的字段
Field[] fields = arrayListClass.getDeclaredFields();
```


## 重要注意事项

1. **单例性**：对于同一个类加载器，一个类只有一个`Class`对象

```java 
Class<String> c1 = String.class;
Class<String> c2 = "hello".getClass();
System.out.println(c1 == c2); // true
```


1. **数组类**：数组也有对应的`Class`对象

```java 
Class<?> intArrayClass = int[].class;
Class<?> stringArrayClass = String[].class;
```


1. **基本类型**：基本类型也有对应的`Class`对象

```java 
Class<Integer> intClass = int.class;
Class<Void> voidClass = void.class;
```


1. **泛型擦除**：泛型类的`Class`对象不包含泛型信息

```java 
Class<ArrayList> rawClass = ArrayList.class;
Class<ArrayList<String>> genericClass = ArrayList<String>.class; // 编译错误
```


理解`Class`对象和类实例的关系是掌握 Java 反射机制、类加载机制和类型系统的基础，对于框架开发、动态代理等高级特性尤为重要。
