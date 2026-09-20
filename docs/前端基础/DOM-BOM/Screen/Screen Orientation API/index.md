# Screen Orientation API

Screen Orientation API **检查当前屏幕的方向**，甚至将**其锁定为特定的方向**。

```react tsx 
async function lockHandler() {
  await screen.orientation.lock("portrait");
}

function releaseHandler() {
  screen.orientation.unlock();
}

function getOrientation() {
  return screen.orientation.type;
}

```


![](./assets/image/image_qcGCqkpEc3.png)
