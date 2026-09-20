# 包

## 目录

- [包作用域](#包作用域)
- [import](#import)
  - [一](#一)
  - [二](#二)
  - [三](#三)
- [编译查找顺序](#编译查找顺序)
  - [默认导入](#默认导入)
- [编辑器自动导入](#编辑器自动导入)
  - [最佳实践](#最佳实践)
  - [编译和运行](#编译和运行)

* 必须**放在第一行；且只能有一个；全部小写；域名倒叙+ 模块 + 功能**

在Java中，我们使用`package`来解决名字冲突。

Java定义了一种名字空间，称之为包：`package`。**一个类总是属于某个包**，类名（比如`Person`）**只是一个简写，真正的完整类名是**\*\*`包名.类名`。\*\*​

例如：

小明的`Person`类存放在包`ming`下面，因此，完整类名是`ming.Person`；

小红的`Person`类存放在包`hong`下面，因此，完整类名是`hong.Person`；

小军的`Arrays`类存放在包`mr.jun`下面，因此，完整类名是`mr.jun.Arrays`；

JDK的`Arrays`类存放在包`java.util`下面，因此，完整类名是`java.util.Arrays`。

在定义`class`的时候，我们需要在第一行声明这个`class`属于哪个包。

小明的`Person.java`文件：

```java 
package ming; // 申明包名ming

public class Person {
}

```


在**Java虚拟机执行的时候，JVM只看完整类名，因此，只要包名不同，类就不同。**

包可以是多层结构，用`.`隔开。例如：`java.util`。

> 特别注意： **包没有父子关系。java.util和java.util.zip是不同的包，两者没有任何继承关系。**

没有定义包名的`class`，它使用的是默认包，非常容易引起名字冲突，因此，不推荐不写包名的做法。

我们还需要按照包结构把上面的Java文件组织起来。假设以`package_sample`作为根目录，`src`作为源码目录，那么所有文件结构就是：

![](./image/image_4bNKcPfrJg.png)

即所有Java文件对应的目录层次要和包的层次一致。

编译后的`.class`文件**也需要按照包结构存放**。如果使用IDE，把编译后的`.class`文件放到`bin`目录下，那么，编译的文件结构就是：

![](./image/image_SVmb7F1X6S.png)

### 包作用域

**位于同一个包的类，可以访问包作用域的字段和方法。不用**`public`、`protected`、`private`**修饰的字段和方法就是包作用域**。例如，`Person`类定义在`hello`包下面：

### import

在一个`class`中，我们总会引用其他的`class`。例如，小明的`ming.Person`类，如果要引用小军的`mr.jun.Arrays`类，他有三种写法：

#### 一

第一种，直接写出完整类名，例如：

```java 
// Person.java
package ming;

public class Person {
    public void run() {
         // 写完整类名: mr.jun.Arrays
        mr.jun.Arrays arrays = new mr.jun.Arrays(); 
    }
}
```


很显然，每次写完整类名比较痛苦。

#### 二

因此，第二种写法是用`import`语句，导入小军的`Arrays`，然后写简单类名：

```java 
// Person.java
package ming;

 // 导入完整类名:
import mr.jun.Arrays; 

public class Person {
    public void run() {
        // 写简单类名: Arrays
        Arrays arrays = new Arrays();
    }
}
```


在写`import`的时候，可以使用`*`，**表示把这个包下面的所有**\*\*`class`****都导入进来（但不包括子包的****`class`）：\*\*​

```java 
// Person.java
package ming;

 // 导入mr.jun包的所有class:
import mr.jun.*; 

public class Person {
    public void run() {
        Arrays arrays = new Arrays();
    }
}
```


我们一般不推荐这种写法，**因为在导入了多个包后，很难看出**\*\*`Arrays`\*\***类属于哪个包。**

#### 三

还有一种`import static`的语法，它可以导入一个类的静态字段和静态方法：

```java 
package main;

 // 导入System类的所有静态字段和静态方法:
import static java.lang.System.*;
 
public class Main {
    public static void main(String[] args) {
        // 相当于调用System.out.println(…)
        out.println("Hello, world!");
    }
}
```


`import static`很少使用。

# 编译查找顺序

Java编译器最终编译出的`.class`文件**只使用完整类名**，因此，在代码中，当编译器遇到一个`class`名称时：

- **如果是完整类名，就直接根据完整类名查找这个**\*\*`class`；\*\*​
- **如果是简单类名，按下面的顺序依次查找：**
  - 查找当前`package`是否存在这个`class`；
  - 查找`import`的包是否包含这个`class`；
  - 查找`java.lang`包是否包含这个`class`。

**如果按照上面的规则还无法确定类名，则编译报错。**

```java 
// Main.java
package test;

import java.text.Format;

public class Main {
    public static void main(String[] args) {
        java.util.List list; // ok，使用完整类名 -> java.util.List
        Format format = null; // ok，使用import的类 -> java.text.Format
        String s = "hi"; // ok，使用java.lang包的String -> java.lang.String
        System.out.println(s); // ok，使用java.lang包的System -> java.lang.System
        MessageFormat mf = null; // 编译错误：无法找到MessageFormat: MessageFormat cannot be resolved to a type
    }
}

```


## 默认导入

**因此，编写class的时候，编译器会自动帮我们做两个import动作：**

- **默认自动**\*\*`import`****当前****`package`****的其他****`class`；\*\*​
- **默认自动**\*\*`import java.lang.*`。\*\*​

> **注意：自动导入的是java.lang包，但类似java.lang.reflect这些包仍需要手动导入。**

如果有两个`class`名称相同，例如，`mr.jun.Arrays`和`java.util.Arrays`，**那么只能**\*\*`import`\*\***其中一个，另一个必须写完整类名。**

# 编辑器自动导入

**lang 不需要导入；** ​**不同包才需要导入**；

![](./image/image_Mrtvzd9toD.png)

### 最佳实践

为了避免名字冲突，**我们需要确定唯一的包名。推荐的做法是使用倒置的域名来确保唯一性。例如**：

- org.apache
- org.apache.commons.log
- com.liaoxuefeng.sample

子包就可以根据功能自行命名。

要注意不要和`java.lang`包的类重名，即自己的类不要使用这些名字：

- String
- System
- Runtime
- ...

要注意也不要和JDK常用类重名：

- java.util.List
- java.text.Format
- java.math.BigInteger
- .

### 编译和运行

假设我们创建了如下的目录结构：

![](./image/image_HSrI8cECA2.png)

其中，`bin`目录用于存放编译后的`class`文件，`src`目录按包结构存放Java源码；我们怎么一次性编译这些Java源码呢？

编译`src`目录下的所有Java文件：

```bash 
$ javac -d ./bin src/**/*.java

```


**命令行**\*\*`-d`****指定输出的****`class`****文件存放****`bin`****目录，后面的参数****`src/**/*.java`****表示****`src`****目录下的所有****`.java`\*\***文件，包括任意深度的子目录。**

注意：Windows不支持`**`这种搜索全部子目录的做法，所以在Windows下编译必须依次列出所有`.java`文件：

```bash 
C:\work> javac -d bin src\com\itranswarp\sample\Main.java src\com\itranswarp\world\Persion.java

```


如果编译无误，则`javac`命令没有任何输出。可以在`bin`目录下看到如下`class`文件：

![](./image/image_5kLqiJNXKV.png)

现在，我们就可以直接运行`class`文件了。根据当前目录的位置确定classpath，例如，当前目录仍为`work`，则classpath为`bin`或者`./bin`：

```java 
$ java -cp bin com.itranswarp.sample.Main 
Hello, world!

```


![](./image/image_Mrtvzd9toD.png)
