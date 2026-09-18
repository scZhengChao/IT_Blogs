# 图片转换

## 目录

- [canvas转base64](#canvas转base64)
  - [绘制图片并转 base64](#绘制图片并转-base64)
- [实例](#实例)
  - [通过filereader接口读取并展示图片img](#通过filereader接口读取并展示图片img)
  - [压缩图片](#压缩图片)
- [常见问题](#常见问题)

# canvas转base64

canvas转==》base64 图片

```javascript 
    var srcSource = oc.toDataURL('image/jpg'); //图片类型 base64   
```


## 绘制图片并转 base64

1. 【webapck+vue项目】需要用 require('@/assets/xxx.png') 引入图片，不能直接写 【'@/assets/xxx.png'】这个字符串
2. 【vite+vue项目】需要使用import xxx from 'xxx.png'引入图片

```typescript 
<script type="text/javascript">
    function getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL  
       // return dataURL.replace("data:image/png;base64,", "");     
    }

    function main() {
        var img = document.createElement('img');
        img.src = './images/Game of Thrones.jpg'; //此处自己替换本地图片的地址             
        img.onload = function () {
            var data = getBase64Image(img);
            var img1 = document.createElement('img');
            img1.src = data;
            document.body.appendChild(img1);
            console.log(data);
        }
    }
    main()
</script>
```


# 实例

## 通过filereader接口读取并展示图片img

```html 
<html><head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
    <title>通过filereader接口读取文件</title>
    <script type="text/javascript">
        function readAsDataURL() {
            if (typeof FileReader == 'undifined') { //判断浏览器是否支持filereader                           
                result.innerHTML = "<p>抱歉，你的浏览器不支持 FileReader</p>";
                return false;
            }
            var file = document.getElementById("imagefile").files[0];
            if (!/image\/\w+/.test(file.type)) { //判断获取的是否为图片文件                            
                alert("请确保文件为图像文件");
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                var result = document.getElementById("result");
                result.innerHTML = '<img src="' + this.result + '" alt=""/>'
            }
        }
    </script>
</head>

<body>
    <p> 
        <label>请选择一个文件：</label> 
        <input type="file" id="imagefile" /> 
        <input type="button" value="读取图像" onClick="readAsDataURL();" /> 
    </p>
    <div name="result" id="result">
        <!-- 这里用来显示图片结果-->
    </div>
</body>
</html>
```


## 压缩图片

```typescript 
/**
 * 返回压缩后的base64
 * @param file
 */
export function getPicCompress(file: File) {
    return (
        new Promise() <
        string >
        ((resolve, reject) => {
            let quality = 0.8; // 压缩系数0-1之间
            let reader = new FileReader();
            reader.readAsDataURL(file);
            let imgWidth;
            let imgHeight;
            reader.onload = function (e) {
                let image: any = new Image(); // 新建一个img标签（还没嵌入DOM节点)
                image.src = e.target.result;
                image.onload = function () {
                    imgWidth = image.width;
                    imgHeight = image.height;
                    let canvas = document.createElement("canvas");
                    let ctx = canvas.getContext("2d");
                    if (Math.max(imgWidth, imgHeight) > 1024) {
                        if (imgWidth > imgHeight) {
                            canvas.width = 1024;
                            canvas.height = (1024 * imgHeight) / imgWidth;
                        } else {
                            canvas.height = 1024;
                            canvas.width = (1024 * imgWidth) / imgHeight;
                        }
                    } else {
                        canvas.width = imgWidth;
                        canvas.height = imgHeight;
                        quality = 0.8;
                    }
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
                    let base64 = canvas.toDataURL("image/jpeg", quality); // 压缩语句
                    resolve(base64); // 必须通过回调函数返回，否则无法及时拿到该值
                };
                reader.onerror = (error) => reject(error);
            };
        })
    );
}
```


# 常见问题

- Uncaught DOMException: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported

在canvas转base64时：解决方法;

图片设置 ：crossOrigin属性

代码片段：img.setAttribute("crossOrigin",'Anonymous')

[Uncaught DOMException: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported - 范仁义 - 博客园 Uncaught DOMException: Failed to execute \&#39;toDataURL\&#39; on \&#39;HTMLCanvasElement\&#39;: Tainted https://www.cnblogs.com/Renyi-Fan/p/9588755.html#\_label0\_2](https://www.cnblogs.com/Renyi-Fan/p/9588755.html#_label0_2 "Uncaught DOMException: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported - 范仁义 - 博客园 Uncaught DOMException: Failed to execute \&#39;toDataURL\&#39; on \&#39;HTMLCanvasElement\&#39;: Tainted https://www.cnblogs.com/Renyi-Fan/p/9588755.html#_label0_2")
