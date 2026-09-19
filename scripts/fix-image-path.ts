import fs from 'node:fs';
import path from 'node:path';

export function fixImagePath() {
  return function transformer(tree: any, file: any) {
    const filePath = file.history?.[0];

    if (!filePath) {
      return;
    }

    const mdDir = path.dirname(filePath);

    function visit(node: any) {
      if (!node) {
        return;
      }

      if (
        node.type === 'image' &&
        typeof node.url === 'string'
      ) {
        const originalUrl = node.url;

        // 外部图片不处理
        if (
          originalUrl.startsWith('http://') ||
          originalUrl.startsWith('https://') ||
          originalUrl.startsWith('//') ||
          originalUrl.startsWith('data:') ||
          originalUrl.startsWith('/')
        ) {
          return;
        }

        const match = originalUrl.match(
          /^([^?#]*)([?#].*)?$/,
        );

        if (!match) {
          return;
        }

        const imagePathPart = match[1];
        const suffix = match[2] || '';

        // 已经是相对路径
        if (
          imagePathPart.startsWith('./') ||
          imagePathPart.startsWith('../')
        ) {
          const absolutePath = path.resolve(
            mdDir,
            imagePathPart,
          );

          if (fs.existsSync(absolutePath)) {
            return;
          }

          // 相对路径，但是文件不存在
          node.type = 'text';
          node.value =
            `[图片不存在：${originalUrl}]`;
          delete node.url;
          delete node.alt;
          delete node.title;

          return;
        }

        /*
         * 先检查 Markdown 中写的原始路径
         *
         * assets/a.png
         * image/a.png
         * images/a.png
         */
        const directPath = path.resolve(
          mdDir,
          imagePathPart,
        );

        if (fs.existsSync(directPath)) {
          node.url =
            `./${imagePathPart}${suffix}`;

          return;
        }

        /*
         * 再尝试：
         *
         * image/a.png
         * images/a.png
         * assets/a.png
         */
        const directories = [
          'image',
          'images',
          'assets',
        ];

        for (const directory of directories) {
          const candidatePath = path.resolve(
            mdDir,
            directory,
            imagePathPart,
          );

          if (!fs.existsSync(candidatePath)) {
            continue;
          }

          node.url =
            `./${directory}/${imagePathPart}${suffix}`;

          return;
        }

        /*
         * 到这里说明：
         *
         * Markdown 引用了图片
         * 但是本地根本不存在
         *
         * 不让 MDX 生成 import。
         */
        console.warn(
          `[fix-image-path] 图片不存在：${path.relative(
            process.cwd(),
            filePath,
          )} -> ${originalUrl}`,
        );

        node.type = 'text';
        node.value =
          `[图片不存在：${originalUrl}]`;

        delete node.url;
        delete node.alt;
        delete node.title;
      }

      if (Array.isArray(node.children)) {
        for (const child of node.children) {
          visit(child);
        }
      }
    }

    visit(tree);
  };
}