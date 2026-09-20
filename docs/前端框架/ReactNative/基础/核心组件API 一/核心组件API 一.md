# 核心组件API 一

## 目录

- [Keyboard](#Keyboard)
- [TouchableWithoutFeedback](#TouchableWithoutFeedback)
- [modal  ](#modal)
- [PixelRatio](#PixelRatio)
- [AppState](#AppState)
- [DeviceEventEmitter](#DeviceEventEmitter)
- [ART](#ART)
- [Clipboard ](#Clipboard-)

# **Keyboard**

apis:

static dismiss() 把弹出的键盘收回去，同时使当前的文本框失去焦点。

# **TouchableWithoutFeedback**

除非你有一个很好的理由，否则不要用这个组件。所有能够响应触屏操作的元素在触屏后都应该有一个视觉上的反馈（然而本组件没有任何视觉反馈）

注意TouchableWithoutFeedback只支持一个子节点（不能没有子节点也不能多于一个）。如果你希望包含多个子组件，可以用一个 View 来包装它们。

# \*\*modal  \*\*​

    \<Modal

        animationType="slide"

        transparent={true}

        visible={modalVisible}

        onRequestClose={() => {

          Alert.alert("Modal has been closed.");

        }}

        presentationStyle={''}

      >

        \<View style={styles.centeredView}>

          \<View style={styles.modalView}>

            \<Text style={styles.modalText}>Hello World!\</Text>

            \<TouchableHighlight

              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}

              onPress={() => {

                setModalVisible(!modalVisible);

              }}

            >

              \<Text style={styles.textStyle}>Hide Modal\</Text>

            \</TouchableHighlight>

          \</View>

        \</View>

      \</Modal>

# **PixelRatio**

设备像素比 px/pt  物理像素/逻辑像素    

PixelRatio.get() === 1

# **AppState**

AppState能告诉你应用当前是在前台还是在后台，并且能在状态变化的时候通知你。

AppState 通常在处理推送通知的时候用来决定内容和对应的行为。

\* active - 应用正在前台运行

\* background - 应用正在后台运行。用户可能面对以下几种情况：

    \* 在别的应用中

    \* 停留在桌面

    \* 对 Android 来说还可能处在另一个Activity中（即便是由你的应用拉起的）

\* \[iOS] inactive - 此状态表示应用正在前后台的切换过程中，或是处在系统的多任务视图，又或是处在来电状态中。

要获取当前的状态，你可以使用AppState.currentState，这个变量会一直保持更新。不过在启动的过程中，currentState可能为 null，直到AppState从原生代码得到通知为止。

# DeviceEventEmitter

```javascript 
 componentDidMount(){      
  var self = this;    
     this.listener = DeviceEventEmitter.addListener('changeMine',function(url){       
       self.setState({          
         avatar:url        
       })     
});
  //通知开始，获取到url，调用setState 方法，刷新状态机，这时候实时的刷新了‘我的’图标 
 //最后别忘了移除通知
componentWillUnmount(){      
     this.listener.remove();   
}
const callBack = () => {}
const xxxSubscription = DeviceEventEmitter.addListener(`XXXX`, callback);
// 根据返回的监听id移除对应的监听
DeviceEventEmitter.removeSubscription(xxxSubscription)
/* 根据key和监听时callback移除监听
 *  callback：必传，若不传或传的不是监听时指定的callback则所有XXXX监听都无法remove
*/
DeviceEventEmitter.removeListener('XXXX', callback)
DeviceEventEmitter.removeAllListeners('NumberKeyboard:Input')

```


# ART

[https://blog.csdn.net/zramals/article/details/74231526](https://blog.csdn.net/zramals/article/details/74231526 "https://blog.csdn.net/zramals/article/details/74231526")

```javascript 
 import { ART } from 'react-native'
const { Surface, Shape, Path, Group } = ART;
```


# Clipboard&#x20;

[🚧 Clipboard · React Native 中文网 已过时。 Use @react-native-community/clipboard instead. https://www.react-native.cn/docs/0.63/clipboard](https://www.react-native.cn/docs/0.63/clipboard "🚧 Clipboard · React Native 中文网 已过时。 Use @react-native-community/clipboard instead. https://www.react-native.cn/docs/0.63/clipboard")

```javascript 
 import { Clipboard } from 'react-native'
import { Toast } from 'react-common/utils/native-utils'
import type { Callback } from 'react-common/types/langType'

export const setString = (input: string, callback: Callback) => {
    Clipboard.setString(input)
    if (callback) {
        callback()
    }
}

export const setStringWithToastMsg = (input: string, msg: string) => {
    setString(input, () => {
        Toast.showShortBottom(msg)
    })
}

try {
      const content = await Clipboard.getString()
      const waybillArr  = this.filterOrder(content).filter(item=>/^[A-Za-z0-9]{8,20}$/.test(item))
      if(!_.isEmpty(waybillArr)){
        this.setState({
          showClipBoardTipModal: true,
          clipBoardContent: waybillArr,
        })
      }
    } catch (e) {
      Toast.showShortCenter(e.message)
    }

export default {}


```
