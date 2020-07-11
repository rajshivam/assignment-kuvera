<template>
  <div class="level is-mobile is-marginless">
    <div class="level-left">
      <span class="title is-5 level-item">{{ columnName }}</span>
    </div>
    <div class="level-right is-clickable" @click="changeSort(columnProperty)">
      <font-awesome-icon
        v-if="sortDescending"
        icon="chevron-circle-up"
        :style="{ color: '#092745' }"
      />
      <font-awesome-icon
        v-else-if="sortAscending"
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
export default {
  props: {
    columnName: {
      required: true
    },
    columnProperty: {
      required: true
    },
    sortByColumn: {},
    sortingOrder: {}
  },

  computed: {
    sortAscending() {
      return (
        this.sortByColumn == this.columnProperty &&
        this.sortingOrder == "ascending"
      );
    },
    sortDescending() {
      return (
        this.sortByColumn == this.columnProperty &&
        this.sortingOrder == "descending"
      );
    }
  },

  methods: {
    changeSort(columnProperty) {
      this.$emit("changeSort", columnProperty);
    }
  }
};
</script>
