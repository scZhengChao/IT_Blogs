# 不能将类型“MutableRefObject\<HTMLDivElement | undefined>”分配给类型“LegacyRef | undefined”。

1. 没赋初值 &#x20;
2. useRef里面没写对类型

```typescript 
   const canvasRef = useRef<HTMLCanvasElement|null>(null)

/// ....


return <canvas ref={canvasRef }>

```
