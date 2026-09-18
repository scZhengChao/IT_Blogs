# saga

## 目录

- [文档](#文档)
- [安装](#安装)
- [使用示例](#使用示例)
  - [takeLatest](#takeLatest)
  - [throttle](#throttle)
  - [takeLeading](#takeLeading)
  - [声明式 Effects](#声明式-Effects)
  - [发起 action 到 store](#发起-action-到-store)
  - [错误处理](#错误处理)
  - [take](#take)
  - [无阻塞调用](#无阻塞调用)
    - [但上面的方法还是有一个小问题](#但上面的方法还是有一个小问题)
  - [同时执行多个任务](#同时执行多个任务)
  - [在多个 Effects 之间启动 race](#在多个-Effects-之间启动-race)
  - [通过 yield\* 对 Sagas 进行排序](#通过-yield-对-Sagas-进行排序)
  - [组合 Sagas](#组合-Sagas)
  - [常见的并发模式](#常见的并发模式)
    - [takeEvery](#takeEvery)
    - [takeLatest](#takeLatest)

# 文档

[ React中的redux-saga详解-CSDN博客 文章浏览阅读3.1k次。redux-saga 是 redux 一个中间件，它是基于ES6 的Generator功能实现，用于解决异步问题（让redux中可以直接进行异步操作）。组件会发送一个 action 对象给 redux-saga，redux-saga（主saga） 就会分析监听 saga 中有没有当前 action 对应的 type 类型操作，如果在监听 saga 中找到了，说明当前操作是一 https://blog.csdn.net/weixin\_45605541/article/details/127328192](https://blog.csdn.net/weixin_45605541/article/details/127328192 " React中的redux-saga详解-CSDN博客 文章浏览阅读3.1k次。redux-saga 是 redux 一个中间件，它是基于ES6 的Generator功能实现，用于解决异步问题（让redux中可以直接进行异步操作）。组件会发送一个 action 对象给 redux-saga，redux-saga（主saga） 就会分析监听 saga 中有没有当前 action 对应的 type 类型操作，如果在监听 saga 中找到了，说明当前操作是一 https://blog.csdn.net/weixin_45605541/article/details/127328192")

[ redux-saga入门\[通俗易懂\] - 腾讯云开发者社区-腾讯云 使用 dispatch 往 store 发送 action 的这个过程是可以被拦截的, 自然而然地就可以在这里增加各种中间件Middleware。redux-s... https://cloud.tencent.com/developer/article/2152108?from=15425\&areaSource=102001.1\&traceId=FljMhtwo9aM\_HGyL1igk1](https://cloud.tencent.com/developer/article/2152108?from=15425\&areaSource=102001.1\&traceId=FljMhtwo9aM_HGyL1igk1 " redux-saga入门\[通俗易懂] - 腾讯云开发者社区-腾讯云 使用 dispatch 往 store 发送 action 的这个过程是可以被拦截的, 自然而然地就可以在这里增加各种中间件Middleware。redux-s... https://cloud.tencent.com/developer/article/2152108?from=15425\&areaSource=102001.1\&traceId=FljMhtwo9aM_HGyL1igk1")

[ 自述 - 《Redux-saga 中文文档》 - 书栈网 · BookStack Redux-saga 中文文档开始安装使用示例sagas.jsmain.js文档在浏览器中使用 umd 构建版本从资源构建示例计数器示例counter-vanillacountercancellable-counter购物车示例异步示例真实项目示例（使用 webpack 的热重载）贡献者 redux-saga 是一个用于管理 Redux 应用异步操作（Side Effects。译注：直译成 “副作 https://www.bookstack.cn/read/redux-saga-in-chinese/README.md](https://www.bookstack.cn/read/redux-saga-in-chinese/README.md " 自述 - 《Redux-saga 中文文档》 - 书栈网 · BookStack Redux-saga 中文文档开始安装使用示例sagas.jsmain.js文档在浏览器中使用 umd 构建版本从资源构建示例计数器示例counter-vanillacountercancellable-counter购物车示例异步示例真实项目示例（使用 webpack 的热重载）贡献者 redux-saga 是一个用于管理 Redux 应用异步操作（Side Effects。译注：直译成 “副作 https://www.bookstack.cn/read/redux-saga-in-chinese/README.md")

redux-saga 是一个用于**管理 Redux 应用异步操作**（Side Effects。译注：直译成 “副作用” 不太通顺，所以这里译为 “异步操作” 更好理解）的中间件（又称异步 action）。redux-saga 通过创建 *Sagas* 将所有的**异步操作逻辑收集在一个地方集中处理**，可以用来代替 `redux-thunk` 中间件。

这意味着应用的逻辑会存在两个地方：

- Reducers 负责处理 action 的 state 更新。
- Sagas 负责协调那些复杂或异步的操作。

&#x20;       **Sagas 是通过 Generator 函数来创建的**。如果你还不熟悉 Generator，可以在这里找到 [一些有用的链接](http://superraytin.github.io/redux-saga-in-chinese/docs/ExternalResources.html "一些有用的链接")。

&#x20;      Sagas 不同于 Thunks，Thunks 是在 action 被创建时调用，而 Sagas 只会在应用启动时调用（但初始启动的 Sagas 可能会动态调用其他 Sagas）。

在 `redux-saga` 的世界里，所有**的任务都通用 yield Effects 来完成**（译注：Effect 可以看作是 redux-saga 的任务单元）。Effects 都是简单的 Javascript 对象，包含了要被 Saga middleware 执行的信息（打个比方，你可以看到 Redux action 其实是一个个包含执行信息的对象）。

因为使用了 Generator，`redux-saga` 让你可以用同步的方式写异步代码。就像你可以使用 `async/await` 函数所能做的一样。但 Generator 可以让你做一些 `async` 函数做不到的事情。

事实上 Sagas yield 普通对象的方式让你能容易地测试 Generator 里所有的业务逻辑，可以通过简单地迭代 yield 过的对象进行简单的单元测试。

此外，redux-saga 启动的任务可以在任何时候通过手动取消，也可以把任务和其他的 Effects 放到 race 方法里以自动取消。

# 安装

```bash 
npm install --save redux-saga
```


# 使用示例

```typescript 
import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import Api from '...'

// workder Saga : 将在 USER_FETCH_REQUESTED action 被发起时调用
export function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}


/*
  在每个 `USER_FETCH_REQUESTED` action 被发起时调用 fetchUser
  允许并发（译注：即同时处理多个相同的 action）
*/
export function* mySaga() {
  yield* takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

/*
  也可以使用 takeLatest
  不允许并发，发起一个 `USER_FETCH_REQUESTED` action 时，
  如果在这之前已经有一个 `USER_FETCH_REQUESTED` action 在处理中，
  那么处理中的 action 会被取消，只会执行当前的
*/
export function* mySaga() {
  yield* takeLatest("USER_FETCH_REQUESTED", fetchUser);
}
```


为了能跑起 Saga，我们需要使用 `redux-saga` 中间件将 Saga 与 Redux Store 建立连接。

main.js

```typescript 
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers'
import mySaga from './sagas'
const sagaMiddleware = createSagaMiddleware(mySaga)
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
// render the application
```


## takeLatest

**takeLatest是非阻塞的。**

顾名思义\*\*takeEvery监听每一次对应action的派发，而takeLatest监听最后一次action的派发，\*\***并自动取消之前已经在启动且任在执行的任务。** 这个和我们的防抖很类似。

如果我们只想得到最新那个请求的响应（例如，始终显示最新版本的数据）。我们可以使用 `takeLatest` 辅助函数。

**用这个可以很优雅的解决重复请求；只获取最后一次请求的值；和防抖类似**

每当一个 action 被发起到 Store，并且匹配 pattern 时，则 takeLatest 将会在后台启动一个新的 saga 任务。 如果此前已经有一个 saga 任务启动了（在当前 action **之前发起的最后一个** action），并且仍在执行中，那么这个任务将**被取消**。 和`takeLeading `相反

```typescript 
export function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

/*
  也可以使用 takeLatest
   不允许并发，发起一个 `USER_FETCH_REQUESTED` action 时，
  如果在这之前已经有一个 `USER_FETCH_REQUESTED` action 在处理中，
  那么处理中的 action 会被取消，只会执行当前的
 */
function* mySaga() {
  yield* takeLatest("USER_FETCH_REQUESTED", fetchUser);
}
```


## throttle

在 X ms内只接受一次请求(节流)

`throttle(ms, pattern, saga, ...args)
`在发起到 Store 并且匹配 pattern 的一个 action 上派生一个 saga。 它在派生一次任务之后，仍然将新传入的 action 接收到底层的 buffer 中，至多保留（最近的）一个。但与此同时，它在 ms 毫秒内将暂停派生新的任务 —— 这也就是它被命名为`节流阀（throttle）`的原因。其用途，是在处理任务时，无视给定的时长内新传入的 action。

```javascript 
import { call, put, throttle } from `redux-saga/effects`

function* fetchAutocomplete(action) {
 const autocompleteProposals = yield call(Api.fetchAutocomplete, action.text)
 yield put({type: 'FETCHED_AUTOCOMPLETE_PROPOSALS', proposals: autocompleteProposals})
}

function* throttleAutocomplete() {
 yield throttle(1000, 'FETCH_AUTOCOMPLETE', fetchAutocomplete)
}
```


## takeLeading

连续多次触发saga只保留第一个(防连点)

`takeLeading(pattern, saga, ...args)
`在发起到 Store 并且匹配 pattern 的每一个 action 上派生一个 saga。 它将在派生一次任务之后阻塞，直到派生的 saga 完成，然后又再次开始监听指定的 pattern, 可以保证只有一个该pattern对应的saga在执行

```javascript 

```


我们在每次 `USER_REQUESTED` action 被发起时，使用`takeLeading`来启动一个新的 `fetchUser`任务。 由于`takeLeading` 在其开始之后便无视所有新传入的任务，我们便可以保证：如果用户以极快的速度连续多次触发 `USER_REQUESTED` action，我们都只会保持以**第一个** action 运行。

## 声明式 Effects

在 `redux-saga` 的世界里，Sagas 都用 Generator 函数实现。我们从 Generator 里 yield 纯 JavaScript 对象以表达 Saga 逻辑。我们称呼那些对象为 *Effect*。Effect 是一个简单的对象，这个对象包含了一些给 middleware 解释执行的信息。

Sagas 可以多种形式 yield Effect。最简单的方式是\*\* yield 一个 Promise\*\*。

举个例子，假设我们有一个监听 `PRODUCTS_REQUESTED` action 的 Saga。每次匹配到 action，它会启动一个从服务器上获取产品列表的任务。

```typescript 
import { takeEvery } from 'redux-saga'
import Api from './path/to/api'
function* watchFetchProduts() {
  yield* takeEvery('PRODUCTS_REQUESTED', fetchProducts)
}
function* fetchProducts() {
  const products = yield Api.fetch('/products')
  console.log(products)
}
```


## 发起 action 到 store

```typescript 
//...
function* fetchProducts(dispatch)
  const products = yield call(Api.fetch, '/products')
  dispatch({ type: 'PRODUCTS_RECEIVED', products })
}
```


我们还需要模拟 `dispatch` 函数。

相反，我们需要同样的声明式的解决方案。只需创建一个对象来指示 middleware 我们需要发起一些 action，然后让 middleware 执行真实的 dispatch。

```typescript 
import { call, put } from 'redux-saga/effects'
//...
function* fetchProducts() {
  const products = yield call(Api.fetch, '/products')
  // 创建并 yield 一个 dispatch Effect
  yield put({ type: 'PRODUCTS_RECEIVED', products })
}
```


## 错误处理

我们可以使用熟悉的 `try/catch` 语法在 Saga 中捕获错误。

```typescript 
import Api from './path/to/api'
import { call, put } from 'redux-saga/effects'
//...
function* fetchProducts() {
  try {
    const products = yield call(Api.fetch, '/products')
    yield put({ type: 'PRODUCTS_RECEIVED', products })
  }
  catch(error) {
    yield put({ type: 'PRODUCTS_REQUEST_FAILED', error })
  }
}
```


当然了，你并不一定得在 `try`/`catch` 区块中处理错误，你也可以让你的 API 服务返回一个正常的含有错误标识的值。例如，你可以捕捉 Promise 的拒绝操作，并将它们映射到一个错误字段对象。

```typescript 
import Api from './path/to/api'
import { take, put } from 'redux-saga/effects'
function fetchProductsApi() {
  return Api.fetch('/products')
    .then(response => {response})
    .catch(error => {error})
}
function* fetchProducts() {
  const { response, error } = yield call(fetchProductsApi)
  if(response)
    yield put({ type: 'PRODUCTS_RECEIVED', products: response })
  else
    yield put({ type: 'PRODUCTS_REQUEST_FAILED', error })
}
```


## take

使用 `takeEvery('*')`（`*` 代表通配符模式），我们就能捕获发起的所有类型的 action。

```typescript 
import { takeEvery } from 'redux-saga'
function* watchAndLog(getState) {
  yield* takeEvery('*', function* logger(action) {
    console.log('action', action)
    console.log('state after', getState())
  })
}
```


现在我们知道如何使用 `take` Effect 来实现和上面相同的功能：

```typescript 
import { take } from 'redux-saga/effects'
function* watchAndLog(getState) {
  while(true) {
    const action = yield take('*')
    console.log('action', action)
    console.log('state after', getState())
  }
}
```


&#x20;        `take` 就像我们更早之前看到的 `call` 和 `put`。它创建另一个命令对象，告诉 middleware 等待一个特定的 action。正如在 `call` Effect 的情况中，middleware 会暂停 Generator，直到返回的 Promise 被 resolve。在\*\* ****`take`****的情况中，它将会暂停 Generator 直到一个匹配的 action 被发起了 \*\*。在以上的例子中，**`watchAndLog`处于暂停状态，直到任意的一个 action 被发起**。

&#x20;       注意，我们运行了一个无限循环的 `while(true)`。记住这是一个 Generator 函数，它不具备 `从运行至完成` 的行为（run-to-completion behavior）。`Generator `将在每次**迭代上阻塞以等待 action 发起**。

&#x20;     使用 `take` 组织代码有一个小问题。在 `takeEvery` 的情况中，被调用的任务**无法控制何时被调用**，它们将在每次 action 被匹配时一遍又一遍地被调用。并且它们也**无法控制何时停止监听**。

&#x20;      而在 `take` 的情况中，控制**恰恰相反**。与 `action `被 *推向（pushed）* 任务处理函数不同，`Saga `是**自己主动 \*****拉取****（**`pulling`**）\* `action `的。看起来就像是 Saga 在执行一个普通的函数调用 `action = getNextAction()`，这个**函数将在 action 被发起时 resolve \*\*。

&#x20;      这样的反向控制让我们能够实现一些使用传统的 *push* 方法做非常规事情的控制流。

&#x20;     一个简单的例子，假设在我们的 Todo 应用中，我们希望**监听用户的操作，并在用户初次创建完三条 Todo 信息时显示祝贺信息**。

```typescript 
import { take, put } from 'redux-saga/effects'
function* watchFirstThreeTodosCreation() {
  for(let i = 0; i < 3; i++) {
    const action = yield take('TODO_CREATED')
  }
  yield put({type: 'SHOW_CONGRATULATION'})
}
```


## 无阻塞调用

```typescript 
import { take, call, put } from 'redux-saga/effects'
import Api from '...'
function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
    return token
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  }
}
function* loginFlow() {
  while(true) {
    const {user, password} = yield take('LOGIN_REQUEST')
    const token = yield call(authorize, user, password)
    if(token) {
      yield call(Api.storeItem({token}))
      yield take('LOGOUT')
      yield call(Api.clearItem('token'))
    }
  }
}
```


`loginFlow` 在一个 `while(true)` 循环中实现它所有的流程，这样做的意思是：**一旦到达流程最后一步（****`LOGOUT`****），通过等待一个新的 ****`LOGIN_REQUEST`**** action 来启动一个新的迭代。**

如果调用 `authorize` 成功，`loginFlow` 将在 DOM storage 中存储返回的 token，**并等待 ****`LOGOUT`**** action**。当用户登出，我们删除存储的 token 并等待一个新的用户登录。

在 `authorize` 失败的情况下，**它将返回一个 undefined 值**，这将导致 `loginFlow` **跳过当前处理进程并等待一个新的 ****`LOGIN_REQUEST`**** action。**

观察整个逻辑是如何存储在一个地方的。一个新的开发者阅读我们的代码时，不必再为了理解控制流而在各个地方来回切换。 &#x20;
这就像是在阅读同步代码：它们的自然顺序确定了执行步骤。并且我们有很多 Effects 可以调用其他函数并等待它们的结果。

### 但上面的方法还是有一个小问题

假设 `loginFlow` 正在等待如下的调用被 resolve：

```typescript 
function* loginFlow() {
  while(true) {
    ...
    try {
      const token = yield call(authorize, user, password)
      ...
    }
    ...
  }
}
```


但用户点击了 `Logout` 按钮使得 `LOGOUT` action 被发起。

下面的例子演示了假想的一系列事件：

```typescript 
UI                              loginFlow
--------------------------------------------------------
LOGIN_REQUEST...................call authorize.......... waiting to resolve
........................................................
........................................................                     
LOGOUT.................................................. missed!
........................................................
................................authorize returned...... dispatch a `LOGIN_SUCCESS`!!
........................................................
```


&#x20;       当 `loginFlow` 在 `authorize` 中被阻塞了，**最终发生在开始调用和收到响应之间的 ****`LOGOUT`**** 将会被错过，因为那时 ****`loginFlow`**** 还没有执行 ****`yield take('LOGOUT')`****。**

&#x20;    上面代码的问题是 **`call`**\*\* 是一个会阻塞的 Effect\*\*。即 Generator 在调**用结束之前不能执行或处理任何其他事情**。但在我们的情况中，我们不仅希望 `loginFlow` 执行授权调用，也想监听可能发生在调用未完成之前的 `LOGOUT` action。因为 `LOGOUT` 与调用 `authorize` 是 *并发的*。

&#x20;      所以我们需要的是一些**非阻塞调用 authorize 的方法**。这样 loginFlow 就可以继续执行，并且监听并发的或响应未完成之前发出的 LOGOUT action。

&#x20;    为了表示无阻塞调用，redux-saga 提供了另一个 Effect：[**fork**](http://leonshi.com/redux-saga-in-chinese/docs/api/index.html#forkfn-args "fork")。当我们 fork 一个 *任务*，任务**会在后台启动，调用者也可以继续它自己的流程，而不用等待被 fork 的任务结束。**

&#x20;     所以为了让 `loginFlow` 不错过一个并发的 `LOGOUT`，我们不应该使用 `call` 调用 `authorize` 任务，而应该使用 `fork`。

```typescript 
import { fork, call, take, put } from 'redux-saga/effects'
function* loginFlow() {
  while(true) {
    ...
    try {
      // 无阻塞调用，这里返回的值是什么？
      const ?? = yield fork(authorize, user, password)
      ...
    }
    ...
  }
}
```


&#x20;      现在的问题是，自从 `authorize` 的 action 在后台启动之后，我们**获取不到 ****`token`**** 的结果（因为我们不应该等待它）**。所以我们需要将 token 存储操作移到 `authorize` 任务内部。

```typescript 
import { fork, call, take, put } from 'redux-saga/effects'
import Api from '...'
function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  }
}
function* loginFlow() {
  while(true) {
    const {user, password} = yield take('LOGIN_REQUEST')
    yield fork(authorize, user, password)
    yield take(['LOGOUT', 'LOGIN_ERROR'])
    yield call(Api.clearItem('token'))
  }
}
```


我们使用了 `yield take(['LOGOUT', 'LOGIN_ERROR'])`。意思是监听 2 个并发的 action：

- 如果 `authorize` 任务在用户登出之前成功了，它将会发起一个 `LOGIN_SUCCESS` action 然后结束。 &#x20;

  然后 `loginFlow` Saga 只会等待一个未来的 `LOGOUT` action 被发起（因为 `LOGIN_ERROR` 永远不会发生）。
- 如果 `authorize` 在用户登出之前失败了，它将会发起一个 `LOGIN_ERROR` action 然后结束。 &#x20;

  那么 `loginFlow` 将在 `LOGOUT` 之前收到 `LOGIN_ERROR`，然后它会进入另外一个 `while` 迭代并等待下一个 `LOGIN_REQUEST` action。
- 如果在 `authorize` 结束之前，用户就登出了，那么 `loginFlow` 将收到一个 `LOGOUT` action 并且也会等待下一个 `LOGIN_REQUEST`。

&#x20;      但是还没完。如果我们在 Api 调用期间收到一个 `LOGOUT` action，我们必须要\*\* 取消 ****`authorize`****处理进程 \*\*，否则将有 2 个并发的任务，

为了取消 fork 任务，我们可以使用一个指定的 Effect [cancel](http://superraytin.github.io/redux-saga-in-chinese/docs/api/index.html#canceltask "cancel")。

```typescript 
import { take, put, call, fork, cancel } from 'redux-saga/effects'
// ...
function* loginFlow() {
  while(true) {
    const {user, password} = yield take('LOGIN_REQUEST')
    // fork return a Task object
    const task = yield fork(authorize, user, password)
    const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
    if(action.type === 'LOGOUT')  yield cancel(task)
    yield call(Api.clearItem('token'))
  }
}
```


&#x20;           `yield fork` 的返回结果是一个\*\* **[**Task 对象**](http://superraytin.github.io/redux-saga-in-chinese/docs/api/index.html#task "Task 对象")**。\*\*我们将它们返回的对象赋给一个本地常量 `task`。如果我们收到一个 `LOGOUT` action，我们将那个 task 传入给 `cancel` Effect。**如果任务仍在运行，它会被中止**。如果任务已完成，那什么也不会发生，取消操作将会是一个空操作（no-op）。最后，如果该任务完成了但是有错误，&#x20;

&#x20;       假设在我们收到一个 `LOGIN_REQUEST` action 时，我们在 reducer 中设置了一些 `isLoginPending` 标识为 true，以便可以在界面上显示一些消息或者旋转 loading。如果此时我们在 Api 调用期间收到一个 `LOGOUT` action，并通过 *杀死它*（即任务被立即停止）简单粗暴地中止任务。那我们可能又以不一致的状态结束了。因为 `isLoginPending` 仍然是 true，而 reducer 还在等待一个结果 action（`LOGIN_SUCCESS` 或 `LOGIN_ERROR`）。

&#x20;     幸运的是，`cancel Effect` 不会粗暴地结束我们的 `authorize` 任务，它会在**里面抛出一个特殊的错误**，给 authorize **一个机会执行它自己的清理逻辑。**而被**取消的任务应该捕捉这个错误，假设它需要在结束之前做一些事情的话。**

&#x20;     我们的 `authorize` 已经有一个 try/catch 区块，但它定义了一个通用的处理程序，这个程序会在每次发生错误时发起 `LOGIN_ERROR` action。但**登录取消并不是错误**。所以 `authorize` 任务必须仅在授权失败时发起 `LOGIN_ERROR` action。

```typescript 
import { isCancelError } from 'redux-saga'
import { take, call, put } from 'redux-saga/effects'
import Api from '...'
function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
    return token
  } catch(error) {
     if(!isCancelError(error))   yield put({type: 'LOGIN_ERROR', error})
  }
}
```


你可能已经注意到了，我们仍然没有做任何与清除 `isLoginPending` 状态相关的事情。对于这一点，有 2 个可能的解决方案（或其他的）。

- 发起一个指定的 action `RESET_LOGIN_PENDING`。
- 或者更简单，让 reducer 收到 `LOGOUT` action 时清除 `isLoginPending`

## 同时执行多个任务

```typescript 
import { call } from 'redux-saga/effects'

// 正确写法, effects 将会同步执行
const [users, repos] = yield [
  call(fetch, '/users'),
  call(fetch, '/repos')
]
```


当我们需要 `yield` 一个包含 effects 的数组， `generator` 会被阻塞直到**所有的 effects 都执行完毕**，或者**当一个 effect 被拒绝** （就像 `Promise.all` 的行为）。

## 在多个 Effects 之间启动 race

有时候我们同时启动多个任务，但又不想等待所有任务完成，我们只希望拿到 *胜利者*：即第一个被 resolve（或 reject）的任务。**`race`** Effect 提供了一个方法，在**多个 Effects 之间触发一个竞赛**（race）。

```typescript 
import { race, take, put } from 'redux-saga/effects'
function* fetchPostsWithTimeout() {
  const {posts, timeout} = yield race({
    posts   : call(fetchApi, '/posts'),
    timeout : call(delay, 1000)
  })
  if(posts)
    put({type: 'POSTS_RECEIVED', posts})
  else
    put({type: 'TIMEOUT_ERROR'})
}
```


`race` 的另一个有用的功能是，它会**自动取消那些失败的 Effects**。

- 第一个用于在后台启动一个任务，这个任务运行在一个无限循环的 `while(true)` 中（例如：每 x 秒钟从服务器上同步一些数据）
- 一旦该后台任务启动了，我们启用第二个按钮，这个按钮用于取消该任务。

```typescript 
import { race, take, put } from 'redux-saga/effects'
function* backgroundTask() {
  while(true) { ... }
}
function* watchStartBackgroundTask() {
  while(true) {
    yield take('START_BACKGROUND_TASK')
    yield race({
      task: call(backgroundTask),
      cancel: take('CANCEL_TASK')
    })
  }
}
```


**在 ****`CANCEL_TASK`**** action 被发起的情况下，****`race`**** Effect 将自动取消 ****`backgroundTask`****，并在 ****`backgroundTask`**** 中抛出一个取消错误。**

## 通过 `yield*` 对 Sagas 进行排序

你可以使用内置的 `yield*` 操作符来组**合多个 Sagas，使得它们保持顺序**。

这让你可以一种简单的程序风格来排列你的 *宏观任务（macro-tasks）*。

```typescript 
function* playLevelOne(getState) { ... }
function* playLevelTwo(getState) { ... }
function* playLevelThree(getState) { ... }
function* game(getState) {
  const score1 = yield* playLevelOne(getState)
  put(showScore(score1))
  const score2 = yield* playLevelTwo(getState)
  put(showScore(score2))
  const score3 = yield* playLevelThree(getState)
  put(showScore(score3))
}
```


注意，使用 `yield*` 将导致该 Javascript 运行环境 *漫延* 至整个序列。 &#x20;

&#x20;   由此产生的迭代器（来自 `game()`）将 yield 所有来自于嵌套迭代器里的值。一个更强大的替代方案是使用更通用的中间件组合机制。

## 组合 Sagas

使用 `yield*` 为组合 Sagas 提供了一种通畅的方式，但这个方法也有一些局限性：

- 你可能会想要单独测试嵌套的 Generator。这导致了一些重复的测试代码及重复执行的开销。 &#x20;

  我们不希望执行一个嵌套的 Generator，而仅仅是想确认它是被传入正确的参数来调用。
- 更重要的是，`yield*` 只允许任务的顺序组合，所以一次你只能 yield\* 一个 Generator。

你可以直接使用 `yield` 来并行地启动一个或多个子任务。当 yield 一个 `call` 至 Generator，Saga 将等待 Generator 处理结束，然后以返回的值恢复执行（或错误从子任务中传播过来，则抛出异常）。

```typescript 
function* fetchPosts() {
  yield put( actions.requestPosts() )
  const products = yield call(fetchApi, '/products')
  yield put( actions.receivePosts(products) )
}
function* watchFetch() {
  while ( yield take(FETCH_POSTS) ) {
    yield call(fetchPosts) // waits for the fetchPosts task to terminate
  }
}
```


yield 一个队列的嵌套的 Generators，将同时启动这些子 Generators（sub-generators），并等待它们完成。 &#x20;
然后以所有返回的结果恢复执行：

```typescript 
function* mainSaga(getState) {
  const results = yield [ call(task1), call(task2), ...]
  yield put( showResults(results) )
}
```


事实上，**yield Sagas 并不比 yield 其他 effects（未来的 actions，timeouts，等等）不同**。 &#x20;
这意味着你可以使用 effect 合并器将那些 Sagas 和所有其他类型的 Effect 合并。

例如，你可能希望用户在有限的时间内完成一些游戏：

```typescript 
function* game(getState) {
  let finished
  while(!finished) {
    // 必须在 60 秒内完成
    const {score, timeout}  = yield race({
      score  : call( play, getState),
      timeout : call(delay, 60000)
    })
    if(!timeout) {
      finished = true
      yield put( showScore(score) )
    }
  }
}
```


## 常见的并发模式

我们看到了如何使用辅助函数 `takeEvery` 和 `takeLatest` 来管理 Effects 之间的并发

在本节中，我们将看到**如何使用低阶 Effects 来实现那些辅助函数**。

### `takeEvery`

```typescript 
function* takeEvery(pattern, saga, ...args) {
  while(true) {
    const action = yield take(pattern)
    yield fork(saga, ...args.concat(action))
  }
}
```


`takeEvery` 可以让多个 `saga` 任务并行**被 fork 执行。**

### `takeLatest`

```typescript 
function* takeLatest(pattern, saga, ...args) {
  let lastTask
  while(true) {
    const action = yield take(pattern)
    if(lastTask)
      yield cancel(lastTask) // 如果任务已经结束，则 cancel 为空操作
    lastTask = yield fork(saga, ...args.concat(action))
  }
}
```


`takeLatest` 不允许多个 `saga` 任务并行地执行。一旦接收到新的发起的 action，它就会取消前面所有 fork 过的任务（如果这些任务还在执行的话）。

在处理 **AJAX 请求的时候，如果我们只希望获取最后那个请求的响应，****`takeLatest`**** 就会非常有用。**

[原理](IT/前端框架/React/react%20状态管理/saga/原理/原理.md "原理")

[effects](effects.md "effects")

[方案](IT/前端框架/React/react%20状态管理/saga/方案/方案.md "方案")
