# URL & URLSearchParams

## 目录

- [浏览器兼容性](#浏览器兼容性)

[URL](URL.md "URL")

[URLSearchParams](URLSearchParams.md "URLSearchParams")

### 浏览器兼容性

URL 和 URLSearchParams API 在现代浏览器中得到了广泛支持，但在旧版浏览器（如 IE）中可能需要使用 polyfill。

- URL API: 支持 Chrome 32+, Firefox 29+, Safari 8+, Edge 12+
- URLSearchParams API: 支持 Chrome 49+, Firefox 29+, Safari 10.1+, Edge 14+

如果你需要支持旧版浏览器，可以考虑使用[url-polyfill](https://github.com/lifaon74/url-polyfill "url-polyfill")或[whatwg-url](https://github.com/jsdom/whatwg-url "whatwg-url")等 polyfill。
