# rvm

## 目录

- [RVM](#RVM)
  - [RVM 安装方式](#RVM-安装方式)
  - [RVM 的使用](#RVM-的使用)
- [设置ruby3.0.0为默认版本。注意这并不会覆盖系统中的ruby版本](#设置ruby300为默认版本注意这并不会覆盖系统中的ruby版本)
- [安装 cocoapods](#安装-cocoapods)
  - [查看pod版本](#查看pod版本)

[ RVM 实用指南 · Ruby China  https://ruby-china.org/wiki/rvm-guide](https://ruby-china.org/wiki/rvm-guide " RVM 实用指南 · Ruby China  https://ruby-china.org/wiki/rvm-guide")

### RVM

有些时候系统默认的 *Ruby* 版本满足不了我们的需求，就会使用到 *RVM*。[RVM](https://links.jianshu.com/go?to=http://rvm.io/ "RVM")，全名 *Ruby Version Manager*，是一个命令行工具，可安装、管理和使用多个 *Ruby* 环境。

#### RVM 安装方式

rvm 有两种安装方式

- 官网脚本**安装(翻墙)**

```bash 
curl -sSL https://get.rvm.io | bash -s
```


&#x20;     `rvm` 会安装到当前用户目录下也就是 `~/`，路径为 `~/.rvm`，安装后需要运行 `source ~/.rvm/scripts/rvm`

- 离线安装

1. 克隆仓库

```bash 
git clone https://github.com/rvm/rvm.git

```


1. 运行 rvm/bin/ 路径下的 rvm-installer
2. 配置环境变量

```bash 
export PATH="$HOME/.rvm/bin:$PATH"

```


#### RVM 的使用

- 安装指定版本的 *Ruby* （需要先安装 Homebrew）

```javascript 
rvm use 2.7 --default   // 指定 Ruby 的默认版本
rvm implode.  // RVM 的移除
rvm install 2.7.  // #安装后路径为 ~/.rvm/rubies/ruby-x.x.x
rvm list  显示当前系统中通过 RVM 安装的所有 Ruby 版本
rvm list known  查看所有可供安装的 Ruby 版本
rvm remove 3.2.2  卸载 Ruby 版本
rvm reload  重新载入 rvm

```


### 设置ruby3.0.0为默认版本。注意这并不会覆盖系统中的ruby版本

`rvm use 3.0.0 --default`

# 安装 cocoapods

`sudo gem install -n /usr/local/bin cocoapods`

## 查看pod版本

`pod --version`

> rvm：是一个命令行工具，可以提供一个便捷的多版本ruby环境的管理和切换；ruby版本管理以及安装工具.

安装rvm：

`curl -l get.rvm.io | bash -s stable`.  翻墙&#x20;

`source ~/.bashrc`

`source ~/.bash_profile`

新版系统默认shell都是zsh&#x20;

`source ~/.zshrc`&#x20;

`source ~/.profile`

`更新ruby版本：rvm install 3.0.3(版本号)`
