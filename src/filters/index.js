import Vue from "vue";

Vue.filter("roundDecimals", (value, resolution = 2) => {
  return Number(value).toFixed(resolution);
});
