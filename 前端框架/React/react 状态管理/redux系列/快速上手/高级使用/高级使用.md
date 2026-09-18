# 高级使用

## 目录

- [1. 模块化 Redux 结构 (Ducks 模式)](#1-模块化-Redux-结构-Ducks-模式)
  - [目录结构](#目录结构)
  - [用户模块示例 (user.js)](#用户模块示例-userjs)
- [2. 组合多个 reducer](#2-组合多个-reducer)
- [3. 复杂组件中的使用](#3-复杂组件中的使用)
  - [使用多个 selector 和 action](#使用多个-selector-和-action)
- [4. 性能优化技巧](#4-性能优化技巧)
  - [使用 memoized selectors (reselect)](#使用-memoized-selectors-reselect)
  - [在组件中使用](#在组件中使用)
- [5. 中间件增强](#5-中间件增强)
  - [自定义日志中间件](#自定义日志中间件)
  - [API 调用中间件](#API-调用中间件)
- [6. Redux 与 Context API 结合](#6-Redux-与-Context-API-结合)
- [7. Redux Toolkit 简化复杂场景](#7-Redux-Toolkit-简化复杂场景)
- [8. 类型安全 (TypeScript)](#8-类型安全-TypeScript)

## 1. 模块化 Redux 结构 (Ducks 模式)

### 目录结构

```javascript 
src/
  store/
    index.js       # 主store配置
    modules/       # 各功能模块
      user.js      # 用户模块
      product.js   # 产品模块
      cart.js      # 购物车模块
```


### 用户模块示例 (user.js)

```javascript 
// 初始状态
const initialState = {
  data: null,
  loading: false,
  error: null
};

// action types
const FETCH_USER_REQUEST = 'user/FETCH_REQUEST';
const FETCH_USER_SUCCESS = 'user/FETCH_SUCCESS';
const FETCH_USER_FAILURE = 'user/FETCH_FAILURE';

// action creators
export const fetchUser = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_USER_REQUEST });
  try {
    const response = await api.getUser(userId);
    dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_USER_FAILURE, error: error.message });
  }
};

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true };
    case FETCH_USER_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case FETCH_USER_FAILURE:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
}

// selectors
export const selectUser = (state) => state.user.data;
export const selectUserLoading = (state) => state.user.loading;
```


## 2. 组合多个 reducer

```javascript 
// store/index.js
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './modules/user';
import productReducer from './modules/product';

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
```


## 3. 复杂组件中的使用

### 使用多个 selector 和 action

```javascript 
import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { 
  fetchUser, 
  updateUser,
  selectUser,
  selectUserLoading,
  selectUserError
} from '../store/modules/user';
import { selectCartItems } from '../store/modules/cart';

function UserProfile({ userId }) {
  const dispatch = useDispatch();
  
  // 使用多个selector
  const { user, loading, error } = useSelector(state => ({
    user: selectUser(state),
    loading: selectUserLoading(state),
    error: selectUserError(state)
  }), shallowEqual); // 浅比较避免不必要的重渲染
  
  const cartItems = useSelector(selectCartItems);
  
  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);
  
  const handleSave = (userData) => {
    dispatch(updateUser(userData));
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Cart items: {cartItems.length}</p>
      <UserForm user={user} onSave={handleSave} />
    </div>
  );
}
```


## 4. 性能优化技巧

### 使用 memoized selectors (reselect)

```bash 
npm install reselect
```


```javascript 
// store/modules/product/selectors.js
import { createSelector } from 'reselect';

const selectProducts = (state) => state.product.items;

export const selectFeaturedProducts = createSelector(
  [selectProducts],
  (products) => products.filter(p => p.featured)
);

export const selectProductById = (productId) => 
  createSelector(
    [selectProducts],
    (products) => products.find(p => p.id === productId)
  );
```


### 在组件中使用

```typescript 
const featuredProducts = useSelector(selectFeaturedProducts);
const product = useSelector(selectProductById(productId));
```


## 5. 中间件增强

### 自定义日志中间件

```javascript 
const loggerMiddleware = store => next => action => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next state:', store.getState());
  return result;
};

// 应用中间件
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, loggerMiddleware)
);
```


### API 调用中间件

```javascript 
const apiMiddleware = ({ dispatch }) => next => action => {
  if (action.type.endsWith('_API')) {
    const [startType, successType, failureType] = [
      `${action.type}_REQUEST`,
      `${action.type}_SUCCESS`,
      `${action.type}_FAILURE`
    ];
    
    dispatch({ type: startType });
    
    return api.call(action.payload)
      .then(response => 
        dispatch({ type: successType, payload: response.data }))
      .catch(error => 
        dispatch({ type: failureType, error: error.message }));
  }
  
  return next(action);
};
```


## 6. Redux 与 Context API 结合

对于局部状态，可以结合 Context API 使用：

```javascript 
const UserContext = React.createContext();

function UserProvider({ children }) {
  const user = useSelector(selectCurrentUser);
  
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

// 在深层子组件中使用
function Avatar() {
  const user = useContext(UserContext);
  return <img src={user.avatarUrl} />;
}
```


## 7. Redux Toolkit 简化复杂场景

```javascript 
// store/modules/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId, thunkAPI) => {
    const response = await api.getUser(userId);
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {
    // 同步actions
    clearUser: (state) => {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  }
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
```


## 8. 类型安全 (TypeScript)

```typescript 
// store/types.ts
interface UserState {
  data: User | null;
  loading: boolean;
  error: string | null;
}

interface RootState {
  user: UserState;
  product: ProductState;
}

// 在组件中使用类型化的hooks
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// 组件中使用
const user = useTypedSelector(state => state.user.data);
```
