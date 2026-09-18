# 与Typescript一同使用

如果您正在使用 `TypeScript` 构建 `Electron` 应用程序，您需要给通过 `context bridge` 暴露的 `API` 添加类型。 渲染进程的 `window` 对象将不会包含正确扩展类型，除非给其添加了 [类型声明](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html "类型声明")。

例如，在这个 `preload.ts` 脚本中：

```javascript 
// preload.ts
contextBridge.exposeInMainWorld('electronAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```


您可以创建一个 `interface.d.ts` 类型声明文件，并且全局增强 `Window` 接口。

```javascript 
// interface.d.ts
export interface IElectronAPI {
  loadPreferences: () => Promise<void>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}

```


以上所做皆是为了确保在您编写渲染进程的脚本时， TypeScript 编译器将会知晓`electronAPI`合适地在您的全局`window`对象中

```javascript 
// renderer.ts
window.electronAPI.loadPreferences()

```
