# 视屏图像类

## 目录

- [react-native-image-crop-picker ](#react-native-image-crop-picker-)
- [react-native-camera ](#react-native-camera-)
  - [常用api：](#常用api)
  - [问题点：](#问题点)
- [react-native-image-picker ](#react-native-image-picker-)
- [react-native-video](#react-native-video)
  - [常见错误：](#常见错误)
  - [常见配置](#常见配置)
- [生成图片并保存到相册](#生成图片并保存到相册)
- [图片预览](#图片预览)

# react-native-image-crop-picker&#x20;

打开相机，相册

[react-native-image-crop-picker的使用 react-native-image-crop-picker是一款注重剪裁,相册单选、多选的第三方框架。我这里要实现的是，在个人用户中心更新用户的头像 首先我们使用的时候，一... https://www.jianshu.com/p/8318f4c85f54](https://www.jianshu.com/p/8318f4c85f54 "react-native-image-crop-picker的使用 react-native-image-crop-picker是一款注重剪裁,相册单选、多选的第三方框架。我这里要实现的是，在个人用户中心更新用户的头像 首先我们使用的时候，一... https://www.jianshu.com/p/8318f4c85f54")

# react-native-camera&#x20;

视频录制

[React Native Camera简单介绍与拍照录像示例 - 掘金 react-native-camera 功能非常强大，我们可以选择使用哪个摄像头、是拍照还是录像、是否录制声音、是否开启闪光灯、视图比例、拍摄质量、拍摄方向、触摸功能、条形码/二维码扫描等等。 5.图片预览 拿到返回的文件地址用image标签岂可预览，视频预览播放要用到reac… https://juejin.im/post/6844904120336252935](https://juejin.im/post/6844904120336252935 "React Native Camera简单介绍与拍照录像示例 - 掘金 react-native-camera 功能非常强大，我们可以选择使用哪个摄像头、是拍照还是录像、是否录制声音、是否开启闪光灯、视图比例、拍摄质量、拍摄方向、触摸功能、条形码/二维码扫描等等。 5.图片预览 拿到返回的文件地址用image标签岂可预览，视频预览播放要用到reac… https://juejin.im/post/6844904120336252935")

官网文档

[  https://react-native-community.github.io/react-native-camera/docs/rncamera](https://react-native-community.github.io/react-native-camera/docs/rncamera "  https://react-native-community.github.io/react-native-camera/docs/rncamera")

csdn：

[React Native - 调用摄像头拍照（使用react-native-camera库）\_天蒙蒙亮的博客-CSDN博客\_react-native-camera http://www.hangge.com/blog/cache/detail\_1618.htmlReact Native - 调用摄像头拍照（使用react-native-camera库） 发布：hangge阅读：68711，react-native-camera介绍react-native-camera 是一个第三方的开源库，我们可以通过它来调用设备的摄像头，从而实现拍照、或者录像功能。rea https://blog.csdn.net/qq\_38719039/article/details/79469634](https://blog.csdn.net/qq_38719039/article/details/79469634 "React Native - 调用摄像头拍照（使用react-native-camera库）_天蒙蒙亮的博客-CSDN博客_react-native-camera http://www.hangge.com/blog/cache/detail_1618.htmlReact Native - 调用摄像头拍照（使用react-native-camera库） 发布：hangge阅读：68711，react-native-camera介绍react-native-camera 是一个第三方的开源库，我们可以通过它来调用设备的摄像头，从而实现拍照、或者录像功能。rea https://blog.csdn.net/qq_38719039/article/details/79469634")

android 配置 ：

[ReactNative常用组件库 react-native-camera 相机 - jadefan - 博客园 通过react-native-camera调用原生相机，及自定义样式 GitHub地址： 安装： 配置： 1.修改...\android\app\src\main\AndroidManifest.xm https://www.cnblogs.com/fanlu/p/8986221.html](https://www.cnblogs.com/fanlu/p/8986221.html "ReactNative常用组件库 react-native-camera 相机 - jadefan - 博客园 通过react-native-camera调用原生相机，及自定义样式 GitHub地址： 安装： 配置： 1.修改...\android\app\src\main\AndroidManifest.xm https://www.cnblogs.com/fanlu/p/8986221.html")

### 常用api：

```vue 
 <RNCamera
    ref={ref => {
    this.camera = ref;
    }}
    style={styles.preview}
    type={RNCamera.Constants.Type.back}
    flashMode={RNCamera.Constants.FlashMode.on}
    androidCameraPermissionOptions={{
      title: 'Permission to use camera',
      message: 'We need your permission to use your camera',
      buttonPositive: 'Ok',
      buttonNegative: 'Cancel',
    }}
    androidRecordAudioPermissionOptions={{
      title: 'Permission to use audio recording',
      message: 'We need your permission to use your audio',
      buttonPositive: 'Ok',
      buttonNegative: 'Cancel',
    }}
    onGoogleVisionBarcodesDetected={({ barcodes }) => {
      console.log(barcodes);
    }}
>
{({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
              </View>
            );
          }}
</RNCamera>
```


### 问题点：

更多细节见官网：写的很详细；很好；

编码：压缩；事件，码率，照相；很强大的一个控件

- mute ： 是否静音

```vue 
 android 播放音频需要加权限
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
```


# react-native-image-picker&#x20;

拍照/本地相册/拍视频 非常有用的库了

[npm: react-native-image-picker A React Native module that allows you to use native UI to select media from the device library or directly from the camera. Latest version: 4.8.1, last published: 16 hours ago. Start using react-nativ https://www.npmjs.com/package/react-native-image-picker](https://www.npmjs.com/package/react-native-image-picker "npm: react-native-image-picker A React Native module that allows you to use native UI to select media from the device library or directly from the camera. Latest version: 4.8.1, last published: 16 hours ago. Start using react-nativ https://www.npmjs.com/package/react-native-image-picker")

```javascript 
import ImagePicker from 'react-native-image-picker'
import Permissions from 'react-native-permissions'
import _ from 'lodash'
import Alert from 'react-common/components/Alert'
import { safeParseJSON } from 'react-common/utils/stringify'
import { EditCropedImageUtils, Toast } from 'react-common/utils/native-utils'
import { getRequiredPermission, permissionNameInfo } from 'react-common/utils/permissionUtil'
import RNFS from 'react-native-fs'

const opsDefault = {
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo',
  quality: 0.6,
  maxWidth: 800, // photos only
  maxHeight: 800, // photos only
  allowsEditing: true,
  noData: true,
}

export const getPictureCamera = (onConfirm: (sour: Object) => void, ops?: any) => {
  getRequiredPermission([
    permissionNameInfo.CAMERA,
    permissionNameInfo.READ_EXTERNAL_STORAGE,
    permissionNameInfo.WRITE_EXTERNAL_STORAGE,
  ])
    .then(errMsg => {
      if (errMsg) {
        Alert.alert('无法访问相机', errMsg, [
          { text: '取消' },
          {
            text: '去设置',
            onPress: () => {
              Permissions.openSettings()
            },
          },
        ])
      } else {
        ImagePicker.launchCamera(ops || opsDefault, response => {
          // console.log('showImagePicker ', response)
          if (response.didCancel) {
            // console.log('User cancelled image picker')
          } else if (response.alert) {
            // Alert.alert("提示",response.alert , [{text:"确定"}]);
          } else if (response.error) {
            // console.log('ImagePicker Error: ', response.error)
            if (response.error.indexOf('Camera permissions')) {
              Toast.show('请开启相机权限...')
            }

            if (response.error.indexOf('Photo library permissions')) {
              Toast.show('请去开启相册权限...')
            }
          } else {
            const source = {
              uri: response.uri,
              isLocal: true,
              isStatic: true,
              fileSize: response.fileSize,
            }
            if (onConfirm && _.isFunction(onConfirm)) {
              onConfirm(source)
            }
          }
        })
      }
    })
}

export const getPictureImageLibrary = (onConfirm: (sour: any) => any, ops?: any) => {
  getRequiredPermission([
    permissionNameInfo.CAMERA,
    permissionNameInfo.READ_EXTERNAL_STORAGE,
    permissionNameInfo.WRITE_EXTERNAL_STORAGE,
  ])
    .then(errMsg => {
      if (errMsg) {
        Alert.alert('无法访问相册', errMsg, [
          { text: '取消' },
          {
            text: '去设置',
            onPress: () => {
              Permissions.openSettings()
            },
          },
        ])
      } else {
        ImagePicker.launchImageLibrary(ops || opsDefault, response => {
          // console.log('showImagePicker ', JSON.stringify(response))
          if (response.didCancel) {
            // console.log('User cancelled image picker')
          } else if (response.alert) {
            // Alert.alert("提示",response.alert , [{text:"确定"}]);
          } else if (response.error) {
            // console.log('ImagePicker Error: ', response.error)
            if (response.error.indexOf('Camera permissions')) {
              Toast.show('请开启相机权限...')
            }

            if (response.error.indexOf('Photo library permissions')) {
              Toast.show('请去开启相册权限...')
            }
          } else {
            const source = {
              uri: response.uri,
              isLocal: true,
              isStatic: true,
              fileSize: response.fileSize,
            }
            if (onConfirm && _.isFunction(onConfirm)) {
              onConfirm(source)
            }
          }
        })
      }
    })
}
```


```javascript 
ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {}
      else if (response.error) {}
      else if (response.customButton) {}
      else if (parseInt( response.data.length / 1048576 ) >= this.MaxSize) { //1048576 = 1024 * 1024
        this.alertMessage('提示:','图片太大，请选择一张更小的图')
      }
      else {
        //later
      }
    });

```


# react-native-video

视频播放&#x20;

官网：

[GitHub - react-native-video/react-native-video: A \<Video /> component for react-native A \<Video /> component for react-native. Contribute to react-native-video/react-native-video development by creating an account on GitHub. https://github.com/react-native-community/react-native-video#controls](https://github.com/react-native-community/react-native-video#controls "GitHub - react-native-video/react-native-video: A <Video /> component for react-native A <Video /> component for react-native. Contribute to react-native-video/react-native-video development by creating an account on GitHub. https://github.com/react-native-community/react-native-video#controls")

参考

## 常见错误：

Unhandled JS Exception: Cannot read property 'Constants' of undefined （ios android 有兼容）

## 常见配置

controls： false

# 生成图片并保存到相册

[GitHub - rescript-react-native/cameraroll: ReScript bindings for @react-native-community/cameraroll ReScript bindings for @react-native-community/cameraroll - GitHub - rescript-react-native/cameraroll: ReScript bindings for @react-native-community/cameraroll https://github.com/rescript-react-native/cameraroll](https://github.com/rescript-react-native/cameraroll "GitHub - rescript-react-native/cameraroll: ReScript bindings for @react-native-community/cameraroll ReScript bindings for @react-native-community/cameraroll - GitHub - rescript-react-native/cameraroll: ReScript bindings for @react-native-community/cameraroll https://github.com/rescript-react-native/cameraroll")

[GitHub - gre/react-native-view-shot: Snapshot a React Native view and save it to an image Snapshot a React Native view and save it to an image - GitHub - gre/react-native-view-shot: Snapshot a React Native view and save it to an image https://github.com/gre/react-native-view-shot](https://github.com/gre/react-native-view-shot "GitHub - gre/react-native-view-shot: Snapshot a React Native view and save it to an image Snapshot a React Native view and save it to an image - GitHub - gre/react-native-view-shot: Snapshot a React Native view and save it to an image https://github.com/gre/react-native-view-shot")

```javascript 
 
import {captureRef} from "react-native-view-shot";
import CameraRoll from '@react-native-community/cameraroll'
public savePic = ()=>{
        this.captureQRCodeImage()
            .then((uri) => {
                CameraRoll.save(uri)
                    .then(() => {
                        Toast.showShortCenter('图片已保存到相册')
                    })
                    .catch(() => {
                        Toast.showShortCenter('图片保存失败')
                    })
            })
            .catch(() => {
                Toast.showShortCenter('图片保存失败')
            })
    }
    public captureQRCodeImage = () => new Promise((resolve, reject) => {
        captureRef(this.qrCodeImageRef, {
            format: 'jpg',
            quality: 0.8,
            result: 'tmpfile',
        })
            .then((uri) => {
                resolve(uri)
            }, () => {
                reject('生成图片失败，请稍后再试')
            })
            .catch(() => {
                reject('生成图片失败，请稍后再试')
            })
    })


<View
                style={styles.qrView}
                ref={ref => {
                    this.qrCodeImageRef = ref
                }}
            >
                <View style={styles.qrHeader}>
                    <Image
                        source={require('../images/icon55.png')}
                        style={styles.imgTitle}
                    />
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.headerText}>通写变绿地爱你 </Text>
                        <Text style={[styles.headerText,{marginLeft:13}]}>2512512512</Text>
                    </View>

                </View>

                <View style={styles.qrContent}>
                    <QRCode
                        value={'asgasgasf'}
                        size={200}
                        color="#000000"
                        backgroundColor="#f2f2f2"
                        logoSize={50}
                        logoMargin={4}
                        logoBackgroundColor="transparent"
                        logo={require('../images/logo.png')}
                    />
                    <Text style={styles.contentText}>微信扫一扫 快速打开身份码</Text>

                    <TouchableOpacity onPress={this.savePic}>
                        <Text style={styles.saveBtn}>保存图片至手机</Text>
                    </TouchableOpacity>
                </View>

          

// 或者
public onSaveShelvesImgPress = async () => {
    try {
      const shelvesImg = await captureRef(this.refs.shelvesImg, {
        format: 'jpg',
        quality: 0.5,
      })
      await CameraRoll.save(shelvesImg)
      Toast.showShortCenter('保存成功')
    } catch (error) {
      Toast.showShortCenter('保存失败')
    }
}
```


# 图片预览

npm i  react-native-image-zoom-viewer --save

npm i react-native-image-viewer --save&#x20;

[react-native-image-zoom-viewer学习 - 环球移动团队 - 博客园 github原地址 react-native-image-zoom-viewer实现了类似微信朋友圈浏览图片的效果，点击小图片实现浏览原图效果。 安装： npm i react-native-imag https://www.cnblogs.com/univalsoft-mobile-team/p/7637682.html](https://www.cnblogs.com/univalsoft-mobile-team/p/7637682.html "react-native-image-zoom-viewer学习 - 环球移动团队 - 博客园 github原地址 react-native-image-zoom-viewer实现了类似微信朋友圈浏览图片的效果，点击小图片实现浏览原图效果。 安装： npm i react-native-imag https://www.cnblogs.com/univalsoft-mobile-team/p/7637682.html")

源码可以好好看看：github（没有很复杂；也可以自定义）

[  https://github.com/ascoders/react-native-image-viewer](https://github.com/ascoders/react-native-image-viewer "  https://github.com/ascoders/react-native-image-viewer")

[ npm: react-native-image-zoom-viewer react native image viewer,大图浏览. Latest version: 3.0.1, last published: 2 years ago. Start using react-native-image-zoom-viewer in your project by running \`npm i react-native-image-zoom-viewer\`. There  https://www.npmjs.com/package/react-native-image-zoom-viewer](https://www.npmjs.com/package/react-native-image-zoom-viewer " npm: react-native-image-zoom-viewer react native image viewer,大图浏览. Latest version: 3.0.1, last published: 2 years ago. Start using react-native-image-zoom-viewer in your project by running `npm i react-native-image-zoom-viewer`. There  https://www.npmjs.com/package/react-native-image-zoom-viewer")
