# 核心组件API 二

## 目录

- [1.Linking](#1Linking)
  - [利用URL Scheme调起其它应用](#利用URL-Scheme调起其它应用)
  - [自定义URL Scheme](#自定义URL-Scheme)
  - [调起支付宝或微信支付](#调起支付宝或微信支付)
- [3.BackHandler  监听android 的物理返回键](#3BackHandler-监听android的物理返回键)
  - [注意：](#注意)
  - [用法：](#用法)
  - [methods：](#methods)
  - [ios：](#ios)
- [4.获取手机权限](#4获取手机权限)
  - [PermissionsAndroid](#PermissionsAndroid)
  - [请求权限的返回值](#请求权限的返回值)
  - [api：](#api)
    - [constructor()](#constructor)
    - [check()](#check)
    - [request()](#request)
    - [requestMultiple()](#requestMultiple)

# 1.Linking

强大的api：两篇参考文章；

[react-native系列(23)API篇：使用Linking唤醒其它app及WebView \_@黄小泽的个人博客-CSDN博客\_rn 调起app RN官方提供Linking库用于调起其他app或者本机应用。Linking的主要属性和方法有：属性与方法			描述		canOpenURL(url);			判断设备上是否有已经安装相应应用或可以处理URL的程序，本方法会返回一个Promise对象，只有一个回调参数，格式为Boolean值。		openURL(url);			打开设备上的某个应用或可以处理URL的程序，本方法会返回一个... <https://blog.csdn.net/zeping891103/article/details/88550547>](https://blog.csdn.net/zeping891103/article/details/88550547 "react-native系列(23)API篇：使用Linking唤醒其它app及WebView_@黄小泽的个人博客-CSDN博客_rn 调起app RN官方提供Linking库用于调起其他app或者本机应用。Linking的主要属性和方法有：属性与方法			描述		canOpenURL(url);			判断设备上是否有已经安装相应应用或可以处理URL的程序，本方法会返回一个Promise对象，只有一个回调参数，格式为Boolean值。		openURL(url);			打开设备上的某个应用或可以处理URL的程序，本方法会返回一个... https://blog.csdn.net/zeping891103/article/details/88550547")

[https://www.jianshu.com/p/7fdbc726dd74](https://www.jianshu.com/p/7fdbc726dd74 "https://www.jianshu.com/p/7fdbc726dd74")

    通过urlScheme打开其他app

RN官方提供Linking库用于调起其他app或者本机应用。Linking的主要属性和方法有：

| 属性与方法                               | 描述                                                                  |
| ----------------------------------- | ------------------------------------------------------------------- |
| canOpenURL(url);                    | 判断设备上是否有已经安装相应应用或可以处理URL的程序，本方法会返回一个Promise对象，只有一个回调参数，格式为Boolean值。 |
| openURL(url);                       | 打开设备上的某个应用或可以处理URL的程序，本方法会返回一个Promise对象。                            |
| addEventListener(type, handler);    | 添加一个监听 Linking 变化的事件。type 参数应填'url'，并提供一个处理函数。                      |
| removeEventListener(type, handler); | 删除一个事件处理函数。type 参数应填'url'。                                          |
| getInitialURL();                    | 如果应用是被一个链接调起的，则会返回相应的链接地址。否则它会返回null。                               |

如调起微信为例，它们的使用核心代码如下：

```javascript 
   // 在调起其他app或者本机应用前先检查是否已经安装：Linking.canOpenURL('weixin://').then(supported => {    
  if (!supported) {        
      console.log('无法处理该URL：' + url);    
    } else {        
      return Linking.openURL('weixin://');   
    }
}).catch(err => console.error('错误：', err));

// 本应用被其注册过的外部url调起
Linking.getInitialURL().then(url => {    
  if (url) {        
    console.log('本app被其它应用调起：' + url);    
  }
}).catch(err => {    console.warn('错误：', err);});

// 监听Linking的相关事件
Linking.addEventListener('url', this._handleOpenURL);

// 移除Linking的相关事件
Linking.removeEventListener('url', this._handleOpenURL)

_handleOpenURL(event) {    
  console.log(event.url);
}

```


## **利用URL Scheme调起其它应用**

每一个App如果期望会与其它App发生联系，则都需要定义一个URL Scheme。如上段例子中的'weixin://'。它表示了应用允许被调起的唯一标识或者说链接。下面是一些常见App的URL Scheme：

// app应用

QQ: mqq://

微信: weixin://

新浪微博: weibo:// (sinaweibo://)

腾讯微博: tencentweibo://

淘宝: taobao://

支付宝: alipay://

美团: imeituan://

知乎: zhihu://

优酷: youku://

// 本机应用

电话：Linking.openURL(\`tel:\${'10086'}\`);

浏览器：Linking.openURL('<http://www.baidu.com>');

短信：Linking.openURL('smsto:10086');

邮箱：Linking.openURL('mailto:10000\@qq. com');

地图：Linking.openURL('geo:37.2122 , 12.222');

&#x20;在Android中，直接使用openURL(url);函数即可调起其它App，前提是你需要知道相应App的url(即URL Scheme)是什么，一般来说是项目名称或应用名称。

**在IOS中，除此之外，还需要把URL Scheme加入到白名单中**

。详细方法可以参考这篇文章

[《ReactNative通过urlScheme打开其他app》](https://www.jianshu.com/p/7fdbc726dd74 "《ReactNative通过urlScheme打开其他app》")

。

现在，我创建了一个名称为auth的用户认证功能的RN项目。现在我们利用另一个项目来调起它，代码如下：

```javascript 
 Linking.canOpenURL('auth://').then(canOpen=>{
  if(canOpen){
      Linking.openURL('auth://')
    }
})
```


这里要注意，auth项目需要有URL Scheme才允许被调起，那么如何配置URL Scheme呢？接着往下看。

## **自定义URL Scheme**

android自定义URL Scheme：

以上面的auth项目为例，打开android/app/src/main/AndroidManifest.xml文件，配置如下:

\<manifest xmlns:android="<http://schemas.android.com/apk/res/android>"&#x20;

&#x20;package="com.auth">&#x20;

&#x20;...   &#x20;

\<application &#x20;

... &#x20;

android:launchMode="singleTask" // 配置1&#x20;

&#x20;... &#x20;

\<activity &#x20;

... &#x20;

// 配置2 &#x20;

\<intent-filter> &#x20;

\<action android:name="android.intent.action.VIEW" /> &#x20;

\<category android:name="android.intent.category.DEFAULT" /> &#x20;

\<category android:name="android.intent.category.BROWSABLE" /> &#x20;

\<data android:scheme="auth" /> &#x20;

\</intent-filter> &#x20;

\</activity> &#x20;

... &#x20;

\</application>   &#x20;

\</manifest>

ios自定义URL Scheme：

这个比较复杂，可以参考这篇文章

[《ReactNative注册自定义URL Scheme》](https://www.jianshu.com/p/8f2232da0956 "《ReactNative注册自定义URL Scheme》")

**注意： safari 可以直接 打开URL Scheme**

## **调起支付宝或微信支付**

如果需要调起支付模块，也是可以的。我看别人已经有一些写得很好的文章了，都大同小异，相互补充，这里直接参考就好，就不赘言。

- [https://blog.csdn.net/likeconan123/article/details/78999482](https://blog.csdn.net/likeconan123/article/details/78999482 "https://blog.csdn.net/likeconan123/article/details/78999482")
- [https://blog.csdn.net/azhezzz/article/details/80841831](https://blog.csdn.net/azhezzz/article/details/80841831 "https://blog.csdn.net/azhezzz/article/details/80841831")
- [http://fangzf.me/2017/12/05/react-native-%E9%9B%86%E6%88%90%E6%94%AF%E4%BB%98%E5%AE%9D/](http://fangzf.me/2017/12/05/react-native-%E9%9B%86%E6%88%90%E6%94%AF%E4%BB%98%E5%AE%9D/ "http://fangzf.me/2017/12/05/react-native-%E9%9B%86%E6%88%90%E6%94%AF%E4%BB%98%E5%AE%9D/")
- [https://www.jianshu.com/p/0728c30820c3](https://www.jianshu.com/p/0728c30820c3 "https://www.jianshu.com/p/0728c30820c3")
- [https://www.jianshu.com/p/7057fdab97ca](https://www.jianshu.com/p/7057fdab97ca "https://www.jianshu.com/p/7057fdab97ca")

# **3.BackHandler  监听android 的物理返回键**

        BackHandler API 用于监听设备上的后退按钮事件，可以调用你自己的函数来处理后退行为。此 API 仅能在 Android 上使用。

## **注意：**

**回调函数是倒序执行的（即后添加的函数先执行）。**

- **如果某一个函数返回 true，则后续的函数都不会被调用。**
- **如果没有添加任何监听函数，或者所有的监听函数都返回 false，则会执行默认行为，退出应用。**

**注意：如果 app 当前打开了一个Modal窗口，则 BackHandler 不会触发事件。(查看Modal的文档).**

## **用法：**

```vue 
 BackHandler.addEventListener('hardwareBackPress', function() {
    /**
     * this.onMainScreen()和this.goBack()两个方法都只是伪方法，需要你自己去实现
     * 一般来说都要配合导航器组件使用
     */
    if (!this.onMainScreen()) {
      this.goBack();
      /**
       * 返回true时会阻止事件冒泡传递，因而不会执行默认的后退行为
       */
      return true;
    }
    /**
     * 返回false时会使事件继续传递，触发其他注册的监听函数，或是系统默认的后退行为
     */
    return false;
  });
```


## methods：

static exitApp() 退出app

static addEventListener(eventName, handler)  添加监听  &#x20;

static removeEventListener(eventName, handler)   移除监听

## ios：

ios 没有物理键返回；但是从左侧往右侧滑动为退出该页面；怎么阻止该行为

```vue 
 static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      gesturesEnabled: params && params.enableGestures
    };
  };
```


动态的设置 gesturesEnabled 运行是否能手势滑动退出

[https://blog.csdn.net/iosjohnson/article/details/53127830](https://blog.csdn.net/iosjohnson/article/details/53127830 "https://blog.csdn.net/iosjohnson/article/details/53127830")

# 4.获取手机权限

## **PermissionsAndroid**

**ios设置监听功能自动提示，仅限于android**

在低于 Android 6.0 的设备上，权限只要写在

AndroidManifest.xml

里就会自动获得，此情形下

check

会始终返回

true

和而

request

方法将始终解析为

PermissionsAndroid.RESULTS.GRANTED

      如果用户之前拒绝过你的某项权限请求，那么系统会建议你显示一个为什么需要这个权限的“详细解释”（

rationale

参数）。

**如果用户之前拒绝过，那么当你再次申请的时候，弹出的就可能不是原先的申请信息，而是**

**rationale**

**参数里提供的进一步解释。**

```vue 
 //代码示例
const requestCameraPermission = async () => {  
  try {    
        const granted = await PermissionsAndroid.request(                  
                PermissionsAndroid.PERMISSIONS.CAMERA,      
                 {        
                    title: "Cool Photo App Camera Permission",        
                    message:  "Cool Photo App needs access to your camera " + "so you can take 
                    awesome  pictures.", 
                    buttonNeutral: "Ask Me Later",        
                    buttonNegative: "Cancel",        
                    buttonPositive: "OK"      
                }    
        );    
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {       
      console.log("You can use the camera");    
  } else {       
      console.log("Camera permission denied");    
  }   
  } catch (err) {     
      console.warn(err);  
  } 
};

```


权限列表：需要提示用户的权限都以常量形式列在

PermissionsAndroid.PERMISSIONS

中

READ\_CALENDAR: 'android.permission.READ\_CALENDAR'

WRITE\_CALENDAR: 'android.permission.WRITE\_CALENDAR'

CAMERA: 'android.permission.CAMERA'

READ\_CONTACTS: 'android.permission.READ\_CONTACTS'

WRITE\_CONTACTS: 'android.permission.WRITE\_CONTACTS'

GET\_ACCOUNTS: 'android.permission.GET\_ACCOUNTS'

ACCESS\_FINE\_LOCATION: 'android.permission.ACCESS\_FINE\_LOCATION'

ACCESS\_COARSE\_LOCATION: 'android.permission.ACCESS\_COARSE\_LOCATION'

RECORD\_AUDIO: 'android.permission.RECORD\_AUDIO'

READ\_PHONE\_STATE: 'android.permission.READ\_PHONE\_STATE'

CALL\_PHONE: 'android.permission.CALL\_PHONE'

READ\_CALL\_LOG: 'android.permission.READ\_CALL\_LOG'

WRITE\_CALL\_LOG: 'android.permission.WRITE\_CALL\_LOG'

ADD\_VOICEMAIL: 'com.android.voicemail.permission.ADD\_VOICEMAIL'

USE\_SIP: 'android.permission.USE\_SIP'

PROCESS\_OUTGOING\_CALLS: 'android.permission.PROCESS\_OUTGOING\_CALLS'

BODY\_SENSORS: 'android.permission.BODY\_SENSORS'

SEND\_SMS: 'android.permission.SEND\_SMS'

RECEIVE\_SMS: 'android.permission.RECEIVE\_SMS'

READ\_SMS: 'android.permission.READ\_SMS'

RECEIVE\_WAP\_PUSH: 'android.permission.RECEIVE\_WAP\_PUSH'

RECEIVE\_MMS: 'android.permission.RECEIVE\_MMS'

READ\_EXTERNAL\_STORAGE: 'android.permission.READ\_EXTERNAL\_STORAGE'

WRITE\_EXTERNAL\_STORAGE: 'android.permission.WRITE\_EXTERNAL\_STORAGE'

[PermissionsAndroid · React Native 中文网 仅适用于非沙盒项目 https://reactnative.cn/docs/permissionsandroid](https://reactnative.cn/docs/permissionsandroid "PermissionsAndroid · React Native 中文网 仅适用于非沙盒项目 https://reactnative.cn/docs/permissionsandroid")

## 请求权限的返回值

返回值都以常量形式记录在PermissionsAndroid.RESULTS中：

- GRANTED: 'granted'， 表示用户已授权
- DENIED: 'denied'， 表示用户已拒绝
- NEVER\_ASK\_AGAIN: 'never\_ask\_again'，表示用户已拒绝，且不愿被再次询问。

## api：

### constructor()

```vue 
 constructor();
```


***

### check()

```vue 
 check(permission);
```


**检查某项权限是否经过用户授权。返回一个 promise，解析为布尔值。**

参数:

| 名称         | 类型     | 必填 | 说明     |
| ---------- | ------ | -- | ------ |
| permission | string | 是  | 要检查的权限 |

***

### request()

```vue 
 request(permission, [rationale]);
```


       弹出提示框向用户请求某项权限。返回一个 promise，最终值为上文所说的PermissionsAndroid.RESULTS。

**如果提供了rationale参数，则此方法会和系统协商，是弹出系统内置的权限申请对话框，还是显示rationale中的信息以向用户进行解释。**

具体原理请参阅 android 官方文档

**注意：有时候都会弹出来，这是一个bug，所以就不要rationale参数了**

(

[https://developer.android.com/training/permissions/requesting.html#explain](https://developer.android.com/training/permissions/requesting.html#explain "https://developer.android.com/training/permissions/requesting.html#explain")

)。

参数:

| 名称         | 类型     | 必填 | 说明                 |
| ---------- | ------ | -- | ------------------ |
| permission | string | 是  | 要请求的权限             |
| rationale  | object | 否  | 见下面的&#xA;rationale |

Rationale:

| 名称             | 类型     | 必填 | 说明       |
| -------------- | ------ | -- | -------- |
| title          | string | 是  | 对话框的标题。  |
| message        | string | 是  | 对话框的正文。  |
| buttonPositive | string | 是  | 同意按钮的文本。 |
| buttonNegative | string | 否  | 拒绝按钮的文本。 |
| buttonNeutral  | string | 否  | 跳过按钮的文本。 |

***

### requestMultiple()

```vue 
 requestMultiple(permissions);
```


     在一个弹出框中向用户请求多个权限。返回值为一个 object，key 为各权限名称，值为PermissionsAndroid.RESULTS。

参数:

| 名称          | 类型    | 必填  | 说明        |
| ----------- | ----- | --- | --------- |
| permissions | array | Yes | 要申请的权限的数组 |

**IOS**

```vue 
 import {     NativeModules,     NativeAppEventEmitter,} from 'react-native'; 
//在JavaScript中调用Object-C定义的方法，需要先导入NativeModules 
//此处的RNCalliOSAction就是我们在iOS上新建的类名 
//如果在iOS中设置了导出了类的名字，此处需要和导出的名字一致 
const manager = NativeModules.PermissionsManager; /*相机权限*/ 
const cameraPermission = () => {    
    return new Promise((resolve, reject) => {        
        manager.cameraPermission().then(data => {            
            resolve(data);        
        }).catch(err => {            
            reject(err);        
        });    
    });
};
```
