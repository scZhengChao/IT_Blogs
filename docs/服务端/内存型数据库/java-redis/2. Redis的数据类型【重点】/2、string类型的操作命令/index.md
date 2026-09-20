# 2、string类型的操作命令

## 目录

- [目标](#目标)
- [字符串类型string](#字符串类型string)
- [常用命令](#常用命令)

#### 目标

学习操作String类型数据的命令

#### 字符串类型string

字符串类型是`Redis`中最为基础的数据存储类型，它在**Redis中以二进制保存。无论存入的是字符串、整数、浮点类型都会以字符串写入。**

**在Redis中字符串类型的值最多可以容纳的数据长度是512M**，这是以后最常用的数据类型。

![](./image/image_aRrxF-SjZh.png)

#### 常用命令

更多命令可以参考Redis中文网：[https://www.redis.net.cn](https://www.redis.net.cn "https://www.redis.net.cn")

| 命令                                       | 功能                                                                                     |
| ---------------------------------------- | -------------------------------------------------------------------------------------- |
| set 键 值                                  | 添加或修改一个键和值，键不存在就是添加，存在就是修改                                                             |
| get 键                                    | 获取值，如果存在就返回值，不存在返回nil(就是C语言中NULL)                                                      |
| del 键                                    | 删除指定的键和值，返回删除的个数                                                                       |
| \*\*SETEX \*\*key seconds value          | 设置指定key的值，并将 key 的过期时间设为 seconds 秒。此处的value是指key对应的value值。等价于：SET key value ex seconds |
| EXPIRE key seconds                       | 如果一个key已经存在，要设置一个过期时间                                                                  |
| \*\*SETNX \*\*key value/set key value nx | 保存键值对，如果key存在则不保存，不存在则保存                                                               |

```markdown 
补充：
批量操作：
mset  name lisi   addr sh
mget name  age addr
del  name age

```
