# 案例

## 目录

- [处理器](#处理器)
- [测试类](#测试类)

# 处理器

```java 
 package com.itheima.demo2;

import org.junit.Before;
import org.junit.Test;

import java.io.Serializable;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.List;

//处理器
class     MyInvocationHander implements InvocationHandler{
    private UserServiceImpl userService;

    public MyInvocationHander(UserServiceImpl userService) {
        this.userService = userService;
    }

    public MyInvocationHander() {
    }

    /**
     *
     * @param proxy     代理对象（不使用）
     * @param method    方法对象 （被代理类中所书写的每一个成员方法）
     * @param args      成员方法中的参数
     * @return          方法方法执行后的结果
     * @throws Throwable
     */
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        //记录开始时间
        long beginTime = System.currentTimeMillis();

        //使用Method对象，执行原有方法(被代理类)功能
         Object result = method.invoke( userService , args);
 
        //记录结束时间
        long endTime = System.currentTimeMillis();
        System.out.println(method.getName()+ "执行消耗："+(endTime-beginTime)+"毫秒");

        return result;
    }
}
```


# 测试类

```java 
public class UserServiceImplTest {
    @Test
    public void testDeleteUserById(){
        //创建： 被代理对象
        UserServiceImpl userService = new UserServiceImpl();

        //创建一个和UserServiceImpl类实现相同父接口的子类，并生成子类对象
        //创建：代理对象
        UserService proxyObj = (UserService) Proxy.newProxyInstance(
                 userService.getClass().getClassLoader(),//类加载器
                userService.getClass().getInterfaces(), //父接口（数组）
                 //处理器（拦截方法的执行）
                 new InvocationHandler() {
                    @Override
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        //记录开始时间
                        long beginTime = System.currentTimeMillis();

                        //执行被代理对象中的方法（原方法执行）
                        Object result = method.invoke(userService, args);

                        //记录结束时间
                        long endTime = System.currentTimeMillis();
                        System.out.println(method.getName()+ "执行消耗："+(endTime-beginTime)+"毫秒");

                        return result;
                    }
                }
         );
 
        //使用代理对象，调用方法执行（方法执行时：会被代理对象中的处理器拦截）  
         proxyObj.deleteUserById(1);
    }








    @Test
    public void testProxy(){
        //前置 ： UserServiceImpl有实现接口
        //创建： 被代理类对象
        UserServiceImpl userService = new UserServiceImpl();

        //被代理类实现的所有接口
        //Class[] interfaces = { UserService.class };
        //注意：当一个类实现的接口比较多时，使用以上方式，书写代码就繁琐了
        //简化代码：           获取被代理类对象的Class对象 ， 基于Class对象获取所实现的所有接口
        //Class[] interfaces = userService.getClass().getInterfaces();

        //使用JDK提供Proxy创建代理对象
        UserService proxyObj = (UserService) Proxy.newProxyInstance(
                 userService.getClass().getClassLoader(), //参数1：类加载器

                //参数2：接口数组（被代理类所实现的所有的接口）
                userService.getClass().getInterfaces(),

                //参数3：处理器（关键）
                new MyInvocationHander( userService )
         );

        //使用代理对象，调用方法
        List<User> userList = proxyObj.findAllUser();


        for (User user : userList) {
            System.out.println(user);
        }

    //    proxyObj.deleteUserById(1);

    }

}
```


[代理ArrayList](./代理ArrayList/index.md "代理ArrayList")
