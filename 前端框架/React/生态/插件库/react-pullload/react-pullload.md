# react-pullload

```纯文本 
 脚手架自带的一款 刷新和加载更多 插件  npm i react-pullload -D
```


```纯文本 
 导入： npm 中文  https://github.com/react-ld/react-pullLoad/blob/HEAD/README-cn.md 
 import "../node_modules/react-pullload/dist/ReactPullLoad.css"; 
 import ReactPullLoad, { STATS } from "react-pullload"; 
 
 
 action  用于同步状态 
 handleAction  用于处理状态 
 hasMore  是否还有更多内容可加载              false 
 downEnough   下拉距离是否满足要求               100 
 distanceBottom   距离底部距离触发加载更多         100 
 isBlockContainer   是否开启使用组件根 DOM 作为外部容器 contianer  false 
 HeadNode   自定义顶部刷新 UI 组件         必须是一个 React 组件 
 FooterNode  自定义底部加载更多 UI 组件    必须是一个 React 组件 
 
 
 STATS list 
 init             ''           组件初始状态 
 pulling           'pulling'      state-pulling      下拉状态 
 enough      'pulling enough'      state-pulling.enough      下拉并且已经满足阈值 
 refreshing      'refreshing'      state-refreshing      刷新中（加载数据中） 
 refreshed      'refreshed'      state-refreshed      完成刷新动作 
 reset      'reset'      state-reset      恢复默认状态 
 loading      'loading'      state-loading      加载中 

```


```纯文本 
 使用： 
 export class App extends Component { 
   constructor() { 
     super(); 
     this.state = { 
       hasMore: true, 
       data: [1,2,3,4,5,6], 
       action: STATS.init, 
       index: 1 //loading more test time limit 
     }; 
   } 
   handleAction = action => { 
     // console.info(action, this.state.action, action === this.state.action); 
     //new action must do not equel to old action 
     if (action === this.state.action) { 
       return false; 
     } 
     if (action === STATS.refreshing) { 
       this.handRefreshing(); 
     } else if (action === STATS.loading) { 
       this.handLoadMore(); 
     } else { 
       //DO NOT modify below code 
       this.setState({ 
         action: action 
       }); 
     } 
   }; 
 
   handRefreshing = () => { 
     if (STATS.refreshing === this.state.action) { 
       return false; 
     } 
 
     setTimeout(() => { 
       //refreshing complete 
       this.setState({ 
         data: [7,8,9,10], 
         hasMore: true, 
         action: STATS.refreshed, 
         index: 2 
       }); 
     }, 3000); 
 
 
     this.setState({ 
       action: STATS.refreshing 
     }); 
   }; 
 
 
   handLoadMore = () => { 
     if (STATS.loading === this.state.action) { 
       return false; 
     } 
     //无更多内容则不执行后面逻辑 
     if (!this.state.hasMore) { 
       return; 
     } 
 
 
     setTimeout(() => { 
       if (this.state.index === 0) { 
         this.setState({ 
           action: STATS.reset, 
           hasMore: false 
         }); 
       } else { 
         this.setState({ 
           data: [...this.state.data, 11, 12], 
           action: STATS.reset, 
           index: this.state.index - 1 
         }); 
       } 
     }, 3000); 
 
 
     this.setState({ 
       action: STATS.loading 
     }); 
   }; 
 
 
   render() { 
     const { data, hasMore } = this.state; 
 
 
     const fixHeaderStyle = { 
       position: "fixed", 
       width: "100%", 
       height: "50px", 
       color: "#fff", 
       lineHeight: "50px", 
       backgroundColor: "#e24f37", 
       left: 0, 
       top: 0, 
       textAlign: "center", 
       zIndex: 1 
     }; 
 
 
     return ( 
       <div> 
         <div style={fixHeaderStyle}>fixed header</div> 
         <ReactPullLoad 
           downEnough={150} 
           action={this.state.action}  //用于同步状态 
           handleAction={this.handleAction}   //用于处理状态 
           hasMore={hasMore}    //是否还有更多内容可加载 
           style={{ paddingTop: 50 }}   //下拉距离是否满足要求 
           distanceBottom={1000}   //距离底部距离触发加载更多 
         > 
           <ul className="test-ul"> 
             <button onClick={this.handRefreshing}>refreshing</button> 
             <button onClick={this.handLoadMore}>loading more</button> 
             {data.map((str, index) => { 
               return ( 
                 <li key={index}> 
                   {str} 
                 </li> 
               ); 
             })} 
           </ul> 
         </ReactPullLoad> 
       </div> 
     ); 
   } 
 } 
 
 
 export default App; 
 

```
