## 网址

案例

https://github.surmon.me/vue-awesome-swiper/

使用指南

https://blog.csdn.net/u012570307/article/details/107203851

## 下载

```
npm install vue-awesome-swiper@3 --save-dev
```

## 使用

```
<template>
  <div class="dashboard-container">
    <!-- <component :is="currentRole" /> -->
    <div class="xunHuanTu">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <!-- <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide> -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <div class="gsjj">
      <div class="topDiv">
        公司简介
      </div>
      <div class="textDiv">
        <p>
          中建二局安徽分公司是中建二局在安徽唯一授权经营的三级次机构，起源于1999年，2020年合同额突破100亿元，市场布局以合肥为中心，遍布安徽12个地市，经营实力位列中建集团在皖同级次企业前列。 ——企业精神
        </p>
        <p>
          中建二局安徽分公司秉承“品质保障 价值创造”的核心价值观、“诚信 创新 超越 共赢”的企业精神以及“诚信 务实 竞争”的企业文化和“学习、超越、创优”的团队文化，竭诚回报社会各界的支持与厚爱。 ——发展沿革
        </p>
        <p>
          1999年，根据公司战略部署，挥师进军安徽市场，从承建合肥梦园小区项目起步，开启筑梦安徽的历史征程。 2003年，在安徽地区成立第七项目部，坚持以“制度化、规范化、标准化、精细化、信息化”为抓手，明确以“学习、超越、创优”为指导思想，不断提升团队内功，打造品牌。 2005年，在继续深耕合肥市场的同时，分公司将市场延伸至巢湖、芜湖，承建巢湖华能电厂、芜湖信义玻璃厂、合肥科实厂房、合肥伊利乳业厂房等诸多工业项目。 2009年，以承建合肥包河万达、合肥天鹅湖万达为平台，持续发展，提升品质，打造品牌。 2013年，承建合肥万达文旅城，在发展中逐步提炼“四做一完成”的核心理念，即“做好现场、做稳市场、做精成本、做优团队和完成目标”。 迄今为止，安徽分公司逐步形成了以合肥为中心，辐射阜阳、宿州、亳州、蚌埠、安庆、芜湖、淮北等12个地市的市场空间布局，业态从房建领域拓展到文旅、商业综合体、超高层、医院、学校、地下综合管廊和保障房等多元业务，总管辖项目50余个，施工面积超1000万平米。
        </p>
      </div>
    </div>

    
    <Copyright></Copyright>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
// 版权声明
import Copyright  from "@/components/Copyright_com/index";
// 轮播图组件
// 引入插件
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: 'Dashboard',
  components: { 
    Copyright, //版权声明
    swiper,
    swiperSlide,
    adminDashboard, 
    editorDashboard 
  },
  data() {
    return {
      currentRole: 'adminDashboard',
      swiperOption: {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        loop: true,
        loopFillGroupWithBlank: true,
        coverflowEffect: {
          // 图片旋转角度
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows : true
        },
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ]),
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  },
    methods: {
      onSwiper(swiper) {
        console.log(swiper)
      },
      onSlideChange() {
        console.log('slide change')
      },
    },
}
</script>

<style lang="scss" scoped>
  // @import './base.scss';
    .swiper {
    height: 100%;
    width: 100%;

    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 300px;
      height: 300px;
      text-align: center;
      font-weight: bold;
      // font-size: $font-size-huge * 2;
      background-color: #2C8DFB;
      background-position: center;
      background-size: cover;
      // color: $white;
    }

    .swiper-pagination {
      // /deep/ .swiper-pagination-bullet.swiper-pagination-bullet-active {
        // background-color: $white;
      }
    }
</style>

<style lang="scss">
.dashboard-container{
  padding:15px 32px;
  .xunHuanTu{
    width: calc(100%-64px);
    height: 378px;
    text-align: center;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    
    background-color: rgb(255, 255, 255);
  }
  .swiper {
    width: 70%;
    height: 315px;
  }
  .swiper-slide{
    background-color: rgb(54, 46, 46);
  }
  .gsjj{
    margin-top: 30px;
    padding: 25px 50px;
    width: calc(100%-64px);
    height: 446px;
    background: #FFFFFF;
    opacity: 1;
  }
  .topDiv{
    position: relative;
    width: 80px;
    height: 26px;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 26px;
    color: #333333;
    opacity: 1;
  }
  .topDiv:before{
    /* 重要 */
    content:' ';
    
    position: absolute;
    top: calc(50% + 2px);
    transform: translate(-10px,-50%);
    width: 4px;
    height: 24px;
    background: #4381E5;
  }

  .textDiv{
    width: calc(100%-64px);
    height: 287px;
    font-size: 14px;
    font-weight: 400;
    line-height: 26px;
    color: #333333;
    opacity: 1;
  }
}
</style>
```

