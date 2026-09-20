# aos/wow

## 目录

- [经我自己在react中测试；aos/wow/react-wow都不好使](#经我自己在react中测试aoswowreact-wow都不好使)
- [AOS](#AOS)
- [wow](#wow)

### 经我自己在react中测试；aos/wow/react-wow都不好使

# AOS

网页滚动动画效果

[https://github.com/michalsnik/aos](https://github.com/michalsnik/aos "https://github.com/michalsnik/aos")  github地址

[https://www.xyhtml5.com/3322.html](https://www.xyhtml5.com/3322.html "https://www.xyhtml5.com/3322.html")  优秀的参考资料

[https://www.xyhtml5.com/examples/aos/](https://www.xyhtml5.com/examples/aos "https://www.xyhtml5.com/examples/aos/")  非常优秀的演示效果

&#x20;

```typescript 
import AOS from 'aos';
import 'aos/dist/aos.css';
```


最简单的就是

```typescript 
AOS.init();

//或者也可以自行配置一些选项

AOS.init({
  // 全局配置：
  disable: false, // 接受以下值：“phone”、“tablet”、“mobile”、boolean、expression或function
  startEvent: 'DOMContentLoaded', // 在document上调度的事件的名称，AOS应在该事件上初始化
  initClassName: 'aos-init', // 初始化后应用的class
  animatedClassName: 'aos-animate', // 动画类名称
  useClassNames: false, //如果为true，将在滚动时将“data aos”的内容添加为类
  disableMutationObserver: false, // 禁用自动突变检测（高级）
  debounceDelay: 50, // 调整窗口大小时使用的解除抖动延迟（高级）
  throttleDelay: 99, // 滚动页面时使用的节流延迟（高级）
  // 可以按每个元素重写的设置，按`data aos-*`属性：
  offset: 120, // 从原始触发点偏移（px）
  delay: 0, // 值从0到3000，步长为50ms
  duration: 400, // 值从0到3000，步长为50ms
  easing: 'ease', // AOS动画的默认缓和
  once: false, // 动画是否只应发生一次（向下滚动时）
  mirror: false, // 当元素滚动过去时是否应该动画化
  anchorPlacement: 'top-bottom', //定义元素相对于窗口的哪个位置应触发动画
});
使用
//data-aos
属性设置动画：
<div data-aos="fade-in"></div>
并使用data-aos-*属性调整行为：
<div
    data-aos="fade-up"
    data-aos-offset="200"
    data-aos-delay="50"
    data-aos-duration="1000"
    data-aos-easing="ease-in-out"
    data-aos-mirror="true"
    data-aos-once="false"
    data-aos-anchor-placement="top-center"
  >
  </div>
```


动画效果如下：

![  ](./assets/image/f16de209166331c212a42006bcc9326c_ek8oFEOr1-.png "  ")

# wow

```typescript 
//animate.css
npm install animate.css --save
//wow.js
npm install wowjs


```
