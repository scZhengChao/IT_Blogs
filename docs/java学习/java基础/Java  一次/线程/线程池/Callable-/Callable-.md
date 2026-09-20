# Callable&#x20;

## 目录

- [1 Callable接口概述  ](#1-Callable接口概述)
- [Callable与Runnable的不同点：](#Callable与Runnable的不同点)
- [2 Callable任务处理使用步骤  ](#2-Callable任务处理使用步骤)
- [例子](#例子)

1 Callable接口概述

```java 
public interface Callable<V> {        
    V call() throws Exception;
}


public interface Runnable{    void run();}

```


# Callable与Runnable的不同点：

- Callable支持**结果返回**，Runnable不行
- Callable可以 **抛出异常，** Runnable不行

2 Callable任务处理使用步骤

1. **创建线程池** (Callable 必须使用线程池，没有线程池不能用 )
2. 定义Callable任务
3. 创建Callable任务，提交任务给线程池
4. 获取执行结果

`<T> Future<T>  submit(Callable<T> task)  `提交Callable任务方法    

返回值类型`Future`的作用就是为了获取任务执行的结果。 

`Future`是一个接口，里面存在一个`get`方法用来获取值。

# 例子

```java 
package com.pool;

import java.util.concurrent.*;

public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        // 创建线程池
        ExecutorService es = Executors.newFixedThreadPool(10);

        // 创建线程任务
        Callable<Integer> task = new Callable<Integer>(){
            @Override
            public Integer call() throws Exception {
                 int sum = 0;
                for (int i = 0; i < 100; i++) {
                    sum+=i;
                }
                return sum;
            }
        };

        // 把任务交给线程池
        Future<Integer> future = es.submit(task);
        System.out.println("计算结果"+ future.get());
    }
}

```


```typescript 
package com.review;

import java.util.concurrent.Callable;
import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

class Task1 implements Runnable{

    @Override
    public void run() {

    }
}
class Task2 implements Callable{

    @Override
    public Object call() throws Exception {
         return null;
    }
}

public class ThreadPoll {
    public static void main(String[] args) {
        ExecutorService pool = Executors.newFixedThreadPool(10);

        pool.submit(new Task1());
        pool.submit(new Task2());
    }
}

```
