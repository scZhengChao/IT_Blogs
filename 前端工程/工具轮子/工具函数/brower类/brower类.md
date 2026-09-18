# brower类

## 目录

- [浏览器/平台类型](#浏览器平台类型)
  - [是否是微信浏览器](#是否是微信浏览器)
  - [是否是移动端](#是否是移动端)
  - [是否是QQ浏览器](#是否是QQ浏览器)
  - [是否是爬虫](#是否是爬虫)
  - [是否ios ](#是否ios-)
- [文档元素](#文档元素)
  - [检查元素当前是否为聚焦状态](#检查元素当前是否为聚焦状态)
  - [检查当前 Tab 页是否在前台 ](#检查当前-Tab-页是否在前台-)
- [获取滚动的坐标](#获取滚动的坐标)
- [滚动到顶部](#滚动到顶部)
- [el是否在视口范围内](#el是否在视口范围内)
- [获取浏览器信息](#获取浏览器信息)
- [Html/Js/Dom](#HtmlJsDom)
  - [去除html标签](#去除html标签)
  - [动态引入js](#动态引入js)
  - [根据url地址下载](#根据url地址下载)
  - [el是否包含某个class](#el是否包含某个class)
  - [el添加某个class](#el添加某个class)
  - [el去除某个class](#el去除某个class)

# 浏览器/平台类型

```javascript 
export const ua = navigator.userAgent.toLowerCase();
```


## 是否是微信浏览器

```javascript 
export const isWeiXin = () => {
  return ua.match(/microMessenger/i) == 'micromessenger'
}
```


## 是否是移动端

```javascript 
export const isDeviceMobile = () => {
  return /android|webos|iphone|ipod|balckberry/i.test(ua)
}
```


## 是否是QQ浏览器

```javascript 
export const isQQBrowser = () => {
  return !!ua.match(/mqqbrowser|qzone|qqbrowser|qbwebviewtype/i)
}
```


## 是否是爬虫

```javascript 
export const isSpider = () => {
  return   /adsbot|googlebot|bingbot|msnbot|yandexbot|baidubot|robot|careerbot|seznambot|bot|baiduspider|jikespider|symantecspider|scannerlwebcrawler|crawler|360spider|sosospider|sogou web sprider|sogou orion spider/.test(ua)
}
```


## 是否ios&#x20;

```javascript 
export const isIos = () => {
  var u = navigator.userAgent;
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { 
    //安卓手机
    return false
  } else if (u.indexOf('iPhone') > -1) {
    //苹果手机
    return true
  } else if (u.indexOf('iPad') > -1) {
    //iPad
    return false
  } else if (u.indexOf('Windows Phone') > -1) {
    //winphone手机*
    return false
  } else {
    return false
  }
}
//检查当前用户是否为苹果设备 
const isAppleDevice = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
console.log(isAppleDevice);
```


# 文档元素

## 检查元素当前是否为聚焦状态

```javascript 
const elementIsInFocus = (el) => (el === document.activeElement);
elementIsInFocus(anyElement)
```


## 检查当前 Tab 页是否在前台&#x20;

```javascript 
//支持浏览器 最小化 和 tab页切换
document.addEventListener('visibilitychange',function(){  
    console.log(document.hidden)
    if(document.visibilityState === 'hidden'){
      console.log('hidden')
    }else if(document.visibilityState === 'visible'){
      console.log('visible')
    }else{
      console.log('other')
    }
  },false)
更加全面的; 还支持pc浏览器不再最上层
window.addEventListener('focus',function(){  })
window.addEventListener('blur',function(){   })
```


# 获取滚动的坐标

```javascript 
export const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});
```


# 滚动到顶部

```javascript 
export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
}
```


# el是否在视口范围内

```javascript 
export const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
  ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
  : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}
```


# 获取浏览器信息

```javascript 
function getExplorerInfo() {
        let t = navigator.userAgent.toLowerCase();
        return 0 <= t.indexOf("msie") ?
        { //ie < 11
            type:"IE",
            version:Number(t.match(/msie ([\d]+)/)[1])
        }
        :!!t.match(/trident\/.+?rv:(([\d.]+))/) ? 
        {// ie 11
            type:"IE",
            version: 11
        } : 
        0 <= t.indexOf("edge") ? 
        {
            type: "Edge",
            version: Number(t.match(/edge\/([\d]+)/)[1])
        } : 
        0 <= t.indexOf("firefox") ? 
        {
            type: "Firefox",
            version: Number(t.match(/firefox\/([\d]+)/)[1])
        } : 
        0 <= t.indexOf("chrome") ? 
        {
            type: "Chrome",
            version: Number(t.match(/chrome\/([\d]+)/)[1])
        } : 
        0 <= t.indexOf("opera") ? 
        {
            type: "Opera",
            version: Number(t.match(/opera.([\d]+)/)[1])
        } : 
        0 <= t.indexOf("Safari") ? 
        {
            type: "Safari",
            version: Number(t.match(/version\/([\d]+)/)[1])
        } : {
            type: t,
            version: -1
        }
    };
```


# Html/Js/Dom

## 去除html标签

```javascript 
export const removeHtmltag = (str) => {
    return str.replace(/<[^>]+>/g, '')
}
```


## 动态引入js

```javascript 
export const injectScript = (src) => {
  const s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = src;
  const t = document.getElementsByTagName('script')[0];
  t.parentNode.insertBefore(s, t);
}
```


## 根据url地址下载

```javascript 
export const download = (url) => {
  var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  var isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
  if (isChrome || isSafari) {
      var link = document.createElement('a');
      link.href = url;
      if (link.download !== undefined) {
        var fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
        link.download = fileName;
      }
 
      if (document.createEvent) {
        var e = document.createEvent('MouseEvents');
        e.initEvent('click', true, true);
        link.dispatchEvent(e);
        return true;
      }
  }
  if (url.indexOf('?') === -1) {
    url += '?download';
  }
  window.open(url, '_self');
  return true;
}
```


## el是否包含某个class

```javascript 
export const hasClass = (el, className) => {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)') 
  return reg.test(el.className)
  
}
```


## el添加某个class

```javascript 
export const addClass = (el, className) => {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}
```


## el去除某个class

```javascript 
export const removeClass = (el, className) => {
  if (!hasClass(el, className)) {
      return
  }
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
  el.className = el.className.replace(reg, ' ')
}
```
