# 常用插件

## 目录

- [视频播放vue-video-player](#视频播放vue-video-player)
- [vue-infinite-scroll](#vue-infinite-scroll)

# 视频播放vue-video-player

import VideoPlayer from 'vue-video-player'

require('video.js/dist/video-js.css')

require('vue-video-player/src/custom-theme.css')

Vue.use(VideoPlayer)

 \<video-player  class="video-player vjs-custom--skin"            

ref="videoPlayer"           

 :playsinline="true"           

:options="playerOptions"        

\>

\</video-player>

playerOptions : {

            playbackRates: \[0.7, 1.0, 1.5, 2.0], //播放速度

            autoplay: false, //如果true,浏览器准备好时开始回放。

            muted: false, // 默认情况下将会消除任何音频。

            loop: false, // 导致视频一结束就重新开始。

            preload: 'auto', // 建议浏览器在\<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）

            language: 'zh-CN',

            aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）

            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。

            sources: \[{

            type: "",

            src: '<http://vjs.zencdn.net/v/oceans.mp4'//url地址 >        &#x20;

            // src: "" //url地址

            }],

            poster: "", //你的封面地址

            // width: document.documentElement.clientWidth,

            notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。

            controlBar: {

                timeDivider: true,

                durationDisplay: true,

                remainingTimeDisplay: false,

                fullscreenToggle: true  //全屏按钮

            }

        }

# vue-infinite-scroll

无限滚动指令

[一个超详细vue无限滚动vue-infinite-scroll插件的配置及使用详解 - river.cao - 博客园 开发中总会遇到这种下拉加载的设计方案，Vue实现下拉加载最佳方案自然是使用vue-infinite-scroll来实现。接下来我们一起看下它的配置及使用方式。 首先我们先了解下他的配置参数： v-in https://www.cnblogs.com/yingcaiyi/p/11765971.html](https://www.cnblogs.com/yingcaiyi/p/11765971.html "一个超详细vue无限滚动vue-infinite-scroll插件的配置及使用详解 - river.cao - 博客园 开发中总会遇到这种下拉加载的设计方案，Vue实现下拉加载最佳方案自然是使用vue-infinite-scroll来实现。接下来我们一起看下它的配置及使用方式。 首先我们先了解下他的配置参数： v-in https://www.cnblogs.com/yingcaiyi/p/11765971.html")

文档很简单；但是这里有一个大坑；&#x20;

**原生必须一开始就加载；不能v-if ； 或者modal里动态加载**

**如果你不是马上加载特别是在modal （建议立即弃用；坑）**
