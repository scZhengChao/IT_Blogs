# V6-createPortal-useRoutes

## 目录

- [前言：](#前言)
- [代码实现](#代码实现)
  - [/components/KeepAlive.tsx](#componentsKeepAlivetsx)
  - [路由渲染](#路由渲染)
  - [Layout.tsx](#Layouttsx)

[   https://juejin.cn/post/7041490849858846728](https://juejin.cn/post/7041490849858846728 "   https://juejin.cn/post/7041490849858846728")

## 前言：

作者所在公司是跨境电商 主要工作内容就是ERP，谈到ERP 一定会有&#x20;

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e34e28adce434c19a38c79f56d8ceba9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这种功能。
用过Vue都知道 vue本身自带 `keepAlive` 其属性 `include` `exclude` 配合`vuex` 轻松可以实现 tags的缓存 切换 功能。
React官方暂不支持keepAlive（听说18+会支持）但社区有不少解决方案，作者之前就是基于[CJY0208/react-router-cache-route](https://link.juejin.cn?target=https://github.com/CJY0208/react-router-cache-route "CJY0208/react-router-cache-route") 这个方案 解决缓存问题。
早段时间 创建新项目的时候 yarn add react-router 发现 package.json 里面已经是默认V6版本了, react-routerV6 改动很大, react-router-cache-route 目前并不支持V6 。
以前为了解决路由缓存问题 看了不少社区的解决方案 对各个缓存解决方案也有一定的了解。决定自己实现一个支持V6版本 所以就有了本文
话不多说说 先上 [代码预览](https://link.juejin.cn?target=https://codesandbox.io/s/21972?file=/src/main.tsx "代码预览")

效果图：&#x20;

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/790128529a7247808679fd87bf65e4ae~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

未完成功能

- 生命周期 (主要是作者工作应用中用不到 所以没动力去添加)

已实现功能： **黑白名单/动态删除缓存**

## 代码实现

核心API React的`createPortal` & react-router的`useRoutes` &#x20;

### /components/KeepAlive.tsx

```javascript 
import ReactDOM from 'react-dom'
import { equals, isNil, map, filter, not } from 'ramda'
import { useUpdate } from 'ahooks'
import {
 JSXElementConstructor,
 memo,
 ReactElement,
 RefObject,
 useEffect,
 useLayoutEffect,
 useRef,
 useState,
} from 'react'
type Children = ReactElement<any, string | JSXElementConstructor<any>> | null
interface Props {
 activeName?: string
 isAsyncInclude: boolean // 是否异步添加 Include  如果不是又填写了 true 会导致重复渲染
 include?: Array<string>
 exclude?: Array<string>
 maxLen?: number
 children: Children
}
function KeepAlive({ activeName, children, exclude, include, isAsyncInclude, maxLen = 10 }: Props) {
 const containerRef = useRef<HTMLDivElement>(null)
 const components = useRef<Array<{ name: string; ele: Children }>>([])
 const [asyncInclude] = useState<boolean>(isAsyncInclude)
 const update = useUpdate()
 useLayoutEffect(() => {
  if (isNil(activeName)) {
   return
  }
   // 缓存超过上限的 干掉第一个缓存
  if (components.current.length >= maxLen) {
   components.current = components.current.slice(1)
  } 
  // 添加
  const component = components.current.find((res) => equals(res.name, activeName))
   if (isNil(component)) {
   components.current = [
    ...components.current,
    {
     name: activeName,
     ele: children,
    },
   ]
   if (not(asyncInclude)) {
    update()
   }
  }
   return () => {  // 处理 黑白名单 
   if (isNil(exclude) && isNil(include)) {
    return
   }
   components.current = filter(({ name }) => {
    if (exclude && exclude.includes(name)) {
     return false
    }
    if (include) {
     return include.includes(name)
    }
    return true
   }, components.current)
  }
 }, [children, activeName, exclude, maxLen, include, update, asyncInclude])
 return (
  <>
   <div ref={containerRef} className="keep-alive" />
   {map(
    ({ name, ele }) => (
     <Component active={equals(name, activeName)} renderDiv={containerRef} name={name} key={name}>
      {ele}
     </Component>
    ),
    components.current
   )}
  </>
 )
}
export default memo(KeepAlive)

interface ComponentProps {
 active: boolean
 children: Children
 name: string
 renderDiv: RefObject<HTMLDivElement>
}
// 渲染 当前匹配的路由 不匹配的 利用createPortal 移动到 document.createElement('div') 里面
function Component({ active, children, name, renderDiv }: ComponentProps) {
 const [targetElement] = useState(() => document.createElement('div'))
 const activatedRef = useRef(false)
 activatedRef.current = activatedRef.current || active
 useEffect(() => {
  if (active) {// 渲染匹配的组件
   renderDiv.current?.appendChild(targetElement)
  } else {
   try { // 移除不渲染的组件
    renderDiv.current?.removeChild(targetElement)
   } catch (e) {}
  }
 }, [active, name, renderDiv, targetElement])
 useEffect(() => {// 添加一个id 作为标识 并没有什么太多作用 
  targetElement.setAttribute('id', name)
 }, [name, targetElement])
 // 把vnode 渲染到document.createElement('div') 里面
 return <>{activatedRef.current && ReactDOM.createPortal(children, targetElement)}</>
}
export const KeepAliveComponent = memo(Component)
```


`Vue` 组件天生自带`name` 属性 `KeepAlive` 也是基于`name`缓存的。而`React`组件没有使用需要手动传入一个`name= activeName` &#x20;
`KeepAlive.tsx` 组件已经实现 缓存功能了 如下:

```javascript 
<KeepAlive activeName={currentKey}>
 {vnode}
</KeepAlive>

```


通过`React`开发者工具我们可看到 `KeepAlive` 把所有渲染的`vnode` 缓存起来。 然后只在页面渲染当前匹配的路由`vnode`

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74e2ab0dafc24439867c5eb927331a63~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### 路由渲染

![](./image/image_HMs2drB7vV.png)

![](./image/image_E_tU5lVjrU.png)

/\* 渲染 `layout`组件 `layout`组件里面拿到他的子路由

### Layout.tsx

```javascript 
import { FunctionComponent, memo, Suspense, useCallback, useEffect, useMemo, useReducer } from 'react'
import { BackTop, Layout as ALayout, Menu } from 'antd'
import { Link, useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { equals, isNil, last, map } from 'ramda'
import TagsView, { Action, ActionType, reducer } from './tagsView'
import { Loading } from '@/components/Loading'
import $styles from './tagsView/index.module.scss'
import type { RouteMatch, RouteObject } from 'react-router'
import KeepAlive from '@/components/KeepAlive'
import { ViewProvider } from '@/hooks/useView'
import { RouteConfig } from '@/router/configure'

export interface RouteObjectDto extends RouteObject {
 name: string
 meta?: { title: string }
}
function makeRouteObject(routes: RouteConfig[], dispatch: React.Dispatch<Action>): Array<RouteObjectDto> {
 return map((route) => {
  return {
   path: route.path,
   name: route.name,
   meta: route.meta,
   element: (
    <ViewProvider value={{ name: route.name }}>
     <route.component name={route.name} dispatch={dispatch} />
    </ViewProvider>
   ),
   children: isNil(route.children) ? undefined : makeRouteObject(route.children, dispatch),
  }
 }, routes)
}
function mergePtah(path: string, paterPath = '') {
 // let pat = getGoto(path)
 path = path.startsWith('/') ? path : '/' + path
 return paterPath + path
}
// 渲染导航栏
function renderMenu(data: Array<RouteConfig>, path?: string) {
 return map((route) => {
  const Icon = route.icon
  const thisPath = mergePtah(route.path, path)
  return route.alwaysShow ? null : isNil(route.children) ? (
   <Menu.Item key={route.name} icon={Icon && <Icon />}>
    <Link to={thisPath}>{route.meta?.title}</Link>
   </Menu.Item>
  ) : (
   <Menu.SubMenu title={route.meta?.title} key={route.name}>
    {renderMenu(route.children, thisPath)}
   </Menu.SubMenu>
  )
 }, data)
}
interface Props {
 route: RouteConfig
}
function getLatchRouteByEle(
 ele: React.ReactElement<any, string | React.JSXElementConstructor<any>>
): RouteMatch<string>[] | null {
 const data = ele?.props.value
 return isNil(data.outlet) ? (data.matches as RouteMatch<string>[]) : getLatchRouteByEle(data.outlet)
}
const Layout: FunctionComponent<Props> = ({ route }: Props) => {
 const location = useLocation()
 const navigate = useNavigate()
 const [keepAliveList, dispatch] = useReducer(reducer, [])
 // 生成子路由
 const routeObject = useMemo(() => {
  if (route.children) {
   return makeRouteObject(route.children, dispatch)
  }
  return []
 }, [route.children])
 // 匹配 当前路径要渲染的路由
 const ele = useRoutes(routeObject)
 // 计算 匹配的路由name
 const matchRouteObj = useMemo(() => {
  if (isNil(ele)) {
   return null
  }
  const matchRoute = getLatchRouteByEle(ele)
  if (isNil(matchRoute)) {
   return null
  }
  const selectedKeys: string[] = map((res) => {
   return (res.route as RouteObjectDto).name
  }, matchRoute)
  const data = last(matchRoute)?.route as RouteObjectDto
  return {
   key: last(matchRoute)?.pathname ?? '',
   title: data?.meta?.title ?? '',
   name: data?.name ?? '',
   selectedKeys,
  }
 }, [ele])
 // 缓存渲染 & 判断是否404
 useEffect(() => {
  if (matchRouteObj) {
   dispatch({
    type: ActionType.add,
    payload: {
     ...matchRouteObj,
    },
   })
  } else if (!equals(location.pathname, '/')) {
   navigate({
    pathname: '/404',
   })
  }
 }, [matchRouteObj, location, navigate])
 // 生成删除tag函数
 const delKeepAlive = useCallback(
  (key: string) => {
   dispatch({
    type: ActionType.del,
    payload: {
     key,
     navigate,
    },
   })
  },
  [navigate]
 )
 const include = useMemo(() => {
  return map((res) => res.key, keepAliveList)
 }, [keepAliveList])
 return (
  <ALayout>
   <ALayout>
    <ALayout.Sider width={180} theme="light" className={$styles.fixed}>
     <Menu selectedKeys={matchRouteObj?.selectedKeys} defaultOpenKeys={matchRouteObj?.selectedKeys} mode="inline">
      {renderMenu(route.children ?? [])}
     </Menu>
    </ALayout.Sider>
    <ALayout style={{ marginLeft: 180 }}>
     <TagsView delKeepAlive={delKeepAlive} keepAliveList={keepAliveList} />
     <ALayout.Content className="app-content">
      <Suspense fallback={<Loading />}>
       <KeepAlive activeName={matchRouteObj?.key} include={include} isAsyncInclude>
        {ele}
       </KeepAlive>
      </Suspense>
     </ALayout.Content>
    </ALayout>
   </ALayout>
   <BackTop />
  </ALayout>
 )
}
export default memo(Layout)

```


核心代码在于 `useRoutes` 利用`useRoutes` 可以获取到本次路由的 `ele` &#x20;
我们可以使用 `ele` 拿到 `route` 里面 信息 这里使用路由的 `pathname` 作为路由的唯一`name` 这样好处是 拥有动态参数的组件可以缓存多个
