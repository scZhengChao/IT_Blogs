# Screen Capture

&#x20;    屏幕捕获API正如其名，允许我们捕获屏幕内容，使构建屏幕录制器的过程变得轻而易举。我们需要一个视频元素来显示捕获的屏幕。开始按钮将启动屏幕捕获。

```react tsx 
<video id="preview" autoplay>
  Your browser doesn't support HTML5.
</video>
<button id="start" class="btn">Start</button>

```


```react tsx 
const previewElem = document.getElementById("preview");
const startBtn = document.getElementById("start");

async function startRecording() {
  previewElem.srcObject =
    await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });
}

startBtn.addEventListener("click", startRecording);

```
