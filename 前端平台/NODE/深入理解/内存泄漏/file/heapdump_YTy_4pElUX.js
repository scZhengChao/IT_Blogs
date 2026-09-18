var heapdump = require('heapdump');
const path = require('path')
function resolve (file){
    return path.resolve(__dirname,'../test')
}
 
function showMemory() {
	function f(v) {
		if (v < 1024) return v.toString(10);
		else if (v < 1048576) {   //1M
			return (v / 1024).toFixed(2) + "KB";
		}
		else if (v < 1073741824) //1M
		{
			return (v / 1048576).toFixed(2) + "MB";
		}
		else {
			return (v / 1073741824).toFixed(2) + "GB";  //1G
		}
	}
	{
		//打印并显示当前堆的情况 可以去掉这个部分
		let d = process.memoryUsage();
		let strRss = f(d.rss);
		let strheapTotal = f(d.heapTotal);
		let strheapUsed = f(d.heapUsed);
		let strDate = new Date().toLocaleString();
		console.log(`memory: ${strDate}: rss:${strRss}, heapTotal:${strheapTotal}, heapUsed:${strheapUsed}`, );
	}
	heapdump.writeSnapshot(resolve() + Date.now() + '.heapsnapshot');  //堆快照必须.heapsnapshot，否则在后面使用chrome的时候，会报错。
}
 
setInterval(showMemory, 5000);  //这里设定了，