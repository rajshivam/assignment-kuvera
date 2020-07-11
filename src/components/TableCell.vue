<template>
  <div>
    <p v-if="cellData" class="is-size-7" :class="cellClass">
      {{ cellData }}
    </p>
    <p v-else class="is-size-7 is-italic has-text-weight-light">
      *no data*
    </p>
    <p class="is-size-7 is-italic is-hidden-desktop">{{ columnName }}</p>
  </div>
</template>

<script>
export default {
  props: {
    cellData: {
      required: true
    },
    columnName: {
      required: true
    },
    cellClass: {}
  }
};
</script>
