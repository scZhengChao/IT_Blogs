const fs = require('fs')
const Q = require('q')
var filename = './data.json';
var filename2 = './data2.json';
var encoding = 'utf-8';
// Q.nfcall(fs.readFile,filename,encoding).then(function (data) {
//     console.log(data);  //-->xml内容就不明说了，就这样的格式就对了
// });


 let p1 = Q.nfcall(fs.readFile,filename,encoding)
let p2 = Q.nfcall(fs.readFile,filename2,encoding)
Q.all([p1,p2]).then(function(res){
    console.log(res.toString())
})  