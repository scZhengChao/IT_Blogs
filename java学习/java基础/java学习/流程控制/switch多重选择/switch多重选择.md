# switch多重选择

## 目录

- [switch表达式](#switch表达式)
- [yield](#yield)

使用`switch`时，注意`case`语句并没有花括号`{}`，而且，`case`语句具有“*穿透性*”，漏写`break`将导致意想不到的结果：

```java 
// switch
public class Main {
    public static void main(String[] args) {
        int option = 2;
        switch (option) {
        case 1:
            System.out.println("Selected 1");
        case 2:
            System.out.println("Selected 2");
        case 3:
            System.out.println("Selected 3");
        default:
            System.out.println("Selected other");
        }
    }
}

```


当`option = 2`时，将依次输出`"Selected 2"`、`"Selected 3"`、`"Selected other"`，原因是从匹配到`case 2`开始，后续语句将全部执行，直到遇到`break`语句。因此，任何时候都不要忘记写`break`。

如果有几个`case`语句执行的是同一组语句块，可以这么写：

```java 
// switch
public class Main {
    public static void main(String[] args) {
        int option = 2;
        switch (option) {
        case 1:
            System.out.println("Selected 1");
            break;
        case 2:
        case 3:
            System.out.println("Selected 2, 3");
            break;
        default:
            System.out.println("Selected other");
            break;
        }
    }
}

```


**使用**\*\*`switch`****语句时，只要保证有****`break`****，****`case`\*\***的顺序不影响程序逻辑：**

`switch`语句还可以匹配字符串。**字符串匹配时，是比较“内容相等”。例如：**

switch语句还可以使用枚举类型；

### switch表达式

使用`switch`时，如果遗漏了`break`，就会造成严重的逻辑错误，而且不易在源代码中发现错误 **。从Java 12开始，** \*\*`switch`****语句升级为更简洁的表达式语法，使用类似模式匹配（Pattern Matching）的方法，保证只有一种路径会被执行，并且不需要****`break`\*\***语句：**

```java 
// switch
public class Main {
    public static void main(String[] args) {
        String fruit = "apple";
        switch (fruit) {
        case "apple" -> System.out.println("Selected apple");
        case "pear" -> System.out.println("Selected pear");
        case "mango" -> {
            System.out.println("Selected mango");
            System.out.println("Good choice!");
        }
        default -> System.out.println("No fruit selected");
        }
    }
}

```


**注意新语法使用**\*\*`->`****，如果有多条语句，需要用****`{}`****括起来。不要写****`break`\*\***语句，因为新语法只会执行匹配的语句，\_没有\_穿透效应。**

使用新的`switch`语法，不但不需要`break`，**还可以直接返回值。把**上面的代码改写如下：

```java 
// switch
public class Main {
    public static void main(String[] args) {
        String fruit = "apple";
        int opt = switch (fruit) {
            case "apple" -> 1;
            case "pear", "mango" -> 2;
            default -> 0;
        }; // 注意赋值语句要以;结束
        System.out.println("opt = " + opt);
    }
}

```


这样可以获得更简洁的代码。

### yield

大多数时候，在`switch`表达式内部，我们会返回简单的值。

但是，如果需要复杂的语句，我们也可以写很多语句，放到`{...}`里，然后 \*\*，用`yield`****返回一个值作为****`switch`\*\***语句的返回值：**

```java 
// yield
public class Main {
    public static void main(String[] args) {
        String fruit = "orange";
        int opt = switch (fruit) {
            case "apple" -> 1;
            case "pear", "mango" -> 2;
            default -> {
                int code = fruit.hashCode();
                yield code; // switch语句返回值
            }
        };
        System.out.println("opt = " + opt);
    }
}

```
