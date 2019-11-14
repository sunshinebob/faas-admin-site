<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  methods: {
    test () {
      this.$notify({
        title: '提示',
        message: '这是一条不会自动关闭的消息',
        duration: 0
      })
    }
  },
  components: {

  }
}
</script>

<style>
#app {

}
</style>
