# redux-thunk

```javascript 
 import {createStore,applyMiddleware} from 'redux';
import state from './state';
import reducer from './reducer';
import thunk from 'redux-thunk' //配合解出中间件 thunk 配合applymiddleware,解决dispatch(fn)
//1.创建store对象
let store = createStore(
    reducer,
    state,
    applyMiddleware(thunk)
);
export default store;
异步actiion;
export let asyncAction = (type, url, options) => (dispatch, getstate) => {
if (options) {
    url = url +"?" + queryString.stringify(options)
}
dispatch({ type: types.bloadding, payload: true })
return fetch(
    url,
    {
        credentials:"include"
    }
    ).then((res) =>{
        return res.json()
    }).then(
        data => {
        if (data.err == 0) {
            dispatch({ type: type, payload: data });
            // console.log(data)
        }
        dispatch({ type: types.bloadding, payload: false });
        // console.log(getstate())
        return data
    }
    )
}
```
