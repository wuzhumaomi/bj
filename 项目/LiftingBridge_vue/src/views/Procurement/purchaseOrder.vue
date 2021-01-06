<template>
<!-- 采购订单界面 -->
  <div class="administrator-list container" id="pdfDom">
    <el-row :span="24" :gutter="20" class="containup">
        <el-col :span="8">
          <div class="grid-content bg-purple" >
            <el-row :gutter="20" class="purples">
              <el-card shadow="hover" class="card-size">
                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple" >工程NO.</div></el-col>
                  <el-col :span="16"><div class="grid-content bg-purple-light">xxx</div></el-col>
                </el-row>
              </el-card>
            </el-row>
            <el-row :gutter="20" class="purples">
              <el-card shadow="hover" class="card-size">
                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple" >机种名称</div></el-col>
                  <el-col :span="16"><div class="grid-content bg-purple-light">xxx</div></el-col>
                </el-row>
              </el-card>
            </el-row>
            <el-row :gutter="20" class="purples">
              <el-card shadow="hover" class="card-size">
                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple" >制造编号</div></el-col>
                  <el-col :span="16"><div class="grid-content bg-purple-light">xxx</div></el-col>
                </el-row>
              </el-card>
            </el-row>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <el-row :gutter="20" class="purples">
              <el-card shadow="hover" class="card-size">
                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple" >作业者</div></el-col>
                  <el-col :span="16"><div class="grid-content bg-purple-light">xxx</div></el-col>
                </el-row>
              </el-card>
            </el-row>
            <el-row :gutter="20" class="purples">
              <el-card shadow="hover" class="card-size">
                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple" >计划台数</div></el-col>
                  <el-col :span="16"><div class="grid-content bg-purple-light">xxx台</div></el-col>
                </el-row>
              </el-card>
            </el-row>
            <el-row :gutter="20" class="purples">
              <el-card shadow="hover" class="card-size">
                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple" >实际台数</div></el-col>
                  <el-col :span="16"><div class="grid-content bg-purple-light">xxx台</div></el-col>
                </el-row>
              </el-card>
            </el-row>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-row :gutter="20" class="grid-row">
               <el-card shadow="hover" class="card-size">
                <el-row>
                  <el-col :span="12"><div class="grid-content bg-purple" >需求节拍(s)</div></el-col>
                  <el-col :span="12"><div class="grid-content bg-purple-light">xxx</div></el-col>
                </el-row>
              </el-card>
            </el-row>
            <el-row :gutter="20" class="grid-row">
               <el-card shadow="hover" class="card-size">
                <el-row>
                  <el-col :span="12"><div class="grid-content bg-purple" >实际作业时间(s)</div></el-col>
                  <el-col :span="12"><div class="grid-content bg-purple-light">xxx</div></el-col>
                </el-row>
              </el-card>
            </el-row>
          </div>
        </el-col>
    </el-row>
    <el-row :span="24" :gutter="20" class="containup">
      <el-col :span="10" style="padding: 0;">
        <div class="grid-content bg-purple">
           <mixChart3 ref="mixChart" />
        </div>
      </el-col>
      <el-col :span="8" style="padding: 0;">
        <div class="grid-content bg-purple-light">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="代码">
            </el-table-column>
            <el-table-column prop="bad" label="不良原因">
            </el-table-column>
            <el-table-column prop="number" label="数量">
            </el-table-column>
            <el-table-column prop="barcode" label="条码">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="6" style="padding: 0;">
        <div class="grid-content bg-purple-light" style="border: 1px solid;margin: 0 19px;">
            <!-- 要点，安全，工具 -->
            <el-button   plain circle  @click="getPdf('pdfDom','采购订单界面')">
              导出pdf
            </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import mixChart3 from '@/views/components/Charts/mixChart3'
export default {
  components: {
      mixChart3,
  },
  data() {
    return {
      chart: null,
      tableData: [{
        id: '1',
        bad: '外观不良',
        number: '0',
        barcode: '|||||||||||||||||||||||',
      }, {
        id: '2',
        bad: '部品漏装',
        number: '0',
        barcode: '|||||||||||||||||||||||',
      }, {
        id: '3',
        bad: '部品错装',
        number: '0',
        barcode: '|||||||||||||||||||||||',
      }, {
        id: '4',
        bad: '检测不良',
        number: '0',
        barcode: '|||||||||||||||||||||||',
      }]
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style>
.container{
  background: #f2f2f2;
}
.containup{
  padding: 9px;margin: 0 !important;
}
.purples{
  width: 100%;height: 100%;padding: 8px 0;
}
.purples .card-size{
  height: 48px;font-size: 14px;font-weight: 500;
}
.purples .card-size .el-card__body{
  padding: 14px;
}
.grid-row{
  width: 100%;height: 100%;padding: 8px 0;
}
.grid-row .el-card{
  height: 80px;
}
.grid-row .card-size .el-card__body{
  padding: 28px 14px;
  font-weight: 500;
}
</style>
