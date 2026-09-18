差值误差累计    &#x20;

当`devicePixelRatio=1`且多次调整 Canvas 尺寸时，模糊逐渐加剧的核心原因是 ​**​每次缩放都基于前次缩放后的低质量位图再次缩放，导致插值误差累积​**​。以下是分步解决方案：

> 核心就是： **如果没变化；就保留canvas；如果有变化；就保留最后一次变化的值；**

这是核心的核心；**对于多次问题；我想下面这解决方案都可以生效**

始终在**原始图上进行绘制**

```typescript 
// 新增：离屏Canvas保存原始内容
private originalCanvas: HTMLCanvasElement = document.createElement('canvas');
private originalCtx: CanvasRenderingContext2D;

// 初始化时创建原始Canvas
constructor() {
    this.originalCanvas.width = 1024;  // 根据实际内容设置
    this.originalCanvas.height = 768;
    this.originalCtx = this.originalCanvas.getContext('2d')!;
    // 将初始内容绘制到原始Canvas
    this.drawOriginalContent(); 
}

resizeDrawCanvas = (oldImgArea: number[], oldScale: number) => {
    const drawCanvas = this.drawCanvas;
    const canvas = this.canvasNode;

    if (!oldImgArea) {
        // 初始化时同步原始Canvas尺寸
        drawCanvas.width = canvas.width;
        drawCanvas.height = canvas.height;
        // 从原始Canvas复制内容
        this.drawCtx.drawImage(this.originalCanvas, 0, 0);
        return;
    }

    // 1. 克隆参数避免污染
    const sourceArea = [...oldImgArea] as [number, number, number, number];
    const [sx, sy, sw, sh] = sourceArea;

    // 2. 计算实际源区域（基于原始Canvas）
    const originalWidth = this.originalCanvas.width;
    const originalHeight = this.originalCanvas.height;
    const scaleFactor = oldScale;
    const sourceWidth = sw / scaleFactor;  // 还原到原始比例
    const sourceHeight = sh / scaleFactor;

    // 3. 设置新尺寸（必须为整数）
    drawCanvas.width = Math.floor(canvas.width);
    drawCanvas.height = Math.floor(canvas.height);

    // 4. 使用高质量缩放（从原始Canvas重新采样）
    this.drawCtx.save();
    this.drawCtx.imageSmoothingEnabled = false; // 关闭抗锯齿
    this.drawCtx.drawImage(
        this.originalCanvas, 
        sx, sy, sourceWidth, sourceHeight, // 源区域（原始内容）
        0, 0, drawCanvas.width, drawCanvas.height // 目标铺满
    );
    this.drawCtx.restore();

    // 5. 更新裁剪路径
    this.clipPath(true);
};

// 示例：绘制原始内容的方法
private drawOriginalContent() {
    this.originalCtx.fillStyle = 'blue';
    this.originalCtx.fillRect(100, 100, 200, 150);
    // 其他初始化绘制操作...
}

```
