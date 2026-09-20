# ActiveXObject

## 目录

- [ActiveXObject](#ActiveXObject)
  - [一、什么是 ActiveX 控件？](#一什么是-ActiveX-控件)
  - [二、ActiveXObject对象详解](#二ActiveXObject对象详解)
  - [三、ActiveXObject的常用对象及用法：](#三ActiveXObject的常用对象及用法)

# ActiveXObject

IE 特有ActiveXObject 对象 (JS调用本地exe程序)

```javascript 
 var objShell = new ActiveXObject('WScript.Shell')
objShell.Run("cmd.exe /c start chrome www.baidu.com",0,true);
// 0 表示隐藏 cmd 窗口 1 表示开启 
// true 表示等待命令结束运行并返回,然后才会执行后面的命令
/*
  命令参数说明
  cmd.exe /c dir 是执行完dir命令后关闭命令窗口。
  cmd.exe /k dir 是执行完dir命令后不关闭命令窗口。
  cmd.exe /c start dir 会打开一个新窗口后执行dir指令，原窗口会关闭。
  cmd.exe /k start dir 会打开一个新窗口后执行dir指令，原窗口不会关闭。  
  这里的dir是start chrome www.baidu.com//用谷歌浏览器打开百度
*/
//ActionXObject只能在ie下创建
```


[https://blog.csdn.net/chu\_jian86a/article/details/83246960](https://blog.csdn.net/chu_jian86a/article/details/83246960 "https://blog.csdn.net/chu_jian86a/article/details/83246960")

## 一、什么是 ActiveX 控件？

         Microsoft ActiveX 控件是由软件提供商开发的可重用的软件组件。使用 ActiveX 控件，可以很快地在网址、台式应用程序、以及开发工具中加入特殊的功能。例如，StockTicker 控件可以用来在网页上即时地加入活动信息，动画控件可用来向网页中加入动画特性。

          现在，已有 1000 多个商用的 ActiveX 控件。开发控件可以使用各种编程语言，如 C，C++，下一代的Microsoft Visual Basic，以及微软公司的 Visual Java 开发环境 Microsoft Visual J++。ActiveX 控件一旦被开发出来，设计和开发人员就可以把它当作预装配组件，用于开发客户程序。以此种方式使用 ActiveX 控件，使用者无需知道这些组件是如何开发的，在很多情况下，甚至不需要自己编程，就可以完成网页或应用程序的设计。

\*\*            ActiveX 控件广泛用于 Internet。\*\* ​

它们可以通过提供视频、动画内容等来增加浏览的乐趣。不过，这些程序可能出问题或者向您提供不需要的内容。在某些情况下，这些程序可被用来以您不允许的方式从计算机收集信息、破坏您的计算机上的数据、在未经您同意的情况下在您的计算机上安装软件或者允许他人远程控制您的计算机。一般软件需要用户单独下载然后执行安装，而ActiveX插件是当用户浏览到特定的网页时，IE浏览器即可自动下载并提示用户安装。 ActiveX插件安装的一个前提是必须经过用户的同意及确认。考虑到这些风险，您应该在完全信任发行商的情况下才安装这些程序。

## 二、ActiveXObject对象详解

JavaScript中ActiveXObject对象是启用并返回 Automation对象的引用。

```javascript 
 //使用方法：
newObj = new ActiveXObject( servername.typename[, location])
/**
   其中newObj是必选项。要赋值为 ActiveXObject 的变量名。
      servername是必选项。提供该对象的应用程序的名称。
      typename是必选项。要创建的对象的类型或类。
      location是可选项。创建该对象的网络服务器的名称。
*/
```


Automation服务器至少提供一类对象，例如字处理应用程序可能提供应用程序对象、文档对象和工具栏对象。通常先用window\.ActiveXObject判断下浏览器是否支持ActiveXObject对象。

## 三、ActiveXObject的常用对象及用法：

```javascript 
 （1）WScript.Network
  [1]  取得机器名，登录域及登录用户名  
function getusername()     
{    
    var WshNetwork = new ActiveXObject("WScript.Network");    
    alert("Domain = " + WshNetwork.UserDomain);     
    alert("Computer Name = " + WshNetwork.ComputerName);     
    alert("User Name = " + WshNetwork.UserName);      
}    


（2）WScript.shell
[1] 取得系统目录

function getprocessnum()     
{     
    var pnsys=new ActiveXObject("WScript.shell");     
    pn=pnsys.Environment("PROCESS");     
    alert(pn("WINDIR"));     
}  
  [2]  返回系统中特殊目录的路径
function getspecialfolder()     
{     
    var mygetfolder=new ActiveXObject("WScript.shell");     
    if(mygetfolder.SpecialFolders("Fonts")!=null){     
        alert(mygetfolder.SpecialFolders("Fonts"));        
    }   
}

  [3]  启动计算器
function runcalc()     
{     
    var calc=new ActiveXObject("WScript.shell");     
    calc.Run("calc");     
}  


  [4]  注册表操作
//读注册表
function readreg()     
{     
    var myreadreg=new ActiveXObject("WScript.shell");     
    try{          alert(myreadreg.RegRead("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run\\NeroCheck"));     
    }catch(e)     {     
        alert("读取的值不存在！");     
    }     
}     
//写注册表  
function writereg() {
    var mywritereg = new ActiveXObject("WScript.shell");
    try {  mywritereg.RegWrite("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run\\MyTest","c:\\mytest.exe");
        alert("写入成功！");
    } catch (e) {
        alert("写入路径不正确！");
    }
}    

//删除注册表
function delreg()     
{     
    var mydelreg=new ActiveXObject("WScript.shell");     
    if(confirm("是否真的删除？"))     
    {     
        try{     
mydelreg.RegDelete("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run\\MyTest");     
           alert("删除成功！");     
        }     
        catch(e)     
        {     
            alert("删除路径不正确");     
        }     
    }     
}


[7]  调用exe文件
function Run(strPath)  
{     
   try     
   {     
    var objShell = new ActiveXObject("wscript.shell");     
    objShell.Run('file:///D:/Program%20Files/Tencent/QQ/QQProtect/Bin/QQProtect.exe');     
    objShell = null;     
   }     
   catch(e)  
   {  
        alert('找不到文件"'+strPath+'"(或它的组件之一)。请确定路径和文件名是否正确.')     
   }     
}  

  
（3）Scripting.filesystemobject
  [1]  取得磁盘信息 传入参数如：getdiskinfo('c')  
function getdiskinfo(para)     
{     
    var fs=new ActiveXObject("scripting.filesystemobject");     
    d=fs.GetDrive(para);     
    s="卷标:" + d.VolumeName;     
    s+="------" + "剩余空间:" + d.FreeSpace/1024/1024 + "M";     
    s+="------" + "磁盘序列号:" + d.serialnumber;     
    alert(s);   
}  




  [2]  文件操作
//取得文件信息    调用方式如：getfileinfo('c:\\test.pdf')  
function getfileinfo(para)       
{       
    var myfile=new ActiveXObject("scripting.filesystemobject");       
    var fi=myfile.GetFile(para);       
    alert("文件类型:"+fi.type+"文件大小:"+fi.size/1024/1024+"M"+"最后一次访问时间:"+fi.DateLastAccessed);       
}
//遍历目录    调用方式如：enumFolders('c:\\')
function enumFolders(para){
     var fso = new ActiveXObject("Scripting.FileSystemObject");
     var fldr = fso.GetFolder(para);
     var file = new Enumerator(fldr.files);
     var folderArr = [];
     var folder = new Enumerator(fldr.SubFolders);
     for (; !folder.atEnd(); folder.moveNext()){
            var folderStr = String(folder.item());
            folderArr.push(String(folder.item()).substring(folderStr.lastIndexOf("\\")+1,folderStr.length));
     }  
     alert(folderArr.join(" "));
}

//遍历文件    调用方式如：enumFiles('c:\\')
function enumFolders(para){
     var fso = new ActiveXObject("Scripting.FileSystemObject");
     var fldr = fso.GetFolder(para);
     var file = new Enumerator(fldr.files);
     var fileArr = [];
     for (; !file.atEnd(); file.moveNext()){
         var fileStr = String(file.item());
         fileArr.push(String(file.item()).substring(fileStr.lastIndexOf("\\")+1,fileStr.length));
     }
     alert(fileArr.join(" "));
}


  [3]  创建文件
function createText1(){
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var f1 = fso.createtextfile("c:\\myjstest.txt",true);
        f1.WriteLine("这是内容");
        f1.close();
        var kk=fso.OpenTextFile("c:\\a.txt");//打开文件  
        while(!kk.atEndOfLine){  
            document.writeln(kk.readLine());//读取文件，并输出  
        }
}  
}

function createText2(){
       var fso = new ActiveXObject("Scripting.FileSystemObject");
        var f1 = fso.GetFile("c:\\myjstest.txt");
}


（4）WbemScripting.SWbemLocator
  [1] 获取系统CPU

var locator = new ActiveXObject ("WbemScripting.SWbemLocator");
function getCpu()
{
    var service = locator.ConnectServer(".");
    var properties = service.ExecQuery("SELECT * FROM Win32_Processor");
    var e = new Enumerator (properties);
    var p = e.item ();
    return p.LoadPercentage;
}

附录：取得客户端的信息
function clientInfo()     
{     
    strClientInfo="availHeight=      "+window.screen.availHeight+"\n"+     
    "availWidth=      "+window.screen.availWidth+"\n"+     
    "bufferDepth=      "+window.screen.bufferDepth+"\n"+    
    "colorDepth=      "+window.screen.colorDepth+"\n"+     
    "colorEnable=      "+window.navigator.cookieEnabled+"\n"+     
    "cpuClass=      "+window.navigator.cpuClass+"\n"+     
    "height=      "+window.screen.height+"\n"+     
    "javaEnable=      "+window.navigator.javaEnabled()+"\n"+     
    "platform=      "+window.navigator.platform+"\n"+    
    "systemLanguage=      "+window.navigator.systemLanguage+"\n"+   
    "userLanguage=      "+window.navigator.userLanguage+"\n"+     
    "width=      "+window.screen.width;     
    alert(strClientInfo);        
}

```
