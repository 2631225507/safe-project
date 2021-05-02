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
          <el-tag :type='scope.row.status === "正常" ? "success" : (scope.row.status === "故障" ? "danger" :  "info" )' disable-transitions>
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="supplier.name" label="供应商" width="auto">
      </el-table-column>
      <el-table-column prop="created_at" label="购买时间" width="auto" sortable>
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
    <el-drawer title="设备信息!" v-model="table" direction="rtl" size="40%">
      <div>
        <h1>设备信息</h1>
        <div>
          <h3>设备名称:{{drawerData.name}}</h3>
          <h3>设备类别:{{drawerData.type}}</h3>
          <h3>设备状态:{{drawerData.status}}</h3>
        </div>
      </div>
    </el-drawer>
  </div>

</template>

<script>
import BigImg from "../../components/BigImg";
import { queryDevice } from "../../api/administration/device";
export default {
  components: {
    "big-img": BigImg
  },
  data() {
    return {
      table: false,
      showImg: false,
      imgSrc: "",
      page: {
        limit: 10,
        page: 1
      },
      total:0,
      drawerData: {},
      tableData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      queryDevice(this.page).then(res=>{
        this.tableData = res.rows
        this.total = res.count
        console.log(res);
      })
    },
    openDrawer(index, row) {
      this.table = true;
      console.log(index);
      // console.log(row);
      this.drawerData = row;
      console.log(this.drawerData);
      console.log(this.tableData);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    clickImg(img) {
      this.showImg = true;
      // 获取当前图片地址
      this.imgSrc = img;
      // console.log(e);
      // console.log(this.imgSrc);
    },
    viewImg() {
      this.showImg = false;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.limit = val;
      this.getData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.page = val;
      this.getData()
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
</style>