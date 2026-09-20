# AbortController

## 目录

- [前端神器AbortController](#前端神器AbortController)
  - [一、AbortController简介](#一AbortController简介)
  - [二、使用方法](#二使用方法)
    - [1创建AbortController实例](#1创建AbortController实例)
    - [2获取AbortSignal对象](#2获取AbortSignal对象)
    - [3使用signal对象发起fetch请求](#3使用signal对象发起fetch请求)
    - [4取消fetch请求](#4取消fetch请求)
  - [三、注意事项](#三注意事项)
  - [四、使用场景示例](#四使用场景示例)
  - [五、总结](#五总结)

# [前端神器AbortController](https://segmentfault.com/a/1190000044787400 "前端神器AbortController")

在前端开发中，网络请求是不可或缺的一环。但在处理网络请求时，我们经常会遇到需要中途取消请求的情况。这时候，`AbortController` API就显得尤为重要了。本文将详细介绍`AbortController`的使用方法和注意事项，帮助大家更好地掌控网络请求。

### 一、AbortController简介

`AbortController`是一个Web API，它提供了一个信号对象（`AbortSignal`），该对象可以用来取消与`Fetch` API相关的操作。当我们创建`AbortController`实例时，会自动生成一个与之关联的`AbortSignal`对象。**我们可以将这个**\*\*`AbortSignal`****对象作为参数传递给****`fetch`\*\***函数，从而实现对网络请求的取消控制。**

### 二、使用方法

#### 1创建AbortController实例

首先，我们需要创建一个`AbortController`实例：

```javascript 
const controller = new AbortController();
```


#### 2获取AbortSignal对象

通过`AbortController`实例的`signal`属性，我们可以获取到`AbortSignal`对象：

```javascript 
const signal = controller.signal;
```


#### 3使用signal对象发起fetch请求

在调用`fetch`函数时，我们将`signal`对象作为选项对象的`signal`属性传递进去：

```javascript 
fetch(url, { signal }).then(response => {
    // 处理响应数据
}).catch(error => {
    if (error.name === 'AbortError') {
        console.log('Fetch 请求已被取消');
    } else {
        // 处理其他错误
    }
});
```


#### 4取消fetch请求

当需要取消请求时，我们只需调用`AbortController`实例的`abort`方法：

```javascript 
controller.abort();
```


调用`abort`方法后，与该`AbortController`实例关联的`fetch`请求会被中断，并在Promise链中抛出一个带有`name`属性为`AbortError`的错误。

### 三、注意事项

1. **及时清理资源** &#x20;

   当请求被取消后，确保及时清理与请求相关的资源，避免内存泄漏或其他潜在问题。
2. **错误处理** &#x20;

   在处理`fetch`请求的Promise链时，要特别注意`AbortError`的处理。确保能够区分是因取消请求而引发的错误还是其他类型的错误，以便进行正确的错误处理。
3. **多次调用abort** &#x20;

   `abort`方法可以被多次调用，但第二次及以后的调用不会有任何效果。一旦请求被取消，它将保持取消状态。
4. **与其他API的兼容性** &#x20;

   虽然`AbortController`在现代浏览器中的支持已经相当广泛，但在一些较老的浏览器版本中可能还不支持。因此，在使用`AbortController`时，要注意检查目标浏览器的兼容性情况，并考虑使用Polyfill或备选方案来确保功能的可用性。
5. **不要滥用** &#x20;

   虽然`AbortController`提供了取消请求的能力，但并不意味着我们应该滥用它。频繁地取消和重新发起请求可能会对服务器造成不必要的负担，也可能影响用户体验。因此，在使用`AbortController`时，要谨慎考虑是否真的需要取消请求，并尽量避免不必要的取消操作。

### 四、使用场景示例

下面是一个简单的使用场景示例，展示了如何在用户点击取消按钮时取消一个正在进行的fetch请求：

```javascript 
// 假设我们有一个取消按钮  
const cancelButton = document.querySelector('#cancel-button');  
  
// 创建AbortController实例和获取signal对象  
const controller = new AbortController();  
const signal = controller.signal;  
  
// 发起fetch请求  
fetch(url, { signal }).then(response => {  
    // 处理响应数据  
}).catch(error => {  
    if (error.name === 'AbortError') {  
        console.log('Fetch 请求已被取消');  
    } else {  
        // 处理其他错误  
    }  
});  
  
// 当用户点击取消按钮时，取消fetch请求  
cancelButton.addEventListener('click', () => {  
    controller.abort();  
});
```


通过这个示例，我们可以看到AbortController的使用非常简单，但却非常实用。它可以帮助我们更好地掌控网络请求，避免不必要的资源浪费和潜在问题。

### 五、总结

`AbortController`是一个强大的工具，它可以帮助我们更好地掌控网络请求，避免资源浪费和潜在问题。通过掌握其使用方法和注意事项，我们可以更加灵活地应对前端开发中的各种需求。
