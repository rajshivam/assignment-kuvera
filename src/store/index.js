import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    funds: []
  },
  mutations: {
    setFunds(state, payload) {
      state.funds = payload;
    }
  },
  actions: {
    async loadFunds({ commit }) {
      try {
        //get funds from api
        let result = await Vue.service.getFunds();
        commit("setFunds", result);
      } catch (error) {
        console.log("store loadFunds error", error);
      }
    }
  }
});
