# 生产者消费者案例

## 目录

- [例子](#例子)
  - [CustomerTask](#CustomerTask)
  - [ProducerTask](#ProducerTask)
  - [Resource](#Resource)

* 必须保证生产者和消费者 使用同一个对象锁

# 例子

### CustomerTask

```java title="CustomerTask"
package com.resouce;

public class CustomerTask implements Runnable{
    @Override
    public void run() {
        while (true){
            synchronized (Resource.lock){
                if (Resource.num == 0) {
                    try {
                        System.out.println(Thread.currentThread().getName()+"没有发现食物等待中");
                        Resource.lock.wait(); // 无限等待会释放锁
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }else{
                    System.out.println(Thread.currentThread().getName()+"开始消费");
                    Resource.num--;
                    // 唤醒生产者;继续生产
                    Resource.lock.notify();
                }
            }
        }
    }
}

```


### ProducerTask

```java 
package com.resouce;

public class ProducerTask  implements Runnable {

    @Override
    public void run() {
        while (true){
            synchronized (Resource.lock){
                if (Resource.num == 0) {
                    System.out.println(Thread.currentThread().getName()+"没有食物开始生产");
                    Resource.num = 1;
                    Resource.lock.notify();
                }else{
                    System.out.println(Thread.currentThread().getName()+"等待中 ");
                    try {
                        Resource.lock.wait();
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }

                }
            }
        }
    }
}

```


### Resource

```java title="Resource"
package com.resouce;

public class Resource {
    public static int num = 0;
    public static final String lock = "对象锁";
}

```


```java title="Test1"
package com.resouce;

public class Test1 {
    public static void main(String[] args) {
        new Thread(new CustomerTask(),"消费者").start();
        new Thread(new ProducerTask(),"生产者").start();
    }
}

```
