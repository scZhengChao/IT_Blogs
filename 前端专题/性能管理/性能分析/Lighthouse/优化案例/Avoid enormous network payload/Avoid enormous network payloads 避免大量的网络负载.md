# Avoid enormous network payloads 避免大量的网络负载

这个涉及因素比较多，考虑从多方面入手，参考下面方法：

减少网络负载方法

- 将请求推迟到需要时再发送。有关的方法，请参阅PRPL模式。
- 最小化和压缩网络负载。
- 对图像使用WebP而不是JPEG或PNG（图片要求不严格，可以压缩体积，我常用的在线压缩网站[tinypng.com/）。](https://link.juejin.cn/?target=https://tinypng.com/%EF%BC%89%E3%80%82 "tinypng.com/）。")
- 将JPEG图像的压缩级别设置为85。
- 缓存请求，以使页面在重复访问时不会重新下载资源。（请参阅“网络可靠性”登录页面，以了解缓存的工作原理以及实现方法。）

PRPL

- Push（推送或预加载）最重要的资源。
- Render：尽快渲染初始路线。
- Pre-cache 预缓存剩余资源。
- Lazy load 延迟加载其他路由和非关键资源。

比如：vuecli3.x or 4.x默认打包之后，部署到服务器上的项目，会对静态资源的标签上默认加载preload或者prefetch属性（**preload主要用于预加载当前页面需要的资源；而prefetch主要用于加载将来页面可能需要的资源**）

预加载&&延迟加载

- preload ：是一种声明式的资源获取请求方式，用于提前加载一些需要的依赖，并且不会影响页面的onload事件。通过在HTML文档的开头添加标记rel="preload"来预加载关键资源，浏览器为资源设置了更合适的优先级，如果as属性被省略，那么该请求将会当做异步请求处理： &#x20;

  `<link rel="preload" as="style" href="css/style.css">`
- prefetch ：是一种利用浏览器的空闲时间加载页面将来可能用到的资源的一种机制；通常可以用于加载非首页的其他页面所需要的资源，以便加快后续页面的首屏速度；
- 延迟加载 ：是一种根据需要而不是预先加载资源的策略。这种方法在初始页面加载期间释放了资源，并避免了加载从未使用过的资产。
  > 如果您在网页上加载许多图像，请在加载页面时推迟所有折叠以下或设备视口之外的图像（请参阅使用[lazysizes](https://link.juejin.cn/?target=https://web.dev/use-lazysizes-to-lazyload-images/ "lazysizes")延迟加载图像）。
