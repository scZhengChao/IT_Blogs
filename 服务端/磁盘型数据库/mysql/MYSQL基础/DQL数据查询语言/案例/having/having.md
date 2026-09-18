# having

- 不走索引
- 是对已经插出来的数据；已经在数据库内存中的数据 过滤

```sql 

select (cur_price - pre_close_price) / stock_rt_info.pre_close_price as ud, cur_time
from stock_rt_info
where cur_time between '2022-01-06 09:30:00' and '2022-01-06 14:25:00'
having ud >= 0.1
```
