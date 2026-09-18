# 通讯

**一：组件路由之间  通讯**

```纯文本 
 1：事件监听 
 
 web 有很多这样的机制：想当与顶层的事件，不会随着组件的出栈或者卸载 受影响 
 
 注意： 受业务逻辑影响； 卸载的时候必须 取消监听；否则会有很大的影响； 
 
 import { 
      DeviceEventEmitter 
 } from 'react-native'; 
 
 
 componentDidMount() { 
         //收到监听 
         this.listener = DeviceEventEmitter.addListener('通知名称',(e)=>{ 
             alert(e) 
         }); 
     } 
     componentWillUnmount(){ 
         // 移除监听 
          this.listener.remove(); 
     } 
 
 DeviceEventEmitter.emit('通知名称',value); //发监听
```


```纯文本 
 2：事件回调 
 react-native 经常采用这样的方式； 
 A界面在push到B界面的时候定义个回调函数 
 
 push = () =>{ 
     this.props.navigator.push({ 
         component:DetailsView, 
         passProps:{ 
             callback:(msg)=>{ alert(msg) } 
         } 
     }) 
 } 
 
 
 B界面在pop回A界面的时候调用该回调函数 
 pop = () =>{ 
 
     this.props.navigator.pop({ 
     }) 
 
     if(this.props.callback){ 
         this.props.callback('回调') 
     } 
 }
```


**二：网络通信**

```纯文本 
 react native 提供了 原生的fetch api 访问网络请求
```


```纯文本 
 1.发起请求 
     fetch(' https://mywebsite.com/mydata.json'); 
     Fetch 还有可选的第二个参数，可以用来定制 HTTP 请求一些参数。你可以指定 header 参数，或是指定使用 POST 方法，又或是提交数据等等： 
 fetch(' https://mywebsite.com/endpoint/ ', { 
   method: 'POST', 
   headers: { 
     Accept: 'application/json', 
     'Content-Type': 'application/json', 
   }, 
   body: JSON.stringify({ 
     firstParam: 'yourValue', 
     secondParam: 'yourOtherValue', 
   }), 
 }); 
 或者 
 fetch(' https://mywebsite.com/endpoint/ ', { 
   method: 'POST', 
   headers: { 
     'Content-Type': 'application/x-www-form-urlencoded', 
   }, 
   body: 'key1=value1&key2=value2', 
 });
```


```纯文本 
 2.处理服务器的响应数据 
      promise 
          function getMoviesFromApiAsync() { 
         return fetch(' https://facebook.github.io/react-native/movies.json ') 
         .then((response) => response.json()) 
         .then((responseJson) => { 
           return responseJson.movies; 
         }) 
         .catch((error) => { 
           console.error(error); 
         }); 
     } 
     async/await   别忘了 catch 住fetch可能抛出的异常，否则出错时你可能看不到任何提示。 
      // 注意这个方法前面有async关键字 
 async function getMoviesFromApi() { 
   try { 
     // 注意这里的await语句，其所在的函数必须有async关键字声明 
     let response = await fetch( 
       ' https://facebook.github.io/react-native/movies.json ', 
     ); 
     let responseJson = await response.json(); 
     return responseJson.movies; 
   } catch (error) { 
     console.error(error); 
   } 
 }
```


```纯文本 
 import React from 'react'; 
 import { FlatList, ActivityIndicator, Text, View  } from 'react-native'; 
 
 
 export default class FetchExample extends  React.Component  { 
 
   constructor(props){ 
     super(props); 
     this.state ={ isLoading: true} 
   } 
 
   componentDidMount(){ 
     return fetch(' https://facebook.github.io/react-native/movies.json ') 
       .then((response) => response.json()) 
       .then((responseJson) => { 
 
 
         this.setState({ 
           isLoading: false, 
           dataSource: responseJson.movies, 
         }, function(){ 
 
         }); 
 
       }) 
       .catch((error) =>{ 
         console.error(error); 
       }); 
   } 
 
   render(){ 
     if(this.state.isLoading){ 
       return( 
         <View style={{flex: 1, padding: 20}}> 
           <ActivityIndicator/> 
         </View> 
       ) 
     } 
     return( 
       <View style={{flex: 1, paddingTop:20}}> 
         <FlatList 
           data={this.state.dataSource} 
           renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>} 
           keyExtractor={(item, index) => item.id} 
         /> 
       </View> 
     ); 
   } 
 } 
 默认情况下：ios 和android9+ 会阻止 http 请求，允许https请求，仍须http请求，可自行配置 
 android配置参考 ： 
         1。APP网络请求更改为HTTPS（推荐） 
         2.targetSdkVersion 降到27及以下 
         3.在 res 下新增一个 xml 目录，然后创建一个名为：network_security_config.xml 文件（名字自定） ，内容如下，大概意思就是允许开启http请求； 
     <network-security-config> 
         <base-config cleartextTrafficPermitted="true" /> 
     </network-security-config> 
     在项目的AndroidManifest.xml文件下的application标签增加以下属性，应用以上配置。    
     <application 
         ... 
         android:networkSecurityConfig="@xml/network_security_config" 
         ...  
      /> 

```


```纯文本 
 3.使用其他的网络库 
      React Native 中已经内置了XMLHttpRequest API(也就是俗称的 ajax)。一些基于 XMLHttpRequest 封装的第三方库也可以使用，例如frisbee或是axios等。 但注意不能使用 jQuery，因为 jQuery 中还使用了很多浏览器中才有而 RN 中没有的东西（所以也不是所有 web 中的 ajax 库都可以直接使用） 
     var request = new XMLHttpRequest(); 
     request.onreadystatechange = (e) => { 
       if (request.readyState !== 4) { 
         return; 
       } 
 
       if (request.status === 200) { 
         console.log('success', request.responseText); 
       } else { 
         console.warn('error'); 
       }     
     }; 
     request.open('GET', ' https://mywebsite.com/endpoint/'); 
     request.send(); 
 需要注意的是，安全机制与网页环境有所不同：在应用中你可以访问任何网站，没有跨域的限制。
```


```纯文本 
 4.WebSocket 支持 
      var ws = new WebSocket(' ws://host.com/path'); 
     ws.onopen = () => { 
       // connection opened 
       ws.send('something'); // send a message 
     }; 
     
     ws.onmessage = (e) => { 
       // a message was received 
       console.log(e.data); 
     }; 
     ws.onerror = (e) => { 
       // an error occurred 
       console.log(e.message); 
     }; 
     ws.onclose = (e) => { 
       // connection closed 
       console.log(e.code, e.reason); 
     };
```


```纯文本 
 5.本地文件相关 
 function uploadImage(url, params){ 
     return new Promise(function (resolve, reject) { 
         let formData = new FormData(); 
         for (var key in params){ 
             formData.append(key, params[key]); 
         } 
          let file = {uri: params.path, type: 'application/octet-stream', name: 'image.jpg'};（这里和H5差别很大） 
         formData.append("file", file); 
 注意：ios的uri 需要去掉 file：// 而 安卓的不需要 
         fetch(common_url + url, { 
             method: 'POST', 
             headers: { 
                 'Content-Type': 'multipart/form-data;charset=utf-8', 
                 "x-access-token": token, 
             }, 
             body: formData, 
         }).then((response) => response.json()) 
             .then((responseData)=> { 
                 console.log('uploadImage', responseData); 
                 resolve(responseData); 
             }) 
             .catch((err)=> { 
                 console.log('err', err); 
                 reject(err); 
             }); 
     }); 
 }
```
