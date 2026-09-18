# 总结

创建切片总结：

```typescript 
import { createSlice } from '@reduxjs/toolkit';

// createAsyncThunk 创建一个异步action允许执行异步逻辑, 通常用于发出异步请求。
// 异步逻辑触发的时候会有三种状态：pending（进行中）、fulfilled（成功）、rejected（失败）
export const getData = createAsyncThunk();

// 创建一个 Slice（切片）
export const counterSlice = createSlice({
  // 命名空间，name会作为action type的前缀
  name: 'counter',
  
  // 初始化状态
  initialState: {},
  
  // 定义reducer更新状态的函数
  // reducer函数也就是组件中dispatch指定的action所使用的函数
  reducers: {
    xxx: (state, action) => {},
  },
  // extraReducers 字段让切片可 以处理在别处定义的reducer更新状态的函数 ， 
  // 包括由 createAsyncThunk或其他切片生成的reducer更新状态的函数。
  extraReducers() {},
});

// 导出action函数
export const { xxx } = counterSlice.actions;

// 导出reducer，创建store
export default counterSlice.reducer;
```


需要先安装：

```markdown 
npm install @reduxjs/toolkit react-redux

```


创建不同切片：

```javascript 
// store/numSlice.js
import { createSlice } from '@reduxjs/toolkit'
const numSlice = createSlice({
    name: "num",
    initialState: {
        likeCount:6
    },
    reducers: {
        addLikeCount: (state, action) => {
            state.likeCount++;
        },
        minusLikeCount: (state) => {
            state.likeCount--;
        }
    }
})
export const { addLikeCount, minusLikeCount } = numSlice.actions
export default numSlice.reducer

```


```javascript 
// store/singerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// 异步加载数据，只异步请求数据
const loadAlbumApi = createAsyncThunk('singer/loadAlbum', async (userName) => {
    // 模拟网络请求，计时器延迟3秒返回数据
    const res = await new Promise((reslove, reject) => {
        setTimeout((...args) => {
            console.log(args, 'args')
            if (args[0] != '') {
                if (args[0] == '邓紫棋') {
                    reslove(['G.E.M.', '18', 'My Secret', 'Xposed', '新的心跳', '摩天动物园', '启示录'])
                }else {
                    reslove([])
                }
            } else {
                reject("未获取到歌手名")
            }
        }, 3000, userName)
    })
    return res
})
const singerSlice = createSlice({
    name: "singer",
    initialState: {
        singer: "G.E.M.",
        status: 'idle',
        error: "",
        album: []
    },
    reducers: {
        changeSinger: (state, action) => {
            state.singer = action.payload;
        },
        resetSinger: (state) => {
            state.singer = "G.E.M."
        }
    },
    // 根据异步获取的数据来修改切片状态
    extraReducers: (builder) => {
        builder.addCase(loadAlbumApi.pending, state => {
            state.status = 'loading';
        })
            .addCase(loadAlbumApi.fulfilled, (state, action) => {
                state.status = 'idle';
                state.error = "未查询到数据";
                state.album = action.payload;
            }).addCase(loadAlbumApi.rejected, (state, action) => {
                state.status = 'idle';
                state.album = [];
                state.error = action.error.message;
            })
    }
})
export { loadAlbumApi }
export const { changeSinger, resetSinger } = singerSlice.actions
export default singerSlice.reducer

```


创建仓库：

```javascript 
// store/index.js
import { configureStore } from '@reduxjs/toolkit'
import singerReducer from './singerSlice.js'
import numReducer from './numSlice.js'

const store = configureStore({
    reducer:{
        singer:singerReducer,
        num:numReducer
    }
})

export default store

```


将仓库数据关联到React

```react jsx 
// main.jsx
import { createRoot } from 'react-dom/client' // 用于渲染页面的
import React from 'react' // 用于创建组件的
import { Provider } from 'react-redux'
import store from './store/index.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App msg='我是一条消息' />
    </Provider>
)

```


React组件中使用仓库管理：

```javascript 
// App.jsx
import React, { useState } from 'react';
import { useSelector, useStore, useDispatch } from 'react-redux'
import { addLikeCount, minusLikeCount } from './store/numSlice.js'
import { changeSinger, resetSinger, loadAlbumApi } from './store/singerSlice.js'
export default function App(props) {
  const store = useStore();
  // 输出仓库状态
  console.log(store.getState(), 'state')
  let [inputValue, setInputValue] = useState('');
  const changeInputHandle = (e) => {
    setInputValue(e.target.value)
  }
   const singer = useSelector((state) => state.singer.singer); 
  const album = useSelector((state) => state.singer.album);
  const status = useSelector(state => state.singer.status);
  const error = useSelector(state => state.singer.error)
  const likCount = useSelector(state => state.num.likeCount)
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
  const increment = () => {
    dispatch(addLikeCount());
  }
  const decrement = () => {
    dispatch(minusLikeCount());
  }
  const btnSearchAlbum = () => {
     dispatch(loadAlbumApi(inputValue)); 
  }
  return (
    <div>
      <h1>My App</h1>
      <p>歌手：{singer}</p>
      <p>点赞数：{likCount}</p>
      <button onClick={increment}>点赞</button>
      <button onClick={decrement}>取消点赞</button>
      <button onClick={change}>修改歌手名</button>
      <button onClick={reset}>重置歌手名</button>
      <br />
      <h6>查询专辑：</h6>
      <input type="text" value={inputValue} onChange={changeInputHandle} placeholder='请输入歌手名' />
      <button onClick={btnSearchAlbum}>获取</button>
      <p>专辑：</p>
      {
        status == 'idle' ? album.length != 0 ? album.map((item, index) => {
          return <p key={index}>{item}</p>
        }) : <div>{error}</div> : <div>{status}</div>
      }
    </div>
  );
}
```
