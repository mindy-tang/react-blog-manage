<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>书籍管理</el-breadcrumb-item>
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
          <el-button type="primary" @click="clickAdd">添加书籍</el-button>
        </el-col>
      </el-row>
      <!-- 列表 -->
      <el-table :data="bookList" stripe style="width: 100%">
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="name_cn" label="译名"></el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="clickEdit(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="clickDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="onClose">
      <el-form :model="form">
        <el-form-item label="书籍名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="书籍译名" :label-width="formLabelWidth">
          <el-input v-model="form.name_cn" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="书籍作者" :label-width="formLabelWidth">
          <el-input v-model="form.author" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类" :label-width="formLabelWidth">
          <el-select v-model="selectedCate" placeholder="请选择">
            <el-option
              v-for="cate in cateList"
              :key="cate.no"
              :label="cate.name"
              :value="cate.no"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="封面" :label-width="formLabelWidth">
          <el-input v-model="form.cover" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="网盘地址" :label-width="formLabelWidth">
          <el-input v-model="form.addr" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.introduction" auto-complete="off"></el-input>
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
      cateList: [],
      selectedCate: undefined,
      bookList: [],
      keyword: "",
      dialogFormVisible: false,
      title: "",
      form: {},
      formLabelWidth: "120px"
    };
  },
  created() {
    this.getCateList();
    this.getBookList();
  },
  methods: {
    async getCateList() {
      const res = await this.$http.get("cate/list");
      if (res.status !== 200) {
        return this.$message.error("获取分类列表失败");
      }
      this.cateList = res.data;
    },
    async getBookList() {
      const res = await this.$http.get("book/list");
      if (res.status !== 200) {
        return this.$message.error("获取书籍列表失败");
      }
      this.bookList = res.data;
    },
    async query() {
      const res = await this.$http.get("book/query", {
        params: { keyword: this.keyword }
      });
      if (res.status !== 200) {
        return this.$message.error("获取书籍列表失败");
      }
      this.bookList = res.data;
    },
    clickAdd() {
      this.title = "添加书籍";
      this.dialogFormVisible = true;
    },
    clickEdit(row) {
      this.title = "编辑书籍";
      this.form = { ...row };
      this.selectedCate = Number(this.form.cate);
      this.dialogFormVisible = true;
    },
    async save() {
      let res = {};
      //新增保存
      if (this.title === "添加书籍") {
        res = await this.$http.post("book/add", {
          ...this.form,
          cate: this.selectedCate
        });
      }
      if (this.title === "编辑书籍") {
        res = await this.$http.post("book/update", {
          _id: this.form._id,
          name: this.form.name,
          name_cn: this.form.name_cn,
          author: this.form.author,
          cate: this.selectedCate
        });
      }

      if (res.status !== 200) {
        return this.$message.error("保存书籍失败");
      }
      this.$message.success("保存书籍成功");
      this.onClose();
      this.getBookList();
    },
    clickDelete(book) {
      this.$confirm("此操作将永久删除该书籍, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.get("book/delete", {
            params: { id: book._id }
          });
          if (res.status !== 200) {
            return this.$message.error("删除书籍失败");
          }
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getBookList();
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    },
    onClose(){
      this.dialogFormVisible = false;
      this.form = {};
      this.selectedCate = undefined;
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
/* .box-card {
      margin-top: 10px;
    width: 480px;
  } */
</style>
