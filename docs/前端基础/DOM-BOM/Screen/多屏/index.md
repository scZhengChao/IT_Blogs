# 多屏

## 目录

- [window.screen.isExtended 属性](#windowscreenisExtended-属性)
- [getScreenDetails() 方法](#getScreenDetails-方法)
- [screenschange 事件](#screenschange-事件)
- [currentscreenchange 事件](#currentscreenchange-事件)
- [change 事件](#change-事件)
- [新的全屏选项](#新的全屏选项)
- [Polyfill](#Polyfill)

[ developer.chrome.com/site/zh/articles/multi-screen-window-placement/index.md at main · GoogleChrome/developer.chrome.com · GitHub The frontend, backend, and content source code for developer.chrome.com - developer.chrome.com/site/zh/articles/multi-screen-window-placement/index.md at main · GoogleChrome/developer.chrome.com https://github.com/GoogleChrome/developer.chrome.com/blob/main/site/zh/articles/multi-screen-window-placement/index.md](https://github.com/GoogleChrome/developer.chrome.com/blob/main/site/zh/articles/multi-screen-window-placement/index.md " developer.chrome.com/site/zh/articles/multi-screen-window-placement/index.md at main · GoogleChrome/developer.chrome.com · GitHub The frontend, backend, and content source code for developer.chrome.com - developer.chrome.com/site/zh/articles/multi-screen-window-placement/index.md at main · GoogleChrome/developer.chrome.com https://github.com/GoogleChrome/developer.chrome.com/blob/main/site/zh/articles/multi-screen-window-placement/index.md")

[index.md](./assets/file/index_OS3_fRmafx.md "index.md")

### `window.screen.isExtended` 属性

要确定是否有多个屏幕连接到我的设备，我访问 `window.screen.isExtended` 属性。它返回 `true` 或 `false` 。对于我的设置，它返回 `true` 。

```javascript 
window.screen.isExtended;
// Returns `true` or `false`.
```


### `getScreenDetails()` 方法

现在我知道当前设置是多屏幕的，我可以使用 `Window.getScreenDetails()` 获取有关第二个屏幕的更多信息。调用此函数将显示一个权限提示，询问我该站点是否可以在我的屏幕上打开和放置窗口。该函数返回一个使用 `ScreenDetailed` 对象解析的承诺。在连接 iPad 的 MacBook Pro 13 上，这包括一个带有两个 `ScreenDetailed` 对象的 `screens` 字段：

```typescript 
await window.getScreenDetails();
/* Output from my MacBook Pro 13″ with the iPad attached:
{
  currentScreen: ScreenDetailed {left: 0, top: 0, isPrimary: true, isInternal: true, devicePixelRatio: 2, …}
  oncurrentscreenchange: null
  onscreenschange: null
  screens: [{
    // The MacBook Pro
    availHeight: 969
    availLeft: 0
    availTop: 25
    availWidth: 1680
    colorDepth: 30
    devicePixelRatio: 2
    height: 1050
    isExtended: true
    isInternal: true
    isPrimary: true
    label: ""
    left: 0
    onchange: null
    orientation: ScreenOrientation {angle: 0, type: "landscape-primary", onchange: null}
    pixelDepth: 30
    top: 0
    width: 1680
  },
  {
    // The iPad
    availHeight: 999
    availLeft: 1680
    availTop: 25
    availWidth: 1366
    colorDepth: 24
    devicePixelRatio: 2
    height: 1024
    isExtended: true
    isInternal: false
    isPrimary: false
    label: ""
    left: 1680
    onchange: null
    orientation: ScreenOrientation {angle: 0, type: "landscape-primary", onchange: null}
    pixelDepth: 24
    top: 0
    width: 1366
  }]
}
*/
```


`screens` 阵列中提供了有关连接屏幕的信息。请注意 iPad 的 `left` 值如何从 `1680` 开始，这正是内置显示器的 `width`。这使我能够准确地确定屏幕的逻辑排列方式（彼此相邻、彼此重叠等）。现在还有每个屏幕的数据来显示它是否是 `isInternal` 以及是否是 `isPrimary` 。请注意，内置屏幕[不一定是主屏幕](<https://osxdaily.com/2010/04/27/set-the-primary-display-mac/#:~:text=Click on the Display icon,primary display for your Mac> "不一定是主屏幕")。

`currentScreen` 字段是对应于当前 `window.screen` 的活动对象。对象在跨屏幕窗口放置或设备更改时更新。

### `screenschange` 事件

现在唯一缺少的是一种检测我的屏幕设置何时发生变化的方法。新事件 `screenschange` 正有这种作用：只要修改了屏幕坐标，它就会触发。 （请注意，事件名称中的“screens”是复数形式。）这意味着只要新屏幕或现有屏幕（在 Sidecar 的情况下是物理或虚拟的）插入或拔出，就会触发事件。

请注意，您需要异步查找新屏幕详细信息， `screenschange` 事件本身不提供此数据。要查找屏幕详细信息，请使用缓存 `Screens` 界面中的实时对象。

```typescript 
const screenDetails = await window.getScreenDetails();
let cachedScreensLength = screenDetails.screens.length;
screenDetails.addEventListener('screenschange', (event) => {
  if (screenDetails.screens.length !== cachedScreensLength) {
    console.log(
      `The screen count changed from ${cachedScreensLength} to ${screenDetails.screens.length}`,
    );
    cachedScreensLength = screenDetails.screens.length;
  }
});
```


### `currentscreenchange` 事件

如果我只对当前屏幕的变化（即活动对象 `currentScreen` 的值）感兴趣，我可以监听 `currentscreenchange` 事件。

```typescript 
const screenDetails = await window.getScreenDetails();
screenDetails.addEventListener('currentscreenchange', async (event) => {
  const details = screenDetails.currentScreen;
  console.log('The current screen has changed.', event, details);
});
```


### `change` 事件

最后，如果我只对具体屏幕的更改感兴趣，我可以侦听该屏幕的 `change` 事件。

```typescript 
const firstScreen = (await window.getScreenDetails())[0];
firstScreen.addEventListener('change', async (event) => {
  console.log('The first screen has changed.', event, firstScreen);
});
```


### 新的全屏选项

到目前为止，您可以通过恰当命名的 [requestFullScreen()](https://developer.mozilla.org/docs/Web/API/Element/requestFullscreen "requestFullScreen()") 方法请求以全屏模式显示元素。该方法采用 `options` 参数，您可以在其中传递 [FullscreenOptions](https://developer.mozilla.org/docs/Web/API/FullscreenOptions "FullscreenOptions") 。到目前为止，它唯一的属性是 [navigationUI](https://developer.mozilla.org/docs/Web/API/FullscreenOptions/navigationUI "navigationUI") 。 Multi-Screen Window Placement API 添加了一个新的 `screen` 属性，允许您确定在哪个屏幕上启动全屏视图。例如，如果要使主屏幕全屏：

```javascript 
try {
  const primaryScreen = (await getScreenDetails()).screens.filter((screen) => screen.isPrimary)[0];
  await document.body.requestFullscreen({ screen: primaryScreen });
} catch (err) {
  console.error(err.name, err.message);
}
```


### Polyfill

无法对 Multi-Screen Window Placement API 进行 polyfill，但您可以填充其形状，以便您可以专门针对新 API 进行编码：

```javascript 
if (!('getScreenDetails' in window)) {
  // Returning a one-element array with the current screen,
  // noting that there might be more.
  window.getScreenDetails = async () => [window.screen];
  // Set to `false`, noting that this might be a lie.
  window.screen.isExtended = false;
}
```
