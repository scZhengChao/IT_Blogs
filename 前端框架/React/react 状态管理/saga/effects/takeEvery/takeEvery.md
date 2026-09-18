# takeEvery

## 目录

- [takeEvery](#takeEvery)

## takeEvery

> takeEvery是一个高级语法糖，**内部是靠take实现的**，takeEvery是一个死循环，**会一直监听，他不会阻塞saga执行。**

`takeEvery` 允许多个 `fetchData` 实例同时启动。在某个特定时刻，我们可以启动一个新的 `fetchData` 任务，尽管之前还有一个或多个 `fetchData` 尚未结束。

```javascript 
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
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}
```
