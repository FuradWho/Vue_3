<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>详情页面</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" >
        <el-form-item label="用户姓名">
          <el-input v-model="formLabelAlign.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-input v-model="formLabelAlign.userSex"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-input v-model="formLabelAlign.userBirthday"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="formLabelAlign.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="formLabelAlign.userPhone"></el-input>
        </el-form-item>
        <el-button
            type="primary"
            style="width:10%;margin-bottom:30px;"
            @click.native.prevent="handleUserFrom"
        >修改提交
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "PersonalInformation",
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        userName: '',
        userSex: '',
        userBirthday: '',
        userEmail:'',
        userPhone:'',
      }
    }
  },
  created() {
    this.getUserStuInfo();
  },
  methods:{
    async getUserStuInfo(){
      const { data: res } = await this.$http.get('/getUserStuInfo')
      console.log(res.data)
      if (res.code !== 0){
        return this.$message.error('获取用户信息失败！')
      }
      this.formLabelAlign.userBirthday = res.data.studentInfo.stuBirthday
      this.formLabelAlign.userName = res.data.studentInfo.stuName
      this.formLabelAlign.userSex = res.data.studentInfo.stuSex
      this.formLabelAlign.userEmail = res.data.studentInfo.stuEmail
      this.formLabelAlign.userPhone = res.data.studentInfo.stuPhone
    },
    handleUserFrom() {
      console.log(this.formLabelAlign)
      this.$http.post("/handleUserStudentFrom", JSON.stringify(this.formLabelAlign)).then((res) => {
        const result = res.data
        if (result.code !== 0) {
          return this.$message.error('修改用户信息失败！')
        }
        this.getUserStuInfo();
        return this.$message.success("修改用户信息成功！")
      })
    }
  }
}
</script>

<style scoped>

.box-card {
  width: 480px;
}

.el-breadcrumb{
  margin-bottom: 15px;
  font-size: 12px;
}

.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}


</style>