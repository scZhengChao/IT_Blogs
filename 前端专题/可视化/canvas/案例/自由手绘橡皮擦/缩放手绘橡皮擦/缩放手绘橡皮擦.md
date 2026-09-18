# 缩放手绘橡皮擦

```typescript 


import { useEventListener, } from 'ahooks'
import type { MutableRefObject } from "react";
import { useRef } from 'react'
import {useSelector} from "react-redux";
import {CursorTypeEnum } from "@/store";
import type { StateTypes } from "@/store";
import fjClearImgInstance from "@/manager/FjClearImgManager.ts";
const useDrawAndEraseCanvasHook  = (canvas:MutableRefObject<HTMLCanvasElement>)=>{
    const isMouseDown =  useRef<boolean>(false)
    const cursorType = useSelector<StateTypes,CursorTypeEnum>(state => state.cursorType);
    const cursorSize = useSelector<StateTypes, number>(state => state.cursorSize);
    const stepRatio = useSelector<StateTypes, number>(state => state.stepRatio);

    const drawCtx = fjClearImgInstance.getDrawCtx()
    useEventListener(
        'mousedown',
        (e) => {
            isMouseDown.current = true
            if (e.button) return
            if(!drawCtx) return;
            drawCtx.beginPath()
            const isEraser = cursorType === CursorTypeEnum.eraser
            drawCtx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over'
            drawCtx.strokeStyle = isEraser ? 'rgba(0,0,0,1)' : '#000'
            drawCtx.lineCap = 'round'
            drawCtx.lineJoin = 'round'
            drawCtx.lineWidth = isEraser ? cursorSize*stepRatio : cursorSize*stepRatio
            const { x , y} = fjClearImgInstance.getMousePosition(e)
            drawCtx.moveTo(x , y)
            drawCtx.lineTo(x , y)
            drawCtx.stroke()
            fjClearImgInstance.scaleAtCenterDraw()
        },
        { target: canvas }
    )
    useEventListener(
        'mousemove',
        (e) => {
            if(!isMouseDown.current) return
            if(!drawCtx) return;
            const { x , y} = fjClearImgInstance.getMousePosition(e)
            drawCtx.lineTo(x , y)
            drawCtx.stroke()
            fjClearImgInstance.scaleAtCenterDraw()
        },
        { target: canvas }
    )
    useEventListener(
        'mouseup',
        () => {
            isMouseDown.current = false
        },
        { target: canvas }
    )
    useEventListener(
        'mouseleave',
        () => {
            drawCtx.beginPath()
        },
        { target: canvas }
    )
    return null
}
export default useDrawAndEraseCanvasHook

```
