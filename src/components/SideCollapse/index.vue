<template>
  <div class="sideCollapse" id="domColapse">
    <i
      :class="{ 'el-icon-s-unfold': opened, 'el-icon-s-fold': !opened }"
      @click="toggleOpen()"
    ></i>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['opened'])
  },
  methods: {
    toggleOpen() {
      this.$store.commit('SET_OPENED', !this.opened)
      console.log(this.opened)
    }
  }
}
</script>
<style lang="scss" scoped>
.sideCollapse i {
  font-size: 18px;
  color: #363f44;
  cursor: pointer;
}
</style>
