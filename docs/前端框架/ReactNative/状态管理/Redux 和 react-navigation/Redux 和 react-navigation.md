# Redux 和 react-navigation

## 目录

- [react-navigation-reduxhelpers](#react-navigation-reduxhelpers)
  - [安装](#安装)
  - [引入](#引入)
  - [配置](#配置)
- [addNavigationHelpers：](#addNavigationHelpers)
  - [route reducer](#route-reducer)
  - [navigator](#navigator)
  - [actions](#actions)

Redux 与 React Navigation结合集成

Redux + React Navigation有点复杂 因为Redux是⾃自顶向下管理理⼀一套状态，React Navigation也是⾃自顶 向下管理理⼀一套状态甚至页面，这俩融合起来就有点困难了了

# react-navigation-reduxhelpers

## 安装

```javascript 
 //安装redux,react-redux,react-navigation-reduxhelpers
yarn add redux
yarn add react-redux 
//因为redux其实是可以独⽴立运⾏行行的js项⽬目，但使⽤用在react项⽬目中，还需要 使⽤用react-redux
yarn add react-navigation-redux-helpers
//在使⽤用 React Navigation 的项⽬目中，想要集 成 redux 就必须要引⼊入 react-navigation-redux-helpers 这个库
```


## 引入

```javascript 
 // 引入
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { connect } from 'react-redux'；
import {  
  createReactNavigationReduxMiddleware,  
  createReduxContainer,
  createNavigationReducer 
} from "react-navigation-redux-helpers";
```


## 配置

```javascript 
 import { AsyncStorage } from 'react-native'
import {
    createNavigationReducer,
    createReactNavigationReduxMiddleware,
    createReduxContainer,
} from 'react-navigation-redux-helpers'
import { devToolsEnhander } from 'modern/enhance/devTools'
import { persistStore, persistReducer } from 'redux-persist'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { connect } from 'react-redux'
import createNavigator from 'modern/navigation/createNavigator'
import middlewares from 'modern/enhance/middleware'
import { safeParseJSON } from 'modern/utils/stringUtils'
import { deviceManager } from './consts/app-depends'
import _ from 'lodash'

export const storeManager = (() => {
    const state = {}
    return {
        getState: (keyPath: string) => _.get(state, keyPath),
        setState: (keyPath: string, value: any) => _.set(state, keyPath, value),
    }
})()

interface IStoreOpt {
    store: any
    AppWithState: any
}

interface IStoreConfig {
    launchOpt?: any
    onComplete: (...args: any[]) => any
    whitelist?: string[]
    blacklist?: string[]
    defaultStack: string
    reducers: object
    routesMapping: object
    preloadedState?: object
}
const createAppStore = ({
    routesMapping,
    launchOpt = {},
    defaultStack,
    onComplete = _.noop,
    whitelist = [],
    blacklist = [],
    reducers,
    preloadedState,
}: IStoreConfig): IStoreOpt => {
    const opt = safeParseJSON(launchOpt) || {}

    const {
        page,
        deviceId,
        appCode,
        oemCode,
        serialNo,
        userInfo,
        fac,
        appVersion,
        buildNumber,
        buildVersion,
        deviceName,
        ...ext
    } = opt

    deviceManager.update({ deviceId, appCode, oemCode, serialNo })
    const currentPage = page || defaultStack
    const AppNavigator = createNavigator(routesMapping, currentPage, ext)
    const navReducer = createNavigationReducer(AppNavigator)

    const persistOpt = { key: 'root', storage: AsyncStorage, whitelist, blacklist }
    const persistReducers = persistReducer(persistOpt, combineReducers({ routes: navReducer, ...reducers }))
    const navigation = createReactNavigationReduxMiddleware((state: any) => state.routes, 'root')
    const App = createReduxContainer(AppNavigator, 'root')
    const AppWithState = connect((state: any) => ({ state: state.routes }))(App)

    const enhancer = compose(
        middlewares,
        applyMiddleware(navigation),
        devToolsEnhander(),
    )
    const store = createStore(persistReducers, preloadedState, enhancer)
    persistStore(store)
    onComplete(store, AppWithState)

    return { AppWithState, store }
}

export default createAppStore

```


理解：

- react-navigation 和 redux 的结合一部分给 导航；一部分给 redux
- 仔细理解上面的

# addNavigationHelpers：

## route reducer

```javascript 
 /**
 * route reducer
 */
// const MainRoute = StackNavigator(Route, routeConfig)

import MainRoute from '../route/MainRoute'

const initialState = {
  initialState: MainRoute.router.getStateForAction(
    MainRoute.router.getActionForPathAndParams('SplashPage')
  ),
}
export function initRouteState({ page }: {
  page: string,
}) {
  if (page) {
    initialState.initialState = MainRoute.router.getStateForAction(
      MainRoute.router.getActionForPathAndParams(page)
    )
  }
}

const navReducer = (state:Object = initialState.initialState, action:any) => {
  if (action.replace === 'ReplaceCurrentScreen') {
    const routes = state.routes.slice(0, state.routes.length - 1)
    const newState = {
      ...state,
      routes,
      index: routes.length - 1,
    }
    const nextState = MainRoute.router.getStateForAction(action, newState)
    return nextState || newState
  }
  const nextState = MainRoute.router.getStateForAction(action, state)

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state
}

export default navReducer

```


## navigator

```javascript 
 /**
 * navigation
 */

import React, {
  Component,
} from 'react'
import {
  BackHandler,
} from 'react-native'
import {
  addNavigationHelpers,
} from 'react-navigation'
import { connect } from 'react-redux'
import { compose } from 'redux'
import AppNavigator from './route/MainRoute'
// const MainRoute = StackNavigator(Route, routeConfig)
import { pop } from './actions/routes'
import type { Callback } from './types/langType'

type Props={
  routes:Object,
  popTo:Callback,
  dispatch:Callback,
}
class Navigator extends Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPressed)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed)
  }

  onBackPressed = () => {
    const routes = this.props.routes || {}
    if (routes.index > 0) {
      this.props.popTo()
      return true
    }
    return false
  }

  props:Props
  render() {
    return (
      <AppNavigator
        navigation={
          addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.routes,
          })
        }
      />
    )
  }
}

function mapProps(props: Object) {
  return {
    routes: props.routes,
  }
}

function mapAction(dispatch) {
  return {
    popTo: compose(dispatch, pop),
    dispatch,
  }
}

export default connect(mapProps, mapAction)(Navigator)

```


## actions

```javascript 
 /**
 * @flow
 */

import {
} from 'react-native'
import {
  NavigationActions,
} from 'react-navigation'
import _ from 'lodash'
import type { Callback } from '../types/langType'


const multiPushHandler: {
  timer: ? number,
  forbidTime: number,
  handleMultiPushTimer: Callback
} = {
  timer: null,
  forbidTime: __DEV__ ? 0 : 300,
  handleMultiPushTimer: () => {
    multiPushHandler.timer = setTimeout(() => {
      if (multiPushHandler.timer) {
        clearTimeout(multiPushHandler.timer)
        multiPushHandler.timer = null
      }
    }, multiPushHandler.forbidTime)
  },
}

export type pushType = {
  page: string,
  params?: Object,
  action?: any
}

export function pushRoute(props: pushType) {
  const {
    page,
    params,
    action,
  } = props || {}

  if (!multiPushHandler.timer) {
    multiPushHandler.handleMultiPushTimer()
    return NavigationActions.navigate({
      routeName: page,
      params,
      // navigate can have a nested navigate action that will be run inside the child router
      // action: NavigationActions.navigate({ routeName: route})
      action,
    })
  }

  return []
}

export type routeParamsType = {
  params: Object,
  page?: string,
  key?: string,
}

export function setParams(props: routeParamsType) {
  const {
    page,
    key,
    params,
  } = props
  if (_.isEmpty(page) && _.isEmpty(key)) {
    return []
  }

  return (store: Object) => {
    const { routes } = store
    // 处理路由栈
    const currentRoutes = [...routes.routes]
    currentRoutes.reverse()
    const backRoute = currentRoutes.find(
      (route: Object) => {
        if (!_.isEmpty(key)) {
          return route.key === key
        }
        return route.routeName === page
      }
    )
    // 如果没有找到相关页面则返回空action
    if (!backRoute) {
      return []
    }

    const backRouteIndex = currentRoutes.indexOf(backRoute)
    const currentKey = currentRoutes[backRouteIndex].key
    return NavigationActions.setParams({
      params,
      key: currentKey,
    })
  }
}

export function replaceCurrentAddPushRoute(props: {
  page: string,
  params?: Object,
  action?: any
}) {
  const {
    page,
    params,
    action,
  } = props || {}

  if (!multiPushHandler.timer) {
    multiPushHandler.handleMultiPushTimer()
    return NavigationActions.navigate({
      routeName: page,
      params,
      action,
      replace: 'ReplaceCurrentScreen',
      // navigate can have a nested navigate action that will be run inside the child router
      // action: NavigationActions.navigate({ routeName: route})
    })
  }

  return []
}

export type popType = {
  // 优先级 goBackCount > key > page
  key?: string,
  page?: string,
  goBackCount?: number,
  params?: Object
}

export function pop(props?: popType) {
  const {
    page,
    key,
    goBackCount = 0,
    params = {},
  } = props || {}
  return (store: Object) => {
    const { routes } = store
    // 记录actions
    const actions = {
      setParams: _.isEmpty(params) ? null : setParams({
        key,
        page,
        params,
      }),
      pop: NavigationActions.back(),
    }
    // 处理路由栈
    const currentRoutes = [...routes.routes]
    currentRoutes.reverse()

    // 如果参数goBackCount存在,则执行back指定个数page操作
    if (goBackCount > 0) {
      const currentBackIndex = goBackCount - 1
      const currentKey = currentRoutes[currentBackIndex].key
      actions.pop = NavigationActions.back({ key: currentKey })
    } else if (!_.isEmpty(key) || !_.isEmpty(page)) { // 如果参数key或者page存在,则执行pop到指定页
      const backRoute = currentRoutes.find(
        (route: Object) => {
          if (!_.isEmpty(key)) {
            return route.key === key
          }
          return route.routeName === page
        }
      )
      // 如果没有找到相关页面则返回空action
      if (!backRoute) {
        return []
      }
      const backRouteIndex = currentRoutes.indexOf(backRoute)
      // fix official bug
      const currentBackIndex = backRouteIndex - 1
      if (currentBackIndex < 0) {
        return []
      }
      const currentKey = currentRoutes[currentBackIndex].key
      actions.pop = NavigationActions.back({ key: currentKey })
    }

    // 执行pop
    return [actions.setParams, actions.pop]
  }
}

export function reset(props: {
  index: number,
  actions: Array<*>
}) {
  const {
    index,
    actions,
  } = props || {}

  if (!multiPushHandler.timer) {
    multiPushHandler.handleMultiPushTimer()
    return NavigationActions.reset({
      index,
      actions,
    })
  }

  return []
}

export function resetToHomePageAction() {
  return reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'HomePage' }),
    ],
  })
}

```
