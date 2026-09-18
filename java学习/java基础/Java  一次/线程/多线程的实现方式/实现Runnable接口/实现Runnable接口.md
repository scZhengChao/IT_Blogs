# 实现Runnable接口

## 目录

- [例子](#例子)
  - [匿名表达式 ](#匿名表达式-)
  - [lambda](#lambda)

第二种创建方式使用如下构造方法，指定任务给线程执行

```java 
  public Thread(Runnable target)  
  public Thread(Runnalbe target , String name)

```


参数中的`Runnable`是一个接口，用来定义线程要执行的任务

实现步骤如下：

- 定义任务类实现Runnable，并重写run方法&#x20;
- 创建任务对象
- 使用含有Runnable参数的构造方法，创建线程对象并指定任务。
- 调用线程的start方法，开启线程。

```java 
public interface Runnable {   
   public abstract void run();
}

线程启动后就会执行该run方法了

```


![](image_FgEZQsjyw3.png)

# 例子

```java title="MyTask "
package com.thread;

public class MyTask implements Runnable{
    @Override
    public void run() {
        System.out.println("新线程开始了");
        for (int i = 0; i < 1000; i++) {
            System.out.println("新线程开始了"+i );
        }
    }
}

```


```java title="RunnableDemo"
package com.thread;

public class RunnableDemo {
    public static void main(String[] args) {
        // 创建线程任务对象
        MyTask task = new MyTask();



        // 创建线程类对象;并指定要执行的线程任务
        Thread t = new Thread(task);

        // 启动线程
        t.start();

        // main 方法中的方法
        for (int i = 0; i < 100; i++) {
            System.out.println("main中的方法");
        }
    }
}

```


#### 匿名表达式&#x20;

```java 
Thread t = new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i < 100; i++) {
                    System.out.println("hahhahahh");
                }
            }
        });
        t.start();
        
```


#### lambda

```java 

        Thread t = new Thread(() -> {
            for (int i = 0; i < 100; i++) {
                System.out.println("iiii");
            }
        });
        t.start();ab

```
