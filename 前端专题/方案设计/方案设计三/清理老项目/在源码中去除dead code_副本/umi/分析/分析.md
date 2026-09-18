# 分析

```javascript 
/**
 * 获取当前模块的 `export`
 *
 * true => only the runtime knows if it is provided
 * string[] => it is provided
 * null => it was not determined if it is provided
 */
const providedExports = compilation.chunkGraph.moduleGraph.getProvidedExports(module);

/**
 * 从 `chunk.runtime` 获取当前模块的 `export` 使用情况
 *
 * false => 模块 export 全部都未使用
 * true => 模块 export 全部都被使用
 * SortableSet<string> => 模块 export 部分被使用
 * empty SortableSet<string> => 模块被使用，但没有 export
 * null => unknown
 */
const usedExports = compilation.chunkGraph.moduleGraph.getUsedExports(module, chunk.runtime);

```


从上面的核心流程中看出，检测未使用文件比较简单，只需要对比 glob 获取的文件路径和 Webpack 打包资源信息即可。那么未使用 `export` 导出是如何检测的呢，其实就是逐一分析每个 module 的 `export`，再从 chunk 获取 `export` 使用情况，将两个集合相减就可得到模块未使用导出。看下 `getUnusedExportMap` 源码实现：

```javascript 
const getUnusedExportMap = (
  includedFileMap: FileDictionary,
  compilation: Compilation,
): ExportDictionary => {
  // 存放未使用 export 导出的 map
  const unusedExportMap: ExportDictionary = {};

  // 遍历 chunks
  compilation.chunks.forEach((chunk) => {
    // 针对每个 chunk 遍历其中的 module
    compilation.chunkGraph.getChunkModules(chunk).forEach((module) => {
      // 分析每个 module 的未使用导出
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
  // 不检测第三方库的未使用导出
  if (!/^((?!(node_modules)).)*$/.test(path)) return;

  // 实现 deadcode 检测核心逻辑
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
        // 模块所有 export 都未使用
        unusedExportMap[path] = providedExports;
      }
    } else if (providedExports instanceof Array) {
      // 模块部分 export 未使用
      const unusedExports = providedExports.filter(
        (item) => usedExports && !usedExports.has(item),
      );

      if (unusedExports.length) {
        unusedExportMap[path] = unusedExports;
      }
    }
  }
};

```
