# 处理竞态问题

## 目录

- [竞态问题](#竞态问题)
  - [封装](#封装)
    - [获取数据](#获取数据)

# 竞态问题

两个不同的请求 “相互竞争”，并以与你预期不符的顺序返回。

**为了修复这个问题，你需要添加一个 **[**清理函数**](https://zh-hans.react.dev/learn/synchronizing-with-effects#fetching-data "清理函数")** 来忽略较早的返回结果：**

```javascript 
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    let ignore = false;
    fetchResults(query, page).then(json => {
      if (!ignore) {
        setResults(json);
      }
    });
    return () => {
      ignore = true;
    };
  }, [query, page]);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}

```


## 封装

```javascript 
function SearchResults({ query }) {
  const [page, setPage] = useState(1);
  const params = new URLSearchParams({ query, page });
  const results = useData(`/api/search?${params}`);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}

function useData(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let ignore = false;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setData(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, [url]);
  return data;
}
```


**虽然仅仅使用自定义 Hook 不如使用框架内置的数据获取机制高效，但将数据获取逻辑移动到自定义 Hook 中将使后续采用高效的数据获取策略更加容易**

### 获取数据

如果 Effect 将会获取数据，清理函数应该要么 [中止该数据获取操作](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController "中止该数据获取操作")，要么忽略其结果：

```typescript 
useEffect(() => {
   let ignore = false; 

  async function startFetching() {
    const json = await fetchTodos(userId);
     if (!ignore) {
      setTodos(json);
    } 
  }

  startFetching();

   return () => {
    ignore = true;
  }; 
}, [userId]);
```


我们无法撤消已经发生的网络请求，但是清理函数应当确保获取数据的过程以及获取到的结果不会继续影响程序运行。如果 `userId` 从 `'Alice'` 变为 `'Bob'`，那么请确保 `'Alice'` 响应数据被忽略，即使它在 `'Bob'` 之后到达。
