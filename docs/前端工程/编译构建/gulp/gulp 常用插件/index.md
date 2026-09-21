# gulp 常用插件

[https://www.cnblogs.com/jiaoshou/p/12003709.html](https://www.cnblogs.com/jiaoshou/p/12003709.html "https://www.cnblogs.com/jiaoshou/p/12003709.html")

```纯文本 
 gulp+require.js + 传统页面  项目
```


[officemate - mongo-node.7z](<https://github.com/scZhengChao/IT_Blogs/releases/download/assets-v1/officemate.-.mongo-node_eEQVgnlvVv.7z> "officemate - mongo-node.7z")

[officemate.7z](https://github.com/scZhengChao/IT_Blogs/releases/download/assets-v1/officemate_kFYJDbRwXD.7z "officemate.7z")

```纯文本 
 //gulpfile.js   全自动 基于项目的设置 
 
 const gulp = require('gulp');  //局部gulp 
 const babel = require('gulp-babel');  //编译js 
 const uglify = require('gulp-uglify');//压缩js 
 const webserver = require('gulp-webserver');//服务器 
 const minicss = require('gulp-clean-css');//压缩css 
 const sass = require('gulp-sass');//sass 
 
 gulp.task('buildjs',()=>{ 
     // 自己写的js 
     gulp.src('./src/pages/**/*.js') 
     .pipe(babel({ 
         presets: ['@babel/env'] 
     })) 
     .pipe(uglify()) 
     .pipe(gulp.dest('./dist/pages')); 
 
 
     gulp.src('./src/jw/**/*.js') 
     .pipe(babel({ 
         presets: ['@babel/env'] 
     })) 
     .pipe(uglify()) 
     .pipe(gulp.dest('./dist/pages')); 
     //第三方的js 
     gulp.src('./src/js/**/*.js') 
     .pipe(gulp.dest('./dist/js')); 
 }); 
 gulp.task('buildcss',()=>{ 
     gulp.src('./src/css/**/*.scss') 
     .pipe(sass().on('error', sass.logError)) 
     .pipe(minicss()) 
     .pipe(gulp.dest('./dist/css')) 
 }); 
 gulp.task('buildhtml',()=>{ 
     gulp.src('./src/pages/**/*.html') 
     .pipe(gulp.dest('./dist/pages')) 
 }); 
 gulp.task('copystatic',()=>{ 
     gulp.src('./src/static/**/*.*') 
     .pipe(gulp.dest('./dist/static')) 
 }) 
 
 //构建项目 
 gulp.task('build',['buildhtml','buildcss','buildjs','copystatic']); 
 
 //监听 
 gulp.task('watch',()=>{ 
     gulp.watch('./src/**/*.js',['buildjs']); 
     gulp.watch('./src/**/*.scss',['buildcss']); 
     gulp.watch('./src/**/*.html',['buildhtml']); 
     gulp.watch('./src/static/**/*.*',['copystatic']) 
 }) 
 
 
 //服务器 
 gulp.task("webserver", ["watch", "build"] , ()=>{ 
     gulp.src('./dist') 
     .pipe(webserver({ 
         livereload: true, 
         port:8080, 
         proxies : [ 
             { 
                 source: "/listmore", //本地的请求地址 
                 target: "http://www.officemate.cn/product-ajax_product_price-11018.html" //服务器代理的地址 
             } 
         ] 
     })); 
 }) 
 //readme 
 一,所有页面请在nodejs的本地服务器打开   命令 gulp webserver  端口号:8080, 
 二,所有页面请在全部加载完后在进行操作 
 三,index 为主页面  detail 为详情页 login 登录 reg注册 list列表 shop为购物车 
 四,流程 
     主页面  点击 猜你喜欢 下的图片进入 详情页, 
             点击 其他图片 进入 列表页 
             点击顶部的 注册 进入 注册 
             点击顶部的 登录 进入登录 
     列表页和详情页进行购买进入  点击购物车 -->购物车 
     注册成功 --> 登录页面 --> 主页面 
     点击logo --> 进入主页面 
 五,文件分类: dist为压缩编译后的站点 
             src为原文件 
             css 全部 自己的 和 引入的css 
             pages为 全部页面html 和 页面的主文件js 
             js 为全部模块 和 引入的外部文件js 
             static 为全部的静态资源conts(iconfont json public部分) images
```


```纯文本 
 // 纯代码 
 //gulp-rename   重命名 打包的文件 
 // gulp-replace 
 const  rename = require('gulp-rename') 
 const replace = require('gulp-replace') 
 
 .pipe( rename('新名字') )   //替换你打包后的名字 
 .pipe(replace('$host$',host))    // 替换你里面打包的内容
```
