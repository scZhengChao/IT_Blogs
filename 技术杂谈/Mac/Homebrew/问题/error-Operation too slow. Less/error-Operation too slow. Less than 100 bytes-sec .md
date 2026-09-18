# error:Operation too slow. Less than 100 bytes/sec transferred the last 5 seconds

## 目录

- [2. 查看镜像源](#2-查看镜像源)
- [3. 修改为中科大的镜像源](#3-修改为中科大的镜像源)
- [4. 恢复镜像源](#4-恢复镜像源)

是由于镜像源的不稳定，所以修改镜像源

### 2. 查看镜像源

```bash 
# 查看brew镜像源
git -C "$(brew --repo)" remote -v

# 查看homebrew-core镜像源
git -C "$(brew --repo homebrew/core)" remote -v

# 查看homebrew-cask镜像源（需要安装后才能查看）
git -C "$(brew --repo homebrew/cask)" remote -v 

```


### 3. 修改为中科大的镜像源

```bash 
# 修改brew镜像源
git -C "$(brew --repo)" remote set-url origin https://mirrors.ustc.edu.cn/brew.git

# 修改homebrew-core镜像源
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git

# 修改homebrew-cask镜像源（需要安装后才能修改）
git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git

# 更新
brew update

```


### 4. 恢复镜像源

```bash 
# 恢复brew镜像源
git -C "$(brew --repo)" remote set-url origin https://github.com/Homebrew/brew.git


# 恢复homebrew-core镜像源
git -C "$(brew --repo homebrew/core)" remote set-url origin https://github.com/Homebrew/homebrew-core.git

# 恢复homebrew-cask镜像源（需要安装后才能修改）
git -C "$(brew --repo homebrew/cask)" remote set-url origin https://github.com/Homebrew/homebrew-cask.git

brew update

```
