<template>
  <div class="explore">
    <div class="columns">
      <div class="column">
        <p class="title is-1">Explore Funds</p>
      </div>
      <div class="column">
        <div class="control">
          <input
            v-model="searchTerm"
            class="input"
            type="text"
            placeholder="Search in funds"
          />
        </div>
      </div>
    </div>

    <div class="columns box level mt-0 is-paddingless">
      <sortable-title
        :columnName="'Name'"
        :columnProperty="'name'"
        class="column is-3-widescreen is-2-desktop "
      ></sortable-title>
      <sortable-title
        :columnName="'Category'"
        :columnProperty="'fund_category'"
        class="column is-3-widescreen is-2-desktop "
      ></sortable-title>
      <sortable-title
        :columnName="'Type'"
        :columnProperty="'fund_type'"
        class="column is-2"
      ></sortable-title>
      <sortable-title
        :columnName="'Plan'"
        :columnProperty="'plan'"
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
        class="column is-3-widescreen is-2-desktop"
      ></filter-dropdown>
      <filter-dropdown
        :columnProperty="'fund_type'"
        :columnName="'Type'"
        :dropdownList="fundTypes"
        class="column is-2"
      ></filter-dropdown>
      <filter-dropdown
        :columnProperty="'plan'"
        :columnName="'Plan'"
        :dropdownList="fundPlans"
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
      v-for="fund in filteredFunds.slice(0, 100)"
      :key="fund.code"
      class="columns box mt-0 is-paddingless"
    >
      <table-cell
        :cellData="fund.name"
        :cellClass="'has-text-weight-bold is-darkblue'"
        :columnName="'Name'"
        class="column is-3-widescreen is-2-desktop"
      ></table-cell>
      <table-cell
        :cellData="fund.fund_category"
        :columnName="'Category'"
        class="column is-3-widescreen is-2-desktop"
      ></table-cell>
      <table-cell
        :cellData="fund.fund_type"
        :columnName="'Type'"
        class="column is-2"
      ></table-cell>
      <table-cell
        :cellData="fund.plan"
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
import { mapState } from "vuex";
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
    ...mapState([
      "funds",
      "selectedFundProperty",
      "sortByColumn",
      "sortingOrder"
    ]),

    sortedFunds() {
      if (this.sortingOrder == "ascending")
        return _.sortBy(this.funds, this.sortByColumn);
      else if (this.sortingOrder == "descending")
        return _.sortBy(this.funds, this.sortByColumn).reverse();
      else return this.funds;
    },

    filteredFunds() {
      let filterCriteria = {};
      if (this.selectedFundProperty.fund_category)
        filterCriteria.fund_category = this.selectedFundProperty.fund_category;
      if (this.selectedFundProperty.fund_type)
        filterCriteria.fund_type = this.selectedFundProperty.fund_type;
      if (this.selectedFundProperty.plan)
        filterCriteria.plan = this.selectedFundProperty.plan;

      return _.filter(this.sortedFunds, filterCriteria);
    },

    fundCategories() {
      return _.sortedUniq(
        _.map(_.sortBy(this.funds, "fund_category"), "fund_category")
      );
    },

    fundTypes() {
      return _.sortedUniq(
        _.map(_.sortBy(this.funds, "fund_type"), "fund_type")
      );
    },

    fundPlans() {
      return _.sortedUniq(_.map(_.sortBy(this.funds, "plan"), "plan"));
    }
  },

  data() {
    return {
      searchTerm: "",
      nameSearchTerm: ""
    };
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
