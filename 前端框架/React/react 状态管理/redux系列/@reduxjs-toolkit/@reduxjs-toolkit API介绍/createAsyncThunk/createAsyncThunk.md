# `createAsyncThunk`

`createAsyncThunk`用于\*\*创建一个异步返回`action`\*\***对象的函数**，**自动处理异步操作的生命周期**。

`createAsyncThunk(type,payloadCreator)`：接受两个参数：

- `type`：字符串，表示`action`的类型。在下面的例子中，类型是`users/fetchById`。
- `payloadCreator`：一个异步函数，用于执行异步操作并返回结果 **。这个函数接受一个参数，并返回异步操作中获取的数据。异步操作触发的时候会有三种状态**，`pending`（进行中）、`fulfilled`（成功）、`rejected`（失败）

创建切片时：`extraReducers`是一个函数，**用于处理额外的**\*\*`action`****类型，也就是让切片处理****在别处定义****的返回****`action`****对象的函数，包括由****`createAsyncThunk`****或其他切片生成的返回****`action`对象的函数。\*\*​`extraReducers`函数接受`builder`对象提供了`addCase`方法，用于定义如何处理特定的`action`。

```typescript 
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// 这里只异步请求数据，不会修改切片状态
const fetchUserById = createAsyncThunk('users/fetchById', async (userId) => {
  const response = await axios.get(`https://api.example.com/users/${userId}`);
  return response.data;
});
// 创建切片
const userSlice = createSlice({
  // 切片名
  name: 'user',
  // 定义状态初始值
  initialState: {
    status: 'idle',
    user: null,
    error: null,
  },
  // 使用 extraReducers 定义如何处理异步操作的不同阶段pending、fulfilled、rejected，然后才做状态的修改
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      });
  },
});
// 导出 fetchUserById 异步返回action对象的函数
export { fetchUserById };
// 导出 user这个切片的reducer函数，用于管理user切片的状态
export default userSlice.reducer;

```


1. `fetchUserById.pending`：表示当异步操作开始时，设置`status`为`'loading'`
2. `fetchUserById.fulfilled`：表示当异步操作成功完成时，设置`status`为`'idle'`，并将获取到的用户数据存储在`user`属性中。
3. `fetchUserById.rejected`：表示当异步操作失败时，设置`status`为`'idle'`，并将错误信息存储在`error`属性中。

在React组件中使用这个异步返回action对象的函数

```javascript 
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from './features/user/userSlice';

function UserProfile({ userId }) {
    const dispatch = useDispatch();
    const { status, user, error } = useSelector((state) => state.user);

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserById(userId));
        }
    }, [dispatch, userId]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div>
            <h1>{user.name}</h1>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default UserProfile;

```


在这个组件中，`fetchUserById`触发异步修改仓库数据的方法，被用来派发获取用户数据的请求。组件根据`status`、`user`和`error`的值来显示不同的内容。
