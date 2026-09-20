# 案例

## 目录

- [测试数据准备：](#测试数据准备)
- [需求1：查询停车场的每种颜色车辆的总价  ](#需求1查询停车场的每种颜色车辆的总价)
- [练习2：查询停车场每种颜色车辆总价大于30W的车辆颜色，并显示总价  ](#练习2查询停车场每种颜色车辆总价大于30W的车辆颜色并显示总价)

# 测试数据准备：

![](./assets/image/image_nsX7Lzjhpa.png)

需求1：查询停车场的每种颜色车辆的总价

```sql 
select color,sum(price) from car group by color;
```


![](./assets/image/image_1UiTgtyd5_.png)

![](./assets/image/image_eDA7nuX1aF.png)

练习2：查询停车场每种颜色车辆总价大于30W的车辆颜色，并显示总价

```sql 
select color,sum(price) from car  group by color having sum(price)>30;
```


![](./assets/image/image_ProFzxrg_w.png)
