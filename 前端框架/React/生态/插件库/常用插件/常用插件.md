# 常用插件

## 目录

- [prop-types](#prop-types)

# **prop-types**

```javascript 
 import proptypes from 'prop-types';
//第三方法的类型库//创建组件
class App extends React.Component{    
    render(){        
      return (        
        <div>            
        <h3>{this.props.title}</h3>            
        <div>数子:{this.props.num+12}</div>            
    </div>        
  ) }   
}
//约定组件 -- app组件，props的默认值
App.defaultProps={    
  title:'标题'
};
App.propTypes={     
  title:proptypes.string,    
  num:proptypes.number.isRequired//必传props
};

```
