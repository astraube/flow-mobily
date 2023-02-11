<template>
  <div class="row no-wrap steps-list-area">
    <template v-if="loadingSteps">
      <div class="col-12 col-sm-3 col-md-3 q-px-sm" v-for="step of 4" :key="step">
        <StepsLoader v-if="loadingSteps"/>
      </div>
    </template>

    <template v-if="hasSteps">
      <div v-for="step of steps" :key="step.id" class="col-12 col-sm-3 col-md-3 q-px-sm">
        <Step
          :step="step"
          @updating-step="changeUpdatingStep"
          @deleting-step="changeDeletingStep"
          @creating-block="changeCreatingBlock"
          @updating-block="changeUpdatingBlock"
        />
      </div>
    </template>

    <StepUpdateDialog
      v-if="stepToUpdate"
      :open="savingSte"
      :stepId="stepToUpdate"
      @change="changeUpdatingStepState"
    />
    <StepDeletionDialog
      v-if="stepToDelete"
      :open="deletingStep"
      :stepId="stepToDelete"
      @change="changeDeletingStepState"
    />

    <BlockCreationDialog
      v-if="stepToCreateBlock"
      :open="creatingBlock"
      :stepId="stepToCreateBlock"
      @change="changeCreatingBlockState"
    />
    <BlockEditionDialog
      v-if="blockToUpdate"
      :open="savingBlock"
      :block="blockToUpdate"
      @change="changeUpdatingBlockState"
    />
  </div>
</template>

<script>

import StepsLoader from './steps-loader.vue';
import Step from './step.vue';
import StepUpdateDialog from './step-update-dialog.vue';
import StepDeletionDialog from './step-deletion-dialog.vue';
import BlockCreationDialog from '../block/block-creation-dialog.vue';
import BlockEditionDialog from '../block/block-edition-dialog.vue';

export default {
  name: 'StepsList',
  components: {
    StepsLoader,
    Step,
    StepUpdateDialog,
    BlockCreationDialog,
    BlockEditionDialog,
    StepDeletionDialog,
  },
  data: () => ({
    creatingNewBlock: false,
    stepToCreateBlock: null,
    blockToUpdate: null,
    savingBlock: false,

    savingSte: false,
    stepToUpdate: null,
    creatingNewStep: false,
    deletingStep: false,
    stepToDelete: null,
  }),
  methods: {
    changeUpdatingStep(stepToUpdate) {
      this.savingSte = true;
      this.stepToUpdate = stepToUpdate;
    },
    changeUpdatingStepState(isUpdating) {
      this.savingSte = isUpdating;

      if (!isUpdating) {
        this.stepToUpdate = null;
      }
    },
    changeDeletingStep(stepToDelete) {
      this.deletingStep = true;
      this.stepToDelete = stepToDelete;
    },
    changeDeletingStepState(isDeleting) {
      this.deletingStep = isDeleting;

      if (!isDeleting) {
        this.stepToDelete = null;
      }
    },
    changeCreatingBlock(stepToCreateBlock) {
      this.creatingNewBlock = true;
      this.stepToCreateBlock = stepToCreateBlock;
    },
    changeCreatingBlockState(isCreating) {
      this.creatingNewBlock = isCreating;

      if (!isCreating) {
        this.stepToCreateBlock = null;
      }
    },
    changeUpdatingBlock(blockToUpdate) {
      this.savingBlock = true;
      this.blockToUpdate = blockToUpdate;
    },
    changeUpdatingBlockState(isUpdating) {
      this.savingBlock = isUpdating;

      if (!isUpdating) {
        this.blockToUpdate = null;
      }
    },
  },
  computed: {
    loadingGroups() {
      return this.$store.state.groups.loadingGroups;
    },
    loadingSteps() {
      return this.$store.state.steps.loadingSteps;
    },
    steps() {
      const stateSteps = this.$store.state.steps.steps;
      if (stateSteps && stateSteps.length) {
        return stateSteps
          .filter(({ groupId }) => groupId === this.$store.state.groups.currentGroup.id);
      }
      return [];
    },
    hasSteps() {
      return !this.loadingSteps && !this.loadingGroups && this.steps.length;
    },

    creatingStep() {
      return this.creatingNewStep || this.$store.state.steps.savingStep;
    },
    creatingBlock() {
      return this.creatingNewBlock || this.$store.state.blocks.savingBlock;
    },
  },
};

</script>

<style>

@media (max-width: 1023px) {
  .steps-list-area {
    flex-wrap: wrap;
  }
}

</style>
