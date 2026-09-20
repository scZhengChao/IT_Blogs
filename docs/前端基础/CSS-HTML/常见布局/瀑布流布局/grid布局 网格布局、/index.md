# grid布局 网格布局、

![](./image/image_7q3DinwJxl.png)

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
                }
            }
        });
        observer.observe(parentBox.current!);
    })
    return <div className={styles.container}>
        <div className={styles.imgsBox} ref={parentBox}>
            {imgsInfo.map((imgInfo,i)=>{
                return <div style={{gridRowEnd:`span ${~~(imgInfo.height / 10)}`,height:imgInfo.height}} className={styles.imgBasicStyle} key={i}>{imgInfo.content}</div>
            })}
        </div>
    </div>

});

export default Imgs;
```


```css 
.container{
  height: 800px;
  overflow-y: auto;
}
.imgsBox{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 5px;
  grid-auto-rows: auto;
}
.imgBasicStyle{
  overflow: hidden;
  text-align: center;
  font-size: 12px;
  border: 1px solid gray;
  box-sizing: border-box;
  width: 100%;
}
```
