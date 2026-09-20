# 异步难题：前端并发控制全解析

## 目录

- [问题](#问题)
- [Promise](#Promise)
  - [方法1 全部并发](#方法1-全部并发)
  - [方法2 分批并发](#方法2-分批并发)
  - [方法3 限制并发](#方法3-限制并发)
- [callback](#callback)
- [总结](#总结)

本文讲解Promise，callback，RxJS多种方式实现并发限制，通过示例循序渐进讲解，如何实现带数量限制的并发请求，这来源于笔者业务中的真实场景，同时也是一道前端面试题，作为面试题的话，一般是考察对`Promise`的理解。

## 问题

笔者的业务中，经常存在通过一堆`ids`，批量获取的场景，其中最复杂的一个场景是获取数千个手机号的数据，对于这种场景，发送请求并不容易。

这里先交代下背景 **，笔者的系统是运行在 http2 上的，由于 http2 支持并发处理**，所以在笔者的系统里，后端接口设计是基于这个假设的，后端不会提供批量获取的接口，需要前端通过 id 来逐个获取。

当同时发送上千个请求时，浏览器会变的明显卡顿，虽然这样发送可以更快的获取数据，但会带来不好的用户体验，笔者的解决方案是，给并发添加最大数量限制。

这里我们将问题定义为，给你`ids`和并发限制`max`，一般作为面试题，会让你直接实现如下的函数：

```javascript 
function gets(ids, max) {
}

```


补充一点，**如果是 http1.1，浏览器会有默认的并发限制，并不需要我们处理这个问题，比如Chrome 中并发数量是6个，所以这个问题的成立，建立在 http2 的基础上，如果是在面试中，不要忘了提这个知识点。**

## Promise

目前来说，Promise是最通用的方案，一般我们最先想到`Promise.all`，当然最好是使用新出的`Promise.allsettled`。

下面简单介绍下二者的区别，假如存在某个请求失败时，`all`会整体失败，而`allsettled`只会让单个请求失败，对于大部分情况来说，`allsettled`的是更好的选择，因为`allsettled`更为灵活，一般来说面对这种情况，总共有三种处理方式，如下所示，`all`只能支持第一种，而`allsettled`三种都支持：

- 整体失败
- 最终结果，过滤失败的选项
- 将单个失败的保留，并渲染到UI中

##### 方法1 全部并发

直接使用`Promise.all`是最简单的，代码如下，然后`all`并没有并发控制能力，一瞬间会将全部请求发出，从而造成前面提到的浏览器卡顿问题。

这里`get`函数我们使用`setTimeout`+随机时间来模拟请求，其返回promise实例。

```javascript 
function gets(ids, max) {
  return Promise.all(ids.map(id => get(id)))
}

function get(id) {
  return new Promise((resolve) => {
    setTimeout(() => { resolve({ id }) }, Math.ceil(Math.random() * 5))
  });
}

```


##### 方法2 分批并发

你可能会想到一种分批发送的办法，将请求按`max`数量分成N个组，每组并行发送，这需要结合递归和`Promise.all`，示例代码如下：

```javascript 
function gets(ids, max) {
  let index = 0;
  const result = [];

  function nextBatch() {
    const batch = ids.slice(index, index + max);
    index += max;

    return Promise.all(batch.map(get)).then((res) => {
      result.push(...res);
      if (index < ids.length) {
        return nextBatch();
      }
      return result;
    });
  }

  return nextBatch();
}

```


这种方法的优势在于实现相对简单，容易理解。**但是它的缺点是，每一批请求中的最慢的请求会决定整个批次的完成时间，这可能会导致一些批次的其他请求早早完成后需要等待，从而降低整体的并发效率。**

这种方法在业务中是不太能接受的，面试中的话，也只能勉强及格。

##### 方法3 限制并发

一个更高效的思路是使用异步并发控制，而不是简单的批处理。这种**方法可以在任何时刻都保持最大数量的并发请求，而不需要等待整个批次完成。这需要我们维护一个请求池，在每个请求完成时，将下一个请求添加到请求池中，** 示例代码如下：

`gets`函数返回一个promise，在请求全部完成后，promise变为`fulfilled`状态；内部采用递归，每个请求成功和失败后，发送下一个请求；在最下面先发送`max`个请求到请求池中。

```javascript 
function gets(ids, max) {
  return new Promise((resolve) => {
    const res = [];
    let loadcount = 0;
    let curIndex = 0;
    function load(id, index) {
      return get(id).then(
        (data) => {
          loadcount++;
          if (loadcount === ids.length) {
            res[index] = data;
            resolve(res);
          } else {
            curIndex++;
            load(ids[curIndex]);
          }
        },
        (err) => {
          res[index] = err;
          loadcount++;
          curIndex++;
          load(ids[curIndex]);
        }
      );
    }

    for (let i = 0; i < max && i < ids.length; i++) {
      curIndex = i;
      load(ids[i], i);
    }
  });
}

```


当然这个代码还有其他实现方式，这里是笔者习惯的方式，聪明的你快来想想其他实现方式吧。

## callback

在Promise之前，js中的异步都是基于回调函数的，比如 jQuery 的 ajax，Node.js 中的 http 模块等。

茴字有多种写法，下面我们挑战一下使用callback来解决这个问题。下面我们先把`get`函数改造一下，基于回调函数的`get`如下所示：

```javascript 
function get(id, success, error) {
  setTimeout(() => success({ id }), Math.ceil(Math.random() * 5))
}

```


`gets`函数的接口也要改成回调函数，如下所示：

```javascript 
function gets(ids, max, success, error) {}

```


回调函数也是基于上面的思路，把上面的代码稍加改动即可，将其中的Promise换成`callback`，示例如下：

还记得前面让你想其他思路吗，还有一种结合递归和异步函数的方法，在Promise下会比这种方法更简单，但其实还是这个思路更好，Promise和callback都可以使用。

```javascript 
function gets(ids, max, success, error) {
  const res = [];
  let loadcount = 0;
  let curIndex = 0;
  function load(id, index) {
    return get(
      id,
      (data) => {
        loadcount++;
        if (loadcount === ids.length) {
          res[index] = data;
          success(res);
        } else {
          curIndex++;
          load(ids[curIndex]);
        }
      },
      (err) => {
        res[index] = err;
        loadcount++;
        curIndex++;
        load(ids[curIndex]);
      }
    );
  }

  for (let i = 0; i < max && i < ids.length; i++) {
    curIndex = i;
    load(ids[i], i);
  }
}

```


## 总结

在本文中，我们探讨了使用Promise，callback和RxJS的方式实现并发限制，每种方式中又介绍了三种代码思路，包括全部并发、分批并发以及限制并发。每种方法都有其适用场景和优缺点：

- **全部并发**适用于需要将请求分批次处理的场景，简单易懂，但可能不是最高效的方法。
- **分批并发**在保持一定并发度的同时，避免同时发出过多的请求，适用于需要控制资源消耗的场景。
- **限制并发**则结合了并发的高效性和结果顺序的一致性，适用于对结果顺序有要求的并发请求处理。

通过选择合适的方法，我们可以在保证性能的同时，满足不同场景下对并发控制的需求。

再次给大家安利RxJS，RxJS作为一个强大的响应式编程库，为我们提供了灵活而强大的工具来处理这些复杂的异步逻辑。

文章的最后，我想引申下请求层的概念，在实际项目中，请求层的设计和实现对整个应用的性能和稳定性至关重要。一个健壮的请求层不仅能够处理基本的数据请求和响应，还能够应对各种复杂的网络环境和业务需求。以下是请求层可以处理的一些常见问题：

- **失败和错误处理**：优雅地处理请求失败和服务器返回的错误，提升用户体验。
- **失败重试**：在请求失败时自动重试，增加请求的成功率。
- **接口降级**：在服务不可用时，提供备选方案，保证应用的基本功能。
- **模拟接口**：在后端服务尚未开发完成时，模拟接口响应，加速前端开发。
- **模拟列表接口**：模拟分页、排序等列表操作，方便前端调试和测试。
- **接口聚合和竞态**：合并多个接口请求，减少网络开销；处理接口请求的竞态问题，确保数据的一致性。
- **逻辑聚合**：将多个资源的创建和更新等操作聚合成一个请求，简化前端逻辑。
- **控制并发数量**：限制同时进行的请求数量，避免过度消耗资源。
- **前端分页**：在前端进行数据分页，减轻后端压力。
- **超时设置**：为每个请求设置超时时间，防止长时间等待。

通过在请求层中实现这些功能，我们可以使得前端应用更加稳定和可靠，同时也提升了用户的体验。因此，**加强请求层的建设**是每个前端项目都应该重视的一个方面。
