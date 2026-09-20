# 打开文件对话框

`dialog.showOpenDialog([browserWindow, ]options)`打开一个文件选择对话框，允许用户选择一个或多个文件。

1. `browserWindow`（可选）：父窗口的引用。如果不传递此参数，对话框将会成为一个模态窗口。
2. `options`：配置对象，可以包含以下属性：
   1. `defaultPath`：字符串，指定对话框的默认路径。
   2. `filters`：数组，定义文件类型过滤器。
   3. `properties`：数组，包含 openFile、openDirectory、multiSelections 等属性，决定对话框的行为。
