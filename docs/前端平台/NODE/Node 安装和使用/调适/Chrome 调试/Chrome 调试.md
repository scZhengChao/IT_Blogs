# Chrome 调试

## 目录

- [4.1 Chrome 调试Node.js](#41-Chrome-调试Nodejs)
- [4.2 Chrome 中设置条件断点](#42-Chrome-中设置条件断点)

## 4.1 Chrome 调试Node.js

使用—inspect 标志启动 Node.js V8 检查器，命令如下：

```javascript 
node --inspect index.js
 node --inspect-brk app.js
```


此命令会在 127.0.0.1:9229 端口上启动侦听调试器：

```html 
Debugger listening on  ws://127.0.0.1:9229/4b0c9bad-9a25-499e-94ff-87c90afda461
```


如果大家在其他设备或 Docker 容器上运行 Node.js 应用，请确保端口 9229 可以访问，**具体使用以下命令授予远程访问权限：**

```javascript 
node --inspect=0.0.0.0:9229 index.js

```


与—inspect 不同，我们可以使用—inspect-brk 停止对首条语句的处理，以便逐步分步执行。打开 Chrome 网络浏览器（或者其他基于 Chromium 内核的浏览器），并在地址栏中输入 chrome://inspect：开启浏览器调试。

![](image_GrXsF8an8U.png)

几秒后，您的 Node.js 应用就会显示为 Remote Target。如果仍未找到，请选中 Discover network targets，而后单击 Configure 按钮为运行应用的设备添加 IP 地址和端口。

单击目标的 inspect 链接以启动 DevTools。对于熟悉在浏览器上调试客户端应用的朋友，整个操作流程应该非常顺畅。

![](image__Sx_DohjTT.png)

要直接从 DevTools 加载、编辑和保存文件，**请打开 Sources 窗格，单击 + Add folder to workspace 向工作区添加文件夹**。之后选择 Node.js 文件的位置，而后单击 Agree。现在，我们可以从左侧窗格或按 Ctrl | Cmd + P 并输入文件名，单击任何行号以设置断点。

![](image_SFlf6t2Dgi.png)

右侧面板显示以下内容：

- Watch 窗格中，您可**以通过单击 + 图标以输入变量名称并监视变量**
- Breakpoint 窗格中，您可以查看、启用和禁用断点
- Scope 窗格中，您可以检查所有变量
- Call Stack 窗格中，您可以查看达到此点前所调用的所有函数

## 4.2 Chrome 中设置条件断点

假设我们有一个运行 1000 次迭代的循环，但真正需要关注的是最后一次迭代的状态：

```javascript 
for (let i = 0; i < 1000; i++) {
  // set breakpoint here?
}

```


这里我们当然无需对着 resume 单击 999 次，**而是右键单击该行并选择 Add conditional breakpoint 添加条件断点，而后输入条件即可，例如 i=999：**

![](image_mNGvEuy_v3.png)
