# 扩展声明周期

## 目录

- [缓存路由栈堆： appear，disappear](#缓存路由栈堆-appeardisappear)

# 缓存路由栈堆： appear，disappear

hooks

```javascript 
 //useStore.js
import { useState, useEffect, useContext } from 'react'
import { ReactReduxContext } from 'react-redux'
import _ from 'lodash'

type ISelector = (state: any) => any
const defualtSelecter = (d: any) => d
export default function useStore(selector: ISelector = defualtSelecter) {
    const { store } = useContext(ReactReduxContext)
    const { getState, dispatch, subscribe } = store
    const [value, setValue] = useState(selector(getState()))
    useEffect(() => {
        return subscribe(() => setValue(selector(getState())))
    }, [])

    return [value, dispatch]
}







//useStoreMountLifeCycle  经过项目校验 还是比较准的
import _ from 'lodash'
import { useEffect,useRef,useLayoutEffect } from 'react'
import { Callback, INavigation } from '../types/lang'
import useStore from "modern/hooks/useStore";
interface ISProps {
    navigation:INavigation,
    disAppear?:Callback,
    appear?:Callback,
    unMount?:Callback,
    mounted?:Callback,
}

export default (props:ISProps)=>{
    const {navigation , disAppear=_.noop,appear=_.noop,unMount=_.noop,mounted=_.noop} = props
    const [routes] = useStore(d => d.routes.routes)
    const currentRoute = routes[routes.length - 1]
    const defaultIsAppear = navigation.state.routeName === currentRoute.routeName
    useEffect(()=>{
        if(defaultIsAppear){
            appear()
        }
        return ()=>{
            if(defaultIsAppear){
                disAppear()
            }
        }
    },[routes])
    useEffect(()=>{
        mounted()
        return unMount
    },[])
}

```


class

```javascript 
 /**
 * @flow
 */

import React, {Component} from 'react'
import {DeviceEventEmitter} from 'react-native'
import _ from 'lodash'
import EmptyArrowFn from '../../components/EmptyArrowFn'
import {withRedux} from 'modern/components/NavWrapper'
import {isMicroBusiness} from "react-common/const/ui-common";

export const POP_TO_NATIVE_EMIT_KEY = 'POP_TO_NATIVE_EMIT_KEY*'

const isTopPage = (pageKey: string, WrappedComponent: *) => {
    const {
        props: {navigation},
    } = WrappedComponent || {}
    const {state} = navigation || {}
    const {key = ''} = state || {}
    return key === pageKey
}


/*
 *  将要跳转到原生界面
 *  componentWillGoToNative
 *  将要从原生界面返回
 *  componentWillComeBackFromNative
 *  界面将要消失
 *  componentWillDisappear
 *  界面将要出现
 *  componentWillAppear
 *
 * */

export function addDisappearListener(currentInstanceId: string, callback: () => void): any {
    const listener = DeviceEventEmitter.addListener( 'willToNative', instanceId => {
        if (currentInstanceId === instanceId) {
            callback()
        }
    })
    return listener
}

export function addAppearListener(currentInstanceId: string, callback: () => void): any {
    const listener = DeviceEventEmitter.addListener( 'willFromNative', instanceId => {
        if (currentInstanceId === instanceId) {
            callback()
        }
    })
    return listener
}

const timeout = 400

const extendLiftCycle = (RawView: *) => {
    const WrappedComponent = RawView

    class InnerComponent extends Component {
        _isDisappear: boolean = false
        _isAppear: boolean = false
        _isMount: boolean = false

        getWrappedInstance = () => this.WrappedComponent

        getDisplayName = () => {
            const {
                // key,
                routeName,
            } = this.props.navigation.state
            return routeName
            // return WrappedComponent.displayName || WrappedComponent.name
        }

        getRouteKey = () => {
            const {
                key,
            } = this.props.navigation.state
            return key
            // return WrappedComponent.displayName || WrappedComponent.name
        }

        componentWillMount() {
            // const {navigation} = this.props

            this.appearListener = addAppearListener(this.props.instanceId, () => {
                this.componentWillComeBackFromNative()
            })
            this.disappearListener = addDisappearListener(this.props.instanceId, () => {
                this.componentWillGoToNative()
            })
            // 收到监听
            this.popNativeListener = DeviceEventEmitter.addListener(POP_TO_NATIVE_EMIT_KEY, this.popToNative)

            this.onSelectedTabListener = DeviceEventEmitter.addListener('onSelectedTab', this.onSelectedTab)

            // this.willFocusListener = navigation.addListener('didFocus', this.componentWillAppearFix)
            // this.willBlurListener = navigation.addListener('willBlur', this.componentWillDisappearFix)
        }

        componentDidMount() {
            setTimeout(() => {
                this.componentWillAppearFix()
                this._isMount = true
            }, timeout)
        }

        componentWillReceiveProps(nextProps: Props) {
            this.willHandler(this.props.routes, nextProps.routes)
        }

        componentWillUnmount() {
            this._isMount = false
            // 修复返回过快willBlur不执行
            // this.componentWillDisappearFix()
            if(this.appearListener){
                this.appearListener.remove()
            }
            if(this.disappearListener){
                this.disappearListener.remove()
            }
            if(this.popNativeListener){
                this.popNativeListener.remove()
            }
            if(this.onSelectedTabListener){
                this.onSelectedTabListener.remove()
            }
            // this.willFocusListener.remove()
            // this.willBlurListener.remove()
        }

        componentWillAppearFix = () => {
            if (!this._isAppear) {
                // console.log('componentWillAppearFix', this.getDisplayName(), new Date().getTime())
                this._isAppear = true
                this._isDisappear = false
                this.componentWillAppear()
            }
        }

        componentWillDisappearFix = () => {
            if (!this._isDisappear) {
                // console.log('componentWillDisappearFix', this.getDisplayName(), new Date().getTime())
                this._isDisappear = true
                this._isAppear = false
                this.componentWillDisappear()
            }
        }

        routeHandler = (route, handler) => {
          if (route.key === this.getRouteKey() || (isMicroBusiness() && route.key === this.getDisplayName())) {
            handler()
          } else if (_.has(route, 'routes') && !_.isEmpty(route.routes)) {
            const showRoute = route.routes[route.index]
            this.routeHandler(showRoute, handler)
          }
        }

        onSelectedTab = (params: any) => {
            this.routeHandler({ key: params.oldPage }, this.componentWillDisappearFix)
            setTimeout(() => {
                this.routeHandler({ key: params.newPage }, this.componentWillAppearFix)
            }, timeout)
        }

        willHandler = (oldRoute: any, nextRoute: any) => {
            if (oldRoute.index === nextRoute.index || _.isEmpty(this.getDisplayName()) || !this._isMount) return

            const popHandler = () => {
                const popList = oldRoute.routes.slice(nextRoute.index + 1)
                popList.forEach(sub => {
                    this.routeHandler(sub, this.componentWillDisappearFix)
                })

                setTimeout(() => {
                    const currentTop = _.last(nextRoute.routes)
                    this.routeHandler(currentTop, this.componentWillAppearFix)
                }, timeout)
            }

            const pushHandler = () => {
                const lastTop = _.last(oldRoute.routes)
                this.routeHandler(lastTop, this.componentWillDisappearFix)

                setTimeout(() => {
                    const newTop = _.last(nextRoute.routes)
                    this.routeHandler(newTop, this.componentWillAppearFix)
                }, timeout)
            }

            if (nextRoute.index > oldRoute.index) {
                pushHandler()
            } else {
                popHandler()
            }
        }

        judgeCanCallback = () => {
            const { routes } = this.props
            const key = routes.routes[routes.index].key
            return isTopPage(key, this.getWrappedInstance())
        }

        componentWillGoToNative = () => {
            // console.log("componentWillGoToNative:getWrappedInstance")
            const {componentWillGoToNative = EmptyArrowFn} = this.getWrappedInstance() || {}
            if (this.judgeCanCallback()) {
                componentWillGoToNative.call(this.getWrappedInstance())
            }
        }

        componentWillComeBackFromNative = () => {
            // console.log("componentWillComeBackFromNative:getWrappedInstance")
            const {componentWillComeBackFromNative} = this.getWrappedInstance() || {}
            if (componentWillComeBackFromNative && this.judgeCanCallback()) {
                componentWillComeBackFromNative.call(this.getWrappedInstance())
            }
        }

        popToNative = (instanceId: string) => {
            // console.log("popToNative:getWrappedInstance")
            const {componentWillDisappear} = this.getWrappedInstance() || {}
            if (this.props.instanceId === instanceId && componentWillDisappear) {
                componentWillDisappear.call(this.getWrappedInstance())
            }
        }

        componentWillAppear = () => {
            const ref = this.getWrappedInstance()
            const {componentWillAppear} = ref || {}
            // console.log("life:componentWillAppear:",  componentWillAppear,ref)
            if (componentWillAppear) {
                componentWillAppear.call(ref)
            }
        }

        componentWillDisappear = () => {
            const ref = this.getWrappedInstance()
            const {componentWillDisappear} = ref || {}
            if (componentWillDisappear) {
                componentWillDisappear.call(ref)
            }
        }

        WrappedComponent: *
        appearListener: *
        disappearListener: *
        popNativeListener: *
        willFocusListener: *
        willBlurListener: *

        render() {
            const props = {...this.props}
            return (
              <WrappedComponent
                ref={el => {
                    this.WrappedComponent = el
                }}
                {...props}
              />
            )
        }
    }

    function mapProps(store: Object) {
        const {routes, systemInfo} = store
        return {
            routes,
            instanceId: systemInfo.instanceId,
        }
    }

    return withRedux(mapProps)(InnerComponent)
}

export default extendLiftCycle

```
