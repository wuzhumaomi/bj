document.addEventListener("jpush.openNotification", function(){
  //打开通知
  alert("打开通知");
  try {
      //获取极光推送附带的参数
      var id= event.extras.id;
      var lx= event.extras.lx;
      //相应的动作
  } catch (exception) {
      console.log("JPushPlugin:onOpenNotification" + exception);
  }
}, false);
document.addEventListener("jpush.receiveNotification", function(vue){
    //收到通知
    // alert(vue.isTrusted)
    // 极光标题
    // alert(vue.title)
    // 极光内容
    // alert(vue.alert)
    cordova.plugins.notification.local.schedule({
        icon : 'http://yktzs.top/work/images/first.jpg',
        title: vue.title,
        text: vue.alert,
        foreground: true
    });
  try {
      //获取极光推送附带的参数
      var id= event.extras.id;
      var lx= event.extras.lx;
      //相应的动作
  } catch (exception) {
      console.log("JPushPlugin:onReceiveNotification" + exception);
  }
}, false);


