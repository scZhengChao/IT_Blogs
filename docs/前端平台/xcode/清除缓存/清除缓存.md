# 清除缓存

## 目录

- [iOS 清除Xcode缓存DerivedData和生成文件DeviceSupport](#iOS-清除Xcode缓存DerivedData和生成文件DeviceSupport)

# iOS 清除Xcode缓存DerivedData和生成文件DeviceSupport

> `~/Library/Developer/Xcode/DerivedData
> `项目 build 或 debug 的中间产物，有时候项目出问题的时候，重置这些文件会有帮助。
> 如果删除，构建项目时会重建这些文件。

> \~/Library/Developer/Xcode/iOS DeviceSupport &#x20;
> 连上设备时自动创建 &#x20;
> 通常旧设备没必要保留

> 由于iOS的共享缓存技术，新设备在连接到Xcode时会自动提取系统库到`~/Lihrary/Developer/Xcode/ iOS DeviceSupport`目录下。当连接多个设备之后，这个目录会变得特别大，因此可以定期清理这个目录。共享缓存在系统启动后被加载到内存中，当有新的程序加载时会先到共享缓存里面寻找。如果找到，就直接将共享缓存中的地址映射到目标进程的内存地址空间，极大地提高了加载效率。——来自《iOS应用逆向与安全》
