<template>
    <el-container class="resume-upload-index ">
        <el-header class="header">
            <div class="grid-content bg-purple" style="font-size:24px;">
                <span>简历上传</span>
            </div>
            <hr>
        </el-header>
        <el-main class="main">
            <el-collapse v-model="activeNames">
                <el-collapse-item title="在线简历" name="1" class="titles">
                    <el-form ref="personal" :model="personal" style="width: 100%;">
                        <el-form-item>
                            <div v-if="!isEdit">
                                <span v-if="resume.resumeName">{{resume.resumeName}}</span>
                                <span v-else>我的简历</span>
                                <el-button size="mini" style="background:rgba(104,132,224,1);color: #fff;" @click="updateResumeName">修改名称</el-button>
                            </div>
                            <div v-else>
                                <el-input v-model="resumeNameEdit" class="resume-name-input"></el-input>
                                <el-button size="mini"  style="background:rgba(104,132,224,1);color: #fff;" @click="saveResumeName">保存</el-button>
                            </div>
                            <el-col>
                                <el-tag v-if="resume.isQualified === '2'">合 格</el-tag>
                                <el-tag v-if="resume.isQualified === '0'">不合格</el-tag>
                                <el-tag v-if="resume.isQualified === '1'">审核中</el-tag>
                            </el-col>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
                <el-collapse-item title="上传简历" name="2" class="titles">
                    <ul class="el-upload-list el-upload-list--text">
                        <el-row>
                            <li v-for="(file,index) in fileList" :key="index" class="upload-list">
                                <el-col :span="5" :offset="6">
                                    <div class="font-overflow">
                                        <a class="file-name-cls" @click="downloadFile(file)" :title="file.fileName">
                                            <i class="el-icon-document"></i>{{file.fileName}}
                                        </a>
                                    </div>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <span>{{file.fileSize | formaterSize}}</span>
                                </el-col>

                                <el-col :span="3">
                                    <i class="el-icon-close" @click="deleteFile(file.id)"></i>
                                </el-col>
                            </li>
                        </el-row>
                    </ul>
                    <!-- 上传 -->
                    <!-- 上传 -->
                    <!-- 上传 -->
                    <!-- 上传 -->
                    <!-- 上传 -->
                    <div type="success" style="background:rgba(104,132,224,1);color: #fff;" class="el-button file-input  el-button--small" >
                        点击上传
                        <input type="file" @change="selectFile($event)"/>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-main>
    </el-container>
</template>

<script>
import { personalApi, apiFile } from '@/api'
import { openFileDialog } from '@/utils/file'
export default {
  data() {
    return {
        userInfo: {},
        personal: {},
        resume: {},
        flag: true,
        isEdit: false,
        fileList: [],
        activeNames: ['1','2'],
        resumeNameEdit: ''
    }
  },
  methods: {
    loadData() {
        var me = this
        if(me.userInfo.id === undefined) {
            me.$router.push({ path: '/personal-login' })
        } else {
            personalApi.getPersonalInfo({ id: me.userInfo.id }).then(data => {
                if (data.success) {
                    me.personal = data.data.personal
                    me.resume = data.data.resume                    
                    if(data.data.personal.attachmentId){
                        me.loadFileList(data.data.personal.attachmentId)
                    }
                } else {
                    me.$message.error(data.message)
                }
            })
        }
    },

    loadFileList(folderId) {
      fileApi.getFileList({ folderId: folderId, page: 1, limit: 999 }).then(data => {
          this.fileList.splice(0, this.fileList.length, ...data.data)
      })
    },
    uploadFile(file, folderId) {
        var TypeList = {
            xlsx: 'xlsx',
            doc: 'doc',
            docx: 'docx',
            xls: 'xls'
        }
        var fileTypeNames = file.name.split('.')
        var fileTypeName = fileTypeNames[fileTypeNames.length-1].toLowerCase()
        if (TypeList[fileTypeName] !== undefined && TypeList[fileTypeName] !== '') {
            fileApi.uploadFile(file, folderId,'excel').then(data => {
                this.loadFileList(folderId)
            })
        }else {
            this.$message.warning('上传失败，仅支持上传xlsx、doc、docx、xls格式的文件！')
        }
    },
    // 当选中文件之后触发
    selectFile(e) {
      var folderId = this.personal.attachmentId
      var files = e.target && e.target.files ? e.target.files : e.path[0].files
      if (!files.length) return
      if (folderId === undefined || !folderId) {
        fileApi.getFolderId().then(data => {
            this.personal.attachmentId = data.data
            this.uploadFile(files[0], data.data)
        })
      } else {
        this.uploadFile(files[0], folderId)
      }
    },


    deleteFile(fileId) {
      this.$confirm('确定要删除吗?', '询问').then(() => {
        fileApi.deleteFile({ fileId: fileId }).then(data => {
            this.$message.success('删除成功！')
            this.loadFileList(this.personal.attachmentId)
        })
      })
    },
    downloadFile(file) {
      fileApi.downloadFile(file)
    },
    saveResumeName() {
        var inputValue = this.resumeNameEdit
        if (inputValue) {
            personalApi.updateResumeName({ resumeId: this.resume.id, name: inputValue }).then(data => {
                if(data.success) {
                    this.$message.success('修改成功！')
                    this.isEdit = false
                    this.resume.resumeName = inputValue
                } else {
                    this.$message.error(data.message)
                }
            })
        } else {

        }
    },
    updateResumeName() {
        if(!this.resume.resumeName) {
            this.resumeNameEdit = '我的简历'
        }else {
            this.resumeNameEdit = this.resume.resumeName
        }
        this.isEdit = true
    }
},
  mounted() {
    var uData = JSON.parse(window.localStorage.getItem('userData'))
    if (uData) {
      this.userInfo = uData.personal
    }
    this.loadData()
  }
}
</script>
<style lang="scss">
.resume-upload-index{
    .font-overflow{
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    .el-header, .el-footer {
        background-color: white;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        border-radius: 20px;
        text-align: center;
        line-height: 160px;
        .titles{
            .upload-list{
                font-size: 14px;
                color: #606266;
                line-height: 1.8;
                text-align: left;
            }
        }
    }
    .el-form-item{
        margin-left: 0px;
        .resume-name-input{
            width:200px;
        }
    }
}
</style>
