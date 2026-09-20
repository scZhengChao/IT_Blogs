# 和Blob的区别

Blob 是纯粹的二进制数据，它可以存储任何类型的数据，但不具有文件的元数据（如文件名、最后修改时间等）。

File 是 Blob 的子类，File 对象除了具有 Blob 的所有属性和方法之外，还包含文件的元数据，如文件名和修改日期。

你可以将 File 对象看作是带有文件信息的 Blob。

```typescript 
const file = new File(["Hello, world!"], "hello.txt", { type: "text/plain" });

console.log(file instanceof Blob); // true

```


二者在文件上传和二进制数据处理的场景中被广泛使用。`Blob` 更加通用，而 File 更专注于与文件系统的交互。
