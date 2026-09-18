# kafka-node

kafka-node  

[https://github.com/SOHU-Co/kafka-node](https://github.com/SOHU-Co/kafka-node "https://github.com/SOHU-Co/kafka-node")

   2.3k+

第一步是连接：

```纯文本 
 配置说明： 
 config.kafka = { 
     client: { 
         kafkaHost: 'localhost:9092', 
     }, 
     producer: { 
         web: { 
             topic: 'zane_perfor_web', 
             partition: 0, // default 0 
             attributes: 0, // default: 0 
             // timestamp: Date.now(), 
         }, 
         wx: { 
             topic: 'zane_perfor_wx', 
         }, 
     }, 
     // consumer 和 consumerGroup消费任选其一即可 
     // 优先选择consumer消费，两种消费配置任留一种即可 
     consumer: { 
         web: { 
             topic: 'zane_perfor_web', 
             offset: 0, // default 0 
             partition: 0, // default 0 
             isone: false, // 此参数默认不可更改 
             total_limit: 10000, // 消息队列消费池限制数, 0：不限制 number: 限制条数 高并发时服务优雅降级方案 
         }, 
         wx: { 
             topic: 'zane_perfor_wx', 
             isone: false, 
             total_limit: 10000, 
         }, 
     }, 
     consumerGroup: { 
         web: { // ConsumerGroup(options, topics) 
             topic: 'zane_perfor_web', 
             groupId: 'WebPerformanceGroup', 
             commitOffsetsOnFirstJoin: true, 
         }, 
         wx: { 
             topic: 'zane_perfor_wx', 
             groupId: 'WxPerformanceGroup', 
             commitOffsetsOnFirstJoin: true, 
         }, 
     }, 
 };
```


```纯文本 
 客户端 
 const client = new kafka.KafkaClient({kafkaHost: '10.3.100.196:9092'}); 
 
 
 生产者 
 producer = new Producer(client); 
 producer.on('ready',res=>{ 
     console.log('ready success',res) 
 }) 
 producer.on('error'，err=>{ 
     console.log('err',err) 
 }) 
 生产数据send 
 payloads = [ 
         { topic: 'topic1', messages: 'hi', partition: 0 }, 
         { topic: 'topic2', messages: ['hello', 'world', km] } 
     ]; 
 producer.send(payloads, function (err, data) { 
     console.log(data); 
 });
```
