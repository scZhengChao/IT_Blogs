# 优雅的在 umi 页面间穿梭

## 目录

- [声明式](#声明式)
- [命令式（history、useNavigate）](#命令式historyuseNavigate)

## 声明式

在网站的页面之间链接时，你通常使用 `<a>` HTML 标签。

在 Umi 中，你使用了从 `umi` 导出的 `<Link>` 组件对应用程序中的不同页面进行客户端导航。

首先，在 `pages/index.js` 中，从 `umi` 导入 `Link` 组件，方法是在顶部添加这一行:

```typescript 
import { Link } from 'umi';
export default () => <div>Index Page
    <p><Link to="/user">Go to user page</Link></p>
</div>;

```


## 命令式（history、useNavigate）

上述内容，我们在首页使用声明式的方法添加了一个跳转到 `user` 页面的方法，接下来我们通过命令式的方式，从 `user` 返回首页。

```typescript 
import { history, useNavigate } from 'umi';
export default function User() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>User Page</h1>
            <button onClick={() => history.back()}>go back by history!</button>
            <button onClick={() => history.push('/')}>go to index by history!</button>
            <button onClick={() => navigate(-1)}>go back by navigate!</button>
            <button onClick={() => navigate('/')}>go to index by navigate!</button>
        </div>
    );
}

```


上面的页面中，我们增加了四个按钮，使用 `history` 和 `useNavigate` 分别实现了**回退**方法，和页面跳转方法到达首页。

虽然从效果是来看都是从列表页跳转到了主页，但需要注意的是，使用 `back` 方法，会撤回一次浏览器历史。也就是说，你无法使用浏览器上面的后退按钮（包括安卓设备上的返回键），返回 user 页面。而使用 push 返回，会增加一个浏览器历史。如果多次在两个页面之间 push ，会导致使用回退按钮返回页面时，会有一个很长的浏览器历史列表。

`back`\*\* 方法完全依赖于项目的浏览历**史，也就是说完全依赖于你的“前一个页面”。这**意味着，当你在当前路由刷新页面时，\*\* `back` 有可能会失效。所以实际项目中，要根据具体的项目逻辑和场景来选择合适的方法。

虽然命令式 `history` 和 `useNavigate` 看起来都可以实现在页面之间导航，但是需要注意的是 `useNavigate`\*\* 只能用在 React 存在的上下文中，**简单的说就是他只能在组件的生命周期中使用，**如果你在全局的文件**，比如 `app.ts` 或者 `global.ts` 文件中**就不能使用 ****`useNavigate`**** ，只能使用 ****`history`****。\*\*
