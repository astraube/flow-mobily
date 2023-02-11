<template>
  <q-card flat bordered class="block-card" @click="$emit('click', true)">
    <q-toolbar :class="cardColor">
      {{ block.name }}
    </q-toolbar>
    <q-card-section class="text-grey-6 ellipsis">{{ block.description }}</q-card-section>
    <q-card-actions>
      <q-btn
        rounded
        outline
        size="sm"
        v-for="tag of block.tags"
        :color="tag.color"
        :label="tag.name"
        :key="tag.name"
      />
      <q-btn
        rounded
        outline
        size="sm"
        color="grey-5"
        icon="arrow_back"
        v-if="!!canMovePreviousStep"
        @click.stop="movePrevious"
      />
      <q-space/>
      <q-btn
        rounded
        outline
        size="sm"
        color="grey-5"
        icon="arrow_forward"
        v-if="!!canMoveNextStep"
        @click.stop="moveNext"
      />
    </q-card-actions>
  </q-card>
</template>

<script>

import DayJS from 'dayjs';

export default {
  name: 'Block',
  props: {
    block: {
      type: Object,
      required: true,
    },
    step: {
      type: Object,
      required: true,
    },
  },
  computed: {
    canMovePreviousStep() {
      const currentGroupIndex = this.$store.state.steps.steps.findIndex(
        ({ id }) => this.step.id === id,
      );

      if (currentGroupIndex === 0) {
        return false;
      }
      return true;
    },
    canMoveNextStep() {
      const currentStepIndex = this.$store.state.steps.steps
        .findIndex(({ id }) => id === this.step.id);

      return currentStepIndex < this.$store.state.steps.steps.length - 1;
    },
    cardColor() {
      const now = DayJS();

      let stepAt;

      if (this.block.stepAt)
        stepAt = DayJS(this.block.stepAt);
      else
        stepAt = DayJS(this.block.updatedAt);

      const usedDays = now.diff(stepAt, "day");
      //const diffDays = this.dueDays - usedDays; // Caso o numero seja positivo ainda esta no prazo de entrega do projeto

      // data de entrega do bloco ultrapassado
      if (usedDays > this.dueDays)
        return 'bg-red-5';

      // data de entrega do bloco chegando ao fim
      if (usedDays >= this.dueDays / 2)
        return 'bg-yellow-5';

      // data de entrega do bloco ainda com prazo
      return 'bg-light-green-5';
    },
    dueDays() {
      const blockDueDays = this.$store.state.blocks.blocks
        .find(({ id }) => id === this.block.id).dueDays;

      if (blockDueDays)
        return blockDueDays;

      const stepDueDays = this.$store.state.steps.steps
        .find(({ id }) => id === this.step.id).dueDays;

      return stepDueDays;
    },
  },
  methods: {
    prepareInformations() {
      this.$store.commit('blocks/setCurrentBlock', this.block.id);
      this.$store.commit('steps/setCurrentStep', this.step.id);
    },
    movePrevious() {
      this.prepareInformations();
      this.$store.dispatch('blocks/moveBlock', {
        currentStep: this.step.id,
        blockId: this.block.id,
        amount: -1,
      });
    },
    moveNext() {
      this.prepareInformations();
      this.$store.dispatch('blocks/moveBlock', {
        currentStep: this.step.id,
        blockId: this.block.id,
        amount: 1,
      });
    },
  },
};

</script>

<style lang="scss" scoped>

.block-card {
  margin-bottom: .6em;

  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    cursor: pointer;
  }
}

</style>
