# axios

## 目录

- [request](#request)
- [AdaptorInterceptor](#AdaptorInterceptor)
  - [IResponse](#IResponse)
- [AuthorizationInterceptor](#AuthorizationInterceptor)
- [error-handler](#error-handler)
- [JwInterceptor](#JwInterceptor)

# request

```typescript 
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { AdaptorInterceptor } from '../interceptors/adptor-interface.interceptor';
import { AuthorizationInterceptor } from '../interceptors/authorization.interceptor';
import { ErrorInterceptor, errorNotification } from '../interceptors/error-handler.interceptor';
import { BASE_URL, BIZ_STATUS_OK, SUCCESS_RETURN_CODE } from '../constants/request.constant';
import type { IResponse } from '../types/models/response.model';
import { JwInterceptor } from '../interceptors/jw.interceptor';

function checkBizStatus(data: IResponse<any>): boolean {
  // return data.returnCode === BIZ_STATUS_OK || data.returnCode === SUCCESS_RETURN_CODE;  // Z21响应
  return (
    data.returnCode === BIZ_STATUS_OK ||
    data.returnCode === SUCCESS_RETURN_CODE ||
    (data as any).msg === 'succeed'
  ); // 兼容模板工程 rocketAPI 返回
}

axios.create({ baseURL: BASE_URL, timeout: 3000 });

axios.interceptors.request.use(AuthorizationInterceptor.requestInterceptor);
axios.interceptors.request.use(JwInterceptor.requestInterceptor);
axios.interceptors.response.use(AuthorizationInterceptor.responseInterceptor);
axios.interceptors.response.use(AdaptorInterceptor.responseInterceptor);
axios.interceptors.response.use(
  ErrorInterceptor.responseInterceptor,
  ErrorInterceptor.responseInterceptorError,
);

/**
 * 所有后端请求，请调用该接口，该接口将后端返回的非suc000均重新映射为error
 * @param config
 */
interface RequestConfig extends AxiosRequestConfig {
  needAutoNoticeError?: boolean;
}
const request = function <T>(config: RequestConfig): Promise<IResponse<T>> {
  return axios(config).then(
    (response: AxiosResponse<IResponse<T>>) => {
      const { needAutoNoticeError = true } = config;
      const isCorrectBizStatus = checkBizStatus(response.data);
      if (isCorrectBizStatus) {
        return response.data;
      } else {
        if (needAutoNoticeError) errorNotification(response.data?.errorMsg);
        return Promise.reject(response.data);
      }
    },
    (res: AxiosResponse<null>) => Promise.reject(res.data || (res as any)),
  );
};

export default request;

```


# AdaptorInterceptor

```typescript 
import type { AxiosResponse } from 'axios';
import type { IResponse } from '../types/models/response.model';

// 这里做后端返回适配，需要将IServerResponse<T>类型统一转换为前端标准IResponse<T>
export const AdaptorInterceptor = {
  responseInterceptor: (response: AxiosResponse<IResponse<any>>) => {
    return response;
  },
};

```


### IResponse

```typescript 
export interface IResponse<T> {
  returnCode: string;
  errorMsg?: string;
  body: T;
}
```


# AuthorizationInterceptor

```typescript 
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AppConstant } from '../constants/app.constant';

// 该值表示浏览器中的鉴权key
const HTTP_HEADER_AUTHORIZATION = 'Authorization';
const HTTP_HEADER_AUTHORIZATION_small = 'authorization';

export const AuthorizationInterceptor = {
  requestInterceptor: (config: AxiosRequestConfig) => {
    const jwtToken = window.sessionStorage.getItem(AppConstant.AUTH_HEADER_NAME);
    if (jwtToken && config.headers) {
      config.headers[HTTP_HEADER_AUTHORIZATION] = JSON.parse(jwtToken);
    }
    return config;
  },
  responseInterceptor: (response: AxiosResponse<any>) => {
    // Authorization 为后端header头里面携带的内容
    const jwtToken =
      response.headers[HTTP_HEADER_AUTHORIZATION_small] ||
      response.headers[HTTP_HEADER_AUTHORIZATION];
    if (jwtToken) {
      window.sessionStorage.setItem(AppConstant.AUTH_HEADER_NAME, JSON.stringify(jwtToken));
    }
    return response;
  },
};

```


# error-handler

```typescript 
import type { AxiosError, AxiosResponse } from 'axios';
// @ts-ignore
import { history } from 'umi';
import {
  HTTP_STATUS_400,
  HTTP_STATUS_403,
  HTTP_STATUS_404,
  IGNORE_ERROR_URLS,
} from '../constants/request.constant';
import type { IResponse } from '../types/models/response.model';

function shouldIgnoreError(url: string): boolean {
  return IGNORE_ERROR_URLS.some(($url) => url.indexOf($url) !== -1);
}

export let errorNotification: (message?: string) => void;  

// 这个地方由外面传进来；估计是为了适配不同的ui框架
export const configErrorNotification = (callback: (message: string) => void) => {
  errorNotification = callback;
};

export const ErrorInterceptor = {
  responseInterceptor: (response: AxiosResponse<IResponse<any>>) => {
    if (shouldIgnoreError(response.request.url)) {
      return response;
    }
    return response;
  },
  responseInterceptorError: (response: AxiosError<any>) => {
    const { status } = response.response || {};
    switch (status) {
      case HTTP_STATUS_400:
      case HTTP_STATUS_403:
        errorNotification(response.response?.statusText);
        history.push('/error');
        break;
      case HTTP_STATUS_404:
        errorNotification('请求错误');
        history.push('/404');
        break;
      default:
        errorNotification(response.response?.statusText);
        break;
    }
    return Promise.reject(response);
  },
};

```


# JwInterceptor

其他配置

```typescript 

import type { AxiosRequestConfig } from 'axios';
import { environment } from '../environment';

export const JwInterceptor = {
  requestInterceptor: (config: AxiosRequestConfig) => {
    config.headers['X-B3-BusinessId'] = environment.bdPlatUnitId;
    return config;
  },
};


```
