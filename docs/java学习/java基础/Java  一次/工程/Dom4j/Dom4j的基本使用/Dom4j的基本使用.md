# Dom4j的基本使用

## 目录

- [2.1 DOM解析原理及结构模型](#21-DOM解析原理及结构模型)
- [2.2 常用的方法](#22-常用的方法)
  - [SAXReader对象](#SAXReader对象)
  - [Document对象](#Document对象)
  - [Element对象](#Element对象)
- [2.3 方法演示](#23-方法演示)
  - [需求二：](#需求二)

#### 2.1 DOM解析原理及结构模型

**解析原理**

将整个XML文档加载到内存，生成一个DOM树，并获得一个Document对象，通过Document对象就可以对DOM树进行操作。以下面books.xml文档为例。

```xml 
<?xml version="1.0" encoding="UTF-8"?>
<books>
    <book id="0001"> <name>JavaWeb开发教程</name>
        <author>张孝祥</author>
        <sale>100.00元</sale>
    </book>
    <book id="0002">
        <name>三国演义</name>
        <author>罗贯中</author>
        <sale>100.00元</sale>
    </book>
</books>
```


**结构模型**

DOM中的核心概念就是节点，在XML文档中的元素、属性、文本，在DOM中都是节点！所有的节点都封装到了Document对象中。

![](image_wJgFTVaU6s.png)

结论：使用Document对象，就可以去访问DOM树中的每一个节点

**引入dom4j的jar包**

去官网下载 zip 包。[http://www.dom4j.org/](http://www.dom4j.org/ "http://www.dom4j.org/")

![](image_aBcBre0eJv.png)

**通常我们会在项目中创建lib文件夹，将需要依赖的库放在这里。**

库导入方式：

1. 在IDEA中，选择项目鼠标右键--->弹出菜单-->open Module settings”-->Dependencies-->+-->JARs or directories... 找到dom4j-1.6.1.jar,成功添加之后点击"OK" 即可。
2. **直接右键选择：Add as Library**

![](image_ZxwYI9NEEU.png)

**小结**

dom4j的解析思想，先把xml文档加载到内存中，从而得到一个DOM树，并创建一个Document对象去维护dom树。

利用Document对象，就可以去解析DOM树（解析XML文件）

#### 2.2 常用的方法

dom4j 必须使用核心类**SaxReader**加载xml文档获得Document，通过Document对象获得文档的根元素，然后就可以操作了。

##### SAXReader对象

| 方法                              | 作用        |
| ------------------------------- | --------- |
| SAXReader sr = new SAXReader(); | 构造器       |
| Document read(String url)       | 加载执行xml文档 |

##### Document对象

| 方法                       | 作用    |
| ------------------------ | ----- |
| Element getRootElement() | 获得根元素 |

##### Element对象

| 方法                                     | 作用                   |
| -------------------------------------- | -------------------- |
| List\ elements(String ele )            | 获得指定名称的所有子元素。可以不指定名称 |
| Element element(String ele)            | 获得指定名称第一个子元素。        |
| String getName()                       | 获得当前元素的元素名           |
| String attributeValue(String attrName) | 获得指定属性名的属性值          |
| String elementText(Sting ele)          | 获得指定名称子元素的文本值        |
| String getText()                       | 获得当前元素的文本内容          |

**小结**

解析xml的步骤：

1. **创建SaxReader对象，调用read方法关联xml文件，得到一个Document对象**
2. **通过Document对象，获取根元素**
3. 获取根元素之后，就**可以层层深剥，运用Element相关的API进行解析其子**元素

#### 2.3 方法演示

复制资料下的常用xml中"books.xml",内容如下:

```xml 
<?xml version="1.0" encoding="UTF-8"?>
<books>
    <book id="0001">
        <name>JavaWeb开发教程</name>
        <author>张孝祥</author>
        <sale>100.00元</sale>
    </book>
    <book id="0002">
        <name>三国演义</name>
        <author>罗贯中</author>
        <sale>100.00元</sale>
    </book>
</books>

```


> 注意:为了便于解析,此xml中没有添加约束

解析此文件,获取每本书的id值,以及书本名称,作者名称和价格.

步骤分析：

1. 创建一个SaxReader对象，调用read方法加载一个xml文件获得文档对象
2. 通过文档对象，获取根元素
3. 通过根元素一层一层的进行解析子元素。

```java 
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import java.util.List;

public class Demo01 {
    public static void main(String[] args) throws DocumentException {
        //1. 创建一个SaxReader对象，调用read方法加载一个xml文件获得文档对象
        SAXReader sr = new SAXReader();
        Document doc = sr.read("day15/xml/book.xml");

        //2. 通过文档对象，获取根元素
        Element rootElement = doc.getRootElement();

        //3. 通过根元素一层一层的进行解析子元素。
        //获取所有的子元素
        List<Element> bookElements = rootElement.elements("book");

        for (Element bookElement : bookElements) {
            //System.out.println(bookElement);
            //解析属性
            String id = bookElement.attributeValue("id");
            System.out.println("id = " + id);
            //获取子元素文本
            String name = bookElement.elementText("name");
            String author = bookElement.elementText("author");
            String sale = bookElement.elementText("sale");
            System.out.println("name = " + name);
            System.out.println("author = " + author);
            System.out.println("sale = " + sale);



            System.out.println("----------------------");
        }

    }
}

```


##### 需求二：

将xml中文件数据解析成为java对象，每个book解析为一个book类型的对象。然后将book对象放到一个集合中存储。

```xml 
<?xml version="1.0" encoding="UTF-8"?>
<books>
    <book id="0001">
        <name>JavaWeb开发教程</name>
        <author>张孝祥</author>
        <sale>100.00元</sale>
    </book>
    <book id="0002">
        <name>三国演义</name>
        <author>罗贯中</author>
        <sale>100.00元</sale>
    </book>
</books>

```


步骤分析：

1. 先创建一个Book类对应book元素
2. 创建一个ArrayList集合用来存储解析后的book对象
3. 创建SaxReader对象，调用read方法加载xml文件，得到文档对象
4. 通过文档对象获取根元素，然后层层解析

代码实现：

```java 
public class Demo02 {
    public static void main(String[] args) throws DocumentException {
        //定义一个集合用来存储解析的Book对象
        ArrayList<Book> books = new ArrayList<>();



        //1. 创建一个SaxReader对象，调用read方法加载一个xml文件获得文档对象
        SAXReader sr = new SAXReader();
        Document doc = sr.read("day15/xml/book.xml");

        //2. 通过文档对象，获取根元素
        Element rootElement = doc.getRootElement();

        //3. 通过根元素一层一层的进行解析子元素。
        //获取所有的子元素
        List<Element> bookElements = rootElement.elements("book");

        for (Element bookElement : bookElements) {
            //System.out.println(bookElement);
            //解析属性
            String id = bookElement.attributeValue("id");
            System.out.println("id = " + id);
            //获取子元素文本
            String name = bookElement.elementText("name");
            String author = bookElement.elementText("author");
            String sale = bookElement.elementText("sale");

            //将解析的字符串封装成为对象，放到集合
            Book book = new Book(id,name,author,sale);
            books.add(book);

        }


        //将集合遍历，打印book对象
        for (Book book : books) {
            System.out.println("book = " + book);
        }

    }
}

class Book{
    private String id;
    private String name;
    private String author;
    private String sale;

    public Book() {
    }

    public Book(String id, String name, String author, String sale) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.sale = sale;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getSale() {
        return sale;
    }

    public void setSale(String sale) {
        this.sale = sale;
    }

    @Override
    public String toString() {
        return "Book{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", author='" + author + '\'' +
                ", sale='" + sale + '\'' +
                '}';
    }
}

```
