<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程信息</el-breadcrumb-item>
      <el-breadcrumb-item>已选修课程</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="courseList" broder stripe>
        <el-table-column label="序号" type="index" ></el-table-column>
        <el-table-column label="课程名称" prop="courseName" ></el-table-column>
        <el-table-column label="课程类型" prop="name" ></el-table-column>
        <el-table-column label="课程学时" prop="courseCycle" ></el-table-column>
        <el-table-column label="课程学分" prop="courseCredit" ></el-table-column>
        <el-table-column label="任课教师" prop="stuName" ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip  effect="dark"
                         content="删除课程"
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
  name: "CourseInformation",
  data(){
    return {
      queryInfo: {
        // 当前页数
        pagenum: 0,
        // 每页显示多少数据
        pagesize: 5
      },
      courseList: [],
      total: 0,
    }
  },
  created() {
    this.getCourseList()
  },
  methods: {
    async getCourseList () {
      const { data: res } = await this.$http.get('/getCourseList', {
        params: this.queryInfo
      })
      console.log(res)
      if (res.code !== 0) {
        return this.$message.error('获取已选课程列表失败！')
      }
      console.log(res.data)
      this.courseList = res.data.courseList
      this.total = res.data.total
    },
    // 监听 pagesize改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getCourseList()
    },
    // 监听 页码值 改变事件
    handleCurrentChange (newSize) {
      this.queryInfo.pagenum = newSize
      this.getCourseList()
    },
    async removeCourseById(id){
      const confirmResult  = await this.$confirm('此操作将删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      console.log(id)

      const {data : res} =await this.$http.delete('/removeCourseById?id='+id)

      if(res.code !== 0){
        return this.$message.error('删除课程失败！')
      }

      this.$message.success('删除课程成功！')
      await this.getCourseList()

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