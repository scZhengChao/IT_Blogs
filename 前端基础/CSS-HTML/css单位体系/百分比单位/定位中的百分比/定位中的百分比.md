# 定位中的百分比

在CSS中用控制 position 位置的top、right、bottom、left都可以使用百分比作为单位。**其参照物就是包含块的同方向的width和height**。不同定位的包含块不尽相同：

- 如果元素为静态（ static ）或相对定位（ relative ），**包含块一般是其父容器。**
- 如果元素为绝对定位（ absolute ），包含块应该是**离它最近的 position 为 absolute 、 relative 或 fixed 的祖先元素。**
- 如果元素为固定定位（ fixed ），**包含块就是视窗（ viewport ）。**
