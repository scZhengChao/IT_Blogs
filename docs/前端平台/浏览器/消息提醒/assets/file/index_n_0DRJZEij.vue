<template>
    <div>
        <p>Notification</p>





    </div>
</template>

<script>
    import '@/assets/Notification.js'
export default {
    name:'notification',
    data(){return{

    }},
    mounted() {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        }else if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            var notification = new Notification("Hi there!");
        }else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification("Hi there!",{
                    
                });
            }
            });
        }
       
     
    },
    methods: {
        notifi(){
            function _Notification(title,option){
                var Notification = window.Notification || window.mozNotification || window.webkitNotification;
                Notification.permission === "granted"?creatNotification(title, option):requestPermission(title, option);
                function creatNotification(title, option){
                var instance = new Notification(title, option);
                    instance.onclick = function () {
                        console.log('onclick');
                    };
                    instance.onerror = function () {
                        console.log('onerror');
                    };
                    instance.onshow = function () {
                        console.log('onshow');
                    };
                    instance.onclose = function () {
                        console.log("close")
                    }
                }
                function requestPermission(title, option){
                    Notification.requestPermission(function(status) {
                        status === "granted"?creatNotification(title, option):failNotification(title);
                    });
                }
                function failNotification(title){
                    var timer;
                    return function(timer){
                        var index = 0;
                        clearInterval(timer);
                        timer = setInterval(function() {
                            if(index%2) {
                                document.head.getElementsByTagName("title")[0].innerHTML = '【　　　】'+ title;
                            }else {
                                document.head.getElementsByTagName("title")[0].innerHTML = '【新消息】'+ title;
                            }
                            index++;
                            if(index > 20) {
                                clearInterval(timer);
                            }
                        }, 500);
                    }(timer);
                }
            }
        }
    },
}
</script>
<style lang='scss' scoped>

</style>