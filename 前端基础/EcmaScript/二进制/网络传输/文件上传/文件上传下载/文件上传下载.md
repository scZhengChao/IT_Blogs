# 文件上传下载

## 目录

- [vue](#vue)
- [axios](#axios)
- [拦截器](#拦截器)
  - [下载util](#下载util)

# vue

```vue 
文件的上传
<template>
    <div>
      <input type="file" @change="select" id="file" style="display:none">
      <label for="file">chose file</label>
    </div>
</template>
<style scoped>


</style>
<script>
import axios from 'axios';
export default {
  name:'uploadFile',
  methods:{
    //上传
    select(e){
      let files = e.target.files || e.target.dataTransfer.files
      console.log(files)
        //图片过滤
        function fileFilter(files) {
          var a = true;
          for (var i = 0, len = files.length; i < len; i++) {
            var file = files[i];
            if (file.type.indexOf("text") == 0) {
              if (file.size >= 1024*1024*10) {// 10M
                  this.$alert('您这张"' + file.name + '"文件过大，应小于10M，请重新上传');
                  a = false;
              }
            } else {
              this.$alert('文件"' + file.name + '"不是text。请重新上传');
              a = false;
            }
          }
          return a;
        }
        if(fileFilter(files)){
          let params = new FormData();
          params.append('file',files[0]);
          // params.append('name','其他信息');
          let config ={
            headers:{
              'Content-Type':'multipart/form-data'
            }
          }
          axios.post('url',params,config).then(res=>{


          })
        }
    },
        //下载
    download(){
      // fetch(url,{responseType:'blob'})  //注意 responseType:'blob',其他的没什么
      //加入已经拿到res.data
        function isIE(){
          if(window.ActiveXObject){
            return true
          }else{
            return false
          }
        }
        if(isIE){
          // iE 浏览器下载表格
          window.navigator.msSaveOrOpenBlob(new Blob([data]),'message.xlsx')
        }
        //得到文件的链接
        function getObjectURL(file) {
           return window.URL.createObjectURL(file)
        };
      let url = getObjectURL(new Blob([data]))
      let link = document.createElement('a');
      link.style.display = 'none';
      link.href = url
      link.setAttribute('id','downloadLink')
      link.setAttribute('download','message.xlsx')
      link.click();
      // 释放url
      window.URL.revokeObjectURL(url)
    }
  }
}
</script>

```


或者

```javascript 
export const downloadByPost = (url, params) => {
  return new Promise((resolve, reject)=> {
    if (session) {
      const index = url.indexOf('?')
      let path = index > -1 ? url + '&token=' + session.token : url + '?token=' + session.token
      fetch(path, {
        method: 'POST',
        body: window.JSON.stringify(params),
        credentials: 'include',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res=> res.blob().then(blob=> {
        if (res.status == 200) {
          var a = document.createElement('a');
          var url = window.URL.createObjectURL(blob);
          var filename = res.headers.get('filename');
          a.href = url;
          a.download = decodeURIComponent(filename);
          a.click();
          window.URL.revokeObjectURL(url);
          resolve()
        } else {
          reject()
        }
      }))
    } else {
      reject()
    }
  })
}
```


# axios

1. 请求时在设置`reponseType`为`blob`,指定响应的数据类型为blob。

```react tsx 
axios.post(url,param,{ responseType: 'blob'})
```


1. 处理返回的结果

```typescript 
const fileDownload = (res, filename) => {
  let blob = new Blob([res.data]); // 将返回的数据通过Blob的构造方法，创建Blob对象
  if ('msSaveOrOpenBlob' in navigator) {
    window.navigator.msSaveOrOpenBlob(blob, filename); // 针对浏览器
  } else {
    const elink = document.createElement('a'); // 创建a标签
    elink.download = filename; 
    elink.style.display = 'none';
    // 创建一个指向blob的url，这里就是点击可以下载文件的根结
    elink.href = URL.createObjectURL(blob); 
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); //移除链接
    document.body.removeChild(elink); //移除a标签
  }
}

```


```typescript 
axios.post(url,param,{responseType: 'blob'})
      .then((res: any) => {
        if (res.status === 200) {
          fileDownload(res, '测试文件.xlsx');
        }
      });


```


1. 获取文件名

```typescript 
//从header中读取文件名称
const headerFilename = result.headers['content-disposition']?.split(';')[1].split('=')[1];
 
const fileName = decodeURIComponent(headerFilename);
 
downloadByData(result.data, fileName, 'application/json');
```


# 拦截器

```typescript 
export const FileLoadInterfaceInter = {
  responseInterceptor: (response: AxiosResponse<Blob>) => {
    const selfParams = response.config.headers?.['Upload-Type'] as string;
    if (selfParams && shouldIgnoreDownload(selfParams)) {
      return response;
    }
    if (response.config.responseType === 'blob' || response.data.toString() === '[object Blob]') {
      return   downAttachment(response);
    } else {
      return response;
    }
  },
};
```


## 下载util

```typescript 
import { message } from 'antd';
import type { AxiosResponse } from 'axios';

/**
 * 二进制文件下载
 * @param filename
 * @param blob
 * */
export const downFileByBlob = (filename: string, blob: Blob) => {
  const URL = window.URL || window.webkitURL;
  const downloadUrl = URL.createObjectURL(blob);
  if (filename) {
    const a = document.createElement('a');
    a.download = filename;
    a.style.display = 'none';
    a.href = downloadUrl;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
  } else {
    // @ts-ignore
    window.location = downloadUrl;
  }
  setTimeout(function () {
    URL.revokeObjectURL(downloadUrl);
  }, 100); // cleanup
};

function blobToObj(data: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    // 读取blob,因为file对象为一个Blob对象的封装
    reader.readAsText(data, 'utf-8');
    reader.onload = function () {
      try {
        resolve(JSON.parse(reader.result as string));
      } catch (error) {
        console.log('json', error, reader);
        resolve('暂无模板!');
      }
    };
  });
}

/**
 * 二进制错误信息读取并提示
 * @param blob
 * */
const getErrorMsgByBlob = async (blob: Blob) => {
  const res = await blobToObj(blob);
  console.log(res, '====getErrorMsgByBlob');
  /* if (isPhone()) {
    Toast.show({ content: res?.errorMsg || '暂无模板!' });
    return;
  }*/
  message.error(res || '暂无模板!');
};

/**
 * 下载附件: 二进制文件流,默认直接下载文件
 * @param response
 */
export const downAttachment = (response: AxiosResponse<Blob>) => {
  return new Promise((resove) => {
    // disposition 有可能是 attachment; filename="??.xlsx"; filename*=UTF-8''%E4%B8%AD%E6%96%87.xlsx, 这种情况下最后一个才是正确的文件名
    const disposition = response.headers['content-disposition'];
    if (disposition) {
      try {
        let filename = '';
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)$/;
        const matches = disposition?.match(filenameRegex);
        if (matches && matches.length) {
          filename = matches[1].replace(`UTF-8''`, '').replace(/['"]/g, '');
          // 解码中文名
          filename = decodeURIComponent(filename);
        }
        // 内容
        const type = response.headers['content-type'];
        const blob =
          response.data && response.data.toString() === '[object Blob]'
            ? response.data
            : new Blob([response.data], { type: type });
        downFileByBlob(filename, blob);
      } catch (e) {
        /*if (isPhone()) {
          Toast.show({ content: '文件下载失败!' });
          return;
        }*/
        message.error('文件下载失败!');
      }
    } else {
      // 错误信息会被转义为Blob
      getErrorMsgByBlob(response.data).then();
    }
    resove(response);
  });
};

```
