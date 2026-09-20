# 清单：安全建议

为加强程序安全性，你至少应当遵循下列规则：

1. [只加载安全的内容](https://www.electronjs.org/zh/docs/latest/tutorial/security#1-only-load-secure-content "只加载安全的内容")
2. [禁止在所有渲染器中使用Node.js集成显示远程内容](https://www.electronjs.org/zh/docs/latest/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content "禁止在所有渲染器中使用Node.js集成显示远程内容")
3. [在所有渲染器中启用上下文隔离](https://www.electronjs.org/zh/docs/latest/tutorial/security#3-enable-context-isolation "在所有渲染器中启用上下文隔离")
4. [启用进程沙盒化](https://www.electronjs.org/zh/docs/latest/tutorial/security#4-enable-process-sandboxing "启用进程沙盒化")
5. [在所有加载远程内容的会话中使用 ](https://www.electronjs.org/zh/docs/latest/tutorial/security#5-handle-session-permission-requests-from-remote-content "在所有加载远程内容的会话中使用 ")[ses.setPermissionRequestHandler()](https://www.electronjs.org/zh/docs/latest/tutorial/security#5-handle-session-permission-requests-from-remote-content "ses.setPermissionRequestHandler()")[.](https://www.electronjs.org/zh/docs/latest/tutorial/security#5-handle-session-permission-requests-from-remote-content ".")
6. [不要禁用 ](https://www.electronjs.org/zh/docs/latest/tutorial/security#6-do-not-disable-websecurity "不要禁用 ")[webSecurity](https://www.electronjs.org/zh/docs/latest/tutorial/security#6-do-not-disable-websecurity "webSecurity")
7. [定义一个](https://www.electronjs.org/zh/docs/latest/tutorial/security#7-define-a-content-security-policy "定义一个")[Content-Security-Policy](https://www.electronjs.org/zh/docs/latest/tutorial/security#7-define-a-content-security-policy "Content-Security-Policy")并设置限制规则(如：`script-src 'self'`)
8. [不要设置 ](https://www.electronjs.org/zh/docs/latest/tutorial/security#8-do-not-enable-allowrunninginsecurecontent "不要设置 ")[allowRunningInsecureContent](https://www.electronjs.org/zh/docs/latest/tutorial/security#8-do-not-enable-allowrunninginsecurecontent "allowRunningInsecureContent")[ 为 true](https://www.electronjs.org/zh/docs/latest/tutorial/security#8-do-not-enable-allowrunninginsecurecontent " 为 true")
9. [不要开启实验性功能](https://www.electronjs.org/zh/docs/latest/tutorial/security#9-do-not-enable-experimental-features "不要开启实验性功能")
10. [不要使用](https://www.electronjs.org/zh/docs/latest/tutorial/security#10-do-not-use-enableblinkfeatures "不要使用")[enableBlinkFeatures](https://www.electronjs.org/zh/docs/latest/tutorial/security#10-do-not-use-enableblinkfeatures "enableBlinkFeatures")
11. [\<webview>](https://www.electronjs.org/zh/docs/latest/tutorial/security#11-do-not-use-allowpopups-for-webviews "<webview>")[：不要使用 ](https://www.electronjs.org/zh/docs/latest/tutorial/security#11-do-not-use-allowpopups-for-webviews "：不要使用 ")[allowpopups](https://www.electronjs.org/zh/docs/latest/tutorial/security#11-do-not-use-allowpopups-for-webviews "allowpopups")
12. [\<webview>](https://www.electronjs.org/zh/docs/latest/tutorial/security#12-verify-webview-options-before-creation "<webview>")[：验证选项与参数](https://www.electronjs.org/zh/docs/latest/tutorial/security#12-verify-webview-options-before-creation "：验证选项与参数")
13. [禁用或限制网页跳转](https://www.electronjs.org/zh/docs/latest/tutorial/security#13-disable-or-limit-navigation "禁用或限制网页跳转")
14. [禁用或限制新窗口创建](https://www.electronjs.org/zh/docs/latest/tutorial/security#14-disable-or-limit-creation-of-new-windows "禁用或限制新窗口创建")
15. [不要对不可信的内容使用 ](https://www.electronjs.org/zh/docs/latest/tutorial/security#15-do-not-use-shellopenexternal-with-untrusted-content "不要对不可信的内容使用 ")[shell.openExternal](https://www.electronjs.org/zh/docs/latest/tutorial/security#15-do-not-use-shellopenexternal-with-untrusted-content "shell.openExternal")
16. [使用当前版本的 Electron](https://www.electronjs.org/zh/docs/latest/tutorial/security#16-use-a-current-version-of-electron "使用当前版本的 Electron")
17. [验证所有 IPC 消息的 ](https://www.electronjs.org/zh/docs/latest/tutorial/security#17-validate-the-sender-of-all-ipc-messages "验证所有 IPC 消息的 ")[sender](https://www.electronjs.org/zh/docs/latest/tutorial/security#17-validate-the-sender-of-all-ipc-messages "sender")
18. [Check which fuses you can change](https://www.electronjs.org/zh/docs/latest/tutorial/security#19-check-which-fuses-you-can-change "Check which fuses you can change")

如果你想要自动检测错误的配置或是不安全的模式，可以使用[electronegativity](https://github.com/doyensec/electronegativity "electronegativity") 关于在使用Electron进行应用程序开发中的潜在薄弱点或者bug，您可以参考[开发者与审核人员指南](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf "开发者与审核人员指南").

[1. 只加载安全的内容](<./1. 只加载安全的内容/index.md> "1. 只加载安全的内容")

[2. 不要为远程内容启用 Node.js 集成](<./2. 不要为远程内容启用 Node.js 集成/index.md> "2. 不要为远程内容启用 Node.js 集成")

[3. 上下文隔离](<./3. 上下文隔离/index.md> "3. 上下文隔离")

[4. 启用进程沙盒化](<./4. 启用进程沙盒化/index.md> "4. 启用进程沙盒化")

[5. 处理来自远程内容的会话许可的请求](<./5. 处理来自远程内容的会话许可的请求/index.md> "5. 处理来自远程内容的会话许可的请求")

[6. 不要禁用 webSecurity](<./6. 不要禁用 webSecurity/index.md> "6. 不要禁用 webSecurity")

[7. Content Security Policy（内容安全策略）](<./07-内容安全策略/index.md> "7. Content Security Policy（内容安全策略）")

[8. 不要设置 allowRunningInsecureContent 为 true](<./08-禁用不安全内容/index.md> "8. 不要设置 allowRunningInsecureContent 为 true")

[9. 不要开启实验性功能](<./9. 不要开启实验性功能/index.md> "9. 不要开启实验性功能")

[10. 不要使用enableBlinkFeatures](<./10-禁用Blink实验特性/index.md> "10. 不要使用enableBlinkFeatures")

[11. 不要在 WebViews 中使用 allowpopups](<./11-禁用弹出窗口/index.md> "11. 不要在 WebViews 中使用 allowpopups")

[12. 创建WebView前确认其选项](<./12. 创建WebView前确认其选项/index.md> "12. 创建WebView前确认其选项")

[13. 禁用或限制网页跳转](<./13. 禁用或限制网页跳转/index.md> "13. 禁用或限制网页跳转")

[14. 禁用或限制新窗口创建](<./14. 禁用或限制新窗口创建/index.md> "14. 禁用或限制新窗口创建")

[15. 不要对不可信的内容使用 shell.openExternal](<./15-外部链接安全/index.md> "15. 不要对不可信的内容使用 shell.openExternal")

[16. 使用当前版本的 Electron](<./16. 使用当前版本的 Electron/index.md> "16. 使用当前版本的 Electron")

[17. 验证所有 IPC 消息的 sender](<./17. 验证所有 IPC 消息的 sender/index.md> "17. 验证所有 IPC 消息的 sender")

[18.您应该使用自定义协议而不是file://protocol来提供本地页面。](./18-使用自定义协议/index.md "18.您应该使用自定义协议而不是file://protocol来提供本地页面。")

[19.检查可以更换哪些保险丝](./19.检查可以更换哪些保险丝/index.md "19.检查可以更换哪些保险丝")
