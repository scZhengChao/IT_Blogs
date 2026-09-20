# js计算

![](image_KSyjnF0RDY.png)

```typescript 
import {memo, useRef, useState} from 'react';
import styles from './index.module.less';
import { useMount } from 'ahooks'

interface ImgInfosProps{
    width:number;
    height:number;
    content:string
}
const IMG_COLUMN  = 3
const Imgs = memo(() => {
    const parentBox = useRef<HTMLDivElement>(null)
    const [imgsInfo,setImgsInfo ] = useState<ImgInfosProps[]>([])
    const heightArr = useRef<number[]>([])
    const [imgWidth,setImgWidth ] = useState<number>(30)

    useMount(()=>{
        // 随机生成 40张等高不等宽的图片
        const arr = new Array(50).fill('').map((v,i)=>{
            const height = Math.ceil(Math.random()*100) + 60
            return {
                width:80,
                height:height,
                content:`宽${imgWidth}高${height}的图片${i}`,
            }
        })
        setImgsInfo(arr)
        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                if (entry.target === parentBox.current) {
                    const width = parentBox.current!.offsetWidth/IMG_COLUMN
                    setImgWidth(width)
                }
            }
        });
        observer.observe(parentBox.current!);
    })
    return <div className={styles.imgsBox} ref={parentBox}>
        {imgsInfo.map((imgInfo,i)=>{
            let minHeight ;
            let minIndex ;
            let left ;
            if(i<IMG_COLUMN){
                heightArr.current[i]=imgInfo.height
                minHeight = 0
                minIndex = i
                left = imgWidth*i
            } else{
                minHeight = Math.min.apply(null,heightArr.current)
                minIndex = heightArr.current.indexOf(minHeight)
                left = imgWidth*minIndex
                heightArr.current[minIndex]+=imgInfo.height
            }

            return <div style={{width:imgWidth,height:imgInfo.height,top:minHeight,left:left}} className={styles.imgBasicStyle} key={i}>{imgInfo.content}</div>
        })}
    </div>
});

export default Imgs;
```


```css 
.imgsBox{
  background: #F3F3F7;
  position: relative;
  min-width: 200px;
  width: 100%;
  height: calc(100vh - 62px);
}
.imgBasicStyle{
  position: absolute;
  overflow: hidden;
  text-align: center;
  font-size: 12px;
  border: 1px solid gray;
  box-sizing: border-box;
}
```
