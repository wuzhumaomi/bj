// 地图页面 
<template>
  <div class="mapMain">
     <!-- 返回按钮 -->
      <van-sticky :offset-top="0">
          <div @click="mapShow" class="mapShow">
            <van-icon  class="mapShowBtn"  name="home-o" size='22px' ></van-icon>  
            <span>返回主页</span>
          </div>
          
      </van-sticky>

      <div class="map" id="map"/>
      
      <div class="mapInfoList" id="mapInfoList">
        <!-- 没啥大用，只是当背景颜色填充 -->
        <div  class="mapList"> 
          
        <div  @click="top" class="icon"><van-icon name="wap-nav" /></div>
        <!-- 选中的卡片 -->
        <van-swipe-cell >
         
           <van-cell-group v-if="device!=null">
              <van-cell  class="device" id="device" :title="device.deviceName" >
                <div slot="label">
                  {{'地址：'+ device.constructionAddress}} <br>
                  {{'项目：' + device.constructionName}}
                </div>
                <div slot="default" :class="device.whetherOnlineOrNot=='1'?'defaultTrue':''">
                  <span class="mapDefault" :def="device.collection">{{device.collection=='1'?'已关注':'未关注'}}</span>  {{device.whetherOnlineOrNot=='1'?'在线':'离线'}}
                </div>
              </van-cell>
            </van-cell-group>


          <template #right >
            <van-button class="swipeRight" @click="swipeLook(device)" square type="info" text="查看" />
            <van-button class="swipeRight" v-if="device?device.collection!=1:false" @click="swipeClick(device)" square type="primary" text="关注"/>
            <van-button class="swipeRight" v-else @click="swipeClick(device)" square type="danger" text="取关"/>
          </template>
      </van-swipe-cell>
        <!-- 虚线 -->
        <van-divider dashed></van-divider>

        <!-- 滑块 -->
        <!-- // constructionAddress 地址
      // constructionName 施工场所
      // address 设备位置
      // deviceName 设备名称 -->
        <van-swipe-cell v-for="i of deviceList" :key="i.id">
            <van-cell-group>
              <van-cell :title="i.deviceName"  label="描述信息" >
                <div slot="label">
                  {{'地址：'+i.constructionAddress}} <br>
                  {{'项目：' + i.constructionName}}
                </div>
                <div slot="default" :class="i.whetherOnlineOrNot=='1'?'defaultTrue':''">
                 <span class="mapDefault" :def="i.collection">{{i.collection=='1'?'已关注':'未关注'}}</span>  {{i.whetherOnlineOrNot=='1'?'在线':'离线'}}
                </div>
              </van-cell>
            </van-cell-group>
          <template #right >
            <van-button class="swipeRight" @click="swipeLook(i)" square type="info" text="查看" />
            <van-button class="swipeRight" v-if="i.collection!='1'" @click="swipeClick(i)" square type="primary" text="关注"/>
            <van-button class="swipeRight" v-else @click="swipeClick(i)" square type="danger" text="取关"/>
          </template>
        </van-swipe-cell>

        </div>
      </div>
    
  </div>
</template>
<script>
import {apiData} from '@/api' 
// 引入地图组件
import AMap from "AMap"
import { Dialog } from 'vant';
export default {
  name:"map",
  data() {
    return {
      // 缓存
      storage:window.localStorage,
      // userId:JSON.parse(this.storage["userData"]).id

      // 每个设备的位置
      i:'',
      // 选中设备
      device:null,
      // 设备列表
      deviceList:[{coor:[0,0]}],
    }
  },
    // 渲染之后
  mounted:function () {
    //  获得设备
    this.getDeviceList();
    this.MapInit();
    

  // 显示设备位置（显示在地图上）
  },
  created:function () {
    
  },
 
  methods:{
    getDeviceList(){
      console.log("获得环境设备");
      var obj={
        page: 1, 
        limit:1000000,
        userId:JSON.parse(this.storage["userData"]).id,
        deviceType:'1'
      }
      apiData.getDeviceByConstructionsiteId(obj).then((data)=>{
        console.log("获得的环境设备",data.list);
        // constructionAddress 地址
        // constructionName 施工场所
        // address 设备位置
        // deviceName 设备名称
        this.deviceList = data.list;
        this.setDevice();
        if (this.i) {
          this.device =  this.deviceList[this.i]
        }
      })
    },
    // 点击滑块关注
    swipeClick(val){
      console.log('关注设备' , val);
      var collection = "1"
      var str = '是否关注'
      if (val.collection=='1') {
        collection = "0"
        str = '是否取消关注'
      }

      Dialog.confirm({
        title: '关注设备',
        message: str+val.deviceName
      }).then(() => {
        // updateCollection
        var obj={
          deviceId:val.id + "",
          // 1 关注 0 取消关注
          collection
        }
        console.log(obj);
        
        apiData.updateCollection(obj).then((data)=>{
          console.log("关注设备",collection,data);
          // this.$router.push("/map");
          // 刷新数据
           this.getDeviceList();
        })
      }).catch(() => {
        // on cancel
      });
    },
    swipeLook(val){
      console.log(val);
      this.$router.push({path:"/realInfo",query:val});
      // this.$router.replace({path:"/realInfo",query:val});
    },
    // 后退
    mapShow(){
      // 退后一步
        this.$router.go(-1);
    },
    // 初始化
    MapInit () {
        let _this = this;
      
        let map = new AMap.Map("map", {
          // 镜头初始化位置
            center: _this.deviceList[0].coor ,
            // mapStyle: "amap://styles/这里放入样式ID", //设置地图的显示样式
            resizeEnable: true,
            zoom: 5
        });
      
      //初始化地图对象，加载地图
      var deviceList = this.deviceList;
      var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
      for (var i = 0; i < deviceList.length; i++) {
         var  marker;
        //  判断是否存在然后进行图片的更换
        if (deviceList.whetherOnlineOrNot!='1') {
          marker = new AMap.Marker({
              position: deviceList[i].coor,
              map: map,
              icon: new AMap.Icon({            
                      image: './img/mark_bs2.png',
                      //图标大小
                      imageSize: new AMap.Size(16,26)
                    })    
          });
        }else{
          marker = new AMap.Marker({
              position: deviceList[i].coor,
              map: map,
          });
        }
        // 每个点的设备对象
        marker.obj=deviceList[i]
        marker.i = i;
        // 标点上的小提示
        marker.content = deviceList[i].deviceName;
        marker.on('click', markerClick);

          // 触发点击事件
          // marker.emit('click', {target: marker});
      }
      // 点击的事件
      function markerClick(e) {
          infoWindow.setContent(e.target.obj.deviceName);
          infoWindow.open(map, e.target.getPosition());
          // 调用设置设备
          // _this.setDevice(null);
          // 点击
          _this.device = e.target.obj;
          _this.i = e.target.i;
          console.log("_this.device",_this.device);
          
          // 改变窗体
          setTimeout(() => {
            _this.top(null);
          }, 100);
      }
      map.setFitView();

      // 同时引入工具条插件，比例尺插件和鹰眼插件
      AMap.plugin([
          'AMap.ToolBar',
          'AMap.Scale',
          'AMap.OverView',
          'AMap.MapType',
          'AMap.Geolocation',
      ], function(){
          // // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
          // map.addControl(new AMap.ToolBar());

          // // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
          // map.addControl(new AMap.Scale());
        
          // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
          map.addControl(new AMap.MapType());
      });
    },
    
    log(val){
      console.log(val);
    },
    // 框体的上下拉伸
    top(val){
      let height = 30;
      
      if (this.device!=null) {
        height += document.getElementById("device").offsetHeight;
      }
      // 往上去一点点
      if (val==null) {
        // 上拉动画
        if (height+'px' != document.getElementById('mapInfoList').style.height) {
          document.getElementById('mapInfoList').style.height = height + 30 + 'px';
        }
        
        setTimeout(() => {
          document.getElementById('mapInfoList').style.height = height + 'px';
        }, 700);
        return
      }

      if (document.getElementById('mapInfoList').style.height=='90vh') {
        document.getElementById('mapInfoList').style.height = height + 'px';
      }else{
        document.getElementById('mapInfoList').style.height = '90vh';
      }
    },
    // 框体内选中的设备详细信息
    setDevice(){
      // constructionAddress 地址
      // constructionName 施工场所
      // address 设备位置
      // deviceName 设备名称
        let _this = this;
     
      //根据地址搜索
      for (const [indext,device] of this.deviceList.entries()) {
        // 云南省昆明市大都一期
        // var address = device.constructionAddress;
        
        var address = device.constructionAddress;
        AMap.plugin('AMap.Geocoder', function() {
          var geocoder = new AMap.Geocoder();
          geocoder.getLocation(address, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              // 经纬度
              var lon = result.geocodes[0].location.lng;
              var lat = result.geocodes[0].location.lat;
              // return [lon,lat]
              // 创建coor属性将坐标放入
              _this.deviceList[indext].coor = [lon,lat];
              // 拿到的经纬度
              // _this.MapInit();
              _this.MapInit();
            } else {
              console.log('定位失败！');
            }
          });
        });
      }
      

    },
  }
}
</script>
<style  lang="scss">
.mapMain{
  width: 100%;
  height: 100vh;
  position: absolute;
  top: -1px;
  left: 0;
  .van-overlay,.van-dialog{
    z-index: 100000!important;
  }
  .van-cell__value{
    position: absolute;
    right: 10px;
    flex: 0;
  }
  .mapDefault[def='1']{
    color: #8acb40;
  }
}
#map {
  width:100%; height: 100vh; 
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  }  
.mapInfoList{
  transition: 0.65s;
  width: 100%;
  background: white;
  position: absolute;
  bottom: 0;
  // top: 90vh;
  height: 4.5vh;
  // z-index: 999999;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  
  // 在线的颜色
  .defaultTrue{
    color: #2ecc71;
  }
  //列表背景 颜色
  .mapList{
    background: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  .icon{
    width: 100%;
    text-align: center;
    color: rgb(172, 172, 172);
    font-size: 20px;
  }
  // 选中设备
  .device{
    // padding: 10px 10px;
  }
  .van-cell__title{
    flex: 3
  }

  .swipeRight{
    height: 100%;
  }

}

  .mapShow{
    width: 40vw;
    padding: 5px;
    line-height: 34px;
    // position: absolute;
    // top: 0px;
    // left: 0px;
    span{
      position: absolute;
      left: 30px;
    }
  }
  .mapShowBtn{
    margin-top: 5px;
  }
</style>