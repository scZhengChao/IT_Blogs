# gitlab-ci.yml

## 目录

- [stages:](#stages)
- [job](#job)
  - [only/except](#onlyexcept)
  - [when](#when)
  - [include和extends](#include和extends)
- [gitlab-ci.yml参数列表](#gitlab-ciyml参数列表)

## stages:

stages是用来定义一个pipeline的，一个pipeline就像一个流水线，由一系列job来构成。比如在发布（publish）之前要做lint，test，build，那么这四个job就构成一个pipeline，写成下面的样子：

stages

- lint
- test
- build
- publish

然后你在gitlab的pipeline下面就能看到下面的图： &#x20;

![](https://c1.lmlphp.com/user/master/2020/10/05/son_1/9c162a527a898a64c0cbbe32856a8f87.png)

上面我们虽然定义了一个pipeline，和4个job名称，但是具体每个job做什么还是不清楚的，接下来我们学习怎么定义一个job。

## job

以上面的lint为例，我们需要执行`npm run lint`命令来查看有没有lint错误，那么这个job可以写成：

```react 
job-lint:
  stage: lint
  script: npm run lint
```


这里`job-lint`是任务名称，`script`是要在终端执行的命令，`stage`表示这个job属于哪个stage（pipeline的某个节点）。job名称这里要注意一点是，不能使用保留字，比如：不能把一个job的名字称为stages或者image，就像变量名不能用if一样。相关文档可以看这里。

有时候，我们希望一些任务是在某些场景下执行的，比如：打tag的时候再build，这时候可以使用only/except。

### only/except

以上面的场景为例，我们可以这样写job-build:

```react 
job-build:
  stage: build
  script: npm run build
  only:
    - tags
```


这样，上面的job就只有在我们push tags时才会触发。如果我们希望一个job只在某一类分支有提交的时候触发，可以这样:

```react 
job-bugfix-build:
  stage: build
  script: npm run build
  only:
    - /^bugfix-.+$/
```


上面这个例子只有在bugfix为前缀的分支产生提交的时候，才会触发job-bugfix-build。

然而，这样并不足以让这个任务跑起来，因为CI是跑在docker里面的，在执行run lint之前，我们需要把node环境搭起来，这就需要image保留字了：

```react 
image: node:12.18

```


添加了image之后，在任务开始之前，还要安装依赖，我们使用before\_script来完成这件事:

```react 
# 使用node镜像
image: node:12.18

# 安装依赖
before_script:
 - npm install

```


有时候我们希望在某些场景下不执行某项任务，这时可以使用expect，比如不对hotfix进行lint：

```react 
job-lint-except-hotfix:
  script:
    - npm run lint
  except: /^hotfix-.+$/

```


### when

说了only,再说说when，`when` 是用来决定当前置任务失败时，当前job是否执行，以及如何执行的问题。比如我们希望lint成功了再执行build：

```react 
build_job:
  when: on_success
  stage: build
  needs: lint_job

```


再比如我们在执行发布的时候，希望手动点击发布按钮来执行发布：

```react 
publish_job:
  when: manual
  stage: publish
  script: npm run deploy
```


此外 when 的取值还可以是以下几个属性：

- on\_success
- on\_failure
- always
- delayed
- never

### include和extends

正如通过程序通过模块来实现代码复用一样，CI的yml配置可以通过include实现配置复用：

```react 
include:
  - remote: 'https://gitlab.com/awesome-project/raw/master/.before-script-template.yml'
  - local: '/templates/.after-script-template.yml'
  - template: Auto-DevOps.gitlab-ci.yml

```


这样，我们可以把一些公用的环境变量或者job放到一个公共repo中，然后在其他项目中通过`remote`来引用。

# gitlab-ci.yml参数列表

| 值              | 是否必须 | 描述                                                    |
| -------------- | ---- | ----------------------------------------------------- |
| script         | 必须   | 定义由Runner执行的shell脚本或命令                                |
| extends        | 非必须  | 定义此作业将继承的配置条目                                         |
| image          | 非必须  | 需要使用的docker镜像，请查阅该文档                                  |
| services       | 非必须  | 定义所需的docker服务，请查阅该文档                                  |
| stage          | 非必须  | 定义一个工作场景阶段，默认是test                                    |
| type           | 非必须  | stage的别名,不赞成使用                                        |
| variables      | 非必须  | 在job级别上定义的变量                                          |
| only           | 非必须  | 定义job所引用的git分支                                        |
| except         | 非必须  | 定义job所不适用的git分支                                       |
| tags           | 非必须  | 定义job所适用的runner，tags为runner标签                         |
| allow\_failure | 非必须  | 允许任务失败，但是如果失败，将不会改变提交状态                               |
| when           | 非必须  | 定义了job什么时候执行，可以是on\_success、on\_failure、always和manual |
| dependencies   | 非必须  | 定义了该job依赖哪一个job，如果设置该项，可以通过artifacts设置                |
| artifacts      | 非必须  | 工件，在依赖项之间传递的东西，类似cache，但原理与cache不同                    |
| cache          | 非必须  | 定义需要被缓存的文件、文件夹列表                                      |
| before\_script | 非必须  | 覆盖在作业之前执行的脚本或命令                                       |
| after\_script  | 非必须  | 覆盖在作业之后执行的脚本或命令                                       |
| environment    | 非必须  | 定义让job完成部署的环境名称                                       |
| coverage       | 非必须  | 定义job设置代码覆盖率                                          |
| retry          | 非必须  | 定义job失败后的自动重试次数                                       |
