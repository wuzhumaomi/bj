console.log("===[开始初始化]===");
var app = {
    initialize: function() {
        console.log("===[注册初始化事件]===");
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {//设备准备完毕
        console.log("===[设备准备就绪]===");
        initJPush();//初始化极光推送
    }
};
app.initialize();

function initJPush(){
        console.log("===[初始化极光推送]===");
        try {
            window.JPush.init();
            window.JPush.setDebugMode(true);
            if (device.platform != "Android") {
                window.JPush.setApplicationIconBadgeNumber(0);
            }
        } catch (exception) {
            alert(exception);
        }
        document.addEventListener("jpush.receiveRegistrationId", function (event) {
            console.log("receiveRegistrationId" + JSON.stringify(event));
        }, false);
    }
   function setAlias(alias){
        console.log("======[alias]====:"+alias);
        window.JPush.setAlias({ sequence: 1, alias: alias },
        function (result) {
            console.log("alias设置成功："+result.alias);
        }, function (error){
            alert("err:"+error.code);
        });
    }