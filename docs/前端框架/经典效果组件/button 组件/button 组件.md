# button 组件

![  ](20250518_135032_UTudRexPW6.gif "  ")

```typescript 
import { memo } from 'react';
import type { PropsWithChildren } from 'react'
import styles from './index.module.less';
interface FjButtonProps {
    activeBorderColor?:string;
    activeTextColor?:string
    onClick?:(e:React.MouseEvent<HTMLDivElement>) => void
}

const FjButton = memo((props:PropsWithChildren<FjButtonProps>) => {
    const { children,
        activeBorderColor='#0048ff',
        activeTextColor='#0048ff',
        onClick=arg=>arg,
    } = props
    return <div
        className={styles.common_button_style}
        style={{
            '--activeBorderColor':activeBorderColor,
            '--activeTextColor':activeTextColor
        }}
        onClick={onClick}
    >{children}</div>
});
FjButton.displayName = 'FjButton';

export default FjButton;
```


```css 
.common_button_style{
  cursor: pointer;
  width: 100%;
  height: 40px;
  overflow: hidden;
  border-radius:6px;
  color: white;
  text-align: center;
  vertical-align: middle;
  line-height: 40px;
  font-size: 14px;
  background: linear-gradient(132deg,#ff47d0 4%,#ff822c);
  position: relative;
}
.common_button_style::after{
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background: #a415754d;
  opacity: 0;
  z-index: 0;
}
.common_button_style:hover{
  &::after{
    opacity: 1;
    transition: all .2s;
  }
}
```
