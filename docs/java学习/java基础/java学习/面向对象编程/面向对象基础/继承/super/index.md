# super

## 目录

- [作为对象](#作为对象)
- [作为函数](#作为函数)
- [super 和this](#super-和this)

`super`关键字表示父类（超类）。**子类引用父类的字段时，可以用**\*\*`super.fieldName`\*\*。例如：

```java 
class Student extends Person {
    public String hello() {
        return "Hello, " + super.name;
    }
}

```


实际上，这里使用`super.name`，或者`this.name`，或者`name`，效果都是一样的。编译器会自动定位到父类的`name`字段。

**但是，在某些时候，就必须使用**\*\*`super`。我们来看一个例子：\*\*​

```java 
// super
public class Main {
    public static void main(String[] args) {
        Student s = new Student("Xiao Ming", 12, 89);
    }
}

class Person {
    protected String name;
    protected int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

class Student extends Person {
    protected int score;

    public Student(String name, int age, int score) {
        this.score = score;
    }
}

```


运行上面的代码，会得到一个编译错误，大意是在`Student`的构造方法中，无法调用`Person`的构造方法。

这是因为在Java中，任何`class`的构造方法，**第一行语句必须是调用父类的构造方法。如果没有明确地调用父类的构造方法，编译器会帮我们自动加一句**`super();`，所以，`Student`类的构造方法实际上是这样：

```java 
class Student extends Person {
    protected int score;

    public Student(String name, int age, int score) {
        super(); // 自动调用父类的构造方法
        this.score = score;
    }
}

```


但是，`Person`类**并没有无参数的构造方法，因此，编译失败。**

**解决方法是调用**\*\*`Person`\*\***类存在的某个构造方法。例如：**

```java 
class Student extends Person {
    protected int score;

    public Student(String name, int age, int score) {
        super(name, age); // 调用父类的构造方法Person(String, int)
        this.score = score;
    }
}

```


这样就可以正常编译了！

因此我们得出结论：如果**父类没有默认的构造方法，子类就必须显式调用**`super()`**并给出参数以便让编译器定位到父类的一个合适的构造方法。**

这里还顺带引出了另一个问题：即**子类\_不会继承\_任何父类的构造方法**。子类默认的**构造方法是编译器自动生成的，不是继承的。**

# 作为对象

> `super`作为的对象时；**表示父类的引用**

# 作为函数

> super 作为函数；**表示父类的构造函数**； 必须放在**类子构造函数的有效第一行**

# super 和this

- `super` 和 `t`\*\*`his`\*\*​**都不能在static 中调用**
- \*\*`this`\*\***作为函数；放在构造函数里**；表示本类的构造函数；
- `this` 和 `super` \*\* 作为函数 只能存在一个\*\*；**都要抢占构造****函数的第一行的位置****；**
- 构造函数调用时；`this` 和 `super` **不能同时出现**

![](./assets/image/image_CBj14zDe0k.png)

this和super同属于对象，区别在于：

- this:代表本类对象的引用；
- super:代表父类存储空间（何以看做成父类对象）

| 关键字   | 访问成员变量     | 访问成员方法       | 访问构造方法    |
| ----- | ---------- | ------------ | --------- |
| this  | this.成员变量  | this.成员方法()  | this(..)  |
| super | super.成员变量 | super.成员方法(） | super(.…） |
