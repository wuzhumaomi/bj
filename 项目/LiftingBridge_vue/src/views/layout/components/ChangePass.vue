c<template>
 
</template>
<script>
import { apiUsers } from '@/api'
export default {
  name: 'ChangePass',
  props: {
    visible: { type: Boolean, default: true }
  },
  data() {
    return {
      passforgetForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [{ required: true, message: this.$t('common.required'), trigger: 'blur' }],
        newPassword: [{ required: true, message: this.$t('common.required'), trigger: 'blur' },
          {
            validator: (rules, value, callback) => {
              if (this.passforgetForm.newPassword !== this.passforgetForm.confirmPassword && this.passforgetForm.confirmPassword !== '') {
                callback(this.$t('changePassword.diffPassword'))
              }
              callback()
            }
          }],
        confirmPassword: [{ required: true, message: this.$t('common.required'), trigger: 'blur' },
          {
            validator: (rules, value, callback) => {
              if (this.passforgetForm.newPassword.length > 6) {
                callback(this.$t('changePassword.passwordLength'))
              }
              if (this.passforgetForm.newPassword !== this.passforgetForm.confirmPassword && this.passforgetForm.confirmPassword !== '') {
                callback(this.$t('changePassword.diffPassword'))
              }
              callback()
            }
          }]
      }
    }
  },
  // watch: {
  //   visible: function() {
  //     if (this.visible) {
  //       this.$refs['passforgetForm'].resetFields()
  //     }
  //   }
  // },
  methods: {
    handleCancel() {
      this.$emit('cancel')
    },
    updatePassword() {
      this.passforgetForm.loginId = this.$store.state.user.userinfo.loginId
      this.$refs['passforgetForm'].validate((valid) => {
        if (valid) {
          apiUsers.changePwd(this.passforgetForm).then(response => {
            this.$message({
              message: this.$t('common.message.info_changePwd_success'),
              type: 'success'
            })
            this.$store.dispatch('LogOut').then(() => {
              location.reload()// In order to re-instantiate the vue-router object to avoid bugs
            })
            this.$emit('cancel')
          })
        }
      })
    }
  }
}
</script>
