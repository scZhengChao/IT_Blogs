# 调试本地模块

调试原生模块可以使用 Visual Studio 2017（运行在开发计算机上）和运行在目标设备上的对应的 [Visual Studio 远程调试器](https://learn.microsoft.com/en-us/visualstudio/debugger/remote-debugging-cpp?view=vs-2019 "Visual Studio 远程调试器") 来完成。 调试步骤：

1. 在目标设备上通过\_命令提示符\_启动 `.exe` 应用(传递 `--inspect-brk` 参数可以在加载任何 native modules 之前暂停应用)。
2. 在开发计算机上启动 Visual Studio 2017。
3. 通过选择 *调试 >* 访问并输入设备的 IP 地址和 Visual Studio 远程调试器工具显示的端口号，连接到目标设备。
4. 单击 *刷新*，然后选择 [相应的 Electron 进程以附加](https://www.electronjs.org/zh/docs/latest/development/debugging-on-windows "相应的 Electron 进程以附加")。
5. 您可能需要确保应用中原生模块的所有符号都已经正确加载。 要配置此内容，请进入 Visual Studio 2017\_Debug > Options...\_，and add the folders containing your `.pdb` symbols under *Debugging > Symbols*.
6. 附加后，设置适当的断点并使用 Chrome 的 [用于Node的远程工具](https://www.electronjs.org/zh/docs/latest/tutorial/debugging-main-process "用于Node的远程工具") 恢复JavaScript的执行。
