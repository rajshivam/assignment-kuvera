<template>
  <div class="explore">
    <h1 class="title is-3">Explore Funds</h1>

    <div class="columns box level mt-0 is-paddingless">
      <sortable-title
        v-for="(title, i) in titles"
        :key="i"
        :columnName="title.name"
        :columnProperty="title.property"
        :sortByColumn="sortByColumn"
        :sortingOrder="sortingOrder"
        @changeSort="changeSort"
        :class="title.class"
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
        v-for="(filter, i) in columnFilters"
        :key="i"
        :columnProperty="filter.property"
        :columnName="filter.name"
        :dropdownList="filter.dropdown"
        :activeDropdown="activeDropdown"
        :filterValue="filterCriteria"
        @changeDropdown="toggleActiveDropdown"
        @changeFilter="changeFilter"
        :class="filter.class"
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
        v-for="(cell, i) in cells"
        :key="i"
        :cellData="fund[cell.property]"
        :cellClass="cell.textClass"
        :columnName="cell.name"
        :class="cell.class"
      ></table-cell>
      <table-cell
        :cellData="fund.returns && fund.returns.year_1 | roundDecimals"
        :cellClass="[
          { 'is-green': fund.returns.year_1 > 0 },
          { 'is-red': fund.returns.year_1 < 0 }
        ]"
        :columnName="'1 year return'"
        class="column is-1-widescreen is-2-desktop has-text-centered-desktop"
      ></table-cell>
      <table-cell
        :cellData="fund.returns && fund.returns.year_3 | roundDecimals"
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

  data() {
    return {
      nameSearchTerm: "",
      activeDropdown: null,
      titles: [
        {
          name: "Name",
          property: "name",
          class: "column is-3-widescreen is-2-desktop"
        },
        {
          name: "Category",
          property: "fund_category",
          class: "column is-3-widescreen is-2-desktop"
        },
        {
          name: "Type",
          property: "fund_type",
          class: "column is-2"
        },
        {
          name: "Plan",
          property: "plan",
          class: "column is-2"
        }
      ],
      cells: [
        {
          property: "name",
          name: "Name",
          textClass: "has-text-weight-bold is-darkblue",
          class: "column is-3-widescreen is-2-desktop"
        },
        {
          property: "fund_category",
          name: "Category",
          textClass: "is-lightblue",
          class: "column is-3-widescreen is-2-desktop"
        },
        {
          property: "fund_type",
          name: "Type",
          textClass: "is-lightblue",
          class: "column is-2"
        },
        {
          property: "plan",
          name: "Plan",
          textClass: "is-lightblue",
          class: "column is-2"
        }
      ],

      filterCriteria: {
        fund_category: null,
        fund_type: null,
        plan: null
      },
      sortByColumn: null,
      sortingOrder: null
    };
  },

  computed: {
    ...mapState(["funds"]),
    ...mapGetters(["fundCategories", "fundTypes", "fundPlans"]),

    columnFilters() {
      return [
        {
          property: "fund_category",
          name: "Category",
          dropdown: this.fundCategories,
          class: "column is-3-widescreen is-2-desktop"
        },
        {
          property: "fund_type",
          name: "Type",
          dropdown: this.fundTypes,
          class: "column is-2"
        },
        {
          property: "plan",
          name: "Plan",
          dropdown: this.fundPlans,
          class: "column is-2"
        }
      ];
    },

    sortedFunds() {
      if (this.sortingOrder == "ascending")
        return _.sortBy(this.funds, this.sortByColumn);
      else if (this.sortingOrder == "descending")
        return _.sortBy(this.funds, this.sortByColumn).reverse();
      else return this.funds;
    },

    filteredFunds() {
      let filterObj = {};
      if (this.filterCriteria.fund_category)
        filterObj.fund_category = this.filterCriteria.fund_category;
      if (this.filterCriteria.fund_type)
        filterObj.fund_type = this.filterCriteria.fund_type;
      if (this.filterCriteria.plan) filterObj.plan = this.filterCriteria.plan;

      return _.filter(this.sortedFunds, filterObj);
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
      this.filterCriteria[columnName] = value;
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
  background: $paleblue;
  .fund-row {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
  .title {
    color: $darkblue;
  }
  .button {
    padding: 0.25rem 0.5rem;
    color: $darkblue;
    font-size: 0.75rem;
  }
  .name-input {
    padding: 0.25rem 0.5rem;
    color: $darkblue;
    font-size: 0.75rem;
  }
}
</style>
