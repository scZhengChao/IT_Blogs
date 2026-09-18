# 错误处理问题

## 目录

- [问题描述](#问题描述)
- [解决方案](#解决方案)

### 问题描述

服务器端和客户端错误处理方式不同。

### 解决方案

- 使用 Error Boundaries
- 实现统一的错误处理中间件
- 提供友好的错误页面

```javascript 
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // 可以在这里记录错误
    console.error('Error caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// 使用
<ErrorBoundary>
  <UnstableComponent />
</ErrorBoundary>
```
