# 捕获异常

## 目录

- [多catch语句](#多catch语句)
- [finally语句](#finally语句)
- [捕获多种异常](#捕获多种异常)
- [小结](#小结)

在Java中，凡是可能抛出异常的语句，都可以用`try ... catch`捕获。把可能发生异常的语句放在`try { ... }`中，然后使用`catch`捕获对应的`Exception`及其子类。

### 多catch语句

可以使用多个`catch`语句，每个`catch`分别捕获对应的`Exception`及其子类。JVM在捕获到异常后，会从上到下匹配`catch`语句，匹配到某个`catch`后，执行`catc``h`代码块，然后\_不再\_继续匹配。

简单地说就是：多个`catch`语句只有一个能被执行。例如：

```java 
public static void main(String[] args) {
    try {
        process1();
        process2();
        process3();
    } catch (IOException e) {
        System.out.println(e);
    } catch (NumberFormatException e) {
        System.out.println(e);
    }
}

```


存在多个`catch`的时候，`catch`的**顺序非常重要：子类必须写在前面**。例如：

```java 
public static void main(String[] args) {
    try {
        process1();
        process2();
        process3();
    } catch (IOException e) {
        System.out.println("IO error");
    } catch (UnsupportedEncodingException e) { // 永远捕获不到
        System.out.println("Bad encoding");
    }
}

```


对于上面的代码，`UnsupportedEncodingException`**异常是永远捕获不到的，因为它是**\*\*`IOException`\*\***的子类**。当抛出`UnsupportedEncodingException`异常时，会被`catch (IOException e) { ... }`捕获并执行。

因此，正确的写法是把子类放到前面：

```java 
public static void main(String[] args) {
    try {
        process1();
        process2();
        process3();
    } catch (UnsupportedEncodingException e) {
        System.out.println("Bad encoding");
    } catch (IOException e) {
        System.out.println("IO error");
    }
}

```


### finally语句

无论是否有异常发生，如果我们都希望执行一些语句，例如清理工作，怎么写？

```java 
public static void main(String[] args) {
    try {
        process1();
        process2();
        process3();
    } catch (UnsupportedEncodingException e) {
        System.out.println("Bad encoding");
    } catch (IOException e) {
        System.out.println("IO error");
    } finally {
        System.out.println("END");
    }
}

```


注意`finally`有几个特点：

1. `finally`语句不是必须的，可写可不写；
2. `finally`总是最后执行。

如果没有发生异常，就正常执行`try { ... }`语句块，然后执行`finally`。如果发生了异常，就中断执行`try { ... }`语句块，然后跳转执行匹配的`catch`语句块，最后执行`finally`。

可见，`finally`是用来保证一些代码必须执行的。

某些情况下，可以没有catch，只使用try ... finally结构。例如：

```java 
void process(String file) throws IOException {
    try {
        ...
    } finally {
        System.out.println("END");
    }
}

```


因为方法声明了可能抛出的异常，所以可以不写`catch`。

### 捕获多种异常

如果某些异常的处理逻辑相同，但是**异常本身不存在继承关系**，那么就得编写多条`catch`子句：

```java 
public static void main(String[] args) {
    try {
        process1();
        process2();
        process3();
    } catch (IOException e) {
        System.out.println("Bad input");
    } catch (NumberFormatException e) {
        System.out.println("Bad input");
    } catch (Exception e) {
        System.out.println("Unknown error");
    }
}

```


因为处理`IOException`和`NumberFormatException`的代码是\*\*相同的，所以我们可以把它两用`|`\*\***合并到一起**：

```java 
public static void main(String[] args) {
    try {
        process1();
        process2();
        process3();
    } catch (IOException | NumberFormatException e) {
        // IOException或NumberFormatException
        System.out.println("Bad input");
    } catch (Exception e) {
        System.out.println("Unknown error");
    }
}

```


### 小结

捕获异常时，多个`catch`语句的匹配顺序非常重要，子类必须放在前面；

`finally`语句保证了有无异常都会执行，它是可选的；

一个`catch`语句也可以匹配多个非继承关系的异常。
