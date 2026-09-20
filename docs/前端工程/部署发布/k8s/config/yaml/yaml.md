# yaml

## 目录

- [语法](#语法)

# 语法

YAML是专⻔⽤来写配置⽂件的语⾔，⾮常简洁和强⼤，使⽤⽐json更⽅便。它实质上是⼀种通⽤的数据串⾏化格式。
YAML语法规则：

- ⼤⼩写敏感
- **使⽤缩进表示层级关系**
- **缩进时不允许使⽤Tal键，只允许使⽤空格**
- **缩进的空格数⽬不重要，只要相同层级的元素左侧对⻬即可**
- ”#” 表示注释，从这个字符⼀直到⾏尾，都会被解析器忽略

在Kubernetes中，只需要知道两种结构类型即可：\*\* Lists Maps\*\*

Maps：

&#x20;             即⼀个Key:Value 的键值对信息。Maps的value既能够对应字符串也能够对应⼀个Maps, 下⾯这
个例⼦中metadata这个KEY对应的值为⼀个Maps，⽽嵌套的labels这个KEY的值⼜是⼀个Map。
实际使⽤中可视情况进⾏多层嵌套。

```yaml 
apiVersion: v1
kind: Pod
metadata:
 name: kube100-site
 labels:
 app: web
```


注：**---为可选的分隔符 ，当需要在⼀个⽂件中定义多个结构的时候需要使⽤。**

Lists：
List即列表，就是数组，数组中每个项的定义以-开头，并且与⽗元素之间存在缩进

```yaml 
args
 -beijing
 -shanghai
 -shenzhen
 -guangzhou
```
