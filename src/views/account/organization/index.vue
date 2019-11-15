<template>
  <div class="className">
    <el-card class="anoCard">
      <div class="searchDiv">
        <el-input
          type="text"
          placeholder="请输入单位名称"
          class="width1"
          v-model="schName"
        ></el-input>
        <el-select
          v-model="schStatus"
          clearable
          class="width1"
          placeholde="请选择状态"
        >
          <el-option
            v-for="item in options"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary" @click="searchTab()"
        >搜索
        </el-button
        >
        <el-button
          type="default"
          @click="resetSearch"
        >重置
        </el-button
        >
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
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="startTime" label="购买时间"></el-table-column>
        <el-table-column prop="manager" label="销售经理"></el-table-column>
        <el-table-column label="操作" width="180"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        schName: '',
        schStatus: '',
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
        tableData: []
      }
    },
    created () {
      this.initTableData()
      // setTimeout(() => {
      //   this.initTableData()
      // }, 1000)
    },
    methods: {
      initTableData () {
        const data = {
          id: 'Tradecode21',
          name: '成都携恩科技有限公司',
          duration: 1,
          status: 1,
          startTime: '2016-09-21 08:50:08',
          manager: '李明'
        }
        this.tableData = Array.from({ length: 4 }, (value, index) => {
          return data
        })
        console.log(this.tableData)
      },
      searchTab () {
        console.log(this.schStatus)
      },
      resetSearch () {
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fyDiv {
    float: right;
    margin-top: 30px;
    padding-bottom: 20px;
  }

  .anoCard .el-table .el-button {
    padding: 8px 18px;
    font-size: 12px;
  }

  .searchDiv {
    margin-bottom: 20px;

    .el-button {
      padding: 11px 20px;
    }
  }

  .width1 {
    width: 180px;
    margin-right: 10px;
  }

  .diaForm {
    .el-input {
      width: 350px;
    }
  }
</style>
<style lang="scss">
  .anoCard {
    .el-card__body:after {
      content: '';
      clear: both;
      width: 0;
      height: 0;
      visibility: hidden;
      display: block;
    }
  }

  .diaForm .el-form-item__label {
    padding-right: 20px;
  }

  .searchDiv [class^='el-icon'] {
    color: #fff;
  }
</style>
