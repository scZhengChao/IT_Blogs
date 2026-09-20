# 封装navigator

## 目录

- [NavigationActions](#NavigationActions)
  - [Navigate   用来跳转到其他路由的方法 ](#Navigate-用来跳转到其他路由的方法-)
  - [Back   用来返回到上一个路由或其他路由](#Back-用来返回到上一个路由或其他路由)
  - [SetParams ](#SetParams-)
  - [Reset  重置路由 ](#Reset-重置路由-)
    - [Got there should always be only one scene active error on reset action](#Got-there-should-always-be-only-one-scene-active-error-on-reset-action)
- [routeActions总揽](#routeActions总揽)
- [封装navigations](#封装navigations)
- [封装routes](#封装routes)

# **NavigationActions**

            所有的NavigationActions 都会\*\*返回一个对象，**我们可以使用**navigation.dispatch()这个方法将这个对象发送给router。 \*\*

             有一点需要着重强调一下，当我们dispatch一个NavigationAction的时候，即使这个action没有被处理，它也不会抛出任何错误提示。（这与redux中相似，在redux中你dispatch一个action，如果这个action没有被处理，他也不会有任何报错或者提示。）因为，如果你dispatch的结果是app的state被改变了，那么返回的值应该是true,如果没有改变state，返回的值则为false.&#x20;

## Navigate   用来跳转到其他路由的方法&#x20;

routeName ---String  必需  这个参数就是RouteConfigs中注册过的路由名称。&#x20;

                params  -----Object   可选     传递的参数&#x20;

\*\*  action  ----Object   可选   （高级）  如果所要跳转的屏幕组件也是一个导航器，那么这个对象就是在子路由器中运行的子操作。 \*\*

               key  ----String  可选  要导航到的路线的标识符。如果它已经存在，则返回到此路线。&#x20;

示例如下：&#x20;

```javascript 
 
import { NavigationActions } from 'react-navigation';
const navigateAction = NavigationActions.navigate({
  routeName: 'Home',
  params: {},
  action: NavigationActions.navigate({ routeName: 'matterList' }),
});
this.props.navigation.dispatch(navigateAction);
```


## Back   用来返回到上一个路由或其他路由

Key  ---String | null   如果设置该参数，导航将从给定的键返回。如果为空，导航将返回到上一级。&#x20;

```javascript 
 import { NavigationActions } from 'react-navigation';
const backAction = NavigationActions.back({
  key: 'Profile',
});
this.props.navigation.dispatch(backAction);
```


## SetParams&#x20;

     在调用SetParams时，路由器会生成一个新的state。而其中的参数就会被合并到这个新的state中。&#x20;

          params  --- Object  参数&#x20;

           key  ----String  -- 必需   获取新参数的路由键。&#x20;

```javascript 
 import { NavigationActions } from 'react-navigation';

const setParamsAction = NavigationActions.setParams({
  params: { title: 'Hello' },
  key: 'screen-123',
});
this.props.navigation.dispatch(setParamsAction);

```


## Reset  重置路由&#x20;

Reset操作将重置整个导航状态并将其替换为新的导航。&#x20;

     index  --- number  必需  导航中routes活动路由的索引&#x20;

     actions  ---array   必需   将替换导航数组&#x20;

&#x20;    key   ----String | null  可选，  如果设置，具有给定键的导航器将重置。如果为null，则根导航器将被重置。&#x20;

```javascript 
 import { StackActions, NavigationActions } from 'react-navigation';
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Profile' })],
});
this.props.navigation.dispatch(resetAction);
```


### Got there should always be only one scene active error on reset action

```javascript 
 NavigationActions.reset({
  index: 3,
  actions: [
    NavigationActions.navigate({ routeName: 'Screen1' }),
    NavigationActions.navigate({ routeName: 'Screen2' }),
    NavigationActions.navigate({ routeName: 'Screen3' }),
    NavigationActions.navigate({ routeName: 'Screen4' }),
  ]
})

```


# routeActions总揽

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


注意：

1.返回数组的情况；要配合中间件使用；

2.replace的地方；要用到reducer里的action来做判断

# 封装navigations

```javascript 
 import _ from 'lodash'
import { NavigationActions, NavigationReplaceActionPayload, StackActions } from 'react-navigation'
import { findRouteIndex } from './route-utils'
import toastUtils from '../utils/toastUtils'

type Handler = (opt: { route: any; index: number; routes: any[] }) => any
const findRoute = (routeName: string, handler: Handler) => (store: any) => {
    const routes = _.get(store, 'routes.routes') || {}
    
    const tmp = [...routes].reverse()

    const index = findRouteIndex(routeName, tmp)
    const originIndex = tmp.length - index - 1
    console.log( tmp[index],originIndex,routes,'---:---:----')
    return handler({ route: tmp[index], index: originIndex, routes })
}

interface IRouteOptions {
    key?: string
    routeName?: string
    page?: string
    params?: any
    isAcceptDuplicate?: boolean
}

const getRouteOptions = (opt: IRouteOptions) => {
    const routeName = opt.routeName || opt.page || ''
    return { isAcceptDuplicate: false, routeName, ...opt }
}

export const pushRoute = (() => {
    const pushAt = { time: Date.now() }
    return (opt: IRouteOptions) => {
        const options = getRouteOptions(opt)
        return findRoute(options.routeName, ({ route }) => {
            const probablyDuplicate = Date.now() - pushAt.time <= 2000
            if (route && probablyDuplicate && !options.isAcceptDuplicate) {
                devWaring(`${options.routeName} duplicate  ignore`)
                return []
            }
            pushAt.time = Date.now()
            return StackActions.push(options)
        })
    }
})()

export const resetRoute = (opt: { index: number; actions: any[] }) => {
    return StackActions.reset(opt)
}
export const replaceRoute = (opt: { oldPage: string; newPage: string; params: any }) => {
    return findRoute(opt.oldPage, ({ route }) => {
        const nextOpt = {
            key: route.key,
            routeName: opt.newPage,
            params: opt.params,
        }
        return StackActions.replace(nextOpt)
    })
}
export const getNavParams = (props: any) => _.get(props.props || props, 'navigation.state.params') || {}

export const resetRouteFor = (opt: { routeName?: string; page?: string; actions: any[] }) => {
    const options = getRouteOptions(opt)
    return findRoute(options.routeName, ({ index, route, routes }) => {
        if (!route) {
            return StackActions.reset({ index: opt.actions.length - 1, actions: opt.actions })
        }

        let topRoutes = []
        for (let i = 0; i < index; i++) {
            const curRoute = routes[i]
            topRoutes.push(pushRoute({ routeName: curRoute.routeName, params: curRoute.params }))
        }
        topRoutes = [...topRoutes, ...opt.actions]
        const current = index + opt.actions.length - 1
        return StackActions.reset({ index: current, actions: topRoutes })
    })
}

export const setParams = (opt: IRouteOptions) => {
    const options = getRouteOptions(opt)
    if (options.key) {
        return NavigationActions.setParams({ key: options.key, params: options.params })
    }
    return findRoute(options.routeName, ({ route }) => {
        if (!route || !route.key) return []
        return NavigationActions.setParams({ key: route.key, params: options.params })
    })
}

export const devWaring = (msg: string) => {
    if (__DEV__) {
        const info = `DEV:${msg}`
        const { log } = console
        log(info)
        toastUtils.showShortCenter(info)
    }
}

export const popToRoute = (opt?: IRouteOptions) => {
    if (!opt) return StackActions.pop({})
    const options = getRouteOptions(opt)
    return findRoute(options.routeName, ({ route, index, routes }) => {
        const n = routes.length - index - 1
        if (n >= 0) return StackActions.pop({ n })
        return []
    })
}

export const popToTopRoute = () => StackActions.popToTop()

export default { pushRoute, popToRoute, popToTopRoute, resetRoute, resetRouteFor, setParams, getNavParams }

```


# 封装routes

```javascript 
 /**
 * @flow
 */

import { NativeModules, Keyboard, DeviceEventEmitter } from 'react-native'
import { NavigationActions } from 'react-navigation'
import _ from 'lodash'
import type { Callback } from 'react-common/types/langType'
import { delay } from 'react-common/base/enhance/promise'
import { disableLoadingAction } from 'react-common/actions/loading'
import { POP_TO_NATIVE_EMIT_KEY } from 'react-common/base/hoc/extendLifeCycle'
import CodePush from 'react-native-code-push'
import { isNeedRestart, setRestarted } from 'react-common/page/update/CodePushStatusView'
import { isPostHouse } from 'react-common/const/ui-common'
import { isTopRoute } from 'react-common/navigation/routeUtil'
import navigator from 'modern/navigation/navigation'

const { NativeNavigator = {} } = NativeModules
const { popToNativeController } = NativeNavigator

type delayHandler = {
    timer: ?number,
    forbidTime: number,
    handleMultiTimer: Callback,
}

function getMultiDelayHandler(): delayHandler {
    const tempHandler: delayHandler = {
        timer: null,
        forbidTime: __DEV__ ? 0 : 700,
        handleMultiTimer: () => {
            tempHandler.timer = setTimeout(() => {
                if (tempHandler.timer) {
                    clearTimeout(tempHandler.timer)
                    tempHandler.timer = null
                }
            }, tempHandler.forbidTime)
        },
    }

    return tempHandler
}

const multiPopHandler = getMultiDelayHandler()
const multiResetHandler = getMultiDelayHandler()

export type pushType = {
    page: string,
    params?: Object,
    action?: any,
}

export const pushRoute = (props: pushType) => navigator.pushRoute(props)

export type routeParamsType = {
    params: Object,
    page?: string,
    key?: string,
}

export const setParams = (props: routeParamsType) => navigator.setParams(props)

export type popType = {
    // 优先级 goBackCount > key > page
    key?: string,
    page?: string,
    goBackCount?: number,
    params?: Object,
}

export const pop = (arg?: popType) =>
    disableLoadingAction(async () => {
        if (global.__IS_KEYBOARD_OPEN__) {
            Keyboard.dismiss()
            await delay(200)(Promise.resolve())
        }
        return originPop(arg)
    })

export function originPop(props?: popType) {
    const { page, key, goBackCount = 0, params = {} } = props || {}

    const popAction = (store: Object) => {
        const { routes, systemInfo } = store
        // 记录actions
        const actions = {
            setParams: _.isEmpty(params) ? null : setParams({ key, page, params }),
            pop: NavigationActions.back(),
        }
        const isPostHouseHomePage = isPostHouse() && isTopRoute('HomePage', routes.routes)

        const popToNative = () => {
            if (!popToNativeController || isPostHouseHomePage) return
            DeviceEventEmitter.emit(POP_TO_NATIVE_EMIT_KEY, systemInfo.instanceId)
            isNeedRestart().then(isNeed => {
                if (isNeed) {
                    setRestarted().then(() => {
                        CodePush.restartApp(false)
                    })
                }
            })
            popToNativeController()
        }

        // 如果路由栈为1，pop回到原生app
        if (routes.index === 0) {
            popToNative()
            return []
        }

        // 处理路由栈
        const currentRoutes = [...routes.routes]
        currentRoutes.reverse()

        // 如果参数goBackCount存在,则执行back指定个数page操作
        if (goBackCount > 0) {
            const currentBackIndex = goBackCount - 1
            const route = currentRoutes[currentBackIndex]
            const isBackToNative = !isPostHouseHomePage && currentRoutes.length === goBackCount
            if (_.isEmpty(route) || isBackToNative) {
                popToNative()
                return []
            }
            const currentKey = currentRoutes[currentBackIndex].key
            actions.pop = NavigationActions.back({ key: currentKey })
        } else if (!_.isEmpty(key) || !_.isEmpty(page)) {
            // 如果参数key或者page存在,则执行pop到指定页
            const backRoute = currentRoutes.find((route: Object) => {
                if (!_.isEmpty(key)) {
                    return route.key === key
                }
                return route.routeName === page
            })
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

    if (!multiPopHandler.timer) {
        multiPopHandler.handleMultiTimer()
        return popAction
    }

    return []
}

export const reset = (props: { index: number, actions: Array<*> }) => navigator.resetRoute(props)

```
