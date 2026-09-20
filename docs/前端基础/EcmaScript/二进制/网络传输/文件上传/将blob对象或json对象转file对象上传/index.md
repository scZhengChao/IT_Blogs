# 将blob对象或json对象转file对象上传

## 目录

- [JavaScript blob类型转file类型](#JavaScript-blob类型转file类型)
  - [例：](#例)
  - [以下为项目实际封装需求：](#以下为项目实际封装需求)

用户编辑当前页面后，提交的时候，需要提示一个json文件到服务器，没有用户点击选择文件上传的一步，所以需要前端自己去做数据的转化

使用[file()构造函数](https://developer.mozilla.org/zh-CN/docs/Web/API/File/File "file()构造函数")。

```typescript 
const files = new window.File([blob],this.files[0].name, { type: this.files[0].type });

```


File() 构造器创建新的 File 对象实例。

语法

参数

- **bits**
  - ArrayBuffer，ArrayBufferView，Blob，或者 DOMString 对象的 Array — 或者任何这些对象的组合。这是 UTF-8 编码的文件内容。
- **name**
  - 文件名称，或者文件路径

**options** `可选`

- 选项对象，包含文件的可选属性。可用的选项如下：
  - &#x20;type: DOMString，表示将要放到文件中的内容的 MIME 类型。默认值为 “” 。
  - lastModified: 数值，表示文件最后修改时间的 Unix 时间戳（毫秒）。默认值为 Date.now()。

## JavaScript blob类型转file类型

```typescript 
let blob = new Blob(byteArrays, { type: contentType });
//blob转file
let file = new File([blob], filename, {type: contentType, lastModified: Date.now()});
//或者
let file = new File([byteArrays], filename, {type: contentType, lastModified: Date.now()});
```


#### 例：

```typescript 
let data = {
          name: "hanmeimei",
          age: 88
        };
        var content = JSON.stringify(data);
        var blob = new Blob([content], { type: "text/plain;charset=utf-8" }); // 把数据转化成blob对象
        // console.log(blob, "blob");
        let file = new File([blob], "filename", { lastModified: Date.now() }); // blob转file
```


获取json文件返回的数据

![](./image/image_Ruu9inbRsE.png)

#### 以下为项目实际封装需求：

```typescript title="upload-json.js"
import { getFileKey } from '@/utils/util'
import { getOssToken } from '@/api/oss'
import { CDN_DOMAIN_STATIC, OSS_DOMAIN, OSS_BUCKET_STATIC, uploadFolder } from '@/config'
 
/**
 * 获取阿里云oss上传相关凭证
 * export const getOssToken = () => {
        return http.get('/oss/getUploadToken')
    }
 */
 
/**
 * export const getFileKey = (file, folder) => {
    let timestamp = Date.parse(new Date())
    let postfix = file.name.substring(file.name.lastIndexOf('.') + 1)
    let md5str = md5(timestamp + file.name)
    let prefix = folder + '/'
    return prefix + timestamp + '-' + md5str + '.' + postfix
}
 */
 
 
/**
 * data 需要上传的json文件的原始数据
 * jsonUrlFn 用于重置上传文件路径的回调函数
 */
 
export function upload(data, jsonUrlFn) {
// 转化为file对象
    let file = new File([JSON.stringify(data)], '.json', {
        type: 'application/json',
        lastModified: Date.now()
    })
    return new Promise((resole, reject) => {
        let uploader = new window.VODUpload({
            // 开始上传
            onUploadstarted: function(uploadInfo) {
                // uploadInfo.object = jsonUrl.substring(24, jsonUrl.length);
                jsonUrlFn(uploadInfo) // 设置相同url，替换服务器文件
            },
            // 文件上传成功
            onUploadSucceed: function(uploadInfo) {
                console.log(`${CDN_DOMAIN_STATIC}/${uploadInfo.object}`)
                return resole(uploadInfo)
            },
            // 文件上传失败
            onUploadFailed: function(uploadInfo, code, message) {
                return reject(uploadInfo)
            },
            // 文件上传进度，单位：字节
            onUploadProgress: function(uploadInfo, totalSize, uploadedSize) {
                // console.log(parseInt((uploadedSize / totalSize) * 100), '进度')
            },
            // 安全令牌超时
            onUploadTokenExpired: function() {
                // console.log('onUploadTokenExpired')
            }
        })
        getOssToken().then(res => {
            const { accessKeyId, accessKeySecret, securityToken, expiration } = res.data
            uploader.init(accessKeyId, accessKeySecret, securityToken, expiration)
            uploader.addFile(
                file,
                OSS_DOMAIN,
                OSS_BUCKET_STATIC,
                getFileKey(file, uploadFolder),
                ''
            )
            uploader.startUpload()
        })
    })
}
```
