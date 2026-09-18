# 案例

实例

接下来将解释⼀下公司内常⻅的yam⽂件的字段含义：

```yaml 
# 容器平台底层采⽤ kubernetes（k8s） 作为编排引擎，⽀持原⽣ k8s yml定义
# 每⼀个 --- 分隔代表⼀个 k8s 资源定义
# 常⻅资源有 Deployment、Statefulsets、Service、Route、Confimap、Secret、Persi
stentvolumeclaim 等，详细使⽤⽅式请查阅下⽂【k8s reference】
# 以下 demo 展示⼀个典型的容器服务本身暴露8080端⼝，最终通过Route提供外部路由

---
kind: Deployment # Deployment 代表容器应⽤的⼀次部署，不建议直接使⽤rc、rs、pod等
apiVersion: apps/v1 # 此为k8s规定api版本，请勿改动！
metadata: #资源的元数据/属性
  name: project-name # 所有资源都需要指定 metadata.name 字段，如⽆特殊需求，建议指定为有可读性的应⽤名称，同namespace 同类型资源下不可重名
  labels: # (⾮必须) label为可选字段， ⾃定义标签
    app: project-label # (⾮必须）同⼀应⽤下所有资源可以加上⼀个相同的label，以便进⾏资源筛选和过滤，下⽂中的Service 与 Route 也是由 app: project-name 这⼀label控制
  namespace: project-namespace # 对应容器平台的 namespace 名称（前置条件中申请的命名空间, 需要提前在⼤禹平台申请好）
  spec: #定义⼀些详细信息
    replicas: 1 #Pod⽬标数⽬
    selector: #标签选择器，决定了要操作的对象 要让spec.selector.matchLabels值和spec.template.metadata.lables值完全匹配，这样才不会报错
    matchLabels:
      app: project-label
    template:
         metadata: #创建新的pod的模板
           labels: #定义标签， 与spec.selector.matchLabels要匹配
             app: project-label
         spec:
           restartPolicy: Always #pod重启策略，Always: pod⼀旦退出就要进⾏重启，OnFailure：只要⾮正常退出才进⾏重启， Never： 退出后不再拉起
           containers: #容器对象列表
             - name: container-project-name #容器的名称
               image: [image] # 容器镜像，镜像名由流⽔线平台填充为本次构建的镜像，开发⼈员需⽤ [image] 进⾏占位，如果不需流⽔线指定，也可填写镜像全路径
               imagePullPolicy: Always #镜像下来策略Always（每次都重新下载）、IfNotPresent（如果本地存在则使⽤本地镜像，不重新拉取）、Never（表示仅使⽤本地镜像）
               env: # 指定容器中的环境变量
                 - name: TZ #变量的名字
                   value: Asia/Shanghai #变量的值
               livenessProbe: # 存活探针设置
                 httpGet: #通过httpget检查健康，返回200-399之间，则认为容器正常
                   path: /index.html # 探测地址，前段应⽤⼊⼝地址⼀般为/index.html
                   port: 8080 #探针探测的容器端⼝
                 initialDelaySeconds: 15 # 平台会在第⼀次探测前等待15s
               readinessProbe: # 就绪探针
                 httpGet:
                   path: /index.html
                   port: 8080
               ports:
                 - containerPort: 8080 #容器对外的端⼝
               resources: #⽤于设置资源限制和资源请求
                 requests: # 容器运⾏时，最低资源需求，也就是说最少需要多少资源容器才能正常运⾏
                   cpu: '0.5' #对cpu的限制，k8s将⼀个逻辑cpu划分为1000个millicore（毫核）。例如 limits.cpu=500m相当于0.5个cpu。limits.cpu=2表示占⽤2个cpu
                   memory: 0.5G #对内存的限制
                 limits: #资源限制
                   cpu: '0.5' #对cpu的限制，k8s将⼀个逻辑cpu划分为1000个millicore（毫核）。例如 limits.cpu=500m相当于0.5个cpu。limits.cpu=2表示占⽤2个cpu
                   memory: 0.5G
---
kind: Service # Service 类型资源，指定⼀个内部路由，由 selector 字段定义服务对应的容器
apiVersion: v1 # 此为k8s规定api版本，请勿改动！
metadata:
 name: project-name #service的名称
 labels: #service的定义的标签
   app: project-label
 namespace: project-namespace #service的命名空间
spec:
 type: ClusterIP #service的类型，指定service的访问⽅式,我们公司⼀般采⽤ClusterIP
 ports:
   - targetPort: 8080 # targetPort为容器的端⼝
     protocol: TCP #端⼝协议，⽀持TCP和UDP，默认TCP
     name: 8080-8080 #端⼝名称
     port: 8080 #服务监听的端⼝号
 selector: #label selector配置，将选择具有label标签的Pod作为管理范围
     app: project-name
---
kind: Route # Route 类型资源，指定⼀个外部路由，定义外部访问⽅式k8s原⽣并没有改资源，咨询了云平台的相关⼈员，是⾃⼰封装的
apiVersion: route.openshift.io/v1 # 此为k8s规定api版本，请勿改动！
metadata:
 name: project-name
 labels:
   app: project-label
 namespace: project-namespace
spec:
  to:
    kind: Service
    name: project-name
  host: project-name.paas.cmbchina.cn # 定义外部路由
  port:
    targetPort: 8080-8080 # targetPort为 service 定义的端⼝，可以⽤端⼝也可以⽤名字
```
