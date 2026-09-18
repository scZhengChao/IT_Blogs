# 对称加密和解密

## 目录

- [使用 AES-GCM 密钥进行加密：](#使用-AES-GCM-密钥进行加密)
- [使用 AES-GCM 密钥进行解密：](#使用-AES-GCM-密钥进行解密)

#### 使用 AES-GCM 密钥进行加密：

```javascript 
const encrypt = async (key, data) => {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await window.crypto.subtle.encrypt({
            name: "AES-GCM",
            iv: iv
        },
        key,
        new TextEncoder().encode(data)
    );
    console.log("Encrypted Data:", btoa(String.fromCharCode(...new Uint8Array(encrypted))));
    console.log("IV:", btoa(String.fromCharCode(...iv)));
};

const keyPromise = window.crypto.subtle.generateKey({
        name: "AES-GCM",
        length: 256
    },
    true,
    ["encrypt", "decrypt"]
);

keyPromise.then(key => {
    encrypt(key, "Hello World!");
});

```


执行打印后的结果：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ba91f4230a349e9810d36f646d0f829~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=587\&h=74\&s=7658\&e=png\&b=fffefe)

#### 使用 AES-GCM 密钥进行解密：

```javascript 
const decrypt = async (key, iv, encryptedData) => {
    const decrypted = await window.crypto.subtle.decrypt({
            name: "AES-GCM",
            iv: iv
        },
        key,
        encryptedData
    );
    console.log("Decrypted Data:", new TextDecoder().decode(decrypted));
};

const encryptedData = Uint8Array.from(atob("加密后的数据"), c => c.charCodeAt(0));
const iv = Uint8Array.from(atob("加密用的IV"), c => c.charCodeAt(0));

keyPromise.then(key => {
    decrypt(key, iv, encryptedData);
});

```


**注意**

解密的时候需要拿到加密时生成的key，如果加密和解密不在同一台机器怎么办呢，我们需要将key转化为base64进行传输，接收方再将base64转化为key,下面列举一下完整加解密过程：

```javascript 
//导出key对象转化为base64Key 
const exportKeyAsBase64 = async (key) => {
    const exportedKey = await crypto.subtle.exportKey("raw", key);
    retu rn btoa(String.fromCharCode(...new Uint8Array(exportedKey))); 
};
//导入base64Key转化为key对象
const importKeyFromBase64 = async (base64Key) => {
     const rawKey = Uint8Array.from(atob(base64Key), c => c.charCodeAt(0));
     return await crypto.subtle.importKey(
        "raw",
        rawKey, {
            name: "AES-GCM"
        },
        true,
        ["encrypt", "decrypt"]
    );
};
```


下面列出含key导出与导入的简要demo示例：

```javascript 
const testExportImportKey = async () => {
    // 生成一个新的密钥
    const generatedKey = await generateKey();

    // 导出密钥为 Base64
    const base64Key = await exportKeyAsBase64(generatedKey);
    console.log("Exported Base64 Key:", base64Key);

    // 从 Base64 导入密钥
    const importedKey = await importKeyFromBase64(base64Key);

    // 测试加密和解密
    const dataToEncrypt = "Hello World!";
    const encryptedResult = await encrypt(importedKey, dataToEncrypt);
    console.log("Encrypted Data:", encryptedResult.data);

    const decryptedData = await decrypt(importedKey, encryptedResult.iv, encryptedResult.data);
    console.log("Decrypted Data:", decryptedData);
};

testExportImportKey();

```


**解释**

1. **导出密钥**: 使用 `exportKeyAsBase64` 方法将密钥转换为 Base64 编码字符串。
2. **导入密钥**: 使用 `importKeyFromBase64` 方法将 Base64 编码字符串转换回一个 AES-GCM 密钥对象。
3. **测试导出与导入**:
   - 首先生成一个新的密钥。
   - 将密钥导出为 Base64 编码字符串并打印出来。
   - 将 Base64 编码字符串导入为密钥对象。
   - 使用导入的密钥对象进行加密操作，再用同一密钥对象解密，最后打印解密后的结果以验证整个流程的正确性。
