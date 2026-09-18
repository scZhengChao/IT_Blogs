# download-git-repo

## 目录

- [同步github代码 ](#同步github代码-)

# 同步github代码&#x20;

download-git-repo  同步github代码 ； 常用于脚手架

这个地方有坑啊：注意 ；

1. 不能是私人仓库 ； 最好是master 分支；其他情况见文档&#x20;
2. &#x20;不是地址； 只是你的仓库名

```typescript 
const repo = 'github:scZhengChao/node'
const desc = './cli'
const { clone } = require('./download')
clone(repo, desc);

//download.js
module.exports.clone = async function (repo,desc){
    const { promisify} = require('util')
    const download =promisify(require('download-git-repo') )
    const ora = require('ora')
    const process = ora(`正在下载....${repo}`)
    process.start()
    try{
        await  download(repo,desc)
    }catch(err){
        process.fail()
    }
    process.succeed()


    // download(repo,desc,err=>{
    //     if(err){
    //         console.log(err,'failed')
    //         process.fail()
    //     }else{
    //         process.succeed()
    //     }
    // })
}
```
