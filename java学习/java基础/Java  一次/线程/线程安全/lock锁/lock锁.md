# lock锁

## 目录

- [例子](#例子)

虽然我们可以理解同步代码块和同步方法的锁对象问题，但是我们并没有直接看到在哪里加上了锁，在哪里释放了锁，
为了更清晰的表达如何加锁和释放锁，JDK5以后提供了一个新的锁对象Lock

Lock中提供了获得锁和释放锁的方法

- void lock()：获得锁
- void unlock()：释放锁

`Lock`**是接口不能直接实例化**，这里采用它的**实现类**`ReentrantLock`来实例化

`ReentrantLock`的构造方法

- `ReentrantLock​()`：创建一个`ReentrantLock`的实例

> 注意：多个线程使用相同的`Lock`锁对象，需要多线程操作数据的代码放在lock()和unLock()方法之间。**一定要确保unlock最后能够调用**

# 例子

```java title="task"
package com.Lock;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class Task implements Runnable{
    private  int ticketCount = 100;

    Lock lock = new ReentrantLock();
    @Override
    public void run() {
        while (true){
            lock.lock();
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
            lock.unlock();
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
