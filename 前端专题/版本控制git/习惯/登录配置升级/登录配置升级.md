# 登录配置升级

## 目录

- [生成ssh：](#生成ssh)
- [git config](#git-config)
  - [登陆](#登陆)
- [git update](#git-update)
- [解决git push时每次需要输入用户名和密码方法
  ](#解决git-push时每次需要输入用户名和密码方法)
- [凭证](#凭证)
  - [1 . 清除凭证助手](#1--清除凭证助手)
  - [2. 配置凭证助手](#2-配置凭证助手)

# **生成ssh：**

ssh-keygen -t rsa -C "[your\_email@youremail.com](mailto:your_email@youremail.com "your_email@youremail.com")"

&#x20;   ssh-keygen -t rsa -C "<15082810624@163.com>"   加上多次回车 &#x20;

- ssh keys：

            [https://www.cnblogs.com/xiuxingzhe/p/9303278.html](https://www.cnblogs.com/xiuxingzhe/p/9303278.html "https://www.cnblogs.com/xiuxingzhe/p/9303278.html")

        [https://blog.csdn.net/qq\_41770012/article/details/79854595](https://blog.csdn.net/qq_41770012/article/details/79854595 "https://blog.csdn.net/qq_41770012/article/details/79854595")

- 阮一峰：    [https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000 "https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000")

# git config

**查看自己的用户名和邮箱**

- git config [user.name](http://user.name "user.name")
- git config user.email

## 登陆

- git config --global user.email "<you@example.com>"
- git config --global user.name "Your Name"

# git update

直接本地打开Git，输入git update-git-for-windows

解决git push时每次需要输入用户名和密码方法

1.在当前项目目录下输入

git config credential.helper store

这里没有–global意思是指只对这个仓库生效，建议以后都不要加–global，让代码配置以仓库为单位存储就好，设置成全局不灵活

2.打开.git文件夹内的config文件，会发现多了两行

3.git push 到远程仓库，按提示输入用户名和密码，注意要输入正确的（GitHub的用户名和密码）

4.再次运行git push 就不用输入用户名和密码了，因为在用户主目录文件夹多了一个文件git-credentials，这个就是用来存储用户名和密码的

5.若想把项目的用户名和密码删掉，输入下列命令

这样每次git push时又需要输入用户名和密码了。

上面这条语句一般用于解决push、pull或clone时出现403错误，先解绑再绑定用户名和密码。

# 凭证

#### 1 . 清除凭证助手

```javascript 
git config --system --unset credential.helper
# 除了system外，还有global、local等范围
# 使用 git config --list 命令这是展示配置属性，只要不存在credential.helper表示清除成功

```


## 2. 配置凭证助手

```javascript 
git config --global credential.helper store
# 清除成功后，每次远程操作pull/push/fetch时需要手动输入密码啊。
# 执行这个命令，开启凭证助手，一次输入密码认证成功后会被存储下来。

```
