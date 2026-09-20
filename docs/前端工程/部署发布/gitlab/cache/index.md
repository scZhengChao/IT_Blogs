# cache

## 目录

- [Cache 的目的](#Cache-的目的)
- [Cache 的使用方法](#Cache-的使用方法)
  - [1. Cache:paths](#1-Cachepaths)
  - [2. Cache:key](#2-Cachekey)
  - [3. Cache:policy](#3-Cachepolicy)
  - [4. Cache 的继承](#4-Cache-的继承)
  - [5. Cache 的禁用](#5-Cache-的禁用)
- [分布式 Cache](#分布式-Cache)
- [Cache 小实践](#Cache-小实践)
  - [1. gitlab-ci.yml 配置](#1-gitlab-ciyml-配置)
  - [2. 执行结果](#2-执行结果)
- [前端实践](#前端实践)
- [带来的问题](#带来的问题)
  - [问题描述](#问题描述)
  - [出现问题的原因](#出现问题的原因)
- [如何解决此问题](#如何解决此问题)

### Cache 的目的

在[GitLab](https://so.csdn.net/so/search?q=GitLab\&spm=1001.2101.3001.7020 "GitLab") CI/CD 中，在 pipeline 中的一些 job 可能会产生一些结果文件，Cache 机制的引入就是为了加快 job 执行的时间。Cache 在使用时制定一系列的文件或者文件目录，使得其在不同的 job 之间被缓存下来。这样当某一个 job 需要依赖于之前步骤产生的一些文件结果，Cache 就帮助我们在上一个 job 将产生的结果缓存下来并且在当前的 job 进行使用。

### Cache 的使用方法

首先 cache 的定义范围可**以全局定义**，这样所有的 job 都会采用这个全局定义的 cache 设置。当然，**每个 job 内也可以定义自己特有的 cache 来覆盖全局的配置。**

**它在运行下一个Job的时候，会默认把前一个Job新增的资源删除得干干静静**

而cache的作用就在这里体现出来了：如果我们把bulid生产的包的路径添加到cache里面，**虽然gitlab还是会删除bulid目录，但是因为在删除前我们已经重新上传了cache，并且在下个Job运行时又把cache给pull下来，那么这个时候就可以实现在下一个Job里面使用**前一个Job的资源了

Cache 在使用上主要的配置有以下几种：

#### 1. Cache:paths

paths主要是来指定需要被缓存的文件路径，需要特别指出的是这里的 paths 是**相对路径**，是相对于gitlab中项目目录的路径，也就是说被缓存的文件都是在项目目录之内的。

以如下配置为例：

```yaml 
rspec:
  script: test
  cache:
    paths:
      - binaries/*.apk
      - .config
```


在`binaries` 目录下以 `.apk` 结尾的所有文件以及 `.config` 文件会被缓存下来。

当然，如果在 job 内部也定义了 cache 配置，全局的配置就会被覆盖，例如：

```yaml 
cache:
  paths:
    - my/files
 
rspec:
  script: test
  cache:
    paths:
      - binaries/
```


在 job `rspec` 中仅 `binaries` 目录下的所有文件会被缓存，而不是`binaries` 目录下以 `.apk` 结尾的所有文件以及 `.config` 文件

#### 2. Cache:key

由于 cache 是被不同的 job 所共享，**如果不同的 jobs采用了不同的 ****`path`**** 配置，那么 cache 会在每个 job 被执行的时候被覆盖**。`cache:key` 就是为了解决这个问题，当我们给**不同 job 定义了不同的 ****`cache:key`**** 时， 每个 job 都会有一个独立的 cache，不同的 ****`key`**** 下的缓存也不会相互影响。**

当 `cache:key` 结合 GitLab CI/CD 中预定义的参数可以有不同的效果：

比如，不同的分支采用不同的 cache，防止分支之间相互影响：

```yaml 
cache:
  key: ${CI_COMMIT_REF_SLUG}
```


比如每个分支的每个 job 使用不同的 cache :

```yaml 
cache:
  key: "$CI_JOB_NAME-$CI_COMMIT_REF_SLUG"
```


再比如每个分支的每个 job 使用不同的 stage：

```yaml 
cache:
  key: "$CI_JOB_STAGE-$CI_COMMIT_REF_SLUG"
```


比如不同的分支之间需要共享 cache，但是 pipeline 中的 job 之间的 cache 是相互独立的：

```yaml 
cache:
  key: ${CI_JOB_NAME}
```


最后，当 `key` 没有被特别定义的时候，默认为 default，所有没定义 `key` 的 cache 使用的是同一份 cache，会随着 job 的执行一直被覆盖。

#### 3. Cache:policy

在默认情况下，如果有 cache 的配置，**那么每个 job 会在开始执行前将对应路径的文件下载下来，并在任务结束前重新上传，不管文件是否有变化都会如此操作。** 这个默认的配置是 `cache:policy` 中的 `pull-push` 策略。

但是如果我们已经知道，**某个 job 只是使用的其他 job 改变的文件，** 自身并无改变对应路径的文件，那么就不需要进行文件上传操作，采用`pull` 策略即可。

反过来，**某个 job 不依赖于其他 job 改变的文件**，**自身改变的文件被其他 job 所依赖，** 那么就不需要在 job 开始前进行文件下载操作，采用`push` 策略。这样减少了不必要的操作，在一定程度上节约了时间。

在以下配置中，job `rspec`使用了`pull` 策略，所以不会在 job 结束后进行文件的上传操作 ：

```yaml 
rspec:
  stage: test
  cache:
    paths:
      - vendor/bundle
    policy: pull
  script:
    - bundle exec rspec ...
```


#### 4. Cache 的继承

如果在使用中，有 job 大部分配置跟全局配置是一样的，但是部分不同，就可以采用继承的方式，而不必全部重写。例如，仅需要覆盖 `cache:policy`的配置：

```yaml 
cache: &global_cache
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - vendor/
    policy: pull-push
job:
  cache:
    # 继承全局配置
    <<: *global_cache
    # 覆盖 policy
    policy: pull
```


#### 5. Cache 的禁用

如果整个 pipeline 配置全局的 cache，意味着每个 job 在没有特殊配置的情况下会使用全局的配置。但是如果某某个 job 并不使用到 cache，包括缓存文件的上传和下载，那么可以进行如下配置对整个 job 的 cache 禁用：

```yaml 
job:
  cache: {}
```


### 分布式 Cache

在 GitLab CI/CD 中，我们所使用的 runner 是以 docker 的形式运行不同的任务。普通的 cache 机制，其 cache 均存储在本地，所有如果两个 job 实际运行的位置 是在不用宿主机上，其相互之间的缓存是无法共享的。

为了实现分布式 Cache，需要在配置 GitLab Runner 的 `config.toml` 的 `[runners.cache]`进行如下配置：

```yaml 
[[runners]]
  limit = 10
  executor = "docker"
  [runners.cache]
    Type = "s3"
    Path = "path/to/prefix"
    Shared = true
    [runners.cache.s3]
      ServerAddress = "s3.example.com"
      AccessKey = "access-key"
      SecretKey = "secret-key"
      BucketName = "runner"
      Insecure = false
```


在以上的配置中，对应的 cache 的存储路径如下：

`http(s)://<ServerAddress>/<BucketName>/<Path>/project/<id>/<cache-key>`

在配置，对应的存储 cache 服务器需要满足 s3 协议，当然也可以自建 cache 服务器。具体操作方法可以参考[自建cache服务器](https://link.zhihu.com/?target=https://docs.gitlab.com/runner/install/registry_and_cache_servers.html#install-your-own-cache-server "自建cache服务器")。

### Cache 小实践

#### 1. gitlab-ci.yml 配置

```yaml 
stages:
   - test
   - test2
   - test3
 
cache:
   key: "$CI_COMMIT_REF_SLUG"
   paths:
     - cattest.txt
 
job1:
   stage: test
   script:
     - cat cattest.txt
     - echo "aaaaaaaaaa" > cattest.txt
     - cat cattest.txt
   tags:
     - base-runner
job2:
   stage: test2
   cache:
     key: "$CI_COMMIT_REF_SLUG"
     paths:
       - cattest.txt
     policy: pull
   script:
     - cat cattest.txt
     - echo "bbb" >> cattest.txt
     - cat cattest.txt
   tags:
     - base-runner
job3:
   stage: test3
   script:
     - ls
     - cat cattest.txt
     - echo "ccc" >> cattest.txt
     - cat cattest.txt
   tags:
     - base-runner
```


#### 2. 执行结果

```bash 
job1
Checking cache for test-wer-1...
Downloading cache.zip from http://192.168.12.139:9000/runner/cache-path/project/1242/test-wer-1  #下载 cache 路径
Successfully extracted cache
$ cat cattest.txt
aaaaaaaaaa
ccc
$ echo "aaaaaaaaaa" > cattest.txt
$ cat cattest.txt
aaaaaaaaaa
Creating cache test-wer-1...
cattest.txt: found 1 matching files                                  
Uploading cache.zip to http://192.168.12.139:9000/runner/cache-path/project/1242/test-wer-1   #上传 cache 路径
Created cache
Job succeeded

job2
Checking cache for test-wer-1...
cache.zip is up to date                            
Successfully extracted cache
$ cat cattest.txt
aaaaaaaaaa
$ echo "bbb" >> cattest.txt
$ cat cattest.txt
aaaaaaaaaa
bbb
Not uploading cache test-wer-1 due to policy # pull策略不上传缓存
Job succeeded

job3
Checking cache for test-wer-1...
cache.zip is up to date                            
Successfully extracted cache
$ cat cattest.txt
aaaaaaaaaa
$ echo "ccc" >> cattest.txt
$ cat cattest.txt
aaaaaaaaaa
ccc
Creating cache test-wer-1...
cattest.txt: found 1 matching files                
22.txt: found 1 matching files                     
Uploading cache.zip to http://192.168.12.139:9000/runner/cache-path/project/1242/test-wer-1  #上传 cache 路径
Created cache
Job succeeded

```


可以发现：

- job2 获取到缓存文件 `cattest.txt` 的文件内容是 job1 执行后的结果，说明 job1 和 job2 之间实现了缓存共享
- job3 获取到缓存文件 `cattest.txt` 的文件与 job1 执行后内容一致而非 job2，这是因为 job2 执行后的结果没有进行上传
- 特别注意的是 job1 在执行任务前获取到的 `cattest.txt` 的文件与 job3 执行完的结果一致，这是因为这个 pipeline 我运行了多次，job1 获取的缓存是上一次 pipeline 中 job3 的执行后的缓存结果。说明 cache 在不同次 pipeline 之间也实现了共享

# 前端实践

\*\*我们知道Pipeline的每个Stage都是无状态的，运行完成后，产生的中间文件就会被丢弃掉，为了得到上一个Stage产生的文件，就需要将文件保存到缓存中，以便下一个Stage可以直接哪来使用。 &#x20;
\*\*缓存的几个属性：

- paths &#x20;

  指定要缓存的文件或者文件夹，只能是本仓库文件夹下的\_相对路径\_，所以生成的中间文件也只能放在当前仓库路径下的相对路径中，不能以放在`/`开头的路径中(如：/app等)；
- key &#x20;

  每个缓存的键值，如果不指定就是`default`，那么整个仓库就只有一份儿缓存（多个key就会有多个文件夹用来存放缓存文件），如果两个Stage中都有使用不同的缓存，那么下一个Stage会覆盖上一个Stage的缓存（一般情况下这样也没有任何问题，下一次Pipeline会先执行上一个Stage）。
- policy &#x20;

  缓存策略，分为pull、push、pull-push，

1. pull表示当前Stage只会拉取缓存下来使用而不会对其进行改变；
2. push表示当前Stage只会对缓存进行上传
3. pull-push表示当前Stage会先拉下缓存，结束后会再次上传缓存 &#x20;

   默认策略是pull-push

缓存还可以全局定义(全局定义缓存与stages同一级即可)，具有继承特性，也可以禁用缓存。

```bash 
// 此任务禁用缓存
job_name:
  cache: {}
```


# 带来的问题

缓存解决了文件在不同Stage中的共享问题，同时也引入了一个并行任务问题。

### 问题描述

当一个仓库中同时有两个流水线、或者有并行Stage需要用到Cache的时候，Cache会有问题：要么找不到Cache、要么用的老的Cache。

### 出现问题的原因

通过研究发现runner的缓存文件存放在：/var/lib/docker/volumes/下以runner-{runnerid}-开头的文件夹中， &#x20;
每个项目的缓存存放方式：runner-{runnerid}-projects-{projectid}-concurrent-{num}-cache-3c3f060a0374fc8bc39395164f415a70|c33bcaa1fd2c77edfc3893b41966cea8 &#x20;
以3c3f060a0374fc8bc39395164f415a70结尾的文件夹中存放的就是缓存文件，以c33bcaa1fd2c77edfc3893b41966cea8结尾的文件夹中存放的是代码源文件。 &#x20;
当任务出现并行的时候runner会创建多个Pipeline实例文件夹concurrent-0、concurrent-1...每个文件夹中保存当前并行实例的缓存数据，且每个job的并行id是不固定的； &#x20;
如下两个并行Pipeline A、B，有5个Stage，并行执行会产生10个job：

A:1-2-3-4-5

B:1-2-3-4-5

1. 第一种情况 &#x20;

   假如3、4Stage需要用到缓存，那么可能会出现什么情况？ &#x20;

   当A3在执行的时候缓存文件夹是concurrent-0、B3是concurrent-1，两个任务同时完成； &#x20;

   当A4在执行的时候缓存文件夹是concurrent-1、B4是concurrent-0，这样两个缓存就出现了交叉，出现严重问题。
2. 第二种情况 &#x20;

   假如3、4Stage需要用到缓存，且3是一个并行任务（pub-ui、pub-api） &#x20;

   那么就可能会同时出现4个并行实例，concurrent-0、concurrent-1、concurrent-2、concurrent-3； &#x20;

   假如4需要3的两个缓存，那么4要么永远都拿不到3中的其中一个缓存，要么拿到老的缓存。 &#x20;

   这就造成了很验证的缓存错乱的问题。

# 如何解决此问题

1. 从根本上解决 &#x20;

   上分布式缓存（s3, gcs, azure.），这个没实践过官方反正这么说的；
2. 治标不治本 &#x20;

   同一个项目中并行的job不要用缓存、用到缓存的Stage走串行、不要同时发生多个使用到缓存的Pipeline实例。
