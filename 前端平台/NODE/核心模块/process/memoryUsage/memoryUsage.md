# memoryUsage

## 目录

- [注意事项](#注意事项)
- [性能考虑](#性能考虑)

查看进程的占用和内存

```javascript 
查看进程的占用和内存（注意和os的有所区别；是进程而不是操作系统）
1.process.memoryUsage()
输出：
{
  rss: 18677760,      进程的常驻内存
  heapTotal: 4734976,  申请的堆内存
  heapUsed: 2477592,   使用的堆内存
  external: 913202
}
进程的内存分为几部分：一部分是rss，其余部分在交换区或者文件系统
var showMem = function () {
    var mem = process.memoryUsage();
    var format = function (bytes) {
        return (bytes / 1024 / 1024).toFixed(2) + ' MB';
    };
    console.log('Process: heapTotal ' + format(mem.heapTotal) +
        ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss));
    console.log('-----------------------------------------------------------');
};
输出：Process: heapTotal 4.52 MB heapUsed 2.37 MB rss 18.71 MB
同时写一个方法；不停的分配内存但是不释放内存；
var useMem = function () {
    var size = 20 * 1024 * 1024;
    var arr = new Array(size);
    for (var i = 0; i < size; i++) {
        arr[i] = 0;
    }
    return arr;
};
var total = [];

for (var j = 0; j < 15; j++) {
    showMem();
    total.push(useMem());
}


```


#### 注意事项

- `rss`值包括了Node.js进程的所有内存分配，不仅仅是JavaScript堆内存。
- `heapTotal`和`heapUsed`提供了JavaScript堆内存的使用情况，这对于诊断内存泄漏特别有用。
- `external`值表示了绑定到JavaScript对象的C++对象的内存使用，这对于使用Node.js原生模块的应用程序特别重要。
- `arrayBuffers`值提供了ArrayBuffer的内存使用情况，这对于处理大量二进制数据的应用程序特别有用。

#### 性能考虑

调用`process.memoryUsage()`本身对性能的影响很小，但是在高频率地调用它（例如在热循环中）时，仍然可能会对性能产生一些影响。因此，在生产环境中，建议仅在需要时调用它，例如在诊断内存问题时。

总之，`process.memoryUsage()`是Node.js中一个非常有用的工具，可以帮助开发者监控和优化他们的应用程序的内存使用。通过定期检查内存使用情况，开发者可以及时发现并修复内存泄漏问题，从而提高应用程序的性能和稳定性。

```javascript 
输出：
Process: heapTotal 4.52 MB heapUsed 2.37 MB rss 18.75 MB
-----------------------------------------------------------
Process: heapTotal 164.57 MB heapUsed 162.50 MB rss 180.62 MB
-----------------------------------------------------------
Process: heapTotal 325.32 MB heapUsed 322.32 MB rss 341.34 MB
-----------------------------------------------------------
Process: heapTotal 487.57 MB heapUsed 482.36 MB rss 501.69 MB
-----------------------------------------------------------
Process: heapTotal 651.58 MB heapUsed 642.33 MB rss 661.97 MB
-----------------------------------------------------------
Process: heapTotal 819.58 MB heapUsed 802.33 MB rss 822.40 MB
-----------------------------------------------------------
Process: heapTotal 995.59 MB heapUsed 962.33 MB rss 982.95 MB
-----------------------------------------------------------
Process: heapTotal 1155.59 MB heapUsed 1122.33 MB rss 1142.96 MB
-----------------------------------------------------------
Process: heapTotal 1315.59 MB heapUsed 1282.33 MB rss 1302.96 MB
-----------------------------------------------------------
Process: heapTotal 1475.60 MB heapUsed 1442.33 MB rss 1462.96 MB
-----------------------------------------------------------
Process: heapTotal 1635.60 MB heapUsed 1602.33 MB rss 1622.97 MB
-----------------------------------------------------------
Process: heapTotal 1795.61 MB heapUsed 1762.33 MB rss 1782.98 MB
-----------------------------------------------------------
Process: heapTotal 1955.61 MB heapUsed 1922.33 MB rss 1942.98 MB
-----------------------------------------------------------
Process: heapTotal 2115.61 MB heapUsed 2081.81 MB rss 2103.08 MB

<--- Last few GCs --->

[14408:000001309B6B5730]     2469 ms: Mark-sweep 2081.8 (2115.1) -> 2081.7 (2084.1) MB, 183.2 / 0.0 ms  (average mu = 0.077, current mu = 0.000) last resort GC in old space requested
[14408:000001309B6B5730]     2672 ms: Mark-sweep 2081.7 (2084.1) -> 2081.7 (2084.1) MB, 203.0 / 0.0 ms  (average mu = 0.046, current mu = 0.000) last resort GC in old space requested

<--- JS stacktrace --->

==== JS stack trace =========================================

    0: ExitFrame [pc: 00007FF7F649463D]
Security context: 0x028ae9bc08a1 <JSObject>
    1: useMem [000003391182E5A9] [D:\H5\project_demo_my\nodeTest\test\process.js:~22] [pc=00000282CF3C49FB](this=0x009ef01422f9 <JSGlobal Object>)
    2: /* anonymous */ [000003391182E6A1] [D:\H5\project_demo_my\nodeTest\test\process.js:34] [bytecode=000003391180EF51 offset=54](this=0x03391182e7d1 <Object map =
0000004199200431>,0x03391182e7d1 <Object map ...

FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
1: 00007FF7F58C232F napi_wrap+124543
2: 00007FF7F58636A6 v8::base::CPU::has_sse+34502
3: 00007FF7F5864366 v8::base::CPU::has_sse+37766
4: 00007FF7F6068C5E v8::Isolate::ReportExternalAllocationLimitReached+94
5: 00007FF7F6050CA1 v8::SharedArrayBuffer::Externalize+833
6: 00007FF7F5F1E56C v8::internal::Heap::EphemeronKeyWriteBarrierFromCode+1436
7: 00007FF7F5F1A5A0 v8::internal::Heap::AddRetainedMap+2608
8: 00007FF7F5F345AE v8::internal::Factory::AllocateRawFixedArray+94
9: 00007FF7F5F3B944 v8::internal::Factory::NewFixedArrayWithFiller+52
10: 00007FF7F5F3B901 v8::internal::Factory::NewUninitializedFixedArray+65
11: 00007FF7F5E0C69F v8::internal::FeedbackNexus::ic_state+56767
12: 00007FF7F5E1E3D5 v8::Object::GetIsolate+14101
13: 00007FF7F5E2A310 v8::Object::GetIsolate+63056
14: 00007FF7F5E0609C v8::internal::FeedbackNexus::ic_state+30652
15: 00007FF7F5CD00BA v8::internal::OrderedHashMap::ValueAt+62122
16: 00007FF7F649463D v8::internal::SetupIsolateDelegate::SetupHeap+567949
17: 00000282CF3C49FB


```


可以看到每次useMen都会导致3个值得增长；在接近2000MB的时候，无法继续分配内存，然后进程内存溢出了，连循环体都无法执行完成；
