# 4.3.2.6操作有序集合类型数据

## 目录

- [4.3.2.6操作有序集合类型数据](#4326操作有序集合类型数据)

##### [4.3.2.6](http://tnm2.oa.com/host/home/4.3.2.6 "4.3.2.6")操作有序集合类型数据

![](./assets/image/image_AfmmCDSdg3.png)

需求:

> 1.向zset中添加数据
>
> 2.从zset中取出数据
>
> 3.对某个值的分数进行加20
>
> 4.删除数据

```javascript 
/**
 * 操作ZSet类型的数据
*/
@Test
public void testZset(){
        //获取操作zSet类型的接口对象
        ZSetOperations zSetOperations = redisTemplate.opsForZSet();

        //存值
        //Boolean add(K var1, V var2, double var3)  var1 表示键  var2 表示值   var3表示分数
        zSetOperations.add("myZset","a",10.0);//myZset 表示键  a 表示值   10.0 表示分数
        zSetOperations.add("myZset","b",11.0);
        zSetOperations.add("myZset","c",12.0);
        zSetOperations.add("myZset","a",13.0);

        //取值
        //命令：zrange 键 开始索引 结束索引
        //获取指定范围的元素，得到所有的元素，索引是0到-1
        Set<String> myZset = zSetOperations.range("myZset", 0, -1);
        for (String s : myZset) {
            System.out.println(s);
        }
        //修改分数
        //下面的方法表示在原来分数上进行加20
        zSetOperations.incrementScore("myZset","c",20.0);

        //删除成员
        zSetOperations.remove("myZset","a","b");

        //取值
         Set<ZSetOperations.TypedTuple> myZset = zSetOperations.rangeWithScores("myZset", 0, -1);
        for (ZSetOperations.TypedTuple typedTuple : myZset) {
            Double score = typedTuple.getScore();
            Object value = typedTuple.getValue();
            System.out.println(score+"---"+value);
        }
}

```
