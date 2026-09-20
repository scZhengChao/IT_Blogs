# search 传参

## 目录

- [使用 url 传参（SearchParams）](#使用-url-传参SearchParams)
- [刷新 SearchParams](#刷新-SearchParams)
- [写入 SearchParams](#写入-SearchParams)
- [Route State](#Route-State)

## 使用 url 传参（SearchParams）

url 传参就是 url 中的 search 对象，来进行页面之间的参数传递，是一种特别常用的前端传参手段，就是我们经常看到 url 中带有一个 `?` 后面跟着一些 `xx=yy&&dd=mm` 之类的字符。 我们可以在页面中取出它们来进行页面逻辑编写。

首先我们介绍一下 Umi 中如何取到 url 中的参数。

```typescript 
import { useSearchParams } from 'umi';
export default () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const a = searchParams.get('a');
    const b = searchParams.get('b');
    return <div>
        <p>SearchParams ---- a:{a};b:{b}</p>
    </div>
}

```


我们使用 `useSearchParams` 来取到 url 中携带的参数，用法非常的便捷。 有读数据，当然也有写数据操作。

## 刷新 SearchParams

可以分为两种情况，当前页面可以使用 `useSearchParams` 返回的第二参数，刷新 `SearchParams`。

```typescript 
import { Link, useSearchParams, createSearchParams } from 'umi';
export default () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const a = searchParams.get('a');
    const b = searchParams.get('b');
    return <div>
        <p>SearchParams ---- a:{a};b:{b}</p>
        <button onClick={() => {
            setSearchParams(createSearchParams({ a: 123, b: 456 }));
        }}>Change SearchParams</button>
    </div>
};

```


## 写入 SearchParams

第二种情况是从别的页面跳转的时候携带 SearchParams

```typescript 
import { useNavigate, createSearchParams } from 'umi';
export default function User() {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => {
                navigate(`/?${createSearchParams({ a: 1, b: 2 })}`)
            }}>go to index has SearchParams!</button>
        </div>
    );
}

```


> 操作 SearchParams 我们都可以通过 Umi 提供的 createSearchParams API 来很轻松的完成。

使用 SearchParams 最大的好**处就是数据永久化**，只要你将完整的链接发送给用户，那链接中都将会携带这些参数。**坏处就是，参数都是显示存在的，对于一些安全性场景的敏感数据，可能太不友好**。所以我们可以使用另外一种隐蔽性更强的方式实现参数传递。

## Route State

```typescript 
import { useNavigate } from 'umi';
export default function User() {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => {
                navigate('/', {
                    state: {
                        c: 987
                    }
                })
            }}>go to index has State!</button>
        </div>
    );
}

```


在首页可以在 `location` 对象中取到 `State`，这个和 `React` 中的 `State` 类似，只不过它是**一个临时性的数据**，当你在全新的环境打开这个链接，将会丢失这个数据。

> 可以使用 `useLocation` 获取到 `location`

```typescript 
import { useLocation } from 'umi';
export default () => {
    const location = useLocation();
    return <div>
        <p>State ---- {location.state}</p>
    </div>
};

```


种参数传递的方式，都有自己的利弊，分别应对不用的项目交付场景，在真实的项目中可以充分分析需求，权衡利弊来使用不同的方式。

当然以上提到的两种方式，是纯路由传参的手段，我们也可以通过前端数据流的方式来实现参数传递。当需要传递一个比较大的对象时，还可以借助服务端的能力，将数据保存到服务端，到新页面再通过接口获取。
