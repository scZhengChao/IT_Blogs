# @keyframe

## 目录

- [@keyframe](#keyframe)

#### `@keyframe`

使用关键帧，先创建一个带名称的 `@keyframes` 规则，以便后续使用 `animation-name` 属性将动画同其关键帧声明进行匹配。每个规则包含多个关键帧，也就是一段样式块语句，每个关键帧有一个百分比值作为名称，代表在动画进行中，在哪个阶段触发这个帧所包含的样式。

```css 
  @keyframes slidein {
    from {
      transform: translateX(0%);
    }

    to {
      transform: translateX(100%);
    }
  }

  /* 等效于下面 @keyframes 规则的定义 */

  @keyframes slidein {
    0% {
      transform: translateX(0%);
    }

    100% {
      transform: translateX(100%);
    }
  }


```


注意事项：

1. 如果多个**关键帧使用同一个名称，以最后一次定义的为准 (不存在层叠样式情况下)**
2. 同一关键帧中的相同属性被重复定义，则以最后一次定义的属性为准。
