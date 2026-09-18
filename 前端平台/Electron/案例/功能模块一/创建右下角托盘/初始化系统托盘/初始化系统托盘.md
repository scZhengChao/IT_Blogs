# 初始化系统托盘

## 目录

- [initTray](#initTray)
- [plugins](#plugins)
- [\_\_static](#__static)
- [store](#store)
- [createWindow](#createWindow)

#### initTray

```typescript 
/*
 * @Author: fzf404
 * @Date: 2022-05-24 22:06:34
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2022-12-23 12:02:26
 * @Description: tary 托盘
 */
import { app, Menu, shell, Tray } from 'electron'

import { pluginList } from '@common/plugin'
import { cget, cset, store } from 'lib/storage'
import { createWindow } from './window'
import {isMac,log  } from '@common/utils'

import pkg from 'root/package.json'

// 托盘全局变量
let TrayMenu

// 初始化托盘菜单
const initMenu = () => {
  // 自启动列表
  let openPlugins = cget('config', 'open', [])

  // 托盘菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      label: `Monit - ${pkg.version}`,
      click: () => {
        shell.openExternal('https://monit.fzf404.art')
      },
    },
    // 分割线
    { type: 'separator' },
    // 全部插件列表
    {
      label: '插件列表',
      // 全部插件列表
      submenu: [
        // 开启全部插件
        {
          label: '全部开启',
          click: () => {
            pluginList.map((item) => createWindow(item.name))
          },
        },
        // 分割线
        { type: 'separator' },
        // 全部插件列表
        ...pluginList.map((item) => {
          return {
            label: `${item.name} - ${item.description}`,
            click: () => {
              // 创建窗口
              createWindow(item.name)
            },
          }
        }),
      ],
    },
    // 插件自启菜单
    {
      label: '插件自启',
      submenu: [
        // 自启全部插件
        {
          label: '全部自启',
          click: () => {
            cset(
              'config',
              'open',
              pluginList.map((item) => item.name)
            )
            initMenu()
          },
        },
        // 分割线
        { type: 'separator' },
        // 全部插件列表
        ...pluginList.map((item) => {
          return {
            label: `${item.name} - ${item.description}`,
            type: 'checkbox',
            checked: openPlugins.includes(item.name),
            click: () => {
              // 查找插件是否自启
              const index = openPlugins.indexOf(item.name)
              // 切换插件自启动状态
              if (index > -1) {
                openPlugins.splice(index, 1)
              } else {
                openPlugins.push(item.name)
              }
              // 保存插件自启动状态
              cset('config', 'open', openPlugins)
            },
          }
        }),
        // 分割线
        { type: 'separator' },
        {
          label: '全部关闭',
          click: () => {
            cset('config', 'open', [])
            initMenu()
          },
        },
      ],
    },
    // 分割线
    { type: 'separator' },

    // 开机自启
    {
      label: '开机自启',
      click: () => {
        app.setLoginItemSettings({ openAtLogin: true })
      },
    },
    // 插件设置
    {
      label: '插件设置',
      click: () => {
        createWindow('config')
      },
    },
    // 检查更新
    {
      label: '检查更新',
      click: () => {
        shell.openExternal('https://github.com/fzf404/Monit/releases')
      },
    },
    // 分割线
    { type: 'separator' },
    // 重置应用
    {
      label: '重置',
      click: () => {
        store.clear()
        app.relaunch()
        app.quit()
      },
    },
    {
      label: '重启',
      click: () => {
        app.relaunch()
        app.quit()
      },
    },
    // 退出应用
    { label: '退出', click: () => app.quit() },
  ])

  // 设置托盘菜单
  TrayMenu.setContextMenu(contextMenu)
}

// 初始化托盘
export const initTray = () => {
  // 托盘 Logo
  const trayLogo = isMac ? `${__static}/icons/tray.png` : `${__static}/icons/icon.png`
  log(trayLogo,'-trayLogo---绝对路径')
  // 托盘提示
  const trayTip = 'Monit'
  // 初始化托盘
  TrayMenu = new Tray(trayLogo)
  // 设置托盘提示
  TrayMenu.setToolTip(trayTip)

  // 初始化托盘菜单
  initMenu()
}

```


#### plugins

```typescript 
/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2022-12-10 18:25:55
 * @Description: plugin 配置
 */
interface pluginList {
  name: string
  size: number[]
  description: string
  debug?: boolean
}

/**
 * @description: 插件列表
 */
const plugin: pluginList[] = [
  { name: 'github', size: [4, 2], description: '监控' },
  { name: 'juejin', size: [4, 3], description: '监控' },
  { name: 'music', size: [4, 2], description: '音乐' },
  { name: 'todo', size: [2, 3], description: '待办' },
  { name: 'clock', size: [4, 2], description: '时钟' },
  { name: 'image', size: [4, 3], description: '图像' },
  { name: 'camera', size: [4, 3], description: '相机' },
  { name: 'welcome', size: [2, 2], description: '欢迎' },
  { name: 'count', size: [2, 2], description: '计数器' },
  { name: 'config', size: [2, 3], description: '设置' },
  // debug 不会被打包
  { name: 'weather', size: [4, 2], description: '天气', debug: true },
  { name: 'live2d', size: [4, 3], description: '角色跟踪', debug: true },
  { name: 'bilibili', size: [2, 2], description: '监控', debug: true },
]

// 生产模式不开启 debug 插件
export const pluginList = plugin.filter(({ debug }) => process.env.NODE_ENV === 'development' || !debug)

```


#### \_\_static

```typescript 
 define: {
   __static:JSON.stringify(resolve('./src/static')) ,
 }

```


#### store

```typescript 
/*
 * @Author: fzf404
 * @Date: 2022-05-18 23:06:12
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2022-12-10 17:53:57
 * @Description: 存储配置
 */
import Store from 'electron-store'

import { reactive, watch } from 'vue'

import { getValue, setValue } from '../main/ipc'

// 初始化 store
export const store = new Store({
  // 版本更新初始化
  migrations: {
    '>=0.3.0': (store) => {
      store.clear()
    },
    '>=0.7.0': (store) => {
      if (store.has('_config')) {
        store.set('config', store.get('_config'))
        store.delete('_config')
      }
    },
  },
})

/**
 * @description: 保存值
 * @param { string } node 节点名
 * @param { string } key 键名
 * @param { Object } value 值
 */
export const cset = (node: string, key: string, value: Object): void => {
  store.set(node + '.' + key, value) // 存储值
}

/**
 * @description: 读取值
 * @param { string } node 节点名
 * @param { string } key 键名
 * @param { Object } define 默认值
 * @return { Object } 值
 */
export const cget = (node: string, key: string, define: Object): Object => {
  return store.get(node + '.' + key) ?? define // 读取值
}

/**
 * @description: 响应式 storage
 * @param { Record<string, Object> } source 原始参数
 * @param { Record<K, Function> } callback 回调函数
 * @return { Source } 响应式参数
 */

type Source = Record<string, Object>

export const storage = <K extends keyof Source>(source: Source, callback?: Record<K, Function>): Source => {
  // 包装为响应式数据
  const target = reactive(source)
  // 遍历响应式数据
  for (const key in target) {
    // 读取默认值
    target[key] = getValue(key, target[key])
    // 监听值修改
    watch(
      () => target[key],
      async (val) => {
        // 保存值
        setValue(key, val)
        // 运行处理函数
        if (callback?.[key as K]) {
          await callback[key as K](val)
        }
      },
      { deep: true }
    )
  }
  // 返回响应式数据
  return target
}

```


#### createWindow

```typescript 
/*
 * @Author: fzf404
 * @Date: 2022-05-26 19:48:32
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2022-10-16 21:44:39
 * @Description: window 管理
 */

import { BrowserWindow } from 'electron'
import { isDebug } from '@common//utils'
import { pluginList } from '@common/plugin'
import { cget } from 'lib/storage'
import { initWinEvent } from '@common/utils'

// 窗口网格大小
const BasicMesh = 100

// 创建窗口
export const createWindow = (name) => {
  // 判断插件存在
  const plugin = pluginList.find((item) => item.name === name)
  if (!plugin) {
    return
  }

  // 判断窗口启动
  const isOpen = BrowserWindow.getAllWindows().find((item) => item.title === name)

  if (isOpen) {
    return isOpen.show()
  }

  // 窗口大小
  const size = plugin.size

  // 窗口位置
  const x = cget(name, 'x', undefined)
  const y = cget(name, 'y', undefined)
  const top = cget(name, 'top', false)

  // 创建窗口
  const win = new BrowserWindow({
    x: x, // 窗口位置
    y: y,
    title: name, // 窗口名
    width: size[0] * BasicMesh, // 窗口大小
    height: size[1] * BasicMesh,
    alwaysOnTop: top, // 置顶

    frame: false, // 隐藏边框
    resizable: false, // 不可改变大小
    hasShadow: false, // 隐藏阴影
    transparent: true, // 窗口透明
    skipTaskbar: true, // 隐藏任务栏图标
    fullscreenable: false, // 禁止全屏
    roundedCorners: false, // 阻止圆角

    // vibrancy: 'dark', // 毛玻璃效果
    visualEffectState: 'active', // 保持窗口激活

    webPreferences: {
      nodeIntegration: true, // 开启 Node 集成
      contextIsolation: false, // 关闭上下文隔离
      webSecurity: false, // 关闭跨域安全限制
      sandbox:false,
    },
  })

  // 根据模式启动应用
  if (isDebug) {
    // 加载应用
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '#/' + name)
  } else {
    win.loadURL('monit://./index.html#/' + name) // 加载应用
  }
  // 监听事件
  initWinEvent(win, name)
}

// 开机自启窗口
export const initWindow = () => {
  const openPlugins:any[] = cget('config', 'open', [])
  // 是否存在自启插件
  if (openPlugins.length) {
    openPlugins.forEach((item) => {
      createWindow(item)
    })
  } else {
    createWindow('welcome')
  }
}

```
