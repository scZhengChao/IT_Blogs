# mergeAll

定义：

- `public mergeAll(concurrent: number): Observable`

与`concatAll`几乎没太大差别，**唯一不同的就是它是并行的，** 也就是合并的多个`Observable`发送数据时是不分先后的。
