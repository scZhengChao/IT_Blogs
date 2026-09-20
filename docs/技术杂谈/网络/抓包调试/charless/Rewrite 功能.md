# Rewrite 功能

## 目录

- [Rewrite 功能--MOCK对请求和响应进行动态修改（非交互式）](#Rewrite-功能--MOCK对请求和响应进行动态修改非交互式)
- [交互式拦截与响应  -- Breakpoints 断点功能](#交互式拦截与响应---Breakpoints-断点功能)
- [修改网络请求内容](#修改网络请求内容)

### Rewrite 功能--MOCK对请求和响应进行动态修改（非交互式）

- Map Local在使用的时候，有一个潜在的问题，就是其返回的 Http Response Header 与正常的请求并不一样。这个时候如果客户端校验了 Http Response Header 中的部分内容，就会使得该功能失效。解决办法是同时使用 Map Local 以下面提到的 Rewrite 功能，将相关的 Http 头 Rewrite 成我们希望的内容。

  Rewrite功能功能适合对某一类网络请求进行一些正则替换，以达到修改结果的目的。

![](./assets/image/image_AzwaHb-39v.png)

设置完成后，刷新浏览器或者APP的页面，则此时就可以获取到更改之后的数据

（相当于从浏览器或者APP发送请求，经由Charles代理发送之后，服务器给出返回数据，然后**Charles将返回的数据进行改写后再返回给浏览器或APP**，从而实现对数据的改写展示）

### 交互式拦截与响应  -- Breakpoints 断点功能

- 上面提供的 Rewrite 功能最适合做批量和长期的替换，但是很多时候，我们只是想临时修改一次网络请求结果，这个时候，使用 Rewrite 功能虽然也可以达到目的，但是过于麻烦，对于临时性的修改，我们最好使用 Breakpoints 功能。 &#x20;

  ![  ](./assets/image/c040c062a7d436426c016977f5fbf21f_8M1NR0Oz-s.png "  ")

  ![  ](./assets/image/88785208b2458ec402041686ace19a66_8PxPG2vA3Z.png "  ")

  Breakpoints 功能类似我们在 Xcode 中设置的断点一样，当指定的网络请求发生时，Charles 会截获该请求，这个时候，我们可以在 Charles 中临时修改网络请求的返回内容。 &#x20;

  下图是我们临时修改获取用户信息的 API，将用户的昵称进行了更改，修改完成后点击 “Execute” 则可以让网络请求继续进行。

![](./assets/image/image_agBSR_HL-n.png)

- 需要注意的是，使用 Breakpoints 功能将网络请求截获并修改过程中，整个网络请求的计时并不会暂停，所以长时间的暂停可能导致客户端的请求超时

3）手机刷新页面，重新请求这个接口，根据需求进行编辑：&#x20;

![  ](./assets/image/c821b1b620754f4937a605750ddb39b5_o4mTetG2XI.png "  ")

![  ](./assets/image/8a9f5730430ce58988e0a507664ea7fa_mRfd2PYaPG.png "  ")

### 修改网络请求内容

- 有些时候为了调试服务器的接口，我们需要反复尝试不同参数的网络请求。Charles 可以方便地提供网络请求的修改和重发功能。只需要在以往的网络请求上点击右键，选择 “Edit”，即可创建一个可编辑的网络请求。如下所示：

![](./assets/image/image_01GtFA3FJQ.png)

- 我们可以修改该请求的任何信息，包括 URL 地址、端口、参数等，之后点击 “Execute” 即可发送该修改后的网络请求（如下图所示）。Charles 支持我们多次修改和发送该请求，这对于我们和服务器端调试接口非常方便，如下图所示：

![](./assets/image/image_4ZrZwaWOf-.png)
