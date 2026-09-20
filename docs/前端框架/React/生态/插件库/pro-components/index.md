# pro-components

## 目录

- [ProLayout 窄屏幕情况下，怎么让菜单不变成抽屉形式展示？](#ProLayout-窄屏幕情况下怎么让菜单不变成抽屉形式展示)
- [ProLayout 随着断点自动折叠menu菜单？](#ProLayout-随着断点自动折叠menu菜单)
- [混合导航](#混合导航)
- [面包屑](#面包屑)

### ProLayout 窄屏幕情况下，怎么让菜单不变成抽屉形式展示？

> 有一个 `disableMobile` 可以关闭移动模式

### ProLayout 随着断点自动折叠menu菜单？

> 有一个 `disableMobile` 可以关闭移动模式（抽屉）；如果是自定义`collapsed`；得手动监听`onCollapse`并更新`collapsed` ；才会触发断点自动折叠
> `breakpoint`： `false`； 完全关闭断点

# 混合导航

> layout： `side` | `top`|`mix`
> splitMenus: `true/false` 自动切换菜单

# 面包屑

> `getMenuData`: 根据 router 信息来生成 menuData 和 breadcrumb。
> [https://procomponents.ant.design/components/layout#getmenudata](https://procomponents.ant.design/components/layout#getmenudata "https://procomponents.ant.design/components/layout#getmenudata")
> 思路：是递归平铺成一个对象结构：增加一个属性`parentkey`：\[key1,key2]
