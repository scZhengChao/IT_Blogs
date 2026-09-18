# 数据请求

## 目录

- [ rn-fetch-blob ](#-rn-fetch-blob-)
  - [上传图片：](#上传图片)
  - [上传文件：
    ](#上传文件)
  - [常见错误](#常见错误)
- [react-native-fs](#react-native-fs)
  - [常用地址对照：](#常用地址对照)
    - [android](#android)
    - [ios:](#ios)
  - [用法：](#用法)
- [ 本地图片转Base64](#-本地图片转Base64)
- [react-native-fetch-polyfill](#react-native-fetch-polyfill)
- [reconnecting-websocket](#reconnecting-websocket)

# &#x20;rn-fetch-blob&#x20;

配置：参考官网

[npm: rn-fetch-blob A module provides upload, download, and files access API. Supports file stream read/write for process large files. https://www.npmjs.com/package/rn-fetch-blob](https://www.npmjs.com/package/rn-fetch-blob "npm: rn-fetch-blob A module provides upload, download, and files access API. Supports file stream read/write for process large files. https://www.npmjs.com/package/rn-fetch-blob")

**import**  RNFetchBlob  **from**  'rn-fetch-blob'

## 上传图片：

```javascript 
RNFetchBlob.fetch('POST', 'https://content.dropboxapi.com/2/files/upload', {
    Authorization : "Bearer access-token...",
    'Dropbox-API-Arg': JSON.stringify({
      path : '/img-from-react-native.png',
      mode : 'add',
      autorename : true,
      mute : false
    }),
    'Content-Type' : 'application/octet-stream',
    // here's the body you're going to send, should be a BASE64 encoded string
    // (you can use "base64"(refer to the library 'mathiasbynens/base64') APIs to make one).
    // The data will be converted to "byte array"(say, blob) before request sent.
  }, base64ImageString)
  .then((res) => {
    console.log(res.text())
  })
  .catch((err) => {
    // error handling ..
  })
```


上传文件：

```javascript 
RNFetchBlob.fetch('POST', 'https://content.dropboxapi.com/2/files/upload', {
    // dropbox upload headers
    Authorization : "Bearer access-token...",
    'Dropbox-API-Arg': JSON.stringify({
      path : '/img-from-react-native.png',
      mode : 'add',
      autorename : true,
      mute : false
    }),
    'Content-Type' : 'application/octet-stream',
    // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
    // Or simply wrap the file path with RNFetchBlob.wrap().
  }, RNFetchBlob.wrap(PATH_TO_THE_FILE))
  .then((res) => {
    console.log(res.text())
  })
  .catch((err) => {
    // error handling ..
  })
```


更多用法见： 官网

## 常见错误

- 在iOS上，选取照片或者拍摄照片后，然后想通过RNFetchBlob上传服务器，发现报错了RNFetchBlob.fetchBlobForm failed to create request body。

出现这个错误的原因主要是，图片文件的路径是file:\\\\\xxxx.xxx.xxx.jeg，而iOS是不能识别file:\\\的，

所以需要手动去掉file:\\\。例如：imageUrl.replace('file:\\\\', '')。

# react-native-fs

[  https://github.com/itinance/react-native-fs](https://github.com/itinance/react-native-fs "  https://github.com/itinance/react-native-fs")

## 常用地址对照：

### android

```javascript 
 MainBundlePath: undefined
DocumentDirectoryPath: "/data/user/0/com.project/files"
LibraryDirectoryPath: undefined
CachesDirectoryPath: "/data/user/0/com.project/cache"
TemporaryDirectoryPath: "/data/user/0/com.project/cache"
ExternalDirectoryPath: "/storage/emulated/0/Android/data/com.project/files"
ExternalCachesDirectoryPath: "/storage/emulated/0/Android/data/com.project/cache"
ExternalStorageDirectoryPath: "/storage/emulated/0"
PicturesDirectoryPath: "/storage/emulated/0/Pictures"
FileProtectionKeys: undefined
```


### ios:

```javascript 
 MainBundlePath: "/data/Containers/Bundle/Application/E57.../project.app" 
DocumentDirectoryPath: "/data/Containers/Data/Application/F18.../Documents" 
LibraryDirectoryPath: "/data/Containers/Data/Application/F18.../Library" 
CachesDirectoryPath: "/data/Containers/Data/Application/F18.../Library/Caches" 
TemporaryDirectoryPath: "/data/Containers/Data/Application/F18.../tmp" 
ExternalDirectoryPath: null 
ExternalCachesDirectoryPath: undefined 
ExternalStorageDirectoryPath: null 
PicturesDirectoryPath: undefined 
FileProtectionKeys: undefined
```


## 用法：

```javascript 
 
                   const fromUrl = res.flvUrl
                    let rootPath = `${fs.DocumentDirectoryPath}/_download/monitorVideo`
                    if (Platform.OS === 'android') {
                        rootPath = `${fs.ExternalDirectoryPath}/_download/monitorVideo`
                    }
                    if (!(await fs.exists(rootPath))) {
                        await fs.mkdir(rootPath)
                    }
                    const name = fromUrl.substring(fromUrl.lastIndexOf('/'), fromUrl.lastIndexOf('?'))
                    const toFile = `${rootPath}${name}`
                    const downloadResult = fs.downloadFile({
                        fromUrl,
                        toFile,
                    })
                    downloadResult.promise.then(() => {
                        this.setState({downLoadStatus:'downloadComplete'})
                        openFile(toFile)
                    }).catch(e =>{
                        this.setState({downLoadStatus:'downloadError'})
                    }).finally(()=>{

                    })

export  const initGridDB = handDBPromise('initDB',  (param:any={},handle:any)=>{
    const newDB = (allowReload:boolean=false)=>{
        ElectronCabinetDB = new DataStore({
            filename: INN_EXPRESS_CABINET_GRID,
            autoload: true,
            corruptAlertThreshold:0,
            onload(err:any){
                if(err){
                    if(allowReload) reloadFs()
                    handle(err,{})
                }
                handle(null,ElectronCabinetDB)
            },
        })
    }
    newDB(true)

    const reloadFs = async  ()=>{
        try{
            const data = await RNFS.readDir(RNFS.DocumentDirectoryPath)
            const nedb  = data.find(item=> item.name === "nedb")
            if(nedb && nedb.isDirectory()){
                const nedbDir =  await RNFS.readDir(nedb.path)
                const nowDb =  nedbDir.find(val=>val.name === INN_EXPRESS_CABINET_GRID)
                if(nowDb){
                    const del = await RNFS.unlink(nowDb.path)
                }
            }
        }catch (err){
            handDBError('reloadFs',err.message || '')
        }finally {
            newDB(false)
        }

    }
})
```


# &#x20;本地图片转Base64

```javascript 
 public async getBase64(options: {uri: string}) {
    const url = options.uri || ''
    if (_.isEmpty(url)) {
      return ''
    }
    try {
      const filePath = _.startsWith(url, 'file://') ? url : `file://${url}`
      const baseUri = await fs.readFile(filePath, 'base64')
      return baseUri
    } catch (e) {
      return  ''
    }
}
```


# react-native-fetch-polyfill

[npm: react-native-fetch-polyfill A polyfill for React Native's fetch client https://www.npmjs.com/package/react-native-fetch-polyfill](https://www.npmjs.com/package/react-native-fetch-polyfill "npm: react-native-fetch-polyfill A polyfill for React Native's fetch client https://www.npmjs.com/package/react-native-fetch-polyfill")

也就是多了个timeout的超时功能；也可以用promise.race自己封装一个；

# reconnecting-websocket

[npm: reconnecting-websocket Reconnecting WebSocket https://www.npmjs.com/package/reconnecting-websocket](https://www.npmjs.com/package/reconnecting-websocket "npm: reconnecting-websocket Reconnecting WebSocket https://www.npmjs.com/package/reconnecting-websocket")

```javascript 
 type Options = {
    WebSocket?: any; // WebSocket constructor, if none provided, defaults to global WebSocket
    maxReconnectionDelay?: number; // max delay in ms between reconnections
    minReconnectionDelay?: number; // min delay in ms between reconnections
    reconnectionDelayGrowFactor?: number; // how fast the reconnection delay grows
    minUptime?: number; // min time in ms to consider connection as stable
    connectionTimeout?: number; // retry connect if not connected after this time, in ms
    maxRetries?: number; // maximum number of retries
    maxEnqueuedMessages?: number; // maximum number of messages to buffer until reconnection
    startClosed?: boolean; // start websocket in CLOSED state, call `.reconnect()` to connect
    debug?: boolean; // enables debug output
};
```


API

```javascript 
 constructor(url: UrlProvider, protocols?: string | string[], options?: Options)
 
close(code?: number, reason?: string)
reconnect(code?: number, reason?: string)
 
send(data: string | ArrayBuffer | Blob | ArrayBufferView)
 
addEventListener(type: 'open' | 'close' | 'message' | 'error', listener: EventListener)
removeEventListener(type:  'open' | 'close' | 'message' | 'error', listener: EventListener)
```
