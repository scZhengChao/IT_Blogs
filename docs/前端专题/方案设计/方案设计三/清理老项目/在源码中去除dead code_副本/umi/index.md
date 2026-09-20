# umi

## 目录

- [源码](#源码)
  - [detectDeadCode](#detectDeadCode)
  - [detectDeadCodePlugin](#detectDeadCodePlugin)

前不久发布的 UMI4 新增一个非常实用的功能：deadCode 检测。

随着项目不断迭代，项目中通常会有未使用的文件或导出，这些 deadcode 增加了工程维护的复杂度，降低代码的健壮性，靠人力去清理 deadcode 非常耗时。Umi 4 中通过配置 `deadCode: {}` 即可在 build 阶段做检测。如有发现，会有类似信息抛出。

[ 配置 对于 umi 中能使用的自定义配置，你可以使用项目根目录的 .umirc.ts 文件或者 config/config.ts，值得注意的是这两个文件功能一致，仅仅是存在目录不同，2 选 1 ，.umirc.ts 文件优先级较高。 https://umijs.org/docs/api/config#deadcode](https://umijs.org/docs/api/config#deadcode " 配置 对于 umi 中能使用的自定义配置，你可以使用项目根目录的 .umirc.ts 文件或者 config/config.ts，值得注意的是这两个文件功能一致，仅仅是存在目录不同，2 选 1 ，.umirc.ts 文件优先级较高。 https://umijs.org/docs/api/config#deadcode")

[   https://juejin.cn/post/7288178532860952616](https://juejin.cn/post/7288178532860952616 "   https://juejin.cn/post/7288178532860952616")

> **实测：一定要检查；很辣鸡啊；不准确**

# 源码

UMI 源码中 deadCode 检测相关代码在这里：

> packages/bundler-webpack/src/config/detectDeadCode.ts

### detectDeadCode

```javascript 
import {
  Chunk,
  Compilation,
  Module,
  NormalModule,
} from '@umijs/bundler-webpack/compiled/webpack';
import { chalk, fsExtra, glob, winPath } from '@umijs/utils';
import path from 'path';
import { DeadCodeParams } from '../types';

export interface Options extends DeadCodeParams {
  patterns: string[];
  exclude: string[];
  failOnHint: boolean;
  detectUnusedFiles: boolean;
  detectUnusedExport: boolean;
}
export const ignores: string[] = [
  '**/node_modules/**',
  '**/.umi/**',
  '**/.umi-production/**',
  '**/.umi-test/**',
  'coverage/**',
  'dist/**',
  'config/**',
  'public/**',
  'mock/**',
];

type FileDictionary = Record<string, boolean>;
type ExportDictionary = Record<string, string[]>;

const detectDeadCode = (compilation: Compilation, options: Options) => {
  const assets: string[] = getWebpackAssets(compilation);
  const compiledFilesDictionary: FileDictionary = convertFilesToDict(assets);
  const context = options.context!;
  if (!options.patterns.length) {
    options.patterns = getDefaultSourcePattern({ cwd: context });
  }
  const includedFiles: string[] = options.patterns
    .map((pattern) => {
      return glob.sync(pattern, {
        ignore: [...ignores, ...options.exclude],
        cwd: context,
        absolute: true,
      });
    })
    .flat();

  const unusedFiles: string[] = options.detectUnusedFiles
    ? includedFiles.filter((file) => !compiledFilesDictionary[file])
    : [];
  const unusedExportMap: ExportDictionary = options.detectUnusedExport
    ? getUnusedExportMap(convertFilesToDict(includedFiles), compilation)
    : {};

  logUnusedFiles(unusedFiles);
  logUnusedExportMap(unusedExportMap);

  const hasUnusedThings =
    unusedFiles.length || Object.keys(unusedExportMap).length;
  if (hasUnusedThings && options.failOnHint) {
    process.exit(2);
  }
};

const getUnusedExportMap = (
  includedFileMap: FileDictionary,
  compilation: Compilation,
): ExportDictionary => {
  const unusedExportMap: ExportDictionary = {};

  compilation.chunks.forEach((chunk) => {
    compilation.chunkGraph.getChunkModules(chunk).forEach((module) => {
      outputUnusedExportMap(
        compilation,
        chunk,
        module,
        includedFileMap,
        unusedExportMap,
      );
    });
  });

  return unusedExportMap;
};

const outputUnusedExportMap = (
  compilation: Compilation,
  chunk: Chunk,
  module: Module,
  includedFileMap: FileDictionary,
  unusedExportMap: ExportDictionary,
) => {
  if (!(module instanceof NormalModule) || !module.resource) {
    return;
  }

  const path = winPath(module.resource);
  if (!/^((?!(node_modules)).)*$/.test(path)) return;

  const providedExports =
    compilation.chunkGraph.moduleGraph.getProvidedExports(module);
  const usedExports = compilation.chunkGraph.moduleGraph.getUsedExports(
    module,
    chunk.runtime,
  );

  if (
    usedExports !== true &&
    providedExports !== true &&
    includedFileMap[path]
  ) {
    if (usedExports === false) {
      if (providedExports?.length) {
        unusedExportMap[path] = providedExports;
      }
    } else if (providedExports instanceof Array) {
      const unusedExports = providedExports.filter(
        (item) => usedExports && !usedExports.has(item),
      );

      if (unusedExports.length) {
        unusedExportMap[path] = unusedExports;
      }
    }
  }
};

const logUnusedExportMap = (unusedExportMap: ExportDictionary): void => {
  if (!Object.keys(unusedExportMap).length) {
    return;
  }

  let numberOfUnusedExport = 0;
  let logStr = '';

  Object.keys(unusedExportMap).forEach((filePath, fileIndex) => {
    const unusedExports = unusedExportMap[filePath];

    logStr += [
      `\n${fileIndex + 1}. `,
      chalk.yellow(`${filePath}\n`),
      '    >>>  ',
      chalk.yellow(`${unusedExports.join(',  ')}`),
    ].join('');

    numberOfUnusedExport += unusedExports.length;
  });

  console.log(
    chalk.yellow.bold('\nWarning:'),
    chalk.yellow(
      `There are ${numberOfUnusedExport} unused exports in ${
        Object.keys(unusedExportMap).length
      } files:`,
    ),
    logStr,
    chalk.red.bold('\nPlease be careful if you want to remove them (¬º-°)¬.\n'),
  );
};

const getWebpackAssets = (compilation: Compilation): string[] => {
  const outputPath: string = compilation.getPath(
    compilation.compiler.outputPath,
  );
  const assets: string[] = [
    ...Array.from(compilation.fileDependencies),
    ...compilation
      .getAssets()
      .map((asset) => path.join(outputPath, asset.name)),
  ];

  return assets;
};

const convertFilesToDict = (assets: string[]): FileDictionary => {
  return assets
    .filter((path) => !/(node_modules|(\.umi))/.test(path) && Boolean(path))
    .reduce((fileDictionary, file) => {
      const unixFile = winPath(file);

      fileDictionary[unixFile] = true;

      return fileDictionary;
    }, {} as FileDictionary);
};

const logUnusedFiles = (unusedFiles: string[]): void => {
  if (!unusedFiles?.length) {
    return;
  }

  console.log(
    chalk.yellow.bold('\nWarning:'),
    chalk.yellow(`There are ${unusedFiles.length} unused files:`),
    ...unusedFiles.map(
      (file, index) => `\n${index + 1}. ${chalk.yellow(file)}`,
    ),
    chalk.red.bold('\nPlease be careful if you want to remove them (¬º-°)¬.\n'),
  );
};

function isDirExist(p: string) {
  return fsExtra.existsSync(p) && fsExtra.statSync(p).isDirectory();
}

function getDefaultSourcePattern(opts: { cwd: string }) {
  const { cwd } = opts;
  const srcPath = path.join(cwd, 'src');
  if (isDirExist(srcPath)) {
    return ['src/**/*'];
  }
  const dirs = fsExtra.readdirSync(cwd).filter((p) => {
    return !p.startsWith('.') && isDirExist(p);
  });
  return dirs.map((dir) => `${dir}/**/*`);
}

export default detectDeadCode;

```


### detectDeadCodePlugin

```javascript 
import { InnerCallback } from '@umijs/bundler-utils/compiled/tapable';
import { Compilation, Compiler } from '@umijs/bundler-webpack/compiled/webpack';
import Config from '@umijs/bundler-webpack/compiled/webpack-5-chain';
import { DeadCodeParams, Env, IConfig } from '../types';
import detectDeadcode, { Options } from './detectDeadCode';

interface IOpts {
  userConfig: IConfig;
  config: Config;
  env: Env;
}

const defaultOptions: Options = {
  patterns: [],
  exclude: [],
  failOnHint: false,
  detectUnusedFiles: true,
  detectUnusedExport: true,
};

class DetectDeadCodePlugin {
  options: Options = defaultOptions;

  constructor(options: DeadCodeParams) {
    if (!options) {
      return;
    }

    this.options = {
      ...this.options,
      ...options,
    };
  }

  apply(compiler: Compiler) {
    if (!this.options.context) {
      this.options = {
        ...this.options,
        context: compiler.context,
      };
    }

    compiler.hooks.afterEmit.tapAsync(
      'DetectDeadCodePlugin',
      this.handleAfterEmit,
    );
  }

  handleAfterEmit = (
    compilation: Compilation,
    callback: InnerCallback<Error, any>,
  ) => {
    detectDeadcode(compilation, this.options);
    callback();
  };
}

export async function addDetectDeadCodePlugin(opts: IOpts) {
  const { config, userConfig } = opts;
  const isDev = opts.env === Env.development;

  if (userConfig.deadCode && !isDev) {
    config
      .plugin('detect-dead-code-plugin')
      .use(DetectDeadCodePlugin, [userConfig.deadCode]);
  }
}

```


[分析](./分析/index.md "分析")
