# await-to-js

## 目录

- [example](#example)

我们在使用 `async...await` 进行异步编程的时候，如果当前异步操作失败了，**为了不影响后面代码的执行，就需要将 ****`await`**** 语句放在 ****`try...catch`**** 语句里面。**

那么整个程序上，就可能会有很多个 `try...catch`语句 ，代码上不美观，可读性也很差。

所以 `await-to-js` 库就是为了解决这个问题，让代码能够优雅地捕获 `await` 异常。

> 其实原理也很简单： 核心就是 await  会把函数变成promise

GitHub 地址：[github.com/scopsy/awai…](https://link.juejin.cn/?target=https://github.com/scopsy/await-to-js "github.com/scopsy/awai…")

也可以用 `github1s` 访问，速度更快：[github1s.com/scopsy/awai…](https://link.juejin.cn/?target=https://github1s.com/scopsy/await-to-js/blob/HEAD/examples/example-1.js "github1s.com/scopsy/awai…")

源码也很简洁：

```typescript 
/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export function to<T, U = Error> (
  promise: Promise<T>,
  errorExt?: object
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }

      return [err, undefined];
    });
}

export default to;

```


## example

```typescript 
import to from '../../dist';

const UserModel = {
  findById: (userId) => {
    return new Promise((resolve, reject) => {
      if(userId) {
        const userObjet = {
          id: userId,
          notificationsEnabled: true
        };

        return resolve(userObjet);
      }

      reject('Data is missing');
    });
  }
};

const TaskModel = function ({userId, name}) {
  return new Promise((resolve, reject) => {
    if(userId && name) {
      const newTask = {
        assignedUser: {
          id: userId
        }
      };

      return resolve(newTask);
    }

    reject('Data is missing');
  });
};

const NotificationService = {
  sendNotification: (userId, name) => {
    return new Promise((resolve, reject) => {
      if(userId && name) return resolve('Success');

      reject('Data is missing');
    });
  }
};


async function asyncTask(userId, cb) {
  let err, user, savedTask, notification;
  [ err, user ] = await to(UserModel.findById(userId));
  if(!(user && user.id)) return cb('No user found');

  [ err, savedTask] = await to(TaskModel({userId: user.id, name: 'Demo Task'}));
  if(err) return cb('Error occurred while saving task');

  if(user.notificationsEnabled) {
    [ err ] = await to(NotificationService.sendNotification(user.id, 'Task Created'));
    if(err) return cb('Error while sending notification');
  }

  if(savedTask.assignedUser.id !== user.id) {
    [ err, notification ] = await to(NotificationService.sendNotification(savedTask.assignedUser.id, 'Task was created for you'));
    if(err) return cb('Error while sending notification');
  }

  cb(null, savedTask);
}


asyncTask(1, (err, newTask) => {
  console.log('new task created');
  console.log(err);
  console.log(newTask);
});

asyncTask(null, (err, newTask) => {
  console.log('fail');
  console.log(err);
  console.log(newTask);
});

```
