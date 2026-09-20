# mxResources

## 目录

- [主要功能](#主要功能)
- [常用方法](#常用方法)
  - [mxResources.load](#mxResourcesload)
  - [mxResources.get](#mxResourcesget)
- [示例代码](#示例代码)
  - [资源文件（resources\_en.json）](#资源文件resources_enjson)
  - [HTML 文件](#HTML-文件)
- [代码解释](#代码解释)
- [使用场景](#使用场景)

`mxResources`是`mxGraph`库中用于**处理资源管理和国际化（i18n）的一个**核心工具类。它允许开发者轻松地管理和加载不同语言的文本资源，从而实现应用程序的多语言支持。以下从多个方面详细介绍`mxResources`。

### 主要功能

- **资源加载**：可以从外部文件或 JavaScript **对象中加载资源文**件，这些资源文件通常包含了应用程序中使用的各种文本信息，如按钮标签、提示信息等。
- **资源获取**：提供了便捷**的方法来获取已加载的资源**，根据键值对的方式来获取对应的文本内容。
- **国际化支持**：通过加载不同语言的资源文件，`mxResources`可以帮助开发者实现应用程序的国际化，根据用户的语言设置显示相应的文本。

### 常用方法

#### `mxResources.load`

用于加载资源文件，支持异步加载。

```javascript 
mxResources.load(url, callback);
```


- **参数说明**：
  - `url`：必需参数，资源文件的 URL 地址，可以是本地文件路径或远程服务器地址。
  - `callback`：可选参数，是一个回调函数，当资源文件加载完成后会调用该函数。

#### `mxResources.get`

用于获取已加载资源中的文本内容。

```javascript 
mxResources.get(key, defaultValue);
```


- **参数说明**：
  - `key`：必需参数，是资源文件中定义的键，用于查找对应的文本值。
  - `defaultValue`：可选参数，如果指定的键不存在，则返回该默认值。如果不提供该参数，默认返回`null`。

### 示例代码

#### 资源文件（`resources_en.json`）

```json 
{
    "welcome": "Welcome to mxGraph!",
    "buttonLabel": "Click me"
}
```


#### HTML 文件

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>mxResources Example</title>
    <script type="text/javascript" src="mxClient.js"></script>
</head>

<body>
    <div id="welcomeMessage"></div>
    <button id="myButton"></button>

    <script type="text/javascript">
        mxLoadResources = false;
        mxBasePath = '.';
        mxClient.link('js/mxClient.js', function () {
            // 加载资源文件
            mxResources.load('resources_en.json', function () {
                // 获取欢迎消息
                var welcomeMessage = mxResources.get('welcome', 'Default welcome message');
                // 获取按钮标签
                var buttonLabel = mxResources.get('buttonLabel', 'Default button label');

                // 更新页面元素内容
                document.getElementById('welcomeMessage').innerHTML = welcomeMessage;
                document.getElementById('myButton').innerHTML = buttonLabel;
            });
        });
    </script>
</body>

</html>
```


### 代码解释

1. **资源文件**：`resources_en.json`是一个 JSON 格式的资源文件，包含了两个键值对，分别对应欢迎消息和按钮标签。
2. **HTML 文件**：
   - 创建了一个`<div>`元素用于显示欢迎消息，以及一个`<button>`元素。
   - 使用`mxResources.load`方法加载资源文件，并在加载完成后执行回调函数。
   - 在回调函数中，使用`mxResources.get`方法获取欢迎消息和按钮标签的文本内容，并更新页面元素的内容。

### 使用场景

- **多语言应用程序**：当开发需要支持多种语言的图形应用程序时，可以使用`mxResources`加载不同语言的资源文件，根据用户的语言设置显示相应的文本。
- **文本管理**：将应用程序中使用的所有文本信息集中管理在资源文件中，方便后续的维护和更新。例如，当需要修改某个按钮的标签时，只需要修改资源文件中的对应键值对即可。
