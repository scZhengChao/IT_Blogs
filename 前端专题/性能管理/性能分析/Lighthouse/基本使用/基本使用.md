# 基本使用

## 目录

- [基本介绍](#基本介绍)
- [核心性能指标](#核心性能指标)
  - [1. 加载性能指](#1-加载性能指)
  - [2. 交互性能指标](#2-交互性能指标)
- [使用方式](#使用方式)
  - [1. Chrome DevTools 中使用](#1-Chrome-DevTools-中使用)
  - [2. 命令行使用](#2-命令行使用)
  - [3. 作为 Node 模块使用](#3-作为-Node-模块使用)

## 基本介绍

Lighthouse 可以：

- 作为 Chrome 扩展程序运行
- 通过 Chrome DevTools 使用
- 作为 Node.js 模块运行
- 通过命令行运行
- 集成到持续集成系统中

## 核心性能指标

Lighthouse 主要测量以下关键性能指标：

### 1. 加载性能指

- **First Contentful Paint (FCP)**: 首次内容绘制时间
- **Largest Contentful Paint (LCP)**: 最大内容绘制时间
- **Speed Index**: 页面内容视觉填充速度
- **Total Blocking Time (TBT)**:\*\* 总阻塞时间\*\*
- **Time to Interactive (TTI)**: 可交互时间

### 2. 交互性能指标

- **First Input Delay (FID)**: **首次输入延迟**
- **Interaction to Next Paint (INP)**: 交互到下一次绘制(Chrome 118+)

## 使用方式

### 1. Chrome DevTools 中使用

1. 打开 Chrome 浏览器
2. 按 F12 或右键选择"检查"打开开发者工具
3. 切换到"Lighthouse"标签页
4. 选择设备类型(移动/桌面)和要测试的类别
5. 点击"生成报告"

### 2. 命令行使用

安装 Node.js 后：

```bash 
npm install -g lighthouse
lighthouse https://example.com --view
```


常用参数：

- `--preset=desktop`或`--preset=mobile`
- `--output=json/html/csv`
- `--throttling.cpuSlowdownMultiplier=4`(模拟低端设备)
- `--only-categories=performance`(仅测试性能)

### 3. 作为 Node 模块使用

```javascript 
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function run() {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {port: chrome.port, output: 'html'};
  const runnerResult = await lighthouse('https://example.com', options);
  
  console.log('性能得分:', runnerResult.lhr.categories.performance.score * 100);
  await chrome.kill();
}

run();
```
