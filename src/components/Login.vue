<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
             label-position="left">

      <div class="title-container">
        <h3 class="title">登录-系统</h3>
      </div>

      <el-form-item prop="stuCode">
        <span style="margin-left: 30px;color: #c5d9ff">
          <label>登陆账号：</label>
        </span>
        <el-input
            ref="stuCode"
            v-model="loginForm.stuCode"
            placeholder="请输入登录账号"
            name="stuCode"
            type="text"
            tabindex="1"
            auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="stuPassword">
       <span style="margin-left: 30px;color: #c5d9ff">
          <label>账号密码：</label>
        </span>
        <el-input
            :key="passwordType"
            ref="stuPassword"
            v-model="loginForm.stuPassword"
            :type="passwordType"
            placeholder="请输入密码"
            name="stuPassword"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                 @click.native.prevent="handleLogin">登录
      </el-button>

      <div class="tips">
        <el-link style="margin-right:20px;" type="success" @click="toReg">注册</el-link>
        <el-link type="success" @click="forgetPwd">忘记密码</el-link>
      </div>

    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入登录账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入账号密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        stuCode: '',
        stuPassword: ''
      },
      loginRules: {
        stuCode: [{required: true, trigger: 'blur', validator: validateUsername}],
        stuPassword: [{required: true, trigger: 'blur', validator: validatePassword}]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.stuPassword.focus()
      })
    },
    handleLogin() {
      this.$http.post('/login', this.loginForm).then(res => {
        const result = res.data
        console.log(result)
        if (result.code === 0) {
          window.sessionStorage.setItem('Authorization', result.data.token)
          this.$router.push('/Home')
        } else {
          this.$message.error("登录失败")
        }
      })
    },
    toReg() {
      this.$router.push({
        path: '/Reg'
      })
    },
    forgetPwd() {
      this.$router.push({
        path: '/forgetPwd'
      })
    }
  }
}
</script>

<style lang="scss">
$bg: #333744;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 70%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #333744;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  height: 100vh;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 420px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
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
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>