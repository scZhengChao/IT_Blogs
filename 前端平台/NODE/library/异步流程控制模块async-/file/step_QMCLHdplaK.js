const Step = require('step')
const fs = require('fs')
let path = require('path')
let filename1 = './data.json'
let filename2 = './data2.json'
let encoding = 'utf-8'
let resolve = function(file){
    return path.resolve(__dirname,file)
}


// ----------------------串行--------------------------------
// Step(
//     function readFile1() {
//         fs.readFile(resolve(filename1) ,encoding , this);
//     },
//     function readFile2(err, content) {
//         console.log(content)
//         fs.readFile(resolve(filename2), encoding, this);
//     },
//     function done(err, content) {
//         console.log(err)
//         console.log(content);
//     }
// );



// ------------------------ 并行无关 -----------------------
// function asyncCall(callback) {
//     process.nextTick(function () {
//         callback(null, 'result1', 'result2');
//     });
// }
// Step(
//     function readFile1() {
//         fs.readFile(resolve(filename1), 'utf-8', this.parallel());
//         fs.readFile(resolve(filename2), 'utf-8', this.parallel());
//         asyncCall(this.parallel())
//     },
//     function done(err, content1, content2,content3) {
//         // content1 => file1
//         // content2 => file2
//         console.log(err);
//         console.log(content1);
//         console.log(content2);
//         console.log(content3);
//     }
// );




// ---------------并行-------------------------------
Step(
    function readDir(){
        fs.readdir(__dirname, this);
    },
    function readFiles(err, results) {
        if (err) throw err;
        // Create a new group
        var group = this.group();
        results.forEach(function (filename) {
            if (/\.json$/.test(filename)) {
                fs.readFile(__dirname + "/" + filename, 'utf8', group());
            }
        });
    },
    function showAll(err, files) {
        if (err) throw err;
        console.log(files.toString());
    }
)
