# mulit-column 多栏布局

![](./image/image_ieLr-vlTEz.png)

```typescript 
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
        const arr = new Array(50).fill('').map((v,i)=>{
            const height = Math.ceil(Math.random()*100) + 60
            return {
                width:IMG_WIDTH,
                height:height,
                content:`宽${IMG_WIDTH}高${height}的图片${i}`,
            }
        })
        setImgsInfo(arr)
        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                if (entry.target === parentBox.current) {
                    // setMaxCount(Math.floor(parentBox.current!.offsetWidth/80))
                }
            }
        });
        observer.observe(parentBox.current!);
    })
    return <div className={styles.container}>
        <div className={styles.imgsBox} ref={parentBox}>
            {imgsInfo.map((imgInfo,i)=>{
                return <div style={{width:'100%',height:imgInfo.height}} className={styles.imgBasicStyle} key={i}>{imgInfo.content}</div>
            })}
        </div>
    </div>
});

export default Imgs;
```


```css 
.container{
  width: 100%;
  height: 800px;
  overflow-x: hidden;
  overflow-y: auto;
}
.imgsBox{
  column-count: 3;
  padding: 10px;
  column-gap: 10px;
}
.imgBasicStyle{
  overflow: hidden;
  text-align: center;
  font-size: 12px;
  box-sizing: border-box;

  border: 1px solid #999;
  margin-bottom: 10px;
  break-inside: avoid;
}
```
