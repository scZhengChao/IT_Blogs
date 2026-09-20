# vscode

## 目录

- [点击去后退出文件](#点击去后退出文件)
- [插件：](#插件)
  - [1.HTML Snippets](#1HTML-Snippets)
  - [2. element-ui 快速补全](#2-element-ui-快速补全)
  - [5.filesize   ](#5filesize)
  - [6.注释](#6注释)
  - [8.小程序开发插件](#8小程序开发插件)
  - [9.GitLens   ](#9GitLens-)
  - [10. jsx  React](#10-jsx-React)
  - [11.react 扩展键：  ](#11react扩展键-)
  - [12. 自动导入：](#12自动导入)
  - [13. Rainbow Fart  ](#13-Rainbow-Fart-)
  - [15. eslint 快速修复 vscode](#15-eslint-快速修复-vscode)
  - [16:Better Comments(更加人性化的注释)](#16Better-Comments更加人性化的注释)
  - [3. Bracket Pair Colorizer (标签匹配 括号匹配插件](#3-Bracket-Pair-Colorizer-标签匹配-括号匹配插件)
  - [4. Material Theme](#4-Material-Theme)
  - [ Stylelint](#Stylelint)
  - [7. Markdownlint + docsify](#7-Markdownlint--docsify)
  - [8. TODO Highlight](#8-TODO-Highlight)
  - [Import Cost](#Import-Cost)
  - [10. Highlight Matching Tag](#10-Highlight-Matching-Tag)
  - [GraphQL for VSCode](#GraphQL-for-VSCode)
  - [13. Indent-Rainbow](#13-Indent-Rainbow)
  - [14. Color Highlight](#14-Color-Highlight)
  - [25. Material Icon Theme](#25-Material-Icon-Theme)
  - [ IntelliSense for CSS Class Names in HTML](#IntelliSense-for-CSS-Class-Names-in-HTML)
  - [Path Intellisense](#Path-Intellisense)
  - [Polacode](#Polacode)
  - [Git History](#Git-History)

## 点击去后退出文件

- Windows：（好像是）Alt + ←
- Mac：Control + -

## 插件：

### 1.HTML Snippets

- vue 里标签闭合:插件    
- 配置:   settings.json "files.associations": {" \*.vue":"html"}

### 2. element-ui 快速补全

- 插件:   Element UI Snippets
- 使用:   etable  e开头会有自动提示

3.css转rem

### 5.filesize   

cssrem&#x20;

在底部状态栏显示当前文件大小，点击后还可以看到详细创建、修改时间

### 6.注释

    安装插件KoroFileHeader

    在vscode左下角点击设置按钮，选择“设置”，然后输入“fileheader”,

    随便点击哪个"在setting.json"中编辑，输入以下设置后保存，然后重启vscode更新设置：

    // 文件头部注释

    "fileheader.customMade": {

        "Descripttion":"",

        "version":"",

        "Author":"sueRimn",

        "Date":"Do not edit",

        "LastEditors":"sueRimn",

        "LastEditTime":"Do not Edit"

    },

    //函数注释

    "fileheader.cursorMode": {

        "name":"",

        "test":"test font",

        "msg":"",

        "param":"",

        "return":""

    }

    文件头部注释：快捷键：crtl+alt+i（window）, 函数注释：ctrl+alt+t (window),

### 8.小程序开发插件

minapp  

    支持微信小程序标签、属性的智能补全，并且提示中包含文档内容（同时支持原生小程序、mpvue 和 wepy 框架，并提供 snippets）

    wechat-snippet

    这个插件主要的功能就是代码辅助，代码片段自动完成，可以作为上个插件的补充。

    wxml

    这款插件用于将wxml代码进行高亮显示，并且提供代码格式化的功能，可将代码格式化为较易阅读的样式。

### 9.GitLens   

git结合vscode

### 10. jsx  React

    文件--首选项--设置--用户设置，输入emmet.includeLanguages搜索，点击圈住的地方，编辑settings.json

    添加：

    "emmet.includeLanguages": {

             "javascript": "javascriptreact"

    }

    jsx 语法主动补全标签

### 11.react 扩展键： &#x20;

ES7 React/Redux/GraphQL/React-Native snippets     rpec/rpc

### 12. 自动导入：

  auto import 

### 13. Rainbow Fart &#x20;

根据关键字 播放接近代码的含义

    1. 从 VSCode 扩展商店 搜索下载并安装。

    2. 在 VSCode 的菜单栏中找到 查看 - 命令面板，或使用快捷键 Ctrl + Shift + P（MacOS Command + Shift + P）呼出 命令面板。

    3. 在 命令面板 中输入 > Enable Rainbow Fart 并回车。

    4. 此时应该会弹出一个消息通知，点击通知上的 Open 按钮。

    5. 在打开的页面上点击 授权。

    6. 请尝试在 VSCode 中输入 function 关键字。

    打开的页面必须保持；关掉就没有了

14\. 一次性找出文所有的当前选中的单词: Ctrl + Shift + L

[https://www.cnblogs.com/SupremeGIS-Developer/p/13912087.html](https://www.cnblogs.com/SupremeGIS-Developer/p/13912087.html "https://www.cnblogs.com/SupremeGIS-Developer/p/13912087.html")

.   ctrl/command + \~ 控制终端的现实隐藏

### 15. eslint 快速修复 vscode

    在设置里 搜索 setting 在文件中打开 ：

    //autoFixedOnSave 设置已废弃，采用如下新的设置

    "editor.codeActionsOnSave": {

        "source.fixAll.eslint": true

    },

    安装eslint 插件；

    可以重启一下；然后右下角有个eslint的图标；同意一下；

    至此安装完成；可以省去很多格式上的错误

[提高开发效率的27个vscode插件](https://www.toutiao.com/i6890405157943640580/?tt_from=weixin\&utm_campaign=client_share\&wxshare_count=1\&timestamp=1611970903\&app=news_article\&utm_source=weixin\&utm_medium=toutiao_android\&use_new_style=1\&req_id=202101300941420101501052271D2F179B\&share_token=96e5cec6-8bf2-46ee-b943-0e741d3fd8d3\&group_id=6890405157943640580 "提高开发效率的27个vscode插件")

### 16:Better Comments(更加人性化的注释)

如果喜欢在代码中编写注释，那么有时你可能会发现搜索您以前编写的特定注释的位置是令人沮丧的，因为代码可能会变得有些拥挤。

![  ](./assets/image/e40226a2f97fff8758a512db4e07aa7d_XVcD12Vvvk.png "  ")

在setting.json 中 编辑

```javascript 
     "better-comments.tags": [
        {
            "tag": "!",
            "color": "#FF2D00",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false
        },
        {
            "tag": "?",
            "color": "#3498DB",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false
        },
        {
            "tag": "//",
            "color": "#474747",
            "strikethrough": true,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false
        },
        {
            "tag": "todo",
            "color": "#FF8C00",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false
        },
        {
            "tag": "*",
            "color": "#98C379",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false
        },
        {
            "tag": ":",
            "color": "#54f",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false
        },
        {
            "tag": "@",
            "color": "#fffae5",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false
        },
        {
            "tag": "#",
            "color": "#98f",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false
        },
        {
            "tag": "=>",
            "color": "#5f9",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false
        }
    ],
```


### **3. Bracket Pair Colorizer (标签匹配 括号匹配插件**

### **4. Material Theme**

Material Theme是一个史诗主题，可以直接安装到VSCode中，安装后代码看起来像这样：&#x20;

### \*\* \*\*​**Stylelint**

对我来说，出于以下几个原因，stylelint 在我所有的项目中都是必须的：&#x20;

1. 它有助于避免错误。
2. 它加强了CSS中的样式约定。
3. 它与Prettier支持并驾齐驱。
4. 它支持 CSS/SCSS/Sass/Less。
5. 它支持社区编写的插件。

### **7. Markdownlint + docsify**

markdown 爱好者一定要试试 vscode 上的 markdownlint 扩展，会用绿色波浪线给你提示出 N 多不符合书写规范的地方，比如：&#x20;

- 标题下面必须是个空行
- 代码段必须加上类型
- 文中不能出现\<br>这种html标号
- URL必须用< >扩起来

### **8. TODO Highlight**

如果习惯在应用程序代码中编写待办事项的开发者，可以安装 TODO Highlight 这样的扩展名对于突出显示整个项目中设置的待办事项非常有用。&#x20;

### **Import Cost**

Import Cost 可以显示咱们在

VS

代码编辑器中导入的程序包的大小。&#x20;

### **10. Highlight Matching Tag**

有时，试图匹配标签的结束地方会令人沮丧，这时 Highlight Matching Tag 就派上用场了&#x20;

### **GraphQL for VSCode**

GraphQL一直在发展，咱们经常可以在 JS 社区中看到它的身影。因此，最好开始考虑在 VSCode中安装 GraphQL for VSCode。&#x20;

### **13. Indent-Rainbow**

Indent-Rainbow 会给缩进添加一种颜色,让你更加直观的看到代码层次&#x20;

### **14. Color Highlight**

Color Highlight 可以在代码中突出显示颜色，如下所示：&#x20;

### **25. Material Icon Theme**

与其他图标主题相比，我更喜欢 Material Icon Theme，因为文件类型更为明显，尤其是在使用深色主题。&#x20;

### \*\* \*\*​**IntelliSense for CSS Class Names in HTML**

IntelliSense for CSS Class Names in HTML，基于在工作空间中找到的定义性，并提供了CSS 类名补全。&#x20;

### **Path Intellisense**

Path Intellisense 自动路劲补全。&#x20;

### Polacode

1、打开VSCode中的插件，搜索Polacode&#x20;

2、点击install进行安装&#x20;

3、安装完成后,先打开你要分享的代码,然后按Ctrl + Shift + p 打开命令面板,然后再输入框中输入Polacode,就可以打开使用了&#x20;

### Git History

在使用git的时候，经常需要查看**修改记录，或者需要查看谁提交了什么文件等**，当然可以到存放git代码的目录查看，但这样很不方便.  git history 直接右键可视化直接查看；对比修改非常方便

[debug调适代码](./debug调适代码.md "debug调适代码")

[GitLens](./GitLens.md "GitLens")

插件（原笔记未收录）
