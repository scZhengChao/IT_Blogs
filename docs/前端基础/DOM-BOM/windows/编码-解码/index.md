# 编码/解码

## 目录

- [escape/unescape](#escapeunescape)
- [encodeURI/decodeURI](#encodeURIdecodeURI)
- [encodeURIComponent/decodeURIComponent](#encodeURIComponentdecodeURIComponent)
- [btoa/atob](#btoaatob)

**进行编码涉及4个函数：escape,encodeURI,encodeURIComponent，btoa**

**相应4个解码函数：unescape,decodeURI,decodeURIComponent，atob**

unescape() 函数可对通过 escape() 编码的字符串进行解码。

# escape/unescape

> 注释：ECMAScript v3&#x20;

**已从****标准中删除了 unescape() 函数，并反对使用它****，因此应该用 decodeURI() 和 decodeURIComponent() 取而代之。**

- 不会对字母数字进行编码，
- 不会对下面这些 ASCII 标点符号进行编码- \_ . \*@
- 其他所有的字符都会被转义序列替换。

# **encodeURI/decodeURI**

- 不会对字母数字进行编码，
- 不会对ASCII标点符号进行编码- \_.!\~ \*’()
- 不会对在url中有特殊含义的ASCII标点符号进行编码：;/?:@&=+\$,#

# **encodeURIComponent/decodeURIComponent**

- 不会对字母数字进行编码，
- 不会对ASCII标点符号进行编码- \_.!\~\*
- 会对在url中有特殊含义的ASCII标点符号进行编码：;/?:@&=+\$,#

# **btoa/** ​**atob**

> **方法用于解码使用 base-64 编码的字符串。**

- window\.atob(encodedStr)
- **btoa() 方法用于创建一个 base-64 编码的字符串。**
- **加密中文必须添加encodeURIComponent     window\.btoa(encodeURIComponent(str));**

```javascript 
 window.btoa(str);
转码
 //这个地方replace 方法是把encodeURLComponennt 转成ascii 码的部分（二进制）在转回来,  
function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}
b64EncodeUnicode('我是很厉害的'); // "5oiR5piv5b6I5Y6J5a6z55qE"

解码
function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}
b64DecodeUnicode('5oiR5piv5b6I5Y6J5a6z55qE'); // "我是很厉害的"
```
