# 高阶组件

[https://www.jianshu.com/p/6dac8407c031](https://www.jianshu.com/p/6dac8407c031 "https://www.jianshu.com/p/6dac8407c031")

```纯文本 
 明确高阶组件的本质：传入一个组件返回一个新的组件： （实质：就是一个函数）
```


**一： 断网跳转（类似全局的路由守卫，统一跳转）**

```纯文本 
 实现一： 
 先写公共的网络跑丢的页面，然后在每个页面进行逻辑判断, 不同情况显示不同页面，这个当然可以实现，但是逻辑判断那部分每个页面都写一次，就重复了，这个就不写代码了，更好的方式是使用高阶组件修饰，请看实现二。
```


```纯文本 
 实现二： 
 先写一个WithNoNet的高阶组件， 然后在每个页面中使用WithNoNet修饰一下，实现将这部分判断逻辑抽离出来，简洁优雅高效。
```


```纯文本 
 Home: { 
              screen: ({navigation}) => <Home navigation={navigation}/>, 
             navigationOptions: { 
                 tabBarLabel: "首页", 
                 tabBarIcon: ({tintColor, focused}) => 
                     <Ionicons 
                         name={'md-home'} 
                         size={20} 
                         color={tintColor} 
                     /> 
             } 
 }, 
 
 //WithNoNet高阶组件 
 import React from 'react' 
 import NetInfo from "@react-native-community/netinfo"; 
 import NoNetwork from '../common/NoNetwork' 
 
 
 export default WrappedComponent => { 
     return class extends React.Component { 
         constructor(props) { 
             super(props) 
             this.state = { 
                 isConnected: false, 
                 hasCheckedNetwork: false, //为了解决执行网络检查时，NoNetwork页面一闪而过的现象 
             } 
         } 
         async componentDidMount(): void { 
             await this.checkNetwork() 
         } 
         checkNetwork = async () => { 
             try { 
                 let netInfo = await NetInfo.fetch() 
                 if (netInfo.isConnected) { 
                     this.setState({ 
                         isConnected: true, 
                         hasCheckedNetwork: true, 
                     }) 
                 } else { 
                     this.setState({ 
                         hasCheckedNetwork: true, 
                     }) 
                 } 
             } catch (e) { 
                 console.log(e) 
             } 
         } 
         render() { 
             const {isConnected, hasCheckedNetwork} = this.state 
             const {navigation} = this.props  //获取navigation并传递给WrappedComponent 
 
 
             if (isConnected) { 
                 return <WrappedComponent navigation={navigation}/> 
             } else { 
                 if (hasCheckedNetwork) { 
                     return <NoNetwork checkNetwork={this.checkNetwork}/> 
                 } else { 
                     return null 
                 } 
             } 
         } 
     }}
```


**二： es7 的语法；装饰器模式**
