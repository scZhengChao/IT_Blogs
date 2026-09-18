# getValue

## 目录

- [方法功能](#方法功能)
- [方法签名](#方法签名)
  - [针对对象](#针对对象)
  - [针对 XML 节点](#针对-XML-节点)
- [返回值](#返回值)
- [示例代码](#示例代码)
  - [针对对象的示例](#针对对象的示例)
  - [针对 XML 节点的示例](#针对-XML-节点的示例)
- [代码解释](#代码解释)
  - [对象示例](#对象示例)
  - [XML 示例](#XML-示例)
- [使用场景](#使用场景)

在`mxGraph`库中，`mxUtils.getValue`是一个实用工具方法，用于从对象或 XML 节点中获取指定属性的值。以下为你详细介绍该方法的相关内容。

### 方法功能

`mxUtils.getValue`方法的主要作用是**安全地获取对象或 XML 节点的属性值。它会处理属性不存在的情况，避免因访问不存在的属性而导致的错误，并且可以提供默认值，当属性不存在时返回该默认值。**

### 方法签名

`mxUtils.getValue`有两种常见的使用形式，分别针对对象和 XML 节点：

#### 针对对象

```javascript 
mxUtils.getValue(obj, key, defaultValue);
```


- **参数说明**：
  - `obj`：必需参数，代表要从中获取属性值的对象。
  - `key`：必需参数，是一个字符串，表示要获取的属性名。
  - `defaultValue`：可选参数，当对象中不存在指定的属性时，将返回该默认值。如果不提供该参数，默认返回`null`。

#### 针对 XML 节点

```javascript 
mxUtils.getValue(node, attr, defaultValue);
```


- **参数说明**：
  - `node`：必需参数，是一个 XML 节点对象，通常是通过 XML 解析得到的节点。
  - `attr`：必需参数，是一个字符串，表示要获取的 XML 属性名。
  - `defaultValue`：可选参数，当 XML 节点中不存在指定的属性时，将返回该默认值。如果不提供该参数，默认返回`null`。

### 返回值

如果对象或 XML 节点中存在指定的属性，则返回该属性的值；如果不存在，则返回提供的默认值（若未提供默认值则返回`null`）。

### 示例代码

#### 针对对象的示例

```javascript 
// 定义一个对象
const myObject = {
    name: 'John',
    age: 30
};

// 使用 mxUtils.getValue 获取属性值
const nameValue = mxUtils.getValue(myObject, 'name', 'Unknown');
const addressValue = mxUtils.getValue(myObject, 'address', 'No address provided');

console.log('Name:', nameValue); 
console.log('Address:', addressValue); 
```


#### 针对 XML 节点的示例

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>mxUtils.getValue XML Example</title>
    <script type="text/javascript" src="mxClient.js"></script>
    <script type="text/javascript">
        mxLoadResources = false;
        mxBasePath = '.';
        mxClient.link('js/mxClient.js', function () {
            // 创建一个 XML 字符串
            const xmlString = '<person name="Alice" age="25"></person>';
            // 解析 XML 字符串
            const xmlDoc = mxUtils.parseXml(xmlString);
            const personNode = xmlDoc.documentElement;

            // 使用 mxUtils.getValue 获取 XML 属性值
            const xmlNameValue = mxUtils.getValue(personNode, 'name', 'Unknown');
            const xmlJobValue = mxUtils.getValue(personNode, 'job', 'No job information');

            console.log('XML Name:', xmlNameValue); 
            console.log('XML Job:', xmlJobValue); 
        });
    </script>
</head>

<body>
</body>

</html>
```


### 代码解释

#### 对象示例

- 定义了一个包含`name`和`age`属性的对象`myObject`。
- 使用`mxUtils.getValue`方法分别获取`name`和`address`属性的值。由于`address`属性不存在，返回了默认值`'No address provided'`。

#### XML 示例

- 创建了一个 XML 字符串，并使用`mxUtils.parseXml`方法将其解析为 XML 文档对象。
- 获取 XML 文档的根节点`personNode`。
- 使用`mxUtils.getValue`方法分别获取`name`和`job`属性的值。由于`job`属性不存在，返回了默认值`'No job information'`。

### 使用场景

- **配置管理**：当从配置对象中获取配置项的值时，可以使用该方法确保在配置项不存在时能得到一个默认值，避免程序出错。
- **XML 数据处理**：在处理 XML 数据时，使用该方法可以安全地获取 XML 节点的属性值，处理属性缺失的情况。
