# 配置区分测试和生产环境

## 目录

- [一](#一)
- [二](#二)

# 一

1、新增uat/prod环境变量文件

![](./assets/image/image_tPSm-vsFxb.webp)

![](./assets/image/image_P0wrI4m8Io.webp)

2、删除原ngnix.conf文件，新增nginx.temp文件，并使用占位符标识变量，其中的\$uri不是我们自定义的变量，替换时应该略过

![](./assets/image/image_nwcz6vTal8.webp)

3、新增自动化编译脚本：使用envsubst动态配置docker下的nginx

![](./assets/image/image_mpgvHIouXg.webp)

```javascript 
cd src && source uat.sh && envsubst '${ALLOW}' <nginx.temp> nginx.conf 
```


注：流水线构建脚本直接使用 '\${ALLOW}' 会被认为是 流水线的环境变量，如果没有不存在，则会会替换为' '

4、自动化编译后生成的nginx.conf文件

![](./assets/image/image_-MMuc8EJ_t.webp)

# 二

用户访问你们的应用是直连到nginx服务，中间没有网关层做转发。针对这种情况，目前我们给到的解决方案是，同时配置好各个环境的nginx配置文件，比如nginx\_dev、nginx\_prod，然后通过流水线配置linux文件拷贝命令，如生产环境 cp nginx\_prod.conf nginx.conf 这种形式
