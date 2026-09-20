# 数组

## 目录

- [正确的做法：在跟踪函数中访问数组的属性](#正确的做法在跟踪函数中访问数组的属性)
- [不正确的做法：在跟踪函数中的访问越界的索引](#不正确的做法在跟踪函数中的访问越界的索引)
- [正确的做法：在跟踪函数中访问数组的方法](#正确的做法在跟踪函数中访问数组的方法)
- [不正确的做法：“使用”可观察对象但是没有访问其任何的属性](#不正确的做法使用可观察对象但是没有访问其任何的属性)
- [异步](#异步)
- [注意](#注意)
  - [更改数组中的项中的一个值](#更改数组中的项中的一个值)
    - [store.rtc.list](#storertclist)
    - [store.rtc.list.length](#storertclistlength)

#### 正确的做法：在跟踪函数中访问数组的属性

```javascript 
autorun(() => {
    console.log(message.likes.length)
})
message.likes.push("Jennifer")
```


这将会引发符合预期的响应。`.length`也会被认为是一个属性。 注意：发生在该数组中的\*\*\_任何\_变化都会引发响应\*\*。 数组不是按索引或属性（如可观察对象和 maps）跟踪的，而是作为一个整体跟踪的。

#### 不正确的做法：在跟踪函数中的访问越界的索引

```javascript 
autorun(() => {
    console.log(message.likes[0])
})
message.likes.push("Jennifer")


```


这个实例将会对上面的示例数据作出响应，因为数组索引算作属性访问。但**前提**是提供的`index < length`。 MobX 不跟踪尚未存在的数组索引。 因此，请始终使用`.length`检查（数组越界检查）来保护基于数组索引的访问。

#### 正确的做法：在跟踪函数中访问数组的方法

```javascript 
autorun(() => {
    console.log(message.likes.join(", "))
})
message.likes.push("Jennifer")
```


这将会引发符合预期的响应。所有不改变数组的数组函数都会被自动跟踪

```javascript 
autorun(() => {
    console.log(message.likes.join(", "))
})
message.likes[2] = "Jennifer"
```


这将会引发符合预期的响应。所有的数组索引赋值都会被检测到，但只有在`index <= length`的情况下。

#### 不正确的做法：“使用”可观察对象但是没有访问其任何的属性

```javascript 
autorun(() => {
    message.likes
})
message.likes.push("Jennifer")
```


这将**不会**引发响应，仅仅是因为`likes`数组本身并没有被`autorun`使用，使用的仅仅是该数组的引用。 相比之下，`messages.likes = ['Jennifer']`将会被捕捉并响应，该语句不修改`likes`数组，修改的是`likes`属性本身。

### 异步

```javascript 
autorun(() => {
    setTimeout(() => console.log(message.likes.join(", ")), 10)
})

runInAction(() => {
    message.likes.push("Jennifer")
})


```


这**不会**引发响应。因为在 autorun 的执行过程中，没有任何的可观察对象被访问使用了，只是在`setTimeout`中使用了可观察对象，但\*\*是`setTimeout`\*\***是异步函数，它不是可跟踪的**。

# 注意

## 更改数组中的**项中的一个值**

##### store.rtc.list

- 新增不会重新渲染；
- 方式一的修改；和方式二的修改；均不会引起组件的重新渲染
- 猜测是引用没有变化；浅比较

##### store.rtc.list.length

- 新增会引起变化
- 方式一会引起重新渲染
- 方式二不会引起重新渲染

```typescript 

import {action, makeObservable, observable} from "mobx";
import RootStore from "@/store/index";
import { autoCatchError } from '@/decorators/catchError'
class Rtc<T> {
    rootStore
    @observable isHost=false
    @observable isShare=true
    @observable appid='1232424'
    @observable list:any[]=[]

    @action
    @autoCatchError(true)
    updateAppid(){
        // throw new Error(JSON.stringify())
        // throw {bizCode:1,rtcCode:2,message:'xxxxxx'}
        this.appid = '799999999'
    }
    @action
    addList(){
        this.list.push({
            a:Math.random(),
            b:Math.random()
        })
    }

    @action
    modifyList(){. 
        // this.list[0] = {  // 方式一  
        //     a:Math.random(),
        //     b:Math.random()
        // }
        this.list[0].a = Math.random() //  方式二 
    }

    constructor(rootStore:RootStore<T>) {
        makeObservable(this)
        this.rootStore = rootStore
    }
}
export default Rtc
```


```typescript 
import React, {useContext} from 'react';
import { observer } from 'mobx-react-lite'
import {storeContext} from "@/context/rootStore";
import { Button } from 'antd'
import RootStore from "@/store";
import UiStore from "@/context/uiStore";
const store = new RootStore<UiStore>()

const MobxTest = observer(() => {
    // const store = useContext(storeContext)
    const onUpdate = ()=>{
        store.rtc.addList()
    }
    const onUpdate2 = ()=>{
        store.rtc.modifyList()
    }
    console.log('render',store.rtc.list.length)
    return (
        <div>
            {
                store.rtc.list.length

            }
            <Button onClick={onUpdate} type={'primary'}>新增list</Button>
            <Button onClick={onUpdate2} type={'primary'}>更改list中的项</Button>

        </div>
    );
});

export default MobxTest;
```
