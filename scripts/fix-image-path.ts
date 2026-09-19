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

      // 处理 Markdown 图片
      if (node.type === 'image' && typeof node.url === 'string') {
        const originalUrl = node.url;

        // 不处理外部图片 / data URI / 根路径图片
        if (
          originalUrl.startsWith('http://') ||
          originalUrl.startsWith('https://') ||
          originalUrl.startsWith('//') ||
          originalUrl.startsWith('data:') ||
          originalUrl.startsWith('/')
        ) {
          return;
        }

        /*
         * 分离：
         *
         * image.png
         * image.png?xxx
         * image.png#xxx
         */
        const match = originalUrl.match(/^([^?#]*)([?#].*)?$/);

        if (!match) {
          return;
        }

        const imageName = match[1];
        const suffix = match[2] || '';

        // ① 先检查 Markdown 当前目录
        const directPath = path.resolve(
          mdDir,
          imageName,
        );

        if (fs.existsSync(directPath)) {
          return;
        }

        // ② 检查 ./image/
        const imagePath = path.resolve(
          mdDir,
          'image',
          imageName,
        );

        if (fs.existsSync(imagePath)) {
          const newUrl = `./image/${imageName}${suffix}`;

          node.url = newUrl;

          console.log(
            `[fix-image-path] ${path.relative(process.cwd(), filePath)}\n` +
            `  ${originalUrl} -> ${newUrl}`,
          );

          return;
        }

        // ③ 检查 ./images/
        const imagesPath = path.resolve(
          mdDir,
          'images',
          imageName,
        );

        if (fs.existsSync(imagesPath)) {
          const newUrl = `./images/${imageName}${suffix}`;

          node.url = newUrl;

          console.log(
            `[fix-image-path] ${path.relative(process.cwd(), filePath)}\n` +
            `  ${originalUrl} -> ${newUrl}`,
          );

          return;
        }

        // ④ 检查 ./assets/
        const assetsPath = path.resolve(
          mdDir,
          'assets',
          imageName,
        );

        if (fs.existsSync(assetsPath)) {
          const newUrl = `./assets/${imageName}${suffix}`;

          node.url = newUrl;

          console.log(
            `[fix-image-path] ${path.relative(process.cwd(), filePath)}\n` +
            `  ${originalUrl} -> ${newUrl}`,
          );

          return;
        }

        // 找不到就不修改，让 Rspress 自己处理
      }

      // 递归处理子节点
      if (Array.isArray(node.children)) {
        for (const child of node.children) {
          visit(child);
        }
      }
    }

    visit(tree);
  };
}