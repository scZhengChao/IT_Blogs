# Web Crypto API

## 目录

- [兼容性](#兼容性)

[ Web Crypto API - Web APIs | MDNMDN Web DocsMDN logoMozilla logo The Web Crypto API is an interface allowing a script to use cryptographic primitives in order to build systems using cryptography. https://developer.mozilla.org/en-US/docs/Web/API/Web\_Crypto\_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API " Web Crypto API - Web APIs | MDNMDN Web DocsMDN logoMozilla logo The Web Crypto API is an interface allowing a script to use cryptographic primitives in order to build systems using cryptography. https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API")

根据官方的建议，现代的 Node.js 和现代浏览器已经内置了原生的 Crypto 模块，用于进行加密和安全操作。原生的 Crypto 模块提供了更可靠和安全的加密功能，因此，使用原生的 Crypto 模块是更好的选择。

如果你的项目需要进行加密操作，我建议使用 Node.js 的原生 Crypto 模块。具体使用方式和 API 可以参考 Node.js 官方文档中关于 Crypto 模块的部分：[https://nodejs.org/api/crypto.html](https://nodejs.org/api/crypto.html "https://nodejs.org/api/crypto.html")

对于浏览器端，可以使用 Web Crypto API 来进行加密操作。Web Crypto API 是浏览器提供的原生加密 API，它提供了一系列的加密算法和操作方法。具体使用方式和 API 可以参考 MDN 文档中关于 Web Crypto API 的部分：[https://developer.mozilla.org/en-US/docs/Web/API/Web\_Crypto\_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API "https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API")

**通过使用原生的 Crypto 模块，你可以获得****更好的性能和更高的安全性****，同时避免****使用不再维护的 CryptoJS 库****。**

[   https://juejin.cn/post/7385356774445449270?searchId=2024081410560309F1BD5FE3F7515CB8EE](https://juejin.cn/post/7385356774445449270?searchId=2024081410560309F1BD5FE3F7515CB8EE "   https://juejin.cn/post/7385356774445449270?searchId=2024081410560309F1BD5FE3F7515CB8EE")

`Web Crypto API` 是现代浏览器中提供的一套接口，用于**实现标准化的加密操作，如生成随机数、密钥生成、加密、解密和签名**等。它的一个主要特点是**可以提供更高的安全性和更好的性能**，因为它使用**底层的操作系统原生加密库**。下面是Web Crypto API的一些基本用法示例：

# 兼容性

**Web Crypto API** 为脚本提供了一套关于密码学原语的接口，以便用于构建需要使用加密的系统。

> **备注：** 此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API "Web Worker") 中可用。

> **安全上下文:** 此项功能仅在一些[支持的浏览器](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Crypto_API#浏览器兼容性 "支持的浏览器")的[安全上下文](https://developer.mozilla.org/zh-CN/docs/Web/Security/Secure_Contexts "安全上下文")（HTTPS）中可用。

> **警告：** 此 API 提供了许多底层密码学原语。滥用它们很容易陷入微妙的陷阱中。
> 即使你正确地运用了基础加密方法，也很难设计一套正确的安全密钥管理及整体安全设计方案，这些往往是安全专家所做的事情。
> 错误的安全系统设计和实现会使系统的安全性完全失效。
> 你可以学习并进行实验，但我们并不能保证这些内容的安全性，最好有熟悉该领域的人对你的相关工作进行彻底的审查以保证其安全性。如果你要学习安全系统的设计和部署，可以学习[Crypto 101 课程](https://www.crypto101.io/ "Crypto 101 课程")。

![](./assets/image/image_2diR5v9vO-.png)

[生成随机数据](./生成随机数据/index.md "生成随机数据")

[生成对称密钥](./生成对称密钥/index.md "生成对称密钥")

[生成非对称密钥对](./生成非对称密钥对/index.md "生成非对称密钥对")

[对称加密和解密](./对称加密和解密/index.md "对称加密和解密")

[非对称加密和解密](./非对称加密和解密/index.md "非对称加密和解密")

[签名和验证](./签名和验证/index.md "签名和验证")

[散列 (Hashing)](<./散列 (Hashing)/index.md> " 散列 (Hashing)")
