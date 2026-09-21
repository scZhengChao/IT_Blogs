# AES

## 目录

- [安装CryptoJS](#安装CryptoJS)
- [AES](#AES)
- [Aes（2）](#Aes2)

# 安装CryptoJS

```typescript 
npm install crypto-js

import CryptoJS from 'crypto-js/crypto-js'

```


# **AES**

高级加密标准(`AES,Advanced Encryption Standard`)为最常见的**对称加密算法**(微信小程序加密传输就是用这个加密算法的)。对称加密算法也就是**加密和解密用相同的密钥**。下面直接上AES加密解密代码：

```typescript 
import CryptoJS from 'crypto-js' // 引用crypto-js

const key = CryptoJS.enc.Utf8.parse('JtZ9RzYpN2tEVayl') // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('JtZ9RzYpN2tEVayl') // 十六位十六进制数作为密钥偏移量

// 解密方法(Base64)
function Decrypt(word) {
  let decrypt = CryptoJS.AES.decrypt(word, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

// 加密方法(Base64)
function Encrypt(word) {  // word为Json字符串
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

function Md5 (string) {
  return CryptoJS.MD5(string)
}

export {
  Decrypt,
  Encrypt,
  Md5
}

```


上面的代码中的 **key 是密钥** ，密钥为**接收方与发送方协商产生**，但不可以直接在网络上传输，否则会导致密钥泄漏，通常是通过**非对称加密算法加密密钥**，**然后再通过网络传输给对方**，或者直接面对面商量密钥。为了方便，这里我们直接在代码中定义；**iv 是密钥偏移量**。
在进行AES加密过程中，还需要注意一些配置

![](./assets/image/image_Je10pJbGDZ.webp)

如果无法正确解密，要确认双方是否遵循同样的`AES`算法，字符串密钥和`IV`是否相同，加密后的数据是否统一为`hex`或`base64`格式。

根据项目需求，首先我们将数据进行`MD5`加密作为**接口的签名**，接着将数据和接口签名拼接上进行`AES`加密，然后将`AES`加密后的密文进行`base64`加密，生成最终的密文
在这里使用axios封装post请求

# Aes（2）

```javascript 
const crypto = require('crypto');
var data = '[{"parameters":["filename"],"value":["sql执行顺序.txt"]},{"parameters":["suffix"],"value":["txt"]},{"parameters":["filename"],"value":["sql执行顺序.txt"]},{"parameters":["filename"],"value":["sql执行顺序.txt"]},{"parameters":["filename"],"value":["sql执行顺序.txt"]},{"parameters":["filename"],"value":["sql执行顺序.txt"]},]';
var key = 'Password!';
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}


var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);




或者：不是一个包


import CryptoJS from 'crypto-js';

let AES = {
  // 加密
  encrypt: function (key, iv, data) {
    if (typeof data === 'object') {
      // 如果传入的data是json对象，先转义为json字符串
      try {
        data = JSON.stringify(data);
      } catch (error) {
        console.log('error:', error);
      }
    }
    // 统一将传入的字符串转成UTF8编码
    const dataHex = CryptoJS.enc.Utf8.parse(data); // 需要加密的数据
    const keyHex = CryptoJS.enc.Utf8.parse(key); // 秘钥
    const ivHex = CryptoJS.enc.Utf8.parse(iv); // 偏移量
    const encrypted = CryptoJS.AES.encrypt(dataHex, keyHex, {
      iv: ivHex,
      mode: CryptoJS.mode.CBC, // 加密模式
      padding: CryptoJS.pad.Pkcs7,
    });
    let encryptedVal = encrypted.ciphertext.toString();
    return encryptedVal; //  返回加密后的值
  },
  // 解密
  decrypt: function (key, iv, encryptedVal) {
    // 传入的key和iv需要和加密时候传入的key一致
    // 统一将传入的字符串转成UTF8编码
    let encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedVal);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const keyHex = CryptoJS.enc.Utf8.parse(key); // 秘钥
    const ivHex = CryptoJS.enc.Utf8.parse(iv); // 偏移量
    let decrypt = CryptoJS.AES.decrypt(srcs, keyHex, {
      iv: ivHex,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  },
};

export default AES;


```


> 使用库CryptoJS。发现它默认输出是16进制，但是服务器解析时候是需要Base64的。

```javascript 
const aseKey = '85WbAfxEU9PpYCQH';
export function aesEncrypt(data) {
  const dataHex = CryptoJS.enc.Utf8.parse(data); // 需要加密的数据
  const keyHex = CryptoJS.enc.Utf8.parse(aseKey); // 秘钥
  const ivHex = CryptoJS.enc.Utf8.parse('0000000000000111'); // 偏移量
  const encrypted = CryptoJS.AES.encrypt(dataHex, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC, // 加密模式
    padding: CryptoJS.pad.Pkcs7
  });
  const encryptedVal = encrypted.ciphertext.toString().toUpperCase();
  const oldHexStr = CryptoJS.enc.Hex.parse(encryptedVal);
  const base64Str = CryptoJS.enc.Base64.stringify(oldHexStr);

  return base64Str; //  返回加密后的值
}


```
