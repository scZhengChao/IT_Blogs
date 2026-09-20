# vant实现倒计时组件

## 目录

- [倒计时组件可谓是十分常用](#倒计时组件可谓是十分常用)
- [支持格式化时间，默认 HH:mm:ss](#支持格式化时间默认-HHmmss)
  - [parseFormat 处理格式化](#parseFormat-处理格式化)
  - [padZero 补零](#padZero-补零)

## 倒计时组件可谓是十分常用

代码中，我直接使用的 `setInterval` 和每秒钟执行一次。把倒计时的时候减去`1s`，当倒计时毫秒数不足时用 `clearInterval` 清除停止定时器。

但如果要实现毫秒级的倒计时这种方法行不通。 另外 `setInterval` 这种做法，并不是最优的。 那么，`vant` 倒计时组件中，是如何处理毫秒级和实现倒计时呢。

> 初始化开始：
> 结束时间 = 当前时间戳 + 剩余时间获取：
> 剩余时间 = 结束时间 - 当前时间戳
> 加上自己定时器逻辑循环
> 剩余时间就是真实流逝的时间
> 如果是毫秒级渲染，就直接赋值剩余时间
> 如果不是，那就判断是同一秒才赋值

```javascript 
// 简化版 一
const useCountDown = (options) => {
  let endTime;
  let remain = options.time;
  const getCurrentRemain = () => Math.max(endTime - Date.now(), 0);
  const start = () => {
    endTime = Date.now() + remain;
  }
  const setRemain = (value) => {
    remain = value;
  };
  return {
    start,
  }
}
const { start } = useCountDown({time: 3 * 1000});
start();

```


```javascript 
// vant/packages/vant-use/src/useCountDown/index.ts
function isSameSecond(time1: number, time2: number): boolean {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}

export function useCountDown(options: UseCountDownOptions) {
  let rafId: number;
  let endTime: number;
  let counting: boolean;
  let deactivated: boolean;

  const remain = ref(options.time);
  const current = computed(() => parseTime(remain.value));

  const pause = () => {
    counting = false;
    cancelRaf(rafId);
  };

  const getCurrentRemain = () => Math.max(endTime - Date.now(), 0);

  const setRemain = (value: number) => {
    remain.value = value;
    options.onChange?.(current.value);

    if (value === 0) {
      pause();
      options.onFinish?.();
    }
  };

  const microTick = () => {
    rafId = raf(() => {
      // in case of call reset immediately after finish
      if (counting) {
        setRemain(getCurrentRemain());

        if (remain.value > 0) {
          microTick();
        }
      }
    });
  };

  const macroTick = () => {
    rafId = raf(() => {
      // in case of call reset immediately after finish
      if (counting) {
        const remainRemain = getCurrentRemain();

        if (!isSameSecond(remainRemain, remain.value) || remainRemain === 0) {
          setRemain(remainRemain);
        }

        if (remain.value > 0) {
          macroTick();
        }
      }
    });
  };

  const tick = () => {
    // should not start counting in server
    // see: https://github.com/vant-ui/vant/issues/7807
    if (!inBrowser) {
      return;
    }

    if (options.millisecond) {
      microTick();
    } else {
      macroTick();
    }
  };

  const start = () => {
    if (!counting) {
      endTime = Date.now() + remain.value;
      counting = true;
      tick();
    }
  };

  const reset = (totalTime: number = options.time) => {
    pause();
    remain.value = totalTime;
  };

  // 组件被卸载之前被调用
  onBeforeUnmount(pause);

  // 激活
  onActivated(() => {
    if (deactivated) {
      counting = true;
      deactivated = false;
      tick();
    }
  });

  onDeactivated(() => {
    if (counting) {
      pause();
      deactivated = true;
    }
  });

  // 返回方法和当前时间对象
  return {
    start,
    pause,
    reset,
    current,
  };
}


```


我们继续来看 `raf` 和 `cancelRaf`，是如何实现的。

```javascript 
// 判断是不是浏览器环境，你可能会问，为啥要判断？因为 SSR （服务端渲染）不是浏览器环境。
export const inBrowser = typeof window !== 'undefined';

// Keep forward compatible
// should be removed in next major version
export const supportsPassive = true;

export function raf(fn: FrameRequestCallback): number {
  return inBrowser ? requestAnimationFrame(fn) : -1;
}

export function cancelRaf(id: number) {
  if (inBrowser) {
    cancelAnimationFrame(id);
  }
}

// double raf for animation
export function doubleRaf(fn: FrameRequestCallback): void {
  raf(() => raf(fn));
}

```


上文代码，主要一个 `API`，`requestAnimationFrame、cancelAnimationFrame`。

我们这里简单理解为 `window.requestAnimationFrame()` 中的回调函数，每 `16.67ms` 执行一次回调函数即可。

也就是类似 `setTimeout、clearTimeout`

```javascript 
const timeId = setTimeout( () => {
  // 16.67ms 执行一次
  console.log('16.67ms 执行一次');
}, 16.67);

clearTimeout(timeId);

```


> `window.requestAnimationFrame()` 告诉浏览器——你希望执行一个动画，并且要求**浏览器在下次重绘之前调**用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在**浏览器下一次重绘之前**执行

> 回调函数执行次数通常是每秒 60 次，但在大多数遵循 W3C 建议的浏览器中，回调函数执行次数**通常与浏览器屏幕刷新**次数相匹配。

> 备注： 若你想在浏览器下次重绘之前继续更新下一帧动画，那么**回调函数自身必须再次调用** `window.requestAnimationFrame()`。

## 支持格式化时间，默认 HH:mm:ss

### parseFormat 处理格式化

再来看看，组件中，是如何格式化时间的。这个值得我们参考。我们很多时候可能都是写死天数、小时等文案。不支持自定义格式化。

```javascript 
// vant/packages/vant/src/count-down/utils.ts
import { padZero } from '../utils';
import { CurrentTime } from '@vant/use';

export function parseFormat(format: string, currentTime: CurrentTime): string {
  const { days } = currentTime;
  let { hours, minutes, seconds, milliseconds } = currentTime;

  // 有 DD 参数，补零替换，没有则小时数加上天数
  if (format.includes('DD')) {
    format = format.replace('DD', padZero(days));
  } else {
    hours += days * 24;
  }

  // 有 HH 参数，补零替换，没有则分钟数加上小时数
  if (format.includes('HH')) {
    format = format.replace('HH', padZero(hours));
  } else {
    minutes += hours * 60;
  }

  // 有 mm 参数，补零替换，没有则秒数加上分钟数
  if (format.includes('mm')) {
    format = format.replace('mm', padZero(minutes));
  } else {
    seconds += minutes * 60;
  }

  // 有 mm 参数，补零替换，没有则毫秒数加上秒数
  if (format.includes('ss')) {
    format = format.replace('ss', padZero(seconds));
  } else {
    milliseconds += seconds * 1000;
  }

  // 毫秒数 默认补三位数，按照格式最终给出对应的位数
  if (format.includes('S')) {
    const ms = padZero(milliseconds, 3);

    if (format.includes('SSS')) {
      format = format.replace('SSS', ms);
    } else if (format.includes('SS')) {
      format = format.replace('SS', ms.slice(0, 2));
    } else {
      format = format.replace('S', ms.charAt(0));
    }
  }

  // 最终返回格式化的数据
  return format;
}

```


### padZero 补零

```javascript 
// vant/packages/vant-compat/node_modules/vant/src/utils/format.ts
// 补零操作
export function padZero(num: Numeric, targetLength = 2): string {
  let str = num + '';

  while (str.length < targetLength) {
    str = '0' + str;
  }

  return str;
}

```


行文自此，我们就分析完了毫秒级渲染的倒计时组件的实现。
