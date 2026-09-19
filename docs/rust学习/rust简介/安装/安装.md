# 安装

## 目录

- [安装](#安装)
  - [homebrew](#homebrew)
    - [安装路径](#安装路径)
  - [官网安装](#官网安装)

# 安装

mac 环境安装rust

## homebrew

通过homebrew 安装；比官网安装快

[   https://www.5axxw.com/questions/simple/v3rdhe](https://www.5axxw.com/questions/simple/v3rdhe "   https://www.5axxw.com/questions/simple/v3rdhe")

```javascript 
brew install rustup
rustup-init


echo 'export PATH="$HOME/.cargo/bin:$PATH"' >> ~/.bash_profile
source ~/.bash_profile

rustc --version

//可以安装rust-analyzer这个插件，该插件是一款非常强大的Rust代码编辑辅助工具：
brew install rust-analyzer


```


#### 安装路径

```javascript 
brew list rustup

/opt/homebrew/Cellar/rustup-init/1.25.1/.crates.toml
/opt/homebrew/Cellar/rustup-init/1.25.1/.crates2.json
/opt/homebrew/Cellar/rustup-init/1.25.1/bin/rustup-init

```


## 官网安装

[ Install Rust A language empowering everyone to build reliable and efficient software. https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install " Install Rust A language empowering everyone to build reliable and efficient software. https://www.rust-lang.org/tools/install")
