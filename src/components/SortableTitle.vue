<template>
  <div class="level is-mobile is-marginless">
    <div class="level-left">
      <span class="title is-5 level-item">{{ columnName }}</span>
    </div>
    <div class="level-right is-clickable" @click="changeSort(columnProperty)">
      <font-awesome-icon
        v-if="sortByColumn == columnProperty && sortingOrder == 'descending'"
        icon="chevron-circle-up"
        :style="{ color: '#092745' }"
      />
      <font-awesome-icon
        v-else-if="
          sortByColumn == columnProperty && sortingOrder == 'ascending'
        "
        icon="chevron-circle-down"
        :style="{ color: '#092745' }"
      />
      <font-awesome-icon
        v-else
        icon="minus-circle"
        :style="{ color: '#092745' }"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    columnName: {
      required: true
    },
    columnProperty: {
      required: true
    }
  },

  computed: {
    ...mapState(["sortByColumn", "sortingOrder"])
  },

  methods: {
    ...mapActions(["changeSort"])
  }
};
</script>
