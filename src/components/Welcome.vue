<template>
  <div>
    <!-- 2.为Echarts准备一个Dom -->
    <el-row>
      <el-col :span="10">
        <el-card style="margin-left: 50px;margin-top: 50px;height: 650px">
          <h1>选课系统 说明文档：</h1>
          <h5 >技术栈：后端整体框架 Springboot 浅显使用了Restful设计规范 </h5>
          <h5>安全框架：使用Shiro，实现了针对用户权限访问的控制，整合了Redis进行了Session的统一共享</h5>
          <h5>ORM框架：使用了Mybatis以及其plus版本，简化了一定量的数据操作方式</h5>
          <h5>前端框架：使用了Vue进行了前端的美化以及界面控制</h5>
          <h1>实现功能：</h1>
          <h5>1.实现了学生，教师，管理员的登陆注册</h5>
          <h5>2.实现了学生，教师，管理员的信息控制</h5>
          <h5>3.学生功能：课程信息查看，课程的选择，删除选课，个人信息的修改提交</h5>
          <h5>4.教师功能：课程信息的修改，新增课程，对于已开课程的删除，对于选课学生的查看，留言</h5>
          <h5>5.管理员功能：院系，专业，教师信息的查看删除，查看课程的学生情况</h5>
          <h5>6.echart图表的查看</h5>
        </el-card>

      </el-col>
      <el-col :span="12">
        <el-card style="margin-left: 40px;margin-top: 50px;height: 650px">
          <div id="main" style="width: 100%;height:600px;"></div>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>

<script>
// 1.导入echarts
import echarts from 'echarts'

export default {
  // 此时,页面上的元素,已经被渲染完毕了
  async mounted() {
    // 3.基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))
    // 4.准备数据项和配置项
    // 指定图表的配置项和数据
    var option = {
      legend: {},
      tooltip: {
        trigger: 'axis',
        showContent: false
      },
      dataset: {
        source: [
          ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
          ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
          ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
          ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
          ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
        ]
      },
      xAxis: {type: 'category'},
      yAxis: {gridIndex: 0},
      grid: {top: '55%'},
      series: [
        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
        {
          type: 'pie',
          id: 'pie',
          radius: '30%',
          center: ['50%', '25%'],
          label: {
            formatter: '{b}: {@2012} ({d}%)'
          },
          encode: {
            itemName: 'product',
            value: '2012',
            tooltip: '2012'
          }
        }
      ]
    }

    myChart.on('updateAxisPointer', function (event) {
      var xAxisInfo = event.axesInfo[0]
      if (xAxisInfo) {
        var dimension = xAxisInfo.value + 1
        myChart.setOption({
          series: {
            id: 'pie',
            label: {
              formatter: '{b}: {@[' + dimension + ']} ({d}%)'
            },
            encode: {
              value: dimension,
              tooltip: dimension
            }
          }
        })
      }
    })
    // 数据合并
    //  const result = _.merge(res.data, this.options)
    // 5.展示数据
    myChart.setOption(option)
  }
}
</script>

<style>
div {
  margin: 0;
  padding: 0;
}
body{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>