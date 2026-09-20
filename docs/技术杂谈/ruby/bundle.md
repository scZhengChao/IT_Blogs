# bundle

## 目录

- [Bundler](#Bundler)
  - [安装](#安装)
  - [使用](#使用)
  - [执行](#执行)
  - [environment](#environment)

> 累比：npm

### Bundler

Bundler 能够跟踪并安装所需的特定版本的 gem，以此来为 Ruby 项目提供一致的运行环境。定义一个 `Gemfile`，说明想要包含哪些库，并且可以选择指定版本或范围。 运行`bundle install`，它会生成一个 `Gemfile.lock`，说明所有库的确切版本，然后`bundle install`使用该项目运行的任何其他人都会获得完全相同的版本。

#### 安装

```bash 
gem install bundler

```


#### 使用

在项目根目录下新建 `Gemfile` 文件并指定所需的依赖：

```bash 
source 'https://gems.ruby-china.com/'
gem 'fastlane'

```


配置后使用 `bundle install` 安装

`bundle update `  更新

#### 执行

```bash 
bundle exec pod [command]

```


#### environment

您将能够看到已安装的gem的列表。现在使用bundle show并命名您想知道其路径的gem，如下所示：

```bash 
bundle show <gemName>
或者
bundle info <gemName>
```


用于[gem environment](http://guides.rubygems.org/command-reference/#gem_environment "gem environment")了解您的`gem`环境：

```bash 
RubyGems Environment:
  - RUBYGEMS VERSION: 2.1.5
  - RUBY VERSION: 2.0.0 (2013-06-27 patchlevel 247) [x86_64-darwin12.4.0]
  - INSTALLATION DIRECTORY: /Users/ttm/.rbenv/versions/2.0.0-p247/lib/ruby/gems/2.0.0
  - RUBY EXECUTABLE: /Users/ttm/.rbenv/versions/2.0.0-p247/bin/ruby
  - EXECUTABLE DIRECTORY: /Users/ttm/.rbenv/versions/2.0.0-p247/bin
  - SPEC CACHE DIRECTORY: /Users/ttm/.gem/specs
  - RUBYGEMS PLATFORMS:
    - ruby
    - x86_64-darwin-12
  - GEM PATHS:
     - /Users/ttm/.rbenv/versions/2.0.0-p247/lib/ruby/gems/2.0.0
     - /Users/ttm/.gem/ruby/2.0.0
  - GEM CONFIGURATION:
     - :update_sources => true
     - :verbose => true
     - :backtrace => false
     - :bulk_threshold => 1000
  - REMOTE SOURCES:
     - https://rubygems.org/
  - SHELL PATH:
     - /Users/ttm/.rbenv/versions/2.0.0-p247/bin
     - /Users/ttm/.rbenv/libexec
     - /Users/ttm/.rbenv/plugins/ruby-build/bin
     - /Users/ttm/perl5/perlbrew/bin
     - /Users/ttm/perl5/perlbrew/perls/perl-5.18.1/bin
     - /Users/ttm/.pyenv/shims
     - /Users/ttm/.pyenv/bin
     - /Users/ttm/.rbenv/shims
     - /Users/ttm/.rbenv/bin
     - /Users/ttm/bin
     - /usr/local/mysql-5.6.12-osx10.7-x86_64/bin
     - /Users/ttm/libsmi/bin
     - /usr/local/bin
     - /usr/bin
     - /bin
     - /usr/sbin
     - /sbin
     - /usr/local/bin
```


请注意以下两个部分：

- `INSTALLATION DIRECTORY`
- `GEM PATHS`
