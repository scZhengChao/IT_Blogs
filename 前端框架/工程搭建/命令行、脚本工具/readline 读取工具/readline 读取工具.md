# readline 读取工具

node命令行操作工具&#x20;

```typescript 
npm install linebyline

//实现一个文件读写系
const fs = require('fs')

//  读文件
function get(key){
    fs.readFile('./test.json',(err,data)=>{
        const json = JSON.parse(data)
        console.log(json[key])
    })
}

// 修改文件
function set(key,value){
    fs.readFile('./test.json',(err,data)=>{
   
        const json = data?JSON.parse(data):{};
        console.log(json,key,value)
        json[key] = value
        //重新写入文件
        fs.writeFile('./test.json',JSON.stringify(json),(err,data)=>{
            if(err){
                console.log(err)
            }else{
                console.log('写入成功')
            }
        })
    })
}

// 命令行部分

const readline = require('readline');
const rl  = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
rl.on('line',function(input){
    const [op,key,value] = input.split(' ');
    if(op ==='get'){
        get(key)
    }else if(op === 'set'){
        set(key,value)
    }else if(op === 'quit'){
        rl.close()
    }else{
        console.log('没有改操作')
    }
})
rl.on('close',function(){
    console.log('程序结束')
})

```
