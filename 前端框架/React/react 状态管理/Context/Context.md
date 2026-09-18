# Context

## 目录

- [何时使用 Context](#何时使用-Context)
- [使用 Context 之前的考虑](#使用-Context-之前的考虑)
- [API](#API)
  - [React.createContext](#ReactcreateContext)
    - [Context.Provider](#ContextProvider)
    - [Class.contextType](#ClasscontextType)
    - [Context.Consumer](#ContextConsumer)
    - [Context.displayName](#ContextdisplayName)
  - [示例](#示例)
    - [动态 Context](#动态-Context)
    - [在嵌套组件中更新 Context](#在嵌套组件中更新-Context)
    - [消费多个 Context](#消费多个-Context)
- [注意事项](#注意事项)
  - [1.provider value 为对象时 注意](#1provider-value-为对象时-注意)
- [示例总结](#示例总结)
- [Context 和 reduce 的对比](#Context-和-reduce-的对比)
  - [函数组件使用Context](#函数组件使用Context)

参考：

[ Context – React A JavaScript library for building user interfaces https://react.docschina.org/docs/context.html#when-to-use-context](https://react.docschina.org/docs/context.html#when-to-use-context " Context – React A JavaScript library for building user interfaces https://react.docschina.org/docs/context.html#when-to-use-context")

# 何时使用 Context

     Context 设计目的是为了**共享那些对于一个组件树而言是“全局”的数据**，例如当前认证的用户、主题或首选语言。举个例子，在下面的代码中，我们通过一个 “theme” 属性手动调整一个按钮组件的样式：

    使用 context, 我们可以避免通过中间元素传递 props：（他的目的就是为了避免中间元素传递）

# 使用 Context 之前的考虑

        Context 主要应用场景在于***很多*****不同层级的组件需要访问同样一些的数据**。请谨慎使用，因为这会使得组件的复用性变差。

如果你只是想避免层层传递一些属性，[组件组合（component composition）](https://react.docschina.org/docs/composition-vs-inheritance.html "组件组合（component composition）")有时候是一个比 context 更好的解决方案。

     比如，考虑这样一个 Page 组件，它层层向下传递 user 和 avatarSize 属性，从而深度嵌套的 Link 和 Avatar 组件可以读取到这些属性：

```vue 
 <Page user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<PageLayout user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<NavigationBar user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>
```


        **如果在最后只有 Avatar组件真的需要 user和 avatarSize，** 那么层层传递这两个 props 就显得非常冗余。而且一旦 Avatar组件需要更多从来自顶层组件的 props，你还得在中间层级一个一个加上去，这将会变得非常麻烦。

&#x20;     一种无需 context的解决方案是[将 Avatar 组件自身传递下去](https://react.docschina.org/docs/composition-vs-inheritance.html#containment "将 Avatar 组件自身传递下去")，因而中间组件无需知道 user或者 avatarSize等 props：

```vue 
 function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

// 现在，我们有这样的组件：
<Page user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<PageLayout userLink={...} />
// ... 渲染出 ...
<NavigationBar userLink={...} />
// ... 渲染出 ...
{props.userLink}
```


        这种变化下，只有最顶部的 Page 组件需要知道 Link 和 Avatar 组件是如何使用 user 和 avatarSize 的。

        这种对组件的*控制反转*减少了在你的应用中要传递的 props 数量，这在很多场景下会使得你的代码更加干净，使你对根组件有更多的把控。

&#x20;      **但是，这并不适用于每一个场景：这种将逻辑提升到组件树的更高层次来处理，会使得这些高层组件变得更复杂，并且会强行将低层组件适应这样的形式，这可能不会是你想要的**。&#x20;

        而且你的组件并不限制于接收单个子组件。你可能会传递多个子组件，甚至会为这些子组件（children）封装多个单独的“接口（slots）”，

[正如这里的文档所列举的](https://react.docschina.org/docs/composition-vs-inheritance.html#containment "正如这里的文档所列举的")

```vue 
 function Page(props) {
  const user = props.user;
  const content = <Feed user={user} />;
  const topBar = (
    <NavigationBar>
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
    </NavigationBar>
  );
  return (
    <PageLayout
      topBar={topBar}
      content={content}
    />
  );
}
```


      这种模式足够覆盖很多场景了，在这些场景下你需要将子组件和直接关联的父组件解耦。如果子组件**需要在渲染前**和父组件进行一些交流，你可以进一步使用 [render props](https://react.docschina.org/docs/render-props.html "render props")。

具有 render prop 的组件接受一个函数，该函数返回一个 React 元素并调用它而不是实现自己的渲染逻辑。

```react 
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>)}
/>
```


另行详解

&#x20;但是，有的时候在**组件树中很多不同层级的组件需要访问同样的一批数据**。Context 能让你将这些**数据向组件树下所有的组件进行“广播**”，所有的组件都能访问到这些数据，也能访问到后续的数据更新。使用 context 的通用的**场景包括管理当前的 locale，theme，或者一些缓存数据，这比替代方案要简单的多。**

# API

## React.createContext

```vue 
 const MyContext = React.createContext(defaultValue);
```


        创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。

        只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。这有助于在不使用 Provider 包装组件的情况下对组件进行测试。注意：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效。

### Context.Provider

```vue 
 <MyContext.Provider value={/* 某个值 */}>
```


        每个 Context 对象都会返回一个 **Provider React 组件**，它允许**消费组件订阅 context 的变化**。**Provider 接收一个 value 属性**，传递给消费组件。

**一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，****里层的会覆盖外层的数据****。**

&#x20;    当 Provider 的 value值发生变化时，**它内部的所有消费组件都会重新渲染**。Provider **及其内部 consumer 组件都不受制于shouldComponentUpdate函数**，因此当**consumer 组件在其祖先组件退出更新的情况下也能更新**。

    通过新旧值检测来确定变化，使用了与 [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description "Object.is")相同的算法。

注意

当传递对象给 value 时，检测变化的方式会导致一些问题：详见[注意事项](https://react.docschina.org/docs/context.html#caveats "注意事项")。

### Class.contextType

```javascript 
 class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* 基于 MyContext 组件的值进行渲染 */
  }
}
MyClass.contextType = MyContext;
```


&#x20;  挂载在 class 上的 \*\*contextType \*\*属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。这能让你使用&#x20;

**this.context 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。但是constructor中不行**

注意：

你只通过该 API 订阅单一 context。如果你想订阅多个，阅读[使用多个 Context](https://react.docschina.org/docs/context.html#consuming-multiple-contexts "使用多个 Context")章节

如果你正在使用实验性的 [public class fields 语法](https://babeljs.io/docs/plugins/transform-class-properties/ "public class fields 语法")，你可以使用 static 这个类属性来初始化你的 contextType。

```javascript 
 class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* 基于这个值进行渲染工作 */
  }
}
```


### Context.Consumer

```vue 
 <MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```


      这里，React 组件也可以订阅到 context 变更。这能让你在[函数式组件](https://react.docschina.org/docs/components-and-props.html#function-and-class-components "函数式组件")中完成订阅 context。

       这需要[函数作为子元素（function as a child）](https://react.docschina.org/docs/render-props.html#using-props-other-than-render "函数作为子元素（function as a child）")这种做法。这个函数接收当前的 context 值，返回一个 React 节点。传递给函数的 value 值等同于往上组件树离这个 context 最近的 Provider 提供的 value 值。如果没有对应的 Provider，value 参数等同于传递给 createContext() 的 defaultValue。

注意

想要了解更多关于 “函数作为子元素（function as a child）” 模式，详见 [render props](https://react.docschina.org/docs/render-props.html "render props")。

### Context.displayName

        context 对象接受一个名为 displayName 的 property，类型为字符串。React DevTools 使用该字符串来确定 context 要显示的内容。

示例，下述组件在 DevTools 中将显示为 MyDisplayName：

```vue 
 const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
<MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中
```


## 示例

### 动态 Context

对于上面的 theme 例子，使用动态值（dynamic values）后更复杂的用法：

theme-context.js

```vue 
 export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export const ThemeContext = React.createContext(
  themes.dark // 默认值
);
```


themed-button.js

```vue 
 import {ThemeContext} from './theme-context';

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return (
      <button
        {...props}
        style={{backgroundColor: theme.background}}
      />
    );
  }
}
ThemedButton.contextType = ThemeContext;

export default ThemedButton;
```


app.js

```vue 
 import {ThemeContext, themes} from './theme-context';
import ThemedButton from './themed-button';

// 一个使用 ThemedButton 的中间组件
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
    // 而外部的组件使用默认的 theme 值
    return (
      <Page>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <Section>
          <ThemedButton />
        </Section>
      </Page>
    );
  }
}

ReactDOM.render(<App />, document.root);
```


### 在嵌套组件中更新 Context

\*\*      从一个在组件树中嵌套很深的组件中更新 context 是很有必要的。在这种场景下，你可以通过 context 传递一个函数，使得 consumers 组件更新 context：\*\* ​

theme-context.js

```vue 
 // 确保传递给 createContext 的默认值数据结构是调用的组件（consumers）所能匹配的！
export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});
```


theme-toggler-button.js

```react 
import {ThemeContext} from './theme-context';

function ThemeTogglerButton() {
  // Theme Toggler 按钮不仅仅只获取 theme 值，它也从 context 中获取到一个 toggleTheme 函数
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <button          
          onClick={toggleTheme}
          style={{backgroundColor: theme.background}}
         >
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemeTogglerButton;
```


app.js

```vue 
 import {ThemeContext, themes} from './theme-context';
import ThemeTogglerButton from './theme-toggler-button';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };

    // State 也包含了更新函数，因此它会被传递进 context provider。
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    // 整个 state 都被传递进 provider
    return (
      <ThemeContext.Provider value={this.state}>
        <Content />
      </ThemeContext.Provider>
    );
  }
}

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}

ReactDOM.render(<App />, document.root);
```


### 消费多个 Context

        为了确保 context 快速进行重渲染，React 需要使每一个 consumers 组件的 context 在组件树中成为一个单独的节点。

```vue 
 // Theme context，默认的 theme 是 “light” 值
const ThemeContext = React.createContext('light');

// 用户登录 context
const UserContext = React.createContext({
  name: 'Guest',
});

class App extends React.Component {
  render() {
    const {signedInUser, theme} = this.props;

    // 提供初始 context 值的 App 组件
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}

// 一个组件可能会消费多个 context
function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
```


\*\* 如果两个或者更多的 context 值经常被一起使用，那你可能要考虑一下另外创建你自己的渲染组件，以提供这些值。\*\* ​

# 注意事项

## 1.provider value 为对象时 注意

        因为 context 会使用参考标识（reference identity）来决定何时进行渲染，这里可能会有一些陷阱，当 provider 的父组件进行重渲染时，可能会在 consumers 组件中触发意外的渲染。举个例子，当每一次 Provider 重渲染时，以下的代码会重渲染所有下面的 consumers 组件，

因为 value属性总是被赋值为新的对象：

```vue 
 class App extends React.Component {
  render() {
    return (
      <MyContext.Provider value={{something: 'something'}}>
        <Toolbar />
      </MyContext.Provider>
    );
  }
}
```


为了防止这种情况，将 value 状态提升到父节点的 state 里：

```vue 
 class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {something: 'something'},
    };
  }

  render() {
    return (
      <Provider value={this.state.value}>
        <Toolbar />
      </Provider>
    );
  }
}
```


# 示例总结

学习git 地址

[GitHub - scZhengChao/ReactStudy: react 官网学 react 官网学习. Contribute to scZhengChao/ReactStudy development by creating an account on GitHub. https://github.com/scZhengChao/ReactStudy](https://github.com/scZhengChao/ReactStudy "GitHub - scZhengChao/ReactStudy: react 官网学 react 官网学习. Contribute to scZhengChao/ReactStudy development by creating an account on GitHub. https://github.com/scZhengChao/ReactStudy")

1. ContextType = context 对象在 **提供provider 的那一层组件是拿不到；组件树的下层才能够获取消费**
2. 一**个Provider下面可以有多个comsume**r，多个provider也可以嵌套使用，里层的覆盖外层的数据，**这里的覆盖，可不是合并，而是只有里层的数据，外层的数据一个都不留，** 下层的context也是这一层的provider 对象
3. 不要出现多个 不同context的相互嵌套；不然你就要考虑重写你的渲染组件了
4. **context 可以被Provider组件树下面的所有的组件消费；即使你没有Consumer**，但是只能订阅单一的context，你可已在除了constructor以外的生命周期中使用它
5. **context 会引起跟新；无论层级，即使你不用consumer 包裹它**，但是他会出现在this.context上，而不会出现props上面

# Context 和 reduce 的对比

[  https://www.jianshu.com/p/164cae7e7805?utm\_campaign=haruki\&utm\_content=note\&utm\_medium=reader\_share\&utm\_source=weixin](https://www.jianshu.com/p/164cae7e7805?utm_campaign=haruki\&utm_content=note\&utm_medium=reader_share\&utm_source=weixin "  https://www.jianshu.com/p/164cae7e7805?utm_campaign=haruki\&utm_content=note\&utm_medium=reader_share\&utm_source=weixin")

## 函数组件使用Context

1. 首先定义我们的Context文件

```javascript 
 import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

//actions
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const UPDATE_USER_NAME = "UPDATE_USER_NAME";

//初始状态
const INITIAL_STATE = {};

//创建了Context
const TestContext = createContext();

//到处Context的值
export function useTestContext() {
  return useContext(TestContext);
}

//reducer
function reducer(state, { type, payload }) {
  switch (type) {
    case LOGIN: {
      const { userInfo } = payload;
      return Object.assign({}, state, userInfo);
    }
    case UPDATE_USER_NAME: {
      const { userName } = payload;
      return Object.assign({}, state, { userName });
    }
    case LOGOUT:
      return {};
    default:
      throw Error(`Unexpected action type in TestContext reducer: '${type}'.`);
  }
}
//导出了Context.Provider 高阶组件
export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  //登录
  const login = useCallback(
    (userInfo) =>
      dispatch({
        type: LOGIN,
        payload: {
          userInfo,
        },
      }),
    []
  );
  //退出
  const logOut = useCallback(
    () =>
      dispatch({
        type: LOGOUT,
      }),
    []
  );
  //更新userName
  const updateUserName = useCallback(
    (userName) =>
      dispatch({
        type: UPDATE_USER_NAME,
        payload: {
          userName,
        },
      }),
    []
  );
  return (
    <TestContext.Provider
      value={useMemo(() => [state, { login, logOut, updateUserName }], [
        logOut,
        login,
        state,
        updateUserName,
      ])}
    >
      {children}
    </TestContext.Provider>
  );
}
```


1. 在App.js注入Context关系

```javascript 
 import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import TestContextProvider from "./contexts/test"; //这里我取名test
import Mine from "./pages/Mine";
import Home from "./pages/Home";
function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">Home</Link>
        <br />
        <br />
        <Link to="/mine">Mine</Link>
        <TestContextProvider>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/mine" exact>
              <Mine />
            </Route>
          </Switch>
        </TestContextProvider>
      </Router>
    </div>
  );
}

export default App;

```


1. 使用

```javascript 
 //home.js
import React from "react";
import { useTestContext } from "../../contexts/test";
import "./styles.css";
function Home() {
  const [state, { login, logOut, updateUserName }] = useTestContext();
  const { userName } = state;
  return (
    <div className="home">
      <span>{userName}</span>
      <button
        onClick={() =>
          login({ userName: "小明", userAge: 22, userGender: "男" })
        }
      >
        login
      </button>
      <button onClick={logOut}>logOut</button>
      <button onClick={() => updateUserName("mason")}>updateUserName</button>
    </div>
  );
}
export default Home;

//main.js
import React from "react";
import { useTestContext } from "../../contexts/test";
function Mine() {
  const [state] = useTestContext();
  const { userName } = state;
  return (
    <div>
      <h1>Mine</h1>
      <span>{userName}</span>
    </div>
  );
}
export default Mine;
```


1. 结合其他的hooks我们还可以编写一个这样的function&#x20;

```javascript 
 //useLogin hooks
export function useLogin() {
  const [userInfo, { login }] = useTestContext();
  const { userName } = userInfo;
  useEffect(() => {
    //模拟请求
    async function fetch() {
      setTimeout(() => {
        login({ userName: "小红", userAge: 22, userGender: "男" });
      }, 2000);
    }
    if (userName !== "小红") {
      fetch();
    }
    fetch();
  }, [login, userName]);
  return userInfo;
}


//使用
//Login.js
import React from "react";
import { useLogin } from "../../contexts/test";
function Login() {
  const userInfo = useLogin();
  const { userName } = userInfo;
  return (
    <div>
      <h1>Login</h1>
      <span>{userName}</span>
    </div>
  );
}
export default Login;
```
