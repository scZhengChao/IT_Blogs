# cocoapods安装

## 目录

- [Invalid Podfile file: \[!\] Unable to locate the executable node](#Invalid-Podfile-file--Unable-to-locate-the-executable-node)

[ CocoaPods安装方法（全程免翻墙）\_安装cocoapods能不用 homebrew吗-CSDN博客 文章浏览阅读1.3k次。CocoaPods安装方法 2021-1-4（全程免翻墙）这篇文章是转载的（转载自：https://www.jianshu.com/p/5d58a42a72d6），项目原因，接手到一个ios的项目，使用cocoapods管理的第三方库，但是我的新电脑上没有cocoapods环境，安装时碰到挺多问题的，这篇文章给我很大的帮助，以此记录一下。在安装cocoapods上经历过不少 https://blog.csdn.net/sucuijiao/article/details/114263709](https://blog.csdn.net/sucuijiao/article/details/114263709 " CocoaPods安装方法（全程免翻墙）_安装cocoapods能不用 homebrew吗-CSDN博客 文章浏览阅读1.3k次。CocoaPods安装方法 2021-1-4（全程免翻墙）这篇文章是转载的（转载自：https://www.jianshu.com/p/5d58a42a72d6），项目原因，接手到一个ios的项目，使用cocoapods管理的第三方库，但是我的新电脑上没有cocoapods环境，安装时碰到挺多问题的，这篇文章给我很大的帮助，以此记录一下。在安装cocoapods上经历过不少 https://blog.csdn.net/sucuijiao/article/details/114263709")

过程中遇到问题；按照提示来；

#### Invalid `Podfile` file: \[!] Unable to locate the executable `node`

pod 报错；由于 ruby 和 cocoapods 版本过低；取消brew 安装（1.5.2）；gem安装实际到1.10.1（gem ruby的一个包）

```javascript 
brew remove cocoapods && sudo gem install cocoapods


```


[ Invalid \`Podfile\` file: \[!\] Unable to locate the executable \`node\` · Issue #10227 · CocoaPods/CocoaPods · GitHub Hey i am getting pod install error Error : \[!\] Invalid \`Podfile\` file: \[!\] Unable to locate the executable \`node\`. # target 'appname' do > config = use\_native\_modules! My pod file : require\_relative ' https://github.com/CocoaPods/CocoaPods/issues/10227](https://github.com/CocoaPods/CocoaPods/issues/10227 " Invalid `Podfile` file: \[!] Unable to locate the executable `node` · Issue #10227 · CocoaPods/CocoaPods · GitHub Hey i am getting pod install error Error : \[!] Invalid `Podfile` file: \[!] Unable to locate the executable `node`. # target 'appname' do > config = use_native_modules! My pod file : require_relative ' https://github.com/CocoaPods/CocoaPods/issues/10227")
