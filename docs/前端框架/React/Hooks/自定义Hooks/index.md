# 自定义Hooks

## 目录

- [useFetch ](#useFetch-)
- [useEventListener ](#useEventListener-)
- [useLocalStorage ](#useLocalStorage-)
- [useMediaQuery ](#useMediaQuery-)
- [useDarkMode ](#useDarkMode-)

# useFetch&#x20;

这个 Hook 接受两个参数，一个是获取数据所需查询的**URL**，另一个是表示要应用于请求的选项的对象。

```javascript 
 import { useState, useEffect } from 'react';
const useFetch = (url = '', options = null) => {};
export default useFetch;
```


获取数据是一个副作用。因此，我们应该使用useEffect Hook 来执行查询。

在本例中，我们使用 Fetch API来发出请求。我们会传递URL和 options。一旦 Promise 被解决，我们就通过解析响应体来检索数据。为此，我们使用json()方法。

然后，我们只需要将它存储在一个React state 变量中。

```javascript 
 import { useState, useEffect } from 'react';
const useFetch = (url = '', options = null) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url, options)
      .then(res => res.json())
      .then(data => setData(data));
  }, [url, options]);
};
export default useFetch;
```


这里，我们还需要处理网络错误，以防我们的请求出错。所以我们要用另一个 state 变量来存储错误。这样我们就能从 Hook 中返回它并能够判断是否发生了错误。

```javascript 
 import { useState, useEffect } from 'react';

const useFetch = (url = '', options = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setData(data);
          setError(null);
        }
      })
      .catch(error => {
        if (isMounted) {
          setError(error);
          setData(null);
        }
      });
  }, [url, options]);
};
export default useFetch;
```


useFetch返回一个对象，其中包含从URL中获取的数据，如果发生了任何错误，则返回错误。

```javascript 
 return { error, data };
```


最后，向用户表明异步请求的状态通常是一个好做法，比如在呈现结果之前显示 loading。

因此，我们添加第三个 state 变量来跟踪请求的状态。在请求之前，将loading设置为true，并在请求之后完成后设置为false。

```javascript 
 const useFetch = (url = '', options = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setError(null);
      })
      .catch(error => {
        setError(error);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [url, options]);

  return { error, data };
};
```


现在，我们可以返回 loading变量，以便在请求运行时在组件中使用它来呈现一个 loading，方便用户知道我们正在获取他们所请求的数据。

```javascript 
 return { loading, error, data };
```


在使用 userFetch 之前，我们还有一件事。

我们需要检查使用我们 Hook 的组件是否仍然被挂载，以更新我们的状态变量。否则，会有内存泄漏。

```javascript 
 import { useState, useEffect } from 'react';

const useFetch = (url = '', options = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setData(data);
          setError(null);
        }
      })
      .catch(error => {
        if (isMounted) {
          setError(error);
          setData(null);
        }
      })
      .finally(() => isMounted && setLoading(false));

    return () => (isMounted = false);
  }, [url, options]);

  return { loading, error, data };
};

export default useFetch;
```


接下就是怎么用了？

我们只需要传递我们想要检索的资源的URL。从那里，我们得到一个对象，我们可以使用它来渲染我们的应用程序。

```javascript 
 import useFetch from './useFetch';

const App = () => {
  const { loading, error, data = [] } = useFetch(
    'https://hn.algolia.com/api/v1/search?query=react'
  );

  if (error) return <p>Error!</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <ul>
        {data?.hits?.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
```


# useEventListener&#x20;

这个 Hook 负责在组件内部设置和清理事件监听器。

这样，我们就不需要每次添加事件监听器,做重复的工作。

这个函数有几个参数，eventType 事件类型，listener 监听函数，target 监听对象，options 可选参数。

```javascript 
 import { useEffect, useRef } from 'react';

const useEventListener = (
  eventType = '',
  listener = () => null,
  target = null,
  options = null
) => {};

export default useEventListener;
```


与前一个 Hook 一样，用 useEffect 来添加一个事件监听器。首先，我们需要确保target 是否支持addEventListener方法。否则，我们什么也不做。

```javascript 
 import { useEffect, useRef } from 'react';

const useEventListener = (
  eventType = '',
  listener = () => null,
  target = null,
  options = null
) => {

  useEffect(() => {
    if (!target?.addEventListener) return;
  }, [target]);
};

export default useEventListener;

```


然后，我们可以添加实际的事件监听器并在卸载函数中删除它。

```javascript 
 import { useEffect, useRef } from 'react';

const useEventListener = (
  eventType = '',
  listener = () => null,
  target = null,
  options = null
) => {
  useEffect(() => {
    if (!target?.addEventListener) return;

    target.addEventListener(eventType, listener, options);

    return () => {
      target.removeEventListener(eventType, listener, options);
    };
  }, [eventType, target, options, listener]);
};
export default useEventListener;
```


实际上，我们也会使用一个引用对象来存储和持久化监听器函数。只有当监听器函数发生变化并在事件监听器方法中使用该引用时，我们才会更新该引用。

```javascript 
 import { useEffect, useRef } from 'react';

const useEventListener = (
  eventType = '',
  listener = () => null,
  target = null,
  options = null
) => {
  const savedListener = useRef();

  useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  useEffect(() => {
    if (!target?.addEventListener) return;

    const eventListener = event => savedListener.current(event);

    target.addEventListener(eventType, eventListener, options);

    return () => {
      target.removeEventListener(eventType, eventListener, options);
    };
  }, [eventType, target, options]);
};

export default useEventListener;

```


我们不需要从此 Hook 返回任何内容，因为我们只是侦听事件并运行处理程序函数传入作为参数。

现在，很容易将事件侦听器添加到我们的组件（例如以下组件）中，以检测DOM元素外部的点击。如果用户单击对话框组件，则在此处关闭对话框组件。

```javascript 
 import { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useEventListener } from './hooks';

const Dialog = ({ show = false, onClose = () => null }) => {
  const dialogRef = useRef();

  // Event listener to close dialog on click outside element
  useEventListener(
    'mousedown',
    event => {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        console.log('Click outside detected -> closing dialog...');
        onClose();
      }
    },
    window
  );
  return show
    ? ReactDOM.createPortal(
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 md:p-12 bg-blurred">
          <div
            className="relative bg-white rounded-md shadow-card max-h-full max-w-screen-sm w-full animate-zoom-in px-6 py-20"
            ref={dialogRef}
          >
            <p className="text-center font-semibold text-4xl">
              What's up{' '}
              <span className="text-white bg-red-500 py-1 px-3 rounded-md mr-1">
                YouTube
              </span>
              ?
            </p>
          </div>
        </div>,
        document.body
      )
    : null;
};
export default Dialog;
```


# useLocalStorage&#x20;

这个 Hook 主要有两个参数，一个是 key，一个是 value。

```javascript 
 import { useState } from 'react';
const useLocalStorage = (key = '', initialValue = '') => {};
export default useLocalStorage; 
```


然后，返回一个数组，类似于使用 useState 获得的数组。因此，此数组将包含有状态值和在将其持久存储在localStorage 中时对其进行更新的函数。

首先，我们创建将与 localStorage 同步的React状态变量。

```javascript 
 import { useState } from 'react';
const useLocalStorage = (key = '', initialValue = '') => {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
};
export default useLocalStorage;
```


在这里，我们使用惰性初始化来读取 localStorage 以获取键的值，如果找到该值，则解析该值，否则返回传入的initialValue。

如果在读取 localStorage 时出现错误，我们只记录一个错误并返回初始值。

最后，我们需要创建 update 函数来返回它将在localStorage 中存储任何状态的更新，而不是使用useState 返回的默认更新。

```javascript 
 import { useState } from 'react';

const useLocalStorage = (key = '', initialValue = '') => {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setLocalStorageState = newState => {
    try {
      const newStateValue =
        typeof newState === 'function' ? newState(state) : newState;
      setState(newStateValue);
      window.localStorage.setItem(key, JSON.stringify(newStateValue));
    } catch (error) {
      console.error(`Unable to store new value for ${key} in localStorage.`);
    }
  };
  return [state, setLocalStorageState];
};
export default useLocalStorage;
```


此函数同时更新React状态和 localStorage 中的相应键/值。这里，我们还可以支持函数更新，例如常规的useState hook。

最后，我们返回状态值和我们的自定义更新函数。

现在可以使用useLocalStorage hook 将组件中的任何数据持久化到localStorage中。

```javascript 
 import { useLocalStorage } from './hooks';

const defaultSettings = {
  notifications: 'weekly',
};

function App() {
  const [appSettings, setAppSettings] = useLocalStorage(
    'app-settings',
    defaultSettings
  );

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="flex items-center mb-8">
        <p className="font-medium text-lg mr-4">Your application's settings:</p>

        <select
          value={appSettings.notifications}
          onChange={e =>
            setAppSettings(settings => ({
              ...settings,
              notifications: e.target.value,
            }))
          }
          className="border border-gray-900 rounded py-2 px-4 "
        >
          <option value="daily">daily</option>
          <option value="weekly">weekly</option>
          <option value="monthly">monthly</option>
        </select>
      </div>

      <button
        onClick={() => setAppSettings(defaultSettings)}
        className="rounded-md shadow-md py-2 px-6 bg-red-500 text-white uppercase font-medium tracking-wide text-sm leading-8"
      >
        Reset settings
      </button>
    </div>
  );
}

export default App;
```


# useMediaQuery&#x20;

这个 Hook 帮助我们在功能组件中以编程方式测试和监控媒体查询。这是非常有用的，例如，当你需要渲染不同的UI取决于设备的类型或特定的特征。

我们的 Hook 接受3个参数:

- 首先，对应媒体查询的字符串数组
- 然后，以与前一个数组相同的顺序匹配这些媒体查询的值数组
- 最后，如果没有匹配的媒体查询，则使用默认值

```javascript 
 import { useState, useCallback, useEffect } from 'react';
const useMediaQuery = (queries = [], values = [], defaultValue) => {};
export default useMediaQuery;
```


我们在这个 Hook 中做的第一件事是为每个匹配的媒体查询构建一个媒体查询列表。使用这个数组通过匹配媒体查询来获得相应的值。

```javascript 
 import { useState, useCallback, useEffect } from 'react';

const useMediaQuery = (queries = [], values = [], defaultValue) => {
  const mediaQueryList = queries.map(q => window.matchMedia(q));
};

export default useMediaQuery;

```


为此，我们创建了一个包装在useCallback 中的回调函数。检索列表中第一个匹配的媒体查询的值，如果没有匹配则返回默认值。

```javascript 
 import { useState, useCallback, useEffect } from 'react';

const useMediaQuery = (queries = [], values = [], defaultValue) => {
  const mediaQueryList = queries.map(q => window.matchMedia(q));

  const getValue = useCallback(() => {
    const index = mediaQueryList.findIndex(mql => mql.matches);
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
  }, [mediaQueryList, values, defaultValue]);
};

export default useMediaQuery;
```


然后，我们创建一个React状态来存储匹配的值，并使用上面定义的函数来初始化它。

```javascript 
 import { useState, useCallback, useEffect } from 'react';

const useMediaQuery = (queries = [], values = [], defaultValue) => {
  const mediaQueryList = queries.map(q => window.matchMedia(q));

  const getValue = useCallback(() => {
    const index = mediaQueryList.findIndex(mql => mql.matches);
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
  }, [mediaQueryList, values, defaultValue]);

  const [value, setValue] = useState(getValue);
};

export default useMediaQuery;

```


最后，我们在 useEffect 中添加一个事件监听器来监听每个媒体查询的更改。当发生变化时，我们运行更新函数。

```javascript 
 import { useState, useCallback, useEffect } from 'react';

const useMediaQueryii= (queries = [], values = [], defaultValue) => {
  const mediaQueryList = queries.map(q => window.matchMedia(q));

  const getValue = useCallback(() => {
    const index = mediaQueryList.findIndex(mql => mql.matches);
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
  }, [mediaQueryList, values, defaultValue]);

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    const handler = () => setValue(getValue);
    mediaQueryList.forEach(mql => mql.addEventListener('change', handler));

    return () =>
      mediaQueryList.forEach(mql => mql.removeEventListener('change', handler));
  }, [getValue, mediaQueryList]);

  return value;
};

export default useMediaQuery;

```


我最近使用的一个简单的例子是添加一个媒体查询来检查设备是否允许用户悬停在元素上。这样，如果用户可以悬停或应用基本样式，我就可以添加特定的不透明样式。

```javascript 
 import { useMediaQuery } from './hooks';

function App() {
  const canHover = useMediaQuery(
    // Media queries
    ['(hover: hover)'],
    // Values corresponding to the above media queries by array index
    [true],
    // Default value
    false
  );

  const canHoverClass = 'opacity-0 hover:opacity-100 transition-opacity';
  const defaultClass = 'opacity-100';

  return (
    <div className={canHover ? canHoverClass : defaultClass}>Hover me!</div>
  );
}

export default App;

```


# useDarkMode&#x20;

这个是我的最爱。它能轻松快速地将暗模式功能应用于任何React应用程序。

这个 Hook 主要按需启用和禁用暗模式，将当前状态存储在localStorage 中。

为此，我们将使用我们刚刚构建的两个钩子:useMediaQuery和useLocalStorage。

然后，使用“ useLocalStorage”，我们可以在localStorage中初始化，存储和保留当前状态（暗或亮模式）。

```javascript 
 import { useEffect } from 'react';
import useMediaQuery from './useMediaQuery';
import useLocalStorage from './useLocalStorage';

const useDarkMode = () => {
  const preferDarkMode = useMediaQuery(
    ['(prefers-color-scheme: dark)'],
    [true],
    false
  );
};

export default useDarkMode;

```


最后一部分是触发副作用，以向document.body元素添加或删除dark类。这样，我们可以简单地将dark样式应用于我们的应用程序。

```javascript 
 import { useEffect } from 'react';
import useMediaQuery from './useMediaQuery';
import useLocalStorage from './useLocalStorage';

const useDarkMode = () => {
  const preferDarkMode = useMediaQuery(
    ['(prefers-color-scheme: dark)'],
    [true],
    false
  );

  const [enabled, setEnabled] = useLocalStorage('dark-mode', preferDarkMode);

  useEffect(() => {
    if (enabled) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [enabled]);

  return [enabled, setEnabled];
};

export default useDarkMode;
```


[  http://toutiao.com/i6932247297065517576/?tt\_from=weixin\&utm\_campaign=client\_share\&wxshare\_count=1\&timestamp=1614078721\&app=news\_article\&utm\_source=weixin\&utm\_medium=toutiao\_android\&use\_new\_style=1\&req\_id=2021022319120101015010510347042346\&share\_token=8d80bc21-b806-44cd-986f-22d37c497af9\&group\_id=6932247297065517576](http://toutiao.com/i6932247297065517576/?tt_from=weixin\&utm_campaign=client_share\&wxshare_count=1\&timestamp=1614078721\&app=news_article\&utm_source=weixin\&utm_medium=toutiao_android\&use_new_style=1\&req_id=2021022319120101015010510347042346\&share_token=8d80bc21-b806-44cd-986f-22d37c497af9\&group_id=6932247297065517576 "  http://toutiao.com/i6932247297065517576/?tt_from=weixin\&utm_campaign=client_share\&wxshare_count=1\&timestamp=1614078721\&app=news_article\&utm_source=weixin\&utm_medium=toutiao_android\&use_new_style=1\&req_id=2021022319120101015010510347042346\&share_token=8d80bc21-b806-44cd-986f-22d37c497af9\&group_id=6932247297065517576")

[ref](./ref/index.md "ref")

[持久化](./持久化/index.md "持久化")

[更新](./更新/index.md "更新")

[监听网络状态](./监听网络状态/index.md "监听网络状态")

[复制加版权标识](./复制加版权标识/index.md "复制加版权标识")

[监听窗口大小变化](./监听窗口大小变化/index.md "监听窗口大小变化")

[监听系统主题色变化](./监听系统主题色变化/index.md "监听系统主题色变化")

[监听storage变化](./监听storage变化/index.md "监听storage变化")
