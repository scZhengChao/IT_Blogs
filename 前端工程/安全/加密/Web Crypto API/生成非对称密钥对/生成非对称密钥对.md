# 生成非对称密钥对

```javascript 
const generateKeyPair = async () => {
    const keyPair = await window.crypto.subtle.generateKey({
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256"
        },
        true,
        ["encrypt", "decrypt"]
    );

    const publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
    const privateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

    console.log("Public Key:", btoa(String.fromCharCode(...new Uint8Array(publicKey))));
    console.log("Private Key:", btoa(String.fromCharCode(...new Uint8Array(privateKey))));
};

generateKeyPair();

```


**解释**

1. `publicExponent`是在使用RSA算法生成密钥对时的一个参数，指定RSA公钥的指数。`publicExponent`被设置为`new Uint8Array([1, 0, 1])`，这表示RSA公钥的指数为65537（0x010001）。在RSA算法中，通常选择65537作为公钥的指数，因为它是一个较小的素数且具有良好的安全性和效率。指定publicExponent为指定的值有助于确保生成的RSA密钥对的安全性和正确性。

执行打印后的结果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b78ba1442fe453f982a14f3379f1e11~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1588\&h=346\&s=144906\&e=png\&b=fffdfd)
