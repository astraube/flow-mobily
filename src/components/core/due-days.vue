<template>
  <q-btn-dropdown
    outline
    :size="size"
    :label="dropdownLabel"
    :align="align"
    class="full-width"
    icon="calendar_today"
    color="grey"
  >
    <q-list>
      <q-item
        clickable
        :size="size"
        v-close-popup
        v-for="amount of internalPossibleDays"
        :key="amount"
        @click="selectAmount(amount)"
      >
        <q-item-section :size="size">
          <q-item-label>{{ amount }} dias</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>

export default {
  name: 'DueDays',
  props: {
    days: {
      type: Number,
      required: false,
      default: null,
    },
    size: {
      /**
         * xs|sm|md|lg|xs
         */
      type: String,
      required: false,
      default: '',
    },
    align: {
      /**
         * left|right|between|around
         */
      type: String,
      required: false,
      default: 'center',
    },
  },
  data: () => ({
    internalSelectedDays: null,
    internalPossibleDays: [1, 3, 5, 7, 9, 11, 13, 15, 30],
  }),
  watch: {
    days(val) {
      this.internalSelectedDays = val;
    },
    internalSelectedDays(val, oldVal) {
      if (val !== oldVal) {
        this.$emit('change', val);
      }
    },
  },
  computed: {
    dropdownLabel() {
      return this.days ? `${this.days} dias` : 'Vencimento';
    },
  },
  methods: {
    selectAmount(amount) {
      this.internalSelectedDays = amount;
    },
  },
};

</script>
