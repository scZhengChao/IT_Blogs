# this.libOptions.parse is not a function

[ 滑动验证页面  https://segmentfault.com/q/1010000042608296](https://segmentfault.com/q/1010000042608296 " 滑动验证页面  https://segmentfault.com/q/1010000042608296")

我在 WebStorm 2022.2.1 Build #WS-222.3739.57 上使用 Next.js 时遇到的这个问题，目前只是使用 TypeScript 创建了一个 Next.js 程序，没有其他操作。

错误如下所示：

```typescript 
 TypeError: this.libOptions.parse is not a function

TypeError: this.libOptions.parse is not a function
    at ESLint8Plugin.<anonymous> (C:\Program Files\JetBrains\WebStorm 2022.1.2\plugins\JavaScriptLanguage\languageService\eslint\bin\eslint8-plugin.js:139:64)
    at step (C:\Program Files\JetBrains\WebStorm 2022.1.2\plugins\JavaScriptLanguage\languageService\eslint\bin\eslint8-plugin.js:44:23)
    at Object.next (C:\Program Files\JetBrains\WebStorm 2022.1.2\plugins\JavaScriptLanguage\languageService\eslint\bin\eslint8-plugin.js:25:53)
    at C:\Program Files\JetBrains\WebStorm 2022.1.2\plugins\JavaScriptLanguage\languageService\eslint\bin\eslint8-plugin.js:19:71
    at new Promise (<anonymous>)
    at __awaiter (C:\Program Files\JetBrains\WebStorm 2022.1.2\plugins\JavaScriptLanguage\languageService\eslint\bin\eslint8-plugin.js:15:12)
    at ESLint8Plugin.invokeESLint (C:\Program Files\JetBrains\WebStorm 2022.1.2\plugins\JavaScriptLanguage\languageService\eslint\bin\eslint8-plugin.js:133:16)
    at ESLint8Plugin.<anonymous> (C:\Program Files\JetBrains\WebStorm 2022.1.2\plugins\JavaScriptLanguage\languageService\eslint\bin\eslint8-plugin.js:120:44)
    at step (C:\Program Files\JetBrains\WebStorm 2022.1.2\plugins\JavaScriptLanguage\languageService\eslint\bin\eslint8-plugin.js:44:23)
    at Object.next (C:\Program Files\JetBrains\WebStorm 2022.1.2\plugins\JavaScriptLanguage\languageService\eslint\bin\eslint8-plugin.js:25:53)
Process finished with exit code -1

```


Node.js 版本是 v16.15.1，ESLint 版本是8.23.0. &#x20;
devDependencies 是这样的：

```typescript 
   "devDependencies": {
    "@types/node": "18.7.13",
    "@types/react": "18.0.17",
    "@types/react-dom": "18.0.6",
    "eslint": "8.23.0",
    "eslint-config-next": "12.2.5",
    "prisma": "^4.2.1",
    "typescript": "4.8.2"
  }

```


*.eslintrc.json* ：

```typescript 
 {
  "extends": "next/core-web-vitals"
}

```


该问题在 [WEB-57089](https://link.segmentfault.com/?enc=qkueV0nGecVKQDjmi+ogMw==.zBV2rWjK7D+W97BoWFGynXGhKhKedI5sbHJJNQTt28pRW8IDkzT5JEw+gTs+JMgaIRsiVCbLlwwUqxm2T6SroiUxK/7hb+Rqbp5Af5kMD5JyYFIhM2ai9QGxZ6Be2Pu4WVj+hLoiK+tp+fKpyGmfGg== "WEB-57089") 中被跟踪，并在 2022.2.2 [预览版](https://link.segmentfault.com/?enc=nZZLvmr/7a10k+iaA6Cuhw==.dY8EzAYcE1DMhakpr59MKNBtoS0EaHMMTHWuKU8bPQXt96bYhlvRdvzLZ1kAF2+arObCBDERbgTHEgkPaQVgBA== "预览版") 中得到修复。

该问题是由 ESLint 8.23 中引入的更改引起的（offending upstream commit： [在 GitHub 上查看](https://link.segmentfault.com/?enc=6vdfaM15pTxoahyDudv0+g==.Uy1xnwnBylh5YFszTE392TqTxL5WdvumMxQfw5+gYd+Bis++M1mWH/07o8sPIQe43uZsyh/usKJFL17zxdllxwKOXgUOpU9tz9BgZuuCldZ0FbTOJcy1ShVvuw9N+68KUC8KAK2v1UbW1vWwTpY8ibuYobxSE0V+H8/f9aRorUUTWbyVu7tkuxxGnpCdcZzzfiDB/go53V/hs6DinqA/rg== "在 GitHub 上查看")）。将 ESLint 降级到 8.22.x 或更早版本（使用 `npm install eslint@8.22.0 --save-exact` ）应该会有所帮助。
