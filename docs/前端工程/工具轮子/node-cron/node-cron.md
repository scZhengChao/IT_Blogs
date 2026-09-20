# node-cron

## 目录

- [为什么选择cron库？](#为什么选择cron库)
  - [定时任务开发痛点](#定时任务开发痛点)
  - [cron库优势](#cron库优势)
- [快速入门](#快速入门)
  - [安装与引入](#安装与引入)
  - [第一个定时任务](#第一个定时任务)
- [Cron表达式详解](#Cron表达式详解)
  - [标准格式](#标准格式)
  - [常用模式示例](#常用模式示例)
  - [特殊符号说明](#特殊符号说明)
- [进阶使用技巧](#进阶使用技巧)
  - [动态任务管理](#动态任务管理)
  - [错误处理](#错误处理)
- [典型应用场景](#典型应用场景)
  - [数据轮询与缓存更新](#数据轮询与缓存更新)
  - [定时提醒功能](#定时提醒功能)
  - [自动化报表生成](#自动化报表生成)

## 为什么选择cron库？

### 定时任务开发痛点

- 原生setInterval的时间误差累积
- 难以实现复杂的时间规则（如每月最后一天）
- 缺乏任务生命周期管理

### cron库优势

- **精准调度**：基于Cron表达式的时间控制
- **丰富功能**：支持时区、任务启停、错误处理
- **跨平台**：Node.js和浏览器环境通用

## 快速入门

### 安装与引入

```text 
npm install node-cron

```


![](https://mmbiz.qpic.cn/mmbiz_png/TZL4BdZpLdjKk3WY94zspgRXBFbUwFfL8WKgdwSor4lbALYQvyqLZaRiaRUvE8ialkicJZ32Y3sLCGu3fribGqBfpA/640?wx_fmt=png\&from=appmsg)

### 第一个定时任务

![](https://mmbiz.qpic.cn/mmbiz_png/TZL4BdZpLdjKk3WY94zspgRXBFbUwFfLf7qn5MdcL4CJn57B1nLEyEHwzvICmHf1OFwvem2YxGOA7Vd13VKicXQ/640?wx_fmt=png\&from=appmsg)

## Cron表达式详解

### 标准格式

![](https://mmbiz.qpic.cn/mmbiz_png/TZL4BdZpLdjKk3WY94zspgRXBFbUwFfLRkl65cZf4wQ90zVelib6wULyvVSjJbZiaI4GianEgf9TjD1kce25TgGibw/640?wx_fmt=png\&from=appmsg)

### 常用模式示例

![](https://mmbiz.qpic.cn/mmbiz_png/TZL4BdZpLdjKk3WY94zspgRXBFbUwFfL0mk7H15nicFARn8xOQy4hwt1Pl0OVyQID9icUx9mZdVEldIUUvqO8AUw/640?wx_fmt=png\&from=appmsg)

### 特殊符号说明

- \*：任意值
- ,：值列表（5,10,15）
- -：范围（1-5）
- /：步长（ \*/5）

## 进阶使用技巧

### 动态任务管理

![](https://mmbiz.qpic.cn/mmbiz_png/TZL4BdZpLdjKk3WY94zspgRXBFbUwFfLibXib6TqabVNydoOiarl9Aq7ic3GIC6ysXBibVtqjLRweawryqoVbOHxKNg/640?wx_fmt=png\&from=appmsg)

### 错误处理

![](https://mmbiz.qpic.cn/mmbiz_png/TZL4BdZpLdjKk3WY94zspgRXBFbUwFfLvjhyDb4XtibNekaOSSm6ibqHuqPOJ5GBPfvlRcgzFlUcf20HMdLGExUQ/640?wx_fmt=png\&from=appmsg)

## 典型应用场景

### 数据轮询与缓存更新

![](https://mmbiz.qpic.cn/mmbiz_png/TZL4BdZpLdjKk3WY94zspgRXBFbUwFfLYuziaNzSgA4JgicslcweMZCfOKZUQLz0Yt5oicMZ0emwvOsQ8vpExgcoA/640?wx_fmt=png\&from=appmsg)

### 定时提醒功能

![](https://mmbiz.qpic.cn/mmbiz_png/TZL4BdZpLdjKk3WY94zspgRXBFbUwFfLT33vaweDwLIrqJao7QxoGgyzf2nZUSJcFD2Fmj6hp2K3uehQeOEIBg/640?wx_fmt=png\&from=appmsg)

### 自动化报表生成

![](https://mmbiz.qpic.cn/mmbiz_png/TZL4BdZpLdjKk3WY94zspgRXBFbUwFfL0MTOcNApVekGecKpbMYmr0mDFLNnia2QUckYZXSOMz49J0NHltxBvEw/640?wx_fmt=png\&from=appmsg)

[使用 node-cron 在 Node.js 中调度任务](<使用 node-cron 在 Node.js 中调度任务.md> "使用 node-cron 在 Node.js 中调度任务")
