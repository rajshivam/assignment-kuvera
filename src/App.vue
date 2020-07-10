<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("loadFunds");
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.is-clickable {
  cursor: pointer;
}
</style>
