# 常用中间件

## 目录

- [1.文件上传koa-body](#1文件上传koa-body)

### 1.文件上传koa-body

[https://www.jianshu.com/p/b7eadc8b270b](https://www.jianshu.com/p/b7eadc8b270b "https://www.jianshu.com/p/b7eadc8b270b")

首先要安装koa-body用于解析请求数据

```javascript 
 npm install koa-body
```


**注意：一个大坑，koa-body 和 koa-bodyparser 有冲突；只能留一个**

然后就像这样：

const app = new Koa();

const koaBody = require('koa-body'); //解析上传文件的插件
app.use(koaBody({
        multipart: true,
        formidable: {
            maxFileSize: 2000 \* 1024 \* 1024    // 设置上传文件大小最大限制，默认2M
        }
    }))

经过路由处理进入到具体的路由处理方法中：

&#x20;//上传图片
    static async uploadimg(ctx) {
        let file = ctx.request.file; // 获取上传文件
        // 创建可读流
        const reader = fs.createReadStream(ctx.request.files\['image']\['path']);
        let filePath = \`/shareSource/img/my\_blog\_img\` + \`/\${ctx.request.files\['image']\['name']}\`;
        let remotefilePath = \`<http://www.xxxx.com:8887/img/my_blog_img`> + \`/\${ctx.request.files\['image']\['name']}\`;
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
        return ctx.body = {
            url: remotefilePath,
            message: "文件上传成功",
            cc: 0
        }  &#x20;
    }

上传多个文件:

router.post('/uploadfiles', async (ctx, next) => {
  // 上传多个文件
  const files = ctx.request.files.file; // 获取上传文件
  for (let file of files) {
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 获取上传文件扩展名
    let filePath = path.join(\_\_dirname, 'public/upload/') + \`/\${file.name}\`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
  }
&#x20;return ctx.body = "上传成功！";});

前端

upLoad(){

    var params = new FormData()

    params.append("file", this.file); // 文件对象

    let config ={

        headers:{

            'Content-Type':'multipart/form-data'

        }

    }

    axios.post('/api/uploadVideo',params,config).then(res=>{

        if(res.data.message == 000000){

            alert('上传成功')

        }&#x20;

    })

},
