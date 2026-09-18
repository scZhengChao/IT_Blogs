# 检测设备

## 目录

- [使用方法](#使用方法)
  - [检测设备类型](#检测设备类型)
  - [检测操作系统信息](#检测操作系统信息)
  - [获取屏幕分辨率](#获取屏幕分辨率)
  - [获取浏览器信息](#获取浏览器信息)
  - [示例代码](#示例代码)

```javascript 
npm install device.j

```


# 使用方法

## 检测设备类型

```javascript 
import { device } from 'device.js';

if (device.desktop()) {
  console.log('This is a desktop device.');
} else if (device.tablet()) {
  console.log('This is a tablet device.');
} else if (device.mobile()) {
  console.log('This is a mobile device.');
}


```


## 检测操作系统信息

```javascript 
import { os } from 'device.js';

if (os.name === 'Windows') {
  console.log('This device is running Windows.');
} else if (os.name === 'iOS') {
  console.log('This device is running iOS.');
} else if (os.name === 'Android') {
  console.log('This device is running Android.');
}


```


## 获取屏幕分辨率

```javascript 
import { screen } from 'device.js';

console.log(`Screen resolution: ${screen.width}x${screen.height}`);


```


## 获取浏览器信息

```javascript 
import { browser } from 'device.js';

console.log(`Browser name: ${browser.name}`);
console.log(`Browser version: ${browser.version}`);


```


## 示例代码

```javascript 
import { device, screen } from 'device.js';

const body = document.querySelector('body');

if (device.mobile() || screen.width < 768) {
  body.style.backgroundColor = '#f2f2f2';
} else if (device.tablet()) {
  body.style.backgroundColor = '#cccccc';
} else if (device.desktop()) {
  body.style.backgroundColor = '#999999';
}

```
