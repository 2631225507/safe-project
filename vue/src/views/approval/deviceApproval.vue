<template>
  <div>
    <!-- 放大图片 -->
    <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
    <!-- 表单 -->
    <el-table :data="tableData" style="width: 100%" max-height="1000" :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column fixed label="图片" width="70">
        <template #default="scope">
          <img class="img" :src="tableData[scope.$index].image_url" alt="" @click="clickImg(tableData[scope.$index].image_url)" />
        </template>
      </el-table-column>
      <el-table-column prop="specifications" label="设备编号" width="auto">
      </el-table-column>
      <el-table-column prop="name" label="设备名称" width="auto">
      </el-table-column>
      <el-table-column prop="type" label="类别" width="auto">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="auto">
        <template #default='scope'>
          <el-tag @click="changeStatus(scope.$index,scope.row)" :type='scope.row.status === "正常" ? "success" : (scope.row.status === "故障" ? "danger" :  "info" )' disable-transitions>
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sys_user.name" label="负责人" width="auto">
      </el-table-column>
      <el-table-column prop="supplier.name" label="供应商" width="auto">
      </el-table-column>
      <el-table-column prop="created_at" label="购买时间" sortable width="auto">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button @click="openDrawer(scope.$index, scope.row)" type="text">
            查看
          </el-button>
          <el-button @click="deleteRow(scope.$index, tableData)" type="text">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 50]" :page-size="10"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 侧边弹出Drawer抽屉 -->
    <el-drawer title="设备信息!" v-model="table" direction="rtl" size="30%">
      <div>
        <h1>设备信息</h1>
        <div>
          <h3>设备名称:{{drawerData.name}}</h3>
          <h3>设备类别:{{drawerData.type}}</h3>
          <h3>设备状态:{{drawerData.status}}</h3>
        </div>
      </div>
    </el-drawer>
    <!-- 状态弹出框 -->
    <el-dialog title="管理状态" width="20%" center v-model="dialogFormVisible">
      <p style="fontSize:22px;">确定设备正常吗</p>
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
import BigImg from "../../components/BigImg";
import { queryDevice, updateStatus } from "../../api/administration/device";
export default {
  components: {
    "big-img": BigImg
  },
  data() {
    return {
      table: false,
      showImg: false,
      dialogFormVisible: false,
      page: {
        limit: 10,
        page: 1
      },
      total: 0,
      statusData: {},
      drawerData: {},
      imgSrc: "",
      tableData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      queryDevice(this.page).then(res => {
        this.tableData = res.rows;
        this.total = res.count;
        console.log(res);
      });
    },
    changeStatus(index, data) {
      this.statusData = data;
      if (data.status === "故障") {
        this.dialogFormVisible = true;
      }
    },
    commitStatus() {
      const userId = this.$store.state.user.id; //登录用户ID
      const responserId = this.statusData.sys_user.id; //负责人ID
      this.dialogFormVisible = false;
      if (responserId === userId) {
        this.statusData.status = "正常";
        updateStatus(this.statusData).then(res => {
          console.log(res);
        });
      } else {
        this.$message({
          message: "这不是您负责的设备",
          type: "warning",
          duration: 1500
        });
      }
    },
    openDrawer(index, row) {
      this.table = true;
      this.drawerData = row;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    clickImg(e) {
      this.showImg = true;
      // 获取当前图片地址
      this.imgSrc = e;
      console.log(this.imgSrc);
    },
    viewImg() {
      this.showImg = false;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.limit = val;
      this.getData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.page = val;
      this.getData();
    }
  }
};
</script>
<style lang='scss' scoped>
.img {
  width: 50px;
  height: 45px;
  border-radius: 5px;
}
.el-table td {
  padding: 0;
}
.el-tag.el-tag--success {
    cursor: pointer;
}
.el-tag.el-tag--danger {
    cursor: pointer;
}
</style>