<template>
  <div class="explore">
    <div class="columns box level mb-0">
      <div class="column">
        <filter-dropdown
          :columnProperty="'fund_category'"
          :columnName="'Category'"
          :dropdownList="fundCategories"
        ></filter-dropdown>
        <p class="is-size-7 is-italic has-text-right">Category filter</p>
      </div>
      <div class="column ">
        <filter-dropdown
          :columnProperty="'fund_type'"
          :columnName="'Type'"
          :dropdownList="fundTypes"
        ></filter-dropdown>
        <p class="is-size-7 is-italic has-text-right">Type filter</p>
      </div>
      <div class="column">
        <filter-dropdown
          :columnProperty="'plan'"
          :columnName="'Plan'"
          :dropdownList="fundPlans"
        ></filter-dropdown>
        <p class="is-size-7 is-italic has-text-right">Plan filter</p>
      </div>
    </div>
    <div class="columns box level mb-0">
      <div
        class="column is-3-widescreen is-2-desktop level is-mobile is-marginless"
      >
        <div class="level-left">
          <span class="title is-5 level-item">Name</span>
        </div>
        <div class="level-right is-clickable" @click="sortFundsBy('name')">
          <font-awesome-icon
            v-if="sortByColumn == 'name' && sortingOrder == 'decreasing'"
            icon="chevron-circle-up"
          />
          <font-awesome-icon
            v-else-if="sortByColumn == 'name' && sortingOrder == 'increasing'"
            icon="chevron-circle-down"
          />
          <font-awesome-icon v-else icon="minus-circle" />
        </div>
      </div>
      <div
        class="column is-3-widescreen is-2-desktop level is-mobile is-marginless"
      >
        <div class="level-left">
          <span class="title is-5 level-item">Category</span>
        </div>
        <div
          class="level-right is-clickable"
          @click="sortFundsBy('fund_category')"
        >
          <font-awesome-icon
            v-if="
              sortByColumn == 'fund_category' && sortingOrder == 'decreasing'
            "
            icon="chevron-circle-up"
          />
          <font-awesome-icon
            v-else-if="
              sortByColumn == 'fund_category' && sortingOrder == 'increasing'
            "
            icon="chevron-circle-down"
          />
          <font-awesome-icon v-else icon="minus-circle" />
        </div>
      </div>
      <div class="column is-2 level is-mobile is-marginless">
        <div class="level-left">
          <span class="title is-5 level-item">Type</span>
        </div>
        <div class="level-right is-clickable" @click="sortFundsBy('fund_type')">
          <font-awesome-icon
            v-if="sortByColumn == 'fund_type' && sortingOrder == 'decreasing'"
            icon="chevron-circle-up"
          />
          <font-awesome-icon
            v-else-if="
              sortByColumn == 'fund_type' && sortingOrder == 'increasing'
            "
            icon="chevron-circle-down"
          />
          <font-awesome-icon v-else icon="minus-circle" />
        </div>
      </div>
      <div class="column is-2 level is-mobile is-marginless">
        <div class="level-left">
          <span class="title is-5 level-item">Plan</span>
        </div>
        <div class="level-right is-clickable" @click="sortFundsBy('plan')">
          <font-awesome-icon
            v-if="sortByColumn == 'plan' && sortingOrder == 'decreasing'"
            icon="chevron-circle-up"
          />
          <font-awesome-icon
            v-else-if="sortByColumn == 'plan' && sortingOrder == 'increasing'"
            icon="chevron-circle-down"
          />
          <font-awesome-icon v-else icon="minus-circle" />
        </div>
      </div>
      <div
        class="column is-2-widescreen is-4-desktop is-hidden-mobile has-text-centered"
      >
        <div class="title is-5 mb-3">Returns</div>
        <div class="columns">
          <span class="column title is-6 is-marginless">1 year</span>
          <span class="column title is-6 is-marginless">3 years</span>
        </div>
      </div>
    </div>

    <div
      v-for="fund in filteredFunds.slice(0, 100)"
      :key="fund.code"
      class="columns box"
    >
      <div class="column is-3-widescreen is-2-desktop">
        <p class="title is-6">{{ fund.name }}</p>
        <p class="subtitle is-7 is-italic is-hidden-desktop">Name</p>
      </div>
      <div class="column is-3-widescreen is-2-desktop">
        <p v-if="fund.fund_category" class="title is-6">
          {{ fund.fund_category }}
        </p>
        <p v-else class="title is-6 is-italic has-text-weight-light">
          *no data*
        </p>
        <p class="subtitle is-7 is-italic is-hidden-desktop">Category</p>
      </div>

      <div class="column is-2">
        <p v-if="fund.fund_type" class="title is-6">{{ fund.fund_type }}</p>
        <p v-else class="title is-6 is-italic has-text-weight-light">
          *no data*
        </p>
        <p class="subtitle is-7 is-italic is-hidden-desktop">Type</p>
      </div>
      <div class="column is-2">
        <p v-if="fund.plan" class="title is-6">{{ fund.plan }}</p>
        <p v-else class="title is-6 is-italic has-text-weight-light">
          *no data*
        </p>
        <p class="subtitle is-7 is-italic is-hidden-desktop">Plan</p>
      </div>
      <div
        class="column is-1-widescreen is-2-desktop has-text-centered-desktop"
      >
        <p v-if="fund.returns && fund.returns.year_1" class="title is-6">
          {{ fund.returns.year_1 }}
        </p>
        <p v-else class="title is-6 is-italic has-text-weight-light">
          *no data*
        </p>
        <p class="subtitle is-7 is-italic is-hidden-desktop">1 year return</p>
      </div>
      <div
        class="column is-1-widescreen is-2-desktop has-text-centered-desktop"
      >
        <p v-if="fund.returns && fund.returns.year_3" class="title is-6">
          {{ fund.returns.year_3 }}
        </p>
        <p v-else class="title is-6 is-italic has-text-weight-light">
          *no data*
        </p>
        <p class="subtitle is-7 is-italic is-hidden-desktop">3 year return</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FilterDropdown from "@/components/FilterDropdown";

const _ = require("lodash");

export default {
  components: {
    FilterDropdown
  },

  computed: {
    ...mapState(["funds", "selectedFundProperty"]),

    sortedFunds() {
      if (this.sortingOrder == "increasing")
        return _.sortBy(this.funds, this.sortByColumn);
      else if (this.sortingOrder == "decreasing")
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
    }
  },

  data() {
    return {
      sortByColumn: null,
      sortingOrder: null,
      fundCategories: [],
      fundTypes: [],
      fundPlans: []
    };
  },

  watch: {
    funds() {
      this.fundCategories = _.sortedUniq(
        _.map(_.sortBy(this.funds, "fund_category"), "fund_category")
      );

      this.fundTypes = _.sortedUniq(
        _.map(_.sortBy(this.funds, "fund_type"), "fund_type")
      );

      this.fundPlans = _.sortedUniq(
        _.map(_.sortBy(this.funds, "plan"), "plan")
      );
    }
  },

  methods: {
    sortFundsBy(columnName) {
      if (this.sortByColumn == columnName) {
        if (!this.sortingOrder) this.sortingOrder = "increasing";
        else if (this.sortingOrder == "increasing")
          this.sortingOrder = "decreasing";
        else this.sortingOrder = null;
      } else {
        this.sortByColumn = columnName;
        this.sortingOrder = "increasing";
      }
    }
  }
};
</script>

<style lang="scss">
.explore {
  .fund-row {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
