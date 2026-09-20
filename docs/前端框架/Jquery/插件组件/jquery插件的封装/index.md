# jquery插件的封装

## 目录

- [简介](#简介)
- [代码](#代码)

# 简介

jquery插件的封装

**一个列子诠释所有,轮播图,nav菜单  ；关键在合并且返回**

**\$.extend() 向\$上合并   \$.fn.extend() 向\$.fn上合并**

# 代码

```javascript 
;(function($){
'use strict'


// 绑定全局
//  $.extend({
//      nav:function(ele){
//          ele.children("li").hover(function(){
//              $(this).children("ul").stop().slideDown(200).end().siblings().children("ul").stop().slideUp(200)
//          },function(){
//              $(this).children("ul").stop().slideUp(200)
//          })
//      }
//  });
    
    
//  局部
//  $.fn.extend({
//      nav:function(){
////            jq给我们封装了一个关键字,是jq的DOM函数传进来的
////            console.log(this)
//          this.children("li").hover(function(){
//              $(this).children("ul").stop().slideDown(200).end().siblings().children("ul").stop().slideUp(200)
//          },function(){
//              $(this).children("ul").stop().slideUp(200)
//          })
//      }
//  })
    
    
//  对象操作的全局
//  $.nav = function(ele){
//      ele.children("li").hover(function(){
//          $(this).children("ul").stop().slideDown(200).end().siblings().children("ul").stop().slideUp(200)
//      },function(){
//          $(this).children("ul").stop().slideUp(200)
//      })
//  }


$.fn.banner = function(options){
    // 单列模式,因为this指向 $.fn 防止命名冲突
    this.BANNER = {}
    this.BANNER.autoPlay = options.autoPlay === false?false : true;
    this.BANNER.delayTime= options.delayTime || 3000;
    this.BANNER.moveTime = options.moveTime || 1000;
    this.BANNER.index = 0;
    this.BANNER.iprev = options.items.length - 1;
    var that = this;
    var flag = false;
    if(options.list != undefined && options.list.length > 0){
        flag = true;
        options.list.on('click',function(){
            if($(this).index() > that.BANNER.index ){
                that.BANNER.list($(this).index(), 1)
            }
            if($(this).index() < that.BANNER.index){
                that.BANNER.list($(this).index(), -1)
            }
            $(this).addClass('active').siblings().removeClass('active')
            that.BANNER.index = $(this).index()
            return false
        })
    }
    this.BANNER.list = function(index,type){
        options.items.eq(this.index).css({
            left:0
        }).stop().animate({
            left:-options.items.eq(0).width()*type
        },this.moveTime)
        options.items.eq(index).css({
            left:options.items.eq(0).width()*type
        }).stop().animate({
            left:0
        },this.moveTime)
    }
    this.BANNER.right = function(){
        if(that.BANNER.index == options.items.length - 1){
            that.BANNER.index = 0 ;
            that.BANNER.iprev = options.items.length - 1
        }else{
            that.BANNER.index ++
            that.BANNER.iprev = that.BANNER.index - 1
        }
        that.BANNER.btn(-1)
    }
    this.BANNER.left = function(){
        if(that.BANNER.index == 0){
            that.BANNER.index = options.items.length - 1
            that.BANNER.iprev = 0
        }else{
            that.BANNER.index--
            that.BANNER.iprev = that.BANNER.index + 1
        }
        that.BANNER.btn(1)
    }
    if(options.prev != undefined && options.prev.length>0 && options.next != undefined && options.next.length>0){
        options.prev.on('click',this.BANNER.left);
        options.next.on('click',this.BANNER.right)
    }
    this.BANNER.btn = function (type) {
        options.items.eq(this.iprev).css({
            left:0
        }).stop().animate({
            left:options.items.eq(0).width()*type
        },this.moveTime);
        options.items.eq(this.index).css({
            left:-options.items.eq(0).width()*type
        }).stop().animate({
            left:0
        },this.moveTime);
        flag && options.list.eq(this.index).addClass('active').siblings().removeClass('active')
    }
    if(this.BANNER.autoPlay){
        this.BANNER.timer = setInterval(this.BANNER.right ,this.BANNER.delayTime)
        this.hover(function(){
            clearInterval(that.BANNER.timer)
        },function(){
            that.BANNER.timer = setInterval(that.BANNER.right,that.BANNER.delayTime)
        })
    }
}
})(jQuery);
```
