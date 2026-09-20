# Accelerometer

加速度计API允许我们访问设备的**加速度数据**。这可以用来创建使用设备的**动作控制**或者在**用户摇动设备时添加交互**的游戏，可能性无限！

```react tsx 
const acl = new Accelerometer({ frequency: 60 });

acl.addEventListener("reading", () => {
  const vector = [acl.x, acl.y, acl.z];
  const magnitude = Math.sqrt(vector.reduce((s, v) => s + v * v, 0));
  if (magnitude > THRESHOLD) {
    console.log("I feel dizzy!");
  }
});

acl.start();

```


可以使用以下方式**请求加速度计权限**：

```react tsx 
navigator.permissions.query({ name: "accelerometer" }).then((result) => {
    if (result.state === "granted") {
      // now you can use accelerometer api
    } 
  });

```
