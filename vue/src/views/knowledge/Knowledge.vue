<template>
  <div class="knowledge">
    <el-button
      type="primary"
      size="mini"
      icon="el-icon-plus"
      @click="addKnowledge"
      style="margin-top: 10px; box-sizing: border-box"
      >新增</el-button
    >
    <el-table
      row-key="date"
      stripe
      ref="filterTable"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column prop="title" label="标题" width="500">
        <template #default="scope">
          <span @click="showDetail(scope.$index, scope.row)" class="title">{{
            scope.row.title
          }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="created_at"
        label="日期"
        sortable
        width="200"
        column-key="date"
      >
      </el-table-column>

      <el-table-column
        prop="type"
        label="分类"
        width="200"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-tag
            :type="scope.row.tag === '安全知识' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.type }}</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column prop="author" label="文章来源" width="150">
      </el-table-column>

      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button
            @click="deleteKnowledge(scope.$index, scope.row)"
            size="mini"
            type="text"
            icon="el-icon-delete"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="text-align: right; margin-top: 10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableDataTotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { page, deleteKnowledge } from "../../api/administration/knowledge";
export default {
  created() {
    this.page();
  },
  data() {
    return {
      query: { limit: "10", page: "1" },
      tableData: [],
      tableDataTotal: 0,
    };
  },
  methods: {
    page() {
      page(this.query).then((res) => {
        this.tableData = res.rows;
        this.tableDataTotal = res.count;
      });
    },
    showDetail(index, row) {
      this.$router.push("/knowledge/detail?id=" + row.id);
    },
    addKnowledge() {
      this.$router.push("/knowledge/add");
    },
    deleteKnowledge(index, row) {
      this.$confirm(`删除知识库【${row.title}】, 是否继续?`, "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteKnowledge({ id: row.id })
          .then((res) => {
            if (res.success) {
              this.$message({ type: "success", message: "删除成功!" });
              this.page();
            } else {
              this.$message.error(res.data);
            }
          })
          .catch(() => this.$message.error("删除失败！"));
      });
    },
    handleSizeChange(val) {
      this.query.limit = val;
      this.page();
    },
    handleCurrentChange(val) {
      this.query.page = val;
      this.page();
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  color: rgb(97, 150, 245);
  cursor: pointer;
}
</style>
