# WorkQueue

## 目录

- [3.2.1.消息发送](#321消息发送)
- [3.2.2.消息接收](#322消息接收)
- [3.2.3.测试](#323测试)
- [3.2.4.能者多劳](#324能者多劳)
- [3.2.5.总结](#325总结)

Work queues，也被称为（Task queues），任务模型。简单来说就是让**多个消费者绑定到一个队列，共同消费队列中的消息。**

![](./assets/image/image_LfmWGXecC6.png)

当消息处理比较耗时的时候，可能生产消息的速度会远远大于消息的消费速度。长此以往，消息就会堆积越来越多，无法及时处理。

此时就可以使用work 模型，多个消费者共同处理消息处理，速度就能大大提高了。

**注意:不一定是两个消费者。**

代码实现思路：

1.在publisher服务中定义测试方法，产生50条消息(每隔20ms发送一条)，发送到simple.queue

2.在consumer服务中定义两个消息监听者，都监听simple.queue队列

3.消费者1处理50条消息(每隔20ms处理一条)，消费者2处理50条消息（每隔100ms处理一条）

### 3.2.1.消息发送

这次我们循环发送，模拟大量消息堆积现象。

在publisher服务中的SpringAmqpTest类中添加一个测试方法：

```java 
/**
     * workQueue
     * 向队列中不停发送消息，模拟消息堆积。
     */
@Test
public void testWorkQueue() throws InterruptedException {
    // 队列名称
    String queueName = "simple.queue";
    // 消息
    String message = "hello, message_";
    for (int i = 0; i < 50; i++) {
        // 发送消息
        rabbitTemplate.convertAndSend(queueName, message + i);
        Thread.sleep(20);
    }
}

```


### 3.2.2.消息接收

要模拟多个消费者绑定同一个队列，我们在consumer服务的SpringRabbitListener中添加2个新的方法：

```java 
@RabbitListener(queues = "simple.queue")
    public void listenWorkQueue1(String msg) throws InterruptedException {
        System.out.println("消费者1接收到消息：【" + msg + "】" + new Date());
        Thread.sleep(20);
    }

    @RabbitListener(queues = "simple.queue")
    public void listenWorkQueue2(String msg) throws InterruptedException {
        System.err.println("消费者2........接收到消息：【" + msg + "】" + new Date());
        Thread.sleep(100);
    }

```


### 3.2.3.测试

**一定先启动ConsumerApplication后，在执行publisher服务中刚刚编写的发送测试方法testWorkQueue。**

可以看到消费者1很快完成了自己的25条消息。消费者2却在缓慢的处理自己的25条消息。

也就是说消息是平均分配给每个消费者，并没有考虑到消费者的处理能力。这样显然是有问题的。

![](./assets/image/image_fmx98tphWs.png)

说明：阐述上述原因是因为队列平均分配给每个消费者，**即使当前消费者没有消费完，队列也会将消息分配给消费者**。然后消费者一个一个消息消费，即使消费很快的消费者，消费完毕，而消费很慢的消费者一直在消费。这样很不合理。**应该是哪个消费者消费快应该多消费。哪个消费者消费慢应该少消费。**

![](./assets/image/image_SCj0J0ANRT.png)

### 3.2.4.能者多劳

在spring中有一个简单的配置叫预取prefetch，可以解决这个问题。我们修改consumer服务的application.yml文件，添加配置：

![](./assets/image/image_GptKgXX4Ah.png)

```yaml 
spring:
  rabbitmq:
    listener:
      simple:
        prefetch: 1 # 消费者每次最多只能预取一条消息，当消费完这条消息后，才能获取下一个消息，这样做的好处是消费能力强的消费者，处理的消息就会更多===》能者多劳
```


重启消费者模块，运行生产者模块，查看消费者模块控制台：

![](./assets/image/image_0mM1ftDAZM.png)

### 3.2.5.总结

Work模型的使用：

- 多个消费者绑定到一个队列，同一条消息只会被一个消费者处理
- 通过设置prefetch来控制消费者预取的消息数量
