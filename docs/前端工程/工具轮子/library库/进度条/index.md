# 进度条

## 目录

- [NProgress](#NProgress)

# NProgress

官网：<https://www.npmjs.com/package/nprogress>
参考：<https://baijiahao.baidu.com/s?id=1588102811611311695&wfr=spider&for=pc>

```typescript 
//引入
    import NProgress from 'nprogress';
    import 'nprogress/nprogress.css';
//配置
    NProgress.inc(0.2)
    NProgress.configure({ easing: 'ease', speed: 500, showSpinner: true })
//使用
  NProgress.start(); //开始
  NProgress.done() ; // 结束
    //一波cli3的跨域配置和 nprogress 设置
    NProgress.start()
    fetch(
         'http://localhost:8080/api/v2/movie/top250'
    ).then(
         res=>res.json()
    ).then(
         res => {
             console.log(res)
             NProgress.done()
         }
    )
    router.beforeEach((to,from,next) => {
        NProgress.start()
        next()
    })
    router.afterEach((to,from) => {
        Progress.done()
    )
```
