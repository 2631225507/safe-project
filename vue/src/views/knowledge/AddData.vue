<template>
  <div class="addContent">
    <div class="components-container">
      <el-form ref="postForm" label-width="80px" :model="form" style="margin-top: 10px">
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="输入标题"></el-input>
        </el-form-item>

        <el-form-item label="选择类型">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option value="设备知识">设备知识</el-option>
            <el-option value="安全知识">安全知识</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="作者">
          <el-input v-model="form.author" placeholder="请输入文章出处"></el-input>
        </el-form-item>

        <ckEditor @sendContnet="getContent" :content="infoText"></ckEditor>
        <el-form-item style="margin-top: 10px">
          <el-button
            style="margin-left: 10px"
            type="success"
            @click="submitForm"
          >
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import ckEditor from "../../components/ckEditor/index";
import { createKnowledge } from "../../api/administration/knowledge";
export default {
  components: {
    ckEditor,
  },
  data() {
    return {
      form: {},
      infoText: "",
      lotDetail: "",
    };
  },
  methods: {
    //获取富文本编译器内容
    getContent(val) {
      this.lotDetail = val;
    },
    submitForm() {
      this.form.content = this.lotDetail;
      createKnowledge(this.form).then((res) => {
        this.$message({
          message: "添加成功!",
          type: "success",
          duration: 1500,
        });
        this.$router.push("/knowledge/knowledge");
      });
    },
  },
};
</script>


<style lang="scss" scoped>
</style>

