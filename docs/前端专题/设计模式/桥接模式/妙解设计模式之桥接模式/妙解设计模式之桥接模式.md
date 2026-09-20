# 妙解设计模式之桥接模式

## 目录

- [桥接模式的概念](#桥接模式的概念)
  - [生活中的例子](#生活中的例子)
  - [编程中的例子](#编程中的例子)
- [软件工程中的实际应用](#软件工程中的实际应用)
  - [1.图形绘制系统](#1图形绘制系统)
  - [2.数据库驱动程序](#2数据库驱动程序)
  - [3.文件系统抽象](#3文件系统抽象)
  - [4.用户界面主题](#4用户界面主题)

# 桥接模式的概念

桥接模式（Bridge Pattern）是一种结构型设计模式，用于将**抽象部分和实现部分分离**，使它们**可以独立变化**。**这种模式通过组合而不是继承来实现这个目标**，从而**提高系统的灵活性和可扩展性**。

1. **抽象部分**：定义抽象类，并包含一个对实现部分接口的引用。
2. **实现部分**：定义接口，具体的实现类实现这个接口。
3. **分离**：抽象部分和实现部分独立变化，彼此之间没有直接依赖关系。

> 为什么需要桥接模式？

- **避免继承层次过深**：当类的继承层次过深时，修改和扩展变得非常困难。桥接模式通过组合方式解决这个问题。
- **提高灵活性**：抽象和实现部分可以独立地扩展，不会相互影响。
- **遵循开闭原则**：对扩展开放，对修改关闭。桥接模式使得我们在不修改现有代码的基础上进行扩展。

> 桥接模式的结构

- **Abstraction（抽象类）** ：定义高层的控制逻辑，包含一个实现部分的引用。
- **RefinedAbstraction（扩充抽象类）** ：扩展抽象类，提供具体的业务逻辑。
- **Implementor（实现接口）** ：定义实现部分的接口，声明实现类需要实现的方法。
- **ConcreteImplementor（具体实现类）** ：实现实现接口，提供具体的实现。

## 生活中的例子

想象一下，你家里有很多种不同的电视机，比如索尼电视和三星电视。每个电视机都有不同的遥控器。这时候，你会觉得很麻烦，因为每次换电视机都要换遥控器。

如果我们能有一种万能遥控器，不管电视机是什么品牌，只要有这个遥控器就能控制所有的电视机，那就方便多了。桥接模式就像这个万能遥控器，让我们可以用一个遥控器控制不同的电视机。

> 例子：玩具遥控车

假设我们有一个玩具遥控车系统，有不同的车子（红色车、蓝色车）和不同的遥控器（简单遥控器、高级遥控器）。

**定义车子**

```java 
// 车子接口
interface Car {
    void drive();
}
​
// 红色车子
class RedCar implements Car {
    @Override
    public void drive() {
        System.out.println("红色车子在开");
    }
}
​
// 蓝色车子
class BlueCar implements Car {
    @Override
    public void drive() {
        System.out.println("蓝色车子在开");
    }
}

```


**定义遥控器**

```java 
// 遥控器抽象类
abstract class RemoteControl {
    protected Car car;
​
    protected RemoteControl(Car car) {
        this.car = car;
    }
​
    public abstract void pressButton();
}
​
// 简单遥控器
class SimpleRemoteControl extends RemoteControl {
    public SimpleRemoteControl(Car car) {
        super(car);
    }
​
    @Override
    public void pressButton() {
        car.drive();
    }
}
​
// 高级遥控器
class AdvancedRemoteControl extends RemoteControl {
    public AdvancedRemoteControl(Car car) {
        super(car);
    }
​
    @Override
    public void pressButton() {
        car.drive();
        System.out.println("高级遥控器还可以做更多的事情");
    }
}

```


**测试**

```java 
public class Main {
    public static void main(String[] args) {
        Car redCar = new RedCar();
        Car blueCar = new BlueCar();
​
        RemoteControl simpleRemote = new SimpleRemoteControl(redCar);
        simpleRemote.pressButton(); // 红色车子在开
​
        RemoteControl advancedRemote = new AdvancedRemoteControl(blueCar);
        advancedRemote.pressButton(); // 蓝色车子在开，高级遥控器还可以做更多的事情
    }
}

```


## 编程中的例子

假设我们在做一个图形绘制程序，支持绘制不同形状（如圆形和矩形），并且这些形状可以有不同的颜色（如红色和蓝色）。

我们可以使用桥接模式来实现，这样就能让形状和颜色独立变化，增加新的形状或颜色时不需要修改现有代码。

**定义颜色接口（实现部分）**

```java 
// 颜色接口
interface Color {
    void applyColor();
}
​
// 红色实现
class RedColor implements Color {
    @Override
    public void applyColor() {
        System.out.println("Applying red color.");
    }
}
​
// 蓝色实现
class BlueColor implements Color {
    @Override
    public void applyColor() {
        System.out.println("Applying blue color.");
    }
}

```


**定义形状抽象类（抽象部分）**

```typescript 
// 抽象类：形状
abstract class Shape {
    protected Color color;
​
    protected Shape(Color color) {
        this.color = color;
    }
​
    public abstract void draw();
}

```


**扩展具体的形状类（扩展抽象部分）**

```java 
// 圆形
class Circle extends Shape {
    public Circle(Color color) {
        super(color);
    }
​
    @Override
    public void draw() {
        System.out.print("Drawing Circle in ");
        color.applyColor();
    }
}
​
// 矩形
class Rectangle extends Shape {
    public Rectangle(Color color) {
        super(color);
    }
​
    @Override
    public void draw() {
        System.out.print("Drawing Rectangle in ");
        color.applyColor();
    }
}

```


> 优点

1. **独立变化**：我们可以独立地增加新的颜色（如绿色、黄色）或新的形状（如三角形），而无需修改现有的代码。
2. **灵活组合**：形状和颜色可以自由组合，形成各种不同的组合方式。
3. **易于扩展**：遵循开闭原则，对扩展开放，对修改关闭。

# 软件工程中的实际应用

桥接模式在软件工程中有很多实际应用，特别是当我们需要在两个或多个维度上扩展一个系统时。

## 1.图形绘制系统

在图形绘制系统中，形状和颜色是两个独立变化的维度。使用桥接模式可以让形状和颜色独立变化。我们之前的例子已经展示了这一点。

## 2.数据库驱动程序

在数据库应用中，不同的数据库（如`MySQL`、`PostgreSQL`、`Oracle`）有不同的连接方式和查询方式。桥接模式可以将数据库连接和查询抽象出来，使得应用程序可以独立地切换数据库而不需要大量修改代码。

```java 
// 实现接口：数据库连接
interface DatabaseConnection {
    void connect();
}
​
// 具体实现类：MySQL连接
class MySQLConnection implements DatabaseConnection {
    @Override
    public void connect() {
        System.out.println("Connecting to MySQL Database.");
    }
}
​
// 具体实现类：PostgreSQL连接
class PostgreSQLConnection implements DatabaseConnection {
    @Override
    public void connect() {
        System.out.println("Connecting to PostgreSQL Database.");
    }
}
​
// 抽象类：数据库操作
abstract class DatabaseOperation {
    protected DatabaseConnection connection;
​
    protected DatabaseOperation(DatabaseConnection connection) {
        this.connection = connection;
    }
​
    public abstract void execute();
}
​
// 具体操作类：查询操作
class QueryOperation extends DatabaseOperation {
    public QueryOperation(DatabaseConnection connection) {
        super(connection);
    }
​
    @Override
    public void execute() {
        connection.connect();
        System.out.println("Executing query operation.");
    }
}
​
// 测试桥接模式
public class Main {
    public static void main(String[] args) {
        DatabaseConnection mysqlConnection = new MySQLConnection();
        DatabaseOperation queryOperation = new QueryOperation(mysqlConnection);
        queryOperation.execute(); // Connecting to MySQL Database. Executing query operation.
​
        DatabaseConnection postgresqlConnection = new PostgreSQLConnection();
        queryOperation = new QueryOperation(postgresqlConnection);
        queryOperation.execute(); // Connecting to PostgreSQL Database. Executing query operation.
    }
}

```


## 3.文件系统抽象

在处理文件系统时，我们可能需要支持本地文件系统、远程文件系统、云存储等。桥接模式可以将文件操作与具体的文件系统实现分离。

```java 
// 实现接口：文件系统
interface FileSystem {
    void readFile(String path);
    void writeFile(String path, String content);
}
​
// 具体实现类：本地文件系统
class LocalFileSystem implements FileSystem {
    @Override
    public void readFile(String path) {
        System.out.println("Reading file from local file system: " + path);
    }
​
    @Override
    public void writeFile(String path, String content) {
        System.out.println("Writing file to local file system: " + path);
    }
}
​
// 具体实现类：云存储文件系统
class CloudFileSystem implements FileSystem {
    @Override
    public void readFile(String path) {
        System.out.println("Reading file from cloud file system: " + path);
    }
​
    @Override
    public void writeFile(String path, String content) {
        System.out.println("Writing file to cloud file system: " + path);
    }
}
​
// 抽象类：文件操作
abstract class FileOperation {
    protected FileSystem fileSystem;
​
    protected FileOperation(FileSystem fileSystem) {
        this.fileSystem = fileSystem;
    }
​
    public abstract void performRead(String path);
    public abstract void performWrite(String path, String content);
}
​
// 具体操作类：文件读写操作
class ReadWriteOperation extends FileOperation {
    public ReadWriteOperation(FileSystem fileSystem) {
        super(fileSystem);
    }
​
    @Override
    public void performRead(String path) {
        fileSystem.readFile(path);
    }
​
    @Override
    public void performWrite(String path, String content) {
        fileSystem.writeFile(path, content);
    }
}
​
// 测试桥接模式
public class Main {
    public static void main(String[] args) {
        FileSystem localFileSystem = new LocalFileSystem();
        FileOperation fileOperation = new ReadWriteOperation(localFileSystem);
        fileOperation.performRead("local_path.txt"); // Reading file from local file system: local_path.txt
        fileOperation.performWrite("local_path.txt", "content"); // Writing file to local file system: local_path.txt
​
        FileSystem cloudFileSystem = new CloudFileSystem();
        fileOperation = new ReadWriteOperation(cloudFileSystem);
        fileOperation.performRead("cloud_path.txt"); // Reading file from cloud file system: cloud_path.txt
        fileOperation.performWrite("cloud_path.txt", "content"); // Writing file to cloud file system: cloud_path.txt
    }
}
​

```


## 4.用户界面主题

在用户界面开发中，不同的控件（如按钮、文本框）可以有不同的主题（如浅色主题、深色主题）。桥接模式可以将控件和主题分离，使得它们可以独立变化。

```java 
// 实现接口：主题
interface Theme {
    void applyTheme();
}
​
// 具体实现类：浅色主题
class LightTheme implements Theme {
    @Override
    public void applyTheme() {
        System.out.println("Applying light theme.");
    }
}
​
// 具体实现类：深色主题
class DarkTheme implements Theme {
    @Override
    public void applyTheme() {
        System.out.println("Applying dark theme.");
    }
}
​
// 抽象类：控件
abstract class UIComponent {
    protected Theme theme;
​
    protected UIComponent(Theme theme) {
        this.theme = theme;
    }
​
    public abstract void display();
}
​
// 具体控件类：按钮
class Button extends UIComponent {
    public Button(Theme theme) {
        super(theme);
    }
​
    @Override
    public void display() {
        System.out.print("Displaying button with ");
        theme.applyTheme();
    }
}
​
// 具体控件类：文本框
class TextBox extends UIComponent {
    public TextBox(Theme theme) {
        super(theme);
    }
​
    @Override
    public void display() {
        System.out.print("Displaying textbox with ");
        theme.applyTheme();
    }
}
​
// 测试桥接模式
public class Main {
    public static void main(String[] args) {
        Theme lightTheme = new LightTheme();
        UIComponent button = new Button(lightTheme);
        button.display(); // Displaying button with Applying light theme.
​
        Theme darkTheme = new DarkTheme();
        UIComponent textBox = new TextBox(darkTheme);
        textBox.display(); // Displaying textbox with Applying dark theme.
    }
}

```
