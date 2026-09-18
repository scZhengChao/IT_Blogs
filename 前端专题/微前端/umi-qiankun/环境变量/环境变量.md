# 环境变量

如果您有一些不能显式编写在 `.umirc.ts` 或 `src/app.ts` 中的配置信息，可以将它**们存放在环境变量文件中**。例如编写父应用的环境变量文件 `.env` 如下：

```javascript 
INITIAL_QIANKUN_MASTER_OPTIONS="{\"apps\":[{\"name\":\"app1\",\"entry\":\"//localhost:7001\"},{\"name\":\"app2\",\"entry\":\"//localhost:7002\"}]}"
```


在内部，微前端插件会执行 `JSON.parse(process.env.INITIAL_QIANKUN_MASTER_OPTIONS)`方法，然后将**得到的结果与已有的配置信息合并。** 上面编写的环境变量，合并后相当于编写了如下配置信息：

```javascript 
export default {
  qiankun: {
    master: {
      apps: [
        {
          name: 'app1',
          entry: '//localhost:7001',
        },
        {
          name: 'app2',
          entry: '//localhost:7002',
        },
      ],
      // ... .umirc.ts 中其它的配置信息
    },
  },
};
```


需注意的是，当存在相同的配置项时，例如 `apps` 项，写在 `.umirc.ts` 中的配置项将**覆盖**环境变量中的配置项

同理，对于子应用，可以编写环境变量 `.env` 文件如下：

```javascript 
INITIAL_QIANKUN_SLAVE_OPTIONS="{\"enable\":false}"
```


相当于编写了如下配置信息：

```javascript 
export default {
  qiankun: {
    slave: {
      enable: false,
      // ... .umirc.ts 中其它的配置信息
    },
  },
};
```
