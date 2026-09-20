# Nginx缓存机制

## 目录

- [缓存清理](#缓存清理)

对于**性能优化而言，缓存是一种能够大幅度提升性能的方案**，因此几乎可以在各处都能看见缓存，**如客户端缓存、代理缓存、服务器缓存**等等，`Nginx`的缓存**则属于代理缓存的一**种。对于整个系统而言，加入缓存带来的优势额外明显：

- **减少了再次向后端或文件服务器请求资源的带宽消耗。**
- **降低了下游服务器的访问压力，提升系统整体吞吐。**
- **缩短了响应时间，提升了加载速度，打开页面的速度更快。**

那么在`Nginx`中，又该如何配置代理缓存呢？先来看看缓存相关的配置项：

**「proxy\_cache\_path」**：代理缓存的路径。

语法：

```nginx 
proxy_cache_path path [levels=levels] [use_temp_path=on|off] keys_zone=name:size [inactive=time] [max_size=size] [manager_files=number] [manager_sleep=time] [manager_threshold=time] [loader_files=number] [loader_sleep=time] [loader_threshold=time] [purger=on|off] [purger_files=number] [purger_sleep=time] [purger_threshold=time];

```


是的，你没有看错，就是这么长....，解释一下每个参数项的含义：

- `path`：缓存的路径地址。
- `levels`：缓存存储的层次结构，最多允许三层目录。
- `use_temp_path`：是否使用临时目录。
- `keys_zone`：指定一个共享内存空间来存储热点Key(1M可存储8000个Key)。
- `inactive`：设置缓存多长时间未被访问后删除（默认是十分钟）。
- `max_size`：允许缓存的最大存储空间，超出后会基于LRU算法移除缓存，Nginx会创建一个Cache manager的进程移除数据，也可以通过purge方式。
- `manager_files`：manager进程每次移除缓存文件数量的上限。
- `manager_sleep`：manager进程每次移除缓存文件的时间上限。
- `manager_threshold`：manager进程每次移除缓存后的间隔时间。
- `loader_files`：重启Nginx载入缓存时，每次加载的个数，默认100。
- `loader_sleep`：每次载入时，允许的最大时间上限，默认200ms。
- `loader_threshold`：一次载入后，停顿的时间间隔，默认50ms。
- `purger`：是否开启purge方式移除数据。
- `purger_files`：每次移除缓存文件时的数量。
- `purger_sleep`：每次移除时，允许消耗的最大时间。
- `purger_threshold`：每次移除完成后，停顿的间隔时间。

**「proxy\_cache」**：开启或关闭代理缓存，开启时需要指定一个共享内存区域。

语法：

```nginx 
proxy_cache zone | off;

```


zone为内存区域的名称，即上面中keys\_zone设置的名称。

**「proxy\_cache\_key」**：定义如何生成缓存的键。

语法：

```nginx 
proxy_cache_key string;

```


string为生成Key的规则，如`$scheme$proxy_host$request_uri`。

**「proxy\_cache\_valid」**：缓存生效的状态码与过期时间。

语法

```nginx 
proxy_cache_valid [code ...] time;

```


code为状态码，time为有效时间，可以根据状态码设置不同的缓存时间。

例如：`proxy_cache_valid 200 302 30m;`

**「proxy\_cache\_min\_uses」**：设置资源被请求多少次后被缓存。

语法：

```nginx 
proxy_cache_min_uses number;

```


number为次数，默认为1。

**「proxy\_cache\_use\_stale」**：当后端出现异常时，是否允许Nginx返回缓存作为响应。

语法

```nginx 
proxy_cache_use_stale error;

```


error为错误类型，可配置`timeout|invalid_header|updating|http_500...`。

**「proxy\_cache\_lock」**：对于相同的请求，是否开启锁机制，只允许一个请求发往后端。

语法

```nginx 
proxy_cache_lock on | off;

```


「**proxy\_cache\_lock\_timeout**」：配置锁超时机制，超出规定时间后会释放请求。

```nginx 
proxy_cache_lock_timeout time;

```


**「proxy\_cache\_methods」**：设置对于那些HTTP方法开启缓存。

语法：

```nginx 
proxy_cache_methods method;

```


method为请求方法类型，如GET、HEAD等。

**「proxy\_no\_cache」**：定义不存储缓存的条件，符合时不会保存。

语法：

```nginx 
proxy_no_cache string...;

```


string为条件，例如`$cookie_nocache $arg_nocache $arg_comment;`

**「proxy\_cache\_bypass」**：定义不读取缓存的条件，符合时不会从缓存中读取。

语法：

```nginx 
proxy_cache_bypass string...;

```


和上面`proxy_no_cache`的配置方法类似。

**「add\_header」**：往响应头中添加字段信息。

语法：

```nginx 
add_header fieldName fieldValue;
```


**「\$upstream\_cache\_status」**：记录了缓存是否命中的信息，存在多种情况：

- `MISS`：请求未命中缓存。
- `HIT`：请求命中缓存。
- `EXPIRED`：请求命中缓存但缓存已过期。
- `STALE`：请求命中了陈旧缓存。
- `REVALIDDATED`：Nginx验证陈旧缓存依然有效。
- `UPDATING`：命中的缓存内容陈旧，但正在更新缓存。
- `BYPASS`：响应结果是从原始服务器获取的。

❝

PS：这个和之前的不同，之前的都是参数项，这个是一个Nginx内置变量。

❞

OK\~，对于`Nginx`中的缓存配置项大概了解后，接着来配置一下`Nginx`代理缓存：

```nginx 
http{  
    # 设置缓存的目录，并且内存中缓存区名为hot_cache，大小为128m，  
    # 三天未被访问过的缓存自动清楚，磁盘中缓存的最大容量为2GB。  
    proxy_cache_path /soft/nginx/cache levels=1:2 keys_zone=hot_cache:128m inactive=3d max_size=2g;  
      
    server{  
        location / {  
            # 使用名为nginx_cache的缓存空间  
            proxy_cache hot_cache;  
            # 对于200、206、304、301、302状态码的数据缓存1天  
            proxy_cache_valid 200 206 304 301 302 1d;  
            # 对于其他状态的数据缓存30分钟  
            proxy_cache_valid any 30m;  
            # 定义生成缓存键的规则（请求的url+参数作为key）  
            proxy_cache_key $host$uri$is_args$args;  
            # 资源至少被重复访问三次后再加入缓存  
            proxy_cache_min_uses 3;  
            # 出现重复请求时，只让一个去后端读数据，其他的从缓存中读取  
            proxy_cache_lock on;  
            # 上面的锁超时时间为3s，超过3s未获取数据，其他请求直接去后端  
            proxy_cache_lock_timeout 3s;  
            # 对于请求参数或cookie中声明了不缓存的数据，不再加入缓存  
            proxy_no_cache $cookie_nocache $arg_nocache $arg_comment;  
            # 在响应头中添加一个缓存是否命中的状态（便于调试）  
            add_header Cache-status $upstream_cache_status;  
        }  
    }  
}  

```


接着来看一下效果，如下：

![](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbucU3YYnB5Fvfaw8O67WQqDzsznFZYqbMXkRbz3ibOV5bGYOu4oyV5SRhwMosK8hp6zXcUzgROXrqcA/640?wx_fmt=png\&random=0.4564450335050465\&tp=webp\&wxfrom=5\&wx_lazy=1\&wx_co=1)

第一次访问时，因为还没有请求过资源，所以缓存中没有数据，因此没有命中缓存。第二、三次，依旧没有命中缓存，直至第四次时才显示命中，这是为什么呢？因为在前面的缓存配置中，我们配置了加入缓存的最低条件为：**「「资源至少要被请求三次以上才会加入缓存。」」** 这样可以避免很多无效缓存占用空间。

#### 缓存清理

当缓存过多时，**如果不及时清理会导致磁盘空间被“吃光”，因此我们需要一套完善的缓存清理机制去删除缓存**，在之前的`proxy_cache_path`参数中有`purger`相关的选项，开启后可以帮我们自动清理缓存，但遗憾的是：\*\*`purger`****系列参数只有商业版的****`NginxPlus`\*\***才能使用，因此需要付费才可使用。**

不过天无绝人之路，我们可以通过强大的第三方模块`ngx_cache_purge`来替代，先来安装一下该插件：①首先去到`Nginx`的安装目录下，创建一个`cache_purge`目录：

```nginx 
[root@localhost]# mkdir cache_purge && cd cache_purge  

```


②通过wget指令从github上拉取安装包的压缩文件并解压：

```nginx 
[root@localhost]# wget https://github.com/FRiCKLE/ngx_cache_purge/archive/2.3.tar.gz  
[root@localhost]# tar -xvzf 2.3.tar.gz  

```


③再次去到之前`Nginx`的解压目录下：

```nginx 
[root@localhost]# cd /soft/nginx/nginx1.21.6  

```


④重新构建一次`Nginx`，通过`--add-module`的指令添加刚刚的第三方模块：

```nginx 
[root@localhost]# ./configure --prefix=/soft/nginx/ --add-module=/soft/nginx/cache_purge/ngx_cache_purge-2.3/  

```


⑤重新根据刚刚构建的Nginx，再次编译一下，「但切记不要make install」 ：

```nginx 
[root@localhost]# make  

```


⑥删除之前`Nginx`的启动文件，不放心的也可以移动到其他位置：

```nginx 
[root@localhost]# rm -rf /soft/nginx/sbin/nginx  

```


⑦从生成的`objs`目录中，重新复制一个`Nginx`的启动文件到原来的位置：

```nginx 
[root@localhost]# cp objs/nginx /soft/nginx/sbin/nginx  

```


至此，第三方缓存清除模块`ngx_cache_purge`就安装完成了，接下来稍微修改一下`nginx.conf`配置，再添加一条`location`规则：

```nginx 
location ~ /purge(/.*) {  
  # 配置可以执行清除操作的IP（线上可以配置成内网机器）  
  # allow 127.0.0.1; # 代表本机  
  allow all; # 代表允许任意IP清除缓存  
  proxy_cache_purge $host$1$is_args$args;  
}  

```


然后再重启`Nginx`，接下来即可通过`http://xxx/purge/xx`的方式清除缓存。
