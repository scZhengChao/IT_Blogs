# protected

继承有个特点，就是子类无法访问父类的`private`字段或者`private`方法。例如，`Student`类就无法访问`Person`类的`name`和`age`字段：

```java 
class Person {
    private String name;
    private int age;
}

class Student extends Person {
    public String hello() {
        return "Hello, " + name; // 编译错误：无法访问name字段
    }
}

```


这使得继承的作用被削弱了。为了让子类可以访问父类的字段，我们需要把`private`改为`protected`。**用**\*\*`protected`\*\***修饰的字段可以被子类访问：**

```java 
class Person {
    protected String name;
    protected int age;
}

class Student extends Person {
    public String hello() {
        return "Hello, " + name; // OK!
    }
}

```


因此，`protected`关键字可以把字段和方法的**访问权限控制在继承树内部**，一个`protected`字段和方法可以**被其子类，以及子类的子类所访问，** 后面我们还会详细讲解。
