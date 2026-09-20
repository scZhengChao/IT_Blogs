# 3 Dom4J结合XPath解析XML（了解）

## 目录

- [3.1 介绍](#31-介绍)
- [3.2 XPath使用步骤](#32-XPath使用步骤)
- [3.3 XPath语法(了解)](#33-XPath语法了解)
  - [3.3.1 绝对路径表达式(了解)](#331-绝对路径表达式了解)
- [3.2 相对路径表达式(了解)](#32-相对路径表达式了解)
- [3.3 全文搜索路径表达式(了解)](#33-全文搜索路径表达式了解)
- [3.4 谓语（条件筛选 了解）](#34-谓语条件筛选-了解)
- [案例](#案例)

#### 3.1 介绍

XPath使用**路径表达式**来选取XML/HTML 文档中的元素节点或属性节点。节点是通过沿着路径 (path) 来选取的。XPath在解析XML/HTML文档方面提供了一独树一帜的路径思想。

#### 3.2 XPath使用步骤

步骤1：导入jar包(**dom4j和jaxen-1.1-beta-6.jar)**

步骤2：通过`dom4j`的`SaxReader`获取`Document`对象

步骤3： 利用`Xpath`提供的`api`,结合`xpath`的\*\*语法完成选取`XML`\*\***文档元素节点进行解析操作。**

Node接口中存在以下方法：

| 方法                                              | 作用                |
| ----------------------------------------------- | ----------------- |
| \`List\<Element> selectNodes("\`\`路径表达式\`\`")\` | **获取符合表达式的元素集合**​ |
| \`Element selectSingleNode("\`\`路径表达式\`\`")\`   | **获取符合表达式的唯一元素**​ |

我们熟知的Document，Element等都是Node的子类型，因此也能使用上述selectNode的方法。如下图

![](./assets/image/image_mN13k_8Hd2.png)

#### 3.3 XPath语法(了解)

XPath也是一种解析XML或者HTML的方式。

- XPath表达式，就是用于选取XML文档中节点的表达式字符串。获取XML文档节点元素一共有如下4种XPath语法方式：
  1. **绝对路径表达式方式**\*\* 例如: /元素/子元素/子子元素...\*\* ​
  2. **相对路径表达式方式**\*\* 例如: 子元素/子子元素.. 或者 ./子元素/子子元素..\*\* ​
  3. **全文搜索路径表达式方式**\*\* 例如: //子元素//子子元素\*\*​
  4. **谓语（条件筛选）方式 例如: //元素\[@attr]**;**//元素\[@attr=value]**

在xml解析得到的一个文档对象中，`Document`，`Element`，`Attribute`，`Text` ，都是接口Node的子类型。

Node中存在两个方法，可以结合xpath使用查询节点：

```java 
List<Node>  selecteNodes(路径) ：将所有满足路径的节点给获取出来
Node  selecteSingleNode(路径) ：获取单个满足路径的节点

```


xpath使用步骤：

1. 创建`SAXReader`对象，调用`read`方法，关联`xml`文件。得到`Document`对象
2. 就可以使用`Document`对象来调用方法传入`xpath`路径

##### 3.3.1 绝对路径表达式(了解)

**格式：**

```xml 
String xpath="/根元素/子元素/子子元素...";

```


绝对路径是以“/”开头，一级一级描述标签的层级路径就是绝对路径，***这里注意不可以跨层级***

- 演示需求(将素材中的Contact.xml拷贝到项目中)

```java 
采用绝对路径获取从根节点开始逐层的查找name节点列表并打印信息
String path="/contactList/contact/name";

```


实现步骤：

1. 先创建`SAXReader`对象，调用`read`方法，将`Contact.xml`关联，得到`Document`对象
2. 定义绝对路径
3. 调用selectedNodes

```java 
public class Demo01 {
    public static void main(String[] args) throws DocumentException {
        //采用绝对路径获取从根节点开始逐层的查找name节点列表并打印信息

        //1. 先创建SAXReader对象，调用read方法，将Contact.xml关联，得到Document对象
        SAXReader sr = new SAXReader();
        Document doc = sr.read("day15/xml/Contact.xml");
        //2. 定义绝对路径
        String xpath = "/contactList/contact/name";
        //3. 调用selectedNodes
        List<Node> nameNodes = doc.selectNodes(xpath);

        for (Node nameNode : nameNodes) {
            String text = nameNode.getText();
            System.out.println("text = " + text);
        }

    }
}

text = 潘金莲
text = 武松
text = 武大狼

```


#### 3.2 相对路径表达式(了解)

- 相对路径介绍

  格式：

```javascript 
String xpath2="./子元素/子子元素";        // "./"代表当前元素路径位置

```


- 需求：
  先采用绝对路径获取 contact 节点 再采用相对路径获取下一级name子节点并打印信息。

```java 
public class Demo01 {
    public static void main(String[] args) throws DocumentException {
        //先采用绝对路径获取 contact  节点 再采用相对路径获取下一级name子节点并打印信息。
        //1. 先创建SAXReader对象，调用read方法，将Contact.xml关联，得到Document对象
        SAXReader sr = new SAXReader();
        Document doc = sr.read("day15/xml/Contact.xml");

        //先使用绝对路径，获取contact
        List<Node> contactNodes = doc.selectNodes("/contactList/contact");
        for (Node contactNode : contactNodes) {
            //使用相对路径获取name,并获取文本打印

            Node node = contactNode.selectSingleNode("./name");
            System.out.println("node.getText() = " + node.getText());

        }

    }
}


node.getText() = 潘金莲
node.getText() = 武松
node.getText() = 武大狼* 

```


#### 3.3 全文搜索路径表达式(了解)

- 全文搜索路径介绍

  格式：

```xml 
String xpath1="//子元素//子子元素";

```


- “/”符号，代表逐级写路径

  “//”符号，不用逐级写路径，可以直接选取到对应的节点，是全文搜索匹配的不需要按照逐层级

  举例\*\* | **说明** |
  \| ------------------- | ---------------------------------------------------------- |
  \| **//contact** | 找contact元素，无论元素在哪里 |
  \| **//contact/name** | 找contact，无论在哪一级，但name一定是contact的子节点 |
  \| **//contact//name** | contact无论在哪一种，name只要是contact的子孙元素都可以找到 |
  \| **//name** | |
- 需求：直接全文搜索所有的 name元素并打印

```java 
public class Demo01 {
    public static void main(String[] args) throws DocumentException {
        //需求：直接全文搜索所有的 name元素并打印
        //1. 先创建SAXReader对象，调用read方法，将Contact.xml关联，得到Document对象
        SAXReader sr = new SAXReader();
        Document doc = sr.read("day15/xml/Contact.xml");

        List<Node> nodes = doc.selectNodes("//name");
        for (Node node : nodes) {
            System.out.println("node.getText() = " + node.getText());
        }

    }
}

```


结论：

```markdown 
/ 表示根节点 （不能跨层级）
// 表示全文任意节点 （可以跨层级）


```


#### 3.4 谓语（条件筛选 了解）

- 介绍

  谓语，又称为条件筛选方式，就是根据条件过滤判断进行选取节点

  格式：

```java 
String xpath1="//元素[@属性名]";//查找元素对象，全文中只要含有该属性名的元素
String xpath2="//元素[@属性名=value]";//查找元素对象，全文中只要含有该属性，并指定的值

```


- 需求：查找含有id属性的contact元素

```java 
public class Demo01 {
    public static void main(String[] args) throws DocumentException {
        //查找含有id属性的contact元素
        SAXReader sr = new SAXReader();
        Document doc = sr.read("day15/xml/Contact.xml");

        //List<Node> nodes = doc.selectNodes("//contact[@id]");//获取含有属性id的元素
        List<Node> nodes = doc.selectNodes("//contact[@id=1]");//获取含有属性并且值为1的元素
        for (Node node : nodes) {
            //将节点，先转换Element
            Element contact = (Element) node;
            System.out.println("contact.elementText(\"name\") = " + contact.elementText("name"));
        }

    }
} 

```


**小结**

- 在xpath解析xml方式中，最核心的就是使用了"路径表达式"
  - xpath是利用"路径表达式"实现对xml文件的解析
- 路径表达式的语法：
  1. 绝对路径表达式

```xml 
/根元素/子元素/子子元素/....   (一层一层查找)

```


1. 相对路径表达式

```xml 
./子元素/子子元素/.....

```


1. 全文搜索路径表达式

```javascript 
//元素     (会跨层级进行全文查找)

```


1. 条件筛选表达式

```xml 
//元素[@属性名]
//元素[@属性名=属性值]

```


# 案例

```java 
package com.itheima.xpath;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;
import org.junit.Test;

import java.util.List;

public class XpathTest1 {


    //条件筛选路径表达式
    @Test
    public void test4() throws DocumentException {
        //加载xml文档，创建Document对象
        Document doc = new SAXReader().read("src/Contact.xml");

        //条件筛选路径表达式
        String  path = "//contact[@id=2]";

        //根据路径表达式，去xml文档中检查符合路径的所有元素
        List<Node> nodeList = doc.selectNodes(path);

        for (Node node : nodeList) {
            //获取元素上的id属性值
             Element element =(Element) node;//把Node类型（父类型）强制转换为Element类型（子类型）
             String id = element.attributeValue("id");
            System.out.println("id="+id);

            String nameText = element.elementText("name");
            System.out.println(nameText);
        }
    }



    //全文搜索路径表达式
    @Test
    public void test3() throws DocumentException {
        //加载xml文档，创建Document对象
        Document doc = new SAXReader().read("src/Contact.xml");

        //全文搜索路径表达式
         String  path = "//contact//name";
 
        //根据路径表达式，去xml文档中检查符合路径的所有元素
        List<Node> nodeList = doc.selectNodes(path);

        for (Node node : nodeList) {
            System.out.println(node.getText());
        }
    }


    //相对路径表达式
    @Test
    public void test2() throws DocumentException {
        //加载xml文档，创建Document对象
        Document doc = new SAXReader().read("src/Contact.xml");
        String  path = "/contactList/contact";//绝对路径表达式

        //根据路径表达式，去xml文档中检查符合路径的所有元素
        List<Node> nodeList = doc.selectNodes(path);

        for (Node node : nodeList) {

            //相对路径表达式
            path = "./name";

             Node nameEl = node.selectSingleNode(path);
             System.out.println(nameEl.getText());
        }
    }



    //绝对路径表达式
    @Test
    public void test1() throws DocumentException {
        //加载xml文档，创建Document对象
        Document doc = new SAXReader().read("src/Contact.xml");

        //路径表达式（绝对路径）
        String  path = "/contactList/contact/name";

        //根据路径表达式，去xml文档中检查符合路径的所有元素
         List<Node> nodeList = doc.selectNodes(path); 

        for (Node node : nodeList) {
            String text = node.getText();
            System.out.println(text);
        }
    }
}
```
