# 模拟junit

```java title="app"
package com.itheima.junit;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class App {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        //获取Class对象
        Class cls = Class.forName("com.itheima.junit.JunitDemo");

        //基于Class获取构造器
        Constructor cons = cls.getConstructor();

        //基于Class获取类中所有的方法
        Method[] methods = cls.getDeclaredMethods();

        //遍历：所有的方法对象
        for (Method method : methods) {
            //判断：Method对象上是否存在@MyTest注解
            if(method.isAnnotationPresent(MyTest.class)){
                //存在： 执行方法
                method.invoke(cons.newInstance());
            }
        }
    }
}

```


```java title="junit"
package com.itheima.junit;

public class JunitDemo {

    @MyTest
    public void method1(){
        System.out.println("method1");
    }

    public void method2(){
        System.out.println("method2");
    }

    @MyTest
    public void method3(){
        System.out.println("method3");
    }
}

```


```java 
package com.itheima.junit;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)//当前自定义注解只能书写在方法上
 //省略了注解的生命周期（验证：注解默认的生命周期） 
@Retention(RetentionPolicy.RUNTIME)
public @interface MyTest {
    //空属性
}
```
