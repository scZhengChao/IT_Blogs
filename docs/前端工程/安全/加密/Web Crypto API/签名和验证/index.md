# 签名和验证

## 目录

- [使用 HMAC 生成签名：](#使用-HMAC-生成签名)
- [使用 HMAC 验证签名：](#使用-HMAC-验证签名)

在`web`安全中，消息认证码（`HMAC, Hash-based Message Authentication Code`）是一种广泛使用的技术，用于验证消息的完整性和真实性。使用HMAC可以确**保数据在传输过程中未被篡改，并且数据确实来源于预期的发信方**。其具体用途包括但不限于以下几种：

- **数据完整性验证**：
  - HMAC 可以确保数据在传输过程中未被篡改。发送方使用共享密钥生成消息的 HMAC，接收方使用相同的密钥重新计算 HMAC，并与接收到的 HMAC 进行比较。
- **消息认证**：
  - HMAC 确保消息的来源是可信的。由于 HMAC 基于共享的密钥，只有握有密钥的双方才能生成有效的 HMAC，从而认证消息的真实性。
- **防止重播攻击**：
  - 在网络通信中，攻击者可能截获并重播有效的数据包。HMAC 可以与时间戳等其他机制结合使用，以防止这种情况的发生。
- **数字签名**：
  - 在一些场景下，HMAC 也用于替代数字签名，特别是在资源受限或需要较高计算效率的环境中。虽然 HMAC 不同于使用非对称加密的数字签名，但在特定的情况下HMAC也能提供充分高效的验证手段。

#### 使用 HMAC 生成签名：

```javascript 
const generateKey = async () => {
    return await window.crypto.subtle.generateKey({
            name: "HMAC",
            hash: { name: "SHA-256" }
        },
        true,
        ["sign", "verify"]
    );
};

const sign = async (key, data) => {
    const signature = await window.crypto.subtle.sign({
            name: "HMAC"
        },
        key,
        new TextEncoder().encode(data)
    );
    console.log("Signature:", btoa(String.fromCharCode(...new Uint8Array(signature))));
};

generateKey().then(key => {
    sign(key, "Hello World!");
});

```


执行后的打印结果：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c968c98decee46b39fac5e63d5eba4d7~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=616\&h=42\&s=5260\&e=png\&b=fffefe)

#### 使用 HMAC 验证签名：

```javascript 
const verify = async (key, signature, data) => {
    const isValid = await window.crypto.subtle.verify({
            name: "HMAC"
        },
        key,
        Uint8Array.from(atob(signature), c => c.charCodeAt(0)),
        new TextEncoder().encode(data)
    );
    console.log("Is valid:", isValid);
};

generateKey().then(key => {
    const signature = "之前生成的签名";
    verify(key, signature, "Hello World!");
});

```


下面列出完整示例：

```javascript 
const generateHMACKey = async () => {
    return await crypto.subtle.generateKey(
        { name: "HMAC", hash: "SHA-256" },
        true, // 是否可导出密钥
        ["sign", "verify"]
    );
};

const exportHMACKeyAsBase64 = async (key) => {
    const exportedKey = await crypto.subtle.exportKey("raw", key);
    return btoa(String.fromCharCode(...new Uint8Array(exportedKey)));
};

const importHMACKeyFromBase64 = async (base64Key) => {
    const rawKey = Uint8Array.from(atob(base64Key), c => c.charCodeAt(0));
    return await crypto.subtle.importKey(
        "raw",
        rawKey,
        { name: "HMAC", hash: "SHA-256" },
        true,
        ["sign", "verify"]
    );
};

const generateHMAC = async (key, message) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const signature = await crypto.subtle.sign("HMAC", key, data);
    return btoa(String.fromCharCode(...new Uint8Array(signature)));
};

const verifyHMAC = async (key, message, signatureBase64) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const signature = Uint8Array.from(atob(signatureBase64), c => c.charCodeAt(0));
    return await crypto.subtle.verify("HMAC", key, signature, data);
};

const testHMAC = async () => {
    const message = "Hello World!";
    
    // 生成HMAC密钥
    const hmacKey = await generateHMACKey();
    
    // 导出HMAC密钥作为Base64
    const base64Key = await exportHMACKeyAsBase64(hmacKey);
    console.log("HMAC Key (Base64):", base64Key);
    
    // 使用HMAC密钥生成消息签名
    const signature = await generateHMAC(hmacKey, message);
    console.log("HMAC Signature (Base64):", signature);
    
    // 导入HMAC密钥
    const importedKey = await importHMACKeyFromBase64(base64Key);
    
    // 验证HMAC签名
    const isValid = await verifyHMAC(importedKey, message, signature);
    console.log("Is the signature valid?", isValid);
};

testHMAC();


```


**解释**

1. `TextEncoder`是一个内置的全局对象，它在Web Crypto API中用于将字符串转换为字节数组。它被用来将文本消息编码为字节以便进行HMAC签名。
2. `crypto.subtle.sign`是 Web Crypto API 中的一个方法，用于对给定的数据使用指定的密钥进行签名操作。签名操作是对数据进行加密处理，生成一个特定的签名值，用于验证数据的完整性和真实性。
3. `crypto.subtle.verify` 是 Web Crypto API 中的一个方法，用于验证给定数据的数字签名。

执行后的打印结果：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f2d6678758f4f5686555171effb5efa~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=737\&h=68\&s=7753\&e=png\&b=fffefe)

关于加密和解密，签名和验签都逃不开密钥Key,如何**在客户端和服务端安全的共享Key是我们值得研究的问题**。参考文章[《Web客户端和服务器如何安全共享加密密钥Key》](https://juejin.cn/post/7385499574880059433 "《Web客户端和服务器如何安全共享加密密钥Key》")
