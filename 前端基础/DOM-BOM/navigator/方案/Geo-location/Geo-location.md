# Geo-location

地理定位 API 允许我们**访问用户的位置**。如果你正在构建与地图或基于位置的服务相关的任何内容，这将非常有用。

```react tsx 
navigator.geolocation.getCurrentPosition(({ coords }) => {
  console.log(coords.latitude, coords.longitude);
});

```


可以使用以下方式请求地理位置权限：

```react tsx 
navigator.permissions.query({ name: "geolocation" }).then((result) => {
    if (result.state === "granted") {
      // now you can use geolocation api
    } 
  });

```
