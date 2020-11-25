<template>
  <div class="home">
       <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>新增文章</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <h3>新建文章</h3> -->
    <div class="btn-box">
        <el-button type="primary" class="btn" @click="save">保存</el-button>
    </div>
    <el-input v-model="article.title" placeholder="文章标题"></el-input>
    <el-input v-model="article.desc" placeholder="文章描述"></el-input>

    <div id="demo1"></div>
    <h3>内容预览</h3>
    <textarea name id cols="170" rows="20" readonly v-model="editorData"></textarea>
  </div>
</template>

<script>
// 引入 wangEditor
import wangEditor from "wangeditor";
import { log } from "util";

export default {
  data() {
    return {
      editor: null,
      editorData: "",
      article: {
        title: "",
        desc: "",
        content: ""
      }
    };
  },
  mounted() {
    const editor = new wangEditor(`#demo1`);

    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = newHtml => {
      this.editorData = newHtml;
    };

    // 创建编辑器
    editor.create();

    this.editor = editor;
  },
  methods: {
    // getEditorData() {
    //   // 通过代码获取编辑器内容
    //   const data = this.editor.txt.html();
    // }
    async save() {
      const data = this.editor.txt.html();
      console.log('artical', this.article);
      
      const res = await this.$http.post("/artical/add", {
        ...this.article,
        content: data
      });
      if (res.status !== 200) {
        console.log("保存文章失败:", res);
        return this.$message.error("保存文章失败");
      }
      this.$message.success("保存文章成功");
    }
  },

  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  }
};
</script>

<style lang="less">
.home {
  width: 1200px;
  margin: auto;
  position: relative;
  .btn-box {
      margin: 20px 0 10px 0;
      display: flex;
      flex-direction: row;
      .btn {
          background-color: #9d8189;
          color: #ffffff;
          border-width: 0;
      }
  }
  h3 {
    margin: 30px 0 15px;
  }
  .el-input {
    margin: 10px 0;
  }
}
</style>
