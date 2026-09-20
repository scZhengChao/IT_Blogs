# 拖拽解析文件夹

## 目录

- [一、使用input标签上传文件夹](#一使用input标签上传文件夹)
- [二、使用拖拽上传文件夹](#二使用拖拽上传文件夹)
- [递归解析多层文件](#递归解析多层文件)
- [readEntries()](#readEntries)
- [最多只能读取100个](#最多只能读取100个)

> **粘贴和拖拽是走的同一个方法；**

[   https://ahooks.js.org/zh-CN/hooks/use-drop](https://ahooks.js.org/zh-CN/hooks/use-drop "   https://ahooks.js.org/zh-CN/hooks/use-drop")

如何区分：

```typescript title="event.type"

export enum DragEventType {
  拖拽 = drop,
  粘贴 = paste
}
```


> 注意最多读100个文件；

目前组件库中关于桌面拖拽文件上传基本都是开箱即用的，这里就不在给大家讲解，但是拖拽文件夹上传实现是比较少的，原因是拖拽拿到的fils中的仅仅对文件夹的描述，至于文件夹内部信息是不会像使用input标签上传文件夹那样，将内部文件信息全部拍平汇入files中为一个fileList，所以需要进行特殊处理，将内部数据拿到。

## 一、使用input标签上传文件夹

```react jsx 
<input
      multiple="false"
      type="file"
      ref="folderUploader"
      webkitdirectory
      class="file-input"
      @change="uploadHandler($event, 'folder')"
      title="文件与文件夹无法同时上传，单次仅支持上传一个文件夹"
  />

```


在uploadHandler的event中拿到如下信息：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/852041d7c87b4d1e9fc8a526514b0594~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

## 二、使用拖拽上传文件夹

```react jsx 
<!-- 容器组件-->
<FileDragWrap
          v-show="!!draggingStatus"
          :draggingStatus="draggingStatus"
          :uploadExts="uploadExts"
          :uploadHint="uploadHint"
          @change="(val) => (draggingStatus = val)"
          @success="handleDragSuccess"
          @error="handleDragError"
 />

```


```react jsx 
<!-- 拖拽区域组件FileDragWrap-->
 <div
    class="cme-drop-file-hint__wrap"
    @dragover="handleDragWrapDragOver"
    @drop="handleDragWrapDrop"
  >
    <div class="cme-drop-file-hint__icon">
      <i class="icon-cme icon-cme-upload"></i>
    </div>
    <p class="cme-drop-file-hint__text">释放鼠标上传文件</p>
  </div>

```


在handleDragWrapDrop的event中拿到的信息：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5583e3818a074277aeb53080cd6d0923~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

我们发现没有文件夹内部信息描述，所以我们需要使用chrome特有的方法`webkitGetAsEntry` 去递归拿到所有的信息**进行拍平，转换为可上传使用的File对象。**

```typescript 
 /**
   * @description 拖拽事件处理
   * @param 拖拽事件体
   */
   
 async handleDragWrapDrop(event: DragEvent) {
    const { dataTransfer } = event
    if (!dataTransfer) return
    const { files } = dataTransfer
    // 检查类型
    const allowFile = find(files, (item) => {
      return some(this.uploadExts, (ext) => {
        return item.name.toLowerCase().endsWith(`.${ext.toLowerCase()}`) || item.type === ''
      })
    })
    if (allowFile) {
      if (files.length === 1) {
        const { items, files } = dataTransfer
        const item = items[0].webkitGetAsEntry()// 获取当前文件夹的Entry（webkit内核特有），然后去递归Entry
        if (item) {
          // 说明是文件夹
          if (item.isDirectory) {
            const filesList: any[] = []
            await this.scanFiles(item, filesList)
            const copyEvent: any = { dataTransfer: { files: filesList } }
            this.$emit('success', { event: copyEvent, msg: '', type: 'folder' })
          } else {
            this.$emit('success', { event, msg: '', type: 'file' })
          }
        }
      } else {
        this.$emit('success', { event: {}, msg: '单次拖拽仅支持单个文件上传' })
      }
    } else {
      this.$emit('error', { event: {}, msg: '上传文件格式错误' })
    }
  }

```


递归扫描文件：

```typescript 
/**
   * @description 扫描文件夹中所有的文件夹子和文件，将数据拍平为可上传使用的File对象
   * @param  item  FileSystemDirectoryEntry 对象实例（目录实体）
   */
   
  scanFiles(entry: any, filesList: any[]) {
    return new Promise((resolve, reject) => {
      if (entry.isDirectory) {
        const directoryReader = entry.createReader()
        directoryReader.readEntries(
          async (entries: any[]) => {
            entries.forEach(async (entry: any, index: number) => {
              await this.scanFiles(entry, filesList)
              if (index === entries.length - 1) {
                resolve(1)
              }
            })
          },
          (e: any) => {
            reject(e)
          }
        )
      } else {
        entry.file(
          async (file: any) => {
            const path = entry.fullPath.substring(1)
              /**修改webkitRelativePath 是 核心操作 ，原因是拖拽会的事件体中webkitRelativePath是空的，而且webkitRelativePath 是只读属性，普通赋值是不行的。所以目前只能使用这种方法将entry.fullPath 赋值给webkitRelativePath**/
            const newFile = Object.defineProperty(file, 'webkitRelativePath', {
              value: path,
            })
             filesList.push(newFile)
            resolve(1)
          },
          (e: any) => {
            reject(e)
          }
        )
      }
    })
  }
```


最后我们通过这种scanFiles方式获得filesList 给到上传接口就可以进行上传文件夹中的内容，当然上面的组件，文件和文件夹都是支持的，希望能够帮到您\~

# 递归解析多层文件

```typescript 
export const generateFile = (item,path,res):Promise<void>=>{
    return new Promise((resolve, reject)=>{
        item.file((file)=>{
             file.path = path + file.name;
            const newFile = new File([file],file.name,{type:file.type});
            newFile.path = path + file.name;
             res.push(newFile);
            resolve
        },()=>{
            message.error('解析失败')
            reject()
        })
    })
}
const recursionDir = async (item)=>{
    const dirReader = item.createReader();
    const totalEntries = [];
    const read = (resolve,reject)=>{
        dirReader.readEntries(
            (entries)=>{
                 if(entries.length){
                    totalEntries.push(entries)
                    read(resolve,reject)
                }else{
                    resolve(totalEntries.flat())
                }
             },()=>{
                message.error('解析失败')
                reject()
            }
        )
    }
    return new Promise((resolve, reject)=>{
        read(resolve,reject)
    })
}
export const internalProces = async (item:any,path:string,res:File[]):Promise<void>=>{
    if(item.isFile){
        await generateFile(item,path,res)
    }else if(item.isDirectory){
         const entries = await recursionDir(item) 
        for(let i = 0;i<entries.length;i++){
             await internalProces(entries[i],path+item.name+'/',res); 
        }
    }
}
export const getFolderFiles =async (dataTransfer:DataTransfer):Promise<File[][]> => {
    const itemsInfo = Array.from(dataTransfer.items || [])?.map(item=>item.webkitGetAsEntry());
    const dirItems = itemsInfo.filter(entry=>entry.isDirectory);
    if(dirItems.length){
        const totalRes =[];
        for(let index =0;index< dirItems.length;index++){
            const item = dirItems[index];
            const res:File[] = [];
            try {
                await internalProces(item,'',res);
                totalRes.push(res)
            }catch (e) {
                return []
            }
        }
        return totalRes
    }
    return []
}
```


# readEntries()

[ FileSystemDirectoryReader：readEntries() 方法 - Web API | MDNMDN Web DocsMDN logoMozilla logo FileSystemDirectoryReader 接口的 readEntries() 方法用于检索正在读取的目录中的目录条目，并将它们以数组的形式传递给提供的回调函数。 https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemDirectoryReader/readEntries](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemDirectoryReader/readEntries " FileSystemDirectoryReader：readEntries() 方法 - Web API | MDNMDN Web DocsMDN logoMozilla logo FileSystemDirectoryReader 接口的 readEntries() 方法用于检索正在读取的目录中的目录条目，并将它们以数组的形式传递给提供的回调函数。 https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemDirectoryReader/readEntries")

# 最多只能读取100个

[ FileSystemDirectoryReader.readEntries()使用时遇到的一个小坑-CSDN博客 文章浏览阅读3.2k次。今天在处理网页上的拖拽上时遇到一个问题，说出来和大家分享一下。需求： 在网页上拖拽上传一个多层文件夹要上传文件夹，一个绕不开的问题就是如何读取到文件夹中的每一个文件或文件夹，这里我参考的是mdn上的方法（参考FileSystemDirectoryReader.readEntries()方法中的例子），这个例子在文件夹中的文件数目小于100时，运行时没有问题的，可以读取到文件 https://blog.csdn.net/qq\_29644539/article/details/79636162#:\~:text=如果需要读取](https://blog.csdn.net/qq_29644539/article/details/79636162#:~:text=如果需要读取 " FileSystemDirectoryReader.readEntries()使用时遇到的一个小坑-CSDN博客 文章浏览阅读3.2k次。今天在处理网页上的拖拽上时遇到一个问题，说出来和大家分享一下。需求： 在网页上拖拽上传一个多层文件夹要上传文件夹，一个绕不开的问题就是如何读取到文件夹中的每一个文件或文件夹，这里我参考的是mdn上的方法（参考FileSystemDirectoryReader.readEntries()方法中的例子），这个例子在文件夹中的文件数目小于100时，运行时没有问题的，可以读取到文件 https://blog.csdn.net/qq_29644539/article/details/79636162#:~:text=如果需要读取")

请注意`successCallback`的介绍
如果需要读取目标对象是一个文件夹时，当文件夹对象FileSystemDirectoryReader中没有文件时，successCallback回调函数中的数组才会为空（该目录被完全读取）`，但实际上readEntries每次最多只能读取100个文件，这时候想读取剩余的文件，就
需要我们是用递归调用了`

```javascript 
var fnReadEntries = function (entries) {
  entries.forEach(function (entry) {
    scanFiles(entry, directoryContainer);
  });
  if (entries.length > 0) {
    directoryReader.readEntries(fnReadEntries);
  }
};    
directoryReader.readEntries(fnReadEntries)

```
