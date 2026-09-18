# 更新Service Worker

更新一个`servicework`，**最直接的办法就是修改servicework.js这个文件，** 当刷新浏览器时，浏览器尝试重新下载`servicework.js`脚本文件，**然后会与之前的版本比对，一旦发现文件内容不一致，就会进入更新流程。**

- 新的 `servicework` 被启动安装并触发 install事件。
- 安装成功后，新版 servicework 进入等待状态，此时页面的控制权还在老版 `servicework`手中。
- 当`servicework`**控制的所有终端都关闭之后**，**或者手动**\*\*`self.skipWaiting()，`****旧的 ****`servicework`**** 才能被终止，此时新的****`servicework`\*\***被激活，触发activate 事件。**
- 用户**再次访问页面，或刷新页面**，新的 service work 启动控制页面。
