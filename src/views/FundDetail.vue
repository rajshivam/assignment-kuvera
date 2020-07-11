<template>
  <div v-if="detail" class="fund-detail">
    <div class="level is-marginless mb-2">
      <div class="level-left">
        <p class="title is-marginless is-4 level-item">{{ detail.name }}</p>
        <p class="ml-2 has-text-grey has-text-weight-bold">
          | AUM <span class="has-text-grey-dark">{{ detail.aum }} Cr</span> |
          Turnover
          <span class="has-text-grey-dark"
            >{{ detail.portfolio_turnover }} Cr</span
          >
        </p>
      </div>
      <div class="level-right">
        <p class="is-size-6 has-text-weight-bold level-item is-darkblue">
          {{ detail.fund_type }}
        </p>
      </div>
    </div>
    <div class="level">
      <div class="level-left">
        <a :href="detail.detail_info" class="subtitle is-6 is-clickable">
          {{ detail.fund_name }}
        </a>
      </div>
      <div class="level-right">
        <p
          class="is-size-7 level-item is-italic is-lightblue has-text-weight-bold"
        >
          {{ detail.fund_category }}
        </p>
      </div>
    </div>
    <div class="level">
      <div class="level-left">
        <p class="has-text-grey-light level-item is-size-6">
          {{ detail.investment_objective }}
        </p>
      </div>
      <div class="level-right">
        <p class="has-text-grey-dark level-item has-text-weight-bold is-size-7">
          {{ detail.crisil_rating }}
        </p>
      </div>
    </div>

    <div class="table-container pt-5">
      <table class="table is-fullwidth">
        <tbody>
          <tr>
            <td class="has-text-grey">Minimum lump</td>
            <td class="has-text-grey-dark has-text-weight-bold">
              {{ detail.lump_min }}
            </td>
            <td class="has-text-grey">Minimum SIP</td>
            <td class="has-text-grey-dark has-text-weight-bold">
              {{ detail.sip_min }}
            </td>
          </tr>
          <tr>
            <td class="has-text-grey">Maximum lump</td>
            <td class="has-text-grey-dark has-text-weight-bold">
              {{ detail.lump_max }}
            </td>
            <td class="has-text-grey">Maximum SIP</td>
            <td class="has-text-grey-dark has-text-weight-bold">
              {{ detail.sip_max }}
            </td>
          </tr>
          <tr>
            <td class="has-text-grey">Lump multiplier</td>
            <td class="has-text-grey-dark has-text-weight-bold">
              {{ detail.lump_multiplier }}
            </td>
            <td class="has-text-grey">SIP multiplier</td>
            <td class="has-text-grey-dark has-text-weight-bold">
              {{ detail.sip_multiplier }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="tile is-ancestor is-marginless">
      <div class="tile is-parent">
        <div class="tile is-child box">
          <div class="level">
            <div class="has-text-grey has-text-weight-bold level-left">
              Volatility
            </div>
            <div class="is-darkblue has-text-weight-bold level-right">
              {{ detail.volatility }}
            </div>
          </div>
          <div class="level">
            <div class="has-text-grey has-text-weight-bold level-left">
              NAV on {{ detail.nav.date }}
            </div>
            <div class="is-darkblue has-text-weight-bold level-right">
              {{ detail.nav.nav }}
            </div>
          </div>
          <div class="level">
            <div class="has-text-grey has-text-weight-bold level-left">
              NAV on {{ detail.last_nav.date }}
            </div>
            <div class="is-darkblue has-text-weight-bold level-right">
              {{ detail.last_nav.nav }}
            </div>
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child box">
          <div class="level">
            <div class="has-text-grey has-text-weight-bold level-left">
              1 year return
            </div>
            <div
              class="has-text-weight-bold level-right"
              :class="[
                { 'is-green': detail.returns.year_1 > 0 },
                { 'is-red': detail.returns.year_1 < 0 }
              ]"
            >
              {{ detail.returns.year_1 }}
            </div>
          </div>
          <div class="level">
            <div class="has-text-grey has-text-weight-bold level-left">
              3 years return
            </div>
            <div
              class="has-text-weight-bold level-right"
              :class="[
                { 'is-green': detail.returns.year_3 > 0 },
                { 'is-red': detail.returns.year_3 < 0 }
              ]"
            >
              {{ detail.returns.year_3 }}
            </div>
          </div>
          <div class="level">
            <div class="has-text-grey has-text-weight-bold level-left">
              5 years return
            </div>
            <div
              class="has-text-weight-bold level-right"
              :class="[
                { 'is-green': detail.returns.year_5 > 0 },
                { 'is-red': detail.returns.year_5 < 0 }
              ]"
            >
              {{ detail.returns.year_5 }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="level mt-5">
      <div class="level-item subtitle is-clickable is-size-6" @click="goBack()">
        Back to explore page
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: null
    };
  },
  created() {
    this.getDetail();
  },

  methods: {
    async getDetail() {
      let result = await this.$service.getFundDetail(
        this.$route.params.fundCode
      );
      if (result) this.detail = result[0];
      console.log(this.detail);
    },

    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
.fund-detail {
  padding: 3rem 4rem;
  background: #ebf6ff;

  .title {
    color: #092745;
  }

  .subtitle {
    color: #01bfff;
    text-decoration: underline;
  }

  .table-container {
    padding: 1rem;
  }

  .table {
    border-radius: 6px;
  }

  .box {
    box-shadow: none;
    border: 1px solid #dbdbdb;
  }
}
</style>