# 应用层预留接口打开devtool

在我们开发过程中，需要经常用的控制台，而我们在开发时直接打开控制台又有些不友好。还有生产环境中我们有时也需要打开控制台定位一些问题，但是`生产环境又不能那么轻易让用户能打开控制台`，因此我们可以在开发环境和生产环境分别预留一个接口打开控制台，`生产环境的方式要复杂一些`。
`实现思路
`我们可以在应用层监听键盘事件，当在开发环境中，按下`ctrl + F12`时，我们就打开控制台。
而在`生产环境`中我们需要设计的复杂一些，可以在代码中放一个不显示的输入框（设置宽高边框均为0，并且固定定位就好），当按下特殊组合键时，聚焦输入框，并输入`openDevtool`之后打开控制台，我这里设置的组合键为`ctrl + win + alt + F12`

```javascript 
import React, { useEffect, useRef, useCallback, ChangeEvent } from 'react'
import DesktopHeader from '@components/desktopHeader'
import './app.less'
import {
    isDesktop,
    getProcessNodeEnv,
    ipcRendererSend
} from '@common/desktopUtils'
import electronImg from '@assets/electronImg.png'

function App() {

    const openDevtoolInput = useRef<HTMLInputElement>(null)
    const isDevelopment = useRef(getProcessNodeEnv() === 'development')

    const openDevtool = useCallback(() => {
        ipcRendererSend('mainWindow-open-devtool')
    }, [])

    const openDevtoolInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        if (value === 'openDevtool') {
            openDevtool()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            const { ctrlKey, metaKey, altKey, key } = e
            // 开发环境使用ctrl + F12打开控制台
            if (isDevelopment.current && ctrlKey && key === 'F12') {
                openDevtool()
            }
            // 开发环境使用ctrl + win + alt + F12，然后键入'open devtool'打开控制台
            if (!isDevelopment.current && ctrlKey && metaKey && altKey && key === 'F12') {
                if (openDevtoolInput.current) {
                    openDevtoolInput.current.focus()
                }
            }
        })
    }, [openDevtool])

    return (
        <div id="electron-app">
            {!isDevelopment.current && (
                <input
                    className="open-devtool-input"
                    ref={openDevtoolInput}
                    type="text"
                    onChange={openDevtoolInputChange}
                    onBlur={(e) => { e.target.value = '' }}
                />
            )}
            {isDesktop() && <DesktopHeader />}
            <div className={isDesktop() ? 'desktop-app-content' : 'app-content'}>
                <div className="electron-img">
                    <img src={electronImg} alt="" />
                </div>
            </div>
        </div>
    )
}

export default App


```


在主进程监听该事件并打开控制台

```javascript 
ipcMain.on('mainWindow-open-devtool', () => {
    mainWindowIsExist() && mainWindow.webContents.openDevTools()
})


```
