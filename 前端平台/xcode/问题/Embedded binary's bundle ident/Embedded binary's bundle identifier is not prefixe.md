# Embedded binary's bundle identifier is not prefixed with the parent app's bundle identifier.

出现此错误通常由于Bundle Identifier未设置正确。

1.如果是直接从网上下载的工程，首先检查工程TARGETS下的Bundle Identifier是否已设置。如果是sdk的demo工程，Bundle Identifier通常是空白，需要手动填写。然后在下面Signing的team中选择开发者账号。同时，在TARGETS下相应地Test工程中也要做相同的设置。

2.xcode + iwatch调试错误
在工程的\*\*  Targets 下面的 三项(工程名为my)：my 、 my Watchkit app 、my Watchkit extention\*\*
General -> identity 下面的 Bundle Identifier**都是有固定写法的，不要随便改**。
例如：
[com.xxx.my](http://com.xxx.my "com.xxx.my")
com.xxx.my.watchkitapp
com.xxx.my.watchkitapp.watchkitextension
