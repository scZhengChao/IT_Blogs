# lottie

## 目录

- [api](#api)

[ lottie-web的使用, 好看的动画使用, 跳转到动画的第几秒播放\_yunchong\_zhao的博客-CSDN博客\_lottie-web 直接先上效果哈有些动画效果 要很逼真的效果,不管是原生的css 还是 gif动图 可能效果都不是太理想吧选来选去  最后选择使用了。lottie-web 这个插件他这个是根据一个json文件渲染动画如果json中有引用的图片的话,你用ae做出来的图片最好放到静态服务器上,然后更换json中的本地图片路径换成删除原来u的那个字段使用方法安装npm i lottie-web --save or yar https://blog.csdn.net/yunchong\_zhao/article/details/123054938](https://blog.csdn.net/yunchong_zhao/article/details/123054938 " lottie-web的使用, 好看的动画使用, 跳转到动画的第几秒播放_yunchong_zhao的博客-CSDN博客_lottie-web 直接先上效果哈有些动画效果 要很逼真的效果,不管是原生的css 还是 gif动图 可能效果都不是太理想吧选来选去  最后选择使用了。lottie-web 这个插件他这个是根据一个json文件渲染动画如果json中有引用的图片的话,你用ae做出来的图片最好放到静态服务器上,然后更换json中的本地图片路径换成删除原来u的那个字段使用方法安装npm i lottie-web --save or yar https://blog.csdn.net/yunchong_zhao/article/details/123054938")

```typescript 
import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";

function Lottie(){
    const lottieRef = useRef(null);
    const [stateLottie, setLottie] = useState(null);
    useEffect(() => {
        setLottie(
            lottie.loadAnimation<any>({
                container: lottieRef.current ,
                renderer: "svg",
                loop: true,
                autoplay: true,
                path: "/lottie/one.json",
            })
        );
    }, []);
    return (
        <div ref={lottieRef} style={{width:'50%',height:'50%',overflow:"hidden"}}></div>
    )
}
export default Lottie
```


流行的一些动画：

[   https://juejin.cn/post/6844903661760413704](https://juejin.cn/post/6844903661760413704 "   https://juejin.cn/post/6844903661760413704")

[ LottieFiles: Download Free lightweight animations for website & apps. Effortlessly bring the smallest, free, ready-to-use motion graphics for the web, app, social, and designs. Create, edit, test, collaborate, and ship Lottie animations in no time! https://lottiefiles.com/?page=6](https://lottiefiles.com/?page=6 " LottieFiles: Download Free lightweight animations for website & apps. Effortlessly bring the smallest, free, ready-to-use motion graphics for the web, app, social, and designs. Create, edit, test, collaborate, and ship Lottie animations in no time! https://lottiefiles.com/?page=6")

[LottieFiles: Download Free lightweight animations for website & apps. Effortlessly bring the smallest, free, ready-to-use motion graphics for the web, app, social, and designs. Create, edit, test, collaborate, and ship Lottie animations in no time! https://lottiefiles.com/popular](https://lottiefiles.com/popular "LottieFiles: Download Free lightweight animations for website & apps. Effortlessly bring the smallest, free, ready-to-use motion graphics for the web, app, social, and designs. Create, edit, test, collaborate, and ship Lottie animations in no time! https://lottiefiles.com/popular")

# api

1. animation.play()：播放，从当前帧开始播放；
2. animation.stop()：停止，并回到第0帧；
3. animation.pause()：暂停，并保持当前帧；
4. animation.goToAndStop(value, isFrame)：跳到某个时刻/帧并停止（isFrame（可省略，默认false：毫秒；true：帧）指明value的单位是毫秒还是帧）；
5. animation.goToAndPlay(value, isFrame)：跳到某个时刻/帧并播放；
