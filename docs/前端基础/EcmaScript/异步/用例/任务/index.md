# 任务

下面的打印顺序是？

```javascript 
setTimeout(() => {
  console.log(1);
}, 0);

new Promise((resolve) => {
  console.log(2);
  resolve();
}).then(() => console.log(3));

function callMe() {
  console.log(4);
}

(async () => {
  await callMe();
  console.log(5);
})();

```


答案是：2, 4, 3, 5, 1

主线任务：2，4

微任务：3，5

宏任务：1
