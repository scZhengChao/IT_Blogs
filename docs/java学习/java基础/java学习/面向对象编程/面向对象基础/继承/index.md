# 继承

- 只能继承一个父类
- 子类可以访问**父类非私有成员**；

继承是面向对象编程中非常强大的一种机制，它首先**可以复用代码**。当我们让`Student`从`Person`继承时，`Student`就获得了`Person`的所有功能，我们只需要为`Student`编写新增的功能。

Java使用`extends`关键字来实现继承：

```java 
class Person {
    private String name;
    private int age;

    public String getName() {...}
    public void setName(String name) {...}
    public int getAge() {...}
    public void setAge(int age) {...}
}

class Student extends Person {
    // 不要重复name和age字段/方法,
    // 只需要定义新增score字段/方法:
    private int score;

    public int getScore() { … }
    public void setScore(int score) { … }
}

```


可见，通过继承，`Student`只需要编写额外的功能，不再需要重复代码。

> **注意:子类自动获得了父类的所有字段，严禁定义与父类重名的字段**！

在OOP的术语中，我们把`Person`称为`超类（super class），父类（parent class），基类（base class）`，把`Student`称为`子类（subclass），扩展类（extended class）`。

[继承树](./继承树/index.md "继承树")

[protected](./protected/index.md "protected")

[super](IT/服务端/java学习/java基础/java学习/面向对象编程/面向对象基础/继承/super/super.md "super")

[阻止继承](./阻止继承/index.md "阻止继承")

[向上转型](./向上转型/index.md "向上转型")

[向下转型](./向下转型/index.md "向下转型")

[转型注意instance](./转型注意instance/index.md "转型注意instance")

[区分继承和组合](./区分继承和组合/index.md "区分继承和组合")
