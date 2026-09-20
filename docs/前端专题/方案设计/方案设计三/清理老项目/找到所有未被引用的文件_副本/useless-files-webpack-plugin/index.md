# useless-files-webpack-plugin

## 目录

- [current](#current)
- [再次优化](#再次优化)

[   https://juejin.cn/post/7137639757898743821](https://juejin.cn/post/7137639757898743821 "   https://juejin.cn/post/7137639757898743821")

这个文件不能直接用；其中`glob` 的用法已经过时了

```javascript 
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const shelljs = require('shelljs')

class CleanUnusedFilesPlugin {
  constructor (options) {
    this.opts = options
  }
  apply (compiler) {
    let _this = this
    compiler.plugin('after-emit', function (compilation, done) {
      _this.findUnusedFiles(compilation, _this.opts)
      done()
    })
  }

/**
 * 获取依赖的文件
 */
  getDependFiles (compilation) {
    return new Promise((resolve, reject) => {
      const dependedFiles = [...compilation.fileDependencies].reduce(
        (acc, usedFilepath) => {
          if (!~usedFilepath.indexOf('node_modules')) {
            acc.push(usedFilepath)
          }
          return acc
        },
        []
      )
      resolve(dependedFiles)
    })
  }

/**
 * 获取项目目录所有的文件
 */
  getAllFiles (pattern) {
    return new Promise((resolve, reject) => {
      glob(pattern, {
        nodir: true
      }, (err, files) => {
        if (err) {
          throw err
        }
        const out = files.map(item => path.resolve(item))
        resolve(out)
      })
    })
  }

  dealExclude (path, unusedList) {
    const file = fs.readFileSync(path, 'utf-8')
    const files = JSON.parse(file) || []
    const result = unusedList.filter(unused => {
      return !files.some(item => ~unused.indexOf(item))
    })
    return result
  }

  async findUnusedFiles (compilation, config = {}) {
    const { root = './src', clean = false, output = './unused-files.json', exclude = false } = config
    const pattern = root + '/**/*'
    try {
      const allChunks = await this.getDependFiles(compilation)
      const allFiles = await this.getAllFiles(pattern)
      let unUsed = allFiles
        .filter(item => !~allChunks.indexOf(item))
      if (exclude && typeof exclude === 'string') {
        unUsed = this.dealExclude(exclude, unUsed)
      }
      if (typeof output === 'string') {
        fs.writeFileSync(output, JSON.stringify(unUsed, null, 4))
      } else if (typeof output === 'function') {
        output(unUsed)
      }
      if (clean) {
        unUsed.forEach(file => {
          shelljs.rm(file)
          console.log(`remove file: ${file}`)
        })
      }
      return unUsed
    } catch (err) {
      throw (err)
    }
  }
}

module.exports = CleanUnusedFilesPlugin

```


# current

2024/04/26 11:37:08

```javascript 
const fs = require('fs')
import { glob } from 'glob'
const path = require('path')
const shelljs = require('shelljs')

class CleanUnusedFilesPlugin {
  constructor (options) {
    this.opts = options
  }
  apply (compiler) {
    let _this = this
    compiler.hooks.afterEmit.tapAsync('DependencyAnalysisPlugin', function (compilation, done) {
      _this.findUnusedFiles(compilation, _this.opts)
      done()
    })
  }

  /**
   * 获取依赖的文件
   */
  getDependFiles (compilation) {
    return new Promise((resolve, reject) => {
      const dependedFiles = [...compilation.fileDependencies].reduce(
        (acc, usedFilepath) => {
          if (!~usedFilepath.indexOf('node_modules')) {
            acc.push(usedFilepath)
          }
          return acc
        },
        []
      )
      resolve(dependedFiles)
    })
  }

  /**
   * 获取项目目录所有的文件
   */
  async getAllFiles (pattern) {
     const files = await glob(pattern, {
        nodir: true,
        ignore:['./src/.umi/**/*'],
      })
    const out = files.map(item => path.resolve(item))
    return out
  }

  dealExclude (path, unusedList) {
    const file = fs.readFileSync(path, 'utf-8')
    const files = JSON.parse(file) || []
    const result = unusedList.filter(unused => {
      return !files.some(item => ~unused.indexOf(item))
    })
    return result
  }

  async findUnusedFiles (compilation, config = {}) {
    const { root = './src', clean = false, output = './unused-files.txt', exclude = false } = config
    const pattern = root + '/**/*'
    try {
      const allChunks = await this.getDependFiles(compilation)
      const allFiles = await this.getAllFiles(pattern)
      let unUsed = allFiles
        .filter(item => !~allChunks.indexOf(item))
      if (exclude && typeof exclude === 'string') {
        unUsed = this.dealExclude(exclude, unUsed)
      }
      if (typeof output === 'string') {
        const info = `无用文件：${unUsed.length}`
        fs.writeFileSync(output, info + JSON.stringify(unUsed, null, 4))
      } else if (typeof output === 'function') {
        output(unUsed)
      }
      if (clean) {
        unUsed.forEach(file => {
          shelljs.rm(file)
          console.log(`remove file: ${file}`)
        })
      }
      return unUsed
    } catch (err) {
      throw (err)
    }
  }
}

module.exports = CleanUnusedFilesPlugin
```


# 再次优化

```javascript 
const fs = require('fs')
import { glob } from 'glob'
const path = require('path')
const shelljs = require('shelljs')
const ignores = [
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

class CleanUnusedFile {
    constructor (options) {
        this.opts = options
    }
    apply (compiler) {
        let _this = this
        compiler.hooks.afterEmit.tapAsync('clean-unused-file', function (compilation, done) {
            _this.findUnusedFiles(compilation, _this.opts)
            done()
        })
    }

    getDependFiles (compilation) {
        return new Promise((resolve) => {
            const dependedFiles = [...compilation.fileDependencies].reduce(
                (acc, usedFilepath) => {
                    if (!~usedFilepath.indexOf('node_modules')) {   // 按位非：返回数值的反码。其本质是操作数的负值减1
                    // if (usedFilepath.indexOf('node_modules') === -1) {
                        acc.push(usedFilepath)
                    }
                    return acc
                },
                []
            )
            resolve(dependedFiles)
        })
    }
    async getAllFiles (pattern,exclude=[]) {
        const files = await glob(pattern, {
            nodir: true, // Do not match directories, only files
            ignore:[...ignores,...exclude],
        })
        const out = files.map(item => path.resolve(item))
        return out
    }

    exportResultToJSON(exportPath, unusedExports) {
        const data = {
            unusedExports,
        };
        fs.mkdir(path.dirname(exportPath), { recursive: true }, err => {
            if (err) throw err;
            fs.writeFile(exportPath, JSON.stringify(data, null, 2), err => {
                if (err) throw err;
                console.info(path.resolve(exportPath) + " is generated.");
            });
        });
    }
    async findUnusedFiles (compilation, config = {}) {
        const { root = './src', clean = false, output = './unused-files.json',exclude } = config
        const pattern = root + '/**/*'
        try {
            const allChunks = await this.getDependFiles(compilation)
            const allFiles = await this.getAllFiles(pattern,exclude)
            let unUsed = allFiles
                .filter(item => !~allChunks.indexOf(item))
            if(!unUsed?.length){
                console.log(`no unusedfile length`)
            }
            if (typeof output === 'string') {
                console.log(`unusedfile length：${unUsed.length}`)
                fs.stat(output, err => {
                    if (err == null || err.code === "ENOENT") {
                        if(err == null) fs.unlinkSync(output);
                        return this.exportResultToJSON(output, unUsed);
                    }
                });
            }
            if (clean) {
                unUsed.forEach(file => {
                    shelljs.rm(file)
                })
            }
            return unUsed
        } catch (err) {
            throw (err)
        }
    }
}

module.exports = CleanUnusedFile
```
