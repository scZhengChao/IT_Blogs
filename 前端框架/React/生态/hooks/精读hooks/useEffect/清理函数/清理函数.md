# 清理函数

## 目录

- [清理函数](#清理函数)

# 清理函数

- 无依赖项时，首次加载会执行useEffect第一个参数函数的return外的部分，**每次更新时会先执行return内部分，再执行return外的部分。**
- 依赖项为空数组(\[])时,会在页面首次加载时运行useEffect 第一个参数的那个函数，类似于执行componentDidMount，且只执行一遍，函**数内return 的函数会在页面即将销毁时或移除组件时执行，类似于执行componentWillUnMount**
- 依赖项不为空时，首次加载会执行useEffect第一个参数函数的return外的部分，**每次依赖项更新时会先执行return内部分，再执行return外的部分。**
