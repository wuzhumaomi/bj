<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <!-- <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
      </div> -->
      <div class="back">
        <!-- <div style="text-align:center;margin-bottom: 10px;">
          <span class="title">{{ $t('login.title') }}</span>
        </div> -->
        <el-form-item prop="username">
          <span class="svg-container svg-container_login">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            v-model="loginForm.username"
            :placeholder="$t('login.username')"
            name="username"
            type="text"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :type="passwordType"
            v-model="loginForm.password"
            :placeholder="$t('login.password')"
            name="password"
            auto-complete="on"
            @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>
        <!-- <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">{{ $t('login.logIn') }}</el-button> -->

        <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin">{{ $t('login.logIn') }}</el-button>
        <el-button type="danger" style="float:right;" @click="this.close()">{{ $t('login.exit') }}</el-button>
      </div>
    </el-form>

  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'

export default {
  name: 'Login',
  components: { LangSelect, SocialSign },
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
      loginForm: {
        username: '',
        password: ''
      },
      passforgetForm: {
        userNm: '',
        oldPass: '',
        newPass: '',
        passConf: '',
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }

  },
  methods: {
    showPassForget () {
      this.showDialog = true
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#2a4f74;
  $light_gray:#eee;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .forget_pass .el-input input{
    color: $cursor;
    &::first-line {
      color:#606266;
    }
    padding: 0px 5px 12px 15px;
  }
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 80%;
      input {
        background-color: rgba(192, 202, 241, 0.3);
        border: 0px;
        -webkit-appearance: none;
        border-radius: 6px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: #000;
        &:-webkit-autofill {
          // -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: transparent;
      border-radius: 5px;
      color: #ffffff;
    }
    .el-button {
      width:30%;
      margin-bottom:5px;
      height: 35px;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  display: flex;
  height: 100%;
  width: 100%;
  background: linear-gradient(to top right, #7F7FD5, #86A8E7, #91EAE4);
  background:url("../../assets/bkg-tqt.jpg");
  // background:url("../../assets/back.jpg");
  // background-repeat: no-repeat;
  // background-size: cover;
  // -webkit-background-size: cover;
  // -o-background-size: cover;
  // background-position: center 0;
  // background: linear-gradient(to bottom right, #043576, white);
  background-size: 100% 100%;
  .back{
    padding:40px 30px 10px 30px;
    border-radius:6px;
    background:url("../../assets/tm.png") ;
    .title {
      font-size: 40px;
      color: #eee;
      text-align: center;
      font-weight: bold;
    }
  }
  // background-color: $bg;
  .login-form {
    width: 470px;
    color: #1d1d1d;
    position: absolute;
    bottom: 2%;
    left: 10%;
    margin-left: 64px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 30px 6px 15px;
    // color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      letter-spacing:6px;
      font-size: 40px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 11px;
    top: 11px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
