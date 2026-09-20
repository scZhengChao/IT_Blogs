# React-keeper

## 目录

- [快速上手](#快速上手)
  - [安装react-keeper](#安装react-keeper)
  - [在项目中进行引入](#在项目中进行引入)
  - [配置路由](#配置路由)
  - [3.路由跳转与传参](#3路由跳转与传参)
- [npm](#npm)

# 快速上手

#### 安装react-keeper

```javascript 
npm i react-keeper --save
```


#### 在项目中进行引入

```javascript 
import { HashRouter,Route,Link } from 'react-keeper'
```


#### **配置路由**

- 注意：在使用react-keeper时，通过react-keeper引用的组件（Route,Link）都必须在HashRouter包裹之中，
- 并且HashRouter最外层还需要一个div

```javascript 
 <div>
       {/*路由容器  */}
    <HashRouter>
         <div>
            <Route cache path="/" exact component = {Index} />
               <Route path="/say"  component = {Say} />
                <Route path="/picture"  component = {Picture} />
                <Route path="/me"  component = {Me} />
                <Route path="/bookInfo"  component = {bookInfo} />   
                {/* // 菜单栏  */}
              <div className="menu">
                    <ul>
                        <li><Link to="/">文章</Link></li>
                        <li><Link to="/say">心情</Link></li>
                        <li><Link to="/picture">照片墙</Link></li>
                        <li><Link to="/me">关于我</Link></li>
                    </ul>
                </div>
         </div>
     </HashRouter>
  </div>

```


`cache`属性可以添加属性值，`React-Keeper`支持的属性值有**root（default）、parent**。

- cache='root'（或cache）为永久缓存，只要根组件不解绑，页面将永久缓存。
- cache='parent'为父组件缓存，在父组件不解绑的情况下会维持缓存状态。

#### 3.路由跳转与传参

引入Control

```javascript 
import { Control } from 'react-keeper'
```


回到上一页

```javascript 
Control.go(-1)
```


也通过这样跳转，并传递参数

```javascript 
 Control.go("bookInfo",{ID:ID})
```


接收参数

```javascript 
Control.state.ID
```


传统方式

```javascript 
 this.props.history.push({
             pathname:"bookInfo",
             query:{ID:ID}
      })
```


传统接手参数

```javascript 
this.props.location.query.ID
```


# npm

[ react-keeper - npmGitDownloads A Strong Routing Library of React. Latest version: 2.2.3, last published: 3 years ago. Start using react-keeper in your project by running \`npm i react-keeper\`. There are 4 other projects in the npm r https://www.npmjs.com/package/react-keeper](https://www.npmjs.com/package/react-keeper " react-keeper - npmGitDownloads A Strong Routing Library of React. Latest version: 2.2.3, last published: 3 years ago. Start using react-keeper in your project by running `npm i react-keeper`. There are 4 other projects in the npm r https://www.npmjs.com/package/react-keeper")

[（Keep-Alive）实现方式概览](（Keep-Alive）实现方式概览.md "（Keep-Alive）实现方式概览")
