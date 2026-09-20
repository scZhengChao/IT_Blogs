# Topic

## 目录

- [3.6.1.说明](#361说明)
- [3.6.2.消息接收](#362消息接收)
- [3.6.3.消息发送](#363消息发送)
- [3.6.4.总结](#364总结)

### 3.6.1.说明

`Topic`类型的`Exchange`与`Direct`相比，都是可以根据`RoutingKey`把消息路由到不同的队列。只不过`Topic`类型`Exchange`可以让队列在绑定`Routing key`的时候使用通配符！

`Routingkey`一般都是有一个或多个单词组成，多个单词之间以”.”分割，例如：`item.insert`

通配符规则：

`#`：匹配一个或多个词

`*`：匹配不多不少恰好1个词

举例：

`item.#`：能够匹配`item.spu.insert`或者`item.spu`

`item.*`：只能匹配`item.spu`

图示：

![](./image/image_dRXMQTP0Br.png)

解释：

- Queue1：绑定的是`china.#`，因此凡是以`china.`开头的`routing key`都会被匹配到。包括china.news和china.weather
- Queue2：绑定的是`#.news`，因此凡是以`.news`结尾的`routing key`都会被匹配。包括china.news和japan.news

案例需求：

实现思路如下：

1. 并利用@RabbitListener声明Exchange、Queue、RoutingKey
2. 在consumer服务中，编写两个消费者方法，分别监听topic.queue1和topic.queue2
3. 在publisher中编写测试方法，向itcast. topic发送消息

![](./image/image_MfLLj9d7rC.png)

### 3.6.2.消息接收

在consumer服务的SpringRabbitListener中添加方法：

```java 
/*
        TODO:
            1.value = @Queue(name = "topic.queue1") 表示绑定的第一个队列
            2.exchange = @Exchange(name = "itcast.topic", type = ExchangeTypes.TOPIC) 表示交换机名和类型
            3. key = "china.#" 表示路由key只要以china开始都会接收
     */
    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = "topic.queue1"),
            exchange = @Exchange(name = "itcast.topic", type = ExchangeTypes.TOPIC),
            key = "china.#"
    ))
    public void listenTopicQueue1(String msg) {
        System.out.println("消费者接收到topic.queue1的消息：【" + msg + "】");
    }

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = "topic.queue2"),
            exchange = @Exchange(name = "itcast.topic", type = ExchangeTypes.TOPIC),
            key = "#.news"
    ))
    public void listenTopicQueue2(String msg) {
        System.out.println("消费者接收到topic.queue2的消息：【" + msg + "】");
    }
```


### 3.6.3.消息发送

在publisher服务的SpringAmqpTest类中添加测试方法：

```java 
/**
     * topicExchange
     */
    @Test
    public void testSendTopicExchange() {
        // 交换机名称
        String exchangeName = "itcast.topic";
        // 消息
        String message = "喜报！孙悟空大战哥斯拉，胜!";
        // 发送消息
        rabbitTemplate.convertAndSend(exchangeName, "china.news", message);
    }

```


### 3.6.4.总结

描述下Direct交换机与Topic交换机的差异？

- Topic交换机接收的消息RoutingKey必须是多个单词，以`.`分割
- Topic交换机与队列绑定时的bindingKey可以指定通配符
- `#`：代表0个或多个词
- `*`：代表1个词
