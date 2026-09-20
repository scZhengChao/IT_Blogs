# 包装根节点

[   https://ebee.paas.cmbchina.cn/docs/umijs/zh-CN/docs/runtime-config](https://ebee.paas.cmbchina.cn/docs/umijs/zh-CN/docs/runtime-config "   https://ebee.paas.cmbchina.cn/docs/umijs/zh-CN/docs/runtime-config")

```typescript 
import zhCN from 'antd/lib/locale/zh_CN';
import React, { Component } from 'react';
import 'moment/locale/zh-cn';

configErrorNotification((msg: ReactNode) => {
  message.error(msg);
});

logInit();

console.log(`ebee-pc-admin-boilerplate is running，current env is：${process.env.active}`);

class App extends Component {
  //openModel没有上下文, 需要单独处理
  render() {
    // @ts-ignore
    return <ConfigProvider locale={zhCN}>{this.props.children}</ConfigProvider>;
  }
}

export function rootContainer(container: any) {
  return React.createElement(App, null, container);
}

```
