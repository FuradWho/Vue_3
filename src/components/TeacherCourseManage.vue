<template>

  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程信息</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>

      <el-table :data="studentList" broder stripe>
        <el-table-column label="序号" type="index" ></el-table-column>
        <el-table-column label="学生学号" prop="studentCode" ></el-table-column>
        <el-table-column label="学生姓名" prop="studentName" ></el-table-column>
        <el-table-column label="学生院系" prop="studentCollege" ></el-table-column>
        <el-table-column label="学生专业" prop="studentMajor" ></el-table-column>
        <el-table-column label="学生班级" prop="studentGrade" ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip  effect="dark"
                         content="删除该学生"
                         placement="right-start" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeCourseById(scope.row.courseId)" ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 3, 5]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>



    </el-card>
  </div>

</template>

<script>
export default {
  name: "TeacherCourseManage",
  data() {
    return {
      queryInfo: {
        // 当前页数
        pagenum: 0,
        // 每页显示多少数据
        pagesize: 5
      },
      studentList: [],
      total: 0,
    }
  },
  created() {

    this.getStudentList()
  },
  methods: {
    async getStudentList () {
      const { data: res } = await this.$http.get('/getStudentList', {
        params: this.queryInfo
      })

      if (res.code !== 0) {
        return this.$message.error('获取已选课程列表失败！')
      }
      console.log(res.data)
      this.studentList = res.data.studentList
      this.total = res.data.total

    },

    // 监听 pagesize改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getStudentList()
    },
    // 监听 页码值 改变事件
    handleCurrentChange (newSize) {
      this.queryInfo.pagenum = newSize
      this.getStudentList()
    },

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

.el-breadcrumb{
  margin-bottom: 15px;
  font-size: 12px;
}

.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}

.el-table{
  margin-top: 15px;
  font-size: 12px;
}

.el-pagination{
  margin-top: 15px;
}

</style>