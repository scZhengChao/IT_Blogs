# 临时表

```sql 
# 1.理清需求；确认表；
# 2.获取查询条件

select (cur_price - pre_close_price) / stock_rt_info.pre_close_price as ud, date_format(cur_time, '%Y%m%d%H%i') as time
from stock_rt_info
where cur_time between '2022-01-06 09:30:00' and '2022-01-06 14:25:00'
having ud >= 0.1;


select temp.time, count(*) as count
from () as temp
group by temp.time;


select temp.time, count(*) as count
from (select (cur_price - pre_close_price) / stock_rt_info.pre_close_price as ud,
             date_format(cur_time, '%Y%m%d%H%i')                           as time
      from stock_rt_info
      where cur_time between '2022-01-06 09:30:00' and '2022-01-06 14:25:00'
      having ud >= 0.1) as temp
group by temp.time

```
