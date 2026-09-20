# react-to-print

## 目录

- [react与antd结合使用实现分页打印功能以及插件](#react与antd结合使用实现分页打印功能以及插件)
  - [二、CSS实现打印样式](#二CSS实现打印样式)
- [打印页面中未显示的元素](#打印页面中未显示的元素)

[ npm: react-to-print Print React components in the browser. Latest version: 2.14.15, last published: 2 months ago. Start using react-to-print in your project by running \`npm i react-to-print\`. There are 265 other projects https://www.npmjs.com/package/react-to-print](https://www.npmjs.com/package/react-to-print " npm: react-to-print Print React components in the browser. Latest version: 2.14.15, last published: 2 months ago. Start using react-to-print in your project by running `npm i react-to-print`. There are 265 other projects https://www.npmjs.com/package/react-to-print")

# react与antd结合使用实现分页打印功能以及插件

1. 下载&#x20;

```javascript 
npm install --save react-to-print
```


1. 引用&#x20;

```javascript 
import ReactToPrint from 'react-to-print'
```


1. 触发按钮

```javascript 
<ReactToPrint
      trigger={() => <a href="#">点此打印</a>}
      content={() => this.componentRef}
/>

```


打印内容

```javascript 
<div ref={el => (this.componentRef = el)}>
        ....内容
<div/>

```


1. 将表格放入antd中的modal实现一次打印多张表格;

```javascript 
<Modal
    title="打印付款通知书"
    visible={printShow}
    onOk={this.handleOk}
    onCancel={handleCancel}
    footer={
      <div>
         <ReactToPrint
         trigger={() => <span>打印</span>}
           content={() => this.componentRef}
        />
      </div>
      //将打印功能的一个按钮放入到FOOTER里
    }
    width={1200}
>

```


1. 将ref 需要打印的内容放入外层DIV包着,然后使用`style={{pageBreakAfter:'always'}}` 实现样式分页打印

```javascript 
     <div ref={el => (this.componentRef = el)} >
          {listData.length > 0 ? listData.map((e, index) => (
            <div className="cardHtml" style={{ pageBreakAfter: 'always' }} key={index}>
              <Card title="付款通知书" bordered={false}  >
                <Form>

```


### 二、CSS实现打印样式

在使用浏览器进行页面打印时，我们经常遇到打印效果与网页效果差别很大的情况，比如当我们打印一个包含表格的页面时，表格的边框和样式在打印时可能会消失，这是因为我们需要给打印页面单独设置样式。

下面是一个简单的例子，这个例子通过 CSS 的 `media="print"` 属性来设置打印时需要的样式：

```javascript 

@media print {
  table, td, th {
    border: 1px solid black;
  }
}
```


以上代码中，我们通过 CSS 的 `media="print"` 属性来设置打印页面时需要的样式，通过选择器 `table, td, th` 来选中所有表格、单元格和表头，然后设置了它们的边框样式为1像素的黑线。

需要注意的是，CSS样式对一些打印参数的选择进行了限制，如不能改变页面方向、页面大小等参数，更多的要注意可以参考官方文档。

# 打印页面中未显示的元素

```react jsx 
//需要打印的页面
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import './style.less'
 
const PrintPage = () => {
  const componentRef = useRef();
 
  return (
    <div>
        <ReactToPrint
          trigger={() => <button>打印</button>}
          content={() => componentRef.current}
        pageStye={`@page {padding-top:10px}`}  //设置打印样式
        copyStyles = {false}   
            //这里是第一处设置：打印未显示元素的关键，默认情况copyStyles是为true的，
            //打印未显示的元素时，我们需要把它设置为false，这样打印出来的页面才不会是空白页。
        />
 
        //这里需要给打印的内容添加一个css类，类的样式如style.less文件：
        <div ref={componentRef} className='printContent'>
        这里是你要打印的内容
      </div>
    </div>
  );
};
```


在style.less文件中的第二处设置

```react jsx 
.printContent{
  overflow:hidden;
  height:0;
}

```


**不能使用display:none;进行元素的隐藏，这样打印出来的照样还是空白的。**

[案例](./案例/index.md "案例")
