# 子应用之间跳转

## 目录

- [子应用之间跳转](#子应用之间跳转)

### 子应用之间跳转

如果子应用通过**路由绑定的方式**引入，在其它子应用的内部，可以使用 `<MicroAppLink />` 跳转到对应的路由。以子应用 `app1` 和 `app2` 为例：

```javascript 
// 在 app1 中
import { MicroAppLink } from 'umi';

export default function Page() {
  return (
    <>
      {/* 跳转链接为 /app2/home */}
      <MicroAppLink name="app2" to="/home">
        <Button>go to app2</Button>
      </MicroAppLink>
    </>
  );
}
```


在上面的例子中，点击按钮后，父应用的路由变为 `/app2/home`，渲染子应用 `app2` 内部路由为 `/home` 的页面。同理，如果想要从子应用 app2 回到子应用 app1，可以编写代码如下：

```javascript 
// 在 app2 中
import { MicroAppLink } from 'umi';

export default function Page() {
  return (
    <>
      {/* 跳转链接为 /app1/project/home */}
      <MicroAppLink name="app1" to="/home">
        <Button>go to app1</Button>
      </MicroAppLink>
    </>
  );
}
```


您也可以从子应用跳转到父应用的指定路由：

```javascript 
// 在子应用中
import { MicroAppLink } from 'umi';

export default function Page() {
  return (
    <>
      {/* 跳转链接为 /table */}
      <MicroAppLink isMaster to="/table">
        <Button>go to master app</Button>
      </MicroAppLink>
    </>
  );
}
```
