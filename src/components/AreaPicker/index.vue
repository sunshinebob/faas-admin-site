<template>
  <div class="area-picker">
    <el-select v-model="province" placeholder="省级地区">
      <el-option v-for="(provinceItem, key) in provinceList" :key="key" :label="provinceItem" :value="provinceItem"></el-option>
    </el-select>
    <el-select v-model="city" placeholder="市级地区">
      <el-option v-for="(cityItem, key) in cityList" :key="key" :label="cityItem" :value="cityItem"></el-option>
    </el-select>
    <el-select v-model="area" placeholder="区级地区">
      <el-option v-for="(areaItem, key) in areaList" :key="key" :label="areaItem" :value="areaItem"></el-option>
    </el-select>
  </div>
</template>

<script>
  import pcaa from './pcaa'

  export default {
    name: 'index',
    data() {
      return {
        provinceList: [],
        cityList: [],
        areaList: [],
        province: '',
        city: '',
        area: ''
      }
    },
    created () {
      this.getCityData()
    },
    methods: {
      getCityData() {
        this.provinceList = pcaa['86']
        console.log(pcaa)
      }
    }
  }
</script>

<style scoped>

</style>
