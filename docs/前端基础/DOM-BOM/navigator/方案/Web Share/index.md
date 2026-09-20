# Web Share

`Web Share API`允许我们将文本、链接甚至文件从网页分享到设备上安装的其他应用程序。

```react tsx 
async function shareHandler() {
  navigator.share({
    title: "Tapajyoti Bose | Portfolio",
    text: "Check out my website",
    url: "https://tapajyoti-bose.vercel.app/",
  });
}

```


**注意：要使用Web Share API，需要用户的交互。例如，按钮点击或触摸事件。**
