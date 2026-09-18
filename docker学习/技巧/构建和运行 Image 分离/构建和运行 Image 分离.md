# 构建和运行 Image 分离

我们在编译应用的时候需要很多构建工具，比如 gcc, golang 等。但**是在运行的时候不需要。在构建完成之后，去删除那些构建工具是很麻烦的。**

我们可以这样：**使用一个 Docker 作为 builder，** 安装所有的构建依赖，进行构建，构建完成后，重新选择一个 Base image，然后将构建的产物复制到新的 base image，这样，最终的 image 只含有运行需要的东西。

比如，这是安装一个 golang 应用 pup 的代码：

```bash 
FROM golang as build
ENV CGO_ENABLED 0
RUN go install github.com/ericchiang/pup@latest
 
FROM alpine:3.15.4 as run
COPY --from=build /go/bin/pup /usr/local/bin/pup
```


我们使用 golang 这个 1G 多大的 image 来安装，安装完成之后将 binary 复制到 alpine, 最终的产物只有 10M 左右。这种方法特别适合一些静态编译的编程语言，比如 golang 和 rust.
