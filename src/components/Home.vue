<template>
  <el-container class="home-container">
    <!-- 顶部 -->
    <el-header>
      <span class="title">Blog后台管理系统</span>
      <!-- <el-button type="info" @click="logout">退出</el-button> -->
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏导航菜单 -->
        <el-menu router background-color="#d8e2dc" text-color="#666" active-text-color="#628172">
          <el-menu-item index="/list">
            <!-- <i class="el-icon-location"></i> -->
            <span>文章管理</span>
          </el-menu-item>
          <el-menu-item index="/artical">
            <!-- <i class="el-icon-location"></i> -->
            <span>新增文章</span>
          </el-menu-item>
          <!-- <el-menu-item index="/cate">
            <i class="el-icon-location"></i>
            <span>分类管理</span>
          </el-menu-item>
          <el-menu-item index="/book">
            <i class="el-icon-menu"></i>
            <span>书籍管理</span>
          </el-menu-item>
           <el-menu-item index="/admin">
            <span>用户管理</span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
      <!-- 主体内容 -->
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.home-container {
  height: 100%;
}
.title {
  font-weight: bold;
  color: #ffffff;
}
.el-header {
  background-color: #9d8189;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.el-aside {
  background-color: #d8e2dc;
}
.el-main {
  background-color: #f7ede2;
}
</style>
