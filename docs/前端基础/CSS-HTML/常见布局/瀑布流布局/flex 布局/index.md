# flex 布局

## 目录

- [有问题](#有问题)

![](./image/image_bicEM1tM5y.png)

```javascript 
import {memo, useRef, useState} from 'react';
import styles from './index.module.less';
import { useMount } from 'ahooks'

interface ImgInfosProps{
    width:number;
    height:number;
    content:string
}
const IMG_WIDTH = 80
const Imgs = memo(() => {
    const parentBox = useRef<HTMLDivElement>(null)
    const [imgsInfo,setImgsInfo ] = useState<ImgInfosProps[]>([])

    useMount(()=>{
        // 随机生成 40张等高不等宽的图片
        const arr = new Array(50).fill('').map((b,i)=>{
            const height = Math.ceil(Math.random()*100) + 60
            return {
                width:IMG_WIDTH,
                height:height,
                content:`宽${IMG_WIDTH}高${height}的图片${i}`,
            }
        })
        const data1 = []
        const data2 = []
        const data3 = []
        let i = 0
        while (i < arr.length) {
            data1.push(arr[i++])
            if (i < arr.length) {
                data2.push(arr[i++])
            }
            if (i < arr.length) {
                data3.push(arr[i++])
            }
        }
        setImgsInfo([data1,data2,data3])
        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                if (entry.target === parentBox.current) {
                    setMaxCount(Math.floor(parentBox.current!.offsetWidth/80))
                }
            }
        });
        observer.observe(parentBox.current!);
    })
    return <div className={styles.container}>
        <div className={styles.imgsBox} ref={parentBox}>
            {imgsInfo.map((imgInfo,i)=>{
                return <div className={styles.colmun} key={i}>
                    {
                        imgInfo.map((img,k)=>{
                            return  <div style={{height:img.height}} className={styles.imgBasicStyle} key={k}>{img.content}</div>
                        })
                    }
                </div>
            })}
        </div>
    </div>
});

export default Imgs;
```


```css 
.imgsBox{
  background: #F3F3F7;
  position: relative;
  overflow: auto;
  display: flex;
}
.imgBasicStyle{
  overflow: hidden;
  text-align: center;
  font-size: 12px;
  border: 1px solid gray;
  box-sizing: border-box;
  margin-bottom: 5px;
  width: 100%;
}
.colmun{
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 2px;
}

.container{
  height: 800px;
  overflow-y: auto;
}
```


# 有问题

![](./image/image_EC_nhK4eQR.png)
