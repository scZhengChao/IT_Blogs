# optionalDependenices

如果需要**在找不到包或者安装包失败时，npm 仍然能够继续运**行，则可以将该包放在 `optionalDependencies` 对象中，optionalDependencies\*\* 对象中的包会覆盖 ****`dependencies`****中同名的包 \*\*，所以**只需在一个地方进行设置即可**。

需要注意，由于 `optionalDependencies`中的依赖可能并未安装成功 **，所以一定要做异常处理，否则当获取**这个依赖时，如果获取不到就会报错。

与`dependencies`类似，`optionalDependencies`是个可选的`dependencies`，npm在安装`dependencies`过程中出错会退出安装，但对`optionalDependencies`来说，**即使一些依赖安装失败，也不影响最终应用运行**，但还要做好相应模块容错处理。
