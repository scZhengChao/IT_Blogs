# CSRF

## 目录

- [CSRF概念：](#CSRF概念)
- [session 工作原理](#session-工作原理)
- [CSRF攻击攻击原理及过程如下：](#CSRF攻击攻击原理及过程如下)
- [几种常见的攻击类型](#几种常见的攻击类型)
- [CSRF漏洞检测：](#CSRF漏洞检测)
- [当前防御 CSRF 的几种策略：](#当前防御-CSRF-的几种策略)
  - [（1）验证 HTTP Referer 字段](#1验证-HTTP-Referer-字段)
  - [（2）在请求地址中添加 token 并验证](#2在请求地址中添加-token-并验证)
  - [（3）在 HTTP 头中自定义属性并验证](#3在-HTTP-头中自定义属性并验证)
  - [(4)、Chrome浏览器端启用SameSite cookie](#4Chrome浏览器端启用SameSite-cookie)
- [CSRF工具的防御手段](#CSRF工具的防御手段)
  - [总结](#总结)

[ 史上最详细的CSRF攻击与防御，看完必有收获！ - 掘金 CSRF概念： CSRF定义： 跨站请求伪造（英语：Cross-site request forgery）是一种对网站的恶意利用，也被称为 one-click attack 或者 session ri https://juejin.cn/post/7031060650801496101](https://juejin.cn/post/7031060650801496101 " 史上最详细的CSRF攻击与防御，看完必有收获！ - 掘金 CSRF概念： CSRF定义： 跨站请求伪造（英语：Cross-site request forgery）是一种对网站的恶意利用，也被称为 one-click attack 或者 session ri https://juejin.cn/post/7031060650801496101")

# **CSRF概念：**

**CSRF定义：** 跨站请求伪造（英语：Cross-site request forgery）是一种对网站的恶意利用，也被称为 one-click attack 或者 session riding，通常缩写为 CSRF 或者 XSRF， 是一种**挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法**。 CSRF跨站点请求伪造(Cross—Site Request Forgery) 跟XSS攻击一样，存在巨大的危害性。
你可以这样来理解：**攻击者盗用了你的身份，以你的名义发送恶意请求，对服务器来说这个请求是完全合法的，但是却完成了攻击者所期望的一个操作**，比如以你的名义发送邮件、发消息，盗取你的账号，添加系统管理员，甚至于购买商品、虚拟货币转账等。        
简单地说，是攻击者通过一些**技术手段欺骗用户的浏览器去访问一个自己曾经认证过的网站并执行一些操作**（如发邮件，发消息，甚至财产操作如转账和购买商品）。由于浏览器曾经认证过，所以被访问的网站会认为是真正的用户操作而去执行。这利用了web中用户身份验证的一个漏洞：简单的身份验证只能保证请求发自某个用户的浏览器，却不能保证请求本身是用户自愿发出的。       

**CSRF地位：** 是一种网络攻击方式，是互联网重大安全隐患之一，[NYTimes.com](http://NYTimes.com "NYTimes.com")（纽约时报）、Metafilter，YouTube、Gmail和百度HI都受到过此类攻击。

**对比XSS：** 跟跨网站脚本(XSS)相比，**XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任**。

如下：其中Web A为存在CSRF漏洞的网站，Web B为攻击者构建的恶意网站，User C为Web A网站的合法用户。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e735aea8497b43b39dda9e87dc52e74e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

如果上面 CSRF 原理看不懂，可以再看这个原理：

先了解第一方和第三方cookie概念

Cookie是一个域服务器存储在浏览器中的一小段数据块，**只能被这个域访问，谁设置则谁访问。**

第一方Cookie：比如，访问`www.a.com`这个网站，这个网站设置了一个`Cookie`，这个`Cookie`也只能被`www.a.com`这个域下的网页读取。

第三方Cookie：比如，访问www\.a.com这个网站，网页里有用到www\.b.com网站的一张图片，浏览器在www\.b.com请求图片的时候，[www.b.com设置了一个Cookie，那这个](http://www.b.com设置了一个Cookie，那这个)`Cookie`只能被`www.b.com`这个域访问，反而不能被www\.a.com这个域访问，因为对我们来说，我们实际是在访问`www.a.com`这个网站被设置了一个`www.b.com`这个域下的`Cookie`，所以叫第三方Cookie。

CSRF 原理：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08a54d501fff43038ce66949f37aad7a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

- 1.用户C打开浏览器，访问受信任网站A，输入用户名和密码请求登录网站A;
- 2.在用户信息通过验证后，网站A产生Cookie信息并返回给浏览器，此时用户登录网站A成功，可以正常发送请求到网站A;
- 3.用户**未退出网站A之前，在同一浏览器中，打开一个TAB页访问网站B;**
- 4.网站B接收到用户请求后，返回一些攻击性代码，并发出一个请求要求访问第三方站点A;
- 5.浏览器在接收到这些攻击性代码后，根据网站B的请求，在用户不知情的情况下携带Cookie信息，向网站A发出请求。网站A并不知道该请求其实是由B发起的，所以会根据用户C的Cookie信息以C的权限处理该请求，导致来自网站B的恶意代码被执行。

简而言之： **通过访问恶意网址，恶意网址返回来js自动执行访问你之前登陆的网址，因为你已经登录了，所以再次访问将会携带cookie，** 因为服务器只认有没有`cookie`，无法区分是不是用户正常的访问，所以会欺骗服务器，造成伤害

CSRF攻击防御

CSRF攻击防御的重点是利用`cookie`的值只能被\*\*第一方读取，无法读取第三方的`cookie`\*\***值。**

防御方法：

预防csrf攻击简单可行的方法就是在客户端网页上再次添加一个cookie，保存一个随机数，而用户访问的时候，先读取这个cookie的值，hash一下这个cookie值并发送给服务器，服务器接收到用户的hash之后的值，同时取出之前设置在用户端的cookie的值，用同样的算法hash这个cookie值，比较这两个hash值，相同则是合法。（如果用户访问了病毒网站，也想带这个cookie去访问的时候，此时，因为病毒网站**无法获取第三方cookie的值，所以他也就无法hash这个随机数，所以也就会被服务器校验的过滤掉**）

# session 工作原理

关于浏览器缓存，cookie , session：[www.cnblogs.com/yigeqi/p/62…](https://link.juejin.cn?target=http://www.cnblogs.com/yigeqi/p/6274602.html "www.cnblogs.com/yigeqi/p/62…")

- **理解Cookie和Session机制**：[www.cnblogs.com/andy-zhou/p…](https://link.juejin.cn?target=https://www.cnblogs.com/andy-zhou/p/5360107.html "www.cnblogs.com/andy-zhou/p…")
- **深入理解浏览器会话机制（session && cookie）** ：[blog.csdn.net/xi\_2130/art…](https://link.juejin.cn?target=https://blog.csdn.net/xi_2130/article/details/51361494 "blog.csdn.net/xi_2130/art…")
- **cookie 和session 的区别详解**：[www.cnblogs.com/shiyangxt/a…](https://link.juejin.cn?target=https://www.cnblogs.com/shiyangxt/articles/1305506.html "www.cnblogs.com/shiyangxt/a…")
- **Cookie和Session详解**：[blog.csdn.net/gaoyong\_sto…](https://link.juejin.cn?target=https://blog.csdn.net/gaoyong_stone/article/details/79524321 "blog.csdn.net/gaoyong_sto…")

**CSRF 比 XSS更具危险性**。想要深入理解 CSRF 的攻击特性，我们有必要了解一下网站session的工作原理。 

session 我想大家都不陌生，无论你用.net或PHP开发过网站的都肯定用过session对象，然而session它是如何工作的呢？如果你不清楚请往下看。  &#x20;
先问个小问题：如果我把浏览器的cookie禁用了，大家认为session还能正常工作吗？ 

答案是否定的，我在这边举个简单的例子帮助大家理解session。  &#x20;
比如我买了一张高尔夫俱乐部的会员卡，俱乐部给了我一张带有卡号的会员卡。我能享受哪些权利（比如我是高级会员卡可以打19洞和后付费喝饮料，而初级会员卡只能在练习场挥杆）以及我的个人资料都是保存在高尔夫俱乐部的数据库里的。我每次去高尔夫俱乐部只需要出示这张高级会员卡，俱乐部就知道我是谁了，并且为我服务了。

这里我们的高级会员卡卡号 = 保存在cookie的sessionid； 而我的高级会员卡权利和个人信息就是服务端的session对象了。 

**我们知道http请求是无状态的，**也就是说**每次http请求都是独立的无关之前的操作**的，但是每次`http`请求都会将**本域下**的所有`cookie`作为`http`请求头的**一部分发送给服务端**，所以服务端就根据请求中的cookie存放的sessionid去session对象中找到该会员资料了。  &#x20;
当然session的保存方法多种多样，可以保存在文件中，也可以内存里，考虑到**分布式的横向扩展我们还是建议把它保存**在第三方媒介中，比如`redis`或者`mongodb`。 

我们理解了session的工作机制后，CSRF也就很容易理解了。CSRF攻击就相当于恶意用户A复制了我的高级会员卡，哪天恶意用户A也可以拿着这张假冒的高级会员卡去高尔夫俱乐部打19洞，享受美味的饮料了，而我在月底就会收到高尔夫俱乐部的账单！ 

了解CSRF的机制之后，危害性我相信大家已经不言而喻了，我可以伪造某一个用户的身份给其好友发送垃圾信息，这些垃圾信息的超链接可能带有木马程序或者一些欺骗信息（比如借钱之类的），如果CSRF发送的垃圾信息还带有蠕虫链接的话，那些接收到这些有害信息的好友万一打开私信中的连接就也成为了有害信息的散播着，这样数以万计的用户被窃取了资料种植了木马。整个网站的应用就可能在瞬间奔溃，用户投诉，用户流失，公司声誉一落千丈甚至面临倒闭。曾经在MSN上，一个美国的19岁的小伙子Samy利用css的background漏洞几小时内让100多万用户成功的感染了他的蠕虫，虽然这个蠕虫并没有破坏整个应用，只是在每一个用户的签名后面都增加了一句“Samy 是我的偶像”，但是一旦这些漏洞被恶意用户利用，后果将不堪设想，同样的事情也曾经发生在新浪微博上面。 

举例：  &#x20;
**CSRF攻击的主要目的**是**让用户在不知情的情况下攻击自己已登录的一个系统，类似于钓鱼**。如用户当前已经登录了邮箱，或bbs，同时用户又在使用另外一个，已经被你控制的站点，我们姑且叫它钓鱼网站。这个网站上面可能因为某个图片吸引你，你去点击一下，此时可能就会触发一个js的点击事件，构造一个bbs发帖的请求，去往你的bbs发帖，**由于当前你的浏览器状态已经是登陆状态，所以session登陆cookie信息都会跟正常的请求一样，纯天然的利用当前的登陆状态，让用户在不知情的情况下，帮你发帖或干其他事情。**

# **CSRF攻击攻击原理及过程如下：**

1. 用户C打开浏览器，访问受信任网站A，输入用户名和密码请求登录网站A；
2. 在用户信息通过验证后，网站A产生Cookie信息并返回给浏览器，此时用户登录网站A成功，可以正常发送请求到网站A；
3. 用户未退出网站A之前，在同一浏览器中，打开一个TAB页访问网站B；
4. 网站B接收到用户请求后，返回一些攻击性代码，并发出一个请求要求访问第三方站点A；
5. 浏览器在接收到这些攻击性代码后，根据网站B的请求，在用户不知情的情况下携带Cookie信息，向网站A发出请求。网站A并不知道该请求其实是由B发起的，所以会根据用户C的Cookie信息以C的权限处理该请求，导致来自网站B的恶意代码被执行。

**所以要被CSRF攻击，必须同时满足两个条件：**

1. **登录受信任网站A，并在本地生成Cookie。**
2. **在不登出A的情况下，访问危险网站B。**

# 几种常见的攻击类型

**乌云案例：** ​**GET类型的 CSRF**

这种类型的CSRF一般是由于程序员安全意识不强造成的。GET类型的CSRF利用非常简单，只需要一个HTTP请求，所以，一般会这样利用：

```typescript 
<img src=http://wooyun.org/csrf?xx=11 /> 

```


在访问含有这个img的页面后，成功向[wooyun.org/csrf?xx=11](https://link.juejin.cn/?target=http://wooyun.org/csrf?xx=11 "wooyun.org/csrf?xx=11") 发出了一次HTTP请求。所以，如果将该网址替换为存在GET型CSRF的地址，就能完成攻击了。

**乌云案例：POST类型的 CSRF**

这种类型的CSRF危害没有GET型的大，利用起来通常使用的是一个自动提交的表单，如：

```typescript 
<form action=http://wooyun.org/csrf.php method=POST>
    <input type="text" name="xx" value="11" />
</form>
<script> document.forms[0].submit(); </script> 

```


**访问该页面后，表单会自动提交，相当于模拟用户完成了一次POST操作。**

乌云案例：**其他猥琐流 CSRF**

过基础认证的CSRF(常用于路由器):

POC:

```typescript 
<img src=http://admin:admin@192.168.1.1 /> 

```


加载该图片后，路由器会给用户一个合法的 SESSION，就可以进行下一步操作了。

![](./assets/image/image_v_2Z2BLNpv.png)

**CSRF 攻击的对象**

在讨论如何抵御 CSRF 之前，先要明确 CSRF 攻击的对象，也就是要保护的对象。从以上的例子可知，\*\*CSRF 攻击是黑客借助受害者的 cookie（session） 骗取服务器的信任，****但是黑客并不能拿到 cookie，也看不到 cookie 的内容****。**另外，对于服务器返回的结果，** 由于浏览器同源策略的限制，****黑客也无法进行解析****。**因此，黑客无法从返回的结果中得到任何东西，**他所能做的就是给服务器发送请求，以执行请求中所描述的命令，在服务器端直接改变数据的值，而非窃取服务器中的数据**。所以，我们要保护的对象是那些**可以直接产生数据改变的服务，\*\*而对于读取数据的服务，则不需要进行 CSRF 的保护。比如银行系统中转账的请求会直接改变账户的金额，会遭到 CSRF 攻击，需要保护。而查询余额是对金额的读取操作，不会改变数据，**CSRF 攻击无法解析服务器返回的结果，无需保护。**

**故：增删改需要防范CSRF攻击，而读（即读数据库）无需防范**

**CSRF攻击的本质原因**

CSRF攻击是**源于Web的隐式身份验证机制！**Web的身份验证机制虽然可以**保证一个请求是来自于某个用户的浏览器，但却无法保证该请求是用户批准发送的**。CSRF攻击的**一般是由服务端解决。**

上面大概地讲了一下CSRF攻击的思想，下面我将用几个例子详细说说具体的CSRF攻击，这里我以一个银行转账的操作作为例子（仅仅是例子，真实的银行网站没这么傻:>）

**示例1：**

银行网站A，它以GET请求来完成银行转账的操作，如：[www.mybank.com/Transfer.ph…](https://link.juejin.cn?target=http://www.mybank.com/Transfer.php?toBankId=11\&money=1000 "www.mybank.com/Transfer.ph…")

危险网站B，它里面有一段HTML的代码如下：

\<img src=[www.mybank.com/Transfer.ph…](https://link.juejin.cn?target=http://www.mybank.com/Transfer.php?toBankId=11\&money=1000%3E "www.mybank.com/Transfer.ph…")

首先，你登录了银行网站A，然后访问危险网站B，噢，这时你会发现你的银行账户少了1000块......

为什么会这样呢？原因是银行网站A违反了HTTP规范，使用GET请求更新资源。在访问危险网站B的之前，你已经登录了银行网站A，而B中 的以GET的方式请求第三方资源（这里的第三方就是指银行网站了，原本这是一个合法的请求，但这里被不法分子利用了），所以你的浏 览器会带上你的银行网站A的Cookie发出Get请求，去获取资源“[www.mybank.com](https://link.juejin.cn?target=http://www.mybank.com "www.mybank.com") /Transfer.php?toBankId=11\&money=1000”，结果银行网站服务器收到请求后，认为这是一个更新资源操作（转账 操作），所以就立刻进行转账操作......

**示例2：**

为了杜绝上面的问题，银行决定改用POST请求完成转账操作。

银行网站A的WEB表单如下：　　

```typescript 
　　<form action="Transfer.php" method="POST">
　　　　<p>ToBankId: <input type="text" name="toBankId" /></p>
　　　　<p>Money: <input type="text" name="money" /></p>
　　　　<p><input type="submit" value="Transfer" /></p>
　　</form>

```


后台处理页面Transfer.php如下：

```typescript 
<?php
　　session_start();
　　if (isset($_REQUEST['toBankId'] &&　isset($_REQUEST['money']))
　　{
　　    buy_stocks($_REQUEST['toBankId'],　$_REQUEST['money']);
　　}
?>

```


危险网站B，仍然只是包含那句HTML代码：

```typescript 
　　<img src=http://www.mybank.com/Transfer.php?toBankId=11&money=1000>

```


和示例1中的操作一样，你首先登录了银行网站A，然后访问危险网站B，结果.....和示例1一样，你再次没了1000块～T\_T，这次事故的 原因是：银行后台使用了REQUEST去获取请求的数据，而\_REQUEST去获取请求的数据，而REQUEST去获取请求的数据，而\_REQUEST既可以获取GET请求的数据，也可以获取POST请求的数据，这就造成 了在后台处理程序无法区分这到底是GET请求的数据还是POST请求的数据。在PHP中，可以使用GET和\_GET和GET和\_POST分别获取GET请求和POST 请求的数据。在JAVA中，用于获取请求数据request一样存在不能区分GET请求数据和POST数据的问题。

**示例3：**

经过前面2个惨痛的教训，银行决定把获取请求数据的方法也改了，改用$\_POST，只获取POST请求的数据，后台处理页面Transfer.php代码如下：

```typescript 
　　<?php\
　　　　session_start();
　　　　if (isset($_POST['toBankId'] &&　isset($_POST['money']))
　　　　{
　　　　    buy_stocks($_POST['toBankId'],　$_POST['money']);
　　　　}
　　?>

```


然而，危险网站B与时俱进，它改了一下代码：

```typescript 
<html>
　　<head>
　　　　<script type="text/javascript">
　　　　　　function steal()
　　　　　　{
          　　　　 iframe = document.frames["steal"];
　　     　　      iframe.document.Submit("transfer");
　　　　　　}
　　　　</script>
　　</head>

　　<body οnlοad="steal()">
　　　　<iframe name="steal" display="none">
　　　　　　<form method="POST" name="transfer"　action="http://www.myBank.com/Transfer.php">
　　　　　　　　<input type="hidden" name="toBankId" value="11">
　　　　　　　　<input type="hidden" name="money" value="1000">
　　　　　　</form>
　　　　</iframe>
　　</body>
</html>

```


如果用户仍是继续上面的操作，很不幸，结果将会是再次不见1000块......因为这里危险网站B暗地里发送了POST请求到银行!
　　总结一下上面3个例子，CSRF主要的攻击模式基本上是以上的3种，其中以第1,2种最为严重，因为触发条件很简单，一 个就可以了，而第3种比较麻烦，需要使用JavaScript，所以使用的机会会比前面的少很多，但无论是哪种情况，只要触发了 CSRF攻击，后果都有可能很严重。
　　理解上面的3种攻击模式，其实可以看出，CSRF攻击是源于WEB的隐式身份验证机制！**WEB的身份验证机制虽然可以保证一个请求是来自于某个用户的浏览器，但却无法保证该请求是用户批准发送的！**

# CSRF漏洞检测：

检测CSRF漏洞是一项比较繁琐的工作，**最简单的方法就是抓取一个正常请求的数据包，去掉Referer字段后再重新提交，如果该提交还有效，那么基本上可以确定存在CSRF漏洞。**

随着对CSRF漏洞研究的不断深入，不断涌现出一些专门针对CSRF漏洞进行检测的工具，如CSRFTester，CSRF Request Builder等。

以CSRFTester工具为例，CSRF漏洞检测工具的测试原理如下：使用CSRFTester进行测试时，首先需要抓取我们在浏览器中访问过的所有链接以及所有的表单等信息 **，然后通过在CSRFTester中修改相应的表单等信息，重新提交，这相当于一次伪造客户端请求。如果修改后的测试请求成功被网站服务器接受，则说明存在CSRF漏洞，当然此款工具也可以被用来进行CSRF攻击。**

# 当前防御 CSRF 的几种策略：

在业界目前防御 CSRF 攻击主要有四种策略：

1. **验证 HTTP Referer 字段；**
2. 在请求地址**中添加 token 并验证；**
3. 在 HTTP 头中自定义属性并验证；
4. Chrome 浏览器端启用 **SameSite cookie**

##### **（1）验证 HTTP Referer 字段**

什么是HTTP Referer？下面GIF图是由百度跳转到QQ邮箱页面的Referer查看示意：

![](./assets/image/image_sSt0IMf1jH.png)

可以看出Referer为

```typescript 
Referer：https://www.baidu.com/

```


根据 HTTP 协议，在 HTTP 头中有一个字段叫 Referer，**它记录了该 ****`HTTP`**** ****请求的来源地址****。在通常情况下，访问一个安全受限页面的请求来自于同一个网站，**比如需要访问 [bank.example/withdraw?ac…](https://link.juejin.cn?target=http://bank.example/withdraw?account=bob\&amount=1000000\&for=Mallory%EF%BC%8C%E7%94%A8%E6%88%B7%E5%BF%85%E9%A1%BB%E5%85%88%E7%99%BB%E9%99%86 "bank.example/withdraw?ac…") bank.example，然后通过点击页面上的按钮来触发转账事件。这时，该转帐请求的 `Referer` 值就会是**转账按钮所在的页面的`URL`**，通常是以 bank.example 域名开头的地址。而如果黑客要对银行网站实施 CSRF 攻击，他只能在他自己的网站构造请求，当用户通过黑客的网站发送请求到银行时，该请求的 `Referer` 是**指向黑客自己的网站**。因此，要防御 CSRF 攻击，银行网站只需要对于每一个转账请求验证其 `Referer` 值，如果是以 bank.example 开头的域名，则说明该请求是来自银行网站自己的请求，是合法的。如果 `Referer` 是其他网站的话，则有可能是黑客的 CSRF 攻击，拒绝该请求。

这种方法的显而易见的好处就是简单易行，网站的普通**开发人员不需要操心 CSRF 的漏洞，只需要在最后给所有安全敏感的请求统一增加一个拦截器来检查 Referer 的值就可以。特别是对于当前现有的系统，不需要改变当前系统的任何已有代码和逻辑，没有风险，非常便捷。**

然而，这种方法并非万无一失。`Referer` 的值是**由浏览器提供的**，虽然 HTTP 协议上有明确的要求，**但是每个浏览器对于 Referer 的具体实现可能有差别，并不能保证浏览器自身没有安全漏洞。使**用验证 Referer 值的方法，**就是把安全性都依赖于第三方（即浏览器）来保障，** 从理论上来讲，这样并不安全。事实上，对于某些浏览器，比如 IE6 或 FF2，目前已经有一些方法可以篡改 Referer 值。如果 bank.example 网站支持 IE6 浏览器，黑客完全可以把用户浏览器的 Referer 值设为以 bank.example 域名开头的地址，这样就可以通过验证，从而进行 CSRF 攻击。

即便是使用最新的浏览器，黑客无法篡改 Referer 值，这种方法仍然有问题。因为 `Referer` 值会记录下用户的访问来源，有些用户认为这样会侵犯到他们自己的隐私权，特别是有些组织担心 `Referer` 值会把组织内网中的某些信息泄露到外网中。因此，用户自己可以设置浏览器使其在发送请求时不再提供 `Referer`。当他们正常访问银行网站时，网站会因为请求没有 Referer 值而认为是 CSRF 攻击，拒绝合法用户的访问。

另外，如果Referer的判断逻辑写的不严密的话，也容易被攻破，例如

```typescript 
const referer = request.headers.referer;
if (referer.indexOf('www.bank.example') > -1) {
  // pass
}

```


[如果黑客的网站是www.bank.example.hack.com](http://xn--www-eo8ex7gb0x7kcj01cgfi3hlll1g.bank.example.hack.com "如果黑客的网站是www.bank.example.hack.com")，则referer检查无效。

##### **（2）在请求地址中添加 token 并验证**

CSRF 攻击之所以能够成功，是因为黑客可以完全伪造用户的请求 **，该请求中所有的用户验证信息都是存在于 cookie 中，因此黑客可以在不知道这些验证信息的情况下直接利用用户的 cookie 来通过安全验证**。要抵御 CSRF，关键在于在请求中放入黑客所不能伪造的信息，并且该信息不存在于 cookie 之中。可以在 HTTP 请求中**以参数的形式加入一个随机产生的 token，并在服务器端建立一个拦截器来验证这个 token，如果请求中没有 token 或者 token 内容不正确，则认为可能是 CSRF 攻击而拒绝该请求。**

这种方法要比检查 Referer 要安全一些，token 可以在用户登陆后产生并放于 session 之中，然后在每次请求时把 token 从 session 中拿出，与请求中的 token 进行比对，但这种方法的难点在于如何把 token 以参数的形式加入请求。对于 GET 请求，token 将附在请求地址之后，这样 URL 就变成

```typescript 
http://url?csrftoken=tokenvalue

```


而对于 POST 请求来说，要在 form 的最后加上

```typescript 
 <input type="hidden" name="csrftoken" value="tokenvalue"/>

```


该方法有一个**缺点是难以保证 ****`token`**** 本身的安全**。特别是在一些论坛**之类支持用户自己发表内容的网站，**黑客可以在上面发布**自己个人网站的地址。由于系统也会在这个地址后面加上 ****`token`****，**黑客可以在自己的网站上得到这个 `token`，并马上就可以发动 CSRF 攻击。为了避免这一点，系统可以在添加 `token` 的时候**增加一个判断**（拦截器），如果这个**链接是链到自己本站的**，就在后面添加 `token`，如果是通**向外网则不加。不过，即使这个** csrftoken 不以参数的形式附加在请求之中，**黑客的网站也同样可以通过 Referer 来得到这个 token 值以发动 CSRF 攻击。这也是一些用户喜欢手动关闭浏览器 Referer 功能的原因。**(**get 请求会把参数带到链接上；ref 会完整的带过来**）

##### **（3）在 HTTP 头中自定义属性并验证**

这种方法也是使用 `token` 并进行验证，和上一种方法不同的是，这里**并不是把 ****`token`**** 以参数的形式置于 HTTP 请求之中**，而是把它放到 `HTTP` 头**中自定义的属性里**。通过 `XMLHttpRequest` 这个类，可以一次性给所有该类请求加上 csrftoken 这个 HTTP 头属性，并把 token 值放入其中。这样解决了上种方法在请求中加入 token 的不便，同时，通过 XMLHttpRequest 请求**的地址不会被记录到浏览器的地址栏，也不用担心 token 会透过 Referer 泄露到其他网站中去。**

然而这种方法的局限性非常大。XMLHttpRequest 请求通常用于 `Ajax` 方法中对于页面局部的异步刷新，**并非所有的请求都适合用这个类**来发起，而且通过该类请求得到的页面不能被浏览器所记录下，从而进行前进，后退，刷新，收藏等操作，给用户带来不便。另外，对于没有进行 CSRF 防护的遗留系统来说，要采用这种方法来进行防护，要把所有请求都改为 XMLHttpRequest 请求，这样几乎是要重写整个网站，这代价无疑是不能接受的。

##### **(4)、Chrome浏览器端启用SameSite cookie**

下面介绍如何启用SameSite cookie的设置，很简单。

原本的 Cookie 的 header 设置是长这样：

```typescript 
Set-Cookie: session_id=esadfas325

```


需要在尾部增加 SameSite 就好：

```typescript 
Set-Cookie: session_id=esdfas32e5; SameSite
```


SameSite 有两种模式，Lax跟Strict模式，默认启用Strict模式，可以自己指定模式：

```typescript 
Set-Cookie: session_id=esdfas32e5; SameSite=Strict
Set-Cookie: foo=bar; SameSite=Lax

```


Strict模式规定\*\* cookie 只允许相同的site使用，****不应该在任何的 cross site request 被加上去****。即a标签、form表单和XMLHttpRequest提交的内容，只要是提交到不同的site去，就不会带上cookie。
\*\*但也存在不便，例如朋友发送过来我已经登陆过的一个页面链接，我点开后，该页面仍然需要重新登录。
有两种处理办法，第一种是与Amazon一样，准备两组不同的cookie，**第一组用于维持登录状态不设定SameSite，第二组针对的是一些敏感操作会用到（例如购买、支付、设定账户等）严格设定SameSite。**

基于这个思路，就产生了 SameSite 的另一一种模式：Lax模式。
**Lax 模式打开了一些限制，例如**

```typescript 
<a>
<link rel="prerender">
<form method="GET">

```


这些\*\*都会带上cookie。\*\***但是 POST 方法 的 form，或是只要是 POST, PUT, DELETE 这些方法，就不会带cookie**。

但一定注意将重要的请求方式改成POST，否则GET仍然会被攻击。

PS：该方式目前仅Chrome支持。

# **CSRF工具的防御手段**

**1. 尽量使用POST，限制GET**

GET接口太容易被拿来做CSRF攻击，看第一个示例就知道，只要构造一个img标签，而img标签又是不能过滤的数据。接口最好限制为POST使用，GET则无效，降低攻击风险。

当然POST并不是万无一失，攻击者只要构造一个form就可以，但需要在第三方页面做，这样就增加暴露的可能性。

**2. 浏览器Cookie策略**

IE6、7、8、Safari会默认拦截第三方本地Cookie（Third-party Cookie）的发送。但是Firefox2、3、Opera、Chrome、Android等不会拦截，所以通过浏览器Cookie策略来防御CSRF攻击不靠谱，只能说是降低了风险。

PS：Cookie分为两种，**Session Cookie（在浏览器关闭后，就会失效，保存到内存里），Third-party Cookie（即只有到了Exprie时间后才会失效的Cookie，这种Cookie会保存到本地）。**

PS：另外如果网站返回HTTP头包含P3P Header，那么将允许浏览器发送第三方Cookie。

**3. 加验证码**

验证码，强制用户必须与应用进行交互，才能完成最终请求。在通常情况下，验证码能很好遏制CSRF攻击。但是出于用户体验考虑，网站不能给所有的操作都加上验证码。因此验证码只能作为一种辅助手段，不能作为主要解决方案。

**4. Referer Check**

Referer Check在Web最常见的应用就是“防止图片盗链”。同理 **，Referer Check也可以被用于检查请求是否来自合法的“源”（Referer值是否是指定页面，或者网站的域）**，如果都不是，那么就极可能是CSRF攻击。

但是因为服务器并不是什么时候都能取到Referer，所以也无法作为CSRF防御的主要手段。但是用Referer Check来监控CSRF攻击的发生，倒是一种可行的方法。

**5. Anti CSRF Token**

现在业界对CSRF的防御，一致的做法是使用一个Token（Anti CSRF Token）。

例子：

1. 用户访问某个表单页面。
2. 服务端生成一个Token，放在用户的Session中 **，或者浏览器的Cookie中**。
3. 在页面表单附带上Token参数。
4. 用户提交请求后， 服务端验证表单中的Token是否与用户Session（或Cookies）中的Token一致，一致为合法请求，不是则非法请求。

这个Token的值必须是随机的，不可预测的。由于Token的存在，攻击者无法再构造一个带有合法Token的请求实施CSRF攻击。另外使用Token时应注意Token的保密性，尽量把敏感操作由GET改为POST，以form或AJAX形式提交，避免Token泄露。

注意：

CSRF的Token仅仅**用于对抗CSRF攻击。** 当网站同时存在XSS漏洞时候，那这个方案也是空谈。所以XSS带来的问题，应该使用XSS的防御方案予以解决。

**总结**

CSRF攻击是攻击者利用用户的身份操作用户帐户的一种攻击方式，通常使用Anti CSRF Token来防御CSRF攻击，同时要注意Token的保密性和随机性。

## 总结

通过上文分析，目前最便捷的方式是**直接判别Referer值，确保同域请求才给**放行。如果系统必须支持IE6，那么就要**使用 token 来进行验证**，在大部分情况下，使用 XmlHttpRequest 并不合适，token 只能以参数的形式放于请求之中，若你的系统不支持用户自己发布信息，那这种程度的防护已经足够，否则的话，你仍然难以防范 token 被黑客窃取并发动攻击。在这种情况下，你需要小心规划你网站提供的各种服务，从中间找出那些允许用户自己发布信息的部分，把它们与其他服务分开，使用不同的 token 进行保护，这样可以有效抵御黑客对于你关键服务的攻击，把危害降到最低。

如果是开发一个全新的系统，则抵御 CSRF 的选择要大得多。笔者建议对于重要的服务，可以尽量使用 XMLHttpRequest 来访问，这样增加 token 要容易很多。另外尽量避免在 js 代码中使用复杂逻辑来构造常规的同步请求来访问需要 CSRF 保护的资源，比如 window\.location 和 document.createElement(“a”) 之类，这样也可以减少在附加 token 时产生的不必要的麻烦。

最后，要记住 CSRF 不是黑客唯一的攻击手段，无论你 CSRF 防范有多么严密，如果你系统有其他安全漏洞，比如跨站域脚本攻击 XSS，那么黑客就可以绕过你的安全防护，展开包括 CSRF 在内的各种攻击，你的防线将如同虚设。

[页面禁用referer](./页面禁用referer/index.md "页面禁用referer")

[cookie](IT/前端基础/DOM-BOM/本地数据持久化/cookie/cookie.md "cookie")

[SameSite 的三种取值](<./SameSite 的三种取值/index.md> "SameSite 的三种取值")

[CSRF令牌](./CSRF令牌/index.md "CSRF令牌")

[完整的 CSRF 防护方案](<./完整的 CSRF 防护方案/index.md> "完整的 CSRF 防护方案")
