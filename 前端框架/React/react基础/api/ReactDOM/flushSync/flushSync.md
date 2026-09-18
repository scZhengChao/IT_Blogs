# flushSync

`flushSync` 可以将**回调函数中的更新任务，放在一个较高的优先级中**。我们知道`react`设定了很多不同优先级的更新任务。如果一次更新任务在`flushSync`回调函数内部，那么将获得一个较高优先级的更新。比如

```react tsx 
ReactDOM.flushSync(()=>{
    /* 此次更新将设置一个较高优先级的更新 */
    this.setState({ name: 'alien'  })
})
```


为了让大家理解`flushSync`，我这里做一个`demo`奉上，

```react tsx 
/* flushSync */
import ReactDOM from 'react-dom'
class Index extends React.Component{
    state={ number:0 }
    handerClick=()=>{
        setTimeout(()=>{
            this.setState({ number: 1  })
        })
        this.setState({ number: 2  })
        ReactDOM.flushSync(()=>{
            this.setState({ number: 3  })
        })
        this.setState({ number: 4  })
    }
    render(){
        const { number } = this.state
        console.log(number) // 打印什么？？
        return <div>
            <div>{ number }</div>
            <button onClick={this.handerClick} >测试flushSync</button>
        </div>
    }
}

```


> **打印 0 3 4 1 ，相信不难理解为什么这么打印了。**

- 首先 `flushSync this.setState({ number: 3 })`设定了一个高优先级的更新，所以3 先被打印 &#x20;
- 2 4 被批量更新为 4 &#x20;

相信这个`demo`让我们更深入了解了`flushSync`。
