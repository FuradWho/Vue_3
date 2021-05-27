<template>

  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程信息</el-breadcrumb-item>
      <el-breadcrumb-item>新增课程</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
        <el-form-item label="课程名称">
          <el-input v-model="formLabelAlign.courseName"></el-input>
        </el-form-item>
        <el-form-item label="课程类型">
          <el-select v-model="formLabelAlign.courseTypeId" placeholder="请选择" style="width:100%">
            <el-option
                v-for="item in formLabelAlign.courseType"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="课程学时">
          <el-input v-model="formLabelAlign.courseCycle"></el-input>
        </el-form-item>
        <el-form-item label="课程学分">
          <el-input v-model="formLabelAlign.courseCredit"></el-input>
        </el-form-item>
        <el-form-item label="对应年级">
          <el-input v-model="formLabelAlign.courseGrade"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
              type="textarea"
              :rows="6"
              v-model="formLabelAlign.remarks">
          </el-input>
        </el-form-item>

        <el-button
            type="primary"
            style="width:10%;margin-bottom:30px;"
            @click.native.prevent="handleCourseFrom"
        >提交
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "TeacherAddCourse",
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        courseName: '',
        courseGrade: '',
        courseCycle: '',
        courseCredit: '',
        remarks: '',
        courseType: [],
        courseTypeId: ''
      }
    }
  },
  created() {
    this.getCourseType();
  },
  methods: {
    async getCourseType() {
      const {data: res} = await this.$http.get('/getCourseTypeList')
      if (res.code !== 0) {
        return this.$message.error('获取课程类型列表失败！')
      }
      this.formLabelAlign.courseType = res.data.courseType
    },
    handleCourseFrom() {
      console.log(this.formLabelAlign)
      this.$http.post("/handleCourseFrom", JSON.stringify(this.formLabelAlign)).then((res) => {
        const result = res.data
        if (result.code !== 0) {
          return this.$message.error('新增课程失败！')
        }
        this.formLabelAlign = {brand_right: 0}
        return this.$message.success("新增课程成功！")
      })
    }
  }
}
</script>

<style scoped>

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}

.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}

.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}

.el-table {
  margin-top: 15px;
  font-size: 12px;
}

.el-pagination {
  margin-top: 15px;
}


</style>