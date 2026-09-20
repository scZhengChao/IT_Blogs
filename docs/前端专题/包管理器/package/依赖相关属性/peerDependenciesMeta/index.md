# peerDependenciesMeta

**详细修饰了peerDependicies**，比如在react-redux这个npm包中的package.json中有这么一段：

```react tsx 
"peerDependencies": { 
  "react": "16.8.3 || 17 || ^18" 
}, 
"peerDependenciesMeta": { 
  "react-dom": { "optional": true }, 
  "react-native": { "optional": true } 
}

```


指定了"`react-dom`","`react-native`"在`peerDependenciesMeta`中，且为可选项，因此如果项目中检测没有安装"`react-dom`"和"`react-native`"都不会报错。

通过`peerDependenciesMeta`我们确实是取消了限制，但是这里经常存在`非A即B的`场景，比如上述例子中，我们需要的是“react-dom”和"react-native"需要安装一个，但是实际上通过上述的声明，我们实现不了这种提示.
