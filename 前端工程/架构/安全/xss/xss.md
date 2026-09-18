# xss

## 目录

- [Install](#Install)
- [Usages](#Usages)
  - [Whitelist](#Whitelist)
- [browser](#browser)

[ npm: xss Sanitize untrusted HTML (to prevent XSS) with a configuration specified by a Whitelist. Latest version: 1.0.14, last published: 6 months ago. Start using xss in your project by running \`npm i xss\`. Th https://www.npmjs.com/package/xss](https://www.npmjs.com/package/xss " npm: xss Sanitize untrusted HTML (to prevent XSS) with a configuration specified by a Whitelist. Latest version: 1.0.14, last published: 6 months ago. Start using xss in your project by running `npm i xss`. Th https://www.npmjs.com/package/xss")

## Install

```react 
npm install xss

```


## Usages

```react 
var xss = require("xss");
var html = xss('<script>alert("xss");</script>');
console.log(html);

```


### Whitelist

```react 
// only tag a and its attributes href, title, target are allowed
var options = {
  whiteList: {
    a: ["href", "title", "target"],
  },
};
// With the configuration specified above, the following HTML:
// <a href="#" onclick="hello()"><i>Hello</i></a>
// would become:
// <a href="#">&lt;i&gt;Hello&lt;/i&gt;</a>

```


# browser

```react tsx 
import { filterXSS } from 'xss';

<div
  className={cx('material-desc')}
  dangerouslySetInnerHTML={{ __html: filterXSS(description) }}
/>

```
