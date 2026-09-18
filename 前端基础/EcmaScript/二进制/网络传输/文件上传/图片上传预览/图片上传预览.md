# 图片上传预览

```vue 
图片的上传和预览
<template>
    <div>
      <input type="file" name="upload" id="upload" multiple  style="display:none;" accept="image/*"  @change='uploadFile'>
      <label for="upload" class='btn'>Choose a file</label> <br/>
      <img src="" alt="" style="width:300px;height:300px;border:1px solid #ccc;" ref='img'>
    </div>
</template>
<style scoped>


</style>
<script>
import axios from 'axios';
export default {
    name:'uploadImg',
    methods:{
        // 上传预览
        uploadFile(e){
            var formData = new FormData();  //新建一个FormData对象实例
            let files = e.target.files || e.target.dataTransfer.files
            console.dir(e.target)
            if(imgFilter(files)){
                this.$refs.img.src = getObjectURL(files[0])
                console.log(getObjectURL(files[0]))
            }
             //图片过滤
            function imgFilter(files) {
              var a = true;
              for (var i = 0, len = files.length; i < len; i++) {
                var file = files[i];
                if (file.type.indexOf("image") == 0) {
                        if (file.size >= 1048576) {// 1M
                            this.$alert('您这张"' + file.name + '"图片过大，应小于1M，请重新上传');
                            a = false;
                        }
                } else {
                        this.$alert('文件"' + file.name + '"不是图片。请重新上传');
                        a = false;
                }
              }
              return a;
            }
            //获取图片的地址
            function getObjectURL(file) {
              var url = null;
              if (window.createObjectURL != undefined) {//基础创建url的方法
                      url = window.createObjectURL(file);
              } else if (window.URL != undefined) { // mozilla(firefox)
                      url = window.URL.createObjectURL(file);
              } else if (window.webkitURL != undefined) { // webkit or chrome
                      url = window.webkitURL.createObjectURL(file);
              }
              return url;
            };
            // 提交
            formData.append('file',files[0])
            formData.append('name','zhengchao')
            let config = {
              headers:{
                'Content-Type':'multipart/form-data'
              }
            };
            axios.post('url',formData,config).then(res=>{
              console.log(res)
            })
            
        }
    }
}
</script>
//图片的下载 已知的图片
function downloadIamge(selector, name) {
    var image = new Image()
    // 解决跨域 Canvas 污染问题
    image.setAttribute('crossOrigin', 'anonymous')
    image.onload = function () {
        var canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height

        var context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        var url = canvas.toDataURL('image/png')

        // 生成一个a元素
        var a = document.createElement('a')
        // 创建一个单击事件  // a.click()
        var event = new MouseEvent('click')

        // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
        a.download = name || '下载图片名称'
        // 将生成的URL设置为a.href属性
        a.href = url

        // 触发a的单击事件
        a.dispatchEvent(event)
    }

    image.src = document.querySelector(selector).src
}


```
