# 浏览缓存（localstorage/sessionStorage）

## 目录

- [web-storage-cache](#web-storage-cache)

# web-storage-cache

封装好的sessionStorage/localStorage； 更加方便

[ npm: web-storage-cache web storage, improved.. Latest version: 1.1.1, last published: 3 years ago. Start using web-storage-cache in your project by running \`npm i web-storage-cache\`. There are 12 other projects in the npm r https://www.npmjs.com/package/web-storage-cache](https://www.npmjs.com/package/web-storage-cache " npm: web-storage-cache web storage, improved.. Latest version: 1.1.1, last published: 3 years ago. Start using web-storage-cache in your project by running `npm i web-storage-cache`. There are 12 other projects in the npm r https://www.npmjs.com/package/web-storage-cache")

```typescript 
/**
 * 配置浏览器本地存储的方式，可直接存储对象数组。
 */

import WebStorageCache from 'web-storage-cache'

type CacheType = 'sessionStorage' | 'localStorage'

export const useCache = (type: CacheType = 'sessionStorage') => {
  const wsCache: WebStorageCache = new WebStorageCache({
    storage: type
  })

  return {
    wsCache
  }
}

```
