# node worker

在electron中如何使用nodejs的工作线程,

```typescript 
// workerThreads.js
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads')
const { exec } = require('child_process')
const path = require('path')

function FindPidList (exeName, callback) {
    const cmd = `tasklist -V|findstr "${exeName}" `;
    // console.log(`cmd: ${cmd}`)
    let pids = [];
    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            callback(pids);
            return
        }
        stdout.split('\n').filter(item => {
            const p = item.trim().split(/\s+/)
            // p[0] 应用程序名称  p[1] 应用程序PID 断开连接的时候p[2]会话名会少要注意
            if (p[0] && p[1]) {
                let memory = p[4].replace(",","") === 'K' ? p[3].replace(",","") : p[4].replace(",","")
                pids.push({pid: p[1], memory: memory})
            }
        })
        // console.log(`int_pids: ${JSON.stringify(pids)}`);
        callback(pids)
    })
}

if (isMainThread) {
    let workerThreads = path.resolve(__dirname, './workerThreads.js')
    module.exports = function cmdFindPidList(exeName, cbFun) {
        let pids = []
        const threads = new Set()
        threads.add(new Worker(workerThreads, { workerData: { exeName: exeName } }))
        threads.forEach(worker => {
            worker.on('error', (err) => { throw err })
            worker.on('exit', () => {
                threads.delete(worker)
                // console.log(`Thread exiting, ${threads.size} running...`)
                // console.log(`exit Pids：${JSON.stringify(pids)}`)
                cbFun(pids)
            })

            worker.on('message', (msg) => {
                // console.log(`msg: ${JSON.stringify(msg)}`);
                pids = pids.concat(msg)
            })
        })
    }
} else {
    FindPidList(workerData.exeName, res => {
        parentPort.postMessage(res)
    })
}

```
