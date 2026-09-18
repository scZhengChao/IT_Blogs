# border-image

## 目录

- [使用](#使用)

```javascript 
import classNames from 'classnames';
import styles from './FJHoverBoardGradation.module.less';
import React from 'react';
import FJUtil from '../../../util/FJUtil';

const FJHoverBoardGradation = React.forwardRef((props, ref) => {
    // isShowInBorder 是否显示内边框
    const {
        active,
        children,
        borderRadius = 10,
        isShowInBorder = false,

        className,
        contentClassName,
        style,

        onClick,
        onMouseEnter,
        onMouseLeave,
        selectBgColor = '#f3f3f7',
        hasHover = !FJUtil.isMobile(),
    } = props;

    return (
        <div
            ref={ref}
            className={classNames(styles.box, className, active && styles.active, hasHover && styles.hover)}
            style={{
                ...style,
                '--border-radius': borderRadius + 'px',
                '--border-content-radius': borderRadius - 2 + 'px',
            }}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {isShowInBorder && <div className={styles.in_border}></div>}
            <div
                className={classNames(
                    styles.content,
                    isShowInBorder && styles.show_in_border,
                    active && isShowInBorder && styles.show_in_border_active,
                    contentClassName,
                )}
                style={{ '--select-bg-color': selectBgColor }}
            >
                {children}
            </div>
        </div>
    );
});

export default FJHoverBoardGradation;

```


```css 
.box {
    position: relative;
    cursor: pointer;
    border-radius: var(--border-radius);
    background: #f3f3f7;
    overflow: hidden;
    height: 100%;
    box-sizing: border-box;
    transition: all 0.3s ease;

    .content {
        border-radius: var(--border-content-radius);
        background: #f3f3f7;
        height: 100%;
        overflow: hidden;
        position: relative;
         z-index: 2; 
        transition: all 0.3s ease;
    }
    // 鼠标hover 行为
    &.hover {
        .content {
            &.show_in_border {
                &:hover {
                     clip-path: inset(4px 4px 4px 4px round var(--border-content-radius)); 
                }
            }
        }

        @media screen and (min-width: 769px) {
            &:hover {
                background: #b7b9c2;
                .content {
                    background: var(--bg-color-sub-hover);
                    clip-path: inset(2px 2px 2px 2px round var(--border-content-radius));
                }
            }
            //hover选中状态, 需要单独设置
            &.active {
                background-image: linear-gradient(270deg, #ff812d 0%, #ff47cf);
            }
        }
    }

    &.active {
        background-image: linear-gradient(270deg, #ff812d 0%, #ff47cf);

        .content {
            background: var(--select-bg-color) !important;
            clip-path: inset(2px 2px 2px 2px round var(--border-content-radius));
            &:hover {
                background: var(--bg-color-sub);
            }
        }

        .show_in_border_active {
             clip-path: inset(4px 4px 4px 4px round var(--border-content-radius)); 
        }
    }
}

.in_border {
    position: absolute;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    background-color: #fff;
    border-radius: var(--border-content-radius);
    overflow: hidden;
     z-index: 1; 
    top: 2px;
    left: 2px;
}
```


# 使用

```react jsx 
<FJHoverBoardGradation
    active={selectItem.name === item.name}
    borderRadius={10}
    isShowInBorder={true}
    key={index}
    onClick={()=>onChooseStyle(item)}
>
   <div></div>
</FJHoverBoardGradation>
```
