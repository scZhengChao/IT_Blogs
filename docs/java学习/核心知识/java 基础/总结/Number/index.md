# Number

## 目录

- [Number的主要特点](#Number的主要特点)
- [Number的常见子类](#Number的常见子类)
- [Number的使用示例](#Number的使用示例)
  - [1. 基本转换](#1-基本转换)
  - [2. 多态使用（适用于不同数值类型）](#2-多态使用适用于不同数值类型)
  - [3. 适用于泛型（如List\<Number>）](#3-适用于泛型如ListNumber)
- [Number的应用场景](#Number的应用场景)
- [总结](#总结)

在 Java 中，**`Number`****是一个抽象类（abstract class**），位于`java.lang`包中，它是**所有数值类型（整数、浮点数等）的父类。**

## \*\*`Number`\*\***的主要特点**

1. \*\*`Number`\*\***是一个抽象类**，不能直接实例化，但可以用它的子类（如`Integer`、`Double`等）。
2. \*\*`Number`\*\***是所有数值包装类的超类**，包括：
   - 整数类型：`Byte`、`Short`、`Integer`、`Long`
   - 浮点类型：`Float`、`Double`
   - 大数类型：`BigInteger`（任意精度整数）、`BigDecimal`（任意精度小数）
3. \*\*`Number`\*\***提供了一些方法，用于在不同数值类型之间转换**：
   - `intValue()`→ 返回`int`
   - `longValue()`→ 返回`long`
   - `floatValue()`→ 返回`float`
   - `doubleValue()`→ 返回`double`
   - `byteValue()`→ 返回`byte`
   - `shortValue()`→ 返回`short`

## \*\*`Number`\*\***的常见子类**

| 子类             | 对应基本类型     | 示例                                                            |
| -------------- | ---------- | ------------------------------------------------------------- |
| \`Byte\`       | \`byte\`   | \`Byte b = 10;\`                                              |
| \`Short\`      | \`short\`  | \`Short s = 100;\`                                            |
| \`Integer\`    | \`int\`    | \`Integer i = 1000;\`                                         |
| \`Long\`       | \`long\`   | \`Long l = 10000L;\`                                          |
| \`Float\`      | \`float\`  | \`Float f = 3.14f;\`                                          |
| \`Double\`     | \`double\` | \`Double d = 3.14159;\`                                       |
| \`BigInteger\` | 无（任意精度整数）  | \`BigInteger bi = new BigInteger("12345678901234567890");\`   |
| \`BigDecimal\` | 无（任意精度小数）  | \`BigDecimal bd = new BigDecimal("3.14159265358979323846");\` |

## \*\*`Number`\*\***的使用示例**

### **1. 基本转换**

```java 
Number num = 100; // 自动装箱为 Integer
int i = num.intValue(); // 转换为 int
double d = num.doubleValue(); // 转换为 double
System.out.println(i); // 输出: 100
System.out.println(d); // 输出: 100.0
```


### **2. 多态使用（适用于不同数值类型）**

```java 
Number[] numbers = { 10, 3.14f, 1000L, new BigDecimal("123.456") };

for (Number num : numbers) {
    System.out.println(num.getClass().getSimpleName() + ": " + num.doubleValue());
}
```


输出：

```java 
Integer: 10.0
Float: 3.14
Long: 1000.0
BigDecimal: 123.456
```


### **3. 适用于泛型（如**\*\*`List<Number>`）\*\*​

```java 
List<Number> numberList = new ArrayList<>();
numberList.add(10);       // Integer
numberList.add(3.14);     // Double
numberList.add(1000L);    // Long

for (Number num : numberList) {
    System.out.println(num);
}
```


**输出：**

```javascript 
10
3.14
1000
```


## \*\*`Number`\*\***的应用场景**

1. **泛型集合存储多种数值类型**（如`List<Number>`）。
2. **方法参数或返回值需要支持多种数值类型**（如`public Number calculate(...)`）。
3. **数值类型转换**（如`intValue()`,`doubleValue()`）。
4. **处理大数运算**（如`BigInteger`和`BigDecimal`）。

***

## **总结**

- \*\*`Number`\*\***是 Java 中所有数值类型的父类**，包括`Integer`、`Double`、`BigDecimal`等。
- **它是一个抽象类**，不能直接实例化，但可以用它的子类。
- **提供数值转换方法**（如`intValue()`,`doubleValue()`）。
- **适用于泛型、集合和多态场景**，可以统一处理不同的数值类型。

如果你**需要处理不同类型的数字**，`Number`是一个非常有用的基类！ 🚀
