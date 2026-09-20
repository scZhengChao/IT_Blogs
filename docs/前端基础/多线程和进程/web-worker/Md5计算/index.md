# Md5计算

## 目录

- [hash-wasm](#hash-wasm)
- [digest-wasm](#digest-wasm)
- [超过260字符](#超过260字符)
- [封装](#封装)

# hash-wasm

c++

配合。 [Blob 简介](<../../../EcmaScript/二进制/Blob/Blob 简介/index.md> "Blob 简介")

[ 分片计算文件MD5，借助WebAssembly和WebWorker及队列优化 - 掘金 分片计算MD5，使用WebAssembly计算，同时将计算过程放到webworker，避免长时间占用主线程造成卡顿，并且通过队列控制并发，避免占用过多计算机资源，造成浏览器卡顿。 https://juejin.cn/post/7340636105765437492](https://juejin.cn/post/7340636105765437492 " 分片计算文件MD5，借助WebAssembly和WebWorker及队列优化 - 掘金 分片计算MD5，使用WebAssembly计算，同时将计算过程放到webworker，避免长时间占用主线程造成卡顿，并且通过队列控制并发，避免占用过多计算机资源，造成浏览器卡顿。 https://juejin.cn/post/7340636105765437492")

> **hash-wasm ; 2.5G的文件在window上出现报错；无法解决；The requested file could not be read, typically due to permission problems**

> **该报错已解决；切该文件总体比较稳定；推荐使用文件**；原因在与切片的时候要小；不能切太大；

[ hash-wasm - npmGitDownloads Lightning fast hash functions for browsers and Node.js using hand-tuned WebAssembly binaries (MD4, MD5, SHA-1, SHA-2, SHA-3, Keccak, BLAKE2, BLAKE3, PBKDF2, Argon2, bcrypt, scrypt, Adler-32, CRC32, CR https://www.npmjs.com/package/hash-wasm](https://www.npmjs.com/package/hash-wasm " hash-wasm - npmGitDownloads Lightning fast hash functions for browsers and Node.js using hand-tuned WebAssembly binaries (MD4, MD5, SHA-1, SHA-2, SHA-3, Keccak, BLAKE2, BLAKE3, PBKDF2, Argon2, bcrypt, scrypt, Adler-32, CRC32, CR https://www.npmjs.com/package/hash-wasm")

```javascript title="createMD5"
// first process starts hashing
const md5 = await createMD5();
md5.init();
md5.update("Hello, ");
const state = md5.save(); // save this state

// second process resumes hashing from the stored state
const md5 = await createMD5();
md5.load(state);
md5.update("world!");
console.log(md5.digest()); // Prints
```


```typescript 
import { md5, sha1, sha512, sha3 } from 'hash-wasm';

async function run() {
  console.log('MD5:', await md5('demo'));

  const int8Buffer = new Uint8Array([0, 1, 2, 3]);
  console.log('SHA1:', await sha1(int8Buffer));
  console.log('SHA512:', await sha512(int8Buffer));

  const int32Buffer = new Uint32Array([1056, 641]);
  console.log('SHA3-256:', await sha3(int32Buffer, 256));
}

run();

```


# digest-wasm

rust

目前看俩是最快的；5个g大文件也没问题；md5 也很准确；

[   https://juejin.cn/post/7319541565318398003](https://juejin.cn/post/7319541565318398003 "   https://juejin.cn/post/7319541565318398003")

[ Digest-wasm NPM | npm.io Check Digest-wasm 0.1.4 package - Last release 0.1.4 with Apache-2.0 licence at our NPM packages aggregator and search engine. https://npm.io/package/digest-wasm](https://npm.io/package/digest-wasm " Digest-wasm NPM | npm.io Check Digest-wasm 0.1.4 package - Last release 0.1.4 with Apache-2.0 licence at our NPM packages aggregator and search engine. https://npm.io/package/digest-wasm")

[worker.zip](./assets/file/worker_4t9NIydDgU.zip " worker.zip")

# 超过260字符

![](./assets/image/image_m8bjs_YVjb.png)

[ windows 文件夹目录过长超过长度259字符 文件打不开\_解除文件名或文件夹长度限制-CSDN博客 文章浏览阅读1.6w次。当文件或文件夹路径超过260个字符时，Windows可能无法处理。这源于系统对FAT和NTFS文件系统的路径限制。为解决此问题，可以尝试缩短路径、移动文件、使用压缩软件或启用注册表中的LongPathsEnabled设置。在Windows10及更高版本中，长路径支持通常是默认启用的，但在某些情况下可能需手动调整注册表值。 https://blog.csdn.net/nbspzs/article/details/130363808#:\~:text=%E5%BD%93%E6%96%87%E4%BB%B6%E6%88%96%E6%96%87%E4%BB%B6%E5%A4%B9%E8%B7%AF%E5%BE%84%E8%B6%85%E8%BF%87260%E4%B8%AA%E5%AD%97%E7%AC%A6%E6%97%B6%EF%BC%8CWindows%E5%8F%AF%E8%83%BD%E6%97%A0%E6%B3%95%E5%A4%84%E7%90%86%E3%80%82,%E8%BF%99%E6%BA%90%E4%BA%8E%E7%B3%BB%E7%BB%9F%E5%AF%B9FAT%E5%92%8CNTFS%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E7%9A%84%E8%B7%AF%E5%BE%84%E9%99%90%E5%88%B6%E3%80%82%20%E4%B8%BA%E8%A7%A3%E5%86%B3%E6%AD%A4%E9%97%AE%E9%A2%98%EF%BC%8C%E5%8F%AF%E4%BB%A5%E5%B0%9D%E8%AF%95%E7%BC%A9%E7%9F%AD%E8%B7%AF%E5%BE%84%E3%80%81%E7%A7%BB%E5%8A%A8%E6%96%87%E4%BB%B6%E3%80%81%E4%BD%BF%E7%94%A8%E5%8E%8B%E7%BC%A9%E8%BD%AF%E4%BB%B6%E6%88%96%E5%90%AF%E7%94%A8%E6%B3%A8%E5%86%8C%E8%A1%A8%E4%B8%AD%E7%9A%84LongPathsEnabled%E8%AE%BE%E7%BD%AE%E3%80%82](https://blog.csdn.net/nbspzs/article/details/130363808#:~:text=%E5%BD%93%E6%96%87%E4%BB%B6%E6%88%96%E6%96%87%E4%BB%B6%E5%A4%B9%E8%B7%AF%E5%BE%84%E8%B6%85%E8%BF%87260%E4%B8%AA%E5%AD%97%E7%AC%A6%E6%97%B6%EF%BC%8CWindows%E5%8F%AF%E8%83%BD%E6%97%A0%E6%B3%95%E5%A4%84%E7%90%86%E3%80%82,%E8%BF%99%E6%BA%90%E4%BA%8E%E7%B3%BB%E7%BB%9F%E5%AF%B9FAT%E5%92%8CNTFS%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E7%9A%84%E8%B7%AF%E5%BE%84%E9%99%90%E5%88%B6%E3%80%82%20%E4%B8%BA%E8%A7%A3%E5%86%B3%E6%AD%A4%E9%97%AE%E9%A2%98%EF%BC%8C%E5%8F%AF%E4%BB%A5%E5%B0%9D%E8%AF%95%E7%BC%A9%E7%9F%AD%E8%B7%AF%E5%BE%84%E3%80%81%E7%A7%BB%E5%8A%A8%E6%96%87%E4%BB%B6%E3%80%81%E4%BD%BF%E7%94%A8%E5%8E%8B%E7%BC%A9%E8%BD%AF%E4%BB%B6%E6%88%96%E5%90%AF%E7%94%A8%E6%B3%A8%E5%86%8C%E8%A1%A8%E4%B8%AD%E7%9A%84LongPathsEnabled%E8%AE%BE%E7%BD%AE%E3%80%82 " windows 文件夹目录过长超过长度259字符 文件打不开_解除文件名或文件夹长度限制-CSDN博客 文章浏览阅读1.6w次。当文件或文件夹路径超过260个字符时，Windows可能无法处理。这源于系统对FAT和NTFS文件系统的路径限制。为解决此问题，可以尝试缩短路径、移动文件、使用压缩软件或启用注册表中的LongPathsEnabled设置。在Windows10及更高版本中，长路径支持通常是默认启用的，但在某些情况下可能需手动调整注册表值。 https://blog.csdn.net/nbspzs/article/details/130363808#:~:text=%E5%BD%93%E6%96%87%E4%BB%B6%E6%88%96%E6%96%87%E4%BB%B6%E5%A4%B9%E8%B7%AF%E5%BE%84%E8%B6%85%E8%BF%87260%E4%B8%AA%E5%AD%97%E7%AC%A6%E6%97%B6%EF%BC%8CWindows%E5%8F%AF%E8%83%BD%E6%97%A0%E6%B3%95%E5%A4%84%E7%90%86%E3%80%82,%E8%BF%99%E6%BA%90%E4%BA%8E%E7%B3%BB%E7%BB%9F%E5%AF%B9FAT%E5%92%8CNTFS%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E7%9A%84%E8%B7%AF%E5%BE%84%E9%99%90%E5%88%B6%E3%80%82%20%E4%B8%BA%E8%A7%A3%E5%86%B3%E6%AD%A4%E9%97%AE%E9%A2%98%EF%BC%8C%E5%8F%AF%E4%BB%A5%E5%B0%9D%E8%AF%95%E7%BC%A9%E7%9F%AD%E8%B7%AF%E5%BE%84%E3%80%81%E7%A7%BB%E5%8A%A8%E6%96%87%E4%BB%B6%E3%80%81%E4%BD%BF%E7%94%A8%E5%8E%8B%E7%BC%A9%E8%BD%AF%E4%BB%B6%E6%88%96%E5%90%AF%E7%94%A8%E6%B3%A8%E5%86%8C%E8%A1%A8%E4%B8%AD%E7%9A%84LongPathsEnabled%E8%AE%BE%E7%BD%AE%E3%80%82")

# 封装

```javascript 
import { MAX_CHUNK_SIZE } from '../constants/upload.constants';
import { WorkerMd5StatusEnum } from '../enums/upload.enum';
import SparkMD5 from 'spark-md5';
const { Md5 } = require('../utils/dist/digest_wasm');
class Md5Manager {
  constructor(type) {
    const canWasm =
      typeof WebAssembly === 'object' && typeof WebAssembly.instantiate === 'function';
    if (!canWasm) {
      this.type = 'spark-md5';
    } else {
      this.type = type || 'digest-wasm';
    }
  }
  create() {
    if (this.type === 'digest-wasm') {
      this.maker = Md5.new();
    } else {
      this.maker = new SparkMD5.ArrayBuffer();
    }
  }
  async append(dataBuffer) {
    if (this.type === 'digest-wasm') {
      await this.maker.update(new Uint8Array(dataBuffer));
    } else {
      this.maker.append(dataBuffer);
    }
  }
  async onceOut(preFile) {
    const buffer = await preFile.arrayBuffer();
    const arr = new Uint8Array(buffer);
    if (this.type === 'digest-wasm') {
      return await Md5.digest_u8(arr);
    } else {
      this.maker.append(buffer);
      return this.maker.end();
    }
  }
  end() {
    if (this.type === 'digest-wasm') {
      return this.maker.finalize();
    } else {
      const result = this.maker.end();
      this.maker.destroy();
      return result;
    }
  }
}
```
