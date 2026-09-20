# 比较器

## 目录

- [用例](#用例)
  - [匿名内部类](#匿名内部类)

**TreeSet构造方法指定排序规则**

```java 
public TreeSet(Comparator c) 


```


`Comparator`接口；泛型；比较器

```c# 
int Comparator(object obj1,object obj2) 
```


负数；正数；0

# 用例

```java 
package com.colloection;

import java.util.Comparator;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.TreeSet;

class MyComparator implements Comparator<String> {
     @Override
    public int compare(String o1, String o2) {

        int result = o1.length() - o2.length();
        if(result == 0){
            result = o1.compareTo(o2);
        }
        return result;
    }
 }
public class SetDemo {
    public static void main(String[] args) {
//        HashSet<Student> st = new HashSet<>();
//
//        Student su = new Student("熊大",23);
//        st.add(new Student("熊大",23));
//        st.add(new Student("熊2",21));
//        st.add(new Student("熊3",22));
//        for (Student student : st) {
//            System.out.println(student);
//        }
//
//
//        LinkedHashSet<Integer> arr = new LinkedHashSet<>();
//        arr.add(1);
//        arr.add(2);
//        arr.add(4);
//        for (Integer i : arr) {
//            System.out.println(i);
//        }


        TreeSet<String> ts = new TreeSet<>(new MyComparator() );
        ts.add("221412");
        ts.add("12412512");
        ts.add("22");
        for (String t : ts) {
            System.out.println(t);
        }
    }

} 
```


负数；正数；0

### 匿名内部类

![](./image/image_N1XZDS32nw.png)
