# braft-editor

[ npm: braft-editor Rich Text Editor Based On Draft.js. Latest version: 2.3.9, last published: 4 years ago. Start using braft-editor in your project by running \`npm i braft-editor\`. There are 248 other projects in the np https://www.npmjs.com/package/braft-editor](https://www.npmjs.com/package/braft-editor " npm: braft-editor Rich Text Editor Based On Draft.js. Latest version: 2.3.9, last published: 4 years ago. Start using braft-editor in your project by running `npm i braft-editor`. There are 248 other projects in the np https://www.npmjs.com/package/braft-editor")

[ Braft Editor | 基于DraftJS的强扩展性React富文本编辑器  http://braft.margox.cn/](http://braft.margox.cn/ " Braft Editor | 基于DraftJS的强扩展性React富文本编辑器  http://braft.margox.cn/")

```javascript 
import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'

export default class BasicDemo extends React.Component {

  state = {
    editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'), // 设置编辑器初始内容
    outputHTML: '<p></p>'
  }

  componentDidMount () {
    this.isLivinig = true
    // 3秒后更改编辑器内容
    setTimeout(this.setEditorContentAsync, 3000)
  }

  componentWillUnmount () {
    this.isLivinig = false
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML()
    })
  }

  setEditorContentAsync = () => {
    this.isLivinig && this.setState({
      editorState: BraftEditor.createEditorState('<p>你好，<b>世界!</b><p>')
    })
  }

  render () {

    const { editorState, outputHTML } = this.state

    return (
      <div>
        <div className="editor-wrapper">
          <BraftEditor
            value={editorState}
            onChange={this.handleChange}
          />
        </div>
        <h5>输出内容</h5>
        <div className="output-content">{outputHTML}</div>
      </div>
    )

  }

}

```
