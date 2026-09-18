# 命令式与函数式

命令式：你命令机器去做事情（**how**），得到你想要的（**what**）

声明式：你告诉机器你需要什么（**what**），让机器想出如何去做（**how**）

举个例子🌰

完成目标：拿到一个数组中的每项数字或包含数字的字符串，获得这些数字乘以 2 之后相加的结果。

如果完成上述目标，我们用命令式的方式会写出如下代码：

```javascript 
const source = [1, 5, 9, 3, 'hi', 'tb', 456, '11', 'yoyoyo'];
let total = 0;

for (let i = 0; i < source.length; i++) {
  let num = parseInt(source[i], 10);
  if (!isNaN(num)) {
    total += num * 2;
  }
}

```


即一步步的告知计算机要做什么（**how**），如遍历数组，对每一项进行 parseInt 操作，判断如果不是 NaN 时就相加，最后得到相加的结果（**what**）。

通过函数式或者声明式的方式，我们会写出如下代码：

```javascript 
const source = [1, 5, 9, 3, 'hi', 'tb', 456, '11', 'yoyoyo'];

let total = source
  .map(x => parseInt(x, 10))
  .filter(x => !isNaN(x))
  .map(x => x * 2)
  .reduce((total, value) => total + value )

```


上面的代码则是告知机器我想要什么（**what**），如我想要对数据进行映射（map）、过滤（filter）、再映射（map）、最后进行聚合（reduce）得到结果，由计算机自己想出如何进行 map、filter、reduce 等操作，我不需要关心 map、filter、reduce 底层的实现细节。
