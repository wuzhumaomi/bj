<template>
  <div class="administrator-list container project-tasks">
    <el-form label-width="100px" label-position="right" ref="query" :model="query" :inline="true">
      <div class="queryContent">
        <el-form-item :label="$t('outFactoryManagement.outFactoryCdDis')" class="form-item">
            <el-input v-model="query.outFactoryCdDis" clearable />
        </el-form-item>
        <el-form-item :label="$t('outFactoryManagement.outFactoryNm')" class="form-item">
            <el-input v-model="query.outFactoryNm" clearable  maxlength="400" />
        </el-form-item>
        <el-form-item :label="$t('outFactoryManagement.outFactoryNmEn')" class="form-item">
            <el-input v-model="query.outFactoryNmEn" clearable  maxlength="400" />
        </el-form-item>
        <el-form-item :label="$t('outFactoryManagement.outFactoryJc')" class="form-item">
            <el-input v-model="query.outFactoryoutFactoryJc" clearable  maxlength="400"/>
        </el-form-item>
        <el-form-item :label="$t('outFactoryManagement.outFactoryType')" class="form-item">
            <el-select v-model="query.outFactoryType" >
              <el-option
                v-for="item in outFactoryTypeOptions"
                :key="item.generalCd"
                :label="item.generalNm"
                :value="item.generalCd"/>
            </el-select>
        </el-form-item>
        <el-form-item :label="$t('outFactoryManagement.levelId')" prop="levelId" class="form-item">
            <el-select v-model="query.levelId" clearable >
              <el-option
                v-for="item in levelOptions"
              :key="item.id"
              :label="item.levelNm"
              :value="item.id"/>
            </el-select>
        </el-form-item>
        <el-form-item :label="$t('outFactoryManagement.cntryCd')" prop="cntryCd" class="form-item">
          <el-select v-model="query.cntryCd" >
            <el-option
              v-for="item in cntryCdOptions"
              :key="item.generalCd"
              :label="item.generalNm"
              :value="item.generalCd"/>
          </el-select>                
        </el-form-item>
        <el-form-item :label="$t('outFactoryManagement.paymentType')" prop="paymentType" class="form-item">
        <el-select v-model="query.paymentType" clearable >
          <el-option
            v-for="item in paymentTypeOptions"
            :key="item.generalCd"
            :label="item.generalNm"
            :value="item.generalCd"/>
        </el-select>
        </el-form-item>
      </div>
      <el-row type="flex" justify="end">
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="outFaList">{{ $t('operation.query') }}</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="handleEdit()">{{ $t('operation.newlyAdded') }}</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-table :data="list" :default-sort = "{prop: 'loginId', order: 'descending'}" border style="width: 100%">
      <el-table-column prop="id" label="id" v-if="1==2">
      </el-table-column>
      <el-table-column :label="$t('outFactoryManagement.outFactoryCdDis')" prop="outFactoryCdDis" width="160px" sortable/>
      <el-table-column :label="$t('outFactoryManagement.outFactoryNm')" prop="outFactoryNm" width="160px" sortable/>
      <el-table-column :label="$t('outFactoryManagement.list.outFactoryNmEn')" prop="outFactoryNmEn" width="160px" />
      <el-table-column :label="$t('outFactoryManagement.list.outFactoryJc')" prop="outFactoryJc" width="100px"/>
      <el-table-column :label="$t('outFactoryManagement.list.outFactoryType')" prop="outFactoryType" sortable width="150px"/>
      <el-table-column :label="$t('outFactoryManagement.integral')" prop="integral" width="150px"/>
      <el-table-column :label="$t('outFactoryManagement.levelId')" prop="levelId" width="120px" sortable/>
      <el-table-column :label="$t('outFactoryManagement.outFactoryQc')" prop="outFactoryQc" width="150px"/>
      <el-table-column :label="$t('outFactoryManagement.addr')" prop="addr" width="200px"/>
      <el-table-column :label="$t('outFactoryManagement.zipCode')" prop="zipCode" width="100px" />
      <el-table-column :label="$t('outFactoryManagement.tel')" prop="tel"  width="120px"/>
      <el-table-column :label="$t('outFactoryManagement.fax')" prop="fax"  width="120px"/>
      <el-table-column :label="$t('outFactoryManagement.eMail')" prop="eMail"  width="200px"/>
      <el-table-column :label="$t('outFactoryManagement.cntryCd')" prop="cntryCd" sortable width="100px"/>
      <el-table-column :label="$t('outFactoryManagement.contactsNm')" prop="contactsNm" width="160px" />
      <el-table-column :label="$t('outFactoryManagement.contactsPos')" prop="contactsPos" width="120px" />
      <el-table-column :label="$t('outFactoryManagement.contactsTel')" prop="contactsTel" width="120px"/>
      <el-table-column :label="$t('outFactoryManagement.contactsFax')" prop="contactsFax" width="120px"/>
      <el-table-column :label="$t('outFactoryManagement.contactsMail')" prop="contactsMail" width="150px"/>
      <el-table-column :label="$t('outFactoryManagement.paymentType')" prop="paymentType" sortable width="100px"/>
      <el-table-column :label="$t('outFactoryManagement.ownUserNm')" prop="ownUserId" width="150px"/>
      <el-table-column :label="$t('outFactoryManagement.acceptNm')" prop="acceptId" />
      <el-table-column :label="$t('outFactoryManagement.remarks')" prop="remarks" />
      <el-table-column :label="$t('common.actions')" width="130px" align="center" fixed="right">
        <template slot-scope="scope">
          <el-tooltip :content="$t('operation.edit')" effect="dark" placement="left">
            <el-button icon="el-icon-setting" size="mini" circle  type="primary" plain @click="handleEdit('edit', scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip :content="$t('operation.delete')" effect="dark" placement="bottom">
            <el-button size="mini" icon="el-icon-delete" type="danger" circle plain @click="projectDelete(scope.$index, scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip :content="$t('operation.appriaseHistory')"  effect="dark" placement="bottom">
            <el-button type="primary" size="mini" icon="el-icon-tickets" circle plain @click="outFactoryAppraise()" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="query.page"
      :page-sizes="[10,20,30,50]"
      :page-size="query.limit"
      :total="total"
      layout="total, sizes, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisibleMain" :title="titleName[0]" width="90%" @open="resetDialog" append-to-body>
    <div class="app-container">
      <el-form ref="outFactoryManagementForm" :offset="0" :model="query" label-width="100px" label-position="right" :inline="true">
        <div class="editContent">
        <el-row :gutter="20">
          <!-- <el-col :span="7">
              <el-form-item :label="$t('outFactoryManagement.cntrCd')" width="80%" prop="cntrCd">
                  <el-select v-model="outFactoryManagementForm.cntrCd" :disabled="true" >
                    <el-option
                      v-for="item in cntrOptions"
                      :key="item.id"
                      :label="item.cntrNm"
                      :value="item.id"/>
                  </el-select>
              </el-form-item>
          </el-col> -->
          <el-col :span="7">
            <el-form-item :label="$t('outFactoryManagement.outFactoryCdDis')" prop="outFactoryCdDis">
              <el-input v-model="outFactoryManagementForm.outFactoryCdDis" clearable maxlength="6"/>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item :label="$t('outFactoryManagement.outFactoryNm')" prop="outFactoryNm">
              <el-input v-model="outFactoryManagementForm.outFactoryNm" clearable maxlength="400"/>
            </el-form-item>
          </el-col>
          <el-col :span="7">
              <el-form-item :label="$t('outFactoryManagement.outFactoryNmEn')" prop="outFactoryNmEn">
                <el-input v-model="outFactoryManagementForm.outFactoryNmEn" clearable maxlength="400"/>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7">
              <el-form-item :label="$t('outFactoryManagement.outFactoryJc')" prop="outFactoryJc">
                <el-input v-model="outFactoryManagementForm.outFactoryJc" clearable maxlength="100"/>
              </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item :label="$t('outFactoryManagement.outFactoryType')" prop="outFactoryType">
                <el-select v-model="outFactoryManagementForm.outFactoryType" @change="ofaTypeChange">
                  <el-option
                    v-for="item in outFactoryTypeOptions"
                  :key="item.generalCd"
                  :label="item.generalNm"
                  :value="item.generalCd"/>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item :label="$t('outFactoryManagement.levelId')" prop="levelId">
                <el-select v-model="outFactoryManagementForm.levelId" clearable>
                  <el-option
                    v-for="item in levelOptions"
                  :key="item.id"
                  :label="item.levelNm"
                  :value="item.id"/>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="21">
              <el-form-item :label="$t('outFactoryManagement.addr')" prop="addr">
                <el-input v-model="outFactoryManagementForm.addr" clearable maxlength="100"/>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7">
              <el-form-item :label="$t('outFactoryManagement.zipCode')" prop="zipCode">
                <el-input v-model="outFactoryManagementForm.zipCode" clearable maxlength="100"/>
              </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item :label="$t('outFactoryManagement.tel')" prop="tel">
              <el-input v-model="outFactoryManagementForm.tel" clearable maxlength="100"/>
            </el-form-item>
          </el-col>
          <el-col :span="7">
              <el-form-item :label="$t('outFactoryManagement.fax')" prop="fax">
                <el-input v-model="outFactoryManagementForm.fax" clearable maxlength="100"/>
              </el-form-item>
          </el-col>
          <el-col :span="7">
              <el-form-item :label="$t('outFactoryManagement.eMail')" prop="eMail">
                <el-input v-model="outFactoryManagementForm.eMail" clearable maxlength="100"/>
              </el-form-item>
          </el-col>
          <el-col :span="7">
              <el-form-item :label="$t('outFactoryManagement.cntryCd')" prop="cntryCd">
                <el-select v-model="outFactoryManagementForm.cntryCd">
                  <el-option
                    v-for="item in cntryCdOptions"
                    :key="item.generalCd"
                    :label="item.generalNm"
                    :value="item.generalCd"/>
                </el-select>                
              </el-form-item>
          </el-col>
          <el-col :span="7">
              <el-form-item :label="$t('outFactoryManagement.contactsNm')" prop="contactsNm">
                <el-input v-model="outFactoryManagementForm.contactsNm" clearable maxlength="100"/>
              </el-form-item>
          </el-col>
          <el-col :span="7">
              <el-form-item :label="$t('outFactoryManagement.contactsPos')" prop="contactsPos">
                <el-input v-model="outFactoryManagementForm.contactsPos" clearable maxlength="100"/>
              </el-form-item>
          </el-col>
          <el-col :span="7">
              <el-form-item :label="$t('outFactoryManagement.contactsTel')" prop="contactsTel">
                <el-input v-model="outFactoryManagementForm.contactsTel" clearable maxlength="100"/>
              </el-form-item>
          </el-col>
          <el-col :span="7">
              <el-form-item :label="$t('outFactoryManagement.contactsFax')" prop="contactsFax">
                <el-input v-model="outFactoryManagementForm.contactsFax" clearable  maxlength="100"/>
              </el-form-item>
          </el-col>
          <el-col :span="7">
              <el-form-item :label="$t('outFactoryManagement.contactsMail')" prop="contactsMail">
                <el-input v-model="outFactoryManagementForm.contactsMail" clearable  maxlength="100"/>
              </el-form-item>
          </el-col>
          <el-col :span="7">
              <el-form-item :label="$t('outFactoryManagement.paymentType')" prop="paymentType">
              <el-select v-model="outFactoryManagementForm.paymentType" clearable>
                <el-option
                  v-for="item in paymentTypeOptions"
                  :key="item.generalCd"
                  :label="item.generalNm"
                  :value="item.generalCd"/>
              </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="7">
            <!-- 本公司联络人--><!--TODO:未测试-->
            <el-form-item :label="$t('outFactoryManagement.ownUserNm')" prop="ownUserNm" >
              <el-input  v-model="outFactoryManagementForm.ownUserNm"  clearable  disabled>
                <el-button slot="append"  icon="el-icon-more" @click="personList()" id='el-input__more' ></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7">
            <!-- 审批人--><!--TODO:未测试-->
            <el-form-item :label="$t('outFactoryManagement.acceptNm')" prop="acceptNm" >
              <el-input v-model="outFactoryManagementForm.acceptNm" clearable  disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="21">
              <el-form-item :label="$t('outFactoryManagement.outFactoryQc')" prop="outFactoryQc">
                <el-input v-model="outFactoryManagementForm.outFactoryQc" clearable maxlength="400"/>
              </el-form-item>
          </el-col>
          <el-col :span="21">
              <el-form-item :label="$t('outFactoryManagement.remarks')" prop="remarks">
                <el-input type="textarea" v-model="outFactoryManagementForm.remarks" clearable show-word-limit/>
              </el-form-item>
          </el-col>
        </el-row>
        </div>
      <el-card shadow="always" class="tab_border">
          <el-form-item  prop="remarks">
            <el-col :span="24">
              <el-button class="but_bottom"  type="primary"  plain icon="el-icon-plus" @click="addRow(1)">{{ $t('common.addAline') }}</el-button>
              <el-table
                :data="tableData1"
                ref="table"
                tooltip-effect="dark"
                border
                stripe
                highlight-current-row	
                class="intervalRows">
                <el-table-column :label="$t('outFactoryManagement.detail.prodCdDis')" width="300px" align="center">
                  <template slot-scope="scope">{{ scope.row.prodNm }}
                    <el-button v-if="scope.$index % 2 == 0" circle icon="el-icon-more" type="primary" style="float:right" @click="productList()" ></el-button>
                    <el-button v-if="scope.$index % 2 == 1" circle icon="el-icon-more" type="primary" style="float:right" @click="productYarnList()" ></el-button>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('outFactoryManagement.detail.colorCd')" align="center" width="180px" prop="colorCd" >
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.colorCd"  maxlength="100">
                      <el-button circle icon="el-icon-more" type="primary" slot="append" @click="productList()" ></el-button>
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('outFactoryManagement.detail.prodQc')" align="center" width="200px" prop="prodQc" />
                <el-table-column :label="$t('outFactoryManagement.detail.acceptNm')" align="center" width="100px" prop="acceptId" />
                <el-table-column :label="$t('outFactoryManagement.detail.remarks')" align="center" width="140px" prop="remarks" />
                <el-table-column :label="$t('common.actions')" align="center" width="60px" >
                  <template slot-scope="scope">
                    <el-tooltip :content="$t('common.delectThisRow')" placement="left">
                      <el-button  type="danger" plain circle icon="el-icon-delete" @click="reduceRow(scope.$index,1)"/>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-form-item>
        </el-card>
        <!-- <el-row>
          <el-col :span="12" style="padding: 10 30 0 30;text-align: center;">
            <el-form-item >
              <el-button icon="el-icon-check" type="primary" @click="close_add_editMain">{{ $t('common.save') }}</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="padding: 10 30 0 30;text-align: center;">
            <el-form-item align="center">
              <el-button icon="el-icon-close" @click="close_add_editMain">{{ $t('common.back') }}</el-button>
            </el-form-item>
          </el-col>
        </el-row> -->
      <div class="Btnfooter">
        <el-form-item>
          <el-button type="primary" icon="el-icon-check" @click="close_add_editMain">{{ $t('common.save') }}</el-button>
          <el-button icon="el-icon-close" @click="close_add_editMain">{{ $t('common.back') }}</el-button>
        </el-form-item>
      </div>

          <product_list @func="getMsgFormSon" ref="productLists" />
          <product_yarn_list @func="getMsgFormSon" ref="productYarnLists" />
      </el-form>
      </div>
  </el-dialog>
  <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisibleAppraise" title="外发工厂评价" :before-close="close_add_editAppriase" width="800px">
    <el-row>
      <el-form ref="appraiseForm" :model="appraiseForm" :inline="true" class="form-float">
      <el-col :span="8" style="padding-bottom: 0px;">
          <!--客户名称-->
          <el-form-item :label="$t('outFactoryManagement.appraise.outFactoryCd')">{{appraiseForm.outFactoryCd}}</el-form-item>
      </el-col>
      <el-col :span="8" style="padding-bottom: 0px;">
          <!-- 评价等级 -->
          <el-form-item :label="$t('outFactoryManagement.appraise.appraiseLevelTitle')">{{appraiseForm.appraiseLevel}}</el-form-item>
          <!-- <el-button icon="el-icon-search" type="primary" style="margin-right:5px;float:right" >{{ $t('operation.query') }}</el-button> -->
      </el-col>
      <el-col :span="8" style="padding-bottom: 0px;">
          <!-- 积分 -->
          <el-form-item :label="$t('customInfo.point')">{{appraiseForm.integral}}</el-form-item>
      </el-col>
    </el-form>
    </el-row>
    <el-table ref="appraiseList" :data="appraiseList" tooltip-effect="dark" style="width: 100%" border>
      <!-- <el-table-column type="selection" width="55">
      </el-table-column> -->
      <el-table-column :label="$t('outFactoryManagement.appraise.orgId')" align="center" width="140">
        <template slot-scope="scope">{{ scope.row.orgId }}</template>
      </el-table-column>
      <el-table-column :label="$t('outFactoryManagement.appraise.outFactoryCd')" align="center" width="140">
        <template slot-scope="scope">{{ scope.row.outFactoryCd }}</template>
      </el-table-column>
      <el-table-column :label="$t('outFactoryManagement.appraise.commonCd')" align="center" width="140">
        <template slot-scope="scope">{{ scope.row.commonCd }}</template>
      </el-table-column>
      <el-table-column :label="$t('outFactoryManagement.appraise.appraiseLevel')" align="center" width="140">
        <template slot-scope="scope">{{ scope.row.appraiseLevel }}</template>
      </el-table-column>
      <el-table-column :label="$t('outFactoryManagement.appraise.appraiseType')" align="center" width="140">
        <template slot-scope="scope">{{ scope.row.appraiseType }}</template>
      </el-table-column>
      <el-table-column :label="$t('outFactoryManagement.appraise.remarks')" align="center" width="198">
        <template slot-scope="scope">{{ scope.row.remarks }}</template>
      </el-table-column>
    </el-table>
    <!-- <div slot="footer" class="dialog-footer">
      <el-button icon="el-icon-close">取 消</el-button>
      <el-button icon="el-icon-check" type="primary" @click="confirmSubmit()">确 定</el-button>
    </div> -->
    <el-pagination
      :current-page.sync="query.page"
      :page-sizes="[10,20,30,50]"
      :page-size="query.limit"
      :total="total"
      layout="total, sizes, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
      <!-- <el-button type="primary" icon="el-icon-close" @click="close_add_editAppriase">{{ $t('common.back') }}</el-button> -->
      <div class="appraiseClose">
        <el-button icon="el-icon-close" @click="close_add_editAppriase">{{ $t('common.back') }}</el-button>
      </div>
  </el-dialog>
  </div>
</template>

<script>

import product_list from '@/views/Supplier/productList'
import product_yarn_list from '@/views/Supplier/productYarnList'

export default {
  name:'OutFactoryManagement',
  components: {
    product_list,
    product_yarn_list,
  },
  data() {
    return {
      cntrOptions: [{code:'1',text:'上海提桥'},{code:'2',text:'江苏提桥'}],
      levelOptions: [{code:'01',text:'五星'},{code:'02',text:'四星'},{code:'03',text:'三星'},{code:'04',text:'二星'}],
      outFactoryTypeOptions: [{code:'01',text:'针织'},
        {code:'02',text:'染纱'},
        {code:'03',text:'染布'},
        {code:'04',text:'倍捻'},
        {code:'05',text:'丝光'},
        {code:'09',text:'多类型'},],
      paymentTypeOptions: [{code:'01',text:'现结'},
        {code:'02',text:'月结'},
        {code:'03',text:'季结'},
        {code:'04',text:'半年结'},
        {code:'05',text:'年结'},
      ],
      appraiseLevelOptions: [
        {code:'01',text:'差评'},
        ,{code:'02',text:'中评'},
        ,{code:'03',text:'好评'},],
      appraiseForm: {
        orgId:'1',
        outFactoryCd:'宁波A厂',
        integral: '50',
        appraiseLevel:'五星',
        commonCd:'通用',
        remarks:'备注',
        
      },
      appraiseList: [
        {
        id:'1',
        orgId:'生产部',
        outFactoryCd:'宁波A厂',
        appraiseType:'断线',
        commonCd:'A0280000',
        appraiseLevel:'中评',
        remarks:'备注'},
        {
        id:'2',
        orgId:'生产部',
        outFactoryCd:'宁波A厂',
        appraiseType:'色匀',
        commonCd:'A0280000',
        appraiseLevel:'好评',
        remarks:'备注'},
        {
        id:'3',
        orgId:'生产部',
        outFactoryCd:'宁波A厂',
        appraiseType:'不漏针',
        commonCd:'A0280000',
        appraiseLevel:'中评',
        remarks:'备注'},
      ],
      total: 0,
      outFactoryManagementForm: {id:"1",
        cntrCd:'上海提桥',
        outFactoryCd:'0001',
        outFactoryNm:'外发工厂A',
        outFactoryNmEn:'outFactoryA',
        outFactoryJc:'ofa',
        outFactoryType:'针织',
        levelId:'四星',
        outFactoryQc:'ISO9002',
        integral:'50',
        addr:'上海市普陀区xx路xx号',
        zipCode:'200000',
        tel:'021-88888888',
        fax:'021-66666666',
        eMail:'123@abc.com',
        cntryCd:'中国',
        contactsNm:'庞六',
        contactsPos:'主管',
        contactsTel:'18066666666',
        contactsFax:'18088888888',
        contactsMail:'234@aa.com',
        paymentType:'月结',
        ownUserId:'李四',
        acceptId:'张三',
        remarks:'备注',
        },
      list: [
        {id:"1",
        cntrCd:'上海提桥',
        outFactoryCd:'0001',
        outFactoryNm:'外发工厂A',
        outFactoryNmEn:'outFactoryA',
        outFactoryJc:'ofa',
        outFactoryType:'针织',
        levelId:'三星',
        outFactoryQc:'ISO9002',
        integral:'50',
        addr:'上海市普陀区xx路xx号',
        zipCode:'200000',
        tel:'021-88888888',
        fax:'021-66666666',
        eMail:'123@abc.com',
        cntryCd:'中国',
        contactsNm:'庞六',
        contactsPos:'主管',
        contactsTel:'18066666666',
        contactsFax:'18088888888',
        contactsMail:'234@aa.com',
        paymentType:'月结',
        ownUserId:'李四',
        acceptId:'张三',
        remarks:'备注',},
        {id:"2",
        cntrCd:'上海提桥',
        outFactoryCd:'0001',
        outFactoryNm:'外发工厂B',
        outFactoryNmEn:'outFactoryA',
        outFactoryJc:'ofa',
        outFactoryType:'针织',
        levelId:'三星',
        outFactoryQc:'ISO9002',
        integral:'50',
        addr:'上海市普陀区xx路xx号',
        zipCode:'200000',
        tel:'021-88888888',
        fax:'021-66666666',
        eMail:'123@abc.com',
        cntryCd:'中国',
        contactsNm:'庞六',
        contactsPos:'主管',
        contactsTel:'18066666666',
        contactsFax:'18088888888',
        contactsMail:'234@aa.com',
        paymentType:'月结',
        ownUserId:'李四',
        acceptId:'张三',
        remarks:'备注',},
                {id:"3",
        cntrCd:'上海提桥',
        outFactoryCd:'0001',
        outFactoryNm:'外发工厂C',
        outFactoryNmEn:'outFactoryA',
        outFactoryJc:'ofa',
        outFactoryType:'染纱',
        levelId:'三星',
        outFactoryQc:'ISO9002',
        integral:'50',
        addr:'上海市普陀区xx路xx号',
        zipCode:'200000',
        tel:'021-88888888',
        fax:'021-66666666',
        eMail:'123@abc.com',
        cntryCd:'中国',
        contactsNm:'庞六',
        contactsPos:'主管',
        contactsTel:'18066666666',
        contactsFax:'18088888888',
        contactsMail:'234@aa.com',
        paymentType:'月结',
        ownUserId:'李四',
        acceptId:'张三',
        remarks:'备注',},
      ],
      query: {
        page: 1,
        limit: 10,
        status: '',
        isEnabled: '',
        isPublish: '',
        cntrCd:'1',
        outFactoryCd:'',
        outFactoryNm:'',
        outFactoryNmEn:'',
        outFactoryJc:'',
        outFactoryType:'',
      },
      dialogVisibleMain: false,
      dialogVisible: false,
      dialogVisibleDep: false,
      dialogVisibleAppraise: false,
      titleName:[],
      tableData1: [{
        outFactoryId:'1',
        outFactoryLineNum:'1',
        prodId:'P000001',
        prodNm:'40s/1TK+30DOP 汗布',
        colorCd:'A02',
        prodQc:'ISO9002',
        acceptId:'张三',
        remarks:'备注',
      }],
      tableData2: [{}],
      tableData3: [{}],
      cntryCdOptions: [{code:'01',text:'中国'},
        {code:'02',text:'日本'},
        {code:'03',text:'台湾'},
      ],    }
  },
  created() {
    return {}
  },
  computed: {
  },
  methods: {
    resetDialog() {
      // this.$refs['outFactoryManagementForm'].resetFields()
    },
    addRow(index) {
      if(index === 1){
        this.rowBranches(this.tableData1);
      }else if(index === 2){
        this.rowBranches(this.tableData2);
      }else if(index === 3){
        this.rowBranches(this.tableData3);
      }else{
        console.log('error',index);
      }
    },
        // 新增模块减少一行
    reduceRow(val,number) {
      if(number === 1){
        this.tableData1.splice(val, 1)
      }else if(number ===2){
        this.tableData2.splice(val, 1)
      }else if(number ===3){
        this.tableData3.splice(val, 1)
      }else{
        console.log('error',number);
      }
    },
    rowBranches(datas) {
      if(datas.length > 5) {
          this.$message({
            message: '一次性最多可以添加五条数据',
            type: 'warning'
          })
          return false
        }
      var newValue = {
        modNm: '',
        modSm: ''
      };
      //添加新的行数
      datas.push(newValue)
    },
    handleEdit(index, row) {
      if(index === undefined){
        this.dialogVisibleMain = true
        this.titleName[0] = '新增'
      }else if(index === 'edit'){
        this.dialogVisibleMain = true
        this.titleName[0] = '编辑';
      }else if(index === 'role'){
        this.dialogVisible = true
        this.titleName[1] = '商品选择'
        let addProIds = this.query.isPublish;//获取项目
        // this.$refs.rolesAddEdits.addProject(addProIds);
        // setTimeout(()=>{
        //     this.$refs.tasksAddEdits.addProject(addProIds);
        // })
      }else if(index === 'dept'){
        this.dialogVisibleDep = true
        this.titleName[1] = '纱线选择';
        // this.$refs.deptsAddEdits.dateIs(row,'');
        // setTimeout(()=>{
        //     this.$refs.tasksAddEdits.dateIs(row,this.distinguishName);
        // })
      }

    },
    getMsgFormSon(data){
      let str = '';
      if(data){
        data.forEach(function(value,i){
            str += value.name+ ",";
        })
      }
      this.msgFormSon = str;
    },
    productList() {
      this.$refs.productLists.open()
      // this.varChangeColor = true;
    },
    
    //纱线仓库
    productYarnList() {
      this.$refs.productYarnLists.open()
      // this.varChangeColor = true;
    },
    // handleCreate() {
    //   this.$router.push({ path: 'outFactoryManagementOver'})
    // },
    personList() {
    },
    setSort() {
      const el = this.$refs.dragSelect.$el.querySelectorAll('.el-select__tags > span')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = this.value.splice(evt.oldIndex, 1)[0]
          this.value.splice(evt.newIndex, 0, targetRow)
        }
      })
    },
    //分页
    handleCurrentChange(val) {
      this.query.page = val
      this.personList()
    },
    //分页
    handleSizeChange(val) {
      this.query.limit = val
      this.personList()
    },
    //查看评价
    outFactoryAppraise() {
      this.dialogVisibleAppraise = true
    },
    //删除
    projectDelete(index,row){
      // this.$router.push({ path: 'caseManagementOver'})
      this.$confirm(this.$t('common.message.confirm_delete'), this.$t('common.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        // apiRole.deleteRole(row.id).then(responce => {
          this.$message.success(this.$t('common.message.info_operation_success'))
          this.list.splice(index, 1);
          // this.personList()
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('common.message.info_delete_canceled')
        })
      })
    },

    
    close_add_editMain(){//父组件关闭时，跟接收到子的取消时清空子的数据。
      this.dialogVisibleMain = false
    },
    close_add_editAppriase(){//父组件关闭时，跟接收到子的取消时清空子的数据。
      this.dialogVisibleAppraise = false
    },
    //关闭
    close_add_edit(){//父组件关闭时，跟接收到子的取消时清空子的数据。
      this.dialogVisible = false
    },

    close_add_edit2(){//父组件关闭时，跟接收到子的取消时清空子的数据。
      this.dialogVisibleDep = false
    },

  }
}
</script>

<style>
.editContent{
  border:1px solid darkgray;
  border-radius:5px;
  /* border: 0ch */
  padding-top:10px
}
.Btnfooter{
  margin-top:10px;
}
.form-float > div{
  float: left;
}
.toolbar {
	background: #f2f2f2;
	padding: 10px;
	margin: 10px 0px;
}
.el-dialog__body {
    padding: 0px 20px 20px;
    height:100%;
}
.el-card__body {
    /* height: 200px; */
    padding: 20px;
}
.appraiseClose{
  margin-top:10px;
  text-align: right;
}
</style>
