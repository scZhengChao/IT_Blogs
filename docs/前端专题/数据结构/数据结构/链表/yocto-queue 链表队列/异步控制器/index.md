# 异步控制器

## 目录

- [链表](#链表)
- [封装](#封装)
- [测试](#测试)
- [1](#1)
- [2](#2)

# 链表

```react tsx 
class Item {
    public value:any;
    public next:any;
    public actionRes:any
    public actionError:any
    public head:any
    public instance:any
    public flag:boolean = false
    public timeOutNum:number
    constructor(value:any,instance:any,timeOutNum=3000) {
        this.value = value;
        this.instance = instance
        this.timeOutNum = timeOutNum
        this.run()
    }
    public cancelAction:any
    public timeOutError = new Error('timeoutError')
    public cancelInstance = new Error('promiseCancel')
    public cancelFlag:boolean = false
    public timeoutPromise(){
        return new Promise((resolve,reject)=>{
            this.cancelAction = resolve
            setTimeout(()=>{
                reject(this.timeOutError)
            },this.timeOutNum)
        })
    }

    public run(){
        Promise.race([this.value?.action,this.timeoutPromise()]).then?.((res:any)=>{
            this.actionRes = {
                done:true,
                data:res
            }
        })?.catch?.((err:Error)=>{
            this.actionError = {
                done:true,
                data:this.timeOutError
            }
        }).finally(()=>{
          this.isHeader()
        })
    }
    public cancel = ()=>{
        this.cancelFlag = true
        return this.cancelAction(this.cancelInstance)
    }
    public isHeader(){
        if(!this.head){
            this.outAnswer()
        }
    }
    public removeHead(){
        this.head = undefined
    }
    public outAnswer(){
        if((this.actionRes?.done || this.actionError?.done) && !this.flag){
            this.flag = true
            if(!this.cancelFlag){
                if(this.actionRes?.done) this.value?.onSuccess(this.actionRes.data)
                if(this.actionError?.done) this.value?.onError(this.actionError.data)
            }
            this.instance.dequeue()
            this.next?.removeHead()
            this.next?.outAnswer?.()
        }

    }
}

class Queue {
    public head:any;
    public tail:any;
    public _size:number = 0;

    constructor() {
        this.clear();
    }

    enqueue(value:any,timeOut:number) {
        const node = new Item(value,this,timeOut);

        if (this.head) {
            this.tail.next = node;
            node.head = this.tail
            this.tail = node;
        } else {
            this.head = node;
            this.tail = node;
        }
        this._size++;
        return node
    }

    dequeue() {
        const current = this.head;
        if (!current) {
            return;
        }

        this.head = this.head.next;
        this._size--;
        return current.value;
    }

    clear() {
        this.head = undefined;
        this.tail = undefined;
        this._size = 0;
    }
}
const queue = new Queue()
export default queue
```


# 封装

```react tsx 
/**
 * 实现一个异步控制器，通过该控制器，可以将并行的多个异步方法（如ajax调用等），在执行完成后，按异步调用的创建顺序输出结果
 * 该控制器需要具备：
 *   1. （基础题）创建异步的方法 on，会按照 *调用on创建异步的先后顺序* 执行传递的回调参数 onSuccess/onError；可参考 src/pages/test1-5 五种测试示例
 *   2. （能力提升题）方法 on 返回一个 cancel 句柄（返回值是函数方法），执行后可取消该次异步的输出，*无论异步方法执行成功或者失败*
 *   3. （能力提升题）为控制器类提供超时功能，默认超时时间 3秒，超时针对每个异步调用本身，超时需要返回并打印 TimeoutError错误日志，
 *       已超时的不再输出异步执行结果
 *
 * tips:
 *   5种测试示例已拆分到 src/pages/test1、... 、src/pages/test5 5个路由页面中，可直接前往对应的页面查看打印和调试代码，
 *   如：http://localhost:8000/test1
 */
import queue from './Queue'
interface IAsyncScheduler {
  on(promise: Promise<any>, onSuccess?: Function, onError?: Function): () => void;
}

// TODO: 根据题干描述要求，完成该类的实现，可以任意定义成员
export class AsyncScheduler implements IAsyncScheduler {
  on(
    promise: Promise<any>,
    onSuccess?: Function,
    onError?: Function
  ): () => any {
    const node = queue.enqueue({
      action:promise,
      onSuccess,
      onError
    },3500)
    return node.cancel
  }
}

```


# 测试

# 1

```react tsx 
import { memo, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './index.less';
import { AsyncScheduler } from '@/utils/scheduler.util';
import { delay } from '@/utils/async.util';

const cx = classNames.bind(styles);

/** 测试场景一：顺序打印
 *  1
 *  2
 *  3
 * */
const Test1 = memo(() => {
  useEffect(() => {
    const scheduler = new AsyncScheduler();

    scheduler.on(
      delay(1000),
      () => console.log(1),
      (err: Error) => console.error(err),
    );

    scheduler.on(
      delay(500),
      () => console.log(2),
      (err: Error) => console.error(err),
    );

    scheduler.on(
      delay(2000),
      () => console.log(3),
      (err: Error) => console.error(err),
    );
  }, [])

  return <div className={cx('')} >test1</div>
});
Test1.displayName = 'Test1';

export default Test1;

```


# 2

```react tsx 
import { memo, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './index.less';
import { AsyncScheduler } from '@/utils/scheduler.util';
import { delay } from '@/utils/async.util';

const cx = classNames.bind(styles);

/** 测试场景四：顺序打印，取消第二次调用的输出
 *  1
 *  TimeoutError （控制台超时错误日志）
 * */
const Test = memo(() => {
  useEffect(() => {
    const scheduler = new AsyncScheduler();

    scheduler.on(
      delay(1000),
      () => console.log(1),
      (err: Error) => console.error(err),
    );

    const cancel2 = scheduler.on(
      delay(500),
      () => console.log(2),
      (err: Error) => console.error(err),
    );

    scheduler.on(
      delay(4000),
      () => console.log(3),
      (err: Error) => console.error(err),
    );

    setTimeout(() => {
      cancel2();
    }, 300);
  }, [])

  return <div className={cx('')} />
});
Test.displayName = 'Test';

export default Test;

```
