# defer

此实用程序允许您**通过传递 Promise 而不是已解析的值来延迟**从加载器返回的值。

```javascript 
async function loader() {
  let product = await getProduct();
  let reviews = getProductReviews();
  return defer({ product, reviews });
}

```


有关更多信息，请参阅[延迟指南](https://reactrouter.com.cn/en/main/guides/deferred "延迟指南")。
