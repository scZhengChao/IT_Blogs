# Modal 类

## 目录

- [业务常见场景](#业务常见场景)
  - [连续弹框不出现](#连续弹框不出现)
- [下拉：](#下拉)
- [底部弹出](#底部弹出)
- [react-native-modal](#react-native-modal)
- [Toast](#Toast)
- [react-native-root-siblings ](#react-native-root-siblings-)

# 业务常见场景

### 连续弹框不出现

可以

```typescript 
if(!visible) return null
return <Modal></Modal>
```


&#x20;来不断创建销毁 弹框

# 下拉：

github地址：

[react-native-modal-dropdown](https://github.com/siemiatj/react-native-modal-dropdown "react-native-modal-dropdown")

中文文档：

[\[原创\]自己动手实现React-Native下拉框控件 - 極 - 博客园 一个react-native的下拉框组件，支持安卓和iOS。 https://www.cnblogs.com/sohobloo/p/react-native-modal-dropdown.html](https://www.cnblogs.com/sohobloo/p/react-native-modal-dropdown.html "\[原创]自己动手实现React-Native下拉框控件 - 極 - 博客园 一个react-native的下拉框组件，支持安卓和iOS。 https://www.cnblogs.com/sohobloo/p/react-native-modal-dropdown.html")

# 底部弹出

react-native-actionsheet

![  ](591e50a25ae606fc25300b05c3b375d5_71AP3f3lwv.png "  ")

[npm: react-native-actionsheet Cross platform ActionSheet. This component implements a custom ActionSheet  and provides the same way to drawing it on the defferent platforms(iOS and Android). Actually, In order to keep the best eff https://www.npmjs.com/package/react-native-actionsheet](https://www.npmjs.com/package/react-native-actionsheet "npm: react-native-actionsheet Cross platform ActionSheet. This component implements a custom ActionSheet  and provides the same way to drawing it on the defferent platforms(iOS and Android). Actually, In order to keep the best eff https://www.npmjs.com/package/react-native-actionsheet")

```javascript 
title: 标题
tintColor: 列表中按钮的颜色
message: 显示在标题下方的文字
options: 按钮标题列表
cancelButtonIndex: 选项中取消按钮的索引
destructiveButtonIndex: 选项中显示为红色按钮的索引
onPress: 回调函数采用一个参数，即选定项的从零开始的索引


```


# **react-native-modal**

[https://www.cnblogs.com/XYQ-208910/p/12618732.html](https://www.cnblogs.com/XYQ-208910/p/12618732.html "https://www.cnblogs.com/XYQ-208910/p/12618732.html")

        相比于 

react-native-root-siblings  这个react-native-modal 更加的方便于我们开发

         react-native-modal是一个增强的，动画的和可定制的react-native模态对话框开源组件，它提供的API比较丰富，基本可以满足开发中需要的各种对话弹框，它附带遮罩层以模态的形式弹出。使用它友好地为用户提供消息展示，是一个不错的选择。

2.1  、 属性

这个模态对话框组件提供的属性比较多，如下所示：

```javascript 
 //对话框动画显示方式，默认slideInUp
animationIn: string;
//对话框动画显示需要的时间，默认300ms
animationInTiming: number;
//对话框动画隐藏方式，默认slideOutDown
animationOut: string;
//对话框动画隐藏需要的时间，默认300ms
animationOutTiming: number;
//是否启用避免键盘遮挡属性, 启动后，不会遮挡输入框
avoidKeyboard: boolean;
//是否铺满整个屏幕
coverScreen: boolean;
//是否显示遮罩层
hasBackdrop: boolean;
//遮罩层背景颜色
backdropColor: string;
//遮罩层透明度
backdropOpacity: number;
//遮罩层显示需要的时间，默认300ms
backdropTransitionInTiming: number;
//遮罩层隐藏需要的时间，默认300ms
backdropTransitionOutTiming: number;
//支持自定义遮罩层
customBackdrop: null;
//是否使用原生的驱动
useNativeDriver: boolean;
//设备高度（在可以隐藏导航栏的设备上很有用）
deviceHeight: null;
//设备宽度（在可以隐藏导航栏的设备上很有用）
deviceWidth: null;
//是否当动画时隐藏模态内容
hideModalContentWhileAnimating: boolean;
//是否允许滑动事件传播到子组件（例如，模态中的ScrollView）
propagateSwipe: boolean;
//是否可见
isVisible: boolean;
//当模态动画完全显示时触发该回调
onModalShow: () => null;
//当模态动画将要显示时触发该回调
onModalWillShow: () => null;
//当模态动画完全隐藏时触发该回调
onModalHide: () => null;
//当模态动画将要隐藏时触发该回调
onModalWillHide: () => null;
//当点击遮罩层区域时触发该回调
onBackdropPress: () => null;
//当点击遮罩层上按钮时触发该回调
onBackButtonPress: () => null;
//扫动阈值，默认100。达到时会触发onSwipeComplete函数
swipeThreshold: number;
//扫动方向
swipeDirection: string;
//开始扫动时触发该回调
onSwipeStart:func;
//扫动移动时触发该回调
onSwipeMove: func;
//扫动完成时触发该回调
onSwipeComplete: func;
//扫动取消时触发该回调
onSwipeCancel: func;
//组件风格样式
style: any ;
//滚动到指定位置
scrollTo: null;
//滚动多少偏移
scrollOffset: number;
//滚动的最大偏移
scrollOffsetMax: number;
//是否允许水平滚动
scrollHorizontal: boolean;
//支持的设备方向
supportedOrientations: string[];
```


# Toast

**react-nattive-root-toast （tipview文字提示）**

[https://www.jianshu.com/p/fe84046c9325](https://www.jianshu.com/p/fe84046c9325 "https://www.jianshu.com/p/fe84046c9325")

    简书解析

[https://www.npmjs.com/package/react-native-root-toast](https://www.npmjs.com/package/react-native-root-toast "https://www.npmjs.com/package/react-native-root-toast")

    npm 光网 ；

给大家安利一款可以在ios和android上通用的Toast组件: react-native-root-toast

现在开源的Toast组件一大堆，为什么要选用这个呢？原因如下：

\* 纯javascript解决方案，免去了原生安装的各种繁杂步骤，直接一行npm install react-native-root-toast --save搞定

\* 同时兼容iOS和Android，使用完全一致的接口，不用再为同时兼容两个平台再写额外的代码

\* 可以自定义toast的各类属性（显示时间、位置、延时、动画、阴影等）

\* 同时支持两种调用形式（可以使用API调用，也可以作为Component直接放在render里面进行控制）

```javascript 
 import Toast from 'react-native-root-toast'; // 引入类库

// 通过调用 Toast.show(message, options); 可以在屏幕上显示一个toast，并返回一个toast实例
let toast = Toast.show('This is a message', {
    duration: Toast.durations.LONG, // toast显示时长
    position: Toast.positions.BOTTOM, // toast位置
    shadow: true, // toast是否出现阴影
    animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
    hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
    delay: 0, // toast显示的延时
    onShow: () => {
        // toast出现回调（动画开始时）
    },
    onShown: () => {
        // toast出现回调（动画结束时）
    },
    onHide: () => {
        // toast隐藏回调（动画开始时）
    },
    onHidden: () => {
        // toast隐藏回调（动画结束时）
    }});

// 也可以通过调用Toast.hide(toast); 手动隐藏toast实例
setTimeout(function () {
    Toast.hide(toast);
}, 500);
```


你也可以通过react组件方式调用Toast.

       在

**render**

里面加入

**\<Toast />**

组件，并通过

**visible**

属性对

**Toast**

进行控制.

      \<Toast />的属性和API调用时传入的选项相同.toast内容添加在元素内部:\<Toast>

**message**

\</Toast>

注意：通过组件方式调用的toast，在\<Toast />组件&#x20;

**componentWillUnmount**

&#x20;的时候会

**自动消失**

```javascript 
 import React, {Component} from 'react-native';import Toast from 'react-native-root-toast';
class Example extends Component{
    constructor() {
        super(...arguments);
        this.state = {
            visible: false
        };
    }
    componentDidMount() {
        setTimeout(() => this.setState({
            visible: true
        }), 2000); // show toast after 2s

        setTimeout(() => this.setState({
            visible: false
        }), 5000); // hide toast after 5s
    };

    render() {
        return <Toast
            visible={this.state.visible}
            position={50}
            shadow={false}
            animation={false}
            hideOnPress={true}
        >This is a message</Toast>;
    }
}

null is not an object(evaluting '_this._root_setNativeProps')

修改方法：
    在源文件lib/ToastContainer.js中改下代码
    componentWillUnmount = () => {
       this._root&&this._hide();
    };

注意： 目前在实践中 3.2.1 版本有问题； 在github 上只有3.0.0 版本 没问题的
```


# \*\*react-native-root-siblings \*\*

操作H5操作dom的体验感

**（较低层；最外层overleay）**

[http://www.fwheart.club/2019/02/17/react-native-root-siblings%E6%BA%90%E7%A0%81%E8%A7%A3%E8%AF%BB/](http://www.fwheart.club/2019/02/17/react-native-root-siblings%E6%BA%90%E7%A0%81%E8%A7%A3%E8%AF%BB/ "http://www.fwheart.club/2019/02/17/react-native-root-siblings%E6%BA%90%E7%A0%81%E8%A7%A3%E8%AF%BB/")

    源码解读

react-native-root-siblings是magicismight编写的react-native的工具库，它能够

**使用函数将组件作为兄弟节点插入到根组件**

中，如:

（用处广泛；

**在全局的范围内，动态的添加 一组component元素**

**）**

```javascript 
 
//插入
let sibling = new RootSiblings(<View
    style={{top: 0,right: 0,bottom: 0,left: 0,backgroundColor: 'red'}}
/>);
//更新
sibling.update(<View
    style={{top: 10,right: 10,bottom: 10,left: 10,backgroundColor: 'blue'}}
/>);
//删除
sibling.destroy();
```


(这是他的核心优点，让你有操作H5操作dom的体验感)

         使用该组件可以实现

**通过函数直接显示UI，而不需要将UI写入组件中，通过设置状态来改变显隐**

。鄙人认为使用这种方式来显示一些会话框

**能够很好的组织与维护代码**

。因此我对这个

**类库产生了浓厚的兴趣**

，并开始解析其写法。从github上下载源码并使用SourceTree回溯日志后，可以发现该项目经过了三次比较大的改动。分别对应于1.x版本 2.x版本 3.x版本。

      3.2.3 版本； 4.x 版本增加了 redux 有机会在看一下；很好的一个组件（需要自己封装；而react-native-modal就是封装好的成品）

[https://www.npmjs.com/package/react-native-root-siblings/v/3.2.3](https://www.npmjs.com/package/react-native-root-siblings/v/3.2.3 "https://www.npmjs.com/package/react-native-root-siblings/v/3.2.3")

    3.2.3 版本

**可以让你有createElement的感觉；动态的显示；便于组织和代码维护**

**官方代码：3.x  有管理**

```javascript 
 use strict';
import React, {
    AppRegistry,
    View,
    Component,
    TouchableHighlight,
    StyleSheet,
    Text
} from 'react-native';
import Dimensions from 'Dimensions';
// Import library there,it will wrap everything registered by AppRegistry.registerComponent
// And add or remove other elements after the root component
import RootSiblings from 'react-native-root-siblings';
var id = 0;
var elements = [];
class SiblingsExample extends Component{
    addSibling = () => {
        let sibling = new RootSiblings(<View
            style={[styles.sibling, {top: id * 20}]}
        >
            <Text>I`m No.{id}</Text>
        </View>);
        id++;
        elements.push(sibling);
    };
    destroySibling = () => {
        let lastSibling = elements.pop();
        lastSibling && lastSibling.destroy();
    };
    updateSibling = () => {
        let lastId = elements.length - 1;
        lastId >= 0 && elements[lastId].update(<View
            style={[styles.sibling, {top: lastId * 20}]}
        >
            <Text>I`m No.{lastId} : {Math.random()}</Text>
        </View>);
    };
    render() {
        return <View style={styles.container}>
            <TouchableHighlight
                style={styles.button}
                onPress={this.addSibling}
            >
                <Text style={styles.buttonText}>Add element</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.button}
                onPress={this.destroySibling}
            >
                <Text style={styles.buttonText}>Destroy element</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.button}
                onPress={this.updateSibling}
            >
                <Text style={styles.buttonText}>Update element</Text>
            </TouchableHighlight>
        </View>;
    }
}
AppRegistry.registerComponent('SiblingsExample', () => SiblingsExample);

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
    },
    button: {
        borderRadius: 4,
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#ccc',
        borderColor: '#333',
        borderWidth: 1,
    },
    buttonText: {
        color: '#000'
    },
    sibling: {
        left: 0,
        height: 20,
        width: Dimensions.get('window').width / 2,
        backgroundColor: 'blue',
        opacity: 0.5
    }
});

```


**核心思想：**

    使用一个

**自定义注册方法，代替原有组件注册方法**

，然后使用\<StaticContainer/>作为原有组件的容器(这个组件只接收一个孩子节点，并且只有显式的设置属性shouldUpdate为true时才会更新组件)。很明显StaticContainer的使用是为了提高性能。

```javascript 
 const originRegister = AppRegistry.registerComponent;
AppRegistry.registerComponent = function (appKey, getAppComponent) {
    const siblings = new Map();
    const updates = new Set();


    return originRegister(appKey, function () {
        const OriginAppComponent = getAppComponent();
        /**/
        return class extends Component {
            componentWillMount() {
                    this._update = this._update.bind(this);
                    emitter.addListener('siblings.update', this._update);
                };

                _update(id, element, callback) {
                    if (siblings.has(id) && !element) {
                        siblings.delete(id);
                    } else {
                        siblings.set(id, element);
                    }
                    updates.add(id);
                    //触发更新
                    this.forceUpdate(callback);
                };

            render(){
                return(
                    <View style={styles.container}>
                        <StaticContainer shouldUpdate={false}>
                            <OriginAppComponent {...this.props} />
                        </StaticContainer>
                        {siblings.map((element, id) =>(
                        <StaticContainer
                            key={`root-sibling-${id}`}
                            shouldUpdate={updates.has(id)}>
                            {element}
                        </StaticContainer>))}
                    </View>
                )
            }
        }
    };
}
```


**实战使用：**

```javascript 
 import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity, Text } from 'react-native'
import RootSiblings from 'react-native-root-siblings';
const { width, height } = Dimensions.get('window');

let sibling = undefined
const AlertUtil = {
    show: (title, subTitle, cancelAction, confirmAction) => {

        sibling = new RootSiblings(
            <View style={styles.maskStyle}>
                <View style={styles.backViewStyle}>
                    <View style={{ height: 25 }} />
                    <Text style={styles.titleLbl}>{title}</Text>
                    <View style={{ height: 10 }} />         
                    {/* <View>{subTitle}</View> */}
                    {subTitle}
                    <View style={{ height: 14 }} />
                    <View style={styles.seperatorLine} />
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.touchView} onPress={cancelAction}>
                            {/* //此处可以自定义 话术 */}
                            <Text style={styles.cancelBtn}>取消</Text>
                        </TouchableOpacity>
                        <View style={styles.widthSeperatorLine} />
                        <TouchableOpacity style={styles.touchView} onPress={confirmAction}>
                            {/* //此处可以自定义 话术 */}
                            <Text style={styles.confirmBtn}>确定</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
        console.log(sibling)
    },

    hidden: () => {
        if (sibling instanceof RootSiblings) {
            sibling.destroy()
        }
    }
}

const styles = StyleSheet.create({
    maskStyle: {
        position: 'absolute',
        backgroundColor: 'rgba(33, 33, 33, 0.5)',
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:999999
    },
    backViewStyle: {
        backgroundColor: '#fff',
        width: 280,
        alignItems: 'center',
        borderRadius: 5,
    },
    seperatorLine: {
        height: 1,
        width: 280,
        backgroundColor: 'rgba(216,216,216,0.4)',
    },
    widthSeperatorLine: {
        width: 1,
        backgroundColor: 'rgba(216,216,216,0.4)',
    },
    titleLbl: {
        fontSize: 14,
        color: '#666'
    },
    subTitleLbl: {
        fontSize: 15,
        color: '#888888'
    },
    cancelBtn: {
        color: '#FD5208',
        fontSize: 18,
    },
    confirmBtn: {
        color: '#08B2FD',
        fontSize: 18,
    },
    touchView: {
        justifyContent: 'center',
        width: 140,
        height: 50,
        alignItems: 'center',
    },
})

export { AlertUtil }
```


使用：

```javascript 
 AlertUtil.show('弹框标题',
        <View><Text>{'可以自行设置话术'}</Text></View>,
        () => {
            AlertUtil.hidden()
                // 确定的操作
        },
        () => {
            AlertUtil.hidden()
            //取消的操作
    })
```
