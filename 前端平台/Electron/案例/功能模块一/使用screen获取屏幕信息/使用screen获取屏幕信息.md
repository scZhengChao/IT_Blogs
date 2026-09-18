# 使用screen获取屏幕信息

`screen` 是 `Electron` 提供的模块之一，用于获取有关屏幕和显示器的信息，以及执行与屏幕相关的操作。以下是一些常用的 `screen` 模块方法和属性：

1. `screen.getPrimaryDisplay():` 获取主显示器的信息，包括位置、大小等。
2. `screen.getAllDisplays():` 返回所有连接的显示器的信息，以数组形式返回。
3. `screen.getDisplayNearestPoint(point):` 返回距离指定点最近的显示器的信息。
4. `screen.getDisplayMatching(rect):` 返回与指定矩形相交的显示器的信息。
5. `screen.getCursorScreenPoint():` 返回鼠标指针当前所在的屏幕坐标。
6. `screen.getMenuBarHeight():` 返回菜单栏的高度。
7. `screen.getPrimaryDisplay().workArea:` 返回主显示器工作区信息，即屏幕去除菜单栏等系统区域的区域。
8. `screen.getPrimaryDisplay().bounds:` 返回主显示器整体信息，包括整个显示器的坐标和尺寸。
9. `screen.getPrimaryDisplay().size:` 返回主显示器的分辨率，即屏幕的宽度和高度。
10. `screen.on(event, callback):` 监听屏幕相关事件，例如 display-added、display-removed 等，允许你在显示器变化时进行相应的操作。
