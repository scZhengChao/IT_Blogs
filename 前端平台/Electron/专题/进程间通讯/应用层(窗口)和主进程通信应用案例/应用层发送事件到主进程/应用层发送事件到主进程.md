# 应用层发送事件到主进程

## 目录

- [desktopHeader.tsx](#desktopHeadertsx)

我们封装好了方法之后就可以进行使用了，我们做一个简单的案例，应用的header，有`最小化，最大化，关闭，和恢复按钮`，在点击时使用`ipcRendererSend`方法将**事件传给主进程并进行相应操作**。

由于我们需要一个状态判断显示`最大化按钮还是恢复按钮`因此需要监听**主进程在执行最大化和恢复之后传回的事件和当前状态**。

#### desktopHeader.tsx

```javascript 
import React, { memo, useState, useEffect } from 'react'
import './desktopHeader.less'
import SvgIcon from '@components/svgIcon'
import {
    ipcRendererSend,
    ipcRendererOn,
    ipcRendererRemoveListener
} from '@common/desktopUtils'
import logoImage from '@assets/logo.png'

function DesktopHeader() {

    const [windowIsMax, setWindowIsMax] = useState(false)

    useEffect(() => {
        const handleSetIsMax = (event: any, isMax: boolean) => {
            setWindowIsMax(isMax)
        }
        ipcRendererOn('mainWindowIsMax', handleSetIsMax)
        return () => {
            ipcRendererRemoveListener('mainWindowIsMax', handleSetIsMax)
        }
    }, [])

    const handleWindow = (eventName: string) => {
        ipcRendererSend(`mainWindow-${eventName}`)
    }

    return (
        <div className="desktop-header">
            <div className="header-logo-box">
                <img src={logoImage} alt="" />
                <span>Harbour</span>
            </div>
            <div className="header-handle-box">
                <div className="handle-icon-box" onClick={handleWindow.bind(this, 'min')}>
                    <SvgIcon
                        svgName="min-icon"
                        needPointer
                        iconColor="#737780"
                        iconSize={24}
                    />
                </div>
                {windowIsMax ? (
                    <div className="handle-icon-box" onClick={handleWindow.bind(this, 'restore')}>
                        <SvgIcon
                            svgName="restore-icon"
                            needPointer
                            iconColor="#737780"
                            iconSize={24}
                        />
                    </div>
                ) : (
                    <div className="handle-icon-box" onClick={handleWindow.bind(this, 'max')}>
                        <SvgIcon
                            svgName="max-icon"
                            needPointer
                            iconColor="#737780"
                            iconSize={24}
                        />
                    </div>
                )}
                <div className="handle-icon-box handle-close-icon" onClick={handleWindow.bind(this, 'close')}>
                    <SvgIcon
                        svgName="close-icon"
                        needPointer
                        hasHover
                        iconColor="#737780"
                        hoverColor="#fff"
                        iconSize={24}
                    />
                </div>
            </div>
        </div>
    )
}

export default memo(DesktopHeader)

```
