# model

## 目录

- [model](#model)
  - [定义 Model](#定义-Model)
  - [effect](#effect)
    - [结构](#结构)
  - [yield](#yield)
  - [payload](#payload)
  - [effect中的关键字](#effect中的关键字)
    - [select](#select)
    - [call](#call)
    - [put](#put)
    - [take](#take)
  - [effects错误处理](#effects错误处理)
    - [本地错误处理](#本地错误处理)
    - [effects 全局错误统一处理](#effects-全局错误统一处理)
  - [subscription](#subscription)
- [model注册](#model注册)
  - [全局注册](#全局注册)
  - [异步注册](#异步注册)

# model

## 定义 Model

完成 UI 后，现在开始处理数据和逻辑。

dva 通过 model 的概念把一个领域的模型管理起来，包含同步更新 state 的 reducers，处理异步逻辑的 effects，订阅数据源的 subscriptions 。

新建 model `models/products.js` ：

```javascript 
export default {
  namespace: 'products',
  state: [],
  reducers: {
    'delete'(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
};

```


这个 model 里：

- `namespace` 表示在全局 state 上的 key
- `state` 是初始值，在这里是空数组
- `reducers` 等同于 redux 里的 reducer，接收 action，同步更新 state

然后别忘记在 `index.js` 里载入他：

```javascript 
// 3. Model
+ app.model(require('./models/products').default);

```


到这里，我们已经单独完成了 model 和 component，那么他们如何串联起来呢?

dva 提供了 connect 方法。如果你熟悉 redux，这个 connect 就是 react-redux 的 connect 。

编辑 `routes/Products.js`，替换为以下内容：

```javascript 
import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';

const Products = ({ dispatch, products }) => {
  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  return (
    <div>
      <h2>List of Products</h2>
      <ProductList onDelete={handleDelete} products={products} />
    </div>
  );
};

// export default Products;
export default connect(({ products }) => ({
  products,
}))(Products);

```


最后，我们还需要一些初始数据让这个应用 run 起来。编辑 `index.js`：

```javascript 
- const app = dva();
+ const app = dva({
+   initialState: {
+     products: [
+       { name: 'dva', id: 1 },
+       { name: 'antd', id: 2 },
+     ],
+   },
+ });

```


## effect

### 结构

```javascript 
effects: {
    *pageQuery({ payload = {} }, { select, call, put }) {
      const res = yield call(pageQuery, payload);
      const list = yield select((s) => s.commodity.list);
      yield put({
        type: 'save',
        payload: {
          detail: res.result,
        },
      });
    },
}
```


首先确认一点,effects里面的函数都是Generator函数.然后我们对里面的一些关键词进行分类来区分为啥effects里面的函数的函数要这么写.

## yield

固定关键词,Generator函数自带的关键词,和"*"搭配使用.有点像async和await,使用"*"则表明它是Generator函数,然后每使用一个"yield"就是告诉程序这里是异步,需要等待这个后面的代码执行完成.同步代码可不使用该关键词

## payload

view端通过dispatch传过来的payload同名参数

## effect中的关键字

dva中effects函数的固定传参,他们分别对应不同的功能,用于不用场景

#### select

拿到model中state的数据

```javascript 
const list = yield select((s) => s.commodity.list);
```


#### call

第一个参数是一个异步函数,payload是参数,可以通过call来执行一个完整的异步请求,又因为yield的存在,就实现了异步转同步的方案

```javascript 
const res = yield call(pageQuery, payload)
```


### put

可以使用同model中的`reducers`或者`effects`,通过reducers来实现数据到页面的更新.可以通过put实现effect的嵌套使用（**非阻塞式的调用**）

```javascript 
yield put({
       type: 'save',
       payload: {
         detail: res.result,
       },
     });
```


### take

**put是一个非阻塞的方法。**

**这里可以用到take来一次性监听dispatch过来的action的,effect 前后会额外触发 /@@start 和 /@@end 的 action,我们就可以通过监听/@@end,来监听effect的执行结束,**

**代码如下**

```javascript 
*fetchAllProducts({ payload }, { call, put }) {
      const response = yield call(getAllProducts, payload);
      if (response && response.code === SUCCESS) {
        const products = response.data;
        console.log("a",products);
        yield put({
          type: 'saveReportState',
          payload: { products },
        });
      }
    },
    *fetchUserAddOverview({ payload }, { call, put, select,take }) {
      yield put({ type: 'fetchAllProducts', payload: { clientType: 1 } });
      yield take('fetchAllProducts/@@end')
      const products = yield select(state => state.report.products) 
      console.log("b",products);
      // 这里会先输出 a products b products
      const response = yield call(queryNewUserOverview, payload);
      if (response && response.code === SUCCESS) {
        const userAddOverview = response.data;
        yield put({
          type: 'saveReportState',
          payload: { userAddOverview },
        });
      }
    },
```


## effects错误处理

#### 本地错误处理

```javascript 
effects: {
    *addRemote() {
      try {
        // Your Code Here
      } catch(e) {
        console.log(e.message);
      }
    },
  }
```


#### effects 全局错误统一处理

Ant Design 中用了umi，dva。统一异常处理可以在umi中进行。[官方文档](https://links.jianshu.com/go?to=https://github.com/umijs/umi/blob/umi%402.3.1/docs/zh/guide/with-dva.md "官方文档") 中说明如下

```javascript 
// 在 src 目录下新建 app.js，内容如下：
export const dva = {
  config: {
    onError(e) {
      e.preventDefault();
      console.error(e.message);
    },
  }
};
```


## subscription

Subscription 语义是订阅，用于订阅一个数据源，然后根据条件 dispatch 需要的 action。数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。

```javascript 
export default {
 
  namespace: 'example',
 
  state: {},
 
  subscriptions: {
    setup({ dispatch, history }) {  // 这里的方法名可以随便命名，当监听有变化的时候就会依次执行这的变化,这里的dispatch和history和之前说的是一样的
      window.onresize = () => {   //这里表示的当浏览器的页面的大小变化时就会触发里面的dispatch方法，这里的save就是reducers中的方法名
        dispatch (type:"save")  
      }
    },
 
    onClick ({dispatch}) {
      document.addEventListener('click',() => {   //这里表示当鼠标点击时就会触发里面的dispatch命令，这里的save就是reducers中的方法名
        dispatch (type:"save")
      })
    }
  },
 
  setupHistory({dispatch,history}){
    history.listen((location) => {
      console.log(location)   //这里可以获取当前变化的history路径以及参数，hash所有值，这样就可以在路由地址变化后做处理
      ....
    })
  }
 
  effects: {
    *fetch({ payload }, { call, put,select }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },
 
  reducers: {
 
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
 
};
```


从代码上我们可以看到，start方法执行时，会将app.model注册进来的所有model.subscriptions 遍历执行，并且将执行后的返回值收集到了 unlisteners\[model.namespace] 中，供 app.unmodel(namespace) 时取消订阅数据源用。

> 如果 subscriptions 没有返回函数，调用app.unmodel时会警告。

从代码中我么可以得出以下结论：

subscriptions 中配置的key的名称没有任何约束，而且只有在app.unmodel的时候才有用。
subscriptions 中配置的只能dispatch所在model的reducer和effects。
subscriptions 中配置的函数只会执行一次，也就是在调用 app.start() 的时候，会遍历所有 model 中的 subscriptions 执行一遍。
subscriptions 中配置的函数需要返回一个函数，该函数应该用来取消订阅的该数据源。

# model注册

## 全局注册

model/index.js

```javascript 
// Use require.context to require reducers automatically
// Ref: https://webpack.js.org/guides/dependency-management/#require-context
const context = require.context('./', false, /\.js$/);
export default context
  .keys()
  .filter(item => item !== './index.js')
  .map(key => context(key));

```


入口index.js

```javascript 
require('./models').default.foreach(key => app.model(key.default))
```


## 异步注册

```javascript 
import dynamic from 'dva/dynamic'
const modelNotExisted = (app, model) =>{
  // eslint-disable-next-line
  return !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });
}

const dynamicWrapper = (app, models, component) => {
  const hasModel = models.filter(model=>modelNotExisted(app, model))
  return dynamic({
      app,
      models:!_.isEmpty(hasModel)?()=>hasModel.map(name=>import(`../models/${name}`)):null,
      component: component,
    })
}



const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'tabsmenu'], () => import( '../layouts/BasicLayout')),
    },
    '/index': {
      component: dynamicWrapper(app, ['tabsmenu','options'], () => import('../routes/Index/Index')),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['tabsmenu'], () => import('../routes/User/Login')),
    },
    '/user/forget': {
      component: dynamicWrapper(app, [], () => import('../routes/User/ForgetPassword')),
    }
  };

```
