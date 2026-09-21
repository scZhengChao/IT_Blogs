# 下载和安装

## 目录

- [MySQL8.0 以上  安装和配置——Windows](#MySQL80以上-安装和配置Windows)

# MySQL8.0 以上  安装和配置——Windows

**一、安装环境**

OS：Windows 10

MySQL：mysql 8.0.16

**二、安装过程**

（一）下载

根据自己电脑配置，从

[官方网站](https://dev.mysql.com/downloads/installer/ "官方网站")

下载MySQL安装文件。 推荐去 腾讯软件中心

选择操作系统类型，然后点击Download。

![  ](./assets/image/43932a8209adc4218de1cb921e898e76_j4VdYPXWJo.webp "  ")

进入下载页面，不用管其他的，直接点击最下方 No thanks,just start my download，开始下载。

![  ](./assets/image/b2f7267997995c5c1ed421466def3fae_v1ijyVyor3.webp "  ")

（二）安装

1.双击安装文件，开始安装。安装之前系统需要进行一些准备，耐心等待。进入安装首页，选择接受协议，点击Next。

![  ](./assets/image/25227f586b68a1cc23686f1a7e05b87d_4ZCUbzc4ZK.webp "  ")

2.选择安装方式。最简单的是开发者默认方式（Developer Default），全部按照默认方式安装。这里选择用户自定义方式（Custom），自己配置。注意：若仅仅是自己开发用，切勿选择Server only方式，会占用绝大部分内存，导致其他应用程序无法使用。

![  ](./assets/image/7d3b6715981014376b9fa4fdb6b2286c_aUYCTYtpN8.webp "  ")

3.选择需要安装的产品和功能，并自定义安装路径。

做一个简单的过滤。点击Edit，在弹出框中安装红框进行选择，然后点击Filter

![  ](./assets/image/1eda7bf42c7696f28dbe81a100fe5732_pHWRlwdwor.webp "  ")

选择需要安装的产品。在Availavle Products板块中选择需要安装的产品，然后点击板块中的绿色箭头，添加到Products/Features To Be Installed板块中。

![  ](./assets/image/c1e9be1cec988b4d89412071b94b9456_JS90fPJUN0.webp "  ")

设置安装路径。在Products/Features To Be Installed板块中选择待安装的产品，然后点击右下角的Advanced Options，进入设置页面。

![  ](./assets/image/5bd36eceba101fd2baba7d7d14051cde_So8T7WdbBQ.webp "  ")

自定义设置产品安装路径和数据存储路径。注意：只有MySQL server产品要配置数据存储路径

![  ](./assets/image/74ae3fe67377e5d28b7390479a5100d0_Llma1Yz0Vk.webp "  ")

按照上面的方式选择需要安装的产品，并配置安装路径，点击Next。

4.进入安装，点击Execute，开始安装。

![  ](./assets/image/ee65679f45f3d59a85abfc3c09da9121_Wz5hRt8IdE.webp "  ")

显示安装进度。

![  ](./assets/image/c43ec416699c7aa262cac2a8ce1e6c71_vDpG2viUE0.webp "  ")

产品安装完成，点击Next，进入配置页面。

![  ](./assets/image/1b1d7fe0353501ad051c9146fba3b1e6_JqWMffpeTZ.webp "  ")

5.开始对安装的产品进行配置。

显示需要配置产品。在配置的任意步骤都可以进行取消。

![  ](./assets/image/c07ad18a84e5eff8932272895d942cb8_1e7ybvnSyX.webp "  ")

高可用类型。选择Standalone MySQL Server / Classic MySQL Replication即可，不要集群，点击Next。

![  ](./assets/image/ee1be40b42c16438f7e4747adc8153dd_W3mKCmRqTW.webp "  ")

类型和网络配置。全部默认，点击Next。默认端口：3306.

![  ](./assets/image/ea2fc8c252fdf63730ea98276308a8fd_L1MAqjGRfd.webp "  ")

密码验证方法。第一种是MySQL8新增的验证方式，第二种是传统的验证方式。这里选择第二种，避免后面使用Navicat连接连接时报1251错误。若出现该错误，可以参考

[Navicat连接MySQL8.0报1251错误解决方案](https://blog.csdn.net/qq_39572257/article/details/90751885 "Navicat连接MySQL8.0报1251错误解决方案")

。点击Next。

![  ](./assets/image/742dc6f230aa484ddd60d2494991fd1a_mNQVykRo8R.webp "  ")

设置root用户的登录密码。为了方便记忆，将密码设置为root。点击Next。

![  ](./assets/image/0b04ee7d1fede8910578763cbe0082fa_wwMWY_0a4J.webp "  ")

Windows服务配置。设置服务名称，其他默认即可。点击Next。

![  ](./assets/image/ce4e66b18470b3e8059d67611bb765bc_akXrWqNygu.webp "  ")

配置生效。点击Execute，使以上配置一一生效。

![  ](./assets/image/3a49396d62eaaae1d94409ceb833245c_Vk3hdcWQV9.webp "  ")

配置完成后，点击Finish。

![  ](./assets/image/f14738238cd44e9b3688c2fa54c6a5ba_eC_DWUanwz.webp "  ")

MySQL Router Configuration直接默认配置，点击Finish。

![  ](./assets/image/305f57fcff7d822d1af6365cf2a0f07d__fcV9mtadB.webp "  ")

![  ](./assets/image/9fe3c00350d29beaf8c92d9dd7d2ad7c_Y6Mj9H3ypr.webp "  ")

6.安装完成。

![  ](./assets/image/305f57fcff7d822d1af6365cf2a0f07d__fcV9mtadB.webp "  ")

![  ](./assets/image/362b1a1959cf91d9e750852930f74ba2_5zxrwCK7LA.webp "  ")

**三、配置和验证**

1.环境变量设置

![  ](./assets/image/0e8fe4b61f50d4a2655fbffa7ec5bca7_OHvf9IwE-1.webp "  ")

2.验证

进入cmd命令页面，连接MySQL实例。连接命令：mysql -u root -p，然后输入登录密码:root。

![  ](./assets/image/2e7a5c78d5f4c52a8dd0766ed5df1d5e_HJQ4mRruS8.webp "  ")

至此，MySQL8.0.16在Windows10系统中安装成功

[下载和安装笔记](./下载和安装笔记/index.md "下载和安装笔记")
