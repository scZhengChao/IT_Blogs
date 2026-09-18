# ahooks

```javascript 
import { useEventListener, useMount, useBoolean } from 'ahooks';
import { useRef } from 'react';
/**
 * @description
 * 判断安卓和ios的软键盘；
 * 出现和收起
 */
export default function useVirtualKeyboard() {
  const originRef = useRef<{ height: number }>();
  const [hasKeyboard, { setTrue, setFalse }] = useBoolean();
  const getHeight = () => document.documentElement.clientHeight || document.body.clientHeight;
  useMount(() => {
    originRef.current = {
      height: getHeight(),
    };
  });
  /**
   * 安卓
   */
  useEventListener('resize', () => {
    if (window.cmf.isPlatform('android')) {
      const currentHeight = getHeight();
      if (currentHeight < originRef.current.height) {
        setTrue();
      } else {
        setFalse();
      }
    }
  });
  /**
   * ios
   */
  useEventListener('focusin', (e) => {
    const name = e.target.tagName
    const focusable = ['INPUT','TEXTAREA'].includes(name)
    if (window.cmf.isPlatform('ios') && focusable) {
      setTrue();
    }
  });
  useEventListener('focusout', () => {
    const name = e.target.tagName
    const focusable = ['INPUT','TEXTAREA'].includes(name)
    if (window.cmf.isPlatform('ios') && focusable) {
      setFalse();
    }
  });
  return {
    hasKeyboard,
  };
}
```
