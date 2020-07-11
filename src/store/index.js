import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const _ = require("lodash");

export default new Vuex.Store({
  state: {
    funds: [],
  },
  mutations: {
    setFunds(state, payload) {
      state.funds = payload;
    },
  },
  actions: {
    loadFunds({ commit }) {
      return Vue.service
        .getFunds()
        .then((result) => commit("setFunds", result));
    },
  },
  getters: {
    fundCategories: (state) =>
      _.sortedUniq(
        _.map(_.sortBy(state.funds, "fund_category"), "fund_category")
      ),

    fundTypes: (state) =>
      _.sortedUniq(_.map(_.sortBy(state.funds, "fund_type"), "fund_type")),

    fundPlans: (state) =>
      _.sortedUniq(_.map(_.sortBy(state.funds, "plan"), "plan")),
  },
});
