# 基本使用

## 目录

- [react-redux将@reduxjs/toolkit创建的仓库和React进行关联](#react-redux将reduxjstoolkit创建的仓库和React进行关联)
- [导出action](#导出action)
  - [使用](#使用)

创建 `Store`仓库

```javascript 
// store/index.js 使用@reduxjs/toolkit创建仓库
import { createSlice,configureStore } from '@reduxjs/toolkit';
// 创建切片
let msgSlice = createSlice({
    // 必须给切片一个名称，name会作为action type的前缀
    name:'msgSlice',
    // initialState定义初始值
    initialState: {
        singer: "G.E.M.",
        album: ['G.E.M.', '18', 'My Secret', 'Xposed', '新的心跳', '摩天动物园', '启示录']
    },
    // reducers定义修改数据的行为
    reducers:{
        changeSinger(state,action){
            // state接受修改前的上一个仓库状态的数据
            // action接受调用方法传入的参数
            state.singer = action.payload;
        },
        resetSinger(state){
            state.singer = "G.E.M.";
        }
    }
})
// 整合切片创建仓库，传入一个对象，reducer属性需要取出切片的reducer属性，不能直接给切片
let store = configureStore({
    reducer:{
        msgReducer:msgSlice.reducer
    }
})
// 暴露仓库
export default store;

```


在这个例子中，创建了一个名为`msgSlice`的切片，并定义了`reducer`函数来处理不同的操作。这些函数可以直接修改状态对象，而不需要返回一个新的对象。

#### react-redux将@reduxjs/toolkit创建的仓库和React进行关联

react-redux和和React组件进行关联

```javascript 
// main.jsx
import { createRoot } from 'react-dom/client' // 用于渲染页面的
import React from 'react' // 用于创建组件的
import { Provider } from 'react-redux'; // 引入react-redux的Provider组件，然后用这个组件包裹App组件完成react-redux的全局注册
import App from './App.jsx'
import store from './store/index.js';
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App></App>
    </Provider>
)

```


react-redux将@reduxjs/toolkit创建的仓库在React组件中使用

```typescript 
// App.jsx
import React from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux'
export default function App(props) {
  const store = useStore();
  // 输出仓库状态
  console.log(store.getState(), 'state')
  const singer = useSelector((state) => state.msgReducer.singer);
  const album = useSelector((state) => state.msgReducer.album);
  const dispatch = useDispatch();
  // dispatch action修改仓库数据
  const change = () => {
    // msgSlice就是切片的名称
    dispatch({ type: "msgSlice/changeSinger", payload: "G.E.M. 邓紫棋" });
  };
  const reset = () => {
    dispatch({ type: "msgSlice/resetSinger" });
  };
  return (
    <div>
      <h1>My App</h1>
      <p>歌手：{singer}</p>
      <p>专辑：</p>
      {
        album.map((item, index) => {
          return <p key={index}>{item}</p>
        })
      }
      <button onClick={change}>change</button>
      <button onClick={reset}>reset</button>
    </div>
  );
}

```


仓库状态输出结果如下：

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/3026987fa2894e5cbbc59474a7532169~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pifXw==:q75.awebp?rk3s=f64ab15b\&x-expires=1748322926\&x-signature=S7sEShoeeXaCs4OvpZUPenDrYug%3D)

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/28305772f7214d55807bc8c2dd425ced~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pifXw==:q75.awebp?rk3s=f64ab15b\&x-expires=1748322926\&x-signature=GEZz%2FyhHpnYzR8WGhvofkbA7OOQ%3D)

> 一般@reduxjs/toolkit触发dispatch修改仓库数据不会像上面一样使用，**而是将切片的**\*\*`actions`****属性暴露出去，切片的****`actions`****属性里面包含了切片定义的****`reducers`方法，这样在dispatch修改仓库数据时就不用传\*\*入`type`和`payload`属性了，可以直接传入要修改的数据，它会作为`action`对象的`payload`属性值。

# 导出action

```javascript 
// src/store/index.js
import { createSlice, configureStore } from '@reduxjs/toolkit';
// 创建切片
let msgSlice = createSlice({
    // 必须给切片一个名称，在修改数据时会用到
    name: 'msgSlice',
    // initialState定义初始值
    initialState: {
        singer: "G.E.M.",
        album: ['G.E.M.', '18', 'My Secret', 'Xposed', '新的心跳', '摩天动物园', '启示录']
    },
    // reducers定义修改数据的行为
    reducers: {
        changeSinger(state, action) {
            console.log(action,'传入的action对象')
            // state接受修改前的上一个仓库状态的数据
            // action接受调用方法传入的参数，这里只能是payload接受传入的值
            state.singer = action.payload;
        },
        resetSinger(state) {
            state.singer = "G.E.M.";
        }
    }
})
// 整合切片创建仓库，传入一个对象，reducer属性需要取出切片的reducer属性，不能直接给切片
let store = configureStore({
    reducer: {
        msgReducer: msgSlice.reducer
    }
})
console.log(msgSlice.actions,'切片的actions属性');
// 暴露切片的actions属性用于修改仓库数据
export let { changeSinger, resetSinger } = msgSlice.actions;
// 暴露仓库
export default store;

```


## 使用

```javascript 
// src/App.jsx
import React from 'react';
import { useSelector, useStore, useDispatch } from 'react-redux'
import { changeSinger, resetSinger } from './store/index.js'
export default function App(props) {
  const store = useStore();
  // 输出仓库状态
  console.log(store.getState(), 'state')
  const singer = useSelector((state) => state.msgReducer.singer);
  const album = useSelector((state) => state.msgReducer.album);
  const dispatch = useDispatch();
  // dispatch action修改仓库数据
  const change = () => {
    // dispatch传入的action对象就不再是普通的js对象，而是切片暴露的actions属性中的修改方法
    // 这个传入的参数就是要修改的数据，它会作为action对象的payload属性来修改数据
    dispatch(changeSinger("G.E.M. 邓紫棋"));
  };
  const reset = () => {
    dispatch(resetSinger());
  };
  return (
    <div>
      <h1>My App</h1>
      <p>歌手：{singer}</p>
      <p>专辑：</p>
      {
        album.map((item, index) => {
          return <p key={index}>{item}</p>
        })
      }
      <button onClick={change}>change</button>
      <button onClick={reset}>reset</button>
    </div>
  );
}

```


切片的`actions`属性：

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/7e3a3aa50af945c28316c7e9c644be81~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pifXw==:q75.awebp?rk3s=f64ab15b\&x-expires=1748322926\&x-signature=WpvjS7ykg8zMMVfQRcQZroq2ApA%3D)

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e0740f0aa10747ce8a20456753292a5f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pifXw==:q75.awebp?rk3s=f64ab15b\&x-expires=1748322926\&x-signature=0s%2Ff7rMqkmTTiMbhzuJv0SzXmf8%3D)
