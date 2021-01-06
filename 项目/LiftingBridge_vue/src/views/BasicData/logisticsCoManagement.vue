<template>
  <div class="administrator-list container project-tasks">
    <el-form ref="query" label-width="100px" label-position="right" :model="query" :inline="true">
      <div class="queryContent">
        <el-form-item :label="$t('logisticsCoManagement.carrierCdDis')" class="form-item">
            <el-input v-model="query.carrierCdDis" clearable />
        </el-form-item>
        <el-form-item :label="$t('logisticsCoManagement.carrierNm')" class="form-item">
            <el-input v-model="query.carrierNm" clearable />
        </el-form-item>
        <el-form-item :label="$t('logisticsCoManagement.carrierNmEn')" class="form-item">
            <el-input v-model="query.carrierNmEn" clearable  maxlength="400" />
        </el-form-item>
        <el-form-item :label="$t('logisticsCoManagement.carrierJc')" class="form-item">
            <el-input v-model="query.outFactoryoutFactoryJc" clearable  maxlength="400"/>
        </el-form-item>
        <el-form-item :label="$t('logisticsCoManagement.carrierType')" class="form-item">
            <el-select v-model="query.carrierType" clearable  >
              <el-option
                v-for="item in carrierTypeOptions"
                :key="item.generalCd"
                :label="item.generalNm"
                :value="item.generalCd"/>
            </el-select>
        </el-form-item>
        <el-form-item :label="$t('logisticsCoManagement.levelId')" prop="levelId" class="form-item">
            <el-select v-model="query.levelId" clearable >
              <el-option
                v-for="item in levelOptions"
              :key="item.id"
              :label="item.levelNm"
              :value="item.id"/>
            </el-select>
        </el-form-item>
        <el-form-item :label="$t('logisticsCoManagement.cntryCd')" prop="cntryCd" class="form-item">
          <el-select v-model="query.cntryCd" >
            <el-option
              v-for="item in cntryCdOptions"
              :key="item.generalCd"
              :label="item.generalNm"
              :value="item.generalCd"/>
          </el-select>                
        </el-form-item>
        <el-form-item :label="$t('logisticsCoManagement.paymentType')" prop="paymentType" class="form-item">
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
          <el-button type="primary" icon="el-icon-plus" @click="handleEdit()">{{ $t('operation.newlyAdded') }}</el-button>
          <el-button type="primary" icon="el-icon-search" @click="getLogiCoList()">{{ $t('operation.query') }}</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-table :data="list"  border style="width: 100%"  class="operationCss" >
      <el-table-column :label="$t('logisticsCoManagement.carrierCdDis')" prop="carrierCdDis" width="120px"/>
      <el-table-column :label="$t('logisticsCoManagement.list.carrierNm')" prop="carrierNm" width="200px"/>
      <el-table-column :label="$t('logisticsCoManagement.list.carrierNmEn')" prop="carrierNmEn" />
      <el-table-column :label="$t('logisticsCoManagement.list.carrierJc')" prop="carrierJc" />
      <el-table-column :label="$t('logisticsCoManagement.carrierType')" width="120px" prop="carrierType" >
        <template slot-scope="scope">
         <span v-if = "scope.row.carrierType == '01'" >国内</span>
         <span v-else-if = "scope.row.carrierType == '02'">国际</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('logisticsCoManagement.integral')" width="120" prop="integral" />
      <el-table-column :label="$t('logisticsCoManagement.levelId')" prop="levelId" />
      <el-table-column :label="$t('logisticsCoManagement.carrierQc')" prop="carrierQc" />
      <el-table-column :label="$t('logisticsCoManagement.addr')" prop="addr" />
      <el-table-column :label="$t('logisticsCoManagement.zipCode')" prop="zipCode" />
      <el-table-column :label="$t('logisticsCoManagement.tel')" prop="tel" width="120" />
      <el-table-column :label="$t('logisticsCoManagement.fax')" prop="fax" width="120" />
      <el-table-column :label="$t('logisticsCoManagement.eMail')" prop="eMail" width="160" />
      <el-table-column :label="$t('logisticsCoManagement.cntryCd')" prop="cntryCd" >
        <template slot-scope="scope">
         <span v-if = "scope.row.cntryCd == '01'" >中国</span>
         <span v-else-if = "scope.row.cntryCd == '02'">日本</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('logisticsCoManagement.contactsNm')" prop="contactsNm" width="120" />
      <el-table-column :label="$t('logisticsCoManagement.contactsPos')" prop="contactsPos" width="120" />
      <el-table-column :label="$t('logisticsCoManagement.contactsTel')" prop="contactsTel" width="120" />
      <el-table-column :label="$t('logisticsCoManagement.contactsFax')" prop="contactsFax" width="120" />
      <el-table-column :label="$t('logisticsCoManagement.contactsMail')" prop="contactsMail" width="120" />
      <el-table-column :label="$t('logisticsCoManagement.paymentType')" prop="paymentType">
        <template slot-scope="scope">
         <span v-if = "scope.row.paymentType == '01'" >现结</span>
         <span v-else-if = "scope.row.paymentType == '02'">月结</span>
         <span v-else-if = "scope.row.paymentType == '03'">季结</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('logisticsCoManagement.ownUserId')" prop="ownUserId" width="120" />
      <el-table-column :label="$t('logisticsCoManagement.acceptId')" prop="acceptId" />
      <el-table-column :label="$t('logisticsCoManagement.remarks')" prop="remarks" />
      <el-table-column :label="$t('common.actions')" width="130px" align="center" fixed="right">
        <template slot-scope="scope">
          <el-tooltip :content="$t('operation.edit')" effect="dark" placement="left">
            <el-button type="primary" size="mini" icon="el-icon-setting" plain circle @click="handleEdit('edit', scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip :content="$t('operation.delete')" effect="dark" placement="bottom">
            <el-button size="mini" icon="el-icon-delete" type="danger" plain circle @click="projectDelete(scope.$index, scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip :content="$t('operation.appriaseHistory')"  effect="dark" placement="bottom">
            <el-button type="primary" size="mini" icon="el-icon-tickets" plain circle @click="logisticsManagementAppraise()" />
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
      <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" :title="titleName" width="90%" @open="resetDialog" >
        <div class="app-container">
                    <el-form ref="logisticsCoManagementForm" label-position="right" label-width="100px" :model="logisticsCoManagementForm" >
            <div class="editContent">
            <!-- <el-row :gutter="20">
              <el-col :span="7" >
                  <el-form-item :label="$t('logisticsCoManagement.cntrCd')">
                      <el-select v-model="logisticsCoManagementForm.cntrCd" :disabled="true">
                        <el-option
                            v-for="item in cntrOptions"
                            :key="item.id"
                            :label="item.cntrNm"
                            :value="item.id"/>
                      </el-select>
                  </el-form-item>
              </el-col>
            </el-row> -->
            <el-row :gutter="20">
              <el-col :span="14">
                  <el-form-item :label="$t('logisticsCoManagement.carrierCdDis')">
                    <el-input v-model="logisticsCoManagementForm.carrierCdDis" clearable maxlength="400"/>
                  </el-form-item>
              </el-col>
              <el-col :span="14">
                  <el-form-item :label="$t('logisticsCoManagement.carrierNm')">
                    <el-input v-model="logisticsCoManagementForm.carrierNm" clearable maxlength="400"/>
                  </el-form-item>
              </el-col>
              <el-col :span="14">
                  <el-form-item :label="$t('logisticsCoManagement.carrierNmEn')">
                    <el-input v-model="logisticsCoManagementForm.carrierNmEn" clearable maxlength="400"/>
                  </el-form-item>
              </el-col>
              <el-col :span="14">
                  <el-form-item :label="$t('logisticsCoManagement.carrierJc')">
                    <el-input v-model="logisticsCoManagementForm.carrierJc" clearable maxlength="100"/>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="7">
                <el-form-item :label="$t('logisticsCoManagement.carrierType')">
                    <el-select v-model="logisticsCoManagementForm.carrierType" clearable>
                      <el-option
                        v-for="item in carrierTypeOptions"
                        :key="item.generalCd"
                        :label="item.generalNm"
                        :value="item.generalCd"/>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item :label="$t('logisticsCoManagement.integral')" prop="integral">
                    <el-input v-model="logisticsCoManagementForm.integral" :disabled="true" maxlength="26" />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item :label="$t('logisticsCoManagement.levelId')" prop="levelId">
                  <el-select v-model="logisticsCoManagementForm.levelId" clearable>
                    <el-option
                    v-for="item in levelOptions"
                    :key="item.id"
                    :label="item.levelNm"
                    :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="21">
                  <el-form-item :label="$t('logisticsCoManagement.carrierQc')" prop="carrierQc">
                    <el-input v-model="logisticsCoManagementForm.carrierQc" clearable maxlength="400" />
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="21">
                  <el-form-item :label="$t('logisticsCoManagement.addr')" prop="addr">
                    <el-input v-model="logisticsCoManagementForm.addr" clearable maxlength="400" />
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="7">
                  <el-form-item :label="$t('logisticsCoManagement.zipCode')" prop="zipCode">
                    <el-input v-model="logisticsCoManagementForm.zipCode" clearable maxlength="100" />
                  </el-form-item>
              </el-col>
              <el-col :span="7">
                  <el-form-item :label="$t('logisticsCoManagement.tel')" prop="tel">
                    <el-input v-model="logisticsCoManagementForm.tel" clearable maxlength="100" />
                  </el-form-item>
              </el-col>
              <el-col :span="7">
                  <el-form-item :label="$t('logisticsCoManagement.fax')" prop="fax">
                    <el-input v-model="logisticsCoManagementForm.fax" clearable maxlength="100" />
                  </el-form-item>
              </el-col>
              <el-col :span="7">
                  <el-form-item :label="$t('logisticsCoManagement.eMail')" prop="eMail">
                    <el-input v-model="logisticsCoManagementForm.eMail" clearable maxlength="100" />
                  </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item :label="$t('logisticsCoManagement.cntryCd')">
                    <el-select v-model="logisticsCoManagementForm.cntryCd" clearable>
                      <el-option
                        v-for="item in cntryCdOptions"
                        :key="item.generalCd"
                        :label="item.generalNm"
                        :value="item.generalCd"/>
                    </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="7">
                  <el-form-item :label="$t('logisticsCoManagement.contactsNm')">
                    <el-input v-model="logisticsCoManagementForm.contactsNm" clearable  />
                  </el-form-item>
              </el-col>
              <el-col :span="7">
                  <el-form-item :label="$t('logisticsCoManagement.contactsPos')">
                    <el-input v-model="logisticsCoManagementForm.contactsPos" clearable />
                  </el-form-item>
              </el-col>
              <el-col :span="7">
                  <el-form-item :label="$t('logisticsCoManagement.contactsTel')">
                    <el-input v-model="logisticsCoManagementForm.contactsTel" clearable />
                  </el-form-item>
              </el-col>
              <el-col :span="7">
                  <el-form-item :label="$t('logisticsCoManagement.contactsFax')">
                    <el-input v-model="logisticsCoManagementForm.contactsFax" clearable />
                  </el-form-item>
              </el-col>
              <el-col :span="7">
                  <el-form-item :label="$t('logisticsCoManagement.contactsMail')" prop="contactsMail">
                    <el-input v-model="logisticsCoManagementForm.contactsMail" clearable />
                  </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item :label="$t('logisticsCoManagement.paymentType')" prop="paymentType">
                    <el-select v-model="logisticsCoManagementForm.paymentType" clearable>
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
                <el-form-item :label="$t('logisticsCoManagement.ownUserId')" prop="ownUserNm" >
                  <el-input  v-model="logisticsCoManagementForm.ownUserNm"  clearable  disabled>
                    <el-button slot="append"  icon="el-icon-more" @click="personList()" id='el-input__more' ></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <!-- 审批人--><!--TODO:未测试-->
                <el-form-item :label="$t('logisticsCoManagement.acceptId')" prop="acceptNm" >
                  <el-input v-model="logisticsCoManagementForm.acceptNm" clearable  disabled/>
                </el-form-item>
              </el-col>

              <el-col :span="21">
                  <el-form-item :label="$t('logisticsCoManagement.remarks')">
                    <el-input type="textarea" v-model="logisticsCoManagementForm.remarks" clearable resize="none" maxlength="400" show-word-limit/>
                  </el-form-item>
              </el-col>
            </el-row>
      </div>
      <el-card shadow="always" border>
        <el-button class="but_bottom"  type="primary"  plain icon="el-icon-plus" @click="addRow()">{{ $t('common.addAline') }}</el-button>
        <el-col :span="24">
          <el-table
            :data="tableData1"
            ref="table"
            tooltip-effect="dark"
            border
            stripe
            highlight-current-row	>
            <!-- <el-table-column :label="$t('logisticsCoManagement.detail.carrierLineNum')"  prop="carrierLineNum" align="left" width="80">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.carrierLineNum" maxlength="4"/>
              </template>
            </el-table-column> -->
            <el-table-column :label="$t('logisticsCoManagement.detail.carNm')"  prop="carNm" align="left" width="200">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.carNm" maxlength="100"/>
              </template>
            </el-table-column>
            <el-table-column :label="$t('logisticsCoManagement.detail.carType')"  width="200" prop="carType">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.carType" maxlength="100"/>
              </template>
            </el-table-column>
            <el-table-column :label="$t('logisticsCoManagement.detail.wgtLimit')"  width="100" prop="wgtLimit">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.wgtLimit" maxlength="26"/>
              </template>
            </el-table-column>
            <el-table-column :label="$t('logisticsCoManagement.detail.wgtCar')"  width="100" prop="wgtCar">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.wgtCar" maxlength="26"/>
              </template>
            </el-table-column>
            <el-table-column :label="$t('logisticsCoManagement.detail.wgtTotal')"  width="100" prop="wgtTotal">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.wgtTotal" maxlength="26"/>
              </template>
            </el-table-column>
            <el-table-column :label="$t('logisticsCoManagement.detail.carHeight')"  width="100" prop="carHeight">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.carHeight" />
              </template>
            </el-table-column>
            <el-table-column :label="$t('logisticsCoManagement.detail.carWidth')"  width="100" prop="carWidth">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.carWidth" />
              </template>
            </el-table-column>
            <el-table-column :label="$t('logisticsCoManagement.detail.carDepth')"  width="100" prop="carDepth">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.carDepth" />
              </template>
            </el-table-column>
            <el-table-column :label="$t('logisticsCoManagement.detail.loadHeight')"  width="100" prop="loadHeight">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.loadHeight" />
              </template>
            </el-table-column>
            <el-table-column :label="$t('logisticsCoManagement.detail.loadWidth')"  width="100" prop="loadWidth">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.loadWidth" />
              </template>
            </el-table-column>
            <el-table-column :label="$t('logisticsCoManagement.detail.loadDepth')"  width="100" prop="loadDepth">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.loadDepth" />
              </template>
            </el-table-column>
            <el-table-column :label="$t('logisticsCoManagement.detail.price')"  width="100" prop="price">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.price" maxlength="26"/>
              </template>
            </el-table-column>
            <el-table-column :label="$t('logisticsCoManagement.detail.unit')"  width="120" prop="unit">
              <template slot-scope="scope">
                <el-select v-model="scope.row.unit"  >
                  <el-option
                    v-for="item in unitOptions"
                    :key="item.generalCd"
                    :label="item.generalNm"
                    :value="item.generalCd"/>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column :label="$t('logisticsCoManagement.detail.acceptId')"  width="100" prop="acceptNm">
              <template slot-scope="scope">{{scope.row.acceptNm}}
              </template>
            </el-table-column>
            <el-table-column :label="$t('logisticsCoManagement.detail.remarks')"  width="200" prop="remarks">
              <template slot-scope="scope">
                <el-input type="textarea" v-model="scope.row.remarks" resize="none" maxlength="400" show-word-limit/>
              </template>
            </el-table-column>
            <el-table-column :label="$t('common.actions')"  fixed="right" width="50px">
              <template slot-scope="scope">
                <el-tooltip :content="$t('common.delectThisRow')" placement="bottom">
                  <el-button  type="danger" plain circle icon="el-icon-delete" @click="reduceRow(scope.$index,1)"/>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-card>
        <!-- <el-row :gutter="20">
          <el-col :span="24" style="padding-bottom: 0px;">
            <el-form-item>
              <el-button icon="el-icon-close" style="margin-top:10px;float:left;margin-right:5px" @click="close_add_edit">{{ $t('operation.cancel') }}</el-button>
              <el-button icon="el-icon-check" type="primary" style="margin-top:10px;float:right" @click="close_add_edit">{{ $t('operation.save') }}</el-button>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- <el-row>
          <el-col :span="12" style="padding: 10 30 0 30;text-align: center;">
            <el-form-item align="center">
              <el-button icon="el-icon-check" type="primary" @click="close_add_edit">{{ $t('common.save') }}</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="padding: 10 30 0 30;text-align: center;">
            <el-form-item >
              <el-button icon="el-icon-close" @click="close_add_edit">{{ $t('common.back') }}</el-button>
            </el-form-item>
          </el-col>
        </el-row> -->
      <div class="Btnfooter">
        <el-form-item>
          <el-button type="primary" icon="el-icon-check" @click="close_add_edit">{{ $t('common.save') }}</el-button>
          <el-button icon="el-icon-close" @click="close_add_edit">{{ $t('common.back') }}</el-button>
        </el-form-item>
      </div>

    </el-form>
  </div>
  </el-dialog>
  <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisibleAppraise" title="物流公司评价" :before-close="close_add_editAppriase" width="800px">
    <el-form ref="appraiseForm" :model="appraiseForm" :inline="true">
    <el-row :gutter="20">
      <el-col :span="8" style="padding-bottom: 0px;">
          <!--客户名称-->
          <el-form-item :label="$t('logisticsCoManagement.appraise.carrierCd')">{{appraiseForm.carrierCd}}</el-form-item>
      </el-col>
      <el-col :span="8" style="padding-bottom: 0px;">
          <!-- 评价等级 -->
          <el-form-item :label="$t('logisticsCoManagement.appraise.appraiseLevelTitle')">{{appraiseForm.appraiseLevel}}</el-form-item>
          <!-- <el-button icon="el-icon-search" type="primary" style="margin-right:5px;float:right" >{{ $t('operation.query') }}</el-button> -->
      </el-col>
      <el-col :span="8" style="padding-bottom: 0px;">
          <!-- 积分 -->
          <el-form-item :label="$t('customInfo.point')">{{appraiseForm.integral}}</el-form-item>
      </el-col>
    </el-row>
    </el-form>
    <el-table ref="appraiseList" :data="appraiseList" tooltip-effect="dark" style="width: 100%" border>
      <!-- <el-table-column type="selection" width="55">
      </el-table-column> -->
      <el-table-column :label="$t('logisticsCoManagement.appraise.orgId')" align="center" width="140">
        <template slot-scope="scope">{{ scope.row.orgId }}</template>
      </el-table-column>
      <el-table-column :label="$t('logisticsCoManagement.appraise.carrierCd')" align="center" width="140">
        <template slot-scope="scope">{{ scope.row.carrierCd }}</template>
      </el-table-column>
      <el-table-column :label="$t('logisticsCoManagement.appraise.carrierNum')" align="center" width="140">
        <template slot-scope="scope">{{ scope.row.carrierNum }}</template>
      </el-table-column>
      <el-table-column :label="$t('logisticsCoManagement.appraise.appraiseLevel')" align="center" width="140">
        <template slot-scope="scope">{{ scope.row.appraiseLevel }}</template>
      </el-table-column>
      <el-table-column :label="$t('logisticsCoManagement.appraise.appraiseType')" align="center" width="140">
        <template slot-scope="scope">{{ scope.row.appraiseType }}</template>
      </el-table-column>
      <el-table-column :label="$t('logisticsCoManagement.appraise.remarks')" align="center" width="198">
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
        <el-button icon="el-icon-close" @click="dialogVisibleAppraise = false">{{ $t('common.back') }}</el-button>
      </div>
  </el-dialog>
  </div>
</template>

<script>

import { debug } from 'util';
import moment from 'moment'
export default {
  name:'LogisticsCoManagement',
  components: {},
  data() {
    return {
      cntrOptions: [{code:'1',text:'上海提桥'},{code:'2',text:'江苏提桥'}],
      carrierTypeOptions: [{code:'01',text:'国内'},{code:'02',text:'国际'}],
      paymentTypeOptions: [{code:'01',text:'现结'},
        {code:'02',text:'月结'},
        {code:'03',text:'季结'},
        {code:'04',text:'半年结'},
        {code:'05',text:'年结'},
      ],
      cntryCdOptions: [{code:'01',text:'中国'},
        {code:'02',text:'日本'},
        {code:'03',text:'台湾'},
      ],
      levelOptions: [{code:'01',text:'五星'},{code:'02',text:'四星'},{code:'03',text:'三星'},{code:'04',text:'二星'}],
      qrCode:'',
      userId:'',
      flag: false,
      distinguishName:'proTasks',
      total: 0,
      appraiseForm: 
        {
        orgId:'1',
        carrierCd:'顺丰物流',
        logisticsCoCd:'顺丰物流',
        integral: '50',
        appraiseLevel:'五星',
        commonCd:'通用',
        remarks:'备注',
      },
      appraiseList: [
        {
        id:'1',
        orgId:'生产部',
        carrierCd:'顺丰物流',
        carrierNum:'A0000001',
        appraiseType:'丢件',
        commonCd:'通用',
        appraiseLevel:'差评',
        remarks:'备注'},
        {
        id:'2',
        orgId:'生产部',
        carrierCd:'zz物流',
        carrierNum:'A0000002',
        appraiseType:'破损',
        commonCd:'通用',
        appraiseLevel:'中评',
        remarks:'备注'},
        {
        id:'3',
        orgId:'生产部',
        carrierCd:'xx物流',
        carrierNum:'A0000001',
        appraiseType:'风雨无阻',
        commonCd:'通用',
        appraiseLevel:'好评',
        remarks:'备注'},
      ],
      logisticsCoManagementForm: 
        {id:"1",
        cntrCd: '1',
        carrierNm:'顺丰物流',
        carrierNmEn:'sfexpress',
        carrierJc:'顺丰',
        carrierType:'01',
        levelId:'四星',
        integral:'50',
        carrierQc:'ISO9002',
        addr:'上海',
        zipCode:'200000',
        tel:'021-55555555',
        fax:'021-55555666',
        eMail:'123@abc.com',
        cntryCd:'01',
        contactsNm:'峰哥',
        contactsPos:'主管',
        contactsTel:'18088888888',
        contactsFax:'18066666666',
        contactsMail:'245@aaa.com',
        paymentType:'02',
        ownUserId:'李四',
        acceptId:'张三',
        remarks:'备注'},
 
      list: [
        {id:"1",
        cntrCd: '1',
        carrierNm:'顺丰物流',
        carrierNmEn:'sfexpress',
        carrierJc:'顺丰',
        carrierType:'01',
        levelId:'四星',
        carrierQc:'ISO9002',
        integral:'50',
        addr:'上海',
        zipCode:'200000',
        tel:'021-55555555',
        fax:'021-55555666',
        eMail:'123@abc.com',
        cntryCd:'01',
        contactsNm:'峰哥',
        contactsPos:'主管',
        contactsTel:'18088888888',
        contactsFax:'18066666666',
        contactsMail:'245@aaa.com',
        paymentType:'02',
        ownUserId:'李四',
        acceptId:'张三',
        remarks:'备注',
        },
        {id:"1",
        cntrCd: '1',
        carrierNm:'圆通物流',
        carrierNmEn:'sfexpress',
        carrierJc:'圆通',
        carrierType:'01',
        levelId:'四星',
        carrierQc:'ISO9002',
        integral:'50',
        addr:'上海',
        zipCode:'200000',
        tel:'021-55555555',
        fax:'021-55555666',
        eMail:'123@abc.com',
        cntryCd:'01',
        contactsNm:'峰哥',
        contactsPos:'主管',
        contactsTel:'18088888888',
        contactsFax:'18066666666',
        contactsMail:'245@aaa.com',
        paymentType:'02',
        ownUserId:'李四',
        acceptId:'张三',
        remarks:'备注',
        },
        {id:"1",
        cntrCd: '1',
        carrierNm:'申通物流',
        carrierNmEn:'sfexpress',
        carrierJc:'申通',
        carrierType:'01',
        levelId:'四星',
        carrierQc:'ISO9002',
        integral:'50',
        addr:'上海',
        zipCode:'200000',
        tel:'021-55555555',
        fax:'021-55555666',
        eMail:'123@abc.com',
        cntryCd:'01',
        contactsNm:'峰哥',
        contactsPos:'主管',
        contactsTel:'18088888888',
        contactsFax:'18066666666',
        contactsMail:'245@aaa.com',
        paymentType:'02',
        ownUserId:'李四',
        acceptId:'张三',
        remarks:'备注',
        }
      ],
      isStarDisabled:true,//开始but
      isCancelDisabled:false,//取消but
      isCompleteDisabled:true,//完成不可点
      isDisabled:true,//进度条。
      clickable:true,
      listLoading: false,
      dialogVisible: false,
      dialogVisibleAppraise: false,
      titleName:'',
      query: {
        page: 1,
        limit: 10,
        status: '',
        isEnabled: '',
        isPublish: '',
        cntrCd:'1',
        carrierNm:'',
        carrierType:'',
      },
      projectList: [],
      // assigneds: [],
      // headPens: [],
      priority: [],
      states: [],
      tableData1: [{
        carrierId:'1',
        carrierLineNum:'1',
        carNm:'东风一号',
        carType:'板车',
        wgtLimit:'21.3',
        wgtCar:'2.68',
        wgtTotal:'26.8',
        carHeight:'2.5',
        carWidth:'3.5',
        carDepth:'11.6',
        loadHeight:'1.8',
        loadWidth:'9.5',
        loadDepth:'1.0',
        price:'1.6',
        unit:'m',
        acceptId:'zwd',
        remarks:'备注',
      }],
    }
  },
  created() {
    // this.personList()
    this.getEnabled()
    this.getAllProjects('jz')
  },
  computed: {
  },
  methods: {
    resetDialog() {
      // this.$refs['logisticsCoManagementForm'].resetFields()
    },
    handleCreate() {
      this.$router.push({ path: 'logisticsCoManagementOver'})
    },
    //查看评价
    logisticsManagementAppraise() {
      this.dialogVisibleAppraise = true
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

    //根据项目id 获取项目状态（限制所有按钮disable）项目开始日期+结束日期（限制所有日期的地方有限制）
    projectInformation(){
        let proIds = this.query.isPublish;
        // apiProTasks.getProject({progressID:proIds}).then(response => {
        //   if(response.status == '0'){//项目状态关闭
        //     // console.log('项目状态关闭',response);
        //     this.clickable = true;
        //   }else{//项目状态没关闭
        //     this.clickable = false;
        //     // console.log('项目状态未关闭');
        //   }
        // }).catch(() => {
        //   console.log('获取项目信息失败。');
        // });
        this.userInformation();
    },
    //获取用户信息
    userInformation(){
     this.userId = this.$store.state.user.userinfo.person.id;
    },

    //完成度
    sliders(index, row){
      let para = row;
      para.createTime = moment(para.createTime).format('YYYY-MM-DD HH:mm:ss')
      para.updateTime = moment(para.updateTime).format('YYYY-MM-DD HH:mm:ss')
      if(para.progress == '100'){//完成度100，status为已经完成。
         if(this.userId != row.receiver){//当前用户对应人员不等于这一条的指派人，完成的弹框不能弹出
            this.$message({
              message: '非指派人不可完成！',
              type: 'error'
            });
            this.personList();
         }else{//可以弹出，
           this.projectComplete(index, row);
         }
      }else{
        apiProTasks.updateTasksData(para).then(response => {
          this.$message({
            message: this.$t('common.message.info_operation_success'),
            type: 'success'
          });
          this.personList();
        }).catch(() => {
            this.$message({
              message: this.$t('common.message.info_operation_error'),
              type: 'error'
            });
        });
      }

    },
    isDefault(field){
      if(field == 3){
        return true;
      }else{
        return false;
      }
    },
    getEnabled() {
      let g ='IS_PRIORITY';//优先级
      let h = 'IS_STATE';//项目状态

      let arrTmp = [g,h];
      // for(let i of arrTmp){
      //   apiClass.listClass({ parentCode: i }).then(response => {
      //     if(i == 'IS_PRIORITY'){
      //       this.priority = response
      //     }else if(i == 'IS_STATE'){
      //       this.states = response
      //     }else{
      //        console.log('啥都没');
      //     }
      //   })
      // }
    },
    enabledFilter(row,name) {
      // if(name == 'priority'){//优先级
      //   return apiClass.classFilter(this.priority, row)
      // }else if(name == 'state'){//项目状态
      //   return apiClass.classFilter(this.states, row)
      // }else if(name == 'subProject'){//所属项目
      //   return apiClass.classProject(this.projectList, row)
      // }else if(name == 'assigned'){//指派
      //   return apiClass.classAssignedsHeadPens(this.assigneds, row)
      // }else if(name == 'responsible'){//负责
      //   return apiClass.classAssignedsHeadPens(this.headPens, row)
      // }

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
    // 项目查询下拉框
    getAllProjects(val) {
      // apiProject.getAllProjects().then(response =>{
      //   this.projectList = response
      //   if(val == 'jz'){//加载
      //     if(response.length != '0'){
      //       this.query.isPublish = response[0].id
      //     }
      //   }
      //   this.projectInformation();
      //   if(this.userId){
      //      this.personList();
      //   }else{
      //     console.log('用户权限获取失败');
      //   }

      // })
    },
    //指派+负责人获取
    // getAssignedsHeadPens(){
    //   let term = this.query.isPublish;
    //   console.log('this.query.isPublish',this.query.isPublish);
    //   apiProject.getProjectTeam({id:term}).then(response =>{
    //     if(response.length != 0){//不为空处理
    //       this.assigneds = response.list
    //       this.headPens = response.list
    //     }else{//模块ID不存在，清空指派给+负责人
    //       this.assigneds = '';
    //       this.headPens = '';
    //     }
    //   })
    // },

    // 获取数据
    personList() {
      // this.listLoading = true;
      let me = this;
      // apiProTasks.getTasksList({ page: me.query.page,limit: me.query.limit,proId : me.query.isPublish}).then(response => {
      //   // console.log('获取成功',response);
      //   this.page = response.pages
      //   this.list = response.list
      //   this.total = response.total
      //   this.listLoading = false;
      // }).catch((err) => {
      //   console.log('err...',err)
      //   this.listLoading = false;
      // })
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

    //开始
    projectStart(index, row) {
      this.$refs.projectStarts.open(row,this.distinguishName)
      this.disabled = false;
      // this.varChangeColor = true;
    },

    //取消
    projectCancel(index, row) {
      // console.log('取消');
      this.$refs.projectCancels.open(row,this.distinguishName)
    },

    //完成
    projectComplete(index, row) {
      // console.log('完成');
      this.$refs.projectCompletes.open(row,this.distinguishName)
    },

     //添加任务+编辑
    handleEdit(index, row) {
      this.dialogVisible = true
      debugger
      if(index === undefined){
        this.titleName = '添加'
        // let addProIds = this.query.isPublish;//获取项目
        // setTimeout(()=>{
        //     this.$refs.tasksAddEdits.addProject(addProIds);
        // })
      }else if (index == 'edit'){
        this.titleName = '编辑';
        // setTimeout(()=>{
        //     this.$refs.tasksAddEdits.dateIs(row,this.distinguishName);
        // })
      }

    },

    //关闭
    close_add_edit(){//父组件关闭时，跟接收到子的取消时清空子的数据。
      this.dialogVisible = false
      // this.$refs.tasksAddEdits.empty();
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
.project-tasks .el-table td div{
  z-index: 1;
}
.operationCss .active{
  background: red !important;
}
.form-float > div{
  float: left;
}
.el-dialog__body {
    padding: 0px 20px 20px;
}
.administrator-list{
    padding: 20px;
    padding-right: 30px
}
.toolbar {
	background: #f2f2f2;
	padding: 10px;
	margin: 10px 0px;
}
.page-title{
  color: rgb(77, 74, 74)
}
.icon-upload-box {
  float: right;
  margin-right: 20px;
  width:  100px;
  height: 100px;
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  margin: 0 auto;
  margin-top: 30px;
  margin-right: 35%
}
.plus-cls {
  font-size: 30px;
  color: #b7b7b7;
  width: 100%;
  text-align: center;
  display: block;
  margin-top: 30px;
}
.el-card__body {
    /* height: 200px; */
    padding: 20px;
}
img {
  width: 100%;
  height: 100%;
}

.icon-upload-boxs {
  width: 120px;
  height: 140px;
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  margin: 0px auto;
}
.icon-upload-boxs:hover {
  border-color: #409eff;
}
.icon-upload-boxs .el-icon-plus {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 140px;
  line-height: 140px;
  text-align: center;
}
.icon-upload-boxs + .icon-tip {
  position: absolute;
  top: 55px;
  left: 140px;
  font-size: 12px;
  color: #777;
}
.icon-upload-boxs img {
  width: 100%;
  height: 100%;
}
.appraiseClose{
  margin-top:10px;
  text-align: right;
}
</style>
