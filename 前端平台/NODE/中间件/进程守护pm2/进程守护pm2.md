# 进程守护pm2

```纯文本 
 https://www.cnblogs.com/cangqinglang/p/10240436.html 
 1.什么是pm2 
      pm2 是一个 带有负载均衡功能的Node应用的进程管理器。可以把你的独立代码利用全部的服务器上的所有CPU，并保证进程永远都活着，0秒的重载。 
      pm2 可以代替cluster 集群 来进行进程 守护, 帮你优雅的推出, 很好的进程守护 
 
 // 注意这里监听了 没有捕获掉的异常, 但是serve 不会 cash掉,但是栈堆消息会丢失 所以得重启 
 // 如果没有这个监听, serve 直接down 掉,即使有cluster 开启多个进程, 也会一个进程一个进程的down 掉 
 //糟糕！请求一直在等待，内存上涨。原因在于res.end 永远不会执行， 
 // 但是有了 pm2 等系列重启工具, 已经帮你最优雅的推出 和重启了, 你只需日志输出即可 所以colse和disconnect不需要了 
 //现有的I/O处于等待的状态，已经开辟的资源不仅不会被释放，而且服务器还在不知疲倦地接受新的用户请求。 
 //所以需要优雅的重启 
 //我们可以用Cluster模式，由之而来的推荐做法是： - 针对发生异常的请求返回一个错误代码 
 //- 出错的Worker不再接受新的请求 - 退出关闭Worker进程 
 // 或者就是pm2 
 process.on('uncaughtException', function (err) { 
     udpLog.send('process ' + process.pid + ' down', /* ... 
 一些发送 udp 消息的参数 ...*/, function () { 
         cluster.worker.disconnect(); 
     }); 
     server.close(); 
     // 保证 worker.disconnect 不会拖太久.. 
     setTimeout(function () { 
         cluster.worker.disconnect(); 
     }, 100).unref(); 
 });
```


```纯文本 
 2.pm2的主要特性 
     1、内建负载均衡（使用Node cluster 集群模块） 
     2、后台运行 
     3、0秒停机重载 
     4、具有Ubuntu和CentOS 的启动脚本 
     5、停止不稳定的进程（避免无限循环） 
     6、控制台检测 
     7、提供 HTTP API 
     8、远程控制和实时的接口API ( Nodejs 模块,允许和PM2进程管理器交互 ) 

```


```纯文本 
 3.pm2的用法 
 pm2 start app.js -i 4   // 后台运行pm2，启动4个app.js  正确的进程数目依赖于Cpu的核心数目 
 pm2 start app.js -i max // 根据有效CPU数目启动最大进程数目 
 pm2 start app.js --name my-api // 命名进程 
 
 pm2 update // 更新pm2         
                
 pm2 stop all           // 停止所有进程 
 pm2 stop 0             // 停止指定的进程 
 
 pm2 delete 0           // 杀死指定的进程 
 pm2 delete all         // 杀死全部进程12345678910111213141516 
 
 pm2 restart 0          // 重启指定的进程 
 pm2 restart all        // 重启所有进程 
 pm2 reload all         // 0秒停机重载进程 (用于 NETWORKED 进程) 
 
 pm2 flush  //清洗所有的数据[注：我没有试出来效果] 据说是日志清理 
 pm2 web                // 运行健壮的 computer API endpoint 
 
 pm2 list               // 显示所有进程状态 
 pm2 monit   pid/name/不填就是全部          // 监视所有进程 
 pm2 show name/pid/不填就是全部               // 得到更详细的信息 
 pm2 info name/pid 
 pm2 logs   pid/name/不填就是全部            //  显示所有进程日志 
 pm2 list 
 列出由pm2管理的所有进程信息，还会显示一个进程会被启动多少次，因为没处理的异常。 
 pm2 monit 
 监视每个node进程的CPU和内存的使用情况。 
 pm2 logs 
 实时集中log处理。
```


```纯文本 
 4.pm2运行进程的不同方式(更常用生成配置文件) 
 pm2 start app.js -i max 根据有效CPU数目启动最大进程数目 
 pm2 start app.js -i 3 启动3个进程 
 pm2 start app.js -x 用fork模式启动 app.js 而不是使用 cluster 
 pm2 start app.js -x -- -a 23 用fork模式启动 app.js 并且传递参数 (-a 23) 
 pm2 start app.js --name serverone 启动一个进程并把它命名为 serverone 
 pm2 stop serverone 停止 serverone 进程 
 pm2 start app.json 启动进程, 在 app.json里设置选项 
 pm2 start app.js -i max -- -a 23 在--之后给 app.js 传递参数 
 pm2 start app.js -i max -e err.log -o out.log 启动 并 生成一个配置文件 
 
 // 也可以执行用其他语言编写的app  ( fork 模式): 
 pm2 start my-bash-script.sh    -x --interpreter bash 
 pm2 start my-python-script.py -x --interpreter python12345678910111213
```


```纯文本 
 5.配置pm2启动文件 
 { 
   "apps": [ 
     { 
       "name": "mywork", 
       "cwd": "/srv/node-app/current", 
       "script": "bin/www", 
       "log_date_format": "YYYY-MM-DD HH:mm Z", 
       "error_file": "/var/log/node-app/node-app.stderr.log", 
       "out_file": "log/node-app.stdout.log", 
       "pid_file": "pids/node-geo-api.pid", 
       "instances": 6, 
       "instance_var": "INSTANCE_ID",   
       "min_uptime": "200s", 
       "max_restarts": 10, 
       "max_memory_restart": "1M", 
       "cron_restart": "1 0 * * *", 
       "watch": false, 
       "merge_logs": true, 
       "exec_interpreter": "node", 
       "exec_mode": "fork", 
       "autorestart": false, 
       "vizion": false 
     } 
   ]} 
 说明: 
 * apps:json结构，apps是一个数组，每一个数组成员就是对应一个pm2中运行的应用 
 * name:应用程序名称 
 * cwd:应用程序所在的目录 
 * script:应用程序的脚本路径 
 * log_date_format: 
 * error_file:自定义应用程序的错误日志文件 
 * out_file:自定义应用程序日志文件 
 * pid_file:自定义应用程序的pid文件 
 * instances:"max" 开启多少个实例 
 * min_uptime:最小运行时间，这里设置的是60s即如果应用程序在60s内退出，pm2会认为程序异常退出，此时触发重启max_restarts设置数量 
 * max_restarts:设置应用程序异常退出重启的次数，默认15次（从0开始计数） 
 * cron_restart:定时启动，解决重启能解决的问题 
 * watch:是否启用监控模式，默认是false。如果设置成true，当应用程序变动时，pm2会自动重载。这里也可以设置你要监控的文件。 
 * merge_logs: 
 * exec_interpreter:应用程序的脚本类型，这里使用的shell，默认是nodejs 
 * exec_mode:应用程序启动模式，这里设置的是cluster_mode（集群），默认是fork 
 * autorestart:启用/禁用应用程序崩溃或退出时自动重启 
 * max_memory_restart当内存超过1024M时自动重启。 如果工程中有比较棘手的内存泄露问题，这个算是一个折中方案。 
 * vizion:启用/禁用vizion特性(版本控制) 
 * "instance_var": "INSTANCE_ID",  PM2和log4js结合 防止日志丢失； 因为 log4运行在master模式；而pm2 是cluster模式 
 可以通过pm2 start processes.json来启动。也可以把命令写在package.json里，如下: 
 "scripts": { 
     "dev": "NODE_ENV=development nodemon src/server.js & NODE_ENV=development nodemon src/server/action-server.js & tools/redis/socket.js", 
     "dev_read_redis": "NODE_ENV=development nodemon src/app.js", 
     "start": "NODE_ENV=production nodemon src/app.js", 
     "test": "echo \"Error: no test specified\" && exit 1" 
   }, 
 npm run start 
 
 或者(实战 没问题的) 
 
 { 
   "apps": { 
       "name": "performancemonitor",                             
       "script": "app.js",                       
       "cwd": "./",                                 
       "args": "-i max",                                 
       "interpreter": "",                           
       "interpreter_args": "",                      
       "watch": true,                               
       "ignore_watch": [                            
           "node_modules", 
           "logs" 
       ], 
       "exec_mode": "cluster_mode",                 
       "instances": "max",                          
       "max_memory_restart": "1024M",                            
       "error_file": "logs/pm2-err.log",            // 错误日志 
       "out_file": "logs/pm2-out.log",               // console日志 
       "pid_file": "logs/pm2-pid.log",            //pid 日志 
       "merge_logs": true,                          
       "log_date_format": "YYYY-MM-DD HH:mm:ss",    
       "min_uptime": "60s",                                                
       "autorestart": true,                         
       "cron_restart": ""  , 
       "env_dev" : { 
         "NODE_ENV": "development" 
        }, 
       "env_prod" : { 
         "NODE_ENV": "production" 
       }, 
       "env_test" :{ 
         "NODE_ENV":"test" 
       }                              
   } 
 } 
 package.json: 
   "scripts": { 
     "dev": " set NODE_ENV=development&&nodemon app.js", 
     "test": " set NODE_ENV=test&&pm2 start pm2.config.json", 
     "prd": "set NODE_ENV=production&&pm2 start pm2.config.json" 
   },
```


```纯文本 
 log4js 在pm2 cluster 模式下的日志丢失 
      https://www.jianshu.com/p/20fcb3672723
```


再次 理解
