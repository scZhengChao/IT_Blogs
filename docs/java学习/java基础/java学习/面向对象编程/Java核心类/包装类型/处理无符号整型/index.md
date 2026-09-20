# 处理无符号整型

在Java中，**并没有无符号整型（Unsigned）的基本数据类型。**`byte`、`short`、`int`和`long`**都是带符号整型**，**最高位是符号位。** 而C语言则提供了CPU支持的全部数据类型，包括无符号整型。**无符号整型和有符号整型的转换在Java中就需要借助包装类型的静态方法完成。**

例如，**byte是有符号整型，范围是**\*\*`-128`****\~****`+127`****，但如果把****`byte`****看作无符号整型，它的范围就是****`0`****\~****`255`****。我们把一个负的****`byte`****按无符号整型转换为****`int`：\*\*​

```java 
// Byte
public class Main {
    public static void main(String[] args) {
        byte x = -1;
        byte y = 127;
        System.out.println(Byte.toUnsignedInt(x)); // 255
        System.out.println(Byte.toUnsignedInt(y)); // 127
    }
}

```


因为`byte`的`-1`的二进制表示是`11111111`，以无符号整型转换后的`int`就是`255`。

类似的，可以把一个`short`按unsigned转换为`int`，把一个`int`按unsigned转换为`long`。
