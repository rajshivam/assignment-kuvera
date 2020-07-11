<template>
  <div class="explore">
    <h1 class="title is-3">Explore Funds</h1>

    <div class="columns box level mt-0 is-paddingless">
      <sortable-title
        :columnName="'Name'"
        :columnProperty="'name'"
        :sortByColumn="sortByColumn"
        :sortingOrder="sortingOrder"
        @changeSort="changeSort"
        class="column is-3-widescreen is-2-desktop "
      ></sortable-title>
      <sortable-title
        :columnName="'Category'"
        :columnProperty="'fund_category'"
        :sortByColumn="sortByColumn"
        :sortingOrder="sortingOrder"
        @changeSort="changeSort"
        class="column is-3-widescreen is-2-desktop "
      ></sortable-title>
      <sortable-title
        :columnName="'Type'"
        :columnProperty="'fund_type'"
        :sortByColumn="sortByColumn"
        :sortingOrder="sortingOrder"
        @changeSort="changeSort"
        class="column is-2"
      ></sortable-title>
      <sortable-title
        :columnName="'Plan'"
        :columnProperty="'plan'"
        :sortByColumn="sortByColumn"
        :sortingOrder="sortingOrder"
        @changeSort="changeSort"
        class="column is-2"
      ></sortable-title>
      <div
        class="column is-2-widescreen is-4-desktop is-hidden-mobile has-text-centered"
      >
        <span class="title is-5">Returns</span>
      </div>
    </div>

    <div class="columns box level mt-0 is-paddingless">
      <div
        class="column is-3-widescreen is-2-desktop level is-mobile is-marginless"
      >
        <input
          v-model="nameSearchTerm"
          class="input name-input"
          type="text"
          placeholder="Search funds by name"
        />
      </div>
      <filter-dropdown
        :columnProperty="'fund_category'"
        :columnName="'Category'"
        :dropdownList="fundCategories"
        :activeDropdown="activeDropdown"
        :filterValue="filter"
        @changeDropdown="toggleActiveDropdown"
        @changeFilter="changeFilter"
        class="column is-3-widescreen is-2-desktop"
      ></filter-dropdown>
      <filter-dropdown
        :columnProperty="'fund_type'"
        :columnName="'Type'"
        :dropdownList="fundTypes"
        :activeDropdown="activeDropdown"
        :filterValue="filter"
        @changeDropdown="toggleActiveDropdown"
        @changeFilter="changeFilter"
        class="column is-2"
      ></filter-dropdown>
      <filter-dropdown
        :columnProperty="'plan'"
        :columnName="'Plan'"
        :dropdownList="fundPlans"
        :activeDropdown="activeDropdown"
        :filterValue="filter"
        @changeDropdown="toggleActiveDropdown"
        @changeFilter="changeFilter"
        class="column is-2"
      ></filter-dropdown>
      <div
        class="column is-2-widescreen is-4-desktop is-hidden-mobile has-text-centered"
      >
        <div class="columns">
          <span class="column title is-6 is-marginless">1 year</span>
          <span class="column title is-6 is-marginless">3 years</span>
        </div>
      </div>
    </div>

    <div
      v-for="fund in finalFunds.slice(0, 100)"
      :key="fund.code"
      class="columns box mt-0 is-paddingless is-clickable"
      @click="routeToDetail(fund.code)"
    >
      <table-cell
        :cellData="fund.name"
        :cellClass="'has-text-weight-bold is-darkblue'"
        :columnName="'Name'"
        class="column is-3-widescreen is-2-desktop"
      ></table-cell>
      <table-cell
        :cellData="fund.fund_category"
        :cellClass="'is-lightblue'"
        :columnName="'Category'"
        class="column is-3-widescreen is-2-desktop"
      ></table-cell>
      <table-cell
        :cellData="fund.fund_type"
        :cellClass="'is-lightblue'"
        :columnName="'Type'"
        class="column is-2"
      ></table-cell>
      <table-cell
        :cellData="fund.plan"
        :cellClass="'is-lightblue'"
        :columnName="'Plan'"
        class="column is-2"
      ></table-cell>
      <table-cell
        :cellData="fund.returns && fund.returns.year_1"
        :cellClass="[
          { 'is-green': fund.returns.year_1 > 0 },
          { 'is-red': fund.returns.year_1 < 0 }
        ]"
        :columnName="'1 year return'"
        class="column is-1-widescreen is-2-desktop has-text-centered-desktop"
      ></table-cell>
      <table-cell
        :cellData="fund.returns && fund.returns.year_3"
        :cellClass="[
          { 'is-green': fund.returns.year_3 > 0 },
          { 'is-red': fund.returns.year_3 < 0 }
        ]"
        :columnName="'3 year return'"
        class="column is-1-widescreen is-2-desktop has-text-centered-desktop"
      ></table-cell>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import FilterDropdown from "@/components/FilterDropdown";
import SortableTitle from "@/components/SortableTitle";
import TableCell from "@/components/TableCell";

const _ = require("lodash");

export default {
  components: {
    FilterDropdown,
    SortableTitle,
    TableCell
  },

  computed: {
    ...mapState(["funds"]),
    ...mapGetters(["fundCategories", "fundTypes", "fundPlans"]),

    sortedFunds() {
      if (this.sortingOrder == "ascending")
        return _.sortBy(this.funds, this.sortByColumn);
      else if (this.sortingOrder == "descending")
        return _.sortBy(this.funds, this.sortByColumn).reverse();
      else return this.funds;
    },

    filteredFunds() {
      let filterCriteria = {};
      if (this.filter.fund_category)
        filterCriteria.fund_category = this.filter.fund_category;
      if (this.filter.fund_type)
        filterCriteria.fund_type = this.filter.fund_type;
      if (this.filter.plan) filterCriteria.plan = this.filter.plan;

      return _.filter(this.sortedFunds, filterCriteria);
    },

    finalFunds() {
      if (this.nameSearchTerm) {
        return _.filter(this.filteredFunds, fund =>
          _.startsWith(
            fund.name.toLowerCase(),
            this.nameSearchTerm.toLowerCase()
          )
        );
      }
      return this.filteredFunds;
    }
  },
  data() {
    return {
      nameSearchTerm: "",
      activeDropdown: null,
      filter: {
        fund_category: null,
        fund_type: null,
        plan: null
      },
      sortByColumn: null,
      sortingOrder: null
    };
  },

  created() {
    this.loadFunds();
  },

  methods: {
    ...mapActions(["loadFunds"]),

    routeToDetail(code) {
      this.$router.push({ name: "FundDetail", params: { fundCode: code } });
    },

    toggleActiveDropdown(value) {
      if (this.activeDropdown == value) this.activeDropdown = null;
      else this.activeDropdown = value;
    },

    changeFilter(columnName, value) {
      this.filter[columnName] = value;
    },

    changeSort(value) {
      if (this.sortByColumn == value) {
        if (!this.sortingOrder) this.sortingOrder = "ascending";
        else if (this.sortingOrder == "ascending")
          this.sortingOrder = "descending";
        else this.sortingOrder = null;
      } else {
        this.sortByColumn = value;
        this.sortingOrder = "ascending";
      }
    }
  }
};
</script>

<style lang="scss">
.explore {
  padding: 2rem;
  background: #ebf6ff;
  .fund-row {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
  .title {
    color: #092745;
  }
  .button {
    padding: 0.25rem 0.5rem;
    color: #092745;
    font-size: 0.75rem;
  }
  .name-input {
    padding: 0.25rem 0.5rem;
    color: #092745;
    font-size: 0.75rem;
  }
}
</style>
