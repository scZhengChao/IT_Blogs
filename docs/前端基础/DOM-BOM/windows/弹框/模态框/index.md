# 模态框

```纯文本 
 模态框： 已经被废弃 
 
 基本介绍： 
           showModalDialog()         (IE 4+ 支持) 
           showModelessDialog()      (IE 5+ 支持) 
            window.showModalDialog()                  方法用来创建一个显示HTML内容的模态对话框。 
           window.showModelessDialog()             方法用来创建一个显示HTML内容的非模态对话框。 
 使用方法： 
           vReturnValue = window.showModalDialog(sURL [, vArguments] [,sFeatures]) 
           vReturnValue = window.showModelessDialog(sURL [, vArguments] [,sFeatures]) 
 参数说明： 
          sURL          --  必选参数，类型：字符串。用来指定对话框要显示的文档的URL。 
          vArguments    -- 可选参数，类型：变体。用来向对话框传递参数。传递的参数类型不限，包括数组等。对话框通过 
                            window.dialogArguments来取得传递进来的参数 。 
          sFeatures     -- 可选参数，类型：字符串。用来描述对话框的外观等信息，可以使用以下的一个或几个，用分号“;”隔开。 
 ---------------- 
 1.    dialogHeight:    对话框高度，不小于100px 
 2.    dialogWidth:    对话框宽度。 
 3.    dialogLeft:     离屏幕左的距离。 
 4.    dialogTop:     离屏幕上的距离。 
 5.    center:          { yes | no | 1 | 0 } ：              是否居中，默认yes，但仍可以指定高度和宽度。 
 6.    help:             {yes | no | 1 | 0 }：                是否显示帮助按钮，默认yes。 
 7.    resizable:       {yes | no | 1 | 0 } [IE5+]：     是否可被改变大小。默认no。 
 8.    status:          {yes | no | 1 | 0 } [IE5+]：      是否显示状态栏。默认为yes[ Modeless]或no[Modal]。 
 9.    scroll:            { yes | no | 1 | 0 | on | off }：是否显示滚动条。默认为yes。 
     下面几个属性是用在HTA中的，在一般的网页中一般不使用。 
 10.    dialogHide:{ yes | no | 1 | 0 | on | off }：在打印或者打印预览时对话框是否隐藏。默认为no。 
 11.    edge:{ sunken | raised }：指明对话框的边框样式。默认为raised。 
 12.    unadorned:{ yes | no | 1 | 0 | on | off }：默认为no。 
 
 window.showModalDialog("http://localhost/Ecma/resize.html",'',"dialogWidth=900px;dialogHeight=600px;dialogLeft=100px;dialogTop=100px;resizable=yes;status=no;scroll=no"); 
 
 
 参数传递： 
 1. 要想对话框传递参数，是通过vArguments来进行传递 的。类型不限制，对于字符串类型，最大为4096个字符 。也可以传递对象，例如： 
 ------------------------------- 
 parent.htm 
 <script> 
           var obj = new Object(); 
           obj.name="51js"; 
           window.showModalDialog("modal.htm",obj,"dialogWidth=200px;dialogHeight=100px"); 
 </script> 
 modal.htm 
 <script> 
           var obj = window.dialogArguments 
           alert("您传递的参数为：" + obj.name) 
 </script> 
 ------------------------------- 
 2.可以通过window.returnValue向打开对话框的窗口返回信息，当然也可以是对象。例如： 
 ------------------------------ 
 parent.htm 
 <script> 
           str =window.showModalDialog("modal.htm",,"dialogWidth=200px;dialogHeight=100px"); 
           alert(str); 
 </script> 
 modal.htm 
 <script> 
           window.returnValue="http://homepage.yesky.com"; 
 </script> 
 常见技巧： 
 一、怎样才让在showModalDialog和showModelessDialog的超连接不弹出新窗口？ 
 　　在被打开的网页里加 上<base target="_self">就可以了。这句话一般是放在<head>之间的。 
 二、怎样才刷新showModalDialog和showModelessDialog里的内容？ 
 　 　在showModalDialog和showModelessDialog里是不能按F5刷新的，又不能弹出菜单。这个只能依靠 
 javascript了，以下是相关代码： 
 <body οnkeydοwn="if (event.keyCode==116){reload.click()}"> 
 <a id="reload" href="filename.htm" style="display:none">reload...</a> 
 　　将filename.htm替换成网页的名字然后将它放到你打开的网页里，按F5就可以刷新了，注意，这个要 
 配合<base target="_self">使用，不然你按下F5会弹出新窗口的。 
 三、如何用javascript关掉showModalDialog(或showModelessDialog)打开的窗口。 
 　 　<input type="button" value="关闭" οnclick="window.close()"> 
 　　也要配合<base target="_self">，不然会打开一个新的IE窗口，然后再关掉的。 
 四、 Math.random与showModalDialog。 
    当你设置的弹出网页固定时（如上面的"modal.htm"页面），ie很可能到临时文件区，下载上次产生的该页面(openPage.html),而没有重新加载， 
    对于动态加载的页面来说，这样往往产生误会，如没有及时更新数据，也就更不利于开发者测试。所以，你可以采用如下方式： 
        var strPage = “/medal.htm?random="+Math.random(); 
    这样每次产生的strPage是不一样的，原因也就不言自明了。 
 
 至于showModalDialog()与showModelessDialog()的区别: 
      在于showModalDialog()打开的窗口（简称模式窗口），置在父窗口上，必须关闭才能访问父窗口(建议尽量少用，以免招人反感)； 
     showModelessDialog()（简称无模式窗口），打开后不必关闭也可访问父窗口打开的窗口。 
 
 九、 比较灵活的HTA窗口 
 我简单介绍一下，HTA的全名为HTML Application，翻译过来就是HTML应用程序， 
 你只要简单的用.hta为扩展名保存HTML页面就算创建了一个HTA文件，下面我们就用HTA 来编个窗口，将以下这段代码保存为.hta文件，然后再用浏览器打开，会发现什么？买个关子，自己去瞧瞧。 
 <HTML> 
 <HEAD> 
 <TITLE>www.fwcn.com</TITLE> 
 <HTA:APPLICATION ID="oHTA" 
 APPLICATIONNAME="myApp" 
 　　BORDER="thin" 
 　　BORDERSTYLE="normal" 
 　　CAPTION="yes" 
 　　ICON="filename.ico" 
 　　MAXIMIZEBUTTON="yes" 
 　　MINIMIZEBUTTON="yes" 
 　　SHOWINTASKBAR="no" 
 　　INGLEINSTANCE="no" 
 　　SYSMENU="yes" 
 　　VERSION="1.0" 
 　　WINDOWSTATE="normal" /> 
 </HEAD> 
 <BODY> 
 <b>www.fwcn.com</b> 
 </BODY> 
 </HTML> 
 有人会发现上面这些代码与平时的html有点不同，多了HTA:APPLICATION标签，这就是关键之处，hta通过它来提供一系列面向应用程序的功能，接下来再讲一讲它的属性（我的头又在发胀） 
 APPLICATIONNAME属性(applicationName) 
 　　此属性为设置HTA的名称。 
 　　BORDER属性(border) 
 　　此属性为设置为HTA的窗口边框类型，默认值为 thick。 
 　　它可以设为　thick 指定窗口为粗边框 
 　　　　　　　　dialog window 指定窗口为对话框 
 　　　　　　　　none 指定窗口无边框 
 　　　　　　　　thin 指定窗口为窄边框 
 BORDERSTYLE属性(borderStyle) 
 　　此属性为设置HTA窗口的边框格式，默认值为 normal。 
 　　它可以设为 
 　　 normal 普通边框格式 
 　　 complex 凹凸格式组合边框 
 　　 raised 凸出的3D边框 
 　　 static 3D边框格式 
 　　 sunken 凹进的3D边框 
 CAPTION属性(caption) 
 　　此属性为设置HTA窗口是否显示标题栏或标题，默认值为 yes。 
 ICON属性(icon) 
 　　此属性为设置应用程序的图标。 
 MAXIMIZEBUTTON属性(maximizeButton) 
 　　此属性为设置是否在HTA窗口中显示最大化按钮，默认值为 yes。 
 MINIMIZEBUTTON属性(minimizeButton) 
 　　此属性为设置是否在HTA窗口中显示最小化按钮，默认值为 yes。 
 SHOWINTASKBAR属性(showInTaskBar) 
 　　此属性为设置是否在任务栏中显示此应用程序，默认值为 yes。 
 SINGLEINSTANCE属性(singleInstance) 
 　　此属性为设置是否此应用程序同时只能运行一次。次属性以APPLICATIONNAME属性作为标识，默认值为 no。 
 SYSMENU属性(sysMenu) 
 　　此属性为设置是否在HTA窗口中显示系统菜单，默认值为 yes。 
 VERSION属性(version) 
 　　此属性为设置应用程序的版本，默认值为空。 
 WINDOWSTATE属性(windowState) 
 　　此属性为设置HTA窗口的初始大小，默认值为 normal。 
 　　它可以设为 normal 默认大小 
 　　　　　　　 minmize 最小化 
 　　　　　　　 maximize 最大化 
 以上括号中的是在脚本引用的属性。在脚本中以上属性皆为只读属性。此外，在脚本中还可以使用commandLine属性来检索应用程序启动时的参数。 
 在HTA中还可以继续使用html中的绝大多数标签、脚本等。 

```
