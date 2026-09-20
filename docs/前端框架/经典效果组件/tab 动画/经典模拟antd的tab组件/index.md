# 经典模拟antd的tab组件

![](./image/image_nmYOPaAlU8.png)

```typescript 
import {memo, useState} from 'react';
import styles from './index.module.less';

interface ItemsProps {
    key:string;
    label:React.ReactNode;
    children:React.ReactNode;
}
interface FjTabsProps {
    items:ItemsProps[];
    defaultActiveKey?:string;
    className?:string
}
const TAB_Width = 80;
const FjTabs = memo<FjTabsProps>((props) => {
    const {
        items,
        defaultActiveKey = items[0]?.key,
        className = ''
    } = props
    const [activeKey,setActiveKey] = useState(defaultActiveKey)
    const onChangeTab = (key:string)=>{
        setActiveKey(key)
    }

  return <div className={`${styles.tabs_container} ${className}`}>
      <div
          className={styles.tabs_header}
          style={{width:`${TAB_Width*items.length}px`}}
      >
          {
              items.map(item=>{
                  return <div key={item.key} onClick={()=>onChangeTab(item.key)} className={styles.nav_item} style={{ width: `${TAB_Width}px`}}>{item.label}</div>
              })
          }
          <div
              className={styles.ink_bar}
              style={{
                  width: `${TAB_Width}px`,
                  transform: `translateX(${items.findIndex(item => item.key === activeKey) * 100}%)`
              }}
          ></div>
      </div>
      <div className={styles.tabs_body}>
          {
              items.map(item=>{
                  return <div key={item.key} style={{display:item.key === activeKey?'block':'none'}}>{item.children}</div>
              })
          }
      </div>
  </div>
});
FjTabs.displayName = 'FjTabs';

export default FjTabs;
```


```css 
.tabs_container{
  width: 100%;
}
.tabs_header{
  display: flex;
  height: 54px;
  position: relative;
  font-size: 16px;
  align-items: center;
  margin: 0 auto;
  .nav_item{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .ink_bar{
    height: 4px;
    position: absolute;
    border-radius: 2px;
    bottom: 0;
    transition: transform 0.3s;
    background: linear-gradient(132deg,#ff47d0 4%,#ff822c);
  }
}

```
