# promisePool

> 📌没有另一个方法好

请你编写一个异步函数 `promisePool` ，它接收一个异步函数数组 `functions` 和 池限制 `n`。它应该返回一个 `promise` 对象，当所有输入函数都执行完毕后，`promise` 对象就执行完毕。

池限制 定义是一次可以挂起的最多 `promise` 对象的数量。`promisePool` 应该开始执行尽可能多的函数，并在旧的 `promise` 执行完毕后继续执行新函数。`promisePool` 应该先执行 `functions[i]`，再执行 `functions[i + 1]`，然后执行 `functions[i + 2]`，等等。当最后一个 `promise` 执行完毕时，`promisePool` 也应该执行完毕。

例如，如果 `n = 1` , `promisePool` 在序列中每次执行一个函数。然而，如果 `n = 2` ，它首先执行两个函数。当两个函数中的任何一个执行完毕后，再执行第三个函数(如果它是可用的)，依此类推，直到没有函数要执行为止。

你可以假设所有的 `functions` 都不会被拒绝。对于 `promisePool` 来说，返回一个可以解析任何值的 `promise` 都是可以接受的。

实现

```javascript 
type F = () => Promise<any>;

function promisePool(functions: F[], n: number): Promise<any[]> {
    let fNext = 0; // 下一个要执行的函数的索引

    // 递归调用该函数以依次执行下一个函数
    const evaluateNext = async (): Promise<void> => {
        if (fNext >= functions.length) {
            // 如果所有函数都已执行，则退出
            return;
        }
        const fn = functions[fNext++]; // 获取下一个要执行的函数
        await fn(); // 执行函数并等待其完成
        await evaluateNext(); // 递归调用 evaluateNext，继续执行下一个函数
    };

    // 同时启动 n 个 evaluateNext()调用来保持 n 个异步任务并发
    const runners = new Array(n).fill(null).map(() => evaluateNext());

    // 等待所有启动的任务完成
    return Promise.all(runners)
}

```
