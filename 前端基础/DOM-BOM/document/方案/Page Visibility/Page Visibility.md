# Page Visibility

页面可见性 API 允许我们检查**页面对用户是否可见**。当你想要暂停视频时，这非常有用。有两种方法来进行此检查：

```react tsx 
// Method 1
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    document.title = "Visible";
    return;
  }
  document.title = "Not Visible";
});


// Method 2
window.addEventListener("blur", () => {
  document.title = "Not Visible";
});
window.addEventListener("focus", () => {
  document.title = "Visible";
});

```


两种方法的区别在于，

- 第二种方法将在您切换到**另一个应用程序**或**不同的标签时**触发，
- 而第一种方法**只会**在我们**切换到另一个标签时触发**。
