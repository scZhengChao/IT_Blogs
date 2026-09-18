# video

## 目录

- [video](#video)
  - [禁止下载，禁止全屏](#禁止下载禁止全屏)
  - [事件](#事件)
- [属性：](#属性)
  - [video:](#video)
  - [全屏](#全屏)
  - [捕捉摄像头](#捕捉摄像头)
    - [navigatior getUserMedia](#navigatior-getUserMedia)
    - [Navigator.mediaDevices](#NavigatormediaDevices)
  - [自动播放](#自动播放)
  - [兼容格式](#兼容格式)
  - [修改默认样式](#修改默认样式)
  - [常见问题](#常见问题)

# video

```html 
<!-- video 不支持 IE8及以下版本浏览器，支持三种视频格式：MP4，WebM 和 Ogg -->
<video src="test.mp4" controls width="400" height="300"></video>
```


[\<video>: 视频嵌入元素 - HTML（超文本标记语言） | MDN HTML \<video> 元素 用于在 HTML 或者 XHTML 文档中嵌入媒体播放器，用于支持文档内的视频播放。你也可以将 \<video> 标签用于音频内容，但是 \<audio> 元素可能在用户体验上更合适。 https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video "<video>: 视频嵌入元素 - HTML（超文本标记语言） | MDN HTML <video> 元素 用于在 HTML 或者 XHTML 文档中嵌入媒体播放器，用于支持文档内的视频播放。你也可以将 <video> 标签用于音频内容，但是 <audio> 元素可能在用户体验上更合适。 https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video")

#### 禁止下载，禁止全屏

```html 
<!-- 禁止下载，禁止全屏 -->  
<video src="test.mp4" controls controlslist="nodownload nofullscreen" width="400" height="300"></video>
```


## 事件

```html 
<video src="test.mp4" controls width="400" height="300" id="video"></video>
  <script>
    var video = document.getElementById('video')
    // 1、loadstart：视频开始查找。当浏览器开始寻找指定的音频/视频时触发，也就是当加载过程开始时
    video.addEventListener('loadstart', function(e) {
      console.log('提示视频的元数据已加载')
      console.log(e)
      console.log(video.duration)            // NaN
    })
    // 2、durationchange：时长变化。当指定的音频/视频的时长数据发生变化时触发，加载后，时长由 NaN 变为音频/视频的实际时长
    video.addEventListener('durationchange', function(e) {
      console.log('提示视频的时长已改变')
      console.log(e)
      console.log(video.duration)           // 528.981333   视频的实际时长（单位：秒）
    })
    // 3、loadedmetadata ：元数据加载。当指定的音频/视频的元数据已加载时触发，元数据包括：时长、尺寸（仅视频）以及文本轨道
    video.addEventListener('loadedmetadata', function(e) {
      console.log('提示视频的元数据已加载'
      console.log(e)
    })

    // 4、loadeddata：视频下载监听。当当前帧的数据已加载，但没有足够的数据来播放指定音频/视频的下一帧时触发第一帧
    video.addEventListener('loadeddata', function(e) {
      console.log('提示当前帧的数据是可用的')
      console.log(e)
    })

    // 5、progress：浏览器下载监听。当浏览器正在下载指定的音频/视频时触发
    video.addEventListener('progress', function(e) {
      console.log('提示视频正在下载中')
      console.log(e)
    })

    // 6、canplay：可播放监听。当浏览器能够开始播放指定的音频/视频时触发
    video.addEventListener('canplay', function(e) {
      console.log('提示该视频已准备好开始播放')
      console.log(e)
    })

    // 7、canplaythrough：可流畅播放。当浏览器预计能够在不停下来进行缓冲的情况下持续播放指定的音频/视频时触发
    video.addEventListener('canplaythrough', function(e) {
      console.log('提示视频能够不停顿地一直播放')
      console.log(e)
    })

    // 8、play：开发播放监听
    video.addEventListener('play', function(e) {
      console.log('提示该视频正在播放中')
      console.log(e)
    })

    // 9、pause：暂停播放监听
    video.addEventListener('pause', function(e) {
      console.log('暂停播放')
      console.log(e)
    })

    // 10、seeking：查找开始。当用户开始移动/跳跃到音频/视频中新的位置时触发
    video.addEventListener('seeking', function(e) {
      console.log('开始移动进度条')
      console.log(e)
    })

    // 11、seeked：查找结束。当用户已经移动/跳跃到视频中新的位置时触发
    video.addEventListener('seeked', function(e) {
      console.log('进度条已经移动到了新的位置')
      console.log(e)
    })

    // 12、waiting：视频加载等待。当视频由于需要缓冲下一帧而停止，等待时触发
    video.addEventListener('waiting', function(e) {
      console.log('视频加载等待')
      console.log(e)
    })

    // 13、playing：当视频在已因缓冲而暂停或停止后已就绪时触发
    video.addEventListener('playing', function(e) {
      console.log('playing')
      console.log(e)
    })

    // 14、timeupdate：目前的播放位置已更改时，播放时间更新
    video.addEventListener('timeupdate', function(e) {
      console.log('timeupdate')
      console.log(e)
    })

    // 15、ended：播放结束
    video.addEventListener('ended', function(e) {
      console.log('视频播放完了')
      console.log(e)
    })

    // 16、error：播放错误
    video.addEventListener('error', function(e) {
      console.log('视频出错了')
      console.log(e)
    })

    // 17、volumechange：当音量更改时
    video.addEventListener('volumechange', function(e) {
      console.log('volumechange')
      console.log(e)
    })

    // 18、stalled：当浏览器尝试获取媒体数据，但数据不可用时
    video.addEventListener('stalled', function(e) {
      console.log('stalled')
      console.log(e)
    })

    // 19、ratechange：当视频的播放速度已更改时
    video.addEventListener('ratechange', function(e) {
      console.log('ratechange')
      console.log(e)
    })
  </script>

方法：
let video = documnet.getElementById('video');
let ability = video.canPlayType('video/mp4');  //检测该浏览器是否支持某种类型视频，例如MP4
//返回"probably","maybe",""  
video.play();  //播放
video.pause()  //暂停
video.src='other.mp4';  
video.load(); //加载，一般用于更改源，重新加载视频
```


# **属性：**

```markdown 
currentSrc当前视频地址 

currentTime 视频已播放时间 

videoWidth 视频本身的宽度 

videoHeight 视频本身的高度 

duration 视频长度，流返回无限 

ended 是否播放结束 

error 媒体错误（null:正常）

 paused 是否停止 

muted 是否静音 

seeking 是否在seeking 

volume 音量 

height 播放框的高度 

width 播放框的宽度

startTime 开始时间，默认为0 

defaultPlaybackRate 默认回放速度 

playbackRate 当前播放速度

preload="load" auto - 当页面加载后载入整个视频 meta - 当页面加载后只载入元数据 none - 当页面加载后不载入视频  
```


参考资料；属性和事件大全

[video 属性和事件用法大全 - rogerwu - 博客园 1、video 属性 2、video 事件 https://www.cnblogs.com/rogerwu/p/10072119.html](https://www.cnblogs.com/rogerwu/p/10072119.html "video 属性和事件用法大全 - rogerwu - 博客园 1、video 属性 2、video 事件 https://www.cnblogs.com/rogerwu/p/10072119.html")

[https://blog.csdn.net/zhonghuachun/article/details/81484410](https://blog.csdn.net/zhonghuachun/article/details/81484410 "https://blog.csdn.net/zhonghuachun/article/details/81484410")

## video:

&#x9;dom属性：

&#x9;	src:'视频源'

&#x9;	autoplay="autoplay"	-> autoplay 自动播放

&#x9;	controls 是否出现控制句柄  true/false controls="controls"

&#x9;	poster 预览图

&#x9;	loop 循环

&#x9;	....

&#x9;js属性：

&#x9;	autoplay:true/false

&#x9;	v.currentTime 磁头位置，播放时间 读写

&#x9;	v.volume 音量 0 - 1

&#x9;	v.muted 是否静音  true/false

&#x9;	v.playbackRate 返回 播放速率 默认 1  0-8

&#x9;	v.duration 总时间（长度)

&#x9;	v.autoplay   true/false

&#x9;	v.controls   true/false

&#x9;	v.loop       true/false

&#x9;	......

&#x9;方法：

&#x9;	v.play() 播放

&#x9;	v.pause() 暂停

&#x9;	v.webkitRequestFullScreen();

&#x9;	...

base64:

&#x9;data:type;data: 8bit编码

&#x9;type： image/jpeg

下面实例 都是以封装类的形式 写的； 比较有参考&#x20;

[my.7z](my_8KrJogM2Dg.7z "my.7z")

## 全屏

//进入全屏

function FullScreen() {

    var ele = document.documentElement;

    if (ele.requestFullscreen) {

        ele.requestFullscreen();

    } else if (ele.mozRequestFullScreen) {

        ele.mozRequestFullScreen();

    } else if (ele.webkitRequestFullScreen) {

        ele.webkitRequestFullScreen();

    }

}

//退出全屏

function exitFullscreen() {

    var de = document;

    if (de.exitFullscreen) {

        de.exitFullscreen();

    } else if (de.mozCancelFullScreen) {

        de.mozCancelFullScreen();

    } else if (de.webkitCancelFullScreen) {

        de.webkitCancelFullScreen();

    }

}

- 当页面是iframe引入的时候，这时候全屏功能会直接报错，原因是因为iframe默认不同意其嵌入的内容可以直接开启全屏，需要我们手动配置一下。很简单。

\<iframe allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true">\<iframe/>

如何监听全屏

video("fullscreenchange", function(e) {

  console.log("fullscreenchange", e);

});

video.addEventListener("mozfullscreenchange", function(e) {

  console.log("mozfullscreenchange ", e);

});

video.addEventListener("webkitfullscreenchange", function(e) {

  console.log("webkitfullscreenchange", e);

});

video.addEventListener("msfullscreenchange", function(e) {

  console.log("msfullscreenchange", e);

});

[  https://javascript.ruanyifeng.com/htmlapi/fullscreen.html](https://javascript.ruanyifeng.com/htmlapi/fullscreen.html "  https://javascript.ruanyifeng.com/htmlapi/fullscreen.html")

兼容ios：

- 注意，需要同时添加webkit-playinline 和 playinline可以解决在App和Safari都出现的全屏播放问题。
- ios 10 以上  x5-video-player-type='h5' x5-video-player-fullscreen='true'

## 捕捉摄像头

### navigatior getUserMedia

window\.addEventListener("DOMContentLoaded", function () {

        // Grab elements, create settings, etc.

        var canvas = document.getElementById("canvas"),

        context = canvas.getContext("2d"),

        video = document.getElementById("video"),

        videoObj = { "video": true },

        errBack = function (error) {

            console.log("Video capture error: ", error.code);

        };

        if (navigator.getUserMedia) { // Standard

            navigator.getUserMedia(videoObj, function (stream) {

                video.src = stream;

                video.play();

            }, errBack);

        } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed引擎

            navigator.webkitGetUserMedia(videoObj, function (stream) {

                video.src = window\.webkitURL.createObjectURL(stream);

                video.play();

            }, errBack);

        }

        else if (navigator.mozGetUserMedia) { // Firefox-prefixed

            navigator.mozGetUserMedia(videoObj, function (stream) {

                video.src = window\.URL.createObjectURL(stream);

                video.play();

            }, errBack);

        }

    }, false);

注意：在微信上不生效：谷歌上生效可以待用电脑摄像头

### Navigator.mediaDevices

参考资料

[  https://blog.csdn.net/qq\_41630351/article/details/107403269?utm\_medium=distribute.pc\_relevant\_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.add\_param\_isCf\&depth\_1-utm\_source=distribute.pc\_relevant\_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.add\_param\_isCf](https://blog.csdn.net/qq_41630351/article/details/107403269?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.add_param_isCf\&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.add_param_isCf "  https://blog.csdn.net/qq_41630351/article/details/107403269?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.add_param_isCf\&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.add_param_isCf")

官网：兼容写法

[MediaDevices.getUserMedia() - Web API 接口参考 | MDN MediaDevices.getUserMedia() 会提示用户给予使用媒体输入的许可，媒体输入会产生一个MediaStream，里面包含了请求的媒体类型的轨道。此流可以包含一个视频轨道（来自硬件或者虚拟视频源，比如相机、视频采集设备和屏幕共享服务等等）、一个音频轨道（同样来自硬件或虚拟音频源，比如麦克风、A/D 转换器等等），也可能是其它轨道类型。 https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia "MediaDevices.getUserMedia() - Web API 接口参考 | MDN MediaDevices.getUserMedia() 会提示用户给予使用媒体输入的许可，媒体输入会产生一个MediaStream，里面包含了请求的媒体类型的轨道。此流可以包含一个视频轨道（来自硬件或者虚拟视频源，比如相机、视频采集设备和屏幕共享服务等等）、一个音频轨道（同样来自硬件或虚拟音频源，比如麦克风、A/D 转换器等等），也可能是其它轨道类型。 https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia")

这个比较大佬

[javascript使用H5新版媒体接口navigator.mediaDevices.getUserMedia，做扫描二维码，并识别内容 - 极·简 - 博客园 本文代码测试要求，最新的chrome浏览器(手机APP)，并且要允许chrome拍照录像权限，必须要HTTPS协议，http不支持。 原理：调用摄像头，将摄像头返回的媒体流渲染到视频标签中，再通过ca https://www.cnblogs.com/linx/p/10233162.html](https://www.cnblogs.com/linx/p/10233162.html "javascript使用H5新版媒体接口navigator.mediaDevices.getUserMedia，做扫描二维码，并识别内容 - 极·简 - 博客园 本文代码测试要求，最新的chrome浏览器(手机APP)，并且要允许chrome拍照录像权限，必须要HTTPS协议，http不支持。 原理：调用摄像头，将摄像头返回的媒体流渲染到视频标签中，再通过ca https://www.cnblogs.com/linx/p/10233162.html")

[https://blog.csdn.net/qq\_24692477/article/details/106024088](https://blog.csdn.net/qq_24692477/article/details/106024088 "https://blog.csdn.net/qq_24692477/article/details/106024088")

[https://blog.csdn.net/jiangguangchao/article/details/84751136?utm\_medium=distribute.pc\_aggpage\_search\_result.none-task-blog-2\~all\~first\_rank\_v2\~rank\_v25-2-84751136.nonecase\&utm\_term=h5%20ios%E6%91%84%E5%83%8F%E5%A4%B4%E4%BA%BA%E8%84%B8%E6%8D%95%E6%8D%89](https://blog.csdn.net/jiangguangchao/article/details/84751136?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~all~first_rank_v2~rank_v25-2-84751136.nonecase\&utm_term=h5%20ios%E6%91%84%E5%83%8F%E5%A4%B4%E4%BA%BA%E8%84%B8%E6%8D%95%E6%8D%89 "https://blog.csdn.net/jiangguangchao/article/details/84751136?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~all~first_rank_v2~rank_v25-2-84751136.nonecase\&utm_term=h5%20ios%E6%91%84%E5%83%8F%E5%A4%B4%E4%BA%BA%E8%84%B8%E6%8D%95%E6%8D%89")

**注意： ios 微信上不支持 mediaDevices.getUserMedia，safari也支持**

```javascript 
 navigator.mediaDevices.getUserMedia({
  audio:false,
    video:{
      facingMode:'user',
        deviceId:"default",
        width:1280,
        height:720
    }
}).then(stream=>{
    window.stream = stream
  video.srcObject = stream
}).catch(err=>{
  handle(err)
})
关闭摄像头：

if (window.stream) {
       window.stream.getTracks().forEach((track) => {
             track.stop();
       });
}
android  谷歌 微信 都可以实现：必须是https 协议；要么是localhost协议
完成：
  压缩（内存更小）
    开启摄像头
    关闭摄像头
    控制时间
    拿到stream流
在一定程度上 比 input file 更有用
```


## 自动播放

注意： chorem 等浏览器上需要 mute  移动端还是不行

let videoPlay = video.play();                    

videoPlay.then(() => {                        

console.log('可以自动播放');                    

}).catch((err) => {                        

&#x20;console.log("不允许自动播放");                       

 video.muted=true;                       

&#x20;video.play();                    

})

        Chrome的autoplay政策做了更改。

        新的行为：浏览器为了提高用户体验，减少数据消耗，规则如下

        1. muted autoplay始终被允许

        2. 音乐的autoplay 只有在下面集中情况下起作用：

            1. 有用户行为发生像（click,tap...）

            2. 对于桌面程序，用户已经提前播放了音频

            3. 对于移动端用户将音频网址home screen.

    解决：

        Open chrome://flags/#autoplay-policy

        Setting No user gesture is required

        Relaunch Chrome

下载和预览的地址 是有区别的

## 兼容格式

视频的格式是编码格式决定的；而不是由后缀名决定的

MP4 = MPEG 4文件使用 H264 视频编解码器和AAC音频编解码器

WebM = WebM 文件使用 VP8 视频编解码器和 Vorbis 音频编解码器

Ogg = Ogg 文件使用 Theora 视频编解码器和 Vorbis音频编解码器

说到底是编码和解码的过程；目前，\<video> 元素支持三种视频格式：MP4、WebM、Ogg。

## 修改默认样式

//全屏按钮

video::-webkit-media-controls-fullscreen-button {

// display: none;

}

//播放按钮

video::-webkit-media-controls-play-button {

}

//进度条

video::-webkit-media-controls-timeline {

// display: none;

}

//观看的当前时间

video::-webkit-media-controls-current-time-display{

// display: none;

}

//剩余时间

video::-webkit-media-controls-time-remaining-display {

// display: none;

}

//音量按钮

video::-webkit-media-controls-mute-button {

// display: none;

}

video::-webkit-media-controls-toggle-closed-captions-button {

// display: none;

}

//音量的控制条

video::-webkit-media-controls-volume-slider {

// display: none;

}

//所有控件

video::-webkit-media-controls-enclosure{

// display: none;

}&#x20;

video::-webkit-media-controls-panel{&#x20;

width: calc(100% + 30px);&#x20;

}

// 更多选项 --然而并不生效

video::-internal-media-controls-overflow-button

{

display:

none

!important;

}

可以设定disablePictureInPicture属性,隐藏画中画

## 常见问题

- ios 上不会加载： 必须 video.load() 一下；然后用户触发播放。video.paly()
- 截取第一帧作为预览图

```javascript 
 this.$refs.myvideo.addEventListener('loadeddata',e=>{
    var canvas = document.createElement('canvas')
    canvas.width = this.$refs.myvideo.width
    canvas.height = this.$refs.myvideo.height
    canvas.getContext('2d').drawImage(this.$refs.myvideo,0,0,canvas.width,canvas.height)
    var dataURL = canvas.toDataURL("image/png")
    console.log(dataURL)
    this.poster = dataURL
})
```


- 兼容ios android 微信等

```javascript 
 <video class="video-source"
     width="100%"　　　
  height="240px"  /*如果有封面，请设置高度*/    
  controls  /*这个属性规定浏览器为该视频提供播放控件*/  
     style="object-fit:fill"  /*加这个style会让 Android / web 的视频在微信里的视频全屏，如果是在手机上预览，会让视频的封面同视频一样大小*/
     webkit-playsinline="true"  /*这个属性是ios 10中设置可以让视频在小窗内播放，也就是不是全屏播放*/  
     x-webkit-airplay="allow"  /*这个属性还不知道作用*/ 
     playsinline="true"  /*IOS微信浏览器支持小窗内播放*/ 
     x5-video-player-type="h5" /*启用H5播放器,是wechat安卓版特性*/
     x5-video-orientation="protraint" /*播放器支付的方向，landscape横屏，portraint竖屏，默认值为竖屏*/
     x5-video-player-fullscreen="true" /*全屏设置，设置为 true 是防止横屏*/
     preload="auto" /*这个属性规定页面加载完成后载入视频*/ 
  x5-playsinline /*视频局部播放*/
</video>
```


- loadedmetadata   loadeddata  获取视频时长有兼容;在三星上可能获取到的都为0.所以可以用户setInterval 来 获取
- 移动端全屏样式兼容根本做不到；伪全屏吧
- 在video播前出现空白；做一个loading 发现在timeupdate时取消；发现ios很准但是android不准，解决方法是在video.currentTime = 1 时在取消
- 古老的ios 播放需要多点两次 才能播放的兼容问题；

**原因：异步的添加video标签导致的；但是你以为你不异步的添加video标签就行了吗？ no，iphone6s 等着你导致必须点击两下才能播放，加任何标签都没有；**

**解决方案： touchstart 和 touchend 和 click；利用300ms延迟，和 点击穿透；多作用于几次到video 标签上，几乎完美解决，有些适合作用不到；多出发几次video.play() 也能解决，几乎是代价最小的解决方式**

**了（这一招几乎是神技）**

**但在iphone7p上还有有问题：核心思路还是当点击的时候想办法多执行几次video.play() 我当时的解决办法：是在touchend的时候setTimeout 在 video.play() 一次；**

- video 的 error 事件 不准； 在 android oppo 三星 荣耀等手机上；及时成功播放；也会触发error事件，原因不明；怀疑和多次load play 有关；
- webview 里 全屏播放  allowsFullscreenVideo = {true}&#x20;
- video 全屏不仅层级最高 脱离文档流；去除不了样式；还不会响应click等事件；至今未实现真全屏的的全局播放

***

**接上面：如今已经可以全部自定义了：具体实现方式（插件和造轮子）可以见工具库；可视化笔记**

[  http://www.minarole.com/article/255/](http://www.minarole.com/article/255/ "  http://www.minarole.com/article/255/")

- DPlayer 一个非常牛逼的库

[  http://dplayer.js.org/zh/guide.html#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B](http://dplayer.js.org/zh/guide.html#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B "  http://dplayer.js.org/zh/guide.html#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B")

currentSrc当前视频地址&#x20;

currentTime 视频已播放时间&#x20;

videoWidth 视频本身的宽度&#x20;

videoHeight 视频本身的高度&#x20;

duration 视频长度，流返回无限&#x20;

ended 是否播放结束&#x20;

error 媒体错误（null:正常）

&#x20;paused 是否停止&#x20;

muted 是否静音&#x20;

seeking 是否在seeking&#x20;

volume 音量&#x20;

height 播放框的高度&#x20;

width 播放框的宽度

startTime 开始时间，默认为0&#x20;

defaultPlaybackRate 默认回放速度&#x20;

playbackRate 当前播放速度

preload="load" auto - 当页面加载后载入整个视频 meta - 当页面加载后只载入元数据 none - 当页面加载后不载入视频 &#x20;
