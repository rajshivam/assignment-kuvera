<template>
  <div class="level is-mobile is-marginless">
    <div class="level-left">
      <div
        class="dropdown level-item"
        :class="{ 'is-active': activeDropdown == columnProperty }"
      >
        <div
          class="dropdown-trigger"
          @click="toggleActiveDropdown(columnProperty)"
        >
          <button
            class="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>{{
              selectedFundProperty[columnProperty]
                ? selectedFundProperty[columnProperty]
                : `Filter by ${columnName}`
            }}</span>
            <span class="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a
              v-for="(element, i) in dropdownList"
              :key="i"
              class="dropdown-item"
              @click="
                changeSelectedProperty({ columnProperty, element });
                toggleActiveDropdown(columnProperty);
              "
            >
              {{ element }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div
      class="level-right is-clickable"
      @click="
        changeSelectedProperty({ columnProperty, nullValue });
        closeAllDropdowns();
      "
    >
      <font-awesome-icon icon="times-circle" :style="{ color: '#EE3B5B' }" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    columnProperty: {
      required: true
    },
    columnName: {
      required: true
    },
    dropdownList: {
      required: true
    }
  },

  computed: {
    ...mapState(["activeDropdown", "selectedFundProperty"])
  },

  data() {
    return {
      nullValue: null
    };
  },

  methods: {
    ...mapActions([
      "toggleActiveDropdown",
      "closeAllDropdowns",
      "changeSelectedProperty"
    ])
  }
};
</script>