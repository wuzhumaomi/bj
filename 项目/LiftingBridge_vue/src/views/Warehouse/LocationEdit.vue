<template>
<el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" title="库位-编辑新增" width="85%">
   <!-- 库位-编辑新增 -->
  <div class="app-container">
    <el-form ref="edit"  :model="edit" :rules="rules">
      <div class="editContent" >
        <el-row :gutter="23" style="padding:8px 12px 2px 12px">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <!--中心编号-->
              <el-form-item :label="$t('location.cntrCd')" label-width="110px">
                <el-select disabled v-model="cntrList.value" :placeholder="$t('上海题桥')">
                  <el-option v-for="item in cntrList"  :key="item.id" :label="item.value" :value="item.id"/>
                </el-select>
              </el-form-item>
              <!--库位编号-->
              <el-form-item :label="$t('location.detail.locCdDis')" label-width="110px" prop="locCdDis">
                <el-input clearable v-model="edit.locCdDis" :placeholder="$t('placeholders.content')" maxlength="10"></el-input>
              </el-form-item>
              <!-- 高度上限 -->
              <el-form-item :label="$t('location.heightLimit')" label-width="110px" prop="heightLimit">
                <el-input clearable  v-model="edit.heightLimit" :placeholder="$t('placeholders.content')"/>
              </el-form-item>
              <!--最大重量-->
              <el-form-item :label="$t('location.wgtLimit')" label-width="110px" prop="wgtLimit">
                <el-input clearable  v-model="edit.wgtLimit" :placeholder="$t('placeholders.content')" />
              </el-form-item>
              <!-- 禁止操作区分 -->
              <!-- <el-form-item :label="$t('location.allcNgCls')" prop="allcNgCls" label-width="110px">
                <el-radio v-model="radio" label="1">可使用</el-radio>
                <el-radio v-model="radio" label="2">不可使用</el-radio>
              </el-form-item> -->
              <!-- 备注 -->
              <el-form-item :label="$t('location.remarks')" prop="remarks" label-width="110px">
                <el-input clearable v-model="edit.remarks" rows="2" cols="100" type="textarea" style="width:250%;" maxlength="400">
                </el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <!--仓库-->
              <el-form-item :label="$t('location.whNm')" prop="whNm" label-width="110px">
                <el-select v-model="edit.whNm" :placeholder="$t('personInfo.choose')">
                  <el-option v-for="item in whList"  :key="item.id" :label="item.value" :value="item.id"/>
                </el-select>
                <!-- <el-input clearable style="width: 190px" v-model="edit.whNm" :placeholder="$t('placeholders.content')"></el-input> -->
              </el-form-item>
              <!--库位名称-->
              <el-form-item :label="$t('location.locNm')" label-width="110px" prop="locNm">
                <el-input clearable  v-model="edit.locNm" :placeholder="$t('placeholders.content')" maxlength="50"></el-input>
              </el-form-item>
              <!-- 宽度上限 -->
              <el-form-item :label="$t('location.widthLimit')" label-width="110px" prop="widthLimit">
                <el-input clearable v-model="edit.widthLimit" :placeholder="$t('placeholders.content')"/>
              </el-form-item>
              <!-- 入库顺序 -->
              <el-form-item :label="$t('location.rankForOns')" label-width="110px">
                <el-input  v-model="edit.rankForOns" clearable :placeholder="$t('placeholders.content')"/>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <!--区域-->
              <el-form-item :label="$t('location.zoneNm')" prop="zoneNm" label-width="110px">
                <el-select v-model="edit.zoneNm" :placeholder="$t('personInfo.choose')">
                  <el-option v-for="item in zoneList"  :key="item.id" :label="item.value" :value="item.id"/>
                </el-select>
                <!-- <el-input clearable style="width:190px" v-model="edit.zoneNm" :placeholder="$t('placeholders.content')"></el-input> -->
              </el-form-item>
              <!--库位类型-->
              <el-form-item :label="$t('location.locType')" label-width="110px">
                <el-select v-model="edit.locType" :placeholder="$t('personInfo.choose')" >
                  <el-option v-for="item in typeList"  :key="item.id" :label="item.value" :value="item.id"/>
                </el-select>
              </el-form-item>
              <!-- 长度上限 -->
              <el-form-item :label="$t('location.depthLimit')" label-width="110px" prop="depthLimit">
                <el-input clearable v-model="edit.depthLimit" :placeholder="$t('placeholders.content')"/>
              </el-form-item>
              <!-- 出库顺序 -->
              <el-form-item :label="$t('location.rankForIss')" label-width="110px">
                <el-input v-model="edit.rankForIss" clearable :placeholder="$t('placeholders.content')"/>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="Btnfooter">
      <el-form-item>
        <el-button type="primary" icon="el-icon-check" @click="onSubmit1">{{ $t('common.save') }}</el-button>
        <el-button icon="el-icon-close" @click="backPoject">{{ $t('common.back') }}</el-button>
      </el-form-item>
      </div>
    </el-form>
  </div>
  </el-dialog>
</template>

<script>
// import { apiProject, apiProTasks } from '@/api'
import product_list from '@/views/Supplier/productList'
import {validateENum,validateDecimal,validateEN} from '@/filters/validator'
import { fips } from 'crypto';
import { debuglog } from 'util';
export default {
  name:'productList',
  components: {
    product_list,
  },
  data() {
    // // 验证高度上限
    // const heightLimit = (rules, value, callback) => {
    //   debugger
    //   let  val=Number(value);
    //   let numReg=/^\d+(\.\d+)?$/;
    //   if(numReg.test(val)){
    //     callback();
    //   }else{
    //     return callback(new Error(this.$t('只能输入数字')))
    //   }
    // }
    return {
      radio: '1',
      cntrList: [
        { id: '001', value: '上海提桥' },
        { id: '002', value: '江苏提桥' }
      ],
      whList: [
        { id: '001', value: '筒纱毛坯仓' },
        { id: '002', value: '短纤毛坯纱仓' },
        { id: '003', value: '长纤毛坯纱仓' }
      ],
      zoneList:[
        { id: '001', value: '散货区域' },
        { id: '002', value: '临时存放区域' },
        { id: '003', value: '普通存放区域' }
      ],
      typeList:[
        {id:'01',value:'通用'},
        {id:'02',value:'零散'},
        {id:'03',value:'准备'},
        {id:'90',value:'临时'},
      ],
      projectList: [],
      dialogVisible: false,
      tableData1: [{}],
      tableData2: [{}],
      tableData3: [{}],
      msgFormSon:'',
      edit: {
          whNm: '筒纱毛坯仓',
          zoneNm: '临时存放区域',
          locCdDis: 'A01',
          locNm: '库位1',
          locType: '临时',
          wgtLimit: '10',
          heightLimit: '10',
          widthLimit: '42',
          depthLimit: '23',
          rankForOns: '2',
          rankForIss: '1',
          allcNgCls: '可使用',
          remarks:'REMARk'
      },
      rules: {
          whNm: [{ required: true,message:'仓库不能为空'}],
          zoneNm: [{ required: true,message:'区域不能为空'}],
          wgtLimit: [{ required: false,validator: validateDecimal, trigger: 'blur' }],
          heightLimit: [{ required: false,validator: validateDecimal, trigger: 'blur' }],
          widthLimit: [{ required: false,validator: validateDecimal, trigger: 'blur' }],
          depthLimit: [{ required: false,validator: validateDecimal, trigger: 'blur' }],
          locNm: [{ required: true,message:'库位名不能为空'}],
          //allcNgCls: [{ required: true,message:''}],
          locCdDis:[{ required: false,validator: validateENum, trigger: 'blur' }]
        // groupNo: [{ required: false, validator: heightLimit, trigger: 'blur' }],
      },
    }
  },
  created() {

  },
  methods: {
    // checkNo(value){
    //   console.log('ss');
    //   let reg = /^[1-9]\d*$/;
    //   if (value) {
    //     if (value > 999999 || new RegExp(reg).test(value) == false) {
    //       setTimeout(() => {
    //          return 0;
    //       }, 200);
    //     }
    //   }
    // },
    checkNumber(){
      debugger
        let reg = /^[1-9]\d*$/;
        if(new RegExp(reg).test(this.edit.wgtLimit)==false){
            this.edit.wgtLimit=""
            console.log="只能输入数字！"
            // callback(new Error(this.$t('common.message.info_input_team')))
            // return
        }
    },
    //可输入小数点
    checkNumberpoint(){
      debugger
        let reg = /^[1-9]\d*$/;
        if(new RegExp(reg).test(this.edit.wgtLimit)==false){
            this.edit.wgtLimit=""
            console.log="只能输入数字！"
            // callback(new Error(this.$t('common.message.info_input_team')))
            // return
        }
    },
    
    // getMsgFormSon(data){
    //   let str = '';
    //   if(data){
    //     data.forEach(function(value,i){
    //         str += value.name+ ",";
    //     })
    //   }
    //   this.msgFormSon = str;
    // },

    // checkIdinput:function(){
    //   debugger
    //     //控制不可以输入汉字
    //     var r = /^[^\u4e00-\u9fa5]+$/;
    //     if(r.test(this.wgtLimit)){
    //         console.log("1")
    //     }else{
    //         console.log("error");
    //         this.wgtLimit="";
    //     }
    // },

    //弹出框
    productList() {
      this.$refs.productLists.open()
      // this.varChangeColor = true;
    },

    open() {//只能开始一次。
      this.dialogVisible = true
    },
    onSubmit1() {
      // this.$refs['edit'].validate(valid => {
      //   if (valid) {
      //     for(var i = 0; i < this.value.length; i++) {
      //       // this.edit.startDate = unixToDateTime(this.value[0])
      //       // if(this.value[1] != "" && this.value[1] != undefined) {
      //       //   this.projectForm.endDate = unixToDateTime(this.value[1])
      //       // }
      //     }
      //   }
      // })
      this.dialogVisible=false
    },
    // 返回
    backPoject() {
      this.dialogVisible=false
      //this.$router.push({ path: '/whList'})
    },
    customerOrder() {
      this.$refs.customerOrders.open()
    },
  }
}
</script>
<style>
.editContent{
  border:1px solid darkgray;
  border-radius:5px
  /* border: 0ch */
}
.Btnfooter{
  margin-top:10px;
}
.tab_border{
  margin: 12px 10px;
}
.inputTextarea textarea{
  resize:none;
}
.but_bottom{
  float:right;margin-bottom:16px
}

.intervalRows{
  margin-bottom: 10px
}

</style>
