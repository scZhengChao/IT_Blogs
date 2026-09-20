# PerformanceObserver

PerformanceObserver**观察性能测量事件，监听新的性能条目。**

```vue 
 // 观察者的选项（观察哪些突变）
const config = {
  entryTypes: ['resource', 'mark', 'measure']
};

const observer = new PerformanceObserver(list => {
  list.getEntries().forEach(entry => {
    // 在控制台上显示每个报告的测量
    console.log(
      `Name: ${entry.name}`,
      `Type: ${entry.entryType}`,
      `Start: ${entry.startTime}`,
      `Duration: ${entry.duration}`,
    );
  });
});

// 开始观察
observer.observe(config);
performance.mark('registered-observer');
```


这对于**接收性能通知很有用**，可以在**空闲时间运行，而不与关键的渲染工作竞争。**

[如何统计页面的 long task(长任务)](<如何统计页面的 long task(长任务).md> "如何统计页面的 long task(长任务)")

[PerformanceObserver 如何测量页面性能](<PerformanceObserver 如何测量页面性能.md> "PerformanceObserver 如何测量页面性能")
