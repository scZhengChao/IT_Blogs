# &#x20;同步代码块

## 目录

- [同步的好处和弊端	](#同步的好处和弊端)
- [例子](#例子)

锁住多条语句操作共享数据，可以使用同步代码块实现&#x9;

- 格式：

```java 
synchronized(任意对象) { 
       多条语句操作共享数据的代码 
}

```


&#x20;      &#x9;

- 默认情况锁是打开的，只要有一个线程进去执行代码了，锁就会关闭
- 当线程执行完出来了，锁才会自动打开
- \*\*锁对象可以是任意对象 , 但是多个线程必须使用同一把锁
  \*\*​

# 同步的好处和弊端&#x9;

- 好处：解决了**多线程的数据安全问题**
- 弊端：当线程很多时，因为**每个线程都会去判断同步上的锁，这是很耗费资源的**，无形中会降低程序的运行效率

# 例子

```java title="task"
package com.Lock;

public class Task implements Runnable{

    private  int ticketCount = 100;
    //    任意对象
    private Object lock = new Object();
    @Override
    public void run() {
        while (true){
            synchronized (lock){
                if(ticketCount <= 0 ){
                    break;
                }
                if(ticketCount > 0){
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                    System.out.println(Thread.currentThread().getName()+"出售票号"+ticketCount);
                    ticketCount--;
                }
            }

        }
    }
}

```


```java title="thread"
package com.Lock;

public class ThreadDemo {
    public static void main(String[] args) {
        Task myTask = new Task();


        Thread t1 = new Thread(myTask,"窗口一");
        Thread t2 = new Thread(myTask,"窗口二");
        Thread t3 = new Thread(myTask,"窗口三");

        t1.start();
        t2.start();
        t3.start();
    }
}

```
