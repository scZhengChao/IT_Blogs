# final

继承可以允许子类覆写父类的方法。如果**一个父类不允许子类对它的某个方法进行覆写**，可以把该方法标记为`final`。用`final`修饰的方法不能被`Override`：

```java 
class Person {
    protected String name;
    public final String hello() {
        return "Hello, " + name;
    }
}

class Student extends Person {
    // compile error: 不允许覆写
    @Override
    public String hello() {
    }
}

```


如果一个类不希望任何其他类继承自它，那么可以把**这个类本身标记为final。用final修饰的类不能被继承**：

对于一个类的实例字段，同样可以用`final`修饰。用`final`**修饰的字段在初始化后不能被修改。** 例如：

```java 
class Person {
    public final String name = "Unamed";
}

```


对`final`字段重新赋值会报错：

```java 
Person p = new Person();
p.name = "New Name"; // compile error!

```


**可以在构造方法中初始化final字段：**

```java 
class Person {
    public final String name;
    public Person(String name) {
        this.name = name;
    }
}

```


这种方法更为常用，因为**可以保证实例一旦创建**，其`final`**字段就不可修改。**
