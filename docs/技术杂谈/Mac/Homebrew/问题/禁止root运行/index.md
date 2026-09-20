# Running Homebrew as root is extremely dangerous and no longer supported. As Homebrew does not drop privileges on installation you would be giving all build scripts full access to your system.

## 目录

- [sudo](#sudo)
- [No remote ‘origin‘](#No-remote-origin)

## sudo

报错信息如下：
Running Homebrew as root is extremely dangerous and no longer supported. As Homebrew does not drop privileges on installation you would be giving all build scripts full access to your system.

翻译下就是：以根用户身份运行自制程序非常危险，不再受支持。
由于Homebrew不会放弃安装权限，因此您将授予所有生成脚本对系统的完全访问权限。

实际意思就是叫你不要用管理员身份运行，把sudo去掉即可

## No remote ‘origin‘

[ Homebrew：Mac os 使用brew工具时报错No remote ‘origin‘\_FullStack贾凯的博客-CSDN博客 Homebrew：Mac os 使用brew工具时报错No remote ‘origin’使用 brew update 时报错：brew updateWarning: No remote 'origin' in /opt/homebrew/Library/Taps/homebrew/homebrew-cask, skipping update!Warning: No remote 'origin' https://blog.csdn.net/Jo\_Francis/article/details/124746363](https://blog.csdn.net/Jo_Francis/article/details/124746363 " Homebrew：Mac os 使用brew工具时报错No remote ‘origin‘_FullStack贾凯的博客-CSDN博客 Homebrew：Mac os 使用brew工具时报错No remote ‘origin’使用 brew update 时报错：brew updateWarning: No remote 'origin' in /opt/homebrew/Library/Taps/homebrew/homebrew-cask, skipping update!Warning: No remote 'origin' https://blog.csdn.net/Jo_Francis/article/details/124746363")
