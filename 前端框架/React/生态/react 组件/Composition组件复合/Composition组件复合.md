# Composition组件复合

## 目录

- [基础版：](#基础版)
- [jsx或者虚拟dom    ](#jsx或者虚拟dom)
- [使用组合组件模式](#使用组合组件模式)
- [使用高阶组件 (HOC)](#使用高阶组件-HOC)

&#x20;复合组件给与你**足够的敏捷去定义自定义组件的外观和行为**。   一句话类比：vue的插槽；作用域插槽；默认插槽

\*\* 完全可以实现和vue 的slot 的所有内容； 一切皆组件 函数 类； 更加的灵活；因为你都得自己写\*\*​

### **基础版：**

```javascript 
import React, { PureComponent } from 'react'
// Dialog定义组件外观和行为
function Dialog(props){    
        //这里的props.children 就代表了默认的内容  是一个合法的表达式申请   
       // 注意了 这里的 props.children 不一定是数组，有可能是对象
      //取决于包含组件的开始和结束标记之间的内容(包含空白文本在内)    
       // slot   
       // 备选消息      
      const messages = {              
        "foo": {title: 'foo', content: 'foo~'},             
        "bar": {title: 'bar', content: 'bar~'},      
      }    
     console.log(props)   
      const {def,footer} = props.children[1](messages[props.msg])    
      return (        
           <div style={{ border: "1px solid blue" }}>           
           {/* {props.children[1].def} */}        
          {/*{props.children[1].footer} */}           
        {def}            
        {footer}        
      </div>   
    );
}

// 父组件
export default class composition extends PureComponent {

render() {    
  return (        
    <div>           
      {/* 传入显示内容 */}                 
      <Dialog msg='foo'>                      
      {/* 一切合法的表达式  */}               
      {            
          ({title,content})=>({                       
            def:(          
                      <>                               
                       {/* 作用域插槽 */}                                
                       <h1>组件复合</h1>                                        
                       <p>复合组件给与你足够的敏捷去定义自定义组件的外观和行为</p>                      </>                        
                    ),                        
              footer:<button onClick{()=>console.log('react slot')} >slot</button>                   
          })                
       }                                   
    </Dialog>        
  </div>    
 )}
}
```


### jsx或者虚拟dom    

**如果props.children是jsx，此时它是不能修改的（需要就行clone在处理）严格遵循单项数据流**

高阶一点的：

```javascript 
 <RadioGroup name="mvvm">
    <Radio value="vue">vue</Radio>
    <Radio value="react">react</Radio>
    <Radio value="ng">angular</Radio>
</RadioGroup>

function RadioGroup(props){   
    return (        
        <div>           
         {/* 不行jsx 是只读的；不能修改 */}           
         {/*{props.children.forEach(radio=>radio.props.name)}*/}         
      {React.Children.map(props.children,radio=>{                
           // 要修改虚拟dom 或者jsx 编译的结果 只能去克隆                
          // 参数一是克隆对象 参数二是设置的属性               
          return React.cloneElement(radio,{name:props.name})            
      })}        
    </div>    
  )
}

function Radio({children,...rest}){   
    return (        
        <label>            
            <input type="radio"  {...rest} /> {children}        
    </label>    
      )
}


```


## 使用组合组件模式

通过将子组件作为父组件的属性传递，可以实现更清晰的API设计。

```typescript 
import React from 'react';

const ParentComponent = ({ header, content, footer }) => {
  const sharedData = { theme: 'dark', language: 'zh' };
  
  return (
    <div className={`theme-${sharedData.theme}`}>
      {header && React.cloneElement(header, { sharedData })}
      <div className="content">
        {content && React.cloneElement(content, { sharedData })}
      </div>
      {footer && React.cloneElement(footer, { sharedData })}
    </div>
  );
};

const Header = ({ sharedData }) => (
  <header>当前主题: {sharedData.theme}</header>
);

const Content = ({ sharedData }) => (
  <main>语言设置: {sharedData.language}</main>
);

const Footer = ({ sharedData }) => (
  <footer>©2023 - {sharedData.language}</footer>
);

const App = () => {
  return (
    <ParentComponent
      header={<Header />}
      content={<Content />}
      footer={<Footer />}
    />
  );
};

export default App;
```


## 使用高阶组件 (HOC)

高阶组件可以包装子组件并注入额外的props。

```javascript 
import React from 'react';

const withSharedData = (Component) => {
  return function WrappedComponent(props) {
    const sharedData = { user: 'admin', permissions: ['read', 'write'] };
    return <Component {...props} sharedData={sharedData} />;
  };
};

const ChildComponent = ({ sharedData }) => {
  return (
    <div>
      用户: {sharedData.user}, 权限: {sharedData.permissions.join(', ')}
    </div>
  );
};

const EnhancedChild = withSharedData(ChildComponent);

const App = () => {
  return <EnhancedChild />;
};

export default App;
```
