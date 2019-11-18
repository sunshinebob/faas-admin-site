<template>
  <div class="className">
    <el-card class="anoCard">
      <div class="searchDiv">
        <el-form :inline="true">
          <el-form-item>
            <el-select v-model="searchForm.key" clearable placeholder="请选择">
              <el-option label="行政区划" value="city"></el-option>
              <el-option label="经度" value="lat"></el-option>
              <el-option label="纬度" value="lng"></el-option>
              <el-option label="面积" value="area"></el-option>
              <el-option label="时间" value="time"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchForm.value" placeholder="模糊搜索"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="handelSearch()">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="handelSearchReset()">重置</el-button>
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
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="name" label="单位名称"></el-table-column>
        <el-table-column prop="organizationId" label="单位ID"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handelUpdate(scope.row)">编辑</el-button>
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
    <el-dialog title="二维数据" :visible.sync="diaIsShow" class="diaForm" top="10vh" width="800px">
      <el-form ref="dataForm" :model="formData" :rules="rules" label-width="140px">
        <el-form-item label="账号名称" prop="account" maxlength="31">
          <el-input v-model="formData.account" placeholder="请输入账号名称"></el-input>
        </el-form-item>
        <el-form-item label="单位名称" prop="name">
          <el-select v-model="formData.name" clearable placeholder="请选择行业">
            <el-option label="成都环保局" value="成都环保局"></el-option>
            <el-option label="四川政务" value="四川政务"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人电话" prop="mobile" maxlength="25">
          <el-input v-model="formData.mobile" placeholder="请输入联系人电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email" maxlength="25">
          <el-input v-model="formData.email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" v-model="formData.desc" maxlength="255" placeholder="请输入描述信息"></el-input>
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
  export default {
    name: 'index',
    data () {
      return {
        diaIsShow: false,
        searchForm: {
          name: ''
        },
        editType: '',
        tableData: [],
        tableLoading: false,
        total: 0,
        currentPage: 1,
        formData: {
          account: '',
          name: '',
          mobile: '',
          email: '',
          desc: ''
        },
        rules: {
          account: [
            { required: true, message: '账号不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '单位名称不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.getTableList()
    },
    methods: {
      // 获取table列表数据
      getTableList () {
        const data = {
          id: 'Tradecode21',
          name: '成都环保局',
          organizationId: 'BC173661',
          account: 'admin',
          mobile: '13648431958'
        }
        let total = 6
        this.tableData = Array.from({ length: total }, (value, index) => {
          const res = { ...data }
          res.status = Math.floor(Math.random() * 4 + 1)
          return res
        })
        this.total = total
      },
      // 查询数据
      handelSearch () {
        this.getTableList()
      },
      handelSearchReset () {
        this.searchForm = {
          key: undefined,
          value: ''
        }
        this.getTableList()
      },
      handlePageChange() {},
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
      // 重置表单数据
      resetFormData() {
        this.formData = {
          name: '',
          mapUrl: '',
          hasMark: false,
          markUrl: '',
          desc: ''
        }
      }
    }
  }
</script>
