# blur 和 click 冲突

## 目录

- [blur 和 click 冲突](#blur-和-click-冲突)

# **blur 和 click 冲突**

顺序:mousedown、mouseup、click 

[https://blog.csdn.net/ligang2585116/article/details/51764828](https://blog.csdn.net/ligang2585116/article/details/51764828 "https://blog.csdn.net/ligang2585116/article/details/51764828")

    1.对blur事件进行延迟，让click先执行。

    2.将click事件改为mousedown，让其优先于blur事件执行

[https://blog.csdn.net/qq\_30868289/article/details/79484322](https://blog.csdn.net/qq_30868289/article/details/79484322 "https://blog.csdn.net/qq_30868289/article/details/79484322")

    ---单机和双击
