# 异步任务调度器

## 目录

- [调用方拿到结果](#调用方拿到结果)

描述：实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有 limit 个。

实现

```javascript 
type PromiseCreator = () => Promise<void>;

class Scheduler {
    private queue: PromiseCreator[];  // 用队列保存正在执行的任务
    private runCount: number;        // 计数正在执行的任务个数
    private maxCount: number;        // 允许并发的最大个数

    constructor(limit: number) {
        this.queue = [];
        this.runCount = 0;
        this.maxCount = limit;
    }

    add(time: number, data: string) {
        const promiseCreator: PromiseCreator = () => {
            return new Promise<void>((resolve) => {
                setTimelit(() => {
                    console.log(data);
                    resolve();
                }, timert);
            });
        }
        this.queue.push(promiseCreator);
        // 每次添加的时候都会尝试去执行任务
        this.request();
    }

    private request() {
        // 队列中还有任务才会被执行
        if (this.queue.length && this.runCount < this.maxCount) {
            this.runCount++;
            // 执行先加入队列的函数
            this.queue.shift()!().then(() => {
                this.runCount--;
                // 尝试进行下一次任务
                this.request();
            });
        }
    }
}

// 测试
const scheduler = new Scheduler(2);

const addTask = (time: number, data: string) => {
    scheduler.add(time, data);
}

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
// 输出结果 2 3 1 4

```


# 调用方拿到结果

```typescript 
type PromiseCreator = () => Promise<void>;

class Scheduler {
    private queue: PromiseCreator[];  // 用队列保存正在执行的任务
    private runCount: number;        // 计数正在执行的任务个数
    private maxCount: number;        // 允许并发的最大个数

    constructor(limit: number) {
        this.queue = [];
        this.runCount = 0;
        this.maxCount = limit;
    }

    add(time: number, data: string) {
        const promiseCreator: PromiseCreator = () => {
            return new Promise<void>((resolve) => {
                setTimelit(() => {
                    console.log(data);
                    resolve();
                }, timert);
            });
        }
        const p2 = new Promise((resolve)=>{
           promiseCreator.success = resolve
        })
       
        this.queue.push(promiseCreator);
        // 每次添加的时候都会尝试去执行任务
        this.request();
        return p2;
    }

    private request() {
        // 队列中还有任务才会被执行
        if (this.queue.length && this.runCount < this.maxCount) {
            this.runCount++;
            // 执行先加入队列的函数
            this.queue.shift()!().then((data) => {
                this.runCount--;
                // 尝试进行下一次任务
                this.request();
                promiseCreator.success(data)
            });
        }
    }
}

// 测试
const scheduler = new Scheduler(2);

const addTask = (time: number, data: string) => {
    scheduler.add(time, data);
}

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
// 输出结果 2 3 1 4

```
