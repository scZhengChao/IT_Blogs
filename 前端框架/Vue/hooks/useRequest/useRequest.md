# useRequest

## 目录

- [思考](#思考)

封装

```javascript 
function useApi(api) {
    const loading = ref(false)
    const result = ref(null)
    const error = ref(null)

    const fetchResource = (params) => {
        loading.value = true
        return api(params).then(data => {
            // 按照约定，api返回的结果直接复制给result
            result.value = data
        }).catch(e => {
            error.value = e
        }).finally(() => {
            loading.value = false
        })
    }
    return {
        loading,
        error,
        result,
        fetchResource
    }
}

```


使用

```javascript 
function useBook2() {
    const {loading, error, result, fetchResource,} = useApi(fetchBookList)

    onMounted(() => {
        fetchResource({page: 1})
    })

    return {
        loading,
        error,
        list: result
    }
}


或者
function fetchUserList() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const payload = {
                code: 200,
                data: [11, 22, 33],
                msg: 'success'
            }
            resolve(payload)
        }, 1000)
    })
}

function useUser() {
    const {loading, error, result, fetchResource,} = useApi((params) => {
        // 封装请求返回值
        return fetchUserList(params).then(res => {
            console.log(res)
            if (res.code === 200) {
                return res.data
            }
            return []
        })
    })
    // ...
}


```


### 思考

处理网络请求是前端工作中十分常见的问题，处理上面列举到的加载、错误处理等，还可以包含去抖、节流、轮询等各种情况，还有离开页面时取消未完成的请求等，都是可以在`useRequest`中进一步封装的
