# createStackNavigator

## 目录

- [1.创建架构](#1创建架构)
- [2.onNavigationStateChange](#2onNavigationStateChange)
- [3.API](#3API)
  - [1 navigate - 链接到其他screen](#1-navigate---链接到其他screen)
  - [2 goBack - 关闭当前screen并回退](#2-goBack---关闭当前screen并回退)
  - [3 addListener 生命周期   （这个钩子特别不靠谱）](#3-addListener-生命周期-这个钩子特别不靠谱)
  - [4 isFocused - 查询screen的焦点状态](#4-isFocused---查询screen的焦点状态)
  - [5 state - screen当前的状态/路由](#5-state---screen当前的状态路由)
  - [6 setParams - 改变路由参数](#6-setParams---改变路由参数)
  - [7 getParam - 获取特定的参数值，参数未定义时有候选项](#7-getParam---获取特定的参数值参数未定义时有候选项)
  - [Stack Actions](#Stack-Actions)
    - [1 Push  ](#1-Push-)
    - [2 Pop](#2-Pop)
    - [3 PopToTop](#3-PopToTop)
    - [4 Replace](#4-Replace)
    - [5.reset：](#5reset)
    - [6.dismiss：](#6dismiss)
  - [高级 API](#高级-API)
- [3.属性配置props](#3属性配置props)
  - [1. 创建导航时 配置；StackNavigatorConfig](#1创建导航时配置StackNavigatorConfig)
  - [2.创建是路由时第二个参数 配置   routerConfig](#2创建是路由时第二个参数配置-routerConfig)
  - [3.创建完成后配置 routerConfig](#3创建完成后配置routerConfig)
  - [4.组件内配置；页面中静态配置  static navigationOptions](#4组件内配置页面中静态配置staticnavigationOptions)
  - [props：](#props)
- [4.实战技巧](#4实战技巧)
  - [一：createStackNavigator-普通导航](#一createStackNavigator-普通导航)
    - [createStackNavigator API](#createStackNavigator-API)
    - [RouteConfigs](#RouteConfigs)
    - [StackNavigatorConfig](#StackNavigatorConfig)
    - [用于路路由配置的参数：](#用于路路由配置的参数)
    - [用于导航样式配置的参数](#用于导航样式配置的参数)
    - [navigationOptions（屏幕导航选项）](#navigationOptions屏幕导航选项)
- [二：切换路由动画](#二切换路由动画)

# ***1.创建架构***

```javascript 
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

        return <Icon name={iconName} size={20} color={tintColor}></Icon>
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
```


# **2.onNavigationStateChange**

```javascript 
 每当导航器管理的 navigation state 发生变化时，都会调用该函数。 它接收之前的 state、navigation 的新 state 以及发布状态更改的 action。 默认情况下，它将 state 的更改打印到控制台。
const AppContainer = createAppContainer(RootStack);
export default class App extends React.Component {
  render() {
    return <AppContainer  onNavigationStateChange={(prevState, newState, action)=>{
      console.log(prevState);
    }} uriPrefix="/app"/>}
}
```


# ***3.API***

你的app每一个screen组件中都自动具有了navigation属性：   

注意：

    1.最后一个进栈；pop回去；并不会保存当前栈；下次进来依然会执行生命周期

this.props.navigation

-     navigate - 跳转到其他screen,
-     goBack - **关闭当前screen并且回退栈**（哪个页面调用goBack方法，关闭哪个页面）
-     addListener - subscribe to updates to navigation lifecycle
-     isFocused - 如果screen获取了焦点返回true，反之false.
-     state - 当前的状态/路由
-     setParams - 改变路由参数
-     getParam - 获取指定参数
-     dispatch - 向路由发送action

\*\* 要强调的是navigation属性并不是所有的组件里都有，只有screen组件才自动接收该属性（被screen属性声明过的组件），例如：如果你定义了一个MyBackButton组件，并且将其在一个screen组件中作为子组件渲染，那么就不会接收到navigation属性。\*\* ​

**当前导航器是stack navigator的时候**

，this.props.navigation中还有其他几个函数，部分功能与navigate 和 goBack重合，可以按照个人喜好选择使用，具体是：

this.props.navigation

-     push - 导航到栈的新的路由
-     pop - 回退
-     popToTop - 回退到栈顶
-     replace - 替换当前路由

通用 API

-     绝大多数与navigation属性的交互都有navigate, goBack, state, 和setParams参与。

## ***1 navigate - 链接到其他screen***

调用方法：

    navigation.navigate({routeName, params, action, key})  或者navigation.navigate(routeName, params, action)

-     routeName - 已经注册过的目标路由名称
-     params - 参数
-     action - (高级选项) 如果当前screen是一个导航器，表示运行在子路由器中的行为. 更多信息查看 Actions Doc.
-     key - 可选的识别符，表示要导航到的路由. 如果已经存在，表示返回到这个路由。

```javascript 
 class HomeScreen extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>This is the home screen of the app</Text>
                <Button
                    onPress={() => navigate('Profile', { name: 'Brent' })}
                    title="Go to Brent's profile"
                />
            </View>
        );
    }
}
```


## ***2 goBack - 关闭当前screen并回退***

可以给定一个key，指定要从那个路由回退。默认会关闭调用的路由。如果想回退到任意界面，并且不指明要关闭什么，就调用.goBack(null);当StackNavigators嵌套使用，子navigator的栈中有且只有一项，父navigator中想要回退时，null参数很有用。如果你有点懵逼也不需要担心，api还需要完善。

```javascript 
 class HomeScreen extends React.Component {
    render() {
        const { goBack } = this.props.navigation;
        return (
            <View>
                <Button onPress={() => goBack()} title="Go back from this HomeScreen" />
                <Button onPress={() => goBack(null)} title="Go back anywhere" />
                <Button
                    onPress={() => goBack('screen-123')}
                    title="Go back from screen-123"
                />
            </View>
        );
    }
}
```


用goBack从指定screen回退

假设有如下导航栈：

    navigation.navigate(SCREEN\_KEY\_A);

    navigation.navigate(SCREEN\_KEY\_B);

    navigation.navigate(SCREEN\_KEY\_C);

    navigation.navigate(SCREEN\_KEY\_D);

**你现在在screen D,向回退到A（将D，C，B弹出）,你需要提供一个key，表明从哪里回退：**

\*\*    navigation.goBack(SCREEN\_KEY\_B) // 将从B回退到A\*\*​

**因为A在栈顶，你也可以选择使用navigation.popToTop()； （先进入在栈顶）**

## ***3 addListener 生命周期   （这个钩子特别不靠谱）***

React Navigation向订阅过的screen组件发送事件：

-     willBlur - screen 将要失去焦点
-     willFocus - screen 将要获取焦点
-     didFocus - screen 获取了焦点(if there was a transition, the transition completed)
-     didBlur - screen 失去了焦点(if there was a transition, the transition completed)

    // 返回太快不会执行的 坑（用于监听 物理键的返回；生命周期）

```javascript 
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
```


**didBlur只会在当前页面没有调用componentWillUnmount函数,然后离开当前页面才执行**

,也意味着,这个页面没有死但是去了另外一个页面才会调用,如果自己页面死了,就不会调用到这里.

```javascript 
 例如
const didBlurSubscription = this.props.navigation.addListener(
    'didBlur',
    payload => {
        console.debug('didBlur', payload);
    }
);
// Remove the listener when you are done
    didBlurSubscription.remove();

jsonPayload：
{
    action: { type: 'Navigation/COMPLETE_TRANSITION', key: 'StackRouterRoot' },
    context: 'id-1518521010538-2:Navigation/COMPLETE_TRANSITION_Root',
    lastState: undefined,
    state: undefined,
    type: 'didBlur',
};
```


## ***4 isFocused - 查询screen的焦点状态***

如果screen获取焦点返回true，反之返回false

```javascript 
     let isFocused = this.props.navigation.isFocused();
```


如果向直接使用withNavigationFocus，将会向组件内传入布尔类型的isFocused属性。

## ***5 state - screen当前的状态/路由***

```javascript 
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

class ProfileScreen extends React.Component {
    render() {
        return <Text>Name: {this.props.navigation.state.params.name}</Text>;
    }
}
```


## ***6 setParams - 改变路由参数***

**setParams允许screen改变路由参数，这在更新头部按钮和标题时很有用**

```javascript 
 class ProfileScreen extends React.Component {
    render() {
        return (
            <Button
                onPress={() => this.props.navigation.setParams({ name: 'Lucy' })}
                title="Set title name to 'Lucy'"
            />
        );
    }
}
```


## ***7 getParam - 获取特定的参数值，参数未定义时有候选项***

**以前获取参数时你可能遇到过参数未定义这种可怕的情况，可以用getParams来代替**

以前是这样的：

```javascript 
    const { name } = this.props.navigation.state.params;
   const name = this.props.navigation.getParam('name', 'Peter');
```


如果参数未定义这种方法就失败了。

现在是这样的：

**如果name或者param未定义，Peter就是备选项**

## ***Stack Actions***

**当且仅当当前navigator是stackNavigator时**

**， this.props.navigation上有⼀一些附加功能**

。这些

**函数是**

**navigate和goBack的替代⽅方法**

，你可以使⽤用任何你喜欢的方法。这些功能是

### 1 Push &#x20;

**push 是生成新的 页面 不管 栈里已经存在的页面 navigate 会返回到栈里有的页面**

    navigation.push(routeName, params, action)

    routeName - 已经注册过的目标路由名称

    params - 参数

    action - (高级选项) 子路由中的行为.

### 2 Pop

\*\*   跳转到栈中上一个screen。如果才一个数字参数“n”，指明要回退多少个screen\*\*​

    navigation.pop(n)

### 3 PopToTop

**回退到栈顶，并关闭其他所有screen**

    navigation.popToTop()

### 4 Replace

\*\*  用给定的路由替换当前screen，可以带参数和子action\*\*​

    navigation.replace(routeName, params, action)

### 5.reset：

**擦除导航器器状态并将其替换为多个操作的结果**

### 6.dismiss：

**关闭当前栈**

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

# 3.属性配置props

## **1. 创建导航时 配置；** ​**StackNavigatorConfig**

```javascript 
 // 静态配置
Home: {      
    screen: HomeStackNavigator,      
    navigationOptions: {        
        tabBarLabel: '职位',      
    },   
},
 // 动态配置
 //从上述代码中可以看出Page3的navigationOptions依赖于props这个变量量所以是动态的，当props中的内容发⽣生变化时， navigationOptions也会跟着变化；

Page3: {
    screen: Page3,
    navigationOptions: (props) => {//在这⾥里里定义每个⻚页⾯面的导航属性，动态配置
        const {navigation} = props;
        const {state, setParams} = navigation;
        const {params} = state;
        return {
            title: params.title ? params.title : 'This is Page3',
            headerRight: (
                <Button
                    title={params.mode === 'edit' ? '保存' : '编辑'}
                    onPress={() =>
                        setParams({mode: params.mode === 'edit' ? '' :'edit'})}
                />
            ),
        }
    }
},
```


## **2.创建是路由时第二个参数 配置   routerConfig**

```javascript 
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
```


## \*\*3.创建完成后配置 \*\*​**routerConfig**

```javascript 
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

CompanyStackNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
    return {
      tabBarVisible,
    };
};
```


## **4.组件内配置；** ​**页面中静态配置** \*\* \*\***static navigationOptions**

```javascript 
 static navigationOptions = ({navigation,navigationOptions,screenProps,theme})={
    return {
        headerTitle: '公司详情',
        header: () => {
          <View style={{width: 100, height: 100, backgroundColor: 'red'}} />;
        },
      };
}
```


\*\*注意：static 内 不能用this 指向； \*\*​

**解决办法；**

-     onPress={()=>navigation.state.params.navigatePress()}

在组件componentDidMounted 后 ：重设

  this.props.navigation.setParams({navigatePress:this.clickFinishButton})

- 我们也可以在RouteConfigs中配置 navigationOptions属性，我们也可以在单独页面配置navigationOptions

\* 在页面里面采用静态的方式配置 navigationOptions属性，会覆盖StackNavigator函数中RouteConfigs和StackNavigatorConfig对象中的navigationOptions属性里面的对应属性

\* navigationOptions中属性的优先级是

：

**页面中静态配置 > RouteConfigs > StackNavigatorConfig**

## **props：**

**（navigation,screenProps,theme,navigationOptions）**

\- navigationOptions：配置StackNavigator的一些属性。

\--    title：标题，如果设置了这个导航栏和标签栏的title就会变成一样的，不推荐使用

-     header：可以设置一些导航的属性，如果隐藏顶部导航栏只要将这个属性设置为null

-      headerShown：true/false ---最新的 摒弃了 header

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

-     headerPressColorAndroid：安卓独有的设置颜色纹理，需要安卓版本大于5.0

-     gesturesEnabled：是否支持滑动返回手势，iOS默认支持，安卓默认关闭

**headerBackTitleVisible：左边返回键的文字title；null/false 就是不可见**

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

# 4.实战技巧

## **一：createStackNavigator-普通导航**

    createStackNavigato

**r 提供APP屏幕之间切换的能⼒力力，它是以栈的形式还管理理屏幕之间的切换，新切换到的屏幕会放在栈的顶部。**

    stack navigator 被配置为具有熟悉的iOS和Android外观 & 感觉：新屏幕从iOS右侧滑⼊入，从Android底部淡⼊入。 在iOS上， stack navigator 也可以配置为屏幕从底部滑⼊入的模式样式。

### **createStackNavigator API**

createStackNavigator(

**RouteConfigs**

,&#x20;

**StackNavigatorConfig**

):

**RouteConfigs**

&#x20;(必选)：路路由配置对象是从路路由名称到路路由配置的映射，告诉导航器器该路路由呈现什什么。

**StackNavigatorConfig**

&#x20;(可选)：配置导航器器的路路由(如：默认⾸首屏， navigationOptions， paths等)样式(如，转场模式mode、头部模式等)。

### **RouteConfigs**

RouteConfigs⽀支持三个参数&#x20;

\*\*screen \*\*

、&#x20;

\*\*path \*\*

以及&#x20;

\*\*navigationOptions \*\*

；

    screen (必选)：指定⼀一个 React 组件作为屏幕的主要显示内容，当这个组件被createStackNavigator加载时，它会被分配⼀一个 navigation prop。

    path (可选)：⽤用来设置⽀支持schema跳转时使⽤用，具体使⽤用会在下⽂文的有关 Schema 章节中讲到；

    navigationOptions (可选)：⽤用以配置全局的屏幕导航选项如： title、 headerRight、 headerLeft等

### **StackNavigatorConfig**

从 react-navigation 源码中可以看出StackNavigatorConfig⽀支持配置的参数有10个。

function createStackNavigator(routeConfigMap, stackConfig = {}) {

const {

    initialRouteKey,

    initialRouteName,

    initialRouteParams,

    paths,

    defaultNavigationOptions,

    disableKeyboardHandling,

    getCustomActionCreators

} = stackConfig;

...

这7个参数可以根据作⽤用不不同分

**为路路由配置**

、

**视图样式配置**

两类，⾸首先看⽤用于

**路路由配置**

的参数：

### **用于路路由配置的参数：**

    initialRouteName: 设置默认的⻚页⾯面组件，必须是上⾯面已注册的⻚页⾯面组件。

    initialRouteParams: 初始路路由的参数。

    initialRouteKey - 初始路路由的可选标识符。

    defaultNavigationOptions: 屏幕导航的默认选项，下⽂文会详细讲解。

**navigationOptions**

: 导航器器本身的导航选项，⽤用于配置⽗父导航器器

    paths: ⽤用来设置⽀支持schema跳转时使⽤用，具体使⽤用会在下⽂文的有关 Schema 章节中讲到。

    disableKeyboardHandling: 如果为true，则导航到新屏幕时键盘不不会⾃自动关闭。 默认值：false。

### **用于导航样式配置的参数**

\*\*    mode\*\*​

: ⻚页⾯面切换模式: 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)

        card: 普通app常⽤用的左右切换。

        modal: 上下切换。

\*\*    headerMode\*\*​

: 导航栏的显示模式: screen: 有渐变透明效果, float: ⽆无透明效果, none: 隐藏导航栏。

        float: ⽆无透明效果, 默认。

        screen: 有渐变透明效果, 如微信QQ的⼀一样。

        none: 隐藏导航栏。

\*\*    headerBackTitleVisible\*\*​

&#x20;: 提供合理理的默认值以确定后退按钮标题是否可⻅见，但如果要覆盖它，则可以使⽤用true或\` false 在此选项中。

        fade-in-place: 标题组件交叉淡⼊入淡出⽽而不不移动，类似于iOS的Twitter， Instagram和Facebook应⽤用程序。 这是默认值。

        uikit: iOS的默认⾏行行为的近似值。 headerTransitionPreset: 指定在启⽤用headerMode： float时header应如何从⼀一个屏幕转换到另⼀一个屏幕

\*\*    cardStyle\*\*​

: 样式（iOS上⻚页⾯面切换会有⽩白⾊色渐变蒙层，想去掉则可以这样设置， cardStyle: {

        opacity: null },切换⻚页⾯面时的⻚页⾯面边框也在这⾥里里可以设置）。

\*\*    onTransitionStart\*\*​

: ⻚页⾯面切换开始时的回调函数 (我们可以在这⾥里里注册⼀一些通知，告知我们切⾯面切换的状态，⽅方便便后⾯面处理理⻚页⾯面切换事件)。

\*\*    onTransitionEnd\*\*​

: ⻚页⾯面切换结束时的回调函数

### **navigationOptions（屏幕导航选项）**

支持⼀一下参数：

    title: 可以作为headerTitle的备选字段(当没设置headerTitle时会⽤用该字段作为标题)，也可以作为

    TabNavigator的tabBarLabel以及DrawerNavigator的drawerLabel。

    header: ⾃自定义导航条，可以通过设置null来隐藏导航条；

    headerTitle: 标题；

    headerTitleAllowFontScaling: 标题是否允许缩放，默认true；

    headerBackTitle: 定义在iOS上当前⻚页⾯面进⼊入到下⼀一⻚页⾯面的回退标题，可以通过设置null来禁⽤用它；

    headerTruncatedBackTitle: 当回退标题不不能显示的时候显示此属性的标题，⽐比如回退标题太⻓长了了；

    headerBackImage： React 元素或组件在标题的后退按钮中显示⾃自定义图⽚片。 当组件被调⽤用时，它会在渲染时收到许多 props 如：（tintColor， title）。 默认为带有 reactnavigation/views/assets/back-icon.png 这张图⽚片的组件，后者是平台的默认后图标图像（iOS上为向左的符号， Android上为箭头）。

    headerRight: 定义导航栏右边视图；

    headerLeft: 定义导航栏左边视图；

    headerStyle: 定义导航栏的样式，⽐比如背景⾊色等；

    headerTitleStyle: 定义标题的样式；

    headerLeftContainerStyle：⾃自定义 headerLeft 组件容器器的样式，例例如，增加 padding。

    headerRightContainerStyle：⾃自定义 headerRight 组件容器器的样式,，例例如，增加 padding。

    headerTitleContainerStyle：⾃自定义 headerTitle 组件容器器的样式, 例例如，增加 padding。

    headerBackTitleStyle: 定义返回标题的样式；

    headerPressColorAndroid：颜⾊色为材料料波纹 (Android >= 5.0)；

    headerTintColor: 定义导航条的tintColor，会覆盖headerTitleStyle中的颜⾊色；

    headerTransparent：默认为 false。如果 true, 则标头将不不会有背景, 除⾮非您显式提供

    headerStyle 或 headerBackground。

    headerBackground：与headerTransparent⼀一起使⽤用，以提供在标题后台呈现的组件。 例例如，您可以使⽤用模糊视图来创建半透明标题。

    gesturesEnabled: 定义是否能侧滑返回， iOS默认true， Android默认false；

    gestureResponseDistance: 定义滑动返回的有效距离，⽔水平状态下默认： 25，垂直状态默认135；

    gestureDirection: 设置关闭⼿手势的⽅方向。默认从左向右，可以设置从右到左的滑动操作。

# 二：切换路由动画

TransitionPresets.SlideFromRightIos
