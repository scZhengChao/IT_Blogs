# 单张表 加减乘除

```sql 
select smi.market_code                                             AS code,
       smi.market_name                                             AS name,
       smi.open_point                                              AS openPoint,
       smi.cur_point                                               AS curPoint,
       smi.pre_close_point                                         AS preClosePoint,
       smi.trade_amount                                            AS tradeAmt,
       smi.trade_volume                                            AS tradeVol,
       smi.cur_point - smi.pre_close_point                         AS upDown,
       (smi.cur_point - smi.pre_close_point) / smi.pre_close_point AS rose,
       (smi.max_point - smi.min_point) / smi.pre_close_point       AS amplitude,
       smi.cur_time                                                AS curTime
from stock_market_index_info as smi
where smi.cur_time = '2021-12-28 09:31:00'
  and market_code in ('sh000001', 'sz399001')

```
