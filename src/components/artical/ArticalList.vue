<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 列表 -->
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="desc" label="简介"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="primary" icon="el-icon-edit" @click="clickEdit(scope.row)"></el-button> -->
            <el-button type="danger" icon="el-icon-delete" @click="clickDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await this.$http.get("artical/list");
      if (res.status !== 200) {
        return this.$message.error("获取列表失败");
      }
      this.list = res.data;
    },
    
    clickDelete(cate) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.get("artical/delete", {params:{id: cate._id}})
          if (res.status !== 200) {
            return this.$message.error("删除失败");
          }
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getList();
        })
        .catch(() => {
          
        });
    },
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
}
</style>
