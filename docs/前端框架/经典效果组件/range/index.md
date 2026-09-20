# range

![](./image/image_Af2ulfXPs5.png)

```typescript 
import {memo, useEffect, useRef} from 'react';
import  { useState } from 'react';
import styles from './index.module.less'; // 样式文件
import { useEventListener,useMount} from 'ahooks'
import FJInputNumber from "@/components/FJInputNumber";
interface FjRangeProps {
    min:number;
    max:number;
    defaultValue?:number
    step?:number;
    onChange:(num:number)=>void;
    label:string
    value:number;
    className?:string;
}

const FjRange = memo<FjRangeProps>((props) => {
    const {
        min = 0,
        max = 100,
        defaultValue = 50,
        step = 1,
        onChange,
        label = '滑块值',
        value,
        className
    } = props
    const [range, setRange] = useState<number>(defaultValue);
    const rangeEl = useRef<HTMLInputElement>()
    useEffect(()=>{
        const num = Math.max(Number(min), Math.min(Number(max), Number(value)))
        setRange(num)
    },[value,min,max])

    const changeUi = ()=>{
        const inputEl = rangeEl.current!
        const currentValue = Math.max(Number(inputEl.min), Math.min(Number(inputEl.max), Number(inputEl.value)))
        const maxValue = Number(rangeEl.current!.max)
        const fillPercent = (currentValue / maxValue) * 100;
        rangeEl.current!.style.setProperty('--fill-percent', `${fillPercent}%`);
    }
    useEventListener('input',changeUi,{ target: rangeEl })
    useMount(()=>{
        const currentValue = value || defaultValue;
        const fillPercent = (currentValue / max) * 100;
        rangeEl.current!.style.setProperty('--fill-percent', `${fillPercent}%`);
    })
    useEffect(() => {
        changeUi()
    }, [max,min,range]);
    const onChangeValue = (newValue:number)=>{
        setRange(newValue);
        if (onChange) onChange(newValue);
    }
  return  <div className={`${styles['range-container']} ${className}`}>
      <div className={styles['range-header']}>
          <label>{label}</label>
          <FJInputNumber
            min={min}
            max={max}
            value={range}
            defaultValue={defaultValue}
            onChangeValue={onChangeValue}
          />
      </div>
      <input
          type="range"
          min={min}
          max={max}
          value={range}
          step={step}
          onChange={e=>onChangeValue(Number(e.target.value))}
          className={styles['range']}
          ref={rangeEl}
      />
      <div className={styles['range-labels']}>
          <span>{min}</span>
          <span>{max}</span>
      </div>
  </div>
});
FjRange.displayName = 'FjRange';

export default FjRange;







```


```css 
.range-container {
  width: 100%;
  margin-top: 20px;
}

.range-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  //margin-bottom: 10px;
}



.range {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #ecf0f1;
  outline: none;
}


.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3498db;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: -6px;
  position: relative;
  z-index: 1;
}

.range::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  background: #2980b9;
}

.range-labels {
  display: flex;
  justify-content: space-between;
  color: #7f8c8d;
  font-size: 0.9em;
}



/* 已填充部分的样式 - WebKit浏览器 */
.range::-webkit-slider-runnable-track {
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(to right, #4CAF50 0%, #4CAF50 var(--fill-percent), #ddd var(--fill-percent), #ddd 100%);
}



/* Firefox浏览器支持 */
.range::-moz-range-track {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #ddd;
}

.range::-moz-range-progress {
  height: 8px;
  border-radius: 4px;
  background: #4CAF50;
}

.range::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4CAF50;
  cursor: pointer;
  border: none;
}
```
