# Webview

新版的RN已经⽤用react-naitve-webView替代RN原⽣生Core中的WebView

WebView 创建⼀一个原⽣生的 WebView，可以⽤用于访问⼀一个⽹网⻚页

或者：

```javascript 
 /**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { Linking, View, Platform } from 'react-native'
import RNFS from 'react-native-fs'
import NavWebView from 'react-common/components/NavWebView'
import {chooseUserInfo, transformUriByOemCode} from 'react-common/const/ui-common'
import styleSheet, { defaultBackgroundColor } from 'react-common/utils/styleSheet'
import { compose } from 'redux'
import { pushRoute } from 'react-common/actions/routes'
import type { Callback } from 'react-common/types/langType'
import { safeParseJSON } from 'react-common/utils/stringify'
import _ from 'lodash'
import { Toast, ShareUtils, OriginViewUtils } from 'react-common/utils/native-utils'
import { openMiniProgress } from 'react-common/utils/miniProgressUtils'
import NavWrapper from 'modern/components/NavWrapper'
import {apiDeps} from "react-common/base/request/apiRequest";

const styles = styleSheet.create({
    container: {
        flex: 1,
        backgroundColor: defaultBackgroundColor,
    },
    navContainer: {
        flex: 1,
        backgroundColor: defaultBackgroundColor,
    },
    adWebViewErrorView: {
        backgroundColor: defaultBackgroundColor,
    },
})

type Props = {
    userInfo?: Object,
    style?: any,
    webViewStyle?: any,
    uri: string,
    webViewProps?: Object,
    headers?: Object,
    hideNav?: boolean,
    pushTo?: Callback,
    onError?: Callback,
    getRef?: (ref: any) => any,
    navParams?: Object,
}

@connect(mapProps, mapAction)
@NavWrapper
class WebViewWithPusher extends React.Component {
    props: Props
    _webViewRef: any

    /* eslint-disable */
    getInjectMethods = () => {
        const { userInfo = {} } = this.props
        return `(${String(({ uid, appVersion }) => {
            var injectedMethods = {}
            injectedMethods.navigation = function(args) {
                window.postMessage(JSON.stringify(args))
            }
            
            injectedMethods.getAppVersion = function() {
                return appVersion
            }
            injectedMethods.getCmId = function (){
                return uid
            }

            window.injectedMethods = injectedMethods
            window.injectedFields = {
                uid,
            }
        })})({ uid: '${userInfo.cm_id || ''}', appVersion: '${apiDeps.appVersion}' });`
    }
    /* eslint-enable */

    onMessage = (e: any) => {
        const { pushTo = _.noop } = this.props
        const { nativeEvent } = e
        const parsed = safeParseJSON(nativeEvent.data)

        const webProps = this.getWebViewProps()

        // 外部传入处理消息方法
        if (_.isFunction(webProps.onMessage)) {
            const isParsed = webProps.onMessage(e, parsed) === true
            if (isParsed) return
        }

        // 以下是驿站首页广告的处理逻辑
        const { type = '', ...ext } = parsed

        // 兼容老的使用方式，params=string(page)
        const params: any = parsed.params || {}
        if (type === 'page') {
            if (params === 'recharge') {
                pushTo({
                    page: 'RechargePage',
                    params: {
                        fromCommonPage: 'WebviewHelper',
                    },
                })
                return
            }

            pushTo({
                page: ext.page || params,
                params: ext,
            })
            return
        }

        if (type === 'native') {
            try {
                const options = {
                    ios: {
                        viewName: ext.iosPageName,
                        ...ext,
                    },
                    android: {
                        viewName: ext.androidPageName,
                        ...ext,
                    },
                }
                OriginViewUtils.startView(options[Platform.OS])
            } catch (error) {
                Toast.showShortBottom(error.message)
            }
            return
        }

        if (type === 'browser' && !_.isEmpty(params)) {
            this.newWebViewPage(params)
            return
        }

        if (type === 'miniprogram') {
            // h5打开小程序
            openMiniProgress(params)
            return
        }

        if (type === 'share') {
            // 分享
            const shareType = params.type
            const url = params.url

            const shareHanlder = shareData => {
                ShareUtils.shareWithOptions(shareData).catch(err => Toast.showShortCenter(err.message))
            }

            // 如果是网络图片需要先下载下来
            if (shareType === 'bigPic' && /(http|https):\/\/([\w.]+\/?)\S*/.test(url)) {
                const download = async () => {
                    let rootPath = `${RNFS.DocumentDirectoryPath}/_download/image`
                    if (Platform.OS === 'android') {
                        rootPath = `${RNFS.ExternalDirectoryPath}/_download/image`
                    }

                    if (!(await RNFS.exists(rootPath))) {
                        await RNFS.mkdir(rootPath)
                    }

                    const fileType = _.last(url.split('?')[0].split('/'))
                    const toFile = `${rootPath}/${fileType}`

                    RNFS.exists(toFile)
                        .then((result: boolean) => {
                            const goShare = () => {
                                const shareData = {
                                    ...params,
                                    url: toFile,
                                }
                                shareHanlder(shareData)
                            }
                            if (!result) {
                                const downTask = RNFS.downloadFile({
                                    fromUrl: url,
                                    toFile,
                                    progressInterval: 100,
                                    progressDivider: 100,
                                })
                                downTask.promise.then(goShare).catch(_.noop)
                            } else {
                                goShare()
                            }
                        })
                        .catch(_.noop)
                }
                download()
            } else {
                shareHanlder(params)
            }
            return
        }
    }

    onNavigationStateChange = (event: any) => {
        const webProps = this.getWebViewProps()

        if (_.isFunction(webProps.onNavigationStateChange)) {
            const isParsed = webProps.onNavigationStateChange(event) === true
            if (isParsed) return
        }

        const { url } = event
        if (_.isEmpty(url.trim())) return
        if (_.startsWith(url, 'goto://browser?')) {
            const [, targetUrl = ''] = url.match("url='(.*)'")

            try {
                Linking.openURL(targetUrl)
            } catch (e) {
                Toast.showShortCenter(e.message)
            }
            return
        }

        if (!_.startsWith(url, 'http')) {
            try {
                Linking.openURL(url)
            } catch (e) {
                Toast.showShortCenter(e.message)
            }
            return
        }
    }

    newWebViewPage = (targetUrl: string = '') => {
        const { pushTo = _.noop } = this.props
        const webviewProps = this.getWebViewProps()
        pushTo({
            page: 'WebViewWithPusher',
            params: {
                uri: targetUrl,
                webViewProps: {
                    originWhitelist: ['*'],
                    javaScriptEnabled: true,
                    injectedJavaScript: this.getInjectMethods(),
                    renderError: () => <View style={styles.adWebViewErrorView} />,
                    ...webviewProps,
                    scrollEnabled: true,
                    bounces: true,
                    // onMessage: this.onMessage,
                },
            },
        })
    }

    getWebViewProps = () => {
        const { webViewProps = {} } = this.props
        return webViewProps
    }

    _getRef = (ref: any) => {
        const { getRef } = this.props
        if (getRef) {
            getRef(ref)
        }
        this._webViewRef = ref
    }

    render() {
        const props = {
            ...this.props,
            ...this.props.navParams,
        }
        const { style, webViewStyle, uri = '', headers = {}, onError, hideNav = false, isAppendOemInfo = true } = props

        const newWebViewProps = this.getWebViewProps()

        return (
            <View style={[styles.container, style]}>
                <NavWebView
                    style={[styles.navContainer, webViewStyle]}
                    hideNav={hideNav}
                    source={{
                        uri,
                        headers,
                    }}
                    getRef={this._getRef}
                    webViewProps={{
                        injectedJavaScript: this.getInjectMethods(),
                        renderError: () => <View style={styles.adWebViewErrorView} />,
                        onError,
                        isAppendOemInfo,
                        ...newWebViewProps,
                        onMessage: this.onMessage,
                        onNavigationStateChange: this.onNavigationStateChange,
                        onLoadEnd: () => {
                            this._webViewRef.postMessage('ON_READY')
                        },
                    }}
                />
            </View>
        )
    }
}

function mapProps(store) {
    const user = chooseUserInfo(store)

    return {
        userInfo: user,
    }
}

function mapAction(dispatch) {
    return {
        pushTo: compose(dispatch, pushRoute),
    }
}

export default WebViewWithPusher

```


[新版指南](./新版指南/index.md "新版指南")

[api](IT/前端框架/ReactNative/Webview/api/api.md "api")

[配置](IT/前端框架/ReactNative/Webview/配置/配置.md "配置")

[案例](IT/前端框架/ReactNative/Webview/案例/案例.md "案例")

[通讯](IT/前端框架/ReactNative/Webview/通讯/通讯.md "通讯")
