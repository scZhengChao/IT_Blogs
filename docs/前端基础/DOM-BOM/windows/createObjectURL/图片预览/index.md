# 图片预览

以前我们想要预览图片，只能是上传图片到后端后，获取到`url`然后赋予给`img`标签，才能得到回显预览，但是有了`URL.createObjectURL`就不需要这么麻烦了，直接可以在前端就达到预览的效果\~

```javascript 
<body>
  <input type="file" id="fileInput">
  <img id="preview" src="" alt="Preview">
  <script>
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      const previewElement = document.getElementById('preview');
      previewElement.src = fileUrl;
    });
  </script>
</body>

```


![](./image/image_-0HjaSdXHT.png)
