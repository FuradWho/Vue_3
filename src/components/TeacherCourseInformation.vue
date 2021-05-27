<template>

  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程信息</el-breadcrumb-item>
      <el-breadcrumb-item>已开课程</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="courseList" broder stripe>
        <el-table-column label="序号" type="index" ></el-table-column>
        <el-table-column label="课程名称" prop="courseName" ></el-table-column>
        <el-table-column label="课程学时" prop="courseCycle" ></el-table-column>
        <el-table-column label="课程学分" prop="courseCredit" ></el-table-column>
        <el-table-column label="授课年级" prop="courseGrade" ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">

            <el-tooltip  effect="dark"
                         content="课程留言"
                         placement="left-start" :enterable="false">
              <el-button type="info" icon="el-icon-message" size="mini"  @click="dialogFormVisible = true"  ></el-button>
            </el-tooltip>

            <el-tooltip  effect="dark"
                         content="删除课程"
                         placement="right-start" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeCourseByTeacherId(scope.row.courseId)" ></el-button>
            </el-tooltip>

            <el-dialog title="课程通知" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="通知" :label-width="formLabelWidth">
                  <el-input v-model="form.remarks"  type="textarea" :rows="6" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="setRemarks(scope.row.courseId)">确 定</el-button>
              </div>
            </el-dialog>


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
  name: "TeacherCourseInformation",
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
      form:{
        remarks:'',
        courseId:''
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '60px'
    }
  },
  created() {
    this.getTeacherCourseList()
  },
  methods: {
    async getTeacherCourseList () {
      const { data: res } = await this.$http.get('/getTeacherCourseList', {
        params: this.queryInfo
      })
      if (res.code !== 0) {
        return this.$message.error('获取已开课程列表失败！')
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
    setRemarks(id){
      this.dialogFormVisible = false
      this.form.courseId = id
      console.log(id)
      this.$http.post("/setRemarks", JSON.stringify(this.form)).then((res) => {
        const result = res.data
        if (result.code !== 0) {
          return this.$message.error('通知失败！')
        }
        this.getUserStuInfo();
        return this.$message.success("通知成功！")
      })
    },
    async removeCourseByTeacherId(id){
      const confirmResult  = await this.$confirm('此操作将删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      console.log(id)

      const {data : res} =await this.$http.delete('/removeCourseByTeacherId?id='+id)

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