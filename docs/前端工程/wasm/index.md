# wasm

`wasm `是 `WebAssembly `的缩写。

`wasm `并不是传统意义上汇编语言（`Assembly`），而是一种中间编译的字节码，可以在浏览器上运行非 `JavaScript `语言，只要它能被编译成 wasm。

wasm 的优点：

1. 可以**使用 C/**[**C++**](https://zhida.zhihu.com/search?content_id=231563431\&content_type=Article\&match_order=1\&q=C++\&zhida_source=entity "C++")**、**[**Rust**](https://zhida.zhihu.com/search?content_id=231563431\&content_type=Article\&match_order=1\&q=Rust\&zhida_source=entity "Rust")**等语言编写代码，这个是 wasm 最大的价值所在；**
2. 高效**快速，二进制文件，以接近原生的速度运行；**
3. 安全，和 JS 有相同的沙盒环境和安全策略，比如同源策略；
4. 绝大多数主流浏览器支持。另外可移植，非浏览器环境也能支持（塞个 v8 进去，比如 nodejs）；
5. 使用其他语言的轮子。比如 Canvas 底层调用的[Skia](https://zhida.zhihu.com/search?content_id=231563431\&content_type=Article\&match_order=1\&q=Skia\&zhida_source=entity "Skia")C++ 库，就通过 wasm 技术提供了一个名为 CanvasKit 的 NPM 包给开发者用 JS 开发。

缺点：

1. 适用场景较少，**适合 CPU 密集型的场景（** 比如 3D 渲染）；
2. 提升并没有非常高（几十倍），**通常可能就两三倍的样子？但对普通前端来说学习成本太高，还得看投入产出比**；
3. **和 JS 有通信的成本，通信频繁或数据量大会降低性能。**

[Emscripten(c++）](Emscripten(c++）.md "Emscripten(c++）")

[wasm-pack（rust）](./wasm-pack（rust）/index.md "wasm-pack（rust）")

[wasm和node的关系](./wasm和node的关系/index.md "wasm和node的关系")

[AssemblyScript ](./AssemblyScript-/index.md "AssemblyScript ")

## 子目录与文章

- [Emscripten(c++）](./Emscripten%28c++）/index.md)
