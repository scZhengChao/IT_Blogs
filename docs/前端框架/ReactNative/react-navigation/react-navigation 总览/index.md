# react-navigation 总览

## 目录

- [导航资料](#导航资料)
- [安装使用](#安装使用)
  - [最新的安装 4.x 具体的可以见官网](#最新的安装-4x-具体的可以见官网)
  - [导航器类型](#导航器类型)
- [导航配置：](#导航配置)
  - [StackNavigatorConfig](#StackNavigatorConfig)
  - [routerConfig](#routerConfig)
  - [routerConfig](#routerConfig)
  - [static navigationOptions](#staticnavigationOptions)
  - [优先级](#优先级)
  - [详细配置概览](#详细配置概览)
    - [StackNavigator：](#StackNavigator)
    - [TabNavigator](#TabNavigator)
    - [DrawerNavigator](#DrawerNavigator)
- [导航架构](#导航架构)
- [API](#API)
  - [跳转](#跳转)
  - [1 navigate - 链接到其他screen](#1-navigate---链接到其他screen)
  - [2 goBack - 关闭当前screen并回退](#2-goBack---关闭当前screen并回退)
  - [4 isFocused - 查询screen的焦点状态](#4-isFocused---查询screen的焦点状态)
  - [5 state - screen当前的状态/路由](#5-state---screen当前的状态路由)
  - [6 setParams - 改变路由参数](#6-setParams---改变路由参数)
  - [7 getParam - 获取特定的参数值，参数未定义时有候选项](#7-getParam---获取特定的参数值参数未定义时有候选项)
  - [高级 API](#高级-API)
- [高阶组件](#高阶组件)
  - [withNavigation](#withNavigation)
- [生命周期](#生命周期)
  - [addListener ](#addListener-)
  - [监听](#监听)
  - [remove](#remove)

# **导航资料**

[https://www.jianshu.com/p/5c070a302192](https://www.jianshu.com/p/5c070a302192 "https://www.jianshu.com/p/5c070a302192")

  一篇好文；

[https://www.reactnavigation.org.cn/docs/stacknavigator](https://www.reactnavigation.org.cn/docs/stacknavigator "https://www.reactnavigation.org.cn/docs/stacknavigator")

   react-navigation 中文网

[https://www.cnblogs.com/qiyecao/p/8334507.html](https://www.cnblogs.com/qiyecao/p/8334507.html "https://www.cnblogs.com/qiyecao/p/8334507.html")

  react-navigation 使用详解  配置

[https://www.cnblogs.com/nangezi/p/10708282.html](https://www.cnblogs.com/nangezi/p/10708282.html "https://www.cnblogs.com/nangezi/p/10708282.html")

   跳转api 解释 

[https://blog.csdn.net/qwe435541908/article/details/105734710](https://blog.csdn.net/qwe435541908/article/details/105734710 "https://blog.csdn.net/qwe435541908/article/details/105734710")

  理解问题

[https://blog.csdn.net/weixin\_34148340/article/details/91365044?utm\_medium=distribute.pc\_relevant.none-task-blog-title-5\&spm=1001.2101.3001.4242](https://blog.csdn.net/weixin_34148340/article/details/91365044?utm_medium=distribute.pc_relevant.none-task-blog-title-5\&spm=1001.2101.3001.4242 "https://blog.csdn.net/weixin_34148340/article/details/91365044?utm_medium=distribute.pc_relevant.none-task-blog-title-5\&spm=1001.2101.3001.4242")

  封装方法

[React Native课程大纲-Day2【瑞客论坛 www.ruike1.com】.pdf](<./assets/file/React Native课程大纲-Day2【瑞客论坛 www.ruike1.com】_lGLbQ9g.pdf> "React Native课程大纲-Day2【瑞客论坛 www.ruike1.com】.pdf")

# ***安装使用***

1. React Navigation

社区今后主推的方案是一个单独的导航库react-navigation，它的使用十分简单。React Navigation 中的视图是原生组件，同时用到了运行在原生线程上的Animated动画库，因而性能表现十分流畅。此外其动画形式和手势都非常便于定制。

要想详细了解 React Navigation的具体用法，请访问其官方网站，网站右上角有中文翻译，但内容可能会有所滞后。

1. 源于React Native社区对基于Javascript的可扩展且使⽤用简单的导航解决⽅方案的需求

react-natvigation⾃自开源以来。在短短不不到3个⽉月的时间，github上星数已达4000+，⽬目前。Fb推荐使 ⽤用库，并且在React Native当前新版本0.44中将Navigator删除。react-navigation据称有原⽣生般的性 能体验效果。可能会成为未来React Native导航组件的主流军。

1. 其他导航器器：

NavigationIOS 只针对iOS平台开发，它是基于 UINavigationController封装的，所以看起来很像。

Navigator使⽤用JS来实现，将逐步被替代，⽬目前仍然可⽤用。

NavigationExperimental，⽬目前已经完全弃⽤用

有点过时；具体的见官网  

[https://reactnavigation.org/docs/getting-started](https://reactnavigation.org/docs/getting-started "https://reactnavigation.org/docs/getting-started")

在你的 React Native 项⽬目中安装react-navigation这个包（最好不要用npm 要报错，用yarn）

**yarn add react-navigation**

\# or with npm

npm install --save react-navigation

然后，安装 react-native-gesture-handler等库。 如果你正在使⽤用 Expo managed workﬂow,那么你什什 么都不不需要做, SDK 中已经包含了了这些.

## 最新的安装 4.x 具体的可以见官网

**yarn add react-navigation-stack react-navigation-tabs**

yarn add

    react-native-gesture-handler

    react-native-reanimated

    react-native-screens

    react-native-safe-area-context

    @react-native-community/masked-view

            导航器器也可以看成是⼀一个普通的React组件，你可以通过导航器器来定义你的APP中的导航结构。导航器器 还可以渲染通⽤用元素，例例如可以配置的标题栏和选项卡栏。

## 导航器类型

在react-navigation中有以下类型的导航器：

- &#x20;createStackNavigator:类似普通的Navigator，导航上⽅方导航栏
- &#x20;createTabNavigator:已弃⽤用，使⽤用createBottomTabNavigator、 createMaterialTopTabNavigator替代
- &#x20;createBottomTabNavigator:相当于IOS⾥里里⾯面的UITabBarController，屏幕下⽅方的标签栏
- &#x20;createMaterialTopTabNavigator:屏幕顶部的Material设计主题标签栏
- &#x20;createDrawerNavigator:抽屉效果，侧边滑出&#x20;
- createSwitchNavigator:SwitchNavigator的⽤用途是⼀一次只显示⼀一个⻚页⾯面，常⽤用于welcome⻚页⾯面或 者登陆⻚页⾯面，这种⻚页⾯面没有回退操作。

你可以通过以上⼏几种导航器器来创建你的APP，可以是其中⼀一个也可以多个组合，这个可以根据具体的应 ⽤用场景并结合每⼀一个导航器器的特性进⾏行行选择。

有点类似微信的入栈出栈；先进先出

# ***导航配置：***

## **StackNavigatorConfig**

**1. 创建导航时 配置；**

Home: {

      screen: HomeStackNavigator,

\*\* navigationOptions: {\*\* ​

\*\*        tabBarLabel: '职位',\*\* ​

\*\*      },\*\* ​

    },

## **routerConfig**

\*\*2.创建是路由时第二个参数 配置   \*\*​

const TabStackNavigator = createStackNavigator({

    BottomTabNavigator: {

        screen: TabNavigator,

        navigationOptions:{

            header :null   //这个地方要设置 null 否者会到这header 的title 有问题

        }

    },

    abc:{

        screen:Common,

        navigationOptions: {

            header: null,

        }

    }

},

**{**

\*\*    initialRouteName:'BottomTabNavigator',\*\* ​

**}**

)

## **routerConfig**

\*\*3.创建完成后配置 \*\*​

const CompanyStackNavigator = createStackNavigator(

    {

        Company:{

            screen:CompanyScreen

        },

        CompanyDetail: {

            screen: CompanyDetail

        },

    },

    {   

        initialRouteName:'Company',

        defaultNavigationOptions: {

            headerTitleStyle: {

              color: 'white',

            },

            headerTintColor: 'white',

            headerStyle: {

              backgroundColor: 'rgb(29,216,200)',

            },

            gesturesEnabled: true,

            gestureResponseDistance: 100,

        },

    }

)

**CompanyStackNavigator.navigationOptions**

**= ({ navigation }) => {**

\*\*    let tabBarVisible = true;\*\* ​

\*\*    if (navigation.state.index > 0) {\*\* ​

\*\*      tabBarVisible = false;\*\* ​

\*\*    }\*\* ​

\*\*    return {\*\* ​

\*\*      tabBarVisible,\*\* ​

\*\*    };\*\* ​

**};**

## **static navigationOptions**

**4.组件内配置；**

**页面中静态配置**

**static navigationOptions = ({navigation,navigationOptions,screenProps,theme})={**

\*\*    return \*\*​

{

        headerTitle: '公司详情',

        header: () => {

          \<View style={{width: 100, height: 100, backgroundColor: 'red'}} />;

        },

      };

**}**

## 优先级

\*\*注意：static 内 不能用this 指向； \*\*​

**解决办法；**

    onPress={()=>navigation.state.params.navigatePress()}

在组件componentDidMounted 后 ：重设

    this.props.navigation.setParams({navigatePress:this.clickFinishButton})

\* 我们也可以在RouteConfigs中配置 navigationOptions属性，我们也可以在单独页面配置navigationOptions

\* 在页面里面采用静态的方式配置 navigationOptions属性，会覆盖StackNavigator函数中RouteConfigs和StackNavigatorConfig对象中的navigationOptions属性里面的对应属性

\* navigationOptions中属性的优先级是

：

**页面中静态配置 > RouteConfigs > StackNavigatorConfig**

## 详细配置概览

### **StackNavigator：**

**（navigation,screenProps,theme,navigationOptions）**

\- navigationOptions：配置StackNavigator的一些属性。

\--    title：标题，如果设置了这个导航栏和标签栏的title就会变成一样的，不推荐使用

-     header：可以设置一些导航的属性，如果隐藏顶部导航栏只要将这个属性设置为null ，存在是undefined； 被废弃了 headerShown：true/false

-     headerTitle：设置导航栏标题，推荐

-     headerBackTitle：设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题。可以自定义，也可以设置为null（注意：是在前一个页面设置，下一个页面生效）

-     headerTruncatedBackTitle：设置当上个页面标题不符合返回箭头后的文字时，默认改成"返回"（注意：是在前一个页面设置，下一个页面生效）

-     headerRight：设置导航条右侧。可以是按钮或者其他视图控件

-     headerLeft：设置导航条左侧。可以是按钮或者其他视图控件

-     headerStyle：设置导航条的样式。背景色，宽高等

-     headerTitleStyle：设置导航栏文字样式

-     headerBackTitleStyle：设置导航栏‘返回’文字样式

-     headerBackImage: 设置导航左侧返回的那个 箭头 ；

-     headerTintColor：设置导航栏颜色 （左侧箭头） 颜色字符

-     headerPressColorAndroid：安卓独有的设置颜色纹理，需要安卓版本大于5.0-     gesturesEnabled：是否支持滑动返回手势，iOS默认支持，安卓默认关闭

\-- screen：对应界面名称，需要填入import之后的页面

\-- mode：定义跳转风格

\--    card：使用iOS和安卓默认的风格

\--    modal：iOS独有的使屏幕从底部画出。类似iOS的present效果

\-- headerMode：返回上级页面时动画效果

\--    float：iOS默认的效果

\--    screen：滑动过程中，整个页面都会返回

\--    none：无动画

\-- cardStyle：自定义设置跳转效果

\--    transitionConfig： 自定义设置滑动返回的配置

\--    onTransitionStart：当转换动画即将开始时被调用的功能

\--    onTransitionEnd：当转换动画完成，将被调用的功能

\-- path：路由中设置的路径的覆盖映射配置

\-- initialRouteName：设置默认的页面组件，必须是上面已注册的页面组件

\-- initialRouteParams：初始路由参数

注：大家可能对于path不太理解。

**path属性适用于其他app或浏览器使用url打开本app并进入指定页面。path属性用于声明一个界面路径，例如：【/pages/Home】。此时我们可以在手机浏览器中输入：app名称://pages/Home来启动该App，并进入Home界面。**

### **TabNavigator**

**TabNavigator的属性**

\- screen：和导航的功能是一样的，对应界面名称，可以在其他页面通过这个screen传值和跳转。

\--- navigationOptions：配置TabNavigator的一些属性

\-- title：标题，会同时设置导航条和标签栏的title

\-- tabBarVisible：是否隐藏标签栏。默认不隐藏(true)

\-- tabBarIcon：设置标签栏的图标。需要给每个都设置

\-- tabBarLabel：设置标签栏的title。推荐

\-

\- 导航栏配置

\-- tabBarPosition：设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom'）

\-- swipeEnabled：是否允许在标签之间进行滑动

\-- animationEnabled：是否在更改标签时显示动画

\-- lazy：是否根据需要懒惰呈现标签，而不是提前，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐为true-- trueinitialRouteName： 设置默认的页面组件

\-- backBehavior：按 back 键是否跳转到第一个Tab(首页)， none 为不跳转

\-- tabBarOptions：配置标签栏的一些属性iOS属性

\-- activeTintColor：label和icon的前景色 活跃状态下

\-- activeBackgroundColor：label和icon的背景色 活跃状态下

\-- inactiveTintColor：label和icon的前景色 不活跃状态下

\-- inactiveBackgroundColor：label和icon的背景色 不活跃状态下

\-- showLabel：是否显示label，默认开启 style：tabbar的样式

\-- labelStyle：label的样式安卓属性

\-- activeTintColor：label和icon的前景色 活跃状态下

\-- inactiveTintColor：label和icon的前景色 不活跃状态下

\-- showIcon：是否显示图标，默认关闭

\-- showLabel：是否显示label，默认开启 style：tabbar的样式

\-- labelStyle：label的样式 upperCaseLabel：是否使标签大写，默认为true-- pressColor：material涟漪效果的颜色（安卓版本需要大于5.0）

\-- pressOpacity：按压标签的透明度变化（安卓版本需要小于5.0）

\-- scrollEnabled：是否启用可滚动选项卡 tabStyle：tab的样式

\-- indicatorStyle：标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题

\-- labelStyle：label的样式

\-- iconStyle：图标样式

### **DrawerNavigator**

**DrawerNavigator属性**

\- DrawerNavigatorConfig--     drawerWidth - 抽屉的宽度

-     drawerPosition - 选项是左或右。 默认为左侧位置

-     contentComponent - 用于呈现抽屉内容的组件，例如导航项。 接收抽屉的导航。 默认为DrawerItems-     contentOptions - 配置抽屉内容

\--     initialRouteName - 初始路由的routeName

-     order - 定义抽屉项目顺序的routeNames数组。

-     路径 - 提供routeName到路径配置的映射，它覆盖routeConfigs中设置的路径。

-     backBehavior - 后退按钮是否会切换到初始路由？ 如果是，设置为initialRoute，否则为none。 默认为initialRoute行为

\--    DrawerItems的contentOptions属性

\--     activeTintColor - 活动标签的标签和图标颜色

-     activeBackgroundColor - 活动标签的背景颜色

-     inactiveTintColor - 非活动标签的标签和图标颜色

-     inactiveBackgroundColor - 非活动标签的背景颜色

-     内容部分的样式样式对象

-     labelStyle - 当您的标签是字符串时，要覆盖内容部分中的文本样式的样式对象

# 导航架构

创建架构

//Index  navigator

import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import {createBottomTabNavigator} from 'react-navigation-tabs';

import { createStackNavigator } from 'react-navigation-stack';

import HomeStackNavigator from './Home/index';

import CompanyStackNavigator from './Company';

import MessageStackNavigator from './Message';

import MyStackNavigator from './My';

import Common from './common/dialog'

import WelcomePage from './Welcome';

import Icon from 'react-native-vector-icons/FontAwesome'

const TabNavigator = createBottomTabNavigator(

  {

    Home: {

      screen: HomeStackNavigator,

      navigationOptions: {

        tabBarLabel: '职位',

      },

    },

    Company: {

      screen: CompanyStackNavigator,

      navigationOptions: {

        tabBarLabel: '公司',

      },

    },

    Message: {

      screen: MessageStackNavigator,

      navigationOptions: {

        tabBarLabel: '消息',

      },

    },

    My: {

      screen: MyStackNavigator,

      navigationOptions: {

        tabBarLabel: '我的',

      },

    },

  },

  {

    initialRouteName: 'Home',

    defaultNavigationOptions:({navigation})=>({

      // focused: boolean;

      // tintColor?: string;

      // horizontal?: boolean;

      tabBarIcon:({focused,tintColor,horizontal})=>{

        const  { routeName} = navigation.state

        let iconName ;

        if(routeName === 'Home'){

          iconName = 'globe'

        }else if(routeName === 'Company'){

          iconName = 'building-o'

        }else if(routeName === 'Message'){

          iconName = 'comments-o'

        }else if(routeName === 'My'){

          iconName = 'user-circle-o'

        }

        return \<Icon name={iconName} size={20} color={tintColor}>\</Icon>

      }

    }),

    tabBarOptions:{

      activeTintColor:'rgb(29,216,200)',

      inactiveTintColor:"gray"

    }

  },

);

const AppInitNavigator = createStackNavigator({

  welcome:{

    screen:WelcomePage,

    navigationOptions: {

      header: null,

    }

  }

})

const TabStackNavigator = createStackNavigator({

    BottomTabNavigator: {

        screen: TabNavigator,

        navigationOptions:{

            header :null   //这个地方要设置 null 否者会到这header 的title 有问题

        }

    },

    abc:{

        screen:Common,

        navigationOptions: {

            header: null,

        }

    }

},{

    initialRouteName:'BottomTabNavigator',

})

const switchNavigator = createSwitchNavigator({

  Init:AppInitNavigator,

  Main:TabStackNavigator

})

const AppNavigator = createAppContainer(switchNavigator);

export default AppNavigator;

**onNavigationStateChange使用**

**每当导航器管理的 navigation state 发生变化时，都会调用该函数。 它接收之前的 state、navigation 的新 state 以及发布状态更改的 action。 默认情况下，它将 state 的更改打印到控制台。**

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {

  render() {

    return \<AppContainer  onNavigationStateChange={(prevState, newState, action)=>{

      console.log(prevState);

    }} uriPrefix="/app"/>}

}

\*\*// bottomTabNavigator \*\*

import {createStackNavigator} from 'react-navigation-stack'

import  CompanyScreen from './CompanyScreen'

import CompanyDetail from './CompanyDetail';

const CompanyStackNavigator = createStackNavigator(

    {

        Company:{

            screen:CompanyScreen

        },

        CompanyDetail: {

            screen: CompanyDetail

        },

    },

    {  &#x20;

        initialRouteName:'Company',

        defaultNavigationOptions: {

            headerTitleStyle: {

              color: 'white',

            },

            headerTintColor: 'white',

            headerStyle: {

              backgroundColor: 'rgb(29,216,200)',

            },

            gesturesEnabled: true,

            gestureResponseDistance: 100,

        },

    }

)

CompanyStackNavigator.navigationOptions = ({ navigation }) => {

    let tabBarVisible = true;

    if (navigation.state.index > 0) {

      tabBarVisible = false;

    }

    return {

      tabBarVisible,

    };

};

export default CompanyStackNavigator;

# ***API***

## 跳转

你的app每一个screen组件中都自动具有了navigation属性：   

注意：

    1.最后一个进栈；pop回去；并不会保存当前栈；下次进来依然会执行生命周期

this.props.navigation

    navigate - 跳转到其他screen,

    goBack -&#x20;

**关闭当前screen并且回退栈**

（哪个页面调用goBack方法，关闭哪个页面）

    addListener - subscribe to updates to navigation lifecycle

    isFocused - 如果screen获取了焦点返回true，反之false.

    state - 当前的状态/路由

    setParams - 改变路由参数

    getParam - 获取指定参数

    dispatch - 向路由发送action

    要强调的是navigation属性并不是所有的组件里都有，只有screen组件才自动接收该属性（被screen属性声明过的组件），例如：如果你定义了一个MyBackButton组件，并且将其在一个screen组件中作为子组件渲染，那么就不会接收到navigation属性。

    当前导航器是stack navigator的时候，this.props.navigation中还有其他几个函数，部分功能与navigate 和 goBack重合，可以按照个人喜好选择使用，具体是：

this.props.navigation

    push - 导航到栈的新的路由

    pop - 回退

    popToTop - 回退到栈顶

    replace - 替换当前路由

通用 API

    绝大多数与navigation属性的交互都有navigate, goBack, state, 和setParams参与。

## ***1 navigate - 链接到其他screen***

调用方法：

    navigation.navigate({routeName, params, action, key})  或者navigation.navigate(routeName, params, action)

    routeName - 已经注册过的目标路由名称

    params - 参数

    action - (高级选项) 如果当前screen是一个导航器，表示运行在子路由器中的行为. 更多信息查看 Actions Doc.

    key - 可选的识别符，表示要导航到的路由. 如果已经存在，表示返回到这个路由。

class HomeScreen extends&#x20;

[React.Component](http://react.component/ "React.Component")

&#x20;{

    render() {

        const { navigate } = this.props.navigation;

        return (

            \<View>

                \<Text>This is the home screen of the app\</Text>

                \<Button

                    onPress={() => navigate('Profile', { name: 'Brent' })}

                    title="Go to Brent's profile"

                />

            \</View>

        );

    }

}

## ***2 goBack - 关闭当前screen并回退***

可以给定一个key，指定要从那个路由回退。默认会关闭调用的路由。如果想回退到任意界面，并且不指明要关闭什么，就调用.goBack(null);当StackNavigators嵌套使用，子navigator的栈中有且只有一项，父navigator中想要回退时，null参数很有用。如果你有点懵逼也不需要担心，api还需要完善。

class HomeScreen extends&#x20;

[React.Component](http://react.component/ "React.Component")

&#x20;{

    render() {

        const { goBack } = this.props.navigation;

        return (

            \<View>

                \<Button onPress={() => goBack()} title="Go back from this HomeScreen" />

                \<Button onPress={() => goBack(null)} title="Go back anywhere" />

                \<Button

                    onPress={() => goBack('screen-123')}

                    title="Go back from screen-123"

                />

            \</View>

        );

    }

}

用goBack从指定screen回退

假设有如下导航栈：

    navigation.navigate(SCREEN\_KEY\_A);

    navigation.navigate(SCREEN\_KEY\_B);

    navigation.navigate(SCREEN\_KEY\_C);

    navigation.navigate(SCREEN\_KEY\_D);

**你现在在screen D,向回退到A（将D，C，B弹出）,你需要提供一个key，表明从哪里回退：**

\*\*    navigation.goBack(SCREEN\_KEY\_B) // 将从B回退到A\*\*​

**因为A在栈顶，你也可以选择使用navigation.popToTop()； （先进入在栈顶）**

## ***4 isFocused - 查询screen的焦点状态***

如果screen获取焦点返回true，反之返回false

    let isFocused = this.props.navigation.isFocused();

如果向直接使用withNavigationFocus，将会向组件内传入布尔类型的isFocused属性。

## ***5 state - screen当前的状态/路由***

screen能通过this.props.navigation.state获取到路由，返回信息如下：

{

    // the name of the route config in the router

    routeName: 'profile',

    //a unique identifier used to sort routes

    key: 'main0',

    //an optional object of string options for this screen

    params: { hello: 'world' }

}

通过navigate和setParams传入screen中的参数通常这样来获取：

class ProfileScreen extends&#x20;

[React.Component](http://react.component/ "React.Component")

&#x20;{

    render() {

        return \<Text>Name: {this.props.navigation.state.params.name}\</Text>;

    }

}

## ***6 setParams - 改变路由参数***

**setParams允许screen改变路由参数，这在更新头部按钮和标题时很有用**

class ProfileScreen extends&#x20;

[React.Component](http://react.component/ "React.Component")

&#x20;{

    render() {

        return (

            \<Button

                onPress={() => this.props.navigation.setParams({ name: 'Lucy' })}

                title="Set title name to 'Lucy'"

            />

        );

    }

}

## ***7 getParam - 获取特定的参数值，参数未定义时有候选项***

**以前获取参数时你可能遇到过参数未定义这种可怕的情况，可以用getParams来代替**

以前是这样的：

    const { name } = this.props.navigation.state.params;

如果参数未定义这种方法就失败了。

现在是这样的：

    const name = this.props.navigation.getParam('name', 'Peter');

**如果name或者param未定义，Peter就是备选项**

***Stack Actions***

以下这些actions在任何stack navigator中都可以使用：

1 Push

    与navigate相似，push方法会跳转到栈中的新路由

    navigation.push(routeName, params, action)

    routeName - 已经注册过的目标路由名称

    params - 参数

    action - (高级选项) 子路由中的行为.

2 Pop

    跳转到栈中上一个screen。如果才一个数字参数“n”，指明要回退多少个screen

    navigation.pop(n)

3 PopToTop

    回退到栈顶，并关闭其他所有screen

    navigation.popToTop()

4 Replace

    用给定的路由替换当前screen，可以带参数和子action

    navigation.replace(routeName, params, action)

## ***高级 API***

dispatch函数并不常用，但是如果navigate和boBack无法满足需求时也是很好的选择

dispatch - 向路由器发送action

使用dispatch向路由器发送任意navigation action。The other navigation functions use dispatch behind the scenes.

如果要dispatch一个action，记得使用库中提供的action生成器。更多信息查看Navigation Action Docs

import { NavigationActions } from 'react-navigation';

const navigateAction = NavigationActions.navigate({

    routeName: 'Profile',

    params: {},

    // navigate can have a nested navigate action that will be run inside the child router

    action: NavigationActions.navigate({ routeName: 'SubProfileRoute' }),

});

this.props.navigation.dispatch(navigateAction);

# 高阶组件

## withNavigation

[withNavigation](https://github.com/react-navigation/react-navigation/blob/master/src/views/withNavigation.js "withNavigation")

 是一个高阶组件，它将 navigation 属性传递给一个包装了的组件。 当你无法将 navigation 属性直接传递给组件时，或者在深度嵌套的子组件中不想传递它时，这个组件将很有用。

import { Button } 'react-native';

import { withNavigation } from 'react-navigation';

const MyComponent = ({ to, navigation }) => (

    \<Button title={\`navigate to \${to}\`} onPress={() => navigation.navigate(to)} />

);

const MyComponentWithNavigation = withNavigation(MyComponent);

// or use decorators:

@withNavigation

export default class MainScreen extends Component {

  ...

}

# 生命周期

## \*\*\*addListener \*\*\*

\*\* \*- Subscribe to updates to navigation lifecycle   \*\*\*​

***（这个钩子特别不靠谱）***

React Navigation向订阅过的screen组件发送事件：

- willBlur - screen 将要失去焦点
- willFocus - screen 将要获取焦点
- didFocus - screen 获取了焦点(if there was a transition, the transition completed)
- didBlur - screen 失去了焦点(if there was a transition, the transition completed)

\*\*    返回太快不会执行的 坑（用于监听 物理键的返回；生命周期）\*\* ​

## 监听

    this.viewDidAppear = this.props.navigation.addListener( 

        'didFocus',

        (obj)=>{

            console.log('页面已经显示')

        }

    )

    this.viewDidAppear1 = this.props.navigation.addListener(

        'willFocus',

        (obj)=>{

            console.log('页面将要显示')

        }

    )

    this.viewDidAppear2 = this.props.navigation.addListener(

        'willBlur',

        (obj)=>{

            console.log('页面将要移除')

        }

    )

    this.viewDidAppear3 = this.props.navigation.addListener(

        'didBlur',

        (obj)=>{

            console.log('页面已经移除')

        }

    )

**或者**

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

didBlur只会在当前页面没有调用componentWillUnmount函数,然后离开当前页面才执行,也意味着,这个页面没有死但是去了另外一个页面才会调用,如果自己页面死了,就不会调用到这里.

例如

const didBlurSubscription = this.props.navigation.addListener( 'didBlur',

    payload => {

        console.debug('didBlur', payload);

    }

);

## **remove**

// Remove the listener when you are done

\*\* didBlurSubscription.remove();\*\* ​

jsonPayload：

{

    action: { type: 'Navigation/COMPLETE\_TRANSITION', key: 'StackRouterRoot' },

    context: 'id-1518521010538-2:Navigation/COMPLETE\_TRANSITION\_Root',

    lastState: undefined,

    state: undefined,

    type: 'didBlur',

};
