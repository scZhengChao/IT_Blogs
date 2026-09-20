# live template

## 目录

- [简介](#简介)
- [设置我们的第一个 Live Templates](#设置我们的第一个-Live-Templates)
- [进阶使用 - 变量](#进阶使用---变量)
- [变量表达式一览表](#变量表达式一览表)
- [实用 Templates 模板](#实用-Templates-模板)
  - [React jsx 组件模板](#React-jsx-组件模板)
  - [React tsx 组件模板](#React-tsx-组件模板)
  - [then方法模板（Promise.then)](#then方法模板Promisethen)
  - [useMemoizedFn ](#useMemoizedFn-)
  - [React hooks文件模板](#React-hooks文件模板)
  - [带注释的箭头函数模板](#带注释的箭头函数模板)
  - [TODO标准注释模板](#TODO标准注释模板)
- [groovy](#groovy)
  - [取出当前文件所属文件夹名](#取出当前文件所属文件夹名)

### **简介**

在日常开发中，你是否因为新建一个 react 组件需要写大量的重复代码而烦恼过。

一个简单 react 组件：

```react tsx 
import { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './index.less'：
const cx = classNames.bind(styles);
interface IndexProps {

}
const Index = memo<IndexProps>((props) => {
  return <div className={cx(``''``)}></div>
});
Index.displayName = 'Index'``;
export default Index;
```


相信以你微信红包一个也没抢到的手速，写完上面一段代码可能需要1分钟。部分机智的同学会想到 CV 大法好呀，轻松提速80%。

但是 CV 大法拿过来的代码，它需要删减掉不必要的内容啊，我懒癌，删不动怎么办？我就想 1s 完成新文件的初始化可以吗？

可以的。Live Templates 就是一个通过 *Tab* 键，将关键字自动转换为代码块的小工具，1s 完成 tsx 文件内容的初始化，让你的懒癌直接进入晚期。

### 设置我们的第一个 Live Templates

1. 依次打开IDEA \*File > **`Settings `**> **`Editor `**> \**`Live Templates`* 进入编辑界面，点击 **+** 的菜单中选择 Live Template 开始创建。

此处的 Template Group 用作创建 Live Template 分组（理解为文件夹)。

![](../image/image_E5ASC2PEKC.png)

1. 填入 Abbreviation 快捷键 Tab 触发的关键字，如示例为tsx，则实际使用时，用tsx作为触发关键字。（【划重点】)
2. 粘贴 Template text，想要在 Tab 触发时自动生成的代码。（【划重点】)

![](../image/image_9UZwY-bHdF.png)

1. 配置live template生效文件。**点击 Define 展开中勾选 JavaScript and TypeScript、TypeScript。（【划重点】)**

![](../image/image_6L1TTU_n1Q.png)

1. 点击 Apply 保存并应用，我们就能开心的在 tsx 文件中使用 *tsx* 关键字快速取得想要的代码块。

![](../image/image_tY2L_t56r4.png)

![](../image/image_CLWkBt5k7d.png)

### **进阶使用 - 变量**

变量的作用是，在自动生成代码后，光标可以自动移动到变量所在位置并选中变量，也可以使用IDEA提供的内置变量，快速获取系统参数、文件名称等功能。

**变量语法：\$**$变量名$**\$**

![](../image/image_Yith4Adf8s.png)

使用变量语法申明变量，点击 Edit variables 进入变量编辑界面。

- Expression 栏的空白格可在弹出的IDEA**内置变量表达式中选择你想使用的表达式（可选)**，将另一个变量作为表达式的组成部分也是可以的，可自行尝试
- Default value 代码块生成后，**变量的默认值**，可为空
- Skip if defined，表达式或者default value设置时，生成的代码光标不会自动聚焦到该变量位置
- 变量列表顺序，可控制生成代码块后，光标聚焦位置的先后次序。可在鼠标选中该变量后，点后右侧上下三角箭头调整前后顺序

# 变量表达式一览表

附：内置IDEA变量表达式一览表

| 表达式                                                      | 含义                                                                        |
| -------------------------------------------------------- | ------------------------------------------------------------------------- |
| annotated(\<annotation>)                                 | 返回具有指定注解的类，方法或字段名                                                         |
| arrayVariable()                                          | 返回当前范围内数组变量，最近的优先展示                                                       |
| lineCommentStart()                                       | 返回当前语言指示行注释开始的字符                                                          |
| blockCommentStart()                                      | 返回当前语言指示块注释开始的字符                                                          |
| blockCommentEnd()                                        | 返回当前语言指示块注释结束的字符                                                          |
| commentStart()                                           | 返回当前语言指示注释开始的字符，对有行注释的返回行注释开头                                             |
| commentEnd()                                             | 返回当前语言指示注释结束的字符，对有行注释的返回空（行注释通常没有结束字符）                                    |
| camelCase(\<String>)                                     | **将字符串转换为驼峰形式**                                                           |
| snakeCase(\<String>)                                     | 将字符串转换为下划线分割形式                                                            |
| spaceSeparated(\<String>)                                | 将字符串转换为空格分开形式                                                             |
| spacesToUnderscores(\<String>)                           | 将字符串的空格替换为下划线                                                             |
| capitalize(\<String>)                                    | **将字符串首字母设为大写**                                                           |
| capitalizeAndUnderscore(\<String>)                       | 将字符串转换为大写并用下划线隔开                                                          |
| decapitalize(\<String>)                                  | 将字符串首字母设为小写                                                               |
| underscoresToCamelCase(\<String>)                        | 将下划线形式字符串转换为驼峰形式                                                          |
| underscoresToSpaces(\<String>)                           | 将下划线形式字符串转换为空格隔开形式                                                        |
| lowercaseAndDash(\<String>)                              | 将字符串转为小写并使用中划线分割                                                          |
| escapeString(\<String>)                                  | 将字符串中的特殊符号进行转义，便于在java字符串中使用                                              |
| substringBefore(\<String>, \<Delimeter>)                 | 截取字符串在\<Delimeter>之前的部分                                                   |
| firstWord(\<String>)                                     | 返回字符串中的首个单词                                                               |
| castToLeftSideType()                                     | 获取左侧变量的类型判断是否需要强转                                                         |
| rightSideType()                                          | 获取右侧表达式的变量类型                                                              |
| className()                                              | 返回当前所在类（在内部类则返回内部类）类名                                                     |
| currentPackage()                                         | 返回当前所在包名                                                                  |
| qualifiedClassName()                                     | 返回当前所在类（在内部类则返回内部类）的全限定类名（包+类名）                                           |
| classNameComplete()                                      | 触发类名相关的代码补全                                                               |
| clipboard()                                              | 返回系统剪贴板的内容                                                                |
| complete()                                               | 调用一次代码补全，相当于调用一次\_Ctrl+Space\_                                            |
| completeSmart()                                          | 调用一次智能代码补全，相当于调用一次\_Ctrl+Alt+Space\_                                      |
| componentTypeOf(\<array>)                                | 返回数组类型                                                                    |
| concat(\<String>, …)                                     | **拼接字符串**                                                                 |
| date(\[format])                                          | **指定格式化方式返回当前系统时间字符串（根据\_SimpleDateFormat\_格式）**                          |
| time(\[format])                                          | **指定格式化方式返回当前系统时间字符串（无日期，根据\_SimpleDateFormat\_格式）**                      |
| descendantClassesEnum(\<String>)                         | 返回指定类的子类                                                                  |
| lineNumber()                                             | 返回当前行行号                                                                   |
| enum(\<String>, …)                                       | 返回建议的字符串列表                                                                |
| expectedType()                                           | 自动识别并返回期望的类型，一般用于赋值，方法参数，返回语句处。                                           |
| fileName()                                               | 返回当前文件名（带拓展名）                                                             |
| fileNameWithoutExtension()                               | **返回当前文件名（不带拓展名）**                                                        |
| filePath()                                               | 返回当前文件路径（带拓展名）                                                            |
| fileRelativePath()                                       | 返回当前文件相对当前项目的路径（带拓展名）                                                     |
| groovyScript(\<String>, \[arg, …])                       | 执行作为字符串形式传递的\_groovy\_脚本                                                  |
| guessElementType(\<Collection>)                          | 返回集合中元素的类型                                                                |
| iterableComponentType(\<Iterable>)                       | 返回可迭代对象的类型                                                                |
| iterableVariable()                                       | 返回当前范围内可迭代类型对象，最近的优先展示                                                    |
| methodName()                                             | 返回当前所在方法名                                                                 |
| methodParameters()                                       | 返回当前所在方法的所有参数名                                                            |
| methodReturnType()                                       | 返回当前所在方法的返回类型                                                             |
| regularExpression(\<String>, \<Pattern>, \<Replacement>) | 查找字符串中满足\<Pattern>的所有部分并替换为\<Replacement>                                 |
| typeOfVariable(\<String>)                                | 返回变量的类型                                                                   |
| variableOfType(\<String>)                                | 返回当前范围内满足类型条件的变量，最近的优先展示                                                  |
| suggestFirstVariableName(\<String>)                      | 返回当前范围内满足类型条件的部分变量，最近的优先展示和\_variableOfType\_类似但不推荐true，false，this，和super |
| subtypes(\<String>)                                      | 返回指定类型的子类型                                                                |
| suggestIndexName()                                       | 返回当前范围中未使用的第一个常用迭代下标变量名（i，j，k等）                                           |
| suggestVariableName()                                    | 根据变量命名规则的代码风格设置返回建议的变量名                                                   |
| suggestShortVariableName()                               | 建议的变量名精简版                                                                 |
| user()                                                   | **返回当前系统的用户名称**                                                           |

# **实用 Templates 模板**

## React jsx 组件模板

```javascript 
import PropTypes from 'prop-types';

const $componentName$  = props=>{
  const {
  
  } = props
  return null
}
$componentName$.propTypes = {

}
export default $componentName$

```


- componentName: capitalize(camelCase(fileNameWithoutExtension()))

## React tsx 组件模板

```react tsx 
import { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

interface $componentProps$ {
  
}

const $componentName$ = memo<$componentProps$>((props) => {
  return <div className={cx('')}></div>
});
$componentName$.displayName = '$componentName$';

export default $componentName$;
```


- componentName: capitalize(camelCase(fileNameWithoutExtension()))
- componentProps: capitalize(camelCase(concat(componentName, "Props")))

> 文件夹名字 做函数名

- componentName： capitalize(groovyScript("def path = \\"\${\_1}\\".replaceAll('\[\\\\\\\\\\\\\\\\]', '/').split('/').toList(); return  path\[path.size()-2]",fileRelativePath()))
- componentProps： capitalize(camelCase(concat(componentName, "Props")))

## then方法模板（Promise.then)

```react tsx 
then(($res$) => {
  $statement$
})
```


- res  defalutValue: "res"

## useMemoizedFn&#x20;

```react tsx 
/** 
 *  @description $descr$
 */
const $functionName$ = useMemoizedFn(($params$) => {
  $statement$
});
```


functionName  defalutValue: "fn"

## React hooks文件模板

```react tsx 
interface $hooksNameProps$ {}

/**
 * @description $description$
 */
export default function $hookName$(props: $hooksNameProps$) {

  return {}
}
```


- hookName：camelCase(fileNameWithoutExtension())
- hooksNameProps：capitalize(camelCase(concat(fileNameWithoutExtension(), "Props")))

> 文件夹名

- hookName：capitalize(groovyScript("def path = \\"\${\_1}\\".replaceAll('\[\\\\\\\\\\\\\\\\]', '/').split('/').toList(); return  path\[path.size()-2]",fileRelativePath()))
- hooksNameProps：capitalize(camelCase(concat(fileNameWithoutExtension(), "Props")))

## 带注释的箭头函数模板

```react tsx 
/** 
 *  @description $descr$
 */
const $functionName$ = () => {
  $statement$
};
```


- functionName  defalutValue: "fn"

## TODO标准注释模板

```react tsx 
/** TODO By $user$：$todo$
 *  $date$ $time$
 */
```


- user()
- date()
- time()

# groovy

### 取出当前文件所属文件夹名

```groovy 
capitalize(groovyScript("def path = \"${_1}\".replaceAll('[\\\\\\\\]', '/').split('/').toList(); return  path[path.size()-2]",fileRelativePath()))
```


或者

```groovy 
capitalize(groovyScript("def path = \"${_1}\".replaceAll('[\\\\\\\\]', '/').split('/').toList(); return  path.getAt(-2)",fileRelativePath()))
```
