# 截断数字

## 目录

- [截断数字](#截断数字)
- [四舍五入](#四舍五入)

### 截断数字

当你需要将小数点后的某些数字截断而不取四舍五入

```javascript 
const toFixed = (n, fixed) => `${n}`.match(new RegExp(`^-?\d+(?:.\d{0,${fixed}})?`))[0]
toFixed(10.255, 2) // 10.25

```


### 四舍五入

当你需要将小数点后的某些数字截断，并取四舍五入

```javascript 
const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)
round(10.255, 2) // 10.26

```
