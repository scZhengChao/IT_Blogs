# createBottomTabNavigator

## 目录

- [参考文档](#参考文档)
- [createBottomTabNavigator-底部导航（几个互不干扰的栈）](#createBottomTabNavigator-底部导航几个互不干扰的栈)
- [RouteConfigs](#RouteConfigs)
- [BottomTabNavigatorConfig](#BottomTabNavigatorConfig)
  - [tabBarOptions（tab配置）](#tabBarOptionstab配置)
  - [navigationOptions（屏幕导航选项）](#navigationOptions屏幕导航选项)

# 参考文档

[『React Navigation 3x系列教程』createBottomTabNavigator开发指南\_CrazyCodeBoy的博客-CSDN博客 期待已久的新教程上线啦！解锁React Native开发新姿势，一网打尽React Native最新与最热技术，点我Get!!!createBottomTabNavigator相当于iOS里面的TabBarController，屏幕下方的标签栏。如图：createBottomTabNavigator APIcreateBottomTabNavigator(RouteConfigs,... https://blog.csdn.net/fengyuzhengfan/article/details/85405227](https://blog.csdn.net/fengyuzhengfan/article/details/85405227 "『React Navigation 3x系列教程』createBottomTabNavigator开发指南_CrazyCodeBoy的博客-CSDN博客 期待已久的新教程上线啦！解锁React Native开发新姿势，一网打尽React Native最新与最热技术，点我Get!!!createBottomTabNavigator相当于iOS里面的TabBarController，屏幕下方的标签栏。如图：createBottomTabNavigator APIcreateBottomTabNavigator(RouteConfigs,... https://blog.csdn.net/fengyuzhengfan/article/details/85405227")

[https://www.jianshu.com/p/fe1e83c1c77b](https://www.jianshu.com/p/fe1e83c1c77b "https://www.jianshu.com/p/fe1e83c1c77b")

   这篇文章能看 也会有很大启发

特别是他那个多个无关的路由树的切换

[https://blog.csdn.net/j550341130/article/details/81220317](https://blog.csdn.net/j550341130/article/details/81220317 "https://blog.csdn.net/j550341130/article/details/81220317")

# **createBottomTabNavigator-底部导航（几个互不干扰的栈）**

createBottomTabNavigator API
createBottomTabNavigator(RouteConfigs, BottomTabNavigatorConfig):

RouteConfigs (必选)：路路由配置对象是从路路由名称到路路由配置的映射，告诉导航器器该路路由呈现什什么。
BottomTabNavigatorConfig (可选)：配置导航器器的路路由(如：默认⾸首屏， navigationOptions，paths等)样式(如，转场模式mode、头部模式等)。

从createBottomTabNavigator API上可以看出 createBottomTabNavigator ⽀支持通过 RouteConfigs和 BottomTabNavigatorConfig 两个参数来创建createBottomTabNavigator导航器器。

# **RouteConfigs**

RouteConfigs⽀支持三个参数 screen 、 path 以及 navigationOptions ；

- screen (必选)：指定⼀一个 React 组件作为屏幕的主要显示内容，当这个组件被TabNavigator加载时，它会被分配⼀一个 navigation prop。
- path (可选)：⽤用来设置⽀支持schema跳转时使⽤用，具体使⽤用会在下⽂文的有关 Schema 章节中讲到；
- navigationOptions (可选)：⽤用以配置全局的屏幕导航选项如： title、 headerRight、 headerLeft等

# **BottomTabNavigatorConfig**

- tabBarComponent：指定createBottomTabNavigator的TabBar组件，如果不指定在iOS上默认使⽤用TabBarBottom，在Android平台上默认使⽤用TabBarTop。

            TabBarBottom 与 TabBarTop 都是 react-navigation 所⽀支持的组件，要自定义TabBar可

以重写这两个组件也可以根据需要⾃自⼰己实现⼀一个；

- tabBarOptions: 配置TaBar下⽂文会详细讲解；
- initialRouteName : 默认⻚页⾯面组件， createBottomTabNavigator显示的第⼀一个⻚页⾯面；
- order: 定义tab顺序的routeNames数组。
- paths: 提供routeName到path config的映射，它覆盖routeConfigs中设置的路路径。
- backBehavior: 后退按钮是否会导致标签切换到初始tab？ 如果是，则设切换到初始tab，否则什什么也不不做。 默认为切换到初始tab

## **tabBarOptions（tab配置）**

- activeTintColor: 设置TabBar选中状态下的标签和图标的颜⾊色；
- inactiveTintColor: 设置TabBar⾮非选中状态下的标签和图标的颜⾊色；
- showIcon: 是否展示图标，默认是false；
- showLabel: 是否展示标签，默认是true；
- upperCaseLabel - 是否使标签⼤大写，默认为true。
- tabStyle: 设置单个tab的样式；
- indicatorStyle: 设置 indicator(tab下⾯面的那条线)的样式；
- labelStyle: 设置TabBar标签的样式；
- iconStyle: 设置图标的样式；
- style: 设置整个TabBar的样式；
- allowFontScaling: 设置TabBar标签是否⽀支持缩放，默认⽀支持；
- safeAreaInset：覆盖的forceInset prop，默认是{ bottom: 'always', top: 'never' }，可选值： top | bottom | left | right ('always' | 'never')

## **navigationOptions（屏幕导航选项）**

createBottomTabNavigator⽀支持的屏幕导航选项的参数有：

- title: 可以⽤用作headerTitle和tabBarLabel的备选的通⽤用标题。
- tabBarVisible: 显示或隐藏TabBar，默认显示；
- tabBarIcon: 设置TabBar的图标；
- tabBarLabel: 设置TabBar的标签；
- tabBarOnPress: Tab被点击的回调函数，它的参数是⼀一保函⼀一下变量量的对象

                navigation: navigation prop ；

                defaultHandler: tab按下的默认处理理程序；

- tabBarButtonComponent： React组件，它包装图标和标签并实现onPress。 默认情况下是

                TouchableWithoutFeedback的⼀个封装，使其表现与其它可点击组件相同，

                tabBarButtonComponent: TouchableOpacity 将使⽤用 TouchableOpacity 来替代；

- tabBarAccessibilityLabel：选项卡按钮的辅助功能标签。 当⽤用户点击标签时，屏幕阅读器器会读取

这些信息。 如果您没有选项卡的标签，建议设置此项；

- tabBarTestID：⽤用于在测试中找到该选项卡按钮的 ID；

export const AppTabNavigator = createBottomTabNavigator({

    Page1: {

        screen: Page1,

        navigationOptions: {

            tabBarLabel: 'Page1',

            tabBarIcon: ({tintColor, focused}) => (

                \<Ionicons

                    name={focused ? 'ios-home' : 'ios-home-outline'}

                    size={26}

                    style=

                />

            ),

        }

    },

    Page2: {

        screen: Page2,

        navigationOptions: {

            tabBarLabel: 'Page2',

            tabBarIcon: ({tintColor, focused}) => (

                \<Ionicons

                    name={focused ? 'ios-people' : 'ios-people-outline'}

                    size={26}

                    style=

                />

            ),

        }

    },

    Page3: {

        screen: Page3,

        navigationOptions: {

            tabBarLabel: 'Page3',

            tabBarIcon: ({tintColor, focused}) => (

                \<Ionicons

                    name={focused ? 'ios-chatboxes' : 'ios-chatboxes-outline'}

                    size={26}

                    style=

                />

            ),

        }

    },

}, {

    tabBarComponent: TabBarComponent,

    tabBarOptions: {

        activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',

    }

});

在上述代码中使⽤用了了 react-native-vector-icons 的⽮矢量量图标作为Tab的显示图标， tabBarIcon接收

⼀一个React 组件，⼤大家可以根据需要进⾏行行定制：

- tintColor: 当前状态下Tab的颜⾊色；
- focused: Tab是否被选中；
