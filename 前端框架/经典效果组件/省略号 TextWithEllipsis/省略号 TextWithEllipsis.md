# 省略号TextWithEllipsis

```javascript 
import { useRef, useEffect } from 'react';

const TextWithEllipsis = ({ text, style, className, onClick = () => {}, isRender = true }) => {
    const textRef = useRef(null);
    useEffect(() => {
        if (isRender) {
            const container = textRef.current;
            if (container.scrollWidth > container.offsetWidth) {
                container.setAttribute('title', text);
            } else {
                container.removeAttribute('title');
            }
        }
    }, [text, isRender]);

    return (
        <div
            ref={textRef}
            style={{
                overflow: 'hidden', // 隐藏溢出的文本
                textOverflow: 'ellipsis', // 显示省略号
                whiteSpace: 'nowrap', // 防止文本换行
                ...style,
            }}
            className={className}
            onClick={onClick}
        >
            {text}
        </div>
    );
};

export default TextWithEllipsis;
```
