# git hooks

## 目录

- [husky](#husky)
- [lint-staged是什么？](#lint-staged是什么)

&#x20;

[  https://www.jianshu.com/p/de90ffbd53e9](https://www.jianshu.com/p/de90ffbd53e9 "  https://www.jianshu.com/p/de90ffbd53e9")

- git hooks是一些自定义的脚本，用于控制git工作的流程，分为**客户端钩子和服务端钩子**。
- 客户端钩子包括：`pre-commit`、`prepare-commit-msg`、`commit-msg`、`post-commit`等，主要用于控制客户端git的提交工作流。服务端钩子：`pre-receive`、`post-receive`、`update`，主要在服务端接收提交对象时、推送到服务器之前调用。
- git hooks位置位于每个git项目下的隐藏文件**夹.git中的hooks文件夹里**，进去后会看到一些hooks的官方示例，他们都是以.sample结尾的文件名。**注意这些以.sample结尾的示例脚本是不会执行的**，只有重命名后才会生效
- 具体内容可以参考[git的文档](https://git-scm.com/book/zh/v1/自定义-Git-Git挂钩 "git的文档")

### husky

[   https://www.npmjs.com/package/husky](https://www.npmjs.com/package/husky "   https://www.npmjs.com/package/husky")

- **husky**是一个为 git 客户端增加 hook 的工具，githooks - git使用的工具 (githook在官网的介绍)，比如 `pre-commit` 钩子就会在你执行 `git commit` 的触发。
- 由于钩子可以在`git commit`中触发，所以我们可以在提交到暂缓区时，做一些**lint 检查、单元测试、代码美化**等操作。

### lint-staged是什么？

- 一个仅仅过滤出 Git 代码暂存区文件(被 git add 的文件)的工具
- 对个人要提交的代码的一个规范和约束
- 是一个在 git 暂存文件上（也就是被 `git add` 的文件）运行已配置的 linter（或其他）任务。`lint-staged` 总是将所有暂存文件的列表传递给任务。

[yorkie](yorkie.md "yorkie")

[husky](IT/前端专题/版本控制git/进阶命令/git%20hooks/husky/husky.md "husky")
