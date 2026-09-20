<template>
    <div>
        asg 
        <el-button type='primary' @click='send'>send post </el-button>

    </div>
</template>
<script>
    export default {
        name:'XMLHttpRequest',
        data(){return{
            ajax:''
        }},
        created() {
            
        },
        methods:{
            send(){
                /***
                 * loadstart 为客户端收到第一个字节的时间   
                */
                this.ajax = new XMLHttpRequest()
               
                this.ajax.addEventListener('loadEnd',function(){
                    console.log('loadEnd',Date.now())
                })
                this.ajax.addEventListener('load',function(){
                    console.log('load',Date.now())
                })
                this.ajax.addEventListener('loadstart',function(){
                    console.log('loadstart',Date.now())
                })
                this.ajax.addEventListener('abort',function(){
                    console.log('abort',Date.now())
                })
                this.ajax.addEventListener('error',function(){
                    console.log('error',Date.now())
                })
                this.ajax.addEventListener('progress',function(){
                    console.log('progress',Date.now())
                })
                this.ajax.addEventListener('timeout',function(){
                    console.log('timeout',Date.now())
                })
                let data = {
                    a:1,
                    b:2
                }
                this.ajax.open('POST','http://localhost:3001/express')
                var str = ''
                for(var i in data){
                    str += i + '=' + data[i] + '&'
                }
                str = str.slice(0,-1);
                this.ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                let send = this.ajax.send
                this.ajax.send = function(){
                    this.beginTime = Date.now()
                    console.log(this.beginTime,'sendtime')
                    this.addEventListener('readystatechange',function(){
                        if(this.readyState == 4 && this.status == 200){
                            console.log('success')
                            console.log('readystatechange', Date.now())
                        }
                    })
                    return send.apply(this,arguments)
                }
                this.ajax.send(str)
            }
        }
    }
</script>
