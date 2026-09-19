# Kerberos

## 目录

- [Kerberos 中的“票据”（Ticket）到底是什么？](#Kerberos-中的票据Ticket到底是什么)
- [Kerberos 认证完整流程（用生活比喻解释）](#Kerberos-认证完整流程用生活比喻解释)
- [常用的票据相关命令](#常用的票据相关命令)
- [klist 典型输出示例](#klist-典型输出示例)
- [总结一句话](#总结一句话)

Kerberos 是目前最常用的企业级**可信第三方认证协议**（由 MIT 在 1988 年开发，现在是 IETF 标准 RFC 4120 / RFC 1510 等），广泛用于 Hadoop、Kubernetes、Active Directory、LDAP、HDFS、Spark 等需要强认证的系统中。

它的核心目标是：**在不安全的网络中，让客户端和服务器互相证明身份，而不直接传输密码**。

### Kerberos 中的“票据”（Ticket）到底是什么？

票据（Ticket）就是 Kerberos 发给你的一张 **“电子通行证**”，证明“你已经通过身份验证了”。拿着这张通行证，你就可以去访问各种服务，而不用每次都输入密码。

Kerberos 中有两种最核心的票据：

| 票据类型                 | 英文全称                        | 中文常见翻译        | 作用                                       | 有效期           | 谁能看懂内容                     |
| -------------------- | --------------------------- | ------------- | ---------------------------------------- | ------------- | -------------------------- |
| TGT（最重要！）            | Ticket Granting Ticket      | 票据授予票据 / 授信票据 | 相当于“Kerberos 的身份证”，拿着它可以向 KDC 换取其他服务的票据  | 通常 10 小时（可续期） | 只有 KDC 能解密（用 krbtgt 的密钥加密） |
| Service Ticket（服务票据） | Ticket to Get Service (TGS) | 服务票据 / TGS 票据 | 真正用来访问具体服务的票据（如 hdfs、hive、impala、http 等） | 通常 10 小时      | 只有目标服务能解密（用服务自己的密钥加密）      |

### Kerberos 认证完整流程（用生活比喻解释）

假设你去一个大型景区玩（整个景区 = 你的公司内网），景区有多个景点（HDFS、Hive、Yarn 等服务）：

1. **你第一次进景区（kinit）你去总售票处（KDC 的 AS，Authentication Service）出示身份证 + 输入密码，售票处给你一张“一日通用门票” → 这就是**TGT &#x20;

   这张 TGT 被加密了，只有总售票处（KDC）自己能看懂。
2. **你想去某个具体景点玩（访问 HDFS）** 你拿着 TGT 再去找总售票处（KDC 的 TGS，Ticket Granting Service），说：“我要去玩过山车（访问 hdfs）”。

   总售票处验证你的 TGT 是真的后，给你发一张“过山车专用票” → 这就是**Service Ticket**（服务票据） &#x20;

   这张专用票被加密了，只有过山车的工作人员（HDFS 服务）能看懂。
3. **你去过山车入口**你把“过山车专用票”交给工作人员，工作人员用自己的密钥解密，确认票是真的且是你本人的，就可以放你进去了。 &#x20;

   整个过程你**一次都没说过密码**，密码只在第 1 步用过。

### 常用的票据相关命令

| 命令               | 作用                   | 说明                                                                                    |
| ---------------- | -------------------- | ------------------------------------------------------------------------------------- |
| kinit            | 获取 TGT（第一步）          | kinit\[<user@REALM.COM>]\(mailto:<user@REALM.COM> "<user@REALM.COM>") → 输入密码 → 得到 TGT |
| kinit -R         | 续期已有的 TGT            | 在快过期时续期                                                                               |
| klist            | 查看你当前持有哪些票据          | 显示 TGT 和所有 Service Ticket                                                             |
| kdestroy         | 销毁本地所有票据（相当于撕掉所有门票）  | 登出、切换用户时常用                                                                            |
| unset KRB5CCNAME | 清除环境变量指向的票据缓存（不彻底销毁） | 常配合 kdestroy 使用                                                                       |

### klist 典型输出示例

```bash 
$ klist
Ticket cache: FILE:/tmp/krb5cc_12345
Default principal: zhangsan@CORP.EXAMPLE.COM   ← 你的身份

Valid starting       Expires               Service principal
2025-11-20 09:15:23  2025-11-20 19:15:23   krbtgt/CORP.EXAMPLE.COM@CORP.EXAMPLE.COM   ← 这就是 TGT
2025-11-20 14:22:10  2025-11-20 19:15:23   hdfs/node1.corp.example.com@CORP.EXAMPLE.COM   ← HDFS 服务票据
2025-11-20 14:25:33  2025-11-20 19:15:23   HTTP/web.corp.example.com@CORP.EXAMPLE.COM     ← Web 服务票据
```


### 总结一句话

- **TGT** = Kerberos 的“身份证”（一次登录，长期有效）
- **Service Ticket** = 访问具体服务的“门票”（拿着 TGT 去换）
- 你平时敲kinit 就是在拿身份证，之后所有访问都不用再输密码了，这就是 Kerberos 单点登录（SSO）的核心原理。
