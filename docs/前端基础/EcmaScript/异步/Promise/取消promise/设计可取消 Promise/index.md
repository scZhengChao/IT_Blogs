# 设计可取消 Promise

> 这个也不是真正的取消；promise里的调用时同步执行了；取消不掉

```typescript 
type CancellablePromise<T> = [Promise<T>, () => void];

function makeCancellable<T>(promise: Promise<T>): CancellablePromise<T> {
  let rejectFn: (reason?: any) => void;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    rejectFn = reject; // 保存 reject 函数引用以便后续调用

    promise.then(
      (value) => {
        if (rejectFn !== null) { // 如果没有被取消，那么解决 wrappedPromise
          resolve(value);
          rejectFn = null; // 清除 rejectFn 引用，避免内存泄漏
        }
      },
      (error) => {
        if (rejectFn !== null) { // 如果没有被取消，那么拒绝 wrappedPromise
          reject(error);
          rejectFn = null; // 清除 rejectFn 引用，避免内存泄漏
        }
      }
    );
  });

  const cancel = () => {
    if (rejectFn !== null) {
      rejectFn({ cancelled: true }); // 立即拒绝 wrappedPromise
      rejectFn = null; // 防止内存泄漏，清除 rejectFn 引用
    }
  };

  return [wrappedPromise, cancel];
}

// 使用示例
const [cancellablePromise, cancel] = makeCancellable(new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve("Resolved after 2 seconds");
  }, 2000);
}));

cancellablePromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    if (error && error.cancelled) {
      console.log("Promise was cancelled");
    } else {
      console.log("Promise was rejected with error:", error);
    }
  });

// 立即取消 Promise
cancel();

```
