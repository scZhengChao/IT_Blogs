# group by / sum

```sql 
select date_format(cur_time,"%y%m%d%h%m") as time, sum(trade_amount) as count
from stock_market_index_info
where cur_time between '2022-01-03 09:30:00' and '2022-01-03 14:40:00'
  and market_code in ("sh000001", "sz399001")
group by cur_time
order by cur_time asc


```


- 这个地方不写`order by `也会排序；原因是`cur_time`是索引是`b + tree`；本身就是从小到大排序&#x20;
