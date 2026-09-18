# 盒模型中的百分比

在CSS中的盒模型包含的属性有：width、max-width、min-width、height、max-height、min-height、padding、margin等。这些属性在使用百分比时，参照物不尽相同：

- width、max-width、min-width：**值为百分比时，其相对于包含块的 width 进行计算。**
- height、max-height、min-height：**值为百分比时，其相对于包含块的 height 进行计算。**
- padding、margin：值为百分比时，**如果是水平的值，就是相对于包含块的 width 进行计算；**如果是垂直的值，就是相对**于包含块的 height 进行计算。**
