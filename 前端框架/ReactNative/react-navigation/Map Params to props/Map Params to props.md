# Map Params to props

## 目录

- [create navigator](#create-navigator)
- [routes resources](#routes-resources)
- [create Routes](#create-Routes)
- [hoc map route](#hoc-map-route)

# create navigator

```javascript 
 /* @flow*/
/*eslint-disable*/
import {
  Platform,
  Animated,
  Easing,
} from 'react-native'
import {
  StackNavigator,
} from 'react-navigation'
import animation from './common/animation'
import Route from './routes'

const routeConfig = {
  navigationOptions: ({  navigation, screenProps }) => ({
    header: null,  /* 全局影藏导航栏*/
    headerStyle: {
      backgroundColor: 'rgba(252,252,252,1)',
      // height: Platform.OS === 'ios' ? 64 : 44 + androidTop,
    },
    headerTitleStyle: {
      fontSize: 16,
      color: 'black',
    },
    // gesturesEnabled:  Platform.OS === 'ios'?false:true,
  }),
  headerMode: 'screen',
  transitionConfig: () => ({
    screenInterpolator: animation.forHorizontal,
    transitionSpec: {
      duration: 150,
      easing:Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
      timing: Animated.timing,
    },

  }), // 这里配置导航动画
}

// 主路由
const MainRoute = StackNavigator(Route, routeConfig)

export default MainRoute
/*eslint-enable*/

```


# routes resources

```javascript 
 /**
 * @flow
 */

import { createRoute } from 'react-common/navigation/common'
import NavWebView from 'react-common/components/NavWebView'
import WebviewHelper from 'react-common/components/WebviewHelper'

import SmsRoutes from 'sms/routes/posthouseRoutes'
import orderRoutes from 'order/routes/order-posthouse'
import pageRoutes from './pageRoutes'
import payRoutes from 'pay/routes/pay-posthouse'
import NetworkCheckView from 'react-common/components/NetworkCheckView'
import WebViewWithPusher from 'react-common/components/WebViewWithPusher'
import NetPhoneCallingPage from 'react-common/page/netCall/NetPhoneCallingPage'

const appRoutes = {
    // react-common
    NavWebView,
    WebviewHelper: {
        screen: WebviewHelper,
        desc: 'NavWebView',
    },
    WebViewWithPusher: {
        screen: WebViewWithPusher,
        desc: 'ConfigNavWebView',
    },
    NetworkCheckPage: {
        screen: NetworkCheckView,
        desc: 'NetworkCheckView',
    },
    NetPhoneCallingPage: {
        screen: NetPhoneCallingPage,
        desc: 'NetPhoneCallingPage',
    },
    ...SmsRoutes, // 导入短信模块页面
    ...orderRoutes, // order pages
    ...payRoutes, // pay pages
    ...pageRoutes, //self page routes

    /* AccountPwLoginPage: {
    screen: AccountPwLoginPage,
    desc: '账号密码登录',
  },*/
}

export default createRoute(appRoutes)
```


# create Routes

```javascript 
 /*
* @flow*/
import mapNavigationStateParamsToProps from '../../base/hoc/mapNavigationStateParamsToProps'

const getDefaultOptions = () => ({
  gesturesEnabled: true,
})
export const createRoute = (routes: Object) => {
  const newRoute = {}
  Object.entries(routes).forEach((route: *) => {
    const [key, value = {}] = route
    if (typeof value === 'function') {
      const newPage = {
        screen: mapNavigationStateParamsToProps(value),
        path: key,
        navigationOptions: {
          ...getDefaultOptions(),
        },
      }
      newRoute[key] = newPage
    } else if (value && typeof value === 'object') {
      newRoute[key] = value
      value.path = value.path || value.key
      value.screen = mapNavigationStateParamsToProps(value.screen)
      let navigationOptions = {}
      if (value.navigationOptions && typeof value.navigationOptions === 'object') {
        navigationOptions = value.navigationOptions
      }
      value.navigationOptions = {
        ...getDefaultOptions(),
        ...navigationOptions,
      }
    }
  })
  return newRoute
}

export default {

}
```


# hoc map route

```javascript 
 /*
* @flow*/
import React, {
  Component,
} from 'react'

const mapNavigationStateParamsToProps = (WrappedComponent: *) => {
  mapNavigationStateParamsToProps.prototype.WrappedComponent = WrappedComponent

  class InnerComponent extends Component {
    static navigationOptions = WrappedComponent.navigationOptions;

    props: {
      navigation: Object
    }

    render() {
      const { navigation: { state: { params = {} } } } = this.props
      return <WrappedComponent {...params} {...this.props} />
    }
  }

  return InnerComponent
}

export default mapNavigationStateParamsToProps

```


或者 添加connect 上

```javascript 
 withRedux(null, mapAction)(MonitorSettingPage)
```


```javascript 
 import { baseMerger, reduxWithRef, ViewWrapper } from 'modern/components/WrapperViews'
const NavWrapper = (rawView: any) => {
    const merger = (props: any, ref: any) => {
        const parsed = baseMerger(props, ref)
        const { navigation, getInstance } = parsed
        const navParams = _.get(navigation, 'state.params') || {}
        if (typeof getInstance === 'function') getInstance(ref)
        return { ...parsed, navParams, ...navParams }
    }
    return ViewWrapper(rawView, merger)
}

export const withRedux = (mapProps?: any, mapAction?: any, merger?: any, options?: any) => {
    return (view: any) => reduxWithRef(mapProps, mapAction, merger, options)(NavWrapper(view))
}
```


```javascript 
 // WrapperViews
import views from 'react-native'
import withNotingRender from 'modern/enhance/withNotingRender'
import React from 'react'
import { connect } from 'react-redux'

export const reduxWithRef = (mapProps = null, mapDispatch = null, mergeProps = null, options = {}) => (view: any) =>
    connect(
        mapProps,
        mapDispatch,
        mergeProps,
        { ...options, forwardRef: true },
    )(view)

export const baseMerger = (props: any, ref: any) => {
    // console.log("baseMerger:", ref)
    return { ...props, ref }
}

export const ViewWrapper = (RawView: any, merger = baseMerger) =>
    React.forwardRef((props: any, ref) => <RawView {...merger(props, ref)} />)

const ViewOptions = {
    Text: { style: { color: 'green' } },
}

const wrapper = (rawView: any, options: any = {}) =>
    withNotingRender(
        ViewWrapper(rawView, (props, ref) => {
            const parsed: any = baseMerger(props, ref)
            return { ...options, ...parsed, style: [options.style, parsed.style] }
        }),
    )

export const Text = wrapper(views.Text, ViewOptions.Text)
```
