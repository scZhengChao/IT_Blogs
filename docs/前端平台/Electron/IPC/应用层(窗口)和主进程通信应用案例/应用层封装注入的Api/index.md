# 应用层封装注入的Api

## 目录

- [desktopUtils.ts](#desktopUtilsts)

我们将`ipcRender和process`注入到应用层后，为了后期的维护我们可以将所有的方法再次进行封装，放在一个统一的文件中。

封装`desktopUtils.ts`

#### `desktopUtils.ts`

```javascript 
declare global {
    interface Window {
        ipcRenderer: {
            send: (...args: any[]) => void,
            on: (channel: string, listener: (...args: any[]) => void) => void,
            once: (channel: string, listener: (...args: any[]) => void) => void,
            removeListener: (channel: string, listener: (...args: any[]) => void) => void,
            sendSync: (...args: any[]) => any,
            invoke: (...args: any[]) => Promise<any>,
        },
        process: {
            NODE_ENV: 'development' | 'production'
        }
    }
}

type ArgsType = string | number | boolean | { [key: string]: any } | any[]

export const isDesktop = () => {
    return !!window.ipcRenderer
}

export const getProcessNodeEnv = () => {
    return window?.process.NODE_ENV
}

export const ipcRendererSend = (eventName: string, ...args: ArgsType[]) => {
    window.ipcRenderer?.send(eventName, ...args)
}

export const ipcRendererSendSync = (eventName: string, ...args: ArgsType[]) => {
    return window.ipcRenderer?.sendSync(eventName, ...args)
}

export const ipcRendererInvoke = (eventName: string, ...args: ArgsType[]) => {
    try {
        return window.ipcRenderer?.invoke(eventName, ...args)
    } catch (error) {
        console.error(`Error invoking IPC: ${eventName}`, error)
        return null
    }
}

export const ipcRendererOn = (eventName: string, listener: (...args: ArgsType[]) => void) => {
    window.ipcRenderer?.on(eventName, listener)
}

export const ipcRendererOnce = (eventName: string, listener: (...args: ArgsType[]) => void) => {
    window.ipcRenderer?.once(eventName, listener)
}

export const ipcRendererRemoveListener = (eventName: string, listener: (...args: ArgsType[]) => void) => {
    window.ipcRenderer?.removeListener(eventName, listener)
}

```


这里的**isDesktop**`是用来判断当前是否是桌面端的，因为很多时候我们使用`electron`开发的桌面端应用需要兼容web端，``由于应用层代码几乎相同``，我们只需要在一些情况下特别处理桌面端的逻辑即可。`

`由于web端的window上一定没有ipcRender这个属性，因此可以根据window.ipcRenderer来判断
`**getProcessNodeEnv**是用来获取当前桌面端的运行环境的，这里可以返回当前是开发环境还是生产环境，如果是web端的话，直接用`process.env.NODE_ENV`即可判断
