<template>
  <q-card flat bordered class="q-pa-sm q-mb-md">
    <q-toolbar class="text-grey-9 text-center rounded-borders q-mb-sm">
      <q-btn
        flat
        round
        dense
        size="sm"
        icon="delete"
        :disable="!!blocksByStep"
        @click="emitDeletingStep"
      />
      <q-toolbar-title>
        <b>{{ step.name }}</b>
      </q-toolbar-title>
      <q-btn flat round dense size="sm" icon="create" @click="emitUpdatingStep"/>
    </q-toolbar>
    <div>
      <template v-if="blocksByStep && $store.state.steps.loadingBlocks">
        <BlockLoader v-for="block of blocksByStep.length" :key="block"/>
      </template>

      <template v-for="block of blocksByStep">
        <Block :block="block" :step="step" :key="block.id" @click="() => emitUpdatingBlock(block)"/>
      </template>
    </div>
    <q-card-actions v-if="step.isPossibleCreateBlock">
      <q-btn flat dense label="Novo" class="full-width" color="grey" @click="emitCreatingBlock"/>
    </q-card-actions>
  </q-card>
</template>

<script>

import Block from '../block/block.vue';
import BlockLoader from '../block/block-loader.vue';

export default {
  name: 'Step',
  components: {
    Block,
    BlockLoader,
  },
  props: {
    step: {
      type: Object,
      required: true,
    },
  },
  computed: {
    blocksByStep() {
      return this.$store.state.blocks.blocks.filter((block) => block.stepId === this.step.id);
    },
  },
  methods: {
    emitUpdatingStep() {
      this.$emit('updating-step', this.step.id);
    },
    emitDeletingStep() {
      this.$emit('deleting-step', this.step.id);
    },
    emitCreatingBlock() {
      this.$emit('creating-block', this.step.id);
    },
    emitUpdatingBlock(block) {
      this.$emit('updating-block', block);
    },
  },
};

</script>
