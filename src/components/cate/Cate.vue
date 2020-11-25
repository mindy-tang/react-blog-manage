<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input clearable @clear="query" placeholder="请输入内容" v-model="keyword">
            <el-button slot="append" icon="el-icon-search" @click="query"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="clickAdd">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 列表 -->
      <el-table :data="cateList" stripe style="width: 100%">
        <el-table-column prop="no" label="编号"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
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
        <el-form-item label="分类编号" :label-width="formLabelWidth">
          <el-input type="number" v-model="form.no" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cateList: [],
      keyword: "",
      dialogFormVisible: false,
      title: "",
      form: {
        no: undefined,
        name: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    async getCateList() {
      const res = await this.$http.get("cate/list");
      if (res.status !== 200) {
        return this.$message.error("获取分类列表失败");
      }
      this.cateList = res.data;
    },
    async query() {
      const res = await this.$http.get("cate/query", {
        params: { keyword: this.keyword }
      });
      if (res.status !== 200) {
        return this.$message.error("获取分类列表失败");
      }
      this.cateList = res.data;
    },
    clickAdd() {
      this.title = "添加分类";
      this.dialogFormVisible = true;
    },
    clickEdit(row){
      this.title = "编辑分类";
      this.form = {...row};
      this.dialogFormVisible = true;
      
    },
    async save() {
      let res = {};
      //新增保存
      if (this.title === "添加分类") {
        res = await this.$http.post("cate/add", this.form);
      } 
      if (this.title === "编辑分类") {
        res = await this.$http.post("cate/update", {
          _id: this.form._id,
          name: this.form.name,
          no: this.form.no
        });
        
      }
       
      if (res.status !== 200) {
        return this.$message.error("保存分类失败");
      }
      this.$message.success("保存分类成功");
      this.dialogFormVisible = false;
      this.form = {
        _id: undefined,
        name: "",
        no: undefined
      }
      this.getCateList();
    },
    clickDelete(cate) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.get("cate/delete", {params:{id: cate._id}})
          if (res.status !== 200) {
            return this.$message.error("删除分类失败");
          }
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getCateList();
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
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
/* .box-card {
      margin-top: 10px;
    width: 480px;
  } */
</style>
