# webpack-deadcode-plugin

## 目录

- [源代码](#源代码)
- [改造](#改造)
  - [插件](#插件)
  - [使用](#使用)
- [在一次改进](#在一次改进)

[   https://juejin.cn/post/7066956841279815694](https://juejin.cn/post/7066956841279815694 "   https://juejin.cn/post/7066956841279815694")

[ webpack-deadcode-plugin/src/detect.js at master · MQuy/webpack-deadcode-plugin · GitHub Webpack plugin to detect unused files and unused exports in used files - webpack-deadcode-plugin/src/detect.js at master · MQuy/webpack-deadcode-plugin https://github.com/MQuy/webpack-deadcode-plugin/blob/master/src/detect.js](https://github.com/MQuy/webpack-deadcode-plugin/blob/master/src/detect.js " webpack-deadcode-plugin/src/detect.js at master · MQuy/webpack-deadcode-plugin · GitHub Webpack plugin to detect unused files and unused exports in used files - webpack-deadcode-plugin/src/detect.js at master · MQuy/webpack-deadcode-plugin https://github.com/MQuy/webpack-deadcode-plugin/blob/master/src/detect.js")

[   https://juejin.cn/post/7236286358390095930](https://juejin.cn/post/7236286358390095930 "   https://juejin.cn/post/7236286358390095930")

# 源代码

index

```javascript 
const path = require("path");
const detectDeadcode = require("./detect");

class WebpackDeadcodePlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    const options = Object.assign(
      {
        patterns: ["**/*.*"],
        exclude: [],
        context: compiler.context,
        failOnHint: false,
        detectUnusedFiles: true,
        detectUnusedExport: true,
        log: "all",
        exportJSON: false,
      },
      this.options,
    );

    if (compiler.hooks) {
      compiler.hooks.afterEmit.tapAsync("WebpackDeadcodePlugin", this.handleAfterEmit.bind(this, options));
    } else {
      compiler.plugin(`after-emit`, this.handleAfterEmit.bind(this, options));
    }
  }

  handleAfterEmit(options, compilation, callback) {
    detectDeadcode(compilation, options);
    callback();
  }
}

module.exports = WebpackDeadcodePlugin;

```


detect

```javascript 
const path = require("path");
const chalk = require("chalk");
const fs = require("fs");
const fg = require("fast-glob");
const getDirName = path.dirname;

function detectDeadCode(compilation, options) {
  const isWebpack5 = compilation.chunkGraph ? true : false;
  const assets = getWebpackAssets(compilation, isWebpack5);
  const compiledFiles = convertFilesToDict(assets);
  const includedFiles = fg.sync(getPattern(options));

  let unusedFiles = [];
  let unusedExportMap = {};

  if (options.detectUnusedFiles) {
    unusedFiles = includedFiles.filter(file => !compiledFiles[file]);
    if ((Object.keys(unusedFiles).length > 0 && options.log !== "none") || options.log === "all") {
      logUnusedFiles(unusedFiles);
    }
  }

  if (options.detectUnusedExport) {
    unusedExportMap = getUsedExportMap(convertFilesToDict(includedFiles), compilation, isWebpack5);

    if ((Object.keys(unusedExportMap).length > 0 && options.log !== "none") || options.log === "all") {
      logUnusedExportMap(unusedExportMap);
    }
  }

  if (options.exportJSON) {
    let exportPath = "deadcode.json";
    if (typeof options.exportJSON === "string") {
      exportPath = options.exportJSON + "/" + exportPath;
    }
    try {
      fs.stat(exportPath, err => {
        if (err == null) {
          fs.unlinkSync(exportPath);
          return exportResultToJSON(exportPath, unusedFiles, unusedExportMap);
        }
        if (err.code === "ENOENT") {
          return exportResultToJSON(exportPath, unusedFiles, unusedExportMap);
        }
      });
    } catch (error) {
      console.error("export result to json error: ", error);
    }
  }

  if (unusedFiles.length > 0 || Object.keys(unusedExportMap).length > 0) {
    if (options.failOnHint) {
      process.exit(2);
    }
  }
}

function exportResultToJSON(exportPath, unusedFiles, unusedExports) {
  const data = {
    unusedFiles,
    unusedExports,
  };
  fs.mkdir(getDirName(exportPath), { recursive: true }, err => {
    if (err) throw err;
    fs.writeFile(exportPath, JSON.stringify(data, null, 2), err => {
      if (err) throw err;
      console.info(path.resolve(exportPath) + " is generated.");
    });
  });
}

function getPattern({ context, patterns, exclude }) {
  return patterns
    .map(pattern => path.resolve(context, pattern))
    .concat(exclude.map(pattern => `!${path.resolve(context, pattern)}`))
    .map(convertToUnixPath);
}

function getUsedExportMap(includedFileMap, compilation, isWebpack5) {
  const unusedExportMap = {};

  compilation.chunks.forEach(function (chunk) {
    if (isWebpack5) {
      compilation.chunkGraph.getChunkModules(chunk).forEach(module => {
        outputUnusedExportMap(compilation, chunk, module, includedFileMap, unusedExportMap, isWebpack5);
      });
    } else {
      for (const module of chunk.modulesIterable) {
        outputUnusedExportMap(compilation, chunk, module, includedFileMap, unusedExportMap, isWebpack5);
      }
    }
  });
  return unusedExportMap;
}

function outputUnusedExportMap(compilation, chunk, module, includedFileMap, unusedExportMap, isWebpack5) {
  if (!module.resource) return;

  let providedExports;
  if (isWebpack5) {
    providedExports = compilation.chunkGraph.moduleGraph.getProvidedExports(module);
  } else {
    providedExports = module.providedExports || module.buildMeta.providedExports;
  }

  let usedExports;
  if (isWebpack5) {
    usedExports = compilation.chunkGraph.moduleGraph.getUsedExports(module, chunk.runtime);
  } else {
    usedExports = module.usedExports;
  }

  const path = convertToUnixPath(module.resource);
  let usedExportsArr = [];
  // in webpack 4 usedExports can be null | boolean | Array<string>
  // in webpack 5 it can be null | boolean | SortableSet<string>
  if (usedExports instanceof Set) {
    usedExportsArr = Array.from(usedExports);
  } else {
    usedExportsArr = usedExports;
  }

  if (
    usedExports !== true &&
    providedExports !== true &&
    /^((?!(node_modules)).)*$/.test(path) &&
    includedFileMap[path]
  ) {
    if (usedExports === false) {
      unusedExportMap[path] = providedExports;
    } else if (providedExports instanceof Array) {
      const unusedExports = providedExports.filter(x => usedExportsArr instanceof Array && !usedExportsArr.includes(x));

      if (unusedExports.length > 0) {
        unusedExportMap[path] = unusedExports;
      }
    }
  }
}

function logUnusedExportMap(unusedExportMap) {
  console.log(chalk.yellow("\n--------------------- Unused Exports ---------------------"));
  if (Object.keys(unusedExportMap).length > 0) {
    let numberOfUnusedExport = 0;

    Object.keys(unusedExportMap).forEach(modulePath => {
      const unusedExports = unusedExportMap[modulePath];

      console.log(chalk.yellow(`\n${modulePath}`));
      console.log(chalk.yellow(`    ⟶   ${unusedExports.join(", ")}`));
      numberOfUnusedExport += unusedExports.length;
    });
    console.log(chalk.yellow(`\nThere are ${numberOfUnusedExport} unused exports (¬º-°)¬.\n`));
  } else {
    console.log(chalk.green("\nPerfect, there is nothing to do ٩(◕‿◕｡)۶."));
  }
}

function getWebpackAssets(compilation) {
  let assets = Array.from(compilation.fileDependencies);

  const compiler = compilation.compiler;
  const outputPath = compilation.getPath(compiler.outputPath);
  compilation.getAssets().forEach(asset => {
    const assetPath = path.join(outputPath, asset.name);
    assets.push(assetPath);
  });
  return assets;
}

function convertFilesToDict(assets) {
  return assets
    .filter(file => file && file.indexOf("node_modules") === -1)
    .reduce((acc, file) => {
      const unixFile = convertToUnixPath(file);

      acc[unixFile] = true;
      return acc;
    }, {});
}

function logUnusedFiles(unusedFiles) {
  console.log(chalk.yellow("\n--------------------- Unused Files ---------------------"));
  if (unusedFiles.length > 0) {
    unusedFiles.forEach(file => console.log(`\n${chalk.yellow(file)}`));
    console.log(
      chalk.yellow(`\nThere are ${unusedFiles.length} unused files (¬º-°)¬.`),
      chalk.red.bold(`\n\nPlease be careful if you want to remove them.\n`),
    );
  } else {
    console.log(chalk.green("\nPerfect, there is nothing to do ٩(◕‿◕｡)۶."));
  }
}

function convertToUnixPath(path) {
  return path.replace(/\\+/g, "/");
}

module.exports = detectDeadCode;

```


# 改造

##### 插件

> 又一个缺陷；只能处理显示导入到app.ts的文件

```javascript 
import path from "path";
const  chalk = require("chalk")
import fs from "fs";
import fg from "fast-glob";
const getDirName = path.dirname;
export const ignores = [
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
function convertToUnixPath(path) {
    return path.replace(/\\+/g, "/");
}
function outputUnusedExportMap(compilation, chunk, module, includedFileMap, unusedExportMap, isWebpack5) {
    if (!module.resource) return;

    let providedExports;
    if (isWebpack5) {
        providedExports = compilation.chunkGraph.moduleGraph.getProvidedExports(module);
    } else {
        providedExports = module.providedExports || module.buildMeta.providedExports;
    }

    let usedExports;
    if (isWebpack5) {
        usedExports = compilation.chunkGraph.moduleGraph.getUsedExports(module, chunk.runtime);
    } else {
        usedExports = module.usedExports;
    }

    const path = convertToUnixPath(module.resource);
    if (!/^((?!(node_modules)).)*$/.test(path)) return;
    if (!/^((?!(\.umi)).)*$/.test(path)) return;
    let usedExportsArr = [];
    // in webpack 4 usedExports can be null | boolean | Array<string>
    // in webpack 5 it can be null | boolean | SortableSet<string>
    if (usedExports instanceof Set) {
        usedExportsArr = Array.from(usedExports);
    } else {
        usedExportsArr = usedExports;
    }

    if (
        usedExports !== true &&
        providedExports !== true &&
        includedFileMap[path]
    ) {
        if (usedExports === false) {
            unusedExportMap[path] = providedExports;
        } else if (providedExports instanceof Array) {
            const unusedExports = providedExports.filter(x => usedExportsArr instanceof Array && !usedExportsArr.includes(x));

            if (unusedExports.length > 0) {
                unusedExportMap[path] = unusedExports;
            }
        }
    }
}

function getUsedExportMap(includedFileMap, compilation, isWebpack5) {
    const unusedExportMap = {};

    compilation.chunks.forEach(function (chunk) {
        if (isWebpack5) {
            const chunkModules = compilation.chunkGraph.getChunkModules(chunk)
            chunkModules.forEach(module => {
                outputUnusedExportMap(compilation, chunk, module, includedFileMap, unusedExportMap, isWebpack5);
            });
        } else {
            for (const module of chunk.modulesIterable) {
                outputUnusedExportMap(compilation, chunk, module, includedFileMap, unusedExportMap, isWebpack5);
            }
        }
    });
    return unusedExportMap;
}

function exportResultToJSON(exportPath, unusedExports) {
    const data = {
        unusedExports,
    };
    fs.mkdir(getDirName(exportPath), { recursive: true }, err => {
        if (err) throw err;
        fs.writeFile(exportPath, JSON.stringify(data, null, 2), err => {
            if (err) throw err;
            console.info(path.resolve(exportPath) + " is generated.");
        });
    });
}
function getPattern({ context, patterns, exclude }) {
    return patterns.map((pattern) => {
        return fg.sync(pattern, {
            ignore: [...ignores, ...exclude],
            cwd: context,
            absolute: true,
        });
    }).flat();
    return fg.sync(patterns
        .map(pattern => path.resolve(context, pattern))
        .concat(exclude.map(pattern => `!${path.resolve(context, pattern)}`))
        .map(convertToUnixPath));
}
function logUnusedExportMap(unusedExportMap) {
    console.log(chalk.yellow("\n--------------------- Unused Exports ---------------------"));
    if (Object.keys(unusedExportMap).length > 0) {
        let numberOfUnusedExport = 0;

        Object.keys(unusedExportMap).forEach(modulePath => {
            const unusedExports = unusedExportMap[modulePath];

            console.log(chalk.yellow(`\n${modulePath}`));
            console.log(chalk.yellow(`    ⟶   ${unusedExports.join(", ")}`));
            numberOfUnusedExport += unusedExports.length;
        });
        console.log(chalk.yellow(`\nThere are ${numberOfUnusedExport} unused exports (¬º-°)¬.\n`));
    } else {
        console.log(chalk.green("\nPerfect, there is nothing to do ٩(◕‿◕｡)۶."));
    }
}
function getWebpackAssets(compilation) {
    let assets = Array.from(compilation.fileDependencies);

    const compiler = compilation.compiler;
    const outputPath = compilation.getPath(compiler.outputPath); // 获取output path
    compilation.getAssets().forEach(asset => {
        const assetPath = path.join(outputPath, asset.name);
        assets.push(assetPath);
    });
    return assets;
}
function convertFilesToDict(assets) {
    return assets
        .filter((path) => !/(node_modules|(\.umi)|(\.umi-production))/.test(path) && Boolean(path) )
        // .filter(file => file && file.indexOf("node_modules") === -1)
        .reduce((acc, file) => {
            const unixFile = convertToUnixPath(file);

            acc[unixFile] = true;
            return acc;
        }, {});
}


class FindUnsedFiles {
    constructor(options = {}) {
        this.options = options;
    }
    apply(compiler) {
        // 等到webpack输出文件之后执行
        compiler.hooks.afterEmit.tapAsync("FindUnsedFiles", (compilation, callback) => {
            const options = Object.assign(
                {
                    patterns: ["src/**/*.(js|ts|jsx|tsx)"],
                    exclude: [],
                    context: compiler.context,
                    failOnHint: false,
                    detectUnusedFiles: true,
                    detectUnusedExport: true,
                    log: "all",
                    exportJSON: true,
                },
                this.options,
            );
            this.detectDeadCode(compilation,options)
            callback()
        });
    }
    detectDeadCode(compilation, options){
        const isWebpack5 = compilation.chunkGraph ? true : false;
        const includedFiles = getPattern(options);
        const eliminatefiles = convertFilesToDict(includedFiles)
        let unusedExportMap = {};
        console.log(eliminatefiles,'------eliminatefiles---')
        if (options.detectUnusedExport) {
            unusedExportMap = getUsedExportMap(eliminatefiles, compilation, isWebpack5);
            if ((Object.keys(unusedExportMap).length > 0 && options.log !== "none") || options.log === "all") {
                logUnusedExportMap(unusedExportMap);
            }
        }
        console.log(unusedExportMap,'-----unusedExportMap---')


        if (options.exportJSON) {
            let exportPath = "deadcode.json";
            if (typeof options.exportJSON === "string") {
                exportPath = options.exportJSON + "/" + exportPath;
            }
            try {
                fs.stat(exportPath, err => {
                    if (err == null) {
                        fs.unlinkSync(exportPath);
                        return exportResultToJSON(exportPath, unusedExportMap);
                    }
                    if (err.code === "ENOENT") {
                        return exportResultToJSON(exportPath, unusedExportMap, );
                    }
                });
            } catch (error) {
                console.error("export result to json error: ", error);
            }
        }
    }
}
module.exports = FindUnsedFiles;


```


##### 使用

umi中

```javascript 
import webpackDead from '../webpackDead'
 去掉 package.json 的 "sideEffects": false,
{
    devtool:false,
    chainWebpack:config=>{
        config.optimization.usedExports(true);
        config.optimization.providedExports(true);
        config.optimization.innerGraph(true);
        config.mode('development');
        config.plugin('webpackDead').use(webpackDead,)
        return config
    }
}
```


webpack中

```javascript 
去掉 package.json 的 "sideEffects": false,
 
{
  mode: 'development',
  optimization:{
    usedExports: true,// 启动标记功能
    innerGraph:true,
  },
  plugins: [
    new webpackDead(),
  ]
}
```


[tree shaking](<tree shaking.md> "tree shaking")

# 在一次改进

```javascript 
import path from "path";
import fs from "fs";
import fg from "fast-glob";
const getDirName = path.dirname;
export const ignores = [
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
function convertToUnixPath(path) {
    return path.replace(/\\+/g, "/");
}
function outputUnusedExportMap(compilation, chunk, module, includedFileMap, unusedExportMap, isWebpack5) {
    if (!module.resource) return;
    let providedExports;
    if (isWebpack5) {
        providedExports = compilation.chunkGraph.moduleGraph.getProvidedExports(module);
    } else {
        providedExports = module.providedExports || module.buildMeta.providedExports;
    }

    let usedExports;
    if (isWebpack5) {
        usedExports = compilation.chunkGraph.moduleGraph.getUsedExports(module, chunk.runtime);
    } else {
        usedExports = module.usedExports;
    }
    const path = convertToUnixPath(module.resource);
    if (!/^((?!(node_modules)).)*$/.test(path)) return;
    if (!/^((?!(\.umi)).)*$/.test(path)) return;
    let usedExportsArr = [];
    if (usedExports instanceof Set) {
        usedExportsArr = Array.from(usedExports);
    } else {
        usedExportsArr = usedExports;
    }
    if (
        usedExports !== true &&
        providedExports !== true &&
        includedFileMap[path]
    ) {
        if (usedExports === false) {
            unusedExportMap[path] = providedExports;
        } else if (providedExports instanceof Array) {
            const unusedExports = providedExports.filter(x => usedExportsArr instanceof Array && !usedExportsArr.includes(x));
            if (unusedExports.length > 0) {
                unusedExportMap[path] = unusedExports;
            }
        }
    }
}

function getUsedExportMap(includedFileMap, compilation, isWebpack5) {
    const unusedExportMap = {};
    compilation.chunks.forEach(function (chunk) {
        if (isWebpack5) {
            const chunkModules = compilation.chunkGraph.getChunkModules(chunk)
            chunkModules.forEach(module => {
                outputUnusedExportMap(compilation, chunk, module, includedFileMap, unusedExportMap, isWebpack5);
            });
        } else {
            for (const module of chunk.modulesIterable) {
                outputUnusedExportMap(compilation, chunk, module, includedFileMap, unusedExportMap, isWebpack5);
            }
        }
    });
    return unusedExportMap;
}

function exportResultToJSON(exportPath, unusedExports) {
    const data = {
        unusedExports,
    };
    fs.mkdir(getDirName(exportPath), { recursive: true }, err => {
        if (err) throw err;
        fs.writeFile(exportPath, JSON.stringify(data, null, 2), err => {
            if (err) throw err;
            console.info(path.resolve(exportPath) + " is generated.");
        });
    });
}
function getPattern({ context, patterns, exclude }) {
    return patterns.map((pattern) => {
        return fg.sync(pattern, {
            ignore: [...ignores, ...exclude],
            cwd: context,
            absolute: true,
        });
    }).flat();
    return fg.sync(patterns
        .map(pattern => path.resolve(context, pattern))
        .concat(exclude.map(pattern => `!${path.resolve(context, pattern)}`))
        .map(convertToUnixPath));
}
function logUnusedExportMap(unusedExportMap) {
    if (Object.keys(unusedExportMap).length > 0) {
        let numberOfUnusedExport = 0;
        Object.keys(unusedExportMap).forEach(modulePath => {
            const unusedExports = unusedExportMap[modulePath];
            numberOfUnusedExport += unusedExports.length;
        });
        console.log(`unused code length: ${numberOfUnusedExport}`);
    } else {
        console.log('no unused code ~~');
    }
}

function convertFilesToDict(assets) {
    return assets.filter(Boolean).reduce((acc, file) => {
            const unixFile = convertToUnixPath(file);
            acc[unixFile] = true;
            return acc;
        }, {});
}


class CleanUnusedCode {
    constructor(options = {}) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.afterEmit.tapAsync("CleanUnusedCode", (compilation, callback) => {
            const options = Object.assign(
                {
                    patterns: ["src/**/*.(js|ts|jsx|tsx)"],
                    exclude: [...ignores],
                    context: compiler.context,  // /Users/zhengchao/workSpace/umi4
                    exportPath: 'unused-codes.json',
                },
                this.options,
            );
            this.detectDeadCode(compilation,options)
            callback()
        });
    }
    detectDeadCode(compilation, options){
        const isWebpack5 = compilation.chunkGraph ? true : false;
        const includedFiles = getPattern(options);
        const eliminatefiles = convertFilesToDict(includedFiles)
        let unusedExportMap = getUsedExportMap(eliminatefiles, compilation, isWebpack5);
        logUnusedExportMap(unusedExportMap);
        const exportPath = options.exportPath
        if (exportPath) {
            try {
                fs.stat(exportPath, err => {
                    if (err == null) {
                        fs.unlinkSync(exportPath);
                        return exportResultToJSON(exportPath, unusedExportMap);
                    }
                    if (err.code === "ENOENT") {
                        return exportResultToJSON(exportPath, unusedExportMap, );
                    }
                });
            } catch (error) {
                console.error("export result to json error: ", error);
            }
        }
    }
}
module.exports = CleanUnusedCode;

```
