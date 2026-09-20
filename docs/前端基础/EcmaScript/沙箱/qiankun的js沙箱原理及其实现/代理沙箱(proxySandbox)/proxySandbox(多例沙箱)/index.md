# proxySandbox(多例沙箱)

## 目录

- [proxySandbox原理](#proxySandbox原理)
- [proxySandbox源码](#proxySandbox源码)
- [proxySandbox优劣势](#proxySandbox优劣势)
- [proxySandbox Demo](#proxySandbox-Demo)

#### **proxySandbox原理**

> 激活沙箱后，每次对`window`取值的时候，先从自己沙箱环境的`fakeWindow`里面找，如果不存在，就从`rawWindow`(外部的`window`)里去找；当对沙箱内部的`window`对象赋值的时候，会直接操作`fakeWindow`，而不会影响到`rawWindow`。

![](./assets/image/image_Ej9FqRe9tc.png)

#### **proxySandbox源码**

ProxySandbox类的实现，这里只展示了`get`和`set`方法，实际源码代理的方法还有`has`、`ownKeys`、`getOwnPropertyDescriptor`、`defineProperty`、`deleteProperty`等方法。

```javascript 

/**
 * 基于 Proxy 实现的沙箱
 */
export default class ProxySandbox implements SandBox {
  /** window 值变更记录 */
  private updatedValueSet = new Set<PropertyKey>();

  name: string;

  type: SandBoxType;

  proxy: WindowProxy;

  sandboxRunning = true;

  latestSetProp: PropertyKey | null = null;

  active() {
    if (!this.sandboxRunning) activeSandboxCount++;
    this.sandboxRunning = true;
  }

  inactive() {
    if (process.env.NODE_ENV === 'development') {
      console.info(`[qiankun:sandbox] ${this.name} modified global properties restore...`, [
        ...this.updatedValueSet.keys(),
      ]);
    }

    if (--activeSandboxCount === 0) {
      variableWhiteList.forEach((p) => {
        if (this.proxy.hasOwnProperty(p)) {
          // @ts-ignore
          delete window[p];
        }
      });
    }

    this.sandboxRunning = false;
  }

  constructor(name: string) {
    this.name = name;
    this.type = SandBoxType.Proxy;
    const { updatedValueSet } = this;

    const rawWindow = window;
    const { fakeWindow, propertiesWithGetter } = createFakeWindow(rawWindow);

    const descriptorTargetMap = new Map<PropertyKey, SymbolTarget>();
    const hasOwnProperty = (key: PropertyKey) => fakeWindow.hasOwnProperty(key) || rawWindow.hasOwnProperty(key);

    const proxy = new Proxy(fakeWindow, {
      set: (target: FakeWindow, p: PropertyKey, value: any): boolean => {
        if (this.sandboxRunning) {
          // We must kept its description while the property existed in rawWindow before
          if (!target.hasOwnProperty(p) && rawWindow.hasOwnProperty(p)) {
            const descriptor = Object.getOwnPropertyDescriptor(rawWindow, p);
            const { writable, configurable, enumerable } = descriptor!;
            if (writable) {
              Object.defineProperty(target, p, {
                configurable,
                enumerable,
                writable,
                value,
              });
            }
          } else {
            // @ts-ignore
            target[p] = value;
          }

          if (variableWhiteList.indexOf(p) !== -1) {
            // @ts-ignore
            rawWindow[p] = value;
          }

          updatedValueSet.add(p);

          this.latestSetProp = p;

          return true;
        }

        if (process.env.NODE_ENV === 'development') {
          console.warn(`[qiankun] Set window.${p.toString()} while sandbox destroyed or inactive in ${name}!`);
        }

        // 在 strict-mode 下，Proxy 的 handler.set 返回 false 会抛出 TypeError，在沙箱卸载的情况下应该忽略错误
        return true;
      },

      get(target: FakeWindow, p: PropertyKey): any {
        if (p === Symbol.unscopables) return unscopables;

        // avoid who using window.window or window.self to escape the sandbox environment to touch the really window
        // see https://github.com/eligrey/FileSaver.js/blob/master/src/FileSaver.js#L13
        if (p === 'window' || p === 'self') {
          return proxy;
        }

        if (
          p === 'top' ||
          p === 'parent' ||
          (process.env.NODE_ENV === 'test' && (p === 'mockTop' || p === 'mockSafariTop'))
        ) {
          // if your master app in an iframe context, allow these props escape the sandbox
          if (rawWindow === rawWindow.parent) {
            return proxy;
          }
          return (rawWindow as any)[p];
        }

        // proxy.hasOwnProperty would invoke getter firstly, then its value represented as rawWindow.hasOwnProperty
        if (p === 'hasOwnProperty') {
          return hasOwnProperty;
        }

        // mark the symbol to document while accessing as document.createElement could know is invoked by which sandbox for dynamic append patcher
        if (p === 'document' || p === 'eval') {
          setCurrentRunningSandboxProxy(proxy);
          // FIXME if you have any other good ideas
          // remove the mark in next tick, thus we can identify whether it in micro app or not
          // this approach is just a workaround, it could not cover all complex cases, such as the micro app runs in the same task context with master in some case
          nextTick(() => setCurrentRunningSandboxProxy(null));
          switch (p) {
            case 'document':
              return document;
            case 'eval':
              // eslint-disable-next-line no-eval
              return eval;
            // no default
          }
        }

        // eslint-disable-next-line no-nested-ternary
        const value = propertiesWithGetter.has(p)
          ? (rawWindow as any)[p]
          : p in target
          ? (target as any)[p]
          : (rawWindow as any)[p];
        return getTargetValue(rawWindow, value);
      }
    });

    this.proxy = proxy;

    activeSandboxCount++;
  }
}

```


可以看到，源码里面是对`fakeWindow`这个对象进行了代理，而这个对象是通过`createFakeWindow`方法得到的，所以把`createFakeWindow`方法的源码也展示一下，这个方法是将`window`的`document`、`location`、`top`、`window`等等属性拷贝一份，给到`fakeWindow`上，对于我们现实的demo，可以不用太过于关注。

```javascript 
function createFakeWindow(global: Window) {
  // map always has the fastest performance in has check scenario
  // see https://jsperf.com/array-indexof-vs-set-has/23
  const propertiesWithGetter = new Map<PropertyKey, boolean>();
  const fakeWindow = {} as FakeWindow;

  /*
   copy the non-configurable property of global to fakeWindow
   see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor
   > A property cannot be reported as non-configurable, if it does not exists as an own property of the target object or if it exists as a configurable own property of the target object.
   */
  Object.getOwnPropertyNames(global)
    .filter((p) => {
      const descriptor = Object.getOwnPropertyDescriptor(global, p);
      return !descriptor?.configurable;
    })
    .forEach((p) => {
      const descriptor = Object.getOwnPropertyDescriptor(global, p);
      if (descriptor) {
        const hasGetter = Object.prototype.hasOwnProperty.call(descriptor, 'get');

        /*
         make top/self/window property configurable and writable, otherwise it will cause TypeError while get trap return.
         see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
         > The value reported for a property must be the same as the value of the corresponding target object property if the target object property is a non-writable, non-configurable data property.
         */
        if (
          p === 'top' ||
          p === 'parent' ||
          p === 'self' ||
          p === 'window' ||
          (process.env.NODE_ENV === 'test' && (p === 'mockTop' || p === 'mockSafariTop'))
        ) {
          descriptor.configurable = true;
          /*
           The descriptor of window.window/window.top/window.self in Safari/FF are accessor descriptors, we need to avoid adding a data descriptor while it was
           Example:
            Safari/FF: Object.getOwnPropertyDescriptor(window, 'top') -> {get: function, set: undefined, enumerable: true, configurable: false}
            Chrome: Object.getOwnPropertyDescriptor(window, 'top') -> {value: Window, writable: false, enumerable: true, configurable: false}
           */
          if (!hasGetter) {
            descriptor.writable = true;
          }
        }

        if (hasGetter) propertiesWithGetter.set(p, true);

        // freeze the descriptor to avoid being modified by zone.js
        // see https://github.com/angular/zone.js/blob/a5fe09b0fac27ac5df1fa746042f96f05ccb6a00/lib/browser/define-property.ts#L71
        rawObjectDefineProperty(fakeWindow, p, Object.freeze(descriptor));
      }
    });

  return {
    fakeWindow,
    propertiesWithGetter,
  };
}
```


#### **proxySandbox优劣势**

不会污染全局window，支持多个子应用同时加载。

#### **proxySandbox Demo**

```javascript 
  class ProxySandbox {
    active() {
      this.sandboxRunning = true;
    }
    inactive() {
      this.sandboxRunning = false;
    }
    constructor() {
      const rawWindow = window;
      const fakeWindow = {};
      const proxy = new Proxy(fakeWindow, {
        set: (target, prop, value) => {
          if(this.sandboxRunning) {
            target[prop] = value;
            return true;
          }
        },
        get: (target, prop) => {
          // 如果fakeWindow里面有，就从fakeWindow里面取，否则，就从外部的window里面取
          let value = prop in target ? target[prop] : rawWindow[prop];
          return value
        }
      })
      this.proxy = proxy;
    }
  }

```


直接测试demo

```javascript 
  window.sex = '男';
  let proxy1 = new ProxySandbox();
  let proxy2 = new ProxySandbox();
  ((window) => {
    proxy1.active();
    console.log('修改前proxy1的sex', window.sex);
    window.sex = '女';
    console.log('修改后proxy1的sex', window.sex);
  })(proxy1.proxy);
  console.log('外部window.sex=>1', window.sex);

  ((window) => {
    proxy2.active();
    console.log('修改前proxy2的sex', window.sex);
    window.sex = '111';
    console.log('修改后proxy2的sex', window.sex);
  })(proxy2.proxy);
  console.log('外部window.sex=>2', window.sex);

```


浏览器打印结果&#x20;

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62fa46c3c30f4b78aa0501319c0ee902~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

[github Demo地址](https://link.juejin.cn/?target=https://github.com/senfish/qiankun-sandbox "github Demo地址")

可以看到，只有proxySandbox才是对window进行了一个真正的无污染环境。
