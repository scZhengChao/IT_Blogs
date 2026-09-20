# 编写第1个XML文件

## 目录

- [需求](#需求)
- [效果](#效果)
- [步骤](#步骤)

#### 需求

编写xml文档，用于描述人员信息，person代表一个人员，id是人员的属性代表人员编号。人员信息包括age年龄、name姓名、sex性别信息。

使用Java类去描述：

```java 
class Person{
  String id;
  int age;
  String name;
  String sex;
}
Person p = new Person("1","张三",18,"男");

```


#### 效果

![](./image/image_wV9V_9wciU.png)

#### 步骤

1. 选择当前**项目鼠标右键新建**

   新建一个File命名时，以 .xml结尾。这个文件就是xml文件

![](./image/image_OhdLRC14SB.png)

1. 通过浏览器解析XML的内容

   ![](./image/image_eOXEg8_j7Z.png)

- **注：**XML以后通过Java来进行解析，很少直接在浏览器上显示**。**

**小结：**

- xml文件，通常以.xml作为后缀名
- xml文件**中的首行必须书写： \<?xml version="1.0" encoding="UTF-8" ?> （固定写法）**
- xml文件通常是**由成对标签（开始标签、结束标签）组成**
