# &#x20;散列 (Hashing)

计算 SHA-256 哈希：

```javascript 
const hash = async (data) => {
    const digest = await window.crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(data)
    );
    console.log("SHA-256:", btoa(String.fromCharCode(...new Uint8Array(digest))));
};

hash("Hello World!");

```


执行后的打印结果：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95b48c061b4f472d88fc9e0226f218f5~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=683\&h=42\&s=4845\&e=png\&b=fffefe)

总结 Web Crypto API 提供了一组强大且灵活的工具，用于在网页应用中实现各种加密和安全相关的操作。其**主要优势在于它可以直接使用浏览器提供的底层加密库提供更高效和更安全的加密操作。**
