# Screen Wake Lock API

你是否曾经想过YouTube是如何在播放视频**时防止屏幕关闭的**？这是因为使用了屏幕保持唤醒（Screen Wake Lock）API。

```react tsx 
let wakeLock = null;

async function lockHandler() {
  wakeLock = await navigator.wakeLock.request("screen");
}

async function releaseHandler() {
  await wakeLock.release();
  wakeLock = null;
}

```


注意：只有在**页面已经在屏幕上可见的情况下**，才能使用屏幕唤醒锁定API。否则，会抛出错误。
