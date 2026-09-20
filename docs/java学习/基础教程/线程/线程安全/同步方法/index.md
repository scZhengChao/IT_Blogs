# 同步方法

## 目录

- [例子](#例子)

同步方法：就是把synchronized关键字加到方法上,保证线程执行该方法的时候，其他线程只能在方法外等着

- 格式：
  &#x20;      修饰符 synchronized 返回值类型 方法名(方法参数) {    }

同步代码块和同步方法的区别:

- 同步代码块可以锁住指定代码,同步方法**是锁住方法中所有代码**
- 同步代码块可以**指定锁对象**,**同步方法不能指定锁对象**

> 注意 : 同步方法时不能指定锁对象的 , 但是有默认存在的锁对象的。

- 对于\*\*非`static`方法,同步锁就是this。       \*\*​
- 对于`static`方法,我们使用**当前方法所在类的字节码对象(类名.class)**。   \*\*Class类型的对象
  \*\*

# 例子

```java title="Task"
package com.Lock;

public class Task implements Runnable{
    private  int ticketCount = 100;

    @Override
    public void run() {
        while (true){
            if(ticketCount <= 0 ){
                    break;
             }
            method();
        }
    }

    private synchronized void method(){
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
