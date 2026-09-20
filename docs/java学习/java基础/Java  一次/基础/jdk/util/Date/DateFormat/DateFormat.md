# DateFormat

## 目录

- [方法](#方法)

```java 
// java.text.Format
//你一个抽象类；无法实例化；使用子类 simpleDateFormat
DateFormat df = new SimpleDateFormate("日期模版")

格式化；解析


```


![](image_N6sGQEfZG6.png)

![](image_1wUU3rzt0Y.png)

# 方法

```java title="String format(Date date)
"
  
 
 public static void method2(){
        Date date1 = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date2 = df.format(date1);
        System.out.println(date2);
    }

```


```java title="Date parse(String str)"

method3("2024-09-16 14:46:15");

public static void method3(String s1) throws ParseException {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date d = df.parse(s1);
        System.out.println(d);
    }
```


![](image_zOaorhiQqx.png)
