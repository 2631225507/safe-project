<template>
  <div class="detail">
    <div class="new-show">
      <div class="new-title">{{ knowledgeData.title }}</div>
      <div class="new-time">发布时间 : {{ knowledgeData.created_at }}</div>
      <div class="new-content">
        <p style="text-align: center"><br /></p>
        <p v-html="knowledgeData.content"></p>
      </div>
    </div>
  </div>
</template>
<script>
import { getKnowledge } from "../../api/administration/knowledge";
export default {
  created() {
    this.getData();
  },
  data() {
    return {
      knowledgeData: [],
    };
  },
  methods: {
    getData() {
      const id = this.$route.query.id;
      getKnowledge({ id }).then((res) => {
        this.knowledgeData = res;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.new-show {
  width: 1000px;
  padding-top: 30px;
  margin: 0 auto;
}

.new-title {
  width: 100%;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
}

.new-time {
  width: 100%;
  text-align: center;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
}

.new-content {
  width: 100%;
  padding: 10px;
}
</style>

