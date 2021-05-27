<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>院系管理</el-breadcrumb-item>
      <el-breadcrumb-item>专业管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="professionalList" broder stripe>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="专业名称" prop="professionalName"></el-table-column>
        <el-table-column label="创建时间" prop="professionalCreateDate"></el-table-column>
        <el-table-column label="专业学院" prop="collegeName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="dark"
                        content="删除专业"
                        placement="right-start" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini"
                         @click="chooseCourse(scope.row.professionalId)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 3, 5,7]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-card>

  </div>
</template>

<script>
export default {
  name: "ProfessionalManagement",
  data() {
    return {
      queryInfo: {
        // 当前页数
        pagenum: 1,
        // 每页显示多少数据
        pagesize: 7
      },
      professionalList: [],
      total: 0,
    }
  },
  created() {
    this.getProfessionalList()
  },
  methods:{
    async getProfessionalList() {
      const {data: res} = await this.$http.get('/getProfessionalList', {
        params: this.queryInfo
      })
      if (res.code !== 0) {
        return this.$message.error('获取可选课程列表失败！')
      }
      console.log(res.data)
      this.professionalList = res.data.professionalList
      this.total = res.data.total
    },
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getProfessionalList()
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize
      this.getProfessionalList()
    },
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