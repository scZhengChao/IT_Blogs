线程池处理Runnable任务

## 目录

- [1 线程池API的学习  ](#1-线程池API的学习)
- [例子](#例子)

1 线程池API的学习

`java.util.concurrent.ExecutorService` 是线程池接口类型。使用时我们不需自己实现，JDK已经帮我们实现好了。获取线程池我们使用工具类`java.util.concurrent.Executors`的静态方：

`public static ExecutorService newFixedThreadPool (int num)` 指**定线程池最大线程池数量获取线程池**

线程池ExecutorService的相关方法：

- 提交执行任务方法：

  `<T> Future<T>  submit(Callable<T> task) `

  `Future<?> submit(Runnable task)`
- 关闭线程池方法（**一般不使用关闭方法，除非后期不用或者很长时间都不用，就可以关闭**）&#x20;

  `void shutdown()`  启动一次顺序关闭，&#x20;

# 例子

```java 
package com.pool;

import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

class StudentTask implements Runnable {

    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName()+"在教授学员游泳");
    }
}

public class Test1 {
    public static void main(String[] args) {
        ExecutorService es  = Executors.newFixedThreadPool(3);
        es.submit(new StudentTask());
        es.submit(new StudentTask());
        es.submit(new StudentTask());
        es.submit(new StudentTask());
        es.submit(new StudentTask());

    }
}

```
