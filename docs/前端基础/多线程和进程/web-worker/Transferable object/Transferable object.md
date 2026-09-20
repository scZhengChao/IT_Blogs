# Transferable object

## 目录

- [可转移对象](#可转移对象)

# 可转移对象

[ 可转移对象 - Web API | MDNMDN Web DocsMDN logoMozilla logo 可转移的对象（Transferable object）是拥有属于自己的资源的对象，这些资源可以从一个上下文转移到另一个，确保资源一次仅在一个上下文可用。传输后，原始对象不再可用；它不再指向转移后的资源，并且任何读取或者写入该对象的尝试都将抛出异常。 https://developer.mozilla.org/zh-CN/docs/Web/API/Web\_Workers\_API/Transferable\_objects](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Transferable_objects " 可转移对象 - Web API | MDNMDN Web DocsMDN logoMozilla logo 可转移的对象（Transferable object）是拥有属于自己的资源的对象，这些资源可以从一个上下文转移到另一个，确保资源一次仅在一个上下文可用。传输后，原始对象不再可用；它不再指向转移后的资源，并且任何读取或者写入该对象的尝试都将抛出异常。 https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Transferable_objects")

[ Web Worker传输大量Transferable对象时的性能问题  https://joji.me/zh-cn/blog/performance-issue-of-using-massive-transferable-objects-in-web-worker/](https://joji.me/zh-cn/blog/performance-issue-of-using-massive-transferable-objects-in-web-worker/ " Web Worker传输大量Transferable对象时的性能问题  https://joji.me/zh-cn/blog/performance-issue-of-using-massive-transferable-objects-in-web-worker/")

以下是可以被\_转移\_的不同规范的对象：

- [ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer "ArrayBuffer")
- [MessagePort](https://developer.mozilla.org/zh-CN/docs/Web/API/MessagePort "MessagePort")
- [ReadableStream](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream "ReadableStream")
- [WritableStream](https://developer.mozilla.org/zh-CN/docs/Web/API/WritableStream "WritableStream")
- [TransformStream](https://developer.mozilla.org/zh-CN/docs/Web/API/TransformStream "TransformStream")
- [AudioData](https://developer.mozilla.org/en-US/docs/Web/API/AudioData "AudioData")
- [ImageBitmap](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageBitmap "ImageBitmap")
- [VideoFrame](https://developer.mozilla.org/en-US/docs/Web/API/VideoFrame "VideoFrame")
- [OffscreenCanvas](https://developer.mozilla.org/zh-CN/docs/Web/API/OffscreenCanvas "OffscreenCanvas")
- [RTCDataChannel](https://developer.mozilla.org/zh-CN/docs/Web/API/RTCDataChannel "RTCDataChannel")

在各自对象的兼容性信息中，如果拥有 `transferable` 子特性，浏览器的支持应该被展示（示例请参阅 [RTCDataChannel](https://developer.mozilla.org/zh-CN/docs/Web/API/RTCDataChannel#浏览器兼容性 "RTCDataChannel")）。在撰写本文时，并非所有可转移对象都已更新此信息。

```javascript 
// Create an 8MB "file" and fill it. 8MB = 1024 * 1024 * 8 B
const uInt8Array = new Uint8Array(1024 * 1024 * 8).map((v, i) => i);
console.log(uInt8Array.byteLength); // 8388608

// Transfer the underlying buffer to a worker
worker.postMessage(uInt8Array, [uInt8Array.buffer]);
console.log(uInt8Array.byteLength); // 0

```


**备注：** 像[Int32Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Int32Array "Int32Array") 和 [Uint8Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array "Uint8Array") 等[类型化数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray "类型化数组")是[可序列化的](https://developer.mozilla.org/zh-CN/docs/Glossary/Serializable_object "可序列化的")，但是不能转移。然而，它们的底层缓冲区是一个 [ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer "ArrayBuffer")，它是一个可转移对象。我们可以在数据参数中发送 `uInt8Array.buffer`，但是不能在传输数组中发送 `uInt8Array`。
