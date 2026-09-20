# 大列表

## 目录

- [长列表优化](#长列表优化)

# 长列表优化

原本思路： 利用key 阻止render渲染；**但是发现；可能key 只是 友好于diff 算法；** 只要符合上面的渲染逻辑；依旧render；已经渲染

思考过程：

- 主要是针对长列表；复杂数据类型；也就是对象
- 之前考虑 \_.isEqual 但是 深比较的开销也不小；权衡之下没修改
- 最后 回到 shouldComponentUpdate 上来；list 里面需要修改的 item  修改他的id ； 可 仅更新修改项；而不修改 整个list
- 在复杂一点；可以item 里面的 几个id 拼接而来；只要符合 简单数据类型；这样shouldComponentUpdate 的开销比较小
- 注意： key 要和  shouldComponentUpdate 合一起一起用才有效,key 只是方便标记；优化diff；但是还是会render的；

```javascript 
 import React from 'react'

// 验证 key  在 长list下的作用
class Son extends React.Component<any, any>{
    constructor(props:any) {
        super(props);
        this.state = {

        }
    }
    shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
        if(nextProps.id === this.props.id ){
            return false
        }
        return true
    }

    public render(){
        const { data={a:1,b:2} } = this.props
        console.log('reder----',data.b)
        return (
            <div style={{
                border:'1px solid black',
                marginTop:10,
                marginBottom:10
            }}>
                <div>{data.a}</div>
                <div>{data.b}</div>
                {/*<div>{data.id}</div>*/}
            </div>
        )
    }
}


class Parent extends React.Component<any, any>{
    constructor(props:any) {
        super(props);
        this.state = {
            list:[]
        }
    }
    public init=()=>{
        const list = Array.from({length:100}, (v,k) => {
            return {
                a:k,
                b:k+'title',
                id:Date.now()+'title'+k
            }
        })
        this.setState({
            list,
        })

    }
    public reInit = ()=>{
        const {  list } = this.state
        const newList = Array.from({length:100}, (v,k) => {
            const num:number = parseInt(String(Math.random()*100))
            return {
                a:k===num?parseInt(String(Math.random()*100)):k,
                b:k+'title',
                id:k === num?Date.now()+'title'+k:list[k].id
            }
        })
        this.setState({
            list:newList,
        })
    }
    public add = ()=>{
        const { list } = this.state
        const newList:any[] = [{a:parseInt(String(Math.random()*100)),b:parseInt(String(Math.random()*100)),id:Date.now()+'title' },...list]
        this.setState({
            list:newList,
        })
    }
    public update = ()=>{
        const { list }= this.state
        const newList = [{a:parseInt(String(Math.random()*100)),b:list[0].b,id:Date.now()+'title'},...list]
        this.setState({
            list:newList
        })
    }
    public render(){
        const {  list } = this.state
        return (
            <div>
                <input type={'button'} style={{width:'100px',height:'40px'}} onClick={this.init} value={'生成'}/>
                <input type={'button'} style={{width:'100px',height:'40px'}} onClick={this.reInit} value={'重置'}/>
                <input type={'button'} style={{width:'100px',height:'40px'}} onClick={this.add} value={'增加'}/>
                <input type={'button'} style={{width:'100px',height:'40px'}} onClick={this.update} value={'修改'}/>
                <hr/>
                {list.map((item:any,index:number)=>{
                    return <Son
                                data={item}
                                key={item.id}
                                id={item.id}
                            />
                })}
            </div>
        )
    }
}
export default Parent
```


**注意：增加 删除  的测试**
