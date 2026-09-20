# 模拟路由传参

## 目录

- [ 组件](#-组件)
  - [push 方法](#push-方法)
  - [判断组件](#判断组件)
  - [使用](#使用)

# &#x20;组件

```javascript 
history.push('/detail?visible=true')

```


根据search 参数来判断

- **由于 push的是相同页面；弹框是铺满全屏的；看上去和路由调整一模一样；**
- **且页面的数据会缓存状态不会丢失；**
- **点击返回按钮；页面正常返回；状态不会丢失**

#### push 方法

```javascript 
import reduce  from 'lodash/reduce'
import startsWith from 'lodash/startsWith'
import { useLocation, useNavigate } from 'react-router-dom';
const searchToJson = (search) => {
    if (!search) {
        return {};
    }
    const newSearch = startsWith(search, '?') ? search.slice(1) : search;

    return newSearch
        .split('&')
        .map((_p) => _p.split('='))
        .reduce(
            (obj, [key, value]) => ({
                ...obj,
                [key]: value ? decodeURIComponent(value) : undefined,
            }),
            {},
        );
};
const getLocationSearch = () => {
    if (!window.location.href.includes('?')) {
        return '';
    }
    return window.location.href.split('?').pop();
};
const concatLocationSearch = (locationSearch, search) => {
    const locationSearchObj = searchToJson(locationSearch);
    const searchObj = searchToJson(search);
    const newSearchObj = { ...locationSearchObj, ...searchObj };

    return reduce(newSearchObj, (result, value, key) => result.concat(`${key}=${value}&`), '').slice(0, -1);
};
// @ts-ignore
export type unknownAny = any;
interface HistoryProps {
    location?:unknownAny;
    navigate?:unknownAny;
    search?:string;
    replace?:boolean;
    state?:unknownAny
}
export const getLocationSearch = () => {
    if (!window.location.href.includes('?')) {
        return '';
    }
    return window.location.href.split('?').pop();
};
const pushSearch = ({ location, navigate, search, replace, state }:HistoryProps) => {
    navigate(
        {
            pathname: location.pathname,
            search: concatLocationSearch(getLocationSearch(), search),
        },
        { replace, state },
    );
};
export const usePushSearch = ()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const pushSearchFunc = (search: string, replace?: boolean) => {
        pushSearch({ location, navigate, search, replace });
    };
    return {
        pushSearchFunc
    }
}
```


#### 判断组件

```javascript 
import React from 'react';
import { Popup } from 'antd-mobile';
import { PopupProps } from 'antd-mobile/es/components/popup';
import { useSearchParams } from 'react-router-dom';
import { getDefaultPopupBodyStyle } from '@root/utils/popupUtils';
import { getSearchQueryIndex } from '@root/hooks/usePushSearch';

interface WithVisiblePopupProps extends PopupProps {
  visibleQuery?: string;
}

const POPUP_BASE_INDEX = 500;

export default function WithVisiblePopup(props: WithVisiblePopupProps) {
  const [searchParams] = useSearchParams();

  const getVisibleWithRouteSearch = () => {
    return Boolean(searchParams.get(props.visibleQuery));
  };

  const zIndex = getSearchQueryIndex(props.visibleQuery) + POPUP_BASE_INDEX;

  return getVisibleWithRouteSearch() ? (
    <Popup
      visible
      destroyOnClose
      position="right"
      style={{ zIndex }}
      {...props}
      bodyStyle={{ ...getDefaultPopupBodyStyle(), ...props.bodyStyle }}
    />
  ) : null;
}
```


#### 使用

```javascript 
const CarApply = () => {
  const history = useHistory();
  const { pushSearchFunc } = usePushSearch()
  const goSelect = ()=>{
    pushSearchFunc('address-select=true')
  }
  return <div className={styles['car-apply']}>
    <input/>
    <button onClick={goSelect}>測試</button>
    <WithVisiblePopup visibleQuery="address-select">
      <CustomSelect/>
    </WithVisiblePopup>
  </div>;
};
```
