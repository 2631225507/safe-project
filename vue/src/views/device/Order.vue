<template>
  <div>
    <div v-if="show">
      <span>订单管理</span>
      <div class="createOrder">
        <el-button type="success" @click="showForm">添加订单</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" max-height="1000">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="number" label="申请单号" width="auto">
          <template #default='scope'>
            <span @click="showDetail(scope.$index,scope.row)" class="number">{{ scope.row.order_id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="申请时间" width="auto" sortable></el-table-column>
        <el-table-column prop="applicant" label="申请人" width="auto"></el-table-column>
        <el-table-column prop="type" label="采购类型" width="auto"></el-table-column>
        <el-table-column prop="status" label="审批状态" width="auto">
          <template #default='scope'>
            <el-tag :type='scope.row.approval_sta === "已结束" ? "success" : (scope.row.approval_sta === "进行中" ? "danger" :  "danger" )' disable-transitions>
              {{ scope.row.approval_sta }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updated_at" label="审批结束时间" width="auto" sortable></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 50]" :page-size="10"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <div v-else>
      <el-button @click="show = true">返回</el-button>
      <h4>产品清单</h4>
      <el-table :data="detailData" border style="width: 100%">
        <!-- <el-table-column prop="detail_id" label="序号" width="50">
          <template #default="scope">{{ scope.$index + 1 }} </template>
        </el-table-column> -->
         <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="name" label="备件名称" width="180">
        </el-table-column>
        <el-table-column prop="count" label="申请数量" width="180">
        </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column prop="brand" label="品牌"> </el-table-column>
        <el-table-column prop="" label="小计"><template #default="scope">{{ detailData[scope.$index].count * detailData[scope.$index].price }}
          </template></el-table-column>
      </el-table>
    </div>
    <!-- 表单弹出框 -->
    <el-dialog title="购买设备" width="30%" lock-scroll=true; center v-model="dialogFormVisible">
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item prop="type" label="设备类型:" :rules="{
      required: true, message: '设备类型不能为空', trigger: 'blur'
    }">
          <el-input v-model="dynamicValidateForm.type"></el-input>
        </el-form-item>
        <div class="border">
          <el-form-item v-for="device in dynamicValidateForm.devices" :key="device.key">
            设备名:<el-input v-model="device.name"></el-input>
            品牌:<el-input v-model="device.brand"></el-input>
            价格:<el-input v-model="device.price"></el-input>
            数量:<el-input v-model="device.count"></el-input>
            <el-button @click.prevent="removeDevice(device)">删除</el-button>
          </el-form-item>
        </div>

        <el-form-item>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button @click="addDevice">新填设备</el-button>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { queryOrder, createOrder } from "../../api/administration/order";
export default {
  data() {
    return {
      show: true,
      detailData: {},
      dialogFormVisible: false,
      total: 0,
      page: {
        limit: 10,
        page: 1
      },
      tableData: [],
      dynamicValidateForm: {
        devices: [
          {
            name: "",
            brand: "",
            price: "",
            count: ""
          }
        ],
        applicant: "",
        type: "",
        approval_sta: "进行中"
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      queryOrder(this.page).then(res => {
        console.log(res);
        this.tableData = res.rows;
        this.total = res.count;
      });
    },
    showDetail(index, row) {


      this.show = false;
      this.detailData = row.order_details;
      console.log(row);
    },
    showForm() {
      this.dialogFormVisible = true;
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dynamicValidateForm.applicant = this.$store.state.user.name;
          for (let i = 0; i < this.dynamicValidateForm.devices.length; i++) {
            let name = this.dynamicValidateForm.devices[i].name;
            let brand = this.dynamicValidateForm.devices[i].brand;
            let price = this.dynamicValidateForm.devices[i].price;
            let count = this.dynamicValidateForm.devices[i].count;
            if (name == "" || brand == "" || price == "" || count == "") {
              this.$message({
                message: "都需要填写哦",
                type: "warning",
                duration: 1500
              });
            } else {
              this.dialogFormVisible = false;
              createOrder(this.dynamicValidateForm).then(res => {
                console.log(res);
                this.$message({
                  message: "添加成功",
                  type: "success",
                  duration: 1500
                });
                this.getData();
              });
            }
          }
        } else {
          this.$message({
            message: "设备类型不能为空",
            type: "warning",
            duration: 1500
          });
          return false;
        }
      });
    },
    removeDevice(item) {
      var index = this.dynamicValidateForm.devices.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.devices.splice(index, 1);
      }
    },
    addDevice() {
      this.dynamicValidateForm.devices.push({
        name: "",
        brand: "",
        price: "",
        count: ""
        // key: Date.now()
      });
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

<style lang="scss" scoped>
.number {
  cursor: pointer;
  color: #2196f3;
}
.createOrder {
  float: right;
  margin-right: 150px;
}
.border .el-form-item {
  border: 3px rgb(150, 77, 77) solid;
  padding: 15px;
  /deep/ .el-form-item__content {
    margin-left: 50px !important;
  }
}
</style>