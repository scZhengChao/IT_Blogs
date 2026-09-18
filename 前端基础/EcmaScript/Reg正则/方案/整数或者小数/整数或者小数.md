# 整数或者小数

## 目录

- [整数](#整数)
- [整数或者小数](#整数或者小数)
- [整数或者2位小数](#整数或者2位小数)
- [封装](#封装)
  - [保留两位小数的价格输入框](#保留两位小数的价格输入框)

# 整数

```regex 
  /^[1-9]$/
```


# 整数或者小数

```regex 
  /^[0-9]+([.]{1}[0-9]+){0,1}$/
```


# 整数或者2位小数

```regex 
/^[0-9]+([.]{1}[0-9]{1,2}){0,1}$/ig}
```


# 封装

```react tsx 
import { FormRule } from 'antd';
import { isNumber } from 'ahooks/es/utils';

export const generateNumFieldRule =(min:number,max:number,isFloat:boolean=true,floatLength:string='2')=>{
  const rule:string = isFloat?`^[0-9]+([.]{1}[0-9]{1,${floatLength}}){0,1}$`:'^[0-9]*$'
  const tip:string = isFloat?`请输入最多保留${floatLength}位小数的数字`:'请输入正整数'
  const reg:RegExp = new RegExp(rule,'g')
  return ({
    validator: async (rule: FormRule, value: string) => {
      if (!reg.test(value)) {
        return Promise.reject(tip);
      }
      if (isNumber(Number(value)) && Number(value) <= max && Number(value)>=min) {
        return Promise.resolve();
      } else {
        return Promise.reject(`请输入${min}-${max}之间的数值`);
      }
    },
  })
};
```


### 保留两位小数的价格输入框

具体代码如下：

```javascript 
// 输入限制
const changePiece = (e) =>{
      e.target.value = e.target.value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1');
  }
  return (
    <div>
       <input type="text" onKeyUp={ (e) => {changePiece(e)}} /> 
    </div>
  );

```
