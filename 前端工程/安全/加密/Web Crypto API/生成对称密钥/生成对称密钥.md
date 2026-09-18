# 生成对称密钥

```javascript title="AES 加密"
const generateKey = async () => {
    // 生成 AES-GCM 对称密钥
    const key = await window.crypto.subtle.generateKey({
            name: "AES-GCM",
            length: 256
        },
        true, // 是否允许导出密钥
        ["encrypt", "decrypt"]
    );
    console.log('key', key);

    // 导出生成的密钥并将其编码为 Base64
    const exportedKey = await window.crypto.subtle.exportKey(
        "raw", // 导出为原始格式
        key
    );

    // 将 ArrayBuffer 转换为 Base64 字符串
    const base64Key = btoa(String.fromCharCode(...new Uint8Array(exportedKey)));

    console.log("Generated AES-GCM Key:", base64Key);
};

generateKey();

```


**解释**

1. 密钥生成： 使用 window\.crypto.subtle.generateKey 生成一个 AES-GCM 对称密钥，密钥长度为 256 位。
2. 密钥导出： 使用 window\.crypto.subtle.exportKey 将生成的对称密钥导出为原始格式（raw），返回一个 ArrayBuffer。
3. Base64 编码： 将 ArrayBuffer 转换为一个 Uint8Array 并使用 btoa 函数将其编码为 Base64 字符串。
4. 打印密钥： 最后，将编码后的 Base64 字符串打印出来。

执行后的打印结果：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/935fe958244940fcabcd1a2eeaef1941~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=820\&h=91\&s=13519\&e=png\&b=fffefe)
