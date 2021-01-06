<template>
  <div>
    <el-table :data="dataInfo" :header-cell-style="{'background-color': '#eef1f6'}">
      <el-table-column label="时间\日期" prop="dateTime">
      </el-table-column>
      <el-table-column label="星期一">
        <template slot-scope="scope">
          <div v-if="scope.row.weekInfo[0].weekName === '星期一'" @click="choseProject(scope.row.weekInfo[0], scope.row.dateTime)">
            <p v-for="(lecturer, cindex) in scope.row.weekInfo[0].lecturer" :key="cindex">{{ lecturer.project }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="星期二">
        <template slot-scope="scope">
          <div v-if="scope.row.weekInfo[1].weekName === '星期二'" @click="choseProject(scope.row.weekInfo[1], scope.row.dateTime)">
            <p v-for="(lecturer, cindex) in scope.row.weekInfo[1].lecturer" :key="cindex">{{ lecturer.project }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="星期三">
        <template slot-scope="scope">
          <div v-if="scope.row.weekInfo[2].weekName === '星期三'" @click="choseProject(scope.row.weekInfo[2], scope.row.dateTime)">
            <p v-for="(lecturer, cindex) in scope.row.weekInfo[2].lecturer" :key="cindex">{{ lecturer.project }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="星期四">
        <template slot-scope="scope">
          <div v-if="scope.row.weekInfo[3].weekName === '星期四'" @click="choseProject(scope.row.weekInfo[3], scope.row.dateTime)">
            <p v-for="(lecturer, cindex) in scope.row.weekInfo[3].lecturer" :key="cindex">{{ lecturer.project }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="星期五">
        <template slot-scope="scope">
          <div v-if="scope.row.weekInfo[4].weekName === '星期五'" @click="choseProject(scope.row.weekInfo[4], scope.row.dateTime)">
            <p v-for="(lecturer, cindex) in scope.row.weekInfo[4].lecturer" :key="cindex">{{ lecturer.project }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="星期六">
        <template slot-scope="scope">
          <div v-if="scope.row.weekInfo[5].weekName === '星期六'" @click="choseProject(scope.row.weekInfo[5], scope.row.dateTime)">
            <p v-for="(lecturer, cindex) in scope.row.weekInfo[5].lecturer" :key="cindex">{{ lecturer.project }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="星期日">
        <template slot-scope="scope">
          <div v-if="scope.row.weekInfo[6].weekName === '星期日'" @click="choseProject(scope.row.weekInfo[6], scope.row.dateTime)">
            <p v-for="(lecturer, cindex) in scope.row.weekInfo[6].lecturer" :key="cindex">{{ lecturer.project }}</p>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="课程报名" :visible.sync="showDialog">
      <div>
        <el-row :gutter="20" style="background-color: #ddd; margin-bottom: 20px;">
          <el-col :span="12">
            日期：{{ currentData.weekName }}
          </el-col>
          <el-col :span="12">
            时间:{{ currentTime }}
          </el-col>
        </el-row>
        <el-table :data="currentData.lecturer" :header-cell-style="{'background-color': '#eef1f6'}">
          <el-table-column label="课程名称" prop="project"/>
          <el-table-column label="讲师名称" prop="name"/>
          <el-table-column label="讲师职称" prop="jobTitle"/>
          <el-table-column label="讲师年龄" prop="age"/>
          <el-table-column label="讲师性别" prop="six"/>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="signUp(scope.row)" type="text" size="small">报 名</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      showDialog: false,
      currentTime: '',
      currentData: {},
      dataInfo: [
        {
          dateTime: '08:00-08:40',
          weekInfo: [
            {
              weekName: '星期一',
              lecturer: [
                {
                  name: '梦元',
                  age: '18',
                  six: '男',
                  jobTitle: '主讲老师',
                  project: 'java'
                }, {
                  name: '张家乐',
                  age: '22',
                  six: '男',
                  jobTitle: '主讲老师',
                  project: 'vue'
                }
              ]
            }, {
              weekName: '星期二',
              lecturer: [
                {
                  name: '梦元',
                  age: '18',
                  six: '男',
                  jobTitle: '主讲老师',
                  project: 'java'
                }
              ]
            }, {
              weekName: '星期三',
              lecturer: [
                {
                  name: '梦元',
                  age: '18',
                  six: '男',
                  jobTitle: '主讲老师',
                  project: 'java'
                }
              ]
            }, {
              weekName: '星期四',
              lecturer: [
                {
                  name: '梦元',
                  age: '18',
                  six: '男',
                  jobTitle: '主讲老师',
                  project: 'java'
                }
              ]
            }, {
              weekName: '星期五',
              lecturer: [
                {
                  name: '梦元',
                  age: '18',
                  six: '男',
                  jobTitle: '主讲老师',
                  project: 'java'
                }
              ]
            }, {
              weekName: '星期六',
              lecturer: [
              ]
            }, {
              weekName: '星期日',
              lecturer: [
              ]
            }
          ]
        }, {
          dateTime: '09:00-09:40',
          weekInfo: [
            {
              weekName: '星期一',
              lecturer: [
                {
                  name: '梦元',
                  age: '18',
                  six: '男',
                  jobTitle: '主讲老师',
                  project: 'java'
                }, {
                  name: '张家乐',
                  age: '22',
                  six: '男',
                  jobTitle: '主讲老师',
                  project: 'vue'
                }
              ]
            }, {
              weekName: '星期二',
              lecturer: [
                {
                  name: '梦元',
                  age: '18',
                  six: '男',
                  jobTitle: '主讲老师',
                  project: 'java'
                }
              ]
            }, {
              weekName: '星期三',
              lecturer: [
                {
                  name: '梦元',
                  age: '18',
                  six: '男',
                  jobTitle: '主讲老师',
                  project: 'java'
                }
              ]
            }, {
              weekName: '星期四',
              lecturer: [
                {
                  name: '梦元',
                  age: '18',
                  six: '男',
                  jobTitle: '主讲老师',
                  project: 'java'
                }
              ]
            }, {
              weekName: '星期五',
              lecturer: [
                {
                  name: '梦元',
                  age: '18',
                  six: '男',
                  jobTitle: '主讲老师',
                  project: 'java'
                }
              ]
            }, {
              weekName: '星期六',
              lecturer: [
                {
                  name: '梦元',
                  age: '18',
                  six: '男',
                  jobTitle: '主讲老师',
                  project: 'java'
                }
              ]
            }, {
              weekName: '星期日',
              lecturer: [
                {
                  name: '梦元',
                  age: '18',
                  six: '男',
                  jobTitle: '主讲老师',
                  project: 'java'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    choseProject (row, dateTime) {
      this.showDialog = true
      this.currentData = row
      this.currentTime = dateTime
    },
    signUp (row) {}
  }
}
</script>
