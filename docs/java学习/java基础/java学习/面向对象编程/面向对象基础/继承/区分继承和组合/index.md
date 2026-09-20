# 区分继承和组合

在使用继承时，我们要注意逻辑一致性。

考察下面的`Book`类：

```java 
class Book {
    protected String name;
    public String getName() {...}
    public void setName(String name) {...}
}

```


这个`Book`类也有`name`字段，那么，我们能不能让`Student`继承自`Book`呢？

```typescript 
class Student extends Book {
    protected int score;
}

```


显然，从逻辑上讲，这是不合理的，`Student`不应该从`Book`继承，而应该从`Person`继承。

究其原因，是因为`Student`是`Person`的一种，它们是is关系，而`Student`并不是`Book`。实际上`Student`和`Book`的关系是has关系。

具\*\*有has关系不应该使用继承，而是使用组合，即`Student`****可以持有一个****`Book`\*\*实例：

```typescript 
class Student extends Person {
    protected Book book;
    protected int score;
}

```


**因此，继承是is关系，组合是has关系。**
