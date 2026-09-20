# 文件系统

出于安全考虑，`wasm` 最终是要**在浏览器的沙箱内运行的，是无法读取本地文件的。**

但我们还是可以使用 C++ 的读取文件的方法的，只是它会被转换为从虚拟文件系统里读取。

`hello_world_file.cpp`文件：

```c 
#include <stdio.h>

int main() {
  FILE *file = fopen("./hello_world_file.txt", "rb");
  if (!file) {
    printf("cannot open file\n");
    return 1;
  }
  while (!feof(file)) {
    char c = fgetc(file);
    if (c != EOF) {
      putchar(c);
    }
  }
  fclose (file);

  printf("\n");

  return 0;
}

```


需要读取的文本文件`hello_world_file.txt`为：

```markdown 
==
This data has been read from a file.
The file is readable as if it were at the same location in the filesystem, including directories, as in the local filesystem where you compiled the source.
前端西瓜哥
==

```


使用`--preload-file`选项，指定要预加载的资源文件。

```c++ 
emcc hello_world_file.cpp -o hello.html --preload-file hello_world_file.txt

```


结果：

![](https://picx.zhimg.com/v2-8adaf9787e8533394bfbef6d705db695_1440w.jpg)
