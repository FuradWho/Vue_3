<template>
  <div class="login-container">
    <el-form
      ref="regForm"
      :model="regForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >

      <div class="title-container">
        <h3 class="title">注册-系统</h3>
      </div>

      <el-form-item prop="stuCode">
        <span style="margin-left: 30px;color: #c5d9ff">
          <label>登陆账号：</label>
        </span>
        <el-input
          ref="stuCode"
          v-model="regForm.stuCode"
          placeholder="请设置登录账号"
          name="stuCode"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="stuPassword">
         <span style="margin-left: 30px;color: #c5d9ff">
          <label>登陆密码：</label>
        </span>
        <el-input
          :key="passwordType"
          ref="stuPassword"
          v-model="regForm.stuPassword"
          :type="passwordType"
          placeholder="请设置登录密码"
          name="stuPassword"
          tabindex="2"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="stuName">
         <span style="margin-left: 30px;color: #c5d9ff">
          <label>用户姓名：</label>
        </span>
        <el-input
          ref="stuName"
          v-model="regForm.stuName"
          placeholder="请输入用户姓名"
          name="stuName"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="stuSex">
         <span style="margin-left: 30px;color: #c5d9ff">
          <label>用户性别：</label>
        </span>
        <el-radio-group v-model="regForm.stuSex" style="margin-left: 15px">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item prop="stuBirthday">
         <span style="margin-left: 30px;color: #c5d9ff">
          <label>出生年月：</label>
        </span>
        <el-date-picker
          v-model="regForm.stuBirthday"
          type="date"
          placeholder="    选择日期"
          style="width: 70%"
          format="yyyy 年 MM 月 dd 日"
        />
      </el-form-item>

      <el-form-item>
         <span style="margin-left: 30px;color: #c5d9ff">
          <label>学院选择：</label>
        </span>
        <el-select v-model="regForm.collegeId" placeholder="请选择" style="width: 70%">
          <el-option
            v-for="item in regForm.colleges"
            :key="item.id"
            :label="item.collegeName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <span style="margin-left: 30px;color: #c5d9ff">
          <label>班级选择：</label>
        </span>
        <el-select v-model="regForm.gradeId" placeholder="请选择" style="width: 70%">
          <el-option
            v-for="item in regForm.grades"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <span style="margin-left: 30px;color: #c5d9ff">
          <label>专业选择：</label>
        </span>
        <el-select v-model="regForm.majorId" placeholder="请选择" style="width: 70%">
          <el-option
            v-for="item in regForm.majors"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item prop="stuPhone">
         <span style="margin-left: 30px;color: #c5d9ff">
          <label>联系方式：</label>
        </span>
        <el-input
          ref="stuPhone"
          v-model="regForm.stuPhone"
          placeholder="请设置联系方式"
          name="stuPhone"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="stuEmail">
         <span style="margin-left: 30px;color: #c5d9ff">
          <label>用户邮箱：</label>
        </span>
        <el-input
          ref="stuEmail"
          v-model="regForm.stuEmail"
          placeholder="请设置邮箱"
          name="stuEmail"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="role">
         <span style="margin-left: 30px;color: #c5d9ff">
          <label>用户身份：</label>
        </span>
        <el-radio-group v-model="regForm.role" style="margin-left: 15px">
          <el-radio label="2">学生</el-radio>
          <el-radio label="1">教师</el-radio>
          <el-radio label="0">管理员</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleReg"
      >注册
      </el-button>

      <div class="tips">
        <el-link style="margin-right:20px;" type="success" @click="toLogin">登录</el-link>
      </div>

    </el-form>
  </div>

</template>

<script>
export default {
  name: 'Reg',
  data() {
    return {
      regForm: {
        stuCode: '',
        stuPassword: '',
        role: '',
        stuPhone: '',
        stuEmail: '',
        stuBirthday: '',
        stuSex: '',
        colleges: [],
        collegeId: '',
        grades: [],
        gradeId: '',
        majors: [],
        majorId: '',
        stuName: ''

      },
      loginRules: {
        stuCode: [{ required: true, trigger: 'blur' }],
        stuPassword: [{ required: true, trigger: 'blur' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    handleReg() {
      const url = '/register'
      console.log(this.regForm)
      this.$http.post(url, JSON.stringify(this.regForm)).then((res) => {
        const result = res.data
        if (result.code === 0) {
          this.$router.push({
            path: '/Login'
          })
        }
      })
    },
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
    toLogin() {
      this.$router.push({
        path: '/Login'
      })
    },
    load() {
      const url = '/getData'
      this.$http.get(url).then((res) => {
        const result = res.data
        this.regForm.colleges = result.data.colleges
        this.regForm.grades = result.data.grades
        this.regForm.majors = result.data.majors
      })
    }
  }
}
</script>

<style lang="scss">
$bg: #283443;
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
    width: 65%;

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
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 400px;
    max-width: 100%;
    padding: 50px 35px 0;
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
