<template>
  <div class="navbar">
  <el-dialog ref="passChange" :close-on-click-modal="false" :visible.sync="visible" :title="$t('navbar.changePass')" width="340px" :modal-append-to-body="false">
    <el-form ref="passChangeForm" :model="passChangeForm" label-position="left" label-width="100px" size="mini" >
      <!-- 旧密码 -->
      <el-form-item :label="$t('login.userNm')" >
        <el-input v-model="passChangeForm.userNm" clearable :placeholder="$t('placeholders.content')" maxlength="20" style="width:200px"/>
      </el-form-item>
      <el-form-item :label="$t('login.oldPass')" prop="oldPass">
        <el-input type="password" v-model="passChangeForm.oldPass" clearable :placeholder="$t('placeholders.content')" maxlength="20" style="width:200px"/>
      </el-form-item>
      <!-- 新密码 -->
      <el-form-item :label="$t('login.newPass')" prop="newPass">
        <el-input type="password" v-model="passChangeForm.newPass" clearable :placeholder="$t('placeholders.content')" maxlength="20"/>
      </el-form-item>
      <!-- 确定密码 -->
      <el-form-item :label="$t('login.passConf')" prop="passConf">
        <el-input type="password" v-model="passChangeForm.passConf" clearable :placeholder="$t('placeholders.content')" maxlength="20"/>
      </el-form-item>
    </el-form>
    <!-- 对话框控制条 -->
    <div slot="footer" class="dialog-footer" style="padding-bottom:20px;text-align:center">
      <el-button icon="el-icon-close" @click="visible = false">{{ $t('common.cancel') }}</el-button>&nbsp;&nbsp;&nbsp;
      <el-button icon="el-icon-check" type="primary" @click="updatePassword" >{{ $t('common.confirm') }}</el-button>
    </div>
  </el-dialog>
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!-- <search id="header-search" class="right-menu-item" /> -->

        <error-log class="errLog-container right-menu-item hover-effect" />

        <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->
        <el-tooltip :content="$t('navbar.screenfull')" effect="dark" placement="bottom">
          <screenfull class="hover-effect right-menu-item"/>
        </el-tooltip>

        <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
        <lang-select class="international right-menu-item"/>

      </template>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <img src="@/assets/img/timg.jpg" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.SalesDepart') }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span style="display:block;" @click="changePass">{{ $t('navbar.changePass') }}</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
 

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import Search from '@/components/HeaderSearch'
import ChangePass from '@/views/layout/components/ChangePass'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    Search,
    ChangePass
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      callback()
    }
    return {
      passChangeForm: {
        userNm: '',
        oldPass: '',
        newPass: '',
        passConf: '',
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      visible: false,
      passwordType: 'password',
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    changePass() {
      this.visible = true
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    handleCancel() {
      this.$emit('cancel')
    },
    updatePassword() {
      this.$refs['passChangeForm'].validate((valid) => {
        if (valid) {
          // apiUsers.changePwd(this.form).then(response => {
            this.$message({
              message: this.$t('common.message.info_changePwd_success'),
              type: 'success'
            })
            this.$store.dispatch('LogOut').then(() => {
              location.reload()// In order to re-instantiate the vue-router object to avoid bugs
            })
            this.$emit('cancel')
          // })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }

  }
}
</style>
