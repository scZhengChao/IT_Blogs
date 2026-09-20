# 封装

## 目录

- [参考一](#参考一)
- [参考二](#参考二)

# 参考一

![](https://mmbiz.qpic.cn/mmbiz_png/YBFV3Da0NwsVfeU8hYqxIHI52Hp9KI4Fsj8ORtDxYaOCH0cdV83OnFhviau4zK5ibVHEfJmic7ZKibNvpc3ujfFReA/640?wx_fmt=png\&wxfrom=5\&wx_lazy=1\&wx_co=1)

业务处理函数： `src/api/tool.ts`

```javascript 
const handleRequestHeader = (config) => {
 config['xxxx'] = 'xxx'
 
 return config
}

const handleAuth = (config) => {
 config.header['token'] = localStorage.getItem('token') || token || ''
 return config
}
const handleNetworkError = (errStatus) => {
    let errMessage = '未知错误'
    if (errStatus) {
        switch (errStatus) {
            case 400:
                errMessage = '错误的请求'
                break
            case 401:
                errMessage = '未授权，请重新登录'
                break
            case 403:
                errMessage = '拒绝访问'
                break
            case 404:
                errMessage = '请求错误,未找到该资源'
                break
            case 405:
                errMessage = '请求方法未允许'
                break
            case 408:
                errMessage = '请求超时'
                break
            case 500:
                errMessage = '服务器端出错'
                break
            case 501:
                errMessage = '网络未实现'
                break
            case 502:
                errMessage = '网络错误'
                break
            case 503:
                errMessage = '服务不可用'
                break
            case 504:
                errMessage = '网络超时'
                break
            case 505:
                errMessage = 'http版本不支持该请求'
                break
            default:
                errMessage = `其他连接错误 --${errStatus}`
        }
    } else {
        errMessage = `无法连接到服务器！`
    }

    message.error(errMessage)
}

const handleAuthError = (errno) => {
 const authErrMap: any = {
   '10031': '登录失效，需要重新登录', // token 失效
   '10032': '您太久没登录，请重新登录~', // token 过期
   '10033': '账户未绑定角色，请联系管理员绑定角色',
   '10034': '该用户未注册，请联系管理员注册用户',
   '10035': 'code 无法获取对应第三方平台用户',
   '10036': '该账户未关联员工，请联系管理员做关联',
   '10037': '账号已无效',
   '10038': '账号未找到',
 }
 
 if (authErrMap.hasOwnProperty(errno)) {
  message.error(authErrMap[errno])
  // 授权错误，登出账户
  logout()
  return false
 }

 return true
}

const handleGeneralError = (errno, errmsg) => {
 if (err.errno !== '0') {
  meessage.error(err.errmsg)
  return false
 }

 return true
}
```


通用操作封装： `src/api/server.ts`

```javascript 
import axios from 'axios'
import { message } from 'antd'

import {
 handleChangeRequestHeader,
 handleConfigureAuth,
 handleAuthError,
 handleGeneralError,
 handleNetworkError
} from './tools'

type Fn = (data: FcResponse<any>) => unknown

interface IAnyObj {
    [index: string]: unknown
}

interface FcResponse<T> {
    errno: string
    errmsg: string
    data: T
}

axios.interceptors.request.use((config) => {
  config = handleChangeRequestHeader(config)
 config = handleConfigureAuth(config)
 return config
})

axios.interceptors.response.use(
    (response) => {
        if (response.status !== 200) return Promise.reject(response.data)
        handleAuthError(response.data.errno)
        handleGeneralError(response.data.errno, response.data.errmsg)
        return response
    },
    (err) => {
        handleNetworkError(err.response.status)
        Promise.reject(err.response)
    }
)

export const Get = <T,>(url: string, params: IAnyObj = {}, clearFn?: Fn): Promise<[any, FcResponse<T> | undefined]> =>
  new Promise((resolve) => {
    axios
      .get(url, { params })
      .then((result) => {
        let res: FcResponse<T>
        if (clearFn !== undefined) {
          res = clearFn(result.data) as unknown as FcResponse<T>
        } else {
          res = result.data as FcResponse<T>
        }
        resolve([null, res as FcResponse<T>])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })

export const Post = <T,>(url: string, data: IAnyObj, params: IAnyObj = {}): Promise<[any, FcResponse<T> | undefined]> => {
  return new Promise((resolve) => {
    axios
      .post(url, data, { params })
      .then((result) => {
        resolve([null, result.data as FcResponse<T>])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}
```


# 参考二

vue 项目

> 📌src/utils/request.js

```javascript 
import axios from 'axios'
import store from '@/store'
import { $alert, $error } from './message'
import { getToken, getIdToken } from '@/utils/auth'
import Config from '@/settings'
import i18n from '@/lang'
import { tryShowLoading, tryHideLoading } from './loading'
import { getLinkToken, setLinkToken } from '@/utils/auth'
import Vue from 'vue'

const TokenKey = Config.TokenKey
const RefreshTokenKey = Config.RefreshTokenKey
const LinkTokenKey = Config.LinkTokenKey
import Cookies from 'js-cookie'

const getTimeOut = () => {
  let time = 10
  const url = process.env.VUE_APP_BASE_API + 'system/requestTimeOut'
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (xhr.responseText) {
        try {
          const response = JSON.parse(xhr.responseText)
          if (response.success) {
            Cookies.set('request-time-out', response.data)
            time = response.data
          } else {
            $error('系统异常，请联系管理员')
          }
        } catch (e) {
          $error('系统异常，请联系管理员')
        }
      } else {
        $error('网络异常，请联系网管')
      }
    }
  }

  xhr.open('get', url, false)
  xhr.send()
  return time
}
const time = getTimeOut()
let service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: time ? time * 1000 : 10000
})

// request interceptor
service.interceptors.request.use(
  config => {
    const CancelToken = axios.CancelToken
    const idToken = getIdToken()
    if (idToken) {
      config.headers[Config.IdTokenKey] = idToken
    }

    if (store.getters.token) {
      config.headers[TokenKey] = getToken()
    }
    let linkToken = null
    if ((linkToken = getLinkToken()) !== null) {
      config.headers[LinkTokenKey] = linkToken
    }
    if (!linkToken) {
      linkToken = store.getters.linkToken
      config.headers[LinkTokenKey] = linkToken
    }

    if (i18n.locale) {
      const lang = i18n.locale.replace('_', '-')
      config.headers['Accept-Language'] = lang
    }
    config.loading && tryShowLoading(store.getters.currentPath)

    config.cancelToken = new CancelToken(function executor(c) {
      Vue.prototype.$currentHttpRequestList.set(config.url, c)
    })

    return config
  },
  error => {
    error.config.loading && tryHideLoading(store.getters.currentPath)
    return Promise.reject(error)
  }
)

service.setTimeOut = time => {
  service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: time
  })
}

// 请根据实际需求修改
service.interceptors.response.use(response => {
  response.config.loading && tryHideLoading(store.getters.currentPath)
  checkAuth(response)
  Vue.prototype.$currentHttpRequestList.delete(response.config.url)
  return response.data
}, error => {
  const config = error.response && error.response.config || error.config
  const headers = error.response && error.response.headers || error.response || config.headers
  config.loading && tryHideLoading(store.getters.currentPath)

  let msg
  if (error.response) {
    checkAuth(error.response)
    msg = error.response.data.message || error.response.data
  } else {
    msg = error.message
  }
  !config.hideMsg && (!headers['authentication-status']) && $error(msg)
  return Promise.reject(error)
})

const checkAuth = response => {
  if (response.headers['authentication-status'] === 'login_expire') {
    const message = i18n.t('login.expires')
    // store.dispatch('user/setLoginMsg', message)
    $alert(message, () => {
      store.dispatch('user/logout').then(() => {
        location.reload()
      })
    }, {
      confirmButtonText: i18n.t('login.re_login'),
      showClose: false
    })
  }

  if (response.headers['authentication-status'] === 'invalid') {
    const message = i18n.t('login.tokenError')
    $alert(message, () => {
      store.dispatch('user/logout').then(() => {
        location.reload()
      })
    }, {
      confirmButtonText: i18n.t('login.re_login'),
      showClose: false
    })
  }
  // token到期后自动续命 刷新token
  if (response.headers[RefreshTokenKey]) {
    const refreshToken = response.headers[RefreshTokenKey]
    store.dispatch('user/refreshToken', refreshToken)
  }

  if (response.headers[LinkTokenKey.toLocaleLowerCase()] || (response.config.headers && response.config.headers[LinkTokenKey.toLocaleLowerCase()])) {
    const linkToken = response.headers[LinkTokenKey.toLocaleLowerCase()] || response.config.headers[LinkTokenKey.toLocaleLowerCase()]
    setLinkToken(linkToken)
    store.dispatch('user/setLinkToken', linkToken)
  }
}
export default service

```


> 📌main.js

```javascript 
Vue.prototype.$currentHttpRequestList = new Map()
Vue.prototype.$cancelRequest = function(cancelkey) {
  if (cancelkey) {
    if (cancelkey.indexOf('/**') > -1) {
      Vue.prototype.$currentHttpRequestList.forEach((item, key) => {
        key.indexOf(cancelkey.split('/**')[0]) > -1 && item('Operation canceled by the user.')
      })
    } else {
      Vue.prototype.$currentHttpRequestList.get(cancelkey) && Vue.prototype.$currentHttpRequestList.get(cancelkey)('Operation canceled by the user.')
    }
  }
}
```


> 📌使用

```javascript 
export const globalMapping = () => {
  return request({
    url: '/api/map/globalEntitys/0',
    method: 'get',
    loading: true
  })
}

// 取消视图请求
this.$cancelRequest('/chart/view/getData/**')
this.$cancelRequest('/api/link/viewDetail/**')
this.$cancelRequest('/static-resource/**')

```
