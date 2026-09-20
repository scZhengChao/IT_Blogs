# dependencies/devDependencies

package.json中跟依赖相关的配置属性包含了`dependencies`、`devDependencies`、`peerDependencies`和`peerDependenciesMeta`等。

**dependencies是项目的依赖，而devDependencies是开发所需要的模块**，所以我们可以在开发过程中需要的安装上去，来提高我们的开发效率。这里需要注意的时，在自己的项目中尽量的规范使用，形如webpack、babel等是开发依赖，而不是项目本身的依赖，不要放在dependencies中。

dependencies除了dependencies和devDependencies，本文重点介绍的是peerDependencies和peerDependenciesMeta。

![](./image/image_SgZKqm8oih.png)
