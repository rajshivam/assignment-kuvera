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

.is-darkblue {
  color: #092745;
}

.is-red {
  color: #ee3b5b;
}

.is-green {
  color: #01a068;
}
</style>
