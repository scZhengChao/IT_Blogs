# IT Blogs

基于 Rspress 构建的 IT 技术文档站点。

- 在线地址：https://sczhengchao.github.io/IT_Blogs/
- 文档源码：`docs/`
- 本地构建产物：`doc_build/`
- 自动部署配置：`.github/workflows/deploy-pages.yml`

## 环境准备

项目使用 Node.js `22.22.2`：

```bash
npm ci
```

## 新增或编辑文档

在 `docs/` 中新增或修改 Markdown 文件。

新增目录时必须提供 `index.md`，例如：

```text
docs/
└── 前端基础/
    └── 新主题/
        ├── index.md
        └── assets/
            └── image/
                └── example.webp
```

文档中的本地链接使用相对路径：

```md
[相关文档](./相关文档/index.md)

![示例图片](./assets/image/example.webp)
```

## 图片和附件

图片必须放在对应文章附近的 `assets/` 目录。PDF、压缩包、代码示例等下载附件统一托管在 GitHub Releases。

推荐直接使用 WebP 图片。如果加入了 PNG，可以执行：

```bash
npm run optimize:images
```

该命令会：

- 将 `docs/` 中的 PNG 转换为 WebP。
- 更新 Markdown 中对应的本地图片引用。
- 删除转换成功的 PNG。

### 将下载附件迁移到 GitHub Releases

Release 使用 `assets-v1` 标签。批量上传时，可以将附件临时汇总到项目根目录的
`release-assets/assets-v1/`，该目录已被 Git 忽略。

在 Release 编辑页面上传附件并更新 Release 后，先检查远端附件与本地内容：

```bash
npm run migrate:attachments
```

确认数量、摘要和引用均匹配后执行：

```bash
npm run migrate:attachments -- --apply
```

脚本按照 SHA-256 匹配 GitHub 自动改名后的附件，更新 Markdown 下载链接，并删除
已经迁移的本地附件。上传完成前不要删除 `docs/` 中的源文件。

不要在文件或目录名中使用 `!`、`'`、`?`、`#` 等特殊字符。

## 本地检查

检查目录入口、站内链接和附件引用：

```bash
npm run check:docs
```

启动本地开发服务器：

```bash
npm run dev
```

执行完整生产构建：

```bash
npm run build
```

`npm run build` 会通过 `prebuild` 自动执行一次 `npm run check:docs`。

构建完成后可以预览生产版本：

```bash
npm run preview
```

## 发布更新

完成修改和检查后提交到 `main`：

```bash
git add .
git commit -m "docs: update articles"
git push origin main
```

推送后，GitHub Actions 会自动：

1. 安装依赖。
2. 运行文档检查。
3. 使用 Rspress 生成 `doc_build/`。
4. 上传 Pages artifact。
5. 更新 GitHub Pages 网站。

可以在仓库的 **Actions** 页面查看进度。通常等待数分钟后，更新会发布到：

https://sczhengchao.github.io/IT_Blogs/

## 关于 `doc_build/`

线上站点使用的是 GitHub Actions 在云端生成的 `doc_build/`，不是本地目录。

本地 `doc_build/`：

- 仅用于构建检查和预览。
- 已加入 `.gitignore`。
- 不需要执行 `git add` 或上传到 GitHub。

## 内容约束

- 每个内容目录必须包含 `index.md`。
- 附件必须位于对应文章附近的 `assets/` 子目录。
- 目录层级最多保持在 7 层。
- 目录和文件名应简洁，避免特殊字符。
- 移动或重命名文档时，需要同步更新相关链接。
- 提交前至少运行一次 `npm run check:docs`。

更完整的维护记录请查看 [CONTENT_MAINTENANCE.md](./CONTENT_MAINTENANCE.md)。
