# ios 加载失败；不能自动播放

## 目录

- [注意点](#注意点)
- [自动播放](#自动播放)

还有 最好必须用`source` 处理播放；否则会遇到`NotSupportedError` 问题

[ 在Safari中，用于音频元素的src只给出了一个“未处理的承诺拒绝: NotSupportedError:”-腾讯云开发者社区-腾讯云 我正在使用Firebase数据库和存储在我的vue js web应用程序中播放mp3文件。我有一个songRecords播放列表，其中包含一个名为songFileUrl的字段，我在其中存储了getDownloadURL。onClick我将song.songFileUrl设置为音频元素的源​audioElement.src = song.songFileUrlaudioElement.play(); https://cloud.tencent.com/developer/ask/sof/107106200](https://cloud.tencent.com/developer/ask/sof/107106200 " 在Safari中，用于音频元素的src只给出了一个“未处理的承诺拒绝: NotSupportedError:”-腾讯云开发者社区-腾讯云 我正在使用Firebase数据库和存储在我的vue js web应用程序中播放mp3文件。我有一个songRecords播放列表，其中包含一个名为songFileUrl的字段，我在其中存储了getDownloadURL。onClick我将song.songFileUrl设置为音频元素的源​audioElement.src = song.songFileUrlaudioElement.play(); https://cloud.tencent.com/developer/ask/sof/107106200")

```javascript 
<audio
  onError={()=>{
    audioRef.current.load();
    audioRef.current.play();
  }}
>
  <source src={'/asfas'} type='audio/mp3' />
</audio>
```


##### 注意点

- 手动load 和 play
- 用source加载src；特别是音频没有后缀的时候

# 自动播放

**方法一、主动调用，先播放后暂停**

```javascript 
// 初始化时主动调用
(function () {
    $("#music").load();
    $("#music").pause();
}())
```


**方法二、监听点击事件，事件中初始化音频**

```javascript 
// 使用one绑定事件，触发一次即解绑
$(document).one('click touchstart', document.body, function () {
    let audios = document.getElementsByTagName('audio');
    for (let i = 0, len = audios.length; i < len; i++) {
        audios[i].load();
        audios[i].pause();
    }
});
```
