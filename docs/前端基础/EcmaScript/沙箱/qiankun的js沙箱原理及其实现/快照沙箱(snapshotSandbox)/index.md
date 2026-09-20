# 快照沙箱(snapshotSandbox)

## 目录

- [snapshotSandbox原理](#snapshotSandbox原理)
- [snapshotSandbox源码](#snapshotSandbox源码)
- [snapshotSandbox优劣势](#snapshotSandbox优劣势)
- [snapshotSandbox Demo](#snapshotSandbox-Demo)

从名字上我们可以理解快照就是给你着一张相片，来记录你此刻的状态。`qiankun`的快照沙箱是基于`diff`来实现的，主要用于不支持`window.Proxy`的低版本浏览器，而且也只适应单个的子应用。(文章末尾附带demo地址)

#### **snapshotSandbox原理**

> 激活沙箱时，将`window`的快照信息存到`windowSnapshot`中， 如果`modifyPropsMap`有值，还需要还原上次的状态；激活期间，可能修改了`window`的数据；退出沙箱时，将修改过的信息存到`modifyPropsMap`里面，并且把`window`还原成初始进入的状态。

![](./image/image_6l31zMUhYV.png)

#### **snapshotSandbox源码**

```javascript 
function iter(obj: typeof window, callbackFn: (prop: any) => void) {
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      callbackFn(prop);
    }
  }
}

/**
 * 基于 diff 方式实现的沙箱，用于不支持 Proxy 的低版本浏览器
 */
export default class SnapshotSandbox implements SandBox {
  proxy: WindowProxy;

  name: string;

  type: SandBoxType;

  sandboxRunning = true;

  private windowSnapshot!: Window;

  private modifyPropsMap: Record<any, any> = {};

  constructor(name: string) {
    this.name = name;
    this.proxy = window;
    this.type = SandBoxType.Snapshot;
  }

  active() {
     // 记录当前快照
    this.windowSnapshot = {} as Window;
    iter(window, (prop) => {
      this.windowSnapshot[prop] = window[prop];
    });

    // 恢复之前的变更
    Object.keys(this.modifyPropsMap).forEach((p: any) => {
      window[p] = this.modifyPropsMap[p];
    });

    this.sandboxRunning = true;
   }

  inactive() {
    this.modifyPropsMap = {};

    iter(window, (prop) => {
      if (window[prop] !== this.windowSnapshot[prop]) {
        // 记录变更，恢复环境
        this.modifyPropsMap[prop] = window[prop];
        window[prop] = this.windowSnapshot[prop];
      }
    });

    if (process.env.NODE_ENV === 'development') {
      console.info(`[qiankun:sandbox] ${this.name} origin window restore...`, Object.keys(this.modifyPropsMap));
    }

    this.sandboxRunning = false;
  }
}
```


#### **snapshotSandbox优劣势**

可以很明显的看到，`snapshotSandbox`**会污染全局window**，但是可以支持不兼容`Proxy`的浏览器。

#### **snapshotSandbox Demo**

demo是对源码的一个精简，去除了一些不必要的变量,方便理解。

```javascript 
const iter = (window, callback) => {
  for (const prop in window) {
    if(window.hasOwnProperty(prop)) {
      callback(prop);
    }
  }
}
class SnapshotSandbox {
  constructor() {
    this.proxy = window;
    this.modifyPropsMap = {};
  }
  // 激活沙箱
  active() {
    // 缓存active状态的window
    this.windowSnapshot = {};
    iter(window, (prop) => {
      this.windowSnapshot[prop] = window[prop];
    });
    Object.keys(this.modifyPropsMap).forEach(p => {
      window[p] = this.modifyPropsMap[p];
    })
  }
  // 退出沙箱
  inactive(){
    iter(window, (prop) => {
      if(this.windowSnapshot[prop] !== window[prop]) {
        // 记录变更
        this.modifyPropsMap[prop] = window[prop];
        // 还原window
        window[prop] = this.windowSnapshot[prop];
      }
    })
  }
}

```


一个`SnapshotSandbox`的类我们就实现了，然后来测试一下

```javascript 
const sandbox = new SnapshotSandbox();
((window) => {
   // 激活沙箱
   sandbox.active();
   window.sex= '男';
   window.age = '22';
   console.log(window.sex, window.age);
   // 退出沙箱
   sandbox.inactive();
   console.log(window.sex, window.age);
   // 激活沙箱
   sandbox.active();
   console.log(window.sex, window.age);
})(sandbox.proxy);

```


打开浏览器，可以看到成功实现了一个快照沙箱隔离。&#x20;

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ceba9f9b87a9418095b96abebfccae72~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
