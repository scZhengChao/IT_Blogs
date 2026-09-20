# 拼接两个音频文件

由$以上整理的转换图得出途径$

fetch请求音频资源 -> `ArrayBuffer `-> `TypedArray `-> 拼接成一个 `TypedArray `-> `ArrayBuffer `-> `Blob `-> `Object URL`
