# 音视频流传输

举个例子，我们通过`MediaStream` 去不断推流，达到了视频显示的效果，有了`URL.createObjectURL`我们并不需要真的有一个`url`赋予`video`标签，去让视频显示出来，只需要使用`URL.createObjectURL`去构造一个临时的`url`即可非常方便

```javascript 
<body>
  <video id="videoElement" autoplay playsinline></video>

  <script>
    const videoElement = document.getElementById('videoElement');

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoElement.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing webcam:', error);
      });
  </script>

</body>

```


![](./image/image_azu4BS6SiQ.png)
