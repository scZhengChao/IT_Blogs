# Gem

## 目录

- [Gem](#Gem)
  - [.gemspec](#gemspec)
- [什么是 RubyGems](#什么是-RubyGems)
  - [Gem 包的安装和卸载](#Gem-包的安装和卸载)
  - [GEM\_HOME & GEM\_PATH](#GEM_HOME--GEM_PATH)
- [环境变量](#环境变量)
  - [GEM 源](#GEM-源)

### Gem

*Gem* 是 *Ruby* 中的包，其中包含包信息，以及用于安装的文件。*Gem* 通常是依照 `.gemspec` 文件构建的，其为 *YAML* 文件。然而，*Ruby* 代码也可以直接创建 *Gem*，这种情况下通常利用`Rake` 来进行。

#### .gemspec

`.gemspec` 文件其中包含 *Gem* 有关的信息，例如版本号、作者、联系邮件以及依赖等，例如 `cocoapods.gemspec` 文件如下：

```bash 
# encoding: UTF-8
require File.expand_path('../lib/cocoapods/gem_version', __FILE__)
require 'date'

Gem::Specification.new do |s|
  s.name     = "cocoapods"
  s.version  = Pod::VERSION
  s.date     = Date.today
  s.license  = "MIT"
  s.email    = ["eloy.de.enige@gmail.com", "fabiopelosin@gmail.com", "kyle@fuller.li", "segiddins@segiddins.me"]
  s.homepage = "https://github.com/CocoaPods/CocoaPods"
  s.authors  = ["Eloy Duran", "Fabio Pelosin", "Kyle Fuller", "Samuel Giddins"]

  s.summary     = "The Cocoa library package manager."
  s.description = "CocoaPods manages library dependencies for your Xcode project.\n\n"     \
                  "You specify the dependencies for your project in one easy text file. "  \
                  "CocoaPods resolves dependencies between libraries, fetches source "     \
                  "code for the dependencies, and creates and maintains an Xcode "         \
                  "workspace to build your project.\n\n"                                   \
                  "Ultimately, the goal is to improve discoverability of, and engagement " \
                  "in, third party open-source libraries, by creating a more centralized " \
                  "ecosystem."

  s.files = Dir["lib/**/*.rb"] + %w{ bin/pod bin/sandbox-pod README.md LICENSE CHANGELOG.md }

  s.executables   = %w{ pod sandbox-pod }
  s.require_paths = %w{ lib }

  # Link with the version of CocoaPods-Core
  s.add_runtime_dependency 'cocoapods-core',        "= #{Pod::VERSION}"

  s.add_runtime_dependency 'claide',                '>= 1.0.2', '< 2.0'
  s.add_runtime_dependency 'cocoapods-deintegrate', '>= 1.0.3', '< 2.0'
  s.add_runtime_dependency 'cocoapods-downloader',  '>= 1.6.0', '< 2.0'
  s.add_runtime_dependency 'cocoapods-plugins',     '>= 1.0.0', '< 2.0'
  s.add_runtime_dependency 'cocoapods-search',      '>= 1.0.0', '< 2.0'
  s.add_runtime_dependency 'cocoapods-trunk',       '>= 1.6.0', '< 2.0'
  s.add_runtime_dependency 'cocoapods-try',         '>= 1.1.0', '< 2.0'
  s.add_runtime_dependency 'molinillo',             '~> 0.8.0'
  s.add_runtime_dependency 'xcodeproj',             '>= 1.21.0', '< 2.0'

  s.add_runtime_dependency 'colored2',       '~> 3.1'
  s.add_runtime_dependency 'escape',        '~> 0.0.4'
  s.add_runtime_dependency 'fourflusher',   '>= 2.3.0', '< 3.0'
  s.add_runtime_dependency 'gh_inspector',  '~> 1.0'
  s.add_runtime_dependency 'nap',           '~> 1.0'
  s.add_runtime_dependency 'ruby-macho',    '>= 2.3.0', '< 3.0'

  s.add_runtime_dependency 'addressable', '~> 2.8'

  s.add_development_dependency 'bacon', '~> 1.1'
  s.add_development_dependency 'bundler', '~> 2.0'
  s.add_development_dependency 'rake', '~> 12.3'

  s.required_ruby_version = '>= 2.6'
```


### 什么是 RubyGems

[RubyGems](https://links.jianshu.com/go?to=https://rubygems.org/ "RubyGems") 是 Ruby 的一个包管理器源，提供了分发 *Ruby* 程序和库的标准格式 *gem*，旨在方便地管理 *gem* 安装的工具，以及用于分发 *gem* 的[服务器源](https://links.jianshu.com/go?to=https://rubygems.org/ "服务器源")。这类似于 *Python* 的 *pip*。

#### Gem 包的安装和卸载

[gem 命令文档](https://links.jianshu.com/go?to=https://guides.rubygems.org/command-reference/ "gem 命令文档")

- 使用系统 *Ruby* 环境，一般需要管理员权限，会默认安装到 `/Library/Ruby/Gems/x.x.x`

```bash 
sudo gem install  xxx

```


- 使用 *rvm ruby* 环境，默认会安装在 `~/.rvm/gems/ruby-2.6.8` 下

```bash 
gem install xxx
gem install --verbose sqlite3  --verbose即可查看到输出信息 ，可以作为一个进度 
gem which colorls 查看包的位置

```


- 使用 `--user-install` ，默认会安装在 `~/.gem/ruby` 下，需要提前配置环境变量

```bash 
PATH="`ruby -e 'puts Gem.user_dir'`/bin:$PATH"
gem install xxx --user-install

```


- 查看已经安装的依赖包

```bash 
gem list

sudo gem list cocoapods

```


- 卸载依赖包

```bash 
 gem uninstall xxx

```


#### GEM\_HOME & GEM\_PATH

一般地，可以通过 `gem env` 查看 `gem` 的位置 `GEM_HOME` 和其执行路径 `GEM_PATH`，除了上述外可以通过覆写 `GEM_HOME` & `GEM_PATH` 从而不需要管理员权限(sudo)。

```bash 
export GEM_HOME=$HOME/.gem
export PATH=$GEM_HOME/bin:$PATH

```


# 环境变量

```bash 
 echo $GEM_PATH
 
 // 如果使用的是 Homebrew 安装的 Ruby，通常 gem 安装在 /opt/homebrew/lib/ruby/gems/<ruby_version> 目录下；
 export GEM_PATH="$GEM_PATH:/opt/homebrew/lib/ruby/gems/3.4.0"
```


#### GEM 源

*gem* 命令行的默认源是 *RubyGems*，也就是 [https://rubygems.org/](https://links.jianshu.com/go?to=https://rubygems.org/ "https://rubygems.org/")，以下是对源的操作

```bash 
#查看源
gem source -l 
#镜像源
gem source -a https://gems.ruby-china.com/  

#移除源
gem source --remove https://rubygems.org/

更新安装源
gem sources -u



```


[bundle](bundle.md "bundle")
