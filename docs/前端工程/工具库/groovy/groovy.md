# groovy

## 目录

- [字符串定义方式](#字符串定义方式)
  - [一、单引号字符串（Single-Quoted Strings）：](#一单引号字符串Single-Quoted-Strings)
  - [二、双引号字符串（Double-Quoted Strings）：](#二双引号字符串Double-Quoted-Strings)
  - [三、三重双引号字符串（Triple-Quoted Strings）：](#三三重双引号字符串Triple-Quoted-Strings)
  - [四、字符串方法和操作：](#四字符串方法和操作)
  - [五、多行字符串插值：](#五多行字符串插值)
  - [六、转义字符：](#六转义字符)
- [ IDEA自定义类注释和方法注释（自定义groovyScript方法实现多行参数注释）](#-IDEA自定义类注释和方法注释自定义groovyScript方法实现多行参数注释)
  - [取出当前文件所属文件夹名](#取出当前文件所属文件夹名)

基于`java` 的扩展语法

## 字符串定义方式

### 一、单引号字符串（Single-Quoted Strings）：

在单引号字符串中，字符串**会被原样输出，不进行变量替换或**[**转义字符**](https://so.csdn.net/so/search?q=转义字符\&spm=1001.2101.3001.7020 "转义字符")**处理。**

```groovy 
def singleQuoted = 'This is a single-quoted string'

```


### 二、双引号字符串（Double-Quoted Strings）：

在双引号字符串中，可以进行**变量替换和**[**字符串插值**](https://so.csdn.net/so/search?q=字符串插值\&spm=1001.2101.3001.7020 "字符串插值")。这意味着可以在字符串中嵌入变量或表达式。

```groovy 
def name = 'Alice'
def doubleQuoted = "Hello, $name!" // 字符串插值

```


### 三、三重双引号字符串（Triple-Quoted Strings）：

三重双引号字符串**允许多行文本**，并支持字符串插值和转义字符。

```groovy 
def multilineString = """
This is a multiline
triple-quoted string.
"""

```


### 四、字符串方法和操作：

1、length() 方法：获取字符串的长度。

```groovy 
def str = "Hello, Groovy!"
def length = str.length()
println "Length of the string: $length" // 输出 Length of the string: 13

```


2、toUpperCase() 和 toLowerCase() 方法：将字符串转换为大写或小写。

```groovy 
def str = "Hello, Groovy!"
def uppercase = str.toUpperCase()
def lowercase = str.toLowerCase()
println "Uppercase: $uppercase" // 输出 Uppercase: HELLO, GROOVY!
println "Lowercase: $lowercase" // 输出 Lowercase: hello, groovy!

```


3、trim() 方法：移除字符串两端的空白字符。

```groovy 
def str = "   This is a trimmed string.   "
def trimmed = str.trim()
println "Trimmed: '$trimmed'" // 输出 Trimmed: 'This is a trimmed string.'

```


4、startsWith() 和 endsWith() 方法：检查字符串是否以指定的前缀或后缀开始或结束。

```groovy 
def str = "Hello, Groovy!"
def startsWithHello = str.startsWith("Hello")
def endsWithGroovy = str.endsWith("Groovy!")
println "Starts with 'Hello': $startsWithHello" // 输出 Starts with 'Hello': true
println "Ends with 'Groovy!': $endsWithGroovy" // 输出 Ends with 'Groovy!': true

```


5、contains() 方法：检查字符串是否包含指定的子字符串。

```groovy 
def str = "Hello, Groovy!"
def containsGroovy = str.contains("Groovy")
println "Contains 'Groovy': $containsGroovy" // 输出 Contains 'Groovy': true

```


6、replace() 方法：替换字符串中的指定子字符串为新的值。

```groovy 
def str = "Hello, Groovy!"
def replaced = str.replace("Groovy", "World")
println "Replaced: '$replaced'" // 输出 Replaced: 'Hello, World!'

```


7、substring() 方法：截取字符串的子串。

```groovy 
def str = "Hello, Groovy!"
def sub = str.substring(7, 13)
println "Substring: '$sub'" // 输出 Substring: 'Groovy!'

```


8、split() 方法：使用指定的分隔符拆分字符串为字符串数组。

```groovy 
def str = "apple,banana,cherry"
def fruits = str.split(',')
println "Fruits: $fruits" // 输出 Fruits: [apple, banana, cherry]

```


9、join() 方法：使用指定的分隔符将字符串数组合并为字符串。

```groovy 
def fruits = ['apple', 'banana', 'cherry']
def str = fruits.join(', ')
println "Fruit list: '$str'" // 输出 Fruit list: 'apple, banana, cherry'

```


10、转其他类型：使用指定的分隔符将字符串数组合并为字符串。

```groovy 
// 转list   
def word2 = "This is a groovy class"
println word2.toList()  //  [T, h, i, s,  , i, s,  , a,  , g, r, o, o, v, y,  , c, l, a, s, s]
 
// 转数组
println word2.toCharArray()  // This is a groovy class

```


11、 字符串拼接

```groovy 
// 01-字符串拼接
def name = "大海"
println name 
// 使用 + 号拼接
println "My name is " + name
// 使用 concat 拼接   
println "My name is ".concat(name)
// 使用变量语法 ${}
println "My name is ${name}"

```


12、字符串索引和长度

```groovy 
// 03-字符串索引和长度
def city = "beijing"
// 长度  length()
println city.length()
// [index] 索引
println city[2]
 
// 索引相关方法
def num = "11.13.19.01.0"
// 我只想得到11.13.19.01，怎么做
println num.substring(0, num.lastIndexOf("."));

```


### 五、多行字符串插值：

在多行字符串中，可以使用 \${} 语法进行插值，并执行 Groovy [表达式](https://so.csdn.net/so/search?q=表达式\&spm=1001.2101.3001.7020 "表达式")。

```groovy 
def item = 'apple'
def quantity = 5
def pricePerUnit = 2.5
def total = """
Item: $item
Quantity: $quantity
Total: ${quantity * pricePerUnit}
"""

```


### 六、转义字符：

Groovy 支持标准的转义字符，如 \n（换行符）、\t（制表符）等。

```groovy 
def escapedString = "This is a string with a newline:\nSecond line"

```


# &#x20;[IDEA自定义类注释和方法注释（自定义groovyScript方法实现多行参数注释）](https://www.cnblogs.com/Neil-learning/p/13169717.html "IDEA自定义类注释和方法注释（自定义groovyScript方法实现多行参数注释）")

### 取出当前文件所属文件夹名

```groovy 
capitalize(groovyScript("def path = \"${_1}\".replaceAll('[\\\\\\\\]', '/').split('/').toList(); return  path[path.size()-2]",fileRelativePath()))
```


或者

```groovy 
capitalize(groovyScript("def path = \"${_1}\".replaceAll('[\\\\\\\\]', '/').split('/').toList(); return  path.getAt(-2)",fileRelativePath()))
```
