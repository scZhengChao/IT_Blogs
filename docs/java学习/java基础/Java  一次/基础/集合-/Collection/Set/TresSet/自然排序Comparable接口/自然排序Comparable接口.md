# 自然排序Comparable接口

- Integer；Double; String; Character; 自带排序规则
- 自定义：**必须实现**Comparable 接口；（负数；正数；0；底层红黑树需要； ）

![](image_h_ShVmQV7W.png)

```java title="student"

package com.colloection;

import java.util.Comparator;
import java.util.Objects;

public class Student implements Comparable<Student> {
    private String name;
    private int age;

    public Student(String name,int age){
        this.name = name;
        this.age = age;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return age == student.age && Objects.equals(name, student.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    @Override
     public int compareTo(Student o) { 
        // String本身自带自然排序
        int result = this.name.compareTo(o.name);
        if(result == 0){
            result =  this.age - o.age;
        }
        return result;
    }
}
```
