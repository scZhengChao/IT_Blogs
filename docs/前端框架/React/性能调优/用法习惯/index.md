# 用法习惯

## 目录

- [过多的声明state](#过多的声明state)
  - [问题](#问题)
  - [解决方法](#解决方法)
- [不必要的state](#不必要的state)
  - [问题](#问题)
  - [解决方法](#解决方法)
- [过多的useEffect](#过多的useEffect)
  - [问题](#问题)
  - [解决方法](#解决方法)
- [请求竞争问题](#请求竞争问题)
  - [问题](#问题)
  - [解决方法](#解决方法)

# 过多的声明state

## 问题

一个组件中声明了过多的state，过多的setState方法。例如下面的这样：

```typescript 
import { useState } from "react";

export default function MoreState() {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const onSubmit = () => {
    // ...
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="username"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="text"
        name="age"
        placeholder="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <br />
      <input
        type="text"
        name="gender"
        placeholder="gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
      <br />
      <input
        type="text"
        name="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="text"
        name="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input
        type="text"
        name="address"
        placeholder="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <br />
      <input
        type="text"
        name="city"
        placeholder="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <br />
      <button type="submit">提交</button>
    </form>
  );
}
```


**实际上这样并不好维护，接手项目的人都疯了😄。还有这样的：**

![](./assets/image/image_0toYzV67oz.png)

## 解决方法

把**能合并的state，合并成一个对象表示。**当然也可以使用useReducer。当**属性中出现嵌套结构时，例如属性中有对象和数组时，使用**[**useReducer**](https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer "useReducer")**更好一些。**

```typescript 
import { useState } from "react";

export default function MoreState() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    age: "",
    gender: "",
    email: "",
    password: "",
    address: "",
    city: ""
  });

  const onChange = (e) => {
    setUserInfo((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(111, userInfo);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="username"
        placeholder="username"
        onChange={onChange}
      />
      <br />
      <input type="text" name="age" placeholder="age" onChange={onChange} />
      <br />
      <input
        type="text"
        name="gender"
        placeholder="gender"
        onChange={onChange}
      />
      <br />
      <input type="text" name="email" placeholder="email" onChange={onChange} />
      <br />
      <input
        type="text"
        name="password"
        placeholder="password"
        onChange={onChange}
      />
      <br />
      <input
        type="text"
        name="address"
        placeholder="address"
        onChange={onChange}
      />
      <br />
      <input type="text" name="city" placeholder="city" onChange={onChange} />
      <br />
      <button type="submit">提交</button>
    </form>
  );
}
```


```typescript 
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```


> 注意
> React 会确保 `dispatch` 函数的标识是稳定的，并且不会在组件重新渲染时改变。这就是为什么可以安全地从 `useEffect` 或 `useCallback` 的依赖列表中省略 `dispatch`。

# 不必要的state

## 问题

我们在开发React表单时，通常会使用state来记录表单的值，例如：

```typescript 
import { useState } from "react";

export default function NoState() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("需要提交的数据", username, password);
  };

  console.log("组件重新渲染了");

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">名字</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <label htmlFor="name">密码</label>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">提交</button>
    </form>
  );
}
```


上面的代码看似并没有什么问题，但是我们**只是在提交的时候用到了state**，**并没有在其他地方使用过这些state。**这个例子中我们并不关心这些state值的变化，我们只关心我们提交的数据是否正确。而且我们每次输入的时候组件都是重新渲染。这并不友好，这个时候我们**需要非受控组件。**

## 解决方法

**当表单元素不多时，使用ref来处理，** 并且每次输入都不会引起组件的重新渲染，因为这个时候我们只关心提交的数据，没有在其他地方使用过这些state。

```typescript 
import { useRef } from "react";

export default function NoState() {
  const usernameRef = useRef();
  const posswordRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(
      "需要提交的数据",
      usernameRef.current.value,
      posswordRef.current.value
    );
  };

  console.log("组件重新渲染了");

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">名字</label>
      <input type="text" ref={usernameRef} />
      <br />
      <label htmlFor="name">密码</label>
      <input type="text" ref={posswordRef} />
      <br />
      <button type="submit">提交</button>
    </form>
  );
}
```


# 过多的useEffect

## 问题

有时当页面第一次挂载时，我们需要进行网络请求，我们经常会这样写：

```typescript 
import { useEffect, useState } from "react";

export default function MoreUseEffect() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("/ss/ss").then((res) => {
      setData(res.data);
    });
  }, []);

  useEffect(() => {
    // 进行其他逻辑处理...
    console.log(data);
  }, [data]);

  return <>页面第一次加载时请求</>;
}
```


引入了过多的useEfffect，实际上我们只是需要使用请求到的数据来进行其他逻辑的处理，并不需要数据变化时做一些事情。

## 解决方法

把数据的处理逻辑放入第一个useEffect中直接处理。

```typescript 
import { useEffect } from "react";

export default function MoreUseEffect() {

  useEffect(() => {
    fetch("/ss/ss").then((res) => {
      // setData(res.data);
      // 在这里直接进行数据处理...
      console.log('')
    });
  }, []);

  return <>页面第一次加载时请求</>;
}
```


# 请求竞争问题

## 问题

下面是对fetch请求进行了封装，这种写法有一个问题：当同时有多个请求时，由于请求返回的时间不一样，会出现竞争关系，不会按照请求的顺序返回结果，这样就造成返回的结果不知道是哪次的。

```typescript 
import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => setLoading(false));
  }, [url]);

  return {
    loading,
    data,
    error
  };
}
```


## 解决方法

需要在请求URL变化之后取消前一次的请求。（这个地方有问题；不过思路借鉴一下换成ref就可以了）

```typescript 
import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    fetch(url, { signal: controller.signal })
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => setLoading(false));
    return () => {
      controller.abort();
    };
  }, [url]);

  return {
    loading,
    data,
    error
  };
}
```
