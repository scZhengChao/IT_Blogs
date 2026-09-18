# WebWorker

我们知道，想要用 `WebWorker` 的话，是要先创建一个文件，然后在里面写代码，然后去与这个文件运行的代码进行通信，有了`URL.createObjectURL`就不需要新建文件了，比如下面这个解决`excel`耗时过长的场景，可以看到，我们传给`WebWorker`的不是一个真的文件路径，**而是一个临时的路径\~**

```javascript 
const handleImport = (ev: Event) => {
  const file = (ev.target as HTMLInputElement).files![0];
  const worker = new Worker(
    URL.createObjectURL(
      new Blob([
        `
        importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.4/xlsx.full.min.js');
        onmessage = function(e) {
          const fileData = e.data;
          const workbook = XLSX.read(fileData, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          postMessage(data);
        };
        `,
      ]),
    ),
  );

  // 使用FileReader读取文件内容
  const reader = new FileReader();

  reader.onload = function (e: any) {
    const data = new Uint8Array(e.target.result);
    worker.postMessage(data);
  };

  // 读取文件
  reader.readAsArrayBuffer(file);

  // 监听Web Worker返回的消息
  worker.onmessage = function (e) {
    console.log('解析完成', e.data);
    worker.terminate(); // 当任务完成后，终止Web Worker
  };
};

```
