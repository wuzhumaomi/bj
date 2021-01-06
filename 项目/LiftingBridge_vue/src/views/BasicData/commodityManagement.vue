  <template>
  <div class="administrator-list container project-tasks">
    <el-form ref="query" label-width="100px" label-position="right" :model="query" inline="true">
      <div class="queryContent">
        <el-form-item :label="$t('commodityManagement.prodCdDis')" class="form-item">
          <el-input v-model="query.prodCdDis" clearable />
        </el-form-item>
        <el-form-item :label="$t('commodityManagement.prodNm')" class="form-item">
          <el-input v-model="query.prodNm" clearable />
        </el-form-item>
        <el-form-item :label="$t('commodityManagement.prodJc')" class="form-item">
          <el-input v-model="query.prodJc" clearable />
        </el-form-item>
        <el-form-item :label="$t('commodityManagement.prodNmEn')" class="form-item">
          <el-input v-model="query.prodNmEn" clearable />
        </el-form-item>
        <el-form-item :label="$t('commodityManagement.prodType')" class="form-item">
          <el-select v-model="query.prodType"  clearable >
            <el-option v-for="item in prodType" :key="item.generalCd" :label="item.generalNm" :value="item.generalCd"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('commodityManagement.assetModel')" class="form-item">
          <el-input v-model="query.assetModel" clearable />
        </el-form-item>
        <el-form-item :label="$t('commodityManagement.yarnCount')" class="form-item">
          <el-input v-model="query.yarnCount" clearable />
        </el-form-item>
        <el-form-item :label="$t('commodityManagement.ratio')" class="form-item">
          <el-input v-model="query.ratio" clearable />
        </el-form-item>
      </div>
      <el-row type="flex" justify="end">
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="personList">{{ $t('operation.query') }}</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addOrder()">{{ $t('operation.newlyAdded') }}</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-table :data="list" :default-sort = "{prop: 'loginId', order: 'descending'}" border style="width: 100%">
      <el-table-column prop="prodCdDis" :label="$t('commodityManagement.prodCdDis')" width="100px" align="center">
      </el-table-column>
      <el-table-column prop="prodNm" :label="$t('commodityManagement.prodNm')" width="160px" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="prodJc" :label="$t('commodityManagement.prodJc')" width="80px" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="prodNmEn" :label="$t('commodityManagement.prodNmEn')" width="120px" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="prodType" :label="$t('commodityManagement.prodType')" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="assetModel" :label="$t('commodityManagement.assetModel')" width="120px" align="center">
      </el-table-column>
      <el-table-column prop="yarnCount" :label="$t('commodityManagement.yarnCount')" width="120px" align="center">
      </el-table-column>
      <el-table-column prop="ratio" :label="$t('commodityManagement.ratio')" width="120px" align="center">
      </el-table-column>
      <el-table-column prop="consumeDt" :label="$t('commodityManagement.consumeDt')" width="120px" align="center">
      </el-table-column>
      <el-table-column prop="unit" :label="$t('commodityManagement.unit')" width="120px" align="center">
      </el-table-column>
      <el-table-column prop="pieceGrossWgt" :label="$t('commodityManagement.pieceGrossWgt')" width="120px" align="center">
      </el-table-column>
      <el-table-column prop="pieceNetWgt" :label="$t('commodityManagement.pieceNetWgt')" width="120px" align="center">
      </el-table-column>
      <el-table-column prop="pieceVol" :label="$t('commodityManagement.pieceVol')" width="120px" align="center">
      </el-table-column>
      <el-table-column prop="pieceHeight" :label="$t('commodityManagement.pieceHeight')" width="120px" align="center">
      </el-table-column>
      <el-table-column prop="pieceWidth" :label="$t('commodityManagement.pieceWidth')" width="120px" align="center">
      </el-table-column>
      <el-table-column prop="pieceDepth" :label="$t('commodityManagement.pieceDepth')" width="120px" align="center">
      </el-table-column>
      <el-table-column prop="caseUnitNum" :label="$t('commodityManagement.caseUnitNum')" width="120px" align="center">
      </el-table-column>
      <el-table-column prop="caseGrossWgt" :label="$t('commodityManagement.caseGrossWgt')" width="120px" align="center">
      </el-table-column>
      <el-table-column prop="caseNetWgt" :label="$t('commodityManagement.caseNetWgt')" width="120px" align="center">
      </el-table-column>
      <el-table-column prop="caseVol" :label="$t('commodityManagement.caseVol')" width="120px" align="center">
      </el-table-column>
      <el-table-column prop="caseHeight" :label="$t('commodityManagement.caseHeight')" width="120px" align="center">
      </el-table-column>
      <el-table-column prop="caseWidth" :label="$t('commodityManagement.caseWidth')" width="120px" align="center">
      </el-table-column>
      <el-table-column prop="caseDepth" :label="$t('commodityManagement.caseDepth')" width="120px" align="center">
      </el-table-column>
      <el-table-column prop="warningWgt" :label="$t('commodityManagement.warningWgt')" width="120px" align="center">
      </el-table-column>
      <el-table-column prop="remarks" :label="$t('commodityManagement.remarks')" width="120px" align="center" >
      </el-table-column>
      <el-table-column :label="$t('common.actions')" width="100px" align="center" fixed="right">
        <template slot-scope="scope">
           <el-tooltip :content="$t('operation.edit')" effect="dark" placement="left">
             <el-button type="primary" size="mini" icon="el-icon-setting" circle plain @click="handleEdit('edit', scope.row)"></el-button>
          </el-tooltip>
           <el-tooltip :content="$t('operation.delete')" effect="dark" placement="left">
             <el-button size="mini" icon="el-icon-delete" type="danger" circle plain @click="handleEdit('edit', scope.row)"></el-button>
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
      <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" :title="titleName" width="75%" style="padding-right:0" @open="resetDialog" >
        <div class="app-container">
          <el-form ref="commodityManagementForm"  :model="commodityManagementForm" >
            <div class="editContent">
            <el-row style="padding:10px 0 2px 12px">
              <!-- <el-col :span="8" style="padding-bottom: 0px;">
                <el-form-item label-width="100px" label-position="right"  :label="$t('commodityManagement.cntrCd')">
                    <el-select v-model="commodityManagementForm.cntrCd" disabled="true" :placeholder="$t('personInfo.choose')" label-width="80px">
                      <el-option
                        v-for="item in cntrOptions"
                        :key="item.code"
                        :label="item.text"
                        :value="item.code"/>
                    </el-select>
                </el-form-item>
              </el-col> -->
              <el-col :span="24" style="padding-bottom: 0px;">
                <el-form-item label-width="100px" label-position="right"  :label="$t('commodityManagement.prodCdDis')" >
                    <el-input  v-model="commodityManagementForm.prodCdDis" clearable :placeholder="$t('placeholders.content')" style="width:400px"/>
                </el-form-item>
              </el-col>
              <el-col :span="24" style="padding-bottom: 0px;">
                <el-form-item label-width="100px" label-position="right"  :label="$t('commodityManagement.prodNm')" >
                    <el-input  v-model="commodityManagementForm.prodNm" clearable :placeholder="$t('placeholders.content')" style="width:400px"/>
                </el-form-item>
              </el-col>
              <el-col :span="24" style="padding-bottom: 0px;">
                <el-form-item label-width="100px" label-position="right"  :label="$t('commodityManagement.prodJc')">
                    <el-input  v-model="commodityManagementForm.prodJc" clearable :placeholder="$t('placeholders.content')" style="width:400px"/>
                </el-form-item>
              </el-col>
              <el-col :span="24" style="padding-bottom: 0px;">
                <el-form-item label-width="100px" label-position="right"  :label="$t('commodityManagement.prodNmEn')">
                    <el-input  v-model="commodityManagementForm.prodNmEn" clearable :placeholder="$t('placeholders.content')" style="width:400px"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="padding:0 0 0 12px">
              <el-col :span="7" style="padding-bottom: 0px;">
                <el-form-item label-width="100px" label-position="right"  :label="$t('commodityManagement.prodType')">
                    <el-select v-model="commodityManagementForm.prodType" :placeholder="$t('personInfo.choose')" style="width:120px">
                      <el-option
                        v-for="item in prodTypeOptions"
                        :key="item.code"
                        :label="item.text"
                        :value="item.code"/>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7" style="padding-bottom: 0px;">
                <el-form-item label-width="100px" label-position="right" :label="$t('commodityManagement.prodClassCd')" >
                  <el-select v-model="commodityManagementForm.prodClassCd" :placeholder="$t('personInfo.choose')" style="width:200px">
                    <el-option
                      v-for="item in prodClassOptions"
                      :key="item.code"
                      :label="item.text"
                      :value="item.code"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7" style="padding-bottom: 0px">
                <el-form-item label-width="100px" label-position="right" :label="$t('commodityManagement.assetModel')">
                  <el-input v-model="commodityManagementForm.assetModel" clearable :placeholder="$t('placeholders.content')" style="width:160px"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="padding:0 0 0 12px">
              <el-col :span="7" style="padding-bottom: 0px;">
                <el-form-item label-width="120px" label-position="right" :label="$t('commodityManagement.unit')">
                    <el-select v-model="commodityManagementForm.unit" :placeholder="$t('personInfo.choose')" style="width:80px" >
                      <el-option
                        v-for="item in unitOptions"
                        :key="item.code"
                        :label="item.text"
                        :value="item.code"/>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="padding-bottom: 0px;">
                <el-form-item label-width="100px" label-position="right" :label="$t('commodityManagement.yarnCount')">
                  <el-input v-model="commodityManagementForm.yarnCount" clearable :placeholder="$t('placeholders.content')" style="width:160px"/>
                </el-form-item>
              </el-col>
              <el-col :span="7" style="padding-bottom: 0px;">
                <el-form-item label-width="100px" label-position="right" :label="$t('commodityManagement.ratio')">
                  <el-input v-model="commodityManagementForm.ratio"  :placeholder="$t('placeholders.content')" style="width:160px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="padding-bottom: 0px;">
                <el-form-item label-width="120px" label-position="right"  :label="$t('commodityManagement.consumeDt')">
                  <el-input v-model="commodityManagementForm.consumeDt" clearable :placeholder="$t('placeholders.content')" maxlength="5" style="width:160px">
                  </el-input>            
                </el-form-item>
              </el-col>
              <el-col :span="8" style="padding-bottom: 0px;">
                <el-form-item label-width="100px" label-position="right" :label="$t('commodityManagement.pieceGrossWgt')">
                  <el-input v-model="commodityManagementForm.pieceGrossWgt" clearable :placeholder="$t('placeholders.content')" maxlength="5" style="width:160px">
                  </el-input>            
                </el-form-item>
              </el-col>
              <el-col :span="7" style="padding-bottom: 0px;">
                <el-form-item label-width="100px" label-position="right" :label="$t('commodityManagement.pieceNetWgt')">
                  <el-input v-model="commodityManagementForm.pieceNetWgt" clearable :placeholder="$t('placeholders.content')" maxlength="5" style="width:160px">
                  </el-input>            
                </el-form-item>
              </el-col>
              <el-col :span="8" style="padding-bottom: 0px;">
                <el-form-item label-width="120px" label-position="right" :label="$t('commodityManagement.pieceVol')">
                  <el-input v-model="commodityManagementForm.pieceVol" clearable :placeholder="$t('placeholders.content')" maxlength="5" style="width:160px">
                  </el-input>            
                </el-form-item>
              </el-col>
              <el-col :span="8" :push="0" style="padding-bottom: 0px;">
                <el-form-item label-width="100px" label-position="right"  :label="$t('commodityManagement.pieceHeight')">
                  <el-input v-model="commodityManagementForm.pieceHeight" clearable :placeholder="$t('placeholders.content')" maxlength="5" style="width:160px">
                  </el-input>            
                </el-form-item>
              </el-col>
              <el-col :span="7" style="padding-bottom: 0px;">
                <el-form-item label-width="100px" label-position="right" :label="$t('commodityManagement.pieceWidth')">
                  <el-input v-model="commodityManagementForm.pieceWidth" clearable :placeholder="$t('placeholders.content')" maxlength="5" style="width:160px">
                  </el-input>            
                </el-form-item>
              </el-col>
              <el-col :span="8" style="padding-bottom: 0px;">
                <el-form-item label-width="120px" label-position="right" :label="$t('commodityManagement.pieceDepth')">
                  <el-input v-model="commodityManagementForm.pieceDepth" clearable :placeholder="$t('placeholders.content')" maxlength="5" style="width:160px">
                  </el-input>            
                </el-form-item>
              </el-col>
              <el-col :span="8" style="padding-bottom: 0px;padding-left:-10px">
                <el-form-item label-width="100px" label-position="right" :label="$t('commodityManagement.caseUnitNum')">
                  <el-input v-model="commodityManagementForm.caseUnitNum" clearable :placeholder="$t('placeholders.content')" maxlength="5" style="width:160px">
                  </el-input>            
                </el-form-item>
              </el-col>
              <el-col :span="7" style="padding-bottom: 0px;">
                <el-form-item label-width="100px" label-position="right" :label="$t('commodityManagement.caseGrossWgt')">
                  <el-input v-model="commodityManagementForm.caseGrossWgt" clearable :placeholder="$t('placeholders.content')" maxlength="5" style="width:160px">
                  </el-input>            
                </el-form-item>
              </el-col>
              <el-col :span="7" style="padding-bottom: 0px;">
                <el-form-item label-width="120px" label-position="right" :label="$t('commodityManagement.caseNetWgt')">
                  <el-input v-model="commodityManagementForm.caseNetWgt" clearable :placeholder="$t('placeholders.content')" maxlength="5" style="width:160px">
                  </el-input>            
                </el-form-item>
              </el-col>
              <el-col :span="8" style="padding-bottom: 0px;">
                <el-form-item label-width="100px" label-position="right" :label="$t('commodityManagement.caseVol')">
                  <el-input v-model="commodityManagementForm.caseVol" clearable :placeholder="$t('placeholders.content')" maxlength="5" style="width:160px">
                  </el-input>            
                </el-form-item>
              </el-col>
              <el-col :span="7" style="padding-bottom: 0px;">
                <el-form-item label-width="100px" label-position="right"  :label="$t('commodityManagement.caseHeight')">
                  <el-input v-model="commodityManagementForm.caseHeight" clearable :placeholder="$t('placeholders.content')" maxlength="5" style="width:160px">
                  </el-input>            
                </el-form-item>
              </el-col>
              <el-col :span="6" style="padding-bottom: 0px;">
                <el-form-item label-width="120px" label-position="right" :label="$t('commodityManagement.caseWidth')">
                  <el-input v-model="commodityManagementForm.caseWidth" clearable :placeholder="$t('placeholders.content')" maxlength="5" style="width:160px">
                  </el-input>            
                </el-form-item>
              </el-col>
              <el-col :span="8" style="padding-bottom: 0px;">
                <el-form-item label-width="100px" label-position="right" :label="$t('commodityManagement.caseDepth')">
                  <el-input v-model="commodityManagementForm.caseDepth" clearable :placeholder="$t('placeholders.content')" maxlength="5" style="width:160px">
                  </el-input>            
                </el-form-item>
              </el-col>
              <el-col :span="16" style="padding-bottom: 0px;">
                <el-form-item label-width="100px" label-position="right" :label="$t('commodityManagement.warningWgt')">
                  <el-input v-model="commodityManagementForm.warningWgt" clearable :placeholder="$t('placeholders.content')" maxlength="5" style="width:160px">
                  </el-input>            
                </el-form-item>
              </el-col>
              <el-col :span="24" style="padding-bottom: 0px;">
                <el-form-item label-width="100px" label-position="right" :label="$t('commodityManagement.remarks')">
                    <el-input type="textarea" v-model="commodityManagementForm.remarks" autosize :placeholder="$t('placeholders.content')" style="width:600px"/>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row :gutter="20">
              <el-col :span="24" style="padding-bottom: 0px;">
                <el-form-item>
                  <el-button icon="el-icon-close" style="float:left" @click="close_add_edit">{{ $t('common.back') }}</el-button>
                  <el-button icon="el-icon-check" type="primary" style="float:right"  @click="close_add_edit">{{ $t('common.save') }}</el-button>
                </el-form-item>
              </el-col>
            </el-row> -->
          </div>
          <div class="Btnfooter">
          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="close_add_edit">{{ $t('common.save') }}</el-button>
            <el-button icon="el-icon-close" @click="close_add_edit">{{ $t('common.back') }}</el-button>
          </el-form-item>
          </div>
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
          </el-form>
          
        </div>

      </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      cntrOptions: [{code:'1',text:'上海提桥'},{code:'2',text:'江苏提桥'}],
      userKbnOptions: [{code:'0',text:'正式工'},{code:'1',text:'临时工'}],
      prodTypeOptions: [{code:'01',text:'纱线'},
        {code:'02',text:'布料'},
        {code:'03',text:'染料'},
        {code:'04',text:'助剂'},
        {code:'05',text:'包装材料'},
        {code:'06',text:'零配件'},
        {code:'07',text:'其他'},],
      prodClassOptions: [{code:'01',text:'汗布'},{code:'02',text:'棉毛布'},],
      unitOptions: [{code:'01',text:'公斤'},
        {code:'02',text:'码'},
        {code:'03',text:'米'},
        {code:'04',text:'箱'},
        {code:'05',text:'包'},
        {code:'06',text:'个'},
        {code:'07',text:'卷'}
      ],
      total: 0,
      list: [
        {id:"1",
        cntrCd: "上海提桥",
        prodCd: "PV00001",
        prodNm: "40s/1TK+30DOP 汗布",
        prodJc: "40s/1TK+30DOP 汗布",
        prodType: "布料",
        remarks: "备注",
        prodClassCd: "汗布",
        assetModel: "",
        yarnCount: "30S/1",
        ratio: "10/50",
        consumeDt: "3",
        unit: "米",
        pieceGrossWgt: "10.35",
        pieceNetWgt: "9.4",
        pieceVol: "10",
        pieceHeight: "1.2",
        pieceWidth: "1.3",
        pieceDepth: "1.2",
        caseUnitNum: "12",
        caseGrossWgt: "0.6",
        caseNetWgt: "0.34",
        caseVol: "3L",
        caseHeight: "2.6",
        caseWidth: "3",
        caseDepth: "2.5",
        warningWgt: "20", remarks:"备注",
        },
        {id:"1",
        cntrCd: "上海提桥",
        prodCd: "PV00001",
        prodNm: "32s/1 腈纶 60/40 +吸湿排汗",
        prodJc: "32s/1 腈纶 60/40 +吸湿排汗",
        prodType: "纱线",
        remarks: "备注",
        prodClassCd: "",
        assetModel: "",
        yarnCount: "30S/1",
        ratio: "10/50",
        consumeDt: "3",
        unit: "米",
        pieceGrossWgt: "10.35",
        pieceNetWgt: "9.4",
        pieceVol: "10",
        pieceHeight: "1.2",
        pieceWidth: "1.3",
        pieceDepth: "1.2",
        caseUnitNum: "12",
        caseGrossWgt: "0.6",
        caseNetWgt: "0.34",
        caseVol: "3L",
        caseHeight: "2.6",
        caseWidth: "3",
        caseDepth: "2.5",
        warningWgt: "20", remarks:"备注",
        },
        {id:"1",
        cntrCd: "上海提桥",
        prodCd: "PV00001",
        prodNm: "32s/1 有机棉纱 60/40 +吸湿排汗",
        prodJc: "32s/1 有机棉纱 60/40 +吸湿排汗",
        prodType: "纱线",
        remarks: "备注",
        prodClassCd: "",
        assetModel: "",
        yarnCount: "30S/1",
        ratio: "10/50",
        consumeDt: "3",
        unit: "米",
        pieceGrossWgt: "10.35",
        pieceNetWgt: "9.4",
        pieceVol: "10",
        pieceHeight: "1.2",
        pieceWidth: "1.3",
        pieceDepth: "1.2",
        caseUnitNum: "12",
        caseGrossWgt: "0.6",
        caseNetWgt: "0.34",
        caseVol: "3L",
        caseHeight: "2.6",
        caseWidth: "3",
        caseDepth: "2.5",
        warningWgt: "20", remarks:"备注",}
        ],
      query: {
        page: 1,
        limit: 10,
        status: '',
        isEnabled: '',
        isPublish: '',
        cntrCd:'1',
        prodClassCd:'',
        prodClassNm:'',
        prodClassJc:'',
        prodNm:'',
        prodType:'',
      },
      dialogVisible: false,
      titleName:'',
      commodityManagementForm:{
        id: "1",
        cntrCd: "1",
        prodCd: "PV00001",
        prodNm: "40s/1TK+30DOP 汗布",
        prodJc: "40s/1TK+30DOP 汗布",
        prodType: "02",
        remarks: "备注",
        prodClassCd: "01",
        assetModel: "",
        yarnCount: "30S/1",
        ratio: "10/50",
        consumeDt: "3",
        unit: "01",
        pieceGrossWgt: "10.35",
        pieceNetWgt: "9.4",
        pieceVol: "10",
        pieceHeight: "1.2",
        pieceWidth: "1.3",
        pieceDepth: "1.2",
        caseUnitNum: "12",
        caseGrossWgt: "0.6",
        caseNetWgt: "0.34",
        caseVol: "3",
        caseHeight: "2.6",
        caseWidth: "3",
        caseDepth: "2.5",
        warningWgt: "20",
        remarks:"备注"
        
      },
    }
  },
  created() {
    return {}
  },
  computed: {
  },
  methods: {
    handleEdit(index, row) {
          this.dialogVisible = true
          if(index === undefined){
            this.titleName = '添加'
            let addProIds = this.query.isPublish;//获取项目
            setTimeout(()=>{
                this.$refs.tasksAddEdits.addProject(addProIds);
            })
          }else{
            this.titleName = '编辑';
            setTimeout(()=>{
                this.$refs.tasksAddEdits.dateIs(row,this.distinguishName);
            })
          }

    },
    handleCreate() {
      // this.$router.push({ path: 'commodityManagementOver'})
    },
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
    close_add_edit(){//父组件关闭时，跟接收到子的取消时清空子的数据。
      this.dialogVisible = false
    },
  }
}
</script>

<style>
.editContent{
  border:1px solid darkgray;
  border-radius:5px;
  /* border: 0ch */
  padding-right:0;
}
.Btnfooter{
  margin-top:10px;
}
.el-dialog__body{
  margin-top:0;
}
</style>
