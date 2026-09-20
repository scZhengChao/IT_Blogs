# XML约束：Schema约束

## 目录

- [目标](#目标)
- [1 概念](#1-概念)
- [2 约束体验](#2-约束体验)
- [3 名称空间](#3-名称空间)
- [4 schema学习要求](#4-schema学习要求)
- [小结：](#小结)
- [使用别名的案例](#使用别名的案例)

#### 目标

了解Schema约束

#### 1 概念

Schema 语言**也也叫做 XSD**（XML Schema Definition）。

其**本身也是XML格式文档，但Schema文档扩展名为xsd，而不是xml。**

Schema 功能更强大，数据类型约束更完善。\*\* 比DTD强大，是DTD代替者。\*\*

#### 2 约束体验

体验效果说明：体验schema约束XML文档中对元素体数据类型的约束。

效果如下：

![](./image/image_4qeQHZO5Zl.png)

DTD约束无法**对具体数据类型进行约束,所以开发工具没有任何错误提示**，如下效果：

![](./image/image_f7oISYnZ6J.png)

**实现步骤**

步骤1：复制schema约束文件bookshelf.xsd，其中已对售价约束了数据类型，代码如下

```xml 
<?xml version="1.0" encoding="UTF-8" ?>

<!-- 根元素 -->
<schema  xmlns="http://www.w3.org/2001/XMLSchema"
          targetNamespace="http://www.itheima.com"
        elementFormDefault="qualified">
 
    < !-- Schema约束把元素分为两类：
         1、简单元素 ： 没有子元素，仅有文本内容
         2、复杂元素 :  带有子元素
     -->
 
    <!-- 设置XML文档中的根元素 -->
    <element name='书架'>

         <!-- complexType : 复杂元素 -->
         <complexType>
             <!-- sequence : 表示按照顺序 -->
            <sequence maxOccurs='unbounded'>
                 <element name='书'>
                    <complexType>
                        <sequence>
                            <element name='书名' type="string"/>
                            <element name='作者' type="string"/>
                             <element name='售价' type="double"/>
                         </sequence>
                    </complexType>
                </element>
            </sequence>

        </complexType>
    </element>

</schema>
```


步骤2：新建books2.xml使用schema约束文件bookshelf.xsd，代码如下

```xml 
<?xml version="1.0" encoding="UTF-8"?>

<!--要引入Schema约束-->
<书架  xmlns="http://www.itheima.com" 
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.itheima.com  bookshelf.xsd" 
>
    <书>
        <书名>JavaWeb开发教程</书名>
        <作者>张孝祥</作者>
        <售价>100.00</售价>
    </书>

    <书>
        <书名>三国演义</书名>
        <作者>罗贯中</作者>
        <售价>100.00</售价>< !-- dtd的短板：无法约束文本内容的类型     解决方案：使用scheam约束 -->
     </书>
</书架>
```


步骤3：开发工具提示效果

![](./image/image_pGo-7C3suw.png)

#### 3 名称空间

一个XML文档**最多可以使用一个DTD文件**,但一**个XML文档中使用多个Schema文件**，若这些Schema文件中定义了相同名称的元素时,使用的时候就会出现名字冲突。这就像一个Java文件中使用了`import java.util.*`和`import java.sql.*`时，**在使用Date类时，那么就不明确Date是哪个包下的Date了。**

同理 , 在XML文档中就**需要通过名称空间(namespace)来区分元素和属性是来源于哪个约束中的。**

\*\*名称空间就在在根元素后面的内容 , \*\*使用xmlns到引入约束 。

当一个XML文档中需要使用**多个**`Schema`文件的时候\*\* , 有且仅有一个使用缺省的 , 其他的名称空间都需要起别名\*\* 。

参考资料中的 applicationContext.xml文件(spring框架的配置文件)

```xml 
 xmlns="http://www.itcast.cn"    
     <!-- 缺省的名称空间.使用此约束中的元素的时候只需要写元素名即可 例如:<书></书> -->

 xmlns:aa="http://java.sun.com"
     <!-- aa就是此约束的别名,使用此约束中的元素的时候就需要加上别名 例如:<aa:书></aa:书> -->

```


总之**名称空间就是用来处理元素和属性的名称冲突问题**，与Java中的包是同一用途。如果每个元素和属性都有自己的名称空间，那么就不会出现名字冲突问题，就像是每个类都有自己所在的包一样，那么类名就不会出现冲突。

#### 4 schema学习要求

虽然schema功能比dtd强大，但是编写要比DTD复杂，同样以后我们在企业开发中也很少会自己编写schema文件。

xml编写与约束内容已经完成了，根据xml的作用我们了解到，无论是xml作为配置文件还是数据传输，我们的程序都要获取xml文档中的数据以便我们进行具体的业务操作，接下来我们就要学习XML解析技术Dom4j。

#### 小结：

怎么引入xsd 文档

```xml 
<?xml version="1.0" encoding="UTF-8" ?>
<根元素 xmlns="命名空间"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="命名空间 文件路径"
>


</根元素>

```


**schemaLocation：指定命名空间所在的文件**

**命名空间在约束文件的：targetNamespace中**

![](./image/image_3lePmQw7Ud.png)

# 使用别名的案例

步骤1：复制schema约束文件bookshelf.xsd，其中已对售价约束了数据类型，代码如下

```xml 
<?xml version="1.0" encoding="UTF-8" ?>

<!--
    传智播客schema教学实例文档.将注释中的以下内容复制到要编写的xml的声明下面
    复制内容如下:
    <书架 xmlns="http://www.itcast.cn"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.itcast.cn bookshelf.xsd"
    >
 -->
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
           targetNamespace="http://www.itcast.cn"
           elementFormDefault="qualified">
        <xs:element name='书架' >
        <!--  complexType : 复杂元素 
              xml文档中的某个标签，有子标签或有属性，该标签就为：复杂元素
              例： <书架>   <书>

              简单元素： 
                 没有子标签、没有属性。   例：书名、作者、售价
        -->
                <xs:complexType>
                        <xs:sequence maxOccurs='unbounded' >
                                <xs:element name='书' >
                                        <xs:complexType>
                                                <xs:sequence>
                                                     <xs:element name='书名' type='xs:string' />
                                                     <xs:element name='作者' type='xs:string' />
                                                     <xs:element name='售价' type='xs:double' />
                                                </xs:sequence>
                                        </xs:complexType>
                                </xs:element>
                        </xs:sequence>
                </xs:complexType>
        </xs:element>
</xs:schema>

```


步骤2：新建books2.xml使用schema约束文件bookshelf.xsd，代码如下

```xml 
<?xml version="1.0" encoding="UTF-8"?>
<书架
xmlns="http://www.itcast.cn"    
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.itcast.cn bookshelf.xsd"
><!--指定schema文档约束当前XML文档-->
    <书>
        <书名>JavaScript网页开发</书名>
        <作者>张孝祥</作者>
        <售价>abc</售价>
    </书>
</书架>。

```
