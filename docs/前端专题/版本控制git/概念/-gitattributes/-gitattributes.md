# .gitattributes

## 目录

- [1..gitattributes的作用](#1gitattributes的作用)
- [2..gitattributes的基本语法](#2gitattributes的基本语法)
  - [常见属性示例](#常见属性示例)
- [3. 常见用途示例](#3-常见用途示例)
  - [(1) 控制换行符（Line Endings）](#1-控制换行符Line-Endings)
    - [示例 1：自动处理换行符（推荐）](#示例-1自动处理换行符推荐)
    - [示例 2：强制 Linux 风格换行符（LF）](#示例-2强制-Linux-风格换行符LF)
  - [(2) Git LFS 管理大文件](#2-Git-LFS-管理大文件)
    - [示例 1：让所有.psd文件由 Git LFS 管理](#示例-1让所有psd文件由-Git-LFS-管理)
    - [示例 2：管理多种大文件类型](#示例-2管理多种大文件类型)
  - [(3) 自定义合并策略](#3-自定义合并策略)
    - [示例 1：让 CSV 文件使用union合并策略](#示例-1让-CSV-文件使用union合并策略)
    - [示例 2：禁止合并某些文件](#示例-2禁止合并某些文件)
  - [(4) 忽略文件权限变更](#4-忽略文件权限变更)
    - [示例：禁止 Git 跟踪权限变更](#示例禁止-Git-跟踪权限变更)
  - [(5) 自定义差异比较方式](#5-自定义差异比较方式)
    - [示例 1：让 PDF 文件使用自定义差异工具](#示例-1让-PDF-文件使用自定义差异工具)
    - [示例 2：禁止显示某些文件的差异](#示例-2禁止显示某些文件的差异)
- [4..gitattributes的优先级](#4gitattributes的优先级)
- [5. 如何生效？](#5-如何生效)
- [6. 总结](#6-总结)

`gitattributes`文件是 **Git 的一个配置文件**，用于定义​**​****文件或目录的属性****​**​，从而控制 Git 如何处理这些文件（如**换行符转换、合并策略、差异比较方式、LFS 管理**等）。它通常放在​**​仓库的根目录​**​（也可以放在子目录，但作用范围有限），文件名固定为`.gitattributes`（注意前面的点）。

***

## **1.** \*\*​`.gitattributes`\*\***的作用**

`.gitattributes`主要用于：

1. **控制换行符（Line Endings）**（如`* text=auto`）。
2. **指定合并策略（Merge Strategies）**（如`*.csv merge=union`）。
3. **定义差异比较方式（Diff Drivers）**（如`*.pdf diff=pdf`）。
4. **管理大文件（Git LFS）**（如`*.psd filter=lfs diff=lfs merge=lfs -text`）。
5. **忽略文件权限变更**（如`* -chmod`）。
6. **自定义文件类型行为**（如`*.sh eol=lf`）。

## **2.** \*\*​`.gitattributes`\*\***的基本语法**

`.gitattributes`的每一行是一个**规则**，格式为：

```xml 
<模式> <属性1> <属性2> ...
```


- **`<模式>`**：匹配文件或目录的路径（支持通配符`*`、`**`等）。
- **`<属性>`**：定义 Git 如何处理匹配的文件。

### **常见属性示例**

| 属性         | 作用                                  |
| ---------- | ----------------------------------- |
| \`text\`   | 控制换行符转换（如\`text=auto\`）。            |
| \`eol\`    | 指定行尾符（如\`eol=lf\`或\`eol=crlf\`）。    |
| \`merge\`  | 指定合并策略（如\`merge=union\`）。           |
| \`diff\`   | 指定差异比较方式（如\`diff=pdf\`）。            |
| \`filter\` | 指定文件过滤器（如\`filter=lfs\`用于 Git LFS）。 |
| \`-text\`  | 禁用换行符转换（适用于二进制文件）。                  |
| \`-diff\`  | 禁止 Git 显示该文件的差异。                    |
| \`-merge\` | 禁止 Git 尝试合并该文件。                     |

## **3. 常见用途示例**

### **(1) 控制换行符（Line Endings）**

Git 可以在不同操作系统（Windows/Linux/macOS）之间自动转换换行符（`CRLF`vs`LF`），避免因换行符不同导致的问题。

#### **示例 1：自动处理换行符（推荐）**

```text 
* text=auto
```


- `text=auto`：让 Git 自动检测文件类型，并转换换行符（文本文件用`LF`，二进制文件不转换）。

#### **示例 2：强制 Linux 风格换行符（****`LF`****）**

```markdown 
* text eol=lf
```


### **(2) Git LFS 管理大文件**

Git LFS 用于管理大文件（如二进制文件、数据集、图像等），避免直接存储在 Git 仓库中。

#### **示例 1：让所有**\*\*`.psd`\*\***文件由 Git LFS 管理**

```markdown 
*.psd filter=lfs diff=lfs merge=lfs -text
```


- `filter=lfs`：使用 Git LFS 过滤器。
- `diff=lfs`：让 Git LFS 处理差异比较。
- `merge=lfs`：让 Git LFS 处理合并。
- `-text`：禁止 Git 尝试转换换行符（因为是二进制文件）。

#### **示例 2：管理多种大文件类型**

```markdown 
*.png filter=lfs diff=lfs merge=lfs -text
*.jpg filter=lfs diff=lfs merge=lfs -text
*.mp4 filter=lfs diff=lfs merge=lfs -text
*.zip filter=lfs diff=lfs merge=lfs -text
```


### **(3) 自定义合并策略**

Git 默认对某些文件类型（如文本文件）使用**三向合并**，但对某些特殊文件（如 CSV、JSON）可能需要自定义合并策略。

#### **示例 1：让 CSV 文件使用**\*\*`union`\*\***合并策略**

```sql 
*.csv merge=union
```


- `merge=union`：合并时保留所有更改（而不是报冲突）。

#### **示例 2：禁止合并某些文件**

```bash 
*.lock -merge
```


- `-merge`：禁止 Git 尝试合并该文件（适用于锁文件等）。

***

### **(4) 忽略文件权限变更**

Git 默认会跟踪文件权限（`chmod`）的变化，但某些文件（如二进制文件）的权限变更可能不重要。

#### **示例：禁止 Git 跟踪权限变更**

```bash 
* -chmod
```


- `-chmod`：忽略文件权限变更。

***

### **(5) 自定义差异比较方式**

Git 默认对某些文件（如 PDF、图片）无法显示有意义的差异，可以自定义差异比较方式。

#### **示例 1：让 PDF 文件使用自定义差异工具**

```bash 
*.pdf diff=pdf
```


- 需要额外配置`git config diff.pdf.command`指定差异工具。

#### **示例 2：禁止显示某些文件的差异**

```bash 
*.bin -diff
```


## **-`.gitattributes`****的****优先级**

1. **仓库根目录的**\*\*`.gitattributes`\*\*：适用于整个仓库。
2. **子目录的**\*\*`.gitattributes`\*\*：仅适用于该子目录及其子目录。
3. **全局 Git 配置（****`~/.gitattributes`****）**：适用于所有仓库（但优先级低于仓库内的`.gitattributes`）。

如果同一文件匹配多个规则，**更具体的规则优先**（如子目录的规则优先于根目录的规则）。

## **5. 如何生效？**

1. **修改**\*\*`.gitattributes`\*\***后**，需要运行

```bash 
git add .gitattributes
git commit -m "Update .gitattributes"
```


1. **对于换行符和 LFS**，可能需要重新规范化文件：

- **换行符**：

```bash 
git add --renormalize .
git commit -m "Normalize line endings"
```


- **Git LFS​**​：

```markdown 
git lfs install  # 确保 LFS 已启用
git lfs pull     # 下载 LFS 文件
git add .
git commit -m "Update LFS files"
```


## **6. 总结**

| 用途                 | 示例                                           |
| ------------------ | -------------------------------------------- |
| **换行符控制**​         | \`\* text=auto\`或\`\*.sh text eol=lf\`       |
| **Git LFS 管理大文件**​ | ` *.psd filter=lfs diff=lfs merge=lfs -text` |
| **自定义合并策略**​       | ` *.csv merge=union`                         |
| **忽略权限变更**​        | \`\* -chmod\`                                |
| **禁用差异比较**​        | ` *.bin -diff`                               |

`.gitattributes`是 Git 的高级配置工具，合理使用可以**避免跨平台开发问题、优化大文件管理**、提高团队协作效率！ 🚀
