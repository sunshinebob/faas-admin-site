<template>
  <div class="className">
    <el-card class="anoCard">
      <div class="searchDiv">
        <el-form :inline="true">
          <el-form-item label="单位名称:">
            <el-input type="text" placeholder="请输入单位名称" v-model="searchForm.name"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchForm.status" clearable placeholder="请选择状态">
              <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="handelSearch()">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="handelSearchReset()">重置</el-button>
            <el-button type="default">展开</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="operate-div">
        <el-button type="primary" icon="el-icon-plus" @click="handelCreate">新建</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="handelDelete">删除</el-button>
        <el-button type="primary" icon="el-icon-upload">导入</el-button>
      </div>
      <!-- 表格部分 -->
      <el-table :data="tableData">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="name" label="单位名称"></el-table-column>
        <el-table-column label="购买年限">
          <template slot-scope="scope">
            {{ scope.row.duration }}年
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <div class="status">
              <span class="icon" :class="'icon' + scope.row.status"></span>
              <span class="text">
              {{scope.row.status | statusToStr}}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="购买时间"></el-table-column>
        <el-table-column prop="manager" label="销售经理"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handelUpdate(scope.row)">编辑</el-button>
            <el-button type="primary" size="mini">订阅报警</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :current-page="currentPage"
        :total="total"
        class="fyDiv"
        @current-change="handlePageChange"
      >
      </el-pagination>
    </el-card>
    <el-dialog title="新建单位" :visible.sync="diaIsShow" class="diaForm" top="10vh" width="800px">
      <el-form ref="dataForm" :model="formData" :rules="rules" label-width="140px">
        <el-form-item label="公司名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="所属行业" prop="type">
          <el-select v-model="formData.type" clearable placeholder="请选择行业">
            <el-option label="环保" value="1"></el-option>
            <el-option label="旅游" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司位置" prop="address">
          <area-select v-model="selected" :data="pcaa" :level="2"></area-select>
        </el-form-item>
        <el-form-item label="注册时间" prop="createTime">
          <el-date-picker
            v-model="formData.createTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="截止时间" prop="endTime">
          <el-date-picker
            v-model="formData.endTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="客户联系人" prop="contact">
          <el-input v-model="formData.contact" max-length="25" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="mobile">
          <el-input v-model="formData.mobile" max-length="25" placeholder="请输入联系人电话"></el-input>
        </el-form-item>
        <el-form-item label="联系人座机">
          <el-input v-model="formData.mobile" max-length="25" placeholder="请输入联系人座机"></el-input>
        </el-form-item>
        <el-form-item label="公司负责人" prop="manager">
          <el-input v-model="formData.manager" max-length="25" placeholder="请输入公司负责人"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" v-model="formData.desc" placeholder="请输入描述信息"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editType === 'update' ? updateData(): createData()">确定</el-button>
          <el-button @click="diaIsShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { pcaa } from 'area-data'

  export default {
    name: 'index',
    data () {
      return {
        pcaa,
        selected: [],
        diaIsShow: false,
        editType: '',
        searchForm: {
          name: '',
          status: ''
        },
        options: [
          {
            label: '试用',
            value: '1'
          },
          {
            label: '欠费',
            value: '2'
          },
          {
            label: '续费',
            value: '3'
          },
          {
            label: '正常',
            value: '4'
          }
        ],
        tableData: [],
        total: 0,
        currentPage: 1,
        formData: {
          name: '',
          type: '',
          address: '',
          createTime: '',
          endTime: '',
          contact: '',
          mobile: '',
          tel: '',
          manager: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '单位名称不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '行业类型不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '地址不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '请选择注册时间', trigger: 'blur' }
          ],
          endTime: [
            { required: true, message: '请选择截止时间', trigger: 'blur' }
          ],
          contact: [
            { required: true, message: '联系人不能为空', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '联系人电话不能为空', trigger: 'blur' }
          ],
          manager: [
            { required: true, message: '公司负责人不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.getTableList()
    },
    filters: {
      statusToStr(status) {
        const allStatus = ['试用', '欠费', '续费', '正常']
        return allStatus[status - 1]
      }
    },
    methods: {
      getTableList () {
        const data = {
          id: 'Tradecode21',
          name: '成都携恩科技有限公司',
          duration: 1,
          status: 1,
          startTime: '2016-09-21 08:50:08',
          manager: '李明'
        }
        let total = 6
        this.tableData = Array.from({ length: total }, (value, index) => {
          const res = { ...data }
          res.status = Math.floor(Math.random() * 4 + 1)
          return res
        })
        this.total = total
      },
      handelSearchReset () {
        this.searchForm = {
          name: '',
          status: ''
        }
        this.getTableList()
      },
      // 新增数据
      handelCreate() {
        // 重置form表单数据
        this.resetFormData()
        // 设置编辑状态为新增数据
        this.editType = 'create'
        // 显示模态框
        this.diaIsShow = true
        // 重置验证
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      // 具体新增逻辑
      createData() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            this.diaIsShow = false
            console.log(this.formData)
            this.$message.success('创建成功')
          }
        })
      },
      // 修改数据
      handelUpdate(row) {
        this.formData = Object.assign({}, row)
        this.editType = 'update'
        this.diaIsShow = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      // 具体修改逻辑
      updateData() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            console.log(this.formData)
            // 后台提交修改数据
            // todo
            this.diaIsShow = false
            this.$message.success('数据修改成功')
          }
        })
      },
      // 删除数据
      handelDelete() {},
      // 分页改变
      handlePageChange() {},
      // 重置表单数据
      resetFormData() {
        this.formData = {
          name: '',
          type: '',
          address: '',
          createTime: '',
          endTime: '',
          contact: '',
          mobile: '',
          tel: '',
          manager: '',
          desc: ''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .status {
    display: flex;
    align-items: center;
    .icon {
      width: 6px;
      height: 6px;
      margin-right: 5px;
      border-radius: 100%;
      &.icon1 {
        background-color: #0e77d1;
      }
      &.icon2 {
        background-color: #f04134;
      }
      &.icon3 {
        background-color: #ffbe00;
      }
      &.icon4 {
        background-color: #00a958;
      }
    }
  }
</style>
