import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    funds: [],
    activeDropdown: null,
    selectedFundProperty: {
      fund_category: null,
      fund_type: null,
      plan: null,
    },
    sortByColumn: null,
    sortingOrder: null,
  },
  mutations: {
    setFunds(state, payload) {
      state.funds = payload;
    },
    setActiveDropdown(state, payload) {
      if (state.activeDropdown == payload) state.activeDropdown = null;
      else state.activeDropdown = payload;
    },
    setSelectedFundProperty(state, payload) {
      state.selectedFundProperty[payload.columnProperty] = payload.element;
    },
    setFundsSort(state, payload) {
      if (state.sortByColumn == payload) {
        if (!state.sortingOrder) state.sortingOrder = "ascending";
        else if (state.sortingOrder == "ascending")
          state.sortingOrder = "descending";
        else state.sortingOrder = null;
      } else {
        state.sortByColumn = payload;
        state.sortingOrder = "ascending";
      }
    },
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
    },
    toggleActiveDropdown({ commit }, value) {
      commit("setActiveDropdown", value);
    },
    closeAllDropdowns({ commit }) {
      commit("setActiveDropdown", null);
    },
    changeSelectedProperty({ commit }, value) {
      commit("setSelectedFundProperty", value);
    },
    changeSort({ commit }, value) {
      commit("setFundsSort", value);
    },
  },
});
