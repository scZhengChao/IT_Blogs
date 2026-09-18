# git diff&#x20;

## 目录

- [git diff](#git-diff)
  - [查看代码变动](#查看代码变动)
- [git diff --cached --name-only --diff-filter=ACM](#git-diff---cached---name-only---diff-filterACM)
  - [命令概述](#命令概述)
  - [命令参数解释](#命令参数解释)
  - [示例](#示例)
  - [用途](#用途)

# git diff

## 查看代码变动

- git diff HEAD ^
- HEAD\~100

# git diff --cached --name-only --diff-filter=ACM

### 命令概述

这个命令主要用于**显示在暂存区（staging area）** 中已被添加（`A`- Added）、复制（`C`- Copied）或修改（`M`- Modified）的文件的文件名。

### 命令参数解释

- **`--cached`**：此参数的作用是**仅比较暂存区（staging area）和上次提交（HEAD）之间的差异**。暂存区是 Git 中一个临时存储区域，用于存放即将提交的文件更改。当你使用`git add`**命令将文件添加到暂存区后**，这些更改就会被标记为准备提交。`--cached`确保`git diff`**只关注暂存区中的更改**，而**忽略工作目录（working directory）中未暂存的更改**。
- **`--name-only`**：使用这个参数，`git diff`命令**将仅显示发生更改的文件的名称**，而**不会显示具体的文件内容差异**。这在你**只关心哪些文件被更改而不需要查看具体更改细节时非常有用。**
- **`--diff-filter=ACM`**：该参数用于过滤`git diff`的输出结果，**只显示符合特定更改类型的文件**。其中，`ACM`是一个过滤器组合，每个字母代表一种更改类型：
  - **`A`**：表示新增（Added）的文件，即这些文件是新添加到暂存区的，在上一次提交中并不存在。
  - **`C`**：代表复制（Copied）的文件，意味着文件是从其他位置复制过来并添加到暂存区的。
  - **`M`**：表示修改（Modified）的文件，即这些文件在上一次提交后被修改，并且修改已经被添加到暂存区。

### 示例

假设你在一个 Git 仓库中有以下操作：

1. 创建一个新文件`newfile.txt`并添加到暂存区

```bash 
touch newfile.txt
git add newfile.txt
```


1. 修改一个已存在的文件`existingfile.txt`并添加到暂存区：

```bash 
echo "Some changes" >> existingfile.txt
git add existingfile.txt
```


1. 运行`git diff --cached --name-only --diff-filter=ACM`命令，输出可能如下：

```text 
newfile.txt
existingfile.txt
```


### 用途

这个命令在以下场景中非常有用：

- **提交前检查**：在提交更改之前，你可以**使用该命令快速查看哪些文件被添加、复制或修改，** 以确保只提交你想要的更改。
- **自动化脚本**：在编写自动化脚本时，你可能**需要获取暂存区中特定类型更改的文件列表，以便进行进一步的处理，如代码检查、构建等。**

总之，`git diff --cached --name-only --diff-filter=ACM`是一个强大的命令，能够帮助你高效管理 Git 仓库中的更改。
