# String

## 目录

- [创建](#创建)
- [方法](#方法)
  - [字符串和字节数组的相互转换](#字符串和字节数组的相互转换)
- [equals比较](#equals比较)
- [不可变性](#不可变性)

# 创建

```java 
String s1 = "zc"; //  双引号直接赋值 ；在字符串常量池中存储； 如果常量池中内容一样；那么这就是一个对象； 
String s2 = new String();
String s3 = new String("S3");



```


> 打印字符串对象；不会展示地址值；打印自定义对象；会展示地址值

# 方法

```java 
length()
indexOf() 
lastIndexOf()
subString()
trim()
equals()
toLowerCase()
toUpperCase(); 
charAt();
split();
getBytes(); // 将字符串转换为二进制数组； 
equalsIgnoreCase(); // 忽略二进制比较

```


![](./assets/image/image_MmmcyMTAJX.png)

```java title="案例"
// 查找子串；
转译字符： "afasf\"子串\""
int num = str.indexOf("sf")
```


#### 字符串和字节数组的相互转换

```java 
String str = new String("zv zc zc")
bytes arr = str.getBytes("GBK"); // 默认utf-8；
for(int i=0;i<arr.length;i++){
  System.out.println(arr[i])
}


String str2 = new String(arr);
String str3 = new String(arr,"GBK");
```


> 字节是计算机存储数据的基本单位；

![](./assets/image/image_yOFAKfLZfB.png)

&#x20;&#x20;

> 每个字节**是8位；是不能超过127的；中文转换为字节后超过了127；发生了溢出；以负数的形式显示**；

![](./assets/image/image_3xIa2rvjEV.png)

![](./assets/image/image_mr7tvM4LEs.png)

# equals比较

> 内容相同

```java 
 String str1 = "zc";
 String str2 = "zc";
 String str3 = new String("zc")
 str1.equals(str2) // true
 str1.equals(str3) // true
 str1 == str2 // true;
 str2 == str3 // false;
 

```


![](./assets/image/image_7reR3OMtxJ.png)

# 不可变性

> \*\*String对象的一旦创建；就不可修改；不可变；
> \*\*所谓修改其实是创建了新的对象；所指向的内存空间不变；

```java 
String s1 = "zc";
s1 = "hello,"+s1;

String s2 = "hello," + s1
```


![](./assets/image/image_O-rdHjZU2v.png)

![](./assets/image/image_-dY7f6-XYK.png)

```java 
String s3 = new String("hello");
s3.substring(0,3); //  储存在常量池当中；

```


![](./assets/image/image_cOeSMgVUl8.png)
