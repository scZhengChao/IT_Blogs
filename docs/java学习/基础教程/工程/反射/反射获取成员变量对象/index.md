# 反射获取成员变量对象

## 目录

- [案例](#案例)

![](./assets/image/image_2KqrSGPS8J.png)

- 反射的第一步是先**得到类对象，然后从类对象中获取类的成分对象。**
- Class类中用于\*\*获取成员变量的方法. \*\*

![](./assets/image/image_BOUUBle_MM.png)

- 获取成员变量的作用依然是在某个对象中取值、赋值

![](./assets/image/image_y6j3ZFTRK3.png)

# 案例

```java 
package com.itheima.reflect.field;

import org.junit.Test;

import java.lang.reflect.Field;

public class FieldDemo1 {

    @Test
    public void testMethod4() throws NoSuchFieldException, InstantiationException, IllegalAccessException {
        //1、获取Class对象
        Class<Teacher> teacherClass = Teacher.class;
        Teacher teacher = teacherClass.newInstance();

        //2、基于Class对象，获取私有成员变量
        Field field = teacherClass.getDeclaredField("name");

        //取消本次权限检查
        field.setAccessible(true);

        //3、利用Field对象，赋值、取值  (成员变量，也称为：实例变量，是通过对象名来访问)
        field.set( teacher  ,"张三");//赋值
        Object result = field.get(teacher);
        System.out.println(result);
    }



    @Test
    public void testMethod3() throws NoSuchFieldException, InstantiationException, IllegalAccessException {
        //1、获取Class对象
        Class<Teacher> teacherClass = Teacher.class;
        Teacher teacher = teacherClass.newInstance();

        //2、基于Class对象，获取public修饰的Field对象
        Field field = teacherClass.getField("id");

        //3、利用Field对象，赋值、取值  (成员变量，也称为：实例变量，是通过对象名来访问)
        field.set( teacher  ,100);//赋值
        Object result = field.get(teacher);
        System.out.println(result);
    }





    @Test
    public void testMethod2() {
        //1、获取Class对象
        Class<Teacher> teacherClass = Teacher.class;

        //2、基于Class对象，获取所有的Field对象（包含：私有成员变量）
        Field[] fields = teacherClass.getDeclaredFields();

        for (Field field : fields) {
            System.out.println(field);
        }
    }
    @Test
    public void testMethod1() {
        //1、获取Class对象
        Class<Teacher> teacherClass = Teacher.class;

        //2、基于Class对象，获取public修饰的Field对象（成员变量）
        Field[] fields = teacherClass.getFields();

        for (Field field : fields) {
            System.out.println(field);
        }
    }
}

```
