# switch

## 目录

- [补充说明：](#补充说明)

**创建并切换到一个新的分支**

```bash 
git switch -c feature/login
```


### 补充说明：

- 如果不加`-c`参数，`git switch`仅用于切换到已存在的分支（类似`git checkout <分支名>`）。
- `git switch`和`git checkout`的分工更清晰：
  - `git switch`：**专注于分支切换（包括创建新分支）。**
  - `git checkout`：**专注于文件操作（如恢复文件、切换到某个提交等）。**
