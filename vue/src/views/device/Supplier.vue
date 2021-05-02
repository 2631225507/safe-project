<template>
  <div>
    <div style="margin-top: 10px ">
      <el-button
        icon="el-icon-plus"
        type="primary"
        size="mini"
        @click="addSupplier"
        >添加</el-button
      >
    </div>
    <el-table :data="tableData" style="width: 100%" max-height="1000">
      <el-table-column
        fixed="left"
        type="index"
        width="50"
        label="序号"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="供应商名称"
        width="auto"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="auto"
      ></el-table-column>
      <el-table-column
        prop="telphone"
        label="手机号码"
        width="auto"
      ></el-table-column>
      <el-table-column
        fixed="right"
        prop="remarks"
        label="备注"
        width="auto"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="text"
            @click="editSupplier(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            @click="destroySupplier(scope.$index, scope.row)"
            size="mini"
            type="text"
            icon="el-icon-delete"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <el-dialog title="编辑" v-model="editDialogShow" width="30%">
      <el-form
        ref="supplierFormRules"
        :rules="supplierFormRules"
        :model="supplierForm"
        label-width="80px"
        size="mini"
      >
        <el-form-item label="供应商" prop="name">
          <el-input v-model="supplierForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="telphone">
          <el-input v-model="supplierForm.telphone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="supplierForm.address"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="supplierForm.remarks"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { querySupplier } from "../../api/administration/device";
import {
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../../api/administration/supplier";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      page: {
        limit: 5,
        page: 1,
      },
      editDialogShow: false,
      isAdd: true,
      supplierForm: {},
      supplierFormRules: {
        name: [
          { required: true, message: "请输入供应商名称", trigger: "blur" },
        ],
        telphone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      querySupplier(this.page).then((res) => {
        this.tableData = res.rows;
        this.total = res.count;
      });
    },
    addSupplier() {
      this.isAdd = true;
      this.editDialogShow = true;
      this.supplierForm = {};
    },
    editSupplier(index, row) {
      this.isAdd = false;
      this.editDialogShow = true;
      this.supplierForm = { ...row };
    },
    onSubmit() {
      this.$refs.supplierFormRules.validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            this.create();
          } else {
            this.update();
          }
        } else {
          return false;
        }
      });
    },
    create() {
      createSupplier(this.supplierForm)
        .then((res) => {
          console.log(res);
          if (res) {
            this.$message({ message: "添加成功！", type: "success" });
            this.editDialogShow = false;
            this.getData();
          } else {
            this.$message.error(res.data);
          }
        })
        .catch(() => this.$message.error("添加失败！"));
    },
    update() {
      updateSupplier(this.supplierForm)
        .then((res) => {
          if (res) {
            this.$message({ message: "修改成功！", type: "success" });
            this.editDialogShow = false;
            this.getData();
          } else {
            this.$message.error(res.data);
          }
        })
        .catch(() => this.$message.error("修改失败！"));
    },
    destroySupplier(index, row) {
      this.$confirm(`删除供应商【${row.name}】, 是否继续?`, "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteSupplier({ id: row.supplier_id })
          .then((res) => {
            console.log(res);
            if (res.success) {
              this.$message({ type: "success", message: "删除成功!" });
              this.getData();
            } else {
              this.$message.error(res.data);
            }
          })
          .catch(() => this.$message.error("删除失败！"));
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
    },
  },
};
</script>