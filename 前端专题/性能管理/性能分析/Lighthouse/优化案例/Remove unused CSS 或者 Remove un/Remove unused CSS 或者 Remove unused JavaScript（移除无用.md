# Remove unused CSS 或者 Remove unused JavaScript（移除无用的js和css）

> 考虑一下按需引入和CDN(这个在实际项目中会比较复杂，因为代码比较多。分析问题比较难)

> 我随便加了几个第三方库，写了几个页面。首先看看大小，明明打包出来压缩的是493k的怎么加载时1643k呢!

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38c1e9cb228940c7bcecdb5e00cd67ba~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

去看看nginx配置，哦豁，示范的时候，我把开启Gzip注释了，放开放开，之后看看正常了。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b21b848340094df09e08491035e85c6b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08376e800fe8442893e561a416a5025d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cde3418ca69148959acf4a18e81df65d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d50f5151609b4c798443b101002c628d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

结果

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/997ad7e398e1451cbefcad4e053c0f48~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bd99e6f6fb2462daee7b00ebf8204d8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

我把压缩释放看看，点开Coverage面板，刷新看看。可以看到那些是关键资源（红色非关键，蓝色关键资源）。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc660a736e5a4b158130dbb118b653da~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

点击查看详细加载情况，红色的就是没有使用的代码，但是打包压缩后的代码，我们一般都看不出来是人还是鬼。所以我们尽量对代码进行切割，不仅可以减少大文件加载的时间，也可以明确问题所在。

![](image_Moc1FHXQ3Q.png)

我们可以处理一下第三方的js，能看到echarts和elemenet-ui加载的大小和实际使用的大小有出入，一般Lighthouse用超过20 kb的未使用代码标记每个JavaScript文件。我们改变一下element-ui的引入方式，目前是全局引入，我们可以使用按需引入，因为目前我只用到了Button，我们就只需要引入Button。优化后打包大小明显变小。

![](image_EUU3RCwcQc.png)
