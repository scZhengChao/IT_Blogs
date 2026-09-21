# 数据上报

## 目录

- [requestIdleCallback实践：在requestIdleCallback中打点](#requestIdleCallback实践在requestIdleCallback中打点)

## requestIdleCallback实践：在requestIdleCallback中打点

使用`requestIdleCallback`**延迟数据的上报，可以避免一些渲染阻塞。**

```typescript 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <input type="text" id="text" />
</body>
<script>
    const datas = []
    const text = document.getElementById('text')
    let isReporting = false

    function sleep (ms = 100) {
        let sleepSwitch = true
        let s = Date.now()
        while (sleepSwitch) {
            if (Date.now() - s > ms) {
                sleepSwitch = false
            }
        } 
    }
    function handleClick () {
        datas.push({
            date: Date.now()
        })
        // 监听用户响应的函数，需要花费150ms
        sleep(150)
        handleDataReport()
    }

    // =========================  使用requestIdleCallback  ==============================

    function handleDataReport () {
        if (isReporting) {
            return
        }
        isReporting = true
        requestIdleCallback(report)
    }

    function report (deadline) {
        isReporting = false
        while (deadline.timeRemaining() > 0 && datas.length > 0) {
            get(datas.pop())
        }
        if (datas.length) {
            handleDataReport()
        }
    }

    // =========================  使用requestIdleCallback结束  ==============================

    function get(data) {
        // 数据上报的函数，需要话费20ms
        sleep(20)
        console.log(`~~~ 数据上报 ~~~: ${data.date}`)
    }

    text.oninput = handleClick
</script>
</html>

```


![](./assets/image/image_wPg3j_QmwH.webp)

而如果不使用 `requestIdleCallback` , 直接进行数据上报，会直接卡死主线程，影响到浏览器的渲染。

原因分析：

如果使用了`requestIdleCallback`：

监听事件处理 --> 页面渲染 --> 数据上报（空闲时） --> 监听事件处理 --> 页面渲染 --> 数据上报（空闲时）

如果不使用`requestIdleCallback`：

监听事件处理 --> 数据上报（被添加到主线程中） --> 监听事件处理 --> 数据上报（被添加到主线程中） --> 监听事件处理 --> 数据上报（被添加到主线程中） --> 页面渲染
