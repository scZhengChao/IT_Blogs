# toString

```typescript title="Test"
package com.Object;

public class Test {
    public static void main(String[] args) {
        Student st = new Student("sas");
        System.out.println(st);
    } 
}

```


```typescript title="Student"
package com.Object;

public class Student {
    String name;
    public Student(String name){
        this.name = name;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                '}';
    }
}

```


> printIn 方法中自动调用 toString；

![](./image/image_ulnN5Qs4ia.png)
