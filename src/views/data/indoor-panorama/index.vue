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
            <el-button type="primary" icon="el-icon-search" @click="handelSearch">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="handelSearchReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="operate-div">
        <el-button type="primary" icon="el-icon-plus" @click="handelCreate">新建</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="handelDelete">删除</el-button>
        <el-button type="primary" icon="el-icon-upload">导入</el-button>
      </div>
      <!-- 表格部分 -->
      <el-table :data="tableData" v-loading="tableLoading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="scope" label="区域信息"></el-table-column>
        <el-table-column prop="area" label="面积"></el-table-column>
        <el-table-column prop="mapUrl" label="链接地址"></el-table-column>
        <el-table-column prop="time" label="上传时间"></el-table-column>
        <el-table-column label="操作" width="120">
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
    <el-dialog title="室内全景图" :visible.sync="diaIsShow" class="diaForm" top="10vh" width="800px">
      <el-form ref="dataForm" :model="formData" :rules="rules" label-width="140px">
        <el-form-item label="全景图名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入模型名称"></el-input>
        </el-form-item>
        <el-form-item label="全景图链接" prop="modelUrl">
          <el-input v-model="formData.panoramaUrl" placeholder="请输入模型链接"></el-input>
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
          key: undefined,
          value: ''
        },
        editType: '',
        tableData: [],
        tableLoading: false,
        total: 0,
        currentPage: 1,
        formData: {
          name: '',
          panoramaUrl: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '全景图名称不能为空', trigger: 'blur' }
          ],
          modelUrl: [
            { required: true, message: '全景图链接不能为空', trigger: 'blur' }
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
        this.tableLoading = true
        const data = {
          name: '天府晶融汇',
          scope: '天府软件园',
          area: 'admin',
          mapUrl: 'http://localhost:8080/#/data/two-dimensional',
          time: '2019-11-04 11:04:46'
        }
        let total = 6
        this.tableData = Array.from({ length: total }, (value, index) => {
          const res = { ...data }
          res.status = Math.floor(Math.random() * 4 + 1)
          return res
        })
        this.total = total
        setTimeout(() => {
          this.tableLoading = false
        }, 1000)
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
          panoramaUrl: '',
          desc: ''
        }
      }
    }
  }
</script>
