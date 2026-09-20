# 为什么你的提交包含别人的代码

## 目录

- [问题原因](#问题原因)
- [✅ 正确做法：改用 git pull --rebase](#-正确做法改用git-pull---rebase)
  - [1. 使用 git pull --rebase（推荐）](#1-使用git-pull---rebase推荐)
  - [用了 git pull（merge 方式），如何修复？](#用了git-pullmerge-方式如何修复)
  - [3. 配置 Git 默认使用 --rebase（避免未来问题）](#3-配置-Git-默认使用--rebase避免未来问题)
- [📌 关键区别：git pull vs git pull --rebase](#-关键区别git-pullvsgit-pull---rebase)
- [🚀 最佳实践总结](#-最佳实践总结)
- [🔍 根本原因](#-根本原因)
- [正确解决方法](#正确解决方法)
  - [方法 1：强制推送（推荐）](#方法-1强制推送推荐)
  - [方法 2：先 git pull --rebase 再 git push](#方法-2先git-pull---rebase再git-push)
- [📌 为什么会出现这种情况？](#-为什么会出现这种情况)

你遇到的问题很常见，主要是由于 ​​git pull 默认采用 merge 方式​​，导致你的提交历史混入了别人的代码，使得后续 git diff 或代码对比时出现无关的改动。

## **问题原因**

1. **`git pull = git fetch + git merge`**
   - 当你运行 `git pull master` 时，Git 会：
     1. 拉取远程 `master` 的最新代码（`fetch`）。
     2. **自动合并（merge）** 到你的当前分支，并生成一个 **合并提交（merge commit）**。
   - 这样会导致：
     - 你的提交历史里混入别人的代码。
     - 后续 `git diff` 时会看到别人的改动，影响代码审查。
2. **`git merge`**\*\* 会引入额外的提交\*\*​
   - 如果别人在你 `pull` 之前已经推送了代码，Git 会创建一个 **新的合并提交**，导致你的 `git log` 变得混乱。

## \*\*✅ 正确做法：改用 \*\*​**`git pull --rebase`**

### **1. 使用 ****`git pull --rebase`****（推荐）**

```bash 
git pull origin master --rebase
```


**作用**：

- 拉取远程最新代码，但不会生成额外的 **merge commit**。
- 你的本地提交会 **“变基”**（rebase）到 `master` 的最新提交之后，保持提交历史线性。

**优点**：

- 不会混入别人的代码到你的提交。
- `git diff` 时只会看到你自己的改动，不会出现别人的代码。
- 提交历史更清晰，适合团队协作。

```markdown 

git checkout your-branch       # 切换到你的分支
git pull origin master --rebase  # 变基到最新的 master
git push origin your-branch    # 推送你的分支

```


### **用了 ****`git pull`****（merge 方式），如何修复？**

如果你已经用 `git pull`（不带 `--rebase`）导致提交历史混乱，可以：

```markdown 
git reset --hard HEAD~1   # 撤销 merge commit（谨慎使用！）
git pull origin master --rebase  # 重新用 rebase 拉取
```


或者：

```bash 
git rebase -i master      # 手动整理提交历史
```


### **3. 配置 Git 默认使用 ****`--rebase`****（避免未来问题）**

```bash 
git config --global pull.rebase true  # 全局设置
```


这样以后 `git pull` 默认会用 `--rebase`，避免自动 merge。

***

## \*\*📌 关键区别：****`git pull`**** vs \*\***`git pull --rebase`**

| **操作**​                | **提交历史**​         | **是否混入他人代码**​ | **适用场景**​         |
| ---------------------- | ----------------- | ------------- | ----------------- |
| \`git pull\`（默认 merge） | 有额外的 merge commit | ❌ 会混入         | 不推荐，除非需要保留合并记录    |
| \`git pull --rebase\`  | 线性提交历史            | ✅ 不会混入        | \*\*推荐\*\*，保持干净提交 |

## **🚀 最佳实践总结**

1. **每次提交前**：

```bash 
git pull origin master --rebase
```


**解决冲突**（如果有）：

- Git 会提示冲突，手动解决后：

```bash 
git add .
git rebase --continue
```


​**​推送代码​**​：

```bash 
git push origin your-branch
```


这样你的代码对比（`git diff`）就只会显示你自己的改动，不会混入别人的代码！🎯

你的问题可以总结为：

1. 你执行 `git pull --rebase master`（正确做法）
2. 然后 `git push`，但被拒绝，提示需要先 `git pull`
3. 这时如果你再 `git pull`（不带 `--rebase`），就会引入别人的代码
4. 导致后续 `git diff` 时会看到别人的修改

***

## **🔍 根本原因**

这是因为在你 `rebase` 之后，你的本地分支历史已经和远程分支**不同**了（因为 rebase 重写了提交历史）。当你尝试 `git push` 时，Git 会拒绝，因为你的本地分支和远程分支**不是"快进"（fast-forward）关系**。

## **正确解决方法**

### **方法 1：强制推送（推荐）**

```bash 
git push origin your-branch --force-with-lease
```


**为什么？**

- `--force-with-lease` 会强制用你的本地分支**覆盖远程分支**
- 但比 `--force` 更安全 **，它会检查远程分支是否有你未知的新提交**

**适用场景**：

- 你确定远程分支的代码不如你的新
- 你刚刚完成了 `rebase`，需要更新远程分支

### \*\*方法 2：先 ****`git pull --rebase`**** 再 \*\***`git push`**

如果不想强制推送：

```bash 
git pull origin your-branch --rebase  # 再次变基
git push origin your-branch
```


## **📌 为什么会出现这种情况？**

| 步骤                                   | 发生了什么                          |
| ------------------------------------ | ------------------------------ |
| 1\\. 你 \`git pull --rebase master\`  | 你的本地提交被重新应用到 \`master\` 最新代码之后 |
| 2\\. 你 \`git push\`                  | 被拒绝，因为远程分支包含你没有的提交             |
| 3\\. 你 \`git pull\`（不带 \`--rebase\`） | Git 执行 merge，引入别人的代码           |
| 4\\. 你 \`git push\`                  | 成功，但提交历史变混乱                    |

```markdown 
# 1. 确保你在正确的分支
git checkout your-branch

# 2. 从 master 获取最新代码（使用 rebase）
git pull origin master --rebase

# 3. 如果有冲突，解决后：
git add .
git rebase --continue

# 4. 推送到远程（可能需要强制推送）
git push origin your-branch --force-with-lease
```
