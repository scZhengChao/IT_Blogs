# Fullscreen

`Fullscreen` API 在全屏模式下显示一个元素或整个页面。

```react tsx 
async function enterFullscreen() {
  await document.documentElement.requestFullscreen();
}

async function exitFullscreen() {
  await document.exitFullscreen();
}

```


注意：要使用全屏API，需要用户的交互。
