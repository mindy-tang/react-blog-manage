<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card >
       <div class="head-box">
           <el-button type="primary" @click="clickAdd">添加用户</el-button>
       </div>
      <!-- 列表 -->
      <el-table :data="adminList" stripe style="width: 100%">
        <el-table-column type="index" />
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="passport" label="密码"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="clickEdit(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="clickDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.passport" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminList: [],
      keyword: "",
      dialogFormVisible: false,
      title: "",
      form: {},
      formLabelWidth: "120px"
    };
  },
  created() {
    this.getAdminList();
  },
  methods: {
    async getAdminList() {
      const res = await this.$http.get("admin/list");
      if (res.status !== 200) {
        return this.$message.error("获取用户列表失败");
      }
      this.adminList = res.data;
    },
    // async query() {
    //   const res = await this.$http.get("cate/query", {
    //     params: { keyword: this.keyword }
    //   });
    //   if (res.status !== 200) {
    //     return this.$message.error("获取分类列表失败");
    //   }
    //   this.cateList = res.data;
    // },
    clickAdd() {
      this.title = "添加用户";
      this.dialogFormVisible = true;
    },
    clickEdit(row){
      this.title = "编辑用户";
      this.form = {...row};
      this.dialogFormVisible = true;
      
    },
    async save() {
      let res = {};
      //新增保存
      if (this.title === "添加用户") {
        res = await this.$http.post("admin/add", this.form);
      } 
      if (this.title === "编辑用户") {
        res = await this.$http.post("admin/update", this.form);
        
      }
       
      if (res.status !== 200) {
        return this.$message.error("保存用户失败");
      }
      this.$message.success("保存用户成功");
      this.onClose();
      this.getAdminList();
    },
    clickDelete(admin) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.get("admin/delete", {params:{id: admin._id}})
          if (res.status !== 200) {
            return this.$message.error("删除分类失败");
          }
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getAdminList();
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    },
    onClose(){
        this.form = {};
        this.dialogFormVisible = false;
    }
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
.head-box {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}
</style>
