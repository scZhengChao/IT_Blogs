# AOP

## 目录

- [一、AoP 的核心概念](#一AoP-的核心概念)
- [二、原生 Node.js 实现（无第三方库）](#二原生-Nodejs-实现无第三方库)
- [使用专业库（推荐）](#使用专业库推荐)
  - [1. Node.js 库：aspect.js](#1-Nodejs-库aspectjs)
- [关键应用场景](#关键应用场景)

核心思路是 ​**​拦截原有逻辑，动态注入横切关注点代码​**​。以下是原生实现和常用库的解决方案：

### 一、AoP 的核心概念

- **Aspect**：封装横切逻辑（如日志、权限校验）的模块
- **Pointcut**：定义拦截目标（如特定函数/路由）
- **Advice**：注入的时机（Before/After/Around）

### 二、原生 Node.js 实现（无第三方库）

```javascript 
// 1. 创建代理工厂函数
function createAopProxy(target, aspect) {
  return new Proxy(target, {
    get(target, propKey) {
      const origMethod = target[propKey];
      if (typeof origMethod !== 'function') return origMethod;

      // 2. Around 拦截
      return async (...args) => {
        try {
          // Before 切面
          aspect.before && aspect.before(args);
          
          // 执行原函数
          const result = await origMethod.apply(target, args);
          
          // After 切面
          aspect.after && aspect.after(result);
          return result;
        } catch (error) {
          // Error 切面
          aspect.error && aspect.error(error);
          throw error;
        }
      };
    }
  });
}

// 3. 业务类
class UserService {
  getUser(id) {
    console.log(`业务逻辑: 获取用户${id}`);
    return { id, name: "Alice" };
  }
}

// 4. 日志切面
const loggerAspect = {
  before: (args) => console.log(`[LOG] 调用参数: ${JSON.stringify(args)}`),
  after: (result) => console.log(`[LOG] 返回结果: ${JSON.stringify(result)}`)
};

// 5. 创建代理实例
const proxiedService = createAopProxy(new UserService(), loggerAspect);

// 测试调用
proxiedService.getUser(123);
```


**输出结果​**​：

```json 
[LOG] 调用参数: [123]
业务逻辑: 获取用户123
[LOG] 返回结果: {"id":123,"name":"Alice"}
```


### 使用专业库（推荐）

#### 1. **Node.js 库：aspect.js**

```typescript 
import { around } from 'aspect.js';

class LoggerAspect {
  @around({ className: /Service/, methodName: /.*/ })
  async logAround(joinPoint) {
    console.log(`[调用] ${joinPoint.fullName}`);
    const result = await joinPoint.proceed();
    console.log(`[结果] ${JSON.stringify(result)}`);
    return result;
  }
}

// 自动代理标注类
@aspect(LoggerAspect)
class UserService {
  // ...
}
```


### 关键应用场景

| 场景   | 实现方式                 |
| ---- | -------------------- |
| 日志监控 | Around 切面 + 代理拦截     |
| 权限校验 | Before 切面阻断执行        |
| 性能监控 | React HOC / Hook 包裹  |
| 错误捕获 | Try/Catch + Error 切面 |
| 事务管理 | Around 切面控制数据库事务     |

> **最佳实践**：对核心业务（如支付、用户鉴权
