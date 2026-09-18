# 异常上报

## 目录

- [前端异常捕获与上报 - Sentry](#前端异常捕获与上报---Sentry)

# 前端异常捕获与上报 - Sentry

```javascript 
import * as Sentry from "@sentry/browser";
import * as SentryIntegrations from "@sentry/integrations";

const SentryEnvHostnameMap: { [key: string]: string } = {
  "excalidraw.com": "production",
  "vercel.app": "staging",
};

const REACT_APP_DISABLE_SENTRY =
  process.env.REACT_APP_DISABLE_SENTRY === "true";

// Disable Sentry locally or inside the Docker to avoid noise/respect privacy
const onlineEnv =
  !REACT_APP_DISABLE_SENTRY &&
  Object.keys(SentryEnvHostnameMap).find(
    (item) => window.location.hostname.indexOf(item) >= 0,
  );

Sentry.init({
  dsn: onlineEnv
    ? "https://7bfc596a5bf945eda6b660d3015a5460@sentry.io/5179260"
    : undefined,
  environment: onlineEnv ? SentryEnvHostnameMap[onlineEnv] : undefined,
  release: process.env.REACT_APP_GIT_SHA,
  ignoreErrors: [
    "undefined is not an object (evaluating 'window.__pad.performLoop')", // Only happens on Safari, but spams our servers. Doesn't break anything
  ],
  integrations: [
    new SentryIntegrations.CaptureConsole({
      levels: ["error"],
    }),
  ],
  beforeSend(event) {
    if (event.request?.url) {
      event.request.url = event.request.url.replace(/#.*$/, "");
    }
    return event;
  },
});

```


[ 如何使用 Sentry 捕获前端异常 手把手教你怎么使用Sentry获取前端异常 https://mp.weixin.qq.com/s?\_\_biz=MjM5MDA2MTI1MA==\&mid=2649130782\&idx=1\&sn=945e9fb2e98dc5e789c5a4477ed8ae11\&chksm=be58a0b3892f29a5646397cf670b6de286d7e043b0fc415ee8420e2b1a392fccc8fca3d52f91\&scene=27](https://mp.weixin.qq.com/s?__biz=MjM5MDA2MTI1MA==\&mid=2649130782\&idx=1\&sn=945e9fb2e98dc5e789c5a4477ed8ae11\&chksm=be58a0b3892f29a5646397cf670b6de286d7e043b0fc415ee8420e2b1a392fccc8fca3d52f91\&scene=27 " 如何使用 Sentry 捕获前端异常 手把手教你怎么使用Sentry获取前端异常 https://mp.weixin.qq.com/s?__biz=MjM5MDA2MTI1MA==\&mid=2649130782\&idx=1\&sn=945e9fb2e98dc5e789c5a4477ed8ae11\&chksm=be58a0b3892f29a5646397cf670b6de286d7e043b0fc415ee8420e2b1a392fccc8fca3d52f91\&scene=27")
