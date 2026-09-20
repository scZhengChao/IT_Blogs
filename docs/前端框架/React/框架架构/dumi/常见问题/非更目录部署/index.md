# 非更目录部署

[ 常见问题 Umi 是前端开发框架，适用于前端应用研发；dumi 是在 Umi 的基础上打造的静态站点框架，适用于组件研发。 https://d.umijs.org/guide/faq#非根目录部署](https://d.umijs.org/guide/faq#非根目录部署 " 常见问题 Umi 是前端开发框架，适用于前端应用研发；dumi 是在 Umi 的基础上打造的静态站点框架，适用于组件研发。 https://d.umijs.org/guide/faq#非根目录部署")

```typescript 
export default {
  base: '/文档起始路由/',
  publicPath: '/静态资源起始路径/',
  // 其他配置
};
```
