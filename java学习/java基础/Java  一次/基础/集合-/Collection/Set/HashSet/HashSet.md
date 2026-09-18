# HashSet

## 目录

- [对象](#对象)

* 没有索引
* 没有重复
* 不保证顺序
* **底层使用Hash表结构**（数组 + 链表）

```java 
HashSet<String> set = new HashSet<>();
        set.add("java");
        set.add("htm");
        if(set.contains("java")){
             set.remove("java");
        }
        for(String s:set){
            System.out.println(s);
        }
```


# 对象

- 在自定义类中；重写hasCode 和 equals 方法

```java title="student"
package com.colloection;

import java.util.Objects;

public class Student {
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
}

```


```java title="test"
package com.colloection;

import java.util.HashSet;

public class SetDemo {
    public static void main(String[] args) {
        HashSet<Student> st = new HashSet<>();

        Student su = new Student("熊大",23);
        st.add(new Student("熊大",23));
        st.add(new Student("熊2",21));
        st.add(new Student("熊3",22));
        for (Student student : st) {
            System.out.println(student);
        }

    }
}

```


[hash表数据结构](hash表数据结构.md "hash表数据结构")
