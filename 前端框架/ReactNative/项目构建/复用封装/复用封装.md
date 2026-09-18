# 复用封装

## 目录

- [监听返回](#监听返回)

# 监听返回

```react jsx 
backHandleWith
/* @flow */
import React, { Component } from 'react'
import { DeviceEventEmitter, Platform } from 'react-native'
import { connect } from 'react-redux'
import { addAppearListener, addDisappearListener } from 'react-common/base/hoc/extendLifeCycle'
import { compose } from 'redux'
import { pop, pushRoute } from 'react-common/actions/routes'
import listenerUtils from 'react-common/utils/listenerUtils'
import { CodePushSyncEventKey } from 'react-common/page/update/CodePushStatusView'
// @ts-ignore
import _ from 'lodash'
import { apiDeps } from 'react-common/base/request/apiRequest'
import { getServerCacheCity } from 'react-common/utils/getCityUtils'
import { getPhonePattern } from 'react-common/utils/phonePattern'
import { PermissionApplyUtils } from 'react-common/utils/native-utils'
import { safeParseJSON } from 'react-common/utils/stringify'



const nativeToRNEventKey = 'onNativeToRNEvent'
const handlePageChangeEvent = (dispatch: Callback, paramsStr: string) => {
    // console.log(dispatch,params)
    const params = safeParseJSON(paramsStr)
    const { fromTarget, toPage, ...extParams } = params
    dispatch(
        pushRoute({
            page: toPage,
            params: {
                fromTarget,
                ...extParams,
            },
        }),
    )
}



 export const handleCheckUpdate = () => { 
     DeviceEventEmitter.emit(CodePushSyncEventKey) 
 } 



type Callback = (arg?: any) => {}
interface IProps {
    popTo: Callback
    instanceId: string
    dispatch: Callback
    routes: any
}



// @ts-ignore
@connect(
    state => ({
        instanceId: _.get(state, 'systemInfo.instanceId'),
        routes: _.get(state, 'routes'),
    }),
    dispatch => ({
        popTo: compose(dispatch, pop),
        dispatch,
    }),
)
// @ts-ignore
export default class BackHandlerWith extends Component<IProps> {
    public componentDidMount() {
        listenerUtils.appStateAddListener(this, 'change', this.onAppStateChange)

        // handle default react instance
        listenerUtils.backHandlerAddListener(this, 'hardwareBackPress', this._onBackPressed)


        // handle mulit react instance
        // addAppearListener(this.props.instanceId, () => {
        //     listenerUtils.backHandlerAddListener(this, 'hardwareBackPress', this._onBackPressed)
        // })
        // addDisappearListener(this.props.instanceId, () => {
        //     listenerUtils.remove(this, 'hardwareBackPress')
        // })

        listenerUtils.addListener(this, nativeToRNEventKey, handlePageChangeEvent.bind(this, this.props.dispatch))

        this.fetchAppData()
        
        if (Platform.OS === 'android') {
            const requestPermission = _.get(PermissionApplyUtils, 'requestPermission')
            if (requestPermission) {
                requestPermission()
            }
        }
    }

    public fetchAppData = () => {
        if (!_.isEmpty(apiDeps.session_id)) {
            getPhonePattern()
            getServerCacheCity()
        }
    }
     public onAppStateChange = (currentAppState: string) => { 
         if (currentAppState === 'active') { 
             handleCheckUpdate() 
         } 
     } 

    public componentWillUnmount() {
        listenerUtils.remove(this)
        listenerUtils.remove(this.props.instanceId)
    }

    public _onBackPressed = () => {
        const routes = this.props.routes || {}
        if (routes.index > 0) {
            this.props.popTo()
            return true
        }
        return false
    }

    public render() {
        return null
    }
}



```
