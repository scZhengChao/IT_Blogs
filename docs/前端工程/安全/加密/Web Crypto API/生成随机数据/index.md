# 生成随机数据

```javascript title="生成一个32位16进制随机数"
const generateRandomBytes = (length) => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return array;
};

const randomBytes = generateRandomBytes(32);
console.log("Random 32 Bytes:", randomBytes);

const bytesToHex = (bytes) => {
    return Array.from(bytes)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
};

console.log("Random 32 Bytes (Hex):", bytesToHex(randomBytes));

```


执行后的打印结果：

![](./assets/image/image_5ttsqEDug2.png)

**解释**

1. `Uint8Array`是一个 JavaScript 数组类型,其中的每一个元素表示 8 位无符号整数值的数组。它的取值范围是介于 0 到 255 之间的十进制整数值。
2. `getRandomValues`是 crypto 对象上的一个方法。它接受一个 Uint8Array、Uint16Array 或 Uint32Array 类型的数组作为参数，利用操作系统或硬件提供的真正随机数源，高效地将随机数填充到用户提供的数组中，相比较Math.random() 使用伪随机数算法生成的随机数，为应用程序提供了一种安全可靠的随机数生成方式。
3. `byte.toString(16).padStart(2, '0')`将 byte 值转换为一个16进制字符串，如果原字符串长度不足2个字符，则在字符串开头添加字符'0'来达到2个字符的长度。

如果我想生成一个每位是十进制的32位随机数，应该如何做呢？

由于一个Unit8是一个数值范围在0-255之间的数，因此还需要把这个范围的随机数转化到0-9之间。

```javascript 
const generateRandomBytesInRange = (length, min, max) => {
    if (min > max) throw new Error("Min must be less than or equal to Max");
    
    const range = max - min + 1;
    const byteArray = new Uint8Array(length);
    window.crypto.getRandomValues(byteArray);

    const randomValuesInRange = new Uint8Array(length);
    for (let i = 0; i < byteArray.length; i++) {
        // 将随机字节值转换到指定范围内的随机值
        randomValuesInRange[i] = min + (byteArray[i] % range);
    }
    return randomValuesInRange;
};

console.log("Random 32 Bytes (Hex):", bytesToHex(randomBytes));

const randomDigits = generateRandomBytesInRange(32, 0, 9);
console.log("Random 32 Digits:", randomDigits);
console.log("Random 32 Digits(String):", randomDigits.join(''));

```
