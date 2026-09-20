# 清理maven仓库

![](./assets/image/image_TyThc5gQhz.png)

初始情况下，我们的本地仓库是没有任何jar包的，此时会从私服去下载（如果没有配置，就直接从中央仓库去下载），可能由于网络的原因，jar包下载不完全，**这些不完整的jar包都是以lastUpdated结尾。此时，maven不会再重新帮你下载，需要你删除这些以lastUpdated结尾的文件**。如果本地仓库中有很多这样的以lastUpadted结尾的文件，可以执行如下脚本来删除：

![](./assets/image/image_54GgwPEHB3.png)

[cleanLastUpdated.bat](./assets/file/cleanLastUpdated_vMhlSeYbCl.bat "cleanLastUpdated.bat")
