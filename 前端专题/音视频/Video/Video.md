# Video

## 目录

- [1.xgplayer](#1xgplayer)

# 1.xgplayer

西瓜/抖音/字节跳动视频播放插件

**首选：大神级**

文档地址：

[西瓜播放器 一款带解析器、节省流量的HTML5视频播放器 https://v2.h5player.bytedance.com/](https://v2.h5player.bytedance.com/ "西瓜播放器 一款带解析器、节省流量的HTML5视频播放器 https://v2.h5player.bytedance.com/")

[https://github.com/bytedance/xgplayer](https://github.com/bytedance/xgplayer "https://github.com/bytedance/xgplayer")   github地址

关键在于我要在自定义样式；`issues`

![  ](c83788fc5453fdfe8c0241828c94d6b4_l_JGnR3Mrz.png "  ")

```javascript 
module.exports = {
    chainWebpack: config => {
        const svgRule = config.module.rule('svg')
        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear()
        // 添加要替换的 loader
        svgRule
            .use('raw-loader')
            .loader('raw-loader')
    }
}
```


**这一下就把样式浮在了视频上方；经验证；确实可行；牛**

[ DIY video player - 自定义video播放器样式\_weixin\_33814685的博客-CSDN博客 DIY本文基于HTML5 Video API，自定义Web视频播放器样式。其实吧，原生的video 标签样式挺好看的，但每个人的视觉感受不一样，所以就会有需要改变原生样式的时候。那就给它化个妆咯。淡妆，淡妆。【code here】\&lt;video class="ppq-video video-hidden" src="http... https://blog.csdn.net/weixin\_33814685/article/details/88742269](https://blog.csdn.net/weixin_33814685/article/details/88742269 " DIY video player - 自定义video播放器样式_weixin_33814685的博客-CSDN博客 DIY本文基于HTML5 Video API，自定义Web视频播放器样式。其实吧，原生的video 标签样式挺好看的，但每个人的视觉感受不一样，所以就会有需要改变原生样式的时候。那就给它化个妆咯。淡妆，淡妆。【code here】\&lt;video class=\"ppq-video video-hidden\" src=\"http... https://blog.csdn.net/weixin_33814685/article/details/88742269")

还有这个：也可以看一下：自定义样式

上面demo的github地址：   [https://github.com/xiaohuazheng/videoplayer](https://github.com/xiaohuazheng/videoplayer "https://github.com/xiaohuazheng/videoplayer")

**最后：移动端的千万不要先入为主：video全屏，而是让div全屏；只有这样才能自定义控制样式**

这样有强迫症的就可以造轮子了；
