# table

## 目录

- [antd table表格可展开单元格按需展开](#antd-table表格可展开单元格按需展开)
- [表格对不齐](#表格对不齐)
- [table 分页器自适应布局](#table-分页器自适应布局)

## antd table表格可展开单元格按需展开

![](./assets/image/image_bDfGxrCw63.webp)

```typescript 
  <Table
      {...tableProps}
      scroll={{ x: 1600, y: 420 }}
      columns={columns}
      dataSource={tableData}
      pagination={pagination}
      expandedRowRender={expandedRowRender}
      rowKey="id"
       rowClassName={record => (record?.admin_batch_contracts.length > 0 ? '' : style.noExpend)}
   />
```


```javascript 
.noExpend {
    .ant-table-row-expand-icon {
        display: none !important;
    }
}
 :global {
    .antd-pro-pages-contract-list-index-noExpend {
        .ant-table-row-expand-icon {
            display: none !important;
        }
    }
}
```


## 表格对不齐

[https://www.jianshu.com/p/8ab3ba1e87cc](https://www.jianshu.com/p/8ab3ba1e87cc "https://www.jianshu.com/p/8ab3ba1e87cc")

解决方案：表头columns一列不设置width ,scroll.x设置大于columns里面width之和 （其实只要有一列不设置width就行；自己琢磨吧）

封装表格统一计算设置scroll.x

```typescript 
import React,{Component} from "react";
import {Table} from "antd";
import "./index.less";
class TableComp extends Component{
    render(){
        //用于解决antd表格表头不对齐bug 一列不设置width scroll.x>width
        var width = 0;
        this.props.columns.map((e)=>{
            if(e.width){
                width = width+e.width;
            }
        })
        width = width+200;
        return ( 
            <Table columns={this.props.columns} 
            bordered 
            scroll={{
                y:this.props.scroll?(this.props.scroll.y?this.props.scroll.y:false):false,
                x:this.props.scroll?(this.props.scroll?width:false):false}} 
            rowSelection={this.props.rowSelection}
            pagination={this.props.pagination} 
            dataSource={this.props.dataSource} 
            rowKey= {columns => columns.id}
            key={this.props.keys?this.props.keys:'table'} 
            loading={this.props.loading}></Table>
        )
    }
}
export default TableComp;
```


# table 分页器自适应布局

[table 分页器](<../../../../前端框架/经典效果组件/组件封装/table 分页器/index.md> "table 分页器")
