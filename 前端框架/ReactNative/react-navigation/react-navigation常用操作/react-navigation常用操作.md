# react-navigation常用操作

## 目录

- [1.动态隐藏header](#1动态隐藏header)
- [2.导航栏的高度](#2导航栏的高度)
- [3.Navigation 生命周期](#3Navigation-生命周期)
- [4.自定义tabBarLabel](#4自定义tabBarLabel)
- [5.bottomBar 跳转 stackRoute](#5bottomBar-跳转-stackRoute)
- [快速点击多次跳转](#快速点击多次跳转)

# 1.动态隐藏header

隐藏和显示header的原理是： &#x20;

- 当header为undefined时，header显示，当header为null时，header隐藏。 &#x20;
- 通过navigation.setParams可以动态设置navigation.state.params的值。

**state.params.header 来控制header的显隐**

```javascript 
 static navigationOptions =（{navigation,navigationOptions,screenProps,theme
}=>{
  return {
    header:navigation.getParam('header')
  }   
}

this.props.navigation.setParam({header:null/undefined})
```


# 2.导航栏的高度

提取IphoneX判断方法：

import {

    Dimensions,

    Platform,

    NativeModules,

    DeviceInfo

} from 'react-native';

const X\_WIDTH = 375;

const X\_HEIGHT = 812;

const { height: D\_HEIGHT, width: D\_WIDTH } = Dimensions.get('window');

const { PlatformConstants = {} } = NativeModules;

const { minor = 0 } = PlatformConstants.reactNativeVersion || {};

module.exports = {

    isIphoneX: function(){

        if (Platform.OS === 'web') return false;

        if (minor >= 50) {

            return DeviceInfo.isIPhoneX\_deprecated;

        }

        return (

            Platform.OS === 'ios' &&

            ((D\_HEIGHT === X\_HEIGHT && D\_WIDTH === X\_WIDTH) ||

                (D\_HEIGHT === X\_WIDTH && D\_WIDTH === X\_HEIGHT))

        );

    }

};

**其他 可详细见statusBar的用法**

[React-Navigation控件BottomTabBar高度问题\_he\_wen\_jian的博客-CSDN博客\_@react-navigation/bottom-tabs 前段时间学习了React-Native，经过几本书的洗礼后正式开启运行模式，进入实战中。项目中有一个项目需求就是，虚拟键盘固定在BottomTabBar上方。这个需求第一感觉就是简单呀，思路瞬间就出来了：先来个绝对定位，然后再做个偏移就OK了，于是就....1：position:'absolute',2：Top:height-XX,然后问题就来了，这个XX的值应该是多少呢，... https://blog.csdn.net/he\_wen\_jian/article/details/84391654](https://blog.csdn.net/he_wen_jian/article/details/84391654 "React-Navigation控件BottomTabBar高度问题_he_wen_jian的博客-CSDN博客_@react-navigation/bottom-tabs 前段时间学习了React-Native，经过几本书的洗礼后正式开启运行模式，进入实战中。项目中有一个项目需求就是，虚拟键盘固定在BottomTabBar上方。这个需求第一感觉就是简单呀，思路瞬间就出来了：先来个绝对定位，然后再做个偏移就OK了，于是就....1：position:'absolute',2：Top:height-XX,然后问题就来了，这个XX的值应该是多少呢，... https://blog.csdn.net/he_wen_jian/article/details/84391654")

[https://blog.csdn.net/qq\_31915745/article/details/91345682](https://blog.csdn.net/qq_31915745/article/details/91345682 "https://blog.csdn.net/qq_31915745/article/details/91345682")

# 3.**Navigation 生命周期**

    假设⼀一个 Stack Navigator 有两个⻚页⾯面 A 和 B. 在导航到 A 之后, A ⻚页⾯面的 componentDidMount ⽣生命周

期⽅方法将会被调⽤用. 当导航到 B ⻚页⾯面时, B ⻚页⾯面的 componentDidMount ⽅方法也会被调⽤用,

\*\* 但是在堆栈中,\*\* ​

**A ⻚页⾯面仍然是被加载的, 并且它的 componentWillUnmount ⽣生命周期⽅方法不不会被调⽤用.**

**当从 B ⻚页⾯面返回到 A ⻚页⾯面, B ⻚页⾯面的 componentWillUnmount ⽅方法将会被调⽤用, 但是 A ⻚面的componentDidMount ⽅方法不不会被调⽤用**

, 因为 A ⻚页⾯面⼀一直都是被加载的.

当我们从 Home ⻚⾯离开时， ⻚⾯发生了了什么？我们返回是⼜发⽣了什么？ 路由是如何发现⽤户将要

离开或将要回来的

React Navigation 将事件发送到订阅了了它们的⻚页⾯面组件： 有4个不不同的事件可供订

阅： willFocus 、 willBlur 、 didFocus 和 didBlur 。（不准）

- willFocus -⻚页⾯面将获取焦点
- didFocus - ⻚页⾯面已获取到焦点（如果有过渡动画，等过渡动画执⾏行行完成后响应）
- willBlur - ⻚页⾯面将失去焦点
- didFocus - ⻚页⾯面已获取到焦点（如果有过渡动画，等过渡动画执⾏行行完成后响应）

另外还有NavigationEvents API可以达到同样监听⽣生命周期的效果。

import React from 'react';

import { View } from 'react-native';

import { NavigationEvents } from 'react-navigation';

const MyScreen = () => (

    \<View>

        \<NavigationEvents

            onWillFocus={payload => console.log('will focus', payload)}

            onDidFocus={payload => console.log('did focus', payload)}

            onWillBlur={payload => console.log('will blur', payload)}

            onDidBlur={payload => console.log('did blur', payload)}

        />

        {/\*

            Your view code

         \*/}

    \</View>

);

export default MyScreen;

# 4.自定义tabBarLabel

```javascript 
 let  labelText = (view)=>({focused,tintColor})=>{
    let style = view.key==='scanPage'?{display:'none'}:null
    return <View style={[{flexDirection:'row',justifyContent:'center'},style]}>
                <Text style={{fontSize:10,color:tintColor}}>{view.title}</Text>
            </View>
}
```


# 5.bottomBar 跳转 stackRoute

```javascript 
 tabBarOnPress: ({defaultHandler,navigation}) => {
            const selectedPageIndex = tabPageItems.indexOf(view.key)
            const selectedPage = tabPageItems[selectedPageIndex]
            DeviceEventEmitter.emit('onSelectedTab', {
                selected: selectedPageIndex,
                newPage: selectedPage,
                oldPage: lastSelectedTab,
            })
            lastSelectedTab = selectedPage
            defaultHandler()
            // if(navigation.state.key !== 'scanPage'){
                
            // }else{
            //     navigation.navigate('QRCodeWebLoginPage')  
            // }
}
```


或者用这种配合试一下：

backBehavior:   initialRoute / order / history /  none

tabBarVisible:true/false

# 快速点击多次跳转

当我们快速点击跳转时，会开启多个重复的界面，如何解决呢。其实在官方Git中也有提示，解决这个问题需要修改react-navigation源码：  找到scr文件夹中的addNavigationHelpers.js文件,替换为如下文本即可：

&#x20;export default function\<S: \*>(navigation: NavigationProp\<S, NavigationAction>) { &#x20;

  // 添加点击判断 &#x20;

  let debounce = true; &#x20;

  return { &#x20;

      ...navigation, &#x20;

      goBack: (key?: ?string): boolean => &#x20;

          navigation.dispatch( &#x20;

              NavigationActions.back({ &#x20;

                  key: key === undefined ? navigation.state.key : key, &#x20;

              }), &#x20;

          ), &#x20;

      navigate: (routeName: string, &#x20;

                 params?: NavigationParams, &#x20;

                 action?: NavigationAction,): boolean => { &#x20;

          if (debounce) { &#x20;

              debounce = false; &#x20;

              navigation.dispatch( &#x20;

                  NavigationActions.navigate({ &#x20;

                      routeName, &#x20;

                      params, &#x20;

                      action, &#x20;

                  }), &#x20;

              ); &#x20;

              setTimeout( &#x20;

                  () => { &#x20;

                      debounce = true; &#x20;

                  }, &#x20;

              500, &#x20;

              ); &#x20;

              return true; &#x20;

          } &#x20;

          return false; &#x20;

      }, &#x20;

    /\*\*&#x20;

     \* For updating current route params. For example the nav bar title and&#x20;

     \* buttons are based on the route params.&#x20;

     \* This means \`setParams\` can be used to update nav bar for example.&#x20;

     \*/ &#x20;

    setParams: (params: NavigationParams): boolean => &#x20;

      navigation.dispatch( &#x20;

        NavigationActions.setParams({ &#x20;

          params, &#x20;

          key: navigation.state.key, &#x20;

        }), &#x20;

      ), &#x20;

  }

}
