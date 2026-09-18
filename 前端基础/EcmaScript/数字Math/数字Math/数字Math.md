# 数字Math

## 目录

- [Api](#Api)
- [随机六位数字验证码](#随机六位数字验证码)
- [从数组中获取最小值/最大值](#从数组中获取最小值最大值)
- [math.pow](#mathpow)

# **Api**

```javascript 
 Math.round() 四舍五入 
Math.ceil()  向上取整
Math.floor() 向下取整
Math.trunc() 去除小数部分返回整数部分,空值和不是数值的值返回NaN

Math.abs()   取绝对值
Math.max/min()  取最大最小值 ==> Math.max.apply( null , arr )
Math.random()   取随机数包括0不包括1

Math.sign()  用来判断一个数是正负数还是0: 1 ,-1 ,0,-0,NaN

Math.pow(x,y)   x的y次幂   
var hu = 2*Math.PI/360  角度转弧度
Math.atan2(y,x)   返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）。
Math.sin/cos(hudu)   sin/cos
Math.sqrt(x)   返回x的平方根。
Math.cbrt() 计算一个数的立方根
Math.hypot() 返回所有参数的平方和的平方根 Math.hypot( 3,4) ==5

```


# **随机六位数字验证码**

```javascript 
 const code = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
```


# 从数组中获取最小值/最大值

```javascript 
 您可以使用 Math.min() 或 Math.max() 结合扩展运算符来查找数组中的最小值或最大值。 
const numbers = [6, 8, 1, 3, 9];    
console.log(Math.max(...numbers)); // 9
console.log(Math.min(...numbers));   // 1    
```


# math.pow

```javascript 
Math.pow(底数x,指数y)
const data = [3,2,1].reduce(Math.pow).    // 9

```
