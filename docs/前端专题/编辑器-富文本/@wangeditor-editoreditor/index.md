# @wangeditor/editoreditor

## 目录

- [官网](#官网)
- [React](#React)
  - [使用](#使用)
  - [配置](#配置)
  - [调用 API](#调用-API)

## 官网

```typescript 
npm install @wangeditor/editor --save

```


[   https://www.wangeditor.com/](https://www.wangeditor.com/ "   https://www.wangeditor.com/")

![](./assets/image/image_7qGQ7eE6TG.png)

## React

```bash 

yarn add @wangeditor/editor
# 或者 npm install @wangeditor/editor --save

yarn add @wangeditor/editor-for-react
# 或者 npm install @wangeditor/editor-for-react --save


```


### 使用

```react tsx 
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

function MyEditor() {
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
    // const [editor, setEditor] = useState(null)                   // JS 语法

    // 编辑器内容
    const [html, setHtml] = useState('<p>hello</p>')

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        setTimeout(() => {
            setHtml('<p>hello world</p>')
        }, 1500)
    }, [])
    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = { }  // TS 语法
    // const toolbarConfig = { }                        // JS 语法

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {    // TS 语法
    // const editorConfig = {                         // JS 语法
        placeholder: '请输入内容...',
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])
    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
            <div style={{ marginTop: '15px' }}>
                {html}
            </div>
        </>
    )
}

export default MyEditor


```


### 配置

可通过 `toolbarConfig` 和 `editorConfig` 来修改菜单栏和编辑器的配置，详细文档参考

- [*工具栏配置*](https://www.wangeditor.com/v5/toolbar-config.html "工具栏配置")\* \*- 插入新菜单，屏蔽某个菜单等
- [*编辑器配置*](https://www.wangeditor.com/v5/editor-config.html "编辑器配置")\* -\* 兼听各个**生命周期**，自定义**粘贴**
- [*菜单配置*](https://www.wangeditor.com/v5/menu-config.html "菜单配置")\* \*- 配置颜色、字体、字号、链接校验、**上传图片、视频**等

### 调用 API

当编辑器渲染完成之后，即可调用它的 API 。参考\* *[*编辑器 API*](https://www.wangeditor.com/v5/API.html "编辑器 API")* 。\*

```react tsx 
function insertText() {
    if (editor == null) return
    editor.insertText('hello')
}

return (
    <>
        <button onClick={insertText}>insert text</button>
        <div style={{ border: '1px solid #ccc', zIndex: 100}}>
            <Toolbar ... />
            <Editor ... />
        </div>
    </>
)

```
