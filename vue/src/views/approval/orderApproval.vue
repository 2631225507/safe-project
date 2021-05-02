<template>
  <div>
    <div v-if="show">
      <el-table :data="tableData" style="width: 100%" max-height="1000" :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="number" label="申请单号" width="120">
          <template #default='scope'>
            <span @click="showDetail(scope.$index,scope.row)" class="number">{{ scope.row.order_id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="申请时间" width="auto" sortable></el-table-column>
        <el-table-column prop="applicant" label="申请人" width="120"></el-table-column>
        <el-table-column prop="type" label="采购类型" width="120"></el-table-column>
        <el-table-column  label="审批状态" width="120">
          <template #default='scope'>
            <el-tag @click="changeStatus(scope.$index,scope.row)" :type='scope.row.approval_sta === "已结束" ? "success" : (scope.row.status === "进行中" ? "warning" :  "danger" )' disable-transitions>
              {{ scope.row.approval_sta }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updated_at" label="审批结束时间" width="auto" sortable></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 10, 20, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <div v-else>
      <el-button @click="show = true">返回</el-button>
      <h1>订单详情页</h1>
      <h1>{{detailData.applicant}}</h1>
      <h1>{{detailData.created_at}}</h1>
      <h1>{{detailData.type}}</h1>
      <h1>{{detailData.approval_sta}}</h1>
      <h1>{{detailData.updated_at}}</h1>
    </div>

    <!-- 状态弹出框 -->
    <el-dialog title="管理状态" width="20%" center v-model="dialogFormVisible">
      <p style="fontSize:22px;">确定订单审核通过吗</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="commitStatus">确 定</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import { queryOrder,updateOrder } from "../../api/administration/order";
export default {
  data() {
    return {
      show: true,
      dialogFormVisible: false,
      total: 0,
      page: {
        limit: 10,
        page: 1
      },
      statusData: {},
      detailData: {},
      form: {
        status: ""
      },
      tableData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      queryOrder(this.page).then(res => {
        this.tableData = res.rows;
        this.total = res.count;
        console.log(res);
      });
    },
    changeStatus(index, data) {
      this.statusData = data;
      // console.log(data);
      if (data.approval_sta === "进行中") {
        this.dialogFormVisible = true;
      }
    },
    commitStatus() {
       const userName = this.$store.state.user.name; //登录用户姓名
       const responserName = this.statusData.applicant; //负责人姓名
      this.dialogFormVisible = false;
      if (userName === responserName) {
        this.statusData.approval_sta = "已结束";
        updateOrder(this.statusData).then(res => {
          // console.log(res);
          this.$message({
          message: "修改成功",
          type: "warning",
          duration: 1500
        });
          this.getData()
        });
      } else {
        this.$message({
          message: "这不是您负责的设备",
          type: "warning",
          duration: 1500
        });
      }
    },
    showDetail(index, row) {
      this.show = false;
      this.detailData = row;
    },
    handleSizeChange(val) {
      this.page.limit = val;
      this.getData()
    },
    handleCurrentChange(val) {
      this.page.page = val;
      this.getData()
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-tag.el-tag--danger {
  cursor: pointer;
}
.number {
  cursor: pointer;
  color: #2196f3;
}
</style>