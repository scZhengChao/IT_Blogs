# 二

## 目录

- [案例二](#案例二)

# 案例二

```java title="App"
package com.itheima.demo5.init;

import com.itheima.demo5.dao.UserDao;
import com.itheima.demo5.service.UserService;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;

public class App {
    public static void main(String[] args) throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        //项目程序启动，就会初始化一些对象和参数

        //获取到UserSerivce的Class对象
        Class<UserService> userServiceClass = UserService.class;

        //构造器
        Constructor<UserService> cons = userServiceClass.getConstructor();

        //成员变量
        Field[] fields = userServiceClass.getDeclaredFields();

        //遍历
        for (Field field : fields) {
            //判断：成员变量上是否有@CreateObject注解
            if(field.isAnnotationPresent(CreateObject.class)){
                //有注解就解析
                CreateObject obj = field.getDeclaredAnnotation(CreateObject.class);

                String objectValue = obj.value();

                UserDao userDao = new UserDao();

                if(objectValue.equals("userDao")){
                    field.setAccessible(true);//暴力破解
                    field.set(cons.newInstance() , userDao );
                }

            }

        }

    }
}

```


```java title="intation"
package com.itheima.demo5.init;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface CreateObject {
    public String value();
}

```


```xml title="bean.xml"
<?xml version="1.0" encoding="utf-8" ?>
<beans>

    <beand id="userDao" class="com.itheima.demo5.dao.UserDao"></beand>

    <beand id="userService" class="com.itheima.demo5.service.UserService"></beand>

</beans>
```
