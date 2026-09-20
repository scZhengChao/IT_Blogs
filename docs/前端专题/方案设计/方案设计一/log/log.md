# log

## 目录

- [console](#console)
- [node环境](#node环境)
  - [颜色参考](#颜色参考)
  - [colors-console插件](#colors-console插件)

# console

```typescript 
console.log('%c Success','color: green;font-size: 1.5em') // 颜色 字体 大小

// 1.将css样式传递给数组
const styles = [ 
  'color：green'，
  'background：yellow'，
  'font-size：30px'，
  'border：1px solid red'，
  'text-shadow：2px 2px black'，
  'padding：10px'，
]。join（';'）; // 2.连接单个数组项并将它们连接成一个用分号分隔的字符串（;）
// 3.传递样式变量
console.log（'％c Hello There'，styles）;


```


1、console.log 用于输出普通信息

2、[console.info](http://console.info "console.info") 用于输出提示性信息

3、console.error用于输出错误信息

4、console.warn用于输出警示信息

5、console.debug用于输出调试信息

6、console.dirxml用来显示网页的某个节点（node）所包含的html/xml代码

7、console.group输出一组信息的开头

8、console.groupEnd结束一组输出信息

9、console.assert对输入的表达式进行断言，只有表达式为false时，才输出相应的信息到控制台

10、console.count（这个方法非常实用哦）当你想统计代码被执行的次数

11、console.dir(这个方法是我经常使用的 可不知道比for in方便了多少)直接将该DOM结点以DOM树的结构进行输出，可以详细查对象的方法发展等等

12、console.time 计时开始

13、console.timeEnd 计时结束（看了下面的图你瞬间就感受到它的厉害了）

14、console.profile和console.profileEnd配合一起使用来查看CPU使用相关信息

15、console.timeLine和console.timeLineEnd配合一起记录一段时间轴

16、console.trace 堆栈跟踪相关的调试

# node环境

```javascript 
console.log('\x1B[31m%s\x1B[0m', '这是红色')
console.log('\x1B[36m%s\x1B[0m', '这是青色')
```


规则说明

- **`\x1B[31m`**\*\* 是一个转义序列，它将被您的终端拦截并指示它切换到红色。****`\x1B`****是不可打印控制字符 的代码escape。仅处理颜色和样式的转义序列也称为 **[**ANSI转义码**](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors "ANSI转义码")** 并且是标准化的，因此它们（应该）可以在任何平台上工作。这里可以指定多种样式****`\x1B[31m\x1B[42m`****；\*\*
- **`%s`**\*\* 是字符串（第二个参数）被注入的位置；上述代码还可以这样写：\*\* ​

```javascript 
console.log('\x1B[31m这是红色\x1B[0m')
console.log('\x1B[36m这是青色\x1B[0m')
```


- **`\x1B[0m`**\*\* 表示重置终端颜色，使其在此之后不再继续成为所选颜色；\*\* ​

## 颜色参考

```javascript 
{
 'bright' : '\x1B[1m', // 亮色
 'grey' : '\x1B[2m', // 灰色
 'italic' : '\x1B[3m', // 斜体
 'underline' : '\x1B[4m', // 下划线
 'reverse' : '\x1B[7m', // 反向
 'hidden' : '\x1B[8m', // 隐藏
 'black' : '\x1B[30m', // 黑色
 'red' : '\x1B[31m', // 红色
 'green' : '\x1B[32m', // 绿色
 'yellow' : '\x1B[33m', // 黄色
 'blue' : '\x1B[34m', // 蓝色
 'magenta' : '\x1B[35m', // 品红
 'cyan' : '\x1B[36m', // 青色
 'white' : '\x1B[37m', // 白色
 'blackBG' : '\x1B[40m', // 背景色为黑色
 'redBG' : '\x1B[41m', // 背景色为红色
 'greenBG' : '\x1B[42m', // 背景色为绿色
 'yellowBG' : '\x1B[43m', // 背景色为黄色
 'blueBG' : '\x1B[44m', // 背景色为蓝色
 'magentaBG' : '\x1B[45m', // 背景色为品红
 'cyanBG' : '\x1B[46m', // 背景色为青色
 'whiteBG' : '\x1B[47m' // 背景色为白色
}
```


## colors-console插件

```javascript 
npm i colors-console -D
```


- **颜色参数为字符串时**

```javascript 
1. const colors = require('colors-console')
2. console.log('颜色是：' + colors('red', '红色'))
3. console.log('颜色是：', colors('cyan', '青色'))
```


- **颜色参数为数组时**

```javascript 
console.log(colors(['red','greenBG','underline'], '这是红色、绿色背景、下划线'))
```
