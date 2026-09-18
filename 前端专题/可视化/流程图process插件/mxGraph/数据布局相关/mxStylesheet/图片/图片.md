# 图片

```typescript 
function main(container) {
    const graph = new mxGraph(container);

    const style = {
        [mxConstants.STYLE_SHAPE]: mxConstants.SHAPE_LABEL,
        [mxConstants.STYLE_PERIMETER]: mxPerimeter.RectanglePerimeter,
        [mxConstants.STYLE_ROUNDED]: true,
        [mxConstants.STYLE_ARCSIZE]: 6,// 设置圆角程度

        [mxConstants.STYLE_STROKECOLOR]: '#ebb862',
        [mxConstants.STYLE_FONTCOLOR]: '#333333',
        [mxConstants.STYLE_FILLCOLOR]: '#FFFFFF',
        [mxConstants.STYLE_LABEL_BACKGROUNDCOLOR]: '#e6e6e6',

        [mxConstants.STYLE_ALIGN]: mxConstants.ALIGN_CENTER,
        [mxConstants.STYLE_VERTICAL_ALIGN]: mxConstants.ALIGN_TOP,
        [mxConstants.STYLE_IMAGE_ALIGN]: mxConstants.ALIGN_CENTER,
        [mxConstants.STYLE_IMAGE_VERTICAL_ALIGN]: mxConstants.ALIGN_TOP,

        [mxConstants.STYLE_IMAGE]: 'images/other/pika.jpg',
        [mxConstants.STYLE_IMAGE_WIDTH]: '100',
        [mxConstants.STYLE_IMAGE_HEIGHT]: '100',
        [mxConstants.STYLE_SPACING_TOP]: '110',
        [mxConstants.STYLE_SPACING]: '8'
    };

    graph.getStylesheet().putCellStyle('myStyle', style);
    const parent = graph.getDefaultParent();
    graph.getModel().beginUpdate();
    try {
        const v1 = graph.insertVertex(parent, null, '皮卡丘', 120, 120, 120, 150, 'myStyle');

        // 动态改变样式
        setTimeout(() => {
            graph.getModel().setStyle(v1, 'myStyle;image=images/other/xiaohuo.png');
        }, 1000);
    } finally {
        graph.getModel().endUpdate();
    }
}
```
