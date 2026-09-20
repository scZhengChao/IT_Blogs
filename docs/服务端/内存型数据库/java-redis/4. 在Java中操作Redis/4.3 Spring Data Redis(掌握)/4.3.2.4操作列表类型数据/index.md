# 4.3.2.4操作列表类型数据

## 目录

- [4.3.2.4操作列表类型数据](#4324操作列表类型数据)

##### [4.3.2.4](http://tnm2.oa.com/host/home/4.3.2.4 "4.3.2.4")操作列表类型数据

![](./image/image_N9zG9Rj-jw.png)

需求：

> 1.向列表中添加数据
>
> 2.查询列表中所有数据

```javascript 
/**
 * 操作List类型的数据
*/
@Test
public void testList(){
       //获取操作列表类型的接口对象
        ListOperations listOperations = redisTemplate.opsForList();

        //存值
        //命令lpush 键 元素 元素...
        listOperations.leftPush("mylist","a");
        listOperations.leftPushAll("mylist","b","c","d");

        //取值
        //命令：lrange 键 开始 结束
        //下面的代码是查询所有
        List<String> mylist = listOperations.range("mylist", 0, -1);
        for (String value : mylist) {
            System.out.println(value);
        }

        //获得列表长度 命令：llen 键
        Long size = listOperations.size("mylist");
        for (int i = 0; i < size; i++) {
            //出队列
            //命令：rpop 键
            //从右边删除一个元素，返回被删除的元素
            String element = (String) listOperations.rightPop("mylist");
            System.out.println(element);
        }
}

```
