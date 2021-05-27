<template>
  <el-container class="home-container">
    <el-header>
      <div>V-1.0 选课管理系统</div>
      <el-button type="info" @click="logout">退出系统</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="togleCollapse">|||</div>
        <el-menu
            unique-opened :collapse="isCollapse" :collapse-transition="false"
            router :default-active="activePath"
            class="el-menu-vertical-demo"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409FFF"
            >
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      // 默认不折叠
      isCollapse: false,
      // 被激活导航地址
      activePath: '',
      iconObj: {
        '2': 'el-icon-s-grid',
        '1': 'el-icon-user-solid',
        '3': 'iconfont icon-shangpin',
        '4': 'iconfont icon-danju',
        '5': 'iconfont icon-baobiao'
      },
    }
  },
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      this.$http.post('/logout').then((res) =>{
        console.log(res.data)
        const result = res.data
        if (result.code !== 0) return this.$message.error(result.msg)
        window.sessionStorage.clear()
        this.$router.push('/login')
      })

    },
    // 获取请求菜单
    async getMenuList() {
      const {data: res} = await this.$http.get('/getMenus')
      if (res.code !== 0) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      console.log(res)
    },
    // 菜单的折叠与展开
    togleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存连接的激活地址
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
    }
  }

}
</script>

<style lang="less">

.home-container {
  height: 100vh;

}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}

.el-main {
  background-color: #EAEDF1;
  text-align: center;
}

.el-aside {
  background-color: #333744;
  height: 100vh;
  .el-menu {
    border: none;
  }
}
.iconfont{
  margin-right: 10px;
}

.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  // 鼠标放上去变成小手
  cursor: pointer;
}
</style>